---
name: clean-code-documenter
description: >-
  Estándares de Clean Code, tipado TypeScript estricto, arquitectura modular
  y documentación con comentarios explicativos en puntos críticos.
---

# Clean Code & Documentation Standards Skill

Esta habilidad garantiza que todo el código desarrollado para ServiSmart SaaS cumpla los requerimientos de calidad, legibilidad y comentarios exigidos por el **Ingeniero Líder**.

## 1. Reglas de Documentación de Código
1. **Comentarios Explicativos en Lógica Crítica:** Cada función que filtre técnicos, calcule fechas de garantía o genere alarmas debe tener un bloque JSDoc/comentario claro.
2. **Nombres Significativos:** Variables y funciones autodescriptivas en español o inglés consistente (ej: `obtenerTecnicosLibres()`, `calcularVencimientoGarantia()`).
3. **Funciones Pequeñas con Responsabilidad Única:** Ninguna función debe superar las 30 líneas de código.

## 2. Ejemplo de Código Documentado
```typescript
/**
 * Calcula la fecha exacta de expiración de la garantía de 3 meses (90 días)
 * a partir de la fecha de culminación del servicio técnico.
 * 
 * @param fechaServicio Fecha en que el técnico finalizó la labor
 * @returns Fecha de vencimiento formateada (YYYY-MM-DD)
 */
export function calcularFechaGarantia(fechaServicio: Date): string {
  // Se clona la fecha para evitar mutaciones de estado
  const fechaVencimiento = new Date(fechaServicio.getTime());
  
  // Se suman exactamente 90 días correspondientes a los 3 meses de garantía
  fechaVencimiento.setDate(fechaVencimiento.getDate() + 90);
  
  return fechaVencimiento.toISOString().split('T')[0];
}
```
