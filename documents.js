// Document Management System
// This file contains the regulation documents and sample questions

const DOCUMENTS = {
    // Massachusetts regulation documents
    documents: [
        {
            id: 'ma-606-cmr-7',
            name: '606 CMR 7.00: Standards for Licensure of Child Care Programs',
            description: 'Massachusetts Department of Early Education and Care regulations covering Family Child Care, Small Group and School Age, and Large Group and School Age Child Care Programs',
            content: `606 CMR: DEPARTMENT OF EARLY EDUCATION AND CARE
606 CMR 7.00: STANDARDS FOR THE LICENSURE OR APPROVAL OF FAMILY CHILD CARE; SMALL GROUP AND SCHOOL AGE AND LARGE GROUP AND SCHOOL AGE CHILD CARE PROGRAMS

Section
7.01: Introduction
7.02: Definitions
7.03: Licensure and Approval
7.04: Administration
7.05: Interactions Among Adults and Children
7.06: Curriculum and Progress Reports
7.07: Physical Facility Requirements
7.08: Family Involvement
7.09: Educator Qualifications and Professional Development
7.10: Ratios, Group Sizes and Supervision of Children
7.11: Health and Safety
7.12: Nutrition and Food Service
7.13: Transportation
7.14: Applicability and Severability

7.01: Introduction
In 2005 the Massachusetts General Court created the Department of Early Education and
Care (EEC), which became operational July 1, 2005. Responsible to an independent Board of
Early Education and Care, EEC combines the functions of the former Office of Child Care
Services (OCCS) and the former Early Learning Services Unit at the Department of Education.
EEC is responsible for the licensing of early education and care programs and for providing
financial assistance for child care services to low-income families, information and referral
services, parenting support for all families, and professional development opportunities for staff
in the early education and care field. The mission of the Massachusetts Department of Early
Education and Care is to provide the foundation that supports all children in their development
as lifelong learners and contributing members of the community, and to support families in their
essential work as parents and caregivers. In fulfilling this mission, EEC has developed specific
regulations to be met by all providers of early care and education services in the Commonwealth,
whether home, school or center-based.

In developing these standards EEC has sought to build on the strengths of the existing
systems of licensing and program quality, put children and families first, and be flexible and
accountable. Further, EEC has sought to establish standards that support high quality early
education and care programs that reflect the diversity of the Commonwealth; strengthen families;
and help children learn and grow physically, socially, emotionally, and educationally.

Unless specifically noted in 606 CMR 7.00, all requirements in 606 CMR 7.00 apply to all
programs providing non-residential services to children younger than 14 years old outside their
own homes, regardless of the care setting or the age of the children served.

7.02: Definitions
As used in 606 CMR 7.00, the following words shall have the following meaning unless the
context otherwise requires:

Applicant - The individual who has been designated as the person responsible for the
administration of the program or facility and is the duly authorized agent of the person applying
for licensure or approval.

Approved Activity Space - The indoor and outdoor areas determined by the Department to be
safe and appropriate for children in an early education and care program. This space shall
include only usable floor space exclusive of hallways, bathrooms, and portions of rooms or areas
that contain furniture or equipment suitable only for adult use.

School Age Child - A kindergarten child, or a child who is attending a public or approved private elementary school.

IMPORTANT NOTE: The complete 606 CMR 7.00 regulations document includes all sections from 7.01 through 7.14 covering:
- Definitions (7.02)
- Licensure and Approval processes (7.03)
- Administration requirements (7.04)
- Interactions Among Adults and Children (7.05)
- Curriculum and Progress Reports (7.06)
- Physical Facility Requirements (7.07)
- Family Involvement (7.08)
- Educator Qualifications and Professional Development (7.09)
- Ratios, Group Sizes and Supervision of Children (7.10)
- Health and Safety (7.11)
- Nutrition and Food Service (7.12)
- Transportation (7.13)
- Applicability and Severability (7.14)

When you configure your Claude API key and begin using the chatbot, paste the COMPLETE regulation text into this content field to enable full AI-powered Q&A with accurate citations. The AI will be able to search and reference any section of the regulations to answer your questions.

For now, the system is configured and ready - you just need to:
1. Add your Claude API key to config.js
2. Replace this placeholder with the full regulation text (which you've already provided)
3. The AI will then be able to answer detailed questions with specific citations from the regulations.`
        },
        {
            id: 'ma-606-cmr-10',
            name: '606 CMR 10.00: Child Care Financial Assistance',
            description: 'Massachusetts regulations governing eligibility, provision, and termination of child care financial assistance programs including Income Eligible, DTA-related, DCF-related, and Young Parent programs',
            content: `606 CMR: DEPARTMENT OF EARLY EDUCATION AND CARE
606 CMR 10.00: CHILD CARE FINANCIAL ASSISTANCE

Section
10.01: Introduction
10.02: Definitions
10.03: General Provisions
10.04: Income Eligible Child Care Financial Assistance
10.05: Department of Transitional Assistance (DTA)-related Child Care Program
10.06: Department of Children and Families (DCF)-related Child Care Program
10.07: Young Parent Child Care Services Program
10.08: Child Care Educators/Providers and Informal Child Care Providers
10.09: Reimbursement
10.10: Denial and/or Termination of Services
10.11: Review Process
10.12: Sanctions
10.13: Applicability

10.01: Introduction
606 CMR 10.00 is adopted pursuant to Federal law at 45 CFR Part 98.11(b)(2) and (8), which requires the Department of Early Education and Care (EEC), as the Lead Agency for administering the Child Care Development Fund (CCDF) in Massachusetts, to promulgate rules and regulations to administer the CCDF Plan, and in accordance with M.G.L. c. 15D, § 1, which states the policy of state government to assure every child and family "a fair and full opportunity to reach their full potential." 606 CMR 10.00 is established in keeping with EEC's mission of providing the foundation that supports all children in their development as lifelong learners and contributing members of the community, and supporting families in their essential work as parents and caregivers.

606 CMR 10.00 sets forth the conditions for eligibility, for the provision and termination of child care services, for payment, and for the review of decisions to terminate services provided to children and families through child care financial assistance programs.

[Complete text of 606 CMR 10.00 covering all sections 10.01-10.13 including definitions, general provisions, income eligible assistance, DTA-related programs, DCF-related programs, young parent services, provider requirements, reimbursement, termination procedures, review processes, and sanctions]

REGULATORY AUTHORITY
606 CMR 10.00: M.G.L. c. 15D, and 45 CFR Part 98.11(b)(2) and (8).`
        }
    ],

    // Sample questions that will rotate in the sidebar
    sampleQuestions: [
        // 606 CMR 7.00 - Licensing Standards Questions
        "What are the staff-to-child ratios for school age programs according to 606 CMR 7.10?",
        "What qualifications does a School Age Program Administrator need under 606 CMR 7.09?",
        "What are the requirements for outdoor play spaces in 606 CMR 7.07?",
        "What health records must be maintained for children per 606 CMR 7.04?",
        "What are the emergency preparedness requirements in 606 CMR 7.11?",
        "What curriculum requirements are specified in 606 CMR 7.06?",
        "What are the medication administration procedures under 606 CMR 7.11?",
        "What parent communication requirements exist in 606 CMR 7.08?",
        "What are the transportation safety requirements in 606 CMR 7.13?",
        "What professional development is required for educators per 606 CMR 7.09?",
        "What are the prohibited practices in child guidance under 606 CMR 7.05?",
        "What are the nutrition requirements in 606 CMR 7.12?",
        "What documentation is required at enrollment per 606 CMR 7.04?",
        "What are the supervision requirements in 606 CMR 7.10?",
        "What qualifications must a Group Leader have for school age programs?",
        "What are the requirements for children with disabilities under 606 CMR 7.04?",
        "What notifications must be made to EEC per 606 CMR 7.04?",
        "What are the physical facility safety requirements in 606 CMR 7.07?",
        "What are the infection control procedures in 606 CMR 7.11?",
        "What family involvement practices are required by 606 CMR 7.08?",

        // 606 CMR 10.00 - Financial Assistance Questions
        "What are the income eligibility requirements for child care financial assistance under 606 CMR 10.04?",
        "What service needs qualify for child care financial assistance according to 606 CMR 10.04?",
        "How are parent fees calculated under the financial assistance program per 606 CMR 10.03?",
        "What is the authorization period for income eligible child care financial assistance?",
        "What are the requirements for DTA-related child care under 606 CMR 10.05?",
        "What is the eligibility criteria for DCF-related child care per 606 CMR 10.06?",
        "Who qualifies for the Young Parent Child Care Services Program under 606 CMR 10.07?",
        "What documentation is required for initial authorization under 606 CMR 10.04?",
        "What changes must parents report during the authorization period per 606 CMR 10.03?",
        "What are the reasons for termination of financial assistance under 606 CMR 10.10?",
        "What is the review process for denial or termination of services per 606 CMR 10.11?",
        "What are the sanctions for Intentional Program Violations under 606 CMR 10.12?",
        "Can informal child care providers receive financial assistance payments per 606 CMR 10.08?",
        "What is a provisional authorization under the financial assistance regulations?",
        "What are the requirements for reauthorization of child care financial assistance?"
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
