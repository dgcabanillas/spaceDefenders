import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import $ from 'jquery';

import State from "/client/imports/helpers/state.js";
import { friendsList } from "/client/imports/helpers/querys.js";
import UserStatus from './userstatus.jsx';

class FriendsPanel extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
			online: "down",
			offline: "right",
			onlineCount: 0,
			offlineCount: 0
		}
	}
	changeListState(list,e){
		e.preventDefault();
		switch(list){
			case "online":
				if(this.state.online == "right"){
					this.setState({online:"down"})
				}else{
					this.setState({online:"right"})
				}
				break;
			case "offline":
				if(this.state.offline == "right"){
					this.setState({offline:"down"})
				}else{
					this.setState({offline:"right"})
				}
				break;
		}
	}
	allFriends(){
		let out = {
			online: 0,
			offline: 0,
			total: 0,
			onlineList: [],
			offlineList: []
		}
		const friends = this.props.friends;
		friends.map((friend) => {
			out.total++;
			if(friend.status == "online") {
				out.online++;
				out.onlineList.push(friend);
			}
			if(friend.status == "offline") {
				out.offline++;
				out.offlineList.push(friend);
			}
		})
		return out;
	}
	render(){
		const s = this.state;
		const list = this.allFriends();
		return (
			<div className="friends-panel">
				<div className="aux-button">
					<button onClick={this.props.changePanel.bind(this)}> 
						<span>{">>>"}</span>Search Users<span>{"<<<"}</span>
					</button>
				</div>
				<div id="list-friends-online">
					<button onClick={this.changeListState.bind(this,"online")}>
						<span><i className={"fa fa-caret-"+s.online} aria-hidden="true"></i></span>
						<p>ONLINE {"("+list.online+"/"+list.total+")"}</p>
					</button>
					<div className="list-friends" style={{display: s.online=="right"?"none":"initial"}}>
						{
							list.onlineList.map((friend,key)=>{
								return (<UserStatus user={friend} key={key}/>)
							})
						}
					</div>
				</div>
				<div id="list-friends-offline">
					<button onClick={this.changeListState.bind(this,"offline")}>
						<span><i className={"fa fa-caret-"+s.offline} aria-hidden="true"></i></span>
						<p>OFFLINE {"("+list.offline+"/"+list.total+")"}</p>
					</button>
					<div className="list-friends" style={{display: s.offline=="right"?"none":"initial"}}>
						{
							list.offlineList.map((friend,key)=>{
								return (<UserStatus user={friend} key={key}/>)
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer((props)=>{
	const friendslist = Meteor.subscribe('friends');
	const friendsListReady = friendslist.ready();
	return {
		"friends" : !friendsListReady?[]:friendsList().fetch()
	}
},FriendsPanel);


