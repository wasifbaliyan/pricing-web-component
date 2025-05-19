class n extends HTMLElement {
  // 20% discount for yearly billing
  constructor() {
    super(), this.plans = [], this._billingPeriod = "monthly", this.yearlyDiscount = 20, this.shadow = this.attachShadow({ mode: "open" }), this.setupInitialState(), this.render();
  }
  static get observedAttributes() {
    return ["currency", "highlight", "billing-period", "yearly-discount"];
  }
  attributeChangedCallback(e, t, i) {
    t !== i && (e === "billing-period" ? this._billingPeriod = i === "yearly" ? "yearly" : "monthly" : e === "yearly-discount" && !isNaN(Number(i)) && (this.yearlyDiscount = Number(i)), this.render());
  }
  setupInitialState() {
    this.plans = [
      {
        name: "Basic",
        price: 9.99,
        period: "month",
        features: [
          "Single user",
          "10 projects",
          "5GB storage",
          "Basic support"
        ],
        cta: "Start for free",
        ctaUrl: "#basic"
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
          "Advanced analytics"
        ],
        popular: !0,
        cta: "Start free trial",
        ctaUrl: "#pro"
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
          "Custom integration"
        ],
        cta: "Contact sales",
        ctaUrl: "#enterprise"
      }
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
  set billingPeriod(e) {
    this._billingPeriod = e, this.setAttribute("billing-period", e);
  }
  toggleBillingPeriod() {
    this.billingPeriod = this.billingPeriod === "monthly" ? "yearly" : "monthly";
  }
  calculatePrice(e) {
    if (this.billingPeriod === "yearly") {
      const t = e * (this.yearlyDiscount / 100);
      return (e - t) * 12;
    }
    return e;
  }
  setPlans(e) {
    this.plans = e, this.render();
  }
  formatPrice(e) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2
    }).format(e);
  }
  render() {
    const e = `
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
    `, t = `
      <div class="pricing-header">
        <div class="pricing-toggle">
          <div class="toggle-option ${this.billingPeriod === "monthly" ? "selected" : ""}" data-period="monthly">Monthly</div>
          <div class="toggle-option ${this.billingPeriod === "yearly" ? "selected" : ""}" data-period="yearly">
            Yearly
            <span class="discount-badge">${this.yearlyDiscount}% off</span>
          </div>
        </div>
      </div>
      <div class="pricing-container">
        ${this.plans.map(
      (r) => `
          <div class="pricing-plan ${r.name.toLowerCase() === this.highlight.toLowerCase() ? "popular" : ""}">
            ${r.name.toLowerCase() === this.highlight.toLowerCase() ? '<span class="popular-badge">Popular</span>' : ""}
            <h3 class="plan-name">${r.name}</h3>
            <div class="plan-price">
              ${this.formatPrice(this.calculatePrice(r.price))}
            </div>
            <div class="plan-period">per ${this.billingPeriod === "monthly" ? "month" : "year"}</div>
            
            <ul class="plan-features">
              ${r.features.map(
        (o) => `
                <li class="feature-item">${o}</li>
              `
      ).join("")}
            </ul>
            
            <a href="${r.ctaUrl}" class="plan-cta ${r.name.toLowerCase() === this.highlight.toLowerCase() ? "" : "plan-secondary"}">
              ${r.cta}
            </a>
          </div>
        `
    ).join("")}
      </div>
    `;
    this.shadow.innerHTML = `
      <style>${e}</style>
      ${t}
    `, this.shadow.querySelectorAll(".toggle-option").forEach((r) => {
      r.addEventListener("click", (o) => {
        const a = o.currentTarget.dataset.period;
        a && (this.billingPeriod = a);
      });
    });
  }
}
customElements.define("pricing-component", n);
export {
  n as PricingComponent
};
