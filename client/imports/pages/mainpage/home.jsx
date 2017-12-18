import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import wrap from "react-wrap-children";
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import './home.sass';
const path = "../../../../../img/";
import State from "/client/imports/helpers/state.js";
import SocialPanel from './socialpanel/socialpanel.jsx';
import SocialChat from './socialchat/socialchat.jsx';
import HomeTopBar from './topbar/HomeTopBar.jsx';
import SideBarLeft from './topbar/SideBarLeft.jsx';

class Home extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		if(!Meteor.userId()){
			browserHistory.push('/');
		}else{
			Meteor.setTimeout(()=>{
				const user = this.props.user;
				const data = {
					_id: user._id,
					field: "status",
					value: "online"
				}
				Meteor.call("updateState", data , (err,res)=>{
					if(err) alert("something went wrong.");
				});
				if(!user.username)
					browserHistory.push("/home/update");
			},300);
		}
	}
	_renderChat(){
		const p = this.props;
		if(p.chat.status == "open") return (<SocialChat />);
	}
	_renderTopMenu(user){
		return ( <HomeTopBar user={user}/> );
	}
	_renderLeftMenu(user){
		const p = this.props;
		return ( <SideBarLeft user={user}/> );
	}
	_renderSocialPanel(user){
		return ( <SocialPanel user={user}/> );
	}
	_renderPropsChildren(user){
		return wrap(this.props.children, {user: user}) ;
	}
	render(){
		const user = this.props.user;
		if( user && !user.spacecrafts ){
			return ( <p>cargando ..</p> )
		}
		return(
			<div className="home">
				{ this._renderTopMenu(user) } 
				{ this._renderLeftMenu(user) }
				{ this._renderSocialPanel(user) }
				{ this._renderChat(user) }
				{ this._renderPropsChildren(user) }
			</div>
		);
	}
}

export default createContainer((props)=>{
	const profileHandle = Meteor.subscribe('profile');
	return {
		chat: State.get({chat:1}).chat,
		user: Meteor.users.findOne({_id:Meteor.userId()},{})
	};
}, Home)