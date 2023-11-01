import React, { useEffect, useState } from "react";

const SidePanel = (props) => {
  const [isOpen, SetisOpen] = useState(true);
  const [Category, SetCategory] = useState();
  const [Rating, SetRating] = useState({
    min: "",
    max: "",
  });
  const [Price, SetPrice] = useState("300");

  const clicked = () => {
    SetisOpen((prev) => {
      return !prev;
    });
  };
  const handlechangeAcc = () => {
    SetCategory("accommodation");
  };
  const handlechangeRes = () => {
    SetCategory("restaurant");
  };

  useEffect(() => {
    props.Category(Category);
  }, [Category]);

  const handlechangeAll = () => {
    props.All();
  };

  const Rate1 = () => {
    SetRating({
      min: "5.0",
      max: "5.1",
    });
  };
  const Rate2 = () => {
    SetRating({
      min: "4.5",
      max: "5.0",
    });
  };
  const Rate3 = () => {
    SetRating({
      min: "4.0",
      max: "4.5",
    });
  };
  const Rate4 = () => {
    SetRating({
      min: "0.0",
      max: "4.0",
    });
  };

  useEffect(() => {
    props.FilterRating(Rating.max, Rating.min);
  }, [Rating]);

  const RangeSlider = (e) => {
    SetPrice(e.target.value);
  };

  useEffect(() => {
    props.FilterPrice(Price);
  }, [Price]);

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-10"
      }  md:block   duration-500 rounded-r-xl hidden h-screen text-white bg-secondary relative `}
    >
      <div className="absolute -right-3 top-9 w-7">
        <svg
          onClick={clicked}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            isOpen ? "rotate-180" : ""
          } cursor-pointer rounded-full  w-7 border-2 font-bolder text-white bg-primary border-primary`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } duration-500 flex-col gap-3 justify-center text-center`}
      >
        <div className="flex justify-center gap-2 py-2 text-xl font-bold">
          <div>All</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 my-1 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
        </div>
        <div>
          <button
            onClick={handlechangeAll}
            type="button"
            className="rounded-lg  border border-gray  bg-white text-sm font-medium px-4 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
          >
            All Reserves
          </button>
        </div>
        <div className="flex justify-center gap-2 py-2 text-xl font-bold">
          <div>Category</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 my-1 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between m-2">
          <div>
            <button
              onClick={handlechangeAcc}
              type="button"
              className="rounded-lg flex-1  border border-gray  bg-white text-sm font-medium px-4 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              Accomodation
            </button>
          </div>
          <div>
            <button
              onClick={handlechangeRes}
              type="button"
              className="rounded-lg flex-1  border border-gray  bg-white text-sm font-medium px-4 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              Restaurant
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 py-2 text-xl font-bold">
          <div>Rating</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 my-1 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
        </div>
        <div className="grid  grid-cols-2 gap-4 m-2">
          <div>
            <button
              onClick={Rate1}
              type="button"
              className="rounded-lg flex-1  border border-gray  bg-white text-sm font-medium px-8 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              5.0⭐
            </button>
          </div>
          <div>
            <button
              onClick={Rate2}
              type="button"
              className="rounded-lg   border border-gray  bg-white text-sm font-medium px-1 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              4.5⭐ - 5.0⭐
            </button>
          </div>

          <div>
            <button
              onClick={Rate3}
              type="button"
              className="rounded-lg   border border-gray  bg-white text-sm font-medium px-1 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              4.0⭐ - 4.5⭐
            </button>
          </div>
          <div>
            <button
              onClick={Rate4}
              type="button"
              className="rounded-lg   border border-gray  bg-white text-sm font-medium px-8 py-2 text-black hover:bg-primary hover:text-white focus:z-10   focus:text-white focus:bg-primary"
            >
              {`< `}4.0⭐
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 py-2 text-xl font-bold">
          <div>Price</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 my-1 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <input
            defaultValue="300"
            type="range"
            min="0"
            step="1"
            max="300"
            onChange={RangeSlider}
            className="transparent h-2 w-3/4 accent-primary  appearance-none rounded-lg border-transparent bg-neutral-200"
          />

          <h1>$0 - ${Price}</h1>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
