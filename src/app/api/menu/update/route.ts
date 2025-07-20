import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getServerSession } from "next-auth/next";

const jsonFilePath = path.join(process.cwd(), "src/app/api/menu/menu.json");

// --- Interfaces for Transformation ---
interface RawMenuItem {
  Menu: string;
  "sub-menu": string;
  titulo: string;
  descripcion: string;
  Precio: string;
  "url de imagen": string;
  id?: string; // Now expecting ID from frontend
}

interface ProcessedMenuItem {
  id: string; // Mandatory for processed item
  nombre: string;
  detalles?: string;
  precio: number;
  image: string | null;
}

interface SubMenuData {
  [subCategory: string]: ProcessedMenuItem[];
}

interface MenuData {
  [category: string]: SubMenuData;
}

// --- Transformation Function ---
const transformToNestedMenu = (rawItems: RawMenuItem[]): MenuData => {
  const nestedMenu: MenuData = {};

  for (const item of rawItems) {
    const category = item.Menu;
    const subCategory = item["sub-menu"];

    if (!nestedMenu[category]) {
      nestedMenu[category] = {};
    }
    if (!nestedMenu[category][subCategory]) {
      nestedMenu[category][subCategory] = [];
    }

    // Use the existing ID from the raw item, or generate a new one if missing (shouldn't happen for existing items)
    const itemId = item.id || crypto.randomUUID();

    nestedMenu[category][subCategory].push({
      id: itemId,
      nombre: item.titulo,
      detalles: item.descripcion,
      precio: parseFloat(item.Precio),
      image: item["url de imagen"],
    });
  }

  return nestedMenu;
};

// --- API Route ---
export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawMenu: RawMenuItem[] = await request.json();

    if (!Array.isArray(rawMenu)) {
      return NextResponse.json(
        { error: "Invalid menu format. Expected an array." },
        { status: 400 },
      );
    }

    // Transform the flat array back to the nested structure
    const nestedMenu = transformToNestedMenu(rawMenu);

    // Convert the nested menu object back to a JSON string
    const jsonContent = JSON.stringify(nestedMenu, null, 2);

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
