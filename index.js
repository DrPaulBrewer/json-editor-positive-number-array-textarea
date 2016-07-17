/* loads npm-published function module accepting string, returning array of positive numbers or undefined */

const positiveNumberArray = require('positive-number-array');

function customizeJSONEditor(){

    if (window.JSONEditor){

	/* suggested by json-editor README.md lines 1122-1165 */

	window.JSONEditor.defaults.resolvers.unshift(function(schema){
	    if (schema.type === "array" && schema.format === "textarea" &&  schema.flavor==="positiveNumber"){
		return "positiveNumber";
	    }
	});

	/* from an examination of json-editor/src/editors/number.js */

	window.JSONEditor.defaults.editors.positiveNumber = window.JSONEditor.defaults.editors.string.extend({
	    sanitize(value){
		return (positiveNumberArray(value) || []).join(" ");
	    },
	    getNumColumns(){
		return 2;
	    },
	    getValue(){
		return positiveNumberArray(this.value) || [];
	    }
	});
    }
}

if (window.JSONEditor){
    customizeJSONEditor();
} else {
    console.log("deferring JSON Editor customization to DOMContentLoaded");
    document.addEventListener("DOMContentLoaded", function(){ 
	if (window.JSONEditor){
	    customizeJSONEditor(); 
	} else {
	    console.log("could not load JSON Editor customization at DOMContentLoaded");
	}
    });
}

