import { Meteor } from "meteor/meteor";
import StateTree from "meteor/streemo:meteor-react-state-tree";


const State = new StateTree({
	chat:  { status: "close", contact: "",chatID: "" },
	form:  { status: "close" }
})

State.setModal = function(mode){
	this.set({'modal.mode':mode});
}

State.setSnackbar = function(msg){
	const m = Messages.get(msg) || msg || "Oops, something went wrong.";
	this.set({snackbar:{open:true, message:m}})
}

export default State;