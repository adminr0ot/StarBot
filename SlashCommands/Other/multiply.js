const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'multiply',
    description: 'multiplies two values',
    options: [{
        name: 'value1',
        description: 'Enter first value for multiplication',
        type: 10,
        require: true,
    },
    {
        name: 'value2',
        description: 'Enter second value for multiplication',
        type: 10,
        require: true,
    }],
    run: async(client, interaction, guild, args) => {
        const value1 = interaction.options.getNumber('value1');
        const value2 = interaction.options.getNumber('value2');
        let result = value1 * value2;
        interaction.followUp(`Your result is ${result}`);
    }
}