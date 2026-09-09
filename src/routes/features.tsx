import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  Gauge,
  Layers,
  Lock,
  ScanLine,
  Sparkles,
  Smartphone,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const title = "Features — SnapCut AI Background Removal";
const description =
  "Edge-accurate AI cut-outs, sub-5 second processing, transparent PNG downloads and private on-device processing.";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  {
    icon: ScanLine,
    title: "Edge-accurate cut-outs",
    body: "Hair, fur and fine product edges stay intact instead of turning into a hard silhouette.",
  },
  {
    icon: Gauge,
    title: "Under five seconds",
    body: "Most images finish in 2–5 seconds with a live progress bar so you always know where you are.",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "Cut-outs run on your own device. Nothing is uploaded, nothing is kept after you close the tab.",
  },
  {
    icon: Download,
    title: "Transparent PNG output",
    body: "Download a true alpha-channel PNG that drops straight into your store, deck or design tool.",
  },
  {
    icon: Layers,
    title: "Before and after preview",
    body: "Compare the original and the result side by side on a checkerboard so transparency is obvious.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first interface",
    body: "The same drag-and-drop workspace works with a thumb on a phone and a mouse on desktop.",
  },
  {
    icon: Wand2,
    title: "Strict input validation",
    body: "Format, file size and resolution are checked instantly, so you never wait for a doomed upload.",
  },
  {
    icon: Sparkles,
    title: "Built for volume",
    body: "Product catalogues, marketplace listings, headshots and ad creative — same workflow every time.",
  },
];

function FeaturesPage() {
  return (
    <div>
      <section className="halo mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to <span className="text-gradient">cut out fast</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          SnapCut AI does one job properly: removing backgrounds cleanly, quickly and privately.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.title} className="glass-card rounded-2xl p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-secondary">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gradient-cta font-medium hover:opacity-90">
            <Link to="/workspace">Try it on your image</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
