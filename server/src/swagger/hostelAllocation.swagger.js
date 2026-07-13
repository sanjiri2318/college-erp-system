/**
 * @swagger
 * tags:
 *   - name: Hostel Allocation
 *     description: Hostel Allocation Management APIs
 */

/**
 * @swagger
 * /api/hostel-allocations:
 *   get:
 *     summary: Get all hostel allocations
 *     tags: [Hostel Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hostel allocations fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-allocations/{id}:
 *   get:
 *     summary: Get hostel allocation by ID
 *     tags: [Hostel Allocation]
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
 *         description: Hostel allocation fetched successfully.
 */

/**
 * @swagger
 * /api/hostel-allocations:
 *   post:
 *     summary: Allocate hostel bed to student
 *     tags: [Hostel Allocation]
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
 *               - hostelBedId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               hostelBedId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Hostel bed allocated successfully.
 */

/**
 * @swagger
 * /api/hostel-allocations/{id}/checkout:
 *   put:
 *     summary: Checkout student from hostel
 *     tags: [Hostel Allocation]
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
 *         description: Student checked out successfully.
 */

/**
 * @swagger
 * /api/hostel-allocations/{id}:
 *   delete:
 *     summary: Delete hostel allocation
 *     tags: [Hostel Allocation]
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
 *         description: Hostel allocation deleted successfully.
 */