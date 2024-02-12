const { connection } = require("../socket");

/**
 *
 * @param {string} address
 * @returns
 */
const getPositions = async (address) => {
	connection.send(
		`{"method":"subscribe","subscription":{"type":"webData2","user":"${address}"}}`
	);

	const userData = await new Promise((resolve, reject) => {
		function messageHandler(data) {
			data = JSON.parse(data.toString());

			if (
				data.channel === "webData2" &&
				data.data.user === address.toLowerCase()
			) {
				connection.send(
					`{"method":"unsubscribe","subscription":{"type":"webData2","user":${address}}}`
				);

				resolve(data.data);
			}
		}

		connection.on("message", messageHandler);
	});

	const positions = userData.clearinghouseState.assetPositions;

	const unrealizedPnl = positions.reduce(
		(a, b) => a + Number(b.position.unrealizedPnl),
		0
	);

	const accountEquity = Number(
		userData.clearinghouseState.marginSummary.accountValue
	);

	const balance = Math.abs(unrealizedPnl) + Number(accountEquity);

	const maintenanceMargin = Number(
		userData.clearinghouseState.crossMaintenanceMarginUsed
	);

	const crossMarginSummary = userData.clearinghouseState.crossMarginSummary;

	const crossMarginRatio =
		(crossMarginSummary.totalMarginUsed / crossMarginSummary.totalRawUsd) *
		100;

	return {
		balance,
		unrealizedPnl,
		accountEquity,
		crossMarginRatio,
		maintenanceMargin,
		positions,
	};
};

module.exports = {
	getPositions,
};
