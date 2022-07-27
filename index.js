
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee",
  password: "p@$$w0rd",
  port: 5432
});

app.use(cors());
app.use(bodyParser.json());


app.post("/api/add-users", (req, res) => {
    console.log("view",req);
  
    const {firstname, lastname, age, email} = req.body;
    pool.query(
      `INSERT INTO users(firstname, lastname, age, email)VALUES($1, $2, $3, $4)`,
      [firstname, lastname, age, email],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.sendStatus(201);
      }
    );
  });

  app.get('/api/get-users', function (req, res) {
    pool.query(`SELECT * FROM users`, function (err, res) {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of res.rows) {
            console.log(row);
        }
    })
})

app.listen(5000, () => {
  console.log(`Server is running.`);
});