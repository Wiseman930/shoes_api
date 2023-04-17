const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const myFunction = require('./shoes')
const pgp = require("pg-promise")();
const flash = require("express-flash");
const session = require("express-session");
const cors = require('cors')

app.use(
    session({
      secret: 'this is my long String that is used for session in http',
      resave: false,
      saveUninitialized: true,
    })
  );

  function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  }
  app.use(cors())
  app.use(errorHandler);
  app.use(flash());
  app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Headers", "Content-Type");
    //res.header("Content-Type", "application/json")
    next()
  })

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/shoe_api";

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const config = {
  connectionString: DATABASE_URL,
 ssl: {
    rejectUnauthorized: false,
  },
}
const db = pgp(config);
const myShoeFunction = myFunction(db)

const allShoesAPI = require('./api/shoeApi')
const shoesApi = allShoesAPI(myShoeFunction)


//API ROUTES
app.get('/api/shoes', shoesApi.homeFunction);
app.post('/api/shoes', shoesApi.addingStock);
app.get('/api/shoes/brand/:brand', shoesApi.filteredBrand);
app.get('/api/shoes/color/:color', shoesApi.filteredBrand);
app.get('/api/shoes/size/:size', shoesApi.filteredBrand);
app.get('/api/shoes/brand/:brand/color/:color', shoesApi.filteredBrand);
app.get('/api/shoes/brand/:brand/size/:size', shoesApi.filteredBrand);
app.get('/api/shoes/color/:color/size/:size', shoesApi.filteredBrand);
app.get('/api/shoes/brand/:brand/color/:color/size/:size', shoesApi.filteredBrand);

app.post('/api/shoes/cart', shoesApi.addToCart);
app.get('/api/shoes/getcart', shoesApi.getCart);

app.post('/api/shoes/cancelcart', shoesApi.cancelMyCart);
app.post('/api/shoes/checkout', shoesApi.checkoutMyCart)

let PORT = process.env.PORT || 3018;
app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});