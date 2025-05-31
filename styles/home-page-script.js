// Favorite animals data
const animals = [
  {
    name: "The Philippine eagle",
    image: "home-page-images/favorite animals/eagle.png",
    description: "A rare, powerful bird found only in the Philippines. With a massive wingspan and distinct crest, it is one of the world's largest eagles. Deforestation and hunting threaten its survival."
  },
  {
    name: "The Philippine tarsier",
    image: "home-page-images/favorite animals/tarsier.png",
    description: "A tiny, nocturnal primate with huge eyes and strong jumping abilities. Found in Philippine forests, it clings to trees and feeds on insects. Habitat loss and human disturbance threaten its survival."
  },
  {
    name: "The Visayan spotted deer",
    image: "home-page-images/favorite animals/deer.png",
    description: "A rare species native to the Visayan Islands. Known for its spotted coat and small stature, it's one of the most endangered deer species in the world."
  },
  {
    name: "The Luzon bleeding-heart",
    image: "home-page-images/favorite animals/pigeon.png",
    description: "A species of ground dove native to Luzon island. It gets its name from a red spot on its chest that resembles a bleeding wound."
  },
  {
    name: "The Philippine duck",
    image: "home-page-images/favorite animals/duck.png",
    description: "An endemic species of dabbling duck. Known for its distinctive dark crown and rusty-brown body, it thrives in freshwater wetlands."
  }
];

let currentIndex = 0;

function createSlides() {
  const wrapper = document.getElementById("slidefav-wrapper");
  if (!wrapper) return;
  wrapper.innerHTML = "";

  animals.forEach((animal, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slidefav");
    if (index === currentIndex) slide.classList.add("active");

    slide.innerHTML = `
      <div class="animal-image">
        <img src="${animal.image}" alt="${animal.name}">
      </div>
    `;

    wrapper.appendChild(slide);
  });
}

function updateThumbnails() {
  const container = document.getElementById("thumbnails");
  if (!container) return;
  container.innerHTML = "";

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  infoDiv.innerHTML = `
    <h3>${animals[currentIndex].name}</h3>
    <p>${animals[currentIndex].description}</p>
    <button onclick="document.location='/wildlife-classifications/wildlife-classifications.html'" class="learn-more">LEARN MORE</button>
  `;
  container.appendChild(infoDiv);

  const positions = ["t0", "t1", "t2", "t3"];
  let thumbnails = [];

  for (let i = 1; i < animals.length; i++) {
    const index = (currentIndex + i) % animals.length;
    thumbnails.push({ ...animals[index], index });
  }

  thumbnails.forEach((animal, i) => {
    const thumb = document.createElement("img");
    thumb.src = animal.image;
    thumb.alt = animal.name;
    thumb.className = `thumbnail ${positions[i]}`;
    thumb.onclick = () => changeSlide((animal.index - currentIndex + animals.length) % animals.length);
    container.appendChild(thumb);
  });
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".slidefav");
  const oldSlide = slides[currentIndex];
  oldSlide.classList.remove("active");

  oldSlide.classList.add(direction === -1 ? "out-right" : "out-left");

  currentIndex = (currentIndex + direction + animals.length) % animals.length;

  const newSlide = slides[currentIndex];
  newSlide.classList.add("active");

  setTimeout(() => {
    oldSlide.classList.remove("out-left", "out-right");
    updateThumbnails();
  }, 500);
}

// Carousel logic
let cards = document.querySelectorAll('.storycard');

function nextCard() {
  document.querySelector('.carouselhead').appendChild(cards[0]);
  cards = document.querySelectorAll('.storycard');
  updateClasses();
}

function prevCard() {
  document.querySelector('.carouselhead').prepend(cards[cards.length - 1]);
  cards = document.querySelectorAll('.storycard');
  updateClasses();
}

function updateClasses() {
  cards.forEach((card, i) => {
    card.classList.remove('center', 'side');
    card.classList.add(i === 1 ? 'center' : 'side');
  });
}

// DOMContentLoaded setup
window.addEventListener('DOMContentLoaded', () => {
  // Chart
  const ctx = document.getElementById('pieChart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Animal Species', 'Endemic Animals', 'Critically Endangered'],
        datasets: [{
          data: [56177, 26088, 2000],
          backgroundColor: ['#B93B3D', '#588DEE', '#F8FD6E']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: { top: 30 }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#000',
              font: { size: 14 },
              padding: 20
            }
          },
          datalabels: {
            color: '#000',
            textStrokeColor: '#fff',
            textStrokeWidth: 3,
            formatter: (value, context) => {
              const data = context.chart.data.datasets[0].data;
              const total = data.reduce((sum, val) => sum + val, 0);
              return `${value} (${((value / total) * 100).toFixed(1)}%)`;
            },
            font: { weight: 'bold', size: 12 },
            anchor: 'end',
            align: 'end',
            offset: -20
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // Initial slideshow setup
  createSlides();
  updateThumbnails();

  // Story card carousel container fix
  const carouselHead = document.querySelector('.carouselhead');
  if (carouselHead && !carouselHead.parentElement.classList.contains('carouselhead-container')) {
    const container = document.createElement('div');
    container.className = 'carouselhead-container';
    carouselHead.parentNode.insertBefore(container, carouselHead);
    container.appendChild(carouselHead);

    document.querySelectorAll('.arrow').forEach(arrow => {
      if (arrow.parentElement !== container) container.appendChild(arrow);
    });
  }

  // Section container fix
  document.querySelectorAll('section').forEach(section => {
    if (!section.querySelector(':scope > .content-container')) {
      const container = document.createElement('div');
      container.className = 'content-container';
      Array.from(section.childNodes).forEach(child => container.appendChild(child));
      section.appendChild(container);
    }
  });

  // Slide styling fix
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.style.width = '100%';
    document.querySelectorAll('.slide-content').forEach(content => {
      content.style.maxWidth = '450px';
    });
  }

  // Auto slideshow
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  function showSlide() {
    slides.forEach((s, i) => s.classList.toggle('active', i === slideIndex));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));
  }

  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
  }, 5000);

  showSlide();
});
