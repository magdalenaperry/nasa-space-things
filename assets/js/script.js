var containerEl = document.querySelector('container');

var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'py-5', );
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'SPACE';

// TAB CONTENTS 
var tabContent = document.createElement('div');
tabContent.setAttribute('id', 'myTabContent', );
containerEl.appendChild(tabContent);

var tabPodEl = document.createElement('div');
tabPodEl.setAttribute('id', 'pod-container');
tabContent.appendChild(tabPodEl);

var tabIssEl = document.createElement('div');
tabIssEl.setAttribute('id', 'iss-container');
tabContent.appendChild(tabIssEl);

var tabNearestObject = document.createElement('div');
tabNearestObject.classList.add('row');
tabNearestObject.setAttribute('id', 'nearest-object');
tabContent.appendChild(tabNearestObject);

// container for pod page
var podApiEl = document.createElement('div');
podApiEl.classList.add('py-5', 'px-5');
tabPodEl.appendChild(podApiEl);

// container for pod
var podContainerEl = document.createElement('figure');
podContainerEl.setAttribute('id', 'pod-frame');
podContainerEl.classList.add('figure', 'pb-3', 'pt-5', 'text-center');
podApiEl.appendChild(podContainerEl);

// container for ISS
var issContainerEl = document.createElement('div');
issContainerEl.classList.add('test');
tabIssEl.appendChild(issContainerEl);

// container for date on NO page
var noDateEl = document.createElement('div');
noDateEl.classList.add('display-4', 'text-center');
tabNearestObject.appendChild(noDateEl);
noDateEl.textContent = moment().format('MMMM Do, YYYY');

// container nearest object
var nearestObjectContainerEl = document.createElement('div');
nearestObjectContainerEl.classList.add('test');
tabNearestObject.appendChild(nearestObjectContainerEl);


// navbar links
var podLink = document.getElementById('pod');
var issLink = document.getElementById('iss');
var noLink = document.getElementById('no');
var about = document.getElementById('about');


// POD PAGE
var displayPOD = function (pod) {
    tabIssEl.style.display = "none";
    // onlyISS();

    podContainerEl.innerHTML = '';
    // if there is no info inside API and return value is 0 it will give us no image found
    if (pod === 0) {
        podContainerEl.textContent = 'No image found';
        return;
    }
    // *******************1st API fetch for picture and info******************************

    nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
    var podUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaAPI;

    fetch(podUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            onlyPOD();
            // data extracred from URL
            var podTitle = data.title;
            var podExplanation = data.explanation;
            var podSrc = data.url;

            // POD appended to page
            var podTitleEl = document.createElement('h3')
            podTitleEl.classList.add('pt-2', 'pb-4') // creating class for future
            podContainerEl.appendChild(podTitleEl);
            podTitleEl.textContent = podTitle;

            var podEl = document.createElement('img');
            podEl.classList.add('figure-img', 'img-fluid', 'rounded', 'pod-frame');
            podEl.src = podSrc;
            podEl.alt = podTitle;
            podEl.title = podTitle;
            podContainerEl.appendChild(podEl);

            // text div for pod details
            var podDescriptionContEl = document.createElement('figcaption');
            podDescriptionContEl.classList.add('img-fluid', 'fig-caption', 'mx-5', 'px-5');
            podContainerEl.appendChild(podDescriptionContEl);
            podDescriptionContEl.textContent = podExplanation;

            var descCloseBtn = document.createElement('button');
            descCloseBtn.classList.add('btn-close');
            descCloseBtn.setAttribute('aria-label', 'close');
            podDescriptionContEl.prepend(descCloseBtn);
        })
        .catch(function (err) {
            console.log(err);
        });
    return;

}
displayPOD();

// BREAK POINT FOR SEPARATE PAGE



var renderLocalStorage = function (timeStorage, map, whatever) {

    var latlngs = [];

    for (var i = 0; i < timeStorage.length; i++) {
        latlngs.push([timeStorage[i].lat, timeStorage[i].lon])
    }
    console.log(latlngs);

    // create a red polyline from an array of LatLng points

    var polyline = L.polyline(latlngs, {
        color: 'red'
    }).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
}




