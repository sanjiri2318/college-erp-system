/**
 * @swagger
 * tags:
 *   - name: Book Category
 *     description: Book Category Management APIs
 */

/**
 * @swagger
 * /api/book-categories:
 *   get:
 *     summary: Get all book categories
 *     tags: [Book Category]
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
 *         example: Engineering
 *     responses:
 *       200:
 *         description: Book categories fetched successfully.
 */

/**
 * @swagger
 * /api/book-categories/{id}:
 *   get:
 *     summary: Get book category by ID
 *     tags: [Book Category]
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
 *         description: Book category fetched successfully.
 */

/**
 * @swagger
 * /api/book-categories:
 *   post:
 *     summary: Create book category
 *     tags: [Book Category]
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
 *                 example: Computer Science
 *               description:
 *                 type: string
 *                 example: Books related to Computer Science
 *     responses:
 *       201:
 *         description: Book category created successfully.
 */

/**
 * @swagger
 * /api/book-categories/{id}:
 *   put:
 *     summary: Update book category
 *     tags: [Book Category]
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
 *         description: Book category updated successfully.
 */

/**
 * @swagger
 * /api/book-categories/{id}:
 *   delete:
 *     summary: Delete book category
 *     tags: [Book Category]
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
 *         description: Book category deleted successfully.
 */