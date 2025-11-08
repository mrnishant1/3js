# Nimbus Keyboard - 3D Interactive Website

A cutting-edge 3D interactive website showcasing the Nimbus mechanical keyboard with immersive 3D experiences, customizable keycap themes, and interactive switch demonstrations.

## 🚀 Live Demo

**Live Website:** 

## ✨ Features

### 🎮 Interactive 3D Experience
- **Immersive 3D Keyboard Model**: Fully interactive 3D keyboard with realistic materials and lighting

### 🎨 Visual Design
- **Modern UI/UX**: Clean, modern interface with responsive design
- **Dynamic Backgrounds**: Gradient backgrounds that change based on scroll position
- **Typography**: Custom font styling with Roboto Flex variable font
- **3D Rendering**: High-quality 3D models with realistic materials and lighting

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Touch Interactions**: Mobile-friendly 3D interactions
- **Performance Optimized**: Efficient loading and rendering

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **@gsap/react** - GSAP animations for React


## 🎯 Key Components

### 3D Components
- **Keyboard.tsx**: Main 3D keyboard model with detailed keycap and switch geometry

### Animation System
- **GSAP Integration**: Smooth scroll-triggered animations
- **SplitText**: Text animation effects
- **ScrollTrigger**: Scroll-based animations
- **3D Animations**: Keyboard and switch interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nimbus-keyboard1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
`

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Configure environment variables

## 🎮 3D Assets

### Models
- `keyboard.gltf` - Main keyboard model
- `keycap.gltf` - Individual keycap model
- `switch.gltf` - Mechanical switch model

### Textures
- Keycap UV maps for different themes
- HDR environment maps for realistic lighting
- Material textures for realistic rendering

### Environment Maps
- `blue-studio.hdr` - Blue studio lighting
- `studio-small.hdr` - Compact studio setup

## 🔍 Performance Optimization

- **3D Model Optimization**: Compressed GLTF models
- **Texture Optimization**: Compressed image formats
- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Dynamic imports for slices
- **ISR**: Incremental Static Regeneration


**Built with ❤️ using Next.js, Three.js, and modern web technologies**
