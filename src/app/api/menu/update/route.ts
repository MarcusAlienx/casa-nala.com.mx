import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// --- Interfaces (se mantienen igual) ---
interface RawMenuItem {
  Menu: string;
  "sub-menu": string;
  titulo: string;
  descripcion: string;
  Precio: string;
  "url de imagen": string;
  id?: string;
}

interface ProcessedMenuItem {
  id: string;
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

// --- Función de Transformación (se mantiene igual) ---
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
    const itemId = item.id || crypto.randomUUID();
    nestedMenu[category][subCategory].push({
      id: itemId,
      nombre: item.titulo,
      detalles: item.descripcion,
      precio: Number.parseFloat(item.Precio),
      image: item["url de imagen"],
    });
  }
  return nestedMenu;
};

// --- Ruta de la API ---
export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("\n--- SERVER: UPDATE REQUEST RECEIVED ---");
    const rawMenu: RawMenuItem[] = await request.json();
    console.log(
      "SERVER: 1. Parsed raw menu from client:",
      JSON.stringify(rawMenu, null, 2),
    );

    if (!Array.isArray(rawMenu)) {
      return NextResponse.json(
        { error: "Invalid menu format. Expected an array." },
        { status: 400 },
      );
    }

    const nestedMenu = transformToNestedMenu(rawMenu);
    console.log("SERVER: 2. Transformed to nested menu for saving.");

    // Guardar el menú como un string JSON en Netlify Blobs
    const store = getStore("menu");
    await store.set("menu", JSON.stringify(nestedMenu));
    console.log("SERVER: 3. Data sent to Netlify Blobs.");

    // Leer los datos inmediatamente después de guardarlos para confirmar
    const updatedMenuData = await store.get("menu", { type: "json" });
    console.log("SERVER: 4. Confirmed data retrieved from Blobs.");

    console.log("SERVER: 5. Sending updated data back to client.");
    return NextResponse.json({
      message: "Menu updated successfully",
      updatedData: updatedMenuData, // Devolver los datos actualizados
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    return NextResponse.json(
      { error: "Failed to update menu" },
      { status: 500 },
    );
  }
}
