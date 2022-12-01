const mongoose = require('mongoose')

//process.env.mongodb_URI_atlas
async function conexionMongo(db, area) {
    const mongoose_ = await mongoose.connect(`mongodb+srv://Rouse:Rouse012017*@arcontroller.oeyco.mongodb.net/${db}?retryWrites=true&w=majority/${area}`)
    return mongoose_
}
module.exports = conexionMongo