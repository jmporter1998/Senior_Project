const express = require('express')
const NpcArticle = require('./../models/npcArticle')
const router = express.Router()


//Post for article
router.post('/', async (req, res, next) => {
    req.npcArticle = new NpcArticle()
    next()
}, saveArticleAndRedirectNPC('newNPC'))


// Get for new NPC page
router.get('/newNPC', (req, res) => {
    res.render('articles/newNPC', {npcArticle: new NpcArticle()})
})

//Is this the problem???
// Get for npc home
router.get('/npcs', async (req, res) => {
    const npcArticles = await NpcArticle.find().sort({createdAt: 'descending'})

    res.render('articles/npcs', {npcArticles: npcArticles})
})

//Edit for npc article
router.get('/npcEdit/:id', async (req, res) => {
    const npcArticle = await NpcArticle.findById(req.params.id)
    res.render('articles/npcEdit', {npcArticle: npcArticle})
})

//Slug for npc article (Maybe change) 
router.get('/npcs/:slug', async (req, res) => {
    //ERROR HERE
    const npcArticle = await NpcArticle.findOne( {slug: req.params.slug})
    if (npcArticle == null) res.redirect('/npcs')
    res.render('articles/npcShow', {npcArticle: npcArticle})
}) 

//Post for npc article
router.post('/npcs', async (req, res, next) => {
    req.npcArticle = new NpcArticle()
    next()
}, saveArticleAndRedirectNPC('newNPC')) 

//Edit npc article
router.put('/npcs/:id', async (req, res, next) => {
    req.npcArticle = await NpcArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectNPC('npcEdit'))

function saveArticleAndRedirectNPC(path){
    return async (req, res) => {
        let npcArticle = req.npcArticle
        npcArticle.title = req.body.title
        npcArticle.description = req.body.description
        npcArticle.markdown = req.body.markdown
        try{
            npcArticle = await npcArticle.save()
            res.redirect(`/npcArticles/npcs/${npcArticle.slug}`)
        }catch(e){
            res.render('npcArticles/npcs/${path}', {npcArticle: npcArticle})
        }
    }
}



module.exports = router