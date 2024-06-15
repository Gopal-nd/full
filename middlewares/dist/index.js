"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
app.use((req, res, next) => {
    if (req.url == '/favicon.ico')
        return;
    fs_1.default.appendFile('log.txt', `${Date.now()} :${req.method} : ${req.url} :>> ${req.ip} \n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log('middlewaere will be running');
    req.myname = "gopal";
    next();
});
app.get('/', (req, res) => {
    console.log(req.myname);
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
