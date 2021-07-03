const express = require('express')
const app = express()
const port = 3000
const sett = require("./package.json")

let passport = require("passport")
var favicon = require('serve-favicon')
var path = require('path')

app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')))

var LocalStrategy = require('passport-local').Strategy;
const expressHbs = require("express-handlebars");
app.set('views', __dirname + '/views');
const hbs = require("hbs");
app.set("view engine", "hbs");
var db =require("./model")


app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { 
        console.log(err)

        return cb(err); }
      if (!user) {
        console.log("нет пользователя")
        return cb(null, false); }
      if (user.password != password) { 
        console.log("неверный логин или парол")
        return cb(null, false); }
     // console.log("все гуд")
     // console.log(user)
      return cb(null, user);
    });
  }
));

// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
  // console.log(req.user)
  res.render('home',{ user: req.user, version: sett.version })
})

app.get('/login', (req, res) => {
    res.render('login',{ version: sett.version})
  })

  app.get('/messages', (req, res) => {
    res.render('messages',{ user: req.user, version: sett.version })
  })

  app.post('/messages',(req,res)=>
 { 
    res.redirect('/messages') 
 })  
 app.post('/login',  
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' })
);

app.get('/addmessage', (req, res) => {
  res.render('addmessage',{ user: req.user, version: sett.version })
})

app.post('/addmessage',(req,res)=>{
  if(!req.body) return response.sendStatus(400);
  //console.log(req.body.user_from);
  db.messages.create(req.body.user_from, 
                     req.body.user_to, 
                     req.body.textmess,
                     "2021-02-20",
                     "черновик"
                                         
                     )
  //req.body.user_from - из формы - от кого
  res.redirect('/')

})

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})