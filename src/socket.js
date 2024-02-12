const WebSocket = require("ws");

const connection = new WebSocket("wss://api-ui.hyperliquid.xyz/ws", {
	headers: {
		"accept-language": "en-US,en;q=0.8",
		"cache-control": "no-cache",
		pragma: "no-cache",
		"sec-websocket-extensions":
			"permessage-deflate; client_max_window_bits",
		"sec-websocket-key": "5UZBWfGPzyX6Gc7jcV7ESg==",
		"sec-websocket-version": "13",
	},
});

connection.on("ping", () => {
	connection.pong();
});

module.exports = {
	connection,
};
