import fs from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

/**
 * ESTA ES UNA RUTA DE UN SOLO USO PARA POBLAR DATOS (SEEDING).
 * Lee el archivo local menu.json y lo guarda en Netlify Blobs.
 * Una vez que los datos están en Netlify Blobs, esta ruta puede ser eliminada.
 */
export async function GET() {
  try {
    // 1. Definir la ruta al archivo JSON local
    const jsonFilePath = path.join(process.cwd(), "src/app/api/menu/menu.json");

    // 2. Leer el contenido del archivo
    const fileContent = await fs.readFile(jsonFilePath, "utf-8");
    const menuData = JSON.parse(fileContent);

    if (!menuData) {
      return NextResponse.json(
        { error: "El archivo menu.json está vacío o malformado." },
        { status: 400 },
      );
    }

    // 3. Obtener el almacén de Netlify Blobs
    const store = getStore("menu");

    // 4. Guardar los datos como un string JSON en el almacén
    await store.set("menu", JSON.stringify(menuData));

    console.log("¡Datos del menú poblados exitosamente en Netlify Blobs!");
    return NextResponse.json({
      message: "Datos del menú poblados exitosamente en Netlify Blobs.",
    });
  } catch (error) {
    console.error("Error poblando los datos del menú:", error);
    return NextResponse.json(
      { error: "Falló el proceso de poblar los datos (seeding)." },
      { status: 500 },
    );
  }
}
