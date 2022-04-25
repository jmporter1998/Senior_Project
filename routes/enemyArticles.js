const express = require('express')
const EnemyArticle = require('../models/enemyArticle')
const ArmourArticle = require('./../models/armourArticle')
const router = express.Router()


//Post for article
router.post('/', async (req, res, next) => {
    req.enemyArticle = new EnemyArticle()
    next()
}, saveArticleAndRedirectEnemy('newEnemy'))


// Get for new NPC page
router.get('/newEnemy', (req, res) => {
    res.render('articles/newEnemy', {enemyArticle: new EnemyArticle()})
})

//Is this the problem???
// Get for npc home
router.get('/enemies', async (req, res) => {
    const enemyArticles = await EnemyArticle.find().sort({createdAt: 'descending'})

    res.render('articles/enemies', {enemyArticles: enemyArticles})
})

//Edit for npc article
router.get('/enemyEdit/:id', async (req, res) => {
    const enemyArticle = await EnemyArticle.findById(req.params.id)
    res.render('articles/enemyEdit', {enemyArticle: enemyArticle})
})

//Slug for npc article (Maybe change) 
router.get('/enemies/:slug', async (req, res) => {
    //ERROR HERE
    const enemyArticle = await EnemyArticle.findOne( {slug: req.params.slug})
    if (enemyArticle == null) res.redirect('/enemies')
    res.render('articles/enemyShow', {enemyArticle: enemyArticle})
}) 

//Post for npc article
router.post('/enemies', async (req, res, next) => {
    req.enemyArticle = new EnemyArticle()
    next()
}, saveArticleAndRedirectEnemy('newEnemy')) 

//Edit npc article
router.put('/enemies/:id', async (req, res, next) => {
    req.enemyArticle = await EnemyArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectEnemy('enemyEdit'))

// Get for armour home
router.get('/enemies', async (req, res) => {
    const enemyArticles = await EnemyArticle.find().sort({createdAt: 'descending'})

    res.render('articles/enemies', {enemyArticles: enemyArticles})
})

function saveArticleAndRedirectEnemy(path){
    return async (req, res) => {
        let enemyArticle = req.enemyArticle
        enemyArticle.title = req.body.title
        enemyArticle.picture = req.body.picture
        enemyArticle.health = req.body.health
        enemyArticle.souls = req.body.souls
        enemyArticle.location = req.body.location
        enemyArticle.attacks = req.body.attacks
        enemyArticle.strategies = req.body.strategies
        enemyArticle.description = req.body.description
        enemyArticle.drops = req.body.drops
        enemyArticle.lore = req.body.lore
        enemyArticle.createdAt = req.body.createdAt
        enemyArticle.descriptionSubstring = req.body.description.substring(0, 300).concat("...");


        try{
            enemyArticle = await enemyArticle.save()
            res.redirect(`/enemyArticles/enemies/${enemyArticle.slug}`)
        }catch(e){
            console.log(e)
            res.render('enemyArticles/enemies/${path}', {enemyArticle: enemyArticle})
        }
    }
}



module.exports = router