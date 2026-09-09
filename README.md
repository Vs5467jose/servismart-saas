# ServiSmart SaaS — Guía Operativa y Playbook de Prompts DSS

> **Metodología Oficial:** Desarrollo Guiado por Especificaciones (DSS / SDD - Spec-Driven Development)  
> **Objetivo:** Construir la plataforma **ServiSmart SaaS** con cero ambigüedad, código limpio modular, alta cobertura de pruebas y arquitectura desacoplada.

---

## 🧭 El Ciclo de Desarrollo DSS

\\text{Fase 1: Constitución} \\longrightarrow \\text{Fase 2: Especificación (QUÉ)} \\longrightarrow \\text{Fase 3: Plan Técnico (CÓMO)} \\longrightarrow \\text{Fase 4: Tareas Atómicas} \\longrightarrow \\text{Fase 5: TDD (Código)}

Este repositorio contiene las instrucciones y **los prompts exactos listos para copiar y pegar en el agente de IA** para avanzar fase por fase.

---

## 🗂️ Estructura del Repositorio

`	ext
ServiSmart SaaS/
├── docs/
│   ├── constitution.md             # Ley suprema y principios innegociables
│   └── guia-metodologia-dss.md     # Manual metodológico de referencia
├── specs/
│   └── 001-mvp-recepcion/
│       ├── spec.md                 # Especificación formal EARS (QUÉ y POR QUÉ)
│       ├── plan.md                 # Plan de arquitectura técnica (CÓMO)
│       └── tasks.md                # Desglose de tareas atómicas de 15-30 min
├── skills/                         # Habilidades especializadas de desarrollo
├── src/                            # Código fuente de la aplicación
│   ├── core/                       # Lógica de dominio pura e independiente
│   ├── storage/                    # Persistencia en base de datos PostgreSQL
│   ├── api/                        # Controladores y rutas REST
│   └── ui/                         # Interfaz React / Next.js
└── tests/                          # Pruebas unitarias y de integración
`

---

## 🤖 Playbook de Prompts por Fase (Copiar y Pegar)

### 📌 FASE 1: Constitución del Proyecto
*Ejecutar al iniciar el proyecto o al incorporar nuevos principios de arquitectura.*

`	ext
Actúa como Arquitecto de Software Principal bajo la metodología DSS (Spec-Driven Development).
Revisa el archivo docs/constitution.md de ServiSmart SaaS.
Asegúrate de que todos los principios innegociables (Stack mínimo, Spec -> Código, Core desacoplado de UI, Tests obligatorios >= 90%, Persistencia determinista y Código en inglés / UI en español) estén estrictamente respetados para la siguiente fase. Confírmame tu alineación antes de continuar.
`

---

### 📌 FASE 2: Especificación Formal (El QUÉ — Sintaxis EARS)
*Ejecutar para redactar o ajustar los requisitos de una nueva funcionalidad.*

`	ext
Actúa como Product Manager y Analista de Requisitos bajo metodología DSS.
Vamos a trabajar en la especificación specs/001-mvp-recepcion/spec.md para el MVP de ServiSmart SaaS.
Reglas estrictas:
1. Habla únicamente del QUÉ y del POR QUÉ (prohibido mencionar nombres de frameworks, librerías o bases de datos).
2. Redacta todos los Requisitos Funcionales bajo la sintaxis EARS en español:
   - Evento: CUANDO [condición/evento], el sistema debe [resultado].
   - Estado: MIENTRAS [estado activo], el sistema debe [comportamiento].
   - Excepción/Error: SI [condición inválida], ENTONCES el sistema debe [acción/mensaje].
   - Ubicuo: El sistema debe [propiedad permanente].
3. Incluye historias de usuario, requisitos no funcionales, casos límite y lo que queda estrictamente Fuera de Alcance.
Genera la especificación completa para revisión.
`

---

### 📌 FASE 3: Plan Técnico de Arquitectura (El CÓMO)
*Ejecutar una vez aprobada la especificación para diseñar la arquitectura limpia.*

`	ext
Actúa como Tech Lead y Arquitecto de Software bajo metodología DSS.
Tomando como única fuente de verdad la especificación specs/001-mvp-recepcion/spec.md y la constitución docs/constitution.md, genera el archivo specs/001-mvp-recepcion/plan.md.
El plan debe definir:
1. Árbol de archivos exacto respetando la separación limpia: src/core/ (lógica pura sin dependencias), src/storage/ (PostgreSQL), src/api/ y src/ui/.
2. Modelo de datos con script SQL para las tablas de PostgreSQL (clientes, tecnicos, ordenes_servicio, fichas_tecnicas, alarmas_garantia).
3. Interfaces TypeScript con tipado estricto (en inglés) para todas las entidades.
4. Pseudocódigo o algoritmos de las reglas críticas (asignación de técnicos libres y cálculo de las 3 alarmas de garantía a +1d, +60d y +85d).
5. Estrategia de pruebas y matriz de trazabilidad mapeando cada RF-xx a su archivo de test.
`

---

### 📌 FASE 4: Desglose de Tareas Atómicas
*Ejecutar para crear la lista de verificación paso a paso.*

`	ext
Actúa como Scrum Master Técnico bajo metodología DSS.
Tomando como base el plan specs/001-mvp-recepcion/plan.md, genera el archivo specs/001-mvp-recepcion/tasks.md.
Requisitos para las tareas:
1. Cada tarea debe ser atómica (estimada entre 15 y 30 minutos).
2. Ordenadas de abajo hacia arriba: Dominio Core -> Persistencia/Repositorios -> Casos de Uso -> Controladores API -> Interfaz UI -> Verificación DoD.
3. Cada tarea debe incluir:
   - ID y Nombre de la tarea.
   - RF cubiertos.
   - Archivo exacto a crear o modificar.
   - Criterio de verificación: 'Hecho cuando: [comando de test exacto]'.
Genera el desglose completo con checkboxes [ ] listos para marcar.
`

---

### 📌 FASE 5: Implementación con TDD Estricto (Red → Green → Refactor)
*Ejecutar tarea por tarea para escribir el código con pruebas automatizadas.*

`	ext
Actúa como Desarrollador Senior de Software siguiendo TDD estricto bajo metodología DSS.
Vamos a implementar la Tarea [INDICAR NÚMERO DE TAREA, ej: Tarea 1.2: Algoritmo de Alarmas de Garantía].
Sigue estrictamente este ciclo:
1. Escribe primero el archivo de prueba unitaria en tests/ cubriendo los casos normales y casos límite de la especificación.
2. Ejecuta la prueba y verifica que falle (🔴 RED).
3. Escribe el código de implementación mínimo necesario en src/core/ para que la prueba pase (🟢 GREEN).
4. Refactoriza el código: asegura tipado TypeScript estricto, nombres claros en inglés y añade comentarios explicativos en español en los puntos críticos de negocio (🔵 REFACTOR).
5. Ejecuta nuevamente la suite de pruebas para confirmar el 100% de éxito y marca la tarea como completada [x] en tasks.md.
Procede con el primer paso.
`

---

## 🎯 Resumen de Entregables para el Ingeniero Líder y el Cliente

1. **docs/constitution.md**: Garantía de calidad, arquitectura limpia y cero deuda técnica.
2. **specs/001-mvp-recepcion/spec.md**: Contrato funcional cerrado y validado del MVP.
3. **Propuesta_Comercial_ServiSmart_SaaS_v2.docx**: Propuesta comercial en Word ( Setup +  Trimestral).
4. **Contrato_Desarrollo_y_Mantenimiento_ServiSmart.docx**: Contrato legal comercial listo para firma.
