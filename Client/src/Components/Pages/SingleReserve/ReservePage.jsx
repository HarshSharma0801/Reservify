import React, { useState, useEffect, useContext } from "react";
import LogoFile from "../../Header/Logo/logo";
import axios from "axios";
import { useParams, useNavigate,  } from "react-router";
import Datepicker from "react-tailwindcss-datepicker";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../Preloader/loader";
import User from "../../../ContextApi/User/UserContext";
import UserAccount from "../../Header/UserAccount/AccountUser";
import { Link } from "react-router-dom";

const ReservePage = () => {
  const { UserDataCtx, hasData } = useContext(User);
  const nav = useNavigate();
  const [Data, SetData] = useState();
  const { id } = useParams();
  const [count, Setcount] = useState(0);
  const [Provider, SetProvider] = useState();
  const [isLoading, SetisLoading] = useState(false);

  const [BookingDetails, SetBookingDetails] = useState({
    Owner: "",
    MainTitle: "",
    Schedule: "",
    photo: "",
    address: "",
    location: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    SetisLoading(true);
    axios.get(`/Reserve/${id}`).then((res) => {
      SetData(res.data);
    });
  }, []);
  if (Data) {
    setTimeout(() => {
      SetisLoading(false);
    }, 1000);
  }

  useEffect(() => {
    axios
      .post("/Reserve/Provider", Data && { id: Data.Provider })
      .then((res) => {
        SetProvider(res.data);
      });
  }, [Data]);

  const Nextphoto = () => {
    if (Data && count == Data.photos.length - 1) {
      Setcount(0);
    } else {
      Setcount((prev) => {
        return prev + 1;
      });
    }
  };
  const Previousphoto = () => {
    if (Data && count == 0) {
      Setcount(0);
    } else {
      Setcount((prev) => {
        return prev - 1;
      });
    }
  };
  const [Checkin, SetCheckIn] = useState();
  const [Checkout, SetCheckOut] = useState();

  const [TableTime, SetTableTime] = useState("5:00 PM");
  const [Tables, SetTables] = useState(1);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    SetCheckIn(newValue.startDate);
    SetCheckOut(newValue.endDate);
  };
  let days = 0;
  if (Checkin && Checkout) {
    days = differenceInCalendarDays(new Date(Checkout), new Date(Checkin));
  }

  const TimeChange = (e) => {
    SetTableTime(e.target.value + " PM");
  };

  useEffect(() => {
    if ((Checkin && Checkout) || (Checkin && TableTime)) {
      if (Data && Data.category == "restaurant" && Checkin && Checkout) {
        SetBookingDetails({
          ...BookingDetails,
          Owner: Provider && Provider.name,
          MainTitle: Data && Data.MainTitle,
          Schedule: `Reserve on ${Checkin && Checkin} from ${TableTime}`,
          photo: Data && Data.photos[0],
          address: Data && Data.address,
          location: Data && Data.location,
          amount: (Data && Data.price) * (Tables && Tables),
          category: Data && Data.category,
        });
      }
      if (Data && Data.category == "accommodation") {
        SetBookingDetails({
          ...BookingDetails,
          Owner: Provider && Provider.name,
          MainTitle: Data && Data.MainTitle,
          Schedule: `Reserve on ${Checkin && Checkin} from ${
            Checkout && Checkout
          }`,
          photo: Data && Data.photos[0],
          address: Data && Data.address,
          location: Data && Data.location,
          amount: (Data && Data.price) * (days && days),
          category: Data && Data.category,
        });
      }
    }
  }, [Checkin, TableTime, Tables]);

  const [isValid, SetisValid] = useState(false);
  useEffect(() => {
    axios.post("/Booking", BookingDetails).then((res) => {
      if (res.data.msg == "cookie") {
        SetisValid(true);
      }
    });
  }, [BookingDetails]);

  const MakePaymentAcc = async () => {
    if (!UserDataCtx && hasData) {
      nav("/login");
    } else {
      const stripe = await loadStripe(
        "pk_test_51NnoXmSFHehR7P6bVlnz2V2A5VkVFjJYd8Veu7SZNvQYvT35zXs2f9e4dKHu6iyIJkm0uXc1rKjjjq0ksiWBEagA00hLiQAEzM"
      );
      const Paybody = {
        amount: (Data && Data.price) * (days && days),
        name: Data && Data.MainTitle,
        schedule: `Enjoy your Reserve from ${Checkin} to ${Checkout}`,
      };

      try {
        await axios
          .post("/Payment", { Pay: Paybody, Book: BookingDetails })
          .then((res) => {
            if (isValid) {
              const result = stripe.redirectToCheckout({
                sessionId: res.data.id,
              });
              if (result.error) {
                console.log(result.error);
              }
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const MakePaymentRes = async () => {
    if (!UserDataCtx && hasData) {
      nav("/login");
    } else {
      const stripe = await loadStripe(
        "pk_test_51NnoXmSFHehR7P6bVlnz2V2A5VkVFjJYd8Veu7SZNvQYvT35zXs2f9e4dKHu6iyIJkm0uXc1rKjjjq0ksiWBEagA00hLiQAEzM"
      );
 
      const Paybody = {
        amount: (Data && Data.price) * (Tables && Tables),
        name: Data && Data.MainTitle,
        schedule: `Enjoy your Reserve on ${Checkin} from ${TableTime}`,
      };
      try {
        await axios
          .post("/Payment", { Pay: Paybody, Book: BookingDetails })
          .then((res) => {
            if (isValid) {
              const result = stripe.redirectToCheckout({
                sessionId: res.data.id,
              });
              if (result.error) {
                console.log(result.error);
              }
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
 

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
        <div>
        <Link to={'/account'}>
          <UserAccount />

          </Link>
        </div>
      </div>
      <div className="md:m-12 m-4 pt-4 bg-gray-200 p-2 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-lg md:text-3xl font-medium">
            {Data && Data.MainTitle}
          </h1>
          <p className="flex font-normal text-lg text-gray-700 dark:text-gray-400">
            {Data && Data.rating}
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/emoji/48/star-emoji.png"
              alt="star-emoji"
            />
          </p>
        </div>

        <div className="md:flex justify-between mt-2">
          <div>
            <h2 className="text-gray-700 ">
              {" "}
              <span className="md:text-xl font-medium">
                {Data && Data.location}{" "}
              </span>{" "}
              , {Data && Data.address}
            </h2>
          </div>
          <div>
            <span className="font-bold">posted by :</span>{" "}
            {Provider && Provider.name}
          </div>

          {"  "}
        </div>
        <div className="h-[300px] md:max-w-[900px] md:h-[588px] w-full m-auto py-4 px-4 relative">
          <div
            style={{ backgroundImage: `url(${Data && Data.photos[count]})` }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
          <div
            onClick={Nextphoto}
            className="absolute top-[50%] text-2xl p-2 cursor-pointer right-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 bg-gray-200 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div
            onClick={Previousphoto}
            className="absolute top-[50%] text-2xl p-2 cursor-pointer left-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 bg-gray-200 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-lg md:text-3xl font-lg">About this place</h1>
          <p className="mt-2 text-sm md:text-lg text-gray-600">
            {Data && Data.description}
          </p>
        </div>

        <div className="mt-4">
          <h1 className="text-lg md:text-3xl font-lg">Amenities</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4">
            {Data &&
              Data.amenities.map((item) => {
                return (
                  <div className="pt-3 flex text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 px-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                      />
                    </svg>{" "}
                    {item}
                  </div>
                );
              })}
          </div>

          <div className="flex justify-center text-center md:m-5 m-4">
            <div className="flex flex-col gap-8 text-lg md:text-xl bg-gray-300 p-4 rounded-xl">
              {Data && Data.category == "accommodation" && (
                <>
                  <div>Price : ${Data && Data.price}/night</div>
                  <div className="block justify-center py-3">
                    <div>Schedule</div>
                    <Datepicker
                      minDate={new Date()}
                      value={value}
                      onChange={handleValueChange}
                      separator={"to"}
                    />
                  </div>
                  <div className="block md:flex gap-6">
                    <div className="block justify-center py-3">
                      <div>
                        <h1>CheckIn</h1>
                      </div>
                      <input
                        type="text"
                        className="py-2 px-3 rounded-2xl"
                        value={Checkin}
                      />
                    </div>
                    <div className="block justify-center py-3">
                      <div>
                        <h1>CheckOut</h1>
                      </div>
                      <input
                        type="text"
                        className="py-2 px-3 rounded-2xl"
                        value={Checkout}
                      />
                    </div>
                  </div>
                  <div className="block gap-3 ">
                    <div className="text-2xl p-1 py-2">Your Total:</div>
                    {Checkin && (
                      <>
                        <div className="flex flex-col justify-center text-center gap-4 md:flex md:flex-row md:justify-between  md:px-5 md:py-4">
                          <div className="flex justify-center gap-3 text-center font-semibold text-gray-800">
                            <span className="border border-gray-700 p-1 rounded-lg">
                              ${Data && Data.price}{" "}
                            </span>{" "}
                            <span className="p-1">X</span>{" "}
                            <span className="border border-gray-700 p-1 rounded-lg">
                              {days && days} nights
                            </span>
                          </div>
                          <div className="p-1 text-2xl">
                            ${(Data && Data.price) * (days && days)}
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={MakePaymentAcc}
                            className=" md:w-1/2   mx-auto flex justify-center md:text-xl border border-transparent p-2 md:py-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Book Reserve
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {Data && Data.category == "restaurant" && (
                <>
                  <div>Price : ${Data && Data.price}/table for 2</div>
                  <div className="block justify-center py-3">
                    <div>Schedule</div>
                    <div className="py-3">
                      <Datepicker
                        minDate={new Date()}
                        useRange={false}
                        asSingle={true}
                        value={value}
                        onChange={handleValueChange}
                      />
                    </div>

                    <div class="flex flex-col text-center justify-center gap-3">
                      <div>
                        <h1>Select Time</h1>
                      </div>

                      <div class="m-auto  p-5 w-40 bg-white rounded-lg shadow-xl">
                        <div class="flex">
                          <select
                            onChange={TimeChange}
                            name="hours"
                            className="bg-transparent text-xl appearance-none outline-none cursor-pointer"
                          >
                            <option className="p-4 rounded-lg " value="5:00">
                              5:00
                            </option>
                            <option className="px-4 " value="5:30">
                              5:30
                            </option>
                            <option className="px-4 " value="6:00">
                              6:00
                            </option>
                            <option className="px-4 " value="6:30">
                              6:30
                            </option>
                            <option className="px-4 " value="7:00">
                              7:00
                            </option>
                            <option className="px-4 " value="7:30">
                              7:30
                            </option>
                            <option className="px-4 " value="8:00">
                              8:00
                            </option>
                            <option className="px-4 " value="8:30">
                              8:30
                            </option>
                            <option className="px-4 " value="9:00">
                              9:00
                            </option>
                            <option className="px-4 " value="9:30">
                              9:30
                            </option>
                            <option className="px-4 " value="10:00">
                              10:00
                            </option>
                            <option className="px-4 " value="10:30">
                              10:30
                            </option>
                            <option className="px-4 " value="11:00">
                              11:00
                            </option>
                          </select>

                          <span className="px-2">PM</span>
                        </div>
                      </div>
                      <div>Select Tables</div>
                      <input
                        type="number"
                        value={Tables}
                        onChange={(e) => {
                          SetTables(e.target.value);
                        }}
                        className="p-1 rounded-lg outline-none"
                      />
                    </div>

                    <div>Your Total:</div>
                    {Checkin && (
                      <>
                        <div className="flex flex-col justify-center text-center gap-4 md:flex md:flex-row md:justify-between  md:px-5 md:py-4">
                          <div className="flex justify-center gap-3 text-center font-semibold text-gray-800">
                            <span className="border border-gray-700 p-1 rounded-lg">
                              ${Data && Data.price}{" "}
                            </span>{" "}
                            <span className="p-1">X</span>{" "}
                            <span className="border border-gray-700 p-1 rounded-lg">
                              {Tables && Tables} Tables
                            </span>
                          </div>
                          <div className="p-1 text-2xl">
                            ${(Data && Data.price) * (Tables && Tables)}
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={MakePaymentRes}
                            className=" md:w-3/4   mx-auto flex justify-center md:text-xl border border-transparent p-2 md:py-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Book Reserve
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservePage;
