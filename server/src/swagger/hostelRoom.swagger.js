/**
 * @swagger
 * tags:
 *   - name: Hostel Room
 *     description: Hostel Room Management APIs
 */

/**
 * @swagger
 * /api/hostel-rooms:
 *   get:
 *     summary: Get all hostel rooms
 *     tags: [Hostel Room]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hostel rooms fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   get:
 *     summary: Get hostel room by ID
 *     tags: [Hostel Room]
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
 *         description: Hostel room fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-rooms:
 *   post:
 *     summary: Create hostel room
 *     tags: [Hostel Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - floor
 *               - capacity
 *               - hostelBlockId
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: A101
 *               floor:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 4
 *               hostelBlockId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Hostel room created successfully.
 */

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   put:
 *     summary: Update hostel room
 *     tags: [Hostel Room]
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
 *         description: Hostel room updated successfully.
 */

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   delete:
 *     summary: Delete hostel room
 *     tags: [Hostel Room]
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
 *         description: Hostel room deleted successfully.
 */