# Pasos para sustituir el proyecto provisional

1. Descomprime el ZIP.
2. En GitHub, abre el repositorio `hiperfoco`.
3. Elimina los archivos provisionales o crea una rama antes de sustituirlos.
4. Pulsa **Add file → Upload files**.
5. Arrastra todo el contenido de `hiperfoco-launch` a la raíz.
6. Commit: `Publicar Hiperfoco V1`.
7. En Netlify, importa el repositorio o deja que el despliegue existente se actualice.
8. Configuración Netlify: sin Build command; Publish directory `.`.
9. Revisa primero la URL `.netlify.app`.
10. Cuando esté validada, conecta `hiperfoco.eu`.

## DNS en Porkbun
Netlify mostrará los registros exactos. No los inventes: copia los que aparezcan en **Domain management → Add domain**. El SSL se emitirá automáticamente después de que el DNS propague.
