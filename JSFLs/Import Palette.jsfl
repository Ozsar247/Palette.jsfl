var configFolder = fl.configURI;

function run() {
    var fileURL = fl.browseForFileURL("open", "Select file");
    var name = fileURL.split("/")[fileURL.split("/").length - 1];

    if (fileURL) {
        var contents = FLfile.read(fileURL);
        var parsed = parsePalette(contents);

        FLfile.write(configFolder + "/Palettes/" + name, contents);

        alert("Imported " + parsed.Name + " Sucessfully.");

    } else {
        fl.trace("An unexpected error occoured.");
        return;
    }
}

run();