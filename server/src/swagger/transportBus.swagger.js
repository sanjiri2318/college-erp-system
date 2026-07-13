/**
 * @swagger
 * tags:
 *   - name: Transport Bus
 *     description: Transport Bus Management APIs
 */

/**
 * @swagger
 * /api/transport-buses:
 *   get:
 *     summary: Get all transport buses
 *     tags: [Transport Bus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transport buses fetched successfully.
 */

/**
 * @swagger
 * /api/transport-buses/{id}:
 *   get:
 *     summary: Get transport bus by ID
 *     tags: [Transport Bus]
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
 *         description: Transport bus fetched successfully.
 */

/**
 * @swagger
 * /api/transport-buses:
 *   post:
 *     summary: Create transport bus
 *     tags: [Transport Bus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busNumber
 *               - vehicleType
 *               - capacity
 *               - driverName
 *               - driverPhone
 *               - routeId
 *             properties:
 *               busNumber:
 *                 type: string
 *                 example: TN22AB1234
 *               vehicleType:
 *                 type: string
 *                 enum:
 *                   - BUS
 *                   - VAN
 *                 example: BUS
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               driverName:
 *                 type: string
 *                 example: Ramesh Kumar
 *               driverPhone:
 *                 type: string
 *                 example: "9876543210"
 *               routeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Transport bus created successfully.
 */

/**
 * @swagger
 * /api/transport-buses/{id}:
 *   put:
 *     summary: Update transport bus
 *     tags: [Transport Bus]
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
 *         description: Transport bus updated successfully.
 */

/**
 * @swagger
 * /api/transport-buses/{id}:
 *   delete:
 *     summary: Delete transport bus
 *     tags: [Transport Bus]
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
 *         description: Transport bus deleted successfully.
 */