# Política de imágenes Hiperfoco

- Una imagen aprobada no se sustituye por feeds, hotlinks, thumbnails ni fallbacks genéricos.
- Las cafeteras aprobadas de Home/Reseñas/Café se sirven desde `/assets/approved/`.
- El build descarga fuentes HD y falla si el archivo resultante pesa menos de 60 KB.
- El build valida que Home, Reseñas y Café usen los assets aprobados antes de publicar.
- Productos individuales: `object-fit: contain`; no recortar el producto.
- Imágenes editoriales: pueden usar `cover` si no cortan información relevante.
