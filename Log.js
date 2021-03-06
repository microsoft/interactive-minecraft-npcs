let appInsights = require("applicationinsights");
appInsights.setup().start();

// Record to application insight with custom defined payloads
const recordInteraction = (
  name,
  username,
  prompt,
  completion = "",
  autoregressive = false
) => {
  let payload = {
    username: username,
    prompt: prompt,
    completion: completion,
    autoregressive: autoregressive,
  };
  payload.EventOccurrenceTime = new Date(Date.now()).toISOString();
  let client = appInsights.defaultClient;
  client.trackEvent({ name: name, properties: payload });
};

const recordEvent = (name, username, message = "") => {
  let payload = {
    username: username,
    message: message,
  };
  payload.EventOccurrenceTime = new Date(Date.now()).toISOString();
  let client = appInsights.defaultClient;
  client.trackEvent({ name: name, properties: payload });
};

const recordException = (err) => {
  let client = appInsights.defaultClient;
  client.trackException({ exception: err });
  client.flush();
};

module.exports.recordInteraction = recordInteraction;
module.exports.recordEvent = recordEvent;
module.exports.recordException = recordException;
