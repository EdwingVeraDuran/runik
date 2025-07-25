# 🧱 Stack de Tecnologías – Panel Admin

Este documento resume todas las tecnologías, librerías y herramientas que usaremos en el desarrollo del **panel administrativo**, con una breve descripción de cada una.

---

## ⚙️ Core del Proyecto

| Herramienta    | Descripción                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js**    | Framework basado en React que permite crear aplicaciones web completas con SSR, rutas automáticas, API integradas y excelente rendimiento. |
| **React**      | Librería para construir interfaces de usuario declarativas y reactivas. Next.js lo usa como base.                                          |
| **TypeScript** | Superset de JavaScript con tipado estático que ayuda a prevenir errores y a escribir código más mantenible.                                |

---

## 🧩 Backend como servicio

| Herramienta       | Descripción                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Supabase**      | Plataforma backend completa que incluye base de datos PostgreSQL, autenticación, almacenamiento de archivos y funciones serverless. Reemplaza a Firebase. |
| **PostgreSQL**    | Base de datos relacional robusta y potente. Usada por Supabase bajo el capó.                                                                              |
| **Supabase Auth** | Sistema de autenticación listo para usar (email/password, magic links, OAuth). Control de roles integrado.                                                |

---

## 🎨 Interfaz de usuario

| Herramienta      | Descripción                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| **TailwindCSS**  | Framework de estilos utility-first que permite diseñar rápido y con consistencia.     |
| **shadcn/ui**    | Colección de componentes accesibles y personalizables basados en Tailwind y Radix UI. |
| **lucide-react** | Paquete de íconos SVG modernos, compatibles con shadcn y fáciles de personalizar.     |

---

## 📦 Manejo de estado y datos

| Herramienta        | Descripción                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **TanStack Query** | Manejo avanzado de datos asíncronos (fetch, cache, refetch). Ideal para consumir datos de Supabase de forma optimizada. |
| **Zustand**        | Librería de manejo de estado global simple y sin boilerplate. Perfecta para UI (modales, filtros, sidebar, flags).      |

---

## 🧾 Formularios y validación

| Herramienta         | Descripción                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **react-hook-form** | Librería para manejar formularios de forma eficiente con menos re-render. Ligera y muy usada.                        |
| **zod**             | Librería para validar datos y estructuras. Ideal para validar formularios y trabajar con TypeScript de forma segura. |

---

## 📚 Utilidades adicionales

| Herramienta                  | Descripción                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| **date-fns**                 | Utilidades modernas para trabajar con fechas (formatear, comparar, sumar, etc.).        |
| **sonner**                   | Sistema de notificaciones (toasts) moderno y bonito, totalmente integrado con shadcn.   |
| **recharts**                 | Librería de gráficas para visualizar datos (ventas, stock, estadísticas del dashboard). |
| **react-pdf** / **html2pdf** | Para generar facturas o recibos en formato PDF desde HTML directamente.                 |
| **papaparse**                | Para exportar e importar datos en formato CSV (productos, reportes, etc.).              |
| **framer-motion**            | Animaciones fluidas y fáciles para mejorar la experiencia visual del admin.             |

---

## 🛠️ Herramientas de desarrollo

| Herramienta                | Descripción                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **ESLint + Prettier**      | Linter + formateador automático de código para mantener consistencia y evitar errores comunes.                            |
| **Husky + lint-staged**    | Corre validaciones antes de hacer commits (lint, tests, etc.) para mantener calidad del código.                           |
| **Vercel**                 | Plataforma de despliegue integrada con Next.js. Hosting fácil, CI/CD automático desde GitHub.                             |
| **Turborepo** _(opcional)_ | Herramienta para trabajar con múltiples apps y paquetes en un mismo repo (monorepo). Ideal si integrás también la tienda. |

---

## 🧠 Recomendación general de uso

- Usa **TanStack Query** para cualquier dato que venga de Supabase.
- Usa **Zustand** para UI o estados locales simples (ej. sidebar abierto, filtros activos).
- Usa **shadcn/ui** para tener una UI limpia y productiva, sin reinventar la rueda.
- Usa **zod + RHF** para validación de formularios y tipos consistentes.
