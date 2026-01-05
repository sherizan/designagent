import Link from "next/link";
import { Sparkles, Settings, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">DesignAgent</h1>
        <p className="text-zinc-600 mb-8">
          Local-first UI contract engine for AI-native development
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg hover:from-violet-600 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25"
          >
            <Sparkles className="w-4 h-4" />
            Create Theme
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/editor"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Open Editor
          </Link>
        </div>
      </div>
    </div>
  );
}
