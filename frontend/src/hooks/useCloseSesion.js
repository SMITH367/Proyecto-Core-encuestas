import {
    getBACKENDurl
} from "../components/services/getBACKENDurl";
import {
    FetchData
} from "../components/services/fetchData";
import socket from "../hooks/useSocket";
const useCloseSesion = async (setUserDataStatus, user) => {

    try {
        const fetch = new FetchData(`${getBACKENDurl}/logout/${user}`);
        // eslint-disable-next-line
        const data = await fetch.FetchDataApi({}, "POST");

        setUserDataStatus({
            login: false,
            user: null,
            email: null,
        });

        localStorage.removeItem("login");
        localStorage.removeItem("user");
        localStorage.removeItem("email");

        socket.emit("message", user);

    } catch {
        alert("Ha ocurrido un error");
    }
};

export {
    useCloseSesion
}