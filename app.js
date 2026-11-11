'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let slides=window.COURSE,index=0;
function image(a,caption=''){return `<div class="media"><img src="${esc(a.src)}" alt="${esc(caption||'原课件参考素材')}" data-full="${esc(a.src)}" loading="eager"></div>`}
function crop(a,l=0,t=0,r=0,b=0){let ratio=(a.w*(1-l-r))/(a.h*(1-t-b));return `<div class="media"><div class="crop" data-ratio="${ratio}" data-full="${esc(a.src)}" style="aspect-ratio:${ratio}"><img src="${esc(a.src)}" alt="原课件实验图组，点击查看完整源图" style="width:${100/(1-l-r)}%;height:${100/(1-t-b)}%;left:${-100*l/(1-l-r)}%;top:${-100*t/(1-t-b)}%"></div></div>`}
function title(d,html){return `<div class="text"><p class="eyebrow">MIDJOURNEY / ${d.src<14?'VISUAL RESEARCH':d.src<20?'MODEL & CONTROL':d.src<25?'PROMPT EXPERIMENT':'STYLE REFERENCE'}</p><h1>${html||esc(d.title).replace(/\n/g,'<br>')}</h1>${d.subtitle?`<p class="subtitle">${esc(d.subtitle)}</p>`:''}<p class="body">${esc(d.body||'')}</p>${d.siteUrl?`<a class="reference-link" href="${esc(d.siteUrl)}" target="_blank" rel="noopener noreferrer">打开网站 ↗</a>`:''}${d.notesButton?'<button class="panel-button" data-notes>展开任务原文 · 可复制</button>':''}</div>`}
function visual(d){return d.images.length?`<div class="visual">${image(d.images[0],d.title)}</div>`:''}
const LESSONS=[['01','用 Midjourney 找到你的画面','会找参考、会用 AI 写提示词，让生成带上你的判断。'],['02','角色设计与动态展示','从五人群像出发，连接参考、提示词、生成筛选与动态展示。'],['03','短片角色与CG定版','分阶段确定脸部、服装与CG质感，形成可继续制作的角色资产。'],['04','场景、道具与动态测试','从城市空间走向道具、声音与动态，检查资产能否继续使用。'],['05','故事分镜与视频生成','把角色与场景转成镜头任务，完成从分镜到视频结果的判断。'],['06','剪辑与音乐生成','组织镜头、调整节奏与音乐，让作品经过完整观看与复查。'],['07','机动课','根据大家的进度补课、答疑或加练。']];
const SITES=[['角色、场景、生物的设计方向','从作品研究造型与美术风格',[['ArtStation','https://www.artstation.com/','assets/image3.jpg'],['Behance','https://www.behance.net/','assets/image2.jpg'],['Pinterest','https://www.pinterest.com/','assets/image1.jpg']]],['电影画面','构图、光影、色彩与氛围',[['ShotDeck','https://shotdeck.com/','assets/image4.jpg']]],['传统纹样、器物与材质','为原创设计建立依据，保留出处',[['故宫数字文物库','https://digicol.dpm.org.cn/','assets/image5.jpg'],['书格','https://www.shuge.org/','assets/image6.jpg']]],['镜头、动态与节奏','观看后记录具体问题',[['哔哩哔哩','https://www.bilibili.com/','assets/image9.jpg'],['新片场','https://www.xinpianchang.com/','assets/image10.jpg']]],['AI 视频作品与制作入口','观察作品呈现，分开收集参考与工具',[['LibTV','https://www.liblib.tv/','assets/image7.jpg'],['TapNow / TapTV','https://app.tapnow.ai/home/taptv','assets/image8.jpg'],['Higgsfield','https://higgsfield.ai/zh','']]],['国内灵感与审美积累','日常多看，积累审美',[['花瓣','https://huaban.com/',''],['站酷','https://www.zcool.com.cn/',''],['小红书','https://www.xiaohongshu.com/','']]]];
function openSlide(d){
if(d.kind==='open-cover')return['open-cover',`<p class="eyebrow">VISUAL DESIGN · AI FILMMAKING</p><h1 class="open-title">AI 视频<br><em>智能生成</em></h1><div class="open-cover-foot"><p>以个人制作经验、案例拆解与流程讲解为主，<br>把一个想法发展成视觉统一、故事基本连贯的 AI 短片。</p><dl><div><dt>07</dt><dd>节课</dd></div><div><dt>3h</dt><dd>每节</dd></div><div><dt>01</dt><dd>今天</dd></div></dl></div>`];
if(d.kind==='open-film')return['open-film',`<div class="open-head"><p class="eyebrow">开场 · 先看结果</p><h1>先看一部<em>成片</em></h1><p>六节课结束时，你也会做出这样一部短片。</p></div>${d.video?`<div class="film-frame"><video src="${esc(d.video)}" controls playsinline preload="metadata"></video></div>`:'<div class="film-frame film-empty"><span>▶</span><b>在这里放入开场短片</b><small>1–2 分钟 · 视频放入 assets/ 后填写 data.js 中 open-film 的 video 字段</small></div>'}`];
if(d.kind==='open-roadmap')return['open-roadmap',`<div class="open-head"><p class="eyebrow">COURSE MAP · 01 — 06</p><h1>六节正课，一条<em>完整流程</em></h1><p>从一个想法，到一部能完整观看的短片。另有一节机动课。</p></div><ol class="roadmap">${LESSONS.map(([number,name,description],i)=>{
 const page=slides.findIndex(slide=>slide.kind==='lesson-opening'&&(slide.lessonNumber??'01')===number)+1;
 const card=`<span>${number}${i===0?' · 今天':''}</span><h2>${name}</h2><p>${description}</p>`;
 const style=i===0?'now':number==='07'?'spare':'';
 return `<li class="${style}${page?' linked':''}">${page?`<a class="roadmap-entry" href="#${page}">${card}</a>`:card}</li>`;
}).join('')}</ol><p class="roadmap-line">想法 → 参考与方向 → 角色 → 场景与道具 → 分镜与视频 → 剪辑与音乐</p>`];
if(d.kind==='lesson-opening'){
 const number=d.lessonNumber??'01';
 const [firstLine,secondLine]=d.heading??['用 Midjourney','找到你的画面'];
 return ['lesson-opening',`
  <span class="lesson-opening-number" aria-hidden="true">${esc(number)}</span>
  <div class="lesson-opening-copy">
    <p class="eyebrow">第 ${Number(number)} 节 · LESSON ${esc(number)}</p>
    <h1>${esc(firstLine)}<br><em>${esc(secondLine)}</em></h1>
    <p class="body">${esc(d.body)}</p>
  </div>`];
}
if(d.kind==='open-idea'){const a=window.COURSE.find(s=>s.src===24).images[0],b=window.COURSE.find(s=>s.src===30).images[0];return['open-idea',`<div class="open-head"><p class="eyebrow" style="text-transform:none">01.1 Midjourney</p><h1>生成很便宜，<em>判断才值钱</em></h1><p>AI 让出图变快，作品的方向仍然由你的选择决定。</p></div><div class="idea-pair"><figure><div class="idea-img">${crop(a,0,0,.21,2/3)}</div><figcaption><b>随手一句提示词</b><span>只写「Character design」，得到模型的默认审美</span></figcaption></figure><span class="idea-arrow">→</span><figure><div class="idea-img">${crop(b,0,0,.285,.5)}</div><figcaption><b>有依据的选择</b><span>参考 + 情绪板 + 对照筛选，画面开始有方向</span></figcaption></figure></div>`];}
if(d.kind==='open-today'){const rows=[['15′','开场','课程路线 · 为什么讲 Midjourney'],['35′','01 参考与研究','按问题找参考 · AI 对话做研究'],['20′','02 模型与参数','扩散原理 · Raw / Stylize · Niji 与 V7 / V8'],['40′','03 对照实验','实验卡 · Midjourney 现场生成'],['10′','休息',''],['45′','04 风格','Style Reference · Moodboard · Personalize · 原创角色'],['15′','收尾','总结 · 作业 · 下节预告']];return['open-today',`<div class="open-head"><p class="eyebrow" style="text-transform:none">01.1 Midjourney</p><h1>今天的<em>流程</em></h1></div><div class="today-grid"><ol class="today-list">${rows.map(r=>`<li class="${r[1]==='休息'?'rest':''}"><span>${r[0]}</span><b>${r[1]}</b><small>${r[2]}</small></li>`).join('')}</ol><div class="today-take"><span>今天带走</span><h2>一套选定美术方向的方法</h2><p>参考 → 生成 → 对照 → 判断 → 记录</p><h2>一个初步选定的方向</h2><p>作为第 2 节角色设计的起点</p></div></div>`];}
if(d.kind==='divider'){
 const number=esc(d.no).replace('.','<span class="divider-dot">.</span>');
 return ['divider',`<span class="divider-no" data-number="${esc(d.no)}">${number}</span><div class="divider-copy"><p class="eyebrow">${esc(d.time)}</p><h1>${esc(d.title)}</h1><p class="body">${esc(d.body)}</p></div>`];
}
if(d.kind==='sites')return['sites',`<div class="open-head"><p class="eyebrow">VISUAL RESEARCH · 网站总览</p><h1>按<em>问题</em>找参考</h1><p>先写清要解决的视觉问题，再选网站。部分网站需要特殊网络环境，网络不好时点「截图」。</p></div><table class="sites-table"><thead><tr><th>我要解决的问题</th><th>去哪找</th><th>看什么</th></tr></thead><tbody>${SITES.map(r=>`<tr><td>${r[0]}</td><td>${r[2].map(s=>`<span class="site-chip"><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${s[0]} ↗</a>${s[2]?`<button class="site-shot" data-full="${s[2]}" aria-label="${s[0]} 截图">截图</button>`:''}</span>`).join('')}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table><ol class="sites-steps"><li><b>01</b>搜什么关键词</li><li><b>02</b>怎么筛选</li><li><b>03</b>怎么收藏 / 保存</li><li><b>04</b>记下出处和借用点</li></ol>`];
if(d.kind==='why-mj')return['why-mj',`<div class="open-head"><p class="eyebrow" style="text-transform:none">01.1 Midjourney</p><h1>今天为什么讲 <em>Midjourney</em></h1><p>先探索 AI 生成的魅力，从审美默认值高的模型开始。</p></div><div class="why-grid"><section class="main"><span>Midjourney</span><h2>审美口碑第一梯队</h2><p>和 Flux、Ideogram、部分 SD 微调模型并列。</p><p>赢在「默认就好看」：提示词不用写很多，画面也有设计感。</p></section><section><span>GPT Image · Nano Banana · 即梦</span><h2>训练的图片集更广</h2><p>写实摄影、文字排版、可控性上，常常比 MJ 更强。</p><p>但要生成设计感很强、艺术变化大的图片，有一定门槛。</p></section></div><p class="exp-foot">GPT Image 不只是图片模型，背后还有语言大模型会根据你的话思考。后面的课再讲怎么用。</p>`];
if(d.kind==='mj-plan')return['mj-plan',`
  <div class="open-head">
    <p class="eyebrow" style="text-transform:none">01.1 Midjourney</p>
    <h1>${esc(d.title)}</h1>
    <p>用 Google 或 Discord 账号登录，再按生成需求选择订阅。</p>
  </div>
  <dl class="plan-stats">
    <div><dt>$30</dt><dd>Standard 月付</dd></div>
    <div><dt>15 小时</dt><dd>每月快速生成额度</dd></div>
    <div><dt>Relax</dt><dd>可排队不限量生成图片</dd></div>
  </dl>
  <p class="plan-share"><b>每个账号供一人使用</b><a class="reference-link" href="https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans" target="_blank" rel="noopener noreferrer">查看官方套餐 ↗</a></p>`];
if(d.kind==='research-summary'){const c=[['构图与视线','主体不一定要大。用最强的明暗或冷暖对比把它「点亮」，再用透视线把视线送过去。'],['明暗与色彩','先定一个主色调，再用少量对比色点在主体上。'],['疏密、尺度与纵深','想让东西显得巨大，就在旁边放一个很小的参照物，再用前景把画面框住。']];return['research-summary',`<div class="open-head"><p class="eyebrow">VISUAL RESEARCH · 总结</p><h1>一张图<em>为什么好看</em></h1></div><ol class="summary-list">${c.map((x,i)=>`<li><span>0${i+1}</span><h2>${x[0]}</h2><p>${x[1]}</p></li>`).join('')}</ol><p class="summary-foot"><b>看图时逐项问</b>造型、构图与纵深 · 配色、明度与饱和度 · 疏密、尺度与反差 · 氛围与空气透视</p>`];}
if(d.kind==='research-output'){const st=['一批顶级概念设计图','语言大模型逐项分析美感来源','研究报告 + 10 套提示词','回到 Midjourney 测试'];return['research-output',`<div class="output-text"><p class="eyebrow">VISUAL RESEARCH · 研究产出</p><h1>没有想法时，<br>用语言大模型<br><em>推演画面</em></h1><ol class="output-flow">${st.map(x=>`<li>${x}</li>`).join('')}</ol></div><figure class="task-prompt"><figcaption><b>任务原文</b><button data-copy="${esc(d.prompt)}">复制</button>${d.chatUrl?`<a href="${esc(d.chatUrl)}">打开 Codex 对话 ↗</a>`:''}</figcaption><p>${esc(d.prompt)}</p></figure>`];}
if(d.kind==='develop'){const rows=[['assets/develop-darkroom.jpg','暗房','画面在显影液里慢慢浮现','暗房显影五个阶段：空白相纸到清晰的猫'],['assets/develop-ai.jpg','AI','画面从噪点里一步步显出来','AI 去噪五个阶段：彩色噪点到清晰的猫']];return['develop',`<div class="open-head"><p class="eyebrow">MODEL / HOW IT GENERATES</p><h1>AI 生图，像<em>暗房显影</em></h1></div><div class="develop-grid"><div class="develop-rows">${rows.map(r=>`<figure><figcaption><b>${r[1]}</b>${r[2]}</figcaption><img src="${r[0]}" alt="${r[3]}" data-full="${r[0]}"></figure>`).join('')}<p class="develop-steps"><span>开始</span><span>→</span><span>清晰</span></p></div><aside class="develop-rules"><span>AI 学到的猫的规律</span><ol><li>耳朵是三角形，长在头顶</li><li>眼睛一左一右</li><li>胡须向两边</li><li>毛顺着一个方向</li></ol><p>提示词告诉它往哪个方向显影。</p></aside></div><p class="exp-foot">AI 不是把猫的照片拼起来，而是学会了规律，再从噪点里「显」出一只新猫。</p>`];}
if(d.kind==='find-refs'){const g=[['2D 风格','平面、插画、动画感',['2D illustration','cel shading','flat color','painterly','line art','anime key visual']],['3D 风格','体积、材质、渲染感',['3D render','stylized 3D','clay','octane render','game character','CG concept art']]];return['find-refs',`<div class="open-head"><p class="eyebrow">STYLE / 现场找参考</p><h1>现场找<em>参考图片</em></h1><p>2D、3D 各找一组，存进同一个文件夹，接下来的 Style Reference 和 Moodboard 都要用。</p></div><div class="refs-grid">${g.map(x=>`<section><span>${x[1]}</span><h2>${x[0]}</h2><p>搜索关键词 · 点击复制</p><div class="refs-keys">${x[2].map(k=>`<button data-copy="${k}">${k}</button>`).join('')}</div></section>`).join('')}</div><ol class="sites-steps"><li><b>01</b>用网站搜关键词</li><li><b>02</b>挑出想要的风格</li><li><b>03</b>说出为什么选它</li><li><b>04</b>存进参考文件夹</li></ol>`];}
if(d.kind==='style-tools'){const t=[['Style Reference','风格参考','一两张图','「我要这个发型」','拿一张明星照片给发型师看','想要某一张图的风格'],['Moodboard','情绪板','一组图','「我喜欢这种感觉」','拿一组照片给发型师看','想建立一个整体的视觉方向'],['Personalize','个人化','你挑图时的喜好','「老样子」','常去的发型师已经了解你','想让结果偏向你自己的审美']];return['style-tools',`<div class="open-head"><p class="eyebrow">STYLE / 三种方式</p><h1>告诉 AI 你要的<em>风格</em></h1><p>就像跟发型师沟通。</p></div><div class="tools-grid">${t.map(x=>`<section><span>${x[1]}</span><h2>${x[0]}</h2><p class="tools-say">${x[3]}</p><p>${x[4]}</p><dl><div><dt>你给它</dt><dd>${x[2]}</dd></div><div><dt>适合</dt><dd>${x[5]}</dd></div></dl></section>`).join('')}</div>`];}
if(d.kind==='mj-shot')return['mj-shot',`<div class="open-head"><p class="eyebrow">${esc(d.eyebrow)}</p><h1>${d.head}</h1><p>${esc(d.lead)}${d.link?` <a class="reference-link" href="${esc(d.link)}" target="_blank" rel="noopener noreferrer">打开网站 ↗</a>`:''}</p></div><div class="visual">${image({src:d.image},d.alt)}</div>${d.steps?`<ol class="shot-steps">${d.steps.map((s,i)=>`<li><b>0${i+1}</b>${esc(s)}</li>`).join('')}</ol>`:''}`];
if(d.kind==='exp-card'){const steps=[['固定','提示词、比例、模型版本，最好再加 --seed'],['只改一个变量','Standard / Raw，或 Stylize 0 / 100 / 300'],['先预测','生成前先问：你觉得会怎样变？'],['生成','同一批次并排放，看差异'],['一句话结论','变量 → 变化 → 什么时候用']];return['exp-card',`<div class="open-head"><p class="eyebrow">EXPERIMENT CARD</p><h1>实验卡：<em>只改一个变量</em></h1><p>后面每一组实验，都按这五步走。</p></div><ol class="exp-steps">${steps.map((s,i)=>`<li><span>0${i+1}</span><h2>${s[0]}</h2><p>${s[1]}</p></li>`).join('')}</ol><p class="exp-foot">原课件截图未记录 seed，后面几组只代表那一次样例；现场生成时按这张卡重新验证。</p>`];}
if(d.kind==='look'){const qs=d.annot?`<div class="look-questions">${d.questions.map((q,i)=>`<button data-layer="${i+1}"><span>Q${i+1}</span>${esc(q)}</button>`).join('')}<div class="layer-switch"><button data-layer="0" class="on">原图</button><button data-layer="all">全部标注</button></div></div>`:`<ol class="look-questions">${d.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol>`;
const pic=d.annot?`<div class="visual"><div class="media look-media"><img src="${esc(d.image)}" alt="${esc(d.title)}示例图" data-full="${esc(d.image)}" loading="eager">${annotSvg(d.annot)}</div></div>`:d.image?`<div class="visual">${image({src:d.image},d.title)}</div>`:`<div class="look-empty"><b>示例图待放入</b><small>在 data.js 中填写 look-${esc(d.no)} 的 image 字段</small></div>`;
return['look',`<div class="look-text"><p class="eyebrow">什么样的图好看 · 画面关系 ${esc(d.no)}</p><h1>${esc(d.title)}</h1><p class="body">${esc(d.body)}${d.annot?'　点问题看标注':''}</p>${qs}</div>${pic}`];}
if(d.kind==='niji-prompts')return['niji-prompts',`<div class="open-head"><p class="eyebrow">MODEL CHOICE · 现场测试</p><h1>同一提示词，<em>换模型</em>再看</h1><p>每条分别加 --niji 7、--v 7、--v 8 生成，并排比较。</p></div><div class="prompt-cards">${window.NIJI_PROMPTS.map(p=>`<figure class="prompt-card"><figcaption><b>${esc(p[0])}</b><button data-copy="${esc(p[1])}">复制</button></figcaption><p>${esc(p[1])}</p></figure>`).join('')}</div><p class="exp-foot">提示词里不写艺术家和风格词，模型自己的默认倾向更容易看出来。</p>`];
if(d.kind==='close-recap'){const steps=[['参考','01 参考与研究','按问题找网站 · 看懂画面关系'],['生成','02 模型与参数','Raw / Stylize · Niji 与 V7、V8'],['对照','03 对照实验','实验卡：只改一个变量'],['判断','04 风格','情绪板 · Personalize']];return['close-recap',`<div class="open-head"><p class="eyebrow">RECAP · 今天学了什么</p><h1>一条可以<em>反复走</em>的路</h1><p>每次选美术方向，都可以按这四步走一遍。</p></div><ol class="recap-loop">${steps.map((s,i)=>`<li><span>0${i+1}</span><h2>${s[0]}</h2><b>${s[1]}</b><p>${s[2]}</p></li>`).join('')}</ol><p class="recap-back">每一步都是你在做选择，让 AI 生成的画面，打上你自己的<em>烙印</em>。</p>`];}
if(d.kind==='close-log')return['close-log',`<div class="open-head"><p class="eyebrow">SELF-LEARNING · 自己继续学</p><h1>学习<em>记录模板</em></h1><p>每做一次实验，写一行。</p></div><table class="log-table"><thead><tr><th>问题</th><th>尝试</th><th>结果</th><th>结论</th></tr></thead><tbody><tr class="example"><td>Raw 和 Standard 差在哪？</td><td>同一提示词「Ruan Jia」，Stylize 100，分别生成</td><td>Standard 出了绘画角色；Raw 出了真人照片</td><td>只写名字不可靠，要写清风格和媒介</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></tbody></table><p class="exp-foot">第一行是今天实验 01 的例子。表格可以记在笔记软件里，也可以直接问 AI 帮你整理。</p>`];
if(d.kind==='close-homework')return['close-homework',`<div class="open-head"><p class="eyebrow">HOMEWORK · 为第 2 节准备</p><h1>作业：选定你的<em>美术方向</em></h1><p>给自己的短片定一个主题，按今天的方法做一遍。</p></div><div class="hw-tiers"><section><span>基础档 · 不需要 Midjourney</span><ol><li>给自己的短片定一个主题</li><li>收集参考图片，建立自己的图片参考库</li><li>用 GPT 分析你喜欢的这些参考，制作研究报告</li></ol></section><section class="full"><span>完整档 · 有 Midjourney 账号</span><ol><li>完成基础档全部内容</li><li>建一个 Moodboard</li><li>按实验卡跑 3 组对照</li></ol></section></div><p class="hw-foot"><b>关于账号</b>　还没有 Midjourney 账号的同学先完成基础档。　<span>提交方式另行通知</span></p>`];
if(d.kind==='close-next'){const a=window.COURSE.find(s=>s.src===30).images[0];return['close-next',`<div class="next-text"><p class="eyebrow">NEXT · 第 2 节</p><h1>角色设计与<br><em>动态展示</em></h1><ol class="next-steps"><li><span>01</span>五人群像</li><li><span>02</span>用群像做视频</li><li><span>03</span>不同风格的单人角色设计</li></ol><p class="body">带上今天选定的美术方向，它就是下节课的起点。</p></div><div class="visual">${crop(a,0,0,.285,.5)}</div>`];}
}
function expStrip(){const steps=[['固定','提示词、比例、模型版本，最好加 --seed'],['只改一个变量','Standard / Raw，或 Stylize 0 / 100 / 300'],['先预测','你觉得会怎样变？'],['生成','同一批次并排看差异'],['一句话结论','变量 → 变化 → 什么时候用']];return `<ol class="exp-strip" aria-label="实验卡"><li class="head">实验卡</li>${steps.map((x,i)=>`<li><span>0${i+1}</span><b>${x[0]}</b><small>${x[1]}</small></li>`).join('')}</ol>`}
function annotSvg(layers){
const st={y:'stroke="#FFD84D" stroke-width="5" fill="none"',yd:'stroke="#FFD84D" stroke-width="4" stroke-dasharray="16 10" fill="none"',wd:'stroke="#fff" stroke-width="3" stroke-dasharray="12 9" fill="none" opacity=".9"',h:'fill="url(#hatch)" stroke="#FFD84D" stroke-width="3" stroke-dasharray="12 9"',f:'stroke="#fff" stroke-width="2" stroke-dasharray="6 8" opacity=".55"'};
const tw=s=>[...s].reduce((w,c)=>w+(c.charCodeAt(0)>255?32:18),0);
const draw=([k,...a])=>{
 if(k==='c')return`<circle cx="${a[0]}" cy="${a[1]}" r="${a[2]}" ${st[a[3]]}/>`;
 if(k==='e')return`<ellipse cx="${a[0]}" cy="${a[1]}" rx="${a[2]}" ry="${a[3]}" ${st[a[4]]}/>`;
 if(k==='r')return`<rect x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" rx="10" ${st[a[4]]}/>`;
 if(k==='f')return`<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" ${st.f}/>`;
 if(k==='l')return`<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" ${st[a[4]]}/>`;
 if(k==='p')return`<polygon points="${a[0]}" ${st[a[1]]}/>`;
 if(k==='a')return`<path d="${a[0]}" stroke="#FFD84D" stroke-width="6" fill="none" stroke-linecap="round" marker-end="url(#arrow)"/>`;
 if(k==='n')return`<circle cx="${a[0]}" cy="${a[1]}" r="20" fill="#FFD84D"/><text x="${a[0]}" y="${a[1]+8}" text-anchor="middle" font-size="24" font-weight="700" fill="#1c1928">${a[2]}</text>`;
 if(k==='x')return`<circle cx="${a[0]}" cy="${a[1]}" r="26" ${st.y}/><line x1="${a[0]-46}" y1="${a[1]}" x2="${a[0]+46}" y2="${a[1]}" ${st.y}/><line x1="${a[0]}" y1="${a[1]-46}" x2="${a[0]}" y2="${a[1]+46}" ${st.y}/>`;
 if(k==='t'){const w=tw(a[2])+28;return`<g><rect x="${a[0]-14}" y="${a[1]-36}" width="${w}" height="52" rx="10" fill="#11131b" fill-opacity=".85"/><text x="${a[0]}" y="${a[1]}" font-size="32" fill="#fff">${esc(a[2])}</text></g>`;}
 if(k==='s'){let x=a[0];return a[4].map(([c,f,n])=>{const w=a[2]*f,o=`<rect x="${x}" y="${a[1]}" width="${w}" height="${a[3]}" fill="${c}" stroke="#fff" stroke-width="2"/><text x="${x+6}" y="${a[1]+a[3]+34}" font-size="24" fill="#fff">${esc(n)}</text>`;x+=w;return o}).join('');}
 return'';};
return`<svg class="annot" viewBox="0 0 2000 853" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><pattern id="hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="18" height="18" fill="#000" fill-opacity=".35"/><line x1="0" y1="0" x2="0" y2="18" stroke="#FFD84D" stroke-opacity=".35" stroke-width="3"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FFD84D"/></marker></defs>${layers.map((l,i)=>`<g class="layer" data-l="${i+1}">${l.map(draw).join('')}</g>`).join('')}</svg>`;
}
function learningSlide(d){
const art=(i,label)=>`<div class="learning-art" role="img" aria-label="${label}" style="background-position:${i*25}% center"></div>`;
const model=`<svg viewBox="0 0 160 120" aria-label="模型示意" role="img"><g stroke="#66617e" stroke-width="1.5">${[25,60,95].map(y=>[20,60,100].map(z=>`<path d="M25 ${y} L80 ${z} L135 ${y}"/>`).join('')).join('')}</g><g fill="#d7c2e5">${[25,60,95].map(y=>`<circle cx="25" cy="${y}" r="9"/><circle cx="135" cy="${y}" r="9"/>`).join('')}${[20,60,100].map(y=>`<circle cx="80" cy="${y}" r="10"/>`).join('')}</g></svg>`;
return `<div class="learning-head"><div><p class="eyebrow">MODEL / LEARNING & GENERATION</p><h1>图像模型，怎样<em>学会画画？</em></h1></div><figure class="diffusion-inset"><img src="assets/image14.jpg" alt="扩散过程示意：上排向前加噪，下排反向去噪" data-full="assets/image14.jpg"><figcaption><span>上：向前加噪</span><span>下：反向去噪</span></figcaption></figure></div>
<div class="learning-band"><div class="learning-label"><span>01 / TRAIN · 向前加噪</span><h2>训练：<br>学会去噪</h2><b>参数会更新</b></div><div class="training-flow">
<div class="learning-step">${art(4,'清晰竹林白衣人物，教学生成素材')}<h3>图片 + 描述</h3><p>提供大量图文样本</p></div><div class="learning-step">${art(1,'加入噪声后的示意')}<h3>加入已知噪声</h3><p>随机选择噪声强度</p></div><div class="learning-step"><div class="model-art">${model}</div><h3>模型预测噪声</h3><p>结合图像、文字与噪声强度</p></div><div class="learning-step"><div class="loss-art"><span>预测噪声</span><b>↔</b><span>已知噪声</span></div><h3>比较误差</h3><p>预测与已知答案差多少？</p></div><div class="learning-feedback">↶ 根据误差调整模型参数，反复练习</div></div></div>
<div class="learning-band generation"><div class="learning-label"><span>02 / GENERATE · 反向去噪</span><h2>生成：<br>使用规律</h2><b>参数不更新</b><p>文字条件：<br>“竹林里的白衣剑客”</p></div><div class="generation-flow">${[0,1,2,3,4].map((n)=>`<div class="learning-step">${art(n,['随机噪声','弱轮廓示意','结构出现示意','接近清晰示意','新图示意'][n])}<h3>${['随机噪声','出现轮廓','结构渐清','细节成形','生成新图'][n]}</h3></div>`).join('')}<p class="generation-loop">文字引导 + 已训练模型 · 多次预测并去噪 →</p></div></div>
<div class="learning-foot"><span>典型扩散模型科普示意 · AI生成素材，非真实中间采样 · 不代表Midjourney内部架构</span><button data-full="${esc(d.images[0].src)}">查看原课件图 ↗</button></div>`;
}
function conditioningSlide(d){
const a=d.images[0],cut=(x,y,w,h)=>crop(a,x/a.w,y/a.h,1-(x+w)/a.w,1-(y+h)/a.h);
return `<div class="conditioning-head"><p class="eyebrow">TEXT + IMAGE / TWO INPUTS</p><h1>文字提示 + 图片参考<br><em>共同指导生成</em></h1></div><div class="conditioning-flow"><div class="conditioning-inputs"><div class="prompt-input"><span class="input-tag">01 / 文字提示</span><h2>Character design</h2><div class="token-row"><span>Character</span><span>design</span></div><p>分词 → 文本编码<br><small>上方仅为概念分组，非具体分词器结果</small></p></div><div class="reference-input"><span class="input-tag">02 / 图片参考</span><div class="input-images">${cut(204,61,161,224)}${cut(455,61,126,224)}</div><p>视觉特征编码 <span>形态 · 色彩 · 质感</span></p><small>不一定先转换成文字词元</small></div></div><div class="conditioning-model"><span class="merge-arrow">→</span><div class="model-box"><span>两路条件汇入</span><h2>生成模型</h2><p>结合文字与视觉信息<br>指导图像生成</p><div class="model-orbit">✳</div></div><span class="output-arrow">→</span></div><div class="conditioning-output"><div class="output-head"><span class="input-tag">03 / 输出结果</span><span>原课件案例 · ar 3:4</span></div><div class="output-images">${[793,951,1110,1268].map(x=>cut(x,80,152,203)).join('')}</div><p>文字提供方向，图像补充视觉线索。</p></div></div><div class="conditioning-foot"><span>概念示意，不代表特定产品内部实现。输入与输出图片保留原课件案例。</span><button data-full="${esc(a.src)}">查看完整案例原图 ↗</button></div>`;
}
function moodboardSlide(d) {
  const profiles = ['--profile ei8272n', '--profile 6pty78r', '--profile b317h7d', '--profile gjpy44j'];
  const names = ['Tahra', 'Ruanjia', '角色_插画_', '二维画面与造型设计'];
  return `<div class="moodboard-head"><h1>${esc(d.title)}</h1><div class="moodboard-intro"><p>同一猴王设计提示词，搭配不同的视觉参考组。完整提示词在讲解备注。</p><ol class="moodboard-steps"><li>创建 Moodboard</li><li>上传一组参考图</li><li>复制 profile 代码，加在提示词末尾</li></ol></div></div>
    <div class="moodboard-cards">${d.images.slice(1, 5).map((a, i) => `<figure class="moodboard-card"><div class="moodboard-image"><img src="${esc(a.src)}" alt="${esc(names[i])}视觉参考组，点击查看完整原图" data-full="${esc(a.src)}" width="${a.w}" height="${a.h}" loading="eager"></div><figcaption><span class="moodboard-order">0${i + 1}</span><code>${profiles[i]}</code><span class="moodboard-zoom" aria-hidden="true">查看原图 ↗</span></figcaption></figure>`).join('')}</div>`;
}

function render(){const d=slides[index];let cls='',inside='';
const lesson=slides.findLast((slide,page)=>page<=index&&slide.kind==='lesson-opening');
if(d.kind){[cls,inside]=openSlide(d);}
else if(d.src===1){cls='hero hero-panorama wide';inside=`<div class="hero-head"><div><p class="eyebrow" style="text-transform:none">01.1 Midjourney</p><h1>用 Midjourney<br>找到<em>你的画面</em></h1></div><div class="hero-intro"><span class="hero-number">第 1 节 · 共 7 节</span><p>参数、风格参考与原创设计<br>从真实样例中，建立自己的视觉判断。</p><span class="hero-method">观察 / 比较 / 再测试</span></div></div><figure class="hero-art"><img src="assets/hero-landscape.png" width="3376" height="1265" alt="紫蓝色云海与巨型山岩之间，一名旅人沿桥走向远方的建筑" data-full="assets/hero-landscape.png" fetchpriority="high" decoding="async"><figcaption><span>美术方向对照实验 · 场景概念设计</span><span>查看完整图片 ↗</span></figcaption></figure>`;}
else if(d.src===20){cls='reference-focus';inside=title(d)+visual(d);}
else if(d.src===14){cls='learning-focus';inside=learningSlide(d);}
else if([21,22,23].includes(d.src)){cls='experiment full-original'+(d.expStrip?' with-strip':'');inside=(d.expStrip?expStrip():'')+title({...d,subtitle:'',body:d.body},`<em>实验 ${esc(d.subtitle)}</em><br>${esc(d.title).replace(/\n/g,'<br>')}`)+`<div class="visual">${image(d.images[0],'实验 '+d.subtitle+' 原图')}<div class="caption"><span>原图 · 未记录 seed</span></div></div>`;}
else if([30,31].includes(d.src)){cls='experiment';const labels=d.src===30?['厚涂_手绘','二维画面与造型设计']:['二维画面与造型设计','厚涂_手绘'];inside=title({...d,subtitle:d.src===30?'':'生物案例',body:d.body.replaceAll('　','\n')},d.src===30?'原创群像<br><em>情绪板对照</em>':'GRAVIBELL<br><em>生物设计</em>')+`<div class="visual">${[0,1].map(j=>`<div class="compare-item"><div class="compare-label"><span>${labels[j]}</span><small>ar 3:4 · stylize 200</small></div>${crop(d.images[0],0,j*.5,.285,j===0?.5:0)}</div>`).join('')}<div class="caption"><span>${d.src===30?'同一提示词，只换情绪板':'提示词亦有调整，非单变量对照'}</span><b>点击放大 ↗</b></div></div>`;}
else if([16,18].includes(d.src)){cls='wide';const data=d.src===16?[['Standard','更主动的艺术处理','适合探索灵感与视觉方向。'],['Raw','更少的默认干预','也可以控制插画等风格，不等于写实专用或相机RAW。']]:[['低值','更贴近提示词','额外的艺术发挥较少。'],['高值','更自由的处理','也可能偏离指定细节，需结合对照样例判断。']];inside=title({...d,body:''})+`<div class="visual"><div class="native-compare">${data.map(x=>`<div class="concept"><h2>${x[0]}</h2><p class="big">${x[1]}</p><p>${x[2]}</p></div>`).join('')}</div></div>`;}
else if(d.src===19){cls='models';const shot=(m)=>(d.modelImages||{})[m]?`<div class="model-shot">${image({src:d.modelImages[m]},m+' 生成结果')}</div>`:`<div class="model-shot empty"><span>同一提示词</span><b>${m}</b><small>现场生成</small></div>`;
inside=`<div class="open-head"><p class="eyebrow">MIDJOURNEY / MODEL CHOICE</p><h1>Niji 7 与 <em>V7、V8</em></h1><p>先选模型，再写提示词。同一提示词三个模型并排看。</p></div><div class="model-cols"><div class="model-col niji"><div class="model-name"><h2>Niji 7</h2><code>--niji 7</code></div><p class="model-line">更二维动画，更插画感，二次元。</p>${shot('Niji 7')}<dl><dt>画面倾向</dt><dd>干净、平面化，强调线条</dd><dt>优先试</dt><dd>二次元角色、线稿、平涂插画</dd></dl></div><div class="model-col general"><div class="model-pair"><div class="model-name"><h2>V7</h2><code>--v 7</code></div><div class="model-name"><h2>V8</h2><code>--v 8</code></div></div><p class="model-line">风格更加多元，训练的图片类型更多。</p><div class="model-pair">${shot('V7')}${shot('V8')}</div><dl><dt>画面倾向</dt><dd>纹理、物体细节与体积更丰富</dd><dt>优先试</dt><dd>真人电影感、写实场景、产品、建筑、CG 概念</dd></dl></div></div><p class="model-rule"><b>二次元 · 线稿 · 平涂</b> → Niji 7　　<b>写实 · 电影感 · CG</b> → V7 / V8　　<span>V7 与 V8 的差别以现场实测为准</span></p>`;}
else if(d.src===26){cls='conditioning-focus';inside=conditioningSlide(d);}
else if(d.src===27){cls='moodboard-focus';inside=moodboardSlide(d);}
else if(d.src===32){inside=title(d)+`<div class="visual">${image(d.images[1],'AI对话原图')}</div>`;}
else if(d.src===33){cls='with-prompt';inside=title(d).replace(/<\/div>$/,`${d.prompt?`<figure class="task-prompt"><figcaption><b>任务原文</b><button data-copy="${esc(d.prompt)}">复制</button>${d.chatUrl?`<a href="${esc(d.chatUrl)}">打开 Codex 对话 ↗</a>`:''}</figcaption><p>${esc(d.prompt)}</p></figure>`:''}</div>`)+`<div class="visual"><div class="image-row">${d.reference?image({src:d.reference},'图 1：参考的角色组合图').replace('class="media"','class="media ref-media"'):''}${d.images.map(a=>image(a,'AI对话原图')).join('')}</div></div>`;}
else if(d.src===28){cls='experiment full-original';inside=title({...d,body:'同样的提示词下，\n修改不同的情绪板，\n带来的变化。'})+`<div class="visual">${image(d.images[0],'SILKVEIN 四组输出原图')}<div class="caption"><span>SILKVEIN · 四组输出原图</span></div></div>`;}
else if(d.src===24){cls='full-original';inside=title({...d,body:'基础角色词与艺术家姓名词对照。\n\n姓名只提供方向线索，\n具体结果仍需逐组比较。'})+`<div class="visual">${image(d.images[0],'Character design 对照原图')}<div class="caption"><span>上：基础词 / 中：Ruan Jia / 下：Kyoung Hwan Kim</span></div></div>`;}
else if(d.src===25){cls='wide style-case';inside=`<div class="case-head"><div><p class="eyebrow">MIDJOURNEY / STYLE REFERENCE</p><h1>Style Reference</h1></div><p class="case-intro">使用具体图像作为风格参考<span>挂载参考图片 → 观察生成结果</span></p></div><figure class="case-figure"><img src="assets/style-reference-case.svg" width="1507" height="966" alt="完整风格参考案例：上方为参考图片挂载栏，下方为两组角色生成结果及对应参考图片" data-full="assets/style-reference-case.svg"><figcaption><span>相同文字主题，搭配不同图像风格参考 · 原课件案例</span><span>查看合成大图 ↗</span></figcaption></figure>`;}
else {inside=title(d)+visual(d);if([9,10,14,15,26].includes(d.src))cls='wide';}
$('stage').classList.toggle('lesson-opening-stage',d.kind==='lesson-opening');$('stage').classList.toggle('reference-stage',d.src===20);$('stage').classList.toggle('learning-stage',d.src===14);$('stage').classList.toggle('conditioning-stage',d.src===26);$('stage').classList.toggle('moodboard-stage',d.src===27);$('stage').innerHTML=`<section class="slide ${cls}">${inside}</section>`;$('live').hidden=!d.live;$('section').innerHTML=(lesson?.lessonNumber??'01')==='01'&&(window.CHAPTERS||[]).includes(d.chapter)?window.CHAPTERS.map(c=>`<span class="${c===d.chapter?'on':''}">${esc(c)}</span>`).join('<i>·</i>'):esc(d.chapter);$('page').value=index+1;$('page').max=slides.length;$('total').textContent='/ '+slides.length;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1;$('progress').style.width=((index+1)/slides.length*100)+'%';$('notesBody').textContent=d.notes||'本页没有额外文字备注。';document.querySelectorAll('[data-full]').forEach(e=>{e.tabIndex=0;e.setAttribute('role','button');e.onclick=()=>{$('fullImage').src=e.dataset.full;$('viewer').showModal()};e.onkeydown=k=>{if(k.key==='Enter'||k.key===' '){k.preventDefault();e.click()}}});document.querySelectorAll('[data-notes]').forEach(e=>e.onclick=()=>$('notes').showModal());document.querySelectorAll('[data-layer]').forEach(b=>b.onclick=()=>{const v=b.dataset.layer;document.querySelectorAll('.annot .layer').forEach(g=>g.classList.toggle('show',v==='all'||g.dataset.l===v));document.querySelectorAll('[data-layer]').forEach(x=>x.classList.toggle('on',x===b))});document.querySelectorAll('[data-copy]').forEach(e=>e.onclick=async()=>{try{await navigator.clipboard.writeText(e.dataset.copy);toast('提示词已复制')}catch{toast('复制失败，请打开讲解备注手动复制')}});fitCrops();requestAnimationFrame(fitCrops);}
function roundImageCorners(img){
 if(img.closest('.crop')){img.style.clipPath='';return;}
 const w=img.clientWidth,h=img.clientHeight;
 if(!w||!h||!img.naturalWidth||!img.naturalHeight)return;
 const css=getComputedStyle(img),radius=getComputedStyle(document.documentElement).getPropertyValue('--image-radius').trim()||'14px';
 let x=0,y=0;
 if(css.objectFit==='contain'){const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight);x=Math.max(0,(w-img.naturalWidth*scale)/2);y=Math.max(0,(h-img.naturalHeight*scale)/2);}
 img.style.clipPath=`inset(${y}px ${x}px round ${radius})`;
}
function roundAllImages(){document.querySelectorAll('.slide img,#viewer img').forEach(roundImageCorners);}
document.addEventListener('load',e=>{if(e.target.tagName==='IMG')roundImageCorners(e.target);},true);
function fitCrops(){roundAllImages();document.querySelectorAll('.learning-art').forEach(e=>{const p=e.parentElement,r=p.getBoundingClientRect();let used=0;for(const c of p.children){if(c===e)continue;const st=getComputedStyle(c);used+=c.getBoundingClientRect().height+parseFloat(st.marginTop||0)+parseFloat(st.marginBottom||0)}const ratio=2048/(5*683),h=Math.max(0,r.height-used),w=Math.min(r.width,h*ratio);e.style.width=w+'px';e.style.height=w/ratio+'px';});document.querySelectorAll('.crop').forEach(e=>{const p=e.parentElement,r=p.getBoundingClientRect(),ratio=Number(e.dataset.ratio),w=Math.min(r.width,r.height*ratio);e.style.width=Math.max(0,w)+'px';e.style.height=Math.max(0,w/ratio)+'px';})}
function tocEntry({slide,page},{extraClass='',number='',label=slide.title||'课程导览'}={}){
 const active=page===index;
 const text=esc(label).replace(/\n/g,' ');
 return `<button class="${extraClass}${active?' active':''}" data-go="${page}"${active?' aria-current="page"':''}>${number?number+'　':''}${text}</button>`;
}
function tocGroup(label,entries,heading,headingEntry){
 const headingContent=headingEntry?tocEntry(headingEntry,{label,extraClass:'toc-section-entry'}):esc(label);
 return `<section class="toc-group"><${heading}>${headingContent}</${heading}><div class="toc-links">${entries.map(entry=>tocEntry(entry)).join('')}</div></section>`;
}
const collapsedTocLessons=new Set();
function tocLesson(opening,entries){
 const number=opening.slide.lessonNumber??'01';
 const sectionsId=`toc-lesson-sections-${number}`;
 const expanded=!collapsedTocLessons.has(sectionsId);
 const chapters=[...new Set(entries.map(entry=>entry.slide.chapter))];
 return `<section class="toc-lesson">
    <div class="toc-lesson-header">
     <h3>${tocEntry(opening,{extraClass:'toc-lesson-entry',number})}</h3>
     ${chapters.length?`<button type="button" class="toc-lesson-toggle" aria-controls="${sectionsId}"
      aria-expanded="${expanded}" aria-label="${expanded?'收起小节':'展开小节'}"></button>`:''}
    </div>
    ${chapters.length?`<div id="${sectionsId}" class="toc-lesson-sections"${expanded?'':' hidden'}>${chapters.map((chapter,position)=>{
     const sectionEntries=entries.filter(entry=>entry.slide.chapter===chapter);
     const name=number==='01'&&chapter==='开场'?'Midjourney':chapter;
     const label=`${number}.${position+1}　${name}`;
     const headingEntry=sectionEntries[0].slide.kind==='divider'
      ?sectionEntries.shift():undefined;
     return tocGroup(label,sectionEntries,'h4',headingEntry);
    }).join('')}</div>`:''}
   </section>`;
}
function showToc(){
 const entries=slides.map((slide,page)=>({slide,page}));
 const openings=entries.filter(entry=>entry.slide.kind==='lesson-opening');
 $('tocBody').innerHTML=
  tocGroup('课程导览',entries.slice(0,openings[0]?.page??entries.length),'h3')+
  openings.map((opening,position)=>tocLesson(opening,entries.slice(opening.page+1,openings[position+1]?.page))).join('');
 $('tocBody').querySelectorAll('.toc-lesson-toggle').forEach(toggle=>toggle.onclick=()=>{
  const sectionsId=toggle.getAttribute('aria-controls');
  const sections=$(sectionsId);
  const expanded=sections.hidden;
  sections.hidden=!expanded;
  if(expanded) collapsedTocLessons.delete(sectionsId);
  else collapsedTocLessons.add(sectionsId);
  toggle.setAttribute('aria-expanded',String(expanded));
  toggle.setAttribute('aria-label',expanded?'收起小节':'展开小节');
 });
 $('tocBody').querySelectorAll('[data-go]').forEach(button=>button.onclick=()=>{
  go(Number(button.dataset.go));
  $('toc').close();
 });
 $('toc').showModal();
}
function go(n){index=Math.max(0,Math.min(slides.length-1,n));history.replaceState(null,'','#'+(index+1));render()}
$('prev').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);$('page').onchange=e=>{const n=Number(e.target.value);if(Number.isInteger(n))go(n-1)};$('notesBtn').onclick=()=>$('notes').showModal();$('tocBtn').onclick=showToc;document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());$('fullBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('请使用浏览器自带全屏功能')}};function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200)}$('copyNotes').onclick=async()=>{try{await navigator.clipboard.writeText($('notesBody').textContent);toast('备注已复制')}catch{const r=document.createRange();r.selectNodeContents($('notesBody'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(r);toast('已选中文本，请手动复制')}};document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();go(index+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key.toLowerCase()==='n')$('notes').showModal();if(e.key.toLowerCase()==='m')$('tocBtn').click();if(e.key.toLowerCase()==='f')$('fullBtn').click()});window.addEventListener('resize',fitCrops);window.addEventListener('hashchange',()=>{let n=parseInt(location.hash.slice(1),10);if(n>=1&&n<=slides.length){index=n-1;render()}});let n=parseInt(location.hash.slice(1),10);index=n>=1&&n<=slides.length?n-1:0;render();
