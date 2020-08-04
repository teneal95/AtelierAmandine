const dropdown = document.querySelector('.dropdown');
const dropdownItems = document.querySelectorAll('.dropdownItems');

dropdown.addEventListener('click', (e) => {
  dropdownItems.forEach((item) => {
    if(item.classList.contains('openMobNav')) {
      item.classList.remove('openMobNav'); 
    } else {
      item.classList.add('openMobNav');
    }
  });

  e.preventDefault();
});