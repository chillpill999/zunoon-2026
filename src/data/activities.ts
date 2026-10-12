export interface ActivityItem {
  id: string;
  title: string;
  category: "Pageant" | "Music" | "Dance" | "Dramatics" | "Gaming" | "Literary" | "Informal";
  badge: string;
  color: string;
  status: "Confirmed" | "Draft";
  venue: string;
  timeSlot: string;
  isTeam: boolean;
  minTeam?: number;
  maxTeam?: number;
  description: string;
  rules: string[];
  coordinators: { name: string; phone?: string }[];
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "mr-ms-freshers",
    title: "Mr. & Ms. Freshers",
    category: "Pageant",
    badge: "SIGNATURE EVENT",
    color: "#f59e0b", // Amber
    status: "Confirmed",
    venue: "Main Auditorium Stage",
    timeSlot: "Evening Grand Slot",
    isTeam: false,
    description: "The most prestigious title of Zunoon! A three-stage showdown testing personality, style, confidence, quick wit, and stage charisma.",
    rules: [
      "Open exclusively to 1st Year (Freshers) students of LNJPIT Chapra.",
      "Round 1: Traditional / Western Ramp Walk & Personal Introduction (1 minute).",
      "Round 2: Talent Showcase (Singing, Dancing, Mimicry, Poetry, or special talent - 2 mins).",
      "Round 3: Rapid Fire Q&A with Faculty & Senior Jury.",
      "Judging criteria: Elegance, stage presence, spontaneous wit, and audience connection."
    ],
    coordinators: [
      { name: "Aman Kumar", phone: "+91 9122001122" },
      { name: "Pooja Sharma", phone: "+91 9835003344" }
    ]
  },
  {
    id: "beat-drop-dance",
    title: "Beat Drop: Dance Face-Off",
    category: "Dance",
    badge: "SOLO & DUO",
    color: "#ec4899", // Pink
    status: "Confirmed",
    venue: "Auditorium Main Stage",
    timeSlot: "Afternoon Slot",
    isTeam: true,
    minTeam: 1,
    maxTeam: 4,
    description: "High-octane choreography battle spanning Bollywood, Hip-Hop, Popping, Contemporary, and Freestyle beats.",
    rules: [
      "Time limit: 3 to 5 minutes per performance.",
      "Audio track must be submitted in MP3 format to coordinators 3 hours prior.",
      "Props are allowed but must be pre-approved (no hazardous materials).",
      "Judging criteria: Choreography, rhythm sync, energy, expressions, and stage coverage."
    ],
    coordinators: [
      { name: "Rahul Verma", phone: "+91 9470112233" }
    ]
  },
  {
    id: "sur-sargam-music",
    title: "Sur Sargam: Voice of LNJPIT",
    category: "Music",
    badge: "SINGING",
    color: "#3b82f6", // Blue
    status: "Confirmed",
    venue: "Auditorium Acoustic Arena",
    timeSlot: "Mid-day Slot",
    isTeam: false,
    description: "Unleash your vocal prowess in acoustic, classical, or Bollywood melodies. Dedicated live accompaniments permitted.",
    rules: [
      "Time limit: 4 minutes (including sound check).",
      "Backing tracks (karaoke) or single live acoustic instrument (guitar/keyboard) permitted.",
      "Judging criteria: Sur, taal, vocal range, clarity, and overall stage presentation."
    ],
    coordinators: [
      { name: "Sneha Sinha", phone: "+91 9934223344" }
    ]
  },
  {
    id: "nukkad-natak",
    title: "Awaaz: The Street Play",
    category: "Dramatics",
    badge: "GROUP DRAMA",
    color: "#ef4444", // Red
    status: "Confirmed",
    venue: "Central Quadrangle / Lawn",
    timeSlot: "Morning Slot",
    isTeam: true,
    minTeam: 6,
    maxTeam: 15,
    description: "Powerful acoustic dramatics and high-intensity vocal delivery addressing campus transitions, dreams, and real societal challenges.",
    rules: [
      "Team size: 6 to 15 performers.",
      "Time limit: 12 to 15 minutes.",
      "Only live acoustic instruments (Dholak, Daflis, Harmonium, Chimes) allowed. No electronic mics.",
      "Script must be original or appropriately adapted. Decorum must be strictly maintained."
    ],
    coordinators: [
      { name: "Vikram Raj", phone: "+91 9122889900" }
    ]
  },
  {
    id: "open-mic-humor",
    title: "Mic Drop: Stand-Up & Shayari",
    category: "Literary",
    badge: "COMEDY & POETRY",
    color: "#8b5cf6", // Violet
    status: "Confirmed",
    venue: "Seminar Hall 1",
    timeSlot: "Afternoon Slot",
    isTeam: false,
    description: "Laughter, punchlines, witty college observations, and soul-stirring Hindi/Urdu shayari.",
    rules: [
      "Time limit: 4 to 5 minutes.",
      "No offensive, hate-speech, or defamatory personal attacks permitted.",
      "Original material earns bonus scoring from the student audience vote."
    ],
    coordinators: [
      { name: "Aditya Mishra", phone: "+91 9835778899" }
    ]
  },
  {
    id: "esports-clash",
    title: "LAN Arena: BGMI & Free Fire",
    category: "Gaming",
    badge: "ESPORTS",
    color: "#10b981", // Emerald
    status: "Draft",
    venue: "Computer Center / Room 204",
    timeSlot: "Parallel Sessions",
    isTeam: true,
    minTeam: 4,
    maxTeam: 4,
    description: "Squad tactical combat on the battlegrounds. Fast reflexes, clutch revives, and chicken dinner glory.",
    rules: [
      "Squad format (4 players per squad).",
      "Matches played on custom festival rooms with spectator anti-cheat monitoring.",
      "Players must use their own registered devices and college Wi-Fi / mobile networks.",
      "Emulators and iPad/tablet aspect ratio triggers are strictly prohibited."
    ],
    coordinators: [
      { name: "Rohit Kumar", phone: "+91 9122445566" }
    ]
  },
  {
    id: "campus-icebreakers",
    title: "Campus Icebreakers & Fun Arena",
    category: "Informal",
    badge: "OPEN FOR ALL",
    color: "#06b6d4", // Cyan
    status: "Confirmed",
    venue: "Sports Ground Lawn",
    timeSlot: "All-Day Interactive",
    isTeam: true,
    minTeam: 2,
    maxTeam: 8,
    description: "Tug-of-war branch rivalries, musical chairs, balloon stomping, treasure hunts, and spot challenge games.",
    rules: [
      "Spot registrations permitted on the ground.",
      "Branch vs Branch friendly match-ups encouraged.",
      "Instant spot merchandise and celebration prizes awarded on completion."
    ],
    coordinators: [
      { name: "Kunal Pandey", phone: "+91 9835990011" }
    ]
  },
  {
    id: "celebration-dj-night",
    title: "The Euphoria: Freshers DJ Night",
    category: "Music",
    badge: "GRAND FINALE",
    color: "#f43f5e", // Rose
    status: "Confirmed",
    venue: "Open Air Amphitheatre Ground",
    timeSlot: "Night Grand Finale (7:00 PM onwards)",
    isTeam: false,
    description: "The ultimate freshers bash! Pulsating bass drops, concert lighting, fog effects, and a dance floor for the entire batch to celebrate together.",
    rules: [
      "Valid Zunoon Free Digital Entry Pass required at the gate.",
      "College ID Card mandatory for entry.",
      "Strict campus security and discipline enforced by student council and faculty marshals."
    ],
    coordinators: [
      { name: "Zunoon Core Team", phone: "+91 9122334455" }
    ]
  }
];
