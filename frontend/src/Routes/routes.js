import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../App/Login"

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component = { Login }  path="/login"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;