export interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Is registration or entry really 100% free?",
    answer: "Yes, absolutely! ZUNOON is entirely free for all students of LNJPIT Chapra. There are zero registration fees, zero gate entry charges, and no paid pass tiers. Just complete the free registration form on this website to generate your digital attendance pass.",
    tag: "Registration"
  },
  {
    question: "Who is eligible to compete in Mr. & Ms. Freshers?",
    answer: "Mr. & Ms. Freshers is exclusively open to all newly admitted 1st Year (Fresher) students across all engineering branches (CSE, Civil, Mechanical, Electrical, FPP, M&C) of LNJPIT Chapra. You can indicate your interest directly on the registration form.",
    tag: "Eligibility"
  },
  {
    question: "How do I get my digital attendance QR pass?",
    answer: "After submitting your details (Name, Roll / Registration Number, Branch, Contact) on our Free Registration form, an authenticated digital pass with a unique QR code and Admit ID is generated immediately on screen and saved locally to your device. You can download or screenshot it for gate verification.",
    tag: "Entry Pass"
  },
  {
    question: "What documents must I carry to the fest?",
    answer: "All students must carry their official LNJPIT College ID Card (or temporary admission receipt / fee slip for newly enrolled 1st-year students whose physical cards are in process) alongside the digital attendance QR pass on their phone.",
    tag: "Campus Safety"
  },
  {
    question: "Can senior students (2nd, 3rd, and 4th year) attend?",
    answer: "Of course! ZUNOON is organized by senior batches to officially welcome our new juniors. Seniors participate in organizing committees, cheer in audience arenas, and join in the evening DJ and music celebration.",
    tag: "Community"
  },
  {
    question: "What is the recommended dress code for ZUNOON?",
    answer: "For the morning inauguration and Mr. & Ms. Freshers pageant: Traditional Indian Ethnic wear or sharp Formals. For the evening musical celebrations: Comfortable festive party wear.",
    tag: "Guidelines"
  }
];
