"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: String,
    job_title: String,
}, {
    timestamps: true
});
const userModel = mongoose_1.default.model("user", userSchema);
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.find({});
    const html = `
  <ol>${users.map((user) => `<li>${user.first_name} - ${user.email}  - ${user._id}</li>`).join(" ")}</ol>`;
    res.send(html);
}));
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.find({});
    res.json(users);
}));
app.post("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { first_name, email, gender, job_title, last_name, } = req.body;
    const user = new userModel({
        first_name,
        email,
        gender,
        job_title,
        last_name,
    });
    yield user.save();
    res.json({ msg: "created user ", user });
}));
const api = app.route('/api/users/:id');
api.get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (req.params.id);
    const user = yield userModel.findById(id);
    res.json(user);
}));
api.patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Edit an existing user
    const { first_name, email, gender, job_title, last_name } = req.body;
    // console.log(body)
    const id = (req.params.id);
    const exist = yield userModel.findById(id);
    if (!exist) {
        res.json({ msg: "user not exist" });
    }
    const userToEdit = yield userModel.findByIdAndUpdate(id, {
        first_name,
        email,
        gender,
        job_title,
        last_name
    });
    res.json({ msg: "uppdated " });
}));
api.delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (req.params.id);
    console.log(id);
    const exist = yield userModel.findById(id);
    if (!exist) {
        res.json({ msg: "user not exist" });
    }
    yield userModel.findByIdAndDelete(id);
    return res.json({ status: "deleted" });
}));
mongoose_1.default
    .connect("mongodb+srv://docode999:docode999@cluster0.9zimmkn.mongodb.net/learnusers")
    .then(() => {
    console.log("Mongodb Connected");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})
    .catch((e) => console.log(e));
