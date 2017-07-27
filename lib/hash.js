const crypto = require('crypto');

const { hashToken } = require('../config/config');

module.exports = (guildId) => {
        var hash = crypto.createHash('sha256');

        hash.update(hashToken, 'utf-8');
        hash.update(guildId, 'utf-8');
        hash.update(hashToken, 'utf-8');
        return hash.digest('hex');
};
