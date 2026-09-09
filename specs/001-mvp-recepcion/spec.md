# Especificación Formal: Módulo de Recepción, Agendamiento y Alarmas de Garantía (MVP Etapa 1)

> **ID de Especificación:** SPEC-001  
> **Módulo:** Operación Administrativa y Post-Venta (Fase 1)  
> **Estado:** Aprobado para Implementación  
> **Metodología:** DSS / SDD (Desarrollo Guiado por Especificaciones) con Sintaxis EARS

---

## 1. Contexto y Objetivo

### 1.1 Contexto del Problema
Actualmente, la recepción de la empresa sufre un cuello de botella severo: la secretaria gestiona solicitudes de clientes en papel o chats dispersos, desconoce en tiempo real cuáles técnicos están libres, no lleva un registro técnico estructurado de los equipos atendidos y carece de un sistema que le recuerde las garantías de 3 meses de los servicios particulares.

### 1.2 Objetivo de la Especificación
Proveer una solución digital en línea que permita a la secretaria:
1. Registrar clientes en menos de 30 segundos.
2. Crear órdenes de servicio con ficha técnica básica del equipo y costos asociados.
3. Asignar citas filtrando en tiempo real únicamente a técnicos disponibles.
4. Emitir un recibo / orden de servicio en PDF de 1 página listo para imprimir o compartir.
5. Activar automáticamente un motor de 3 alarmas post-venta a lo largo del ciclo de garantía de 3 meses.

---

## 2. Usuarios del Sistema
- **Usuario Principal:** Secretaria / Personal de Recepción.
- **Usuario Secundario:** Técnico de Servicio en Campo (consulta de citas asignadas).
- **Usuario Supervisor:** Gerencia / Ingeniero Líder (auditoría de órdenes y métricas).
- **Beneficiario Final:** Cliente particular de climatización o electrodomésticos.

---

## 3. Historias de Usuario

- **HU-01:** Como secretaria, quiero registrar rápidamente los datos de un cliente para tener su historial centralizado y no perder prospectos.
- **HU-02:** Como secretaria, quiero ingresar los datos del equipo (marca, modelo, serie, falla) y el valor cobrado para generar una orden transparente.
- **HU-03:** Como secretaria, quiero ver qué técnicos están libres en un horario determinado para no cruzar agendas ni enviar técnicos ocupados.
- **HU-04:** Como secretaria, quiero descargar la orden de servicio en un PDF de una sola página para entregar una constancia formal al cliente.
- **HU-05:** Como administradora, quiero que el sistema me avise a las 24 horas, a los 60 días y a los 85 días de culminado el trabajo para verificar la calidad y renovar mantenimientos preventivos.

---

## 4. Requisitos Funcionales (Sintaxis EARS)

### RF-01: Gestión de Clientes (CRUD)
- **RF-01.1 [Evento]:** CUANDO la secretaria envíe el formulario de cliente con nombre completo, teléfono/WhatsApp válido y dirección, el sistema debe registrar al cliente y asignarle un identificador único.
- **RF-01.2 [Excepción]:** SI el número de teléfono o WhatsApp ingresado ya existe en la base de datos, ENTONCES el sistema debe alertar a la secretaria y ofrecer la opción de actualizar o reutilizar el cliente existente.
- **RF-01.3 [Error]:** SI algún campo obligatorio (nombre, teléfono o dirección) se envía vacío, ENTONCES el sistema debe rechazar la creación y resaltar el campo correspondiente.

### RF-02: Gestión de Órdenes de Servicio y Ficha Técnica
- **RF-02.1 [Evento]:** CUANDO la secretaria cree una orden de servicio, el sistema debe asociar obligatoriamente un cliente, una fecha/hora de cita, el tipo de atención (particular o garantía), el valor total cotizado y la ficha técnica del equipo.
- **RF-02.2 [Ubicuo]:** La ficha técnica debe capturar: Tipo de Equipo (ej. *Aire Acondicionado Split*, *TV*), Marca, Modelo, Número de Serie (opcional si es ilegible), Daño Reportado y Reparación a Realizar.
- **RF-02.3 [Estado]:** MIENTRAS la orden no haya sido atendida, su estado debe permanecer en pendiente o en_proceso.

