import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class CardUser extends TrackerReact(Component){
	render(){
		return (
			<div className="cardUser center-align">
				<div className="role">
					<p>Master</p>
					<p>Carry</p>
				</div>
			</div>	
		);
	}
}
