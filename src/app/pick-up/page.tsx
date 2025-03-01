import ActionBar from "@/src/components/action-bar.tsx/action-bar";
import Header from "@/src/components/header/header";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <ActionBar />
    </div>
  );
}
