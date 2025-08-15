const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    res.render('test');
});

// dev test
router.get('/gentest', pdfController.gentest);

router.post('/api/v1/generatepdf', pdfController.generatePdf);

router.get('/api/v1/download', pdfController.downloadPdf);

module.exports = router;