# How to Build Windows .EXE File

## Prerequisites
1. Install Node.js from https://nodejs.org/
2. Export this project to GitHub and clone to your Windows computer

## Step 1: Setup Project
```bash
cd your-project-folder
npm install
```

## Step 2: Install Electron Dependencies
**Important: Use npm (not bun) for Electron dependencies**
```bash
npm install --save-dev electron@latest electron-builder@latest wait-on@latest
```

## Step 3: Update package.json Scripts
Add these scripts to your package.json:
```json
"scripts": {
  "electron": "electron .",
  "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
  "build-electron": "npm run build && electron-builder",
  "dist": "npm run build && electron-builder --publish=never"
}
```

## Step 4: Add Electron Builder Config
Add this to your package.json:
```json
"main": "electron.js",
"build": {
  "appId": "com.swissquest.tdscalculator",
  "productName": "SwissQuest TDS Calculator",
  "directories": {
    "output": "dist-electron"
  },
  "files": [
    "dist/**/*",
    "electron.js",
    "node_modules/**/*"
  ],
  "win": {
    "target": "nsis",
    "icon": "public/favicon.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  }
}
```

## Step 5: Build the .EXE
```bash
# Build the web app first
npm run build

# Create the .EXE installer
npm run dist
```

Your .EXE installer will be created in the `dist-electron` folder!

## Testing During Development
```bash
# Test the electron app
npm run electron

# Or run in development mode with hot reload
npm run electron-dev
```

## Final .EXE Location
After running `npm run dist`, you'll find:
- `SwissQuest TDS Calculator Setup.exe` in `dist-electron/` folder
- This is a full installer that users can run to install your app
- The installed app will work completely offline!

## Distribution
Share the .exe file with users - they can install and run your TDS Calculator offline on any Windows computer!