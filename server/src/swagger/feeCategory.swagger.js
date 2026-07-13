/**
 * @swagger
 * tags:
 *   - name: Fee Category
 *     description: Fee Category Management APIs
 */

/**
 * @swagger
 * /api/fee-categories:
 *   get:
 *     summary: Get all fee categories
 *     tags: [Fee Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fee categories fetched successfully.
 */

/**
 * @swagger
 * /api/fee-categories/{id}:
 *   get:
 *     summary: Get fee category by ID
 *     tags: [Fee Category]
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
 *         description: Fee category fetched successfully.
 */

/**
 * @swagger
 * /api/fee-categories:
 *   post:
 *     summary: Create fee category
 *     tags: [Fee Category]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tuition Fee
 *               description:
 *                 type: string
 *                 example: Semester tuition fee category
 *     responses:
 *       201:
 *         description: Fee category created successfully.
 */

/**
 * @swagger
 * /api/fee-categories/{id}:
 *   put:
 *     summary: Update fee category
 *     tags: [Fee Category]
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
 *         description: Fee category updated successfully.
 */

/**
 * @swagger
 * /api/fee-categories/{id}:
 *   delete:
 *     summary: Delete fee category
 *     tags: [Fee Category]
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
 *         description: Fee category deleted successfully.
 */