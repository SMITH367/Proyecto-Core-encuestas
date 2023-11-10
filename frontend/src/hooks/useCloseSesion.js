const useCloseSesion = (setUserDataStatus) => {
    setUserDataStatus({
        login: false,
        user: null,
        email: null,
    });
    localStorage.removeItem("login");

    localStorage.removeItem("name");

    localStorage.removeItem("email");
};

export {
    useCloseSesion
}