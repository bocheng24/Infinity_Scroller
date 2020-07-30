const APIKey = 'sPypW-gvbYWDXvhOgczthYU5mAfvRBxfJrHz6lt08xU';
const count = 3;
const apiURL = `https://api.unsplash.com/photos/random?client_id=${APIKey}&count=${count}`;
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

// let loadPictureCount = 0;
let totalPictures = 0;
let ready = false;

const displayPictures = (data) => {
    loader.hidden = true;
    let loadPictureCount = 0;
    totalPictures = data.length;
    data.forEach(picture => {
        const a = document.createElement('a');
        a.setAttribute('href', picture.links.html);
        a.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', picture.urls.full);
        img.setAttribute('alt', picture.alt_description);
        img.setAttribute('title', picture.alt_description);

        img.addEventListener('load', () => {
            loadPictureCount++;
            loadPictureCount === totalPictures ? ready = true : ready = false;
        });

        a.appendChild(img);
        imgContainer.appendChild(a);
    });  
}

async function getPictures() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        displayPictures(data);
    }

    catch(e) {
        console.log(e);
    }
}


window.addEventListener('load', getPictures);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPictures();
    }
})