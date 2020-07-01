// Form Submission checks and alerts

const submit = document.querySelector('input[type=submit]'); //Declare submit variable

submit.addEventListener('click', (e) => { //Listen for click oin submit button
  const email = document.getElementById('email').value; //Declare vars
  const emailConfirm = document.getElementById('emailConfirm').value;
  const alert =  document.querySelector('#alertBox');
  if (email !== emailConfirm) { //check for emails matching
    e.preventDefault(); //if they don't match prevent form submission
    alert.style.display = 'block'; //display alert
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000); //after 3 seconds remove alert
  }
});


