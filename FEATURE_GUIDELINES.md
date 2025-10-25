# Feature Implementation Blueprint

Guía para crear nuevas features siguiendo la estructura y prácticas usadas en `product-categories`. Usa este documento como checklist cada vez que agregues un módulo dentro de `src/features`.

## 1. Estructura de carpetas

```
src/features/<feature-name>/
├── components/     # UI reutilizable de la feature
├── hooks/          # Hooks específicos (estado/acciones)
├── services/       # Acceso a datos o side effects externos
├── types/          # Tipos y DTOs compartidos en la feature
└── index.ts        # Barrel exports de la feature
```

- Crea subcarpetas adicionales (`utils`, `constants`, etc.) solo si agregan claridad.
- Mantén los nombres en **kebab-case** para carpetas y **PascalCase** para componentes.

## 2. Tipos (`types/`)

- Define el tipo fuente principal (p. ej. `ProductCategory`).
- Exporta DTOs derivados:
  - `Draft` (`CategoryDraft`): campos que se envían al crear recursos.
  - `UpdatePayload`: campos usados al actualizar.
- Evita `any` y convierte respuestas externas a tipos internos antes de usarlas.

## 3. Servicios (`services/`)

- Responsables de interactuar con Supabase u otras APIs.
- Reglas:
  - Usa funciones `async` con nombres verbales (`createCategoryService`).
  - Retorna los datos relevantes (fila creada/actualizada) para que la UI pueda actualizar su estado sin refetch completo.
  - Siempre encapsula errores con mensajes claros (`throw new Error("No pudimos...")`).
  - Centraliza constantes (`const table = "categories"`) en el servicio.
  - Mantén todas las conversiones de datos aquí, no en los componentes.

## 4. Hooks (`hooks/`)

- Exponen la lógica de presentación (estado local, loaders, errores, ordenamiento).
- Convenciones:
  - Nombre en `useSomething`.
  - Estado mínimo necesario (`isLoading`, `error`, colecciones/local state).
  - Métodos públicos retornan `async` y relanzan errores para que el consumidor pueda reaccionar.
  - Deriva listas locales directamente con el resultado de servicios (p. ej. ordenar, filtrar) para minimizar llamadas extra.
  - Expón utilidades adicionales (`refresh`, `clearError`) cuando tengan sentido.
- Evita efectos colaterales dentro del cuerpo; usa `useEffect` + `useCallback` para memoizar funciones.

## 5. Componentes (`components/`)

- Componentes “presentacionales” que consumen el hook.
- Normas clave:
  - Props tipadas con los DTOs definidos (`CategoryUpdatePayload`).
  - Manejar estados de edición/eliminación localmente, mientras delegan operaciones al hook vía callbacks `async`.
  - Mantener la UI accesible (`aria-label`, `disabled` cuando corresponda).
  - No realices llamadas al servicio directamente; siempre usa funciones recibidas por props.
  - Reutiliza componentes base de `src/components/ui`.

## 6. Página o entry point

- Las páginas en `src/app/...` consumen el hook y componen la UI con los componentes de la feature.
- Debe cubrir:
  - Formulario controlado para crear registros (con validaciones mínimas).
  - Manejo de estados: loading, lista vacía, error, confirmaciones de acciones destructivas.
  - Reutilización de copy y estilos consistentes (usa `SectionTitle`, etc.).
- No coloques lógica compleja en la página; delega al hook/componentes.

## 7. Barrel (`index.ts`)

- Re-exporta todo lo necesario para consumir la feature desde fuera:

```ts
export * from "./types/foo";
export * from "./services/fooService";
export * from "./hooks/useFoo";
// export * from "./components/..."; // solo si serán usados globalmente
```

- Importa la feature como `@/features/<feature>` cuando la uses en otros módulos.

## 8. Manejo de errores y UX

- Servicios: lanzar errores con mensajes amigables.
- Hooks: guardar mensaje en `error` y permitir reintentos (`refresh`) y limpieza (`clearError`).
- Componentes/Páginas:
  - Mostrar `error` en una alerta visible.
  - Deshabilitar acciones mientras haya una operación en curso (`isCreating`, `isSaving`).
  - Confirmar acciones destructivas (p. ej. `window.confirm` o un modal).

## 9. Pruebas y validación manual

- Aún sin suite de tests, documenta la verificación manual necesaria:
  - Crear, actualizar y eliminar registros.
  - Manejar back-end caído o errores de validación.
- Cuando agregues testing, prioriza:
  - Servicios (mocks de Supabase).
  - Hooks (React Testing Library + MSW).
  - Componentes críticos (interacciones).

## 10. Checklist al entregar la feature

- [ ] Tipos definidos y re-exportados.
- [ ] Servicios con errores controlados y datos retornados.
- [ ] Hook con estados (`isLoading`, `error`) y métodos `async`.
- [ ] Componentes sin lógica de negocio, reutilizables y accesibles.
- [ ] Página integra formulario, lista, loaders, vacíos y errores.
- [ ] Barrel `index.ts` actualizado.
- [ ] Pruebas manuales documentadas o scripts listos.
- [ ] Mensajes, placeholders y textos en idioma consistente (es).
- [ ] Sin `console.log` ni `any`.

Usa este blueprint como referencia inicial y ajústalo cuando la feature requiera otras capas (p. ej. caches, contexto global, permisos). Mantener la consistencia será clave para escalar el resto de módulos.
