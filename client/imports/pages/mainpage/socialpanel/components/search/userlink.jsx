import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";

import State from "/client/imports/helpers/state.js";

export default class UserLink extends Component{
	route(e){
		e.preventDefault();
		browserHistory.push("/home/loading");
		Meteor.setTimeout(()=>{
			browserHistory.push("/home/user/"+this.props.user._id);
		},200)
	}
	render(){
		const user = this.props.user;
		return (
			<li className="user-link">
				<div>
					<div>
						<p>{user._id}</p>
					</div>
				</div>
				<button onClick={this.route.bind(this)} >View Profile</button>
			</li>
		);
	}
}

