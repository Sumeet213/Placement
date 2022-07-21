const express = require('express');

const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT||8000;
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const db = require('./config/mongoose');
const customMware= require('./config/middleware');
const passportLocal = require('./config/passport-local-strategy');
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const sassMiddleware = require('node-sass-middleware');


const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());
app.use('/assets', express.static('assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.urlencoded());

app.use(cookieParser());



app.use(session({
    name: 'placement',
    // TODO change the secret before deployment in production mode
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://sam:1234@cluster0.i2kdp.mongodb.net/?retryWrites=true&w=majority',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));



app.listen(process.env.PORT, '0.0.0.0',function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

