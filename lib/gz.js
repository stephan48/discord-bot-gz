const handleGZStop = (message) => {
	if(!message || !message.guild)
	{
		return;
	}	
	
        if(message.client.guildDispatcher[message.guild.id])
        {
		message.client.guildDispatcher[message.guild.id].end();

		console.log("dispatcher exists");

		delete message.client.guildDispatcher[message.guild.id];

		message.reply("Stopped AudioStream");
        }
};

const handleGZStart = (message, channel, volume) => {
	if(!message || !message.guild || !channel)
	{
		return;
	}

        handleGZStop(message);

        channel.join().then(connection => { // Connection is an instance of VoiceConnection
                const filename = './grillen.wav';

                message.reply('I have successfully connected to the channel!');

                const dispatcher = connection.playFile(filename, {
			volume: volume
		})

		message.client.guildDispatcher[message.guild.id] = dispatcher;

                dispatcher.on('error', e => {
                        // Catch any errors that may arise
                        console.log(e);
                });

                dispatcher.once("end", () => {
                        console.log("end");

                        dispatcher.end();

			delete message.client.guildDispatcher[message.guild.id];
                });
        }).catch((error) => {
                console.log(error);
        });
};

module.exports = {
	handleGZStop,
	handleGZStart
};
