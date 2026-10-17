import { FAQS } from '@/data/faq';
import { FEST_CONFIG } from '@/data/config';
import { FEST_EVENTS } from '@/data/events';

export default function StructuredData() {
  const baseUrl = 'https://zunoon-2026.vercel.app';

  // 1. Festival Event Schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    name: 'AARAMBH 2.0 - LNJPIT Freshers Festival 2026',
    alternateName: 'Aarambh 2.0',
    description:
      'The premier annual cultural welcome festival and freshers orientation of Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra, Bihar.',
    url: baseUrl,
    image: [
      `${baseUrl}/aarambh_logo_official.png`,
      `${baseUrl}/about_collage.jpg`,
      `${baseUrl}/hero_poster.jpg`,
    ],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2026-11-15T09:00:00+05:30',
    endDate: '2026-11-17T22:00:00+05:30',
    location: {
      '@type': 'Place',
      name: 'LNJPIT Main Campus Grounds & Auditorium',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Silao - Chapra Road, Near ITI',
        addressLocality: 'Chapra',
        addressRegion: 'Bihar',
        postalCode: '841302',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: FEST_CONFIG.institution,
      url: 'https://lnjpit.ac.in',
      logo: `${baseUrl}/aarambh_logo_official.png`,
      sameAs: [
        FEST_CONFIG.socials.instagram,
        FEST_CONFIG.socials.hothlali,
        FEST_CONFIG.socials.youtube,
        'https://www.confessionlnjpit.in/',
      ].filter(Boolean),
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/#events`,
      validFrom: '2026-10-01',
    },
    subEvent: FEST_EVENTS.slice(0, 15).map((e) => ({
      '@type': 'Event',
      name: `${e.title} (${e.clubName})`,
      description: e.description,
      location: {
        '@type': 'Place',
        name: e.venue,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  // 2. FAQ Page Schema (Eligible for Google FAQ Rich Snippets in SERP)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 3. College / Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: FEST_CONFIG.institution,
    alternateName: FEST_CONFIG.shortInstitution,
    url: 'https://lnjpit.ac.in',
    logo: `${baseUrl}/aarambh_logo_official.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Silao - Chapra Road, Near ITI',
      addressLocality: 'Chapra',
      addressRegion: 'Bihar',
      postalCode: '841302',
      addressCountry: 'IN',
    },
    sameAs: [
      FEST_CONFIG.socials.instagram,
      FEST_CONFIG.socials.hothlali,
      FEST_CONFIG.socials.youtube,
      'https://www.confessionlnjpit.in/',
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
