淘宝SUI Mobile框架
官网地址：http://m.sui.taobao.org/
SUI Mobile 是一套基于 Framework7 开发的UI库。它非常轻量、精美，只需要引入我们的CDN文件就可以使用，并且能兼容到 iOS 6.0+ 和 Android 4.0+，非常适合开发跨平台Web App。

轻量的UI库
SUI Mobile 非常轻量，核心库压缩Gzip后的JS、CSS网络传输体积总共只有52K，却提供了20+个常用的组件。
对于只有HTML&CSS的组件，你只需要复制HTML代码既可以使用。他的大部分JS组件都是独立的 Zepto 插件，并且提供了 Zepto/jQuery 风格的API，你将会非常熟悉这种方式。

移动端web框架 Frozen UI

官网地址：http://frozenui.github.io/

Frozen UI是一个开源的简单易用，轻量快捷的移动端UI框架。基于手Q样式规范，选取最常用的组件，做成手Q公用离线包减少请求，升级方式友好，文档完善，目前全面应用在腾讯手Q增值业务中。

非手Q用户不能使用离线包而直接请求核心css也仅28k，另外也可以采用cdn和combo的方式按需加载。

CSS组件包括按钮，列表，表单，通知，提示条，弹出框，选项卡，等级图标，角标，红点，1px解决方案等。

CSS使用模块化的样式命名和组织规范，使用sass编写css代码。

FrozenJS 是针对移动端开发的 js 组件库，其依赖 zepto.js 和 FrozenUI，支持seajs模块化和非模块化两种方式。

FrozenJS 包括： basic：FrozenJS 的一些基础功能，包括模板引擎、tap 支持等。 ui：主要是一些触屏常用的 UI 组件，包括 dialog 等。 effect：非常用的特效库，特殊场景使用到是可以单独调用。

兼容android 2.3 +，ios 4.0 + 。

移动WebApp开发框架 Clouda
官网地址：http://clouda.baidu.com/
Clouda是基于node.js的Webapp开发框架，在使用Clouda时需要安装node.js和MongoDB。
Clouda 是百度推出的一款面向资深开发者的WebApp开发框架。在Clouda中开发app，可以在多终端下实现数据同步、任务迁移。并且Clouda支持面向数据的编辑模式，根据数据的变化自动实现界 面实时更新，开发者不需描述跃迁过程。它的核心在于云、端使用统一的Javascript语言，可以同时运行在浏览器、iOS、Android以及百度框中。另外，clouda app可以同时开发服务端和客户端，客户端的数据与云端实时同步，其内部数据也可供搜索引擎检索，解决app孤岛以及99.9%长尾应用只有30%分发量 的搜索分发问题。
HTML 移动端框架 Framework7
官网地址：http://framework7.io/
Framework7 或者叫 F7 是全功能的绑定 iOS 7 应用的 HTML 框架。Framework7 是免费开源的 HTML 移动端框架，用来开发混合移动端应用或者 iOS 7 的 Web 应用，并且带有 iOS 7 的原生外观和感觉。Framework7 也是独立的原型应用工具。
Framework7 使用 Javascript，CSS 和 HTML 来创建 iOS 7 应用，支持多个平台的迁移（PhoneGap），但是不是支持所有平台，主要还是针对 iOS 7。


Amaze UI框架
官网地址：http://amazeui.org/
Amaze UI 开发思路
通过拆分、封装一些常用的网页组件，以规范化采用云适配平台开发的移动网站，统一用户体验逐渐形成的。

1、语义化
Amaze UI开发遵循语义化原则，意图通过类名（class）等信息直观传达元素的功能角色，同时关注结构、样式、行为分离，降低各部分的耦合程度，提高开发效率和可维护性。

2、移动优先，跨屏适配
遵循 “移动优先（Mobile First）”、“渐进增强（Progressive enhancement）”的理念，可先从移动设备开始开发网站，逐步在扩展的更大屏幕的设备上，专注于最重要的内容和交互，适应移动互联潮流。轻松创建跨屏适配的网页。

3、模块化，按需定制
AMUI使用LESS编写样式，结构良好，易扩展，易维护；使用Seajs模块化开发、组织 JavaScript，自然、优雅。

4、专注于HTML5
AMUI 基于轻量的Zepto.js开发，有效减少为兼容旧浏览器的臃肿代码；基于 CSS3 的交互效果，平滑、高效。AMUI专注于现代浏览器（支持HTML5），不再为过时的浏览器耗费资源，为更有价值的用户提高更好的体验。

