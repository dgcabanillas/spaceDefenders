import { Meteor } from "meteor/meteor";
import { Matches , Queue } from '/lib/database.js';
import { Random } from "meteor/random";

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
    buySpacecraft(record, data) {
        let user = Meteor.users.findOne({'_id':data._id});
        if( !user ) {
            throw new Meteor.Error("Please login first.");
        } else if ( user.funds < data.spacecraft.price.slice(0,2) ) {
            throw new Meteor.Error("Insufficient funds.");
        } else {
            try {
                let spacecrafts = user.spacecrafts;
                spacecrafts[data.spacecraft.id] = "obtained";
                const remain = user.funds - data.spacecraft.price.slice(0,2);
                Meteor.users.update(data._id, {$set: {"spacecrafts": spacecrafts , "funds": remain}});
                return  "Successful purchase" ;
            } catch(err) {
                throw new Meteor.Error("Something went wrong.");
            }
        }
    },
    buyCoin(record, data) {
        let user = Meteor.users.findOne({'_id':data._id});
        if( !user ) {
            throw new Meteor.Error("Please login first.");
        } else if ( user.money < parseFloat(data.coin.price.slice(2,data.coin.price.length)) ) {
            throw new Meteor.Error("Insufficient money.");
        } else {
            try {
                const str = data.coin.pack;
                const remain = parseInt(user.funds) + parseInt(str.slice(0,str.indexOf(' ')));
                Meteor.users.update(data._id, {$set: { "funds": remain }});
                return  "Successful purchase" ;
            } catch(err) {
                throw new Meteor.Error("Something went wrong.");
            }
        }
    },
    addMoney(record, data) {
        let user = Meteor.users.findOne({'_id':data._id});
        if( !user ){
            throw new Meteor.Error("Please login first.");
        } else {
            try {
                const money = parseFloat(user.money) + parseFloat(data.money);
                Meteor.users.update(data._id, {$set: { "money": money }});
                return "Successful Operation";
            } catch (err) {
                throw new Meteor.Error("Something went wrong.");
            }
        }
    },
    findMatch(record, data){
        let user = Meteor.users.findOne({'_id':data._id});
        if( !user ){
            throw new Meteor.Error("Please login first.");
        } else if( user.status == "online" ) {
            try {
                Meteor.users.update({_id: user._id},{$set: {status: "finding"}});
                let u = Meteor.users.find({status:"finding"},{fields: {_id:1,status:1}}).fetch();

                let lobbyId;
                if(u.length != 0 && u.length % 2 == 0){
                    lobbyId = Random.id();
                    Meteor.users.update({_id: u[0]._id},{$set: {status: "found"}});
                    Meteor.users.update({_id: u[1]._id},{$set: {status: "found"}});
                    Matches.insert({
                        path: lobbyId,
                        player1: u[0]._id,
                        player2: u[1]._id
                    });
                }
                
            } catch(err) {
                throw new Meteor.Error("Something went wrong.");
            }
        } else {
            throw new Meteor.Error("You can't find a game.");
        }
    },
    leaveQueue(record, data){
        try {
            Meteor.users.update({_id: user._id},{$set: {status: "online"}})
        } catch (err) {
            throw new Meteor.Error("Something went wrong.");
        }
    },
});
