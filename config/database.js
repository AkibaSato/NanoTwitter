
module.exports = function(app, mongoose){
  var env=require('dotenv').config();
  console.log(process.env.LOCAL_URL)
  if (app.get('env') === 'development') {
    mongoose.connect(process.env.LOCAL_URL);
  } else {
    mongoose.connect(process.env.MONGODB_URI);
  }

}
