import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { Matches } from './database.js';
import { _ } from "meteor/underscore";

if(Meteor.isServer){
	Meteor.publish("profile", function(){
        return Meteor.users.find({ _id: this.userId });
    });
}