### RF-03: Asignación Dinámica de Técnico Libre
- **RF-03.1 [Estado]:** MIENTRAS un técnico tenga su estado en disponible y no posea otra orden agendada dentro del mismo bloque horario (margen de 2 horas), el sistema debe mostrarlo en la lista de técnicos seleccionables.
- **RF-03.2 [Excepción]:** SI la secretaria intenta asignar una orden a un técnico que tiene un cruce de horario, ENTONCES el sistema debe bloquear la asignación y mostrar el conflicto en pantalla.
- **RF-03.3 [Evento]:** CUANDO se concrete la cita y se asigne el técnico, el sistema debe vincular al técnico con la orden de servicio.

### RF-04: Generador de Orden de Servicio en PDF
- **RF-04.1 [Evento]:** CUANDO la secretaria solicite imprimir o descargar la orden, el sistema debe compilar un documento PDF de exactamente 1 página tamaño Carta.
- **RF-04.2 [Ubicuo]:** El PDF debe incluir: Encabezado corporativo, Código único (OS-YYYY-XXXX), Datos del Cliente, Ficha Técnica, Costo Total desglosado en COP, Sello de Garantía de 3 Meses con fecha exacta de vencimiento y recuadros de firma.

### RF-05: Motor Automatizado de Alarmas de Garantía (3 Triggers)
- **RF-05.1 [Evento]:** CUANDO una orden de servicio de tipo particular pase a estado completada, el sistema debe calcular la fecha de vencimiento de garantía exactamente a 90 días calendario y programar 3 alarmas en la base de datos:
  - **Alarma 1 (Control de Calidad):** Programada a las **24 horas** (+1 día) de culminado el trabajo para verificación administrativa.
  - **Alarma 2 (Checkup Preventivo):** Programada a los **60 días** (+60 días) para consultar al cliente sobre el rendimiento del equipo.
  - **Alarma 3 (Aviso de Expiración):** Programada a los **85 días** (+85 días / 5 días antes de vencer) para cierre de garantía y venta de mantenimiento preventivo.
- **RF-05.2 [Ubicuo]:** Las alarmas pendientes para la fecha actual deben aparecer destacadas en el panel principal de la secretaria cada mañana.

---

## 5. Requisitos No Funcionales (RNF)

- **RNF-01 (Rendimiento):** La carga del panel de recepción y el filtrado de técnicos libres deben ejecutarse en menos de 300 ms.
- **RNF-02 (Arquitectura Limpia):** La lógica de cálculo de fechas de garantía y asignación de técnicos debe residir en core/ sin importar librerías de UI o bases de datos.
- **RNF-03 (Idioma):** Todo el código, variables y pruebas en **inglés**. Toda la interfaz y mensajes al usuario en **español**.
- **RNF-04 (Persistencia Atómica):** La creación de la orden, ficha técnica y cálculo de alarmas debe realizarse en una única transacción de base de datos.

---

## 6. Casos Límite Identificados

1. **Citas a fin de mes o año bisiesto:** El cálculo de las alarmas (Días 1, 60 y 85) debe basarse en suma de milisegundos o días naturales absolutos, nunca en sumas aproximadas de meses.
2. **Número de serie no visible:** Si la placa del equipo está desgastada o ilegible, el sistema debe admitir el texto NO_VISIBLE sin bloquear el guardado.
3. **Cero técnicos disponibles:** Si no hay técnicos libres, el sistema debe permitir guardar la orden como en_espera_tecnico sin abortar la captura del cliente.

---

## 7. Fuera de Alcance (Out of Scope - MVP Etapa 1)
- ❌ Aplicación móvil nativa para los técnicos (prevista para la Fase 3).
- ❌ Pasarela de pagos electrónicos en línea PSE/Tarjetas (Fase 3).
- ❌ Envío directo por API de WhatsApp Business oficial (Fase 2).

---

## 8. Criterios de Aceptación y Definition of Done (DoD)
1. Todas las pruebas unitarias del módulo core/ pasan con cobertura $\ge 90\%$.
2. Se valida que una orden completada cree las 3 alarmas en las fechas exactas (+1d, +60d, +85d).
3. El PDF generado cumple con el formato de 1 página sin desbordamiento.
