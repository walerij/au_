const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessShema = new Schema({
   // id: Number,
    user_from: String, // от кого сообщение
    user_to: String, //кому сообщение
    textmessage: String, //текст сообщения
    dateot: String, // дата и время отправки сообщения
    status: String //статус - отправлено, неотправлено, черновик, прочитано удалено
});


mongoose.connect("mongodb://localhost:27017/test22", { useUnifiedTopology: true, useNewUrlParser: true });
const Message = mongoose.model("messages", MessShema)


function create(user_from_,user_to_,textmessage_, dateot_, status_){
    let mess = new Message({
           user_from: user_from_,
           user_to: user_to_,
           textmessage:textmessage_,
           dateot: dateot_,
           status: status_
    });

    console.log(mess)
    mess.save()
    .then(function(doc){
        console.log("Сохранен объект", doc);
        mongoose.disconnect();  // отключение от базы данных
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });

}

exports.create=create