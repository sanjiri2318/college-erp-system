/**
 * @swagger
 * tags:
 *   - name: Hostel Block
 *     description: Hostel Block Management APIs
 */

/**
 * @swagger
 * /api/hostel-blocks:
 *   get:
 *     summary: Get all hostel blocks
 *     tags: [Hostel Block]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hostel blocks fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-blocks/{id}:
 *   get:
 *     summary: Get hostel block by ID
 *     tags: [Hostel Block]
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
 *         description: Hostel block fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-blocks:
 *   post:
 *     summary: Create hostel block
 *     tags: [Hostel Block]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - hostelId
 *             properties:
 *               name:
 *                 type: string
 *                 example: A Block
 *               hostelId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Hostel block created successfully.
 */

/**
 * @swagger
 * /api/hostel-blocks/{id}:
 *   put:
 *     summary: Update hostel block
 *     tags: [Hostel Block]
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
 *         description: Hostel block updated successfully.
 */

/**
 * @swagger
 * /api/hostel-blocks/{id}:
 *   delete:
 *     summary: Delete hostel block
 *     tags: [Hostel Block]
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
 *         description: Hostel block deleted successfully.
 */