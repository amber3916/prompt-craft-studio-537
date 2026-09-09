import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Lock, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UploadWorkspace } from "@/components/upload-workspace";

const title = "SnapCut AI — Remove Image Backgrounds in Seconds";
const description =
  "Drop a photo and get a clean transparent PNG in seconds. AI background removal for product shots, portraits and ads — private, fast and free to try.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const stats = [
  { icon: Clock, label: "Average cut-out", value: "under 5s" },
  { icon: Lock, label: "Images stored", value: "none" },
  { icon: Wand2, label: "Output", value: "transparent PNG" },
];

const steps = [
  {
    step: "01",
    title: "Upload",
    body: "Drag in a JPG, PNG or WEBP up to 10 MB. Format and size are checked instantly.",
  },
  {
    step: "02",
    title: "Cut out",
    body: "Our AI separates the subject from the background and keeps fine edges intact.",
  },
  {
    step: "03",
    title: "Download",
    body: "Grab a transparent PNG ready for your store, deck, thumbnail or ad creative.",
  },
];

function Index() {
  return (
    <div>
      <section className="halo">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-16 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-secondary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI background removal, no sign-up needed
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Remove backgrounds in <span className="text-gradient">one snap</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Studio-quality transparent cut-outs for product photos, portraits and marketing assets —
            in seconds, right in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gradient-cta font-medium hover:opacity-90">
              <Link to="/workspace">
                Open the workspace
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <li key={stat.label} className="glass-card rounded-2xl px-4 py-5">
                <stat.icon className="mx-auto size-5 text-secondary" aria-hidden="true" />
                <p className="mt-2 font-display text-lg font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14" aria-label="Try SnapCut AI">
        <h2 className="text-center font-display text-2xl font-semibold">Try it right here</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          No account, no watermark, no waiting in a queue.
        </p>
        <div className="mt-8">
          <UploadWorkspace />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-center font-display text-2xl font-semibold">How it works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((item) => (
            <li key={item.step} className="glass-card rounded-2xl p-6">
              <span className="font-display text-sm text-secondary">{item.step}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
