import{_ as e,o as l,c as i,e as t}from"./app-iph3vjA0.js";const a={},o=t('<h5 id="_1、jsonp的产生" tabindex="-1"><a class="header-anchor" href="#_1、jsonp的产生" aria-hidden="true">#</a> 1、JSONP的产生</h5><p><strong>背景:</strong></p><ul><li><p>因为浏览器同源策略限制,AJAX跨域请求不到信息</p></li><li><p>Web页面上面调用js文件不受是否跨域影响(类似的还有<code>&lt;script&gt;</code>,<code>&lt;IMG&gt;</code>,<code>&lt;iframe&gt;</code>)</p></li><li><p>于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、Web socket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；</p></li><li><p>恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被JS原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；</p></li><li><p>客户端在对JSON文件调用成功之后,也就获得了自己所需要的数据,剩下的就是按自己的需求进行处理和展现了</p></li><li><p>为了方便客户使用数据,逐渐形成了一种非正式传输协议---JSONP.</p><blockquote><p>该协议允许用户传递一个callback参数给服务端,然后服务端返回数据时会将这个callback参数坐会函数名来包裹JSON数据,这样客户端就可以随意订制自己的函数来自动处理返回函数了</p></blockquote></li></ul><h5 id="_2、jsonp弊端" tabindex="-1"><a class="header-anchor" href="#_2、jsonp弊端" aria-hidden="true">#</a> 2、JSONP弊端</h5><ul><li>只能发送get请求</li><li>需要服务端配合</li></ul><h5 id="_3、json流程" tabindex="-1"><a class="header-anchor" href="#_3、json流程" aria-hidden="true">#</a> 3、JSON流程</h5><ul><li>先定义好全局函数</li><li>动态创建script标签</li><li>给服务器提供事先创建好的容器</li><li>服务器获取容器</li><li>将内容填充进容器</li></ul>',7),c=[o];function s(n,r){return l(),i("div",null,c)}const p=e(a,[["render",s],["__file","JsonP.html.vue"]]);export{p as default};