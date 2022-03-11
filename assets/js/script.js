var containerEl = document.querySelector('container');

var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'py-5',);
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'SPACE';

// TAB CONTENTS 
var tabContent = document.createElement('div');
tabContent.setAttribute('id', 'myTabContent',);
containerEl.appendChild(tabContent);

var tabPodEl = document.createElement('div');
tabPodEl.setAttribute('id', 'pod-container');
tabContent.appendChild(tabPodEl);

var tabIssEl = document.createElement('div');
tabIssEl.setAttribute('id', 'iss-container');
tabContent.appendChild(tabIssEl);

var tabNearestObject = document.createElement('div');
tabNearestObject.classList.add('row')
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

// container nearest object
var nearestObjectContainerEl = document.createElement('div');
nearestObjectContainerEl.classList.add('test');
tabNearestObject.appendChild(nearestObjectContainerEl);

// container for date on NO page
var noDateEl = document.createElement('div');
noDateEl.classList.add('display-4', 'text-center');
tabNearestObject.prepend(noDateEl);
noDateEl.textContent = moment().format('MMMM Do, YYYY');

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
            var podTitle = data.title;
            var podExplanation = data.explanation;
            var podSrc = data.url;
            // this is where we append things to our page
            // pod
            var podTitleEl = document.createElement('h3')
            podTitleEl.classList.add('podtitleheadertest') // creating class for future
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
            podDescriptionContEl.classList.add('poddescriptioncontainer');
            podContainerEl.appendChild(podDescriptionContEl);
            podDescriptionContEl.textContent = podExplanation;
        })
        .catch(function (err) {
            console.log(err);
        });
    return;

}
displayPOD();



// BREAK POINT FOR SEPARATE PAGE



// // find lat and lon for a specific time in unix
// https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles
// timestampUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + unixTimeStamp + '&units=miles'

var issPage = function () {
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


    // get lat, lon, time in unix from api ^ and then convert to moment
    // save this information to local storage
    // get that information add a red marker (with the latitudes from the local storage)








    // // connects the lat/lon and the ISS city/maps API 
    // loook at line 34
    var displayMapLatLon = function (latlonData) {
        if (!latlonData) {
            // containerEl = 'No data found';
            return;
        }
        // latlonData used to be data
        var currentIssTime = latlonData.timestamp;
        var lat = latlonData.latitude
        var lon = latlonData.longitude
        var velocity = latlonData.velocity
        var altitude = latlonData.altitude
        console.log(lat, lon, currentIssTime);


        // fetch information using coordinates to find city
        var baseCityUrl = 'https://api.wheretheiss.at/v1/coordinates/'
        var coordinateToCityUrl = baseCityUrl + lat + ',' + lon
        // console.log('new url', coordinateToCityUrl)

        fetch(coordinateToCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (ISSdata) {

                tabIssEl.innerHTML = ''
                console.log(ISSdata.timezone_id);
                console.log(ISSdata.map_url);
                // insert stuff to populate ISS Data
                // placeholder image for ISS 
                var issImage = document.createElement("img");
                issImage.classList.add('iss-pic');
                issImage.src = "https://bgr.com/wp-content/uploads/2022/02/AdobeStock_320918695.jpeg?resize=800,800"
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

                var map = L.map('map').setView([lat, lon], 3);
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
                    .setLatLng([lat + 3, lon])
                    .setContent("I'm traveling at " + Math.floor(velocity * 0.621371) + " mph")
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


/* < input type = "date" id = "start" name = "trip-start" value = "2018-07-22" min = "2018-01-01" max = "2018-12-31" > */

// https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-03-09&end_date=2022-03-10&api_key=DEMO_KEY

// URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + 2022-03-09 + '&end_date=' + 2022-03-10 + '&api_key=' + API
// data.element_count
// data.near_earth_objects.2022-03-09[0].estimated_diameter.miles.estimated_diameter_min
// data.near_earth_objects.2022-03-09[0].estimated_diameter.miles
// $.near_earth_objects.2022-03-09[0].is_potentially_hazardous_asteroid 
// $.near_earth_objects.2022-3-09[0].close_approach_data[0].close_approach_date_full
// $.near_earth_objects.2022-03-09[0].close_approach_data[0].relative_velocity.miles_per_hour


// Nearest Objects
var displayNearestObjects = function (objects) {
    // tabIssEl.style.display = "none";
    onlyNO();
    nearestObjectContainerEl.innerHTML = '';

    // if there is no info inside API and return value is 0 it will give us no image found
    if (objects === 0) {
        // podContainerEl.textContent = 'No image found';
        return;
    }
    var date = moment().format('YYYY-MM-DD');
    console.log(date);
    var nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
    var nearestObjectUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + date + '&end_date=' + date + '&api_key=' + nasaAPI
    // console.log(nearestObjectUrl);


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

            var nObjectResultsEl = document.createElement('div');
            nObjectResultsEl.classList.add('test');




            
            var objectCountPrint = document.createElement('div');
            objectCountPrint.classList.add('col-4', 'h5', 'card', 'p-3', 'mx-2', 'my-3');
            nearestObjectContainerEl.appendChild(objectCountPrint);
            objectCountPrint.textContent = 'There are currently ' + objects + ' objects';
            
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
                nearestObjectContainerEl.appendChild(objectPrintContainer);
                
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
                
                
                
                
                
                
                
                
                
                
                // console.log(data.near_earth_objects[date][i]);
                
                
                
                
                
                
                
                
            }
            
            
            // var name = data.near_earth_objects[date][i].name;
            // console.log(name);
            // var minSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_min;
            // var maxSize = data.near_earth_objects[date][i].estimated_diameter.miles.estimated_diameter_max;
            // var sum = (minSize + maxSize);
            // var avgSize = sum/2;
            // var danger = data.near_earth_objects[date][i].is_potentially_hazardous_asteroid;
            // var closeDate = data.near_earth_objects[date][i].close_approach_data[0].close_approach_date_full;
            // var velocityObject = data.near_earth_objects[date][i].close_approach_data[0].relative_velocity.miles_per_hour
            
            // console.log(minSize);
            
            
            
            
        })
        // .catch(function (err) {
            //     console.log(err);
            // });
            // return;
            
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
        
                    // var dateBtn = document.createElement('input');
                    // dateBtn.classList.add('test', 'display-1');
                    // dateBtn.setAttribute('type', 'date');
                    // dateBtn.setAttribute('name', 'space-object');
                    // dateBtn.setAttribute('value', '2022-03-10');
                    // dateBtn.setAttribute('min', '1950-01-01');
                    // dateBtn.setAttribute('min', '2022-12-31');
                    // nearestObjectContainerEl.appendChild(dateBtn);