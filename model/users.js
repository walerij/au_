let records = [
    {"id":1,"username":"o1","password":"o1","link":"http://static.fashionbank.ru/photo/2007/05/177/thumb_Irina-Voroncova6093942.jpg"},
    {"id":2,"username":"o2","password":"o2","link":"https://btu.org.ua/uploads/posts/2018-01/1515921065_kostyuk-1.jpg"},
]

exports.findByUsername=function(username, cb){
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
          var record = records[i];
          if (record.username === username) {
           // console.log("yes")
            return cb(null, record);
          }
        }
        console.log('no')
        return cb(null, null);
      });
}

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}