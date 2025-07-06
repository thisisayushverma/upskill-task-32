import express from "express";
import cors from "cors";
import { generateToken } from "./utils/token.utils.js";
import Users from "./data/data.js";
import {v4 as uuid} from "uuid"
import authenticateUser from "./middlewares/auth.middleware.js";
import dotenv from "dotenv";

const reqLogger = (req, res, next) => {
    console.log(req.url,req.method ," -> ");
    console.log(req.body);
    next();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger)
dotenv.config({
    path: ".env"
});




app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    Users.forEach((user) => {
        if (user.email === email) {
            return res.status(400).send("User already exists");
        }
    })

    const id = uuid();
    const user = { id, name, email, password,data:null };

    const token = generateToken({ id, email });

    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    Users.set(id, user);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user
    });
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("All fields are required");
    }


    Users.forEach((user) => {
        if (user.email === email && user.password === password) {
            const token = generateToken({ id: user.id, email: user.email });
            res.setHeader("Authorization", token);
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: user
            });
        }
    })

    return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    });
})

app.post("/",authenticateUser,(req, res) => {
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: req.user
    })
})

app.post("/upload", authenticateUser,(req, res) => {
    const { data } = req.body;
    console.log(data);
    Users.set(req.user.id, {
        ...req.user,
        data
    })
    return res.status(200).json({
        success: true,
        message: "Data uploaded successfully",
        data
    })
})

app.get("/read",authenticateUser ,(req, res) => {
    return res.status(200).json({
        success: true,
        message: "User data send",
        user: req.user,
        data: Users.get(req.user.id).data
    })
})


app.listen(3000, () => {
    console.log("Server started on port 3000");
});