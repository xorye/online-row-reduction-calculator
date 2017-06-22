/**
 * MoveTracker object
 * @return {None} Initizlizes MoveTracker object
 */
function MoveTracker(){

 	// this.moves is a list of lists of length 2, where each list
 	// represents a move.
 	// Array[Array[String, Matrix]]
 	this.moves = [];
 	this.length = 0;
 	this.currentMove = 0;
}

/**
 * Returns list containing the next move.
 * @return {Array[String, Matrix]} 
 */
MoveTracker.prototype.getNextMove = function(n){
	this.currentMove ++;
	return this.moves[this.currentMove - 1];
}

/**
 * Adds move to the MoveTracker
 * @param 
 * @return {None} Modifies MoveTracker
 */
MoveTracker.prototype.addMove = function(string, matrix){
	var move = [];
	move.push(string);
	move.push(matrix);
	this.length ++;
	this.moves.push(move);
}

