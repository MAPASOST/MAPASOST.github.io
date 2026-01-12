// Document Management System
// This file contains the regulation documents and sample questions

const DOCUMENTS = {
    // Add your regulation documents here
    // Each document should have: name, description, and content (full text of the regulation)
    documents: [
        {
            id: 'sample-doc',
            name: 'Sample Document',
            description: 'Placeholder - Replace with actual regulations',
            content: `This is a placeholder document.

To add your actual Massachusetts school age program regulation documents:
1. Open documents.js file
2. Replace this content with the full text of your regulation documents
3. Add multiple documents by creating additional objects in the 'documents' array

Example:
{
    id: 'ma-606-regulations',
    name: '606 CMR 7.00: Standards for School Age Child Care Programs',
    description: 'Massachusetts regulations for school age child care programs',
    content: 'FULL TEXT OF THE REGULATION DOCUMENT HERE...'
}

Make sure to include the complete text of each regulation document so the AI can properly search and cite specific sections.`
        }
    ],

    // Sample questions that will rotate in the sidebar
    sampleQuestions: [
        "What are the staff-to-child ratio requirements for school age programs?",
        "What are the licensing requirements for school age child care programs?",
        "What qualifications must directors of school age programs have?",
        "What are the health and safety requirements for school age facilities?",
        "What documentation is required for enrollment of children?",
        "What are the requirements for outdoor play spaces?",
        "What are the meal and snack requirements for full-day programs?",
        "What background check requirements apply to staff members?",
        "What are the requirements for transportation of children?",
        "What emergency preparedness plans are required?",
        "What are the requirements for administering medication?",
        "What policies must be provided to parents?",
        "What are the supervision requirements during field trips?",
        "What training requirements exist for staff?",
        "What are the requirements for program activities and curriculum?"
    ],

    // Get all document contents combined for the AI context
    getAllDocumentContent() {
        return this.documents.map(doc => {
            return `=== DOCUMENT: ${doc.name} ===
Description: ${doc.description}

${doc.content}

=== END OF DOCUMENT: ${doc.name} ===`;
        }).join('\n\n');
    },

    // Get a random subset of sample questions
    getRandomQuestions(count = 5) {
        const shuffled = [...this.sampleQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Get document list for display
    getDocumentList() {
        return this.documents.map(doc => ({
            name: doc.name,
            description: doc.description
        }));
    }
};

// Instructions for adding documents
console.log(`
═══════════════════════════════════════════════════════════
HOW TO ADD YOUR REGULATION DOCUMENTS:
═══════════════════════════════════════════════════════════

1. Open the 'documents.js' file in a text editor

2. Find the 'documents' array (around line 8)

3. Replace the sample document with your actual documents:

   documents: [
       {
           id: 'doc-id',
           name: 'Document Name',
           description: 'Brief description',
           content: \`Full text of the regulation document here.

           You can paste the entire document text.
           Include all sections, subsections, and text.\`
       },
       {
           id: 'another-doc',
           name: 'Another Document',
           description: 'Another description',
           content: \`Another full document text...\`
       }
   ]

4. You can also customize the sample questions in the
   'sampleQuestions' array to better match your documents

5. Save the file and refresh the website

═══════════════════════════════════════════════════════════
`);
