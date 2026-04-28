"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";

const container = cva(
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

const trigger = cva("rounded text-white", {
  variants: {
    tone: {
      black: "bg-black",
      blue: "bg-blue-600",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
    },
  },
  defaultVariants: { tone: "black", size: "md" },
});

const content = cva(
  "absolute flex flex-col bg-white shadow-xl outline-none",
  {
    variants: {
      direction: {
        right: "inset-y-0 right-0 w-72",
        left: "inset-y-0 left-0 w-72",
        top: "inset-x-0 top-0 h-72",
        bottom: "inset-x-0 bottom-0 h-72",
      },
    },
    defaultVariants: { direction: "right" },
  },
);

type ContainerVariants = VariantProps<typeof container>;
type TriggerVariants = VariantProps<typeof trigger>;
type ContentVariants = VariantProps<typeof content>;

type ClippedVaulDrawerProps = ContainerVariants &
  ContentVariants & {
    triggerTone?: TriggerVariants["tone"];
    triggerSize?: TriggerVariants["size"];
  };

const ClippedVaulDrawer = ({
  height,
  direction = "right",
  triggerTone,
  triggerSize,
}: ClippedVaulDrawerProps = {}) => {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainerEl} className={container({ height })}>
      <div className="p-4">
        <Drawer.Root container={containerEl} direction={direction ?? undefined}>
          <Drawer.Trigger
            className={trigger({ tone: triggerTone, size: triggerSize })}
          >
            Open drawer in panel
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="absolute inset-0 bg-black/30" />
            <Drawer.Content
              className={content({ direction })}
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
};

export default ClippedVaulDrawer;
