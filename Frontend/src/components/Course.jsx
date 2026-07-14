import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Cards from "./Cards";
import { useCart } from "../context/CartProvider.jsx";
import CheckoutModal from "./CheckoutModal";
import AIReviewSummary from "./AIReviewSummary.jsx";

const coverImage = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const baseBooks = [
  {
    id: 1,
    name: "Introduction to Algorithms",
    title: "Algorithms, data structures, graph theory and complexity for CS fundamentals.",
    category: "Computer Science",
    type: "Book",
    price: 1,
    badge: "Core",
    image: coverImage("9780262033848"),
  },
  {
    id: 2,
    name: "Data Structures and Algorithms in Java",
    title: "Arrays, linked lists, trees, graphs, sorting and interview problem solving.",
    category: "Data Structures",
    type: "Book",
    price: 1,
    badge: "New",
    image: coverImage("9781118771334"),
  },
  {
    id: 3,
    name: "Operating System Concepts",
    title: "Processes, scheduling, memory management, deadlock and file systems.",
    category: "Operating System",
    type: "Book",
    price: 549,
    badge: "Top Rated",
    image: coverImage("9781119456339"),
  },
  {
    id: 4,
    name: "Database System Concepts",
    title: "SQL, ER model, normalization, transactions and database design fundamentals.",
    category: "Database Systems",
    type: "Book",
    price: 499,
    badge: "Popular",
    image: coverImage("9780073523323"),
  },
  {
    id: 5,
    name: "Computer Networking: A Top-Down Approach",
    title: "TCP/IP, routing, switching and networking fundamentals for students.",
    category: "Computer Networks",
    type: "Book",
    price: 479,
    badge: "Loved",
    image: coverImage("9780133594140"),
  },
  {
    id: 6,
    name: "Engineering Mathematics",
    title: "Calculus, matrices, differential equations and numerical methods.",
    category: "Mathematics",
    type: "Book",
    price: 459,
    badge: "Formula",
    image: coverImage("9788174091954"),
  },
  {
    id: 7,
    name: "University Physics",
    title: "Mechanics, waves, thermodynamics, optics and electromagnetism basics.",
    category: "Physics",
    type: "Book",
    price: 529,
    badge: "Concept",
    image: coverImage("9780321973610"),
  },
  {
    id: 8,
    name: "Organic Chemistry",
    title: "Bonding, reaction mechanisms, named reactions and practice questions.",
    category: "Chemistry",
    type: "Book",
    price: 499,
    badge: "Lab Notes",
    image: coverImage("9780321803221"),
  },
  {
    id: 9,
    name: "Electronic Devices and Circuit Theory",
    title: "Diodes, transistors, amplifiers and basic circuit analysis.",
    category: "Electronics",
    type: "Book",
    price: 579,
    badge: "Circuit",
    image: coverImage("9780132622264"),
  },
  {
    id: 10,
    name: "Engineering Thermodynamics",
    title: "Laws of thermodynamics, entropy, cycles and heat transfer basics.",
    category: "Mechanical Engineering",
    type: "Book",
    price: 549,
    badge: "Core",
    image: coverImage("9780070260627"),
  },
  {
    id: 11,
    name: "Power System Engineering",
    title: "Generation, transmission, distribution and protection of electrical power.",
    category: "Electrical Engineering",
    type: "Book",
    price: 599,
    badge: "Reference",
    image: coverImage("9780070647916"),
  },
  {
    id: 12,
    name: "Lucent General Knowledge",
    title: "General Studies coverage for history, polity, geography, science and current basics.",
    category: "General Studies",
    type: "Book",
    price: 299,
    badge: "Govt Exam",
    image: coverImage("9789384761547"),
  },
  {
    id: 13,
    name: "Indian Polity",
    title: "Constitution, parliament, judiciary, federalism and governance for exams.",
    category: "Indian Polity",
    type: "Book",
    price: 449,
    badge: "UPSC/SSC",
    image: coverImage("9789355321138"),
  },
  {
    id: 14,
    name: "History of Modern India",
    title: "Freedom struggle, reform movements, nationalism and modern Indian history.",
    category: "History",
    type: "Book",
    price: 399,
    badge: "GS",
    image: coverImage("9788125036845"),
  },
  {
    id: 15,
    name: "Certificate Physical and Human Geography",
    title: "Physical geography, climate, maps, population and human geography concepts.",
    category: "Geography",
    type: "Book",
    price: 429,
    badge: "Maps",
    image: coverImage("9780195628166"),
  },
  {
    id: 16,
    name: "Indian Economy",
    title: "Budget, banking, growth, inflation and economic planning for competitive exams.",
    category: "Economics",
    type: "Book",
    price: 459,
    badge: "Current",
    image: coverImage("9789354601996"),
  },
  {
    id: 17,
    name: "Quantitative Aptitude",
    title: "Arithmetic, algebra, time-work, percentages and exam-level practice sets.",
    category: "Government Exam",
    type: "Book",
    price: 349,
    badge: "SSC/Bank",
    image: coverImage("9789352534029"),
  },
  {
    id: 18,
    name: "Objective General English",
    title: "Grammar, vocabulary, comprehension and error spotting for competitive exams.",
    category: "English",
    type: "Book",
    price: 329,
    badge: "Language",
    image: coverImage("9789325791711"),
  },
  {
    id: 19,
    name: "Verbal and Non-Verbal Reasoning",
    title: "Series, coding-decoding, analogy, puzzles and logical reasoning practice.",
    category: "Reasoning",
    type: "Book",
    price: 369,
    badge: "Practice",
    image: coverImage("9789352535316"),
  },
  {
    id: 20,
    name: "Samanya Hindi",
    title: "Vyakaran, shabdavali, sandhi, samas and Hindi exam preparation.",
    category: "Hindi Literature",
    type: "Book",
    price: 299,
    badge: "Hindi",
    image: coverImage("9789350124420"),
  },
  {
    id: 21,
    name: "Atomic Habits",
    title: "Tiny habits, daily systems and practical self-improvement methods.",
    category: "Self Help",
    type: "Book",
    price: 499,
    badge: "Popular",
    image: coverImage("9780735211292"),
  },
  {
    id: 22,
    name: "Deep Work",
    title: "Focus, distraction control and high-value work habits for students.",
    category: "Productivity",
    type: "Book",
    price: 449,
    badge: "Focus",
    image: coverImage("9781455586691"),
  },
  {
    id: 23,
    name: "Rich Dad Poor Dad",
    title: "Personal finance lessons about money, assets and financial thinking.",
    category: "Finance",
    type: "Book",
    price: 399,
    badge: "Finance",
    image: coverImage("9781612680194"),
  },
  {
    id: 24,
    name: "The Psychology of Money",
    title: "Money behavior, investing mindset and financial decision-making stories.",
    category: "Finance",
    type: "Book",
    price: 459,
    badge: "Money",
    image: coverImage("9780857197689"),
  },
  {
    id: 25,
    name: "Think and Grow Rich",
    title: "Classic success principles, goal setting and wealth mindset lessons.",
    category: "Motivation",
    type: "Book",
    price: 299,
    badge: "Classic",
    image: coverImage("9781585424337"),
  },
  {
    id: 26,
    name: "The Richest Man in Babylon",
    title: "Simple money management rules explained through timeless stories.",
    category: "Finance",
    type: "Book",
    price: 249,
    badge: "Classic",
    image: coverImage("9780451205360"),
  },
  {
    id: 27,
    name: "Ikigai",
    title: "Japanese life philosophy for purpose, health and long-term happiness.",
    category: "Self Help",
    type: "Book",
    price: 349,
    badge: "Loved",
    image: coverImage("9780143130727"),
  },
  {
    id: 28,
    name: "Dopamine Detox",
    title: "Practical guide to reduce distractions and rebuild focus.",
    category: "Productivity",
    type: "Book",
    price: 199,
    badge: "Focus",
    image: coverImage("9798596593378"),
  },
  {
    id: 29,
    name: "The Alchemist",
    title: "Inspirational story about dreams, destiny and personal journey.",
    category: "Fiction",
    type: "Book",
    price: 299,
    badge: "Story",
    image: coverImage("9780061122415"),
  },
  {
    id: 30,
    name: "Man's Search for Meaning",
    title: "Life meaning, resilience and hope through a powerful true experience.",
    category: "Psychology",
    type: "Book",
    price: 349,
    badge: "Deep",
    image: coverImage("9780807014271"),
  },
  {
    id: 31,
    name: "Make Your Bed",
    title: "Simple life lessons for discipline, courage and daily action.",
    category: "Motivation",
    type: "Book",
    price: 299,
    badge: "Short",
    image: coverImage("9781455570249"),
  },
  {
    id: 32,
    name: "Think Straight",
    title: "Clear thinking, better decisions and practical mental clarity.",
    category: "Self Help",
    type: "Book",
    price: 249,
    badge: "Clarity",
    image: coverImage("9780143452133"),
  },
  {
    id: 33,
    name: "Attitude Is Everything",
    title: "Positive attitude, confidence and self-belief for personal growth.",
    category: "Motivation",
    type: "Book",
    price: 249,
    badge: "Mindset",
    image: coverImage("9780979041037"),
  },
  {
    id: 34,
    name: "Eat That Frog!",
    title: "Time management methods to stop procrastination and finish work.",
    category: "Productivity",
    type: "Book",
    price: 299,
    badge: "Time",
    image: coverImage("9781626569416"),
  },
  {
    id: 35,
    name: "Don't Believe Everything You Think",
    title: "A simple book about thoughts, anxiety and mental freedom.",
    category: "Psychology",
    type: "Book",
    price: 299,
    badge: "Mind",
    image: coverImage("9781544503355"),
  },
  {
    id: 36,
    name: "The 7 Habits of Highly Effective People",
    title: "Personal effectiveness, leadership and character-building habits.",
    category: "Self Help",
    type: "Book",
    price: 599,
    badge: "Leadership",
    image: coverImage("9781982137274"),
  },
  {
    id: 37,
    name: "The Power of Your Subconscious Mind",
    title: "Mind power, belief system and positive thinking practices.",
    category: "Self Help",
    type: "Book",
    price: 249,
    badge: "Mindset",
    image: coverImage("9781604592017"),
  },
  {
    id: 38,
    name: "Wings of Fire",
    title: "A. P. J. Abdul Kalam's inspiring life story for students.",
    category: "Biography",
    type: "Book",
    price: 349,
    badge: "Inspiring",
    image: coverImage("9788173711466"),
  },
  {
    id: 39,
    name: "India's Struggle for Independence",
    title: "Freedom movement, nationalism and modern Indian political history.",
    category: "History",
    type: "Book",
    price: 499,
    badge: "UPSC",
    image: coverImage("9780140107814"),
  },
  {
    id: 40,
    name: "A Brief History of Modern India",
    title: "Modern Indian history topics for civil services and state exams.",
    category: "History",
    type: "Book",
    price: 399,
    badge: "Exam",
    image: coverImage("9789352536450"),
  },
  {
    id: 41,
    name: "Python Crash Course",
    title: "Hands-on Python programming with projects and exercises.",
    category: "Programming",
    type: "Book",
    price: 699,
    badge: "Coding",
    image: coverImage("9781593279288"),
  },
  {
    id: 42,
    name: "Clean Code",
    title: "Professional coding practices for readable and maintainable software.",
    category: "Programming",
    type: "Book",
    price: 799,
    badge: "Developer",
    image: coverImage("9780132350884"),
  },
  {
    id: 43,
    name: "Java: The Complete Reference",
    title: "Complete Java language reference for students and developers.",
    category: "Programming",
    type: "Book",
    price: 849,
    badge: "Java",
    image: coverImage("9781260440232"),
  },
  {
    id: 44,
    name: "Let Us C",
    title: "Beginner-friendly C programming concepts and practice examples.",
    category: "Programming",
    type: "Book",
    price: 399,
    badge: "C Lang",
    image: coverImage("9788183331630"),
  },
  {
    id: 45,
    name: "Eloquent JavaScript",
    title: "Modern JavaScript concepts, browser programming and projects.",
    category: "Programming",
    type: "Book",
    price: 549,
    badge: "JS",
    image: coverImage("9781593279509"),
  },
  {
    id: 46,
    name: "You Don't Know JS",
    title: "Deep JavaScript concepts for serious frontend developers.",
    category: "Programming",
    type: "Book",
    price: 499,
    badge: "JS",
    image: coverImage("9781491904244"),
  },
  {
    id: 47,
    name: "Computer Organization and Design",
    title: "Computer architecture, processors, memory and hardware fundamentals.",
    category: "Computer Science",
    type: "Book",
    price: 899,
    badge: "Architecture",
    image: coverImage("9780124077263"),
  },
  {
    id: 48,
    name: "Artificial Intelligence: A Modern Approach",
    title: "Core AI concepts, search, logic, learning and intelligent agents.",
    category: "Artificial Intelligence",
    type: "Book",
    price: 999,
    badge: "AI",
    image: coverImage("9780134610993"),
  },
  {
    id: 49,
    name: "Machine Learning",
    title: "Machine learning fundamentals, algorithms and model evaluation.",
    category: "Artificial Intelligence",
    type: "Book",
    price: 799,
    badge: "ML",
    image: coverImage("9780070428072"),
  },
  {
    id: 50,
    name: "Design Patterns",
    title: "Reusable object-oriented software design patterns and examples.",
    category: "Software Engineering",
    type: "Book",
    price: 899,
    badge: "Design",
    image: coverImage("9780201633610"),
  },
  {
    id: 51,
    name: "Head First Java",
    title: "Visual and beginner-friendly Java programming learning guide.",
    category: "Programming",
    type: "Book",
    price: 699,
    badge: "Java",
    image: coverImage("9780596009205"),
  },
  {
    id: 52,
    name: "Cracking the Coding Interview",
    title: "Coding interview questions, strategies and problem-solving practice.",
    category: "Placement",
    type: "Book",
    price: 799,
    badge: "Interview",
    image: coverImage("9780984782857"),
  },
  {
    id: 53,
    name: "To Kill a Mockingbird",
    title: "Classic novel about justice, courage and moral growth.",
    category: "Fiction",
    type: "Book",
    price: 349,
    badge: "Classic",
    image: coverImage("9780061120084"),
  },
  {
    id: 54,
    name: "1984",
    title: "Dystopian classic about power, surveillance and freedom.",
    category: "Fiction",
    type: "Book",
    price: 299,
    badge: "Classic",
    image: coverImage("9780451524935"),
  },
  {
    id: 55,
    name: "The Great Gatsby",
    title: "Classic American novel about ambition, wealth and dreams.",
    category: "Fiction",
    type: "Book",
    price: 299,
    badge: "Classic",
    image: coverImage("9780743273565"),
  },
  {
    id: 56,
    name: "Pride and Prejudice",
    title: "Classic romance novel with wit, society and character study.",
    category: "Fiction",
    type: "Book",
    price: 299,
    badge: "Classic",
    image: coverImage("9780141439518"),
  },
  {
    id: 57,
    name: "Sapiens",
    title: "History of humankind, culture, society and human evolution.",
    category: "History",
    type: "Book",
    price: 599,
    badge: "History",
    image: coverImage("9780062316097"),
  },
  {
    id: 58,
    name: "Start With Why",
    title: "Leadership and purpose-driven thinking for work and business.",
    category: "Business",
    type: "Book",
    price: 449,
    badge: "Business",
    image: coverImage("9781591846444"),
  },
  {
    id: 59,
    name: "Zero to One",
    title: "Startup thinking, innovation and building unique businesses.",
    category: "Business",
    type: "Book",
    price: 399,
    badge: "Startup",
    image: coverImage("9780804139298"),
  },
  {
    id: 60,
    name: "The Lean Startup",
    title: "Startup validation, MVP, experiments and product building.",
    category: "Business",
    type: "Book",
    price: 499,
    badge: "Startup",
    image: coverImage("9780307887894"),
  },
];

