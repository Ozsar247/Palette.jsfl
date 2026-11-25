var configFolder = fl.configURI;
var instFolder = configFolder + "/Palette.jsfl";
var commandFolder = configFolder + "/Commands";

var settings;

var paletteCommand = 
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

function run() {
    var fileURL = fl.browseForFileURL("open", "Select file");
    var name = fileURL.split("/")[fileURL.split("/").length - 1];

    if (!FLfile.exists(instFolder + "/settings")) {
        fl.trace("No settings file found. Is your install broken?");
        return;
    }
    settings = parsePalette(FLfile.read(instFolder + "/settings"));

    if (fileURL) {
        var contents = FLfile.read(fileURL);
        var parsed = parsePalette(contents);

        FLfile.write(instFolder + "/Palettes/" + name, contents);

        FLfile.write(commandFolder + "/" + settings.Folder + "/" + parsed.Name + ".jsfl", paletteCommand.replace("{{{PALETTE}}}", '"' + name + '"'));

        alert("Imported " + parsed.Name + " Sucessfully.");

    } else {
        fl.trace("An unexpected error occoured.");
        return;
    }
}

run();