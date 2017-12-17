import React, { Component } from 'react';
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ReactDOM from 'react-dom';
import { browserHistory } from "react-router";
import iconate from 'iconate';
import $ from 'jquery';

import Button from './Button.jsx';


class SideBarLeft extends Component{
	constructor(){
		super();
	}
	route(path,e){
		e.preventDefault();
		browserHistory.push(path);
	}
	logout(e){
		e.preventDefault();
		const data = {
			userId: this.props.userId,
			field: "status",
			value: "offline"
		}
		Meteor.logout(()=>{
			browserHistory.push('/');
		});
	}
	render(){
		const p = this.props;
		const u = p.user;
		return(
			<nav id="leftmenu-pc">
				<ul>
					<li><Button text="Dashboard"/></li>
					<li><Button text="Profile" /></li>
					<li><Button text="Friends" /></li>
					<li><Button text="Refer a friend" onclick={this.route.bind(this,'/home/refer')} /></li>
					<li><Button text="Settings" onclick={this.route.bind(this,'/home/update')} /></li>
					<li><Button text="Help" /></li>
					<li><Button text="Send feedback" /></li>
					<li><Button text="LogOut" onclick={this.logout.bind(this)}/></li>
				</ul>
				<ul className="final">
					<li><Button text="About us" /></li>
					<li><Button text="Legacy" /></li>
					<li><Button text="Privacy&Security" /></li>
				</ul>
			</nav>
		);
	}
}
export default createContainer((props)=>{
	return {
		user: props.user
	}
}, SideBarLeft)