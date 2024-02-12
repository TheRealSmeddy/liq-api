const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDef = {
	openapi: "3.0.0",
	info: {
		title: "liq",
		version,
	},
	servers: [
		{
			url: `http://localhost:${config.port}/v1`,
		},
	],
};

module.exports = swaggerDef;