export const findUsers = function(param){

	regex = new RegExp('^'+param,'i');

	return Meteor.users.find({ $or: [
		{"services.facebook.name" : regex },
		{"services.facebook.first_name" : regex },
		{"services.facebook.last_name" : regex },
		{"services.twitter.screenName" : regex },
		{"services.twitter.name" : regex },
		{"services.steam.name" : regex },
		{"username" : regex },
		{"alias" : regex },
		{"name" : regex },
		{"_id" : param}
		]},{fields:userFields,limit:20});
};

export const friendsList = function(){
	return Meteor.users.find({
		_id: {$ne: Meteor.userId()}
	},{fields:userFields})
}