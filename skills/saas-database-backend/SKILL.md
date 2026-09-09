---
name: saas-database-backend
description: >-
  Especialista en arquitectura de bases de datos relacionales PostgreSQL / Supabase,
  diseño de esquemas SQL, endpoints REST y autenticación segura para SaaS.
---

# SaaS Database & Backend Architect Skill

Esta habilidad guía la estructura relacional, la integridad referencial y las consultas optimizadas en PostgreSQL / Supabase para la plataforma **ServiSmart SaaS**.

## 1. Esquema Relacional de Base de Datos

```sql
-- TABLA DE CLIENTES
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono_whatsapp VARCHAR(20) NOT NULL,
    direccion TEXT NOT NULL,
    ciudad VARCHAR(50) DEFAULT 'Barranquilla',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE TÉCNICOS
CREATE TABLE tecnicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'disponible', -- 'disponible', 'ocupado'
    especialidad VARCHAR(100) DEFAULT 'Aires Acondicionados'
);

-- TABLA DE ÓRDENES DE SERVICIO
CREATE TABLE ordenes_servicio (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) ON DELETE RESTRICT,
    tecnico_id INT REFERENCES tecnicos(id) ON DELETE SET NULL,
    fecha_cita TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo_atencion VARCHAR(30) DEFAULT 'particular', -- 'particular', 'garantia'
    estado_orden VARCHAR(30) DEFAULT 'pendiente', -- 'pendiente', 'en_proceso', 'completado'
    precio_total NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE FICHAS TÉCNICAS
CREATE TABLE fichas_tecnicas (
    id SERIAL PRIMARY KEY,
    orden_id INT REFERENCES ordenes_servicio(id) ON DELETE CASCADE,
    tipo_equipo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50),
    numero_serie VARCHAR(50),
    dano_reportado TEXT NOT NULL,
    reparacion_realizada TEXT,
    fecha_vencimiento_garantia DATE
);
```

## 2. Buenas Prácticas de Backend
- **Uso de Transacciones SQL:** Al crear una orden, insertar cliente, orden y ficha técnica dentro de una transacción atómica.
- **Tipado Estricto:** Definir interfaces TypeScript compartidas entre backend y frontend.
- **Variables de Entorno:** Mantener credenciales y conexiones en `.env` (nunca en el repositorio público).
