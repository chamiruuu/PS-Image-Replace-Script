# Photoshop Image Transformer: The Infinite Canvas

## 🎨 Introduction

Welcome to the **Photoshop Image Transformer**, a tool designed to revolutionize your creative workflow. This script automates the process of importing and replacing images in your Photoshop projects, ensuring your canvas is always filled with your latest artistic vision.

## ✨ Features

- **Folder of Dreams**: Effortlessly select a folder containing your images and let the script handle the rest.
- **Layer Alchemy**: Replace the `REPLACE_IMG_HERE` layer with a new image from your folder, maintaining a seamless workflow.
- **Canvas Symphony**: Fit and center your new image perfectly on the canvas, preserving its proportions.
- **Progress Chronicles**: Keep track of your progress with automatic indexing, so you can pick up right where you left off.
- **Smart Object Enchantment**: Convert the new image layer to a Smart Object using a Photoshop action.

## 🚀 Installation

1. **Place the Script**:
   - **Windows**: `C:\Program Files\Adobe\Adobe Photoshop <version>\Presets\Scripts`
   - **macOS**: `/Applications/Adobe Photoshop <version>/Presets/Scripts`

2. **Restart Photoshop** to see the script under **File > Scripts**.

## 🛠️ Usage

1. **Open Your Document**: Ensure your Photoshop document contains a `REPLACE_IMG_HERE` and `frame_img` layer.
2. **Run the Script**: Go to **File > Scripts > [Your Script Name]**.
3. **Select Your Folder**: If it's your first time running the script, you'll be prompted to choose a folder containing your images.
4. **Watch the Magic**: The script replaces the placeholder layer with the next image from your folder, resizing and centering it perfectly.
5. **Continue Seamlessly**: The script remembers your progress, allowing you to resume where you left off.

## 💡 Notes

- Ensure your document includes the `REPLACE_IMG_HERE` and `frame_img` layers for the script to function correctly.
- The script processes `.jpg` files by default. Modify it if you need to work with other file types.
- You need a Photoshop action named "Convert to Smart Object" in the "pbsm" action set for the Smart Object conversion feature.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details. Enjoy the freedom to use, modify, and share this tool!
