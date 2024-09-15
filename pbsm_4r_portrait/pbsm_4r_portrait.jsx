#target photoshop

// Paths to files for storing folder and index
var folderPathFile = Folder.userData + "/imageFolderPath.txt";
var indexFilePath = Folder.userData + "/currentImageIndex.txt";

// Function to read the folder path from a file
function readFolderPath() {
    var file = new File(folderPathFile);
    if (file.exists) {
        file.open('r');
        var path = file.read();
        file.close();
        return path;
    }
    return null;
}

// Function to write the folder path to a file
function writeFolderPath(path) {
    var file = new File(folderPathFile);
    file.open('w');
    file.write(path);
    file.close();
}

// Function to read the current image index from a file
function readCurrentImageIndex() {
    var file = new File(indexFilePath);
    if (file.exists) {
        file.open('r');
        var index = parseInt(file.read(), 10);
        file.close();
        return isNaN(index) ? 0 : index;
    }
    return 0;
}

// Function to write the current image index to a file
function writeCurrentImageIndex(index) {
    var file = new File(indexFilePath);
    file.open('w');
    file.write(index);
    file.close();
}

// Function to replace the placeholder layer with a new image and fit it to the canvas
function replaceImage(newImageFile) {
    var doc = app.activeDocument;

    // Select the "REPLACE_IMG_HERE" layer
    var layer;
    try {
        layer = doc.artLayers.getByName("REPLACE_IMG_HERE");
    } catch (e) {
        alert("Layer 'REPLACE_IMG_HERE' not found.");
        return false;
    }

    // Get the layer below
    var belowLayer;
    try {
        belowLayer = doc.artLayers.getByName("frame_img");
    } catch (e) {
        alert("Layer 'frame_img' not found.");
        return false;
    }

    // Remove existing content in the layer
    layer.remove();

    // Create a new layer for the new image
    var newLayer = doc.artLayers.add();
    newLayer.name = "REPLACE_IMG_HERE";

    // Open the new image
    var newImage;
    try {
        newImage = app.open(newImageFile);
    } catch (e) {
        alert("Failed to open image: " + newImageFile.name);
        return false;
    }

    // Select all and copy the new image
    newImage.selection.selectAll();
    newImage.selection.copy();

    // Go back to the original document
    app.activeDocument = doc;

    // Paste the new image into the new layer
    doc.activeLayer = newLayer;
    doc.paste();

    // Close the new image without saving
    newImage.close(SaveOptions.DONOTSAVECHANGES);

    // Automatically fit the image to the canvas size
    var imageLayer = doc.activeLayer;

    // Resize the image while maintaining the aspect ratio
    var canvasRatio = doc.width / doc.height;
    var imageRatio = (imageLayer.bounds[2] - imageLayer.bounds[0]) / (imageLayer.bounds[3] - imageLayer.bounds[1]);

    var scaleFactor;
    if (imageRatio > canvasRatio) {
        // Image is wider, fit to width
        scaleFactor = (doc.width / (imageLayer.bounds[2] - imageLayer.bounds[0])) * 100;
    } else {
        // Image is taller, fit to height
        scaleFactor = (doc.height / (imageLayer.bounds[3] - imageLayer.bounds[1])) * 100;
    }

    imageLayer.resize(scaleFactor, scaleFactor);

    // Center the image on the canvas
    var deltaX = (doc.width - (imageLayer.bounds[2] - imageLayer.bounds[0])) / 2;
    var deltaY = (doc.height - (imageLayer.bounds[3] - imageLayer.bounds[1])) / 2;
    imageLayer.translate(deltaX - imageLayer.bounds[0], deltaY - imageLayer.bounds[1]);

    // Set the new layer as a clipping mask to the below layer
    imageLayer.move(belowLayer, ElementPlacement.PLACEBEFORE);
    imageLayer.grouped = true;

    // Convert the new layer to a Smart Object using an action
    try {
        app.doAction('Convert to Smart Object', 'pbsm');
    } catch (e) {
        alert("Failed to convert the layer to a Smart Object using action: " + e.message);
        return false;
    }

    return true;
}

// Function to prompt the user to clear saved data
function promptToClearData() {
    var response = confirm("All images have been processed. Would you like to clear the saved folder path and image index for the next session?");
    if (response) {
        var folderFile = new File(folderPathFile);
        if (folderFile.exists) {
            folderFile.remove();
        }
        var indexFile = new File(indexFilePath);
        if (indexFile.exists) {
            indexFile.remove();
        }
    }
}

// Main Process
function main() {
    var folderPath = readFolderPath();

    if (!folderPath) {
        // Prompt the user to select the folder containing images
        var folder = Folder.selectDialog("Select the folder containing images");
        if (folder) {
            folderPath = folder.fsName;
            writeFolderPath(folderPath);
            alert("Folder path saved: " + folderPath); // Debug alert
        } else {
            alert("No folder selected.");
            return;
        }
    } else {
        alert("Using saved folder path: " + folderPath); // Debug alert
    }

    var folder = new Folder(folderPath);
    var files = folder.getFiles("*.jpg"); // Adjust the file type as needed
    var currentIndex = readCurrentImageIndex();

    if (files.length === 0) {
        alert("No image files found in the selected folder.");
        return;
    }

    if (currentIndex >= files.length) {
        promptToClearData();
        return;
    }

    var newImageFile = files[currentIndex];
    var remainingImages = files.length - currentIndex - 1;

    // Show how many images are left
    alert("Processing image: " + newImageFile.name + ". " + remainingImages + " images remaining.");

    if (replaceImage(newImageFile)) {
        alert("Successfully replaced image with: " + newImageFile.name);
        writeCurrentImageIndex(currentIndex + 1);
    } else {
        alert("Failed to replace image for file: " + newImageFile.name);
    }
}

// Run the script
main();
