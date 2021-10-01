import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../App/Login"
import Home from "../App/Home";
import ProtectedRoute from "./ProtectedRoute";
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component = { Login }  path="/login"/>
                <ProtectedRoute component = { Home }  path="/" exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;