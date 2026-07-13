/**
 * @swagger
 * tags:
 *   - name: Hostel
 *     description: Hostel Management APIs
 */

/**
 * @swagger
 * /api/hostels:
 *   get:
 *     summary: Get all hostels
 *     tags: [Hostel]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hostel list fetched successfully.
 */

/**
 * @swagger
 * /api/hostels/{id}:
 *   get:
 *     summary: Get hostel by ID
 *     tags: [Hostel]
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
 *         description: Hostel fetched successfully.
 */

/**
 * @swagger
 * /api/hostels:
 *   post:
 *     summary: Create hostel
 *     tags: [Hostel]
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
 *               - code
 *               - type
 *               - address
 *               - wardenName
 *               - wardenPhone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Boys Hostel
 *               code:
 *                 type: string
 *                 example: BH01
 *               type:
 *                 type: string
 *                 enum:
 *                   - BOYS
 *                   - GIRLS
 *               address:
 *                 type: string
 *                 example: SRM KTR Campus
 *               wardenName:
 *                 type: string
 *                 example: Ramesh Kumar
 *               wardenPhone:
 *                 type: string
 *                 example: "9876543210"
 *               description:
 *                 type: string
 *                 example: Hostel for first year students
 *     responses:
 *       201:
 *         description: Hostel created successfully.
 */

/**
 * @swagger
 * /api/hostels/{id}:
 *   put:
 *     summary: Update hostel
 *     tags: [Hostel]
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
 *         description: Hostel updated successfully.
 */

/**
 * @swagger
 * /api/hostels/{id}:
 *   delete:
 *     summary: Delete hostel
 *     tags: [Hostel]
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
 *         description: Hostel deleted successfully.
 */