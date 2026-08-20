# 🎨 10. UI Styling with Tailwind CSS

> **Goal:** Learn how to style React components using Tailwind CSS for rapid, consistent UI development.

---

## 📚 Table of Contents

| Topic | Description |
|-------|-------------|
| [What is Tailwind CSS](#-what-is-tailwind-css) | Introduction & benefits |
| [Setup Tailwind](#-setup-tailwind-in-react) | Installation steps |
| [Core Concepts](#-core-concepts) | Utility-first approach |
| [Essential Classes](#-essential-tailwind-classes) | Most used utilities |
| [Responsive Design](#-responsive-design) | Mobile-first approach |
| [Component Examples](#-component-styling-examples) | Real patterns |
| [Dark Mode](#-dark-mode) | Theme switching |
| [Mini Project](#-mini-project-styled-card-gallery) | Practical example |

---

## 🌊 What is Tailwind CSS?

### Definition
> **Tailwind CSS** is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.

### Traditional CSS vs Tailwind

```jsx
// ❌ Traditional CSS
// styles.css
.button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

// Component
<button className="button">Click me</button>
```

```jsx
// ✅ Tailwind CSS - No separate CSS file needed!
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

### Benefits of Tailwind

| Benefit | Description |
|---------|-------------|
| 🚀 Fast Development | No context switching between CSS and JSX |
| 📦 Small Bundle | Unused classes are purged automatically |
| 🎨 Consistent | Design system built-in |
| 📱 Responsive | Mobile-first breakpoints |
| 🌙 Dark Mode | Built-in dark mode support |

---

## ⚙️ Setup Tailwind in React

### Step 1: Install Dependencies

```bash
# For Vite projects
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

### Step 2: Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 3: Add Tailwind to CSS

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Start Using!

```jsx
function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600">
      Hello Tailwind! 🎨
    </h1>
  );
}
```

---

## 📐 Core Concepts

### Utility-First Approach

```
Traditional: Write custom CSS → Apply class
Tailwind:   Apply utility classes → No custom CSS

bg-blue-500  →  background-color: #3b82f6
text-white   →  color: white
p-4          →  padding: 1rem
rounded-lg   →  border-radius: 0.5rem
```

### Class Naming Pattern

```
{property}-{value}
{property}-{direction}-{value}
{breakpoint}:{property}-{value}
```

### Examples

| Class | CSS Equivalent |
|-------|----------------|
| `mt-4` | `margin-top: 1rem` |
| `px-6` | `padding-left: 1.5rem; padding-right: 1.5rem` |
| `text-xl` | `font-size: 1.25rem` |
| `bg-gray-100` | `background-color: #f3f4f6` |

---

## 🎯 Essential Tailwind Classes

### Spacing (Margin & Padding)

```jsx
// Margin
<div className="m-4">     All sides: 1rem</div>
<div className="mt-2">    Top: 0.5rem</div>
<div className="mx-auto"> Horizontal: auto (center)</div>
<div className="my-8">    Vertical: 2rem</div>

// Padding
<div className="p-4">     All sides: 1rem</div>
<div className="px-6">    Horizontal: 1.5rem</div>
<div className="py-2">    Vertical: 0.5rem</div>
```

| Prefix | Direction |
|--------|-----------|
| `m` / `p` | All sides |
| `mt` / `pt` | Top |
| `mb` / `pb` | Bottom |
| `ml` / `pl` | Left |
| `mr` / `pr` | Right |
| `mx` / `px` | Horizontal (left + right) |
| `my` / `py` | Vertical (top + bottom) |

### Spacing Scale

| Value | Size |
|-------|------|
| `0` | 0 |
| `1` | 0.25rem (4px) |
| `2` | 0.5rem (8px) |
| `4` | 1rem (16px) |
| `6` | 1.5rem (24px) |
| `8` | 2rem (32px) |

### Typography

```jsx
// Font Size
<p className="text-sm">Small text</p>
<p className="text-base">Base text (16px)</p>
<p className="text-lg">Large text</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2x large</p>
<p className="text-3xl">3x large</p>

// Font Weight
<p className="font-light">Light</p>
<p className="font-normal">Normal</p>
<p className="font-medium">Medium</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>

// Text Color
<p className="text-gray-500">Gray text</p>
<p className="text-blue-600">Blue text</p>
<p className="text-red-500">Red text</p>
```

### Colors

```jsx
// Background Colors
<div className="bg-white">White</div>
<div className="bg-gray-100">Light gray</div>
<div className="bg-blue-500">Blue</div>
<div className="bg-green-500">Green</div>
<div className="bg-red-500">Red</div>

// Color Scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
<div className="bg-blue-100">Lightest</div>
<div className="bg-blue-500">Medium</div>
<div className="bg-blue-900">Darkest</div>
```

### Flexbox

```jsx
// Container
<div className="flex">           {/* display: flex */}
<div className="flex-col">       {/* flex-direction: column */}

// Justify Content (main axis)
<div className="flex justify-start">
<div className="flex justify-center">
<div className="flex justify-end">
<div className="flex justify-between">
<div className="flex justify-around">

// Align Items (cross axis)
<div className="flex items-start">
<div className="flex items-center">
<div className="flex items-end">

// Gap
<div className="flex gap-2">     {/* gap: 0.5rem */}
<div className="flex gap-4">     {/* gap: 1rem */}
```

### Grid

```jsx
// Grid Container
<div className="grid grid-cols-2">     {/* 2 columns */}
<div className="grid grid-cols-3">     {/* 3 columns */}
<div className="grid grid-cols-4">     {/* 4 columns */}

// Gap
<div className="grid grid-cols-3 gap-4">

// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Width & Height

```jsx
// Fixed
<div className="w-32">   {/* width: 8rem */}
<div className="h-16">   {/* height: 4rem */}

// Full
<div className="w-full"> {/* width: 100% */}
<div className="h-full"> {/* height: 100% */}

// Screen
<div className="w-screen"> {/* width: 100vw */}
<div className="h-screen"> {/* height: 100vh */}

// Max Width (containers)
<div className="max-w-sm">   {/* max-width: 24rem */}
<div className="max-w-md">   {/* max-width: 28rem */}
<div className="max-w-lg">   {/* max-width: 32rem */}
<div className="max-w-xl">   {/* max-width: 36rem */}
```

### Borders & Shadows

```jsx
// Border
<div className="border">            {/* 1px solid */}
<div className="border-2">          {/* 2px */}
<div className="border-gray-300">   {/* border color */}

// Border Radius
<div className="rounded">           {/* 0.25rem */}
<div className="rounded-md">        {/* 0.375rem */}
<div className="rounded-lg">        {/* 0.5rem */}
<div className="rounded-full">      {/* 50% (circle) */}

// Shadow
<div className="shadow">            {/* small shadow */}
<div className="shadow-md">         {/* medium */}
<div className="shadow-lg">         {/* large */}
<div className="shadow-xl">         {/* extra large */}
```

---

## 📱 Responsive Design

### Breakpoints

| Prefix | Min Width | Devices |
|--------|-----------|---------|
| (none) | 0px | Mobile (default) |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Mobile-First Approach

```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// 1 column → 2 columns → 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <Card />
  <Card />
  <Card />
</div>

// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">Mobile only</div>
```

### Responsive Text

```jsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>
```

---

## 🧩 Component Styling Examples

### Button Component

```jsx
function Button({ children, variant = 'primary' }) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline">Cancel</Button>
```

### Card Component

```jsx
function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden 
                    hover:shadow-lg transition-shadow">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
```

### Input Component

```jsx
function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

### Navbar Component

```jsx
function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-blue-600">
            MyApp
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
```

---

## 🌙 Dark Mode

### Setup in `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [...],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Using Dark Mode Classes

```jsx
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-white">
    Hello World
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    This adapts to dark mode!
  </p>
</div>
```

### Dark Mode Toggle

```jsx
import { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
```

---

## 🛠️ Mini Project: Styled Card Gallery

### File: `src/CardGallery.jsx`

```jsx
import { useState } from 'react';

// Sample data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://via.placeholder.com/300x200?text=Headphones",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 129.99,
    image: "https://via.placeholder.com/300x200?text=Shoes",
    category: "Sports"
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 79.99,
    image: "https://via.placeholder.com/300x200?text=Coffee",
    category: "Kitchen"
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "https://via.placeholder.com/300x200?text=Backpack",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 199.99,
    image: "https://via.placeholder.com/300x200?text=Watch",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: 29.99,
    image: "https://via.placeholder.com/300x200?text=Yoga",
    category: "Sports"
  }
];

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden 
                    hover:shadow-xl transition-shadow duration-300
                    dark:bg-gray-800">
      {/* Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-white 
                         text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg
                             hover:bg-blue-600 transition-colors
                             text-sm font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Gallery Component
function CardGallery() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Product Gallery
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700
                         hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                  ${filter === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No products found.
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default CardGallery;
```

### Key Tailwind Patterns Used

```
1. Responsive Grid:
   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

2. Dark Mode:
   bg-white dark:bg-gray-800

3. Hover Effects:
   hover:shadow-xl transition-shadow

4. Flexbox Layout:
   flex justify-between items-center

5. Spacing:
   p-4, mb-8, gap-6

6. Colors:
   bg-blue-500, text-gray-800
```

---

## 🎯 Quick Reference

### Most Used Classes

```jsx
// Layout
"flex items-center justify-between"
"grid grid-cols-3 gap-4"

// Spacing
"p-4 m-2"
"px-6 py-3"
"mt-4 mb-8"

// Typography
"text-xl font-bold text-gray-800"

// Colors
"bg-blue-500 text-white"
"bg-gray-100 dark:bg-gray-800"

// Borders & Shadows
"rounded-lg shadow-md border border-gray-200"

// Responsive
"hidden md:block"
"text-sm md:text-base lg:text-lg"

// Transitions
"transition-all duration-300 hover:scale-105"
```

---

## 🧠 Memory Tips

| Pattern | Remember As |
|---------|-------------|
| `p-4` | Padding 4 = 1rem |
| `mx-auto` | Margin X auto = center |
| `flex justify-center items-center` | Center everything |
| `md:` | Medium screens and up |
| `hover:` | On hover state |
| `dark:` | Dark mode variant |

---

## ⏭️ Next: [Cheat Sheet](./Cheat-Sheet.md)
