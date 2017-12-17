import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './spacecrafts.sass';
import { naves } from '/client/imports/helpers/spacecrafts.js';
const path = "../../../../../../img/";

class Spacecrafts extends Component{
	constructor(){
		super();
		this.state = {
			currentImage: 1
		}
	}

	upImage(){
		let index = this.state.currentImage;
		if( index > 1 ){
			index--;
			this.setState({ currentImage:  index })
		} 
		$("#naves-back").css({
			"top": 350 - index*255,
			"transition": "1s",
		})
	}
	downImage(){
		let index = this.state.currentImage;
		if( index < 10 ){
			index++;
			this.setState({ currentImage:  index })
		} 
		$("#naves-back").css({
			"top": 350 - index*255,
			"transition": "1s",
		})
	}
	render(){
		const s = this.state;
		const nave = naves[s.currentImage-1];
		return (
			<div className="spacecrafts">
				<div className="contenedor">
					<div className="naves-scroll">
						<div id="naves-back">
							{
								naves.map( (nave,i) => {
									return (
										<img src={ path +"naves/nave_"+ nave.id + ".png" } alt="nave" key = {i}/>
									)
								} )
							}
						</div>
						<div className="naves-front">
							<button onClick={this.upImage.bind(this)}></button>
							<button onClick={this.downImage.bind(this)}></button>
						</div>
					</div>
					<div className="naves-display-info">
						<img src={ path +"naves/nave_"+ s.currentImage + ".png" } alt="nave"/>
						<div>
							<p>{ nave.name }</p>
							<p>{ "life: " + nave.life.base +" + "+ nave.life.scale+" x nivel"}</p>
							<p>{ "damage: " + nave.damage.base +" + "+ nave.damage.scale+" x nivel"}</p>
							<p>{ "speed:  " + nave.speed }</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Spacecrafts;