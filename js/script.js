const sheetId = '1rDRSo0T_I7QHrLP-zFoLyce8UZi9vXlijbkmwsg6Lh4'; // Remplacez par l'ID de votre feuille de calcul
const sheetName = 'Feuille 1'; // Remplacez par le nom de votre feuille
const apiKey = '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'; // Remplacez par votre clé API
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

// Récupération des données depuis Google Sheets
fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    const headers = rows[0];
    const content = rows.slice(1);

    // Affichage des résultats
    displayResults(content, headers);
  });

function displayResults(content, headers) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  content.forEach(row => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';

    headers.forEach((header, index) => {
      const info = document.createElement('p');
      info.innerText = `${header}: ${row[index]}`;
      resultItem.appendChild(info);
    });

    resultsContainer.appendChild(resultItem);
  });
}

// Filtrer les résultats en fonction du formulaire
document.getElementById('searchform').addEventListener('submit', function(e) {
  e.preventDefault();

  const criteria = {
    duration: document.getElementById('duration').value,
    ageRange: document.getElementById('ageRange').value,
    gauge: document.getElementById('gauge').value,
    numberOnStage: document.getElementById('numberOnStage').value,
    genre: document.getElementById('genre').value
  };

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const headers = rows[0];
      const content = rows.slice(1);

      const filteredContent = content.filter(row => {
        return (!criteria.duration || row[2] === criteria.duration) &&
               (!criteria.ageRange || row[3] === criteria.ageRange) &&
               (!criteria.gauge || row[4] === criteria.gauge) &&
               (!criteria.numberOnStage || row[5] === criteria.numberOnStage) &&
               (!criteria.genre || row[7].includes(criteria.genre));
      });

      displayResults(filteredContent, headers);
    });
});