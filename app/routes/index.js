"use strict";

module.exports = function(app) {
    app.route("/")
        .get(function(req, res) {
            res.sendFile(process.cwd() + "/public/index.html");
        });

    app.route("/:link")
        .get(function (req, res) {
            res.end("test");
        });
};
