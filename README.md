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
`-- assets/
    |-- css/
    |   `-- style.css
    |-- img/
    |   |-- activities/
    |   |-- brand/
    |   |-- news/
    |   |-- pages/
    |   `-- promo2026/
    `-- js/
        |-- core/
        |   |-- content.js
        |   |-- main.js
        |   |-- menu.js
        |   |-- promo-intro.js
        |   |-- renderer.js
        |   |-- reveal.js
        |   |-- router.js
        |   `-- theme.js
        `-- sections/
            |-- actividades.js
            |-- contacto.js
            |-- faq.js
            |-- inicio.js
            |-- matricula.js
            |-- noticias.js
            |-- programas.js
            `-- promo2026.js
```

## Como editar contenido

El contenido principal se edita en `assets/js/sections/`.

- `inicio.js`: hero, llamadas principales, estadisticas y bloques rapidos.
- `matricula.js`: proceso de inscripcion.
- `programas.js`: areas o carreras.
- `noticias.js`: noticia destacada y noticias secundarias.
- `actividades.js`: actividades escolares.
- `faq.js`: preguntas frecuentes.
- `contacto.js`: CTA final, datos de contacto, servicios y footer.

`index.html` funciona como plantilla estructural. Evita editar ahi textos de secciones, porque `assets/js/core/renderer.js` los reemplaza al cargar la pagina.

## Datos importantes

Revisa estos datos antes de publicar:

- Telefonos institucionales.
- Correo institucional.
- Direccion exacta.
- Horarios de atencion.
- URLs absolutas en `index.html`, `robots.txt` y `sitemap.xml`.

## Imagenes

Las imagenes estan separadas por uso para que sea mas facil reemplazarlas despues:

- `assets/img/brand/logo-itm.svg`
- `assets/img/brand/favicon.svg`
- `assets/img/pages/hero-campus.png`
- `assets/img/pages/og-cover.png`
- `assets/img/pages/noticia-destacada.png`
- `assets/img/activities/ciencia.png`
- `assets/img/activities/cultura.png`
- `assets/img/activities/deporte.png`
- `assets/img/activities/servicio.png`
- `assets/img/news/`
- `assets/img/promo2026/`

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
Get-ChildItem .\assets\js -Recurse -File | ForEach-Object { node --check $_.FullName }
```
