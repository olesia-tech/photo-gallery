

const btnEl = document.getElementById('btn');
const errorMessageEl = document.getElementById('errorMessage');
const galleryEl = document.getElementById('gallery');









async function fetchImage(){
  const inputValue = document.getElementById('input').value;

  if(inputValue > 10 || inputValue < 1){
   errorMessageEl.style.display = 'block';
   errorMessageEl.innerText = 'Number should be between 0 and 10'
   return;
  }

imgs = '';

  try {
    btnEl.style.display = 'none';
    const loading = `<img src='spinner.svg' />`;
    galleryEl.innerHTML = loading;
    const response = await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=hle-Lccm7awJdrzSHsKwny5eWnL6RzITdGECoWUx_Sk`)
    if(!response.ok){
     throw new Error('Network response was not ok');
    }
    const data = await response.json();

    if(data){
  data.forEach((pic) => {
  imgs += `<img src=${pic.urls.small} alt='image'/>`;
  });
  galleryEl.style.display = 'block';
  galleryEl.innerHTML = imgs;
  btnEl.style.display = 'block';
}
  } catch (error) {
    console.error('Error fetching images:', error)
    errorMessageEl.style.display = 'block';
    errorMessageEl.innerHTML = 'Error, try again';
    btnEl.style.display = 'block';
  }
}


btnEl.addEventListener('click', fetchImage);