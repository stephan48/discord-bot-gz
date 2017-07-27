const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

const { externalUrl } = require('../../config/config');

module.exports = class GZUrlCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'gzurl',
			aliases: ['url'],
			group: 'gz',
			memberName: 'gzurl',
			description: 'Links Grillenzirpen Webserver',
			details: oneLine`
				Grillenzirpen
			`,
			examples: ['gzurl'],
		});
	}

	async run(msg, args) {
		console.log("passed url");

                const hash = msg.client.guildMapIdHash[msg.guild.id];

                msg.reply(`URL: ${externalUrl}/${hash}/`);
	}
};
