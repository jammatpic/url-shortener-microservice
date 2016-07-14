"use strict";
var LinkHandler = require(process.cwd() + "/app/controllers/linkHandler.js");

module.exports = function(app, db) {
    var linkHandler = new LinkHandler(db);

    // serves index page
    app.route("/")
        .get(function(req, res) {
            res.sendFile(process.cwd() + "/public/index.html");
        });

    // called when submitting a new link
    app.route("/new/:link(*)")
        .get(linkHandler.getShortURL);

    // called when retrieving a shortened link
    app.route("/:shortURL")
        .get(linkHandler.findLink);
};
