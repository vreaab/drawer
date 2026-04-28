import SimpleDrawer from "./components/SimpleDrawer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SimpleDrawer
        direction="right"
        height="md"
        title="Panel-scoped drawer"
        description="Lives inside the parent and is clipped by it."
      />
    </div>
  );
}
