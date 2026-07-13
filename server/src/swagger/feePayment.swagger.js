/**
 * @swagger
 * tags:
 *   - name: Fee Payment
 *     description: Fee Payment Management APIs
 */

/**
 * @swagger
 * /api/fee-payments:
 *   get:
 *     summary: Get all fee payments
 *     tags: [Fee Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fee payments fetched successfully.
 */

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   get:
 *     summary: Get fee payment by ID
 *     tags: [Fee Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fee payment fetched successfully.
 */

/**
 * @swagger
 * /api/fee-payments:
 *   post:
 *     summary: Record fee payment
 *     tags: [Fee Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentFeeId
 *               - amount
 *               - paymentMode
 *             properties:
 *               studentFeeId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 25000
 *               paymentMode:
 *                 type: string
 *                 enum:
 *                   - CASH
 *                   - UPI
 *                   - CARD
 *                   - NET_BANKING
 *                 example: UPI
 *               transactionId:
 *                 type: string
 *                 example: UPI123456789
 *               remarks:
 *                 type: string
 *                 example: First installment
 *     responses:
 *       201:
 *         description: Fee payment recorded successfully.
 */

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   delete:
 *     summary: Delete fee payment
 *     tags: [Fee Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fee payment deleted successfully.
 */