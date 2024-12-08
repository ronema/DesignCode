// 动态背景生成器
class DynamicBackground {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            shapeCount: config.shapeCount || 20,
            colors: config.colors || [
                'rgba(52, 152, 219, 0.3)',   // 柔和蓝
                'rgba(46, 204, 113, 0.3)',   // 绿色
                'rgba(231, 76, 60, 0.3)',    // 红色
                'rgba(241, 196, 15, 0.3)'    // 黄色
            ],
            minSize: config.minSize || 10,
            maxSize: config.maxSize || 50,
            animationDuration: config.animationDuration || 10000
        };
        this.shapes = [];
    }

    // 生成随机数
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // 创建单个形状
    createShape() {
        const shape = document.createElement('div');
        shape.classList.add('dynamic-shape');

        // 随机大小
        const size = this.randomBetween(this.config.minSize, this.config.maxSize);
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // 随机位置
        shape.style.position = 'absolute';
        shape.style.left = `${this.randomBetween(0, 100)}%`;
        shape.style.top = `${this.randomBetween(0, 100)}%`;

        // 随机颜色
        shape.style.backgroundColor = this.config.colors[
            Math.floor(Math.random() * this.config.colors.length)
        ];

        // 随机圆角
        shape.style.borderRadius = `${this.randomBetween(0, 50)}%`;

        return shape;
    }

    // 初始化背景
    initialize() {
        // 清除现有元素
        this.container.innerHTML = '';

        // 创建形状
        for (let i = 0; i < this.config.shapeCount; i++) {
            const shape = this.createShape();
            this.container.appendChild(shape);
            this.shapes.push(shape);
        }

        // 添加动画
        this.animateShapes();
    }

    // 动画效果
    animateShapes() {
        this.shapes.forEach(shape => {
            shape.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.5 },
                { transform: `translate(${this.randomBetween(-200, 200)}px, ${this.randomBetween(-200, 200)}px) rotate(360deg)`, opacity: 0.2 }
            ], {
                duration: this.config.animationDuration,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
        });
    }
}

// 页面加载时初始化背景
document.addEventListener('DOMContentLoaded', () => {
    const dynamicBackground = new DynamicBackground('shapes-container');
    dynamicBackground.initialize();
});
