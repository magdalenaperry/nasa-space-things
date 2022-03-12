var containerEl = document.querySelector('container');

var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'webtitle');
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'COSMIC DUST';

// navbar links
var podLink = document.getElementById('pod');
var issLink = document.getElementById('iss');
var noLink = document.getElementById('no');
var about = document.getElementById('about');

// tab contents for navigation 
var tabContent = document.createElement('div');
tabContent.setAttribute('id', 'myTabContent');
containerEl.appendChild(tabContent);

var tabPodEl = document.createElement('div');
tabPodEl.setAttribute('id', 'pod-container');
tabContent.appendChild(tabPodEl);

var tabIssEl = document.createElement('div');
tabIssEl.setAttribute('id', 'iss-container');
tabContent.appendChild(tabIssEl);

var tabNearestObject = document.createElement('div');
tabNearestObject.setAttribute('id', 'nearest-object');
tabNearestObject.classList.add('row');
tabContent.appendChild(tabNearestObject);

// container for pod page
var podApiEl = document.createElement('div');
podApiEl.classList.add('py-2', 'px-5', 'lh-lg', 'img-fluid');
tabPodEl.appendChild(podApiEl);

// container for pod image
var podContainerEl = document.createElement('figure');
podContainerEl.classList.add('col-md-8', 'offset-md-2', 'figure', 'pb-3', 'pt-5', 'text-center');
podApiEl.appendChild(podContainerEl);

// container for ISS
var issContainerEl = document.createElement('div');
tabIssEl.appendChild(issContainerEl);

// container NEO
var nearestObjectContainerEl = document.createElement('div');
tabNearestObject.appendChild(nearestObjectContainerEl);


// -----------------------------------------POD PAGE-----------------------------------------------------
var displayPOD = function (pod) {
    tabIssEl.style.display = 'none';
    podContainerEl.innerHTML = '';
    if (pod === 0) {
        podContainerEl.textContent = 'No image found';
        return;
    }
    nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP';
    var podUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaAPI;
    fetch(podUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            onlyPOD();
            var podTitle = data.title;
            var podExplanation = data.explanation;
            var podSrc = data.url;
            var podCR = data.copyright;

            // POD elements appended to page
            var podEl = document.createElement('img');
            podEl.classList.add('img-fluid', 'border', 'border-secondary', 'border-5');
            podEl.setAttribute('id', 'pod-frame');
            podEl.src = podSrc;
            podEl.alt = podTitle;
            podEl.title = podTitle;
            podContainerEl.appendChild(podEl);

            var podTitleEl = document.createElement('p');
            podTitleEl.classList.add('pt-5', 'fs-2', 'fw-light');
            podTitleEl.textContent = podTitle;
            podContainerEl.appendChild(podTitleEl);

            var podCopyrightEl = document.createElement('div');
            podCopyrightEl.classList.add('fs-5', 'fw-lighter', 'lh-lg', 'text-info');
            podCopyrightEl.textContent = 'photo by: ' + podCR;
            podTitleEl.appendChild(podCopyrightEl);

            var podDescriptionContEl = document.createElement('div');
            podDescriptionContEl.classList.add('fs-5', 'fw-lighter', 'lh-lg', 'desc-par', 'text-center', 'col', 'align-self-center');
            podDescriptionContEl.textContent = podExplanation;
            podContainerEl.appendChild(podDescriptionContEl);
        })
        .catch(function (err) {
            console.log(err);
        });
    return;
}

