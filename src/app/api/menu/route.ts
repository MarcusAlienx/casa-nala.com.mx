import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Definir la interfaz para los elementos tal como se espera que estén en el JSON (reflejando el nuevo CSV)
interface RawMenuItem {
  Menu: string; // Categoría principal
  "sub-menu": string; // Subcategoría
  titulo: string; // Nombre del platillo
  descripcion: string; // Detalles del platillo
  Precio: string; // Precio como string, ej: "$60.00"
  "url de imagen": string; // URL de la imagen
}

// Definir la interfaz para los ítems procesados del menú
interface ProcessedMenuItem {
  id: string;
  nombre: string;
  detalles?: string;
  precio: number;
  image: string | null;
}

// Estructura de datos para subcategorías
interface SubMenuData {
  [subCategory: string]: ProcessedMenuItem[];
}

// Estructura de datos principal del menú (categoría -> subcategoría -> ítems)
interface MenuData {
  [category: string]: SubMenuData;
}

export async function GET(request: Request) {
  try {
    const jsonFilePath = path.join(process.cwd(), 'src/app/api/menu/menu.json');

    if (!fs.existsSync(jsonFilePath)) {
      console.error('Error: Menu JSON file not found at', jsonFilePath);
      return NextResponse.json({ error: 'Menu data not found.' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(jsonFilePath, { encoding: 'utf-8' });
    const rawMenuArray: RawMenuItem[] = JSON.parse(fileContent);

    const processedMenu: MenuData = {};
    let itemIdCounter = 0; // Para IDs únicos

    for (const rawItem of rawMenuArray) {
      const categoriaPrincipal = rawItem.Menu || "Sin Categoría";
      const subCategoria = rawItem["sub-menu"] || "General"; // Usar "General" si no hay sub-menú

      if (!processedMenu[categoriaPrincipal]) {
        processedMenu[categoriaPrincipal] = {};
      }
      if (!processedMenu[categoriaPrincipal][subCategoria]) {
        processedMenu[categoriaPrincipal][subCategoria] = [];
      }

      let precioNumerico = NaN;
      if (typeof rawItem.Precio === 'string') {
        precioNumerico = parseFloat(rawItem.Precio.replace('$', '').replace(',', ''));
      } else if (typeof rawItem.Precio === 'number') {
        precioNumerico = rawItem.Precio;
      }

      const menuItem: ProcessedMenuItem = {
        id: `item-${itemIdCounter++}`, // ID único simple
        nombre: rawItem.titulo || 'Platillo sin nombre',
        detalles: rawItem.descripcion || undefined,
        precio: precioNumerico,
        image: rawItem["url de imagen"] || null,
      };

      processedMenu[categoriaPrincipal][subCategoria].push(menuItem);
    }

    return NextResponse.json(processedMenu);

  } catch (error) {
    console.error('Error processing menu data from JSON:', error);
    // Devolver un error genérico
    return NextResponse.json({ error: 'Failed to load menu data.' }, { status: 500 });
  }
}
