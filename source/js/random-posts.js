/**
 * 随机排序文章列表
 * 每次页面刷新时重新打乱文章顺序
 */

(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        randomizePosts();
    });
    
    // 主要的随机排序函数
    function randomizePosts() {
        // 常见的文章列表选择器（根据不同主题可能需要调整）
        const selectors = [
            '.post-list',           // 通用
            '.posts',               // 通用
            '.post-preview',        // Bootstrap主题
            '.article-list',        // 某些主题
            '.home-post-list',      // Fluid主题
            '.post-card',           // Card布局
            '.timeline-item',       // 时间线布局
            '[class*="post"]'       // 包含post的类名
        ];
        
        let postContainer = null;
        let posts = [];
        
        // 尝试找到文章容器
        for (let selector of selectors) {
            postContainer = document.querySelector(selector);
            if (postContainer) {
                posts = Array.from(postContainer.children);
                if (posts.length > 1) {
                    console.log(`找到文章容器: ${selector}, 文章数量: ${posts.length}`);
                    break;
                }
            }
        }
        
        // 如果没找到，尝试更通用的方法
        if (!postContainer || posts.length <= 1) {
            // 查找包含文章标题的元素的父容器
            const titleElements = document.querySelectorAll('h1, h2, h3, .post-title, .article-title');
            if (titleElements.length > 1) {
                // 找到共同的父容器
                postContainer = findCommonParent(titleElements);
                if (postContainer) {
                    posts = Array.from(postContainer.children);
                    console.log(`通过标题元素找到容器, 文章数量: ${posts.length}`);
                }
            }
        }
        
        // 执行随机排序
        if (posts.length > 1) {
            shuffleArray(posts);
            
            // 重新排列DOM元素
            posts.forEach(post => {
                postContainer.appendChild(post);
            });
            
            console.log('文章列表已随机排序');
            
            // 添加随机排序指示器（可选）
            addRandomIndicator();
        } else {
            console.log('未找到足够的文章进行随机排序');
        }
    }
    
    // Fisher-Yates 洗牌算法
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 找到多个元素的共同父容器
    function findCommonParent(elements) {
        if (elements.length === 0) return null;
        
        let parent = elements[0].parentElement;
        
        while (parent) {
            let allInParent = true;
            for (let element of elements) {
                if (!parent.contains(element)) {
                    allInParent = false;
                    break;
                }
            }
            
            if (allInParent) {
                return parent;
            }
            
            parent = parent.parentElement;
        }
        
        return null;
    }
    
    // 添加随机排序指示器
    function addRandomIndicator() {
        // 检查是否已存在指示器
        if (document.querySelector('.random-indicator')) {
            return;
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'random-indicator';
        indicator.innerHTML = '🎲 文章已随机排序';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
        
        // 显示指示器
        setTimeout(() => {
            indicator.style.opacity = '1';
        }, 100);
        
        // 3秒后隐藏指示器
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }, 3000);
    }
    
    // 提供手动触发随机排序的方法
    window.randomizePosts = randomizePosts;
    
})();

// 可选：添加键盘快捷键 (按R键随机排序)
document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            window.randomizePosts();
        }
    }
});
