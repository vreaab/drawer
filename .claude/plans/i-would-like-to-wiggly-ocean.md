# Open the drawer from inside a component (e.g. a map)

## Context

The user wants a pattern where a component (e.g. a map) hosts a button that opens the drawer, with the drawer clipped to that component's bounds. They asked whether to export `Drawer.Root` to wrap the map.

There are two separable concerns in that question:

1. **Triggering** the drawer from inside the map — already solved by the existing Zustand store (`app/stores/drawerStore.ts`). Any component can call `useDrawerStore((s) => s.openDrawer)()`. No wrapper is needed for triggering.
2. **Visual clipping** of the drawer to the map's bounds — currently `SimpleDrawer` *is* the clip container. Its outer `<div ref={setContainerEl}>` is what Vaul portals into. To clip the drawer to a map's area, the map needs to live inside that container.

The lightest-touch solution is therefore to keep state global (Zustand) and let `SimpleDrawer` accept the map as `children` rendered inside its clip container — no compound `Drawer.Root` refactor required.

## Approach

Refactor `SimpleDrawer` so its `children` prop becomes the clip-container content (map + any in-map UI), and add a separate prop for the drawer body.

### 1. `app/components/SimpleDrawer.tsx`

- **Repurpose `children`** → render inside the clip container (the outer `<div ref={setContainerEl}>`), *outside* the `Drawer.Portal`. This is where the map and its button live.
- **Add `panel` prop** (`ReactNode`) → render inside `Drawer.Content`, replacing the current use of `children` for drawer body content.
- **Remove the built-in `Drawer.Trigger`** and its supporting props (`triggerLabel`, `triggerTone`, `triggerSize`) and the `trigger` cva block. Triggering is decoupled — consumers call Zustand's `openDrawer` from anywhere (already demonstrated in `page.tsx`).
- **Drop the inner `<div className="p-4">` wrapper** so children fill the clip container naturally; consumer controls layout.
- Keep `title`, `description`, `direction`, `height`, the `container` and `content` cva blocks, and the Zustand wiring (`open`, `setOpen`).

Resulting shape (sketch):

```tsx
<div ref={setContainerEl} className={container({ height })}>
  <Drawer.Root open={open} onOpenChange={setOpen} container={containerEl} direction={direction ?? undefined}>
    {children}                       // map + in-map button live here
    <Drawer.Portal>
      <Drawer.Overlay className="absolute inset-0 bg-black/30" />
      <Drawer.Content className={content({ direction })} style={{ position: "absolute" }}>
        <div className="p-6">
          {title && <Drawer.Title ...>{title}</Drawer.Title>}
          {description && <Drawer.Description ...>{description}</Drawer.Description>}
          {panel}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
</div>
```

### 2. `app/page.tsx`

Replace the current demo with the new pattern:

- A placeholder "map" inside `<SimpleDrawer>` (a styled div is enough — no real map library needed).
- A button positioned over the map (e.g. top-right, `absolute`) that calls `useDrawerStore((s) => s.openDrawer)`.
- Pass `title`, `description`, and a `panel` node for drawer body content.

The existing "Open from outside (zustand)" button can stay or be removed — it already proves the global-state point.

## Files to modify

- `/Users/jonathanyngfors/Code/drawer/app/components/SimpleDrawer.tsx`
- `/Users/jonathanyngfors/Code/drawer/app/page.tsx`

## Reused existing code

- `useDrawerStore` from `app/stores/drawerStore.ts` (unchanged) — provides `open`, `setOpen`, `openDrawer`.
- `container` and `content` cva blocks in `SimpleDrawer.tsx` (kept as-is).
- Vaul's `Drawer.Root` / `Portal` / `Overlay` / `Content` / `Title` / `Description` (already imported).

## Why this answers the original question

> *"Should I export `Drawer.Root` to wrap the map?"*

No. Because state is already global via Zustand, you don't need a compound `Drawer.Root` API to share open/close state with an in-map button. And because `SimpleDrawer` already owns the clipping container, the simplest way to clip the drawer to the map's bounds is to let the map render *as children* of `SimpleDrawer`, not the other way around.

## Verification

- `npm run dev`, open `/`.
- Confirm the placeholder map fills the clip container.
- Click the in-map button → drawer slides in from the configured `direction`, clipped to the map's bounds.
- Click overlay → drawer closes (verifies `setOpen` round-trip through Zustand).
- Try changing `direction` (`right` / `left` / `top` / `bottom`) and `height` (`sm` / `md` / `lg`) to confirm variants still work.
