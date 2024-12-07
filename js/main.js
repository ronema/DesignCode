// 作品数据
const works = [
    {
        title: "品牌重塑项目",
        description: "为科技公司打造全新的品牌形象",
        image: "images/works/work1.jpg",
        date: "2024-01"
    },
    {
        title: "用户体验优化",
        description: "改善电商平台的用户体验",
        image: "images/works/work2.jpg",
        date: "2023-12"
    },
    // 添加更多作品...
];

// 摄影作品数据
const photos = [
    {
        title: "城市剪影",
        description: "上海外滩夜景",
        image: "images/photos/photo1.jpg",
        date: "2024-02-15"
    },
    {
        title: "自然之美",
        description: "云南梯田日落",
        image: "images/photos/photo2.jpg",
        date: "2024-01-20"
    },
    // 添加更多照片...
];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initAnimatedBackground();
    if (document.querySelector('.works-grid')) {
        renderWorks();
    }
    if (document.querySelector('.main-slider')) {
        initPhotoSlider();
    }
});

// 初始化动态背景
function initAnimatedBackground() {
    const shapes = ['circle', 'square', 'triangle'];
    const container = document.querySelector('.shapes-container');
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.className = `shape ${randomShape}`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.width = `${Math.random() * 50 + 20}px`;
        shape.style.height = shape.style.width;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(shape);
    }
}

// 渲染作品展示
function renderWorks() {
    const worksGrid = document.querySelector('.works-grid');
    works.forEach(work => {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.innerHTML = `
            <img src="${work.image}" alt="${work.title}">
            <div class="work-info">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <span class="date">${work.date}</span>
            </div>
        `;
        worksGrid.appendChild(card);
    });
}

// 初始化照片轮播
function initPhotoSlider() {
    const mainSlider = document.querySelector('.main-slider');
    const sideGallery = document.querySelector('.side-gallery');
    
    // 设置主轮播
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="slide-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            </div>
        `;
        mainSlider.appendChild(slide);
    });

    // 自动轮播
    let currentSlide = 0;
    setInterval(() => {
        const slides = mainSlider.querySelectorAll('.slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
