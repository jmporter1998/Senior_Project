const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const npcArticle = require('./models/npcArticle')
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


//Is this unecassary?
// Gets the npc home page to render
app.get('/npcs', async (req,res) => {
    /*const npcArticles = [{
        title: 'NPC Test',
        createdAt: Date.now(),
        Description: 'test description',
        markdown: 'Test'
    }]*/

    const npcArticles = await npcArticle.find().sort({createdAt: 'descending'})

    res.render('articles/npcs', {npcArticles: npcArticles
    })
})

app.use('/articles', articleRouter)

app.use('/articles', npcArticleRouter)


app.listen(5000)