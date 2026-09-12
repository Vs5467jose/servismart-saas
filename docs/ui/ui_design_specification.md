# Especificación de Diseño UI/UX y Sistema de Componentes — THEMO ServiSmart SaaS

> **Estado:** Documento de Identidad Corporativa y Diseño Visual  
> **Guía de Estilo:** Basada fielmente en la marca oficial **THEMO** (Engranaje industrial, Pirámide y Tipografía metálica).  
> **Enfoque:** Alta eficiencia para la recepción, agendamiento transparente, filtro de técnicos libres y trazabilidad del motor de garantías a 3 meses.

---

## 🎨 1. Diseños Visuales de Alta Fidelidad (Identidad THEMO)

````carousel
![Dashboard Principal Operativo THEMO — Tablero Kanban y Métricas de Recepción](C:\Users\joad\.gemini\antigravity\brain\fd8f3d80-9ede-4f93-b245-4e96940fa9e2\themo_saas_dashboard_1789222105367.jpg)
<!-- slide -->
![Modal de Captura Rápida THEMO — Ficha Técnica y Asignación de Técnico Libre](C:\Users\joad\.gemini\antigravity\brain\fd8f3d80-9ede-4f93-b245-4e96940fa9e2\themo_modal_ui_1789222129453.jpg)
<!-- slide -->
![Logotipo Oficial de Referencia THEMO](C:\Users\joad\.gemini\antigravity\brain\fd8f3d80-9ede-4f93-b245-4e96940fa9e2\.user_uploaded\media_1789222055974.jpg)
````

---

## 🏛️ 2. Sistema de Diseño (Design Tokens THEMO)

### Paleta Cromática Oficial Extraída del Logo
El esquema visual combina la solidez del **Gris Acero/Grafito Titanio** con el dinamismo tecnológico del **Azul Cobalto Eléctrico** sobre un lienzo blanco ultra limpio:

| Elemento / Token | Color Hex | Clase Tailwind | Significado en THEMO |
| :--- | :--- | :--- | :--- |
| **Fondo Base (Light Canvas)** | `#FFFFFF` / `#F8FAFC` | `bg-white` / `bg-slate-50` | Fondo nítido, luminoso y sin distracciones |
| **Azul Cobalto THEMO** | `#1D4ED8` | `bg-blue-700` / `text-blue-700` | Color primario oficial (Letras "THE", botones principales) |
| **Azul Eléctrico / Highlight** | `#2563EB` / `#38BDF8` | `bg-blue-600` / `text-sky-400` | Resaltados dinámicos, focus y hover states |
| **Grafito Titanio ("MO" & Engranaje)** | `#1E293B` | `bg-slate-800` / `text-slate-900` | Textos de alto contraste, tarjetas y sellos oficiales |
| **Gris Acero Metálico** | `#475569` / `#64748B` | `text-slate-600` / `border-slate-300` | Subtítulos, bordes técnicos e información secundaria |
| **Plata / Reflejos** | `#CBD5E1` / `#E2E8F0` | `border-slate-200` | Divisores limpios de formularios y tablas |
| **Verde Disponibilidad** | `#16A34A` | `text-emerald-600` | Indicador inequívoco de técnicos libres (🟢) |

---

## 🧩 3. Jerarquía de Componentes Frontend (React / Next.js)

```text
src/ui/
├── components/
│   ├── branding/
│   │   ├── ThemoLogo.tsx             # Isotipo del engranaje con pirámide y tipografía THEMO
│   │   └── TopHeader.tsx             # Barra superior con buscador universal y notificaciones
│   ├── kanban/
│   │   ├── ThemoKanbanBoard.tsx      # Tablero operativo de 4 columnas (Nueva, Agendada, Servicio, Garantía)
│   │   └── ThemoOrderCard.tsx        # Tarjeta blanca con insignia en azul cobalto y precio en COP
│   ├── modals/
│   │   ├── ThemoQuickIntakeModal.tsx # Formulario modal en 30s con ficha técnica de equipos
│   │   ├── TechAvailabilityDropdown.tsx # Selector que filtra técnicos disponibles vs ocupados
│   │   └── ThemoPrintablePdf.tsx     # Plantilla imprimible con membrete corporativo THEMO
│   └── notifications/
│       └── WarrantyAlarmBadge.tsx    # Widget del motor de 3 alarmas (+24h, +60d, +85d)
```
