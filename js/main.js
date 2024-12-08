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
        setupFullScreenNavigation();
        initializeAnimations();
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

    // 使用已有的 HTML 结构，不再动态渲染
    // 可以在这里添加额外的交互逻辑
    worksGrid.querySelectorAll('.work-card').forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            img.src = optimizeImageUrl(img.getAttribute('data-src') || img.src);
        }
    });
}

// 渲染摄影作品
function renderPhotography() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselDots = document.querySelector('.carousel-dots');
    const photoGrid = document.querySelector('.photo-grid');
    
    if (!carouselInner || !carouselDots) {
        console.warn('Carousel elements not found');
        return;
    }
    
    // 渲染轮播图
    imageData.photography.featured.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${optimizeImageUrl(photo.image)}" alt="${photo.title}">
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
    if (photoGrid) {
        imageData.photography.grid.slice(0, 4).forEach(photo => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.innerHTML = `
                <img src="${optimizeImageUrl(photo.image)}" alt="${photo.title}">
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                    <span class="photo-date">${photo.date}</span>
                </div>
            `;
            photoGrid.appendChild(card);
        });
    }
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

// 全屏滚动导航
function setupFullScreenNavigation() {
    const pageContainer = document.querySelector('.page-container');
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            sections[index].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            currentSectionIndex = index;
            
            // 防止快速连续滚动
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // 鼠标滚轮事件
    pageContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isScrolling) return;

        if (e.deltaY > 0) {
            // 向下滚动
            if (currentSectionIndex < sections.length - 1) {
                scrollToSection(currentSectionIndex + 1);
            }
        } else {
            // 向上滚动
            if (currentSectionIndex > 0) {
                scrollToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: false });

    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        switch(e.key) {
            case 'ArrowDown':
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
                break;
            case 'ArrowUp':
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
                break;
        }
    });

    // 导航菜单滚动
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isScrolling) {
                scrollToSection(index);
            }
        });
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

// 图片懒加载函数
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                
                if (dataSrc) {
                    img.src = optimizeImageUrl(dataSrc);
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', initializePage);
