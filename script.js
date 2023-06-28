const apiKey='942e1cdbd441db52c17d82bee17d9aa8';
const callButton=document.getElementById('call');
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      fetchData(url);
      },
      function(error) {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  
if(callButton){
    callButton.addEventListener('click',event=>{
      
       const cityName=document.getElementById('city').value;
       const url= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
       fetchData(url); 
    });
}
function scrapData(response){
    return new Promise((resolve,reject)=>{
            if(!response.ok){
               
                reject(new Error("404 Bad request"));
            }else{
                response.json().then(data=>{
                    resolve(scrapJSON(data));
                }).catch(error=>{
                    
                        reject (new Error("Invalid JSON format"));
                });
            }
    });
}
function scrapJSON(data){
  
    const weather=data.weather;
    let description='';
    let i=0;
    for(;i<weather.length-1;i++){
      
        description+=weather[i].description+', ';
        
    }

    description+=weather[i].description;
   
    const obj={
        'description':description,
         'temperature':data.main.temp,
         'humidity':data.main.humidity,
         'wind':data.wind.speed
    };
   
    return obj;
}
function showData(data){
    const description=data.description;
    
    const temperature=data.temperature;
    
    const humidity=data.humidity;
    const wind=data.wind;
    
    const temperatureInCelsius = parseInt(parseFloat(temperature) - 273.15)+'&deg'+'C';
    document.getElementById('temp').innerHTML=temperatureInCelsius;
    document.getElementById('wind').innerHTML=wind+" km/h";
    document.getElementById('humidity').innerHTML=humidity+"%";
    document.getElementById('description').innerHTML=description;
}
function fetchData(url){
    
    fetch(url)
    .then(response=>{
        return scrapData(response);
    }).then(data=>{
        
        showData(data);
    }).catch(error=>{
       console.log("here");
    });
}