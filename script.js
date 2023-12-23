//Create a fetch call
//in the lat and lon, create fetch as a string and '' + value + '' where value is the searched entry tab. 
//in fetch call create a .then function for the next action.
//another .then function for that adds #city, #temp, #wind, and #humidity to the html document. 


const searchForm = document.getElementById('citySearch');
const searchInput = document.getElementById('cityInput');
const savedSearchList = document.getElementById('savedCityList');
const cityName = document.getElementById('cityName');

//pulling info from API
function getInfo(){
    //created another variable for cityInput locally to this function
    const newName = document.getElementById('cityInput');
    //putting the user city input into the HTML doc
    cityName.innerHTML = "--"+newName.value+"--"

//API fetch request with newName.vale added to the url to insert a user's text, need to find out how to limit to just US
fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=5ee40e0816c136937ce4d351f3932343")
.then(response => response.json())
.then(data => {
    //for loop to get Temperature
    for(i=0;i<5;i++){
        document.getElementById("day" +(i+1)+ "Temp").innerHTML ="Temp:" +Number(data.list[i].main.temp -((273.15*1.8)+32))+"℉";
    }
    //for loop to get wind speed
    for(i=0;i<5;i++){
        document.getElementById("day" +(i+1)+ "Wind").innerHTML ="Wind:" +Number(data.list[i].wind.speed * .62)+"MPH";
    }
    //for loop to get humidity
    for(i=0;i<5;i++){
        document.getElementById("day" +(i+1)+ "Wind").innerHTML ="Humidity:" +Number(data.list[i].main.humidity)+"%";
    }
    //for loop to get weather icons
    for(i=0;i<5;i++){
        document.getElementById("img" +(i+1)).src ="https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
    }
})
//brings up error is not found
.catch(err => alert("ERROR"))
};
//variables for checkday function
const day = new Date();
const weekday =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function checkDay(day){
    if(day+day.getDay() > 6){
        return day +day.getDay()-7;
    }
    else{
        return day +day.getDay();
    }
}
for(i=0;i<5;i++){
    document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)];
}

  // Add event listener to the form submit button
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchQuery = searchInput.value;

    // Store the search query in local storage
    localStorage.setItem('searchQuery' + localStorage.length, searchQuery);

    // Display the saved search query in the list
    const listItem = document.createElement('li');
    listItem.textContent = searchQuery;
    savedSearchList.appendChild(listItem);

    // Clear the input field
    searchInput.value = '';
});

// Add event listener to the saved search list items
savedSearchList.addEventListener('click', function(event) {
    const clickedItem = event.target;
    const searchQuery = localStorage.getItem(clickedItem.textContent);

    // Perform the search using the retrieved search query
    console.log('Performing search:', searchQuery);
});