import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getServerSession } from "next-auth/next";

const jsonFilePath = path.join(process.cwd(), "src/app/api/menu/menu.json");

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedMenu = await request.json();

    // Basic validation (you can add more robust validation here)
    if (!Array.isArray(updatedMenu)) {
      return NextResponse.json(
        { error: "Invalid menu format" },
        { status: 400 },
      );
    }

    // Convert the menu object back to a JSON string
    const jsonContent = JSON.stringify(updatedMenu, null, 2);

    // Write the new content to the menu.json file
    await fs.writeFile(jsonFilePath, jsonContent, "utf8");

    return NextResponse.json({ message: "Menu updated successfully" });
  } catch (error) {
    console.error("Error updating menu:", error);
    return NextResponse.json(
      { error: "Failed to update menu" },
      { status: 500 },
    );
  }
}
