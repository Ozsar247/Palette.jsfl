var color = {{{INDEX}}};
var configFolder = fl.configURI;

var config;

function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
}

function parsePalette(palette) {
    palette = palette.replace(/\n/g, "");
    var list = palette.split(",");
    var tupleList = [];
    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var split = s.split("=");
        var key = split[0];
        var value = split[1];
        
        if (startsWith(value, "[")) {
            value = value.replace("[", "").replace("]", "");
            var list = value.split("-");
            list.shift();
            var nv = [];
            for (var i = 0; i < list.length; i++) {
                nv.push(list[i].split("|"));
            }
            value = nv;
        } else if (startsWith(value,"\"")) {
            value = value.replace(/"/g, "");
        } else {
            if (value == "true") {
                value = true;
            } else if (value == "false") {  
                value = false 
            } else {
                value = parseFloat(value);
            }
        }
        tupleList[key] = value;
    }
    return tupleList;
}

var currentFill;
var currentStroke;
function run() {
    // Get the current document
    var doc = fl.getDocumentDOM();
    if (!doc) {
        fl.trace("No document open.");
        return;
    }

    if (!FLfile.exists(configFolder + "/selected.palette")) {
        fl.trace("No selected file exists.");
        return;
    } else {
        config = parsePalette(FLfile.read(configFolder + "/selected.palette"));
        var useFillStroke = config.UseFillStroke;
        if (!config.Colors[color]) {
            fl.trace("Color does not exist at index " + color);
            return; 
        }
        currentFill = config.Colors[color][0];
        if (useFillStroke) {
            currentStroke = config.Colors[color][1];
        } 
        
    }
    if (currentFill) {
        var fill = doc.getCustomFill(); 
        fill.color = currentFill;
        fill.style = "solid";
        doc.setCustomFill(fill);
    }
    if (currentStroke) {
        var stroke = doc.getCustomStroke(); 
        stroke.color = currentStroke;
        doc.setCustomStroke(stroke);
    }
    

}

run()