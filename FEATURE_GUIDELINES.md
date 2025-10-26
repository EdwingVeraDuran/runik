# Guia de construccion de features

Esta guia documenta la estructura y convenciones que deben seguir todas las nuevas features del proyecto. La feature `product-categories` actua como referencia base y cualquier nueva implementacion debe replicar este formato a menos que exista una excepcion justificada.

## Estructura de carpetas

Ubicar cada feature en `src/features/<feature-name>` usando `kebab-case`. Dentro, organizar los artefactos por responsabilidad:

```
src/features/<feature-name>/
|-- components/   # Componentes de UI especificos de la feature
|-- hooks/        # Hooks reutilizables que orquestan estado y servicios
|-- services/     # Acceso a datos (Supabase u otros backends)
|-- types/        # Tipos y contratos publicos
`-- index.ts      # Punto de re-exportacion
```

- Agregar subcarpetas adicionales (`constants`, `utils`, `mocks`, `__tests__`) solo cuando sean necesarias y manteniendo un proposito unico.
- Cada carpeta debe contener archivos individuales enfocados y con nombres descriptivos (`CategoryTile.tsx`, `useCategories.ts`, `categoryService.ts`, etc.).

## Archivo `index.ts`

- Re-exportar todo lo que la feature expone publicamente (tipos, servicios, hooks, componentes) desde `index.ts`.
- Mantener los exports agrupados por categoria y ordenados alfabeticamente para facilitar su lectura.

```ts
export * from "./types/category";
export * from "./services/categoryService";
export * from "./hooks/useCategories";
```

## Tipos (`types/`)

- Definir todos los contratos publico/privados de la feature en archivos `.ts`.
- Usar `type` o `interface` segun corresponda y exportar explicitamente cada definicion.
- Mantener los nombres en `PascalCase` (`ProductCategory`) y modelar los campos segun la base de datos o el dominio que representen.
- Cuando se utilicen validaciones con Zod, exportar tanto el tipo como el esquema (`export const ProductCategorySchema = z.object({...});` y `export type ProductCategory = z.infer<typeof ProductCategorySchema>`).

## Servicios (`services/`)

- Encapsular llamadas a Supabase (u otro backend) en funciones asincronicas con nombres en formato `<verbo><Entidad>Service` (`readCategoriesService`).
- Centralizar constantes compartidas (por ejemplo, `const categoriesTable = "categories";`) en el mismo archivo cuando solo aplica a la entidad.
- Validar errores inmediatamente despues de cada operacion y propagar mensajes claros con `throw new Error(error.message)`.
- Validar y normalizar los datos devueltos por Supabase utilizando los esquemas definidos con Zod antes de retornarlos (`return ProductCategorySchema.array().parse(data ?? []);`).
- Mantener las funciones puras: sin efectos secundarios distintos a los necesarios para la llamada remota.

## Hooks (`hooks/`)

- Nombrar todos los hooks con el prefijo `use`.
- Orquestar estado (`useState`), efectos (`useEffect`) y servicios dentro del hook, exponiendo metodos de alto nivel (`addCategory`, `updateCategory`, `deleteCategory`, `refresh`).
- Manejar el ciclo de vida inicial (por ejemplo, cargar datos en `useEffect`).
- Devolver un objeto plano con todo lo necesario para que los componentes consuman la feature (`{ categories, loading, error, ... }`).
- Capturar y exponer los errores como cadenas legibles; nunca silenciosamente.
- Reutilizar los esquemas de Zod para validar payloads entrantes en flows mas complejos (por ejemplo, formularios controlados con datos precargados).

## Componentes (`components/`)

- Implementar componentes de UI especificos de la feature en archivos `.tsx`.
- Mantener cada componente en un archivo separado con un `default export`.
- Definir los `props` mediante `type` locales y tipar adecuadamente callbacks y valores controlados.
- Encapsular la logica visual y de interaccion minima; dejar la interaccion con datos en los hooks.
- Utilizar utilidades de diseno globales (Tailwind, componentes de UI compartidos) en lugar de estilos ad-hoc.

## Flujos y responsabilidades

- Los componentes consumen hooks y solo manipulan estado local de presentacion.
- Los hooks coordinan llamadas a los servicios y actualizan el estado a partir de las respuestas.
- Los servicios son los unicos responsables de interactuar con Supabase u otras APIs.
- Los tipos proveen contratos compartidos entre servicios, hooks y componentes para evitar duplicacion.

## Estandares adicionales

- Mantener consistencia en el uso de imports absolutos (`@/features/...`) segun las rutas configuradas en `tsconfig`.
- Usar `async/await` con bloques `try/catch` alrededor de cada operacion remota.
- Asegurarse de limpiar timeouts o efectos secundarios en `useEffect` cuando aplique.
- Cuando se agreguen nuevas capacidades (por ejemplo, eliminacion con confirmacion), documentar el flujo dentro de la feature (README corto en la carpeta) solo si la logica se vuelve compleja.
- Prever puntos de extension (por ejemplo, exponer un metodo `refresh`) para simplificar la reutilizacion de la feature en distintas pantallas.
- Alinear las validaciones de los formularios con los mismos esquemas de Zod utilizados en servicios para garantizar coherencia end-to-end.

Siguiendo estas pautas, todas las features mantendran una arquitectura consistente, facilitando la escalabilidad y el mantenimiento del codigo.
