// 图片数据配置
export const imageData = {
    // 作品展示图片
    works: [],
    photography: {
        featured: [],
        grid: []
    }
};

/**
 * 优化图片URL
 * @param {string} url - 图片路径
 * @returns {string} 完整的图片URL
 */
export function optimizeImageUrl(url) {
    // 如果已经是完整URL，直接返回
    if (url.startsWith('http')) {
        return url;
    }
    
    // 添加基础路径
    return `/MyWebsite${url}`;
}

/**
 * 预加载图片
 * @param {string} url - 图片URL
 * @returns {Promise} 加载完成的Promise
 */
export function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = optimizeImageUrl(url);
    });
}

/**
 * 获取响应式图片源集
 * @param {string} url - 原始图片URL
 * @returns {string} srcset字符串
 */
export function getImageSrcSet(url) {
    try {
        const sizes = [400, 800, 1200, 1600];
        return sizes.map(size => {
            const optimizedUrl = optimizeImageUrl(url);
            return `${optimizedUrl} ${size}w`;
        }).join(', ');
    } catch (error) {
        console.error('Error generating srcset:', error);
        return optimizeImageUrl(url);
    }
}
