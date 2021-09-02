// image container & search bar input
const container = document.querySelector('.container');
const input = document.querySelector('#input');
// page count & random count (get page between 1 and 10)
let page_count = 1;
let random_page_count = Math.floor(Math.random() * 11);
// arrays to store the results
let imgCollection = [];
let full_urls = [];

// enter key event listener for search bar
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchImages();
  }
})

// remove images 
const removeImages = () => {
  container.innerHTML = '';
}
// search images 
const searchImages = () => {
  imgCollection = [];
  full_urls = [];
  page_count = 1;
  removeImages();
  unsplash();
}
// loading random images
const unsplashRandom = async () => {
  try {
    const url = `https://api.unsplash.com/photos?page=${random_page_count}&per_page=25&client_id=P6-47wvuTNpcOTmSvATX7kYVjPryuRN1l3ekwpYZ1EM`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    random_page_count++;
    page_count++;
    data.forEach((element) => {
      const imageHolder = document.createElement('div');
      imageHolder.classList.add('image-holder')
      // imageHolder.innerHTML = `<img  src=${element.urls.regular} class="images" alt="">`;
      const image = document.createElement('img');
      image.classList.add('images');
      image.src = element.urls.regular;
      imgCollection.push(image);
      imageHolder.appendChild(image);
      container.appendChild(imageHolder);
    });
    for (let i = 0; i < data.length; i++) {
      full_urls.push(data[i].urls.full);
    }
    createMod(imgCollection, full_urls);
  } catch (err) {
    console.log(err);
  }
}
// unsplash api returns results based on search input
const unsplash = async () => {
  try {
    const url = `https://api.unsplash.com/search/photos?page=${page_count}&query=${input.value}&per_page=25&client_id=P6-47wvuTNpcOTmSvATX7kYVjPryuRN1l3ekwpYZ1EM`;
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    page_count++;
    data.results.forEach((element) => {
      const imageHolder = document.createElement('div');
      imageHolder.classList.add('image-holder')
      // imageHolder.innerHTML = `<img src=${element.urls.regular} class="images">`;
      const image = document.createElement('img');
      image.classList.add('images');
      image.src = element.urls.regular;
      imgCollection.push(image);
      imageHolder.appendChild(image);
      container.appendChild(imageHolder);
    });
    for (let i = 0; i < data.results.length; i++) {
      full_urls.push(data.results[i].urls.full);
    }
    createMod(imgCollection, full_urls);
  } catch (err) {
    console.log(err);
  }
}

// infinite scroll upto 5 pages
let page_limit = 5;

window.addEventListener('scroll', () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if ((scrollTop + clientHeight >= scrollHeight) && (page_count <= page_limit)) {
    if (input.value !== '') {
      unsplash();
    } else {
      unsplashRandom();
    }
  }
})

unsplashRandom();

// modal display
const modal = document.querySelector('.modal');
const modal_img = document.querySelector('#modal-img');
const close = document.querySelector('.close');

const createMod = (imgCollection, full_urls) => {

  for (let i = 0; i < imgCollection.length; i++) {
    imgCollection[i].addEventListener('click', () => {
      modal.style.display = 'block';
      modal_img.src = full_urls[i];
    })
  }

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  })
}





