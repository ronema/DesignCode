// 图片数据配置
export const imageData = {
    // 作品展示图片
    works: [
        {
            id: 1,
            title: "品牌设计：青年咖啡",
            description: "为新锐咖啡品牌设计的整体视觉形象",
            image: "images/coffee-brand.jpg",
            category: "品牌设计"
        },
        {
            id: 2,
            title: "界面设计：旅行应用",
            description: "一款面向年轻人的旅行规划应用",
            image: "images/travel-app.jpg",
            category: "UI设计"
        },
        {
            id: 3,
            title: "包装设计：茶叶礼盒",
            description: "传统与现代结合的茶叶包装设计",
            image: "images/tea-packaging.jpg",
            category: "包装设计"
        },
        {
            id: 4,
            title: "海报设计：音乐节",
            description: "2023夏季音乐节主视觉设计",
            image: "images/music-festival.jpg",
            category: "平面设计"
        },
        {
            id: 5,
            title: "电商设计：美食APP",
            description: "外卖配送应用界面设计",
            image: "images/food-app.jpg",
            category: "UI设计"
        },
        {
            id: 6,
            title: "品牌设计：瑜伽工作室",
            description: "瑜伽工作室品牌视觉系统设计",
            image: "images/yoga-brand.jpg",
            category: "品牌设计"
        }
    ],
    photography: {
        featured: [
            {
                id: 1,
                title: "城市剪影",
                description: "城市建筑的几何美感",
                image: "images/photos/DSC_4128.jpg",
                date: "2023-12-01",
                category: "建筑摄影"
            },
            {
                id: 2,
                title: "都市风景",
                description: "现代都市的建筑艺术",
                image: "images/photos/DSC_4129.jpg",
                date: "2023-12-01",
                category: "建筑摄影"
            },
            {
                id: 3,
                title: "建筑几何",
                description: "建筑线条的韵律之美",
                image: "images/photos/DSC_4160.jpg",
                date: "2023-12-02",
                category: "建筑摄影"
            },
            {
                id: 4,
                title: "城市空间",
                description: "都市空间的视觉探索",
                image: "images/photos/DSC_4333.jpg",
                date: "2023-12-03",
                category: "建筑摄影"
            }
        ],
        grid: [
            {
                id: 5,
                title: "自然光影",
                description: "光影交错的瞬间",
                image: "images/photos/DSC_0268.jpg",
                date: "2023-11-28",
                category: "风光摄影"
            },
            {
                id: 6,
                title: "城市印象",
                description: "都市中的静谧时刻",
                image: "images/photos/DSC_0307.jpg",
                date: "2023-11-29",
                category: "城市风光"
            },
            {
                id: 7,
                title: "光与影",
                description: "光影交织的艺术",
                image: "images/photos/DSC_0332.jpg",
                date: "2023-11-30",
                category: "艺术摄影"
            },
            {
                id: 9,
                title: "建筑之美",
                description: "现代建筑的几何美学",
                image: "images/photos/DSC_4129.jpg",
                date: "2023-12-02",
                category: "建筑摄影"
            },
            {
                id: 10,
                title: "城市节奏",
                description: "都市建筑的韵律感",
                image: "images/photos/DSC_4160.jpg",
                date: "2023-12-03",
                category: "建筑摄影"
            }
        ]
    }
};

/**
 * 优化图片URL
 * @param {string} url - 图片路径
 * @returns {string} 完整的图片URL
 */
export function optimizeImageUrl(url) {
    // 如果是完整URL，直接返回
    if (url.startsWith('http')) {
        return url;
    }
    
    // 添加基础路径
    return url;
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
