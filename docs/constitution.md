# Constitución Técnica del Proyecto — ServiSmart SaaS

> **Estado:** Aprobado / Innegociable  
> **Ámbito:** Toda la base de código, documentación, pruebas y despliegues de ServiSmart SaaS.  
> **Regla de Oro:** Todo Pull Request, commit o generación de código por agentes de IA que viole uno de estos principios debe ser rechazado inmediatamente.

---

## 1. Los 6 Principios Innegociables

### Principio 1: Stack Mínimo y Justificado
- **Frontend:** React / Next.js con TailwindCSS.
- **Backend / Runtime:** Node.js (TypeScript) con Express o Serverless Functions.
- **Persistencia:** PostgreSQL (Supabase o instancia local en servidor).
- **Regla:** Prohibido instalar librerías o dependencias de terceros sin justificación técnica documentada. Se prioriza el código nativo, tipado y modular.

### Principio 2: Desarrollo Guiado por Especificación (Spec → Código)
- Ninguna funcionalidad, endpoint o pantalla se programa sin una especificación formal aprobada previamente en specs/.
- El código es un reflejo fiel de la especificación, nunca al revés.

### Principio 3: Lógica Desacoplada de la Interfaz (Core First / Arquitectura Limpia)
- El módulo de dominio (core/) jamás importa componentes de React, drivers de bases de datos, APIs externas ni librerías de UI.
- La lógica de negocio (cálculo de 90 días de garantía, reglas de técnicos disponibles, validación de órdenes) debe poder ejecutarse y probarse en memoria de forma aislada.
- La interfaz de usuario (ui/) y los controladores HTTP (pi/) son meros consumidores del core/.

### Principio 4: Pruebas Automatizadas Obligatorias (TDD)
- Cobertura mínima obligatoria del **90%** en todo el código dentro de core/.
- Prohibido marcar una tarea como completada si existen pruebas en rojo (ailed).
- Cada requisito funcional (RF-xx) de la especificación debe contar con al menos una prueba unitaria o de integración automatizada.

### Principio 5: Persistencia Determinista y Atómica
- Todo guardado de datos que involucre múltiples entidades (por ejemplo: crear cliente, orden, ficha técnica y programar 3 alarmas) debe ejecutarse dentro de una **transacción atómica** (BEGIN ... COMMIT).
- Los identificadores primarios y estados deben ser predecibles y consistentes.

### Principio 6: Convención Estricta de Idiomas
- **Código Fuente, Variables, Funciones, Interfaces y Pruebas:** Escritos 100% en **inglés** (ejemplo: calculateWarrantyExpirationDate(), getAvailableTechnicians(), CustomerRepository).
- **Mensajes de Interfaz, Textos de Pantalla, Plantillas de WhatsApp y PDF:** Escritos 100% en **español** para el usuario final (secretaria, técnicos y clientes).
- **Comentarios en el Código:** Escritos en **español técnico**, concisos y explicando el *por qué* en puntos críticos de negocio (compromiso con el Ingeniero Líder).

---

## 2. Definición de Hecho (Definition of Done - DoD)

Una funcionalidad o entrega se considera formalmente terminada **únicamente** cuando:
1. La especificación formal (spec.md) cuenta con todos los criterios de aceptación EARS cubiertos.
2. Todas las pruebas unitarias y de integración pasan al 100% (
pm test).
3. El código cuenta con tipado estricto en TypeScript (cero uso de ny).
4. Se ejecuta una prueba de extremo a extremo (*Smoke Test*) verificando el flujo completo de la secretaria.
