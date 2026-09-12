/**
 * THEMO ServiSmart SaaS — Estado Global y Datos Iniciales (Mock Data)
 * 
 * Contiene las listas de técnicos, órdenes de servicio y clientes
 * que alimentan la aplicación en memoria.
 */

// Lista de Técnicos con especialidad y estado de disponibilidad en tiempo real
window.technicians = [
  { id: 1, name: "Carlos Mendoza", specialty: "Climatización (HVAC)", status: "disponible", phone: "+57 301 555 1122" },
  { id: 2, name: "Ana García", specialty: "Electrodomésticos", status: "en_cita", phone: "+57 302 444 3344" },
  { id: 3, name: "Pedro Ruiz", specialty: "Refrigeración", status: "no_disponible", phone: "+57 300 777 8899" }
];

// Órdenes de Servicio en diferentes etapas del Pipeline Kanban
window.orders = [
  {
    id: "OS-2026-0041",
    clientName: "Dra. Marcela Restrepo",
    clientPhone: "+57 310 456 7890",
    clientAddress: "Cra 54 # 72-109, Prado",
    equipType: "HVAC - Aire Acondicionado Split",
    equipBrand: "LG Dual Inverter",
    equipSerial: "LG-90234",
    equipFault: "Falta de enfriamiento y filtro taponado con polvo",
    equipRepair: "Mantenimiento profundo, limpieza de turbina y prueba de presión",
    cost: 90000,
    status: "completed",
    techId: 1,
    date: "2026-09-08",
    completedDate: "2026-09-08"
  },
  {
    id: "OS-2026-0042",
    clientName: "Restaurante La Cabaña Express",
    clientPhone: "+57 301 234 5678",
    clientAddress: "Calle 84 # 47-30, Local 3",
    equipType: "HVAC - Aire Cassette / Central",
    equipBrand: "Carrier",
    equipSerial: "CR-77821",
    equipFault: "Goteo constante en bandeja de condensado sobre mesas",
    equipRepair: "Desobstrucción de línea de drenaje y limpieza de serpentín",
    cost: 180000,
    status: "in_progress",
    techId: 2,
    date: "2026-09-09",
    completedDate: null
  },
  {
    id: "OS-2026-0043",
    clientName: "Edificio Torre Palma Real (Apt 502)",
    clientPhone: "+57 315 789 1234",
    clientAddress: "Calle 98 # 52-20, Apt 502",
    equipType: "Electrodoméstico - Smart TV",
    equipBrand: "Samsung",
    equipSerial: "SAM-OLED65-44",
    equipFault: "Líneas horizontales en pantalla y reinicio intermitente",
    equipRepair: "Diagnóstico de tarjeta T-CON y fuente",
    cost: 160000,
    status: "scheduled",
    techId: 1,
    date: "2026-09-09",
    completedDate: null
  },
  {
    id: "OS-2026-0044",
    clientName: "Roberto Manotas",
    clientPhone: "+57 320 654 3210",
    clientAddress: "Cra 43 # 68-12",
    equipType: "HVAC - Aire Acondicionado Split",
    equipBrand: "Mabe",
    equipSerial: "NO_VISIBLE",
    equipFault: "Enciende consola pero no arranca el compresor en condensadora",
    equipRepair: "Por diagnosticar",
    cost: 120000,
    status: "new",
    techId: null,
    date: "2026-09-09",
    completedDate: null
  }
];

window.currentTab = "dashboard";
