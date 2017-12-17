import React, { Component } from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';


class Message extends TrackerReact(Component){
	constructor(){
		super();
	}
	_user(){
		const p = this.props;
		if(p.user1._id == p.msg.userId) return p.user1;
		else if(p.user2._id == p.msg.userId) return p.user2;
	}
	render(){
		const p = this.props;
		const s = this.state;
		const u = this._user();
		if(p.thisId == p.msg.userId){
			return (
				<div className="my-msg msg-container">
					<div className="body-msg">
						<p>{p.msg.text}</p>
					</div>
				</div>
			)
		}else {
			return (
				<div className="friend-msg msg-container">
					<div className="body-msg">
						<p>{p.msg.text}</p>
					</div>
				</div>
			)
		}
	}
}

export default createContainer((props)=>{
	return {

	}
},Message)