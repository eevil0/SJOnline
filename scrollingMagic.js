function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function changeBodyBackground(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 1s ease-in-out";
}

window.preloadImage = (src) => {
    const img = new Image();
    img.src = src;
};