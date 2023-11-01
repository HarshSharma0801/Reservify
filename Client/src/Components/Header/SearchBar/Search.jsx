import { useEffect, useState } from "react";

const SearchBar = (props) => {
 
 const [SearchInput , SetSearchInput] = useState(); 

const Search =(e)=>{
SetSearchInput(e.target.value)
}
  
useEffect(()=>{
 props.SearchFilter(SearchInput);
} , [SearchInput])



  return (
    <div className="flex border border-gray-300 sm:p-3 rounded-2xl shadow-md shadow-gray-300 p-[0.98]  ">
      <input
      onChange={Search}
        type="text"
        placeholder="Seach here anything ?"
        className="outline-none font-bold sm:placeholder:font-medium  sm:placeholder:text-[1rem] sm:w-72 w-32 h-[25px] px-2 rounded-full placeholder:text-[0.65rem]"
      />
      <button className="bg-primary text-white font-bold p-1 rounded-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
