/**
 * @swagger
 * tags:
 *   - name: Transport Stop
 *     description: Transport Stop Management APIs
 */

/**
 * @swagger
 * /api/transport-stops:
 *   get:
 *     summary: Get all transport stops
 *     tags: [Transport Stop]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transport stops fetched successfully.
 */

/**
 * @swagger
 * /api/transport-stops/{id}:
 *   get:
 *     summary: Get transport stop by ID
 *     tags: [Transport Stop]
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
 *         description: Transport stop fetched successfully.
 */

/**
 * @swagger
 * /api/transport-stops:
 *   post:
 *     summary: Create transport stop
 *     tags: [Transport Stop]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stopName
 *               - stopOrder
 *               - routeId
 *             properties:
 *               stopName:
 *                 type: string
 *                 example: Potheri Railway Station
 *               stopOrder:
 *                 type: integer
 *                 example: 2
 *               routeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Transport stop created successfully.
 */

/**
 * @swagger
 * /api/transport-stops/{id}:
 *   put:
 *     summary: Update transport stop
 *     tags: [Transport Stop]
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
 *         description: Transport stop updated successfully.
 */

/**
 * @swagger
 * /api/transport-stops/{id}:
 *   delete:
 *     summary: Delete transport stop
 *     tags: [Transport Stop]
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
 *         description: Transport stop deleted successfully.
 */