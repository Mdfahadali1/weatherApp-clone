const yourWeather = document.querySelector('[your-weather]');
const searchWheather =document.querySelector('[search-Wheather]');
const garntAcess = document.querySelector('.garntAcessTag');
const grantAccessButon = document.querySelector('[grantAcessBUtton]');
const YourLocation = document.querySelector('[YourLocationTag]');
const searchForm = document.querySelector('[ searchBar-form]');
const loading = document.querySelector('[loadinggif]');
const errorImage4o4 = document.querySelector('.errorImage404');
console.log(loading);
// api key
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

//  creating a varible to store the default button state
let deafultButton = yourWeather;

// adding the class through DOM and defing the styles in the stylesheet weater you need to display or hide the  buttton
deafultButton.classList.add('your-weather');

//funtion call for starting the page display if the user has it coordinates then it will render the your present location else ask for grant permission
   checkingCoordinaates();


function changePage(positionedValue){

   if(positionedValue !==  deafultButton){

      deafultButton.classList.remove('your-weather');
      // Update defaultButton to the passed button, not searchWeather
      deafultButton = positionedValue;
      deafultButton.classList.add('your-weather');

// nested if have write else the logic works quite opposite//bug solved
            
      if(!searchForm.classList.contains('active')){
         //contains === Returns true if the list contains a class
            //   deafultButton.classList.remove('your-weather');
            //kya search form wala container is invisible, if yes then make it visible

            searchForm.classList.add('active');
              garntAcess.classList.remove('active');
              YourLocation.classList.remove('active');
           
           }

           else {
             
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
               searchForm.classList.remove('active');
               YourLocation.classList.remove('active');
               loading.classList.remove('active');
               // when no searchForm and aYourlocation then error function has to be removed
               errorImage4o4.classList.remove('active');
               //now  your weather tab have entered, moreover weather details should have to render , so let's check local storage first
            //for coordinates, if we haved saved them there.
            checkingCoordinaates();
            }  
   }
   
     }
  
//function for changing the yourWeater button and searchWeather button

   yourWeather.addEventListener('click', () =>{

      changePage(yourWeather);
      errorImage4o4.classList.remove('active');

   });

   searchWheather.addEventListener('click', ()=>{
      changePage(searchWheather);
 });

function renderWeather(WheatherInfoDetails){
 
   const dynamicCOunryLocationNAme = document.querySelector('[dynamicLocationNAme]');
   const  dynamicCOuntryImage = document.querySelector('[dynamicImage]');
   const dynamicWeaterInfo = document.querySelector('[dynamicWeaterInfo]');
   const tempoTemps = document.querySelector('[tempoTemps]');
   const dynamicWeaterInfoImgae = document.querySelector('[dynamicWeaterInfoImgae]');
   const windSpeed= document.querySelector('[windSpeed]');
   const humidity = document.querySelector('[humidity]');
   const clouds = document.querySelector('[cloudsInfo]');
   const timeCHeck = document.querySelector('[timeCHeck]');

dynamicCOunryLocationNAme.innerText = WheatherInfoDetails?.name;
dynamicCOuntryImage.src = `https://flagcdn.com/144x108/${WheatherInfoDetails?.sys?.country.toLowerCase()}.png`;

dynamicWeaterInfo.innerText =`${WheatherInfoDetails?.weather?.[0]?.description}`;
tempoTemps.innerText =`${ WheatherInfoDetails?.main?.temp} °C`;
dynamicWeaterInfoImgae.src = `http://openweathermap.org/img/w/${WheatherInfoDetails?.weather?.[0]?.icon}.png`;

windSpeed.innerText = `${WheatherInfoDetails?.wind?.speed} m/s`;
humidity.innerText = `${WheatherInfoDetails?.main?.humidity} %`;
clouds.innerText =`${ WheatherInfoDetails.clouds?.all} %`;
// timeCHeck.innerText = WheatherInfoDetails?.timezone;
}

   // funtion for starting the page display if the user has it coordinates then it will render the your present location else ask for grant permission
   function checkingCoordinaates(){
      loading.classList.add('active');

      const coordinates = sessionStorage.getItem('getting-theCordinates-values');
      // sessionStorage.getItem('user-defind-names-that-holds-the-values-upto window tab life,ofcorser it the api may have some default time')

         // if the cordinates are not available
         if(!coordinates){
            // render the grant window
            garntAcess.classList.add('active');
          
            loading.classList.remove('active');

         }
         else{
            // if get,
           const coordinatesVAlues = JSON.parse(coordinates)
           loading.classList.remove('active');
        
            // calling the function for rendiring the present location
            presentCurrentLocationWeather(coordinatesVAlues);

         }
   }
   
// error message content


 async  function presentCurrentLocationWeather(coordinaOF){

   // due to i have stores the latitude and longitude in an object and it get as an parameter of a function and stored in obj
     const {lat ,lon} = coordinaOF;
loading.classList.add('active')
garntAcess.classList.remove('active');


   try{
      let currentApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      let data = await currentApi.json();
garntAcess.classList.remove('active');
loading.classList.remove('active');
YourLocation.classList.add('active');



renderWeather(data);

   }
      catch(error){
      errorHandlingImage();
      YourLocation.classList.remove('active');
      console.log('handle the presentCurrentLocationWeather api',error);
   }
 
 }

/* 
verification and requesting a permission form the
user/owner of screen 
*/

   function preLoactionCheck(){
      if(navigator.geolocation)
         {
            navigator.geolocation.getCurrentPosition(showPosition);
         }
         else
         {
            // alert('permission denied');
            // garntAcess.classList.remove('active');
            // YourLocation.classList.remove('active');
            // errorImage4o4.classList.add('active');
         }
   }

function showPosition(position){
   const coordinatesPosition ={
      lat: position.coords.latitude,
      lon: position.coords.longitude,

   }
   sessionStorage.setItem('getting-theCordinates-values',JSON.stringify(coordinatesPosition));
   presentCurrentLocationWeather(coordinatesPosition);
}

grantAccessButon.addEventListener('click' , ()=>{
alert('provide access to your current location or check network connection');
preLoactionCheck();

})

const searchBarInput = document.querySelector('[searchBar]');

searchForm.addEventListener('submit', (event) =>{
      event.preventDefault();

let cityName = searchBarInput.value;

if(cityName ==="")
   return;
   
else{
   errorImage4o4.classList.remove('active');
   findCityWeather(cityName);
}
})

 async  function findCityWeather(cityname1){
   let city = cityname1
 loading.classList.add('active');
 garntAcess.classList.remove('active');
 YourLocation.classList.remove('active');

   try{
      let apiName =await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  
      let data = await apiName.json();
      renderWeather(data);
      if(!data.sys){
       throw data;
      }
    
      YourLocation.classList.add('active');
    
    loading.classList.remove('active');
    

   }
   catch(error){
   
// alert('please enter valid city/country')
   //   submitButton.classList.add('active');
loading.classList.remove('active');
errorHandlingImage();
   YourLocation.classList.remove('active');

   }

 }

 function errorHandlingImage(){
 errorImage4o4.classList.add('active');
 YourLocation.classList.remove('active');

 }

 errorImage4o4.classList.remove('active');