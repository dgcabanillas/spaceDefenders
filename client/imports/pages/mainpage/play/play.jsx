import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';

import './play.sass';
const path = "../../../../../img/";

export default class Play extends Component{
	constructor(){
		super();
	}
	componentDidMount() {
		const user = Meteor.user();
		if( user && user.spacecrafts ){
			let cont = 0;
			for( let sc in user.spacecrafts ) { cont++; }
			if( cont == 0 ) {
				alert("You need at least one spacecraft.");
				browserHistory.push('/home/store');
			} 
		} 
	}
	componentWillUnmount(){
		const user = Meteor.user();
		if(user && !user.username)
			browserHistory.push("/home/update");
	}
	updateState(value) {
		const data = {
			_id: Meteor.userId(),
			field: "status",
			value: value
		}
		Meteor.call('updateState',data,(err)=>{
			if(err) {
				alert(err.error);
			}
		})
	}
	acceptMatch() {
		const data = {
			_id: Meteor.userId(),
			field: "status",
			value: "playing"
		}
		Meteor.call('updateState',data,(err)=>{
			if(err) {
				alert(err.error);
			}
		})
		let win = window.open("http://localhost:2000","_blank");
		win.focus();
	}
	findMatch(){
		Meteor.call('findMatch',{_id: Meteor.userId() },(err)=>{
			if(err) {
				alert(err.error);
			}
		})
	}
	_renderButton() {
		const user = Meteor.user();
		if( !user ){
			return (
				<p> cargando ...</p>
			)
		} else if( user && user.status ){
			const s = user.status;
			if( s == "online" ){
				return (
					<button onClick={ this.findMatch.bind(this)} className="btn-find-match"> FIND MATCH </button>
				)
			} else if ( s == "finding" ) {
				return (
					<button onClick={ this.updateState.bind(this,"online")} className="btn-cancel"> CANCEL </button>
				)
			} else if ( s == "found" ) {
				return (
					<button onClick={ this.acceptMatch.bind(this,"playing") } className="btn-accept"> ACCEPT </button>
				)
			} else {
				return (
					<button className="btn-playing"> PLAYING </button>
				)
			}
		}
		
	}
	render(){
		return (
			<div className="space-defenders-play">
				<img src={path+"findingmatch.gif"} alt="background"/>
				{ this._renderButton() }
			</div>
		);
	}
}