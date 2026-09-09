---
name: whatsapp-integration-engine
description: >-
  Conector y generador de plantillas de mensajería automatizada por WhatsApp
  para envío de órdenes en PDF, confirmación de clientes y recordatorios.
---

# WhatsApp Integration Engine Skill

Esta habilidad gestiona el diseño de plantillas de mensajes, conectores API (Meta WhatsApp Business API, Twilio, Baileys) y flujos interactivos para ServiSmart SaaS.

## 1. Plantillas de Mensajes Estandarizadas

### Plantilla A: Envío de Orden Digital al Día Siguiente (24h)
```text
¡Hola, {{nombre_cliente}}! 👋
Esperamos que te encuentres muy bien.

Te compartimos la Orden de Servicio Digital #{{numero_orden}} correspondiente al mantenimiento de tu equipo {{tipo_equipo}} {{marca}} realizado el día de ayer por nuestro técnico {{nombre_tecnico}}.

📄 Puedes ver o descargar tu recibo oficial aquí:
{{enlace_pdf_orden}}

🛡️ Tu servicio cuenta con 3 MESES DE GARANTÍA hasta el {{fecha_vencimiento}}.

¿El equipo quedó funcionando a tu total satisfacción?
Responde 1 para SÍ 👍 o 2 para requerir revisión 🛠️.
```

### Plantilla B: Checkup Preventivo (Día 60)
```text
¡Hola, {{nombre_cliente}}! ❄️
De parte de ServiSmart queremos saber cómo sigue enfriando tu {{tipo_equipo}} {{marca}} tras el servicio realizado hace 2 meses.

Si notas algún ruido o cambio en el rendimiento, avísanos para coordinar una inspección preventiva bajo garantía. ¡Estamos para servirte!
```

### Plantilla C: Recordatorio de Vencimiento de Garantía (Día 85)
```text
Estimado(a) {{nombre_cliente}}, te recordamos que tu garantía de servicio para el equipo {{marca}} vence en 5 días ({{fecha_vencimiento}}).

Aprovecha nuestra tarifa especial de mantenimiento preventivo y limpieza profunda por solo $80.000 COP para mantener tu equipo como nuevo. ¿Deseas agendar tu cita esta semana?
```
