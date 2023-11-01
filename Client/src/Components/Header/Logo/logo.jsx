import logo from '../../../assets/png/logo-no-background.png'
import { Link } from 'react-router-dom'

const LogoFile = ()=>{

    return(
       <Link to={'/'}>
       <img src={logo} alt='logoImage' className=" sm:max-w-[180px] max-w-[100px] py-2 "/>
       </Link> 
    )
}
export default LogoFile