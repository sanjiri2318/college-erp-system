/**
 * @swagger
 * tags:
 *   - name: Book Issues
 *     description: Library Book Issue APIs
 */

/**
 * @swagger
 * /api/book-issues:
 *   get:
 *     summary: Get all book issues
 *     tags: [Book Issues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/book-issues/{id}:
 *   get:
 *     summary: Get book issue by ID
 *     tags: [Book Issues]
 */

/**
 * @swagger
 * /api/book-issues:
 *   post:
 *     summary: Issue a book
 *     tags: [Book Issues]
 */

/**
 * @swagger
 * /api/book-issues/{id}/return:
 *   put:
 *     summary: Return a book
 *     tags: [Book Issues]
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
 *         description: Book returned successfully.
 */