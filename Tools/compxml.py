from tkinter import filedialog


file = filedialog.askopenfile(mode='r', filetypes=[("XML Files", "*.xml"), ("All Files", "*.*")])
if file:
    content = file.read()
    split = content.split("\n")
    export = "var loaderXMLUI = \n"
    for s in split:
        export = export + "+ \n" + "'" + s + "\\n'" 

    new = open("export.jsfl", "w")
    new.write(export)
    new.close()
    file.close()