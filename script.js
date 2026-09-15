const header = document.querySelector('.header');
const mobileBreakpoint = window.matchMedia('(max-width: 640px)');

function updateHeaderState() {
  if (!mobileBreakpoint.matches) {
    header.classList.remove('nav-hidden');
    return;
  }

  if (window.scrollY > 180) {
    header.classList.add('nav-hidden');
  } else {
    header.classList.remove('nav-hidden');
  }
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', updateHeaderState);
updateHeaderState();
