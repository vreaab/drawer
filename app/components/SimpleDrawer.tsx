"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useState } from "react";
import { Drawer } from "vaul";
import { useDrawerStore } from "../stores/drawerStore";

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

const content = cva("absolute flex flex-col bg-white shadow-xl outline-none", {
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

type ContainerVariants = VariantProps<typeof container>;
type ContentVariants = VariantProps<typeof content>;

type ClippedVaulDrawerProps = ContainerVariants &
  ContentVariants & {
    title?: ReactNode;
    description?: ReactNode;
    panel?: ReactNode;
    children?: ReactNode;
  };

const ClippedVaulDrawer = ({
  height,
  direction = "right",
  title,
  description,
  panel,
  children,
}: ClippedVaulDrawerProps = {}) => {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const open = useDrawerStore((s) => s.open);
  const setOpen = useDrawerStore((s) => s.setOpen);

  return (
    <div ref={setContainerEl} className={container({ height })}>
      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        container={containerEl}
        direction={direction ?? undefined}
      >
        {children}

        <Drawer.Portal>
          <Drawer.Overlay className="absolute inset-0 bg-black/30" />
          <Drawer.Content
            className={content({ direction })}
            style={{ position: "absolute" }}
          >
            <div className="p-6">
              {title ? (
                <Drawer.Title className="text-lg font-semibold">
                  {title}
                </Drawer.Title>
              ) : null}
              {description ? (
                <Drawer.Description className="mt-1 text-sm text-gray-600">
                  {description}
                </Drawer.Description>
              ) : null}
              {panel}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default ClippedVaulDrawer;