5、本地化支持
相比国外的前端框架，Amaze UI专注解决中文排版优化问题，根据操作系统调整字体，实现最佳中文排版效果；针对国内主流浏览器及App内置浏览器提供更好的兼容性支持，为你节省大量兼容性调试时间。

Amaze UI 的开发历程

云适配创始人陈本峰：这个项目最开始是作为内部使用工具来开发的。我们云适配本身就是一个前端产品，Amaze UI能帮我们降低开发时间和成本，用标准化作业流程，能有更高的产出。

从云适配创立之初，我们就开始积累自己的前端框架，同时也借鉴了Bootstrap等国外框架的优点。在内部使用过程中，大家一致反映不错，我们就希望把这个产品开源，希望分享给更多的人，也希望更多的人来贡献代码，来共建中国前端开源生态环境。在最近几个月，我们投入人力将这个项目整理成一个开源产品。目前有2个软件工程师全职在开发这个产品，还有一个设计，一个PM也在尽力配合。产品发布之后，我们会投入更多全职的工程师来专心打磨这个产品，同时也呼吁更多的前端开发爱好者共同来完善这个框架。

Amaze UI的目标
帮助开发者提高开发效率，提升网页效果，即用最短的时间做出最赞的网页，使更多的前端开发者不再受前端复杂代码困扰。

Jingle移动端框架
官网地址：http://vycool.com/Jingle/
Jingle是一个SPA(Single Page Application)开发框架，用来开发移动端的html5应用，在体验上尽量去靠近native应用，希望有一天html5能够做到与native一样的操作体验。

腾讯移动Web前端框架

官网地址：https://github.com/AlloyTeamDev/Pro


如果是 Angular 那就选 Ionic (一对好 CP)
如果是 Vue 那就选 Vux (基于 WeUI)
如果是 jQuery 那就选 Framework7 (iOS 和 Android 双皮肤)
如果是 React 那就选 ... (额，知道的补充下!)


1.Aliceui
Aliceui是支付宝的样式解决方案，是一套精选的基于 spm 生态圈的样式模块集合，是 Arale 的子集，也是一套模块化的样式命名和组织规范，是写 CSS 的更好方式。

gitHub地址：https://github.com/aliceui/aliceui.github.io

2.Amazeui
Amaze UI 是一个轻量级、 Mobile first 的前端框架, 基于开源社区流行前端框架编写的。

官网地址：http://amazeui.org/

3.sui
SUI是一套基于bootstrap开发的前端组件库，同时她也是一套设计规范。 
通过SUI，可以非常方便的设计和实现精美的页面。

官网地址：http://sui.taobao.org/

同时sui还有移动端版本msui，msui是阿里巴巴共享业务事业部UED团队的作品。目的是为了手机H5页面提供一个常用的组件库，减少重复工作。

地址：http://m.sui.taobao.org/

4.FrozeUI
Frozen UI是一个开源的简单易用，轻量快捷的移动端UI框架。基于手Q样式规范，选取最常用的组件，做成手Q公用离线包减少请求，升级方式友好，文档完善，目前全面应用在腾讯手Q增值业务中。

官网地址：http://frozenui.github.io/

5.uiKit
uiKit是一款轻量级、模块化的前端框架，可快速构建强大的web前端界面。

官网地址：http://www.getuikit.net/

6.H-ui
H-ui是轻量级前端框架，简单免费，兼容性好，适用于中国网站。

官网地址：http://www.h-ui.net/

7.Weui
weUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信 Web 开发量身设计，可以令用户的使用感知更加统一。包含button、cell、dialog、 progress、 toast、article、actionsheet、icon等各式元素。

官网地址：https://github.com/weui/weui

8.layui
Layui 诞生于2016年金秋，是一款带着浓烈情怀的国产前端UI框架，她追求极简，又不失丰盈的内在，说她是史上最轻量的结晶，似乎并不为过。一切都源自于她对原生态的执着，对前端社区的那些噪杂声音的过滤，以及她本身的精心雕琢。

官网地址：http://www.layui.com/

9.YDUI Touch
YDUI Touch 专为移动端打造，在技术实现、交互设计上兼容主流移动设备，保证代码轻、性能高;使用 Flex 技术，灵活自如地对齐、收缩、扩展元素，轻松搞定移动页面布局;实现强大的屏幕适配布局，等比例适配所有屏幕。什么？用得不开心？轻松切换 px;自定义Javascript组件、Less文件、Less变量，定制一份属于自己的YDUI;

官网地址：http://www.ydui.org/

转载请注明来自www.iyuxy.com