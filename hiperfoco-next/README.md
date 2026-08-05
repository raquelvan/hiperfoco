# Hiperfoco

**Nos obsesionamos. Tú compras mejor.**

Plataforma editorial de reviews, comparativas y guías de compra independientes.

## Tecnología

- Next.js 16 (App Router)
- React 19
- TypeScript
- Exportación estática
- Netlify

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Producción

```bash
npm run build
```

El sitio se exporta en la carpeta `out`.

## Añadir una review

1. Duplica una entrada del array `reviews` en `data/site.ts`.
2. Cambia el `slug`, los textos, criterios, FAQ, fuentes y alternativas.
3. La ruta, el sitemap, la categoría y el buscador se actualizan automáticamente.
4. Revisa que todas las afirmaciones estén respaldadas y distingue siempre entre `Análisis editorial documentado` y `Probado por Hiperfoco`.

## Afiliación

Los botones de precio están desactivados hasta incorporar enlaces verificados. Nunca publiques precios sin fecha de revisión ni afirmes que un producto se ha probado físicamente cuando no sea cierto.
