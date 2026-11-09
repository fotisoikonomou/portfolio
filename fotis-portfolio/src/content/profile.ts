
import type { Locale } from "@/i18n/routing";
import type { SimpleIcon } from "simple-icons";
import {
  siApple,
  siDocker,
  siExpo,
  siFigma,
  siGit,
  siGoogleplay,
  siJavascript,
  siJenkins,
  siJira,
  siJoomla,
  siJquery,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNginx,
  siPhp,
  siPython,
  siReact,
  siReacthookform,
  siRedux,
  siTailwindcss,
  siTypescript,
  siYii,
} from "simple-icons";

export type L<T = string> = { el: T; en: T };
export const pick = <T,>(value: L<T>, locale: Locale) => value[locale];

export const profile = {
  firstName: { el: "Φώτης", en: "Fotis" },
  lastName: { el: "Οικονόμου", en: "Oikonomou" },
  email: "fotiosoikonomou1@gmail.com", 
  links: {
    github: "https://github.com/fotisoikonomou", 
    linkedin: "https://www.linkedin.com/in/fotios-oikonomou-full-stack-web-developer/", // TODO
  },
 
  cv: {
    el: "/cv/Fotis_Oikonomou_Resume_el.pdf",
    en: "/cv/Fotis_Oikonomou_Resume.pdf",
  },
  timezone: "EET / EEST",
  stats: [
    { value: { el: "7+", en: "7+" }, label: { el: "Χρόνια στην ανάπτυξη web", en: "Years in web development" } },
    { value: { el: "50.000", en: "50,000" }, label: { el: "Χρήστες (Safe Water Sports)", en: "Users (Safe Water Sports)" } },
    {
      value: { el: "~20", en: "~20" },
      label: { el: "Modules με τα κοινόχρηστα components μου", en: "Modules using my shared components" },
    },
    {
      value: { el: "Όλες", en: "All" },
      label: { el: "Οι Λιμενικές Αρχές της Ελλάδας (σύστημα Λιμενικού)", en: "Port Authorities in Greece (Coast Guard system)" },
    },
  ] as { value: L; label: L }[],
};

export type ProjectStatus = "active" | "design" | "done";

export const projects: {
  title: L;
  status: ProjectStatus;
  summary: L;
  stack: string[];
  code?: string;
  demo?: string;
}[] = [
  {
    title: {
      el: "Αναγνώριση ήχων βυζαντινής μουσικής",
      en: "Byzantine chant mode classifier",
    },
    status: "active",
    summary: {
      el: "Ταξινομεί ηχογραφήσεις ύμνων σε έναν από τους οκτώ ήχους. Το pipeline κόβει τις ηχογραφήσεις σε clips, εξάγει χαρακτηριστικά ήχου (MFCC, chroma) και εκπαιδεύει έναν ταξινομητή· η επόμενη εκδοχή χρησιμοποιεί embeddings από προεκπαιδευμένο μοντέλο. Θα δημοσιευτούν ο κώδικας και τα βάρη του μοντέλου.",
      en: "Classifies hymn recordings into one of the eight Byzantine modes (ήχοι). The pipeline slices recordings into clips, extracts audio features (MFCC, chroma) and trains a classifier; the next version uses frozen embeddings from a pretrained audio model. Code and model weights will be published.",
    },
    stack: ["Python", "librosa", "React", "TypeScript"],
    code: undefined, // TODO: link στο repo όταν γίνει public
  },
  {
    title: { el: "NeuroScope", en: "NeuroScope" },
    status: "active",
    summary: {
      el: "Dashboard σε React για οπτικοποίηση σημάτων EEG, με παραγωγή συνθετικού σήματος και αρχιτεκτονική έτοιμη για σύνδεση με πραγματικές συσκευές μέσω BrainFlow.",
      en: "A React dashboard for visualising EEG signals, with synthetic signal generation and an architecture ready to connect to real headsets through BrainFlow.",
    },
    stack: ["React", "TypeScript", "BrainFlow"],
    code: undefined, // TODO
    demo: undefined, // TODO
  },
  {
    title: {
      el: "Κάμερα-παγίδα για τον λαγοκέφαλο",
      en: "Toadfish camera trap",
    },
    status: "design",
    summary: {
      el: "Υποβρύχια κάμερα-παγίδα με δόλωμα (BRUV) και ταξινομητής εικόνας για την καταγραφή του χωροκατακτητικού λαγοκέφαλου στις ελληνικές θάλασσες.",
      en: "A baited underwater camera trap (BRUV) with an image classifier for monitoring the invasive silver-cheeked toadfish in Greek waters.",
    },
    stack: ["Computer vision", "Python", "Hardware"],
  },
  {
    title: {
      el: "Job Application Tracker API",
      en: "Job Application Tracker API",
    },
    status: "done",
    summary: {
      el: "REST API σε καθαρή PHP 8.3 για την παρακολούθηση αιτήσεων εργασίας, πάνω σε Docker και nginx — χωρίς framework, για να φαίνονται τα θεμέλια.",
      en: "A REST API in plain PHP 8.3 for tracking job applications, running on Docker and nginx — no framework, to show the fundamentals.",
    },
    stack: ["PHP 8.3", "Docker", "nginx"],
    code: undefined, // TODO
  },
];

