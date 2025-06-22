
  const fg = document.querySelector('.bio-bg-2');

  let lastScrollY = 0;

  function updateParallax() {
    const scrollY = window.scrollY;

    // 控制最小變動量，避免效能問題
    if (Math.abs(scrollY - lastScrollY) > 1) {
      fg.style.top = `calc(${scrollY * 0.4}px + 100px)`;
      lastScrollY = scrollY;
    }

    requestAnimationFrame(updateParallax);
  }

  requestAnimationFrame(updateParallax);