var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

require('dotenv').config();

const connectionString = process.env.MONGO_CON

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error Connecting to MongoDB: ", err));

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){console.log("Connection to DB succeeded")})

var Product = require("./models/product");

var boardRouter = require("./routes/board");
var chooseRouter = require("./routes/choose");
var indexRouter = require("./routes/index");
var resourceRouter = require('./routes/resource');
var productRouter = require("./routes/product");
var productsRouter = require('./routes/products');
var usersRouter = require("./routes/users");

async function recreateDB(){
  // Delete everything
  await Product.deleteMany();
  let instance1 = new Product(
    {
      product_type: "Ghost Busters",
      size:'Large',
      cost:15.4
    });
    let instance2 = new Product(
      {
        product_type: "Witch",
        size: 'Medium',
        cost: 17.4
      });
      let instance3 = new Product(
        {
          product_type: "Vampire",
          size: 'Extra Large',
          cost: 20.5
        });

  instance1.save()
  .then(doc => {console.log("First object saved")})
    .catch(err=>{console.error(err)})

  instance2.save()
  .then(doc => {console.log("Second object saved")})
    .catch(err=>{console.error(err)})

  instance3.save()
  .then(doc => {console.log("Third object saved")})
    .catch(err=>{console.error(err)})
  }

let reseed = true;
if (reseed) {recreateDB();}

var app = express();

// view engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/board", boardRouter);
app.use("/choose", chooseRouter);
app.use("/resource", resourceRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;