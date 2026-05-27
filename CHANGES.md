# Nexo Studio — Set de cambios aplicados

Este paquete reescribe los archivos del proyecto Next.js. Para aplicarlos:

1. Copiá el contenido de `nexo-studio-mod/` sobre tu carpeta `nexo-studio/` (los paths coinciden).
2. Eliminá manualmente los archivos huérfanos del repo:
   - `components/ui/FloatingStyleSwitcher.tsx` (sin uso)
   - `components/ui/adsad` (basura)
   - `update_corporate.js` (root)
   - `public/Microsoft.Services.Store.winmd`
3. Corré `npm install` (no se agregan deps, todo está en lucide / framer / next).
4. `npm run dev` → revisá `localhost:3000`.

---

## Configuración global

### `app/layout.tsx`
- Agregado `Cormorant_Garamond` vía `next/font/google` (variable `--font-serif-editorial`).
- Número de WhatsApp actualizado a **5492616527611** (era 5492616527611 ya, confirmado).
- Mensaje default de WhatsApp más cálido.
- Metadata reescrita: no menciona precios, sí menciona "100% a medida".

### `app/globals.css`
- Sumado `:focus-visible` global (accesibilidad — antes se perdía el foco por el reset de tap-highlight).
- Bloque `@media (prefers-reduced-motion: reduce)` que apaga TODAS las animaciones.
- Eliminada la regla `.services-active nav { display:none }` — ya no escondemos el navbar.
- Clase utilitaria `studio-nav.compact` por si el navbar quiere compactarse en algún flujo.

### `components/types.ts`
- Nueva interfaz `DemoProps` con `onBackToStudio` y `onSwitchDemo`. Todas las demos la implementan.

### `components/constants.tsx`
- `WHATSAPP_NUMBER` y helper `whatsappLink(msg)` exportados y usados en TODAS las CTAs.
- `NAV_ITEMS`: "Nosotros" → "Estudio".
- `STYLE_CARDS`: descripciones limpiadas, bullets simplificados.

### `components/ui/FloatingWhatsAppButton.tsx`
- Default phoneNumber hardcodeado en **5492616527611** por si el layout no lo pasa.

---

## Componentes nuevos

### `components/ui/DemoContextBar.tsx`
Barra superior negra que se monta sobre cada demo. Muestra:
- Botón "← Volver a Nexo Studio".
- Chip "DEMO" en el color del estilo.
- Texto: "Estilo X — diseño 100% a medida, no es plantilla".
- Link "Quiero uno así →" que abre WhatsApp.

Se reposiciona vía CSS var `--demo-bar-h` para que el Navbar se acomode debajo.

### `components/ui/Particles.tsx`
Canvas full-bleed con partículas y líneas conectoras. Sin dependencias.
- Densidad escalada al área (no satura mobile).
- Respeta `prefers-reduced-motion` (render estático).
- Usado en el hero del Home y en el bloque de CTA final.

### `components/ui/ScrollDownIndicator.tsx`
Cápsula flotante para la demo de Moda:
- Mano + flecha que baja, texto: **"Scrollea siempre hacia abajo para vivir la experiencia"**.
- Se oculta al primer scroll >40px o a los 8s.
- Persistencia por `sessionStorage` (no molesta dos veces).
- Respeta `prefers-reduced-motion`.

---

## Navbar (`components/ui/Navbar.tsx`)

Rediseñado:
- Logo con fallback **manejado por state React** (no más conflict `hidden flex` ni mutación del DOM via `onError`).
- Estructura: **Estudio** · **Demos ▾** · **Hablemos** (CTA negro que abre WhatsApp).
- "Demos" como dropdown desktop con thumbnails + label "diseño 100% a medida — no son plantillas".
- Mobile menu reescrito: lista limpia + CTA de WhatsApp al pie.
- Altura unificada **56/64px** (antes saltaba de 48 a 80).
- `aria-haspopup`, `aria-expanded`, `role="menu"`, cierre con Esc.

---

## `app/page.tsx`

- `AnimatePresence` ya envuelve las vistas — las transiciones `exit` ahora disparan.
- `setView` provoca `scrollTo(0,0)` limpio.
- Cada demo recibe `onBackToStudio` y `onSwitchDemo`.
- Cuando hay demo activo: se monta `<DemoContextBar>` y se setea `--demo-bar-h`.
- El navbar **ya no se oculta** en Moda (eliminé `navHidden`).

---

## Vistas

### `HomeView.tsx`
- **Partículas** detrás del hero y dentro del bloque negro de contacto.
- **Cero menciones de precio.** Se eliminó "Desde $200.000" en todas sus apariciones.
- **Aviso destacado**: chip negro que dice **"Estas son demos · no son plantillas. Cada diseño es hecho 100% a medida."**
- CTAs del hero: **Explorar demos** + **Hablar por WhatsApp** (link directo).
- "Señales de confianza" reescritas con cosas verificables: "Lighthouse 95+", "Vos sos dueño del código", etc.
- Blur-reveal del headline ampliado de **35px → 320px** (ahora se ve).
- Sección final con **dos CTAs reales**: WhatsApp directo + `<BriefForm>` con nombre/proyecto/presupuesto que abre WhatsApp con la plantilla armada.
- Timeline de proceso ahora usa días (D0 → D7).

