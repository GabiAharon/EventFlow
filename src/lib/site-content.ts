export type Locale = "he" | "en";

type EventCard = {
  title: string;
  date: string;
  attendance: string;
  mood: string;
};

type RecommendationCard = {
  title: string;
  category: string;
  location: string;
  budget: string;
  note: string;
};

type Copy = {
  dir: "rtl" | "ltr";
  nav: {
    create: string;
    organizer: string;
    recommendations: string;
    event: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    blurb: string;
    primary: string;
    secondary: string;
    trust: string;
  };
  stats: Array<{ label: string; value: string }>;
  pillars: Array<{ title: string; blurb: string }>;
  events: EventCard[];
  recommendations: RecommendationCard[];
  checklistTitle: string;
  checklist: string[];
  bringTitle: string;
  bringList: Array<{ item: string; owner: string }>;
  create: {
    title: string;
    subtitle: string;
    steps: string[];
  };
  eventPage: {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    attendance: string;
    primary: string;
    secondary: string;
    maybe: string;
  };
  recommendationsTitle: string;
  recommendationsSubtitle: string;
};

const he: Copy = {
  dir: "rtl",
  nav: {
    create: "יצירת אירוע",
    organizer: "לוח מארגן",
    recommendations: "המלצות",
    event: "דף אירוע",
  },
  hero: {
    eyebrow: "EventFlow למארגנים שרוצים להיראות מסודרים ולהרגיש רגועים",
    title: "יוצרים אירוע, שולחים לינק, אוספים אישורי הגעה ומנהלים את היום עצמו בלי בלגן.",
    blurb:
      "האפליקציה בנויה למשפחות, קהילות ו-HR שרוצים מסלול מהיר ויפה: דף אירוע ציבורי, לוח מארגן, רשימות הבאה, המלצות לפי סוג אירוע וצ'ק-אין אופליין ליום האירוע.",
    primary: "להתחיל אירוע חדש",
    secondary: "לראות אירוע לדוגמה",
    trust:
      "בלי רישום לאורחים, עם עברית כברירת מחדל, אפשרות לקוד גישה, והתראות תפעוליות בלבד.",
  },
  stats: [
    { label: "זמן הקמה", value: "פחות מ-5 דקות" },
    { label: "אישור הגעה", value: "3 לחיצות" },
    { label: "יום האירוע", value: "צ'ק-אין אופליין" },
  ],
  pillars: [
    {
      title: "שיתוף מיידי",
      blurb: "לינק קצר, WhatsApp, QR ו-share sheet בלי לייצר חיכוך מיותר.",
    },
    {
      title: "לוח מארגן אמיתי",
      blurb: "אישורי הגעה, רשימות פנימיות ומה כל אורח מביא, כולם באותו מקום.",
    },
    {
      title: "זיכרון לאירוע הבא",
      blurb: "המלצות לפי נושא האירוע, עם טווחי עלות והערות פרקטיות מהשטח.",
    },
  ],
  events: [
    {
      title: "יום הולדת דניאל",
      date: "שבת, 15.3 · 17:00",
      attendance: "47 מתוך 50 אישרו הגעה",
      mood: "אירוע משפחתי · גיל 3",
    },
    {
      title: "Happy Hour מוצר",
      date: "חמישי, 21.3 · 19:30",
      attendance: "22 מתוך 35 אישרו הגעה",
      mood: "אירוע פנימי · צוות מוצר",
    },
  ],
  recommendations: [
    {
      title: "ג'ימבורי עננים",
      category: "יום הולדת · גיל 3",
      location: "ראשון לציון",
      budget: "4,500-6,000 ₪",
      note: "מקום סגור, ממוזג וקל להורים. מתאים במיוחד כשלא רוצים להפיק אירוע מסובך.",
    },
    {
      title: "טרסה 18",
      category: "מסיבת גיוס · בן 18",
      location: "מרכז",
      budget: "8,000-12,000 ₪",
      note: "טוב לאירוע ערב עם מוזיקה ותאורה, ופחות מתאים לאירועי ילדים.",
    },
  ],
  checklistTitle: "צ'קליסט פנימי למארגן",
  checklist: ["לאשר עיצוב הזמנה", "לסגור מפעיל או ספק ראשי", "להכין שילוט QR לצ'ק-אין", "להוסיף המלצות אחרי האירוע"],
  bringTitle: "מה האורחים מביאים",
  bringList: [
    { item: "פיתות ללא גלוטן", owner: "תמר" },
    { item: "פירות חתוכים", owner: "משפחת לוי" },
    { item: "כוסות", owner: "פתוח" },
  ],
  create: {
    title: "מסלול יצירת אירוע",
    subtitle: "סוג האירוע משנה את ברירות המחדל, את ההמלצות ואת הקצב של הטופס.",
    steps: [
      "פרטים: שם, תאריך, מיקום, תמונת כותרת וקישור Waze או Maps",
      "הגדרות: שאלות אישור הגעה, bring list, צ'קליסט פנימי, מגבלת משתתפים וקוד גישה",
      "שיתוף: לינק קצר, WhatsApp, QR ו-share sheet",
    ],
  },
  eventPage: {
    title: "יום הולדת דניאל",
    subtitle: "מוזמנים כל הורי הכיתה. נשמח לאישור הגעה עד 12.3",
    date: "שבת, 15.3 · 17:00",
    location: "ג'ימבורי עננים, ראשון לציון",
    attendance: "31 אישרו הגעה · 8 לא מגיעים · 11 מקומות פנויים",
    primary: "אני מגיע/ה",
    secondary: "לא מגיע/ה",
    maybe: "אולי",
  },
  recommendationsTitle: "מאגר המלצות לפי סוג האירוע",
  recommendationsSubtitle:
    "יום הולדת לילד בן 3 לא צריך לראות את אותן המלצות כמו מסיבת גיוס. שכבת הידע מסודרת לפי נושא ותת-נושא.",
};

