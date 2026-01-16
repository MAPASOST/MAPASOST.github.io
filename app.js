// Main Application Logic

class ChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.sampleQuestionsContainer = document.getElementById('sampleQuestions');
        this.documentListContainer = document.getElementById('documentList');

        this.conversationHistory = [];
        this.currentQuestions = [];
        this.questionRotationInterval = null;
        this.isProcessing = false; // Prevent multiple simultaneous requests

        // Rate limit management
        this.lastRequestTime = 0;
        this.cooldownSeconds = 20; // 20 second cooldown between requests
        this.cooldownTimer = null;

        this.init();
    }

    init() {
        // Check API configuration
        if (!isAPIConfigured()) {
            this.showConfigurationWarning();
        }

        // Set up event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Initialize document list
        this.displayDocumentList();

        // Initialize and start sample questions rotation
        this.rotateSampleQuestions();
        this.startQuestionRotation();
    }

    showConfigurationWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'error-message';
        warningDiv.innerHTML = `
            <strong>⚠️ API Key Not Configured</strong><br>
            Please edit config.js and add your Claude API key to enable the chatbot functionality.
            <br><br>
            <small>For security reasons, consider setting up a backend service to handle API calls instead of exposing your API key in the frontend.</small>
        `;
        this.chatMessages.appendChild(warningDiv);
    }

    displayDocumentList() {
        const documents = DOCUMENTS.getDocumentList();

        if (documents.length === 0 || (documents.length === 1 && documents[0].name === 'Sample Document')) {
            this.documentListContainer.innerHTML = `
                <div class="document-item" style="border-left-color: #ffa500;">
                    <strong>No documents uploaded yet</strong>
                    <div style="margin-top: 8px; font-size: 0.8rem;">
                        Edit documents.js to add your regulation documents.
                    </div>
                </div>
            `;
            return;
        }

        this.documentListContainer.innerHTML = documents.map(doc => `
            <div class="document-item">
                <strong>${this.escapeHtml(doc.name)}</strong>
                <div>${this.escapeHtml(doc.description)}</div>
            </div>
        `).join('');
    }

    rotateSampleQuestions() {
        this.currentQuestions = DOCUMENTS.getRandomQuestions(5);
        this.displaySampleQuestions();
    }

    displaySampleQuestions() {
        this.sampleQuestionsContainer.innerHTML = this.currentQuestions.map((question, index) => `
            <div class="sample-question" data-question="${this.escapeHtml(question)}">
                ${this.escapeHtml(question)}
            </div>
        `).join('');

        // Add click handlers to sample questions
        this.sampleQuestionsContainer.querySelectorAll('.sample-question').forEach(elem => {
            elem.addEventListener('click', () => {
                const question = elem.getAttribute('data-question');
                this.userInput.value = question;
                this.userInput.focus();
            });
        });
    }

    startQuestionRotation() {
        // Rotate questions every 10 seconds
        this.questionRotationInterval = setInterval(() => {
            this.rotateSampleQuestions();
        }, CONFIG.SAMPLE_QUESTION_ROTATION_INTERVAL);
    }

    async sendMessage() {
        const message = this.userInput.value.trim();

        if (!message) return;
        if (!isAPIConfigured()) {
            this.addMessage('assistant', 'Please configure your API key in config.js to use the chatbot.');
            return;
        }

        // Check cooldown period to prevent rate limiting
        const now = Date.now();
        const timeSinceLastRequest = (now - this.lastRequestTime) / 1000; // in seconds
        const remainingCooldown = Math.ceil(this.cooldownSeconds - timeSinceLastRequest);

        if (this.lastRequestTime > 0 && remainingCooldown > 0) {
            this.addMessage('assistant',
                `⏱️ Please wait ${remainingCooldown} seconds before asking another question. This cooldown helps prevent rate limit errors and ensures you can ask multiple questions.`
            );
            this.startCooldownTimer(remainingCooldown);
            return;
        }

        // Prevent multiple simultaneous requests
        if (this.isProcessing) {
            console.log('Already processing a request, ignoring duplicate submission');
            return;
        }

        // Set processing flag
        this.isProcessing = true;

        // Clear any existing cooldown timer
        if (this.cooldownTimer) {
            clearInterval(this.cooldownTimer);
            this.cooldownTimer = null;
        }

        // Clear input and disable button
        this.userInput.value = '';
        this.sendButton.disabled = true;
        const buttonText = this.sendButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = 'Send';
        }

        // Add user message to chat
        this.addMessage('user', message);

        // Show loading indicator
        const loadingId = this.showLoading();

        try {
            // Get response from Claude API
            const response = await this.queryClaudeAPI(message);

            // Remove loading indicator
            this.removeLoading(loadingId);

            // Add assistant response
            this.addMessage('assistant', response.content, response.citations);

            // Update last request time and start cooldown
            this.lastRequestTime = Date.now();
            this.startCooldownTimer(this.cooldownSeconds);

        } catch (error) {
            console.error('Error:', error);
            this.removeLoading(loadingId);

            // Check if this is a rate limit error
            if (error.message.includes('rate limit') || error.message.includes('429')) {
                this.addMessage('assistant',
                    `⚠️ **Rate Limit Reached**\n\nYou've asked too many questions too quickly. Due to the size of the regulation documents, each question uses significant API resources.\n\n**What this means:** You need to wait about 1 minute before asking another question.\n\n**Why this happens:** Each question sends all regulation documents (~100,000 tokens) to the AI, and there's a limit of 30,000 tokens per minute.\n\n**Tip:** Space out your questions and wait for the cooldown timer to help avoid this issue.`
                );
            } else {
                this.addMessage('assistant',
                    `I apologize, but I encountered an error: ${error.message}. Please make sure your API key is correctly configured.`
                );
            }

            // Don't start cooldown on error - let user retry immediately
            this.sendButton.disabled = false;
            const buttonText = this.sendButton.querySelector('span');
            if (buttonText) {
                buttonText.textContent = 'Send';
            }
        } finally {
            this.isProcessing = false; // Reset processing flag
            this.userInput.focus();
        }
    }

    async queryClaudeAPI(userMessage) {
        // Send all documents to ensure complete coverage (no filtering)
        const documentContext = DOCUMENTS.getAllDocumentContent();

        console.log('Sending all documents for complete coverage');

        // Build the prompt
        const fullPrompt = `Here are the Massachusetts school age program regulation documents you should reference:

${documentContext}

Now, please answer the following question based ONLY on the information in these documents. Include specific citations (document name, section, page) for all information you provide:

Question: ${userMessage}`;

        // Make API call to backend worker (which securely handles the Claude API key)
        const response = await fetch(CONFIG.WORKER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: CONFIG.CLAUDE_MODEL,
                max_tokens: CONFIG.MAX_TOKENS,
                system: CONFIG.SYSTEM_PROMPT,
                messages: [
                    {
                        role: 'user',
                        content: fullPrompt
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Debug: Log the full API response to console
        console.log('API Response:', data);
        console.log('Content blocks:', data.content);
        console.log('Number of content blocks:', data.content ? data.content.length : 0);

        // Handle potential error responses
        if (data.error) {
            throw new Error(data.error.message || 'Unknown API error');
        }

        // Safely extract content - Claude API returns content as an array of content blocks
        // Each block has a type (usually 'text') and the actual text
        if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
            throw new Error('Invalid API response format: no content blocks found');
        }

        // Extract only text blocks and concatenate them (there should typically be only one)
        const content = data.content
            .filter(block => block.type === 'text')
            .map(block => block.text)
            .join('\n\n');

        console.log('Extracted content length:', content.length);
        console.log('First 200 chars:', content.substring(0, 200));

        const citations = this.extractCitations(content);

        return {
            content: content,
            citations: citations
        };
    }

    extractCitations(content) {
        // Extract citations from the response
        // Look for patterns like "Section X", "Page Y", document names, etc.
        const citations = [];

        // Pattern 1: "Section X.Y" or "Section X"
        const sectionMatches = content.matchAll(/(?:Section|§)\s+[\d\.]+[^\n]*/gi);
        for (const match of sectionMatches) {
            citations.push({
                source: 'Section Reference',
                text: match[0].trim()
            });
        }

        // Pattern 2: "Page X" or "p. X"
        const pageMatches = content.matchAll(/(?:Page|p\.)\s+\d+[^\n]*/gi);
        for (const match of pageMatches) {
            citations.push({
                source: 'Page Reference',
                text: match[0].trim()
            });
        }

        // Pattern 3: Document name references
        DOCUMENTS.documents.forEach(doc => {
            if (content.includes(doc.name)) {
                citations.push({
                    source: doc.name,
                    text: `Referenced in response`
                });
            }
        });

        // Remove duplicates
        const uniqueCitations = citations.filter((citation, index, self) =>
            index === self.findIndex(c => c.text === citation.text)
        );

        return uniqueCitations.length > 0 ? uniqueCitations : null;
    }

    addMessage(role, content, citations = null) {
        // Remove welcome message if it exists
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        const label = role === 'user' ? 'You' : 'AI Assistant';

        let citationsHTML = '';
        if (citations && citations.length > 0) {
            citationsHTML = `
                <div class="citations">
                    <div class="citations-title">📎 Citations</div>
                    ${citations.map(citation => `
                        <div class="citation">
                            <div class="citation-source">${this.escapeHtml(citation.source)}</div>
                            <div class="citation-text">${this.escapeHtml(citation.text)}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        messageDiv.innerHTML = `
            <div class="message-label">${label}</div>
            <div class="message-content">${this.formatMessage(content)}</div>
            ${citationsHTML}
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to conversation history
        this.conversationHistory.push({ role, content });
    }

    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        let formatted = this.escapeHtml(text);

        // Bold text
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        // Bullet points
        formatted = formatted.replace(/^[•\-\*]\s/gm, '&bull; ');

        return formatted;
    }

    showLoading() {
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'message assistant';
        loadingDiv.innerHTML = `
            <div class="message-label">AI Assistant</div>
            <div class="loading">
                <span>Analyzing regulations</span>
                <div class="loading-dots">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(loadingDiv);
        this.scrollToBottom();
        return loadingId;
    }

    removeLoading(loadingId) {
        const loadingDiv = document.getElementById(loadingId);
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    startCooldownTimer(seconds) {
        // Clear any existing timer
        if (this.cooldownTimer) {
            clearInterval(this.cooldownTimer);
            this.cooldownTimer = null;
        }

        let remaining = seconds;
        const buttonText = this.sendButton.querySelector('span');

        if (!buttonText) {
            console.error('Button text span not found');
            return;
        }

        // Update button immediately
        this.sendButton.disabled = true;
        buttonText.textContent = `Wait ${remaining}s`;

        // Update every second
        this.cooldownTimer = setInterval(() => {
            remaining--;
            if (remaining > 0) {
                buttonText.textContent = `Wait ${remaining}s`;
                this.sendButton.disabled = true; // Ensure button stays disabled
            } else {
                // Cooldown complete - reset button
                buttonText.textContent = 'Send';
                this.sendButton.disabled = false;
                clearInterval(this.cooldownTimer);
                this.cooldownTimer = null;
            }
        }, 1000);
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
