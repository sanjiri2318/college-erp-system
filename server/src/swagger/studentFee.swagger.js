/**
 * @swagger
 * tags:
 *   - name: Student Fee
 *     description: Student Fee Management APIs
 */

/**
 * @swagger
 * /api/student-fees:
 *   get:
 *     summary: Get all student fees
 *     tags: [Student Fee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student fees fetched successfully.
 */

/**
 * @swagger
 * /api/student-fees/{id}:
 *   get:
 *     summary: Get student fee by ID
 *     tags: [Student Fee]
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
 *         description: Student fee fetched successfully.
 */

/**
 * @swagger
 * /api/student-fees:
 *   post:
 *     summary: Assign fee to student
 *     tags: [Student Fee]
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
 *               - feeStructureId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               feeStructureId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student fee assigned successfully.
 */

/**
 * @swagger
 * /api/student-fees/{id}:
 *   put:
 *     summary: Update student fee
 *     tags: [Student Fee]
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
 *         description: Student fee updated successfully.
 */

/**
 * @swagger
 * /api/student-fees/{id}:
 *   delete:
 *     summary: Delete student fee
 *     tags: [Student Fee]
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
 *         description: Student fee deleted successfully.
 */