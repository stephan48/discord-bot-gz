const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

const { handleGZStop } = require('../../lib/gz');

module.exports = class GZStopCommand extends commando.Command {
        constructor(client) {
                super(client, {
                        name: 'gzstop',
                        aliases: ['stop', 'end'],
                        group: 'gz',
                        memberName: 'gzstop',
                        description: 'Stops Grillenzirpen',
                        details: oneLine`
                                Grillenzirpen
                        `,
                        examples: ['gzstops'],
                });
        }

        async run(msg, args) {
                console.log("passed stop");

                handleGZStop(msg);
        }
};
