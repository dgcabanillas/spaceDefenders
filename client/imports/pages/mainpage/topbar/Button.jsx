import React, { Component } from 'react';

class Button extends Component{
	constructor(){
		super();
	}
	renderIcon(){
		const p = this.props;
		if(p.icon) return ( <div className="buttonIcon"><i className={"fa "+p.icon} aria-hidden="true"></i></div>);
	}
	renderText(){
		const p = this.props;
		if(p.text) return ( <p className="buttonText">{p.text}</p> );
	}
	render(){
		const p = this.props;
		return (
			<div className="button" onClick={p.onclick}>
				<div className={"target1 "+p.active}></div>
				<div className={"target2 "+p.active}></div>
				<button>
					{this.renderIcon()}
					{this.renderText()}
				</button>
			</div>
		)
	}
}

export default Button;
