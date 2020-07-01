//Gallery Scripts

const footer = document.querySelector('#footer'); 
footer.style.display = 'none'; //footer not initially displayed

//Onload header changes
document.addEventListener('load', fade()); //fade in the gallery and change styles of heading and navbar

//Initial slide
slideIndex = 1;
showSlide(slideIndex); //show first slide


document.querySelector('#next').addEventListener('click', plusIndex); //listen for a click to increase slide index
document.querySelector('#prev').addEventListener('click', minusIndex); //lisen for a click to decrease slide index
const slides = document.querySelectorAll('.slides'); //create nodelist of all gallery slides

function fade() {
  //Init consts
  const heading = document.getElementById('companyNameContainer');
  const tagline = document.getElementById('tagline');
  const name = document.getElementById('companyName');
  const navStartPos = document.getElementById('navBarStartPos');
  //Initstantiate initial height/width/fontsize/navbarstartpos
  const intHeight = 215;
  let counter = 0;
  let heightChange = 0;
  const intWidth = 340;
  let widthChange = 0;
  const intFontSize = 35;
  let fontChange = 0;
  const intStartPos = 50;
  let posChange = 0;
  let id = setInterval(frame, 10); //call frame function every 10ms
  function frame(){
    if (counter == 100){
      clearInterval(id); //when counter reaches 100 stop calling frame function
      galleryGrow(); //When heights have changed display and grow gallery
      skewChange(); //Also, change skew 
    } else {
      counter++; //increase counter by 1
      heightChange = heightChange + (75/100); //Change height by 0.75 each time
      widthChange = widthChange + (118/100); //change width by 1.18 each time
      posChange = posChange + (49/100); //change width by 0.49 each time
      fontChange = fontChange + 0.125; //change fontsize by 0.125 each time
      let height = intHeight - heightChange; //new height for each iteration
      let width = intWidth - widthChange; //new width for each iteration
      let pos = intStartPos - posChange; //new navbarstartpos for each iteration
      let fontSize = intFontSize - fontChange; //new fontsize for each iteration
      name.style.fontSize = `${fontSize}pt` //set height/width/navbarstartpos/fontsize
      tagline.style.display = 'none';
      heading.style.height = `${height}px`;
      heading.style.width = `${width}px`;
      navStartPos.style.height = `${pos}px`;
    }
  }
}
function galleryGrow() {
  const container = document.querySelector('#galleryContainer');
  container.style.height = '70vh'; //set height to 70vh
  container.style.display = 'block'; //display the galllery container
  setTimeout(() => {
    container.style.height = '85vh'; //very quickly change height to full height, css transition with ease the change
  }, 100);
}
function skewChange() {
  //Init vars
  let skewChange = 0;
  const ul = document.querySelector('ul');
  const li = document.querySelectorAll('li');
  const liText = document.querySelectorAll('li a');
  const div = document.getElementById('companyNameContainer');
  const text = document.getElementById('companyName');
  let id = setInterval(frame, 10); //call frame every 10 ms
  function frame(){ 
    if(skewChange === 80) {
      clearInterval(id); //When skewchange hits 80, and skews = 0, stop calling frame
      footer.style.display = 'block'; // Display foot once skew = 0
    } else {
      skewChange++;
      skewul = 0.8 - (skewChange/100); //change skews each time frame is called
      skewdiv = (skewChange/10) - 8;
      skewtext = 8 - (skewChange/10); 
      skewli = 0.8 - (skewChange/100);
      skewliText = - 1.6 + (skewChange/50);
      ul.style.transform = `skewY(${skewul}deg)`; //set new skew values for each iteration
      div.style.transform = `skewY(${skewdiv}deg)`;
      text.style.transform = `skewY(${skewtext}deg)`;
      li.forEach(element => {
        element.style.tansform = `skewY(${skewli}deg)`;
      });
      liText.forEach(link => {
        link.style.transform = `skewY(${skewliText}deg)`;
        console.log(link.style.tansform);
      })
    }
  }
}
function plusIndex() {
  slideIndex = slideIndex + 1;
  if (slideIndex > slides.length){
    slideIndex = 1; //if at end of slide show, go back to beggning
  }
  showSlide(slideIndex); //show next slide
}
function minusIndex() {
  slideIndex = slideIndex -1;
  if (slideIndex === 0) {
    slideIndex = slides.length; //if at begining of slideshow and click previous button, go to th end of slideshow
  }
  showSlide(slideIndex); //show last slide
}
function showSlide(n) {
  const slides = document.querySelectorAll('.slides');
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; //hide all slides
  }
  slides[n-1].style.display = "block"; //display slide at current index
}


//Caption Scripts
//Init nodelist of caption divs/prompts/captions  
const captionDivs = document.querySelectorAll('.text');
const prompts = document.querySelectorAll('.prompt');
const captions = document.querySelectorAll('.caption');
loadEventListeners(); 

function loadEventListeners() {
  captionDivs.forEach((caption, index) => {
    caption.addEventListener('mouseenter', () => {
      showCaption(index); //When mouse enters promt div, show the caption
    });
    caption.addEventListener('mouseleave', () => {
      captionDisappear(index); //When mouse leaves promt div, remove the caption
    });
  });
}


function showCaption(n) {
  //Remove prompt and show caption div for specific slide
  prompts[n].style.display = 'none';
  captionDivs[n].style.height = '35%'; //Change height of div
  captions[n].style.display = 'block';
  setTimeout(function(){
    captions[n].style.opacity = '1'; //after 500ms show caption text
  }, 500);
}

function captionDisappear(n) {
  captions[n].style.opacity = '0'; //Set caption opacity = 0
  setTimeout(function() {
    captions[n].style.display = 'none'; //Hide caption
    captionDivs[n].style.height = '38px'; //Change height of div
  }, 500);
  setTimeout(function() {
    prompts[n].style.display = 'block'; //Bring prompt back
  }, 1200);
}