var renderLocalStorage = function (timeStorage, map, whatever) {
    var latlngs = [];
    for (var i = 0; i < timeStorage.length; i++) {
        latlngs.push([timeStorage[i].lat, timeStorage[i].lon])
    }
    var polyline = L.polyline(latlngs, {
        color: 'red'
    }).addTo(map);
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
}
//  --------------------------------------- ISS PAGE ----------------------------------------------------
var issPage = function () {
    onlyISS();
    var getCoordinatesFromAPI = function (city) {
        // base url to get the ISS coordinates at current time
        var baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
        fetch(baseUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            displayMapLatLon(data);
                        });
                } else {
                    console.log(response.status);
                }
            })
            .catch(function (error) {
                console.log('error');
            });
    };

    // connects the lat/lon and the ISS city/maps API 
    var displayMapLatLon = function (latlonData) {
        if (!latlonData) {
            return;
        }
        var currentIssTime = latlonData.timestamp;
        var lat = latlonData.latitude;
        var lon = latlonData.longitude;
        var velocity = Math.floor(latlonData.velocity * 0.621371);
        var altitude = Math.floor(latlonData.altitude);
        var timestamp = latlonData.timestamp;
        var point = {
            lat,
            lon,
            timestamp
        };
        // LOCAL STORAGE
        var timeStorage = JSON.parse(localStorage.getItem('cityTimeStampUnix')) || [];
        var lastTimeStamp = timeStorage[timeStorage.length - 1];
        var now = new Date().getTime() / 1000;
        if (!timeStorage.length || now > lastTimeStamp.timestamp + 180) {
            timeStorage.push(point);
            localStorage.setItem('cityTimeStampUnix', JSON.stringify(timeStorage));
        }

        // fetch information using coordinates to find city
        var baseCityUrl = 'https://api.wheretheiss.at/v1/coordinates/';
        var coordinateToCityUrl = baseCityUrl + lat + ',' + lon;

        fetch(coordinateToCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (ISSdata) {
                tabIssEl.innerHTML = '';

                // appended ISS elements to page
                var issImage = document.createElement('img');
                issImage.classList.add('iss-pic', 'col-12', 'nasa-par', 'iss-img', 'img-fluid');
                issImage.src = 'https://www.sciencealert.com/images/2022-03/processed/ISSInSpaceLookingVeryPhotogenic_1024.jpg';
                issImage.alt = 'International Space Station';
                issImage.title = 'International Space Station';
                tabIssEl.appendChild(issImage);

                var figISS = document.createElement('figure');
                figISS.classList.add('text-end', 'iss-par');
                tabIssEl.appendChild(figISS);

                var issBlockquote = document.createElement('blockquote');
                issBlockquote.classList.add('blockquote');
                figISS.appendChild(issBlockquote);

                var issPar = document.createElement('p');
                issPar.classList.add('mx-5', 'lh-lg', 'fs-5', 'fw-light');
                issBlockquote.appendChild(issPar);
                issPar.textContent = 'The International Space Station is a large spacecraft in orbit around Earth. It serves as a home where crews of astronauts and cosmonauts live. Several nations worked together to build and use the space station. The space station is made of parts that were assembled in space by astronauts. It orbits Earth at a current altitude of ' + altitude + ' miles. It is currently traveling at ' + velocity + ' mph. This means it orbits Earth once approximately every 90 minutes.';

                var issFigcap = document.createElement('figcaption');
                issFigcap.classList.add('blockquote-footer', 'pb-2', 'mx-5', 'text-info', 'fs-5', 'fw-lighter');
                figISS.appendChild(issFigcap);
                issFigcap.textContent = 'International Space Station Mission | NASA';

                // time zone section
                var timeZoneEl = document.createElement('div');
                timeZoneEl.classList.add('col-12', 'm-5', 'fs-4', 'fw-lighter', 'text-center');
                timeZoneEl.textContent = 'The International Space Station is currently in the ' + ISSdata.timezone_id + ' time zone.';
                tabIssEl.appendChild(timeZoneEl);

                // display ISS map on page:
                var mapImage = document.createElement('div');
                mapImage.classList.add('col-11');
                mapImage.setAttribute('id', 'map');
                tabIssEl.appendChild(mapImage);

                // set map 
                var map = L.map('map').setView([lat, lon], 5);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWJwZXJyeTE2IiwiYSI6ImNsMGw0NHc1MzBzbjQzaWw0eGJvOWlwenEifQ.Tldp3_qx74Vu3cnGOBgpcw', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    // accessToken: 'your.mapbox.access.token'
                }).addTo(map);

                var marker = L.marker([lat, lon]).addTo(map);

                var popup = L.popup()
                    .setLatLng([lat + 3, lon])
                    .setContent("I'm traveling at " + velocity + " mph")
                    .openOn(map);
                renderLocalStorage(timeStorage, map);
            })
            .catch(function (err) {
                console.log(err);
            });
        return;
    };
    getCoordinatesFromAPI();
    displayMapLatLon();
}

