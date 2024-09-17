document.addEventListener("DOMContentLoaded", function() {
    const searchTermInput = document.getElementById('searchTerm');
    const searchButton = document.getElementById('searchButton');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchTermInput.value.trim();

        if (searchTerm === '') {
            alert('Por favor, ingrese un término de búsqueda');
            return;
        }

        resultDiv.innerHTML = '<p>Cargando...</p>'; // Mensaje de carga

        fetch(`https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&titles=${searchTerm}&pithumbsize=300&exintro&explaintext&origin=*`)
            .then(response => response.json())
            .then(data => {
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0];
                const page = pages[pageId];

                if (page.missing) {
                    resultDiv.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
                    return;
                }

                const extract = page.extract;
                const imageUrl = page.thumbnail ? page.thumbnail.source : null;

                resultDiv.innerHTML = `
                    <p>${extract}</p>
                    ${imageUrl ? `<img src="${imageUrl}" alt="Imagen relacionada">` : ''}
                `;
            })
            .catch(error => {
                resultDiv.innerHTML = '<p>Hubo un error al realizar la búsqueda. Inténtalo de nuevo.</p>';
                console.error('Error fetching data:', error);
            });
    });
});
