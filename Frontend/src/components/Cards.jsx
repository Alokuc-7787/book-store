import React, { useState } from "react";
import { createPortal } from "react-dom";

const sampleLibrary = [
  {
    keys: ["operating system", "os"],
    pages: [
      {
        title: "Page 1: Process Management",
        subtitle: "What an operating system controls",
        blocks: [
          "A process is a program in execution. The OS gives every process CPU time, memory space, open files and a secure execution environment.",
          "Important states: new, ready, running, waiting and terminated. Scheduling decides which ready process gets the CPU next.",
          "Context switching saves the current process state and loads another process state. It improves multitasking but adds overhead.",
        ],
        note: "Exam point: Process and program are not same. Program is passive code; process is active execution.",
      },
      {
        title: "Page 2: CPU Scheduling",
        subtitle: "How the processor is shared",
        blocks: [
          "FCFS is simple but can cause convoy effect. SJF reduces average waiting time but needs burst-time prediction.",
          "Round Robin gives each process a fixed time quantum. It is useful for time-sharing systems because response time stays fair.",
          "Priority scheduling runs high-priority jobs first. Aging is used so low-priority jobs do not wait forever.",
        ],
        note: "Formula: Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time.",
      },
      {
        title: "Page 3: Memory Management",
        subtitle: "Paging, segmentation and virtual memory",
        blocks: [
          "Paging divides logical memory into pages and physical memory into frames. It removes external fragmentation.",
          "A page table maps page numbers to frame numbers. TLB works like a fast cache for page-table entries.",
          "Virtual memory lets a program run even when the full program is not in RAM. Demand paging loads pages only when needed.",
        ],
        note: "Common question: Page fault happens when required page is not available in main memory.",
      },
      {
        title: "Page 4: Deadlock",
        subtitle: "When processes wait forever",
        blocks: [
          "Deadlock can occur when four conditions hold together: mutual exclusion, hold and wait, no preemption and circular wait.",
          "Prevention breaks one condition. Avoidance uses safe-state checking such as Banker's Algorithm.",
          "Detection allows deadlock first, then finds cycles and recovers by killing or rolling back processes.",
        ],
        note: "Real example: two apps each hold one file lock and wait for the other file lock.",
      },
      {
        title: "Page 5: File System Revision",
        subtitle: "Quick notes before buying",
        blocks: [
          "File systems organize data into files and directories. Metadata stores name, size, permission, owner and timestamps.",
          "Allocation methods include contiguous, linked and indexed allocation. Indexed allocation supports direct access better.",
          "This book is useful if you want process scheduling, memory, deadlock and file-system concepts in exam-ready language.",
        ],
        note: "Best for: B.Tech CSE semester exams, OS viva and placement basics.",
      },
    ],
  },
  {
    keys: ["dbms", "database", "sql"],
    pages: [
      {
        title: "Page 1: Database Basics",
        subtitle: "Data, tables and relationships",
        blocks: [
          "A DBMS stores data in an organized way so users can insert, update, search and protect information efficiently.",
          "Relational databases keep data in tables. Rows are records and columns are attributes.",
          "Primary key uniquely identifies a row. Foreign key connects one table with another table.",
        ],
        note: "Example: Student(roll_no, name, branch) uses roll_no as a primary key.",
      },
      {
        title: "Page 2: ER Model",
        subtitle: "Design before creating tables",
        blocks: [
          "Entity means a real-world object like Student, Book or Order. Attributes describe the entity.",
          "Relationships show association between entities, such as Student borrows Book.",
          "Cardinality can be one-to-one, one-to-many or many-to-many. It helps convert ER diagrams into tables.",
        ],
        note: "Tip: Always identify strong entities first, then weak entities and relationships.",
      },
      {
        title: "Page 3: SQL Commands",
        subtitle: "DDL, DML and query practice",
        blocks: [
          "DDL commands define structure: CREATE, ALTER, DROP. DML commands change data: INSERT, UPDATE, DELETE.",
          "SELECT with WHERE filters rows. ORDER BY sorts records and GROUP BY creates summary groups.",
          "Joins combine tables. INNER JOIN returns matching rows, LEFT JOIN keeps all rows from the left table.",
        ],
        note: "Practice query: Find students whose marks are greater than class average.",
      },
      {
        title: "Page 4: Normalization",
        subtitle: "Removing repeated data",
        blocks: [
          "Normalization reduces redundancy and update anomalies by splitting data into related tables.",
          "1NF removes repeating groups. 2NF removes partial dependency. 3NF removes transitive dependency.",
          "BCNF is stricter than 3NF and is used when every determinant should be a candidate key.",
        ],
        note: "Interview point: Normalization improves consistency; denormalization may improve read speed.",
      },
      {
        title: "Page 5: Transactions",
        subtitle: "ACID properties",
        blocks: [
          "Atomicity means all operations complete or none. Consistency keeps database rules valid.",
          "Isolation keeps concurrent transactions separate. Durability means committed data survives failure.",
          "This book is useful for SQL, ER model, normalization and transaction concepts in compact exam language.",
        ],
        note: "Best for: university exams, SQL practice and DBMS interview preparation.",
      },
    ],
  },
  {
    keys: ["data structure", "algorithm", "dsa", "java"],
    pages: [
      {
        title: "Page 1: Arrays and Linked Lists",
        subtitle: "Linear data structures",
        blocks: [
          "Arrays store elements in continuous memory and give O(1) access by index.",
          "Linked lists store nodes with data and pointers. Insertion and deletion are easier when node position is known.",
          "Choose arrays for fast random access and linked lists for dynamic size changes.",
        ],
        note: "Common viva: Array size is fixed in basic form; linked list grows dynamically.",
      },
      {
        title: "Page 2: Stack and Queue",
        subtitle: "LIFO and FIFO models",
        blocks: [
          "Stack follows Last In First Out. It is used in function calls, undo operation and expression evaluation.",
          "Queue follows First In First Out. It is used in scheduling, buffering and printer jobs.",
          "Deque allows insertion and deletion from both ends.",
        ],
        note: "Java tip: Stack can be implemented using Deque for modern code.",
      },
      {
        title: "Page 3: Trees",
        subtitle: "Hierarchical storage",
        blocks: [
          "A tree has nodes and edges. Root is the top node, leaf has no child.",
          "Binary Search Tree keeps left values smaller and right values larger than root.",
          "Tree traversals: inorder, preorder, postorder and level order.",
        ],
        note: "In BST, inorder traversal gives sorted order.",
      },
      {
        title: "Page 4: Graphs",
        subtitle: "Networks and connections",
        blocks: [
          "Graphs contain vertices and edges. They can be directed, undirected, weighted or unweighted.",
          "BFS explores level by level using queue. DFS explores deep paths using stack or recursion.",
          "Dijkstra finds shortest path when edge weights are non-negative.",
        ],
        note: "Real use: maps, social networks, recommendation systems.",
      },
      {
        title: "Page 5: Complexity",
        subtitle: "How to judge performance",
        blocks: [
          "Time complexity describes how runtime grows with input size. Space complexity describes extra memory use.",
          "O(1), O(log n), O(n), O(n log n), O(n^2) are common growth rates.",
          "This book is useful for coding rounds because it connects theory with problem-solving patterns.",
        ],
        note: "Best for: Java DSA, placements and semester practicals.",
      },
    ],
  },
  {
    keys: ["computer network", "networking"],
    pages: [
      {
        title: "Page 1: Network Models",
        subtitle: "OSI and TCP/IP",
        blocks: [
          "The OSI model has seven layers: physical, data link, network, transport, session, presentation and application.",
          "TCP/IP is the practical internet model. It groups communication into link, internet, transport and application layers.",
          "Layering makes troubleshooting easier because each layer has a specific responsibility.",
        ],
        note: "Memory line: Data moves down layers at sender and up layers at receiver.",
      },
      {
        title: "Page 2: IP Addressing",
        subtitle: "Finding devices on a network",
        blocks: [
          "An IP address identifies a device on a network. IPv4 uses 32-bit addresses, IPv6 uses 128-bit addresses.",
          "Subnetting divides a large network into smaller networks for better control and routing.",
          "CIDR notation like /24 shows how many bits are used for network prefix.",
        ],
        note: "Example: 192.168.1.10/24 belongs to network 192.168.1.0.",
      },
      {
        title: "Page 3: TCP and UDP",
        subtitle: "Reliable vs fast transport",
        blocks: [
          "TCP is connection-oriented and reliable. It uses acknowledgement, sequencing and retransmission.",
          "UDP is connectionless and faster. It is used where speed matters more than perfect delivery.",
          "Applications: HTTP/HTTPS usually use TCP; DNS and live streaming often use UDP.",
        ],
        note: "Interview point: TCP has three-way handshake.",
      },
      {
        title: "Page 4: Routing",
        subtitle: "Path selection",
        blocks: [
          "Routers forward packets between networks by using routing tables.",
          "Distance vector protocols use hop count style information. Link state protocols maintain a wider map.",
          "Shortest path algorithms help choose efficient routes.",
        ],
        note: "Common protocols: RIP, OSPF, BGP.",
      },
      {
        title: "Page 5: Security Basics",
        subtitle: "Protecting communication",
        blocks: [
          "Encryption protects data from being read by unauthorized users.",
          "Firewalls filter traffic using rules. VPN creates a secure tunnel over public networks.",
          "This book is useful for networking fundamentals, exam diagrams and interview questions.",
        ],
        note: "Best for: CN exams, CCNA basics and placement theory.",
      },
    ],
  },
  {
    keys: ["compiler"],
    pages: [
      {
        title: "Page 1: Compiler Phases",
        subtitle: "From code to executable",
        blocks: [
          "A compiler translates high-level code into machine-level code through multiple phases.",
          "Main phases are lexical analysis, syntax analysis, semantic analysis, intermediate code generation, optimization and target code generation.",
          "Symbol table stores identifiers, types, scope and other important information.",
        ],
        note: "Exam point: Lexical analyzer produces tokens.",
      },
      {
        title: "Page 2: Lexical Analysis",
        subtitle: "Tokens and patterns",
        blocks: [
          "Lexical analysis reads source code character by character and groups them into tokens.",
          "Regular expressions describe token patterns. Finite automata recognize these patterns.",
          "Whitespace and comments are usually removed at this stage.",
        ],
        note: "Example token: keyword, identifier, operator, literal.",
      },
      {
        title: "Page 3: Parsing",
        subtitle: "Checking grammar",
        blocks: [
          "Parser checks whether token sequence follows grammar rules.",
          "Top-down parsing starts from the start symbol. Bottom-up parsing starts from input and reduces to start symbol.",
          "Parse tree shows grammatical structure of an expression or program.",
        ],
        note: "Common topic: FIRST and FOLLOW sets.",
      },
      {
        title: "Page 4: Intermediate Code",
        subtitle: "Machine-independent representation",
        blocks: [
          "Intermediate code makes optimization easier before final target code generation.",
          "Three-address code breaks complex expressions into simple statements.",
          "Optimization removes unnecessary work and improves speed or memory usage.",
        ],
        note: "Example: t1 = b * c; t2 = a + t1.",
      },
      {
        title: "Page 5: Code Generation",
        subtitle: "Final revision",
        blocks: [
          "Target code generation maps intermediate code to machine instructions.",
          "Register allocation decides which values stay in CPU registers.",
          "This book is useful for compiler diagrams, parsing, syntax trees and short exam notes.",
        ],
        note: "Best for: theory exams and compiler-design viva.",
      },
    ],
  },
  {
    keys: ["general studies", "government", "polity", "history", "geography", "economy"],
    pages: [
      {
        title: "Page 1: Indian Polity",
        subtitle: "Constitution basics",
        blocks: [
          "The Constitution of India defines the structure of government, rights of citizens and duties of institutions.",
          "Fundamental Rights protect liberty, equality and justice. Directive Principles guide the state in policy-making.",
          "Parliament has Lok Sabha, Rajya Sabha and the President as constitutional parts.",
        ],
        note: "Exam point: Preamble keywords include Sovereign, Socialist, Secular, Democratic, Republic.",
      },
      {
        title: "Page 2: Modern History",
        subtitle: "Freedom struggle overview",
        blocks: [
          "Modern Indian history covers colonial rule, social reform movements and the national movement.",
          "Important events include Revolt of 1857, formation of INC, Swadeshi Movement, Non-Cooperation and Quit India Movement.",
          "Focus on causes, leaders, timeline and outcome for objective exams.",
        ],
        note: "Quick trick: Learn events decade-wise for faster revision.",
      },
      {
        title: "Page 3: Geography",
        subtitle: "Physical and Indian geography",
        blocks: [
          "Physical geography covers landforms, climate, rivers, soils and natural vegetation.",
          "Indian geography focuses on Himalayas, northern plains, peninsular plateau, coastal plains and islands.",
          "Map-based questions often test rivers, passes, national parks and mineral regions.",
        ],
        note: "Practice: Mark major rivers and states on blank maps.",
      },
      {
        title: "Page 4: Economy",
        subtitle: "Basic economic terms",
        blocks: [
          "GDP measures value of final goods and services produced in an economy during a period.",
          "Inflation means general rise in prices. RBI uses monetary policy to control money supply and credit.",
          "Budget, taxation, fiscal deficit and welfare schemes are important government-exam areas.",
        ],
        note: "Current affairs connect static economy with recent policies.",
      },
      {
        title: "Page 5: Practice Strategy",
        subtitle: "How to read this book",
        blocks: [
          "Read one topic, revise same day and solve topic-wise MCQs.",
          "Make short notes for facts, articles, dates and schemes.",
          "This book is useful for government exam preparation, quick revision and static GK coverage.",
        ],
        note: "Best for: SSC, Railway, State exams and foundation-level UPSC.",
      },
    ],
  },
  {
    keys: ["habit", "deep work", "rich dad", "psychology", "money", "motivation", "ikigai", "alchemist"],
    pages: [
      {
        title: "Page 1: Core Idea",
        subtitle: "Personal growth in simple language",
        blocks: [
          "The book focuses on improving daily choices, thinking clearly and building a stronger life direction.",
          "Small actions repeated consistently create visible results over time.",
          "The main lesson is practical: understand your behavior, remove friction and create better routines.",
        ],
        note: "Reader note: Do not just read. Pick one idea and apply it today.",
      },
      {
        title: "Page 2: Mindset",
        subtitle: "How change starts",
        blocks: [
          "Mindset decides how a person reacts to problems, failure and opportunity.",
          "A growth mindset treats mistakes as feedback. A fixed mindset avoids challenges.",
          "Self-awareness helps you notice patterns that waste time, money or energy.",
        ],
        note: "Practice: Write one habit you want to improve and one trigger that starts it.",
      },
      {
        title: "Page 3: Action Plan",
        subtitle: "Simple daily system",
        blocks: [
          "Choose a clear goal and break it into small daily actions.",
          "Track progress visually so the brain gets feedback and motivation.",
          "Reward consistency, not only final results. This makes long-term change easier.",
        ],
        note: "Example: Read 10 pages daily after dinner for 30 days.",
      },
      {
        title: "Page 4: Practical Examples",
        subtitle: "Money, focus and discipline",
        blocks: [
          "For money books, note every income, expense, asset and liability.",
          "For focus books, reduce distractions and create deep-work blocks.",
          "For motivation books, connect goals with identity: become the type of person who does the action.",
        ],
        note: "Useful line: What gets measured gets improved.",
      },
      {
        title: "Page 5: Why Read This Book",
        subtitle: "Before buying",
        blocks: [
          "This book is useful if you want simple lessons, clear thinking and daily improvement.",
          "It is best read slowly with notes, because the value comes from applying ideas.",
          "Good for beginners, students and readers who want practical self-growth.",
        ],
        note: "Best for: motivation, money mindset, productivity and life planning.",
      },
    ],
  },
];

