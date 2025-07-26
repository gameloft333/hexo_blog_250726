<article class="post-content mx-auto">
            <h1 id="seo-header">搭建免费个人博博客：Cloudflare+GitHub+Hexo Fluid</h1>
            
            
              <div class="markdown-body">
                
                <h1 id="前言"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#前言" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#前言" class="headerlink" title="前言"></a>前言</h1><p>在上一篇文章，我们已经使用 Cloudflare R2 和 PicGo 搭建了一个<a href="/2025/01/12/%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A">免费图床</a>。今天我们来继续完成，博客网站的搭建。作为一个个人博客，我们希望这个网站能够具有以下优点：</p>
<ol>
<li>最好是免费的，不需要额外购买云服务器</li>
<li>维护尽量简单，我们只用它发布文章，不需要太复杂的功能</li>
<li>网络访问流畅，不论是国内用户还是国外用户，都能访问我们的博客</li>
</ol>
<p><font color="#00A2FF"><i><b> 在综合考虑了上面3点要求后，我们最终选择了使用 Cloudflare+GitHub+Hexo Fluid 来搭建博客网站。</b></i></font></p>
<h1 id="Hexo环境配置"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#Hexo环境配置" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#Hexo环境配置" class="headerlink" title="Hexo环境配置"></a>Hexo环境配置</h1><p>hexo 是一个快速、简洁，而且功能强大的静态博客框架。我们可以使用 Markdown 编写博客文章，然后 hexo 帮我们把 Markdown 文件渲染成静态 HTML 页面。因此 hexo 非常适合用来搭建技术类博客，以及项目文档和个人网站。</p>
<h2 id="1-安装-Node-js"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#1-安装-Node-js" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#1-安装-Node-js" class="headerlink" title="1. 安装 Node.js"></a>1. 安装 Node.js</h2><p>由于 hexo 是基于 Node.js 的，因此要安装 hexo，需要先安装 Node.js 和 npm，然后通过 npm 来安装 hexo。要安装 Node.js ，可以打开<a target="_blank" rel="noopener" href="https://nodejs.org/zh-cn">Node.js官网</a>，下载软件然后进行安装就可以了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/nodejs%E5%AE%98%E7%BD%91.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="安装Node.js" data-caption="安装Node.js"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/nodejs%E5%AE%98%E7%BD%91.png" alt="安装Node.js" width="700"></a><figcaption aria-hidden="true" class="image-caption">安装Node.js</figcaption><br>安装这个软件，会同时安装 node 和 npm 这2个工具。安装完成以后，我们来验证一下是否安装成功了。执行下面的命令，如果能输出版本号，就代表 node 安装成功了。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><code class="hljs bash">node -v<br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>

