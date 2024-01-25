import{_ as n,o as s,c as a,e}from"./app-iph3vjA0.js";const t={},p=e(`<h1 id="redux-的基础概念" tabindex="-1"><a class="header-anchor" href="#redux-的基础概念" aria-hidden="true">#</a> Redux 的基础概念</h1><p>什么是Redux?</p><p>Redux 是 JavaScript 状态容器，提供可预测化的状态管理。</p><h2 id="三个基本原则" tabindex="-1"><a class="header-anchor" href="#三个基本原则" aria-hidden="true">#</a> 三个基本原则</h2><ul><li>整个应用只有一个可信数据源 --- store</li><li>State只能通过Action更改</li><li>State的更改只能写成一个纯函数,也就是每次更改必须返回一个新的State------Reducer</li></ul><h2 id="action" tabindex="-1"><a class="header-anchor" href="#action" aria-hidden="true">#</a> Action</h2><p>Action 就是一个单纯的包含 { type , pyload }的对象,</p><ul><li><p>type 用来标识动作类型</p></li><li><p>pyload用来携带数据</p></li><li><p>Action需要通过store.dispatch()方法来发送</p></li></ul><p>比如一个最简单的 action：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Build my first Redux app&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reducers" tabindex="-1"><a class="header-anchor" href="#reducers" aria-hidden="true">#</a> Reducers</h2><p>Reducers用来处理Action触发的对状态的更改</p><p>Reducer接受<code>oldState</code>和<code>action</code>两个参数,并返回一个新的state</p><p>一个Reducer_demo:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">&#39;b&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">someApp</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;CHANGE_A&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;Modified a&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;CHANGE_B&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> action<span class="token punctuation">.</span>payload <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Reducer 也是 <strong>pure function</strong>，这点非常重要，所以绝对不要在 reducer 里面做一些引入 side-effects 的事情，比如：</p><ul><li>直接修改 state 参数对象</li><li>请求 API</li><li>调用不纯的函数，比如 <code>Data.now()</code> <code>Math.random()</code></li></ul><p>因为 Redux 里面只有一个 Store，对应一个 State 状态，所以整个 State 对象就是由一个 reducer 函数管理，但是如果所有的状态更改逻辑都放在这一个 reducer 里面，显然会变得越来越巨大，越来越难以维护。得益于纯函数的实现，我们只需要稍微变通一下，让状态树上的每个字段都有一个 reducer 函数来管理就可以拆分成很小的 reducer 了：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">someApp</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token function">reducerA</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>a<span class="token punctuation">,</span> action<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token function">reducerB</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>b<span class="token punctuation">,</span> action<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Redux 提供了一个工具函数 <code>combineReducers</code> 来简化这种 reducer 合并：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> someApp <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> reducerA<span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> reducerB
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> Store</h2><p>现在有了 Action 和 Reducer，Store 的作用就是连接这两者，Store 的作用有这么几个：</p><ul><li>Hold 住整个应用的 State 状态树</li><li>提供一个 <code>getState()</code> 方法获取 State</li><li>提供一个 <code>dispatch()</code> 方法发送 action 更改 State</li><li>提供一个 <code>subscribe()</code> 方法注册回调函数监听 State 的更改</li></ul><p>创建一个 Store 很容易，将 <strong>root reducer</strong> 函数传递给 <code>createStore</code> 方法即可：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> someApp <span class="token keyword">from</span> <span class="token string">&#39;./reducers&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>someApp<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 你也可以额外指定一个初始 State（initialState），这对于服务端渲染很有用</span>
<span class="token comment">// let store = createStore(someApp, window.STATE_FROM_SERVER);</span>

<span class="token keyword">let</span> unsubscribe <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Dispatch</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CHANGE_A&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CHANGE_B&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">payload</span><span class="token operator">:</span> <span class="token string">&#39;Modified b&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Stop listening to state updates</span>
<span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="redux-和-react-redux-区别" tabindex="-1"><a class="header-anchor" href="#redux-和-react-redux-区别" aria-hidden="true">#</a> Redux 和 React-Redux 区别</h1><h3 id="_1-redux" tabindex="-1"><a class="header-anchor" href="#_1-redux" aria-hidden="true">#</a> 1.Redux</h3><p>用户视图层的操作执行了dispatch,</p><p>dispatch又调用了Reducers函数,</p><p>Reducers获取当前状态state进行业务处理,形成一个newState保存到Store仓库中,</p><p>Store所有依赖的视图层发生同步更新<img src="https://s3.ax1x.com/2020/11/17/DVtjnP.png" alt="redux数据流"></p><p>限制:只能在当前这一层进行传递,如果项目关系比较复杂,层次比较深 , 只能用props进行逐层传递------&gt;<strong>redux不能进行跨层级获取数据</strong>----&gt;React-Redux解决</p><h3 id="_2-react-redux" tabindex="-1"><a class="header-anchor" href="#_2-react-redux" aria-hidden="true">#</a> 2.React-Redux</h3><p><img src="https://s3.ax1x.com/2020/11/17/DVNPpj.png" alt="react-redux工作流程2"></p>`,35),o=[p];function c(i,r){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","React-Redux.html.vue"]]);export{u as default};