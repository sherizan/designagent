import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">DesignAgent</h1>
        <p className="text-zinc-600 mb-8">
          Local-first UI contract engine for AI-native development
        </p>
        <Link
          href="/editor"
          className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Open Editor
        </Link>
      </div>
    </div>
  );
}
