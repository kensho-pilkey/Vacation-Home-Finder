swal({
  title: "Where do you want to go?",
  icon: "assets/images/destination-types.png",
  buttons: {
    city: {
      text: "City",
      value: "city",
    },
    beach: {
      text: "Beach",
      value: "beach",
    },
    mountains: {
      text: "Mountains",
      value: "mountains",
    },
  },
  closeOnClickOutside: false,
}).then((value) => {
  let typePreference = value;
  findRecommendations(typePreference);
});

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-117.130775, 32.834686],
  zoom: 8,
});

function findRecommendations(type) {
  let filteredPlaces = filterPlacesByType(type);
  if (filteredPlaces) {
    populateRecommendationCards(filteredPlaces);
    filteredPlaces.forEach((place) => {
      addPlaceToMegaMenu(place);
      addMarkerToMap(place);
    });
  } else {
    console.log("filterPlacesByType function error");
  }
}

function centerPlaceOnMap(placeName) {
  let placeObj = findPlaceByName(placeName);
  if (placeObj) {
    document.getElementById("map").scrollIntoView();
    map.flyTo({
      center: [placeObj.long, placeObj.lat],
    });
  } else {
    console.log("findPlaceByName function error");
  }
}

const _megaMenuCol1 = document.getElementById("mega-menu-col-1");
const _megaMenuCol2 = document.getElementById("mega-menu-col-2");

function addPlaceToMegaMenu(place) {
  let menuItemContent = `
    <li onclick="centerPlaceOnMap('${place.name}')">
      <a class="dropdown-item">
        ${place.name}
      </a>
    </li>
    `;

  if (_megaMenuCol1.childElementCount < 4) {
    _megaMenuCol1.insertAdjacentHTML("beforeend", menuItemContent);
  } else {
    _megaMenuCol2.insertAdjacentHTML("beforeend", menuItemContent);
  }
}

function addMarkerToMap(place) {
  var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<p class="text-center">${place.name}</p> <img src="${place.img}" alt="" style="width: 200px; height: auto; border-radius: 4px;">`
  );
  new mapboxgl.Marker({ color: "black" })
    .setLngLat([place.long, place.lat])
    .setPopup(popup)
    .addTo(map);
}
