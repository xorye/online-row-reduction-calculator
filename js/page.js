// Ensures that whatever the user types in, it is a number or
// fraction
function isValidInput(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode != 47 && charCode != 45 && (charCode < 48 || charCode > 57))){
		return false;
	}
	return true;
}