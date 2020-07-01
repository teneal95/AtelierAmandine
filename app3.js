//Init nodelist of testmonials
const testimonials = document.querySelectorAll('.testText');
testimonials.forEach(quote => {
  quote.style.opacity = '0'; //Set all testmonials opacity = 0
});

document.addEventListener('load', load()); //Listen for page load and call load() function

function load () {
  //Init Var
  let opacity = 0; 
  let id = setInterval(fadeIn, 10); //Call fadeIn function every 10 ms
  function fadeIn(){
    if (opacity === 100){
      clearInterval(id); //If opacity = 100 stop calling fadeIn()
    }
    opacity++; //Add 1 to opacity
    let opac = opacity/100; 
    testimonials.forEach(quote => {
      quote.style.opacity = opac; //set opacity of each testimonial for this iteration  
    });
  }
}