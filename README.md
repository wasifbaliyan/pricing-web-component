# Pricing Web Component

A reusable, customizable pricing component built with Web Components. This component can be embedded in any web page, including static sites, web applications, and platforms like Webflow.

## Features

- Fully customizable pricing plans
- Monthly/yearly billing toggle with configurable discount
- Responsive design that works on all devices
- Configurable via attributes or JavaScript API
- Works with any modern browser that supports Web Components
- No framework dependencies - use with React, Vue, Angular, or vanilla JS
- Customizable styles via CSS variables

## Installation

### Option 1: NPM Package

```bash
npm install pricing-web-component
```

```javascript
import "pricing-web-component";
```

### Option 2: CDN

```html
<script type="module" src="https://unpkg.com/pricing-web-component"></script>
```

### Option 3: Self-host

1. Download the `pricing-component.js` file from the `/dist` directory
2. Include it in your HTML:

```html
<script type="module" src="path/to/pricing-component.js"></script>
```

## Usage

### Basic Usage

```html
<pricing-component></pricing-component>
```

### With Attributes

```html
<pricing-component
  currency="EUR"
  highlight="enterprise"
  billing-period="yearly"
  yearly-discount="20"
></pricing-component>
```

### Available Attributes

- `currency`: Currency code (default: "USD")
- `highlight`: Name of the plan to highlight (default: "pro")
- `billing-period`: Billing period to display, either "monthly" or "yearly" (default: "monthly")
- `yearly-discount`: Percentage discount for yearly billing (default: 20)

### JavaScript API

You can programmatically set the pricing plans and billing period:

```javascript
const pricingComponent = document.querySelector("pricing-component");

// Change billing period
pricingComponent.billingPeriod = "yearly";

// Set custom plans
pricingComponent.setPlans([
  {
    name: "Basic",
    price: 9.99,
    period: "month", // This is the base period for the price
    features: ["Feature 1", "Feature 2"],
    cta: "Sign Up",
    ctaUrl: "#signup",
  },
  // Add more plans as needed
]);
```

## Styling

The component can be customized using CSS variables:

```css
pricing-component {
  --primary-color: #4f46e5;
  --border-color: #d1d5db;
  --text-color: #374151;
  --secondary-text: #6b7280;
  --bg-color: #ffffff;
  --highlight-bg: #f9fafb;
  --toggle-bg: #e5e7eb;
  --toggle-selected: #4f46e5;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Browser Support

This component works in all modern browsers that support Web Components (Chrome, Firefox, Safari, Edge).

## License

ISC
