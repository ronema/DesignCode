// 作品数据
import imageData from './images.js';

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
    imageData.works.forEach(work => {
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
    imageData.photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="slide-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <span class="date">${photo.date}</span>
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
