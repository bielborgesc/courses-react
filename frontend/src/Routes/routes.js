import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../App/Login";
import Register from "../App/Register";
import Courses from "../App/Courses";
import ProtectedRoute from "./ProtectedRoute";
import CreateCourse from "../App/CreateCourse";
import CreateLesson from "../App/CreateLesson";
import DashboardTeacher from "../App/DashboardTeacher";
import DashboardStudent from "../App/DashboardStudent";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component = { Courses }  path="/" exact/>
                <ProtectedRoute component = { CreateCourse }  path="/new-course"/>
                <ProtectedRoute component = { CreateLesson }  path="/new-lesson/:idCourse"/>
                <ProtectedRoute component = { DashboardStudent }  path="/dashboard-student"/>
                <ProtectedRoute component = { DashboardTeacher }  path="/dashboard-teacher"/>
                <Route component = { Login }  path="/login"/>
                <Route component = { Register }  path="/create-login"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;