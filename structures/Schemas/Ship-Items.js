const { model, Schema } = require("mongoose");

module.exports = model(
    "ship-items",
    new Schema({
        reference: String,
        itemName: String,
        type: String,
        subType: String,
        tags: String,
        size: Number,
        grade: Number,
        name: String,
        manufacturer: String,
        stdItem: {
            ClassName: String,
            Size: Number,
            Grade: Number,
            Type: String,
            Classification: String,
            Name: String,
            Description: String,
            Manufacturer: {
                Code: String,
                Name: String,
            },
            Ammunition: {
                Speed: Number,
                Range: Number,
                Size: Number,
            },
        },
    })
);