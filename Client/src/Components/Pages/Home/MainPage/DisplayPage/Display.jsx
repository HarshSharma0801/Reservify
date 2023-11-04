import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../Preloader/loader";
import { Typewriter } from "react-simple-typewriter";

const Display = (props) => {
  return (
    <>
      {props.isLoading ? <Loader /> : ""}
      <div className="p-7 text-2xl font-bold flex-1 h-screen">
        <div>
          <h1 className="text-2xl md:text-4xl flex flex-start px-5 text-center text-primary">
            <Typewriter
              words={[
                "Book It, Live It, Love It!",
                "Your Next Adventure Awaits – Reserve Today!",
                "Turning Dreams into Reservations",
                "Reserve, Relax, Rejoice!",
              ]}
              loop={0}
              cursor
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-6 p-5">
          {props.Reserves.length > 0 &&
            props.Reserves.map((Reserve) => {
              return (
                <div className=" md:mt-2 md:w-[300px] md:h-[350px] w-[250px]  h-[308px]  bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
                  <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                    <img
                      src={Reserve.photos[0]}
                      alt="photo"
                      className="w-full h-full "
                    />
                  </div>
                  <div className="p-3">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {Reserve.MainTitle}
                      </h5>
                    </a>
                    <div className="flex justify-between">
                      <p className=" font-normal text-lg text-gray-700 dark:text-gray-400 ">
                        {Reserve.location} ,
                      </p>
                      <p className="flex font-normal text-lg text-gray-700 dark:text-gray-400">
                        {Reserve.rating}
                        <img
                          className="w-6 h-6"
                          src="https://img.icons8.com/emoji/48/star-emoji.png"
                          alt="star-emoji"
                        />
                      </p>
                    </div>
                    <p className="font-normal text-base text-gray-600 dark:text-gray-400">
                      {Reserve.category} at
                    </p>
                    <div className="mt-2 flex justify-between">
                      <p className=" font-normal text-base text-black dark:text-gray-400">
                        <span className="font-bold  text-xl">
                          ${Reserve.price}
                        </span>{" "}
                        {Reserve.category == "accommodation"
                          ? "night"
                          : "table"}
                      </p>
                      <p>
                        <Link
                          to={`/Reserve/${Reserve._id}`}
                          className="text-base text-primary hover:underline"
                        >
                          view details
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Display;
