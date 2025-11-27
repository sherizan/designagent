import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { uiKits } from "@/data/ui-kits";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const themeId = searchParams.get("theme");
  const kitId = searchParams.get("kit") || "fitness";

  if (!themeId) {
    return NextResponse.json(
      { error: "Theme ID is required" },
      { status: 400 }
    );
  }

  // Find the kit and theme
  const kit = uiKits.find((k) => k.id === kitId);
  if (!kit || !kit.themes) {
    return NextResponse.json(
      { error: "Kit not found" },
      { status: 404 }
    );
  }

  const theme = kit.themes.find((t) => t.id === themeId);
  if (!theme) {
    return NextResponse.json(
      { error: "Theme not found" },
      { status: 404 }
    );
  }

  try {
    const zip = new JSZip();

    // Path to the base-kit folder
    const baseKitPath = join(process.cwd(), "kits", "fitness", "base-kit");

    // Recursively add files from base-kit to zip
    function addDirectoryToZip(dirPath: string, zipFolder: JSZip) {
      try {
        const entries = readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dirPath, entry.name);

          if (entry.isDirectory()) {
            const subFolder = zipFolder.folder(entry.name);
            if (subFolder) {
              addDirectoryToZip(fullPath, subFolder);
            }
          } else {
            const fileContent = readFileSync(fullPath);
            zipFolder.file(entry.name, fileContent);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error);
        throw error;
      }
    }

    // Check if base-kit folder exists
    try {
      const baseKitStats = statSync(baseKitPath);
      if (!baseKitStats.isDirectory()) {
        throw new Error("base-kit path is not a directory");
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Fitness UI Kit source folder not found" },
        { status: 404 }
      );
    }

    // Add all files from base-kit to zip
    addDirectoryToZip(baseKitPath, zip);

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: "nodebuffer" });

    // Return as download
    const filename = `fitness-${themeId}.zip`;
    return new NextResponse(zipBlob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating zip file:", error);
    return NextResponse.json(
      { error: "Failed to generate download file" },
      { status: 500 }
    );
  }
}
