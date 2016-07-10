"use strict";

function linkHandler() {
    this.getURL = function(req, res) {
        res.end("test");
    };
};

module.exports = linkHandler;
