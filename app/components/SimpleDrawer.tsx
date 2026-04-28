"use client";

import { useState } from "react";
import { Drawer } from "vaul";

const ClippedVaulDrawer = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      className="relative h-96 w-full overflow-hidden rounded-lg border bg-gray-50"
    >
      <div className="p-4">
        <Drawer.Root container={container} direction="right">
          <Drawer.Trigger className="rounded bg-black px-3 py-1.5 text-sm text-white">
            Open drawer in panel
          </Drawer.Trigger>

          <Drawer.Portal>
            {/* Overlay sits inside the parent — use absolute, not fixed */}
            <Drawer.Overlay className="absolute inset-0 bg-black/30" />
            <Drawer.Content
              className="absolute inset-y-0 right-0 flex w-72 flex-col bg-white shadow-xl outline-none"
              // Vaul defaults to position: fixed; override to absolute so the
              // parent's overflow:hidden actually clips it.
              style={{ position: "absolute" }}
            >
              <div className="p-6">
                <Drawer.Title className="text-lg font-semibold">
                  Panel-scoped drawer
                </Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-gray-600">
                  Lives inside the parent and is clipped by it.
                </Drawer.Description>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}

export default ClippedVaulDrawer;