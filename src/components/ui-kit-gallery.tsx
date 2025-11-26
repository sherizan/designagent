import { uiKits } from "@/data/ui-kits";
import { UIKitCard } from "./ui-kit-card";

export function UIKitGallery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-100">Featured Kits</h2>
        <span className="text-sm text-zinc-500">{uiKits.length} kits available</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {uiKits.map((kit) => (
          <UIKitCard key={kit.id} kit={kit} />
        ))}
      </div>
    </div>
  );
}
