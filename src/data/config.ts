export interface FestConfig {
  name: string;
  type: string;
  tagline: string;
  institution: string;
  shortInstitution: string;
  location: string;
  dateStatus: string;
  confirmedDate?: string;
  venueStatus: string;
  confirmedVenue?: string;
  registration: {
    isFree: boolean;
    label: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string[];
    campusAddress: string;
  };
  socials: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export const FEST_CONFIG: FestConfig = {
  name: "ZUNOON",
  type: "College Freshers Fest",
  tagline: "A New Chapter. One Campus. Endless Memories.",
  institution: "Loknayak Jai Prakash Institute of Technology (LNJPIT)",
  shortInstitution: "LNJPIT Chapra",
  location: "Chapra, Bihar",
  dateStatus: "Dates to be announced soon",
  confirmedDate: "November 2026", // Configurable placeholder
  venueStatus: "Main Auditorium & Campus Grounds, LNJPIT Chapra",
  confirmedVenue: "LNJPIT Campus, Chapra, Bihar",
  registration: {
    isFree: true,
    label: "Completely Free",
    description: "Zero fees, zero charges. Free entry & registration for all LNJPIT students and incoming freshers."
  },
  contact: {
    email: "zunoon.lnjpit@gmail.com",
    phone: ["+91 9122334455", "+91 9835112233"],
    campusAddress: "LNJPIT Campus, Near ITI, Silao - Chapra Road, Chapra, Bihar 841302"
  },
  socials: {
    instagram: "https://instagram.com/zunoon_lnjpit",
    youtube: "https://youtube.com/@zunoon_lnjpit"
  }
};
