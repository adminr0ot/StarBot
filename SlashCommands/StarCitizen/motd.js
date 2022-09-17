const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'motd',
    description: 'Erhalte die Star Citizen Message of the Day?',
    run: async(client, interaction, guild, args) => {
        var request = require('request');

			var headers = {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Host': 'robertsspaceindustries.com',
                    'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
                    'Origin': 'https://robertsspaceindustries.com',
					'Referer': 'https://robertsspaceindustries.com/spectrum/community/SC/forum/190048?page=1&sort=newest',
					'X-Rsi-Token': 'a1c87730c0fbcb6db1829d2375c96e96',
					'x-tavern-id': 'vryaild0pvane',
				};

			var dataString = '{"channel_id":"190048","page":"1","sort":"newest","label_id":null}';

			var options = {
				url: 'https://robertsspaceindustries.com/api/spectrum/forum/channel/threads',
				method: 'POST',
				headers: headers,
				body: dataString
			};

			function callback(error, response, body) {
				if (!error && response.statusCode == 200) {
					var patchTitle = body.match(/\"(subject*?)\":"Star Citizen Alpha [0-9]+\.[0-9]+\.[0-9]+[\w\s]+[\w{0,4}]+[. ]+[\d{0,7}]+/g);
					for (var i = 0; i < patchTitle.length; i++) {
						patchTitle[i] = patchTitle[i].substr(11);

					//Date Parse
						var today = new Date();
						var todayYear = today.getFullYear();
						var todayMonth = today.getMonth();
						todayMonth = parseInt((todayMonth) + 1) % 12;
						var todayDate = today.getDate();
						var todayHour = today.getHours();
						var todayMin = today.getMinutes();
						if (todayMonth < 10) {
							todayMonth = "0" + todayMonth;
						}
						if (todayDate < 10) {
							todayDate = "0" + todayDate;
						}
						if (todayHour < 10) {
							todayHour = "0" + todayHour;
						}
						if (todayMin < 10) {
							todayMin = "0" + todayMin;
						}

					//Random Last Sentence
						var rand = ['Heute schon abgehoben?', 'Welches Schiff darf es heute sein?', 'Frag mich nichts, bevor ich keinen Kaffee hatte!'];
						var randItem = rand[Math.floor(Math.random()*rand.length)];
						if (randItem == "Frag mich nichts, bevor ich keinen Kaffee hatte!") {
							coffee = 1;
						}
					}
                interaction.followUp("Greetings, Citizen!\nEs ist ``" + todayHour + ":" + todayMin + " Uhr`` am ``" + todayDate + "." + todayMonth + "." + todayYear + "``.  \nDie aktuelle Star Citizen Version ist: ``" + patchTitle[0] + "``. \n" + randItem);			}
		}
		request(options, callback);
    }
}