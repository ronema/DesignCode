# 精彩代码片段集合

## 背景渐变动效

### CSS 实现

```css
body {
    background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
    background-size: 400% 400%;
    animation: gradientFlow 10s ease infinite;
}

@keyframes gradientFlow {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
```

### 特点
- 45度角渐变
- 10秒完成一个循环
- 使用 `ease` 缓动
- 背景大小 400%，创造流动感

## 小圆点动效

### CSS 动画

```css
@keyframes fluid-movement {
    0% {
        transform: translate(calc(-50px * var(--direction-x)), calc(-50px * var(--direction-y))) rotate(calc(-45deg * var(--rotation)));
        opacity: calc(0.1 + var(--base-opacity));
    }
    50% {
        transform: translate(calc(50px * var(--direction-x)), calc(50px * var(--direction-y))) rotate(calc(45deg * var(--rotation)));
        opacity: calc(0.3 + var(--base-opacity));
    }
    100% {
        transform: translate(calc(-50px * var(--direction-x)), calc(-50px * var(--direction-y))) rotate(calc(-45deg * var(--rotation)));
        opacity: calc(0.1 + var(--base-opacity));
    }
}

@keyframes shooting-star {
    0% {
        transform: translateX(0) translateY(0) rotate(0deg) scale(calc(0.5 + var(--scale)));
        opacity: calc(0.1 * var(--opacity-multiplier));
    }
    50% {
        transform: translateX(500px) translateY(500px) rotate(180deg) scale(calc(0.8 + var(--scale)));
        opacity: calc(0.3 * var(--opacity-multiplier));
    }
    100% {
        transform: translateX(1000px) translateY(1000px) rotate(360deg) scale(calc(1 + var(--scale)));
        opacity: calc(0.1 * var(--opacity-multiplier));
    }
}
```

### JavaScript 生成逻辑

```javascript
function createShape() {
    const container = document.createElement('div');
    container.className = 'floating-dot';
    
    // 非线性大小分布
    const size = Math.pow(Math.random(), 3) * 15 + 0.5;
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
    
    if (size < 2) {
        container.classList.add('tiny');
        
        // 添加深度层次
        const depth = Math.floor(Math.random() * 5) + 1;
        container.classList.add(`depth-${depth}`);
        
        // 为流星添加随机性
        const scale = Math.random() * 0.5;
        const opacityMultiplier = Math.random() * 0.8 + 0.2;
        
        container.style.setProperty('--scale', scale);
        container.style.setProperty('--opacity-multiplier', opacityMultiplier);
    } else {
        // 大圆点动效
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
}
```

### 关键特性
- 非线性大小分布
- 多层次透明度
- 流星和大圆点不同动效
- 高度随机性
