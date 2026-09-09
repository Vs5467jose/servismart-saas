---
name: saas-frontend-architect
description: >-
  Experto en diseño y construcción de interfaces UI modernas, dashboards administrativos,
  tableros Kanban de citas y componentes responsivos en React, Next.js y TailwindCSS.
---

# SaaS Frontend Architect Skill

Esta habilidad proporciona patrones, directrices y componentes de interfaz gráfica moderna para el desarrollo frontend de la plataforma **ServiSmart SaaS**.

## 1. Principios de Diseño
- **Interfaz Limpia y de Alto Contraste:** Uso de paleta corporativa moderna (Azul marino `#0f172a`, Azul acento `#2563eb`, Verde estado `#16a34a`, Ámbar `#d97706`).
- **Diseño Orientado a la Secretaria:** Botones grandes, tablas con texto legible sin hacer zoom, modales intuitivos y búsqueda rápida por cliente o teléfono.
- **Responsividad:** 100% adaptable a computadores de escritorio, tablets y celulares para técnicos en campo.

## 2. Componentes Clave del Frontend
1. **Dashboard de Recepción:** Tarjetas de métricas (Citas de Hoy, Solicitudes Pendientes, Técnicos Libres, Alarmas activas).
2. **Formulario de Registro Rápido:** Creación de cliente y orden en 30 segundos con campos de Tipo de Equipo, Marca, Modelo, Serie y Falla.
3. **Selector de Técnico Libre:** Dropdown interactivo que filtra en tiempo real a los técnicos disponibles.
4. **Visor de Orden de Servicio y Ficha Técnica:** Vista previa digital con estado de la garantía a 3 meses.

## 3. Ejemplo de Estructura de Componente (React / Next.js)
```tsx
import React, { useState } from 'react';

interface Technician {
  id: number;
  nombre: string;
  estado: 'disponible' | 'ocupado';
  especialidad: string;
}

export const TechnicianSelector = ({ technicians, onSelect }: { technicians: Technician[], onSelect: (id: number) => void }) => {
  const availableTechs = technicians.filter(t => t.estado === 'disponible');

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-800">Asignar Técnico Disponible</label>
      <select 
        onChange={(e) => onSelect(Number(e.target.value))}
        className="border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:ring-2 focus:ring-blue-600"
      >
        <option value="">Seleccione un técnico libre...</option>
        {availableTechs.map(tech => (
          <option key={tech.id} value={tech.id}>
            🟢 {tech.nombre} - ({tech.especialidad})
          </option>
        ))}
      </select>
      {availableTechs.length === 0 && (
        <span className="text-xs text-amber-600 font-medium">⚠️ No hay técnicos libres en este momento.</span>
      )}
    </div>
  );
};
```
