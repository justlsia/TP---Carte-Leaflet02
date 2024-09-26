// Initialiser la carte
const map = L.map('map').setView([46.1635705075646, -1.1268395422898], 13);

// Ajouter la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const tableData = [];   // Stocker les emplacements
const markers = [];     // Stocker les coordonnées des marqueurs

// Parcourir les données
datas.forEach(elementEnCours => {

    // Constantes 
    const Emplacement = elementEnCours.fields.emplacement;   // Récupérer l'adresse
    const Mode = elementEnCours.fields.mode;                 // Récupérer le mode (gratuit/payant)
    const DateOuverture = elementEnCours.fields.ouverture;   // Récupérer les dates d'ouverture
    const coords = elementEnCours.fields.geo_point_2d;       // Récupérer les coordonnées

    // Afficher dans la console
    console.log("Adresse : ", Emplacement);
    console.log("Mode : ", Mode);
    console.log("Date d'ouverture : ", DateOuverture);
    console.log("Coordonnées :");
    console.log("Latitude: " + coords[1]);
    console.log("Longitude: " + coords[0]);

    // Contenu de la popup
    const popupContent = `
        <b>Adresse : </b> ${Emplacement}<br>
        <b>Mode : </b> ${Mode}<br>
        <b>Période d'ouverture : </b> ${DateOuverture}
    `;

    // Ajouter un marqueur avec une icône personnalisée
    const marker = L.marker([coords[1], coords[0]], {
        icon: L.icon({
            iconUrl: 'https://www.svgrepo.com/show/479832/toilet-paper-5.svg', // Icône rouleau de PQ
            iconSize: [30, 30] // Taille de l'icône
        })
    }).addTo(map)
      .bindPopup(popupContent); // Lier le popup au marqueur

    // Stocker le marqueur dans le tableau
    markers.push(marker);

    // Ajouter les données au tableau avec l'emplacement et le mode
    tableData.push({ emplacement: `${Emplacement} - ${Mode}`, marker });
});

// Afficher le tableau
const table = document.createElement('table');
// Ajouter de classes Bootstrap
table.className = 'table table-hover';               
table.innerHTML = `<tbody>`; 

// Parcourir les données et créer les lignes du tableau
tableData.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.emplacement}</td>`;
    tr.style.cursor = 'pointer'; // Changer le curseur pour indiquer que la ligne est cliquable

    // Ajouter l'événement de clic
    tr.addEventListener('click', () => {
        // Ouvrir le tooltip du marqueur correspondant
        row.marker.openPopup();
        // Centrer la carte sur le marqueur
        map.setView(row.marker.getLatLng(), 16); // Niveau de zoom souhaité
    });

    // Ajouter la ligne au <tbody>
    table.querySelector('tbody').appendChild(tr);
});

document.getElementById('table-container').appendChild(table);
