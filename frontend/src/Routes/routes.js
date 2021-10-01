import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../App/Login"

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component = { Login }  path="/login"/>
        </BrowserRouter>
    )
}

export default Routes;