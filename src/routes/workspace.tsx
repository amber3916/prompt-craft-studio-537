import { createFileRoute } from "@tanstack/react-router";

import { UploadWorkspace } from "@/components/upload-workspace";

const title = "Upload Workspace — SnapCut AI";
const description =
  "Drop a JPG, PNG or WEBP and get a clean transparent cut-out in seconds. No sign-up, no watermarks, nothing stored.";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <div className="halo">
      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Upload <span className="text-gradient">workspace</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            One image at a time, cut out cleanly and ready to download as a transparent PNG.
          </p>
        </div>
        <div className="mt-10">
          <UploadWorkspace />
        </div>
      </section>
    </div>
  );
}
