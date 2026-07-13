/**
 * @swagger
 * tags:
 *   - name: Student Transport
 *     description: Student Transport Allocation APIs
 */

/**
 * @swagger
 * /api/student-transport:
 *   get:
 *     summary: Get all student transport allocations
 *     tags: [Student Transport]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student transport allocations fetched successfully.
 */

/**
 * @swagger
 * /api/student-transport/{id}:
 *   get:
 *     summary: Get student transport allocation by ID
 *     tags: [Student Transport]
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
 *         description: Student transport allocation fetched successfully.
 */

/**
 * @swagger
 * /api/student-transport:
 *   post:
 *     summary: Allocate transport to a student
 *     tags: [Student Transport]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - busId
 *               - stopId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 2
 *               busId:
 *                 type: integer
 *                 example: 1
 *               stopId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student transport allocated successfully.
 */

/**
 * @swagger
 * /api/student-transport/{id}:
 *   delete:
 *     summary: Delete student transport allocation
 *     tags: [Student Transport]
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
 *         description: Student transport allocation deleted successfully.
 */