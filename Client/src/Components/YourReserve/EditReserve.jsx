import { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router";
import LogoFile from "../Header/Logo/logo";
import axios from "axios";
import PhotosApi from "../NewReserve/FormPhotosApi";
import UpdateReserveApi from "./UpdateReserveApi";
import Loader from "../Preloader/loader";
const EditReserve = () => {
  const { id } = useParams();
  const [Data, SetData] = useState();
  const [FileInput, SetFileInput] = useState([]);
  const [NewFileInput, SetNewFileInput] = useState([]);

  const [SelectedFile, SetSelectedFile] = useState("");
  const [isDataReady, SetDataReady] = useState(false);
  const [isLoading,SetisLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`/Edit/${id}`).then((res) => {
      SetData(res.data);
    });
  }, []);

   useEffect(()=>{
   SetFileInput(Data && Data.photos)

  },[Data])

  const navigate = ()=>{
    Navigate('/');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetData({
      ...Data,
      [name]: value,
    });
  };
  
  const HandlePhotoChange = (e) => {
    const files = e.target.files[0];
    UrlPhotos(files);
  };

  const UrlPhotos = (files) => {
    const reader = new FileReader();

    reader.readAsDataURL(files);
    reader.onloadend = () => {
      SetSelectedFile(reader.result);
    };
  };

  if (SelectedFile != "") {
    SelectedFile && NewFileInput.push(SelectedFile);
    SetSelectedFile("");
  }
  const GetPhotosLink = (arr) => {
  const urls = arr.map(photo => photo.url);
  const UpdatedUrls = FileInput.concat(urls);
    if (arr) {
      SetData({ ...Data, photos: UpdatedUrls });
      SetDataReady(true);
    }
  };

  if (isDataReady) {
    console.log(Data);
    UpdateReserveApi( Data , navigate);
  }

  const EditSubmit =  (e)=>{
  SetisLoading(true);  
  e.preventDefault();
  PhotosApi(NewFileInput,GetPhotosLink)

  }

  return (
    <>
    {isLoading ? <Loader/> : ''}
      <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
      </div>
      <div className="flex text-center justify-center gap-2">
        <div className="md:text-3xl text-gray-600">Customize Your Reserve</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="md:w-7 md:h-8 w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>
      <form className="h-[100%] mt-10 mb-10 mx-4" onSubmit={EditSubmit}>
        <div className="flex flex-col md:gap-8 gap-3 md:m-5">
          <div>
            <label
              className="flex  gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="MainTitle"
            >
              Title{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </label>
            <input
              value={Data && Data.MainTitle}
              onChange={handleChange}
              type="text"
              name="MainTitle"
              id="MainTitle"
              placeholder="Main Title"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div>
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="MainTitle"
            >
              Location
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </label>
            <input
              value={Data && Data.location}
              onChange={handleChange}
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>

          <div>
            <label
              className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="MainTitle"
            >
              Address{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            </label>
            <input
              value={Data && Data.address}
              onChange={handleChange}
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="w-3/4 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>

          <div>
            <label
              className="flex md:gap-1 gap-[0.5rem] text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="category"
            >
              Category{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </label>
            <select
              value={Data && Data.category}
              onChange={handleChange}
              name="category"
              id="category"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="restaurant">Restaurant</option>
              <option value="accommodation">Accommodation</option>
            </select>
          </div>

          <div>
            <label className="flex gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 ">
              Photos{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </label>

            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
              {FileInput &&
                FileInput.map((url) => {
                  return (
                    <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                      <img src={url} alt="photo" className="w-full h-full " />
                    </div>
                  );
                })}
                    {NewFileInput &&
                NewFileInput.map((url) => {
                  return (
                    <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                      <img src={url} alt="photo" className="w-full h-full " />
                    </div>
                  );
                })}

              <label className="border border-gray-400 md:p-8 cursor-pointer mt-3 p-4 md:text-2xl text-gray-600 md:rounded-lg text-center flex justify-center px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-5 md:w-7 md:h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>{" "}
                Upload <input onChange={HandlePhotoChange} type="file" name="photos" className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label
              className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="description"
            >
              Description
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </label>
            <textarea
              value={Data && Data.description}
              onChange={handleChange}
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-[100%] outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>

          <div>
            <label
              className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="price"
            >
              Price (in $){" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
            </label>
            <input
              value={Data && Data.price}
              onChange={handleChange}
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              className="w-1/4 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>

          <div>
            <label
              className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-3xl md:font-bolder font-bold mb-2 "
              htmlFor="price"
            >
              Amenities (in commas){" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </label>
            <input
              value={Data && Data.amenities}
              onChange={handleChange}
              type="text"
              name="amenities"
              id="amenities"
              placeholder="Amenities"
              className="w-3/4 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className=" md:w-1/4 my-[30px]  mx-auto flex justify-center md:text-xl border border-transparent p-2 md:py-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default EditReserve;
