// ----- NECESSARY IMPORTS -----
// const mysql2 = require("mysql2");

// ----- MYSQL CONNECTION CLASS -----

// class MySql {
//     constructor(host, user, password, database, db) {
//         this.host = host || "127.0.0.1" || "localhost";
//         this.user = user || "root";
//         this.password = password || "";
//         this.database = database || "company_db";
//         this.db = db;
//     }
//     // constructor(db) {
//     //     this.host = host || "127.0.0.1" || "localhost";
//     //     this.user = user || "root";
//     //     this.password = password || "";
//     //     this.database = database || "company_db";
//     //     this.db = db;
//     // }
//     connect() {
//         this.db = mysql2.createConnection(
//             {
//                 host: "127.0.0.1",
//                 user: "root",
//                 password: "",
//                 database: "company_db"
//             },
//             console.log(`Connected to the ${this.database} database.`)
//         );
//     }
// }

// module.exports = MySql;