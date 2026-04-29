"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";
import { Drawer as VaulDrawer } from "vaul";
import { useDrawerStore } from "../stores/drawerStore";

const clip = cva(
  "relative w-full overflow-hidden rounded-lg border bg-gray-50",
  {
    variants: {
      height: {
        sm: "h-64",
        md: "h-96",
        lg: "h-[32rem]",
      },
    },
    defaultVariants: { height: "md" },
  },
);

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

type ClipVariants = VariantProps<typeof clip>;
type PanelVariants = VariantProps<typeof panel>;

type DrawerProps = ClipVariants &
  PanelVariants & {
    children?: ReactNode;
  };

type SlotProps = { children?: ReactNode };

const Surface = ({ children }: SlotProps) => <>{children}</>;
Surface.displayName = "Drawer.Surface";

const Content = ({ children }: SlotProps) => (
  <div className="p-6">{children}</div>
);
Content.displayName = "Drawer.Content";

const findSlot = (children: ReactNode, slot: typeof Surface | typeof Content) =>
  Children.toArray(children).find(
    (child): child is ReactElement =>
      isValidElement(child) && child.type === slot,
  ) ?? null;

const Drawer = ({ height, direction = "right", children }: DrawerProps) => {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const open = useDrawerStore((s) => s.open);
  const setOpen = useDrawerStore((s) => s.setOpen);

  const surface = findSlot(children, Surface);
  const content = findSlot(children, Content);

  return (
    <div ref={setContainerEl} className={clip({ height })}>
      <VaulDrawer.Root
        open={open}
        onOpenChange={setOpen}
        container={containerEl}
        direction={direction ?? undefined}
      >
        {surface}

        <VaulDrawer.Portal>
          <VaulDrawer.Overlay className="absolute inset-0 bg-black/30" />
          <VaulDrawer.Content
            className={panel({ direction })}
            style={{ position: "absolute" }}
          >
            {content}
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      </VaulDrawer.Root>
    </div>
  );
};

Drawer.Surface = Surface;
Drawer.Content = Content;
Drawer.Title = VaulDrawer.Title;
Drawer.Description = VaulDrawer.Description;

export default Drawer;
