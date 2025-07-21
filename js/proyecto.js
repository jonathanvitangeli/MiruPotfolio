async function cargarDetalleProyecto() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (!id) {
    alert('ID de proyecto no proporcionado');
    return;
  }

  try {
    const res = await fetch('/data/proyectos.json');
    const proyectos = await res.json();
    const proyecto = proyectos.find(p => p.id === id);

    if (!proyecto) {
      document.getElementById('titulo').innerText = 'Proyecto no encontrado';
      return;
    }

    document.getElementById('titulo').innerText = proyecto.descripcion;
    document.getElementById('descripcionLarga').innerText = proyecto.descripcionLarga || '';

    const galeria = document.getElementById('galeria');
    galeria.innerHTML = '';

    proyecto.imagenes.forEach(url => {
      // Corregir si no empieza con `/` ni con `http`
      if (!url.startsWith('http') && !url.startsWith('/')) {
        url = '/' + url;
      }

      const img = document.createElement('img');
      img.src = url;
      img.alt = "Imagen del proyecto";
      img.onclick = () => mostrarLightbox(url);
      galeria.appendChild(img);
    });

  } catch (err) {
    console.error('Error al cargar proyecto:', err);
  }
}


    function mostrarLightbox(url) {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      lightboxImg.src = url;
      lightbox.style.display = 'flex';
    }

    function cerrarLightbox() {
      document.getElementById('lightbox').style.display = 'none';
    }

    function cerrarLightboxSiClickFuera(event) {
      const img = document.getElementById('lightbox-img');
      if (!img.contains(event.target)) {
        cerrarLightbox();
      }
    }

    window.onload = cargarDetalleProyecto;