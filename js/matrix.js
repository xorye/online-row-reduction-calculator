/**
 * Matrix object
 * @param {Array of Strings || Array of Ints} arr 
 * @param {bool} isStr
 * @return {None} Initizlizes Matrix object
 */
function Matrix(arr, isStr=true){
	// n is columns, m is rows
	
	this.n = arr[0].length;
	this.m = arr.length;
	//this.n = arr[0].constructor == Array ? arr[0].length : arr.length;
	//this.m = arr[0].constructor == Array ? arr.length : 1;

	if (isStr){
		// Converts the array contents to be Fraction objects
		this.arr = this.getFractionMatrix(arr);
	}else{
		this.arr = arr;
	}
}


/**
 * Returns an array with every entry being converted
 * to a Fraction object
 * @return {Array of Fractions} 
 */
Matrix.prototype.getFractionMatrix = function(arr){

	var result = [];

	// If this is a m x n matrix
	for (var row = 0; row < this.m; row++){
		var rowArr = [];

  		for (var col = 0; col < this.n; col++){
  			rowArr.push(stringToFraction(arr[row][col]));
  		}
  		result.push(rowArr);
	}

  	return result;

};

/**
 * Returns Fraction object equivalent to value
 * @param {String} value
 * @return {Fraction} Equivalent Fraction 
 */
function stringToFraction(value){

	if (value === "") return new Fraction(0, 1);

	var frac_index = value.indexOf("/");
	var num, denom;

	if (frac_index >= 0){
		num = parseInt(value.substring(0, frac_index));
		denom = parseInt(value.substring(frac_index + 1));
		
	}else{
		num = parseInt(value);
		denom = 1;
	}

	var frac = new Fraction(num, denom);
	frac.lowestTerms();
	return frac;	
}

/**
 * PERHAPS NOT NECESSARY
 * Returns a specified row
 * @param {Number} row 
 * @return {Matrix} 
 */
Matrix.prototype.getRow = function(row){
 	return new Matrix(this.arr[row], false);
 }

/**
 * Multiplies everything inside the Matrix
 * with a scalar
 * @param {Number} n 
 * @return {None} Modifies Matrix 
 */
Matrix.prototype.multiply = function(n){

	for (var row = 0; row < this.m; row++){
		for (var col = 0; col < this.n; col++){
			console.log(this.arr[row][col]);
  			this.arr[row][col].multiply(n);
  		}
	}
}

/**
 * Divides everything inside the Matrix
 * with a scalar
 * @param {Number} n 
 * @return {None} Modifies Matrix 
 */
Matrix.prototype.divide = function(n){

	for (var row = 0; row < this.m; row++){
		for (var col = 0; col < this.n; col++){
			this.arr[row][col].divide(n)
		}
	}
}

/**
 * Swaps two rows. row1 and row2 are indices.
 * @param {Number} row1
 * @param {Number} row2 
 * @return {None} Modifies Matrix 
 */
Matrix.prototype.swap = function(row1, row2){
	var temp = this.arr[row2];

	this.arr[row2] = this.arr[row1];
	this.arr[row1] = temp;
}


Matrix.prototype.toString = function(){

	var str = ""

	// If this is an m x n matrix
	for (var row = 0; row < this.arr.length; row++){

		for (var col = 0; col < this.n; col++){
  				str += this.arr[row][col] + " ";
  		}

  		str += "\n";
	}
	return str;


}

/**
 * Modifies Matrix by row reducing. Multiplies row1 by factor 
 * and adds it to row2. row 1 and row2 are indices.
 * Precondition: Matrix must have at least 2 rows.
 * @param {int} row1
 * @param {int} row2
 * @param {Fraction} factor
 * @return {None} Modifies Matrix. 
 */
Matrix.prototype.multiplyByAdd = function(row1, row2, factor){
	var row1Clone = this.cloneRow(row1);
	divideArray(row1Clone, factor.denom);
	multiplyArray(row1Clone, factor.num);

	for (var i = 0; i < this.n; i++){
		this.arr[row2][i].add(row1Clone[i]);
	}
}

/**
 * Return a clone of row row, as an array. Return
 * type is an array in order to simplify addition.
 * row is an index.
 * @param {int} row
 * @return {Array of Fractions} Clone of a row
 */
 Matrix.prototype.cloneRow = function(row){
 	var cloneArray = [];

 	cloneArray = this.arr[row].map(function(fraction){
 		return fraction.clone();
 	})

 	return cloneArray;
}

/**
 * Return a clone of this Matrix.
 * @return {Matrix} Clone of this Matrix
 */
Matrix.prototype.clone = function(){
	var cloneArr = [];

	for (row = 0; row < this.m; row ++){
		cloneArr.push(this.cloneRow(row));
		
	}

	return new Matrix(cloneArr, false);
}

