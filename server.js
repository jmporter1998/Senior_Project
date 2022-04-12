const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const NpcArticle = require('./models/npcArticle')
const npcArticleRouter = require('./routes/npcArticles')
const ArmourArticle = require('./models/armourArticle')
const armourArticleRouter = require('./routes/armourArticles')
const WeaponArticle = require('./models/weaponArticle')
const weaponArticleRouter = require('./routes/weaponArticles')

const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/wiki', {useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'descending'})

    res.render('articles/index', {articles: articles
    })
})


// Gets the npc home page to render
app.get('/npcs', async (req,res) => {

    const npcArticles = await NpcArticle.find().sort({createdAt: 'descending'})

    res.render('npcArticles/npcs', {npcArticles: npcArticles
    })
})


// Gets the amour home page to render
app.get('/armours', async (req,res) => {

    const armourArticles = await ArmourArticle.find().sort({createdAt: 'descending'})

    res.render('armourArticles/armours', {armourArticles: armourArticles
    })
})

// Gets the npc home page to render
app.get('/weapons', async (req,res) => {

    const weaponArticles = await WeaponArticle.find().sort({createdAt: 'descending'})

    res.render('weaponArticles/weapons', {weaponArticles: weaponArticles
    })
})



app.use('/articles', articleRouter)

app.use('/npcArticles', npcArticleRouter)

app.use('/armourArticles', armourArticleRouter)

app.use('/weaponArticles', weaponArticleRouter)



app.listen(5000)