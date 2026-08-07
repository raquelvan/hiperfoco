# Plantilla maestra de guías Hiperfoco

Esta es la plantilla fija para las guías de compra y decisión de Hiperfoco. No afecta a la plantilla de reviews.

## Orden visual obligatorio

1. Breadcrumbs.
2. Hero editorial con:
   - etiqueta de tipo de guía;
   - H1 claro orientado a intención de búsqueda;
   - entradilla breve;
   - fecha de actualización y nota de transparencia.
3. Bloque lateral **Respuesta rápida** con una conclusión concreta y citable.
4. Tres recomendaciones principales en tarjetas:
   - mejor para la mayoría;
   - mejor para una necesidad relevante;
   - alternativa/premium/económica según la guía.
5. Tabla comparativa visible en HTML.
6. Bloque **Cuál elegir según tu caso** con decisiones por necesidad real.
7. Explicación editorial corta con criterios de compra y bloque destacado Hiperfoco.
8. FAQ con preguntas formuladas como búsquedas naturales.
9. Bloque breve de metodología/transparencia.
10. Contenidos relacionados con enlaces internos a reviews, comparativas y otras guías del mismo clúster.

## Reglas de diseño

- Usar `../assets/styles.css` + `../assets/guide-sprint3.css`.
- Contenedor principal: `container s3-guide`.
- No crear iconos decorativos grandes ni bloques que aumenten el scroll sin aportar decisión.
- Priorizar tarjetas compactas, tablas legibles y una respuesta visible sin hacer scroll excesivo.
- Mobile first: hero en una columna, recomendaciones apiladas y tabla con scroll horizontal.
- Mantener la identidad visual verde/crema y tipografía editorial actual de Hiperfoco.
- No modificar la plantilla de reviews para adaptar una guía.

## SEO / GEO

- Title y H1 alineados con la intención principal, sin sobreoptimización.
- Meta description útil y específica.
- Canonical propio.
- Información importante escrita directamente en HTML.
- Respuesta corta y explícita cerca del H1 para facilitar comprensión y extracción por buscadores/IA.
- Usar `Article`; añadir `FAQPage` cuando exista FAQ real y `ItemList` cuando haya ranking/listado de productos.
- No inventar pruebas físicas ni experiencia de uso propia. Indicar el carácter editorial/documentado cuando corresponda.
- Enlazar a las reviews propias relevantes y desde las reviews/comparativas hacia la guía cuando aporte contexto.
- Evitar canibalización: cada guía debe resolver una intención distinta (mejores, calidad-precio, marca vs marca, necesidad concreta, problema concreto, etc.).

## Monetización

- Los enlaces de afiliado deben dirigir al producto correcto sin alterar el diseño.
- Cuando se reciba un nuevo enlace de afiliado, sustituir únicamente el enlace anterior correspondiente.
- No cambiar textos, estructura o diseño al actualizar afiliación o precios salvo petición expresa.
