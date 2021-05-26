import {CategoryController} from "../controller/CategoryController";

export const Routes = [{
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
}, {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "one"
}, {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "save"
}, {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "remove"
}];