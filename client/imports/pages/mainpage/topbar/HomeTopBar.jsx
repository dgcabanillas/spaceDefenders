import React, { Component } from 'react';
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ReactDOM from 'react-dom';
import { browserHistory } from "react-router";
import iconate from 'iconate';
import $ from 'jquery';

import { getUsername , getUserImage } from '/client/imports/helpers/helpers.js';
import CardUser from './CardUser.jsx';
import Button from './Button.jsx';

import './topbar.sass';

const path = "../../../../../../../img/logo_text.png";
let contador;

class HomeTopBar extends Component{
	constructor(){
		super();
		this.state = {
			topbar: [
				{
					text:"SPACECRAFTS",
					active:"active",
					route:'/home',
					style:{"display": "flex"}
				},
				{
					text:"PLAY",
					active:"active",
					route:'/home/play',
					style:{"display": "flex"}
				},
				{
					text:"STORE", 
					active:"active", 
					route:'/home/store',
					style:{"display": "flex"}
				},
				{
					text:"RECORD",
					active:"active", 
					route:'/home/record',
					style:{"display": "flex"}
				}
			]
		}
	}
	componentWillMount(){
		contador = 1;
	}
	onToggle(e){
		e.preventDefault();
		let icon = $('#icon');
		let options={
			from: 'fa-bars',
		}
		if(contador%2==1){
			options.to = "fa-times";
			options.animation= 'rollOutRight';
			$('#leftmenu-pc').addClass("active");
		}else{
			options.to = "fa-bars";
			options.animation= 'rollOutLeft';
			$('#leftmenu-pc').removeClass("active");
		}
		iconate(icon[0],options);
		contador++;
	}
	route(path,e){
		e.preventDefault();
		browserHistory.push(path);
	}
	render(){
		const p = this.props;
		const u = p.user;
		return(
			<header className="homeTopBar">
				<div className="menu">
					<a className="bt-menu" onClick={this.onToggle.bind(this)}>
						<i id="icon" className="fa fa-bars" aria-hidden="true"></i>
					</a>
					<a id="ltbLogo" onClick={this.route.bind(this,'/home')} className="bt-menu htb_title">
						<img src={path} alt="logo"/>
					</a>
				</div>
				<div className="content_list">
					<ul>
						{this.state.topbar.map((btn,i) => 
							(
								<li key={i} style={btn.style}>
									<Button text={btn.text} active={btn.active} onclick={this.route.bind(this,btn.route)}/>
								</li>
							))
						}
					</ul>
				</div>
				<div className="data_list">
					<a className="bt-menu" onClick={() => browserHistory.push("/home/update")}>
						<img src={ getUserImage(p.user) } alt="profile"/>
						{ getUsername(p.user) }
					</a>
				</div>
			</header>
		);
	}
}

export default createContainer((props)=>{
	return {
		user: props.user
	}
}, HomeTopBar)


