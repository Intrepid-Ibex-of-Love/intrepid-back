import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes/user.routes";
import {User} from "./entity/User"
import {Category} from "./entity/Category"
import {Product} from "./entity/Product"


createConnection(    {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "community",
    "synchronize": true,
    "logging": false,
    "entities": [User, Category, Product],
}
).then(async connection => {

    const port = 3002;
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(port, () => {
        console.log(`Running.. ${port}`);
    });

}).catch(error => console.log(error));