/**
 * Modifies a Matrix in row echelon form into a Matrix
 * in reduced row echelon form.
 * @param {MoveSet} moveSet
 * @return {None} Modifies array 
 * http://people.math.aau.dk/~ottosen/MMA2011/rralg.html
 */
Matrix.prototype.gaussianAlgBackward = function(moveSet){
	var pivot_col = this.n - 1;
	var pivot_pos = this.m - 1;

	while (pivot_col >= 0 && pivot_pos >= 0){

		console.log("Pivot position: " + pivot_pos);
		console.log("Pivot column " + pivot_col);
		console.log(this.arr);
		// Ensure that pivot_pos has a 1
		while (this.arr[pivot_pos][pivot_col].equals(0)){
			pivot_pos --;
			// if (pivot_pos >= 1){
			// 	pivot_col --;
			// 	continue;
			// }

			if (pivot_pos < 0){
				pivot_col --;
				pivot_pos = this.m - 1;
			}

			if (pivot_col < 0){
				pivot_col = 0;
				pivot_pos = 0;
				break;
			}
			console.log("Pivot position: " + pivot_pos);
			console.log("Pivot column " + pivot_col);
		}


		// At this point, this.arr[pivot_pos][pivot_col] contains a 1
		this.makeAboveBelowZeros(pivot_col, pivot_pos, "above", moveSet);
		pivot_col--;
		pivot_pos--;
	}

	var message = "This matrix is in reduced row echelon form.";

	moveSet.moves[moveSet.length - 1][0] += message;
}



/**
 * Modifies Matrix such that it is in row echelon form
 * @param {MoveSet} moveSet
 * @return {None} Modifies array 
 * http://people.math.aau.dk/~ottosen/MMA2011/rralg.html
 */
Matrix.prototype.gaussianAlgForward = function(moveSet){

 	var pivot_col = 0;
 	var pivot_pos = 0;

 	while (pivot_col < this.n && pivot_pos < this.m){

 		// If we have a zero, we need to swap with a non-zero row
 		if (this.arr[pivot_pos][pivot_col].equals(0)){
 			try{
 				this.swapWithNonzero(pivot_col, pivot_pos, moveSet);

 			}
 			catch(err){
 				pivot_col ++;
 				continue;
 			}
 		}

 		//At this point, this.arr[pivot_pos][pivot_col] contains a non-zero value
 		if (!this.arr[pivot_pos][pivot_col].equals(1)) this.setToOne(pivot_col, pivot_pos, moveSet);

 		this.makeAboveBelowZeros(pivot_col, pivot_pos, "below", moveSet);

 		pivot_col ++;
 		pivot_pos ++;

 	}

 	var message = "This matrix is in row echelon form.";

 	if (moveSet.length === 0){
 		this.addToMoveSet(message, moveSet);
 	}else{
 		moveSet.moves[moveSet.length - 1][0] += message;
 	}
}

/**
 * Modifies Matrix such that the row represented by pos
 * will swap with a non zero row below it. If a non zero
 * row does not exist, throws an error. Prioritizes a
 * row swap with a row with a value of 1.
 * @param {Number} pos 
 * @param {Number} col
 * @param {MoveSet} moveSet
 * @return {None} Modifies array 
 */
Matrix.prototype.swapWithNonzero = function(col, pos, moveSet){

	var initial_row = pos;
	var potential_row = -1;
	var moveString = "";
	
	for(var row = pos + 1; row < this.m; row++){

		if (this.arr[row][col].equals(1)){
			this.swap(row, initial_row);
			moveString = "Swapped row " + (initial_row + 1) + " with "+ (row + 1) + ".";
			this.addToMoveSet(moveString, moveSet);
			return;

		}else if (!this.arr[row][col].equals(0)){
			potential_row = row;
		}
	}

	if (potential_row > -1){
		this.swap(initial_row, potential_row);
		moveString = "Swapped row " + (initial_row + 1) + "with "+ (potential_row + 1) + ".";
		this.addToMoveSet(moveString, moveSet);
		return;
	}else{
		throw "Unable to find non-zero row to swap with";
	}	
}

/**
 * Performs row operations to the Matrix such that 
 * the value in row pos and col col is 1.
 * @param {Number} col
 * @param {Number} row
 * @param {MoveTracker} moveSet
 * @return {None} Modifies array 
 */
Matrix.prototype.setToOne = function(col, row, moveSet){

	var fraction = this.arr[row][col];
	var num = fraction.num;
	var denom = fraction.denom;
	var moveString = "Divide row " + (row + 1) + " by " + fraction + ".";
	multiplyArray(this.arr[row], denom);
	divideArray(this.arr[row], num);
	this.addToMoveSet(moveString, moveSet);
}

