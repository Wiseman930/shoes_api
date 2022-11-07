const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const myFunction = require('./shoes')
const pgp = require("pg-promise")();
const flash = require("express-flash");
const session = require("express-session");

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/waiter";

const config = {
  connectionString: DATABASE_URL,
 /*ssl: {
    rejectUnauthorized: false,
  }, */
}
const db = pgp(config);
const myShoeFunction = myFunction(db)

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
    session({
      secret: 'this is my long String that is used for session in http',
      resave: false,
      saveUninitialized: true,
    })
  );

  const myShoes = require('./routes/shoeRoute')
  const theShoes = myShoes(myShoeFunction)

  app.get('/', theShoes.homeFunction);

let PORT = process.env.PORT || 3018;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});