export const experience: {
  role: L;
  org: L;
  orgUrl?: string;
  period: string;
  highlights: L<string[]>;
  stack: string[];
  // App-store style buttons: `kicker` is the small line above `label` ("Get it on" / "Google Play").
  links?: { label: L; kicker: L; app: string; href: string; icon: SimpleIcon }[];
}[] = [
  {
    role: { el: "Software Engineer", en: "Software Engineer" },
    org: { el: "Netcompany S.A.", en: "Netcompany S.A." },
    orgUrl: "https://www.netcompany.com",
    period: "08/2025 – 05/2026",
    highlights: {
      el: [
        "Ανέπτυξα frontend modules για το SOLON, την εθνική φορολογική πύλη της Λιθουανίας, με React, TypeScript, Redux Toolkit/RTK Query και React Hook Form, πάνω σε schema-driven αρχιτεκτονική φορμών.",
        "Συνεισέφερα 4 επαναχρησιμοποιήσιμα React/TypeScript widgets στην κοινόχρηστη βιβλιοθήκη components (cms-ui-core), που χρησιμοποιείται σε σχεδόν 20 modules, ανάμεσά τους ένα widget ταυτότητας με απόδοση QR και barcode.",
        "Υλοποίησα σχέδια Figma ως responsive οθόνες συμβατές με WCAG 2.1, σε άμεση συνεργασία με την ομάδα UX.",
        "Διόρθωσα race conditions στην ασύγχρονη προσυμπλήρωση δεδομένων, αναδιαμορφώνοντας τον συγχρονισμό state (Redux Toolkit/RTK Query) μαζί με την ομάδα backend.",
        "Καθημερινά peer code reviews σε ομάδα Agile/Scrum, με παρακολούθηση στο Jira.",
      ],
      en: [
        "Built frontend modules for SOLON, Lithuania’s national tax portal, using React, TypeScript, Redux Toolkit/RTK Query and React Hook Form on a schema-driven form architecture.",
        "Contributed 4 reusable React/TypeScript widgets to the shared component library (cms-ui-core), used across nearly 20 modules, including an ID-card widget with QR and barcode rendering.",
        "Implemented Figma designs as responsive, WCAG 2.1-compliant screens, working directly with the UX team.",
        "Fixed race conditions in asynchronous data prefill by reworking state synchronization (Redux Toolkit/RTK Query) together with the backend team.",
        "Daily peer code reviews in an Agile/Scrum team, tracked in Jira.",
      ],
    },
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "React Hook Form", "WCAG 2.1", "Figma"],
  },
  {
    role: { el: "Full-Stack Web Developer", en: "Full-Stack Web Developer" },
    org: { el: "Quality & Reliability S.A.", en: "Quality & Reliability S.A." },
    orgUrl: "https://www.qnr.com.gr",
    period: "11/2021 – 07/2025",
    highlights: {
      el: [
        "Μοναδικός developer του Safe Water Sports, της πανελλαδικής εφαρμογής iOS/Android του Υπουργείου Ναυτιλίας, σε React Native και Expo, με 50.000 πολίτες και επιθεωρητές πεδίου. Είχα την ευθύνη της από τον σχεδιασμό μέχρι την παραγωγή για σχεδόν 4 χρόνια.",
        "Μοναδικός developer του συστήματος καταγραφής συμβάντων του Λιμενικού Σώματος (PHP/Yii2, MySQL, REST APIs), που χρησιμοποιείται από όλες τις Λιμενικές Αρχές της Ελλάδας για την καταγραφή θαλάσσιων ατυχημάτων, πνιγμών και επιθεωρήσεων· συνέλεξα τις απαιτήσεις απευθείας με το Υπουργείο.",
        "Ανέπτυξα frontends σε React/TypeScript για διοικητικά συστήματα του ελληνικού δημόσιου τομέα.",
        "Συντήρησα και αναβάθμισα Laravel (PHP 8) εφαρμογές σε παραγωγή για πλατφόρμες του δημόσιου τομέα, βελτιστοποιώντας MySQL queries και την απόδοση του backend.",
      ],
      en: [
        "Sole developer of Safe Water Sports, the Ministry of Maritime Affairs’ nationwide iOS/Android app built with React Native and Expo, used by 50,000 citizens and field inspectors. I owned it from design to production for nearly 4 years.",
        "Sole developer of the Hellenic Coast Guard’s incident-tracking system (PHP/Yii2, MySQL, REST APIs), used by every Port Authority in Greece to record sea accidents, drownings and inspections; gathered requirements directly with the Ministry.",
        "Built React/TypeScript frontends for Greek public-sector administrative systems.",
        "Maintained and upgraded production Laravel (PHP 8) applications for public-sector platforms, optimizing MySQL queries and backend performance.",
      ],
    },
    stack: ["React", "TypeScript", "React Native", "Expo", "PHP 8", "Yii2", "Laravel", "MySQL", "REST APIs"],
    links: [
      {
        app: "Safe Water Sports",
        kicker: { el: "Διαθέσιμο στο", en: "Get it on" },
        label: { el: "Google Play", en: "Google Play" },
        href: "https://play.google.com/store/apps/details?id=com.digibooks4all.safewatersports",
        icon: siGoogleplay,
      },
      {
        app: "Safe Water Sports",
        kicker: { el: "Διαθέσιμο στο", en: "Download on the" },
        label: { el: "App Store", en: "App Store" },
        href: "https://apps.apple.com/app/id997238444",
        icon: siApple,
      },
    ],
  },
  {
    role: { el: "Full-Stack Web Developer", en: "Full-Stack Web Developer" },
    org: { el: "idcs.gr", en: "idcs.gr" },
    orgUrl: "https://www.idcs.gr",
    period: "09/2019 – 11/2021",
    highlights: {
      el: [
        "Ανέπτυξα custom Joomla components και modules με PHP, JavaScript και jQuery για ιστοσελίδες πελατών όπως τα iaso.gr, babyzone.gr και carglass.gr.",
        "Ανέπτυξα ένα newsletter module που έστελνε στους συνδρομητές περιεχόμενο προσαρμοσμένο στην τρέχουσα εβδομάδα της εγκυμοσύνης τους.",
        "Είχα την ευθύνη όλου του κύκλου, από τις απαιτήσεις μέχρι το deployment, σε άμεση συνεργασία με τους πελάτες.",
      ],
      en: [
        "Built custom Joomla components and modules with PHP, JavaScript and jQuery for client sites such as iaso.gr, babyzone.gr and carglass.gr.",
        "Developed a newsletter module that sent subscribers week-specific content based on their current week of pregnancy.",
        "Handled the full cycle from requirements to deployment, working directly with clients.",
      ],
    },
    stack: ["PHP", "JavaScript", "jQuery", "Joomla", "MySQL"],
  },
  {
    role: { el: "Full-Stack Web Developer", en: "Full-Stack Web Developer" },
    org: { el: "Doersnet", en: "Doersnet" },
    period: "02/2019 – 09/2019",
    highlights: {
      el: [
        "Ανέπτυξα full-stack λειτουργίες σε Yii2 (PHP OOP, JavaScript, jQuery) για μια πλατφόρμα κοινωνικής δικτύωσης με προφίλ χρηστών, feeds και σύστημα ανταμοιβών/gamification.",
      ],
      en: [
        "Developed full-stack Yii2 features (PHP OOP, JavaScript, jQuery) for a social networking platform with user profiles, feeds and a rewards/gamification system.",
      ],
    },
    stack: ["PHP", "Yii2", "JavaScript", "jQuery"],
  },
];