const readBeforeBuyContent = {
  "B.Tech CSE": {
    summary:
      "This book is useful for B.Tech CSE students because it explains core computer science topics in a simple, exam-focused, and practical way.",
    why:
      "Read this book to prepare for semester exams, strengthen programming logic, revise interview topics, and understand real software concepts.",
    previewPages: [
      {
        title: "Preview Page 1: Core Concept",
        content:
          "B.Tech CSE subjects build the base for software development, databases, operating systems, networking, data structures, and project work. Start each chapter by understanding the definition and one real example.",
      },
      {
        title: "Preview Page 2: Important Notes",
        content:
          "For DBMS, focus on SQL, keys, normalization, transactions, and indexing. For OS, focus on process scheduling, memory management, deadlock, and file systems. For DSA, focus on arrays, linked lists, trees, graphs, sorting, and searching.",
      },
      {
        title: "Preview Page 3: Study Method",
        content:
          "Make short notes after every topic. Write formulas, diagrams, syntax, and one example together. Practice previous-year questions and small coding examples to connect theory with implementation.",
      },
    ],
  },
};

const getReadBeforeBuyContent = (book) =>
  readBeforeBuyContent[book.category] || {
    summary: `${book.name} ${book.category} ke important topics ko simple notes, examples aur exam-focused explanation ke sath cover karta hai.`,
    why: `Agar aap ${book.category} strong karna chahte hain, to ye book quick revision, concept clarity aur practice ke liye useful rahegi.`,
    previewPages: [
      {
        title: "Preview Page 1: Important Concepts",
        content: `${book.category} me pehle basic definitions, diagrams aur real examples samjho. Is book ka first part foundation clear karta hai.`,
      },
      {
        title: "Preview Page 2: Exam Notes",
        content: "Har chapter me short notes, important points, formulas/keywords aur previous exam style questions par focus rakha gaya hai.",
      },
      {
        title: "Preview Page 3: Study Plan",
        content: "Daily ek topic read karo, 5-10 practice questions solve karo, aur last me apne handwritten short notes revise karo.",
      },
    ],
  };

