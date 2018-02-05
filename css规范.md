#### 缩进
    使用soft tab（4个空格）。

#### 分号
    每个属性声明末尾都要加分号。
    
#### 空格

##### 以下几种情况不需要空格：

#####  属性名后
    多个规则的分隔符','前
    !important '!'后
    属性值中'('后和')'前
    行末不要有多余的空格
    以下几种情况需要空格：
    
##### 属性值前
    选择器'>', '+', '~'前后
    '{'前
    !important '!'前
    @else 前后
    属性值中的','后
    注释'/*'后和'*/'前

#### 空行

#### 以下几种情况需要空行：
    文件最后保留一个空行
    '}'后最好跟一个空行，包括scss中嵌套的规则
    属性之间需要适当的空行，具体见属性声明顺序


#### 换行

##### 以下几种情况不需要换行：
    '{'前

##### 以下几种情况需要换行：
    '{'后和'}'前
    每个属性独占一行
    多个规则的分隔符','后

    .element,
    .dialog {
        ...
    }


#### 注释
    注释统一用'/* */'（scss中也不要用'//'），具体参照右边的写法；
    
    缩进与下一行代码保持一致；
    
    可位于一个代码行的末尾，与代码间隔一个空格。


#### 引号
    最外层统一使用双引号；
    
    url的内容要用引号；
    
    属性选择器中的属性值需要引号。
    .element:after {
        content: "";
        background-image: url("logo.png");
    }
    
    li[data-type="single"] {
        ...
    }

#### 命名
    类名使用小写字母，以中划线分隔
    id采用驼峰式命名
    scss中的变量、函数、混合、placeholder采用驼峰式命名

    
    /* class */
    .element-content {
        ...
    }
    
    /* id */
    #myDialog {
        ...
    }
    
    /* 变量 */
    $colorBlack: #000;
    
    /* 函数 */
    @function pxToRem($px) {
        ...
    }
    
    /* 混合 */
    @mixin centerBlock {
        ...
    }
    
    /* placeholder */
    %myDialog {
        ...
    }

#### 属性声明顺序
    相关的属性声明按右边的顺序做分组处理，组之间需要有一个空行。
    .declaration-order {
        display: block;
        float: right;
    
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
    
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        width: 100px;
        height: 100px;
    
        font: normal 13px "Helvetica Neue", sans-serif;
        line-height: 1.5;
        text-align: center;
    
        color: #333;
        background-color: #f5f5f5;
    
        opacity: 1;
    }


#### 颜色
    颜色16进制用小写字母；
    颜色16进制尽量用简写。

    /* not good */
    .element {
        color: #ABCDEF;
        background-color: #001122;
    }
    
    /* good */
    .element {
        color: #abcdef;
        background-color: #012;
    }
    
#### 属性简写

    属性简写需要你非常清楚属性值的正确顺序，而且在大多数情况下并不需要设置属性简写中包含的所有值，所以建议尽量分开声明会更加清晰；
    
    margin 和 padding 相反，需要使用简写；
    
    常见的属性简写包括：
    
    font
    background
    transition
    animation

    /* not good */
    .element {
        transition: opacity 1s linear 2s;
    }
    
    /* good */
    .element {
        transition-delay: 2s;
        transition-timing-function: linear;
        transition-duration: 1s;
        transition-property: opacity;
    }

#### 媒体查询
    尽量将媒体查询的规则靠近与他们相关的规则，不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。

    .element {
        ...
    }
    
    .element-avatar{
        ...
    }
    
    @media (min-width: 480px) {
        .element {
            ...
        }
    
        .element-avatar {
            ...
        }
    }

#### SCSS相关
    
    提交的代码中不要有 @debug；
    
    声明顺序：
        @extend
        不包含 @content 的 @include
        包含 @content 的 @include
        自身属性
        嵌套规则
        
    @import 引入的文件不需要开头的'_'和结尾的'.scss'；
    嵌套最多不能超过5层；
    
    @extend 中使用placeholder选择器；
    去掉不必要的父级引用符号'&'。

#### 杂项

    不允许有空的规则；
    
    元素选择器用小写字母；
    
    去掉小数点前面的0；
    
    去掉数字中不必要的小数点和末尾的0；
    
    属性值'0'后面不要加单位；
    
    同个属性不同前缀的写法需要在垂直方向保持对齐，具体参照右边的写法；
    
    无前缀的标准属性应该写在有前缀的属性后面；
    
    不要在同个规则里出现重复的属性，如果重复的属性是连续的则没关系；
    
    不要在一个文件里出现两个相同的规则；
    
    用 border: 0; 代替 border: none;；

选择器不要超过4层（在scss中如果超过4层应该考虑用嵌套的方式来写）；

发布的代码中不要有 @import；

尽量少用'*'选择器。    












    