<p>接着再执行这条命令，同样如果能输出版本号就证明 npm 也安装成功了。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><code class="hljs bash">npm -v<br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>
<h2 id="2-安装-Hexo"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#2-安装-Hexo" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#2-安装-Hexo" class="headerlink" title="2. 安装 Hexo"></a>2. 安装 Hexo</h2><p>下面我们来安装 hexo，需要注意我们这里安装的是 <code>hexo客户端</code> 。安装 hexo 需要使用 npm 命令，但是在国内使用 npm 安装软件，速度很慢。因此我们先执行下面这条命令，给 npm 替换成国内的源，这样安装速度就会快很多了。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><code class="hljs bash">npm config <span class="hljs-built_in">set</span> registry https://registry.npmmirror.com <br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>
<p>接着执行下面这条命令，使用 npm 安装 hexo客户端。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><code class="hljs bash">npm install -g hexo-cli<br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>
<p>安装好 hexo 以后，执行 <code>hexo init my-blog</code> 初始化 my-blog 文件夹（自定义）。这个文件夹，就是我们的博客项目，用来存放我们的全部博客文章。然后 <code>cd my-blog</code> 进入到文件夹，接着执行 <code>npm install</code> 命令安装依赖包。<br><br>到这里我们的 hexo 环境配置就基本完成了，下面就可以使用它来写文章和发布文章了！👍👍👍<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E9%85%8D%E7%BD%AEhexo.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="配置hexo" data-caption="配置hexo"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E9%85%8D%E7%BD%AEhexo.png" alt="配置hexo" width="700"></a><figcaption aria-hidden="true" class="image-caption">配置hexo</figcaption></p>
<h1 id="使用-Hexo-管理博客"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#使用-Hexo-管理博客" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#使用-Hexo-管理博客" class="headerlink" title="使用 Hexo 管理博客"></a>使用 Hexo 管理博客</h1><p>为了方便编辑，我们使用 vscode 打开 my-blog 文件夹。下面来看一下 my-blog 里面的主要组成部分：</p>
<ol>
<li>_config.yml：博客的全局配置文件，网站的名称、描述、作者等，都可以在这里进行设置</li>
<li>source/_post：存放我们全部的文章，而且 hexo 自带了一篇 demo 文章 hello-world</li>
<li>themes：博客的主题配置文件，hexo 有一个默认主题，但不太好看，后面可以改成漂亮一些的主题</li>
</ol>
<p>上面这3部分，就是我们使用 hexo 写博客时需要重点关注的地方。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/hexo%E7%BB%93%E6%9E%84.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="hexo组成" data-caption="hexo组成"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/hexo%E7%BB%93%E6%9E%84.png" alt="hexo组成" width="700"></a><figcaption aria-hidden="true" class="image-caption">hexo组成</figcaption><br>接着我们执行 <code>hexo generate</code> 和 <code>hexo server</code> 这2条命令，在本地把 hexo 服务跑起来。这样我们就可以，在本地网址的4000端口，预览文章效果。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%90%AF%E5%8A%A8hexo.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="运行hexo" data-caption="运行hexo"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%90%AF%E5%8A%A8hexo.png" alt="运行hexo" width="700"></a><figcaption aria-hidden="true" class="image-caption">运行hexo</figcaption><br>打开<font color="#00A2FF"><i><b> <a target="_blank" rel="noopener" href="http://localhost:4000/">http://localhost:4000/</a> </b></i></font>这个本地网址，已经可以正常访问了，这里就是博客网页的布局。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/hello-world.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="博客预览" data-caption="博客预览"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/hello-world.png" alt="博客预览" width="700"></a><figcaption aria-hidden="true" class="image-caption">博客预览</figcaption></p>
<h1 id="将博客托管到-GitHub-Pages"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#将博客托管到-GitHub-Pages" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#将博客托管到-GitHub-Pages" class="headerlink" title="将博客托管到 GitHub Pages"></a>将博客托管到 GitHub Pages</h1><p>现在我们这个博客，还只能在本地网址预览。下面我们把博客项目托管到 GitHub 仓库，并且使用 GitHub Pages 来部署博客，让其他人也能访问我们的博客网站。</p>
<h2 id="1-博客项目托管到GitHub"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#1-博客项目托管到GitHub" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#1-博客项目托管到GitHub" class="headerlink" title="1. 博客项目托管到GitHub"></a>1. 博客项目托管到GitHub</h2><p>为了方便管理 my-blog 博客项目，我们下一步把这个项目托管到 GitHub 上。首先在 GitHub 上创建一个项目，项目名可以设置为 <code>我们的GitHub用户名.github.io</code>。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%88%9B%E5%BB%BAGitHub%E9%A1%B9%E7%9B%AE.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="创建GitHub项目" data-caption="创建GitHub项目"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%88%9B%E5%BB%BAGitHub%E9%A1%B9%E7%9B%AE.png" alt="创建GitHub项目" width="700"></a><figcaption aria-hidden="true" class="image-caption">创建GitHub项目</figcaption><br>创建完成后，GitHub 给我们列出了一些，快速设置这个仓库的操作指令。我们选择第一种，依次执行它给我们提供的这些命令。需要注意，<code>git add README.md</code> 这条命令我们要替换成 <code>git add .</code> 来把 my-blog 文件夹下的全部文件，都暂存到仓库。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%88%9D%E5%A7%8B%E5%8C%96GitHub%E4%BB%93%E5%BA%93.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="创建GitHub项目" data-caption="创建GitHub项目"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%88%9D%E5%A7%8B%E5%8C%96GitHub%E4%BB%93%E5%BA%93.png" alt="创建GitHub项目" width="700"></a><figcaption aria-hidden="true" class="image-caption">创建GitHub项目</figcaption></p>
<h2 id="2-使用-GitHub-Pages-部署博客"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#2-使用-GitHub-Pages-部署博客" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#2-使用-GitHub-Pages-部署博客" class="headerlink" title="2. 使用 GitHub Pages 部署博客"></a>2. 使用 GitHub Pages 部署博客</h2><p>执行完配置命令以后，我们就可以使用 git 来管理博客项目了。接下来我们把 my-blog 项目，部署到 GitHub Pages 上。 这样我们的博客，就不再只是一个本地网站了。其他人也可以通过网络，来访问我们的博客。<br><br>首先在 my-blog 项目的 _config.yml 配置文件中，把 git 服务部署的配置加进去。在 type 配置项这里填上 git，然后分别添加一个 repository 和一个 branch 配置，指定部署博客网站时，所使用的 GitHub 项目和对应的分支。repository 这里填 <code>git@github.com:GitHub用户名/GitHub仓库名</code>，branch 这里指定 <code>main</code> 分支，然后保存配置。<br><br>最后我们执行 <code>npm install hexo-deployer-git --save</code> 命令，安装 hexo-deployer-git 这个插件，来简化部署到 GitHub Pages 的流程。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/GitHub%E9%83%A8%E7%BD%B2%E9%85%8D%E7%BD%AE.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="GitHub部署配置" data-caption="GitHub部署配置"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/GitHub%E9%83%A8%E7%BD%B2%E9%85%8D%E7%BD%AE.png" alt="GitHub部署配置" width="700"></a><figcaption aria-hidden="true" class="image-caption">GitHub部署配置</figcaption><br>这样配置完以后，我们就可以在本地写文章，写完以后通过 <font color="#00A2FF"><i><b><a target="_blank" rel="noopener" href="http://localhost:4000/">http://localhost:4000/</a></b></i></font> 预览文章效果并进行修改。修改满意后，就可以部署到 GitHub Pages 这样其他人就能访问我们的博客了。我们来看一下使用流程：<br><br>首先我们使用 <code>hexo new post 文章标题</code>，来创建一篇新文章。这样操作后，hexo 就会在 source/_post 下面，给我们生成一个新文件来编辑这篇文章。我们使用上一篇文章，搭建的 <a href="/2025/01/12/%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A">免费图床</a> 来简单编辑一下这篇新文章。MarkDown 本地渲染一下，显示正常。然后执行这个三合一命令，把文章发布到 GitHub Pages。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><code class="hljs bash">hexo clean &amp;&amp; hexo generate &amp;&amp; hexo deploy<br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>
<ul>
<li>hexo clean：清除缓存，简写 hexo -c</li>
<li>hexo generate：生成渲染，简写 hexo -g</li>
<li>hexo deploy：部署到 GitHub Pages，简写 hexo -d</li>
<li>hexo server：启动本地预览，简写 hexo -s</li>
</ul>
<p>发布完成后，打开 <code>https://github用户名.github.io/</code> 这个网址，就可以访问我们的在线博客了！👌<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/GitHubPages.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="GitHubPages" data-caption="GitHubPages"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/GitHubPages.png" alt="GitHubPages" width="700"></a><figcaption aria-hidden="true" class="image-caption">GitHubPages</figcaption></p>
<h1 id="使用-Cloudflare-加速访问"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#使用-Cloudflare-加速访问" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#使用-Cloudflare-加速访问" class="headerlink" title="使用 Cloudflare 加速访问"></a>使用 Cloudflare 加速访问</h1><p>其实到这里，一个简单的博客就搭建完成了。但是 GitHub 的一个最大问题是，国内访问并不稳定。所以接下来我们使用免费的 Cloudflare 代理一层，来加速我们这个博客的访问速度！打开 Cloudflare，在左侧找到 worker 和 pages，点击选择 pages。然后选择连接到 git，选择 GitHub，选择仓库并给它授权就可以了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/cloudflare.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="cloudflare" data-caption="cloudflare"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/cloudflare.png" alt="cloudflare" width="700"></a><figcaption aria-hidden="true" class="image-caption">cloudflare</figcaption><br>接着点击开始设置，再点击开始部署。部署完成了，点击继续处理项目。在部署这里，上面这个网址，就是 Cloudflare 给我们分配的子域名。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/cloudflare%E9%83%A8%E7%BD%B2%E5%AE%8C%E6%88%90.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="cloudflare部署" data-caption="cloudflare部署"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/cloudflare%E9%83%A8%E7%BD%B2%E5%AE%8C%E6%88%90.png" alt="cloudflare部署" width="700"></a><figcaption aria-hidden="true" class="image-caption">cloudflare部署</figcaption></p>
<h2 id="使用自定义域名"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#使用自定义域名" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#使用自定义域名" class="headerlink" title="使用自定义域名"></a>使用自定义域名</h2><p>如果有托管到 Cloudflare 的域名，我们还可以用自己的域名，来实现自定义域。关于如何把网上购买的域名，托管到 Cloudflare，可以参考 <a href="/2025/01/12/%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A">免费图床</a> 这篇文章，里面有介绍如何把阿里云域名托管到 Cloudflare。<br><br>我们点击自定义域选项,然后点击设置自定义域，把域名填进去，点击继续。然后点击激活按钮，激活成功后就可以使用自定义域名来访问博客网站了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="自定义域名" data-caption="自定义域名"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F.png" alt="自定义域名" width="700"></a><figcaption aria-hidden="true" class="image-caption">自定义域名</figcaption></p>
<h1 id="修改-Hexo-主题为-Fluid"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#修改-Hexo-主题为-Fluid" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#修改-Hexo-主题为-Fluid" class="headerlink" title="修改 Hexo 主题为 Fluid"></a>修改 Hexo 主题为 Fluid</h1><p>但是现在这个博客的主题，看上去不太好看。下面我们来换个好看点的主题，这里我们使用这个 <a target="_blank" rel="noopener" href="https://github.com/fluid-dev/hexo-theme-fluid">fluid主题</a>。hexo有很多开源免费的主题，大家可以自行选择。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/fluid.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="fluid" data-caption="fluid"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/fluid.png" alt="fluid" width="700"></a><figcaption aria-hidden="true" class="image-caption">fluid</figcaption><br>我们来安装这个主题，我们用第2种安装方式：下载最新 release 版本，解压到 themes 目录，并将解压出的文件夹重命名为 fluid 就可以了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%AE%89%E8%A3%85fluid.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="安装fluid" data-caption="安装fluid"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%AE%89%E8%A3%85fluid.png" alt="安装fluid" width="700"></a><figcaption aria-hidden="true" class="image-caption">安装fluid</figcaption><br>在 _config.yml 文件中，添加配置 <code>theme: fluid</code> 指定使用 fluid 主题。然后生成about页面，修改index文件，这些都按照fluid的文档操作就可以。我们再重新部署一下，等部署完成刷新下博客的页面，可以看到现在博客主题已经变成 fluid 了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/fluid%E4%B8%BB%E9%A2%98%E5%8D%9A%E5%AE%A2.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="fluid主题博客" data-caption="fluid主题博客"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/fluid%E4%B8%BB%E9%A2%98%E5%8D%9A%E5%AE%A2.png" alt="fluid主题博客" width="700"></a><figcaption aria-hidden="true" class="image-caption">fluid主题博客</figcaption></p>
<h1 id="添加评论功能"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#添加评论功能" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#添加评论功能" class="headerlink" title="添加评论功能"></a>添加评论功能</h1><p>但是现在我们这个博客，它是没有评论功能的，拉到博客文章的最底部，可以看到是没有评论区的。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E6%97%A0%E6%B3%95%E8%AF%84%E8%AE%BA.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="无法评论" data-caption="无法评论"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E6%97%A0%E6%B3%95%E8%AF%84%E8%AE%BA.png" alt="无法评论" width="700"></a><figcaption aria-hidden="true" class="image-caption">无法评论</figcaption><br>下面我们来给博客添加一个评论功能，这里我们使用这个 <a target="_blank" rel="noopener" href="https://github.com/apps/utterances">utterances插件</a>，它是一个基于 GitHub Issue 的，开源评论插件。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="安装评论插件" data-caption="安装评论插件"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6.png" alt="安装评论插件" width="700"></a><figcaption aria-hidden="true" class="image-caption">安装评论插件</figcaption><br>我们点击安装它，然后选择对应的仓库给它授权。然后在 GitHub 仓库，点击设置，找到 features 下面这个 Discussion 选项，然后点击勾选上这个选项。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/discussion.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="开启评论" data-caption="开启评论"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/discussion.png" alt="开启评论" width="700"></a><figcaption aria-hidden="true" class="image-caption">开启评论</figcaption><br>接着我们需要修改 _config.fluid.yml 配置文件，在文件中填入下面的内容，保存就可以了。</p>
<figure class="highlight bash"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br></pre></td><td class="code"><pre><code class="hljs bash">post:<br>  comments:<br>    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span><br>    <span class="hljs-built_in">type</span>: utterances<br><br>utterances:<br>  repo: GitHub用户名/GitHub用户名.github.io<br>  issue_term: title<br>  label: utterances<br>  theme: github-light<br>  theme_dark: github-dark<br>  crossorigin: anonymous    <br><br></code><div class="code-widget copy-btn code-widget-dark" data-clipboard-snippet=""><i class="iconfont icon-copy"></i>BASH</div></pre></td></tr></tbody></table></figure>
<p>下面我们重新发布下服务，看下效果。发布完成了，打开博客网站，刷新下可以看到已经有评论功能了。我们用 GitHub 账号登录，然后发一条评论试试，评论发布成功，这样我们的评论功能就添加成功了。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%AF%84%E8%AE%BA.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="评论测试" data-caption="评论测试"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E8%AF%84%E8%AE%BA.png" alt="评论测试" width="700"></a><figcaption aria-hidden="true" class="image-caption">评论测试</figcaption></p>
<h1 id="结束语"><a class="anchorjs-link anchorjs-link-left" aria-label="Anchor" data-anchorjs-icon="" href="#结束语" style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; font-size: 1em; line-height: inherit; font-family: anchorjs-icons; position: absolute; margin-left: -1.25em; padding-right: 0.25em; padding-left: 0.25em;"></a><a href="#结束语" class="headerlink" title="结束语"></a>结束语</h1><p>到这里我们这个博客就基本搭建完成了，其它一些细化功能，比如访问信息统计、网页布局调整等，都可以后续慢慢优化。总体来说这个方案，用来搭建个人博客是非常合适的。用到的资源基本全部免费，而且能够保证国内国外的用户，都能正常访问。大家如果感兴趣，可以自己动手搭建一个。<br><a class="fancybox fancybox.image" href="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%8D%9A%E5%AE%A2%E6%95%88%E6%9E%9C.png" itemscope="" itemtype="http://schema.org/ImageObject" itemprop="url" data-fancybox="default" rel="default" title="博客效果" data-caption="博客效果"><img src="https://tyxiaoming.top/%E5%8D%9A%E5%AE%A2/%E5%8D%9A%E5%AE%A2%E6%95%88%E6%9E%9C.png" alt="博客效果" width="700"></a><figcaption aria-hidden="true" class="image-caption">博客效果</figcaption></p>

                
              </div>
            
            <hr>
            <div>
              <div class="post-metas my-3">
  
  
    <div class="post-meta">
      <i class="iconfont icon-tags"></i>
      
        <a href="/tags/%E5%B7%A5%E5%85%B7%E6%95%99%E7%A8%8B/" class="print-no-link">#工具教程</a>
      
    </div>
  
