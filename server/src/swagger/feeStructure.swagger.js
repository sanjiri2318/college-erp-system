/**
 * @swagger
 * tags:
 *   - name: Fee Structure
 *     description: Fee Structure Management APIs
 */

/**
 * @swagger
 * /api/fee-structures:
 *   get:
 *     summary: Get all fee structures
 *     tags: [Fee Structure]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fee structures fetched successfully.
 */

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   get:
 *     summary: Get fee structure by ID
 *     tags: [Fee Structure]
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
 *         description: Fee structure fetched successfully.
 */

/**
 * @swagger
 * /api/fee-structures:
 *   post:
 *     summary: Create fee structure
 *     tags: [Fee Structure]
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
 *               - feeType
 *               - amount
 *               - semester
 *               - departmentId
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Semester 1 Tuition Fee
 *               feeType:
 *                 type: string
 *                 enum:
 *                   - TUITION
 *                   - HOSTEL
 *                   - TRANSPORT
 *                   - EXAM
 *                   - LIBRARY
 *                   - OTHER
 *               amount:
 *                 type: number
 *                 example: 80000
 *               semester:
 *                 type: integer
 *                 example: 1
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Fee structure created successfully.
 */

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   put:
 *     summary: Update fee structure
 *     tags: [Fee Structure]
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
 *         description: Fee structure updated successfully.
 */

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   delete:
 *     summary: Delete fee structure
 *     tags: [Fee Structure]
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
 *         description: Fee structure deleted successfully.
 */