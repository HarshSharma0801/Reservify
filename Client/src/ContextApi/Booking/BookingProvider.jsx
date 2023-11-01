import React ,{useState , useEffect} from "react";
import BookingData from "./BookingContext";


const BookingProvider = ({children})=>{

const [BookingDataCtx , SetBookingDataCtx] = useState();



return(
    <BookingData.Provider value={{BookingDataCtx , SetBookingDataCtx}}>
        {children}
    </BookingData.Provider>
)

}

export default BookingProvider