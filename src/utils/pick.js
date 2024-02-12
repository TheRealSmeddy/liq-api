/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// eslint-disable-next-line no-param-reassign
			if (typeof object[key] === "string") {
				obj[key] = object[key].toLowerCase();
			} else {
				obj[key] = object[key];
			}
		}
		return obj;
	}, {});
};

module.exports = pick;
