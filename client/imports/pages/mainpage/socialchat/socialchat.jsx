import React, { Component } from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import $ from 'jquery';

import './socialchat.sass';
import { Chat } from '/lib/database.js';
import State from "/client/imports/helpers/state.js";

const imgPath = "../../../../../../spaceDefenders/social/"
class SocialChat extends TrackerReact(Component){
	componentWillMount(){

	}
	componentDidMount(){
		$('#chat-genbby').keydown(function(e) {
		    if (e.keyCode == 13 && ! e.shiftKey) {
		    	const text = $('#chat-genbby').val();
		    	const data = {
		    		chatID: this.props.chatroom.chatID,
		    		msg: {
		    			userId: Meteor.userId(),
			    		text: text,
			    		time: new Date()
		    		}
		    	}
		    	Meteor.call('sendMsg', data , ()=>{} , (err,res)=>{
					if(err) console.log(err);
				});
		    	$('#chat-genbby').val('');	
		    }
		}.bind(this));
	}
	componentDidUpdate(){
		$('.chat-messages').animate({scrollTop: $('.all-messages').height()},"fast")
	}
	render(){
		const p = this.props;
		return (
			<div id="social-chat">
				<div className="chat-output">
					<img src={imgPath+"chatOutput.svg"} alt="output"/>
					<div className="chat-messages">
						<div className="all-messages">
							{
								p.chat.messages.map((msg,i)=>{
									return (<Message msg={msg} key={i} user1={p.chat.user1} user2={p.chat.user2} thisId={p.thisId}/>)
								})
							}
						</div>
					</div>
				</div>
				<div className="chat-input">
					<img src={imgPath+"chatInput.svg"} alt="input"/>
					<input type="text" id="chat-genbby"/>
				</div>
			</div>
		);
	}
}

export default createContainer((props)=>{
	const chat = State.get({'chat':1}).chat;
	const chatmsg = Meteor.subscribe('chatMessages',chat.chatID);
	const chatmsgReady = chatmsg.ready();
	return {
		"chat": !chatmsgReady?{messages:[]}:Chat.findOne({_id:chat.chatID}),
		"chatroom": chat,
		"thisId": Meteor.userId()
	}
},SocialChat)