// -----------------------------------------NEO PAGE-----------------------------------------------------
var displayNearestObjects = function (objects) {
    onlyNO();
    nearestObjectContainerEl.innerHTML = '';

    if (objects === 0) {
        return;
    }
    var date = moment().format('YYYY-MM-DD');
    var nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP';
    var nearestObjectUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + date + '&end_date=' + date + '&api_key=' + nasaAPI;

    console.log(nearestObjectUrl);
    fetch(nearestObjectUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var objects = data.element_count;

            var divobject = document.createElement('div');
            divobject.classList.add('row', 'div-object', 'text-center');
            nearestObjectContainerEl.appendChild(divobject);
            divobject.textContent = '';

            var descobject = document.createElement('div');
            descobject.classList.add('col-12', 'text-center', 'nasa-par');
            divobject.appendChild(descobject);

            var neoImg = document.createElement('img');
            neoImg.classList.add('neo', 'img-fluid');
            neoImg.src = './assets/images/near-earth-object.jpeg';
            neoImg.alt = 'Near Earth Object';
            neoImg.title = 'Near Earth Object: Global.Neos Community';
            descobject.appendChild(neoImg);

            var figNASA = document.createElement('figure');
            figNASA.classList.add('text-end');
            descobject.appendChild(figNASA);

            var nasaBlockquote = document.createElement('blockquote');
            nasaBlockquote.classList.add('blockquote');
            figNASA.appendChild(nasaBlockquote);

            var nasaPar = document.createElement('p');
            nasaPar.classList.add('mb-0', 'mt-4', 'mx-5', 'lh-lg', 'fs-5', 'fw-light');
            nasaBlockquote.appendChild(nasaPar);
            nasaPar.textContent = 'Near-Earth Objects (NEOs) are comets and asteroids that have been nudged by the gravitational attraction of nearby planets into orbits that allow them to enter the Earth’s neighborhood. Composed mostly of water ice with embedded dust particles, comets originally formed in the cold outer planetary system while most of the rocky asteroids formed in the warmer inner solar system between the orbits of Mars and Jupiter.';

            var nasaFigcap = document.createElement('figcaption');
            nasaFigcap.classList.add('blockquote-footer', 'mx-5', 'text-info', 'fs-5', 'fw-lighter');
            figNASA.appendChild(nasaFigcap);
            nasaFigcap.textContent = 'Center for Near Earth Object Studies, NASA';


            var noDateEl = document.createElement('div');
            noDateEl.classList.add('text-center', 'nasa-date');
            divobject.appendChild(noDateEl);
            noDateEl.textContent = moment().format('MMMM Do, YYYY');

            var objectCountPrint = document.createElement('button');
            objectCountPrint.classList.add('col-10', 'fs-5', 'fw-light', 'btn-secondary', 'btn-block', 'text-center', 'h5', 'card', 'p-3', 'mx-5', 'my-3', 'alert', 'alert-dismissable');
            objectCountPrint.setAttribute('type', 'button');
            objectCountPrint.setAttribute('data-dismiss', 'alert');
            divobject.appendChild(objectCountPrint);
            objectCountPrint.textContent = 'There are ' + objects + ' NEOs closely approaching Earth today';

            for (var i = 0; i < data.near_earth_objects[date].length; i++) {
                var name = data.near_earth_objects[date][i].name;
                var minSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_min;
                var maxSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_max;
                var sum = (minSize + maxSize);
                var avgSize = sum / 2;
                var danger = data.near_earth_objects[date][i].is_potentially_hazardous_asteroid;
                var closeDate = data.near_earth_objects[date][i].close_approach_data[0].close_approach_date_full;
                var velocityObject = data.near_earth_objects[date][i].close_approach_data[0].relative_velocity.miles_per_hour;

                // creates individual cards for each object
                var objectPrintContainer = document.createElement('div');
                objectPrintContainer.classList.add('col-5', 'h6', 'card', 'py-3', 'px-3', 'mx-2', 'my-2', 'fs-5', 'fw-lighter');
                divobject.appendChild(objectPrintContainer);

                var namePrint = document.createElement('p');
                objectPrintContainer.appendChild(namePrint);
                namePrint.textContent = 'NEO Name: ' + name;

                var avgSizePrint = document.createElement('p');
                objectPrintContainer.appendChild(avgSizePrint);
                avgSizePrint.textContent = 'Size: ' + Math.floor(avgSize * 1760) + ' yds';

                var velocityPrint = document.createElement('p');
                objectPrintContainer.appendChild(velocityPrint);
                velocityPrint.textContent = 'Velocity: ' + Math.floor(velocityObject) + ' mph';

                var closePrint = document.createElement('p');
                objectPrintContainer.appendChild(closePrint);
                closePrint.textContent = 'Closest Approaching Time: ' + closeDate;

                if (danger) {
                    var dangerPrint = document.createElement('button');
                    dangerPrint.classList.add('btn', 'btn-warning', 'fs-5', 'fw-light');
                    objectPrintContainer.appendChild(dangerPrint);
                    dangerPrint.textContent = 'Potentially Hazardous';
                } else {
                    var dangerPrint = document.createElement('button');
                    dangerPrint.classList.add('btn', 'btn-info', 'fs-5', 'fw-light');
                    objectPrintContainer.appendChild(dangerPrint);
                    dangerPrint.textContent = 'Not Hazardous';
                }
            }
        })
}

// -----------------------------------------Displays/Add event listeners --------------------------------
var onlyPOD = function () {
    tabIssEl.style.display = 'none';
    tabPodEl.style.display = 'block';
    tabNearestObject.style.display = 'none';
}
var onlyISS = function () {
    tabPodEl.style.display = 'none';
    tabIssEl.style.display = 'flex';
    tabNearestObject.style.display = 'none';
}
var onlyNO = function () {
    tabPodEl.style.display = 'none';
    tabIssEl.style.display = 'none';
    tabNearestObject.style.display = 'block';
}
var init = function (){
 displayPOD();
}

init();

// search button to link to google
var f = document.getElementById('form');
var q = document.getElementById('query');
var google = 'https://www.google.com/search?q=site%3A+';
var submitted = function (event) {
    event.preventDefault();
    var url = google + q.value;
    var win = window.open(url, '_blank');
    win.focus();
}

f.addEventListener('submit', submitted);
podLink.addEventListener('click', displayPOD);
issLink.addEventListener('click', issPage);
noLink.addEventListener('click', displayNearestObjects);