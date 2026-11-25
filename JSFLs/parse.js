function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
}

function parsePalette(palette) {
    var list = palette.replace(/[\r\n]/g, "").split(",");
    var result = {};
    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var eq = s.indexOf("=");
        if (eq < 0) continue;
        var key = s.substring(0, eq);
        var value = s.substring(eq + 1);

        if (startsWith(value, "[")) {
            value = value.replace("[", "").replace("]", "");
            var ls = value.split("-");
            ls.shift();
            var nv = [];
            for (var j = 0; j < ls.length; j++) {
                nv.push(ls[j].split("|"));
            }
            value = nv;
        } else if (startsWith(value, "\"")) {
            value = value.replace(/"/g, "");
        } else if (value == "true") {
            value = true;
        } else if (value == "false") {
            value = false;
        } else {
            value = parseFloat(value);
        }
        result[key] = value;
    }
    return result;
}