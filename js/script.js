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

        // Realizar la solicitud a la API de Wikipedia para obtener extractos
        fetch(`https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&titles=${searchTerm}&pithumbsize=300&exintro&explaintext&origin=*`)
            .then(response => response.json())
            .then(data => {
                // Obtener el extracto del artículo y la URL de la imagen
                const pageId = Object.keys(data.query.pages)[0];
                const extract = data.query.pages[pageId].extract;
                const imageUrl = data.query.pages[pageId].thumbnail ? data.query.pages[pageId].thumbnail.source : null;

                // Mostrar el extracto y la imagen en el elemento HTML
                resultDiv.innerHTML = `
                    <p>${extract}</p>
                    ${imageUrl ? `<img src="${imageUrl}" alt="Imagen relacionada">` : ''}
                `;
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
