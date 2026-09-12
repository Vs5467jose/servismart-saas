# Especificación de Diseño UI/UX y Sistema de Componentes — ServiSmart SaaS

> **Estado:** Documento de Diseño Visual y Técnico  
> **Enfoque:** Alta eficiencia operativa para la recepcionista/secretaria, claridad en órdenes técnicas y trazabilidad del motor de garantías a 3 meses.

---

## 🎨 1. Diseños Visuales de Alta Fidelidad

````carousel
![Dashboard Principal Operativo — Tablero Kanban y Métricas de Recepción](C:\Users\joad\.gemini\antigravity\brain\fd8f3d80-9ede-4f93-b245-4e96940fa9e2\servismart_dashboard_ui_1789221238009.jpg)
<!-- slide -->
![Modal de Captura Rápida — Ficha Técnica del Equipo y Filtro de Técnicos Libres](C:\Users\joad\.gemini\antigravity\brain\fd8f3d80-9ede-4f93-b245-4e96940fa9e2\servismart_modal_ui_1789221259817.jpg)
````

---

## 🏛️ 2. Sistema de Diseño (Design Tokens)

### Paleta Cromática Corporativa
Diseñada con un esquema **Dark Enterprise High-Contrast** para evitar la fatiga visual durante jornadas de trabajo intensivo en recepción:

| Rol de Color | Valor Hex | Clase Tailwind | Propósito / Uso |
| :--- | :--- | :--- | :--- |
| **Fondo Base (Dark)** | `#0f172a` | `bg-slate-900` | Canvas general de la aplicación |
| **Superficie de Tarjetas** | `#1e293b` | `bg-slate-800` | Contenedor de columnas Kanban y modales |
| **Bordes Estructurales** | `#334155` | `border-slate-700` | Delimitación sutil entre elementos |
| **Primario / Acción** | `#2563eb` | `bg-blue-600` | Botones de acción principal (`+ Nueva Orden`, `Guardar`) |
| **Éxito / Libre** | `#16a34a` | `bg-emerald-600` | Indicador de técnicos disponibles y servicios completados |
| **Atención / Pendiente** | `#d97706` | `bg-amber-600` | Nuevas solicitudes y alertas de post-venta |
| **Texto Primario** | `#f8fafc` | `text-slate-50` | Nombres de clientes, títulos y valores en COP |
| **Texto Secundario** | `#94a3b8` | `text-slate-400` | Direcciones, series de equipos y marcas |

---

## 🧩 3. Jerarquía de Componentes Frontend (React / Next.js)

```text
src/ui/
├── components/
│   ├── layout/
│   │   ├── TopNavbar.tsx             # Logo, buscador universal, campana de alarmas y botón CTA
│   │   └── MetricStatBar.tsx         # 4 KPIs (Citas Hoy, Solicitudes, Técnicos Libres, Garantías)
│   ├── kanban/
│   │   ├── KanbanBoard.tsx           # Contenedor con scroll horizontal suave
│   │   ├── KanbanColumn.tsx          # Columna con contador y cabecera de estado
│   │   └── ServiceOrderCard.tsx      # Tarjeta con datos de cliente, equipo, técnico y costo en COP
│   ├── modals/
│   │   ├── QuickIntakeModal.tsx      # Modal de registro en 30s con Ficha Técnica
│   │   ├── TechnicianSelector.tsx    # Dropdown con filtro reactivo de técnicos libres (🟢)
│   │   ├── WarrantyAlarmsModal.tsx   # Visor de las 3 alarmas con disparador de WhatsApp
│   │   └── PrintablePdfOrder.tsx     # Recibo oficial de 1 página para impresión (Ctrl+P)
│   └── common/
│       ├── Badge.tsx                 # Tags de estado (Nuevo, Agendado, En Servicio, Completado)
│       └── ToastNotification.tsx     # Alertas flotantes no intrusivas
```

---

## ⚡ 4. Principios UX Clave Orientados a la Secretaria

1. **Cero Clics Innecesarios:** El formulario de creación agrupa en una sola vista los datos del cliente, la ficha del equipo y la asignación del técnico.
2. **Prevención de Errores de Despacho:** El selector de técnicos **bloquea visualmente** a cualquier técnico ocupado o con cruce de citas, impidiendo agendas duplicadas.
3. **Automatización Transparente:** La secretaria no tiene que calcular fechas de garantía manualmente; el sistema calcula los 90 días naturales y programa las 3 alarmas al cambiar el estado a *"Completada"*.
4. **Respaldo Inmediato en PDF:** En 1 solo clic la secretaria obtiene la orden de servicio formal lista para entregar en mostrador o enviar por chat.
