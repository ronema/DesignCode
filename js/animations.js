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
    const elements = document.querySelectorAll('.animated-text, .work-card, .contact-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// 创建动态元素
function createShape() {
    const container = document.createElement('div');
    container.className = 'floating-dot';
    
    // 随机大小 (5-25px)
    const size = Math.random() * 20 + 5;
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
    
    // 随机位置 - 使用更大的范围
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;
    
    // 加快动画速度：将持续时间缩短为原来的1/10
    const duration = Math.random() * 1 + 1.5; // 1.5-2.5s
    container.style.setProperty('--duration', `${duration}s`);
    container.style.animationDelay = `${Math.random() * -duration}s`; // 负值延迟确保立即开始动画
    
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
    
    // 随机 HSL 颜色
    const hue = Math.floor(Math.random() * 60) + 220; // 220-280 范围的色相（蓝紫色系）
    const saturation = 75;
    const lightness = 70;
    const opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0 的透明度
    
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
            
            // 计算距离
            const dx = mouseX - dotCenterX;
            const dy = mouseY - dotCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 定义影响范围
            const maxDistance = 200;
            const minDistance = 50;
            
            if (distance < maxDistance) {
                // 计算影响强度
                const influence = 1 - (distance / maxDistance);
                
                // 移动点
                const moveX = dx * influence * 2;
                const moveY = dy * influence * 2;
                
                dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // 根据距离调整透明度
                dot.style.opacity = 0.3 + (influence * 0.7);
            } else {
                // 恢复原始状态
                dot.style.transform = 'translate(0, 0)';
                dot.style.opacity = 1;
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
});

// 窗口大小改变时重新初始化
window.addEventListener('resize', () => {
    initBackgroundAnimation();
});
