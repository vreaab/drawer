"use client";

import { useState } from "react";
import PortalDrawer from "./components/PortalDrawer";
import { useDrawerStore } from "./stores/drawerStore";

function FakeMap() {
  const openDrawer = useDrawerStore((s) => s.openDrawer);

  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_30%_30%,#bae6fd,transparent_60%),radial-gradient(circle_at_70%_70%,#86efac,transparent_60%),linear-gradient(135deg,#f0f9ff,#ecfccb)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      <button
        type="button"
        onClick={openDrawer}
        className="absolute top-3 right-3 rounded bg-black px-3 py-1.5 text-sm text-white shadow"
      >
        Show details
      </button>
    </div>
  );
}

export default function Home() {
  const [mapEl, setMapEl] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="w-full max-w-3xl">
        <div
          ref={setMapEl}
          className="relative h-[32rem] w-full overflow-hidden rounded-lg border bg-gray-50"
        >
          <FakeMap />
        </div>
        <PortalDrawer container={mapEl} direction="right">
          <PortalDrawer.Content>
            <PortalDrawer.Title className="text-lg font-semibold">
              Map details
            </PortalDrawer.Title>
            <PortalDrawer.Description className="mt-1 text-sm text-gray-600">
              The drawer is clipped to the map&apos;s bounds.
            </PortalDrawer.Description>
            <p className="mt-4 text-sm text-gray-700">
              The map isn&apos;t wrapped by the drawer — we pass the element
              reference instead.
            </p>
          </PortalDrawer.Content>
        </PortalDrawer>
      </div>
    </div>
  );
}
