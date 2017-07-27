const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

const { handleGZStart } = require('../../lib/gz');

module.exports = class GZStartCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'gzstart',
			aliases: ['start'],
			group: 'gz',
			memberName: 'gzstart',
			description: 'Starts Grillenzirpen',
			details: oneLine`
				Grillenzirpen
			`,
			examples: ['gzstart'],
			args: [
				{
					key: 'volume',
					label: 'volume',
					prompt: 'At which volume would you like to play the piece?',
					type: 'float',
					default: 0.05,
					max: 2,
					min: 0
				}
			] 
		});
	}

	async run(msg, args) {
		console.log("passed join", args.volume);

	        if(!msg.member.voiceChannel)
	        {
		        msg.reply("Please join a Voice Channel");
	
        	        return;
	        }


		let volume = args.volume;

		if(!volume)
		{
			volume = 0.05;
		}


		handleGZStart(msg, msg.member.voiceChannel, volume);
	}
};
