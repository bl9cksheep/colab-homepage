# Colab Homepage (Hugo)

This repo contains the **Colab lab homepage** built with **Hugo** (theme: `hugo-profile`).

## Quick Start (macOS)

### 1) Install Hugo
```
brew install hugo
hugo version
```

### 2) Create a new site
```
hugo new site colab
cd colab
```

### 3) Replace files with this repo
```
# Clone this repo (or download it as a ZIP)
git clone https://github.com/bl9cksheep/colab-homepage.git

# Copy/overwrite everything into your current colab folder
rsync -av --delete colab-homepage/ ./
```

### 4) Run locally
```
hugo server
```

Open in browser: http://localhost:1313/
