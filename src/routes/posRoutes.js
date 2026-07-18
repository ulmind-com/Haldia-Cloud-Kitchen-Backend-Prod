const express = require('express');
const router = express.Router();
const { protect, staff } = require('../middleware/authMiddleware');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getTables,
    createTable,
    updateTable,
    deleteTable,
    updateTableStatus,
} = require('../controllers/tableController');
const {
    getKots,
    getKotById,
    createKot,
    updateKot,
    deleteKot,
} = require('../controllers/kotController');
const {
    generateBill,
    getBills,
    getBillById,
    settleBill,
} = require('../controllers/billController');

// All POS routes require an authenticated staff member (Admin or Manager).
router.use(protect, staff);

// ── Table sections ──
router.route('/table-categories')
    .get(getCategories)
    .post(createCategory);
router.route('/table-categories/:id')
    .put(updateCategory)
    .delete(deleteCategory);

// ── Tables ──
router.route('/tables')
    .get(getTables)
    .post(createTable);
router.route('/tables/:id')
    .put(updateTable)
    .delete(deleteTable);
router.put('/tables/:id/status', updateTableStatus);

// ── KOT (Kitchen Order Tickets) ──
router.route('/kots')
    .get(getKots)
    .post(createKot);
router.route('/kots/:id')
    .get(getKotById)
    .put(updateKot)
    .delete(deleteKot);

// ── Bills (generate + settlement) ──
router.route('/bills')
    .get(getBills)
    .post(generateBill);
router.get('/bills/:id', getBillById);
router.put('/bills/:id/settle', settleBill);

module.exports = router;
