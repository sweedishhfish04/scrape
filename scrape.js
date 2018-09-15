const cheerio = require("cheerio");
const request = require("request");
const sha256 = require('sha256');

const Article = require('./article')

function Scrape() {
    var options = {
        url: "https://arstechnica.com/"
    }

    request(options, function (err, res) {
        var $ = cheerio.load(res.body)
        var articles = $(".article")
        for (var i = 0; i < articles.length; i++) {
            var header = articles[i].childNodes.find(node => {
                return node.name == 'header'
            })
            var h2 = header
                .childNodes
                .find(node => {
                    return node.name == 'h2'
                })
                .childNodes
                .find(node => {
                    return node.name == 'a'
                })

            var article = {
                _id: sha256(h2.firstChild.data),
                title: h2.firstChild.data,
                excerpt: header.childNodes.find(node => { return node.attribs && node.attribs.class == 'excerpt' }).firstChild.data,
                url: h2.attribs.href,
                date: new Date()
            }

            var schema = new Article(article)

            schema.save(function(err) {
                console.error(err)
            })
        }
    });

    // Call Once every hour
    setTimeout(Scrape, 360000)
};

module.exports = Scrape