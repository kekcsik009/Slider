function updatePrevSlides(swiper) {
	swiper.slides.forEach((slide, i) => {
		const imgDiv = slide.querySelector('.slider__img');
		if (!imgDiv) return;

		if (i < swiper.activeIndex - 1) {
			const parallaxPct = parseFloat(imgDiv.getAttribute('data-swiper-parallax') || '0');
			// inset(top right bottom left) — режем с ЛЕВОЙ стороны
			slide.style.clipPath = `inset(0 0 0 ${parallaxPct}%)`;
		} else {
			slide.style.clipPath = 'inset(0 0 0 0%)';
		}
	});
}

const sliderMain = new Swiper('.slider_main', {
	freeMode: true,
	centeredSlides: true,
	mousewheel: true,
	parallax: true,
	breakpoints: {
		0: { slidesPerView: 2.5, spaceBetween: 20 },
		680: { slidesPerView: 4.5 },
		1200: { slidesPerView: 4.5, spaceBetween: 60 }
	},
	on: {
		init(swiper) {
			swiper.slides.forEach(slide => {
				slide.style.clipPath = 'inset(0 0 0 0%)';
			});
			updatePrevSlides(swiper);
		},
		slideChange(swiper) {
			updatePrevSlides(swiper);
		}
	}
});

const sliderBg = new Swiper('.slider_bg', {
	centeredSlides: true,
	parallax: true,
	spaceBetween: 60,
	slidesPerView: 3.5
});

sliderMain.controller.control = sliderBg;

document.querySelectorAll('.slider__item').forEach(item => {
	item.addEventListener('click', () => {
		item.classList.toggle('opened')
		const img = item.querySelector('.slider__img');
		if (img) {
			if (item.classList.contains('opened')) {
				img.style.width = '100%';
				img.style.height = '100%';
				img.style.left = '0';
			}
			else {
				img.style.height = '';
				img.style.width = '';
				img.style.left = '';
			}
		}
	});
});

let desc = document.querySelector('.description');
sliderMain.on('slideChange', () => {
	sliderMain.activeIndex > 0
		? desc.classList.add('hidden')
		: desc.classList.remove('hidden');
});

let descEnd = document.querySelector('.descriptionEnd');
sliderMain.on('slideChange', () => {
	sliderMain.activeIndex > 7
	? descEnd.classList.remove('hidden')
	: descEnd.classList.add('hidden');
});