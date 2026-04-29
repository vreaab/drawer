"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { useDrawerStore } from "../stores/drawerStore";

const panel = cva("absolute flex flex-col bg-white shadow-xl outline-none", {
  variants: {
    direction: {
      right: "inset-y-0 right-0 w-72",
      left: "inset-y-0 left-0 w-72",
      top: "inset-x-0 top-0 h-72",
      bottom: "inset-x-0 bottom-0 h-72",
    },
  },
  defaultVariants: { direction: "right" },
});

type PanelVariants = VariantProps<typeof panel>;

type PortalDrawerProps = PanelVariants & {
  container: HTMLElement | null;
  children?: ReactNode;
};

const Content = ({ children }: { children?: ReactNode }) => (
  <div className="p-6">{children}</div>
);
Content.displayName = "PortalDrawer.Content";

const PortalDrawer = ({
  container,
  direction = "right",
  children,
}: PortalDrawerProps) => {
  const open = useDrawerStore((s) => s.open);
  const setOpen = useDrawerStore((s) => s.setOpen);

  if (!container) return null;

  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={setOpen}
      container={container}
      direction={direction ?? undefined}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="absolute inset-0 bg-black/30" />
        <VaulDrawer.Content
          className={panel({ direction })}
          style={{ position: "absolute" }}
        >
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};

PortalDrawer.Content = Content;
PortalDrawer.Title = VaulDrawer.Title;
PortalDrawer.Description = VaulDrawer.Description;

export default PortalDrawer;
