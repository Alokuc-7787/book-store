import React, { useEffect, useState } from "react";

import axios from "axios";

import Cards from "./Cards";

const coverImage = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const defaultPopularBooks = [
  {
    id: "popular-1",
    name: "Introduction to Algorithms",
    title: "Algorithms, data structures, graph theory and complexity for CS fundamentals.",
    category: "Computer Science",
    type: "Book",
    price: 699,
    badge: "Core",
    image: coverImage("9780262033848"),
  },
  {
    id: "popular-2",
    name: "Data Structures and Algorithms in Java",
    title: "Arrays, linked lists, trees, graphs, sorting and interview problem solving.",
    category: "Data Structures",
    type: "Book",
    price: 599,
    badge: "New",
    image: coverImage("9781118771334"),
  },
  {
    id: "popular-3",
    name: "Operating System Concepts",
    title: "Processes, scheduling, memory management, deadlock and file systems.",
    category: "Operating System",
    type: "Book",
    price: 549,
    badge: "Top Rated",
    image: coverImage("9781119456339"),
  },
  {
    id: "popular-4",
    name: "Database System Concepts",
    title: "SQL, ER model, normalization, transactions and database design fundamentals.",
    category: "Database Systems",
    type: "Book",
    price: 499,
    badge: "Popular",
    image: coverImage("9780073523323"),
  },
  {
    id: "popular-5",
    name: "Computer Networking: A Top-Down Approach",
    title: "TCP/IP, routing, switching and networking fundamentals for students.",
    category: "Computer Networks",
    type: "Book",
    price: 479,
    badge: "Loved",
    image: coverImage("9780133594140"),
  },
  {
    id: "popular-6",
    name: "Engineering Mathematics",
    title: "Calculus, matrices, differential equations and numerical methods.",
    category: "Mathematics",
    type: "Book",
    price: 459,
    badge: "Important",
    image: coverImage("9788126515450"),
  },
];

function Freebook() {
  const [book, setBook] = useState(defaultPopularBooks);
  const popularBooks = book.slice(0, 6);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setBook(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Popular Books</h1>
          <p>
            Explore selected books and learning resources to start reading today.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {popularBooks.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
        </div>
      </div>
    </>
  );
}
export default Freebook;
