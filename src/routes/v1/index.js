const express = require("express");
const docsRoute = require("./docs.route");
const mainRoute = require("./main.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/",
		route: mainRoute,
	},
];

const devRoutes = [
	{
		path: "/docs",
		route: docsRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;