const booksWithReadBeforeBuy = baseBooks.map((book) => ({
  ...book,
  readBeforeBuy: getReadBeforeBuyContent(book),
}));

const bookTrailers = [
  {
    id: "trailer-dbms",
    name: "DBMS Made Easy",
    category: "Database Trailer",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    hook: "From raw data to smart tables, unlock the logic behind every modern app.",
    duration: "45 sec intro",
    scenes: ["SQL Queries", "Normalization", "Transactions", "Indexing"],
    narration:
      "Imagine every app storing millions of records. DBMS teaches how data stays organized, safe and searchable.",
  },
  {
    id: "trailer-dsa",
    name: "Data Structures in Java",
    category: "Coding Trailer",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    hook: "Arrays, trees and graphs come alive with Java problem solving.",
    duration: "60 sec intro",
    scenes: ["Arrays", "Trees", "Graphs", "Interview Logic"],
    narration:
      "DSA is the language of efficient coding. This book turns tricky problems into clear patterns.",
  },
  {
    id: "trailer-os",
    name: "Operating Systems Guide",
    category: "System Trailer",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    hook: "See how processes, memory and files work behind your screen.",
    duration: "50 sec intro",
    scenes: ["CPU Scheduling", "Memory", "Deadlock", "File Systems"],
    narration:
      "Operating systems silently manage every click, process and memory block. This trailer gives the big picture.",
  },
];

