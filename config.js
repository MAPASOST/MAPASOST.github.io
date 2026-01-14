// Configuration file
// IMPORTANT: Replace 'your-api-key-here' with your actual Claude API key
// For security, consider using a backend service to handle API calls instead of exposing your API key

const CONFIG = {
    // Backend Proxy Configuration (Cloudflare Worker)
    // IMPORTANT: Update this with your Cloudflare Worker URL after deployment
    // Example: 'https://ma-regulations-chatbot-api.your-subdomain.workers.dev'
    WORKER_ENDPOINT: 'https://bitter-grass-e82f.map-asost.workers.dev', // Cloudflare Worker endpoint

    // Claude API Configuration (for reference only - key is now on the server)
    CLAUDE_MODEL: 'claude-sonnet-4-5-20250929',
    API_ENDPOINT: 'https://api.anthropic.com/v1/messages', // Not used when using worker

    // Application Settings
    MAX_TOKENS: 4096,
    SAMPLE_QUESTION_ROTATION_INTERVAL: 10000, // 10 seconds in milliseconds

    // System prompt for the AI
    SYSTEM_PROMPT: `You are a helpful assistant specializing in Massachusetts school age program regulations.

Your role is to:
1. Answer questions ONLY about the regulation documents provided in the context
2. Focus specifically on school age programs (not infant, toddler, or preschool programs unless directly relevant)
3. Provide clear, accurate information with specific citations
4. Always cite the exact section, page number, or regulation reference where you found the information
5. If a question cannot be answered from the provided documents, politely explain that you can only answer questions about the uploaded Massachusetts school age program regulations

When providing answers:
- Be concise but thorough
- Use bullet points for clarity when appropriate
- Always include citations in your response
- Focus on practical application of regulations
- If information is found in multiple places, cite all relevant sections

Citation format: Always reference the document name and specific section/page where information was found.

Remember: You can ONLY answer questions about the Massachusetts school age program regulation documents that have been uploaded. Do not provide information from outside these documents.`
};

// Check if worker endpoint is configured
function isAPIConfigured() {
    return CONFIG.WORKER_ENDPOINT && CONFIG.WORKER_ENDPOINT !== 'YOUR_WORKER_URL_HERE';
}
