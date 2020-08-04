//Gallery Scripts


//Only execute Gallery scripts for larger than mobile
if (window.innerWidth > 595){
  //Initilised Settings
  //Footer
  const footer = document.querySelector('#footer'); 
  footer.style.display = 'none'; //footer not initially displayed
  //Slides
  slideIndex = 1;
  showSlide(slideIndex); //show first slide

  //Onload header changes
  document.addEventListener('load', fade()); //fade in the gallery and change styles of heading and navbar


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
    const intHeight = heading.clientHeight;
    let counter = 0;
    let heightChange = 0;
    const intWidth = heading.clientWidth;
    let widthChange = 0;
    const intFontSize = parseFloat(window.getComputedStyle(name, null).getPropertyValue('font-size'));
    let fontChange = 0;
    const intStartPos = navStartPos.clientHeight;
    let posChange = 0;
    let id = setInterval(frame, 10); //call frame function every 10ms
    function frame(){
      if (counter == 100){
        clearInterval(id); //when counter reaches 100 stop calling frame function
        galleryGrow(); //When heights have changed display and grow gallery
        skewChange(); //Also, change skew 
      } else {
          counter++; //increase counter by 1
          heightChange = heightChange + ((intHeight-120)/100); //Change height by 100th of total change each time
          widthChange = widthChange + ((intWidth-200)/100); //change width by 100th of total change each time
          posChange = posChange + (intStartPos/100); //change width by 100th of total each time
          fontChange = fontChange + ((intFontSize-30)/100); //change fontsize by 100th of total each time
          let height = intHeight - heightChange; //new height for each iteration
          let width = intWidth - widthChange; //new width for each iteration
          let pos = intStartPos - posChange; //new navbarstartpos for each iteration
          let fontSize = intFontSize - fontChange; //new fontsize for each iteration
          name.style.fontSize = `${fontSize}px` //set height/width/navbarstartpos/fontsize
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
          element.style.transform = `skewY(${skewli}deg)`;
        });
        liText.forEach(link => {
          link.style.transform = `skewY(${skewliText}deg)`;
        });
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
  //Init other vars
  let flag = false;
  let mouseIn = false;
  loadEventListeners(); 

  function loadEventListeners() {
    captionDivs.forEach((caption, index) => {
      caption.addEventListener('mouseenter', () => {
        mouseIn = true;
        showCaption(index); //When mouse enters promt div, show the caption
      });
      caption.addEventListener('mouseleave', () => {
        mouseIn = false;
        captionDisappear(index); //When mouse leaves promt div, remove the caption
      });
    });
  }


  function showCaption(n) {
    if (flag) {
      return;
    }
    flag = true;
    //Remove prompt and show caption div for specific slide
    prompts[n].style.display = 'none';
    captionDivs[n].style.height = '35%'; //Change height of div
    captions[n].style.display = 'block';
    setTimeout(function(){
      captions[n].style.opacity = '1'; //after 500ms show caption text
      flag = false;
      if(!mouseIn) {
        captionDisappear(n);
      }
    }, 500);
  }

  function captionDisappear(n) {
    if (flag) {
      return;
    }
    flag = true;
    captions[n].style.opacity = '0'; //Set caption opacity = 0
    setTimeout(function() {
      captions[n].style.display = 'none'; //Hide caption
      captionDivs[n].style.height = '38px'; //Change height of div
    }, 500);
    setTimeout(function() {
      prompts[n].style.display = 'block'; //Bring prompt back
      flag = false;
    }, 1200);
  }
} else {
  const container = document.querySelector('#galleryContainer');
  const footer = document.querySelector('#footer');
  container.style.display = 'block';
  footer.style.display = 'block';
}
