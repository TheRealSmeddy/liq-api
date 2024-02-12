const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const { connection } = require("./socket");

let server;

connection.on("open", () => {
	logger.info(`Connected to websocket.`);

	server = app.listen(config.port, () => {
		logger.info(`Listening to port ${config.port}`);
	});
});

process.on("SIGTERM", () => {
	logger.info("SIGTERM received");
	if (server) {
		server.close();
	}
});
