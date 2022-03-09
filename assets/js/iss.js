// // var lat = data.latitude
// // var lon = data.longitude
// // googleMap = data.map_url
// // timezone = data.timezone_id
// 
// coordinateUrl = 'https://api.wheretheiss.at/v1/coordinates/' + lat + ',' + lon

// // find lat and lon for a specific time in unix
// https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles
// timestampUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + unixTimeStamp + '&units=miles'


// // //current time where is ISS
// baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'

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
    // console.log(lat, lon) 

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

                // display stuff here

            })
            .catch(function (err) {
                console.log(err);
            });
        return;
};
// have to call the functions to see the console.logs & new html created inside of each function
getCoordinatesFromAPI(); 
displayMapLatLon();