</div>


              
  

  <div class="license-box my-3">
    <div class="license-title">
      <div>搭建免费个人博博客：Cloudflare+GitHub+Hexo Fluid</div>
      <div>https://syuanyuan708-github-io.pages.dev/2025/01/21/搭建免费个人博博客/</div>
    </div>
    <div class="license-meta">
      
        <div class="license-meta-item">
          <div>作者</div>
          <div>陶渊小明</div>
        </div>
      
      
        <div class="license-meta-item license-meta-date">
          <div>发布于</div>
          <div>2025年1月21日</div>
        </div>
      
      
      
        <div class="license-meta-item">
          <div>许可协议</div>
          <div>
            
              
              
                <a class="print-no-link" target="_blank" href="https://creativecommons.org/licenses/by/4.0/">
                  <span class="hint--top hint--rounded" aria-label="BY - 署名">
                    <i class="iconfont icon-cc-by"></i>
                  </span>
                </a>
              
            
          </div>
        </div>
      
    </div>
    <div class="license-icon iconfont"></div>
  </div>



              
                <div class="post-prevnext my-3">
                  <article class="post-prev col-6">
                    
                    
                      <a href="/2025/01/22/%E5%85%8D%E8%B4%B9PDF%E7%BF%BB%E8%AF%91%E7%A5%9E%E5%99%A8%EF%BC%9A%E4%BF%9D%E7%95%99%E6%8E%92%E7%89%88%E6%A0%B7%E5%BC%8F%EF%BC%8C%E7%A7%91%E7%A0%94%E5%85%9A%E5%BF%85%E5%A4%87/" title="免费PDF翻译神器：保留排版样式，科研党必备！3分钟完成本地部署，无限使用次数">
                        <i class="iconfont icon-arrowleft"></i>
                        <span class="hidden-mobile">免费PDF翻译神器：保留排版样式，科研党必备！3分钟完成本地部署，无限使用次数</span>
                        <span class="visible-mobile">上一篇</span>
                      </a>
                    
                  </article>
                  <article class="post-next col-6">
                    
                    
                      <a href="/2025/01/12/%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A/" title="个人图床最佳方案：Cloudflare R2+PicGo">
                        <span class="hidden-mobile">个人图床最佳方案：Cloudflare R2+PicGo</span>
                        <span class="visible-mobile">下一篇</span>
                        <i class="iconfont icon-arrowright"></i>
                      </a>
                    
                  </article>
                </div>
              
            </div>

            
  
  
    <article id="comments">
      
  <script type="text/javascript">
    Fluid.utils.loadComments('#comments', function() {
      var light = 'github-light';
      var dark = 'github-dark';
      var schema = document.documentElement.getAttribute('data-user-color-scheme');
      if (schema === 'dark') {
        schema = dark;
      } else {
        schema = light;
      }
      window.UtterancesThemeLight = light;
      window.UtterancesThemeDark = dark;
      var s = document.createElement('script');
      s.setAttribute('src', 'https://utteranc.es/client.js');
      s.setAttribute('repo', 'syuanyuan708/syuanyuan708.github.io');
      s.setAttribute('issue-term', 'title');
      
      s.setAttribute('label', 'utterances');
      
      s.setAttribute('theme', schema);
      s.setAttribute('crossorigin', 'anonymous');
      document.getElementById('comments').appendChild(s);
    })
  </script>
  <noscript>Please enable JavaScript to view the comments</noscript>


    <div class="utterances" style="height: 383px;">
    <iframe class="utterances-frame" title="Comments" scrolling="no" src="https://utteranc.es/utterances.html?src=https%3A%2F%2Futteranc.es%2Fclient.js&amp;repo=syuanyuan708%2Fsyuanyuan708.github.io&amp;issue-term=title&amp;label=utterances&amp;theme=github-dark&amp;crossorigin=anonymous&amp;url=https%3A%2F%2Ftyxiaoming.xin%2F2025%2F01%2F21%2F%25E6%2590%25AD%25E5%25BB%25BA%25E5%2585%258D%25E8%25B4%25B9%25E4%25B8%25AA%25E4%25BA%25BA%25E5%258D%259A%25E5%258D%259A%25E5%25AE%25A2%2F&amp;origin=https%3A%2F%2Ftyxiaoming.xin&amp;pathname=2025%2F01%2F21%2F%25E6%2590%25AD%25E5%25BB%25BA%25E5%2585%258D%25E8%25B4%25B9%25E4%25B8%25AA%25E4%25BA%25BA%25E5%258D%259A%25E5%258D%259A%25E5%25AE%25A2%2F&amp;title=%E6%90%AD%E5%BB%BA%E5%85%8D%E8%B4%B9%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%8D%9A%E5%AE%A2%EF%BC%9ACloudflare%2BGitHub%2BHexo+Fluid+-+%E9%99%B6%E6%B8%8A%E5%B0%8F%E6%98%8E&amp;description=%E5%89%8D%E8%A8%80%E5%9C%A8%E4%B8%8A%E4%B8%80%E7%AF%87%E6%96%87%E7%AB%A0%EF%BC%8C%E6%88%91%E4%BB%AC%E5%B7%B2%E7%BB%8F%E4%BD%BF%E7%94%A8+Cloudflare+R2+%E5%92%8C+PicGo+%E6%90%AD%E5%BB%BA%E4%BA%86%E4%B8%80%E4%B8%AA%E5%85%8D%E8%B4%B9%E5%9B%BE%E5%BA%8A%E3%80%82%E4%BB%8A%E5%A4%A9%E6%88%91%E4%BB%AC%E6%9D%A5%E7%BB%A7%E7%BB%AD%E5%AE%8C%E6%88%90%EF%BC%8C%E5%8D%9A%E5%AE%A2%E7%BD%91%E7%AB%99%E7%9A%84%E6%90%AD%E5%BB%BA%E3%80%82%E4%BD%9C%E4%B8%BA%E4%B8%80%E4%B8%AA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%8C%E6%88%91%E4%BB%AC%E5%B8%8C%E6%9C%9B%E8%BF%99%E4%B8%AA%E7%BD%91%E7%AB%99%E8%83%BD%E5%A4%9F%E5%85%B7%E6%9C%89%E4%BB%A5%E4%B8%8B%E4%BC%98%E7%82%B9%EF%BC%9A++%E6%9C%80%E5%A5%BD%E6%98%AF%E5%85%8D%E8%B4%B9%E7%9A%84%EF%BC%8C%E4%B8%8D%E9%9C%80%E8%A6%81%E9%A2%9D%E5%A4%96%E8%B4%AD%E4%B9%B0%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8+%E7%BB%B4%E6%8A%A4%E5%B0%BD%E9%87%8F%E7%AE%80%E5%8D%95%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AA%E7%94%A8%E5%AE%83%E5%8F%91%E5%B8%83%E6%96%87&amp;og%3Atitle=%E6%90%AD%E5%BB%BA%E5%85%8D%E8%B4%B9%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%8D%9A%E5%AE%A2%EF%BC%9ACloudflare%2BGitHub%2BHexo+Fluid&amp;session=" loading="lazy"></iframe>
  </div></article>
  


          </article>