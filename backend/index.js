const {app} = require('./app')
const {ConnectToDatabase} = require('./src/database/connection')

ConnectToDatabase().then(()=>{
    app.listen(5000,()=>{
        console.log("Server Started Successfully.... and Connected To Database")
    })
}).catch((err)=>{
    console.log("error")
});

