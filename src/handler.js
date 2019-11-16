'use strict';

module.exports.runTest = async event => {
    return {
        statusCode: 200,
        body:
            {
                message: 'Debug tunnel: ' + process.env.NGROK_TUNNEL,
                input: event,
            }
    };
};
