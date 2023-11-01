import { useContext } from "react"
import LogoFile from "./Logo/logo"
import SearchBar from "./SearchBar/Search"
import UserAccount from "./UserAccount/AccountUser"
import {Link} from 'react-router-dom'
import User from "../../ContextApi/User/UserContext"

const Header = (props)=>{
  const {UserDataCtx} = useContext(User);
   
    return(

        <div className="flex justify-between w-screen p-4 sm:px-5">

            <div >
             <LogoFile/>
            </div>

            <div>
                <SearchBar SearchFilter={props.SearchFilter}/>
            </div>

            <Link to={UserDataCtx? '/account' : '/login'}>
             <UserAccount/>
            </Link>

        </div>
       
    )
}
export default Header