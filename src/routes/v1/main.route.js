const express = require("express");
const validate = require("../../middlewares/validate");
const { mainController } = require("../../controllers");

const router = express.Router();

router.route("/position/:walletAddress").get(mainController.getPositions);
// router.route("/balance/:walletAddress").get(mainController.getBalance);

module.exports = router;

/**
 * @swagger
 * /stake/stake-amount/{walletAddress}:
 *   get:
 *     summary: Get stake amount of wallet
 *     tags: [Stake]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet Address
 *     responses:
 *       "200":
 *         description: OK
 *
 * /stake/stake-accounts/{walletAddress}:
 *   get:
 *     summary: Get stake accounts
 *     tags: [Stake]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet Address
 *     responses:
 *       "200":
 *         description: OK
 */
