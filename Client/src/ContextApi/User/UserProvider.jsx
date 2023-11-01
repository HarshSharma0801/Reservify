import React ,{useState , useEffect} from "react";
import User from "./UserContext";
import axios from 'axios'


const UserProvider = ({children})=>{

const [UserDataCtx , SetUserDataCtx] = useState();
const [hasData , SetHasData] = useState(false);

useEffect(()=>{
if(!UserDataCtx){
    axios.get('/CookieToken').then((user)=>{
        if(user){
            SetUserDataCtx(user.data);
        }
        SetHasData(true)
   
    });
}
},[])


return(
    <User.Provider value={{UserDataCtx , SetUserDataCtx , hasData}}>
        {children}
    </User.Provider>
)

}

export default UserProvider