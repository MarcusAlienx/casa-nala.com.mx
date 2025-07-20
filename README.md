# Casa Nala - Sitio Web y Menú Digital

¡Bienvenido al proyecto del sitio web de Casa Nala! Esta aplicación, construida con Next.js, no solo sirve como la página de presentación del restaurante, sino que también gestiona un menú digital interactivo y un formulario para realizar pedidos.

## Tabla de Contenidos

- [Visión General del Proyecto](#visión-general-del-proyecto)
- [Cómo Empezar (Desarrollo Local)](#cómo-empezar-desarrollo-local)
- [Cómo Actualizar el Menú](#cómo-actualizar-el-menú)
  - [Estructura del Menú](#estructura-del-menú)
  - [Añadir o Modificar un Platillo](#añadir-o-modificar-un-platillo)
  - [Gestionar Imágenes](#gestionar-imágenes)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue en Netlify](#despliegue-en-netlify)

---

### Visión General del Proyecto

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con [shadcn/ui](https://ui.shadcn.com/)
- **Gestor de Paquetes:** [npm](https://www.npmjs.com/)
- **Hosting:** [Netlify](https://www.netlify.com/)

El proyecto está estructurado para que la actualización del contenido, especialmente el menú, sea lo más sencilla posible, modificando un único archivo.

### Cómo Empezar (Desarrollo Local)

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

1.  **Clona el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/casa-nala.git
    cd casa-nala
    ```

2.  **Configura las Variables de Entorno:**
    -   Crea una copia del archivo `.env.example` y renómbrala a `.env.local`.
    -   Abre `.env.local` y rellena las variables con tus credenciales. Consulta la sección [Variables de Entorno](#variables-de-entorno) para más detalles.

3.  **Instala las Dependencias:**
    Asegúrate de tener Node.js instalado. Luego, ejecuta:
    ```bash
    npm install
    ```

4.  **Inicia el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Abre tu Navegador:**
    Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

---

### Cómo Actualizar el Menú

La gestión del menú es el corazón de este proyecto. Para realizar cualquier cambio, solo necesitas editar un archivo: `src/app/api/menu/menu.json`.

El sistema está diseñado para leer este archivo y construir dinámicamente las secciones y platillos en el sitio web.

#### Estructura del Menú

El archivo `menu.json` es una lista de objetos, donde cada objeto representa un platillo y tiene la siguiente estructura:

```json
{
  "Menu": "DESAYUNOS",
  "sub-menu": "Hot Cakes",
  "titulo": "Hot cakes Naturales (3pzs)",
  "descripcion": "libre de azucar",
  "Precio": "$60.00",
  "url de imagen": "/images/menu/hotcakes_naturales.webp"
}
```

-   `"Menu"`: La categoría principal (ej. "DESAYUNOS", "TRADICIONALES").
-   `"sub-menu"`: La sub-categoría dentro del menú principal (ej. "Hot Cakes", "Tortas Ahogadas").
-   `"titulo"`: El nombre del platillo que se mostrará.
-   `"descripcion"`: Una breve descripción del platillo.
-   `"Precio"`: El precio del platillo, como texto (ej. `"$60.00"`).
-   `"url de imagen"`: La ruta a la imagen del platillo.

#### Añadir o Modificar un Platillo

1.  **Abre el archivo:** `src/app/api/menu/menu.json`.
2.  **Para modificar un platillo existente:** Busca el platillo en la lista y edita los valores de los campos que desees cambiar (por ejemplo, el `"Precio"` o la `"descripcion"`).
3.  **Para añadir un nuevo platillo:**
    -   Copia un objeto existente para mantener la estructura.
    -   Pégalo al final de la lista (o donde prefieras).
    -   Asegúrate de que haya una coma `,` después del objeto anterior.
    -   Modifica todos los campos para reflejar los datos del nuevo platillo. Si pertenece a una nueva categoría o sub-categoría, simplemente escribe el nuevo nombre en los campos `"Menu"` o `"sub-menu"`, y el sistema creará la sección automáticamente.

#### Gestionar Imágenes

1.  **Prepara tu imagen:**
    -   Asegúrate de que la imagen sea de buena calidad pero esté optimizada para la web (formato `.webp` es ideal para un buen balance entre calidad y tamaño).
    -   El nombre del archivo debe ser descriptivo y en minúsculas (ej. `torta_ahogada_pollo.webp`).

2.  **Sube la imagen:**
    -   Coloca tu nueva imagen en la carpeta: `public/images/menu/`.

3.  **Asigna la imagen al platillo:**
    -   En el archivo `menu.json`, busca el platillo correspondiente.
    -   Actualiza el campo `"url de imagen"` para que apunte a tu nueva imagen. La ruta debe empezar con `/images/menu/`. Por ejemplo: `"/images/menu/torta_ahogada_pollo.webp"`.

---

### Variables de Entorno

Para que el formulario de pedidos por correo y el enlace de WhatsApp funcionen, debes configurar las siguientes variables en un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración del servidor de correo (para enviar correos de pedidos)
EMAIL_SERVER_USER=tu_usuario_smtp@example.com
EMAIL_SERVER_PASSWORD=tu_contraseña_smtp
EMAIL_TO=correo_destino_pedidos@example.com

# Configuración SMTP
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=465
EMAIL_SMTP_SECURE=true

# Configuración de WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=521XXXXXXXXXX # Tu número de WhatsApp con código de país
```

**Importante:**
- El archivo `.env.local` **no debe** ser subido a Git. Ya está incluido en `.gitignore`.
- Para Gmail, se recomienda usar una "Contraseña de Aplicación".

---

### Despliegue en Netlify

El proyecto está configurado para un despliegue continuo desde GitHub a Netlify.

1.  **Conecta tu Repositorio:** Asegúrate de que tu repositorio de GitHub esté conectado a tu sitio en Netlify.
2.  **Configuración de Build:** Netlify debería detectar automáticamente que es un proyecto de Next.js. La configuración estándar es:
    -   **Comando de Build:** `npm run build`
    -   **Directorio de Publicación:** `.next`
3.  **Variables de Entorno:**
    -   Ve a la configuración de tu sitio en Netlify → `Build & deploy` → `Environment`.
    -   Añade las mismas variables de entorno que tienes en tu archivo `.env.local`. Esto es **crucial** para que la funcionalidad de correos y WhatsApp funcione en producción.