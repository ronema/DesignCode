// 移动端菜单控制
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');

    // 确保菜单切换按钮存在
    if (mobileMenuToggle && menu) {
        mobileMenuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            
            // 切换汉堡按钮动画
            mobileMenuToggle.classList.toggle('active');
        });

        // 点击菜单项后关闭菜单
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});
