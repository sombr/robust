var Util = {
    get_cookies: function () {
        var pairs = (document.cookie || "").split(/;\s+/);
        var pair_map = {};
        for ( var pair in pairs ) {
            var match = pairs[pair].match(/^([^=]+)=([^=]+)$/);
            if ( match ) {
                pair_map[match[1]] = match[2];
            }
        }

        return pair_map;
    },
    set_cookie: function( name, val ) {
        if (name.match(/^[^\s=]+$/) && val.match(/^[^\s=]+$/)) {
            document.cookie = name + "=" + val;
        } else {
            console.log("Corrupt params: " + name + " = " + val);
        }
    },
    format_date: function(date, short) {
        return (date.getDate() + "/" + (date.getMonth()+1) + ( short ? "" : "/" + date.getFullYear() ));
    }
};
