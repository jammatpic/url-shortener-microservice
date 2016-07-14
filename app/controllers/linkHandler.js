"use strict";
var validUrl = require("valid-url"); // validates urlss
var shortId = require("shortid"); // generates random short IDs in base 64

function linkHandler(db) {
    var links = db.collection("links");

    // called when user wants to shorten a link
    this.getShortURL = function(req, res) {
        if (validUrl.isUri(req.params.link)) {
            var newCode = shortId.generate();
            var newUrl = { url: req.params.link, _id: newCode }; // as stored in database: full url, shortened code

            // checks if link is already in database
            links.findOne({ "url": req.params.link }, function (err, doc) {
                // if there's a link in the databse, return that link's id as part of the shortened url
                if (doc != null) {
                    res.json({ original_url: req.params.link, short_url: "http://" + req.headers.host + "/" + doc._id});
                // if there is no link in database, insert a new link, and return the shortened url
                } else {
                    links.insert(newUrl, function(err, data) {
                        if (err) throw err;
                    });
                    res.json({ original_url: req.params.link, short_url: "http://" + req.headers.host + "/" + newCode});
                }
            });
        } else {
            res.end("URL is not valid.");
        }
    };

    // called when user tries to visit a shortened link
    this.findLink = function(req, res) {
        // finds a link with that ID and redirects to that url 
        links.findOne(
            { "_id": req.params.shortURL },
            { _id: 0 },
            function(err, doc) {
                if (err) throw err;
                if (doc != null) {
                    res.redirect(doc.url);
                } else {
                    res.end("No link found.");
                }
            }
        );
    };
};

module.exports = linkHandler;
