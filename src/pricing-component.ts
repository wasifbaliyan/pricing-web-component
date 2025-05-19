/**
 * PricingComponent - A customizable pricing component for websites
 */
export class PricingComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private plans: any[] = [];
  private _billingPeriod: "monthly" | "yearly" = "monthly";
  private yearlyDiscount: number = 20; // 20% discount for yearly billing

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.setupInitialState();
    this.render();
  }

  static get observedAttributes() {
    return ["currency", "highlight", "billing-period", "yearly-discount"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === "billing-period") {
        this._billingPeriod = newValue === "yearly" ? "yearly" : "monthly";
      } else if (name === "yearly-discount" && !isNaN(Number(newValue))) {
        this.yearlyDiscount = Number(newValue);
      }
      this.render();
    }
  }

  setupInitialState() {
    // Default pricing plans
    this.plans = [
      {
        name: "Basic",
        price: 9.99,
        period: "month",
        features: [
          "Single user",
          "10 projects",
          "5GB storage",
          "Basic support",
        ],
        cta: "Start for free",
        ctaUrl: "#basic",
      },
      {
        name: "Pro",
        price: 19.99,
        period: "month",
        features: [
          "Up to 5 users",
          "Unlimited projects",
          "50GB storage",
          "Priority support",
          "Advanced analytics",
        ],
        popular: true,
        cta: "Start free trial",
        ctaUrl: "#pro",
      },
      {
        name: "Enterprise",
        price: 49.99,
        period: "month",
        features: [
          "Unlimited users",
          "Unlimited projects",
          "500GB storage",
          "24/7 support",
          "Advanced analytics",
          "Custom integration",
        ],
        cta: "Contact sales",
        ctaUrl: "#enterprise",
      },
    ];
  }

  get currency() {
    return this.getAttribute("currency") || "USD";
  }

  get highlight() {
    return this.getAttribute("highlight") || "pro";
  }

  get billingPeriod() {
    return this._billingPeriod;
  }

  set billingPeriod(value: "monthly" | "yearly") {
    this._billingPeriod = value;
    this.setAttribute("billing-period", value);
  }

  toggleBillingPeriod() {
    this.billingPeriod =
      this.billingPeriod === "monthly" ? "yearly" : "monthly";
  }

  calculatePrice(basePrice: number): number {
    if (this.billingPeriod === "yearly") {
      // Apply yearly discount
      const discount = basePrice * (this.yearlyDiscount / 100);
      return (basePrice - discount) * 12;
    }
    return basePrice;
  }

  setPlans(plans: any[]) {
    this.plans = plans;
    this.render();
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2,
    }).format(price);
  }

  render() {
    const styles = `
      :host {
        --primary-color: #6366f1;
        --border-color: #e5e7eb;
        --text-color: #1f2937;
        --secondary-text: #6b7280;
        --bg-color: #ffffff;
        --highlight-bg: #f9fafb;
        --toggle-bg: #e5e7eb;
        --toggle-selected: #6366f1;
        
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: var(--text-color);
      }
      
      .pricing-header {
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .pricing-toggle {
        display: inline-flex;
        align-items: center;
        background: var(--toggle-bg);
        border-radius: 9999px;
        padding: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        margin: 0 auto 2rem;
      }
      
      .toggle-option {
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .toggle-option.selected {
        background: var(--toggle-selected);
        color: white;
      }
      
      .discount-badge {
        display: inline-block;
        background-color: #10b981;
        color: white;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.125rem 0.5rem;
        border-radius: 9999px;
        margin-left: 0.5rem;
        vertical-align: middle;
      }
      
      .pricing-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding: 2rem 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .pricing-plan {
        flex: 1 1 300px;
        max-width: 350px;
        background: var(--bg-color);
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .pricing-plan:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      
      .pricing-plan.popular {
        border-color: var(--primary-color);
        position: relative;
        background: var(--highlight-bg);
      }
      
      .popular-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 1rem;
        border-radius: 9999px;
      }
      
      .plan-name {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 1rem;
      }
      
      .plan-price {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        display: flex;
        align-items: flex-start;
      }
      
      .plan-period {
        font-size: 0.875rem;
        color: var(--secondary-text);
        margin-top: 0.5rem;
      }
      
      .plan-features {
        margin: 2rem 0;
        padding: 0;
        list-style: none;
      }
      
      .feature-item {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
      }
      
      .feature-item:before {
        content: "✓";
        display: inline-block;
        color: var(--primary-color);
        margin-right: 0.5rem;
        font-weight: bold;
      }
      
      .plan-cta {
        margin-top: auto;
        display: block;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.375rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.2s;
      }
      
      .plan-cta:hover {
        background-color: #4f46e5;
      }
      
      .plan-secondary {
        background: transparent;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
      }
      
      .plan-secondary:hover {
        background-color: rgba(99, 102, 241, 0.1);
      }
    `;

    const html = `
      <div class="pricing-header">
        <div class="pricing-toggle">
          <div class="toggle-option ${
            this.billingPeriod === "monthly" ? "selected" : ""
          }" data-period="monthly">Monthly</div>
          <div class="toggle-option ${
            this.billingPeriod === "yearly" ? "selected" : ""
          }" data-period="yearly">
            Yearly
            <span class="discount-badge">${this.yearlyDiscount}% off</span>
          </div>
        </div>
      </div>
      <div class="pricing-container">
        ${this.plans
          .map(
            (plan) => `
          <div class="pricing-plan ${
            plan.name.toLowerCase() === this.highlight.toLowerCase()
              ? "popular"
              : ""
          }">
            ${
              plan.name.toLowerCase() === this.highlight.toLowerCase()
                ? '<span class="popular-badge">Popular</span>'
                : ""
            }
            <h3 class="plan-name">${plan.name}</h3>
            <div class="plan-price">
              ${this.formatPrice(this.calculatePrice(plan.price))}
            </div>
            <div class="plan-period">per ${
              this.billingPeriod === "monthly" ? "month" : "year"
            }</div>
            
            <ul class="plan-features">
              ${plan.features
                .map(
                  (feature: string) => `
                <li class="feature-item">${feature}</li>
              `
                )
                .join("")}
            </ul>
            
            <a href="${plan.ctaUrl}" class="plan-cta ${
              plan.name.toLowerCase() === this.highlight.toLowerCase()
                ? ""
                : "plan-secondary"
            }">
              ${plan.cta}
            </a>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.shadow.innerHTML = `
      <style>${styles}</style>
      ${html}
    `;

    // Add event listeners
    const toggleOptions = this.shadow.querySelectorAll(".toggle-option");
    toggleOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const period = target.dataset.period as "monthly" | "yearly";
        if (period) {
          this.billingPeriod = period;
        }
      });
    });
  }
}

// Register the web component
customElements.define("pricing-component", PricingComponent);