const recommendationBooks = [
  ...booksWithReadBeforeBuy,
  {
    id: 501,
    name: "Jeet Aapki",
    title: "Hindi motivational book for positive attitude, confidence and success habits.",
    category: "Hindi Motivation",
    type: "Book",
    price: 299,
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
    tags: ["hindi", "motivational", "motivation", "success", "confidence"],
    readBeforeBuy: {
      summary: "Simple Hindi language me motivation, discipline aur positive thinking explain karti hai.",
      why: "Hindi motivational book chahiye to ye easy aur practical recommendation hai.",
      previewPages: [
        {
          title: "Preview Page 1: Positive Thinking",
          content: "Positive thinking reader ko problems ke badle solutions par focus karna sikhati hai.",
        },
        {
          title: "Preview Page 2: Daily Discipline",
          content: "Small daily habits long-term success create karte hain.",
        },
        {
          title: "Preview Page 3: Confidence",
          content: "Confidence practice aur small goals complete karne se strong hota hai.",
        },
      ],
    },
  },
  {
    id: 502,
    name: "Wings of Fire",
    title: "A. P. J. Abdul Kalam ki inspiring life story students ke liye.",
    category: "Biography",
    type: "Book",
    price: 349,
    badge: "Inspiring",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    tags: ["hindi", "motivational", "biography", "student", "inspiration"],
    readBeforeBuy: {
      summary: "Dr. Kalam ke struggle, learning aur dreams ki inspiring story.",
      why: "Students ko hard work aur big dreams ke liye motivate karti hai.",
      previewPages: [
        {
          title: "Preview Page 1: Early Life",
          content: "Simple background se start hui story curiosity aur learning ka value batati hai.",
        },
        {
          title: "Preview Page 2: Hard Work",
          content: "Consistent effort failure ko learning me convert karta hai.",
        },
        {
          title: "Preview Page 3: Dreams",
          content: "Dreams tab meaningful hote hain jab daily action liya jaye.",
        },
      ],
    },
  },
];

