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
'    var list = palette.replace(/[\\r\\n]/g, "").split(",");\n'+ 
'    var result = {};\n'+ 
'    for (var i = 0; i < list.length; i++) {\n'+ 
'        var s = list[i];\n'+ 
'        var eq = s.indexOf("=");\n'+ 
'        if (eq < 0) continue;\n'+ 
'        var key = s.substring(0, eq);\n'+ 
'        var value = s.substring(eq + 1);\n'+ 
'\n'+ 
'        if (startsWith(value, "[")) {\n'+ 
'            value = value.replace("[", "").replace("]", "");\n'+ 
'            var ls = value.split("-");\n'+ 
'            ls.shift();\n'+ 
'            var nv = [];\n'+ 
'            for (var j = 0; j < ls.length; j++) {\n'+ 
'                nv.push(ls[j].split("|"));\n'+ 
'            }\n'+ 
'            value = nv;\n'+ 
'        } else if (startsWith(value, "\\"")) {\n'+ 
'            value = value.replace(/"/g, "");\n'+ 
'        } else if (value == "true") {\n'+ 
'            value = true;\n'+ 
'        } else if (value == "false") {\n'+ 
'            value = false;\n'+ 
'        } else {\n'+ 
'            value = parseFloat(value);\n'+ 
'        }\n'+ 
'        result[key] = value;\n'+ 
'    }\n'+ 
'    return result;\n'+ 
'}\n'

var extraCommandFileNames = [
    "Import Palette.jsfl"
]

var extraCommands = [
    parse + 
    'var configFolder = fl.configURI;\n'+ 
    'var instFolder = configFolder + "/Palette.jsfl";\n'+ 
    'var commandFolder = configFolder + "/Commands";\n'+ 
    '\n'+ 
    'var settings;\n'+ 
    '\n'+ 
    'var paletteCommand = \n'+ 
    '\'var palette = {{{PALETTE}}};\\n\'+ \n'+ 
    '\'\\n\'+ \n'+ 
    '\'var configFolder = fl.configURI;\\n\'+ \n'+ 
    '\'var instFolder = configFolder + "/Palette.jsfl";\\n\'+ \n'+ 
    '\'var paletteFolder = instFolder + "/Palettes";\\n\'+ \n'+ 
    '\'\\n\'+ \n'+ 
    '\'function run() {\\n\'+ \n'+ 
    '\'    if (FLfile.exists(paletteFolder + "/" + palette)) {\\n\'+ \n'+ 
    '\'        var content = FLfile.read(paletteFolder + "/" + palette);\\n\'+ \n'+ 
    '\'        var parsed = parsePalette(content);\\n\'+ \n'+ 
    '\'\\n\'+ \n'+ 
    '\'        FLfile.write(instFolder + "/selected", palette);\\n\'+ \n'+ 
    '\'\\n\'+ \n'+ 
    '\'        alert("Loaded " + parsed.Name + " Sucessfully.");\\n\'+ \n'+ 
    '\'    } else {\\n\'+ \n'+ 
    '\'        fl.trace("An unexpected error occoured.");\\n\'+ \n'+ 
    '\'    }\\n\'+ \n'+ 
    '\'}\\n\'+ \n'+ 
    '\'\\n\'+ \n'+ 
    '\'run();\\n\'\n'+ 
    '\n'+ 
    'function run() {\n'+ 
    '    var fileURL = fl.browseForFileURL("open", "Select file");\n'+ 
    '    var name = fileURL.split("/")[fileURL.split("/").length - 1];\n'+ 
    '\n'+ 
    '    if (!FLfile.exists(instFolder + "/settings")) {\n'+ 
    '        fl.trace("No settings file found. Is your install broken?");\n'+ 
    '        return;\n'+ 
    '    }\n'+ 
    '    settings = parsePalette(FLfile.read(instFolder + "/settings"));\n'+ 
    '\n'+ 
    '    if (fileURL) {\n'+ 
    '        var contents = FLfile.read(fileURL);\n'+ 
    '        var parsed = parsePalette(contents);\n'+ 
    '\n'+ 
    '        FLfile.write(instFolder + "/Palettes/" + name, contents);\n'+ 
    '\n'+ 
    '        FLfile.write(commandFolder + "/" + settings.Folder + "/" + parsed.Name + ".jsfl", paletteCommand.replace("{{{PALETTE}}}", \'"\' + name + \'"\'));\n'+ 
    '\n'+ 
    '        alert("Imported " + parsed.Name + " Sucessfully.");\n'+ 
    '\n'+ 
    '    } else {\n'+ 
    '        fl.trace("An unexpected error occoured.");\n'+ 
    '        return;\n'+ 
    '    }\n'+ 
    '}\n'+ 
    '\n'+ 
    'run();\n'
]

