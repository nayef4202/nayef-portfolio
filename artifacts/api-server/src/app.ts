import express, { type Express } from "express";
import cors from "cors";
import * as pinoHttpModule from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const getPinoHttp = (): any => {
  const mod: any = pinoHttpModule;
  return mod.pinoHttp || mod.default || mod;
};

const pinoMiddleware = getPinoHttp();

app.use(
  pinoMiddleware({
    logger,
    serializers: {
      req: (req: any) => {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res: (res: any) => {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
