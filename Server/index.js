

const express= require("express")
const chalk= require("chalk")
const port=3388;
const cors = require('cors');
const app=express();//app is object
const User = require('./config/user.js')

app.use(cors());

require('./config/dbConn');
const user = require('./config/user.js');
// const finddata = new user({
//     "name" : "xyzHjjH",
//     "price" : 500
// })
// finddata.save().then(()=>{
//     console.log(chalk.inverse.green("data saved"))
// })

app.get('/', async (req, res) => {  
    const getData = await User.find();
    if(getData.length > 0) {   //browser can only get data
        res.send(getData);
    } else {
        res.send("no data found");
    }
});
app.post(`/postData`, (res) => {
    res.send("Hello hunny bunny")
})

app.post(`/deleteData`, (res) => {
    res.send("Hello hunny bunny")
})
app.listen(port,(err)=>{     //for running the server

    if(err){
        console.log(chalk.inverse.red("something went wrong"))}
    else{
    console.log(chalk.inverse.green(`server is running ${port}`));
        }
})