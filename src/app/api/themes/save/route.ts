import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const themeData = await request.json();

    // Validate theme data
    if (!themeData.id || !themeData.theme) {
      return NextResponse.json(
        { error: "Invalid theme data" },
        { status: 400 }
      );
    }

    // Save to public/themes directory so MCP can read it
    const themesDir = join(process.cwd(), "public", "themes");
    try {
      await mkdir(themesDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const filePath = join(themesDir, `${themeData.id}.json`);
    await writeFile(filePath, JSON.stringify(themeData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Theme saved successfully",
      path: `/themes/${themeData.id}.json`,
    });
  } catch (error) {
    console.error("Failed to save theme:", error);
    return NextResponse.json(
      { error: "Failed to save theme" },
      { status: 500 }
    );
  }
}

