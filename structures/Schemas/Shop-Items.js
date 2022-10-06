const { model, Schema } = require("mongoose");

module.exports = model(
    "shop-items",
    new Schema({
        name: String,
        profitMargin: Number,
        inventory: [{
            name: String,
            basePrice: Number,
            item_reference: String,
        }]
    })
);