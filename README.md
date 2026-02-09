# 🧰 OpenClaw Toolbox

A modern, beautiful multi-function toolbox built with **Next.js** and **HeroUI**.

## ✨ Features

### 🥇 Gold Price
- Real-time gold price (CNY per gram)
- 24K gold price tracking
- Auto-refresh with manual override

### 📰 Tech News
- Latest technology news aggregation
- Clean, readable format with source attribution
- One-click to read more

### ⚡ Quick Links
- Easy access to all tools
- Expandable for more features

### 🤖 System Status
- Basic system monitoring
- CPU, Memory, Uptime display

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/WaiTengChong/toolbox.git
cd toolbox

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Deployment to GitHub Pages

This project is configured for GitHub Pages export:

```bash
npm run build
# Upload the out/ folder to your GitHub Pages repository
```

## 🎨 Built With

- **Next.js 14** - React Framework
- **HeroUI v2** - Beautiful React UI Library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Icons** - Icon library

## 📁 Project Structure

```
toolbox/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with HeroUI provider
│   │   ├── page.tsx       # Main toolbox page
│   │   └── globals.css    # Global styles
│   └── ...
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🔗 Links

- **Live Demo**: https://waitengchong.github.io/toolbox/
- **GitHub**: https://github.com/WaiTengChong/toolbox

## 📄 License

MIT
