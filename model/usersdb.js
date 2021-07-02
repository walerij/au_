const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const userScheme = new Schema({
    id:Number,
    username: String,
    password: String,
    link: String,
    nick:String,
    dtr:String,
    city:String,
    status:String
});
  
// подключение
mongoose.connect("mongodb://localhost:27017/test22", { useUnifiedTopology: true, useNewUrlParser: true });
  
const User = mongoose.model("users", userScheme);

let records = [] 
User.find({}, function(err, docs){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    records=docs;
   // console.log(docs);
}).lean();
//console.log(records)
/*[
    {"id":1,"username":"o1","password":"o1","link":"http://static.fashionbank.ru/photo/2007/05/177/thumb_Irina-Voroncova6093942.jpg"},
    {"id":2,"username":"o2","password":"o2","link":"https://btu.org.ua/uploads/posts/2018-01/1515921065_kostyuk-1.jpg"},
]*/

exports.findByUsername=function(username, cb){
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
          var record = records[i];
          record.id=i+1
          // record.link="https://www.ixbt.com/img/x780/n1/news/2019/5/3/chrome-73-mode-sombre-android_large.jpg"
          // console.log(record)
          // console.log(record.username)
          // console.log(username)
          //console.log(record.username==username)
          if (record.username === username) {
            //console.log("yes")
            return cb(null, record);
          }
        }
        
        //console.log('no...')
        return cb(null, null);
      });
}

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id-1 ;

    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
    

  });
}