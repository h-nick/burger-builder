const updateObject = (oldObject, values) => {
	return {
		...oldObject,
		...values
	}
}

export default updateObject;