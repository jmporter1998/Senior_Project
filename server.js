const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const NpcArticle = require('./models/npcArticle')
const npcArticleRouter = require('./routes/articles')
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


//This is where it should be defined?? Isn't Working for some reason
// Gets the npc home page to render
app.get('/npcs', async (req,res) => {

    const npcArticles = await NpcArticle.find().sort({createdAt: 'descending'})

    res.render('articles/npcs', {npcArticles: npcArticles
    })
})

app.use('/articles', articleRouter)

//unecesarry???
app.use('/articles', npcArticleRouter)


app.listen(5000)