const en: Copy = {
  dir: "ltr",
  nav: {
    create: "Create event",
    organizer: "Organizer board",
    recommendations: "Recommendations",
    event: "Event page",
  },
  hero: {
    eyebrow: "EventFlow for organizers who want calm control and a polished look",
    title: "Create the event, send one link, collect attendance confirmations, and run the day without chaos.",
    blurb:
      "Built for families, communities, and internal teams that need a fast, beautiful flow: a public event page, organizer board, bring lists, topic-based recommendations, and offline check-in for event day.",
    primary: "Start a new event",
    secondary: "View sample event",
    trust:
      "No guest login required, Hebrew by default, optional access codes, and operational notifications only.",
  },
  stats: [
    { label: "Setup time", value: "Under 5 min" },
    { label: "Confirmation flow", value: "3 taps" },
    { label: "Event day", value: "Offline check-in" },
  ],
  pillars: [
    {
      title: "Instant sharing",
      blurb: "Short link, WhatsApp, QR, and native share without friction.",
    },
    {
      title: "A real organizer board",
      blurb: "Attendance confirmations, private tasks, and shared item ownership all stay visible together.",
    },
    {
      title: "Memory for the next event",
      blurb: "Recommendations by event topic, with budget context and practical notes from real organizers.",
    },
  ],
  events: [
    {
      title: "Daniel's Birthday",
      date: "Sat, Mar 15 · 17:00",
      attendance: "47 of 50 confirmed attendance",
      mood: "Family event · Age 3",
    },
    {
      title: "Product Happy Hour",
      date: "Thu, Mar 21 · 19:30",
      attendance: "22 of 35 confirmed attendance",
      mood: "Internal event · Product team",
    },
  ],
  recommendations: [
    {
      title: "Clouds Play Gym",
      category: "Birthday · Age 3",
      location: "Rishon LeZion",
      budget: "₪4,500-6,000",
      note: "Indoor, air-conditioned, and easy for parents. Strong fit when you want a simpler production load.",
    },
    {
      title: "Terrace 18",
      category: "Enlistment party · Age 18",
      location: "Central district",
      budget: "₪8,000-12,000",
      note: "Better for evening celebrations with music and lighting, not for children-focused events.",
    },
  ],
  checklistTitle: "Private organizer checklist",
  checklist: ["Approve invite design", "Lock the main vendor", "Prepare QR signage", "Add recommendation notes after the event"],
  bringTitle: "What guests are bringing",
  bringList: [
    { item: "Gluten-free pita", owner: "Tamar" },
    { item: "Cut fruit", owner: "Levi family" },
    { item: "Cups", owner: "Open" },
  ],
  create: {
    title: "Event creation flow",
    subtitle: "The event theme changes defaults, recommendations, and how much setup the organizer needs.",
    steps: [
      "Details: name, date, location, cover image, and Waze or Maps link",
      "Settings: attendance questions, bring list, private checklist, attendance cap, and access code",
      "Sharing: short link, WhatsApp, QR, and share sheet",
    ],
  },
  eventPage: {
    title: "Daniel's Birthday",
    subtitle: "All class parents are invited. Please confirm attendance by Mar 12.",
    date: "Sat, Mar 15 · 17:00",
    location: "Clouds Play Gym, Rishon LeZion",
    attendance: "31 confirmed attendance · 8 not coming · 11 spots left",
    primary: "I'm coming",
    secondary: "Can't make it",
    maybe: "Maybe",
  },
  recommendationsTitle: "Recommendations organized by event topic",
  recommendationsSubtitle:
    "A birthday for a three-year-old should not surface the same ideas as an enlistment party. The knowledge layer is topic-aware.",
};

export function getCopy(locale: Locale): Copy {
  return locale === "en" ? en : he;
}
