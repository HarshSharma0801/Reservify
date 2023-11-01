import axios from "axios";
import { useState, useEffect } from "react";
import LogoFile from "../Header/Logo/logo";
import { useNavigate } from "react-router";
import Loader from "../Preloader/loader";
import UserAccount from "../Header/UserAccount/AccountUser";
import { Link } from "react-router-dom";
const YourReserve = () => {
  const navigate = useNavigate();
  const [Data, SetData] = useState([]);
  const [Id, SetId] = useState();
  const [isLoading, SetisLoading] = useState(false);

  useEffect(() => {
    SetisLoading(true);
    axios.get("/getYourReserve").then((res) => {
      SetData(res.data);
    });
  }, []);

  if (Data) {
    setTimeout(() => {
      SetisLoading(false);
    }, 1500);
  }

  const Edit = (id) => {
    navigate(`/Edit/${id}`);
  };

  const [isDelete, SetisDelete] = useState(false);

  const DeleteClick = (id) => {
    SetId(id);
    SetisDelete(true);
  };
  const Cross = () => {
    SetisDelete(false);
  };
  const RemoveReserve = async () => {
    SetisLoading(true);
    const data = { id: Id };
    try {
      axios.post("/DeleteReserve", data).then((res) => {
        if ((res.data.msg = "Deleted")) {
          navigate("/");
        }
      });
    } catch (error) {}
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
      <div className="flex justify-center text-center">
        <div className="md:text-2xl font-bold">Your Reserves</div>
      </div>

      <>
        <div className="md:m-10 m-3 grid md:grid-cols-3 grid-cols-1 gap-3">
          {Data.length > 0 &&
            Data.map((Reserve) => {
              return (
                <div className="  md:w-[351px] md:h-[418px] w-[300px] h-[368px] m-auto bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                  <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                    <img
                      src={Reserve.photos[0]}
                      alt="photo"
                      className="w-full h-full "
                    />
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {Reserve.MainTitle}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      situated at {Reserve.location} in the category{" "}
                      {Reserve.category}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                      created at {Reserve.Date}
                    </p>
                    <div className="flex justify-between md:pt-2 ">
                      <button
                        onClick={() => {
                          Edit(Reserve._id);
                        }}
                        className="inline-flex items-center md:px-3 md:py-2 p-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Customize
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => DeleteClick(Reserve._id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Remove
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3.5 h-3.5 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className={`${
            isDelete ? "fixed" : "hidden"
          } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
        >
          <div
            className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
          >
            <div
              onClick={Cross}
              className="ml-[200px] md:ml-[400px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="pb-[10px]">
              <h1 className="m-0 font-bold md:text-2xl">
                you really want to remove ?
              </h1>
            </div>
            <div>
              <button
                onClick={RemoveReserve}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default YourReserve;
