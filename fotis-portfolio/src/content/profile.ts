
import type { Locale } from "@/i18n/routing";

export type L = { el: string; en: string };
export const pick = (value: L, locale: Locale) => value[locale];

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
  period: string;
  summary: L;
  stack: string[];
}[] = [
  {
    role: { el: "Frontend Software Engineer", en: "Frontend Software Engineer" },
    org: { el: "Netcompany", en: "Netcompany" },
    period: "20XX – 20XX", // TODO
    summary: {
      el: "Frontend για το SOLON TAX, την εθνική φορολογική πύλη της Λιθουανίας. Σχεδίασα config-driven rendering φορμών, widgets με QR/barcode και προσβάσιμη πλοήγηση σε κινητά, και δούλεψα σε cross-stack debugging και Jenkins CI/CD.",
      en: "Frontend for SOLON TAX, Lithuania's national taxpayer portal. Built config-driven form rendering, widgets with QR/barcode support and accessible mobile navigation, and worked on cross-stack debugging and Jenkins CI/CD.",
    },
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "React Hook Form", "Form.io"],
  },
  {
    role: { el: "Full-stack Developer", en: "Full-stack Developer" },
    org: { el: "TODO: εταιρεία", en: "TODO: company" }, // TODO
    period: "20XX – 20XX", // TODO
    summary: {
      el: "Μοναδικός developer για σχεδόν τέσσερα χρόνια της πλατφόρμας Safe Water Sports του Υπουργείου Ναυτιλίας και Νησιωτικής Πολιτικής, από τον σχεδιασμό μέχρι την παραγωγή.",
      en: "Sole developer for almost four years of the Safe Water Sports platform for the Greek Ministry of Maritime Affairs, from design through production.",
    },
    stack: [], // TODO: π.χ. PHP, Yii, MySQL
  },
];

export const education: { title: L; school: L; year?: string, link?: L}[] = [
  {
    title: { el: "MSc Εφαρμοσμένη Πληροφορική", en: "MSc Applied Informatics" },
    school: { el: "Πανεπιστήμιο Θεσσαλίας - Τμήμα Ηλεκτρολόγων Μηχανικών, Βόλος", en: "University of Thessaly - Department of Electrical and Computer Engineering, Volos" },
    year : "2021",
    link : {el:"https://api-msc.e-ce.uth.gr/",en: "https://api-msc.e-ce.uth.gr/"},
  },
  {
    title: { el: "MSc Ηλεκτρονικό Εμπόριο", en: "MSc e-Commerce" },
    school: {
      el: "Kingston University London / ΤΕΙ Πειραιά, Αθήνα",
      en: "Kingston University London / TEI of Piraeus, Athens",
    },
     year : "2014",
    link : {el:"https://www.kingston.ac.uk/",en: "https://www.kingston.ac.uk/"},
  },
  {
    title: { el: "BSc Πληροφορική", en: "BSc Computer Science" },
    school: { el: "Πανεπιστήμιο Ιωαννίνων - Tμήμα Πληροφορικής και Τηλεπικοινωνιών, Άρτα", en: "University of Ioannina -  Department of Informatics and Telecommunications, Arta" }, 
    year : "2011",
    link: {el:"https://www.dit.uoi.gr/?language=gr", en :"https://www.dit.uoi.gr/?language=en"}
  },
 
  {
    title: { el: "Δίπλωμα Βυζαντινής Μουσικής", en: "Diploma in Byzantine Music" },
    school: { el: "Σχολή Βυζαντινής Εκκλησιαστικής Μουσικής της Ιεράς Μητρόπολης Τρίκκης Γαρδικίου και Πύλης", en: "School of Byzantine Ecclesiastical Music of the Holy Metropolis of Trikki, Gardiki, and Pyli" },
    year: "2017"
  },
];

export const skills: { group: L; items: string[] }[] = [
  {
    group: { el: "Frontend", en: "Frontend" },
    items: ["React", "React-Native", "TypeScript", "Redux Toolkit", "RTK Query", "React Hook Form", "Next.js", "Tailwind CSS"],
  },
  {
    group: { el: "Backend", en: "Backend" },
    items: ["PHP 8", "Laravel", "Yii", "REST APIs",],
  },
  {
    group: { el: "Σήματα & ML", en: "Signals & ML" },
    items: ["Python", "librosa", "MNE-Python", "BrainFlow"],
  },
  {
    group: { el: "Εργαλεία", en: "Tooling" },
    items: ["Docker", "nginx", "Jenkins", "Git", "Jira"],
  },
];
