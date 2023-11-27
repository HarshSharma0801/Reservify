import axios from "axios"


const AddReserveApi = async(data , navigate)=>{

    const token  = localStorage.getItem("accessToken");
    const headers = {
        'Authorization': `Bearer ${token}`,
        // Add other headers as needed
      };
      const config = {
        headers: headers
      };
  
try {
     
    await axios.post('/addReserve' , data , config).then(res=>{
        if(res.data.msg=='send'){
            navigate();
        }
    })

} catch (error) {
    console.log(error);
}

}

export default AddReserveApi