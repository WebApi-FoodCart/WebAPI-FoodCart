const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config');
const bodyparser = require('body-parser');

app.use(bodyparser.json({
    limit: '5mb'
}));

//routes config
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

//middlewares
app.use('/client',postRoutes)
app.use('/api/auth',authRoutes)



//dbconnection
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
  } ,() =>{
  
console.log('connected')

})


app.listen(3000);