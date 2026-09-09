# Guía Maestra: Metodología de Desarrollo Guiado por Especificaciones (DSS / SDD)

> **Propósito:** Manual de referencia para desarrollar productos de software, SaaS y microservicios con rigor de ingeniería, cero deuda técnica y calidad profesional predecible.

---

## Índice General

1. [¿Qué es el Desarrollo Guiado por Especificaciones (DSS)?](#1-qué-es-el-desarrollo-guiado-por-especificaciones-dss)
2. [Los 6 Principios Innegociables (La Constitución)](#2-los-6-principios-innegociables-la-constitución)
3. [Fase 1: Refinamiento Interactivo (/grill-me)](#3-fase-1-refinamiento-interactivo-grill-me)
4. [Fase 2: Redacción de la Especificación Formal (spec.md)](#4-fase-2-redacción-de-la-especificación-formal-specmd)
5. [Fase 3: Auditoría de Calidad (Revisión QA)](#5-fase-3-auditoría-de-calidad-revisión-qa)
6. [Fase 4: Plan Técnico de Arquitectura (plan.md)](#6-fase-4-plan-técnico-de-arquitectura-planmd)
7. [Fase 5: Desglose de Tareas Atómicas (tasks.md)](#7-fase-5-desglose-de-tareas-atómicas-tasksmd)
8. [Fase 6: Implementación con TDD Estricto](#8-fase-6-implementación-con-tdd-estricto)
9. [Fase 7: Verificación Final y Definition of Done (DoD)](#9-fase-7-verificación-final-y-definition-of-done-dod)
10. [Plantillas Rápidas para Copiar y Pegar](#10-plantillas-rápidas-para-copiar-y-pegar)

---

## 1. ¿Qué es el Desarrollo Guiado por Especificaciones (DSS)?

En la industria del software tradicional y en el desarrollo con Inteligencia Artificial, el error más común es **empezar a programar de inmediato**. Esto genera código desalineado con las necesidades del negocio, casos límite no contemplados, bugs en producción y código espagueti.

**Spec-Driven Development (DSS / SDD)** invierte el proceso:

$$\text{Constitución} \longrightarrow \text{Refinamiento} \longrightarrow \text{Especificación (QUÉ)} \longrightarrow \text{Plan (CÓMO)} \longrightarrow \text{Tareas (PASO A PASO)} \longrightarrow \text{TDD (CÓDIGO)}$$

### Beneficios Clave para un SaaS:
- **Cero ambigüedad:** Cada flujo tiene un comportamiento definido antes de codificar.
- **Trazabilidad 100%:** Cada línea de código responde a un requisito funcional (`RF-xx`).
- **Mantenibilidad extrema:** Arquitectura desacoplada (`core` aislado de interfaces, bases de datos o frameworks).
- **Desarrollo asistido por IA determinista:** Los agentes de IA no alucinan ni inventan comportamientos porque siguen contratos cerrados.

---

## 2. Los 6 Principios Innegociables (La Constitución)

Todo proyecto debe comenzar con un archivo `docs/constitution.md`. Estos principios son la ley suprema del repositorio:

| # | Principio | Regla de Oro |
| :--- | :--- | :--- |
| **1** | **Stack Mínimo** | Solo el runtime base y librerías estrictamente justificadas. Prohibido añadir dependencias por conveniencia menor. |
| **2** | **Spec $\to$ Código** | Toda funcionalidad se redacta primero en una spec con criterios de aceptación antes de escribir código. |
| **3** | **Lógica $\neq$ Interfaz (Core First)** | El dominio (`core/`) jamás importa la UI, API, CLI o bases de datos externas. Las interfaces consumen el `core`. |
| **4** | **Tests Obligatorios** | Cobertura mínima (ej. $\ge 90\%$ en `core/`). Prohibido mergear con tests en rojo. |
| **5** | **Persistencia Determinista** | Guardado de datos simple, predecible y con escrituras atómicas para evitar corrupción. |
| **6** | **Convención de Idiomas** | Código, variables, clases, pruebas y comentarios en **inglés**. Mensajes de cara al usuario en su **idioma nativo**. |

---

## 3. Fase 1: Refinamiento Interactivo (/grill-me)

Antes de escribir la especificación, se somete la idea inicial a una entrevista interactiva para erradicar cualquier ambigüedad:

### Reglas de la Fase de Entrevista:
1. **NO escribir código.**
2. Hacer preguntas **de UNA en UNA** (máximo 5 a 6 preguntas).
3. Cada pregunta debe incluir opciones claras y la **respuesta recomendada**.
4. Áreas obligatorias a preguntar:
   - Identificación de entidades (¿IDs únicos, nombres *case-insensitive*, slugs?).
   - Idempotencia (¿Qué pasa si el usuario repite la misma acción en el mismo día/segundo?).
   - Estados temporales (¿Cómo se calculan rachas, expiraciones, medianoches?).
   - Comportamiento ante errores y listas vacías.
   - Qué queda estrictamente **Fuera de Alcance (Out of Scope)** para el MVP.

---

## 4. Fase 2: Redacción de la Especificación Formal (`spec.md`)

Se almacena en `specs/XXX-feature-name/spec.md`.  
**Regla crítica:** En la spec se habla del **QUÉ** y del **POR QUÉ**. Nada de nombres de archivos, bases de datos ni frameworks.

### Sintaxis EARS (Easy Approach to Requirements Syntax) en Español:
Todos los criterios de aceptación se redactan en alguno de estos 4 patrones:

1. **Patrón Evento (Event-Driven):**
   > *CUANDO el usuario solicite crear un hábito con un nombre válido que no exista previamente, el sistema debe almacenar el hábito y mostrar un mensaje de confirmación.*
2. **Patrón Estado (State-Driven):**
   > *MIENTRAS un hábito haya sido completado hoy y en días inmediatamente anteriores, el sistema debe calcular la racha sumando los días continuos.*
3. **Patrón Excepción / Error (Unwanted Behaviour):**
   > *SI el usuario intenta crear un hábito cuyo nombre ya existe, ENTONCES el sistema debe rechazar la creación y mostrar un mensaje de error descriptivo.*
4. **Patrón Ubicuo (Ubiquitous):**
   > *El sistema debe registrar la fecha y hora de creación de cada hábito en formato estándar UTC.*

---

## 5. Fase 3: Auditoría de Calidad (Revisión QA)

Antes de proceder al diseño técnico, se realiza una revisión de control de calidad sobre la `spec.md` evaluando:

1. **Ambigüedades:** ¿Hay términos vagos como "rápido", "adecuado", "formato claro"? (Deben cambiarse por métricas concretas, ej. `< 200 ms`, plantilla textual exacta).
2. **Contradicciones:** ¿Un requisito dice que la racha se almacena fija y otro que se calcula dinámicamente?
3. **Casos límite:** Reloj del sistema hacia atrás, caracteres con tildes/emojis, espacios en blanco superfluos.
4. **Alineación con la Constitución:** ¿Se respeta el idioma y los principios base?

---

## 6. Fase 4: Plan Técnico de Arquitectura (`plan.md`)

Ubicado en `specs/XXX-feature-name/plan.md`. Define el **CÓMO**:

1. **Árbol de Módulos:** Ubicación exacta de cada archivo (`src/domain/`, `src/storage/`, `src/api/`, `tests/`).
2. **Modelo de Datos:** Estructura de persistencia con esquemas JSON / tablas SQL reales.
3. **Pseudocódigo de Algoritmos:** Lógica matemática, cálculos de negocio o transacciones.
4. **Contrato de Interfaz:** Rutas REST, argumentos CLI, códigos de salida (`Exit Codes`), salidas exactas en consola o JSON responses.
5. **Decisiones Técnicas Justificadas:**
   - Decisión tomada vs alternativas descartadas y el motivo técnico del descarte.
6. **Estrategia de Tests y Trazabilidad:** Mapeo directo entre cada `RF-xx` y los archivos de test.

---

## 7. Fase 5: Desglose de Tareas Atómicas (`tasks.md`)

Ubicado en `specs/XXX-feature-name/tasks.md`.  
Cada tarea debe cumplir:
- **Atómica:** Realizable en **15 a 30 minutos**.
- **Ordenada:** Las dependencias se implementan de abajo hacia arriba (Setup $\to$ Dominio $\to$ Persistencia $\to$ Servicios $\to$ UI/CLI/API $\to$ DoD).
- **Verificable:** Debe incluir una línea `"Hecho cuando:"` con un comando de test exacto.

### Ejemplo de Tarea:
```markdown
- [ ] **Tarea 2.2: Algoritmo de Cálculo de Racha (`core/streaks.py`)**
  - **Estimación:** 25 min
  - **RF / RNF cubiertos:** RF-03 (RF-03.1 a RF-03.4), Casos Límite 1 y 4.
  - **Dependencias:** Tarea 2.1.
  - **Descripción:** Implementar funciones puras de cálculo de rachas continuas con soporte para fecha de referencia inyectable.
  - **Hecho cuando:** `pytest tests/test_core/test_streaks.py` pasa al 100% con todos los casos de frontera.
```

---

## 8. Fase 6: Implementación con TDD Estricto

Se ejecuta tarea por tarea siguiendo el ciclo de **Test-Driven Development (TDD)**:

```
[1. Escribir Test Unitario] 
       ↓
[2. Ejecutar Runner: 🔴 Falla (Red)]
       ↓
[3. Escribir Código Mínimo en Dominio/Servicio]
       ↓
[4. Ejecutar Runner: 🟢 Pasa (Green)]
       ↓
[5. Refactorizar y Tipar (Refactor)]
       ↓
[6. Marcar Checkbox [x] en tasks.md]
```

### Reglas de Implementación:
- No pasar a la siguiente tarea hasta que la tarea actual tenga sus tests en verde.
- El código de negocio (`core`) no debe contener llamadas a `print`, `console.log` ni capturas de pantalla de UI.

---

## 9. Fase 7: Verificación Final y Definition of Done (DoD)

Para certificar la entrega de una especificación:
1. **Ejecutar Suite Completa:** `pytest -v --cov --cov-fail-under=90` con cero fallos.
2. **Verificación de Trazabilidad:** Cada `RF-xx` de la spec tiene al menos una prueba automatizada asociada.
3. **Smoke Test:** Ejecutar la aplicación de extremo a extremo simulando el uso de un usuario real.
4. **Cierre:** Actualizar la documentación y marcar la versión.

---

## 10. Plantillas Rápidas para Copiar y Pegar

### Plantilla `docs/constitution.md`
```markdown
# Constitución del Proyecto — [Nombre del Proyecto]

> Principios innegociables. Todo PR o cambio que viole uno se rechaza.

1. **Stack mínimo:** [Definir lenguaje y librerías permitidas]. Cero dependencias externas no justificadas.
2. **Spec → Código:** Toda feature tiene primero una spec aprobada; el código la implementa, nunca al revés.
3. **Lógica ≠ Interfaz:** El módulo `core/` no depende de APIs, CLIs ni frameworks externos.
4. **Tests obligatorios:** Cobertura mínima [90%] en `core/`. Cero tests rotos permitidos.
5. **Persistencia determinista:** [Definir motor/archivo de persistencia y escrituras atómicas].
6. **Idioma:** Código, variables y tests en **inglés**. Mensajes para el usuario en **español**.
```

### Plantilla `specs/XXX-feature/spec.md`
```markdown
# Especificación: [Nombre de la Funcionalidad]

## 1. Contexto y Objetivo
### 1.1 Contexto
[Problema actual o necesidad]
### 1.2 Objetivo
[Qué resuelve esta funcionalidad]

## 2. Usuarios
- **Usuario Principal:** [Perfil]
- **Necesidad Clave:** [Objetivo prioritario]

## 3. Historias de Usuario
- **HU-1:** Como [rol], quiero [acción] para [beneficio].

## 4. Requisitos Funcionales (RF)
### RF-01: [Nombre del Requisito]
- **RF-01.1 (Evento):** CUANDO [evento], el sistema debe [acción].
- **RF-01.2 (Excepción):** SI [error], ENTONCES el sistema debe [mensaje/mitigación].

## 5. Requisitos No Funcionales (RNF)
- **RNF-01:** [Rendimiento / Idioma / Seguridad]

## 6. Casos Límite
1. [Caso frontera 1]

## 7. Fuera de Alcance
- [Funcionalidad excluida 1]

## 8. Criterios de Finalización (DoD)
1. Todos los criterios EARS cubiertos por pruebas automatizadas.
```
