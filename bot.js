const Commando = require('discord.js-commando');
const express = require('express');
const sqlite = require('sqlite');
const path = require('path');
const hashGuildId = require('./lib/hash');
const app = express();

const config = require('./config/config');

const client = new Commando.Client({
	owner: config.ownerId
});

client.setProvider(
	sqlite.open(config.sqlitePath).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry.registerDefaults().registerGroups([
	['gz', 'GZ'],
]).registerCommandsIn(config.commandosPath);

client.guildMapHashId = {};
client.guildMapIdHash = {};
client.guildDispatcher = {};

client.login(config.discordToken);

const checkGuildHash = (req, res, next) => {
	const guildHash = req.params['guildHash'];

	if(!guildHash || !client.guildMapHashId[guildHash])
	{
		res.send('mh.. Wrong Guild Page.');

		return;
	}

	req.params.guildId = client.guildMapHashId[guildHash];

	next();	
};

app.get('/', function (req, res) {
	res.send('mh.. Wrong Page.!')
});

app.get('/:guildHash/', checkGuildHash, function(req, res, next) {
	const guildId = req.params.guildId;
	const guild = client.guilds.get(guildId);

	console.log(guildId, guild);

	res.send(guildId + ' ' + guild.name);
});

const refreshGuilds = () => {
	client.guildMapHashId = {};
	client.guildMapIdHash = {};

	client.guilds.forEach((guild, guildId, obj) => {
		const hash = hashGuildId(guildId);

		client.guildMapHashId[hash] = guildId; 
		client.guildMapIdHash[guildId] = hash;

		console.log(guildId, guild.name, guild.available, hash, `${config.externalUrl}/${hash}/`);

//		  console.log(key, val.name);
	  });
};


let counter = 0;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	refreshGuilds();
});

app.listen(3443, function () {
	console.log('Example app listening on port 3443!')
})
