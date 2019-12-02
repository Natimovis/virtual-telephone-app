require("dotenv").config();
const ClientCapability = require('twilio').jwt.ClientCapability;
let { ACCOUNT_SID, AUTH_TOKEN, APP_SID } = process.env;

module.exports = {
    capability: (req, res) => {
        const accountSid = ACCOUNT_SID;
        const authToken = AUTH_TOKEN;
      
        // put your Twilio Application Sid here
        const appSid = APP_SID;
      
        const capability = new ClientCapability({
          accountSid: accountSid,
          authToken: authToken,
        });
        capability.addScope(
          new ClientCapability.OutgoingClientScope({ applicationSid: appSid })
        );
        capability.addScope(new ClientCapability.IncomingClientScope('joey'));
        const token = capability.toJwt();
      
        res.set('Content-Type', 'application/jwt');
        res.send(token);
        // console.log(token)
    },
    voice: (req, res) => {
        let twiml = new Twilio.twiml.VoiceResponse();
        if(res.To) {
            const attr = isValid(res.to) ? 'number' : 'client';
      
            const dial = twiml.dial({
                answerOnBridge: true,
                callerID: req.data
            });
            dial[attr]({}, res.To);
        } else {
          twiml.say('Thanks for calling!');
        };
    }
}

/**
* Checks if the given value is valid as phone number
* @param {Number|String} number
* @return {Boolean}
*/
function isValid(number) {
    return /^[\d\+\-\(\) ]+$/.test(number);
  }

module.exports.test = function() {

}