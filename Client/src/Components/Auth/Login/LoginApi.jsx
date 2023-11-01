import axios from "axios";

const Logged = async (data, navigate , logininfo) => {

  try {
    await axios.post("/login", data).then((res) => {
      console.log(res);


      const User = res.data.UserInfo;
      console.log(User);
      logininfo(User) ;



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
