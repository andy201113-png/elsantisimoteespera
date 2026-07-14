// =============================================================
// WIDGET "MÁS ORACIONES" (ALEATORIO) - Archivo centralizado
// =============================================================
(function generateRelatedWidget() {
    // Verificar que el array de oraciones existe
    if (typeof misOraciones === 'undefined' || misOraciones.length === 0) {
        console.warn('No se encontraron oraciones para el widget.');
        return;
    }

    // Obtener el índice de la oración actual
    const currentPath = window.location.pathname;
    const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    let currentIndex = -1;
    for (let i = 0; i < misOraciones.length; i++) {
        const urlParts = misOraciones[i].url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName === currentFileName) {
            currentIndex = i;
            break;
        }
    }

    // Si no se encuentra la oración actual, salir
    if (currentIndex === -1) return;

    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) return; // Si no existe el contenedor, salir

    // Filtrar las demás oraciones
    let others = misOraciones.filter((item, idx) => idx !== currentIndex);

    // Barajar aleatoriamente (Fisher-Yates)
    for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
    }

    // Tomar las primeras 4
    const toShow = others.slice(0, 4);

    if (toShow.length === 0) {
        relatedGrid.innerHTML = '<p style="text-align:center;color:#6a625a;">Pronto más oraciones disponibles.</p>';
    } else {
        let html = '';
        toShow.forEach(item => {
            html += `
                <a href="${item.url}" class="related-card">
                    <img src="${item.img}" alt="${item.titulo}" loading="lazy" />
                    <div class="info">
                        <h4>${item.titulo}</h4>
                        <p>Ver o leer completa</p>
                        <span class="mini-btn">➜ Abrir</span>
                    </div>
                </a>
            `;
        });
        relatedGrid.innerHTML = html;
    }
})();