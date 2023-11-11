const useCloseSesion = (setUserDataStatus) => {
    setUserDataStatus({
        login: false,
        user: null,
        email: null,
    });
    localStorage.removeItem("login");

    localStorage.removeItem("user");

    localStorage.removeItem("email");
};

export {
    useCloseSesion
}