<div id="top"></div>

<div align="center">

![GitHub followers](https://img.shields.io/github/followers/magdalenaperry?style=for-the-badge)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
<!-- [![MIT License][license-shield]][license-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]

---

# Cosmic Dust

<a href="https://github.com/magdalenaperry/nasa-space-things">
    <img src="assets\images\near-earth-object.jpeg" alt="Logo" width="600px" height="150px">
  </a>

</div>

## Table of contents

1. [Description](#description)
1. [Technologies](#technologies)
1. [Prerequisites](#prerequisites)
3. [Installation](#installation)
3. [Usage](#usage)
2. [Visuals](#visuals)
8. [Contributors](#contributors)
9. [Roadmap](#roadmap)
10. [Contact](#contact)
11. [Acknowledgements](#acknowledgements)
    
---

## Description
Cosmic Dust is a full stack application created for space enthusiasts. The application allows space enthusiasts to view NASA’s picture of the day, access real time data regarding the International Space Station's location, and view a list of Nearest Earth Objects’(comets, asteroids, and debris). 

#### Deployed Links:
[Cosmic Dust Repository Link](https://github.com/magdalenaperry/nasa-space-things)

[Cosmic Dust Link](https://magdalenaperry.github.io/nasa-space-things/)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Technologies
- JavaScript
- [Leaflet](https://leafletjs.com/SlavaUkraini/)
- [NASA API](https://api.nasa.gov/)
- [Bootstrap](https://getbootstrap.com/)
- [Bootswatch](https://bootswatch.com/)
- [Moment.js](https://momentjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Prerequisites
    n/a

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Installation
1. Acquire NASA API Key
2. Acquire Leaflet 


<p align="right">(<a href="#top">back to top</a>)</p>

----

## Usage
Users are encouraged to visit the website daily as data is tracking real-time

- Picture of Day

    - Title and detailed description about the image pulled from NASA's API.

- International Space Station (ISS)

    - When a user visits the page for the first time it will mark the current location of the ISS and save it to **local storage**. The next time the page is loaded it will connect the last location to the current location with a red line. This process is repeated until local storage is **cleared**. This allows a user to view and track the path of the ISS. The data is pulled from ISS's API. 
   
- Nearest Objects

    - The Near-Earth-Objects are pulled from NASA's API for the current date and allows a user to see how many are orbiting close to Earth. The user can see the name, size, velocity, closest approaching time and if hazardous--color coded: green (not hazardous) , orange (potentially hazardous).

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Visuals
<div align="center">
https://user-images.githubusercontent.com/97912154/158255437-b2111c30-7494-4e17-bd53-8d8592415454.mp4

<p align="right">(<a href="#top">back to top</a>)</p>

---
</div>

## Contributors

Magdalena Perry: 

- [Linkedin](https://www.linkedin.com/in/magdalena-perry/)

- [Github](https://github.com/magdalenaperry)

Rocio Galvan: 

- [Linkedin](https://www.linkedin.com/in/rocio-galvan/)


<p align="right">(<a href="#top">back to top</a>)</p>

---
## Roadmap
- [x] Link NASA API
- [x] Link International Space Station API
- [x] Link Leaflet API
- [x] Create map tracking points
- [x] Render Pages

<p align="right">(<a href="#top">back to top</a>)</p>

---
## Contact
For any additional questions, please reach out to me through email and follow me on GitHub.

Name - [Magdalena Perry LinkedIn](https:www.linkedin.com/in/magdalenaperry)

Github - [magdalenaperry](https://www.github.com/magdalenaperry)

email - [mageltron@gmail.com](mageltron@gmail.com)

<p align="right">(<a href="#top">back to top</a>)</p>

---
## Acknowledgements

1. [NASA](https://api.nasa.gov/index.html)
    - Sign up for an API key with your email address
    - No authentication required
    - Rate limit: Hourly Limit of 1,000 requests per hour


2. [International Space Center](https://wheretheiss.at/w/developer)
    - No sign up via email required
    - No authentication required
    - Rate limit: requests are limited to roughly 1 per second


3. [Mapbox](https://docs.mapbox.com/api/maps/static-tiles/)
    - Sign up for a Mapbox API token with your email address to use Leaflet 
    - Rate limit: 6,000 requests per minute

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- 
See more on the [Open Database License](https://www.openstreetmap.org/copyright) -->



      
[contributors-shield]: https://img.shields.io/github/contributors/magdalenaperry/nasa-space-things.svg?style=for-the-badge
[contributors-url]: https://github.com/magdalenaperry/nasa-space-things/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/magdalenaperry/nasa-space-things.svg?style=for-the-badge
[forks-url]: https://github.com/magdalenaperry/nasa-space-things/network/members
[stars-shield]: https://img.shields.io/github/stars/magdalenaperry/nasa-space-things.svg?style=for-the-badge
[stars-url]: https://github.com/magdalenaperry/nasa-space-things/stargazers
[issues-shield]: https://img.shields.io/github/issues/magdalenaperry/nasa-space-things.svg?style=for-the-badge
[issues-url]: https://github.com/magdalenaperry/nasa-space-things/issues
[license-shield]: https://img.shields.io/github/license/magdalenaperry/nasa-space-things.svg?style=for-the-badge
[license-url]: https://github.com/magdalenaperry/nasa-space-things/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/magdalenaperry
[product-screenshot]: images/screenshot.png
