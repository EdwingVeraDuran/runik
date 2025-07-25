# 🧭 Timeline de Desarrollo – Panel Admin

## 🟩 FASE 1 – Setup base del sistema

Prepara el entorno y estructura general de la aplicación.

1. Autenticación y roles (solo admin)
2. Layout general del panel (sidebar, navegación, diseño base)
3. Conexión con Supabase (auth + base de datos)

---

## 🟦 FASE 2 – Gestión de productos

Funcionalidad clave para manejar el inventario.

4. Categorías (CRUD)
5. Marcas (CRUD)
6. Proveedores (CRUD)
7. Productos (CRUD)
8. Tags / etiquetas para productos
9. Ingreso de mercancía (registro de stock, historial de entradas)

---

## 🟨 FASE 3 – Gestión de clientes

Administra a los usuarios que hacen pedidos.

10. Clientes (CRUD)
11. Historial de compras por cliente

---

## 🟥 FASE 4 – Órdenes

Control de pedidos y flujo entre cliente, producto y orden.

12. Órdenes (listar, ver, filtrar)
13. Actualizar estado de la orden (pendiente, enviado, cancelado...)
14. Relación productos ↔ clientes ↔ órdenes
15. Generar facturas o recibos (PDF o visual)

---

## 🟫 FASE 5 – Finanzas

Registro del movimiento económico de la operación.

16. Ingresos (automáticos desde órdenes + ingresos manuales)
17. Egresos (gastos, compras a proveedores)
18. Balance general / resumen mensual (ingresos vs egresos)

---

## 🟪 FASE 6 – Extras de valor

Mejoras para admins y escalabilidad futura.

19. Dashboard con KPIs y gráficas (productos más vendidos, ingresos del mes, etc.)
20. Notificaciones internas (stock bajo, nuevos pedidos, etc.)
21. Historial de acciones / auditoría (registro de cambios por usuario)
