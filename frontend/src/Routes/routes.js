import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../App/Login"
import Cadastro from "../App/Cadastro"

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component = { Login }  path="/login"/>
            <Route component = { Cadastro }  path="/cadastrar"/>
        </BrowserRouter>
    )
}

export default Routes;