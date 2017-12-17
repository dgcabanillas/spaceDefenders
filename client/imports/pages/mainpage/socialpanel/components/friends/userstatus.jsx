import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";

import State from "/client/imports/helpers/state.js";

class UserStatus extends Component{
	colorStatus(){
		const u = this.props.user;
		switch(u.status){
			case "online": return "#0297FD"; break;
			case "playing": return "#00ff53"; break;
			case "offline": return "#857979"; break;
		}
	}
	_openChat(e){
		e.preventDefault();
		const p = this.props;
		Meteor.call('openChat', p.user._id , ()=>{} , (err,res)=>{
			if(err) console.log(err);
			if(res) {
				State.set({
					'chat.chatID': res,
					'chat.contact': p.user._id,
					'chat.status': "open"
				})
			};
		});
	}
	render(){
		const user = this.props.user;
		return (
			<div className="chat-user-status" onClick={this._openChat.bind(this)}>
				<div>
					<span style={{color: this.colorStatus()}}><i className="fa fa-circle" aria-hidden="true"></i></span>
				</div>
				<div>
					<p style={{color: this.colorStatus()}}>{user.status}</p>
				</div>
			</div>
		);
	}
}

export default createContainer((props)=>{
	return {
		chat: State.get({chat:1}).chat
	};
}, UserStatus)

