# URL配置修复说明

## 🎯 修改目标

将本地预览地址从：
```
http://localhost:4000/hexo_blog_250726/
```

修改为：
```
http://localhost:4000/
```

## ✅ 已完成的修改

### 1. 修改 `_config.yml` 中的root配置

```yaml
# 修改前（会显示项目路径）
url: https://gameloft333.github.io/hexo_blog_250726
# 没有root配置

# 修改后（本地预览使用根路径）
url: https://gameloft333.github.io/hexo_blog_250726
root: /
```

### 2. 配置说明

- **url**: 保持GitHub Pages的完整地址，用于生产环境
- **root**: 设置为 `/`，确保本地预览时使用根路径

## 🚀 测试方法

运行测试脚本：
```bash
test_localhost_4000.bat
```

或手动执行：
```bash
hexo clean
hexo generate  
hexo server
```

## 📋 预期效果

### 本地预览
- ✅ 地址：`http://localhost:4000`
- ✅ 所有链接和资源正常加载
- ✅ 导航和页面跳转正常

### 生产环境（GitHub Pages）
- ✅ 地址：`https://gameloft333.github.io/hexo_blog_250726/`
- ✅ 部署后路径正确
- ✅ 所有功能正常

## ⚠️ 注意事项

1. **本地预览**：现在直接访问 `http://localhost:4000`
2. **生产部署**：GitHub Pages仍然使用正确的项目路径
3. **资源路径**：所有CSS、JS、图片等资源路径自动适配

## 🔧 如果还有问题

如果修改后仍然显示项目路径，请：

1. **清理缓存**：`hexo clean`
2. **重新生成**：`hexo generate`
3. **重启服务器**：`hexo server`
4. **清除浏览器缓存**：Ctrl+F5 强制刷新

---

*现在本地预览应该使用简洁的 http://localhost:4000 地址了！* ✨
