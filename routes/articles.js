const express = require('express')
const Article = require('./../models/article')
const NpcArticle = require('./../models/npcArticle')
const WeaponArticle = require('./../models/weaponArticle')
const ArmourArticle = require('./../models/armourArticle')
const EnemyArticle = require('./../models/enemyArticle')
const router = express.Router()

//Get for new article
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/search', async (req, res) => {
    
    const npcArticles = await NpcArticle.find().sort({createdAt: 'descending'})
    const weaponArticles = await WeaponArticle.find().sort({createdAt: 'descending'})
    const armourArticles = await ArmourArticle.find().sort({createdAt: 'descending'})
    const enemyArticles = await EnemyArticle.find().sort({createdAt: 'descending'})
    let myVar = req.query.val;
    res.render('articles/search' , {npcArticles: npcArticles, weaponArticles: weaponArticles, armourArticles: armourArticles, enemyArticles: enemyArticles, myVar: myVar})
})



//Edit for article
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})


//Slug for article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( {slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})


//Post for article
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))




//Edit Article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e){
            res.render('articles/${path}', {article: article})
        }
    }
}



module.exports = router