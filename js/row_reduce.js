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
		calculateResult();
		
	})

});


function populateDropdown(){

	for (var i = 1; i <= 20; i ++){
		$(".1-20").append($('<option></option>').val(i).html(i));
	}
}

function populateInputField(){

	// first depopulate field
	$(".text-field").empty();


	// populate the field
	var m = document.getElementById("drop-down-m").value;
	var n = document.getElementById("drop-down-n").value;

	for (var i = 1; i <= m; i ++){
		for (var j = 1; j <= n; j ++){
			$(".text-field").append($('<input id="field-'+i+','+j+'" onkeypress="return isValidInput(event)"></input>'));
		}
		$(".text-field").append($("<br/>"))
	}
}

function createCalculateButton(){

	$("#rref-select-div").append('<select id="rref-select"></select>');
	$("#rref-select").append('<option>Reduced Row Echelon Form</option>');
	$("#rref-select").append('<option>Row Echelon Form</option>');

	$("#calculate-button-div").append('<button class="btn btn-primary" id="calculate-button">Calculate!</button>');
}

function calculateResult(){

	var moveSet = new MoveTracker();
	var matrix = getMatrix();


	matrix.gaussianAlgForward(moveSet);

	if ($("#rref-select").val() === "Reduced Row Echelon Form"){
		matrix.gaussianAlgBackward(moveSet);
	}

	for (i = 0; i < moveSet.length; i ++){
		moveSet.moves[i][1].outputToDocument(moveSet.moves[i][0]);
	}

}


/**
 * Returns Matrix object from the contents of .text-field
 * Precondition: each input must have a value
 * @return {Matrix} Matrix object
 */
function getMatrix(){
	var m = document.getElementById("drop-down-m").value;
	var n = document.getElementById("drop-down-n").value;
	var arr = [];
	var rowArr = [];
	
	for (var row = 1; row <= m; row++){
		for (var col = 1; col <= n; col++){
			var val = document.getElementById('field-'+row+','+col).value;
			rowArr.push(val);
		}
		arr.push(rowArr);
		rowArr = [];
	}

	return new Matrix(arr);

}

function printResult(result){
	$("#answer-div").append("<h3>The result is "+ result +"</h3>");
}



















