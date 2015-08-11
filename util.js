"use strict";

var Util = {
    get_cookies: function get_cookies() {
        var pairs = (document.cookie || "").split(/;\s+/);
        var pair_map = {};
        for (var pair in pairs) {
            var match = pairs[pair].match(/^([^=]+)=([^=]+)$/);
            if (match) {
                pair_map[match[1]] = match[2];
            }
        }

        return pair_map;
    },
    set_cookie: function set_cookie(name, val) {
        if (name.match(/^[^\s=]+$/) && val.match(/^[^\s=]+$/)) {
            document.cookie = name + "=" + val;
        } else {
            console.log("Corrupt params: " + name + " = " + val);
        }
    }
};