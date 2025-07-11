import { slideshow } from './modules/slideshow.js';

function initWorks() {
  fetch('/assets/jsons/works.json').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    const worksContainer = document.querySelector('[data-js-finished-works]');
    if (!worksContainer) {
      console.error('Works container not found');
      return;
    }

    data = data.filter(work => work.image !== '');

    worksContainer.innerHTML = data.map(work => /*html*/ `
      <li class="work-overview-item">
        <figure>
          <img src="${work.image}" alt="${work.title}" class="work-image" />
          <figcaption>
            <h3>${work.title}</h3>
            <p>${work.author}</p>
          </figcaption>
        </figure>
      </li>
      `).join('');

  }).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });



}

/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll();
  slideshow();
  initWorks();
});