# Publicar Hiperfoco: GitHub + Netlify + Porkbun

## 1. Subir el proyecto a GitHub

1. Descomprime `hiperfoco-github.zip`.
2. En tu repositorio `raquelvan/hiperfoco`, pulsa **Add file → Upload files**.
3. Arrastra **todos los archivos y carpetas que están dentro** de `hiperfoco-next`.
4. En el mensaje escribe: `Subir Hiperfoco V1`.
5. Pulsa **Commit changes**.

Importante: `package.json`, `app`, `components`, `data` y `public` deben aparecer en la raíz del repositorio, no dentro de otra carpeta.

## 2. Conectar Netlify

1. Entra en Netlify y pulsa **Add new project → Import an existing project**.
2. Elige **GitHub** y autoriza el acceso.
3. Selecciona el repositorio `hiperfoco`.
4. Netlify debería detectar:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Pulsa **Deploy**.

La primera compilación puede tardar unos minutos.

## 3. Conectar hiperfoco.eu

1. En Netlify abre **Domain management → Add a domain → Add a domain you already own**.
2. Escribe `hiperfoco.eu`.
3. Netlify mostrará los registros DNS necesarios.
4. En Porkbun entra en el dominio → **DNS** y añade exactamente los registros que indique Netlify.
5. Elimina registros antiguos que entren en conflicto solo cuando Netlify lo indique.
6. Espera la propagación. El SSL se emitirá automáticamente.

## 4. Antes de indexar

- Sustituye `hola@hiperfoco.eu` si todavía no existe.
- Añade aviso legal, privacidad y cookies adaptados a tus datos.
- Revisa todas las notas y conclusiones.
- No actives botones de afiliación hasta tener enlaces reales.
- Conecta Search Console, GA4 o una alternativa y Microsoft Clarity.

## 5. Flujo para nuevas reviews

Tú me indicas el producto aprobado. Yo preparo la investigación y actualizo:

- `data/site.ts`
- review y schema
- categoría y buscador
- comparativas y enlaces internos
- sitemap
- fuentes, FAQ, notas y transparencia

Después te entregaré los archivos actualizados. Al subirlos al mismo repositorio, Netlify volverá a publicar automáticamente.
