import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../App/Login";
import Register from "../App/Register";
import Home from "../Components/Home";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <ProtectedRoute component = { Home }  path="/" exact/>
                <Route component = { Login }  path="/login"/>
                <Route component = { Register }  path="/create-login"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;