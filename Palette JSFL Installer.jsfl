// Installer Script for Palette.jsfl | Open Source by lando.fla

// XMLUI ref:
// https://projects.stroep.nl/xul-jsfl/

var configFolder = fl.configURI;
var commandsFolder = configFolder + "/Commands";

var parse = 
'function startsWith(str, prefix) {\n'+ 
'  return str.indexOf(prefix) === 0;\n'+ 
'}\n'+ 
'\n'+ 
'function parsePalette(palette) {\n'+ 
'    palette = palette.replace(/\\n/g, "");\n'+ 
'    var list = palette.split(",");\n'+ 
'    var tupleList = [];\n'+ 
'    for (var i = 0; i < list.length; i++) {\n'+ 
'        var s = list[i];\n'+ 
'        var split = s.split("=");\n'+ 
'        var key = split[0];\n'+ 
'        var value = split[1];\n'+ 
'        \n'+ 
'        if (startsWith(value, "[")) {\n'+ 
'            value = value.replace("[", "").replace("]", "");\n'+ 
'            var list = value.split("-");\n'+ 
'            list.shift();\n'+ 
'            var nv = [];\n'+ 
'            for (var i = 0; i < list.length; i++) {\n'+ 
'                nv.push(list[i].split("|"));\n'+ 
'            }\n'+ 
'            value = nv;\n'+ 
'        } else if (startsWith(value,"\\"")) {\n'+ 
'            value = value.replace(/"/g, "");\n'+ 
'        } else {\n'+ 
'            if (value == "true") {\n'+ 
'                value = true;\n'+ 
'            } else if (value == "false") {  \n'+ 
'                value = false \n'+ 
'            } else {\n'+ 
'                value = parseFloat(value);\n'+ 
'            }\n'+ 
'        }\n'+ 
'        tupleList[key] = value;\n'+ 
'    }\n'+ 
'    return tupleList;\n'+ 
'}\n'

var keybindCommand = 
'var color = {{{INDEX}}};\n'+ 
'var configFolder = fl.configURI;\n'+ 
'\n'+ 
'var config;\n'+ 
'\n'+ 
parse +
'\n'+ 
'var currentFill;\n'+ 
'var currentStroke;\n'+ 
'function run() {\n'+ 
'    // Get the current document\n'+ 
'    var doc = fl.getDocumentDOM();\n'+ 
'    if (!doc) {\n'+ 
'        fl.trace("No document open.");\n'+ 
'        return;\n'+ 
'    }\n'+ 
'\n'+ 
'    if (!FLfile.exists(configFolder + "/selected.palette")) {\n'+ 
'        fl.trace("No selected file exists.");\n'+ 
'        return;\n'+ 
'    } else {\n'+ 
'        config = parsePalette(FLfile.read(configFolder + "/selected.palette"));\n'+ 
'        var useFillStroke = config.UseFillStroke;\n'+ 
'        if (!config.Colors[color]) {\n'+ 
'            fl.trace("Color does not exist at index " + color);\n'+ 
'            return; \n'+ 
'        }\n'+ 
'        currentFill = config.Colors[color][0];\n'+ 
'        if (useFillStroke) {\n'+ 
'            currentStroke = config.Colors[color][1];\n'+ 
'        } \n'+ 
'        \n'+ 
'    }\n'+ 
'    if (currentFill) {\n'+ 
'        var fill = doc.getCustomFill(); \n'+ 
'        fill.color = currentFill;\n'+ 
'        fill.style = "solid";\n'+ 
'        doc.setCustomFill(fill);\n'+ 
'    }\n'+ 
'    if (currentStroke) {\n'+ 
'        var stroke = doc.getCustomStroke(); \n'+ 
'        stroke.color = currentStroke;\n'+ 
'        doc.setCustomStroke(stroke);\n'+ 
'    }\n'+ 
'    \n'+ 
'\n'+ 
'}\n'+ 
'\n'+ 
'run()\n'

var loaderXMLUI = 
'<?xml version="1.0" encoding="UTF-8"?>'+ 
'<dialog id="paletteloader" title="Palette.jsfl Installer" buttons="accept,cancel">'+ 
'    <label value="Palette.jsfl Options" />'+ 
'    <hbox>'+ 
'        <label value="Number of Keybinds" />'+ 
'        <textbox id="keybinds" value="10" size="8" />'+ 
'    </hbox>'+ 
'    <label value="Command Folder Name" />'+ 
'    <textbox id="folder" value="Palette_Commands" />'+ 
'</dialog>'

function run() {
    var keybinds = 10;
    var folder = "Palette_Commands";

    const dialog = fl.xmlPanelFromString(loaderXMLUI);
	if (dialog['dismiss'] === 'cancel') return;

    keybinds = parseFloat(dialog['keybinds']);
    folder = dialog['folder'];

    // Already Installed, Abort
    if (FLfile.exists(configFolder + "Palettes")) {
        return alert("Already installed, to reinstall delete Palettes folder found in Configuration folder");
    }

    // Palette Folder Create + Default Palette
    FLfile.createFolder(configFolder + "/Palettes");
    FLfile.write(configFolder + "/Palettes/default.palette", defaultPalette);

    // Palette Commands
    var commandFolder = commandsFolder + "/" + folder;
    FLfile.createFolder(commandFolder);
    for (var i = 0; i < keybinds; i++) {
        fl.trace(commandFolder + "/color_" + i + ".jsfl");
        FLfile.write(commandFolder + "/color_" + i + ".jsfl", keybindCommand.replace("{{{INDEX}}}", i))
    }

    // Selected File
    FLfile.write(configFolder + "/selected.palette", defaultPalette);
}

run()