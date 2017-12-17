export const getUsername = function(u){
	const s = u && u.services;
	const fbn = s && s.facebook && s.facebook.name;
	const twn = s && s.twitter && s.twitter.name;
	return u ? (u.username || fbn || twn ) : "Do you have a name?";
}

export const getUserImage = function(u){
	const p = "profilePicture";
	return u ?  u[p] : "../../../../img/default_img.png";
}
