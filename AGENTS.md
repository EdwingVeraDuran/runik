# 🤖 AI Coding Agent Guide

## 🧠 Propósito

Este documento define las reglas y el contexto que debe seguir el **AI Coding Agent** encargado de colaborar en el desarrollo del proyecto **Runic**.  
Su objetivo es escribir, refactorizar y mantener el código de forma consistente con la arquitectura, convenciones y lineamientos definidos en el proyecto.

---

## ⚙️ Stack & Arquitectura

El proyecto utiliza el siguiente stack tecnológico:

- **Framework:** Next.js 15 + TypeScript  
- **BaaS:** Supabase  
- **Validación:** Zod  
- **Formularios:** React Hook Form  
- **UI:** ShadCN/UI + TailwindCSS  
- **Estado:** Hooks locales (sin Redux/Zustand)  

La estructura general del proyecto es:

```
src/
├─ app/           # Rutas y páginas de Next.js
├─ components/    # Componentes UI compartidos
├─ features/      # Features modulares (por dominio)
├─ lib/           # Conexiones, helpers y configuraciones
├─ schemas/       # Esquemas Zod y validaciones
├─ services/      # Integraciones globales
├─ types/         # Tipos globales
└─ utils/         # Utilidades comunes
```

Cada feature (por ejemplo `product-categories`, `suppliers`, `orders`) sigue la guía `FEATURE_GUIDELINES.md`.

---

## 🧩 Estructura de Features

Cada feature vive en `src/features/<feature-name>/` y debe organizarse así:

```
|-- components/   # UI específica
|-- hooks/        # Lógica de estado y servicios
|-- services/     # Acceso a datos (Supabase)
|-- types/        # Contratos y modelos
`-- index.ts      # Punto de exportación pública
```

### Principios clave:
- **Componentes:** visuales y declarativos.  
- **Hooks:** orquestan lógica y comunican servicios ↔ componentes.  
- **Servicios:** puramente asincrónicos, interactúan con Supabase.  
- **Tipos y Zod:** garantizan consistencia end-to-end.  

---

## 🔧 Capacidades del Agente

El AI Coding Agent puede:

1. Crear nuevas features siguiendo la guía `FEATURE_GUIDELINES.md`.
2. Refactorizar código existente respetando la estructura modular.
3. Generar hooks, servicios y componentes con nombres coherentes.
4. Mantener el tipado estricto con `z.infer` y `TypeScript`.
5. Integrar formularios usando `React Hook Form + Zod`.
6. Usar imports absolutos (`@/features/...`) según `tsconfig`.
7. Validar y normalizar datos antes de retornar valores desde servicios.
8. Documentar código solo cuando la lógica se vuelva compleja (README corto dentro de la feature).
9. Respetar el flujo de responsabilidades:
   - UI → Hook → Service → Supabase

---

## 🧱 Reglas de Refactorización

Cuando el agente refactorice o modifique código:
- Mantener los nombres de funciones y tipos significativos.
- No eliminar tipados explícitos ni validaciones de Zod.
- Consolidar exports en `index.ts` según la categoría (tipos, hooks, servicios, componentes).
- Respetar el formato de carpeta y nombre (`kebab-case` para features, `PascalCase` para tipos).

---

## 🪄 Convenciones Adicionales

- Usar **async/await** con `try/catch` en toda llamada remota.  
- Manejar errores con mensajes claros (`throw new Error(error.message)`).
- Validar datos de Supabase usando esquemas Zod antes de retornar.  
- Cada hook debe devolver un objeto plano (`{ data, loading, error, ... }`).  
- Los efectos deben limpiarse correctamente (`useEffect cleanup`).  

---

## 💾 Convenciones de Commits

El agente **debe hacer un commit por cada archivo modificado o creado**, siguiendo estas reglas:

1. ✅ **Un commit = un archivo.**
2. 🧩 Cada mensaje de commit debe incluir un **gitmoji** representativo del tipo de cambio.
3. ✍️ **Formato del commit:**

   ```
   <gitmoji> <tipo>: <descripcion breve>
   ```

   Ejemplos:
   ```
   ✨ feat: agregar hook useSuppliers
   🐛 fix: corregir validación en supplierService
   ♻️ refactor: mejorar estructura de index.ts
   🧱 chore: crear esquema supplierDraftSchema
   ```

4. 📘 Los tipos de commit recomendados son:
   - `feat`: nueva funcionalidad
   - `fix`: corrección de errores
   - `refactor`: mejora de código sin cambio funcional
   - `style`: cambios de formato/estilo
   - `docs`: documentación
   - `chore`: tareas de mantenimiento
   - `test`: pruebas o mocks

---

## 🧭 Interacción Esperada

Al trabajar dentro del proyecto:
- El agente debe seguir las reglas del archivo `FEATURE_GUIDELINES.md`.
- Crear nuevas features dentro de `src/features/` con su estructura completa.
- Alinear los esquemas, servicios y hooks con las validaciones de Zod.  
- Mantener consistencia visual con los componentes compartidos (`@/components/ui/...`).
- Documentar el flujo o lógica si supera la complejidad estándar.

---

## 📘 Referencias Internas

- **FEATURE_GUIDELINES.md:** define las convenciones de diseño y estructura de cada feature.  
- **schemas/**: contiene las validaciones y tipos base para entidades globales.  
- **lib/supabaseClient.ts:** instancia del cliente Supabase.  
- **types/**: definiciones compartidas globalmente.  

---

## ✅ Conclusión

El **AI Coding Agent** debe ser capaz de:
- Generar código modular, validado y coherente.
- Mantener la arquitectura por features.
- Respetar las convenciones de commits (un archivo → un commit + gitmoji).
- Garantizar consistencia tipada y visual a lo largo de todo el proyecto.
