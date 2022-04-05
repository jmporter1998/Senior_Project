const express = require('express')
const Article = require('./../models/article')
const NpcArticle = require('./../models/npcArticle')
const router = express.Router()

//Get for new article
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

// Get for new NPC page
router.get('/newNPC', (req, res) => {
    res.render('articles/newNPC', {npcArticle: new NpcArticle()})
})

//Is this the problem???
// Get for npc home
router.get('/npcs', (req, res) => {
    res.render('articles/npcs', {npcArticle: NpcArticle})
})

//Edit for article
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

//Edit for npc article
router.get('/npcEdit/:id', async (req, res) => {
    const npcArticle = await NpcArticle.findById(req.params.id)
    res.render('articles/npcEdit', {npcArticle: npcArticle})
})

//Slug for article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( {slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

//Slug for npc article (Maybe change) 
router.get('/npcs/:slug', async (req, res) => {
    //ERROR HERE
    const npcArticle = await NpcArticle.findOne( {slug: req.params.slug})
    if (npcArticle == null) res.redirect('/npcs')
    res.render('articles/npcShow', {npcArticle: npcArticle})
}) 

//Post for article
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

//Post for npc article
router.post('/npcs', async (req, res, next) => {
    req.npcArticle = new NpcArticle()
    next()
}, saveArticleAndRedirectNPC('newNPC')) 

//Edit Article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))


//Edit npc article
router.put('/npcs/:id', async (req, res, next) => {
    req.npcArticle = await NpcArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectNPC('npcEdit'))


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


//Need to play with the /articles?
function saveArticleAndRedirectNPC(path){
    return async (req, res) => {
        let npcArticle = req.npcArticle
        npcArticle.title = req.body.title
        npcArticle.description = req.body.description
        npcArticle.markdown = req.body.markdown
        try{
            npcArticle = await npcArticle.save()
            res.redirect(`/articles/npcs/${npcArticle.slug}`)
        }catch(e){
            res.render('articles/npcs/${path}', {npcArticle: npcArticle})
        }
    }
}

module.exports = router