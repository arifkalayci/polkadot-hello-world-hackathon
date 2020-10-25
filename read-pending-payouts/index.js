const request = require('request');

const accountId = process.argv[2];
const depth = process.argv[3];

request(`http://127.0.0.1:8080/accounts/${accountId}/staking-payouts?depth=${depth}&unclaimedOnly=true`, { json: true }, (err, res, body) => {
  if (err) { return console.error(err); }

  console.log(`Pending rewards belonging to ${accountId} in the last ${depth} eras`)

  for (let {era, payouts} of body.erasPayouts) {
    console.log(`Era: ${era}`);
    for (let {nominatorStakingPayout} of payouts) {
      console.log(`${parseInt(nominatorStakingPayout) / Math.pow(10, 12)} KSM`) ;
    }

    console.log();
  }
});
