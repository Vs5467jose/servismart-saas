# Prompt Maestro Reestructurado: Prototipo Interactivo ServiSmart SaaS (Demo para el Ing. Líder)

> **Propósito:** Prompt de ingeniería de alto impacto listo para usar en DeepAgent / IA para generar una aplicación web funcional completa (interfaz interactiva, lógica de agendamiento, cálculo de garantías y base de datos con datos simulados realistas) lista para sorprender y convencer al Ingeniero Líder y a la Gerencia.

---

## 📋 Prompt para Copiar y Pegar en la IA (DeepAgent / Claude / ChatGPT)

```text
Actúa como Ingeniero de Software Full-Stack Senior y Diseñador UX/UI de aplicaciones SaaS.

Construye una aplicación web interactiva, moderna y lista para demostración para "ServiSmart SaaS": una plataforma especializada en agendamiento de citas, gestión de servicios técnicos particulares y control automatizado de garantías de 3 meses para empresas de climatización (aires acondicionados) y electrodomésticos (TVs, refrigeración).

La aplicación debe estar construida en un solo archivo interactivo o SPA moderna (HTML5 + Tailwind CSS + Vanilla JS / React) con diseño visual profesional de alto contraste (paleta en tonos Azul Marino #0f172a, Azul Real #2563eb, Gris Pizarra y Acentos Verde/Ámbar), pensada para que la secretaria administre todo con facilidad.

---

### 1. REQUERIMIENTOS FUNCIONALES CLAVE (MVP ETAPA 1)

1. Dashboard Principal de la Secretaria:
   - Métricas en la parte superior: Citas de Hoy, Solicitudes Pendientes, Técnicos Disponibles y Alarmas de Garantía Activas.
   - Buscador universal para filtrar instantáneamente por nombre de cliente, teléfono o placa/serie del equipo.

2. Pipeline Kanban de Órdenes de Servicio:
   - Columnas de estados:
     * "Nueva Solicitud" (Solicitudes particulares entrantes sin agendar).
     * "Agendada / Asignada" (Cita fijada con técnico libre).
     * "En Servicio" (Técnico ejecutando revisión o mantenimiento).
     * "Completada / Garantía Activa" (Servicio culminado, activa los 3 meses de garantía).
   - Tarjetas dinámicas que muestran: Código de Orden (ej. OS-2026-0101), Cliente, Teléfono WhatsApp, Tipo de Equipo, Marca/Modelo, Técnico asignado y Costo en Pesos Colombianos (COP).
   - Capacidad de mover tarjetas entre columnas (drag-and-drop o botones de cambio de estado rápido).

3. Formulario Modal para Nueva Orden de Servicio (Registro en 30 Segundos):
   - Datos del Cliente: Nombre completo, Teléfono/WhatsApp, Dirección y Barrio/Ciudad.
   - Ficha Técnica del Equipo: Selector de tipo (Aire Acondicionado Split, Cassette, Central, Smart TV, Nevera), Marca (LG, Samsung, Mabe, Carrier, etc.), Modelo, Número de Serie y Daño Reportado.
   - Costos en COP: Valor del servicio (Precios de referencia: Mantenimiento/Limpieza básica $80.000 - $100.000 COP; Reparaciones complejas o carga de gas $150.000 - $220.000 COP).
   - Asignación de Técnico Libre: Dropdown interactivo que FILTRA AUTOMÁTICAMENTE a los técnicos con estado "Disponible", bloqueando a los que están ocupados.

4. Motor Inteligente de 3 Alarmas de Garantía (90 Días / 3 Meses):
   - Al marcar una orden como "Completada", el sistema calcula la fecha de vencimiento sumando exactamente 90 días naturales y activa 3 alarmas automáticas:
     * Alarma 1 (+24h / Día 1): Control de Calidad Administrativo (Verificar si el cliente quedó satisfecho).
     * Alarma 2 (+60 Días / Día 60): Checkup Preventivo (Preguntar cómo sigue enfriando/funcionando el equipo).
     * Alarma 3 (+85 Días / Día 85): Aviso de Expiración (Avisar que quedan 5 días de garantía y ofrecer nuevo mantenimiento preventivo a tarifa especial).
   - Módulo visual de campana de notificaciones / lista de alarmas con botón de "Enviar WhatsApp al Cliente" simulado.

5. Visor de Orden de Servicio Imprimible (Plantilla PDF de 1 Página):
   - Al hacer clic en una orden, se abre una vista modal con formato oficial de recibo/orden técnica lista para imprimir en 1 página:
     * Logotipo institucional simulado ("ServiSmart Technical Services").
     * Datos del cliente, expediente técnico del equipo, diagnóstico y reparación.
     * Desglose de costos en COP y recuadros de firma del técnico y del cliente.
     * Sello destacado: "GARANTÍA DE SERVICIO: 3 MESES (VÁLIDA HASTA: DD/MM/AAAA)".

---

### 2. DATOS SIMULADOS REALISTAS PRE-CARGADOS (SEEDED MOCK DATA)

La demo debe arrancar con datos ficticios realistas precargados para que el Ingeniero Líder pueda ver la aplicación funcionando de inmediato:

#### A. Técnicos Pre-cargados:
1. Carlos Mendoza — Especialidad: Climatización / Aires Acondicionados — Estado: Disponible (🟢 Libre).
2. Javier Gómez — Especialidad: Refrigeración y Aires Centrales — Estado: En Servicio (🔴 Ocupado).
3. Andrés Silva — Especialidad: Electrónica y Smart TVs — Estado: Disponible (🟢 Libre).

#### B. Clientes y Órdenes Pre-cargadas en el Pipeline:
- Orden OS-2026-0041 (Estado: Completada / Garantía Activa):
  * Cliente: Dra. Marcela Restrepo | WhatsApp: +57 310 456 7890 | Dir: Cra 54 # 72-109, Prado
  * Equipo: Aire Acondicionado Split 12000 BTU | Marca: LG Dual Inverter | Serie: LG-90234
  * Daño: Falta de enfriamiento y filtro taponado | Reparación: Mantenimiento profundo y limpieza de turbina
  * Costo: $90.000 COP | Técnico: Carlos Mendoza
  * Garantía: 3 Meses (Vence en 65 días - Alarma 2 programada).

- Orden OS-2026-0042 (Estado: En Servicio):
  * Cliente: Restaurante La Cabaña Express | WhatsApp: +57 301 234 5678 | Dir: Calle 84 # 47-30
  * Equipo: Aire Cassette 36000 BTU | Marca: Carrier | Serie: CR-77821
  * Daño: Goteo constante en bandeja de condensado | Reparación: Desobstrucción de drenaje y limpieza de serpentín
  * Costo: $180.000 COP | Técnico: Javier Gómez (Ocupado).

- Orden OS-2026-0043 (Estado: Agendada):
  * Cliente: Edificio Torre Palma Real (Apt 502) | WhatsApp: +57 315 789 1234 | Dir: Calle 98 # 52-20
  * Equipo: Smart TV 65" OLED | Marca: Samsung | Serie: SAM-OLED65-44
  * Daño: Líneas horizontales en pantalla y reinicio intermitente | Costo Cotizado: $160.000 COP
  * Técnico Asignado: Andrés Silva | Cita: Hoy a las 3:00 PM.

- Orden OS-2026-0044 (Estado: Nueva Solicitud):
  * Cliente: Roberto Manotas | WhatsApp: +57 320 654 3210 | Dir: Cra 43 # 68-12
  * Equipo: Aire Acondicionado Split 18000 BTU | Marca: Mabe | Serie: NO_VISIBLE
  * Daño Reportado: Equipo enciende pero no arranca el compresor | Costo Estimado: $120.000 COP
  * Técnico: Sin asignar (Pendiente por la secretaria).

---

### 3. ESTILO VISUAL Y DETALLES DE PRODUCCIÓN
- Todo el texto, botones y estados deben estar en Español.
- Los valores monetarios deben formatearse con signo de pesos y separador de miles: ej. $90.000 COP.
- Incluye mensajes visuales tipo Toast o alert cuando la secretaria crea una orden, asigna un técnico o cambia de estado.
- Código limpio, modular y sin errores de consola.
```

---

## 🎯 ¿Por qué este prompt convencerá al Ingeniero Líder?

| Elemento del Prompt | ¿Qué demuestra al Ing. Líder? |
| :--- | :--- |
| **Foco en el Cuello de Botella** | Demuestra que entendiste el dolor operativo real: recepción saturada y servicios particulares sin trazabilidad. |
| **Filtro de Técnicos Libres** | Demuestra lógica de negocio real (evita cruces de agenda y optimiza la asignación del personal). |
| **Ficha Técnica Incorporada** | Muestra que no es un CRM genérico de ventas, sino una herramienta de **servicio técnico especializado** (HVAC / TVs). |
| **Motor de Alarmas de 3 Etapas** | Muestra el valor de post-venta y retención de clientes a los 3 meses (fidelización automática). |
| **Datos Simulados en Pesos Colombianos (COP)** | Le permite al Ingeniero Líder interactuar con nombres locales, direcciones reales y precios del mercado colombiano. |
