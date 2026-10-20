export interface FestStatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface FestConfig {
  name: string;
  type: string;
  tagline: string;
  institution: string;
  shortInstitution: string;
  location: string;
  
  // Date configuration
  isDateConfirmed: boolean;
  dateStatus: string;
  dateAnnouncement: string;
  tentativeDate?: string;
  confirmedDate?: string;

  // Venue configuration
  isVenueConfirmed: boolean;
  venueStatus: string;
  confirmedVenue?: string;

  // Schedule status
  isSchedulePublished: boolean;
  scheduleAnnouncement: string;

  // Verified statistics
  stats: {
    freshersFootfall: FestStatItem;
    departments: FestStatItem;
    entryFee: FestStatItem;
    venueCampus: FestStatItem;
  };

  // Registration & Admission policy
  registration: {
    isFree: boolean;
    label: string;
    description: string;
    targetBatch: string;
  };

  // Organizers & Contacts
  organizer: {
    name: string;
    council: string;
    desk: string;
  };
  contact: {
    email: string;
    phone: string[];
    campusAddress: string;
  };
  socials: {
    instagram?: string;
    hothlali?: string;
    youtube?: string;
    linkedin?: string;
    confession?: string;
  };
}

export const FEST_CONFIG: FestConfig = {
  name: "AARAMBH 2.0",
  type: "College Freshers Fest",
  tagline: "A New Chapter. One Campus. Endless Memories.",
  institution: "Loknayak Jai Prakash Institute of Technology (LNJPIT)",
  shortInstitution: "LNJPIT Chapra",
  location: "Chapra, Bihar",
  
  // Official Date status (pending college administrative clearance)
  isDateConfirmed: false,
  dateStatus: "Dates to be announced upon administrative clearance",
  dateAnnouncement: "Official festival dates are currently awaiting administrative clearance from LNJPIT college authorities. Stay tuned for the official notice.",
  tentativeDate: "November 2026 (Tentative)",

  // Official Venue
  isVenueConfirmed: true,
  venueStatus: "Main LNJPIT Ground, LNJPIT Chapra",
  confirmedVenue: "LNJPIT Campus, Chapra, Bihar",

  // Schedule status (proposed vs confirmed)
  isSchedulePublished: false,
  scheduleAnnouncement: "The final chronological timetable is currently under review by the Cultural Committee and will be published upon official approval. The itinerary below represents the proposed schedule outline.",

  // Verified statistics (no exaggerated or unsupported claims)
  stats: {
    freshersFootfall: {
      value: "500",
      label: "INCOMING FRESHERS",
      subtext: "Batch 2026 Welcome",
    },
    departments: {
      value: "6",
      label: "ENGINEERING BRANCHES",
      subtext: "CSE, CE, ME, EEE, FPP, M&C",
    },
    entryFee: {
      value: "₹0",
      label: "100% FREE PASS",
      subtext: "Zero Registration Fee",
    },
    venueCampus: {
      value: "LNJPIT",
      label: "CAMPUS GROUNDS",
      subtext: "Chapra, Saran, Bihar",
    },
  },

  registration: {
    isFree: true,
    label: "Completely Free",
    description: "Zero fees, zero charges. Free entry & registration for all LNJPIT students and incoming freshers.",
    targetBatch: "Batch 2026 (1st Year Freshers)",
  },

  organizer: {
    name: "LNJPIT Cultural Council",
    council: "LNJPIT Student Council & Cultural Committee",
    desk: "Cultural Affairs Secretariat, LNJPIT Chapra",
  },

  contact: {
    email: "aarambh.lnjpit@gmail.com",
    phone: ["+91 9122334455", "+91 9835112233"],
    campusAddress: "LNJPIT Campus, Near ITI, Silao - Chapra Road, Chapra, Bihar 841302",
  },

  socials: {
    instagram: "https://www.instagram.com/aarambh_lnjpit_26/",
    hothlali: "https://www.instagram.com/hothlali_department/",
    youtube: "https://youtube.com/@aarambh_lnjpit",
    confession: "https://www.confessionlnjpit.in/",
  },
};
