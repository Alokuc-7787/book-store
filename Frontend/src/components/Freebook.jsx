import React, { useEffect, useState } from "react";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);

        setBook(res.data.slice(0, 6));
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
        </div>
      </div>
    </>
  );
}
export default Freebook;
