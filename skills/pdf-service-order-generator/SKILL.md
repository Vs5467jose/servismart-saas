---
name: pdf-service-order-generator
description: >-
  Generador de Órdenes de Servicio y Fichas Técnicas en formato PDF
  descargable e imprimible de 1 página con diseño profesional y evidencia fotográfica.
---

# PDF Service Order Generator Skill

Esta habilidad proporciona plantillas y utilidades para generar Órdenes de Servicio estandarizadas en PDF de 1 página exacta (usando ReportLab en Python o PDFKit / React-PDF en Node/TypeScript).

## 1. Estructura Obligatoria de la Orden de Servicio
1. **Encabezado Corporativo:** Nombre de la empresa, NIT, Teléfono de contacto y Código único de Orden (ej. `OS-2026-0042`).
2. **Sección Cliente:** Nombre completo, Teléfono/WhatsApp, Dirección de atención y Ciudad.
3. **Sección Ficha Técnica del Equipo:** Tipo de Equipo (Aire Acondicionado, TV), Marca, Modelo, Serie y Ubicación física.
4. **Sección Diagnóstico y Trabajo:** Daño reportado por el cliente y Trabajo/reparación realizada por el técnico.
5. **Sección Económica:** Costo de mano de obra, repuestos y Costo Total en COP.
6. **Sello de Garantía:** Recuadro destacado con fecha exacta de vencimiento a los 3 meses.
7. **Espacio para Firmas:** Firma del técnico libre asignado y firma de recibido del cliente.

## 2. Ejemplo de Plantilla en HTML / CSS para Impresión Directa
```html
<div class="orden-servicio-card">
  <div class="header">
    <h2>ORDEN DE SERVICIO TÉCNICO</h2>
    <span>N°: OS-2026-0158</span>
  </div>
  <table class="tabla-datos">
    <tr><td><strong>Cliente:</strong> Juan Pérez</td><td><strong>Teléfono:</strong> +57 300 1234567</td></tr>
    <tr><td><strong>Equipo:</strong> Aire Split 12000 BTU</td><td><strong>Marca/Modelo:</strong> LG VM122CE</td></tr>
    <tr><td><strong>Daño:</strong> Mantenimiento y carga gas</td><td><strong>Valor Total:</strong> $90.000 COP</td></tr>
  </table>
  <div class="garantia-badge">🛡️ GARANTÍA DE 3 MESES VÁLIDA HASTA: 2026-11-30</div>
</div>
```
