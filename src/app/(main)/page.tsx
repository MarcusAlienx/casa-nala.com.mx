"use client";

// Importar iconos para colapsar/expandir
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react"; // Added useRef

// MapDisplay import remains for other parts of the page if needed elsewhere,
// but it's not directly used in the menu section itself.
// const MapDisplay = dynamic(() => import('@/components/MapDisplay'), {
//   ssr: false,
//   loading: () => <p>Cargando mapa...</p>,
// });

// --- FONT IMPORTS REMOVED ---

// --- Eliminado: Menu Data Codificado ---
// const menuDataFromCSV = { ... };

// Prevent hydration mismatch by ensuring state is only set on client
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

// Opciones de entrega (sin cambios)
const opcionesEntrega = [
  { id: "recoger", nombre: "Recoger en tienda", costo: 0, logo: null },
  { id: "domicilio", nombre: "Servicio a Domicilio", costo: 40, logo: null },
  { id: "rappi", nombre: "Rappi", costo: 0, logo: "/logos/rappi.avif" },
  {
    id: "ubereats",
    nombre: "Uber Eats",
    costo: 0,
    logo: "/logos/uber_eats.avif",
  },
  { id: "didi", nombre: "DiDi Food", costo: 0, logo: "/logos/didi_food.avif" },
];

// Definición del tipo para los items procesados del menú (debe coincidir con ProcessedMenuItem de la API)
interface ProcessedMenuItem {
  id: string;
  nombre: string;
  detalles?: string;
  precio: number; // Ya es un número procesado por la API
  image: string | null;
}

// Estructura de datos para subcategorías, donde cada subcategoría es un string
interface SubMenuData {
  [subCategory: string]: ProcessedMenuItem[];
}

// Nueva estructura de datos principal del menú (categoría -> subcategoría -> ítems)
interface MenuData {
  [category: string]: SubMenuData;
}

// Tipo para los items en el carrito, basado en ProcessedMenuItem
type CarritoItem = ProcessedMenuItem & { cantidad: number };

// Iconos SVG como componentes de React (definidos fuera del componente Home)
// Tamaño por defecto ajustado para ser más pequeño, margen ajustado
const IconMapPin = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001zm.612-1.426a5.02 5.02 0 00-7.002 0C3.503 17.968 3 18.495 3 19s.503 1.032.902.574a4.999 4.999 0 007.196 0c.399.458.902.074.902-.574s-.503-1.032-.902-.574zM10 2a5 5 0 00-5 5c0 3.564 4.204 8.09 5 9.434 1.058-1.668 5-6.168 5-9.434a5 5 0 00-5-5zM10 9a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const IconWhatsApp = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 3.67c4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21h-.01c-1.53 0-3.01-.42-4.31-1.19l-.31-.18-3.21.84.86-3.12-.2-.33a8.17 8.17 0 0 1-1.26-4.42c0-4.52 3.69-8.21 8.21-8.21m5.02 10.29c-.28-.14-1.64-.81-1.89-.9s-.43-.14-.62.14-.71.9-.88 1.08-.32.19-.59.07c-.28-.12-1.17-.43-2.23-1.37-.83-.73-1.39-1.63-1.55-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.11-.13.14-.23.22-.38.07-.14.04-.28-.02-.42s-.62-1.48-.85-2.02c-.22-.54-.45-.47-.62-.47h-.52c-.19 0-.49.07-.74.35-.25.28-.96.94-.96 2.29 0 1.35.99 2.65 1.13 2.83.14.19 1.95 2.98 4.74 4.19 2.79 1.21 2.79.81 3.3.78.5-.04 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32Z" />
  </svg>
);

const IconEnvelope = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const IconGlobeAlt = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 3c2.485 0 4.5 4.03 4.5 9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
    />
  </svg>
);

