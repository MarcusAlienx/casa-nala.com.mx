# Casa Nala - Sitio Web y Menú Digital

¡Bienvenido al proyecto del sitio web de Casa Nala! Esta aplicación, construida con Next.js, no solo sirve como la página de presentación del restaurante, sino que también gestiona un menú digital interactivo y un formulario para realizar pedidos.

## Tabla de Contenidos

- [Visión General del Proyecto](#visión-general-del-proyecto)
- [Cómo Empezar (Desarrollo Local)](#cómo-empezar-desarrollo-local)
- [Gestión del Menú](#gestión-del-menú)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue en Netlify](#despliegue-en-netlify)

---

### Visión General del Proyecto

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con [shadcn/ui](https://ui.shadcn.com/)
- **Gestor de Paquetes:** [npm](https://www.npmjs.com/)
- **Base de Datos del Menú:** [Netlify Blobs](https://docs.netlify.com/blobs/overview/)
- **Autenticación:** [NextAuth.js](https://next-auth.js.org/)
- **Hosting:** [Netlify](https://www.netlify.com/)

El proyecto está estructurado para facilitar la gestión del menú a través de un panel de administración protegido.

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

### Gestión del Menú

Para actualizar el menú, ya no es necesario editar archivos JSON manualmente. Ahora se utiliza un panel de administración.

1.  **Accede al Panel de Administración:**
    -   Navega a `[URL_DEL_SITIO]/login`.
    -   Inicia sesión con las credenciales de administrador (configuradas en las variables de entorno).

2.  **Gestiona los Platillos:**
    -   Una vez dentro, verás una interfaz para **añadir, editar y eliminar** platillos del menú.
    -   Puedes cambiar nombres, descripciones, precios, categorías y subcategorías.
    -   También puedes subir nuevas imágenes para los platillos directamente desde el panel.

3.  **Poblar el Menú Inicialmente (Seed):**
    -   Si es la primera vez que configuras el sitio o si necesitas restaurar el menú desde un archivo base, puedes usar la ruta de "seed".
    -   Visita `[URL_DEL_SITIO]/api/menu/seed` en tu navegador. Esto leerá el archivo `menu_seed.json` y poblará la base de datos de Netlify Blobs.
    -   **Advertencia:** Usar esta ruta **sobrescribirá** cualquier cambio que hayas hecho en el menú desde el panel de administración.

---

### Variables de Entorno

Para que el formulario de pedidos, la autenticación y otras funciones operen correctamente, debes configurar las siguientes variables en un archivo `.env.local`:

```env
# Credenciales de Autenticación para el Admin
ADMIN_USER=tu_usuario_admin
ADMIN_PASSWORD=tu_contraseña_admin

# Configuración de NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_seguro # Puedes usar `openssl rand -hex 32`

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

# Configuración de Cloudinary (para imágenes del menú)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
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
    -   Ve a la configuración de tu sitio en Netlify → `Site configuration` → `Environment variables`.
    -   Añade las mismas variables de entorno que tienes en tu archivo `.env.local`. Esto es **crucial** para que todas las funcionalidades operen en producción.
4.  **Habilita Netlify Blobs:**
    -   Ve a la pestaña `Integrations` → `Blobs` y habilita el servicio para tu sitio.