var paletteCommand = 
parse + 
'var palette = {{{PALETTE}}};\n'+ 
'\n'+ 
'var configFolder = fl.configURI;\n'+ 
'var instFolder = configFolder + "/Palette.jsfl";\n'+ 
'var paletteFolder = instFolder + "/Palettes";\n'+ 
'\n'+ 
'function run() {\n'+ 
'    if (FLfile.exists(paletteFolder + "/" + palette)) {\n'+ 
'        var content = FLfile.read(paletteFolder + "/" + palette);\n'+ 
'        var parsed = parsePalette(content);\n'+ 
'\n'+ 
'        FLfile.write(instFolder + "/selected", palette);\n'+ 
'\n'+ 
'        alert("Loaded " + parsed.Name + " Sucessfully.");\n'+ 
'    } else {\n'+ 
'        fl.trace("An unexpected error occoured.");\n'+ 
'    }\n'+ 
'}\n'+ 
'\n'+ 
'run();\n'

var keybindCommand = 
parse + 
'var color = {{{INDEX}}};\n'+ 
'var configFolder = fl.configURI;\n'+ 
'var instFolder = configFolder + "/Palette.jsfl";\n'+ 
'\n'+ 
'var selected;\n'+ 
'var config;\n'+ 
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
'    if (!FLfile.exists(instFolder + "/selected")) {\n'+ 
'        fl.trace("No selected file exists. Is your install broken?");\n'+ 
'        return;\n'+ 
'    } else {\n'+ 
'        selected = FLfile.read(instFolder + "/selected");\n'+ 
'        if (selected != "") {\n'+ 
'            config = parsePalette(FLfile.read(instFolder + "/Palettes/" + selected));\n'+ 
'        } else {\n'+ 
'            fl.trace("No selected exists. Is your install broken?");\n'+ 
'            return;\n'+ 
'        }\n'+ 
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

var defaultPalette = 
'Name="Default Color Palette",\n'+ 
'UseFillStroke=false,\n'+ 
'LabelColors=false,\n'+ 
'Colors=[\n'+ 
'-#000000\n'+ 
'-#FFFFFF\n'+ 
']\n'

var defaultSettings =
'Folder="{{{FOLDER}}}"'

function run() {
    var keybinds = 10;
    var folder = "Palette_Commands";

    const dialog = fl.xmlPanelFromString(loaderXMLUI);
	if (dialog['dismiss'] === 'cancel') return;

    keybinds = parseFloat(dialog['keybinds']);
    folder = dialog['folder'];

    // Already Installed, Abort
    if (FLfile.exists(configFolder + "Palette.jsfl")) {
        return alert("Already installed, to reinstall delete Palette.jsfl folder found in Configuration folder");
    }

    // Palette.jsfl Folder Create
    FLfile.createFolder(configFolder + "/Palette.jsfl");
    var instFolder = configFolder + "/Palette.jsfl"

    FLfile.createFolder(instFolder + "/Palettes");
    FLfile.write(instFolder + "/Palettes/default.palette", defaultPalette);

    // Palette Commands
    var commandFolder = commandsFolder + "/" + folder;
    FLfile.createFolder(commandFolder);
    for (var i = 0; i < keybinds; i++) {
        fl.trace(commandFolder + "/Color " + i + ".jsfl");
        FLfile.write(commandFolder + "/Color " + i + ".jsfl", keybindCommand.replace("{{{INDEX}}}", i))
    }

    // Config File
    FLfile.write(instFolder + "/settings", defaultSettings.replace("{{{FOLDER}}}",folder));

    // Selected File
    FLfile.write(instFolder + "/selected", "default.palette");
    
    // Write Default Command
    FLfile.write(commandFolder + "/Default Color Palette.jsfl", paletteCommand.replace("{{{PALETTE}}}",'"default.palette"'));

    // Write Extra Commands
    for (var i = 0; i < extraCommands.length; i++) {
        var commandName = extraCommandFileNames[i];
        var commandContent = extraCommands[i];

        FLfile.write(commandFolder + "/" + commandName, commandContent);
    }

    // This is such a headache
}

run()