export interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Is registration or entry really 100% free?",
    answer: "Yes, absolutely! AARAMBH 2.0 is entirely free for all students of LNJPIT Chapra. There are zero registration fees, zero gate entry charges, and no paid pass tiers. Just choose your club and register for competitions directly on this website.",
    tag: "Registration"
  },
  {
    question: "Who is eligible to compete in Mr. & Ms. Freshers?",
    answer: "Mr. & Ms. Freshers is exclusively open to all newly admitted 1st Year (Fresher) students across all engineering branches (CSE, Civil, Mechanical, EEE, FPP, M&C) of LNJPIT Chapra. You can indicate your interest directly on the registration form.",
    tag: "Eligibility"
  },
  {
    question: "Can senior students (2nd, 3rd, and 4th year) attend?",
    answer: "Of course! AARAMBH 2.0 is organized by senior batches to officially welcome our new juniors. Seniors participate in organizing committees, cheer in audience arenas, and join in the evening DJ and music celebration.",
    tag: "Community"
  },
  {
    question: "What is the recommended dress code for AARAMBH 2.0?",
    answer: "For the morning inauguration and Mr. & Ms. Freshers pageant: Traditional Indian Ethnic wear or sharp Formals. For the evening musical celebrations: Comfortable festive party wear.",
    tag: "Guidelines"
  }
];
