// Re-export the component from the dist directory
export * from "./dist/pricing-component.js";

// Register the component if it hasn't been registered
import { PricingComponent } from "./dist/pricing-component.js";
if (!customElements.get("pricing-component")) {
  customElements.define("pricing-component", PricingComponent);
}
