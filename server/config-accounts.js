import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { _ } from "meteor/underscore";

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '135750180473000',
    secret: 'b5a35d2377a3b796a3eea496b2141850'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});
 
ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'pRsyZ4jcsmNbNNHzUF80yYUOS',
    secret: 'LxWnPkVlgCVDUBbIEGPwxnfFv2cKQMfWFr2FkpgVuRTMvNCSpm'
});


Accounts.config({
    forbidClientAccountCreation: true
});

Accounts.onCreateUser(function(options,user){
    const fb = user.services.facebook;
    const tw = user.services.twitter;
    const currentId = Meteor.userId();
    if (currentId){
        Meteor.users.update(currentId, {$set:{['services.'+(fb ? "facebook" : "twitter")]:fb || tw}});
        throw new Meteor.Error('success-linked-'+(fb ? "facebook" : "twitter"));
    }
    const skeleton = {
        profilePicture: "../../../../../../img/default_img.png",
        status:"offline",
        funds: 10,
        money: 0,
        friends: {
            friendSends: [],
            friendRequests: [],
            friends: [],
        },
        spacecrafts: {},
        matches: {
            wins: [],
            loses: []
        },
        mainEmail: options.email || null,
    }
    return _.extend(user, skeleton);
})

