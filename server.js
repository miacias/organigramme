// ----- NECESSARY IMPORTS -----
const express = require("express");
const mysql2 = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// ----- EXPRESS.JS MIDDLEWARE -----
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connect to database
const db = mysql2.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "SQLr00t!",
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

// query database for departments table
db.query("SELECT * FROM departments", function (err, results) {
    console.log(results);
});

// default response for invalid request, i.e. not found
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));