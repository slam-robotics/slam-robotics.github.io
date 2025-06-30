window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;
var interp_images = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = () => false;
  image.oncontextmenu = () => false;
  $('#interpolation-image-wrapper').empty().append(image);
}

document.addEventListener('DOMContentLoaded', () => {
  // Navbar burger toggle
  document.querySelectorAll('.navbar-burger').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('is-active');
      document.querySelector('.navbar-menu')?.classList.toggle('is-active');
    });
  });

  // Initialize results-carousel ONLY
  const carouselElement = document.querySelector('#results-carousel');
  if (carouselElement) {
    bulmaCarousel.attach(carouselElement, {
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      autoplay: true,
      pauseOnHover: true,
    });
  }

  // Interpolation image logic
  preloadInterpolationImages();
  $('#interpolation-slider').on('input', function () {
    setInterpolationImage(this.value);
  });
  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  // Attach Bulma slider
  bulmaSlider.attach();
});
