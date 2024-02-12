const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { mainService } = require("../services");

const getPositions = catchAsync(async (req, res) => {
	const address = req.params.walletAddress;

	const result = await mainService.getPositions(address);

	const html = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com">
	<title>Position Details</title>
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<style>
		body {
				background-color: #f4f7fa;
				font-family: 'Arial', sans-serif;
			}
			.container {
				padding-top: 30px;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-around;
				align-content: center;
			}
			.position-card {
				background: #fff;
				border-radius: 8px;
				box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
				margin-bottom: 20px;
			}
			.position-header {
				background-color: #5c6ac4;
				color: white;
				padding: 16px;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				font-size: 20px;
				font-weight: bold;
			}
			.position-body {
				padding: 16px;
				background-color: white;
				color: #5c6ac4; /* Color of text similar to header */
			}
			.status-label {
				font-weight: bold;
				padding: 5px 10px;
				color: white;
				border-radius: 5px;
				display: inline-block;
				font-size: 14px;
			}
			.status-open {
				background-color: #ff6f61;
			}
			.status-isolated {
				background-color: #7cb342;
			}
			.status-cross {
				background-color: #f4bf47;
			}
			.currency {
				color: #838383;
			}
			.negative {
				color: #ff6f61;
			}
			.positive {
				color: #7cb342;
			}
	</style>
	</head>
	<body>
	<div class="container">
		${result.positions
			.map((position) => {
				return `
					<div class="position-card">
					<div class="position-header">${position.position.coin}</div>
					<div class="position-body">
						<p><b>Type</b>: <span class="status-label status-open">oneWay</span></p>
						<p><b>Coin</b>: ${position.position.coin}</p>
						<p><b>Short Zone Index (szi)</b>: <span class="${position.position.szi > 0 ? "positive" : "negative"}">${position.position.szi}</span></p>
						<p><b>Leverage</b>: <span class="status-label status-${position.position.leverage.type}">${position.position.leverage.type}</span>, <span class="currency">${
					position.position.leverage.value
				}</span></p>
						<p><b>Entry Price</b>: <span class="currency">$${position.position.entryPx}</span></p>
						<p><b>Position Value</b>: <span class="currency">$${position.position.positionValue}</span></p>
						<p><b>Unrealized PnL</b>: <span class="${position.position.unrealizedPnl > 0 ? "positive" : "negative"}">$${position.position.unrealizedPnl}</span></p>
						<p><b>Return on Equity</b>: <span class="${position.position.returnOnEquity > 0 ? "positive" : "negative"}">${Number(position.position.returnOnEquity).toFixed(2)}%</span></p>
						<p><b>Liquidation Price</b>: <span class="currency">${position.position.liquidationPx}</span></p>
						<p><b>Margin Used</b>: <span class="currency">${position.position.marginUsed}</span></p>
						<p><b>Max Leverage</b>: <span class="currency">${position.position.maxLeverage}</span></p>
						<p><b>Cumulative Funding (All Time)</b>: <span class="${position.position.cumFunding.allTime > 0 ? "positive" : "negative"}">${position.position.cumFunding.allTime}</span></p>
						<p><b>Cumulative Funding (Since Open)</b>: <span class="${position.position.cumFunding.sinceOpen > 0 ? "positive" : "negative"}">${position.position.cumFunding.sinceOpen}</span></p>
						<p><b>Cumulative Funding (Since Change)</b>: <span class="${position.position.cumFunding.sinceChange > 0 ? "positive" : "negative"}">${position.position.cumFunding.sinceChange}</span></p>
					</div>
				</div>
			`;
			})
			.join("\n")}
		</div>

	<!-- Bootstrap JS, Popper.js, and jQuery -->
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	</body>
	</html>`;

	res.send(html);
});

module.exports = {
	getPositions,
};
