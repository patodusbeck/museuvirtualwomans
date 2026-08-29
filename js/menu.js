const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');

const pageTransitionOverlay = document.createElement('div');
pageTransitionOverlay.className = 'page-transition-overlay';
document.body.appendChild(pageTransitionOverlay);

window.addEventListener('load', () => {
  document.body.classList.add('is-ready');
});

const shouldAnimatePageTransition = (link) => {
  if (!link || !link.href) return false;

  const targetUrl = new URL(link.href, window.location.href);
  const isExternal = targetUrl.origin !== window.location.origin;
  const isAnchorOnly = targetUrl.pathname === window.location.pathname && !targetUrl.search && !targetUrl.hash;
  const isSamePageHash = targetUrl.pathname === window.location.pathname && targetUrl.hash;
  const isAsset = /\.(pdf|zip|jpg|jpeg|png|gif|svg|webp|mp4|mp3|mov|avi)$/i.test(targetUrl.pathname);

  return !isExternal && !isAsset && !isAnchorOnly && !isSamePageHash;
};

const handlePageTransition = (event) => {
  const link = event.currentTarget;

  if (!shouldAnimatePageTransition(link) || event.defaultPrevented) return;

  event.preventDefault();
  document.body.classList.add('page-transitioning');

  window.setTimeout(() => {
    window.location.href = link.href;
  }, 260);
};

document.querySelectorAll('a[href]').forEach((link) => {
  if (shouldAnimatePageTransition(link)) {
    link.addEventListener('click', handlePageTransition);
  }
});

if (menuToggle && siteNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    siteNavigation.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    siteNavigation.classList.toggle('is-open', !isOpen);
  });

  siteNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}
