const content1 = document.querySelector('.align');

if (window.matchMedia("(max-width: 992px)").matches) {
    content1.style.transform = 'scale(0.7)';
}