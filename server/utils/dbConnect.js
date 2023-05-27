const mongoose = require('mongoose');


const connect = () => mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("DB Connected") }).catch((err) => { console.log(err) });

module.exports = connect;