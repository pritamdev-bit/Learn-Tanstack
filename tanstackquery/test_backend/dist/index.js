"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const users = require('./users');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/myhtml.html');
});
app.get("/getusers", (req, res) => {
    const page = Number(req.query.page) || 1;
    const start = page === 1 ? 0 : (page - 1) * 10;
    const end = start + 10;
    // console.log(users);
    res.status(200).json({
        message: "Success",
        users: users.slice(start, end),
        currentPage: page,
        totalPages: users.length
    });
});
app.get("/download", (req, res) => {
    res.download(__dirname + '/download.jpg');
});
app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
//# sourceMappingURL=index.js.map