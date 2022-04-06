const express = require('express')
const Article = require('./../models/article')
const NpcArticle = require('./../models/npcArticle')
const WeaponArticle = require('./../models/weaponArticle')
const router = express.Router()

//Get for new article
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})


// Get for new Weapon page
router.get('/newWeapon', (req, res) => {
    res.render('articles/newWeapon', {weaponArticle: new WeaponArticle()})
})



// Get for weapon home
router.get('/weapons', (req, res) => {
    res.render('articles/weapons', {weaponArticle: WeaponArticle})
})

//Edit for article
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})



//Edit for weapon article
router.get('/weaponEdit/:id', async (req, res) => {
    const weaponArticle = await WeaponArticle.findById(req.params.id)
    res.render('articles/weaponEdit', {weaponArticle: weaponArticle})
})

//Slug for article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( {slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})



//Slug for weapon article (Maybe change) 
router.get('/weapons/:slug', async (req, res) => {
    //ERROR HERE
    const weaponArticle = await WeaponArticle.findOne( {slug: req.params.slug})
    if (weaponArticle == null) res.redirect('/npcs')
    res.render('articles/weaponShow', {weaponArticle: weaponArticle})
}) 

//Post for article
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))



//Post for weapon article
router.post('/weapons', async (req, res, next) => {
    req.weaponArticle = new WeaponArticle()
    next()
}, saveArticleAndRedirectWeapon('newWeapon')) 

//Edit Article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))




//Edit weapon article
router.put('/weapons/:id', async (req, res, next) => {
    req.weaponArticle = await WeaponArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectWeapon('weaponEdit'))

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




function saveArticleAndRedirectWeapon(path){
    return async (req, res) => {
        let weaponArticle = req.weaponArticle
        weaponArticle.title = req.body.title
        weaponArticle.description = req.body.description
        try{
            weaponArticle = await weaponArticle.save()
            res.redirect(`/articles/weapons/${weaponArticle.slug}`)
        }catch(e){
            res.render('articles/weapons/${path}', {weaponArticle: weaponArticle})
        }
    }
}

module.exports = router