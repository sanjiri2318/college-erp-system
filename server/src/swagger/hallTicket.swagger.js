/**
 * @swagger
 * tags:
 *   - name: Hall Ticket
 *     description: Hall Ticket APIs
 */

/**
 * @swagger
 * /api/hall-tickets/student/{studentId}:
 *   get:
 *     summary: Get Hall Ticket
 *     tags: [Hall Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hall ticket fetched successfully.
 */