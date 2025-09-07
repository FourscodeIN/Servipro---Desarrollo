/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Dec 05 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    if (!selectHeader) return; // <-- seguridad

    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    ) return;

    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }
  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
      mirror: false //true
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenú
   */
  const navLinks = document.querySelectorAll(".navmenu a");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const parentLi = link.parentElement;

      // 🔹 Caso 1: dropdown (ej: Servicios)
      if (parentLi.classList.contains("dropdown")) {
        e.preventDefault(); // evita navegar al #servicess
        // quitar inmediatamente cualquier "active"
        link.classList.remove("active");
        return;
      }
      
      // 🔹 Caso 2: link normal
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

    /**
   * Texto dinámico inicio
   */

  const phrases = [
    "Servicios técnicos",
    "Servicios TI",
    "Venta de insumos",
    "Manufacturación"
  ];

  const target = document.getElementById("dynamic-text");
  let i = 0;

  function showPhrase() {
    if (!target) return; 

    target.textContent = phrases[i];

    target.classList.remove("dynamic-text");
    void target.offsetWidth; 
    target.classList.add("dynamic-text");

    i = (i + 1) % phrases.length;
  }

  if (target) {
    showPhrase(); 
    setInterval(showPhrase, 3000);
  }

    /**
   * Ocultar social-menu en móvil cuando el footer sea visible
   */
  // const socialMenu = document.querySelector(".social-menu");
  // const footer = document.querySelector("footer");

  // if (socialMenu && footer) {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting && window.innerWidth <= 768) {
  //           // En móvil y footer visible → ocultar
  //           socialMenu.style.opacity = "0";
  //           socialMenu.style.pointerEvents = "none";
  //         } else {
  //           // Caso contrario → mostrar
  //           socialMenu.style.opacity = "1";
  //           socialMenu.style.pointerEvents = "auto";
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   observer.observe(footer);
  // }

  const menus = Array.from(document.querySelectorAll(".social-menu, .social-menu2"));
  const footer = document.querySelector("footer");

  if (menus.length && footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        const hide = entries[0].isIntersecting && window.innerWidth <= 768;
        menus.forEach(menu => {
          menu.style.opacity = hide ? "0" : "1";
          menu.style.pointerEvents = hide ? "none" : "auto";
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    // Asegura que al cambiar tamaño se aplique correctamente
    window.addEventListener("resize", () => {
      const hide = footer.getBoundingClientRect().top < window.innerHeight && window.innerWidth <= 768;
      menus.forEach(menu => {
        menu.style.opacity = hide ? "0" : "1";
        menu.style.pointerEvents = hide ? "none" : "auto";
      });
    });
  }

    /**
   * Security Script
   */
  // ✅ Chequeo de rutas internas
  function isInternal(path) {
    return typeof path === "string" && (
      path.startsWith("/") ||
      path.startsWith("./") ||
      path.startsWith("../") ||
      path.startsWith("#") ||
      path.startsWith("Servicios") ||
      path.startsWith("Productos") ||
      path.startsWith("Enlaces") ||
      path.endsWith(".html") ||
      path.includes(".html#")
    );
  }

  // ✅ Hacer safeRedirect global
  window.safeRedirect = function (path) {
    if (isInternal(path)) {
      window.location.assign(path);
    } else {
      console.warn("Intento de redirección bloqueado:", path);
    }
  };

  // ✅ Dominios externos permitidos
  const dominiosPermitidos = [
    "https://wa.me",
    "https://www.instagram.com",
    "https://www.youtube.com",
    // "https://facebook.com",
    "https://www.linkedin.com",
    "https://bootstrapmade.com"
  ];

  // ✅ Revisar todos los <a>
  document.querySelectorAll("a").forEach(link => {
    const url = link.getAttribute("href");

    if (url) {
      const esInterno = isInternal(url);
      const esPermitido = dominiosPermitidos.some(dom => url.startsWith(dom));

      if (!esInterno && !esPermitido) {
        console.warn("⚠️ Enlace externo detectado y bloqueado:", url);
        link.removeAttribute("href"); // bloquea el enlace
      }
    }
  });
    
  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Datos dinámicos de la modal
   */

  const productCards = document.querySelectorAll("#servipro-products .product-card");

  productCards.forEach(card => {
    card.addEventListener("click", function(e) {
      if (e.target.closest(".no-modal")) return;

      const { title, desc, img } = card.dataset;

      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDesc").textContent  = desc;
      document.getElementById("modalImg").src          = img;

      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    });
  });

})();