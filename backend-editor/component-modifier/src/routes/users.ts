import express from "express";
import session from "express-session";
import { initRegistry } from "../utils/RegisterList";
import { EditableRegistry } from "../utils/EditableRegistry";
import { Editable } from "../utils/Editable";
import { folderTypeEditable } from "../utils/folderTypeEditable";
import { FileTypeEditable } from "../utils/FileTypeEditable";

import { deleteFolderSync, overwriteFolder } from "../utils/fileUtils";
import { HistoryUtil } from "../utils/histroyUtils";

import { ComponentsType } from "../utils/ComponentType/ComponentsFolderTypeEditable";
import { Request, Response, NextFunction } from "express";
import { buildWrapper } from "../utils/build/build";
import { isBinary } from "../utils/fileUtils";
import {rootPath} from "electron-root-path"
import path from "path"
import logger from "../utils/logger"

interface EditableMap<T> {
  [key: string]: T;
}
const sessionInstances: EditableMap<ComponentsType> = {};
let currentSessionID: string = "";
const history = new HistoryUtil(5);

const forkedCompPath = isBinary? path.join(rootPath,"../","FORKED_REPO/api/components") : `../../../FORKED_REPO/api/components`

initRegistry();

export const app = express();
app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if you're using HTTPS
  })
);

app.all("/guide/*", async (req: any, res, next) => {
  const fullPath = req.params[0];
  const pathSegments = fullPath.split("/");
  if (pathSegments.length < 1) {
    logger.info(pathSegments);
    res.status(400).json({
      error: "Invalid path",
      errorMessage: "Invalid path",
    });
    return;
  }
  currentSessionID = pathSegments[0];
  if (!sessionInstances[currentSessionID] && req.method !== "DELETE") {
    // const oldPath = `../../../ONDC-NTS-Specifications/api/${currentSessionID}`;
    sessionInstances[currentSessionID] = await EditableRegistry.loadComponent(
      forkedCompPath,
      currentSessionID
    );
  }
  next();
});

let parent: Editable = undefined;
let target: Editable = undefined;

app.all("/guide/*", async (req: any, res, next) => {
  const fullPath = req.params[0];
  const pathSegments: string[] = fullPath.split("/");
  target = sessionInstances[pathSegments[0]];
  for (const item of pathSegments.slice(1)) {
    if (target instanceof folderTypeEditable) {
      // logger.info("children", target.chilrenEditables);
      const sub = target.childrenEditables.find((child) => child.name === item);
      if (sub) {
        parent = target;
        target = sub;
      } else {
        logger.info("PATH DONT EXIST");
        res.status(404).json({
          error: "PATH DONT EXIST",
          errorMessage: "could not find path",
        });
        return;
      }
    } else if (target instanceof FileTypeEditable) {
      logger.info("PATH DONT EXIST", target);
      res.status(404).json({
        error: "PATH DONT EXIST",
        errorMessage: "could not find path",
      });
      return;
    }
  }
  next();
});

app.get("/guide/*", async (req, res, next) => {
  try {
    let query = { ...req.query };
    query = query ? query : {};
    res.status(200).send(await target.getData(query));
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.post("/reload", async (req, res, next) => {
  try {
    // delete sessionInstances[currentSessionID];
    // const oldPath = `../../../ONDC-NTS-Specifications/api/${currentSessionID}`;
    // sessionInstances[currentSessionID] = await EditableRegistry.loadComponent(
    //   oldPath,
    //   currentSessionID
    // );
    logger.info(sessionInstances);
    for (const key in sessionInstances) {
      sessionInstances[key] = await EditableRegistry.loadComponent(
        forkedCompPath,
        "components"
      );
    }
    res.status(200).send("DATA RELOADED");
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.post("/guide/*", async (req, res, next) => {
  try {
    await history.addHistory(sessionInstances[currentSessionID]);
    await target.add(req.body);
    return res.status(201).send("DATA ADDED");
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.put("/guide/*", async (req, res, next) => {
  try {
    // const query = { ...req.query };
    logger.info("UNDOING");
    const source = await history.undoLastAction();
    const targetName = req.params[0].split("/")[0];
    logger.info(targetName);
    const comp = sessionInstances[targetName];
    const folderPath = comp.folderPath;
    await comp.destroy();
    await overwriteFolder(source, folderPath);
    await deleteFolderSync(source);
    logger.info("COPY DONE");
    //`../../../FORKED_REPO/api/${targetName}`
    sessionInstances["components"] = await EditableRegistry.loadComponent(
      forkedCompPath,
      "components"
    );
    res.status(200).send("DATA UNDONE");
  } catch (e) {
    logger.info("CAUGHT ERROR");
    logger.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.patch("/guide/*", async (req, res, next) => {
  try {
    await history.addHistory(sessionInstances[currentSessionID]);
    logger.info("updating");

    await target.update(req.body);
    return res.status(200).send("DATA UPDATED");
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.delete("/guide/*", async (req, res, next) => {
  try {
    await history.addHistory(sessionInstances[currentSessionID]);
    logger.info("query", req.query);
    if (Object.keys(req.query).length > 0) {
      const body: any = { ...req.query };
      await target.remove(body);
      res.status(200).send("DATA DELETED");
      return;
    }
    const comp = sessionInstances[req.params[0].split("/")[0]];
    if (comp === target) {
      comp.destroy();
      delete sessionInstances[req.params[0].split("/")[0]];
    } else {
      await parent.remove({ folderName: target.name });
    }
    res.status(200).send("DATA DELETED");
  } catch (e) {
    logger.info(e);
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.delete("/sessions", async (req, res, next) => {
  try {
    for (const key in sessionInstances) {
      delete sessionInstances[key];
    }
    res.status(200).send("SESSION DELETED");
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});

app.post("/build", async (req: Request, res: Response, next: NextFunction) => {
  try {
   const result:any =  await buildWrapper("components");
   if(!result){
    return res.status(500).json(result);
    
   }
    res.send(result);
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: e.message,
    });
  }
});
