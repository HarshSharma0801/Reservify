import React ,{useState , useEffect} from "react";
import User from "./UserContext";
import axios from 'axios'


const UserProvider = ({children})=>{

const [UserDataCtx , SetUserDataCtx] = useState(null);
const [hasData , SetHasData] = useState(false);






useEffect(()=>{
    const getdata = ()=>{
    
        const token  = localStorage.getItem("accessToken");
        const headers = {
            'Authorization': `Bearer ${token}`,
            // Add other headers as needed
          };
          const config = {
            headers: headers
          };
          
    
        axios.get('/Token' , config).then((user)=>{
            if(user){
                
                SetUserDataCtx(user.data.Userdata);
            }
            SetHasData(true)
       
        });
    }
    getdata();
},[])
return(
    <User.Provider value={{UserDataCtx , SetUserDataCtx , hasData , SetHasData}}>
        {children}
    </User.Provider>
)

}

export default UserProvider