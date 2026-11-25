var color = {{{INDEX}}};
var configFolder = fl.configURI;
var instFolder = configFolder + "/Palette.jsfl";

var selected;
var config;

var currentFill;
var currentStroke;
function run() {
    // Get the current document
    var doc = fl.getDocumentDOM();
    if (!doc) {
        fl.trace("No document open.");
        return;
    }

    if (!FLfile.exists(instFolder + "/selected")) {
        fl.trace("No selected file exists. Is your install broken?");
        return;
    } else {
        selected = FLfile.read(instFolder + "/selected");
        if (selected != "") {
            config = parsePalette(FLfile.read(instFolder + "/Palettes/" + selected));
        } else {
            fl.trace("No selected exists. Is your install broken?");
            return;
        }
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