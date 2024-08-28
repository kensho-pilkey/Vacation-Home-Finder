mapboxgl.accessToken = "pk.eyJ1Ijoia2Vuc2hvcCIsImEiOiJjbGtuMWxwdXExZHg2M2dvYXQxZnByYzNxIn0.6ciycg43pLmkov21C_2JUA";

function filterPlacesByType(typePreference) {
  let filteredPlaces = [];
  for(i = 0; i < PLACES.length; i++) {
    if(typePreference == PLACES[i].type) {
      filteredPlaces.push(PLACES[i]);
    }
  }
  return filteredPlaces;
}

function createCard(place) {
  let div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card h-100" onclick="centerPlaceOnMap('${place.name}')"> <img src="${place.img}" class="card-img-top h-100" alt="${place.name}"><div class="card-body"><h5 class="card-title">${place.name}</h5><p class="card-text">${place.location}</p></div></div>`;
  return div;
}

function populateRecommendationCards(filteredPlaces) {
  let element = document.getElementById("recommendations");
  element.innerHTML = "";
  for(i = 0; i < filteredPlaces.length; i++) {
    let temp = createCard(filteredPlaces[i]);
    element.appendChild(temp);
  }
}

function findPlaceByName(placeName) {
  for(i = 0; i < PLACES.length; i++) {
    if(PLACES[i].name == placeName) {
      return PLACES[i];
    }
  }
}
