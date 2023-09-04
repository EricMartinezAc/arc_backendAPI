const mongoose = require('mongoose')
require('dotenv').config()

//process.env.mongodb_URI_atlas
async function conexionMongo(id_prod) {
    try {
        const mongoose_ = await mongoose.connect(`${process.env.MONGODB_URI}${id_prod}${process.env.MONGODB_URI_config}`,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected"))
        return mongoose_
    } catch (error) {
        console.log("could not connect ", error);
    }
}
module.exports = conexionMongo