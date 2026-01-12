# Massachusetts School Age Program Regulations Guide

A professional, AI-powered website that helps users navigate complex regulations for school age programs in Massachusetts.

## Features

✨ **Clean Professional Interface** - Modern, responsive design optimized for both desktop and mobile devices

🤖 **AI-Powered Q&A** - Uses Claude AI to answer questions about Massachusetts school age program regulations

📚 **Document Management** - Displays all uploaded regulation documents with descriptions

💡 **Sample Questions** - Auto-rotating sample questions (refreshes every 10 seconds) to help users get started

🎯 **Accurate Citations** - AI responses include specific citations referencing the exact sections of documents

🔒 **Focused Responses** - AI only answers questions based on uploaded documents, ensuring accurate regulation guidance

## Live Demo

Visit the website at: https://MAPASOST.github.io

## 🚀 Quick Deployment

This chatbot uses a **secure backend proxy** (Cloudflare Workers) to keep your API key safe.

### Quick Start (5 minutes):
See [QUICKSTART.md](QUICKSTART.md) for step-by-step instructions.

### Detailed Instructions:
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

### Architecture:
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Cloudflare Workers (API proxy)
- **AI**: Claude API by Anthropic

Your API key is stored securely on Cloudflare Workers and never exposed to users.

### 2. Add Your Regulation Documents

To add your Massachusetts school age program regulation documents:

1. Open `documents.js` in a text editor
2. Find the `documents` array (around line 8)
3. Replace the sample document with your actual regulation documents:

```javascript
documents: [
    {
        id: 'ma-606-regulations',
        name: '606 CMR 7.00: Standards for School Age Child Care Programs',
        description: 'Massachusetts regulations for school age child care programs',
        content: `PASTE FULL TEXT OF THE REGULATION DOCUMENT HERE

        Include all sections, subsections, and complete text.
        The AI will use this to answer questions and provide citations.`
    },
    {
        id: 'another-document',
        name: 'Another Regulation Document',
        description: 'Brief description',
        content: `Full text of another document...`
    }
    // Add more documents as needed
]
```

**Tips for adding documents:**
- Include the complete text of each regulation
- Keep formatting simple (plain text works best)
- Include section numbers and headers for better citations
- You can add multiple documents to the array
- The AI will search across all documents to answer questions

### 3. Customize Sample Questions (Optional)

You can customize the sample questions that appear in the sidebar:

1. Open `documents.js`
2. Find the `sampleQuestions` array
3. Add, remove, or modify questions to match your documents:

```javascript
sampleQuestions: [
    "What are the staff-to-child ratio requirements?",
    "What qualifications must directors have?",
    "Your custom question here?",
    // Add more questions...
]
```

### 4. Deploy to GitHub Pages

Your site is already set up for GitHub Pages:

1. Push your changes to the repository
2. Go to repository Settings → Pages
3. Set source to the main branch
4. Your site will be available at https://MAPASOST.github.io

## File Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # Professional styling and responsive design
├── config.js           # API configuration and system prompts
├── documents.js        # Regulation documents and sample questions
├── app.js              # Main application logic and AI integration
└── README.md           # This file
```

## How It Works

1. **User Interface**: Clean, professional design with a chat interface and sidebar
2. **Sample Questions**: Rotates 5 random questions every 10 seconds to inspire users
3. **Document Loading**: All regulation documents are loaded into the AI's context
4. **Question Processing**: When a user asks a question, the AI searches all documents
5. **Citation Extraction**: AI provides answers with specific citations from the documents
6. **Focus**: AI only answers questions about the uploaded documents, not general queries

## Customization

### Changing Colors

Edit `styles.css` and modify the CSS variables in the `:root` section:

```css
:root {
    --primary-color: #2c5aa0;      /* Main brand color */
    --secondary-color: #1e3a5f;    /* Darker accent */
    --accent-color: #4a90e2;       /* Interactive elements */
    /* ... more colors ... */
}
```

### Adjusting Sample Question Rotation Time

Edit `config.js` and change the rotation interval (in milliseconds):

```javascript
SAMPLE_QUESTION_ROTATION_INTERVAL: 10000, // 10 seconds (10000 ms)
```

### Modifying AI Behavior

Edit the `SYSTEM_PROMPT` in `config.js` to change how the AI responds:

```javascript
SYSTEM_PROMPT: `Your custom instructions here...`
```

## Browser Compatibility

This website works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "API Key Not Configured" Error
- Make sure you've added your Claude API key in `config.js`
- Check that the key starts with `sk-ant-api03-`

### AI Not Providing Accurate Answers
- Ensure your documents are fully pasted into `documents.js`
- Check that document content includes section numbers and clear formatting
- Verify that questions relate to content actually in the documents

### Sample Questions Not Rotating
- Check browser console for JavaScript errors
- Ensure `documents.js` is properly loaded
- Verify the rotation interval setting in `config.js`

### Styling Issues
- Clear your browser cache
- Check that `styles.css` is loading properly
- Verify no browser extensions are interfering with the styles

## Privacy & Security

- All document content is stored in the frontend (no server database)
- API calls are made directly to Anthropic's Claude API
- No user data is stored or tracked
- For production, consider implementing a backend to secure your API key

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

## License

This project is provided as-is for educational and professional use.

---

**Made for Massachusetts School Age Program Administrators**

Helping navigate regulations with AI-powered assistance.
