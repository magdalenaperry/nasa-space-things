console.log('javascript linked')


// var lat = data.latitude
// var lon = data.longitude
// googleMap = data.map_url
// timezone = data.timezone_id
https://api.wheretheiss.at/v1/coordinates/45.795517,-100.393693
coordinateUrl = 'https://api.wheretheiss.at/v1/coordinates/' + lat + ',' + lon


// find lat and lon for a specific time in unix
https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles
timestampUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + unixTimeStamp + '&units=miles'


//current time where is ISS
baseUrl = 'https://api.wheretheiss.at/v1/satellites/25544'


nasaAPI = 'g47afBYRtnzgxSu2MaFL0cyL68LEZMo0QdzrgehP'
picOfDayUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaAPI
// var podTitle = data.title
// var copyRight = data.copyRight
// var explanation = data.explanation


 marsWeatherUrl ='https://api.nasa.gov/insight_weather/?api_key=' + nasaAPI + '&feedtype=json&ver=1.0'