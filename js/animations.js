// 处理背景动画
function handleBackgroundAnimation() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        shape.addEventListener('mouseover', () => {
            shape.style.animation = 'rotate 1s linear infinite';
        });
        
        shape.addEventListener('mouseout', () => {
            shape.style.animation = 'float 20s infinite';
        });
    });
}

// 处理滚动动画
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animated-text, .work-card, .contact-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 初始化所有动画
document.addEventListener('DOMContentLoaded', () => {
    handleBackgroundAnimation();
    handleScrollAnimations();
});
