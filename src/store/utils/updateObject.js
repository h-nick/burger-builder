export const updateObject = (oldObject, values) => {
	return {
		...oldObject,
		...values
	}
}