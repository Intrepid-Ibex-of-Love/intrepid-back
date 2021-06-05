import {AuthController} from "../controller/AuthController";


export const AuthRouter = [{
    method: "post",
    route: "/login",
    controller : AuthController,
    action: "login"
},{
    method: "post",
    route: "/register",
    controller : AuthController,
    action: "register"
},{
    method: "post",
    route: "/verify/:confirmationCode",
    controller : AuthController,
    action: "verifyUser"
}]


// export const UserRouter = [{
//     method: "get",
//     route: "/users",
//     controller: AuthController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/users/:id",
//     controller: AuthController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/users",
//     controller: AuthController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users/:id",
//     controller: AuthController,
//     action: "remove"
// }];