const defaultSamplePages = (item) => [
  {
    title: "Page 1: Subject Overview",
    subtitle: "What this book covers",
    blocks: [
      `${item.name} me ${item.category || "subject"} ke core topics clear, exam-ready aur beginner-friendly style me cover kiye gaye hain.`,
      "Chapter flow basic concepts se start hota hai, phir examples, diagrams, practice questions aur quick revision tak jata hai.",
      "Reader ko topic ka purpose, real use aur important terms ek jagah milte hain.",
    ],
    note: "Best use: pehle overview padho, phir examples solve karo.",
  },
  {
    title: "Page 2: Important Concepts",
    subtitle: "Short notes format",
    blocks: [
      "Important definitions ko simple language me explain kiya gaya hai taaki viva aur objective questions dono ke liye help mile.",
      "Har major topic ke baad key points diye gaye hain jo last-minute revision me kaam aate hain.",
      "Concepts ko practical examples ke saath connect kiya gaya hai.",
    ],
    note: "Tip: Is page ko exam se pehle quick revision ke liye use karein.",
  },
  {
    title: "Page 3: Solved Example",
    subtitle: "How to apply the concept",
    blocks: [
      "Solved examples step-by-step approach dikhate hain: question samjho, formula/logic choose karo, solution likho.",
      "Common mistakes ko highlight kiya gaya hai jisse marks cut hone ka chance kam hota hai.",
      "Practice questions similar pattern par diye gaye hain.",
    ],
    note: "Practice rule: Ek solved example ke baad do unsolved questions try karein.",
  },
  {
    title: "Page 4: Quick Revision",
    subtitle: "Exam-ready recap",
    blocks: [
      "Definitions, formulas, diagrams aur important keywords compact format me arrange hain.",
      "Long answers ke liye intro, main points aur conclusion ka structure diya gaya hai.",
      "Objective questions ke liye one-line facts aur comparison tables useful hain.",
    ],
    note: "Revision idea: Highlight only keywords, full paragraph nahi.",
  },
  {
    title: "Page 5: Why Read This Book",
    subtitle: "Before you buy",
    blocks: [
      `${item.name} un readers ke liye useful hai jo ${item.category || "subject"} ko clear examples aur short notes ke saath padhna chahte hain.`,
      "Language simple rakhi gayi hai, isliye beginners bhi topic ko easily follow kar sakte hain.",
      "Book semester exams, revision, viva aur basic interview preparation me helpful rahegi.",
    ],
    note: "Worth buying if you want clarity, practice and fast revision.",
  },
];

