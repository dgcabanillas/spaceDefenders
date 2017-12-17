import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import State from "/client/imports/helpers/state.js";
import { findUsers } from "/client/imports/helpers/querys.js";

import UserLink from './userlink.jsx';

class SearchPanel extends TrackerReact(Component){
	onchange(e){
		e.preventDefault();
		let value = e.target.value;
		State.set({"search.value":value});
	}
	renderResultUsers(){
		let users = this.props.users;
		return users.map((user,i)=>(
			<UserLink user={user} key={i}/>
		));
	}
	render(){
		return (
			<div className="search-panel">
				<div className="search">
					<button onClick={this.props.changePanel.bind(this)}>
						<span>{">>>"}</span>Show Friends<span>{"<<<"}</span>
					</button>
					<input type="text" onChange={this.onchange.bind(this)}/>
				</div>
				<div className="result">
					<ul>
						{this.renderResultUsers()}
					</ul>
				</div>
			</div>
		);
	}
}
export default createContainer((props)=>{
	const value = State.get({'search.value':1}).search.value
	Meteor.subscribe('findUsers',value);
	
	return {
		"value" : value,
		"users" : value == "" ? [] : findUsers(value).fetch()
	}
},SearchPanel);