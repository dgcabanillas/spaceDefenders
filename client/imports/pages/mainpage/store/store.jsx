import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';

import { store } from '/client/imports/helpers/store.js';
import { naves } from '/client/imports/helpers/spacecrafts.js';
const path = "../../../../../../img/";
import './store.sass';

export default class Store extends Component{
	componentWillUnmount(){
		const user = Meteor.user();
		if(user && !user.username)
			browserHistory.push("/home/update");
	}
	buySpacecraft(id,err){
		const data = {
			_id: Meteor.userId(),
			spacecraft: store.naves[id-1]
		}
		Meteor.call('buySpacecraft', data , (err,res) => {
			if(err) {
				alert(err.error);
			} else {
				alert(res);
			}
		});
	}
	buyCoin( coin ,err){
		const data = {
			_id: Meteor.userId(),
			coin: coin
		}
		Meteor.call('buyCoin', data , (err,res) => {
			if(err) {
				alert(err.error);
			} else {
				alert(res);
			}
		});
	}
	_showNave(nave,i){
		const info = naves[i];
		const user = Meteor.user();
		if ( user && user.spacecrafts ) {
			const spacecrafts = user.spacecrafts;
			if( spacecrafts[nave.id] ) {
				return (
					 <div key={i} className="div-nave">   
						<img src= {path + "naves/nave_"+ nave.id+".png"} alt="obtained"/>
						<div className="info">
							<p>{ info.name }</p>
							<p>{ "life: " + info.life.base +" + "+ info.life.scale+" x nivel"}</p>
							<p>{ "damage: " + info.damage.base +" + "+ info.damage.scale+" x nivel"}</p>
							<p>{ "speed:  " + info.speed }</p>
						</div>
						<p> Obtained </p>
					  </div> 
				);
			} else {
				return (
					<div key={i} className="div-nave"> 
						<img src={path + "naves/nave_"+ nave.id+".png"} alt="to-buy"/>
						<div className="info">
							<p>{ info.name }</p>
							<p>{ "life: " + info.life.base +" + "+ info.life.scale+" x nivel"}</p>
							<p>{ "damage: " + info.damage.base +" + "+ info.damage.scale+" x nivel"}</p>
							<p>{ "speed:  " + info.speed }</p>
						</div>
						<button onClick={this.buySpacecraft.bind(this,nave.id)}>
							buy: { nave.price }
						</button>
					</div> 
				);
			}
		} else {
			return (
				<div key={i} className="div-nave"> cargando ...</div>
			);
		}
	}
	_showCoin(coin,i){
		return (
			<div key={i} className="div-coin">  
				<img src={path + "coins.png"} alt="coins"/>
				<div className="info">
					<p>{ coin.pack }</p>
				</div>
				<button onClick={this.buyCoin.bind(this,coin)}>
					{ coin.price }
				</button>
			</div> 
		);
	}
	render(){
		const naves = store.naves;
		const coins = store.coins;
		return (
			<div className="store">
				<div className="contenedor">
					<div className="products">
						{
							naves.map((nave,i) => {
								return ( this._showNave(nave,i) );
							})
						}
						{
							coins.map((coin,i) => {
								return ( this._showCoin(coin,i) );
							})
						}
					</div>
				</div>
			</div>
		);
	}
}