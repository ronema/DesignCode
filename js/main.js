import { imageData, optimizeImageUrl, getImageSrcSet, preloadImage } from './images.js';

// 状态管理
const state = {
    currentSlide: 0,
    isAnimating: false,
    slideInterval: null
};

// 初始化页面
async function initializePage() {
    try {
        // 先渲染内容
        renderWorks();
        renderPhotography();
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing page:', error);
    }

    // 后台预加载图片
    try {
        await Promise.all([
            ...imageData.works.map(work => 
                preloadImage(work.image).catch(err => 
                    console.warn(`Failed to preload work image: ${work.image}`, err)
                )
            ),
            ...imageData.photography.map(photo => 
                preloadImage(photo.image).catch(err => 
                    console.warn(`Failed to preload photo image: ${photo.image}`, err)
                )
            )
        ]);
    } catch (err) {
        console.warn('Some images failed to preload:', err);
    }
}

// 渲染作品展示区
function renderWorks() {
    const worksGrid = document.querySelector('.works-grid');
    if (!worksGrid) {
        console.warn('Works grid not found');
        return;
    }

    worksGrid.innerHTML = imageData.works.map(work => `
        <article class="work-card">
            <div class="work-image">
                <img src="${optimizeImageUrl(work.image)}" 
                     alt="${work.title}" 
                     loading="lazy">
            </div>
            <div class="work-info">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
            </div>
        </article>
    `).join('');
}

// 渲染摄影作品
function renderPhotography() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselDots = document.querySelector('.carousel-dots');
    const photoGrid = document.querySelector('.photo-grid');
    
    // 渲染轮播图
    imageData.photography.featured.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <span class="photo-date">${photo.date}</span>
            </div>
        `;
        carouselInner.appendChild(slide);

        // 添加轮播点
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });

    // 渲染网格
    imageData.photography.grid.slice(0, 4).forEach(photo => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <span class="photo-date">${photo.date}</span>
            </div>
        `;
        photoGrid.appendChild(card);
    });

    // 设置轮播控制
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    prevButton.addEventListener('click', () => {
        const currentSlide = document.querySelector('.carousel-slide.active');
        const currentIndex = Array.from(carouselInner.children).indexOf(currentSlide);
        const prevIndex = (currentIndex - 1 + imageData.photography.featured.length) % imageData.photography.featured.length;
        goToSlide(prevIndex);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = document.querySelector('.carousel-slide.active');
        const currentIndex = Array.from(carouselInner.children).indexOf(currentSlide);
        const nextIndex = (currentIndex + 1) % imageData.photography.featured.length;
        goToSlide(nextIndex);
    });

    // 自动轮播
    let autoplayInterval = setInterval(() => {
        const currentSlide = document.querySelector('.carousel-slide.active');
        const currentIndex = Array.from(carouselInner.children).indexOf(currentSlide);
        const nextIndex = (currentIndex + 1) % imageData.photography.featured.length;
        goToSlide(nextIndex);
    }, 5000);

    // 鼠标悬停时暂停轮播
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            const currentSlide = document.querySelector('.carousel-slide.active');
            const currentIndex = Array.from(carouselInner.children).indexOf(currentSlide);
            const nextIndex = (currentIndex + 1) % imageData.photography.featured.length;
            goToSlide(nextIndex);
        }, 5000);
    });
}

// 切换轮播图
function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// 设置事件监听器
function setupEventListeners() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 响应式导航
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle?.addEventListener('click', () => {
        menu?.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
}

// 设置作品过滤器
function setupWorkFilters() {
    // 移除作品过滤器
}

// 初始化动画
function initializeAnimations() {
    // 添加滚动动画
    const animatedElements = document.querySelectorAll('.work-card, .contact, .bio');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    animatedElements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', initializePage);
