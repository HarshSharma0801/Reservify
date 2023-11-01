import React, { useEffect, useState } from "react";
import SidePanel from "./MainPage/SideBar/SidePanel";
import Display from "./MainPage/DisplayPage/Display";
import axios from "axios";
import Header from "../../Header/Header";

const PrimaryPage = () => {
  const [isLoading, SetisLoading] = useState(false);
  const [Reserves, SetReserves] = useState([]);
  const [ReservesConstant, SetReservesConstant] = useState([]);

  useEffect(() => {
    SetisLoading(true);
    axios.get("/").then((res) => {
      SetReserves(res.data);
      SetReservesConstant(res.data);
    });
  }, []);
  if (Reserves) {
    setTimeout(() => {
      SetisLoading(false);
    }, 1200);
  }

  const FilterCategory = (cat) => {
    const main = ReservesConstant;
    let reserves = main.filter((reserve) => reserve.category === cat);
    SetReserves(reserves);
  };

  const AllReserves = () => {
    SetReserves(ReservesConstant);
  };

  const FilterRating = (max, min) => {
    const main = ReservesConstant;
    let reserves = main.filter(
      (reserve) =>
        parseFloat(reserve.rating) < max && parseFloat(reserve.rating) >= min
    );
    SetReserves(reserves);
  };

  const FilterPrice = (max) => {
    const main = ReservesConstant;
    let reserves = main.filter((reserve) => parseFloat(reserve.price) <= max);
    SetReserves(reserves);
  };

  const SearchFilter = (search)=>{
    const main = ReservesConstant;
    let reserves = main.filter((reserve) =>  reserve.MainTitle.toLowerCase().search(search.toLowerCase().trim()) !==
    -1);
    SetReserves(reserves);
  }

  return (
    <>
      <Header SearchFilter={SearchFilter}/>

      <div className="flex h-screen ">
        <SidePanel
          className="h-screen"
          Category={FilterCategory}
          All={AllReserves}
          FilterRating={FilterRating}
          FilterPrice={FilterPrice}
        />
        <Display Reserves={Reserves} isLoading={isLoading} />
      </div>
    </>
  );
};

export default PrimaryPage;
