# Gobernanza de Ingeniería — Costa Tour (Antigravity IDE)

## 1. Control Estricto de Fases y Tokens

- **Fuente única de verdad:** Lee siempre `DESIGN.md` y `PRD.md` antes de crear o modificar código. No inventes requisitos fuera de esos documentos.
- **Desarrollo estrictamente modular:** Construye un módulo o bloque de componentes por turno. Nunca generes toda la aplicación en una sola respuesta.
- **Ahorro de contexto:** No reescribas archivos completos si solo modificas una sección; aplica ediciones quirúrgicas.
- **Barrera Frontend / Backend:** Tienes **terminantemente prohibido** crear esquemas de base de datos, rutas API de pagos, autenticación real o integraciones de Stripe/iCal hasta completar las Fases 1, 2 y 3 y recibir autorización explícita del usuario en la Fase 4.

## 2. Documentación Concurrente Obligatoria

- Antes de escribir un módulo nuevo, explica en 2-3 líneas su propósito de negocio y sus dependencias.
- Documenta el código **mientras lo escribes** (comentarios TSDoc/JSDoc) explicando el _por qué_ de las decisiones técnicas o de seguridad, nunca a posteriori.
- Actualiza `README.md` cada vez que se complete una fase estructural.

## 3. Estándares de Código, Rendimiento y SEO

- **Stack obligatorio:** Next.js (App Router), TypeScript en modo estricto (`strict: true`, prohibido usar `any`), Tailwind CSS.
- **Cálculo financiero determinista:** Todos los precios, tarifas y fianzas deben almacenarse y calcularse internamente en **céntimos enteros** (`number` entero, ej. `15000` para `150,00 €`), nunca con decimales en coma flotante. Formatea a moneda solo en la capa de presentación.
- **Rendimiento (Core Web Vitals):** Usa siempre `next/image` con dimensiones fijas o `aspect-ratio` para garantizar CLS = 0. Todo vídeo de fondo o tarjeta de catálogo debe usar carga asíncrona / _lazy loading_.
- **Accesibilidad y SEO:** Jerarquía semántica estricta (`h1` único por página), contraste AA/AAA mínimo y atributos `alt` descriptivos en el idioma activo.

## 4. Reglas de Ciberseguridad (Aplicables desde Fase 5 - Backend)

- Prohibidas las consultas SQL concatenadas; usa únicamente ORM parametrizado (Prisma o Drizzle).
- Validación estricta de todos los inputs en servidor mediante `zod`.
- Contraseñas hasheadas con `bcrypt` (mínimo 12 rondas de _salt_) y sesiones seguras con cookies `httpOnly`, `Secure` y `SameSite=Lax`.
- Prohibido almacenar números de tarjeta o CVV en base de datos local; delega el 100 % de los pagos y pre-autorizaciones de fianzas a Stripe mediante tokens y 3D Secure (SCA).