const getSamplePages = (item) => {
  const text = `${item.name || ""} ${item.category || ""} ${item.title || ""}`.toLowerCase();
  return (
    sampleLibrary.find((sample) => sample.keys.some((key) => text.includes(key)))
      ?.pages || defaultSamplePages(item)
  );
};

function Cards({ item, onAddToCart, onBuyNow, onViewDetails }) {
  const [sampleOpen, setSampleOpen] = useState(false);
  const isBook = item.type === "Book";
  const fallbackImage =
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80";
  const samplePages = getSamplePages(item);

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart?.(item);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    onBuyNow?.(item);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    onViewDetails?.(item);
  };

  const sampleModal =
    sampleOpen &&
    createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4">
        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-slate-50 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white">
          <div className="sticky top-0 z-10 border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
                  PDF Sample
                </p>
                <h3 className="truncate text-xl font-bold">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                  5 pages preview
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                onClick={() => setSampleOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-full rounded-full bg-pink-500" />
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[220px_1fr]">
            <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <img
                src={item.image}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.src = fallbackImage;
                }}
                className="mx-auto h-64 w-full rounded-2xl bg-slate-100 object-contain p-3 dark:bg-slate-800"
              />
              <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                {item.name}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.category || "Book"} sample preview
              </p>
              <span className="mt-4 inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/20 dark:text-pink-200">
                5 sample pages
              </span>
            </aside>

            <div className="space-y-5">
              {samplePages.map((page, index) => (
                <article
                  key={page.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {page.title}
                    </h4>
                    <span className="shrink-0 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/20 dark:text-pink-200">
                      {index + 1}/5
                    </span>
                  </div>
                  <p className="mb-4 text-sm font-semibold text-pink-500">
                    {page.subtitle}
                  </p>
                  <div className="space-y-3 text-[15px] leading-8 text-slate-700 dark:text-slate-200">
                    {page.blocks.map((block) => (
                      <p key={block}>{block}</p>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-medium text-pink-700 dark:bg-pink-500/10 dark:text-pink-200">
                    {page.note}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              className="w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:bg-pink-600"
              onClick={() => setSampleOpen(false)}
            >
              Done Reading - Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
    <article className="group relative overflow-hidden rounded-2xl border border-pink-100 bg-white/80 p-3 shadow-[0_8px_30px_rgba(244,114,182,0.12)] backdrop-blur transition duration-400 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(244,114,182,0.18)] dark:border-slate-700 dark:bg-slate-900/80">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/8 via-transparent to-sky-400/8 opacity-0 transition duration-400 group-hover:opacity-80" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600 dark:bg-pink-500/20 dark:text-pink-300">
            {item.category || "Resource"}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {item.type || "Study"}
          </span>
        </div>

        <img
          src={item.image}
          alt={item.name}
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
          className={`w-full rounded-xl bg-slate-100 transition duration-400 group-hover:scale-103 dark:bg-slate-800 ${
            isBook ? "h-48 object-contain p-2" : "h-28 object-cover"
          }`}
        />

        <div className="mt-3">
          <h3 className="text-md font-semibold text-slate-800 dark:text-white">
            {item.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300 h-10 overflow-hidden">
            {item.title}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Price
              </p>
              <p className="text-lg font-bold text-pink-600">₹{item.price}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              {item.badge || "Best Seller"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-pink-600"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-500 dark:bg-slate-950 dark:text-white dark:hover:border-pink-400 dark:hover:text-pink-300"
            >
              Add Cart
            </button>
            {isBook && (
              <button
                type="button"
                onClick={() => setSampleOpen(true)}
                className="w-full rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 transition hover:bg-pink-100 dark:border-pink-500/40 dark:bg-pink-500/10 dark:text-pink-200 dark:hover:bg-pink-500/20"
              >
                Read Sample
              </button>
            )}
            <button
              type="button"
              onClick={handleViewDetails}
              className="w-full rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-pink-500 dark:hover:bg-pink-600"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
    {sampleModal}
    </>
  );
}

export default Cards;
