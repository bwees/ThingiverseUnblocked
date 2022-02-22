function updateButtons(delay = true) {
    if (delay) {
        setTimeout(function () {
            updateButtons(false);
        }, 50);
    } else {
        var buttons = document.getElementsByClassName("button")
        // for each buttons, if the parent elemnt has class name that contains "ThingFile", then print "found"
        var fileIndex = 0
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i]
            var parent = button.parentElement
            if (parent.className.includes("ThingFile__download")) {
                parent.className = "ThingFile__download"
                button.innerHTML = "Download"
                parent.href = fileList[fileIndex]
                fileIndex++
            }
        }
    }
}

if (fileList) {
    updateButtons(false);
    
    // find all divs with inner html of "Thing Files"
    var divTags = document.getElementsByTagName("div");
    var searchText = "Thing Files";
    var found;

    for (var i = 0; i < divTags.length; i++) {
        if (divTags[i].innerText == searchText) {
            found = divTags[i];
            break;
        }
    }

    found.parentElement.onclick = updateButtons
    //set onclick of child of found div to updateButtons

    var children = found.children
    for (var i = 0; i < children.length; i++) {
        children[i].onclick = updateButtons
    }
    
}