export default function Home() {
  const isClient = useIsClient();
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const [isCartExpanded, setIsCartExpanded] = useState(false); // Estado para expandir/colapsar el carrito

  // --- Estados para el menú y carga ---
  const [menuData, setMenuData] = useState<MenuData | null>(null); // Tipo actualizado para la nueva estructura anidada
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  // ---

  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [paso, setPaso] = useState<"menu" | "datos" | "confirmacion">("menu");
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    telefono: "",
    horario: "",
    comentarios: "",
  });
  const [opcionEntrega, setOpcionEntrega] = useState<string>("recoger");
  const [showDeliveryInfoModal, setShowDeliveryInfoModal] = useState(false); // Estado para el modal de info de entrega
  const [direccionEntrega, setDireccionEntrega] = useState({
    calle: "",
    numero: "",
    colonia: "",
    codigoPostal: "",
    referencias: "",
  });

  // --- useEffect para cargar el menú desde la API ---
  useEffect(() => {
    if (isClient) {
      // Solo cargar en el cliente
      const fetchMenu = async () => {
        setIsLoadingMenu(true);
        setMenuError(null);
        try {
          const response = await fetch("/api/menu");
          if (!response.ok) {
            throw new Error(`Error al cargar el menú: ${response.statusText}`);
          }
          const data: MenuData = await response.json();
          setMenuData(data);
        } catch (error) {
          console.error("Error fetching menu:", error);
          setMenuError(
            error instanceof Error
              ? error.message
              : "Error desconocido al cargar el menú.",
          );
        } finally {
          setIsLoadingMenu(false);
        }
      };
      fetchMenu();
    }
  }, [isClient]); // Dependencia isClient para asegurar que se ejecute en el cliente
  // ---

  // Calculador del subtotal y total del pedido
  const calcularSubtotal = () =>
    carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const costoEnvio = opcionEntrega === "domicilio" ? 40 : 0;
    return subtotal + costoEnvio;
  };

  // Funciones del carrito (actualizadas para ProcessedMenuItem)
  const agregar = (platillo: ProcessedMenuItem) => {
    // Tipo de platillo actualizado
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === platillo.id);
      if (existe) {
        return prev.map((item) =>
          item.id === platillo.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...platillo, cantidad: 1 }];
    });
  };
  const quitar = (platillo: ProcessedMenuItem) => {
    // Tipo de platillo actualizado
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === platillo.id);
      if (!existe) return prev;
      if (existe.cantidad === 1)
        return prev.filter((item) => item.id !== platillo.id);
      return prev.map((item) =>
        item.id === platillo.id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item,
      );
    });
  };
  const quitarItemCarrito = (itemId: string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Manejadores de input y navegación de pasos (sin cambios)
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDatosCliente((prev) => ({ ...prev, [name]: value }));
  };
  const irAlInicio = () => {
    setPaso("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const continuarAPaso2 = () => {
    if (carrito.length > 0) {
      setPaso("datos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const confirmarPedido = async () => {
    // <--- Añadido async aquí
    if (!datosCliente.nombre || !datosCliente.telefono || !datosCliente.horario)
      return;
    if (
      opcionEntrega === "domicilio" &&
      (!direccionEntrega.calle ||
        !direccionEntrega.numero ||
        !direccionEntrega.colonia ||
        !direccionEntrega.codigoPostal)
    ) {
      alert("Por favor completa todos los campos de dirección de entrega");
      return;
    }
    // setPaso('confirmacion'); // Se moverá después de la llamada al API
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    // Construir el payload para la API
    const orderPayload = {
      carrito,
      datosCliente,
      opcionEntrega,
      direccionEntrega:
        opcionEntrega === "domicilio" ? direccionEntrega : undefined,
      totalPedido: calcularTotal(),
    };

    try {
      const response = await fetch("/api/enviar-pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        // const result = await response.json();
        // console.log('Respuesta de la API:', result.message);
        setPaso("confirmacion");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // const errorResult = await response.json();
        console.error("Error al enviar el pedido:", response.statusText);
        alert(
          "Hubo un problema al enviar tu pedido por correo. Por favor, intenta notificarlo por WhatsApp o contacta al restaurante.",
        );
        // Opcionalmente, podrías decidir si continuar a la pantalla de confirmación de todas formas
        // o mantener al usuario en la pantalla de datos. Por ahora, se queda en la pantalla de datos.
      }
    } catch (error) {
      console.error("Error de red o al construir la petición:", error);
      alert(
        "Error de conexión al intentar enviar tu pedido. Por favor, revisa tu conexión e inténtalo de nuevo.",
      );
    }
  };
  const volverAMenu = () => {
    setPaso("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const vaciarCarrito = () => {
    setCarrito([]);
    setPaso("menu");
    setDatosCliente({ nombre: "", telefono: "", horario: "", comentarios: "" });
    setOpcionEntrega("recoger");
    setDireccionEntrega({
      calle: "",
      numero: "",
      colonia: "",
      codigoPostal: "",
      referencias: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para scroll suave a la categoría (sin cambios)
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Estado para la categoría activa

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId); // Establecer categoría activa
    const element = document.getElementById(categoryId);
    if (element) {
      // Ajustar el offset si el menú de subcategorías (aún no implementado) fuera visible y tuviera altura
      const subMenuHeight = activeCategory ? 50 : 0; // Altura estimada del futuro menú de subcategorías
      const headerOffset = 150 + subMenuHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Skeleton loading (sin cambios)
  if (!isClient) {
    return (
      <main className="min-h-screen bg-[#F5E8D2] flex items-center justify-center">
        <div className="text-[#6C3A3A] text-2xl">Cargando Casa NALA...</div>
      </main>
    );
  }

  // --- Renderizado del Componente ---
  return (
    <main className="min-h-screen bg-[#F5E8D2] pb-24">
      {/* Hero (sin cambios) */}
      <section className="bg-[#F5E8D2] flex flex-col items-center text-[#6C3A3A] py-6">
        <div
          className={
            "mt-2 text-4xl font-light tracking-[0.15em] font-poiret-one"
          }
        >
          CASA NALA
        </div>
        <div className={"text-xl italic mt-1 text-[#9DA17B] font-amatic-sc"}>
          Comida de México
        </div>
      </section>

      {/* Sección de Proceso de Pedido (sin cambios) */}
      <section id="pedidos" className="max-w-4xl mx-auto mt-4 px-4">
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-3xl flex items-center justify-between">
            <div
              className={`flex flex-col items-center ${paso === "menu" ? "text-[#6C3A3A] font-bold" : "text-[#9DA17B]"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border-2 ${paso === "menu" ? "bg-[#6C3A3A] text-white border-[#6C3A3A]" : "bg-transparent border-[#9DA17B] text-[#9DA17B]"}`}
              >
                1
              </div>
              <div>Elegir Platillos</div>
            </div>
            <div
              className={`h-0.5 flex-1 mx-2 ${paso === "menu" ? "bg-[#D9D4CE]" : "bg-[#9DA17B]"}`}
            />
            <div
              className={`flex flex-col items-center ${paso === "datos" ? "text-[#6C3A3A] font-bold" : "text-[#9DA17B]"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border-2 ${paso === "datos" ? "bg-[#6C3A3A] text-white border-[#6C3A3A]" : "bg-transparent border-[#9DA17B] text-[#9DA17B]"}`}
              >
                2
              </div>
              <div>Tus Datos</div>
            </div>
            <div
              className={`h-0.5 flex-1 mx-2 ${paso === "confirmacion" ? "bg-[#9DA17B]" : "bg-[#D9D4CE]"}`}
            />
            <div
              className={`flex flex-col items-center ${paso === "confirmacion" ? "text-[#6C3A3A] font-bold" : "text-[#9DA17B]"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border-2 ${paso === "confirmacion" ? "bg-[#6C3A3A] text-white border-[#6C3A3A]" : "bg-transparent border-[#9DA17B] text-[#9DA17B]"}`}
              >
                3
              </div>
              <div>Confirmación</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Menú Actualizado - Paso 1 --- */}
      {paso === "menu" && (
        <section id="menu-completo" className="max-w-6xl mx-auto px-4">
          {/* --- Indicador de Carga o Error --- */}
          {isLoadingMenu && (
            <div className="text-center py-10 text-[#6C3A3A]">
              Cargando menú...
            </div>
          )}
          {menuError && (
            <div className="text-center py-10 text-red-600">
              Error al cargar el menú: {menuError}
            </div>
          )}
          {/* --- Fin Indicador --- */}

          {/* Menú Corredizo y Contenido (solo si hay datos y no hay error) */}
          {!isLoadingMenu && !menuError && menuData && (
            <>
              {/* Menú Corredizo de Categorías y Subcategorías */}
              <div className="sticky top-[84px] z-30 bg-[#F5E8D2] py-3 mb-2 shadow-sm">
                {/* Categorías Principales */}
                <div className="max-w-4xl mx-auto flex justify-center space-x-4 px-4 overflow-x-auto whitespace-nowrap mb-2">
                  {Object.keys(menuData).map((categoria) => (
                    <button
                      key={categoria}
                      onClick={() => scrollToCategory(categoria)}
                      className={`px-4 py-1.5 rounded-full text-sm font-bold transition font-poiret-one tracking-wider border ${activeCategory === categoria ? "bg-[#D7A556] text-white border-[#D7A556]" : "bg-[#6C3A3A] text-white border-[#6C3A3A] hover:bg-white hover:text-[#6C3A3A] hover:border-[#D9D4CE]"}`}
                      type="button"
                    >
                      {categoria.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
                {/* Subcategorías (si hay categoría activa) */}
                {activeCategory && menuData[activeCategory] && (
                  <div className="max-w-3xl mx-auto flex justify-start space-x-3 px-4 overflow-x-auto whitespace-nowrap mt-1 pt-1 border-t border-[#D9D4CE]/50">
                    {" "}
                    {/* Cambiado justify-center a justify-start */}
                    {Object.keys(menuData[activeCategory]).map(
                      (subCategoriaKey) => (
                        <button
                          key={subCategoriaKey}
                          onClick={() => {
                            if (
                              menuData &&
                              activeCategory &&
                              menuData[activeCategory] &&
                              menuData[activeCategory][subCategoriaKey]
                            ) {
                              const itemsInSubCategory =
                                menuData[activeCategory][subCategoriaKey];
                              if (itemsInSubCategory.length > 0) {
                                const firstItemId = itemsInSubCategory[0].id;
                                const elementToScrollTo =
                                  document.getElementById(
                                    `platillo-${firstItemId}`,
                                  );
                                if (elementToScrollTo) {
                                  const headerOffset = 200; // Ajustar según altura de headers (categorías + subcategorías)
                                  const elementPosition =
                                    elementToScrollTo.getBoundingClientRect()
                                      .top + window.pageYOffset;
                                  const offsetPosition =
                                    elementPosition - headerOffset;
                                  window.scrollTo({
                                    top: offsetPosition,
                                    behavior: "smooth",
                                  });
                                } else {
                                  console.log(
                                    `Elemento platillo-${firstItemId} no encontrado para scroll.`,
                                  );
                                }
                              }
                            }
                          }}
                          className={
                            "px-3 py-1 rounded-full text-xs font-bold transition font-poiret-one tracking-wider border bg-[#9DA17B] text-white hover:bg-transparent hover:text-[#9DA17B] hover:border-[#9DA17B]"
                          }
                          type="button"
                        >
                          {subCategoriaKey.replace(/_/g, " ")}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Contenedor de Secciones del Menú */}
              <div ref={menuContainerRef}>
                {Object.entries(menuData).map(
                  ([categoriaPrincipal, subMenuDataObject]) => {
                    // Aplanar todos los platillos de esta categoría principal
                    const todosLosPlatillosDeCategoria =
                      Object.values(subMenuDataObject).flat();

                    return (
                      <section
                        key={categoriaPrincipal}
                        id={categoriaPrincipal}
                        className="mb-12 pt-4"
                      >
                        <h2
                          className={
                            "text-3xl font-bold text-[#6C3A3A] tracking-wider mb-6 border-b-2 border-[#D7A556] pb-2 font-poiret-one"
                          }
                        >
                          {categoriaPrincipal.replace(/_/g, " ")}
                        </h2>
                        {/* Anclas invisibles para subcategorías si se quieren usar para scroll */}
                        {Object.keys(subMenuDataObject).map(
                          (subCategoriaKey) => (
                            <div
                              key={`${categoriaPrincipal}-${subCategoriaKey}-anchor`}
                              id={`${categoriaPrincipal}-${subCategoriaKey.replace(/\s+/g, "_")}-anchor`}
                            />
                          ),
                        )}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {todosLosPlatillosDeCategoria.map((platillo) => (
                            <div
                              key={platillo.id}
                              id={`platillo-${platillo.id}`} // ID añadido para el scroll
                              className="rounded-xl bg-[#fff] shadow p-4 flex flex-col border border-[#D9D4CE] transition hover:shadow-lg"
                            >
                              <Image
                                src={
                                  platillo.image ||
                                  "/images/menu/logonala-menu.avif"
                                } // Fallback image
                                width={150}
                                height={150}
                                alt={platillo.nombre}
                                className="rounded bg-[#F5E8D2] mb-3 object-cover self-center"
                              />
                              <div className="flex-grow flex flex-col">
                                <h3 className="font-semibold text-lg text-[#6C3A3A] mb-1">
                                  {platillo.nombre}
                                </h3>
                                {platillo.detalles && (
                                  <p className="text-xs text-gray-600 mb-2 flex-grow">
                                    {platillo.detalles}
                                  </p>
                                )}
                                <div className="mt-auto">
                                  <div className="font-bold text-[#D7A556] text-xl mb-3">
                                    {typeof platillo.precio === "number" &&
                                    !Number.isNaN(platillo.precio)
                                      ? `$${platillo.precio.toFixed(2)}`
                                      : "Precio no disponible"}
                                  </div>
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      className="px-3 py-1 rounded bg-[#9DA17B] text-white font-semibold text-lg"
                                      onClick={() => agregar(platillo)}
                                      aria-label={`Agregar ${platillo.nombre}`}
                                      type="button"
                                    >
                                      {" "}
                                      +{" "}
                                    </button>
                                    <button
                                      className="px-3 py-1 rounded bg-[#d7a556] text-white font-semibold text-lg"
                                      onClick={() => quitar(platillo)}
                                      aria-label={`Quitar ${platillo.nombre}`}
                                      type="button"
                                    >
                                      {" "}
                                      -{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    );
                  },
                )}
              </div>
            </>
          )}
        </section>
      )}

      {/* Paso 2: Formulario de datos del cliente (sin cambios) */}
      {paso === "datos" && (
        <section className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md mt-4">
          {/* ... (código del formulario sin cambios) ... */}
          <h2
            className={"text-2xl font-bold text-[#6C3A3A] mb-4 font-poiret-one"}
          >
            Tus datos para recoger
          </h2>
          <form className="space-y-4">
            {/* Opción de entrega */}
            <div>
              <label
                htmlFor="opcionEntrega"
                className="block text-[#6C3A3A] font-medium mb-1"
              >
                ¿Cómo quieres recibir tu pedido?
              </label>
              <select
                id="opcionEntrega"
                name="opcionEntrega"
                value={opcionEntrega}
                onChange={(e) => {
                  const newOpcionEntrega = e.target.value;
                  setOpcionEntrega(newOpcionEntrega);
                  if (newOpcionEntrega === "domicilio") {
                    setShowDeliveryInfoModal(true);
                    document.body.style.overflow = "hidden";
                    // Establecer un valor por defecto para horario, ya que se ocultará
                    setDatosCliente((prev) => ({
                      ...prev,
                      horario: "DOMICILIO_ASAP",
                    }));
                  } else {
                    // Limpiar horario si se cambia a recoger, para que el usuario seleccione
                    setDatosCliente((prev) => ({ ...prev, horario: "" }));
                  }
                }}
                className="w-full p-2 border border-[#D9D4CE] rounded bg-[#F5E8D2] focus:outline-none"
              >
                {opcionesEntrega.map((opcion) => (
                  <option key={opcion.id} value={opcion.id}>
                    {/* Modificado para que el texto de la opción ya incluya el costo si es necesario */}
                    {opcion.id === "domicilio"
                      ? "Servicio a Domicilio +$40"
                      : opcion.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Si opción de entrega es domicilio, mostrar campos de dirección */}
            {opcionEntrega === "domicilio" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5E8D2] p-4 rounded">
                <div>
                  <label className="block text-[#6C3A3A] font-medium mb-1">
                    Calle
                  </label>
                  <input
                    type="text"
                    name="calle"
                    value={direccionEntrega.calle}
                    onChange={(e) =>
                      setDireccionEntrega((prev) => ({
                        ...prev,
                        calle: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-[#D9D4CE] rounded focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6C3A3A] font-medium mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    name="numero"
                    value={direccionEntrega.numero}
                    onChange={(e) =>
                      setDireccionEntrega((prev) => ({
                        ...prev,
                        numero: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-[#D9D4CE] rounded focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6C3A3A] font-medium mb-1">
                    Colonia
                  </label>
                  <input
                    type="text"
                    name="colonia"
                    value={direccionEntrega.colonia}
                    onChange={(e) =>
                      setDireccionEntrega((prev) => ({
                        ...prev,
                        colonia: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-[#D9D4CE] rounded focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6C3A3A] font-medium mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={direccionEntrega.codigoPostal}
                    onChange={(e) =>
                      setDireccionEntrega((prev) => ({
                        ...prev,
                        codigoPostal: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-[#D9D4CE] rounded focus:outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#6C3A3A] font-medium mb-1">
                    Referencias
                  </label>
                  <input
                    type="text"
                    name="referencias"
                    value={direccionEntrega.referencias}
                    onChange={(e) =>
                      setDireccionEntrega((prev) => ({
                        ...prev,
                        referencias: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-[#D9D4CE] rounded focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-[#6C3A3A] font-medium mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datosCliente.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D9D4CE] rounded bg-[#F5E8D2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-[#6C3A3A] font-medium mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={datosCliente.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D9D4CE] rounded bg-[#F5E8D2] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Campo de Horario: Se oculta si es servicio a domicilio */}
            {opcionEntrega !== "domicilio" && (
              <div>
                <label
                  htmlFor="horario"
                  className="block text-[#6C3A3A] font-medium mb-1"
                >
                  ¿Cuándo recogerás tu pedido?
                </label>
                <select
                  id="horario"
                  name="horario"
                  value={datosCliente.horario}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D9D4CE] rounded bg-[#F5E8D2] focus:outline-none"
                  required
                >
                  <option value="">Selecciona un horario</option>
                  <option value="15min">En 15 minutos</option>
                  <option value="30min">En 30 minutos</option>
                  <option value="1hr">En 1 hora</option>
                  <option value="2hrs">En 2 horas</option>
                  <option value="custom">Hora específica</option>
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="comentarios"
                className="block text-[#6C3A3A] font-medium mb-1"
              >
                Comentarios adicionales
              </label>
              <textarea
                id="comentarios"
                name="comentarios"
                value={datosCliente.comentarios}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-[#D9D4CE] rounded bg-[#F5E8D2] focus:outline-none"
              />
            </div>

            <div className="mt-4 border-t border-[#D9D4CE] pt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span>
                  $
                  {carrito
                    .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
                    .toFixed(2)}
                </span>
              </div>
              {opcionEntrega === "domicilio" && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Costo de envío</span>
                  <span>$40.00</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-[#6C3A3A] border-t border-[#D9D4CE] pt-2">
                <span>Total</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={volverAMenu}
                className="px-4 py-2 bg-[#D9D4CE] text-[#6C3A3A] rounded font-medium hover:bg-[#D9D4CE]/80 transition"
              >
                Volver al menú
              </button>
              <button
                type="button"
                onClick={confirmarPedido}
                disabled={
                  !datosCliente.nombre ||
                  !datosCliente.telefono ||
                  !datosCliente.horario
                }
                className="px-4 py-2 bg-[#6C3A3A] text-white rounded font-medium hover:bg-[#6C3A3A]/90 transition disabled:opacity-50 flex-1"
              >
                Confirmar pedido
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Paso 3: Confirmación (sin cambios) */}
      {paso === "confirmacion" && (
        <section className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md mt-4 text-center">
          <div className="w-16 h-16 mx-auto bg-[#9DA17B] rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            className={"text-2xl font-bold text-[#6C3A3A] mb-2 font-poiret-one"}
          >
            ¡Pedido Confirmado!
          </h2>
          <p className="text-[#9DA17B] mb-2">
            Gracias {datosCliente.nombre}, tu pedido ha sido procesado.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Recibirás (o hemos intentado enviar) una copia por correo
            electrónico. También puedes notificarlo por WhatsApp.
          </p>

          {/* Botón de WhatsApp */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5213332531118"}?text=${encodeURIComponent(
              `¡Hola Casa NALA! Quiero confirmar mi pedido:\n\nCliente: ${datosCliente.nombre}\nTeléfono: ${datosCliente.telefono}\nHorario: ${datosCliente.horario}\nOpción Entrega: ${opcionEntrega}\n${
                opcionEntrega === "domicilio"
                  ? `Dirección: ${direccionEntrega.calle} ${direccionEntrega.numero}, Col. ${direccionEntrega.colonia}, CP ${direccionEntrega.codigoPostal}\n`
                  : ""
              }\nPedido:\n${carrito
                .map(
                  (item) =>
                    `- ${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}`,
                )
                .join("\n")}\n${
                datosCliente.comentarios
                  ? `Comentarios: ${datosCliente.comentarios}\n`
                  : ""
              }Total: $${calcularTotal().toFixed(2)}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 mb-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Notificar Pedido por WhatsApp
          </a>

          <div className="bg-[#F5E8D2] p-4 rounded-lg mb-6">
            <h3 className="font-bold text-[#6C3A3A] mb-2">
              Resumen del pedido:
            </h3>
            <ul className="space-y-2 text-left">
              {carrito.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.nombre}{" "}
                    {item.detalles
                      ? `(${item.detalles.substring(0, 20)}${item.detalles.length > 20 ? "..." : ""})`
                      : ""}{" "}
                    x {item.cantidad}
                  </span>
                  <span className="font-bold">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  $
                  {carrito
                    .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
                    .toFixed(2)}
                </span>
              </li>
              {opcionEntrega === "domicilio" && (
                <li className="flex justify-between">
                  <span>Costo de envío:</span>
                  <span>$40.00</span>
                </li>
              )}
              <li className="border-t border-[#D9D4CE] pt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#F5E8D2]/50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-[#6C3A3A] mb-2">
              Detalles del Pedido:
            </h3>{" "}
            {/* Texto cambiado aquí */}
            <p>
              <strong>Nombre:</strong> {datosCliente.nombre}
            </p>
            <p>
              <strong>Teléfono:</strong> {datosCliente.telefono}
            </p>
            <p>
              <strong>Horario:</strong> {datosCliente.horario}
            </p>
            {datosCliente.comentarios && (
              <p>
                <strong>Comentarios:</strong> {datosCliente.comentarios}
              </p>
            )}
            <p>
              <strong>Entrega:</strong>{" "}
              {opcionesEntrega.find((o) => o.id === opcionEntrega)?.nombre}
            </p>
            {opcionEntrega === "domicilio" && (
              <div className="mt-2">
                <p>
                  <strong>Dirección:</strong>
                </p>
                <p>
                  {direccionEntrega.calle} {direccionEntrega.numero},{" "}
                  {direccionEntrega.colonia}, CP {direccionEntrega.codigoPostal}
                </p>
                {direccionEntrega.referencias && (
                  <p>
                    <strong>Referencias:</strong> {direccionEntrega.referencias}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={vaciarCarrito}
            className="px-6 py-2 bg-[#6C3A3A] text-white rounded-lg font-medium hover:bg-[#6C3A3A]/90 transition"
          >
            Hacer un Nuevo Pedido
          </button>

          {/* Sección de Contacto Adicional */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <h3
              className={
                "text-xl font-semibold text-center text-[#6C3A3A] mb-4 font-poiret-one"
              }
            >
              ¿Tienes dudas o un pedido especial?
            </h3>
            <p className="mb-4 text-center text-gray-700 text-sm">
              En Casa Nala estamos encantados de escucharte. Nuestro compromiso
              es ofrecerte el auténtico sabor de México con atención cercana y
              de calidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs mb-6">
              <div>
                <IconMapPin className="mx-auto mb-1 text-red-600 w-7 h-7" />
                <p className="font-semibold text-sm text-[#6C3A3A]">
                  Visítanos
                </p>
                <p className="text-gray-600">
                  Av. Miguel López de Legaspi & Vasco de Gama,
                  <br />
                  Col. 18 de Marzo, 44960 Guadalajara, Jal.
                </p>
                <a
                  href="https://www.google.com/maps?q=JJQF%2B7Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D7A556] hover:underline"
                >
                  Ver en Google Maps
                </a>
              </div>

              <div>
                <IconWhatsApp className="mx-auto mb-1 text-green-500 w-7 h-7" />
                <p className="font-semibold text-sm text-[#6C3A3A]">WhatsApp</p>
                <a
                  href="https://wa.me/523332531118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D7A556] hover:underline"
                >
                  +52 33 3253 1118
                </a>
              </div>

              <div>
                <IconEnvelope className="mx-auto mb-1 text-orange-500 w-7 h-7" />
                <p className="font-semibold text-sm text-[#6C3A3A]">Correo</p>
                <a
                  href="mailto:ordenes@casanala.com.mx"
                  className="text-[#D7A556] hover:underline"
                >
                  ordenes@casanala.com.mx
                </a>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600 mb-4">
              <p className="flex items-center justify-center">
                <IconGlobeAlt className="text-blue-500 w-4 h-4 mr-1.5" />
                Sitio Web:
                <a
                  href="https://casanala.com.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-[#D7A556] hover:underline"
                >
                  https://casanala.com.mx
                </a>
              </p>
            </div>

            <p className="text-center text-gray-700 text-sm">
              Ya sea para eventos, pedidos para llevar o simplemente por antojo,
              en Casa Nala estamos para servirte. ¡Gracias por elegirnos!
            </p>
          </div>
        </section>
      )}

      {/* Área de Entrega a Domicilio Modificada */}
      {opcionEntrega === "domicilio" &&
        paso === "datos" &&
        showDeliveryInfoModal && (
          <section className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
              <h3
                className={
                  "text-xl font-bold text-[#6C3A3A] mb-3 font-poiret-one"
                }
              >
                Área de Entrega
              </h3>

              {/* Contenedor de la Imagen y Texto Superpuesto */}
              <div className="aspect-video mb-4 rounded-lg overflow-hidden relative">
                <Image
                  src="/images/map_delivery.avif" // Ruta a la nueva imagen
                  alt="Mapa de área de entrega"
                  layout="fill" // Para que llene el contenedor padre
                  objectFit="cover" // o "contain", según se vea mejor
                  className="rounded-lg" // Mantener bordes redondeados si se desea
                />
                {/* Contenedor para el texto superpuesto */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-4 bg-black bg-opacity-30 rounded-lg">
                  <p className="text-white text-lg md:text-xl text-center font-semibold">
                    Entregamos en un radio de 5km alrededor de nuestro
                    restaurante.
                  </p>
                  <p className="text-gray-100 text-xs md:text-sm text-center mt-2">
                    Por ahora, nuestro servicio a domicilio está limitado a las
                    siguientes colonias: Colón Industrial, Residencial Victoria,
                    Jardines de la Cruz, Jardines de San Jose, Lomas de Polanco,
                    Residencial Victoria, Loma Bonita.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpcionEntrega("recoger")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium"
                >
                  Cambiar a Recoger
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#6C3A3A] text-white rounded font-medium"
                  onClick={() => {
                    setShowDeliveryInfoModal(false); // Ocultar modal
                    document.body.style.overflow = "auto"; // Restaurar scroll
                  }}
                >
                  Entendido
                </button>
              </div>
            </div>
          </section>
        )}

      {/* Sección aplicaciones de entrega (sin cambios) */}
      <section className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2
          className={
            "text-2xl font-bold text-[#6C3A3A] mb-3 text-center font-poiret-one"
          }
        >
          También disponibles en
        </h2>
        <p className="text-center text-[#9DA17B] mb-6">
          Encuentra Casa NALA en las principales plataformas de entrega
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {" "}
          {/* Added items-center */}
          <a
            href="https://www.ubereats.com/mx"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <Image
              src="/logos/uber_eats.avif" // Actualizado
              width={80}
              height={80}
              alt="Uber Eats"
              className="object-contain"
              style={{ width: "80px", height: "80px" }}
            />
          </a>
          <a
            href="https://www.rappi.com.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <Image
              src="/logos/rappi.avif" // Actualizado
              width={80}
              height={80}
              alt="Rappi"
              className="object-contain"
              style={{ width: "80px", height: "80px" }}
            />
          </a>
          <a
            href="https://mexico.didiglobal.com/food/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <Image
              src="/logos/didi_food.avif" // Actualizado
              width={80}
              height={80}
              alt="DiDi Food"
              className="object-contain"
              style={{ width: "80px", height: "80px" }}
            />
          </a>
        </div>
      </section>

      {/* Carrito flotante - visible solo en paso 1 */}
      {paso === "menu" &&
        carrito.length > 0 && ( // Solo mostrar si hay ítems en el carrito
          <aside
            className={`fixed bottom-6 right-6 w-72 bg-[#fff] shadow-2xl rounded-xl p-4 border border-[#D9D4CE] z-50 transition-all duration-300 ease-in-out ${isCartExpanded ? "max-h-[80vh]" : "max-h-min"}`}
          >
            {" "}
            {/* Ajustada altura y padding */}
            {/* Encabezado del carrito (siempre visible) */}
            <div
              className="flex justify-between items-center cursor-pointer text-[#6C3A3A] font-bold text-lg mb-2"
              onClick={() => setIsCartExpanded(!isCartExpanded)}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>
                  Tu Pedido ({carrito.length}{" "}
                  {carrito.length === 1 ? "ítem" : "ítems"})
                </span>
              </div>
              {isCartExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </div>
            {/* Contenido expandible del carrito */}
            {isCartExpanded && (
              <>
                <ul className="space-y-2 max-h-52 overflow-y-auto pr-2 border-t border-[#D9D4CE] pt-3">
                  {" "}
                  {/* Añadido borde superior y padding */}
                  {carrito.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b border-[#D9D4CE] pb-1 group relative"
                    >
                      <div className="flex-1 mr-2">
                        <span className="font-medium text-[#6C3A3A] text-sm leading-tight block">
                          {item.nombre}
                        </span>
                        {item.detalles && (
                          <span className="text-xs text-gray-500 block">
                            {item.detalles.substring(0, 20)}
                            {item.detalles.length > 20 ? "..." : ""}
                          </span>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => quitar(item)}
                            className="px-1.5 py-0.5 rounded bg-[#d7a556] text-white text-xs"
                            type="button"
                            aria-label="Quitar uno"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <span className="text-[#6C3A3A] text-sm">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => agregar(item)}
                            className="px-1.5 py-0.5 rounded bg-[#9DA17B] text-white text-xs"
                            type="button"
                            aria-label="Agregar uno"
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[#D7A556] font-bold text-sm">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => quitarItemCarrito(item.id)}
                          className="text-xs text-red-500 mt-1 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Eliminar del carrito"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-[#D9D4CE] pt-2 flex flex-col gap-1">
                  {" "}
                  {/* Ajustado margen superior y padding */}
                  {opcionEntrega === "domicilio" && (
                    <div className="flex justify-between text-sm">
                      <span>Entrega a domicilio</span>
                      <span>$40.00</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-bold text-[#6C3A3A] border-t border-[#D9D4CE] pt-1 mt-1">
                    <span>Total</span>
                    <span>${calcularTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
            {/* Botón Continuar - visible solo si hay ítems y el carrito está expandido */}
            {isCartExpanded && carrito.length > 0 && (
              <button
                className="mt-4 w-full py-2 rounded bg-[#6C3A3A] text-[#F5E8D2] text-lg font-semibold hover:bg-[#9DA17B] transition disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={continuarAPaso2}
              >
                Continuar
              </button>
            )}
          </aside>
        )}
    </main>
  );
}
