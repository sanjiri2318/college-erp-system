/**
 * @swagger
 * tags:
 *   - name: Author
 *     description: Author Management APIs
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: James
 *     responses:
 *       200:
 *         description: Authors fetched successfully.
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Author]
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
 *         description: Author fetched successfully.
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create author
 *     tags: [Author]
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
 *                 example: Robert C. Martin
 *               email:
 *                 type: string
 *                 example: unclebob@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       201:
 *         description: Author created successfully.
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update author
 *     tags: [Author]
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
 *         description: Author updated successfully.
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete author
 *     tags: [Author]
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
 *         description: Author deleted successfully.
 */