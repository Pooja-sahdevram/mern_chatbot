const {connect} = require('mongoose')

const ConnectToDatabase = async () => {
    try{
    await connect(process.env.MONGODB_URL);
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    ConnectToDatabase
}