// 处理背景动画
function handleBackgroundAnimation() {
    const shapes = document.querySelectorAll('.floating-dot');
    
    shapes.forEach(shape => {
        shape.addEventListener('mouseover', () => {
            shape.style.transform = 'rotate(45deg) scale(1.2)';
            shape.style.opacity = '0.3';
        });
        
        shape.addEventListener('mouseout', () => {
            shape.style.transform = '';
            shape.style.opacity = '0.15';
        });
    });
}

// 处理滚动动画
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 创建动态元素
function createShape() {
    const container = document.createElement('div');
    container.className = 'floating-dot';
    
    // 更多随机性：大小范围更广，更不规则
    const size = Math.pow(Math.random(), 3) * 15 + 0.5; // 非线性分布，更多小点
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
    
    // 如果特别小，添加流星效果
    if (size < 2) {
        container.classList.add('tiny');
        
        // 添加深度层次
        const depth = Math.floor(Math.random() * 5) + 1;
        container.classList.add(`depth-${depth}`);
        
        // 为流星添加额外的随机性
        const scale = Math.random() * 0.5;
        const opacityMultiplier = Math.random() * 0.8 + 0.2;
        
        container.style.setProperty('--scale', scale);
        container.style.setProperty('--opacity-multiplier', opacityMultiplier);
    } else {
        // 为每个圆点添加随机方向和旋转
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionY = Math.random() > 0.5 ? 1 : -1;
        const rotation = Math.random();
        const baseOpacity = Math.random() * 0.2;
        
        container.style.setProperty('--direction-x', directionX);
        container.style.setProperty('--direction-y', directionY);
        container.style.setProperty('--rotation', rotation);
        container.style.setProperty('--base-opacity', baseOpacity);
        
        container.style.animation = 'fluid-movement 5s infinite alternate';
    }
    
    // 更广泛的随机位置
    const randomX = Math.random() * (window.innerWidth * 1.2) - (window.innerWidth * 0.1);
    const randomY = Math.random() * (window.innerHeight * 1.2) - (window.innerHeight * 0.1);
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;
    
    const dot = createSvgDot();
    container.appendChild(dot);
    
    return container;
}

// 创建 SVG 元素
function createSvgDot() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 10 10");
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "10");
    
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "5");
    circle.setAttribute("cy", "5");
    circle.setAttribute("r", "5");
    
    // 更广泛的色彩范围，包括更多蓝紫色调
    const hue = Math.floor(Math.random() * 100) + 200; // 200-300 范围
    const saturation = Math.random() * 30 + 60; // 60-90%
    const lightness = Math.random() * 20 + 60; // 60-80%
    const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0 的透明度
    
    circle.setAttribute("fill", `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`);
    svg.appendChild(circle);
    
    return svg;
}

// 鼠标悬停效果
function initMouseHoverEffect() {
    const container = document.getElementById('shapes-container');
    const dots = container.querySelectorAll('.floating-dot');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const dotCenterX = rect.left + rect.width / 2;
            const dotCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - dotCenterX, 2) + 
                Math.pow(mouseY - dotCenterY, 2)
            );
            
            if (distance < 100) {
                // 鼠标靠近时汇聚
                const angle = Math.atan2(mouseY - dotCenterY, mouseX - dotCenterX);
                const moveDistance = 100 - distance;
                
                // 对于小圆点（流星）保持原有动画
                if (dot.classList.contains('tiny')) {
                    dot.style.opacity = '0.8';
                } else {
                    dot.style.transform = `
                        translateY(${moveDistance}px) 
                        scale(1.5) 
                        rotate(${Math.random() * 360}deg)
                    `;
                    dot.style.opacity = '0.8';
                    dot.style.animation = 'none';
                }
            } else {
                // 恢复原始状态
                if (dot.classList.contains('tiny')) {
                    dot.style.opacity = '0.5';
                } else {
                    dot.style.transform = '';
                    dot.style.opacity = '0.15';
                    dot.style.animation = 'fluid-movement 5s infinite alternate';
                }
            }
        });
    });
}

// 初始化背景动画
function initBackgroundAnimation() {
    const container = document.getElementById('shapes-container');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建更多的浮动元素
    const numberOfDots = Math.floor((window.innerWidth * window.innerHeight) / 5000);
    
    for (let i = 0; i < numberOfDots; i++) {
        const shape = createShape();
        container.appendChild(shape);
    }
    
    // 添加鼠标悬停效果
    initMouseHoverEffect();
}

// 添加视差效果
function handleParallax(e) {
    const shapes = document.querySelectorAll('.floating-dot');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const depth = 1 + (index % 3) * 0.5; // 不同深度的视差效果
        const moveX = (mouseX - 0.5) * 20 * depth;
        const moveY = (mouseY - 0.5) * 20 * depth;
        
        // 使用 transform3d 启用硬件加速
        shape.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 页面加载和窗口调整时重新初始化
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();
    handleScrollAnimations();
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 窗口大小调整时重新初始化背景动画
    window.addEventListener('resize', debounce(() => {
        initBackgroundAnimation();
    }, 250));

    // 添加视差效果监听
    window.addEventListener('mousemove', debounce(handleParallax, 50));
});
