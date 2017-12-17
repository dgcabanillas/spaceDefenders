import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import $ from 'jquery';

import './socialpanel.sass';
import SearchPanel from './components/search/searchpanel.jsx';
import FriendsPanel from './components/friends/friendspanel.jsx';
import State from "/client/imports/helpers/state.js";

class SocialPanel extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
			icon: "minimize",
			content: "friendspanel"
		}
	}
	change(e){
		e.preventDefault();
		let s = this.state;
		if(s.icon == "minimize"){
			this.setState({icon: "maximize"});
			State.set({'chat.status':"close"});
			$("#social-panel").addClass("close");
		} 
		else if(s.icon == "maximize"){
			this.setState({icon: "minimize"});
			$("#social-panel").removeClass("close");
		} 
	}

	renderContentPanel(){
		let c = this.state.content;
		if(c == "searchpanel")
			return <SearchPanel changePanel={this.changeStatePanel.bind(this)}/>
		else
			return <FriendsPanel changePanel={this.changeStatePanel.bind(this)}/>
	}
	changeStatePanel(e){
		e.preventDefault();
		let c = this.state.content;
		if(c== "searchpanel") this.setState({content: "friendspanel"});
		else this.setState({content: "searchpanel"});
	}

	render(){
		return (
			<div id="social-panel">
				<button onClick={this.change.bind(this)} >
					{this.state.icon+" chat "}
					<span><i className={"fa fa-window-"+this.state.icon} aria-hidden="true"></i></span>
				</button>
				{this.renderContentPanel()}
			</div>
		);
	}
}

export default createContainer((props)=>{
	return {
		chat: State.get({chat:1}).chat
	};
}, SocialPanel)