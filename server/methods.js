import { Meteor } from "meteor/meteor";


const opts = {
    debug: true,
    appName: "spaceDefenders"
}

Meteor.trackedMethods( opts ,{
    crearUsuario(record,data) {
        let user = Meteor.users.findOne({'username':data.username}, {fields: {username:1}});
        if( user ) {
            throw new Meteor.Error("Username in use.");
        } else {
            Accounts.createUser(data);
        }
    },
    updateState(record, data) {
        try {
            Meteor.users.update(data._id, {$set: {[data.field]: data.value}});
        } catch(err) {
            throw new Meteor.Error("Something went wrong.");
        }
    },
    updateUsername(record, data) {
        let user = Meteor.users.findOne({'username':data.username}, {fields: {username:1}});
        if( user ) {
            throw new Meteor.Error("This username is already in use.");
        } else if ( data.username.length <= 8 ) {
            throw new Meteor.Error("Your username must have at least 8 characters.");
        } else {
            try {
                Meteor.users.update(data._id, {$set: {"username": data.username}});
            } catch(err) {
                throw new Meteor.Error("Something went wrong.");
            }
        }
    },
    
    updateProfileSettings(record, data) {

    }
});
