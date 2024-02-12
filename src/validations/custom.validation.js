const hex = (value, helpers) => {
	if (!value.match(/^0x[0-9A-Fa-f]*$/)) {
		return helpers.message('"{{#label}}" must be a valid hex');
	}

	return value;
};

module.exports = {
	hex,
};
