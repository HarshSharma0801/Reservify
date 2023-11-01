import axios from 'axios'


const  SignedUp = async(data , navigate)=>{
   
try {
    alert("You are Registered , You can Login Now");
    navigate();
    await axios.post('/register' , data );


} catch (error) {
    console.log(error);
}



}

export default SignedUp
