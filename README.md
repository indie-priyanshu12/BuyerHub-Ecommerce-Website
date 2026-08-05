# BuyerHub E-Commerce Dashboard

BuyerHub is a modern, responsive e-commerce dashboard and storefront component built with React and Vite. It is designed following the strict principles of the **Swiss International Style**, featuring a bold, minimalist aesthetic, sharp edges, and a focused 4-color palette.

## ✨ Features

- **Product Filtering & Sorting:** A robust sidebar filter supporting multi-select categories, price range dual-sliders, and star rating filters. 
- **Dynamic Navigation:** Features an animated, GSAP-powered `CardNav` component for seamless transitions.
- **Brand Showcases:** Includes a `LogoLoop` component on the About page to showcase brand partners in a smooth, continuous scrolling animation.
- **Responsive Grid:** A fluid product grid that adapts perfectly from mobile devices up to large desktop monitors.
- **Swiss Design System:** 
  - Typography: Clean sans-serif fonts (`Inter`).
  - Colors: Strict adherence to Black (`#000`), White (`#fff`), Light Grey (`#F5F5F5`), and Accent Red (`#FF0000`).
  - Layout: 12-column grid system with 1px solid black borders and 0px border-radii for a sharp, utilitarian look.

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Vanilla CSS** (Custom Design Tokens)
- **GSAP** (For complex layout animations)
- **React Icons** (For UI elements and brand logos)

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Visit `http://localhost:5173` to view the application.

## 📁 Project Structure

- `src/components/` - Contains all modular UI components (`Sidebar`, `ProductGrid`, `CardNav`, `LogoLoop`, `AboutPage`).
- `src/filterLogic.js` - Pure functions handling complex filtering and sorting logic.
- `src/data.js` - Mock product dataset.
- `src/index.css` - Global CSS tokens enforcing the Swiss Design system.

## 🎨 Design Notes
This project avoids soft shadows and rounded corners, opting instead for a highly legible, grid-based layout inspired by mid-century Swiss graphic design. All components are styled using custom CSS properties defined in `index.css` to ensure brand consistency.