/**
 * Performs row operations to the Matrix the values
 * below row row on column col, are all 0s.
 * Precondition: this.arr[row][col] is a fraction equal to 1
 * @param {Number} col
 * @param {Number} row
 * @param {String} dir (dir must be "above" or "below")
 * @param {MoveTracker} moveSet
 * @return {None} Modifies array 
 */
Matrix.prototype.makeAboveBelowZeros = function(col, row, dir, moveSet){

	if (dir === "below"){
		for (var i = row + 1;  i < this.m; i++){
			// var fraction = this.arr[i][col].clone();
			// var num = fraction.num;
			// var denom = fraction.denom;
			// fraction.multiply(-1);

			// if(num !== 0){
			// 	var moveString = "Multiply row " + (row + 1) + " by "+fraction+" and add to row " + (i + 1) + ".";
			// 	this.multiplyByAdd(row, i, new Fraction(-num, denom));
				
			// 	this.addToMoveSet(moveString, moveSet);
			// }
			this.makeZero(row, i, col, moveSet);
		}
	}else{
		for (i = row - 1; i >= 0; i--){

			this.makeZero(row, i, col, moveSet)

		}
	}

}

/**
 * Performs row operations with row1 such that Matrix[row2][col] is 0
 * @param {Number} row1
 * @param {Number} row2
 * @param {Number} col
 * @param {MoveTracker} moveSet
 * @return {None} Modifies Array
 */
Matrix.prototype.makeZero = function(row1, row2, col, moveSet){
	var fraction = this.arr[row2][col].clone();
	var num = fraction.num;
	var denom = fraction.denom;
	fraction.multiply(-1);

	if(num !== 0){
		var moveString;
		if (fraction.equals(1)) moveString = "Add row " + (row1 + 1) + " to row " + (row2 + 1) + "."; 
		else var moveString = "Multiply row " + (row1 + 1) + " by "+fraction+" and add to row " + (row2 + 1) + ".";

		this.multiplyByAdd(row1, row2, new Fraction(-num, denom));
		this.addToMoveSet(moveString, moveSet);
	}
}


/**
 * Returns Fraction object at row row and column col.
 * @param {int} row
 * @param {int} col
 * @return {Fraction} Fraction to return. 
 */
 Matrix.prototype.getFraction = function(row, col){
 	return this.arr[row][col];
}


/**
 * Adds moveString and the Array to MoveTracker moveSet
 * @param {String} moveString
 * @param {MoveTracker} moveSet
 * @return {None} Modifies moveSet. 
 */
Matrix.prototype.addToMoveSet = function(moveString, moveSet){
	var clone = this.clone();
	moveSet.addMove(moveString, clone);
}

/**
 * Outputs this Matrix to the document
 * @param {String} moveString
 * @return {None} Modifies the document 
 */
Matrix.prototype.outputToDocument = function(moveString=""){
	var answerDiv = document.getElementById("answer-div");
	var table = document.createElement("table");
	table.setAttribute("class", "table table-bordered");
	table.setAttribute("style", "width: 130px; height: 40px");

	for (var row = 0; row < this.m; row++){
		var tableRow = document.createElement("tr");
		for (var col = 0; col < this.n; col++){
			var data = document.createElement("td");
			data.setAttribute("align", "left");
			var node = document.createTextNode(this.getFraction(row, col));
			data.appendChild(node);
			tableRow.appendChild(data);
		}
		table.appendChild(tableRow);
	}

	answerDiv.appendChild(table);

	if (moveString != ""){
		// TODO this is where i left off!!
		var count = (moveString.match(/\./g) || []).length;
		if (count === 2){
			var preiodIndex = moveString.indexOf(".");

			$("#answer-div").append('<p class="steps">'+ moveString.substring(0, preiodIndex+1) +'</p>');
			$("#answer-div").append('<p class="steps">'+ moveString.substring(preiodIndex+1) +'</p>'); 

		}else{
			$("#answer-div").append('<p class="steps">'+ moveString +'</p>');
		}
	}
}


/**
 * Modifies array object arr such that it is multiplied by a factor n
 * @param {Array of Fractions} arr
 * @param {int} n
 * @return {None} Modifies array 
 */
function multiplyArray(arr, n){

	for (var i = 0; i < arr.length; i++){
		arr[i].multiply(n);
	}
}

/**
 * Modifies array object arr such that it is divided by a factor n
 * @param {Array of Fractions} arr
 * @param {int} n
 * @return {None} Modifies array 
 */
function divideArray(arr, n){
	for (var i = 0; i < arr.length; i++){
		arr[i].divide(n);
	}
}




