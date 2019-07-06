const checkValidation = (value, rules) => {
	// Each rule is checked against && isValid to avoid having the last rule change the isValid value to true
	// if another rule check changes it to false.

	let isValid = true;

	if(!rules) return true;

	if(rules.required) {
		// False if the trimmed value equals to an empty string.
		isValid = value.trim() !== '' && isValid;
	}

	if(rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if(rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	return isValid;
}

export default checkValidation;