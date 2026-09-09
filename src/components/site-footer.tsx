import { Link } from "@tanstack/react-router";

import { SnapCutLogo } from "@/components/snapcut-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <SnapCutLogo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Instant AI background removal for product photos, portraits and marketing assets.
            Images are processed on your device and never stored on a server.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/features" className="hover:text-secondary">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-secondary">
            Pricing
          </Link>
          <Link to="/workspace" className="hover:text-secondary">
            Workspace
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </footer>
  );
}
