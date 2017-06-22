/**
 * Initialize new Fraction object
 * @param {int} num
 * @param {int} denom
 * @return {None} Initialize object
 */	
function Fraction(num, denom=1){

	if (denom === 0){
		alert("Denominator cannot be zero!");
	}else{
		this.num = num;
		this.denom = denom;
	}
}


/**
 * Returns a string representation of Fraction
 * @return {String} string representation
 */
Fraction.prototype.toString = function(){
	
	if (this.denom === 1){
		return this.num;
	}

	return this.num + "/" + this.denom;
}


/**
 * Modifies fraction by adding Fraction a to this fraction
 * @param {Fraction} a 
 * @return {None} Modifies Fraction
 */
Fraction.prototype.add = function(a){

	var numerator = (a.num * this.denom) + (a.denom * this.num);
	var denominator = a.denom * this.denom;
	this.num = numerator;
	this.denom = denominator;
	this.lowestTerms();
}

/**
 * Modifies fraction by subtracting Fraction a from this fraction
 * @param {Fraction} a 
 * @return {None} Modifies Fraction
 */
Fraction.prototype.subtract = function(a){

	var numerator = (a.denom * this.num) - (a.num * this.denom);
	var denominator = a.denom * this.denom;
	var diff = new Fraction(numerator, denominator);
	this.num = numerator;
	this.denom = denominator;
	this.lowestTerms();
}

/**
 * Multiplies the fraction by a scalar
 * @param {Number} a 
 * @return {None} Modifies fraction
 */
Fraction.prototype.multiply = function(multiplier){
 	this.num *= multiplier;
 	this.lowestTerms();
 }

/**
 * Divides the fraction by a scalar
 * @param {Number} a 
 * @return {None} Modifies fraction
 */
Fraction.prototype.divide = function(divisor){
	this.denom *= divisor;
	this.lowestTerms();
}

/**
 * Returns a fraction in lowest terms
 * @param {Fraction} a 
 * @return {None} Modifies Fraction 
 */
Fraction.prototype.lowestTerms = function(){

	if ((this.denom < 0 && this.num < 0) || this.denom < 0){
		this.denom = - this.denom;
		this.num = - this.num;
	}

	if (Object.is(-0, this.num)) this.num = - this.num;
	
 	var n = this.denom;
 	var gcd = this.num;
 	var temp;

 	while (n != 0){
        temp = n;
        n = gcd % n;
        gcd = temp;
    }

    gcd = Math.abs(gcd);

    this.denom /= gcd;
    this.num /= gcd;
}

/**
 * Returns true if the num and denom
 * is equal to this Fraction
 * @return {bool} True if equal 
 */
Fraction.prototype.equals = function(num, denom=1){
	return this.num === num && this.denom === denom;
}


/**
 * Returns clone of the Fraction
 * @return {Fraction} Clone of this Fraction 
 */
Fraction.prototype.clone = function(){

 	return new Fraction(this.num, this.denom);
}