console.log('javascript linked')
// create the elements
// add classes to the elements
// append to page
// add text to it 

var containerEl = document.querySelector('container');
// page title
var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'py-5');
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'SPACE';

// container for pod page
var podApiEl = document.createElement('div');
podApiEl.classList.add('py-5', 'px-5', 'test2');
containerEl.appendChild(podApiEl);

// container for pod
var podContainerEl = document.createElement('div');
podContainerEl.classList.add('py-5', 'px-5', 'text-center');
podApiEl.appendChild(podContainerEl);
// podContainerEl.textContent = 'image will go inside here';

// pod
var podEl = document.createElement('img');
podEl.classList.add('picture', 'test2');
podEl.src = 'https://via.placeholder.com/500';
podEl.alt = "picture of day from NASA's API";
podEl.title = 'change me later based on api title';
podContainerEl.appendChild(podEl);

// text div for pod details
var podDescriptionContEl = document.createElement('div');
podDescriptionContEl.classList.add('poddescriptioncontainer', 'test2');
podContainerEl.appendChild(podDescriptionContEl);
podDescriptionContEl.textContent = 'pod text';


// nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
// 
// // var podTitle = data.title
// // var copyRight = data.copyRight
// // var explanation = data.explanation



// function to access API within the search button function for a city with lats/lons
var getNasaPod = function (pod) {
   
var picOfDayUrl = 'https://api.nasa.gov/planetary/apod?api_key=g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
console.log(picOfDayUrl);
    


    
    fetch(picOfDayUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (pod) {
                    displayPOD(pod);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to find data for this city');
        });
};



getNasaPod();






// // var lat = data.latitude
// // var lon = data.longitude
// // googleMap = data.map_url
// // timezone = data.timezone_id
// https://api.wheretheiss.at/v1/coordinates/45.795517,-100.393693
// coordinateUrl = 'https://api.wheretheiss.at/v1/coordinates/' + lat + ',' + lon


// // find lat and lon for a specific time in unix
// https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles
// timestampUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + unixTimeStamp + '&units=miles'

// //current time where is ISS
// baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'


//  marsWeatherUrl ='https://api.nasa.gov/insight_weather/?api_key=' + nasaAPI + '&feedtype=json&ver=1.0'