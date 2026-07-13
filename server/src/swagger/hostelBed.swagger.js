/**
 * @swagger
 * tags:
 *   - name: Hostel Bed
 *     description: Hostel Bed Management APIs
 */

/**
 * @swagger
 * /api/hostel-beds:
 *   get:
 *     summary: Get all hostel beds
 *     tags: [Hostel Bed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hostel beds fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-beds/{id}:
 *   get:
 *     summary: Get hostel bed by ID
 *     tags: [Hostel Bed]
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
 *         description: Hostel bed fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-beds:
 *   post:
 *     summary: Create hostel bed
 *     tags: [Hostel Bed]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bedNo
 *               - hostelRoomId
 *             properties:
 *               bedNo:
 *                 type: string
 *                 example: Bed-1
 *               hostelRoomId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Hostel bed created successfully.
 */

/**
 * @swagger
 * /api/hostel-beds/{id}:
 *   put:
 *     summary: Update hostel bed
 *     tags: [Hostel Bed]
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
 *         description: Hostel bed updated successfully.
 */

/**
 * @swagger
 * /api/hostel-beds/{id}:
 *   delete:
 *     summary: Delete hostel bed
 *     tags: [Hostel Bed]
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
 *         description: Hostel bed deleted successfully.
 */