"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, Smartphone, Monitor } from "lucide-react";

type DeviceType = "none" | "iphone16pro";

export default function PrototypingPage() {
  const [url, setUrl] = useState("https://bacon-job-36140554.figma.site");
  const [loadedUrl, setLoadedUrl] = useState("https://bacon-job-36140554.figma.site");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [device, setDevice] = useState<DeviceType>("none");

  const handleLoad = () => {
    if (url.trim()) {
      // Validate URL is a figma.site URL
      const trimmedUrl = url.trim();
      
      if (trimmedUrl.includes("figma.com/design") || trimmedUrl.includes("figma.com/file")) {
        setError("⚠️ This is a Figma editor URL. Please publish your prototype and use the .figma.site link instead.");
        return;
      }
      
      if (!trimmedUrl.includes("figma.site") && !trimmedUrl.includes("figma.com/proto")) {
        setError("⚠️ Please use a published Figma prototype URL (*.figma.site)");
        return;
      }
      
      setError("");
      setIsLoading(true);
      setLoadedUrl(trimmedUrl);
      // Simulate loading time
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoad();
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto p-6 space-y-6">
        {/* Prototype Viewer */}
        <Card className="overflow-hidden bg-zinc-900 border-zinc-800">
          {/* Browser Controls Bar */}
          <div className="border-b border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-3">
              <div className="flex gap-3 items-center">
                {/* URL Input */}
                <div className="flex-1 flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://your-prototype.figma.site"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-9 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                  />
                  <Button onClick={handleLoad} disabled={!url.trim() || isLoading} size="sm" variant="secondary" className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        Loading
                      </>
                    ) : (
                      "Load"
                    )}
                  </Button>
                  {loadedUrl && (
                    <Button variant="outline" size="sm" asChild className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                      <a
                        href={loadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
                
                {/* Device Settings */}
                <div className="flex gap-2 border-l border-zinc-800 pl-3">
                  <Button
                    variant={device === "none" ? "default" : "outline"}
                    onClick={() => setDevice("none")}
                    size="sm"
                    className={device === "none" ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                  >
                    <Monitor className="h-4 w-4 mr-1.5" />
                    No Device
                  </Button>
                  <Button
                    variant={device === "iphone16pro" ? "default" : "outline"}
                    onClick={() => setDevice("iphone16pro")}
                    size="sm"
                    className={device === "iphone16pro" ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                  >
                    <Smartphone className="h-4 w-4 mr-1.5" />
                    iPhone 16 Pro
                  </Button>
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-400 bg-red-950/30 p-2 mt-2 rounded-md border border-red-900">
                  {error}
                </div>
              )}
            </CardContent>
          </div>
          
          {/* Viewer Area */}
          <CardContent className="p-8">
            <div 
              className="relative w-full flex items-center justify-center bg-zinc-900 rounded-lg" 
              style={{ 
                height: "calc(100vh - 280px)", 
                minHeight: "700px"
              }}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
                </div>
              ) : device === "iphone16pro" ? (
                <div className="relative" style={{ width: "393px", height: "852px" }}>
                  {/* iPhone 16 Pro Frame */}
                  <div className="absolute inset-0 rounded-[55px] bg-black shadow-2xl overflow-hidden border-[14px] border-black">
                    {/* Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-10"></div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-zinc-950 overflow-hidden rounded-[41px] relative">
                      <iframe
                        src={loadedUrl}
                        className="w-full h-full border-0 absolute inset-0"
                        title="Figma Prototype Viewer"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  
                  {/* Side Buttons */}
                  <div className="absolute -left-[2px] top-[120px] w-[3px] h-[32px] bg-black rounded-l-sm z-20"></div>
                  <div className="absolute -left-[2px] top-[170px] w-[3px] h-[62px] bg-black rounded-l-sm z-20"></div>
                  <div className="absolute -left-[2px] top-[245px] w-[3px] h-[62px] bg-black rounded-l-sm z-20"></div>
                  <div className="absolute -right-[2px] top-[190px] w-[3px] h-[88px] bg-black rounded-r-sm z-20"></div>
                </div>
              ) : (
                <iframe
                  src={loadedUrl}
                  className="w-full h-full border-0"
                  title="Figma Prototype Viewer"
                  allowFullScreen
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
