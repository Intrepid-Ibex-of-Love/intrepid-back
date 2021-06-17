import "dotenv/config";
import "reflect-metadata";
import { createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { UserRouter } from "./routes/user.routes";
import { AuthRouter } from "./routes/auth.routes";
import { ProductRouter } from "./routes/product.routes";
import * as cors from 'cors';

createConnection()

    .then(async connection => {

        const port = 3002;
        // create express app
        const app = express();

        /** Ampliación del tamaño del body parser */
        app.use(bodyParser({limit: '50mb'}));
        app.use(bodyParser.json());
        app.use(cors());

        UserRouter.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
        ProductRouter.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        AuthRouter.forEach(route => {
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

//loop conection