import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Header } from "./Header";
import { Login } from "./Login";
import { Admin } from "./Admin"

import { Usercontext } from "../context/UserContext";

const App = () => {
  let [userDataStatus, setUserDataStatus] = useState({
    login: localStorage.getItem("login"),
    user: localStorage.getItem("user"),
  });

  return (
    <Usercontext.Provider value={userDataStatus}>
      <HashRouter>
        <Header setUserDataStatus={setUserDataStatus}> </Header>{" "}
        <Routes>
          <Route path="/" element={<Home> </Home>} />
          <Route
            path="/login"
            element={<Login setUserDataStatus={setUserDataStatus}> </Login>}
          />
      
           <Route
            path="/admin"
            element={<Admin> </Admin>}
          />
        </Routes>{" "}
      </HashRouter>{" "}
    </Usercontext.Provider>
  );
};

export { App };
