const express = require('express')
const router = express.Router()

//Get for new article
router.get('/search', (req, res) => {
    res.render('articles/search')
})



module.exports = router