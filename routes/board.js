const express = require('express');
const router = express.Router();


function computeCellValue(row, col) {
  if (row === col) {
    return 1;
  } else if (row === col + 1) {
    return 2;
  } else if (row === col - 1) {
    return row;
  } else {
    return 0;
  }
}

router.get('/', (req, res, next) => {
  
  const rows = Number(req.query.rows);
  const cols = Number(req.query.cols);


  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || rows > 10 || cols < 1 || cols > 10) {
    res.render('board', { title: 'Board Display', errorMessage: 'Invalid query parameters.' });
  } else {

    res.render('board', { title: 'Board Display', query: req.query, computeCellValue });
  }
});

module.exports = router;
