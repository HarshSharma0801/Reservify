import axios from "axios";

const Logged = async (data, navigate , logininfo) => {

  try {
    await axios.post("/login", data).then((res) => {


      const main = res.data;
      let token = main.access;
      localStorage.setItem("accessToken" , token)

     
      
      

 
      logininfo(main) ;



      if (res.data.valid == "success") {
        navigate();
      } else {
        alert("Wrong Password or Email");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default Logged;
