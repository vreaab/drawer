"use client";

import SimpleDrawer from "./components/SimpleDrawer";
import { useDrawerStore } from "./stores/drawerStore";

export default function Home() {
  const openDrawer = useDrawerStore((s) => s.openDrawer);

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <button
        type="button"
        onClick={openDrawer}
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
      >
        Open from outside (zustand)
      </button>
      <SimpleDrawer
        direction="right"
        height="md"
        title="Panel-scoped drawer"
        description="Lives inside the parent and is clipped by it."
      />
    </div>
  );
}
