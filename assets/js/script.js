
var containerEl = document.querySelector('container');
// page title
var headerTitleEl = document.createElement('header');
headerTitleEl.classList.add('display-1', 'text-center', 'py-5');
containerEl.prepend(headerTitleEl);
headerTitleEl.textContent = 'SPACE';

// container for pod page
var podApiEl = document.createElement('div');
podApiEl.classList.add('py-5', 'px-5', 'test2');
podApiEl.setAttribute('id', 'pod-page')
containerEl.appendChild(podApiEl);

// container for pod
var podContainerEl = document.createElement('div');
podContainerEl.classList.add('py-5', 'px-5', 'text-center');
podApiEl.appendChild(podContainerEl);

// var displayPOD = function (pod) {
//     // if there is no info inside API and return value is 0 it will give us no image found
//     if (pod.length === 0) {
//         podEl.textContent = 'No image found';
//         return;
//     }

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









//  marsWeatherUrl ='https://api.nasa.gov/insight_weather/?api_key=' + nasaAPI + '&feedtype=json&ver=1.0'