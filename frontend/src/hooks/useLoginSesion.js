import {
  FetchData
} from "../components/services/fetchData";
import {
  Navigate
} from "react-router-dom";
import { getBACKENDurl } from "../components/services/getBACKENDurl";
import socket from "../hooks/useSocket";


const emitLoginSignal = (user) => {
  console.log("say hello")
  socket.emit("message", user);
};

const useLoginSesion = async (e, setUserDataStatus, user, password) => {

  e.preventDefault()
 
      const fetch = new FetchData(`${getBACKENDurl}/login/${user}`);

      const dataUser = await fetch.FetchDataApi({
          user: user,
          password: password,
        },
        "POST",
      
      );

    
      if (dataUser !== false) {
        emitLoginSignal(user)
        const login = true;
        setUserDataStatus({
          login: login.toString(),
          user: dataUser.user,
          email: dataUser.email,
        });
        localStorage.setItem("login", "true");
        localStorage.setItem("user", dataUser.user);
        localStorage.setItem("email", dataUser.email);
        localStorage.setItem("token", dataUser.accessToken)

        return <Navigate to = {
          "/"
        }
        
        />;
      } else {
        alert("Usuario o contraseña invalidos");
      }
    
};

export {
  useLoginSesion
};