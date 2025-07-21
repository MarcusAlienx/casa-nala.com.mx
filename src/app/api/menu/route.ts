import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

// Forzar a que esta ruta sea siempre dinámica y no use caché
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const store = getStore("menu");
    const menuData = await store.get("menu", { type: "json" });

    // Si no hay datos en el store, devuelve un objeto vacío.
    // Esto previene errores en el frontend si el menú aún no se ha creado.
    if (!menuData) {
      console.warn(
        "No menu data found in Netlify Blobs, returning empty object.",
      );
      return NextResponse.json({});
    }

    return NextResponse.json(menuData, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching menu from Netlify Blobs:", error);
    return NextResponse.json(
      { error: "Failed to load menu data." },
      { status: 500 },
    );
  }
}
