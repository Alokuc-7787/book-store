import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Cards from "./Cards";
import { useCart } from "../context/CartProvider.jsx";
import CheckoutModal from "./CheckoutModal";
import AIReviewSummary from "./AIReviewSummary.jsx";

const coverImage = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const bookStoreItems = [
  {
    id: 1,
    name: "Introduction to Algorithms",
    title: "Algorithms, data structures, graph theory and complexity for CS fundamentals.",
    category: "Computer Science",
    type: "Book",
    price: 699,
    badge: "Core",
    image: coverImage("9780262033848"),
  },
  {
    id: 2,
    name: "Data Structures and Algorithms in Java",
    title: "Arrays, linked lists, trees, graphs, sorting and interview problem solving.",
    category: "Data Structures",
    type: "Book",
    price: 599,
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
  "Computer Science": {
    summary:
      "This book helps students understand core computing concepts with clear theory, practical examples, and exam-friendly explanations.",
    why:
      "Read this book if you want strong fundamentals for semester exams, interviews, coding practice, and real software problem solving.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Computer science books in this section focus on how data is stored, processed, protected, and transferred. Start by understanding the basic definitions, then connect each concept with a real example such as search, login, database storage, or internet browsing.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Key areas include algorithms, operating systems, databases, networking, memory management, SQL, process scheduling, and complexity analysis. These topics build the base for programming, backend development, system design, and technical interviews.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Read one concept, make a small note, and solve 3-5 examples. For theory subjects, draw diagrams. For programming subjects, implement the idea in code. Revision becomes easy when every topic has one definition, one diagram, and one example.",
      },
    ],
  },
  Mathematics: {
    summary:
      "This book builds problem-solving skills through formulas, proofs, solved examples, and step-by-step mathematical methods.",
    why:
      "Read this book to improve logical thinking, engineering calculations, aptitude, and confidence in numerical subjects.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Mathematics gives the language for science, engineering, and computing. Focus first on definitions and symbols, then understand why each formula works instead of only memorizing it.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important areas include logic, sets, relations, calculus, matrices, differential equations, graphs, combinatorics, and numerical methods. These topics appear in programming, electronics, physics, data science, and engineering analysis.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Solve examples in order: easy, medium, then mixed questions. Keep a formula notebook and revise it daily. If a question feels hard, identify which theorem or formula it is testing.",
      },
    ],
  },
  Physics: {
    summary:
      "This book explains natural laws using concepts, formulas, diagrams, and numerical examples for strong science fundamentals.",
    why:
      "Read this book if you want to understand mechanics, waves, electricity, and modern physics with practical clarity.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Physics connects observation with mathematical laws. Every chapter starts from a physical situation, then explains the formula that describes it.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include motion, force, work, energy, thermodynamics, waves, optics, current electricity, magnetism, and atomic structure.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Draw the diagram first, write given values, choose the correct law, and then solve. Concept clarity matters more than memorizing many formulas.",
      },
    ],
  },
  Chemistry: {
    summary:
      "This book covers chemical bonding, reactions, structures, mechanisms, and problem practice in a student-friendly way.",
    why:
      "Read this book to understand reactions logically and prepare better for chemistry exams and lab concepts.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Chemistry explains matter, bonding, reactions, and energy changes. A good approach is to understand electron movement and structure before memorizing reactions.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include atomic structure, periodic trends, chemical bonding, acids and bases, organic mechanisms, functional groups, and reaction types.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Make reaction maps and revise functional groups regularly. For numerical chemistry, write units clearly and practice formula-based questions.",
      },
    ],
  },
  Electronics: {
    summary:
      "This book explains electronic components, circuits, semiconductor devices, and practical electrical behavior.",
    why:
      "Read this book to build a base for circuits, electronics labs, embedded systems, and electrical engineering topics.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Electronics studies how current and voltage behave inside components such as resistors, diodes, transistors, and semiconductor devices.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include PN junction diode, rectifiers, transistors, amplifiers, circuit laws, biasing, and basic digital electronics.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Study circuit diagrams carefully. Mark current direction, voltage polarity, and component function before solving any circuit question.",
      },
    ],
  },
  Engineering: {
    summary:
      "This book explains engineering fundamentals with formulas, diagrams, solved numericals, and real application-based concepts.",
    why:
      "Read this book for semester exams, technical basics, and a stronger foundation in mechanical/civil engineering subjects.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Engineering subjects connect theory with real machines, structures, and systems. First understand the physical meaning of each term, then learn its formula.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include force, stress, strain, bending, torsion, equilibrium, materials, energy, and safety factors.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Draw clean diagrams, write assumptions, and solve step by step. Units are very important in engineering numericals.",
      },
    ],
  },
  "Mechanical Engineering": {
    summary:
      "This book covers machines, heat, energy, materials, and mechanical systems with engineering-focused explanations.",
    why:
      "Read this book to understand thermodynamics, machines, manufacturing, and mechanical design basics.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Mechanical engineering studies motion, energy, heat, force, and machines. Strong basics help you understand engines, turbines, pumps, and manufacturing systems.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include laws of thermodynamics, power cycles, entropy, heat transfer, materials, machine elements, and fluid behavior.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Learn the concept, draw the system diagram, write known values, and solve with correct units. Revise standard cycles and definitions often.",
      },
    ],
  },
  "Electrical Engineering": {
    summary:
      "This book explains generation, transmission, distribution, machines, and protection concepts in electrical systems.",
    why:
      "Read this book to build a practical base for power systems, electrical machines, and circuit-related subjects.",
    previewPages: [
      {
        title: "Preview Page 1: Core Idea",
        content:
          "Electrical engineering studies how electrical energy is generated, controlled, transmitted, and used by machines and systems.",
      },
      {
        title: "Preview Page 2: Important Topics",
        content:
          "Important topics include AC/DC circuits, transformers, motors, generators, power transmission, distribution, and protection devices.",
      },
      {
        title: "Preview Page 3: How To Study",
        content:
          "Focus on circuit diagrams, phasors, formulas, and real equipment use. Practice numericals with units and draw neat labeled diagrams.",
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

const booksWithReadBeforeBuy = bookStoreItems.map((book) => ({
  ...book,
  readBeforeBuy: getReadBeforeBuyContent(book),
}));

const aiRecommendationBooks = [
  ...booksWithReadBeforeBuy,
  {
    id: 101,
    name: "Jeet Aapki",
    title: "Shiv Khera ki motivational Hindi book jo positive attitude, success habits aur self-confidence par focus karti hai.",
    category: "Hindi Motivation",
    type: "Book",
    price: 299,
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
    tags: ["hindi", "motivational", "motivation", "success", "self help", "confidence"],
    readBeforeBuy: {
      summary:
        "Ye book positive thinking, discipline aur success mindset ko simple Hindi language me explain karti hai.",
      why:
        "Agar user ko Hindi me motivation, confidence aur life improvement chahiye, to ye easy aur practical choice hai.",
      previewPages: [
        {
          title: "Preview Page 1: Positive Attitude",
          content:
            "Success ka first step positive attitude hai. Jab student ya reader apni thinking ko solution-focused banata hai, to daily problems ko handle karna easy ho jata hai.",
        },
        {
          title: "Preview Page 2: Self Discipline",
          content:
            "Motivation tab useful hoti hai jab uske saath routine aur discipline ho. Daily small actions long-term success create karte hain.",
        },
        {
          title: "Preview Page 3: Confidence Building",
          content:
            "Confidence practice se badhta hai. Apne goals ko small steps me divide karke complete karna self-belief strong karta hai.",
        },
      ],
    },
  },
  {
    id: 102,
    name: "The Power of Your Subconscious Mind",
    title: "Joseph Murphy ki popular self-help book ka Hindi edition, mind power aur belief system par based.",
    category: "Hindi Motivation",
    type: "Book",
    price: 249,
    badge: "Mindset",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
    tags: ["hindi", "motivational", "motivation", "mind", "self help", "subconscious"],
    readBeforeBuy: {
      summary:
        "Ye book batati hai ki thoughts, beliefs aur repeated suggestions behavior aur confidence ko kaise affect karte hain.",
      why:
        "Agar user mindset improve karna chahta hai aur Hindi me self-help read karna chahta hai, to ye strong recommendation hai.",
      previewPages: [
        {
          title: "Preview Page 1: Thought Power",
          content:
            "Book ka core idea hai ki repeated thoughts habits banate hain. Positive self-talk aur clear goals mind ko focused direction dete hain.",
        },
        {
          title: "Preview Page 2: Belief System",
          content:
            "Beliefs decision-making ko impact karte hain. Agar reader apne belief ko improve karta hai, to action aur confidence bhi improve hote hain.",
        },
        {
          title: "Preview Page 3: Daily Practice",
          content:
            "Affirmations, visualization aur calm thinking jaise practices ko daily routine me add karne se mindset gradually strong hota hai.",
        },
      ],
    },
  },
  {
    id: 103,
    name: "Wings of Fire",
    title: "A. P. J. Abdul Kalam ki inspiring life story, students aur young readers ke liye motivational choice.",
    category: "Biography",
    type: "Book",
    price: 349,
    badge: "Inspiring",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    tags: ["hindi", "motivational", "biography", "student", "inspiration", "kalam"],
    readBeforeBuy: {
      summary:
        "Ye book Dr. A. P. J. Abdul Kalam ke childhood, struggle, learning aur achievements ko inspiring tarike se present karti hai.",
      why:
        "Students ke liye ye book dreams, hard work aur dedication ka real-life example deti hai.",
      previewPages: [
        {
          title: "Preview Page 1: Early Life",
          content:
            "Story ek simple background se start hoti hai, jahan learning, family values aur curiosity future growth ki foundation banate hain.",
        },
        {
          title: "Preview Page 2: Hard Work",
          content:
            "Book dikhati hai ki consistent effort, discipline aur failure se learning kisi bhi student ko aage badha sakti hai.",
        },
        {
          title: "Preview Page 3: Big Dreams",
          content:
            "Reader ko message milta hai ki dreams tab meaningful hote hain jab unke liye daily action liya jaye.",
        },
      ],
    },
  },
];

const getBookRecommendations = (query) => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  return aiRecommendationBooks
    .map((book) => {
      const searchableText = [
        book.name,
        book.title,
        book.category,
        book.badge,
        ...(book.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      const score = normalizedQuery
        .split(/\s+/)
        .filter((word) => word.length > 2)
        .reduce((total, word) => total + (searchableText.includes(word) ? 1 : 0), 0);

      return { ...book, recommendationScore: score };
    })
    .filter((book) => book.recommendationScore > 0)
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 4);
};

const initialExchangeListings = [
  {
    id: 201,
    name: "Used Engineering Mathematics",
    subject: "Mathematics",
    condition: "Good",
    mode: "Exchange",
    price: "Exchange with Physics or CSE book",
    location: "Campus / Local pickup",
    contact: "alok@example.com",
    note: "Few highlighted pages, all chapters complete and usable for semester study.",
  },
  {
    id: 202,
    name: "Old DBMS Notes + Book",
    subject: "Computer Science",
    condition: "Very Good",
    mode: "Sell",
    price: "₹220",
    location: "Near college gate",
    contact: "student@example.com",
    note: "Includes handwritten notes for SQL, normalization and transactions.",
  },
];

const emptyExchangeForm = {
  name: "",
  subject: "",
  condition: "Good",
  mode: "Sell",
  price: "",
  location: "",
  contact: "",
  note: "",
};

function Bookstore() {
  const [books] = useState(booksWithReadBeforeBuy);
  const [recommendationQuery, setRecommendationQuery] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [exchangeListings, setExchangeListings] = useState(initialExchangeListings);
  const [exchangeForm, setExchangeForm] = useState(emptyExchangeForm);
  const [selectedExchangeBook, setSelectedExchangeBook] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const { cart, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  const handleBuyNow = (item) => {
    setCheckoutItem(item);
  };

  const handleRecommendation = (e) => {
    e.preventDefault();
    const results = getBookRecommendations(recommendationQuery);
    setRecommendedBooks(results);

    if (results.length) {
      toast.success("Recommended books ready");
    } else {
      toast.error("No matching books found");
    }
  };

  const handleExchangeFieldChange = (e) => {
    const { name, value } = e.target;
    setExchangeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExchangeSubmit = (e) => {
    e.preventDefault();

    if (!exchangeForm.name || !exchangeForm.subject || !exchangeForm.price || !exchangeForm.contact) {
      toast.error("Please fill book name, subject, price/exchange and contact");
      return;
    }

    setExchangeListings((prev) => [
      {
        ...exchangeForm,
        id: Date.now(),
        location: exchangeForm.location || "Local pickup",
        note: exchangeForm.note || "Seller has not added extra notes.",
      },
      ...prev,
    ]);
    setExchangeForm(emptyExchangeForm);
    toast.success("Book exchange listing added");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-screen-2xl px-2 py-8 md:px-8 md:py-12">
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              Subject-Wise Book Collection
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Real textbook names arranged by subject for a cleaner bookstore view.
            </p>
          </div>
          <Link to="/">
            <button className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600">
              Back to Home
            </button>
          </Link>
        </div>

        <form
          onSubmit={handleRecommendation}
          className="mt-8 rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                AI Book Recommendation
              </label>
              <input
                type="text"
                value={recommendationQuery}
                onChange={(e) => setRecommendationQuery(e.target.value)}
                placeholder="mujhe motivational Hindi book chahiye"
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Recommend Books
            </button>
          </div>
        </form>

        {recommendedBooks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              Recommended For You
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendedBooks.map((item) => (
                <Cards
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onViewDetails={(it) => setSelectedItem(it)}
                />
              ))}
            </div>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_8px_30px_rgba(244,114,182,0.12)] dark:border-slate-700 dark:bg-slate-900/80">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                Book Exchange System
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Sell your old books or exchange them with other students.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              {exchangeListings.length} active listings
            </span>
          </div>

          <form onSubmit={handleExchangeSubmit} className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              name="name"
              value={exchangeForm.name}
              onChange={handleExchangeFieldChange}
              placeholder="Book name"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              type="text"
              name="subject"
              value={exchangeForm.subject}
              onChange={handleExchangeFieldChange}
              placeholder="Subject / course"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <select
              name="condition"
              value={exchangeForm.condition}
              onChange={handleExchangeFieldChange}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option>Like New</option>
              <option>Very Good</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
            <select
              name="mode"
              value={exchangeForm.mode}
              onChange={handleExchangeFieldChange}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option>Sell</option>
              <option>Exchange</option>
              <option>Sell or Exchange</option>
            </select>
            <input
              type="text"
              name="price"
              value={exchangeForm.price}
              onChange={handleExchangeFieldChange}
              placeholder="Price or exchange wish"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              type="text"
              name="location"
              value={exchangeForm.location}
              onChange={handleExchangeFieldChange}
              placeholder="Pickup location"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              type="text"
              name="contact"
              value={exchangeForm.contact}
              onChange={handleExchangeFieldChange}
              placeholder="Email or phone"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-pink-500 dark:hover:bg-pink-600"
            >
              List My Book
            </button>
            <textarea
              name="note"
              value={exchangeForm.note}
              onChange={handleExchangeFieldChange}
              placeholder="Extra note: edition, highlights, missing pages, exchange preference"
              className="min-h-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white md:col-span-2 lg:col-span-4"
            />
          </form>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {exchangeListings.map((book) => (
              <article
                key={book.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">{book.name}</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      {book.subject} • {book.condition}
                    </p>
                  </div>
                  <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/20 dark:text-pink-300">
                    {book.mode}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-white">
                  {book.price}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                  {book.note}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedExchangeBook(book)}
                  className="mt-4 w-full rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-600 dark:text-slate-200"
                >
                  View Seller Details
                </button>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((item) => (
            <Cards
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewDetails={(it) => setSelectedItem(it)}
            />
          ))}
        </div>

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
        {selectedExchangeBook && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <form className="modal-box">
              <h3 className="text-lg font-bold">{selectedExchangeBook.name}</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <p><strong>Subject:</strong> {selectedExchangeBook.subject}</p>
                <p><strong>Condition:</strong> {selectedExchangeBook.condition}</p>
                <p><strong>Type:</strong> {selectedExchangeBook.mode}</p>
                <p><strong>Price / Exchange:</strong> {selectedExchangeBook.price}</p>
                <p><strong>Pickup:</strong> {selectedExchangeBook.location}</p>
                <p><strong>Contact:</strong> {selectedExchangeBook.contact}</p>
                <p><strong>Note:</strong> {selectedExchangeBook.note}</p>
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

export default Bookstore;
