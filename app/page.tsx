"use client";

import Drawer from "./components/Drawer";
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
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="w-full max-w-3xl">
        <Drawer direction="right" height="lg">
          <Drawer.Surface>
            <FakeMap />
          </Drawer.Surface>
          <Drawer.Content>
            <Drawer.Title className="text-lg font-semibold">
              Map details
            </Drawer.Title>
            <Drawer.Description className="mt-1 text-sm text-gray-600">
              The drawer is clipped to the map&apos;s bounds.
            </Drawer.Description>
            <p className="mt-4 text-sm text-gray-700">
              Populate this with anything. State is global via Zustand, so the
              in-map button doesn&apos;t need to be wrapped by anything.
            </p>
          </Drawer.Content>
        </Drawer>
      </div>
    </div>
  );
}