// `logo` is a file name in public/logos/ without extension (.svg, .png or .webp), placed in public/logos/el/ and public/logos/en/ (or directly in public/logos/ when shared); `monogram` shows until a file exists.
export const education: { title: L; school: L; year?: string; link?: L; logo: string; monogram: L }[] = [
  {
    logo: "uth",
    monogram: { el: "ΠΘ", en: "UTH" },
    title: { el: "MSc Εφαρμοσμένη Πληροφορική", en: "MSc Applied Informatics" },
    school: { el: "Πανεπιστήμιο Θεσσαλίας - Τμήμα Ηλεκτρολόγων Μηχανικών, Βόλος", en: "University of Thessaly - Department of Electrical and Computer Engineering, Volos" },
    year : "2021",
    link : {el:"https://api-msc.e-ce.uth.gr/",en: "https://api-msc.e-ce.uth.gr/"},
  },
  {
    logo: "kingston",
    monogram: { el: "KU", en: "KU" },
    title: { el: "MSc Ηλεκτρονικό Εμπόριο", en: "MSc e-Commerce" },
    school: {
      el: "Kingston University London / ΤΕΙ Πειραιά, Αθήνα",
      en: "Kingston University London / TEI of Piraeus, Athens",
    },
     year : "2014",
    link : {el:"https://www.kingston.ac.uk/",en: "https://www.kingston.ac.uk/"},
  },
  {
    logo: "uoi",
    monogram: { el: "ΠΙ", en: "UoI" },
    title: { el: "BSc Πληροφορική", en: "BSc Computer Science" },
    school: { el: "Πανεπιστήμιο Ιωαννίνων - Tμήμα Πληροφορικής και Τηλεπικοινωνιών, Άρτα", en: "University of Ioannina -  Department of Informatics and Telecommunications, Arta" }, 
    year : "2011",
    link: {el:"https://www.dit.uoi.gr/?language=gr", en :"https://www.dit.uoi.gr/?language=en"}
  },
 
  {
    logo: "imtrikkis",
    monogram: { el: "ΙΜ", en: "HM" },
    title: { el: "Δίπλωμα Βυζαντινής Μουσικής", en: "Diploma in Byzantine Music" },
    school: { el: "Σχολή Βυζαντινής Εκκλησιαστικής Μουσικής της Ιεράς Μητρόπολης Τρίκκης Γαρδικίου και Πύλης", en: "School of Byzantine Ecclesiastical Music of the Holy Metropolis of Trikki, Gardiki, and Pyli" },
    year: "2017"
  },
];

