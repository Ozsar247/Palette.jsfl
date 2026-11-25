var palette = {{{PALETTE}}};

var configFolder = fl.configURI;
var instFolder = configFolder + "/Palette.jsfl";
var paletteFolder = instFolder + "/Palettes";

function run() {
    if (FLfile.exists(paletteFolder + "/" + palette)) {
        var content = FLfile.read(paletteFolder + "/" + palette);
        var parsed = parsePalette(content);

        FLfile.write(instFolder + "/selected", palette);

        alert("Loaded " + parsed.Name + " Sucessfully.");
    } else {
        fl.trace("An unexpected error occoured.");
    }
}

run();