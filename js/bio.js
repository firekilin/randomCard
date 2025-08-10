// Initialize Lenis
const lenis = new Lenis({ autoRaf: true });

const bg = document.querySelector('.bio-bg');
const bgImg = document.querySelector('.bio-bg-1');
const bgTitle = document.querySelector('.bio-bg-2');
const bgTitleMirror = document.querySelector('.bio-bg-2.mirror');

const content1 = document.querySelector('.content1');
const content2 = document.querySelector('.content2');
const content3 = document.querySelector('.content3');
const cardshowImg = document.querySelectorAll('.cardshow img');

// 預先快取高度與位置
const bg1height = bgImg.height + 100;
bg.style.height = `${bg1height}px`;

const content1Top = content1.offsetTop;
const content2Top = content2.offsetTop;
const content3Top = content3.offsetTop;

let titleShow = false;
let content1Show = false;
let content3Show = false;

let lastScroll = 0;
let ticking = false;

function titleMove(scroll) {
  if(scroll < 1000) {
    bgTitle.style.top = `calc(${scroll / 1.8}px + 100px)`;
    bgTitleMirror.style.top = `calc(${scroll / 1.8}px + 120px )`;
  }
  if(scroll<500)
  bgTitleMirror.style.opacity = `${0.3 - scroll/2000}`;

}

function contentMove(scroll) {
  if (!content1Show && scroll > (content1Top - 700)) {
    content1.style.opacity = 1;
    content1Show = true;
  }
}

function cardMove(scroll) {
  if (scroll > (content2Top - 300)) {
    const offset = scroll - content2Top;
    if (offset > 0) {
      cardshowImg.forEach(element => {
        element.style.top = `0px`;
      });
    } else {
      cardshowImg.forEach(element => {
        element.style.top = `${offset}px`;
      });
    }
  }
}

function contentMove2(scroll) {
  if (!content3Show && scroll > (content3Top - 700)) {
    content3.style.opacity = 1;
    content3Show = true;
  }
}

// Lenis scroll listener
lenis.on('scroll', ({ scroll }) => {
  lastScroll = scroll;
  if (!ticking) {
    requestAnimationFrame(() => {
      titleMove(lastScroll);
      contentMove(lastScroll);
      contentMove2(lastScroll);
      cardMove(lastScroll);
      ticking = false;
    });
    ticking = true;
  }
});
