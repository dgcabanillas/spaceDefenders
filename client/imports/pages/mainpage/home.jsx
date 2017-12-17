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
					userId: user._id,
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
	_renderTopMenu(){
		const p = this.props;
		return ( <HomeTopBar user={p.user}/> );
	}
	_renderLeftMenu(){
		const p = this.props;
		return ( <SideBarLeft user={p.user}/> );
	}
	_renderSocialPanel(){
		const p = this.props;
		return ( <SocialPanel user={p.user}/> );
	}
	_renderPropsChildren(){
		const p = this.props;
		return wrap(this.props.children, {user: p.user}) ;
	}
	render(){
		return(
			<div className="home">
				{ this._renderTopMenu() } 
				{ this._renderLeftMenu() }
				{ this._renderSocialPanel() }
				{ this._renderChat() }
				{ this._renderPropsChildren() }
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