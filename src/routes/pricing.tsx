import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const title = "Pricing — SnapCut AI";
const description =
  "Start free with 5 cut-outs a day, go unlimited on Pro Monthly, or buy credit packs that never expire.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    highlight: false,
    features: [
      "5 cut-outs per day",
      "Transparent PNG downloads",
      "Up to 10 MB per image",
      "Standard processing queue",
    ],
    cta: "Start free",
  },
  {
    name: "Pro Monthly",
    price: "₹799",
    cadence: "per month",
    highlight: true,
    features: [
      "Unlimited cut-outs",
      "Priority processing",
      "Full-resolution output up to 5000 px",
      "7-day download history",
      "Email support",
    ],
    cta: "Go Pro",
  },
  {
    name: "Credit Pack",
    price: "₹499",
    cadence: "500 credits",
    highlight: false,
    features: [
      "Credits never expire",
      "One credit per cut-out",
      "Ideal for seasonal catalogues",
      "Shareable across your team",
    ],
    cta: "Buy credits",
  },
];

function PricingPage() {
  return (
    <div>
      <section className="halo mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple <span className="text-gradient">pricing</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Try it free today. Paid plans unlock unlimited cut-outs and priority processing.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <ul className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`glass-card relative flex flex-col rounded-2xl p-7 ${
                plan.highlight ? "shadow-[var(--shadow-glow-strong)]" : ""
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-medium gradient-cta">
                  Most popular
                </span>
              ) : null}
              <h2 className="font-display text-xl font-semibold">{plan.name}</h2>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-2">
                <Button
                  asChild
                  className={`w-full font-medium ${
                    plan.highlight ? "gradient-cta hover:opacity-90" : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  <Link to="/workspace">{plan.cta}</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Billing and credit tracking are set up in the next build stage — the workspace is free to
          use right now.
        </p>
      </section>
    </div>
  );
}
