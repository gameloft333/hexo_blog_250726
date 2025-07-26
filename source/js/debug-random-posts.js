/**
 * 调试版本 - 帮助找到正确的文章容器选择器
 * 在浏览器控制台运行这个脚本来分析页面结构
 */

function debugPageStructure() {
    console.log('🔍 开始分析页面结构...');
    
    // 1. 查找所有可能的文章标题
    const titleSelectors = [
        '.post-title',
        '.card-title', 
        '.article-title',
        'h1', 'h2', 'h3'
    ];
    
    console.log('📝 查找文章标题...');
    titleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`${selector}: ${elements.length} 个元素`);
            elements.forEach((el, index) => {
                console.log(`  ${index + 1}. "${el.textContent.trim().substring(0, 50)}..."`);
                console.log(`     父元素类名: ${el.parentElement.className}`);
                console.log(`     祖父元素类名: ${el.parentElement.parentElement?.className || 'N/A'}`);
            });
        }
    });
    
    // 2. 查找所有可能的容器元素
    console.log('\n📦 查找可能的容器元素...');
    const containerSelectors = [
        '.container',
        '.row',
        '.col',
        '.post-list',
        '.posts',
        '.home-post-list',
        '[class*="post"]',
        '[class*="card"]',
        '[class*="article"]'
    ];
    
    containerSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`${selector}: ${elements.length} 个元素`);
            elements.forEach((el, index) => {
                const children = el.children.length;
                const hasTitle = el.querySelector('.post-title, .card-title, h1, h2, h3');
                console.log(`  ${index + 1}. 子元素: ${children}, 包含标题: ${!!hasTitle}, 类名: "${el.className}"`);
            });
        }
    });
    
    // 3. 分析DOM结构
    console.log('\n🌳 分析DOM结构...');
    const body = document.body;
    function analyzeElement(element, depth = 0, maxDepth = 3) {
        if (depth > maxDepth) return;
        
        const indent = '  '.repeat(depth);
        const tag = element.tagName.toLowerCase();
        const className = element.className ? ` class="${element.className}"` : '';
        const childCount = element.children.length;
        
        if (childCount > 0 && (element.className.includes('container') || 
                              element.className.includes('row') || 
                              element.className.includes('post') ||
                              element.className.includes('card'))) {
            console.log(`${indent}<${tag}${className}> (${childCount} children)`);
            
            for (let child of element.children) {
                analyzeElement(child, depth + 1, maxDepth);
            }
        }
    }
    
    analyzeElement(body);
    
    // 4. 提供建议的选择器
    console.log('\n💡 建议的选择器测试...');
    const suggestedSelectors = [
        '#board .container .row',
        '.container .row',
        '.home-post-list',
        '.post-list',
        '[class*="post"]:not([class*="post-title"])',
        '.card',
        '.col'
    ];
    
    suggestedSelectors.forEach(selector => {
        try {
            const container = document.querySelector(selector);
            if (container) {
                const children = Array.from(container.children);
                const validPosts = children.filter(child => {
                    return child.querySelector('.post-title, .card-title, h1, h2, h3');
                });
                
                console.log(`✅ ${selector}:`);
                console.log(`   容器: ${container.className}`);
                console.log(`   总子元素: ${children.length}`);
                console.log(`   有效文章: ${validPosts.length}`);
                
                if (validPosts.length > 1) {
                    console.log(`   🎯 这个选择器可能有效！`);
                    validPosts.forEach((post, index) => {
                        const title = post.querySelector('.post-title, .card-title, h1, h2, h3');
                        console.log(`     ${index + 1}. ${title ? title.textContent.trim().substring(0, 30) : 'No title'}...`);
                    });
                }
            }
        } catch (e) {
            console.log(`❌ ${selector}: 选择器无效`);
        }
    });
    
    console.log('\n🎲 完成页面结构分析');
}

// 自动运行调试
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', debugPageStructure);
} else {
    debugPageStructure();
}

// 提供手动调试函数
window.debugPageStructure = debugPageStructure;
