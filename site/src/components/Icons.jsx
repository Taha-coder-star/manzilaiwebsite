// Small inline SVG icons, all decorative (aria-hidden). Sizing and colour come from CSS.

export const Arrow = () => <span className="arr" aria-hidden="true" />;

export const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* dashboard top bar */
export const ChatTab = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" /></svg>
);
export const HomeTab = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" /></svg>
);
export const PeopleTab = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6zM16 5.5a3.2 3.2 0 010 6M18 14c2.5.7 3.5 2.8 3.5 6H18" />
  </svg>
);
export const Bell = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 17V11a6 6 0 1112 0v6l1.5 2h-15z M10 21h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* WhatsApp header */
export const Back = () => (
  <svg className="wa__back" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Video = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="6.5" width="12" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M15 11l5.5-3v8L15 13z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
export const Call = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005 5L15.5 12.5l4 1.5v3a2 2 0 01-2 2A13.5 13.5 0 014.500 6a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
export const MoreDots = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="5.5" r="1.8" fill="currentColor" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <circle cx="12" cy="18.5" r="1.8" fill="currentColor" />
  </svg>
);

/* WhatsApp message bar */
export const Emoji = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 14a4.5 4.5 0 007 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="9" cy="10" r="1.1" fill="currentColor" />
    <circle cx="15" cy="10" r="1.1" fill="currentColor" />
  </svg>
);
export const Clip = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.5 8.5l-6.800 6.800a2 2 0 002.800 2.800l7-7a4 4 0 00-5.700-5.600l-7.200 7.200a6 6 0 008.500 8.500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Camera = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 8.5A1.5 1.5 0 015.500 7H8l1.500-2h5L16 7h2.500A1.5 1.5 0 0120 8.500v9a1.5 1.5 0 01-1.500 1.500h-13A1.5 1.5 0 014 17.500z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
export const Mic = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
    <path d="M5.5 11a6.500 6.500 0 0013 0M12 17.500V21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* message ticks (sent + delivered) */
export const Ticks = () => (
  <svg viewBox="0 0 16 11" aria-hidden="true">
    <path d="M1 6l3 3 6-7M6 9l1 .5 6-7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ReplayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 12a8 8 0 11-2.6-5.9M20 4v4.5h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
