/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Book Management APIs
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: publisherId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Books fetched successfully.
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
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
 *         description: Book fetched successfully.
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Book created successfully.
 */

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book updated successfully.
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 */