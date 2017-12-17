import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';

import { store } from '/client/imports/helpers/store.js';
const path = "../../../../../../img/";
import './store.sass';

export default class Store extends Component{
	componentWillUnmount(){
		const user = Meteor.user();
		if(user && !user.username)
			browserHistory.push("/home/update");
	}
	_showNave(nave,i){
		const user = Meteor.user();
		if ( user ) {
			const spacerafts = user.spacerafts;
			if( spacerafts[nave.id] ) {
				return (
					 <div key={i} className="obtained"> 
						<img src= {path + "naves/nave_"+ nave.id+".png"} alt="obtained"/>
						<div className="info">
							<p>{ nave.name }</p>
							<p>{ "life: " + nave.life.base +" + "+ nave.life.scale+" x nivel"}</p>
							<p>{ "damage: " + nave.damage.base +" + "+ nave.damage.scale+" x nivel"}</p>
							<p>{ "speed:  " + nave.speed }</p>
						</div>
					  </div> 
				);
			} else {
				return (
					<div key={i} className="to-buy"> 
						<img src={path + "naves/nave_"+ nave.id+".png"} alt="to-buy"/>
						<button>
							buy: { nave.price }
						</button>
					</div> 
				);
			}
		} else {
			return (
				<div key={i}> cargando ...</div>
			);
		}

	}
	render(){
		const naves = store.naves;
		const coins = store.coins;
		return (
			<div className="store">
				<div className="contenedor">
					<div className="options">

					</div>
					<div className="products">
						{
							naves.map((nave,i) => {
								return ( this._showNave(nave,i) );
							})
						}
						{
							coins.map((coin,i) => {
								return ( <div key={i}></div> );
							})
						}
					</div>
				</div>
			</div>
		);
	}
}