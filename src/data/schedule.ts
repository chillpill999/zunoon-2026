export interface ScheduleSlot {
  time: string;
  title: string;
  category: string;
  venue: string;
  description: string;
  status: "Confirmed" | "Tentative";
  color: string;
}

export const FEST_SCHEDULE: ScheduleSlot[] = [
  {
    time: "09:30 AM - 10:30 AM",
    title: "Inaugural Ceremony & Lamp Lighting",
    category: "Formal",
    venue: "Main Auditorium",
    description: "Welcome address by Honorable Principal, HODs, Student Council speech, and auspicious Saraswati Vandana.",
    status: "Confirmed",
    color: "#f59e0b"
  },
  {
    time: "10:45 AM - 12:15 PM",
    title: "Awaaz: The Nukkad Natak Face-Off",
    category: "Dramatics",
    venue: "Central Quad Lawn",
    description: "High-intensity street plays presented by diverse departments tackling social realism and student life.",
    status: "Confirmed",
    color: "#ef4444"
  },
  {
    time: "12:30 PM - 01:45 PM",
    title: "Sur Sargam: Solo & Duet Singing",
    category: "Music",
    venue: "Auditorium Acoustic Arena",
    description: "Acoustic covers, classical melodies, and soulful renditions competing for the Voice of LNJPIT trophy.",
    status: "Confirmed",
    color: "#3b82f6"
  },
  {
    time: "01:45 PM - 02:30 PM",
    title: "Lunch Break & Campus Icebreakers",
    category: "Informal",
    venue: "Campus Ground & Canteen Area",
    description: "Branch interaction circles, photo booth, and informal acoustic guitar jamming on the lawn.",
    status: "Confirmed",
    color: "#06b6d4"
  },
  {
    time: "02:30 PM - 04:00 PM",
    title: "Beat Drop: Dance Showdown",
    category: "Dance",
    venue: "Auditorium Main Stage",
    description: "Electrifying solo, duo, and group dance battles spanning hip-hop, contemporary, and Bollywood.",
    status: "Confirmed",
    color: "#ec4899"
  },
  {
    time: "04:15 PM - 06:15 PM",
    title: "Mr. & Ms. Freshers: The Grand Pageant",
    category: "Pageant",
    venue: "Auditorium Stage",
    description: "Ramp walk, talent exhibition, and rapid-fire judge interactions to crown the freshers monarchs.",
    status: "Confirmed",
    color: "#f59e0b"
  },
  {
    time: "06:30 PM - 07:15 PM",
    title: "Award Ceremony & Memento Distribution",
    category: "Ceremony",
    venue: "Auditorium Stage",
    description: "Honoring winners across all categories, departmental trophies, and token of gratitude to faculty guides.",
    status: "Confirmed",
    color: "#10b981"
  },
  {
    time: "07:30 PM - 10:00 PM",
    title: "The Euphoria: Live DJ Night & Celebration",
    category: "Concert",
    venue: "Open Air Amphitheatre Ground",
    description: "High-energy festival closing party with live DJ mixing, bass drops, and batch celebration under the stars.",
    status: "Confirmed",
    color: "#f43f5e"
  }
];