var issPage = function () {
    onlyISS();
    var getCoordinatesFromAPI = function (city) {
        // base url to get the coordinates from ISS at current time
        var baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'

        console.log(baseUrl);
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
            // console.log('no data found');
            return;
        }

        var currentIssTime = latlonData.timestamp;
        var lat = latlonData.latitude;
        var lon = latlonData.longitude;
        var velocity = latlonData.velocity;
        var altitude = latlonData.altitude;
        var timestamp = latlonData.timestamp;
        console.log(lat, lon, currentIssTime);

        // get that information add a red marker (with the latitudes from the local storage)

        var point = {
            lat,
            lon,
            timestamp
        };
        // console.log(point);
        var timeStorage = JSON.parse(localStorage.getItem("cityTimeStampUnix")) || [];
        var lastTimeStamp = timeStorage[timeStorage.length - 1];
        var now = new Date().getTime() / 1000;
        // console.log("TIMESTAMP", lastTimeStamp.timestamp);
        console.log("NOW", now);
        if (!timeStorage.length || now > lastTimeStamp.timestamp + 60) {
            timeStorage.push(point);
            localStorage.setItem("cityTimeStampUnix", JSON.stringify(timeStorage));
            // renderLocalStorage(timeStorage, map);
        }

        // fetch information using coordinates to find city
        var baseCityUrl = 'https://api.wheretheiss.at/v1/coordinates/'
        var coordinateToCityUrl = baseCityUrl + lat + ',' + lon

        fetch(coordinateToCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (ISSdata) {
                // appended ISS elements to page
                tabIssEl.innerHTML = '';

                var issImage = document.createElement("img");
                issImage.classList.add('iss-pic');
                issImage.src = "https://bgr.com/wp-content/uploads/2022/02/AdobeStock_320918695.jpeg?resize=800,800"
                issImage.alt = "International Space Station"
                issImage.title = "International Space Station"
                tabIssEl.appendChild(issImage);

                // time zone
                var timeZoneEl = document.createElement('div');
                timeZoneEl.textContent = "Time Zone: " + ISSdata.timezone_id
                tabIssEl.prepend(timeZoneEl);

                // display ISS map on page:
                var mapImage = document.createElement("div");
                mapImage.setAttribute('id', 'map');
                tabIssEl.appendChild(mapImage);

                // set map 
                var map = L.map('map').setView([lat, lon], 1);
                // console.log(lat, lon);

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
                    .setContent("I'm traveling at " + Math.floor(velocity * 0.621371) + " mph")
                    .openOn(map);

                // add markers from trajector points here


                // create a red polyline from an array of LatLng points



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

// ***** Nearest Objects TAB
var displayNearestObjects = function (objects) {
    onlyNO();
    nearestObjectContainerEl.innerHTML = '';

    if (objects === 0) {
        return;
    }
    var date = moment().format('YYYY-MM-DD');
    console.log(date);
    var nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
    var nearestObjectUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + date + '&end_date=' + date + '&api_key=' + nasaAPI


    fetch(nearestObjectUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var objects = data.element_count;

            // var objectImage = document.createElement('img');
            // objectImage.classList.add('col-5', 'card');
            // objectImage.src = 'https://via.placeholder.com/400'
            // objectImage.alt = 'space objects';
            // objectImage.title = 'space objects';
            // nearest.appendChild(objectImage);

            var objectCountPrint = document.createElement('div');
            objectCountPrint.classList.add('col-4', 'h5', 'card', 'p-3', 'mx-2', 'my-3');
            nearestObjectContainerEl.appendChild(objectCountPrint);
            objectCountPrint.textContent = 'There are currently ' + objects + ' objects';

            var divobject= document.createElement('div');
            divobject.classList.add('test');
            nearestObjectContainerEl.appendChild(divobject);
            divobject.textContent = ''


            var descobject = document.createElement('div');
            descobject.classList.add('test');
            divobject.appendChild(descobject);
            divobject.textContent = 'Here goes info about how read and understand this info'


            // add stuff here
            for (var i = 0; i < data.near_earth_objects[date].length; i++) {

                var name = data.near_earth_objects[date][i].name;
                // console.log(name);
                var minSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_min;
                var maxSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_max;
                var sum = (minSize + maxSize);
                var avgSize = sum / 2;
                var danger = data.near_earth_objects[date][i].is_potentially_hazardous_asteroid;
                var closeDate = data.near_earth_objects[date][i].close_approach_data[0].close_approach_date_full;
                var velocityObject = data.near_earth_objects[date][i].close_approach_data[0].relative_velocity.miles_per_hour

                // creates individual cards for each object
                var objectPrintContainer = document.createElement('div');
                objectPrintContainer.classList.add('col-4', 'h6', 'card', 'py-3', 'px-3', 'mx-2', 'my-2');
                divobject.appendChild(objectPrintContainer);

                var namePrint = document.createElement('p');
                namePrint.classList.add('test');
                objectPrintContainer.appendChild(namePrint);
                namePrint.textContent = 'Name: ' + name;

                var avgSizePrint = document.createElement('p');
                avgSizePrint.classList.add('test');
                objectPrintContainer.appendChild(avgSizePrint);
                avgSizePrint.textContent = 'Size: ' + Math.floor(avgSize * 1760) + ' yds';

                var velocityPrint = document.createElement('p');
                velocityPrint.classList.add('test');
                objectPrintContainer.appendChild(velocityPrint);
                velocityPrint.textContent = 'Velocity: ' + Math.floor(velocityObject) + ' mph';

                var closePrint = document.createElement('p');
                closePrint.classList.add('test');
                objectPrintContainer.appendChild(closePrint);
                closePrint.textContent = 'Closest Approaching Time: ' + closeDate;

                if (danger) {
                    var dangerPrint = document.createElement('button');
                    dangerPrint.classList.add('btn', 'btn-warning');
                    objectPrintContainer.appendChild(dangerPrint);
                    dangerPrint.textContent = 'Potentially Hazardous!'
                } else {
                    var dangerPrint = document.createElement('button');
                    dangerPrint.classList.add('btn', 'btn-primary');
                    objectPrintContainer.appendChild(dangerPrint);
                    dangerPrint.textContent = 'Not Hazardous'
                }
            }
        })
}

var onlyPOD = function () {
    tabIssEl.style.display = "none";
    tabPodEl.style.display = "block";
    tabNearestObject.style.display = "none";
}
var onlyISS = function () {
    tabPodEl.style.display = "none";
    tabIssEl.style.display = "flex";
    tabNearestObject.style.display = "none";
}
var onlyNO = function () {
    tabPodEl.style.display = "none";
    tabIssEl.style.display = "none";
    tabNearestObject.style.display = "block";
}

podLink.addEventListener('click', displayPOD);
issLink.addEventListener('click', issPage);
noLink.addEventListener('click', displayNearestObjects)