### `CorporateView.tsx`
- **`<ProcessStep>` extraído** como subcomponente → los `useTransform` dejan de estar dentro de `.map` (rules-of-hooks OK).
- `MagneticButton` respeta `prefers-reduced-motion` y bajó el factor a **0.16**.
- `<Marquee>` también respeta reduced-motion.
- **Marcas placeholder honestas**: "TU CLIENTE 01..." con texto debajo que aclara "logos de tus clientes aquí".
- **Stats con disclaimer**: "Demo · números placeholder. En el sitio real se reemplazan por tus métricas verificables."
- **`<ContactForm>` real**: labels visibles, validación mínima, abre WhatsApp con datos formateados.
- CTAs del hero, banner y modal final abren WhatsApp con plantillas distintas.
- Footer: WhatsApp del estudio + botón "← Volver al estudio".

### `GastroView.tsx`
- Tipografía corregida: usa **Cormorant Garamond** real (antes caía en Times del sistema).
- Botón "Reservar Mesa" abre **`<ReservaModal>`**: fecha, hora, comensales, notas → submit derivado a WhatsApp con el mensaje armado.
- **Eliminado el FAB amber duplicado** (chocaba con el WhatsApp del layout).
- Horarios usan `<dl>` con grid (antes `flex justify-between` se rompía con días largos).
- aria-labels en Instagram/Facebook.
- Botón "Volver al estudio Nexo" en el cierre.

### `CatalogView.tsx`
- **Carrito drawer real** (slide-in derecha, con cantidades, total, finalizar por WhatsApp con lista de productos).
- Badge con contador en el navbar local.
- **Info "48hs · Garantía 12m" ahora siempre visible** (antes solo en hover, invisible en mobile).
- aria-labels en todos los íconos.
- Sticky de filtros usa `top: calc(var(--demo-bar-h) + 56px)` — no se apila incoherentemente.
- Mensaje "no encontramos productos" con botón "Limpiar filtros".

### `HealthView.tsx`
- **Sección de equipo nueva**: 3 médicos placeholder con foto, rol, matrícula.
- Quotes corregidas: ahora **«texto»** (antes `"’texto’"` con tipografías mezcladas).
- **Panel de detalle del servicio activo**: se anima cuando cambia, muestra duración y CTA "Consultar" → WhatsApp.
- "Agendar Consulta" abre WhatsApp con la plantilla.
- Footer con disclaimer: habilitación · dirección médica responsable · privacidad.

### `FashionView.tsx`
- **`@ts-nocheck` removido** — el archivo está tipado.
- **Cero precios.** Cada `<ProductCard>` reemplaza el precio por un botón "Consultar disponibilidad" que abre WhatsApp con el nombre de la pieza.
- **Imágenes reasignadas, sin duplicados dentro de la misma sección:**
  - Hero: `moda1`
  - Destacados (3): `moda2`, `moda3`, `moda4`
  - Cápsula sticky: `moda5`
  - Cápsula productos: `moda6`, `moda7`
  - Atelier desktop (200vh): `moda8`
  - Atelier mobile (3): `moda9`, `moda10`, `moda11`
  - Horizontal scroll (3): `moda12`, `moda13`, `moda14`
  - Must Have (2): `moda15`, `moda16`
  - IG grid (6): selección variada
- **Indicador "Scrollea siempre hacia abajo"** (componente `<ScrollDownIndicator />`).
- **Scroll horizontal reescrito con `useScroll` de framer-motion** (antes era `addEventListener('scroll')` que generaba jank).
- El navbar **ya no se oculta** (eliminado `onStickyChange`).
- Footer con CTA "← Volver al estudio Nexo" + "diseño 100% a medida por Nexo Studio".
- Bloque "Nuestra historia" usa Cormorant.

---

## Lo que queda para un sprint siguiente (no se aplicó acá)

Por scope. Lo bueno: el set actual es suficiente para subir el sitio con confianza.

- **Migración a rutas Next** (`/demo/[slug]`) — hoy sigue siendo state, pero el resto del refactor lo deja listo.
- **API route real** para el formulario de contacto (hoy deriva todo a WhatsApp, lo cual ya es funcional).
- **Sección "Trabajos reales"** en Home — necesita material real del estudio.
- **Imágenes a `next/image` + WebP/AVIF** de los `moda*.png` — recomendado para Lighthouse.
- **Tabla de paquetes** — la sacamos para no mostrar precios; si querés algo intermedio (paquetes sin precio, solo scope), avisame.

---

## Número de WhatsApp

Centralizado en `components/constants.tsx`:

```ts
export const WHATSAPP_NUMBER = "5492616527611";
```

Si cambia, se actualiza en un solo lugar y todas las CTAs (hero, navbar, demos, footers, formularios, carritos, reservas) lo toman.
