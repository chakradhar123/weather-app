window.displayWeather=(data)=>{
    let place=document.createElement("div");
    let temperature=document.createElement("div");
    let weather=document.createElement("div");
    let button=document.createElement("button");
    let buttonText=document.createTextNode("Change Temperature unit")
    let image=document.createElement("img")
    place.setAttribute("class","place")
    temperature.setAttribute("class","temperature");
    temperature.setAttribute("id","temperature");
    weather.setAttribute("class","weather")
    place.textContent=data.city_name;
    temperature.textContent=data.temp+" C";
    weather.textContent=data.weather.description;
    image.setAttribute("src",`icons/${data.weather.icon}.png`)
    image.setAttribute("alt","weather image")
    button.appendChild(buttonText)
    button.addEventListener("click",()=>{
       let temp= document.getElementById("temperature");
       let float=parseFloat(temp.textContent.substr(0,temp.textContent.length-2))
        console.log(float)   
       if(temp.textContent[temp.textContent.length-1]=='C'){
        float=float*(9/5)+32;
        float=float.toPrecision(3)
        temp.textContent=float.toString()+" F"
       }else{
        float=(float-32)*(5/9);
        float=float.toPrecision(3)
        temp.textContent=float.toString()+" C"
       }
       
    })
    
    document.body.appendChild(place);
    document.body.appendChild(temperature);
    document.body.appendChild(weather);
    document.body.appendChild(image)
    document.body.appendChild(button)

}
window.fetchData=(latitude,longitude)=>{
    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${longitude}&lat=${latitude}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
		"x-rapidapi-key": "27632a4321mshed8c3f7b8c8cfd9p120a95jsnd1f289e9e657"
	}
}).then(
        res=>res.json().then(res=>{
            console.log(res)
            displayWeather(res.data[0])
        }
        )

    ).catch(err=>{
        console.log(err);
    })
}
window.onload=()=>{

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position=>{
            fetchData(position.coords.latitude,position.coords.longitude)
        }),(err)=>{
            console.log(err)
        });
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
    

}
