import { MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
import { ProductController } from "../controller/ProductController";

export const ProductRouter = [{
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
},
{
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "one"
},
{
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "save"
},
{
    method: "get",
    route: "/products/user/:id",
    controller: ProductController, 
    action: "getProductByUser"
}
,
{
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    action: "remove"
},
{
    method: "put",
    route: "/products",
    controller: ProductController,
    action: "update"
}];