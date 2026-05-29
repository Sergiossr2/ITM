# Instituto Tecnico Morazan

Sitio web institucional estatico para el Instituto Tecnico Morazan. Esta preparado para publicarse en GitHub Pages o en cualquier hosting estatico usando el dominio:

```text
https://www.tecmorazan.edu.hn/
```

## Estructura

```text
.
|-- index.html
|-- 404.html
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
|-- css/
|   `-- style.css
|-- img/
|   |-- favicon.svg
|   |-- hero-campus.png
|   |-- og-cover.png
|   |-- noticia-destacada.png
|   |-- actividad-ciencia.png
|   |-- actividad-cultura.png
|   |-- actividad-deporte.png
|   `-- actividad-servicio.png
`-- js/
    |-- content.js
    |-- main.js
    |-- menu.js
    |-- renderer.js
    |-- reveal.js
    |-- router.js
    |-- theme.js
    `-- sections/
        |-- actividades.js
        |-- contacto.js
        |-- faq.js
        |-- inicio.js
        |-- matricula.js
        |-- noticias.js
        `-- programas.js
```

## Como editar contenido

El contenido principal se edita en `js/sections/`.

- `inicio.js`: hero, llamadas principales, estadisticas y bloques rapidos.
- `matricula.js`: proceso de inscripcion.
- `programas.js`: areas o carreras.
- `noticias.js`: noticia destacada y noticias secundarias.
- `actividades.js`: actividades escolares.
- `faq.js`: preguntas frecuentes.
- `contacto.js`: CTA final, datos de contacto, servicios y footer.

`index.html` funciona como plantilla estructural. Evita editar ahi textos de secciones, porque `js/renderer.js` los reemplaza al cargar la pagina.

## Datos importantes

Revisa estos datos antes de publicar:

- Telefonos institucionales.
- Correo institucional.
- Direccion exacta.
- Horarios de atencion.
- URLs absolutas en `index.html`, `robots.txt` y `sitemap.xml`.

## Imagenes

Las imagenes actuales se duplicaron con nombres finales para que puedas reemplazarlas despues sin cambiar codigo:

- `img/hero-campus.png`
- `img/og-cover.png`
- `img/noticia-destacada.png`
- `img/actividad-ciencia.png`
- `img/actividad-cultura.png`
- `img/actividad-deporte.png`
- `img/actividad-servicio.png`

> **Importante:** `og-cover.png` es la imagen que aparece al compartir el sitio en WhatsApp, Facebook y Twitter. Debe existir antes de publicar o la vista previa saldra sin imagen.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos del proyecto.
3. Entra a `Settings > Pages`.
4. Selecciona la rama `main` y la carpeta `/root`.
5. Guarda y espera a que GitHub Pages genere la URL.

## Dominio propio

Cuando apuntes el dominio:

1. Configura `www.tecmorazan.edu.hn` en GitHub Pages.
2. Ajusta los DNS del dominio segun las instrucciones de GitHub.
3. Verifica HTTPS.
4. Envia `https://www.tecmorazan.edu.hn/sitemap.xml` a Google Search Console.

## Verificacion local

Puedes abrir `index.html` directamente en el navegador. Para revisar todos los archivos JavaScript:

```powershell
Get-ChildItem .\js -Recurse -File | ForEach-Object { node --check $_.FullName }
```