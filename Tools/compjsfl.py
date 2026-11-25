from tkinter import filedialog


file = filedialog.askopenfile(mode='r', filetypes=[("JSFL Files", "*.jsfl"), ("All Files", "*.*")])
if file:
    content = file.read()
    content = content.replace("\\", "\\\\");
    content = content.replace("'", "\\'"); 
    split = content.split("\n")
    export = ""
    for s in split:
        export = export + "+ \n" + "'" + s + "\\n'" 

    new = open("export.jsfl", "w")
    new.write(export)
    new.close()
    file.close()