const getRecommendations = (query) => {
  const words = query.toLowerCase().trim().split(/\s+/).filter((word) => word.length > 2);

  if (!words.length) {
    return [];
  }

  return recommendationBooks
    .map((book) => {
      const text = [book.name, book.title, book.category, book.badge, ...(book.tags || [])]
        .join(" ")
        .toLowerCase();
      const score = words.reduce((total, word) => total + (text.includes(word) ? 1 : 0), 0);
      return { ...book, score };
    })
    .filter((book) => book.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};

const exchangeStarterListings = [
  {
    id: 701,
    name: "Old DBMS Book",
    subject: "B.Tech CSE",
    condition: "Good",
    mode: "Sell",
    price: "₹220",
    contact: "student@example.com",
    note: "Includes SQL and normalization notes.",
  },
];

const emptyExchangeForm = {
  name: "",
  subject: "",
  condition: "Good",
  mode: "Sell",
  price: "",
  contact: "",
  note: "",
};

const comboOffers = [
  {
    id: 801,
    name: "CSE 6th Sem Combo",
    title: "DBMS, Operating Systems, Computer Networks and Software Engineering in one semester-ready pack.",
    category: "Combo Offer",
    type: "Book Combo",
    price: 1299,
    originalPrice: 1986,
    badge: "Save 35%",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    books: ["DBMS Made Easy", "Operating Systems Guide", "Computer Networks", "Software Engineering"],
    readBeforeBuy: {
      summary: "Ye combo CSE 6th semester ke core theory aur practical subjects ko ek saath cover karta hai.",
      why: "Agar student ko semester exam ke liye complete pack chahiye, to individual books lene se ye combo zyada useful aur budget-friendly hai.",
      previewPages: [
        {
          title: "Combo Preview 1: DBMS + OS",
          content: "DBMS me SQL, normalization aur transactions cover hote hain; OS me scheduling, memory management aur deadlock important hain.",
        },
        {
          title: "Combo Preview 2: CN + SE",
          content: "Computer Networks TCP/IP, routing aur protocols cover karta hai; Software Engineering SDLC, UML, testing aur project planning explain karta hai.",
        },
        {
          title: "Combo Preview 3: Exam Plan",
          content: "Har subject ke short notes banao, diagrams revise karo aur previous-year questions ke saath chapter-wise preparation karo.",
        },
      ],
    },
  },
  {
    id: 802,
    name: "DSA + Java Combo",
    title: "Data Structures in Java with programming practice, interview basics and problem-solving preparation.",
    category: "Combo Offer",
    type: "Book Combo",
    price: 899,
    originalPrice: 1198,
    badge: "Popular Combo",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    books: ["Data Structures in Java", "Java Practice Notes"],
    readBeforeBuy: {
      summary: "Ye combo DSA concepts aur Java implementation ko ek saath practice karne ke liye banaya gaya hai.",
      why: "Coding interviews, lab work aur placement preparation ke liye DSA + Java ek strong pair hai.",
      previewPages: [
        {
          title: "Combo Preview 1: DSA Basics",
          content: "Arrays, linked lists, stacks, queues, trees, graphs, sorting aur searching DSA ke most important blocks hain.",
        },
        {
          title: "Combo Preview 2: Java Implementation",
          content: "Java me classes, objects, collections aur recursion ka use karke DSA questions solve karna easy hota hai.",
        },
        {
          title: "Combo Preview 3: Practice Plan",
          content: "Daily 5 coding questions solve karo: 2 easy, 2 medium aur 1 revision problem.",
        },
      ],
    },
  },
  {
    id: 803,
    name: "Exam Preparation Combo",
    title: "Compiler Design, DBMS, OS and CN quick revision pack for semester and last-minute preparation.",
    category: "Combo Offer",
    type: "Book Combo",
    price: 999,
    originalPrice: 1556,
    badge: "Exam Prep",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    books: ["Compiler Design", "DBMS Made Easy", "Operating Systems Guide", "Computer Networks"],
    readBeforeBuy: {
      summary: "Ye combo exam-focused topics, important diagrams aur theory revision ke liye useful hai.",
      why: "Last-minute study aur important questions revise karne ke liye ye combo fast preparation me help karega.",
      previewPages: [
        {
          title: "Combo Preview 1: High-Weight Topics",
          content: "DBMS normalization, OS deadlock, CN routing aur Compiler parsing jaise topics exams me frequently repeat hote hain.",
        },
        {
          title: "Combo Preview 2: Revision Method",
          content: "Definition, diagram, algorithm aur example ko ek page par summarize karke revise karo.",
        },
        {
          title: "Combo Preview 3: Final Week Plan",
          content: "Pehle previous-year questions dekho, phir weak chapters revise karo aur formulas/diagrams ko last day repeat karo.",
        },
      ],
    },
  },
];

const subjectComboCatalog = {
  "Computer Science": {
    books: ["DBMS Made Easy", "Operating Systems Guide", "Computer Networks", "Software Engineering"],
    price: 1299,
    originalPrice: 1986,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  "Data Structures": {
    books: ["Data Structures in Java", "Java Practice Notes", "Interview Problem Set"],
    price: 899,
    originalPrice: 1198,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  Mathematics: {
    books: ["Engineering Mathematics", "Discrete Mathematics", "Formula Revision Notes"],
    price: 799,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
  },
  Physics: {
    books: ["University Physics", "Mechanics Notes", "Numerical Practice Book"],
    price: 849,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=900&q=80",
  },
  Chemistry: {
    books: ["Organic Chemistry", "Reaction Mechanism Notes", "Practice Questions"],
    price: 799,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
  },
  Electronics: {
    books: ["Electronic Devices", "Circuit Theory Notes", "Lab Viva Questions"],
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  Engineering: {
    books: ["Strength of Materials", "Engineering Mechanics", "Workshop Practice Notes"],
    price: 999,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
  "Mechanical Engineering": {
    books: ["Thermodynamics", "Fluid Mechanics", "Machine Design Notes"],
    price: 1099,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1581091215367-59ab6b9b4f4b?auto=format&fit=crop&w=900&q=80",
  },
  "Electrical Engineering": {
    books: ["Power System Engineering", "Electrical Machines", "Circuit Analysis Notes"],
    price: 1099,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
  },
  Biology: {
    books: ["Campbell Biology", "Genetics Notes", "Cell Biology Practice"],
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  },
  Business: {
    books: ["Marketing Management", "Business Studies Notes", "Case Study Practice"],
    price: 799,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
  },
  Accounting: {
    books: ["Financial Accounting", "Ledger Practice", "Balance Sheet Notes"],
    price: 749,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
  Psychology: {
    books: ["Psychology Basics", "Memory and Learning Notes", "Human Behavior Practice"],
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
  },
  "Political Science": {
    books: ["Indian Polity", "Constitution Notes", "Governance Practice Questions"],
    price: 799,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80",
  },
  History: {
    books: ["History of Modern India", "Timeline Notes", "Previous-Year Questions"],
    price: 749,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=900&q=80",
  },
  "Hindi Motivation": {
    books: ["Jeet Aapki", "Wings of Fire", "Mindset Notes"],
    price: 599,
    originalPrice: 947,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
  },
  "Exam Preparation": {
    books: ["Compiler Design", "DBMS Made Easy", "Operating Systems Guide", "Computer Networks"],
    price: 999,
    originalPrice: 1556,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  },
};

const createSubjectCombo = (subject) => {
  const combo = subjectComboCatalog[subject];

  return {
    id: `subject-combo-${subject}`,
    name: `${subject} Combo`,
    title: `${subject} ke important books, notes aur practice material ka ready-made combo pack.`,
    category: "Subject Combo",
    type: "Book Combo",
    price: combo.price,
    originalPrice: combo.originalPrice,
    badge: "Custom Combo",
    image: combo.image,
    books: combo.books,
    readBeforeBuy: {
      summary: `Ye combo ${subject} subject ke important concepts, notes aur exam practice ko ek saath cover karta hai.`,
      why: `Agar user ko ${subject} ki complete preparation ek pack me chahiye, to ye combo best rahega.`,
      previewPages: [
        {
          title: "Combo Preview 1: Subject Coverage",
          content: `${subject} combo me theory, short notes aur practice material included hai.`,
        },
        {
          title: "Combo Preview 2: Study Use",
          content: "Is combo ko semester exam, quick revision aur topic-wise study ke liye use kar sakte ho.",
        },
        {
          title: "Combo Preview 3: Value",
          content: "Individual books lene se better price par complete study pack milta hai.",
        },
      ],
    },
  };
};

const baseCourses = [
  {
    id: 7,
    name: "Full Stack Web Development",
    title: "HTML, CSS, JavaScript, React, Node.js, Express and MongoDB bootcamp.",
    category: "YouTube Course",
    type: "Course",
    price: 999,
    badge: "Beginner Friendly",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/1h9Ko_M3njc",
  },
  {
    id: 8,
    name: "React + Next.js Mastery",
    title: "Build modern UIs, routing, APIs and deployment with hands-on projects.",
    category: "YouTube Course",
    type: "Course",
    price: 899,
    badge: "Project Based",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
  },
  {
    id: 9,
    name: "Node.js Backend Bootcamp",
    title: "Authentication, REST APIs, JWT, database integration and deployment.",
    category: "YouTube Course",
    type: "Course",
    price: 799,
    badge: "Backend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
  },
  {
    id: 10,
    name: "MongoDB + Express Crash Course",
    title: "Database design, CRUD operations and real world backend workflows.",
    category: "YouTube Course",
    type: "Course",
    price: 699,
    badge: "Fast Track",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/OFa1k1IRG9k",
  },
  {
    id: 11,
    name: "JavaScript Interview Prep",
    title: "Closures, promises, async await, DOM and DSA patterns for interviews.",
    category: "YouTube Course",
    type: "Course",
    price: 749,
    badge: "Interview Ready",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
  },
  {
    id: 12,
    name: "Build 10 Real Projects",
    title: "Portfolio, e-commerce, dashboard, blog and booking app projects.",
    category: "YouTube Course",
    type: "Course",
    price: 1099,
    badge: "Hands-on",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
  },
];

// expand courses only by cycling base arrays (names preserved)
const expand = (base, n, startId = 1) =>
  Array.from({ length: n }).map((_, i) => ({ ...base[i % base.length], id: startId + i }));

function Course() {
  const [activeTab, setActiveTab] = useState("books");
  const [selectedComboSubjects, setSelectedComboSubjects] = useState([
    "Computer Science",
    "Data Structures",
    "Exam Preparation",
  ]);
  const [recommendationQuery, setRecommendationQuery] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState("");
  const [voiceSearchLanguage, setVoiceSearchLanguage] = useState("en-IN");
  const [isListening, setIsListening] = useState(false);
  const [exchangeListings, setExchangeListings] = useState(exchangeStarterListings);
  const [exchangeForm, setExchangeForm] = useState(emptyExchangeForm);
  const [selectedExchangeBook, setSelectedExchangeBook] = useState(null);
  const [readingChallenge, setReadingChallenge] = useState({
    goal: "30 days me 2 books complete",
    days: 30,
    targetBooks: 2,
    completedBooks: 0,
  });
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);

  const bookStoreItems = booksWithReadBeforeBuy;
  const courseItems = expand(baseCourses, 50, 1001);
  const visibleComboOffers = selectedComboSubjects.map((subject) => createSubjectCombo(subject));
  const comboTotalPrice = visibleComboOffers.reduce((total, combo) => total + combo.price, 0);
  const comboTotalMrp = visibleComboOffers.reduce(
    (total, combo) => total + combo.originalPrice,
    0
  );
  const comboTotalSaving = comboTotalMrp - comboTotalPrice;
  const readingProgress = Math.min(
    Math.round((readingChallenge.completedBooks / readingChallenge.targetBooks) * 100) || 0,
    100
  );
  const voiceSearchWords = voiceSearchQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 2 &&
        ![
          "book",
          "books",
          "show",
          "find",
          "search",
          "dikhao",
          "chahiye",
          "ki",
          "ka",
          "ke",
          "mujhe",
        ].includes(word)
    );
  const filteredBookStoreItems = voiceSearchWords.length
    ? booksWithReadBeforeBuy
        .map((item) => {
          const searchableText = `${item.name} ${item.title} ${item.category}`.toLowerCase();
          const score = voiceSearchWords.reduce((total, word) => {
            const aliases = {
              os: "operating",
              system: "systems",
              systm: "systems",
              structure: "structures",
              network: "networks",
            };
            const normalizedWord = aliases[word] || word;
            return total + (searchableText.includes(normalizedWord) ? 1 : 0);
          }, 0);

          return { ...item, voiceSearchScore: score };
        })
        .filter((item) => item.voiceSearchScore > 0)
        .sort((a, b) => b.voiceSearchScore - a.voiceSearchScore)
    : bookStoreItems;

  const { cart, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  const handleBuyNow = (item) => {
    setCheckoutItem(item);
  };

  const getAllComboItem = () => ({
    id: "all-selected-combos",
    name: "All 3 Selected Subject Combos",
    title: selectedComboSubjects.join(" + "),
    category: "Combo Pack",
    type: "Book Combo",
    price: comboTotalPrice,
    badge: `Save Rs. ${comboTotalSaving}`,
    image: visibleComboOffers[0]?.image,
  });

  const handleBuyAllCombos = () => {
    setCheckoutItem(getAllComboItem());
  };

  const handleAddAllCombos = () => {
    addToCart(getAllComboItem());
    toast.success("All 3 selected combos added to cart");
  };

  const handleViewDetails = (item) => setSelectedItem(item);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice search is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = voiceSearchLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice search failed. Please try again");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceSearchQuery(transcript);
      toast.success(`Searching: ${transcript}`);
    };

    recognition.start();
  };

  const handleReadingChallengeChange = (e) => {
    const { name, value } = e.target;
    setReadingChallenge((prev) => ({
      ...prev,
      [name]: name === "goal" ? value : Math.max(Number(value), name === "completedBooks" ? 0 : 1),
    }));
  };

  const handleComboSubjectChange = (index, subject) => {
    setSelectedComboSubjects((prev) =>
      prev.map((selectedSubject, selectedIndex) =>
        selectedIndex === index ? subject : selectedSubject
      )
    );
  };

  const handleRecommendation = (e) => {
    e.preventDefault();
    const results = getRecommendations(recommendationQuery);
    setRecommendedBooks(results);
    results.length ? toast.success("Recommended books ready") : toast.error("No matching books found");
  };

  const handleExchangeFieldChange = (e) => {
    const { name, value } = e.target;
    setExchangeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExchangeSubmit = (e) => {
    e.preventDefault();

    if (!exchangeForm.name || !exchangeForm.subject || !exchangeForm.price || !exchangeForm.contact) {
      toast.error("Please fill book name, subject, price and contact");
      return;
    }

    setExchangeListings((prev) => [{ ...exchangeForm, id: Date.now() }, ...prev]);
    setExchangeForm(emptyExchangeForm);
    toast.success("Exchange listing added");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-screen-2xl px-2 py-8 md:px-8 md:py-12">
        <div className="course-opening relative mt-20 overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-pink-200 dark:shadow-black/30 md:p-10">
          <div className="course-video-bg absolute inset-0 opacity-90" />
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="dashboard-reveal max-w-2xl">
              <p className="course-studio-pill mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-100 backdrop-blur">
                📚 Book Store & 🎬 Course Studio
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">
                Courses open like a video learning studio.
              </h1>
              <p className="mt-4 text-lg text-pink-50/90">
                Discover premium resources for DSA, DBMS, OS, CN, React, Node.js and more — all in one polished learning hub.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-pink-100">Books</p>
                  <p className="mt-1 text-2xl font-bold">{booksWithReadBeforeBuy.length}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-pink-100">Courses</p>
                  <p className="mt-1 text-2xl font-bold">{baseCourses.length}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-pink-100">Cart</p>
                  <p className="mt-1 text-2xl font-bold">{cart.length}</p>
                </div>
              </div>
            </div>
            <div className="dashboard-screen relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10 p-3 backdrop-blur">
              <div className="trailer-scanline absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="course-film rounded-[1.35rem] p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                    Opening
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    4K Learning
                  </span>
                </div>
                <div className="course-player mx-auto mt-10 flex h-36 w-full max-w-sm items-center justify-center rounded-3xl border border-white/15 bg-slate-950/70 shadow-2xl shadow-pink-500/20">
                  <div className="course-play h-16 w-16 rounded-full bg-pink-500 shadow-lg shadow-pink-500/40" />
                </div>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="dashboard-progress h-full rounded-full bg-pink-500" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-slate-100">
                  <span className="rounded-full bg-white/10 px-3 py-2">Preview</span>
                  <span className="rounded-full bg-white/10 px-3 py-2">Practice</span>
                  <span className="rounded-full bg-white/10 px-3 py-2">Master</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("books")}
              className={`course-books-tab rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "books"
                  ? "bg-white text-pink-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              📚 Books Store
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("courses")}
              className={`course-courses-tab rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "courses"
                  ? "bg-white text-pink-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              🎬 Courses
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              {activeTab === "books" ? "B.Tech CSE Book Collection" : "Full-Stack YouTube Courses"}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {activeTab === "books"
                ? "Choose from the most useful engineering books for core subjects."
                : "Learn from practical video lessons with real-world projects and modern stack tools."}
            </p>
          </div>
        </div>

        {activeTab === "books" && (
          <section className="mt-8 rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Voice Search
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  English me bolo: show data structure book, ya Hindi me bolo: Data Structure ki book dikhao
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:max-w-4xl">
                <select
                  value={voiceSearchLanguage}
                  onChange={(e) => setVoiceSearchLanguage(e.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="en-IN">English</option>
                  <option value="hi-IN">Hindi / Hinglish</option>
                </select>
                <input
                  type="text"
                  value={voiceSearchQuery}
                  onChange={(e) => setVoiceSearchQuery(e.target.value)}
                  placeholder={
                    voiceSearchLanguage === "hi-IN"
                      ? "Data Structure ki book dikhao"
                      : "show data structure book"
                  }
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition ${
                    isListening
                      ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)]"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  {isListening ? "Listening..." : "Start Voice"}
                </button>
                {voiceSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setVoiceSearchQuery("")}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-600 dark:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            {voiceSearchQuery && (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Showing {filteredBookStoreItems.length} result(s) for "{voiceSearchQuery}"
              </p>
            )}
          </section>
        )}

        {activeTab === "books" && (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <section className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                AI Book Recommendation
              </h3>
              <form onSubmit={handleRecommendation} className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={recommendationQuery}
                  onChange={(e) => setRecommendationQuery(e.target.value)}
                  placeholder="mujhe motivational Hindi book chahiye"
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Recommend
                </button>
              </form>
              {recommendedBooks.length > 0 && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {recommendedBooks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-pink-300 dark:border-slate-700 dark:bg-slate-950"
                    >
                      <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{item.title}</p>
                      <p className="mt-2 text-sm font-bold text-pink-600">₹{item.price}</p>
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Book Exchange System
              </h3>
              <form onSubmit={handleExchangeSubmit} className="mt-3 grid gap-2 sm:grid-cols-2">
                <input name="name" value={exchangeForm.name} onChange={handleExchangeFieldChange} placeholder="Old book name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                <input name="subject" value={exchangeForm.subject} onChange={handleExchangeFieldChange} placeholder="Subject" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                <select name="condition" value={exchangeForm.condition} onChange={handleExchangeFieldChange} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                  <option>Like New</option>
                  <option>Very Good</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
                <select name="mode" value={exchangeForm.mode} onChange={handleExchangeFieldChange} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                  <option>Sell</option>
                  <option>Exchange</option>
                  <option>Sell or Exchange</option>
                </select>
                <input name="price" value={exchangeForm.price} onChange={handleExchangeFieldChange} placeholder="Price / exchange wish" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                <input name="contact" value={exchangeForm.contact} onChange={handleExchangeFieldChange} placeholder="Contact" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                <input name="note" value={exchangeForm.note} onChange={handleExchangeFieldChange} placeholder="Short note" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:col-span-2" />
                <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 sm:col-span-2">
                  List My Book
                </button>
              </form>
              <div className="mt-4 space-y-2">
                {exchangeListings.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => setSelectedExchangeBook(book)}
                    className="w-full rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-pink-300 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-800 dark:text-white">{book.name}</p>
                      <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-semibold text-pink-600">{book.mode}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                      {book.subject} • {book.condition} • {book.price}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "books" && (
          <section className="mt-8 rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Reading Challenge
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Set your reading goal and track book completion progress.
                </p>
              </div>
              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/20 dark:text-pink-300">
                {readingProgress}% completed
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <input
                type="text"
                name="goal"
                value={readingChallenge.goal}
                onChange={handleReadingChallengeChange}
                placeholder="30 days me 2 books complete"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white md:col-span-2"
              />
              <input
                type="number"
                name="days"
                min="1"
                value={readingChallenge.days}
                onChange={handleReadingChallengeChange}
                placeholder="Days"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <input
                type="number"
                name="targetBooks"
                min="1"
                value={readingChallenge.targetBooks}
                onChange={handleReadingChallengeChange}
                placeholder="Target books"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-gradient-to-r from-pink-500 to-slate-900 p-4 text-white">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-100">
                    Current Goal
                  </p>
                  <p className="mt-1 text-2xl font-bold">{readingChallenge.goal}</p>
                  <p className="mt-1 text-sm text-pink-100">
                    {readingChallenge.completedBooks} of {readingChallenge.targetBooks} books completed in {readingChallenge.days} days
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-pink-100">
                    Completed
                  </label>
                  <input
                    type="number"
                    name="completedBooks"
                    min="0"
                    max={readingChallenge.targetBooks}
                    value={readingChallenge.completedBooks}
                    onChange={handleReadingChallengeChange}
                    className="w-20 rounded-full border border-white/40 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-semibold text-pink-100">
                <span>Start</span>
                <span>{readingProgress}%</span>
                <span>Complete</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === "books" && (
          <section className="trailer-film-strip mt-8 overflow-hidden rounded-2xl border border-pink-100 bg-slate-950 p-4 text-white shadow-[0_8px_30px_rgba(15,23,42,0.18)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-300">
                  New Experience
                </p>
                <h3 className="mt-1 text-xl font-semibold">Book Trailer</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Popular books ke short animated intro dekho before reading.
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pink-100">
                Video style previews
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {bookTrailers.map((trailer, index) => (
                <article
                  key={trailer.id}
                  className="trailer-card-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl transition duration-500 hover:-translate-y-1 hover:border-pink-300/60"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={trailer.image}
                      alt={trailer.name}
                      className="trailer-poster h-44 w-full object-cover opacity-75 transition duration-500 group-hover:opacity-90"
                    />
                    <div className="trailer-scanline absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <div className="trailer-progress h-full rounded-r-full bg-pink-500" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold">
                    {trailer.duration}
                  </div>
                  <div className="trailer-float absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <span className="absolute h-10 w-10 animate-ping rounded-full bg-pink-400/40" />
                    <span className="relative text-sm font-bold">▶</span>
                  </div>
                  <div className="relative -mt-28 p-4 pt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
                      {trailer.category}
                    </p>
                    <h4 className="mt-1 text-lg font-bold">{trailer.name}</h4>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-200">
                      {trailer.hook}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {trailer.scenes.slice(0, 3).map((scene) => (
                        <span
                          key={scene}
                          className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-200"
                        >
                          {scene}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTrailer({ ...trailer, index })}
                      className="mt-4 w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                    >
                      Watch Trailer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "books" && (
          <section className="mt-8 rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Book Combo Offers
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Save more with ready-made semester, coding and exam preparation combos.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Change top 3 combos
                </span>
                {selectedComboSubjects.map((selectedSubject, index) => (
                  <select
                    key={`${selectedSubject}-${index}`}
                    value={selectedSubject}
                    onChange={(e) => handleComboSubjectChange(index, e.target.value)}
                    className="rounded-full border border-pink-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {Object.keys(subjectComboCatalog).map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-slate-900 p-4 text-white md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-100">
                  Selected Combos
                </p>
                <p className="mt-1 text-2xl font-bold">{visibleComboOffers.length} Subjects</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-100">
                  Total Combo Price
                </p>
                <p className="mt-1 text-3xl font-bold">Rs. {comboTotalPrice}</p>
                <p className="text-sm text-pink-100 line-through">MRP Rs. {comboTotalMrp}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-100">
                  Total Saving
                </p>
                <p className="mt-1 text-2xl font-bold">Rs. {comboTotalSaving}</p>
                <p className="text-sm text-pink-100">
                  All 3 selected subject combos together
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleBuyAllCombos}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-pink-600 transition hover:bg-pink-50"
                  >
                    Buy All 3
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAllCombos}
                    className="rounded-full border border-white/60 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Add All Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {visibleComboOffers.map((combo) => (
                <article
                  key={combo.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950"
                >
                  <img src={combo.image} alt={combo.name} className="h-32 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-slate-800 dark:text-white">{combo.name}</h4>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        {combo.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {combo.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {combo.books.map((bookName) => (
                        <span
                          key={bookName}
                          className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {bookName}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl bg-pink-50 p-3 dark:bg-slate-900">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Combo Price
                      </p>
                      <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                        <div className="flex items-end gap-2">
                          <p className="text-2xl font-bold text-pink-600">
                            Rs. {combo.price}
                          </p>
                          <p className="pb-1 text-sm text-slate-400 line-through">
                            Rs. {combo.originalPrice}
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                          Save Rs. {combo.originalPrice - combo.price}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleBuyNow(combo)}
                        className="rounded-full bg-pink-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-pink-600"
                      >
                        Buy Now
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(combo)}
                        className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-600 dark:text-slate-200"
                      >
                        Add Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedItem(combo)}
                        className="col-span-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                      >
                        View Combo Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(activeTab === "books" ? filteredBookStoreItems : courseItems).map((item) => (
            <Cards
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {activeTab === "books" && voiceSearchQuery && filteredBookStoreItems.length === 0 && (
          <div className="mt-6 rounded-2xl border border-pink-100 bg-white/80 p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
            No books found. Try saying "DBMS book dikhao" or "Data Structure ki book dikhao".
          </div>
        )}

        {selectedItem && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <form className="modal-box bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
              <h3 className="text-lg font-bold">{selectedItem.name}</h3>
              <p className="py-4">{selectedItem.title}</p>
              <AIReviewSummary />
              {selectedItem.readBeforeBuy && (
                <div className="mb-4 rounded-2xl border border-pink-100 bg-pink-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                  <h4 className="text-base font-bold text-slate-800 dark:text-white">
                    Read Before Buy
                  </h4>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-pink-600">Short Summary</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {selectedItem.readBeforeBuy.summary}
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-pink-600">
                      Why you should read this book?
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {selectedItem.readBeforeBuy.why}
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {selectedItem.readBeforeBuy.previewPages.map((page) => (
                      <div
                        key={page.title}
                        className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900"
                      >
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {page.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {page.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedItem.type === "Course" && selectedItem.videoUrl && (
                <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <iframe
                    className="h-52 w-full"
                    src={selectedItem.videoUrl}
                    title={selectedItem.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutItem(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-500 dark:bg-slate-950 dark:text-white dark:hover:border-pink-400 dark:hover:text-pink-300"
                >
                  Add Cart
                </button>
                <button type="button" className="btn bg-slate-100 text-slate-900 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600" onClick={() => setSelectedItem(null)}>
                  Close
                </button>
              </div>
            </form>
          </dialog>
        )}
        {checkoutItem && (
          <CheckoutModal item={checkoutItem} onClose={() => setCheckoutItem(null)} />
        )}
        {selectedTrailer && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <form className="modal-box max-w-3xl overflow-hidden bg-slate-950 p-0 text-white shadow-[0_0_60px_rgba(236,72,153,0.35)]">
              <div className="relative">
                <div className="relative overflow-hidden">
                  <img
                    src={selectedTrailer.image}
                    alt={selectedTrailer.name}
                    className="trailer-poster h-64 w-full object-cover opacity-70"
                  />
                  <div className="trailer-scanline absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                    Playing
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {selectedTrailer.duration}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-200">
                    {selectedTrailer.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{selectedTrailer.name}</h3>
                  <p className="mt-2 text-sm text-slate-200">{selectedTrailer.hook}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="trailer-progress h-full rounded-full bg-pink-500" />
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {selectedTrailer.scenes.map((scene, sceneIndex) => (
                    <div
                      key={scene}
                      className="trailer-scene-pop rounded-2xl border border-white/10 bg-white/5 p-3 text-center transition hover:bg-white/10"
                      style={{ animationDelay: `${sceneIndex * 120}ms` }}
                    >
                      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold">
                        {sceneIndex + 1}
                      </div>
                      <p className="text-xs font-semibold text-slate-100">{scene}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  {selectedTrailer.narration}
                </p>
                <div className="mt-5 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTrailer(null)}
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrailer(null);
                      const matchingBook = bookStoreItems.find(
                        (book) => book.name === selectedTrailer.name
                      );
                      if (matchingBook) {
                        setSelectedItem(matchingBook);
                      }
                    }}
                    className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                  >
                    View Book
                  </button>
                </div>
              </div>
            </form>
          </dialog>
        )}
        {selectedExchangeBook && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <form className="modal-box">
              <h3 className="text-lg font-bold">{selectedExchangeBook.name}</h3>
              <div className="mt-4 space-y-2 text-sm">
                <p><strong>Subject:</strong> {selectedExchangeBook.subject}</p>
                <p><strong>Condition:</strong> {selectedExchangeBook.condition}</p>
                <p><strong>Type:</strong> {selectedExchangeBook.mode}</p>
                <p><strong>Price / Exchange:</strong> {selectedExchangeBook.price}</p>
                <p><strong>Contact:</strong> {selectedExchangeBook.contact}</p>
                <p><strong>Note:</strong> {selectedExchangeBook.note || "No extra note"}</p>
              </div>
              <div className="mt-5 flex justify-end">
                <button type="button" className="btn" onClick={() => setSelectedExchangeBook(null)}>
                  Close
                </button>
              </div>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
}

export default Course;
