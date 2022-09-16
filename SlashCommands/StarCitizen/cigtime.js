const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'cigtime',
    description: 'get the current time for the different CIG locations',
    options: [],
    run: async(client, interaction, guild, args) => {
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var day = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"]
	var localtime = new Date();
	var pdttime = new Date();
	var cdttime = new Date();
	var edttime = new Date();
	var bsttime = new Date();
	var cesttime = new Date();
	pdttime.setHours(pdttime.getUTCHours() - 7);
	cdttime.setHours(cdttime.getUTCHours() - 5);
	edttime.setHours(edttime.getUTCHours() - 4);
	bsttime.setHours(bsttime.getUTCHours() + 1);
	cesttime.setHours(cesttime.getUTCHours() + 2);
    interaction.followUp("```CIG Studio Local Time | "+ day[localtime.getUTCDay()] + " " + localtime.getUTCDate() + " " + months[localtime.getUTCMonth()] + " " + localtime.getUTCFullYear() + ", " + localtime.getUTCHours() + ":" + localtime.getUTCMinutes() + ":" + localtime.getUTCSeconds() + " (UTC)\n" + "-----\n" + "Los Angeles -  "+ day[pdttime.getDay()] + " " + pdttime.getDate() + " " + months[pdttime.getMonth()] + " " + pdttime.getFullYear() + ", " + pdttime.getHours() + ":" + pdttime.getMinutes() + ":" + pdttime.getSeconds() + " (PDT)\n" + "Austin - "+ day[cdttime.getDay()] + " " + cdttime.getDate() + " " + months[cdttime.getMonth()] + " " + cdttime.getFullYear() + ", " + cdttime.getHours() + ":" + cdttime.getMinutes() + ":" + cdttime.getSeconds() + " (CDT)\n" + "Turbulent Montreal - "+ day[edttime.getDay()] + " " + edttime.getDate() + " " + months[edttime.getMonth()] + " " + edttime.getFullYear() + ", " + edttime.getHours() + ":" + edttime.getMinutes() + ":" + edttime.getSeconds() + " (EDT)\n" + "Manchester - "+ day[bsttime.getDay()] + " " + bsttime.getDate() + " " + months[bsttime.getMonth()] + " " + bsttime.getFullYear() + ", " + bsttime.getHours() + ":" + bsttime.getMinutes() + ":" + bsttime.getSeconds() + " (BST)\n" + "Frankfurt - "+ day[cesttime.getDay()] + " " + cesttime.getDate() + " " + months[cesttime.getMonth()] + " " + cesttime.getFullYear() + ", " + cesttime.getHours() + ":" + cesttime.getMinutes() + ":" + cesttime.getSeconds() + " (CEST)```");
    }
}