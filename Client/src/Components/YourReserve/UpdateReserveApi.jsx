import axios from "axios";


const UpdateReserveApi = async(Data , navigate)=>{

  
    try {
        await axios.post('/Edit/:id' , Data).then(res=>{
            if(res.data.msg='Updated'){
                navigate();
            }
        })
        
    } catch (error) {
        
    }
}

export default UpdateReserveApi