/**
 * @swagger
 * tags:
 *   - name: Book Copies
 *     description: Library Book Copy Management APIs
 */

/**
 * @swagger
 * /api/book-copies:
 *   get:
 *     summary: Get all book copies
 *     tags: [Book Copies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/book-copies/{id}:
 *   get:
 *     summary: Get book copy by ID
 *     tags: [Book Copies]
 */

/**
 * @swagger
 * /api/book-copies:
 *   post:
 *     summary: Create book copy
 *     tags: [Book Copies]
 */

/**
 * @swagger
 * /api/book-copies/{id}:
 *   put:
 *     summary: Update book copy
 *     tags: [Book Copies]
 */

/**
 * @swagger
 * /api/book-copies/{id}:
 *   delete:
 *     summary: Delete book copy
 *     tags: [Book Copies]
 */