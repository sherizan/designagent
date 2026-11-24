import { redirect } from "next/navigation";
import { getBridge } from "@/lib/marketplace";

/** There is one plugin, so the index is its page. */
export default function PluginsPage() {
  const bridge = getBridge();
  redirect(bridge ? `/plugins/${bridge.slug}` : "/");
}
