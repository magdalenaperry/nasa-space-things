
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



// picOfDayUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaAPI
// // var podTitle = data.title
// // var copyRight = data.copyRight
// // var explanation = data.explanation

// nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
// 
// // var podTitle = data.title
// // var copyRight = data.copyRight
// // var explanation = data.explanation

// fetch request for NASA POD API

// var displayPOD = function (pod) {
//     // if there is no info inside API and return value is 0 it will give us no image found
//     if (pod.length === 0) {
//         podEl.textContent = 'No image found';
//         return;
//     }
// fetch URL


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
        podEl.classList.add('picture', 'test2');
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

// }
// displayPOD();

    // console.log("does this work?", displayPOD);

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