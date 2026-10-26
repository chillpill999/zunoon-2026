export interface ScheduleSlot {
  time: string;
  title: string;
  category: string;
  venue: string;
  description: string;
  status: "Proposed" | "Approved";
  color: string;
  date?: string;
}

export const FEST_SCHEDULE: ScheduleSlot[] = [
  {
    time: "05:00 PM - 05:40 PM",
    title: "Inaugural Ceremony & Lamp Lighting",
    category: "Formal & Inaugural",
    venue: "Main LNJPIT Ground",
    description: "Auspicious Deep Prajwalan, Saraswati Vandana, and inspiring welcome address by the Principal, HODs, and student leads.",
    status: "Approved",
    color: "#f59e0b",
    date: "1 Nov 2026",
  },
  {
    time: "05:40 PM - 06:15 PM",
    title: "Official Partners & Sponsors Announcement",
    category: "Sponsorship & Partners",
    venue: "Main LNJPIT Ground",
    description: "Grand stage presentation and formal felicitation of festival title sponsors, event partners, media collaborators, and alumni benefactors.",
    status: "Approved",
    color: "#06b6d4",
    date: "1 Nov 2026",
  },
  {
    time: "06:15 PM - 07:00 PM",
    title: "Sur Sangam: Solo & Duet Singing",
    category: "Music & Vocals",
    venue: "Main LNJPIT Ground",
    description: "Acoustic chords, soulful Bollywood melodies, and classical harmonies competing for the prestigious Voice of LNJPIT trophy.",
    status: "Approved",
    color: "#3b82f6",
    date: "1 Nov 2026",
  },
  {
    time: "07:00 PM - 07:45 PM",
    title: "Beat Drop: Dance Showdown",
    category: "Dance & Choreography",
    venue: "Main LNJPIT Ground",
    description: "High-voltage solo popping, locking, synchronized group choreography, and dynamic hip-hop crew battles on the illuminated main stage.",
    status: "Approved",
    color: "#ec4899",
    date: "1 Nov 2026",
  },
  {
    time: "07:45 PM - 08:45 PM",
    title: "Mr. & Ms. Freshers: The Grand Pageant",
    category: "Runway & Pageant",
    venue: "Main LNJPIT Ground",
    description: "Signature runway walk, ethnic charisma, quick-fire talent round, and witty judge interactions to crown the freshers monarchs.",
    status: "Approved",
    color: "#eab308",
    date: "1 Nov 2026",
  },
  {
    time: "08:45 PM - 09:15 PM",
    title: "Award Ceremony & Memento Distribution",
    category: "Honors & Felicitation",
    venue: "Main LNJPIT Ground",
    description: "Honoring champions across all 29 competitions, awarding departmental trophies, and felicitating student organizing leads with mementos.",
    status: "Approved",
    color: "#10b981",
    date: "1 Nov 2026",
  },
  {
    time: "09:15 PM - 10:00 PM",
    title: "The Euphoria: Live DJ Night & Celebration",
    category: "Concert & Grand Finale",
    venue: "Main LNJPIT Ground",
    description: "High-energy festival closing party with live DJ mixing, bass drops, laser light shows, and unforgettable batch celebrations under the night sky.",
    status: "Approved",
    color: "#f43f5e",
    date: "1 Nov 2026",
  },
];
