import { imageData, optimizeImageUrl, getImageSrcSet } from './images.js';

// 状态管理
const state = {
    currentSlide: 0,
    isAnimating: false,
    slideInterval: null
};

// 初始化页面
async function initializePage() {
    try {
        setupMenuToggle();
        renderWorks();
        setupEventListeners();
        setupFullScreenNavigation();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// 设置菜单切换
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // 点击菜单项时关闭菜单
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
}

// 渲染作品展示区
function renderWorks() {
    const worksGrid = document.querySelector('.works-grid');
    if (!worksGrid) {
        console.warn('Works grid not found');
        return;
    }

    // 不再动态渲染图片
    console.log('Works grid already contains existing content');
}

// 设置事件监听器
function setupEventListeners() {
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
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

// 初始化页面
document.addEventListener('DOMContentLoaded', initializePage);