export type Skill = { name: string; icon?: SimpleIcon };

export const skills: { group: L; items: Skill[] }[] = [
  {
    group: { el: "Frontend", en: "Frontend" },
    items: [
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "Next.js", icon: siNextdotjs },
      { name: "Redux Toolkit", icon: siRedux },
      { name: "RTK Query", icon: siRedux },
      { name: "React Hook Form", icon: siReacthookform },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "jQuery", icon: siJquery },
    ],
  },
  {
    group: { el: "Mobile", en: "Mobile" },
    items: [
      { name: "React Native", icon: siReact },
      { name: "Expo", icon: siExpo },
    ],
  },
  {
    group: { el: "Backend", en: "Backend" },
    items: [
      { name: "PHP 8", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
      { name: "Yii2", icon: siYii },
      { name: "MySQL", icon: siMysql },
      { name: "Joomla", icon: siJoomla },
      { name: "REST APIs" },
    ],
  },
  {
    group: { el: "Σήματα & ML", en: "Signals & ML" },
    items: [{ name: "Python", icon: siPython }, { name: "librosa" }, { name: "MNE-Python" }, { name: "BrainFlow" }],
  },
  {
    group: { el: "Εργαλεία & πρακτικές", en: "Tooling & practices" },
    items: [
      { name: "Docker", icon: siDocker },
      { name: "nginx", icon: siNginx },
      { name: "Jenkins", icon: siJenkins },
      { name: "Git", icon: siGit },
      { name: "Jira", icon: siJira },
      { name: "Figma", icon: siFigma },
      { name: "WCAG 2.1" },
    ],
  },
];
