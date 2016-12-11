var router = require('express').Router();
var mocks = require('./mock');
var assign = require('object-assign');

router.get('/article', function (req, res, next) {
    var articles = mocks.articles.map(function (article) {
            return assign({}, article, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || articles.length,
        offset = Number(req.query.offset) || 0;

    res.json(articles.slice(offset, limit + offset))
});

router.get('/article/:id', function (req, res, next) {
    var article = mocks.articles.find(function (article) {
        return article.id == req.params.id
    });
    if (article) return res.json(article);

    res.status(404).json({error: "not found"});
});

router.delete('/article/:id', function (req, res, next) {
    let len = mocks.articles.length
    mocks.articles = mocks.articles.filter(function (article) {
        return article.id !== req.params.id
    });    

    if (len === mocks.articles.length)
        res.status(404).json({error: "not found"})
    else
        res.status(200)
});

router.post('/article', function (req, res, next) {
    var body = req.body;
    var article = {
        text: body.text,
        id: Date.now().toString(),
        user: body.user,
        date: new Date()
    };
    mocks.articles.push(article)
    res.setHeader('Location', `/article/${article.id}`)
    res.json(article)
});

router.get('/comment', function (req, res, next) {
    var aid = req.query.article;
    if (aid) {
        var article = mocks.articles.find(function(article) {
            return article.id == aid
        })
        return res.json((article.comments || []).map(function(id) {
            return mocks.comments.find(function(comment) {
                return comment.id == id
            })
        }))
    }

    var limit = Number(req.query.limit) || mocks.comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: mocks.comments.length,
        records: mocks.comments.slice(offset, limit + offset)
    })
});

router.get('/comment/:id', function (req, res, next) {
    let comm = mocks.comments.find(function (comment) {
        return comment.id == req.params.id
    });
    if (comm) return res.json(comm);

    res.status(404).json({error: "not found"});   
});

router.post('/article/:id/comment', function (req, res, next) {

    var comment = {
        id : Date.now().toString(),
        text : req.body.comment.text,
        date: new Date(),
        user: req.body.comment.user
    };
    mocks.comments.push(comment)
    let art = mocks.articles.find( (art) => art.id === req.params.id )
    if (art) {
        if (!art.comments)
            art.comments = [comment.id]
        else
            art.comments.push(comment.id)
    }
    else {
      res.status(404).json({error: "parent article not found: " + req.params.id})
      return
    }
    res.setHeader('Location', `/comment/${comment.id}`)
    res.json({comment, articleId: req.params.id})
});

router.post('/report', function (req, res) {
    res.json({})
})

module.exports = router;
