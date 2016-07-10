"use strict";
var LinkHandler = require(process.cwd() + "/app/controllers/linkHandler.js");

module.exports = function(app) {
    var linkHandler = new LinkHandler();

    app.route("/")
        .get(function(req, res) {
            res.sendFile(process.cwd() + "/public/index.html");
        });

    app.route("/:link")
        .get(linkHandler.getURL);
};
