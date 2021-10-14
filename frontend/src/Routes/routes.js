import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../App/Login";
import Register from "../App/Register";
import Courses from "../App/Courses";
import Registration from "../App/Registration";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component = { Courses }  path="/" exact/>
                <ProtectedRoute component = { Registration }  path="/registration-course"/>
                <Route component = { Login }  path="/login"/>
                <Route component = { Register }  path="/create-login"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;