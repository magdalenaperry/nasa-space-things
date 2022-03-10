
var containerEl = document.querySelector('container');

var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'py-5');
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'SPACE';

// TAB CONTENTS 
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
tabContent.appendChild(tabNearestObject);

// container for pod page
var podApiEl = document.createElement('div');
podApiEl.classList.add('py-5', 'px-5', 'test2');
tabPodEl.appendChild(podApiEl);

// container for pod
var podContainerEl = document.createElement('div');
podContainerEl.classList.add('py-5', 'px-5', 'text-center');
podApiEl.appendChild(podContainerEl);

// container for ISS
var issContainerEl = document.createElement('div');
issContainerEl.classList.add('test');
tabIssEl.appendChild(issContainerEl);






// POD PAGE
var displayPOD = function (pod) {
    // onlyPOD();
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
            var podTitle = data.title;
            var podExplanation = data.explanation;
            var podSrc = data.url;
            // this is where we append things to our page
            // pod
            var podTitleEl = document.createElement('h3')
            podTitleEl.classList.add('podtitleheadertest')  // creating class for future
            podContainerEl.appendChild(podTitleEl)
            podTitleEl.textContent = podTitle

            var podEl = document.createElement('img');
            podEl.classList.add('img-fluid');
            podEl.src = podSrc;
            podEl.alt = podTitle;
            podEl.title = podTitle;
            podContainerEl.appendChild(podEl);

            // text div for pod details
            var podDescriptionContEl = document.createElement('div');
            podDescriptionContEl.classList.add('poddescriptioncontainer', 'test2');
            podContainerEl.appendChild(podDescriptionContEl);
            podDescriptionContEl.textContent = podExplanation;
        })
        .catch(function (err) {
            console.log(err);
        });

}
displayPOD();













// https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-03-09&end_date=2022-03-10&api_key=DEMO_KEY

// URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + 2022-03-09 + '&end_date=' + 2022-03-10 + '&api_key=' + API
// data.element_count
// data.near_earth_objects.2022-03-09[0].estimated_diameter.miles.estimated_diameter_min
// data.near_earth_objects.2022-03-09[0].estimated_diameter.miles
// $.near_earth_objects.2022-03-09[0].is_potentially_hazardous_asteroid 
// $.near_earth_objects.2022-3-09[0].close_approach_data[0].close_approach_date_full
// $.near_earth_objects.2022-03-09[0].close_approach_data[0].relative_velocity.miles_per_hour

// create a date form
// check values to see if date works
// take the input from a search event handler through date value?
// insert that information into API url
// render the information on the page 




// BREAK POINT FOR SEPARATE PAGE





// 
// coordinateUrl = 'https://api.wheretheiss.at/v1/coordinates/' + lat + ',' + lon

// // find lat and lon for a specific time in unix
// https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles
// timestampUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + unixTimeStamp + '&units=miles'


// // //current time where is ISS
// baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'

// // var lat = data.latitude
// // var lon = data.longitude
// // googleMap = data.map_url
// // timezone = data.timezone_id
var issPage = function(){
    onlyISS();
    // function to access API within the search button function for a city with lats/lons
    var getCoordinatesFromAPI = function (city) {
        // base url to get the coordinates from ISS at current time =
        var baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'
    
        console.log(baseUrl);
        fetch(baseUrl)
            .then(function (response) {
                // if the data is available
                if (response.ok) {
                    // return response as data as json which makes it readable 
                    // (response) turns into (data)
                    response.json()
    
                        // access the data that is readable ^
                        .then(function (data) {
                            // this function is made to link the data from this fetch request to the url that holds city information
                            // (data) will turn into (latlondata) 
                            displayMapLatLon(data);
                            // console.log(data.latitude);
                            // console.log(data.longitude);
                            // // var lat = data.latitude
                            // // var lon = data.longitude
                            // // googleMap = data.map_url
                            // // timezone = data.timezone_id
    
    
    
                        });
                } else {
                    // if data is not available (look at line 24)= get alert that says error 
                    alert('Error: ' + response.statusText);
                }
            })
            // if api url is not available = nothing is given back
            .catch(function (error) {
                alert('Unable to find data');
            });
    };
    
    // // connects the lat/lon and the ISS city/maps API 
    // loook at line 34
    var displayMapLatLon = function (latlonData) {
        if (!latlonData) {
            // containerEl = 'No data found';
            return;
        }
        // latlonData used to be data
        var lat = latlonData.latitude
        var lon = latlonData.longitude
        var velocity = latlonData.velocity
        var altitude = latlonData.altitude
        console.log(lat, lon)
    
        // fetch information using coordinates to find city
        var baseCityUrl = 'https://api.wheretheiss.at/v1/coordinates/'
        var coordinateToCityUrl = baseCityUrl + lat + ',' + lon
        // console.log('new url', coordinateToCityUrl)
    
        fetch(coordinateToCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (ISSdata) {
                console.log(ISSdata.timezone_id);
                console.log(ISSdata.map_url);
                // insert stuff to populate ISS Data
                // placeholder image for ISS 
                var issImage = document.createElement("img");
                issImage.classList.add('iss-map1', 'iss-map2', 'iss-map3', 'iss-map4');
                issImage.src = "https://via.placeholder.com/500px"
                issImage.alt = "International Space Station"
                issImage.title = "International Space Station"
                tabIssEl.appendChild(issImage);
    
    
    
                // time zone
                var timeZoneEl = document.createElement('div');
                timeZoneEl.textContent = "Time Zone: " + ISSdata.timezone_id
                tabIssEl.appendChild(timeZoneEl);
                
    
                // display ISS map on page:
                var mapImage = document.createElement("div");
                mapImage.setAttribute('id', 'map');
                // mapImage.classList.add('text-center');
                tabIssEl.appendChild(mapImage);
    
                var map = L.map('map').setView([lat, lon], 4);
                console.log(lat, lon);
    
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWJwZXJyeTE2IiwiYSI6ImNsMGw0NHc1MzBzbjQzaWw0eGJvOWlwenEifQ.Tldp3_qx74Vu3cnGOBgpcw', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'your.mapbox.access.token'
                }).addTo(map);
                
                var marker = L.marker([lat, lon]).addTo(map);
    
                var popup = L.popup()
                .setLatLng([lat+3, lon])
                .setContent("I'm traveling at " + Math.floor(velocity*0.621371) + " mph")
                .openOn(map);
    
            })
            .catch(function (err) {
                console.log(err);
            });
        return;
    };
    // have to call the functions to see the console.logs & new html created inside of each function
    getCoordinatesFromAPI();
    displayMapLatLon();

}

var onlyPOD =function(){
    tabIssEl.style.display = "none";
}

var onlyISS = function() {
    tabPodEl.style.display = "none";
}

