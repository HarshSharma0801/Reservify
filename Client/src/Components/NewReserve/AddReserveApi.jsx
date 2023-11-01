import axios from "axios"


const AddReserveApi = async(data , navigate)=>{
  
try {
     
    await axios.post('/addReserve' , data).then(res=>{
        if(res.data.msg=='send'){
            navigate();
        }
    })

} catch (error) {
    console.log(error);
}

}

export default AddReserveApi