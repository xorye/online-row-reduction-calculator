$(document).ready(function(){

	populateDropdown();


	$("#submit").click(function(){
		populateInputField();

		// if #calculate-button-div is empty, then create the calculate button
		if (!$.trim($("#calculate-button-div").html())){
			createCalculateButton();
		}

	});

	// clicking on dynamically created buttons:
	// https://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements

	$("#calculate-button-div").on("click", "#calculate-button",function(){

		try{
			calculateResult();
		}
		catch(err){
			console.log("There is an empty field");
		}
	})

});


function populateDropdown(){


	for (var i = 1; i <= 10; i ++){
		$(".1-10").append($('<option></option>').val(i).html(i));
	}
}

function populateInputField(){

	// first depopulate field
	$(".text-field").empty();


	// populate the field
	var numOfAdditions = document.getElementById("drop-down").value;

	for (var i = 1; i <= numOfAdditions; i ++){
		$(".text-field").append($('<input id="field-'+i+'" onkeypress="return isValidInput(event)"></input>'));
	}
}

function createCalculateButton(){

	var buttonDiv = document.getElementById("calculate-button-div");
	var button = document.createElement("button");
	button.setAttribute("class", "btn btn-primary");
	button.setAttribute("id", "calculate-button");
	var node = document.createTextNode("Calculate!");
	button.appendChild(node);
	buttonDiv.appendChild(button);
}

function calculateResult(){
	var num_of_fields = $(".text-field > input").length;
	var values = [];

	$(".text-field > input").each(function(){
		// if there is an empty field, throw error
		if (this.value == ""){
			throw "Empty field!";
		}

		// if alphabetical letters are found
		if (this.value.match(/[a-z]/i)) {
   			throw "Illegal character";
		}

		values.push(parseInt(this.value));

	});

	// gets the sum of all values in the array
	var result = values.reduce(function(a, b){
		return a + b;
	}, 0);

	printResult(result);

}

function printResult(result){
	$("#answer-div").append("<h3>The result is "+ result +"</h3>");
}



















