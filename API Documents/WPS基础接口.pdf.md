本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

## 从从Visual Basic转到转到 JavaScript

一、一、 JSAPI接口的差异接口的差异

1. 方法的差异方法的差异

(1) vb的方法可以不加括号，但jsapi中所有的方法都需要加括号，如果方法不加括号会被js语法判定为属性。

vb:复制复制 js:复制复制

Application.Workbooks(1).Close Application.Workbooks.Item(1).Close()

(2) vb的方法支持给部分参数赋值。但js对缺省的参数需要用undefined占位补齐，如下面例子中为Find方法的第一和第三个参数赋值，在js 中Find方法第二个参数需要用undefined占位补齐

vb:复制复制

Range("A1:N29").Find("香港特别", LookIn:=xlValues).Select

js:复制复制

Application.ActiveSheet.Range("A1:N29").Find("我",undefined, xlValues).Select();

(3) vb可通过数组方式取集合中的对象，jsapi必须通过Item方法获取集合中的对象，其中要注意二维数组取值时需要将value要改成Value2

vb:复制复制 js:复制复制

Application.Workbooks(1).Close Application.Workbooks.Item(1).Close()

//以下是二维数组的取值方法

vb:复制复制 js:复制复制

cells(2,3).value Application.Cells.Item(2,3).Value2

2. 属性的差异属性的差异

(1) vb中调用书写错误的属性会报错，js不会报错，这是一个bug，所以特别注意。

js:复制复制

Application.ActiveDocument.Name111 不报错

(2) vb支持thisdocument对象，jsapi暂时不支持该对象，如果遇到thisdocument对象，可以用ActiveDocument代替

vb:复制复制 js:复制复制

MsgBox (Application.ThisDocument.Name) MsgBox (Application.ActiveDocument.Name)

3. 事件的差异事件的差异

jside的导航栏展示和自动补全的事件比较少，但js支持的事件基本和vb一致，下面给出一个vb事件转换为jside中事件的例子

vb:复制复制

Private Sub Workbook_SheetSelectionChange(ByVal Target As Range) Dim i As Integer IF Target.Column>6 And Target.Column>37 && Target.Row>6 And Target.Row Mod 2 = 1 And Cells(Target.Row -1, 5).Value <> “” Then With Target.Validation .Delete .Add Tpye:=xlValidateList,AlertStyle:=xlValidAlertStop,Operator:=xlBetween,Formular1:="=区域城市！$A2:$A30000") .IncellDropdown = true

js:复制复制

function Workbook_SheetSelectionChange(Sh, Target) { if(Target.Column>6 && Target.Column>37 && Target.Row>6 && (Target.Row)%2n==1 && Cells.Item(Target.Row -1n, 5).Value2 !==””) { var temptarget = Target.Validation temptarget.Delete() temptarget.Add(xlValidateList,xlValidAlertStop,xlBetween,"=区域城市！$A2:$A30000") temptarget.IncellDropdown = true } }

二、函数定义二、函数定义

1. vb用用sub ... end sub关键字定义函数，关键字定义函数，js用用funtion{}关键字定义函数关键字定义函数

vb:复制复制 js:复制复制

Public(Private) Sub AddTemplate()function AddTemplate() { MsgBox "d"MsgBox（"d"） End Sub}

三、数据类型三、数据类型

1. vb在数据定义时需要指明类型，但是在数据定义时需要指明类型，但是js是动态类型，赋值后才有类型是动态类型，赋值后才有类型,js包括的基本类型：字符串（包括的基本类型：字符串（String）、数字）、数字(Number)、、 布尔布尔(Boolean)、对空（、对空（Null）、未定义（）、未定义（Undefined）、）、Symbol，声明这些类型都用关键字，声明这些类型都用关键字var

vb:复制复制 js:复制复制 vb:复制复制 js:复制复制

Dim i As Integer var i Dim j As String var j

2. 基本类型对比基本类型对比

js类型类型 vb类型类型 boolean Boolean number Integer，Long，LongLong，Single，Double string String

3.vb的的bool类型首字母大写，类型首字母大写，js中都是小写中都是小写

vb:复制复制 js:复制复制

True, False true, false

4.字符串字符串

js字符串使用反斜杠“\”转义字符把特殊字符转换为字符串字符:

代码代码 结果结果 描述描述 \' ' 单引号 \" " 双引号 \\ \ 反斜杠

因此，在常见的文件路径的场景，需要采用“/”或者“\\”(Windows)来作为路径分隔符：

js:打开文档打开文档 复制复制

function test() { Workbooks.Open("H:\\新建文件夹\\工作簿1.xlsx") }

四、运算符四、运算符

1. 算术运算符的差异，如算术运算符的差异，如vb中的中的mod关键字应改为关键字应改为%

vb:复制复制 js:复制复制

Target.Row Mod 2 = 1 (Target.Row)%2==1

2. “+”可以用来拼接字符串可以用来拼接字符串

vb:复制复制

AddIns.Add FileName:="C:\Program Files\Microsoft Office" _"\Templates\Letters Faxes\MyFax.dot", Install:=True

js:复制复制

AddIns.Add("C:/Program Files/Microsoft Office" + "/Templates/Letters Faxes/MyFax.dot",true)

3. 逻辑运算符逻辑运算符

vb:复制复制 js:复制复制

1.逻辑与（AND）2.逻辑或（OR） 3.逻辑非（<>） 逻辑与（&&）2.逻辑或（||） 3.逻辑非（！）

注意js和vb判断空的逻辑不一样，vb内部会智能一点，遇到判断空的语句，尽量用"!"

vb:复制复制 js:复制复制 vb:复制复制

if Cells(1,2).value == "" //空 if (Cells.Item(1,2).Value2) //空 if Cells(1,2).value <> "" //非空

js:复制复制

if (!Cells.Item(1,2).Value2) //非空

五、枚举五、枚举

vb和js枚举的使用上存在的差异如下，在vb中wdAlignParagraphLeft和WdParagraphAlignment.wdAlignParagraphLeft语法都正确，但在js 中只有wdAlignParagraphLeft是正确用法

vb:复制复制

//vb用以上两种方式的枚举都可以正常使用 Application.Selection.ParagraphFormat.Alignment = wdAlignParagraphLeft Application.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft

js:复制复制

//js只支持这一种 Application.Selection.ParagraphFormat.Alignment = wdAlignParagraphLeft

六、六、With关键字关键字

vb有with关键字，js没有该关键字，转换时可以将with后面的对象赋值给一个变量，例子如下

vb:复制复制 js:复制复制

With Selection.Range.PageSetup.TextColumnsVar columens = Selection.Range.PageSetup.TextColumns .SetCount NumColumns:=2columens.SetCount(2) .EvenlySpaced = 0columens.EvenlySpaced = 0 End With//注意TextColumns后面没有括号因为这是一个属性

七、七、 条件语句条件语句

VB中的常用条件语句{IF 条件 Then 表达式 Endif}，在JS中应该转换为 if(条件) {表达式}

vb:复制复制

IF Target.Column>6 And Target.Column>37 And Target.Row>6 And Target.Row Mod 2 = 1 And Cells(Target.Row -1, 5).Value <> "" Then With Target.Validation .Delete .Add Endif

js:复制复制

if(Target.Column > 6 && Target.Column > 37 && Target.Row > 6 && (Target.Row) % 2 == 1 && Cells.Item(Target.Row -1n, 5).Value2 !== null) { var temptarget = Target.Validation temptarget.Delete() temptarget.Add(xlValidateList,xlValidAlertStop,xlBetween,"=区域城市！$A2:$A30000") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WPS 加载项可用性加载项可用性

一、请确认安装的 WPS 安装包带有 WPS 加载项功能。

个人用户可以在 WPS 官网下载最新的安装包；企业用户请联系贵公司的 WPS 项目负责人。

二、启用 WPS 加载项

打开 WPS 安装目录，进入 wps.exe 程序同级目录，在cfgs文件夹下新建或打开oem.ini文件，在文档最后添

加如下配置

示例代码示例代码 复制复制

[Support] ##启用加载项 JsApiPlugin = true ##启用网页调试，详情请参考 WPS 基础接口说明 JsApiShowWebDebugger=true [Server] ##指定加载项配置文件 jsplugins.xml 链接地址 JSPluginsServer = http://***/jsplugins.xml

三、加载项配置说明

加载项配置在文件 jsplugins.xml 中。jsplugins.xml 从服务器下载后会保存在本地，服务器更新后会重新下载。 jsplugins.xml 格式如下：

示例代码示例代码 复制复制

<jsplugins> <jsplugin name="demo_et" version="3.6" type="et" url="http://localhost:8080/demo_et_3.6.7z"/> <jsplugin name="demo_wpp" version="3.6" type="wpp" url="http://localhost:8080/demo_wpp_3.6.7z"/> </jsplugins>

<jsplugins> *** </jsplugins> 包含所有加载项配置

<jsplugin *** /> 代表一个加载项

name 为加载项名称

version 为该加载项版本号

type 为加载项类型

url 为加载项压缩包下载链接

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WPS 加载项性能加载项性能

WPS 加载项为了保证WPS 应用程序的安全性与稳定性，采用多进程架构，把网页渲染端和 WPS 应用进

程分离； 同时通过共享内存、事件对象等技术，实现了一套进程间快速同步调用的机制。 在性能测试过程中， 为10000个单元格赋值耗时2000毫秒，充分满足要求。

示例代码示例代码 复制复制

function TestSetCellFormula() { var cells = Application.ActiveWorkbook.ActiveSheet.Cells; let date = new Date(); let start = date.getTime(); for(var i = 1; i <= 100; ++i) { for(var j = 1; j <= 100; ++j) { cells.Item(i, j).Formula = i + j; } } date = new Date(); let end = date.getTime(); alert(end - start); return; }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 自定义功能区概述自定义功能区概述

自定义功能区采用通用的 CustomUI 标准进行配置， 该标准定义了一整套标准的控件，比如按钮、下拉菜

单、组合框；能够对控件的标签、图标、点击事件等属性进行配置。下面通过一个示例进行详细说明。

图 1. Web 加载项自定义功能区

示例代码示例代码 复制复制

<customUI xmlns="http://schemas.microsoft.com/office/2006/01/customui" onLoad="OnAddInLoad"> <ribbon startFromScratch="false"> <tabs> <tab id="WebAddinDemo" label="Web 加载项示例"> <group id="btnGroup" label="示例分组"> <button onAction="OnClicked" label="示例按钮" getImage="GetImage"/> </group> </tab> </tabs> </ribbon> </customUI>

标记说明标记说明

onLoad 代表一个事件，仅在 WPS 应用装载该 WPS 加载项时触发一次。OnAddInLoad是开发者自定义的 Java

Script 函数，通常用来执行一些初始化操作。

tabs 可以包含多个 tab，每一个 tab 对应一个自定义功能区。

group 将多个控件划分成不同的分组，便于将相互关联的功能组织在一起。

button 是一个按钮。onAction在用户点击后触发，OnClicked是开发者自定义的 JavaScript 函数。label 是按钮文

字标签，getImage 用来自定义按钮图表 GetImage是开发者自定义的 JavaScript 函数，getImage 首先会在自定 义功能区第一次显示的时候执行一次。当开发者调用刷新整个功能区或通过id刷新该控件时再次执行。

更多说明更多说明

请参考CustomUI标准查看更多说明

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# RibbonControl对象对象

RibbonControl 对象是自定义功能区中的控件对象。

属性属性

名称名称 说明说明 Id 控件唯一ID

Tag 指定的任意字符串

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# RibbonUI对象对象

RibbonUI 对象是 onLoad 事件的参数。

方法方法

名称名称 说明说明 ActivateTab 使 WPS 应用程序激活显示当前自定义功能区。

ActivateTabMso 激活内置的功能区，参数为指定的功能区名称。

ActivateTabQ 激活自定义功能区，参数为自定义功能区名称及命名控件

Invalidate 将自定义功能区的数据缓存置为无效，WPS 应用程序会在下一次显示时再次获取更新

InvalidateControl 指定更新一个控件，参数是控件Id

InvalidateControlMso 指定更新一个内置控件，参数是内置控件Id

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Application 对象对象

Application是浏览器Window对象的子对象。Application对象在浏览器创建时自动注入到浏览器执行上下文环境

### 说明说明

Wps对象是访问Application对象模型的根对象，它在浏览器创建后动态注入到浏览器执行上下文中，下列代码展示如何从Wps对象拿到Appli cation对象，然后从Application对象拿到当前文档的名字。

示例代码示例代码 复制复制

let app = Application let doc = app.ActiveDocument if(doc){ let docName = doc.Name }

除了原office标准对象外的扩展对象也都是Application对象的子对象，具体Application对象扩展了哪些对象，可以参阅Application对象成员相 关说明，下列代码展示了如果从Application对象拿到FileSystem对象。

示例代码示例代码 复制复制

let fs = Application.FileSystem

Application对象还包含一些函数，具体Application对象支持哪些函数，可以参阅Application对像成员说明，下列代码展示了如何 从Application对象创建一个网页对话框。

示例代码示例代码 复制复制

let width = 300 * window.devicePixelRatio let hight= 200 * window.devicePixelRatio let bModal = true Application.ShowDialog(""http://www.wps.cn"", "wps首页", width, hight, bModal)

### 方法方法

名称名称 说明说明

CreateTaskpane 用给定的url创建一个Taskpane。

GetTaskpane 根据给定的ID值，返回对应的TaskPane对象，这个ID值与TaskPane.ID对应。

ShowDialog 根据给定的url、标题、宽高等信息创建一个对话框，对话框中的内容是一个web网页。

alert 弹出alert警告。

弹出一个确认框。返回值为一个变量，代表对确认框的操作是确认还是取消。 confirm bool

### 属性属性

名称名称 说明说明

ApiEvent 返回一个ApiEvent对象，有关ApiEvent对象的相关说明，请参阅ApiEvent对象。

返回一个 Env 对象，该对象代表获取系统环境相关的操作对象，有关Env对象的详细属性和方法，可以 Env 参考Env 对象。

返回一个FileSystem 对象，该对象包含了对文件和文件夹的常见操作，有关FileSystem对象的详细属性 FileSystem 和方法，可以参考FileSystem 对象。

返回一个 PluginStorage 对象，该对象与LocalStorage的用法类似，但该对象的数据不会被持久化， PluginStorage在wps的jsapi插件中，该对象在一个插件中对应着同一个实例，因此该对象可以在一个jsapi插件的不同 网页间共享数据，有关该对象的详细介绍，可以参考 PluginStorage 对象。

### 成员方法成员方法

Application.CreateTaskpane

用给定的url创建一个Taskpane。

### 语法语法

express.CreateTaskpane(url)

express 一个代表 Application 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 url 必选 String 给定url路径

Application.GetTaskpane

根据给定的ID值，返回对应的TaskPane对象，这个ID值与TaskPane.ID对应。

### 语法语法

express.GetTaskpane(ID)

express 一个代表 Application 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 ID 必选 Number 表示TaskPane.ID属性

Application.ShowDialog

根据给定的url、标题、宽高等信息创建一个对话框，对话框中的内容是一个web网页。

### 语法语法

express.ShowDialog(url,caption,width,height,bModal,hasCaption,resizeEdge)

express 一个代表 Application 对象的变量。

### 参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 url 必选 String 此参数代表对话框网页的url, 这个url可以是一个http/https的网页，也可以是一个本地资源网页。 caption 必选 String 对话框的标题。

表示对话框的宽度，这个宽度是物理像素值，尤其要注意在普通屏和高分辨率屏下是不一样的，常见的 width 必选 Long 做法是借助于window.devicePixelRatio来消除这个影响。

表示对话框的高度，这个高度是物理像素值，尤其要注意在普通屏和高分辨率屏下是不一样的，常见的 height 必选 Long 做法是借助于window.devicePixelRatio来消除这个影响。 bModal 必选 Bool 表示对话框是否模态。 默认为true，表示对话框是否有标题栏和边框。为false时为无边框窗口，允许开发者对标题栏，窗口阴 hasCaption 可选 Bool 影等进行高级自定义 resizeEdge 可选 Bool 窗口为无边框窗口时有效。默认为2，表示操作对话框缩放的宽度，单位是像素。

### 示例示例

示例代码示例代码 复制复制

以下代码示例创建了一个对话框，并让这个对话框模态显示。 let width = 400 * window.devicePixelRatio let height = 300 * window.devicePixelRatio Application.ShowDialog("https://www.wps.cn", "wps网站", width, height, true)

Application.alert

弹出alert警告。

### 语法语法

express.alert(text)

express 一个代表 Application 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 text 必选 String 表示警告框要显示的字符串内容.

### 说明说明

alert实际上是浏览器window对象内置的一个方法，在wps的js环境中，wps对这个对象进行了拦截，主要原因是由于chrome的技术架构

决定的。 wps的js环境是内置了一个chrome的内核来展示网页、执行js脚本，在chrome的技术架构中，chrome的js执行、css及html渲染、网页uil 用户操作等都分别是它自己的线程中， 同样的，如果alert不作拦截，当网页前端代码调用alert时，这个alert框仅仅只是阻塞住了chrome 的ui线程，而对wps主线程没有影响，这样就会产生alert框弹出来了，但wps仍然能 响应用户操作的奇怪现象，因此，wps对alert框进行 了拦截，让alert框在wps主线程中弹出来，当alert弹出时，阻塞的会是wps主线程。

Application.confirm

弹出一个确认框。返回值为一个bool变量，代表对确认框的操作是确认还是取消。

### 语法语法

express.confirm(text)

express 一个代表 Application 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 text 必选 String 表示确认框要显示的字符串内容.

### 说明说明

confirm与alert一样，实际上也是浏览器window对象内置的一个方法，在wps的js环境中，wps对这个对象进行了拦截，主要原因是由于c hrome的技术架构决定的。 wps的js环境是内置了一个chrome的内核来展示网页、执行js脚本，在chrome的技术架构中，chrome的js执行、css及html渲染、网页uil 用户操作等都分别是它自己的线程中， 同样的，如果不作拦截，当网页前端代码调用confirm时，这个confirm框仅仅只是阻塞住了chrom e的ui线程，而对wps主线程没有影响，这样就会产生confirm框弹出来了，但wps仍然能 响应用户操作的奇怪现象，因此，wps对confirm 框进行了拦截，让confirm框在wps主线程中弹出来，当confirm弹出时，阻塞的会是wps主线程。

### 成员属性成员属性

Application.ApiEvent

返回一个ApiEvent对象，有关ApiEvent对象的相关说明，请参阅ApiEvent对象。

### 语法语法

express.ApiEvent

express 一个代表 Application 对象的变量。

Application.Env

返回一个 Env 对象，该对象代表获取系统环境相关的操作对象，有关Env对象的详细属性和方法，可以参考Env 对象。

### 语法语法

express.Env

express 一个代表 Application 对象的变量。

Application.FileSystem

返回一个FileSystem 对象，该对象包含了对文件和文件夹的常见操作，有关FileSystem对象的详细属性和方法，可以参考FileSystem 对

象。

### 语法语法

express.FileSystem

express 一个代表 Application 对象的变量。

Application.PluginStorage

返回一个 PluginStorage 对象，该对象与LocalStorage的用法类似，但该对象的数据不会被持久化，在wps的jsapi插件中，该对象在一 个插件中对应着同一个实例，因此该对象可以在一个jsapi插件的不同网页间共享数据，有关该对象的详细介绍，可以参考 PluginStorag e 对象。

### 语法语法

express.PluginStorage

express 一个代表 Application 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 任务窗格概述任务窗格概述

WPS 加载项的任务窗格是一个用来浏览网页的用户界面面板，通常停靠在 WPS 应用程序主窗口的一侧，

开发者可以控制任务窗格停靠的位置及宽高。 但重要的是任务窗格中的这个网页可以和 WPS 直接完成交互， 开发者可以提取 WPS 文档中的数据在网页中集中显示，也可以通过网页交互将数据直接写进文档。 下面的一

段代码演示了如何打开一个任务窗格。

图 1. Web 加载项任务窗格

示例代码示例代码 复制复制

let taskPane = Application.CreateTaskPane(GetUrlPath() + "/html_taskpane.html"); taskPane.DockPosition = Application.Enum.JSKsoEnum_msoCTPDockPositionLeft; taskPane.Visible = true;

代码说明代码说明

调用wps上的方法CreateTaskPane创建任务窗格，参数是网页路径。返回值是一个 JavaScript 对象。

DockPosition是任务窗格的停靠位置属性，这里将任务窗格停靠到左侧，默认是右侧。

Visible控制任务窗格是否显示，这里设置为true后，将任务窗格显示出来

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# TaskPane 对象对象

TaskPane对象是一个用来浏览网页的用户界面面板

### 方法方法

名称名称 说明说明

Delete 此方法用于删除当前的Taskpane。

Navigate 此方法用于在当前的Taskpane上重新载入url对应的网页。

### 属性属性

名称名称 说明说明

DockPosition 可读写，设置或返回一个整型，代表Taskpane的停靠位置。

Height 返回一个整数，此整数代码Taskpane的高度。

ID 返回一个整数，此整数代码Taskpane的ID。

Visible 可读写，设置或返回一个bool类型，代表Taskpane的可见性。

Width 返回一个整数，此整数代码Taskpane的宽度。

### 成员方法成员方法

TaskPane.Delete

此方法用于删除当前的Taskpane。

### 语法语法

express.Delete()

express 一个代表 TaskPane 对象的变量。

TaskPane.Navigate

此方法用于在当前的Taskpane上重新载入url对应的网页。

### 语法语法

express.Navigate(url)

express 一个代表 TaskPane 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 url 必选 String 这个url可以是一个在线的网址，也可以是一个本地的html资源.

### 示例示例

示例代码示例代码 复制复制

let tp = Application.CreateTaskpane("https://www.kingsoft.com") if (tp){ tp.Visible = true tp.Navigate("https://www.wps.cn") }

### 成员属性成员属性

TaskPane.DockPosition

可读写，设置或返回一个整型，代表Taskpane的停靠位置。

### 语法语法

express.DockPosition

express 一个代表 TaskPane 对象的变量。

### 说明说明

{ msoCTPDockPositionLeft : 0, msoCTPDockPositionTop : 1, msoCTPDockPositionRight : 2, msoCTPDockPositionBottom : 3, msoCTPDockPositionFloati ng : 4 }

TaskPane.Height

返回一个整数，此整数代码Taskpane的高度。

### 语法语法

express.Height

express 一个代表 TaskPane 对象的变量。

TaskPane.ID

返回一个整数，此整数代码Taskpane的ID。

### 语法语法

express.ID

express 一个代表 TaskPane 对象的变量。

TaskPane.Visible

可读写，设置或返回一个bool类型，代表Taskpane的可见性。

### 语法语法

express.Visible

express 一个代表 TaskPane 对象的变量。

TaskPane.Width

返回一个整数，此整数代码Taskpane的宽度。

### 语法语法

express.Width

express 一个代表 TaskPane 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 事件概述事件概述

通过 WPS 加载项事件能够对 WPS 应用程序发出的事件添加 JavaScript 方法进行处理。 在通知型事件中

，可以接收已经发生变化，比如通过WindowActivate事件，可以对文档的切换做一些功能性处理； 在询问型事 件中，可以控制是否继续执行当前操作，比如通过WorkbookBeforeClose事件，可以取消文档的关闭。

示例代码示例代码 复制复制

Application.ApiEvent.AddApiEventListener("WorkbookBeforeClose", function(workBook){ if (!workBook.Saved) { alert("请先保存文档！") Application.ApiEvent.Cancel = true; } });

代码说明代码说明

注册WorkbookBeforeClose监听事件，在工作簿关闭时，判断该工作簿是否保存，如果未保存，弹出“请先 保存文档！”提示，并取消关闭

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ApiEvent 对象对象

ApiEvent 对象用于接收 WPS 应用程序各种事件通知。

### 说明说明

ApiEvent对象用于注册和反注册 WPS 事件回调函数，注册一个事件回调函数的接口为：ApiEvent.AddApiEventListener(eventName, fu nc)， 其中eventName表示要响应的事件类型，这些事件类型由wps内部规定，func表示要回调的js函数，当wps有某个事件被触发时，这些 注册的js函数会被wps执行。 例如需要在打开文档时，弹出一个打开文档后的消息框，示例代码如下如下：

示例代码示例代码 复制复制

Application.ApiEvent.AddApiEventListener("DocumentOpen", (doc)=>{alert("文档已打开，文档名是： " + doc.Name)});

同样，如果不再需要某个已注册的回调函数，可以把相关的回调函数进行反注册，wps内部也会在网页关闭时，把网页中所有已注册的回调函 数自动反注册，反注册一个回调函数的方式为： ApiEvent.RemoveApiEventListener(eventName)。其中eventName表示事件类型，反注

册后当前网页不再有此事件的回调函数被执行。

示例代码示例代码 复制复制

Application.ApiEvent.RemoveApiEventListener("DocumentOpen")

api事件分为询问型事件和通知型事件，询问型事件是指wps在准备做某一个事情时发出事件回调，第三方代码有机会来控制这个事情， 通知型 事件是指wps做了某个事件后通知第三方代码这个事情已经结束，这种情况下事情已然发生。以上面的几个事件类型为例， DocumentBefore Close和DocumentBeforeSave事件是询问型事件，其它几个是通知型事件。下面分别对两种事件各举一个例子

1.询问型事件：询问型事件： 示例：当用户想保存一个文件时，通过js事件回调禁止保存这个文件,代码如下：

示例代码示例代码 复制复制

let func = (doc)=>{ alert(doc.Name) Application.ApiEvent.Cancel = true } Application.ApiEvent.AddApiEventListener("DocumentBeforeSave", func)

上面代码的意思是在文件保存前OnDocBeforeSave这个js函数被调用到，此时js函数里边通过ApiEvent.Cancel这个属性设置了要取消掉这次 流程， wps执行完OnBeforeSave这个js函数后，检测到Cancel属性被设置为true, 从而中止了保存流程。 对于询问型事件，一般是通过Canc el属性来继续或是中止流程的执行。

2.通知型事件：通知型事件：

示例：示例：当用户打开文件后弹出这个文件的磁盘路径，代码如下：

示例代码示例代码 复制复制

let func = (doc)=>{ alert(doc.Name) } Application.ApiEvent.AddApiEventListener("DocumentOpen", func)

上面代码的意思是在文件打开这个事件发生后，wps把事件发生后通知给了网页上注册的回调函数。

关于事件类型的定义，在wps/et/wpp中各有不同，事件类型也基本上保持与office标准的事件类型相对应，详细的事件类型如下表：

wps文字支持的事件类型如下：

名称名称 级别级别 类型类型 触发时机触发时机

DocumentOpen Application 通知型 文档打开时触发。

DocumentBeforeClose Application 询问型 任一打开的文档关闭之前触发此事件。

DocumentBeforeSave Application 询问型 任一打开的文档保存之前触发此事件。

DocumentAfterClose Application 通知型 任一打开的文档关闭之后触发此事件。

DocumentChange Application 通知型 任一打开的文档内容发生变化时触发此事件。

DocumentBeforePrint Application 询问型 任一打开的文档打印之前触发此事件。

DocumentNew Application 通知型 新建任一文档时触发此事件。

DocumentRightsInfo Application 通知型 当操作文档权限时会触发此事件。

DocumentBeforeCopy Application 询问型 在任一文档复制之前触发该事件。

DocumentBeforePaste Application 询问型 在任一文档粘贴之前触发该事件。

DocumentBeforeNew Application 询问型 在任一文档新建之前触发该事件。

DocumentBeforeOpen Application 询问型 在任一文档打开之前触发该事件。

DocumentAfterSave Application 通知型 在任一文档保存之后触发该事件。

DocumentViewFocusIn Application 通知型 在任一文档获取到焦点之后触发该事件。

DocumentViewFocusOut Application 通知型 在任一文档失去焦点之后触发该事件。

DocumentAfterPrint Application 通知型 在任一文档打印之后触发该事件。

WindowActivate Application 通知型 当激活文档窗口时触发此事件。

WindowDeactivate Application 通知型 任一文档窗口被切换到非激活状态时触发此事件。

WindowSelectionChange Application 通知型 活动窗口所选内容更改时将触发此事件。

WindowBeforeRightClick Application 询问型 当右击任一文档窗口之前触发此事件。

WindowBeforeDoubleClick Application 询问型 当双击任一文档窗口之前触发此事件。

ApplicationQuit Application 通知型 当退出文字组件进程时触发此事件。

AfterLogin Application 通知型 在用户登陆之后触发此事件。

AfterLogout Application 通知型 在用户登出之后触发此事件。

AfterVIPInfoChanged Application 通知型 在用户会员信息变化之后触发此事件。

AfterWebExtensionDataRangeChange Application 通知型 在网络扩展数据范围变化之后触发此事件。

AfterTaskPaneShow Application 通知型 当任务窗格显示之后触发此事件。

AfterTaskPaneHidden Application 通知型 当任务窗格隐藏之后触发此事件。

QueryDocumentPrintCopies Application 询问型 当打印复本排队时触发此事件。

ContentChange Application 通知型 当文档内容发生变化时触发此事件。

SelectionAfterStyleChange Application 通知型 当选择的内容字体变化之后触发此事件。

FileAfterSave Application 通知型 在文件保存之后触发该事件。

ContentControlAfterAdd Application 通知型 当内容控件被添加到文档之后触发此事件。

ContentControlBeforeDelete Application 通知型 当内容控件被从文档删除之前触发此事件。

ContentControlOnExit Application 通知型 当退出内容控件时触发此事件。

ContentControlOnEnter Application 通知型 当进入内容控件时触发此事件。

ContentControlBeforeStoreUpdate Application 通知型 当内容控件的内容去更新XML映射内容时触发此事件。

ContentControlBeforeContentUpdate Application 通知型 当内容控件的内容发生来自XML映射内容更新时触发此事件。

wps表格支持的api事件为：

名称名称 级别级别 类型类型 触发时机触发时机

WorkbookOpen Application 通知型 当打开一个工作簿时触发此事件。

NewWorkbook Application 通知型 当新建工作簿时触发此事件。

WorkbookBeforeSave Application 询问型 任一工作簿被保存之前触发此事件。

WorkbookAfterSave Application 通知型 任一工作簿被保存之后触发此事件。

WorkbookBeforeClose Application 询问型 任一打开的工作簿关闭之前触发此事件。

WorkbookBeforePrint Application 询问型 在打印任一打开的工作簿之前触发此事件。

SheetSelectionChange Application 通知型 该工作簿任一工作表上的选定区域发生更改时，将触发此事件。

SheetChange Application 通知型 当用户或外部链接更改了该工作簿任一工作表中的单元格时触发此事件。

SheetActivate Application 通知型 当激活任一工作表时触发此事件。

SheetDeactivate Application 通知型 当该工作簿任一工作表被切换到非激活状态时触发此事件。

WindowActivate Application 通知型 任一工作簿窗口被激活时，将触发此事件。

WindowDeactivate Application 通知型 任一工作簿窗口被切换到非激活状态时触发此事件。

SheetBeforeDoubleClick Application 询问型 当双击任一工作表之前触发此事件。

SheetBeforeRightClick Application 询问型 当右击任一工作表之前触发此事件 。

SheetCalculate Application 通知型 在任一工作表进行计算时触发此事件。

WorkbookActivate Application 通知型 任一工作簿被激活时，将触发此事件。

WorkbookDeactivate Application 通知型 任一工作簿被切换到非激活状态时触发此事件。

WorkbookNewSheet Application 通知型 在任一打开的工作簿中创建新工作表时触发此事件。

WindowResize Application任一工作簿窗口调整大小时将触发此事件。 通知型

SheetFollowHyperlink Application 通知型 单击任一工作表的超链接时触 发此事件。

AfterCalculate Application 通知型 当计算完成后触发此事件。

SheetBeforeDelete Application 通知型 当删除任一工作表之前触发此事件。

DocumentRightsInfo Application 通知型 当操作文档权限时会触发此事件。

AfterLogin Application 通知型 当用户登陆之后触发此事件。

AfterLogout Application 通知型 当用户登出之后触发此事件。

AfterVIPInfoChanged Application 通知型 当用户的会员信息变化之后触发此事件。

AfterWebExtWatchingDataUpdated Application 通知型 当网页拓展监控的数据发生变化之后触发此事件

AfterTaskPaneShow Application 通知型 当任务窗格显示之后触发此事件。

AfterTaskPaneHidden Application 通知型 当任务窗格隐藏之后触发此事件

DocumentBeforeNew Application 询问型 在任一文档新建之前触发该事件。

DocumentBeforeOpen Application 询问型 在任一文档打开之前触发该事件。

DocumentBeforeCopy Application 询问型 在任一文档复制之前触发该事件。

DocumentBeforePaste Application 询问型 在任一文档粘贴之前触发该事件。

FileAfterSave Application 通知型 在任一文档保存之后触发该事件。

LinkedDataTypeConvert Application 通知型 在连接数据类型转变时触发该事件。

LinkedDataTypeChange Application 通知型 在连接数据类型改变时触发该事件。

LinkedDataTypeRefresh Application 通知型 在连接数据类型刷新时触发该事件。

LinkedDataTypeCancel Application 通知型 在连接数据类型取消时触发该事件。

DocumentAfterPrint Application 通知型 该文档打印之后触发该事件。

wps演示支持的api事件为：

名称名称 级别级别 类型类型 触发时机触发时机

AfterLogin Application 通知型 用户登录之后触发该事件。

AfterLogout Application 通知型 用户登出之后触发该事件。

AfterPresentationOpen Application 通知型 任一演示文稿打开后触发该事件。

AfterTaskPaneHidden Application 通知型 当任务窗格隐藏之后触发此事件。

AfterTaskPaneShow Application 通知型 当任务窗格显示之后触发此事件。

DocumentAfterPrint Application 通知型 当文档打印之后触发此事件。

DocumentBeforeCopy Application 询问型 当文档复制之前触发此事件。

DocumentBeforeNew Application 询问型 当文档新建之前触发此事件。

DocumentBeforeOpen Application 询问型 当文档打开之前触发此事件。

DocumentBeforePaste Application 询问型 当文档粘贴之前触发此事件。

DocumentRightsInfo Application 通知型 当操作文档权限时会触发此事件。

FileAfterSave Application 通知型 当文件保存之后触发此事件。

NewPresentation Application 通知型 当新建演示文稿时触发此事件。

PresentationBeforeClose Application 询问型 任一打开的演示文稿关闭之前触发此事件。

PresentationBeforePrint Application 询问型 任一演示文稿打印之前触发此事件。

PresentationBeforeSave Application 询问型 任一演示文稿被保存之前触发此事件。

PresentationClose Application 通知型 任一演示文稿关闭时触发此事件。

PresentationCloseFinal Application 通知型 任一演示文稿关闭之后触发此事件。

PresentationNewSlide Application 通知型 任一演示文稿新建幻灯片时触发此事件。

PresentationOpen Application 通知型 任一演示文稿打开时触发此事件。

PresentationPrint Application 通知型 任一演示文稿打印时触发此事件。

PresentationSave Application 通知型 任一演示文稿保存时触发此事件。

Quit Application 通知型 任一演示文稿退出时触发此事件。

SlideSelectionChanged Application 通知型 演示文稿幻灯片选择变化时触发此事件。

SlideShowBegin Application 通知型 演示文稿开始播放时触发此事件。

SlideShowEnd Application 通知型 演示文稿结束播放时触发此事件。

SlideShowNextClick Application 通知型 演示文稿播放时下一次点击触发此事件。

SlideShowNextSlide Application 通知型 演示文稿播放下一个幻灯片时触发此事件。

SlideShowOnNext Application 通知型 演示文稿播放点击下一页时触发此事件。

SlideShowOnPrevious Application 通知型 演示文稿播放点击上一页时触发此事件。

WindowActivate Application 通知型 当激活演示窗口时触发此事件。

WindowSelectionChange Application 通知型 活动窗口所选内容更改时将触发此事件。

### 方法方法

名称名称 说明说明

AddApiEventListener 注册wps事件的回调。

RemoveApiEventListener 反注册wps事件的回调。

### 属性属性

名称名称 说明说明

Cancel 当事件是询问型事件时，此属性用于设置是否中止事件进行的状态

### 成员方法成员方法

ApiEvent.AddApiEventListener

注册wps事件的回调。

### 语法语法

express.AddApiEventListener(eventName,func)

express 一个代表 ApiEvent 对象的变量。

### 参数参数

必选必选 /可可数据类数据类 名称名称 说明说明 选选型型 代表事件类型，事件类型由wps内部规定，有关wps支持的事件类型，可以参数ApiEvent对象说明 eventName 必选 String 相关文档。 func 必选 js函数函数 代表要注册的事件回调，当事件发生时，此函数被调用到。

ApiEvent.RemoveApiEventListener

反注册wps事件的回调。

### 语法语法

express.RemoveApiEventListener(eventName)

express 一个代表 ApiEvent 对象的变量。

### 参数参数

必选必选 /可可数据类数据类 名称名称 说明说明 选选型型 代表事件类型，事件类型由wps内部规定，有关wps支持的事件类型，可以参数ApiEvent对象说明 eventName 必选 String 相关文档。

### 成员属性成员属性

ApiEvent.Cancel

当事件是询问型事件时，此属性用于设置是否中止事件进行的状态

### 语法语法

express.Cancel

express 一个代表 ApiEvent 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 表格事件表格事件

事件列表事件列表

名称名称 级别级别 类型类型 触发时机触发时机

通知 WorkbookOpen Application 当打开一个工作簿时触发此事件。 型

通知 NewWorkbook Application 当新建工作簿时触发此事件。 型

询问 WorkbookBeforeSave Application 任一工作簿被保存之前触发此事件。 型

通知 WorkbookAfterSave Application 任一工作簿被保存之后触发此事件。 型

询问 WorkbookBeforeClose Application 任一打开的工作簿关闭之前触发此事件。 型

询问 WorkbookBeforePrint Application 在打印任一打开的工作簿之前触发此事件。 型

通知 SheetSelectionChange Application 该工作簿任一工作表上的选定区域发生更改时，将触发此事件。 型

通知当用户或外部链接更改了该工作簿任一工作表中的单元格时触发此事 SheetChange Application 型件。

通知 SheetActivate Application 当激活任一工作表时触发此事件。 型

通知 SheetDeactivate Application 当该工作簿任一工作表被切换到非激活状态时触发此事件。 型

通知 WindowActivate Application 任一工作簿窗口被激活时，将触发此事件。 型

通知 WindowDeactivate Application 任一工作簿窗口被切换到非激活状态时触发此事件。 型

询问 SheetBeforeDoubleClick Application 当双击任一工作表之前触发此事件。 型

询问 SheetBeforeRightClick Application 当右击任一工作表之前触发此事件 。 型

通知 SheetCalculate Application 在任一工作表进行计算时触发此事件。 型

通知 WorkbookActivate Application 任一工作簿被激活时，将触发此事件。 型

通知 WorkbookDeactivate Application 任一工作簿被切换到非激活状态时触发此事件。 型

通知 WorkbookNewSheet Application 在任一打开的工作簿中创建新工作表时触发此事件。 型

通知 WindowResize Application 任一工作簿窗口调整大小时将触发此事件。 型

通知 SheetFollowHyperlink Application 单击任一工作表的超链接时触 发此事件。 型

通知 AfterCalculate Application 当计算完成后触发此事件。 型

通知 SheetBeforeDelete Application 当删除任一工作表之前触发此事件。 型

通知 DocumentRightsInfo Application 当操作文档权限时会触发此事件。 型

通知 AfterLogin Application 当用户登陆之后触发此事件。 型

通知 AfterLogout Application 当用户登出之后触发此事件。 型

通知 AfterVIPInfoChanged Application 当用户的会员信息变化之后触发此事件。 型

AfterWebExtWatchingDataUpdat 通知 Application 当网页拓展监控的数据发生变化之后触发此事件 型 ed

通知 AfterTaskPaneShow Application 当任务窗格显示之后触发此事件。 型

通知 AfterTaskPaneHidden Application 当任务窗格隐藏之后触发此事件 型

询问 DocumentBeforeNew Application 在任一文档新建之前触发该事件。 型

询问 DocumentBeforeOpen Application 在任一文档打开之前触发该事件。 型

询问 DocumentBeforeCopy Application 在任一文档复制之前触发该事件。 型

询问 DocumentBeforePaste Application 在任一文档粘贴之前触发该事件。 型

通知 FileAfterSave Application 在任一文档保存之后触发该事件。 型

通知 LinkedDataTypeConvert Application 在连接数据类型转变时触发该事件。 型

通知 LinkedDataTypeChange Application 在连接数据类型改变时触发该事件。 型

通知 LinkedDataTypeRefresh Application 在连接数据类型刷新时触发该事件。 型

通知 LinkedDataTypeCancel Application 在连接数据类型取消时触发该事件。 型

通知 DocumentAfterPrint Application 该文档打印之后触发该事件。 型

事件事件

### WorkbookOpen

当打开一个工作簿时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 打开的工作簿对象。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("打开工作簿") } Application.ApiEvent.AddApiEventListener("WorkbookOpen", func)

NewWorkbook

当新建工作簿时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 新建的工作簿对象。

语法语法

Application.ApiEvent.AddApiEventListener("NewWorkbook", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("新建工作簿") } Application.ApiEvent.AddApiEventListener("NewWorkbook", func)

WorkbookBeforeSave

任一工作簿被保存之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 SaveAsUI 必选 Boolean 如果为true则表示此次保存操作将会弹出保存或是另存为对话框。 Cancel 必选 Object 如果设置其属性Value为true，则不关闭工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookBeforeSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, cancal) { var msg = "您保存后要关闭吗？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("WorkbookBeforeSave", func)

WorkbookAfterSave

任一工作簿被保存之后触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 Success 必选 Boolean 如果保存操作成功，则为true; 否则为false。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookAfterSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Success) { if(!Success) alert("保存成功") }; Application.ApiEvent.AddApiEventListener("WorkbookAfterSave", func)

WorkbookBeforeClose

任一打开的工作簿关闭之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 Cancel 必选 Object 如果设置其属性Value为true，则不关闭工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookBeforeClose", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, cancal) { var msg = "您确定要关闭吗？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("WorkbookBeforeClose", func)

WorkbookBeforePrint

在打印任一打开的工作簿之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 Cancel 必选 Object 如果设置其属性Value为true，则不打印工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookBeforePrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, cancal) { var msg = "您打印后要关闭吗？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("WorkbookBeforePrint", func)

SheetSelectionChange

该工作簿任一工作表上的选定区域发生更改时，将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 选区改变的工作表对象。 Target 必选 Range 新选定的区域。

语法语法

Application.ApiEvent.AddApiEventListener("SheetSelectionChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Sh, Target) { var msg = "工作表" + Sh + "选中的区域是：" + Target.Address(); alert(msg); } Application.ApiEvent.AddApiEventListener("SheetSelectionChange", func)

SheetChange

当用户或外部链接更改了该工作簿任一工作表中的单元格时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 选区改变的工作表对象。 Target 必选 Range 新选定的区域。

语法语法

Application.ApiEvent.AddApiEventListener("SheetChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Sh, Target) { var msg = "工作表" + Sh + "选中的区域是：" + Target.Address(); alert(msg); } Application.ApiEvent.AddApiEventListener("SheetChange", func)

SheetActivate

当激活任一工作表时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 工作表对象。

语法语法

Application.ApiEvent.AddApiEventListener("SheetActivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (Sh)=>{ alert("工作表激活") } Application.ApiEvent.AddApiEventListener("SheetActivate", func)

SheetDeactivate

当该工作簿任一工作表被切换到非激活状态时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 工作表对象。

语法语法

Application.ApiEvent.AddApiEventListener("SheetDeactivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (Sh)=>{ alert("工作表切换为未激活") } Application.ApiEvent.AddApiEventListener("SheetDeactivate", func)

WindowActivate

任一工作簿窗口被激活时，将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。 Wn 必选 Window 激活窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowActivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, wn) { var msg = "您激活的窗口是: " + wn.Caption; alret(msg); } Application.ApiEvent.AddApiEventListener("WindowActivate", func)

WindowDeactivate

任一工作簿窗口被切换到非激活状态时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。 Wn 必选 Window 激活窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowDeactivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, wn) { var msg = "您取消激活的窗口是: " + wn.Caption; alret(msg); } Application.ApiEvent.AddApiEventListener("WindowDeactivate", func)

SheetBeforeDoubleClick

当双击任一工作表之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 双击的工作表对象。 Target 必选 Range对象 双击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次双击。

语法语法

Application.ApiEvent.AddApiEventListener("SheetBeforeDoubleClick", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Sh, Target, Cancal) { var msg = "您双击的是：" + Target.Address() +"\n是否取消此次双击？" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("SheetBeforeDoubleClick", func)

SheetBeforeRightClick

当右击任一工作表之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 单击的工作表对象。 Target 必选 Range对象 单击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次单击。

语法语法

Application.ApiEvent.AddApiEventListener("SheetBeforeRightClick", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Sh, Target, Cancal) { var msg = "您单击的是：" + Target.Address() +"\n是否取消此次单击？" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("SheetBeforeRightClick", func)

SheetCalculate

在任一工作表进行计算时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 激活的工作表对象。

语法语法

Application.ApiEvent.AddApiEventListener("SheetCalculate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("进行计算") } Application.ApiEvent.AddApiEventListener("SheetCalculate", func)

WorkbookActivate

任一工作簿被激活时，将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookActivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("工作簿激活") } Application.ApiEvent.AddApiEventListener("WorkbookActivate", func)

WorkbookDeactivate

任一工作簿被切换到非激活状态时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookDeactivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("工作簿切换为未激活") } Application.ApiEvent.AddApiEventListener("WorkbookDeactivate", func)

WorkbookNewSheet

在任一打开的工作簿中创建新工作表时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。 Sh 必选 Object 激活工作表对象。

语法语法

Application.ApiEvent.AddApiEventListener("WorkbookNewSheet", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("新建工作表") } Application.ApiEvent.AddApiEventListener("WorkbookNewSheet", func)

WindowResize

任一工作簿窗口调整大小时将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 激活工作簿对象。 Wn 必选 Window 激活窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowResize", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("窗口调整大小") } Application.ApiEvent.AddApiEventListener("WindowResize", func)

SheetFollowHyperlink

单击任一工作表的超链接时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 激活工作表对象。 Hl 必选 Object 超链接对象。

语法语法

Application.ApiEvent.AddApiEventListener("SheetFollowHyperlink", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("跳转超链接") } Application.ApiEvent.AddApiEventListener("SheetFollowHyperlink", func)

AfterCalculate

当计算完成后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterCalculate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("计算完成") } Application.ApiEvent.AddApiEventListener("AfterCalculate", func)

SheetBeforeDelete

当删除任一工作表之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 激活工作表对象。

语法语法

Application.ApiEvent.AddApiEventListener("SheetBeforeDelete", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("准备删除工作表") } Application.ApiEvent.AddApiEventListener("SheetBeforeDelete", func)

DocumentRightsInfo

当操作文档权限时会触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 RightsInfo 必选 Int 权限信息。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("操作文档权限") } Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", func)

AfterLogin

当用户登陆之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogin", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("用户已登陆") } Application.ApiEvent.AddApiEventListener("AfterLogin", func)

AfterLogout

当用户登出之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogout", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("用户已登出") } Application.ApiEvent.AddApiEventListener("AfterLogout", func)

AfterVIPInfoChanged

当用户的会员信息变化之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterVIPInfoChanged", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("用户会员信息已变化") } Application.ApiEvent.AddApiEventListener("AfterVIPInfoChanged", func)

AfterWebExtWatchingDataUpdated

当网页拓展监控的数据发生变化之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterWebExtWatchingDataUpdated", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("网页拓展监控的数据发生变化") } Application.ApiEvent.AddApiEventListener("AfterWebExtWatchingDataUpdated", func)

AfterTaskPaneShow

当任务窗格显示之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("任务窗格已显示") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", func)

AfterTaskPaneHidden

当任务窗格隐藏之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("任务窗格已隐藏") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", func)

DocumentBeforeNew

在任一文档新建之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Object 如果设置其属性Value为true，则不新建工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Cancal) { var msg = "是否要新建工作簿" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", func)

DocumentBeforeOpen

在任一文档打开之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 工作簿路径 Cancel 必选 Object 如果设置其属性Value为true，则不打开工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(FilePath, Cancal) { var msg = "是否要打开文档：" + FilePath if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", func)

DocumentBeforeCopy

在任一文档复制之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 Type 必选 Long 复制类型。 Cancel 必选 Object 如果设置其属性Value为true，则不复制。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("准备复制") } Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", func)

DocumentBeforePaste

在任一文档粘贴之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 Cancel 必选 Object 如果设置其属性Value为true，则不粘贴。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("准备粘贴") } Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", func)

FileAfterSave

在任一文档保存之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 FilePath 必选 String 保存路径。 Format 必选 String 保存格式。

语法语法

Application.ApiEvent.AddApiEventListener("FileAfterSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("文档已保存") } Application.ApiEvent.AddApiEventListener("FileAfterSave", func)

LinkedDataTypeConvert

在连接数据类型转变时触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("LinkedDataTypeConvert", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("连接数据类型转变") } Application.ApiEvent.AddApiEventListener("LinkedDataTypeConvert", func)

LinkedDataTypeChange

在连接数据类型改变时触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("LinkedDataTypeChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("连接数据类型改变") } Application.ApiEvent.AddApiEventListener("LinkedDataTypeChange", func)

LinkedDataTypeRefresh

在连接数据类型刷新时触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("LinkedDataTypeRefresh", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("连接数据类型刷新") } Application.ApiEvent.AddApiEventListener("LinkedDataTypeRefresh", func)

LinkedDataTypeCancel

在连接数据类型取消时触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("LinkedDataTypeCancel", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("连接数据类型取消") } Application.ApiEvent.AddApiEventListener("LinkedDataTypeCancel", func)

DocumentAfterPrint

该文档打印之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 工作簿对象。 PrintOutPage 必选 Object 打印页面对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (wb)=>{ alert("文档已打印") } Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", func)

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 文字事件文字事件

事件列表事件列表

名称名称 级别级别 类型类型 触发时机触发时机

DocumentOpen Application 通知型 文档打开时触发。

DocumentBeforeClose Application 询问型 任一打开的文档关闭之前触发此事件。

DocumentBeforeSave Application 询问型 任一打开的文档保存之前触发此事件。

DocumentAfterClose Application 通知型 任一打开的文档关闭之后触发此事件。

DocumentChange Application 通知型 任一打开的文档内容发生变化时触发此事件。

DocumentBeforePrint Application 询问型 任一打开的文档打印之前触发此事件。

DocumentNew Application 通知型 新建任一文档时触发此事件。

DocumentRightsInfo Application 通知型 当操作文档权限时会触发此事件。

DocumentBeforeCopy Application 询问型 在任一文档复制之前触发该事件。

DocumentBeforePaste Application 询问型 在任一文档粘贴之前触发该事件。

DocumentBeforeNew Application 询问型 在任一文档新建之前触发该事件。

DocumentBeforeOpen Application 询问型 在任一文档打开之前触发该事件。

DocumentAfterSave Application 通知型 在任一文档保存之后触发该事件。

DocumentViewFocusIn Application 通知型 在任一文档获取到焦点之后触发该事件。

DocumentViewFocusOut Application 通知型 在任一文档失去焦点之后触发该事件。

DocumentAfterPrint Application 通知型 在任一文档打印之后触发该事件。

WindowActivate Application 通知型 当激活文档窗口时触发此事件。

WindowDeactivate Application 通知型 任一文档窗口被切换到非激活状态时触发此事件。

WindowSelectionChange Application 通知型 活动窗口所选内容更改时将触发此事件。

WindowBeforeRightClick Application 询问型 当右击任一文档窗口之前触发此事件。

WindowBeforeDoubleClick Application 询问型 当双击任一文档窗口之前触发此事件。

ApplicationQuit Application 通知型 当退出文字组件进程时触发此事件。

AfterLogin Application 通知型 在用户登陆之后触发此事件。

AfterLogout Application 通知型 在用户登出之后触发此事件。

AfterVIPInfoChanged Application 通知型 在用户会员信息变化之后触发此事件。

AfterWebExtensionDataRangeChange Application 通知型 在网络扩展数据范围变化之后触发此事件。

AfterTaskPaneShow Application 通知型 当任务窗格显示之后触发此事件。

AfterTaskPaneHidden Application 通知型 当任务窗格隐藏之后触发此事件。

QueryDocumentPrintCopies Application 询问型 当打印复本排队时触发此事件。

ContentChange Application 通知型 当文档内容发生变化时触发此事件。

SelectionAfterStyleChange Application 通知型 当选择的内容字体变化之后触发此事件。

FileAfterSave Application 通知型 在文件保存之后触发该事件。

ContentControlAfterAdd Application 通知型 当内容控件被添加到文档之后触发此事件。

ContentControlBeforeDelete Application 通知型 当内容控件被从文档删除之前触发此事件。

ContentControlOnExit Application 通知型 当退出内容控件时触发此事件。

ContentControlOnEnter Application 通知型 当进入内容控件时触发此事件。

ContentControlBeforeStoreUpdate Application 通知型 当内容控件的内容去更新XML映射内容时触发此事件。

ContentControlBeforeContentUpdate Application 通知型 当内容控件的内容发生来自XML映射内容更新时触发此事件。

事件事件

DocumentOpen

文档打开时触发。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 打开的文档对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("打开文档") } Application.ApiEvent.AddApiEventListener("DocumentOpen", func)

DocumentBeforeClose

任一打开的文档关闭之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Cancel 必选 Boolean 如果设置其属性Value为true，则不关闭文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeClose", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(doc, cancal) { var msg = "是否要关闭文档？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("DocumentBeforeClose", func)

DocumentBeforeSave

任一打开的文档保存之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 关闭的文档对象。 SaveAsUI 必选 Boolean 如果为true则表示此次保存操作将会弹出保存或是另存为对话框。 Cancel 必选 Object 如果设置其属性Value为true，则不关闭文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(doc, cancal) { var msg = "您保存后要关闭吗？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("DocumentBeforeSave", func)

DocumentAfterClose

任一打开的文档关闭之后触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentAfterClose", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档已关闭") } Application.ApiEvent.AddApiEventListener("DocumentAfterClose", func)

DocumentChange

任一打开的文档关闭之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("DocumentChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档内容发生变化") } Application.ApiEvent.AddApiEventListener("DocumentChange", func)

DocumentBeforePrint

任一打开的文档打印之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Cancel 必选 Boolean 如果设置其属性Value为true，则不打印文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforePrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(doc, cancal) { var msg = "您要打印文档吗吗？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("DocumentBeforePrint", func)

DocumentNew

新建任一文档时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 新建的文档对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentNew", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("新建文档") } Application.ApiEvent.AddApiEventListener("DocumentNew", func)

DocumentRightsInfo

当操作文档权限时会触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 新建的文档对象。 RightsInfo 必选 Int 权限信息。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(doc, info) { var msg = "文档的权限为：" + info; alert(msg); } Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", func)

DocumentBeforeCopy

在任一文档复制之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Type 必选 Long 复制类型。 Cancel 必选 Object 如果设置其属性Value为true，则不复制。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Doc, Type, Cancal) { var msg = "是否要复制文档内容" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", func)

DocumentBeforePaste

在任一文档粘贴之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Cancel 必选 Object 如果设置其属性Value为true，则不粘贴。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Doc, Cancal) { var msg = "是否要粘贴文档内容" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", func)

DocumentBeforeNew

在任一文档新建之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Boolean 如果设置其属性Value为true，则不新建文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Cancal) { var msg = "是否要新建文档" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", func)

DocumentBeforeOpen

在任一文档打开之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 文档路径 Cancel 必选 Object 如果设置其属性Value为true，则不打开文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(FilePath, Cancal) { var msg = "是否要打开文档" + FilePath if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", func)

DocumentAfterSave

在任一文档保存之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Result 必选 Boolean 如果保存操作成功，则为true; 否则为false。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentAfterSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Result) { if(!Result) alert("保存成功") }; Application.ApiEvent.AddApiEventListener("DocumentAfterSave", func)

DocumentViewFocusIn

在任一文档获取到焦点之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentViewFocusIn", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档获取到焦点") } Application.ApiEvent.AddApiEventListener("DocumentViewFocusIn", func)

DocumentViewFocusOut

在任一文档失去焦点之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentViewFocusOut", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档失去焦点") } Application.ApiEvent.AddApiEventListener("DocumentViewFocusOut", func)

DocumentAfterPrint

在任一文档打印之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 PrintOutPage 必选 Object 打印页面对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档已打印") } Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", func)

WindowActivate

当激活文档窗口时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 激活文档对象。 Wn 必选 Window 激活窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowActivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, wn) { var msg = "您激活的窗口是: " + wn.Caption; alret(msg); } Application.ApiEvent.AddApiEventListener("WindowActivate", func)

WindowDeactivate

任一文档窗口被切换到非激活状态时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 激活文档对象。 Wn 必选 Window 激活窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowDeactivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(wb, wn) { var msg = "您取消激活的窗口是: " + wn.Caption; alret(msg); } Application.ApiEvent.AddApiEventListener("WindowDeactivate", func)

WindowSelectionChange

活动窗口所选内容更改时将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Object 选择区域。

语法语法

Application.ApiEvent.AddApiEventListener("WindowSelectionChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("窗口所选内容更改") } Application.ApiEvent.AddApiEventListener("WindowSelectionChange", func)

WindowBeforeRightClick

当右击任一文档窗口之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Object 选择区域。 Cancel 必选 Boolean 如果设置其属性Value为true，则取消单击。

语法语法

Application.ApiEvent.AddApiEventListener("WindowBeforeRightClick", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Cancal) { var msg = "是否要取消单击" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("WindowBeforeRightClick", func)

WindowBeforeDoubleClick

当双击任一文档窗口之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Object 选择区域。 Cancel 必选 Boolean 如果设置其属性Value为true，则取消双击。

语法语法

Application.ApiEvent.AddApiEventListener("WindowBeforeDoubleClick", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Cancal) { var msg = "是否要取消双击" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("WindowBeforeDoubleClick", func)

ApplicationQuit

当退出文字组件进程时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ApplicationQuit", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文字组件退出") } Application.ApiEvent.AddApiEventListener("ApplicationQuit", func)

AfterLogin

在用户登陆之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogin", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("用户已登陆") } Application.ApiEvent.AddApiEventListener("AfterLogin", func)

AfterLogout

在用户登出之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogout", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("用户已登出") } Application.ApiEvent.AddApiEventListener("AfterLogout", func)

AfterVIPInfoChanged

在用户会员信息变化之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterVIPInfoChanged", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("用户会员信息已变化") } Application.ApiEvent.AddApiEventListener("AfterVIPInfoChanged", func)

AfterWebExtensionDataRangeChange

在网络扩展数据范围变化之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterWebExtensionDataRangeChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("网络扩展数据范围已变化") } Application.ApiEvent.AddApiEventListener("AfterWebExtensionDataRangeChange", func)

AfterTaskPaneShow

当任务窗格显示之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("任务窗格已显示") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", func)

AfterTaskPaneHidden

当任务窗格隐藏之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("任务窗格已隐藏") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", func)

QueryDocumentPrintCopies

当打印复本排队时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Copies 必选 Int 要打印的份数。 Cancel 必选 Object 如果设置其属性Value为true，则不打印。

语法语法

Application.ApiEvent.AddApiEventListener("QueryDocumentPrintCopies", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Doc, Copies, Cancal) { var msg = "是否要打印文档" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("QueryDocumentPrintCopies", func)

ContentChange

当文档内容发生变化时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 Range 必选 Object 范围对象。 Type 必选 Int 变化类型。

语法语法

Application.ApiEvent.AddApiEventListener("ContentChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("文档内容发生变化") } Application.ApiEvent.AddApiEventListener("ContentChange", func)

SelectionAfterStyleChange

当选择的内容字体变化之后触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Object 选择区域。

语法语法

Application.ApiEvent.AddApiEventListener("SelectionAfterStyleChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("内容字体变化") } Application.ApiEvent.AddApiEventListener("SelectionAfterStyleChange", func)

FileAfterSave

在文件保存之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document 文档对象。 FilePath 必选 String 保存路径。 Format 必选 String 保存格式。

语法语法

Application.ApiEvent.AddApiEventListener("FileAfterSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Doc, FilePath, Format) { var msg = "文档以" + Format + "格式保存在" + FilePath alret(msg); } Application.ApiEvent.AddApiEventListener("FileAfterSave", func)

ContentControlAfterAdd

当内容控件被添加到文档之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlAfterAdd", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("内容控件被添加") } Application.ApiEvent.AddApiEventListener("ContentControlAfterAdd", func)

ContentControlBeforeDelete

当内容控件被从文档删除之前触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlBeforeDelete", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("内容控件被从文档删除") } Application.ApiEvent.AddApiEventListener("ContentControlBeforeDelete", func)

ContentControlOnExit

当退出内容控件时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlOnExit", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("退出内容控件") } Application.ApiEvent.AddApiEventListener("ContentControlOnExit", func)

ContentControlOnEnter

当进入内容控件时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlOnEnter", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("进入内容控件") } Application.ApiEvent.AddApiEventListener("ContentControlOnEnter", func)

ContentControlBeforeStoreUpdate

当内容控件的内容去更新XML映射内容时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlBeforeStoreUpdate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("内容控件的内容更新XML映射内容") } Application.ApiEvent.AddApiEventListener("ContentControlBeforeStoreUpdate", func)

ContentControlBeforeContentUpdate

当内容控件的内容发生来自XML映射内容更新时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("ContentControlBeforeContentUpdate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (doc)=>{ alert("内容控件的内容发生来自XML映射内容更新") } Application.ApiEvent.AddApiEventListener("ContentControlBeforeContentUpdate", func)

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 演示事件演示事件

事件列表事件列表

名称名称 级别级别 类型类型 触发时机触发时机

AfterLogin Application 通知型 用户登录之后触发该事件。

AfterLogout Application 通知型 用户登出之后触发该事件。

AfterPresentationOpen Application 通知型 任一演示文稿打开后触发该事件。

AfterTaskPaneHidden Application 通知型 当任务窗格隐藏之后触发此事件。

AfterTaskPaneShow Application 通知型 当任务窗格显示之后触发此事件。

DocumentAfterPrint Application 通知型 当文档打印之后触发此事件。

DocumentBeforeCopy Application 询问型 当文档复制之前触发此事件。

DocumentBeforeNew Application 询问型 当文档新建之前触发此事件。

DocumentBeforeOpen Application 询问型 当文档打开之前触发此事件。

DocumentBeforePaste Application 询问型 当文档粘贴之前触发此事件。

DocumentRightsInfo Application 通知型 当操作文档权限时会触发此事件。

FileAfterSave Application 通知型 当文件保存之后触发此事件。

NewPresentation Application 通知型 当新建演示文稿时触发此事件。

PresentationBeforeClose Application 询问型 任一打开的演示文稿关闭之前触发此事件。

PresentationBeforePrint Application 询问型 任一演示文稿打印之前触发此事件。

PresentationBeforeSave Application 询问型 任一演示文稿被保存之前触发此事件。

PresentationClose Application 通知型 任一演示文稿关闭时触发此事件。

PresentationCloseFinal Application 通知型 任一演示文稿关闭之后触发此事件。

PresentationNewSlide Application 通知型 任一演示文稿新建幻灯片时触发此事件。

PresentationOpen Application 通知型 任一演示文稿打开时触发此事件。

PresentationPrint Application 通知型 任一演示文稿打印时触发此事件。

PresentationSave Application 通知型 任一演示文稿保存时触发此事件。

Quit Application 通知型 任一演示文稿退出时触发此事件。

SlideSelectionChanged Application 通知型 演示文稿幻灯片选择变化时触发此事件。

SlideShowBegin Application 通知型 演示文稿开始播放时触发此事件。

SlideShowEnd Application 通知型 演示文稿结束播放时触发此事件。

SlideShowNextClick Application 通知型 演示文稿播放时下一次点击触发此事件。

SlideShowNextSlide Application 通知型 演示文稿播放下一个幻灯片时触发此事件。

SlideShowOnNext Application 通知型 演示文稿播放点击下一页时触发此事件。

SlideShowOnPrevious Application 通知型 演示文稿播放点击上一页时触发此事件。

WindowActivate Application 通知型 当激活演示窗口时触发此事件。

WindowSelectionChange Application 通知型 活动窗口所选内容更改时将触发此事件。

事件事件

AfterLogin

用户登录之后触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogin", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("用户登录") } Application.ApiEvent.AddApiEventListener("AfterLogin", func)

AfterLogout

用户登出之后触发该事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterLogout", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("用户登出") } Application.ApiEvent.AddApiEventListener("AfterLogout", func)

PresentationAfterOpen

任一演示文稿打开后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationAfterOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿打开") } Application.ApiEvent.AddApiEventListener("PresentationAfterOpen", func)

AfterTaskPaneHidden

当任务窗格隐藏之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("任务窗格隐藏") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneHidden", func)

AfterTaskPaneShow

当任务窗格显示之后触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("任务窗格显示") } Application.ApiEvent.AddApiEventListener("AfterTaskPaneShow", func)

DocumentAfterPrint

当文档打印之后触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 PrintOutPage 必选 Object 打印页面对象。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("文档打印") } Application.ApiEvent.AddApiEventListener("DocumentAfterPrint", func)

DocumentBeforeCopy

在任一文档复制之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 Type 必选 Long 复制类型。 Cancel 必选 Object 如果设置其属性Value为true，则不复制。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Doc, Type, Cancal) { var msg = "是否要复制文档内容" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeCopy", func)

DocumentBeforeNew

在任一文档新建之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Object 如果设置其属性Value为true，则不新建。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Cancal) { var msg = "是否要新建文档" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeNew", func)

DocumentBeforeOpen

在任一文档打开之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 演示路径 Cancel 必选 Object 如果设置其属性Value为true，则不打开演示文档。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(FilePath, Cancal) { var msg = "是否要打开文档" + FilePath if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforeOpen", func)

DocumentBeforePaste

在任一文档粘贴之前触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 Cancel 必选 Object 如果设置其属性Value为true，则不粘贴。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Pre, Cancal) { var msg = "是否要粘贴文档内容" if (confirm(msg) == true) { Cancal.Value = false; } else { Cancal.Value = true; } } Application.ApiEvent.AddApiEventListener("DocumentBeforePaste", func)

DocumentRightsInfo

当操作文档权限时会触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 RightsInfo 必选 Int 权限信息。

语法语法

Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(pre, info) { var msg = "文档的权限为：" + info; alert(msg); } Application.ApiEvent.AddApiEventListener("DocumentRightsInfo", func)

FileAfterSave

在文件保存之后触发该事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 FilePath 必选 String 保存路径。 Format 必选 String 保存格式。

语法语法

Application.ApiEvent.AddApiEventListener("FileAfterSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(Pre, FilePath, Format) { var msg = "文档以" + Format + "格式保存在" + FilePath alret(msg); } Application.ApiEvent.AddApiEventListener("FileAfterSave", func)

NewPresentation

当新建演示文稿时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("NewPresentation", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("新建演示文稿") } Application.ApiEvent.AddApiEventListener("NewPresentation", func)

PresentationBeforeClose

任一打开的演示文稿关闭之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 Cancel 必选 Boolean 如果设置其属性Value为true，则不关闭演示。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationBeforeClose", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(pre, cancal) { var msg = "是否要关闭文档？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("PresentationBeforeClose", func)

PresentationBeforePrint

任一演示文稿打印之前触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 Cancel 必选 Object 如果设置其属性Value为true，则不打印工作簿。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationBeforePrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

function func(pre, cancal) { var msg = "是否要取消打印？"; if (confirm(msg) == true) { cancal.Value = false; } else { cancal.Value = true; } }; Application.ApiEvent.AddApiEventListener("PresentationBeforePrint", func)

PresentationClose

任一演示文稿关闭时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationClose", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿关闭") } Application.ApiEvent.AddApiEventListener("PresentationClose", func)

PresentationCloseFinal

任一演示文稿关闭之后触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationCloseFinal", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿关闭") } Application.ApiEvent.AddApiEventListener("PresentationCloseFinal", func)

PresentationNewSlide

任一演示文稿新建幻灯片时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Slide 必选 Slide 幻灯片对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationNewSlide", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("新建幻灯片") } Application.ApiEvent.AddApiEventListener("PresentationNewSlide", func)

PresentationOpen

任一演示文稿打开时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationOpen", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿打开") } Application.ApiEvent.AddApiEventListener("PresentationOpen", func)

PresentationPrint

任一演示文稿打印时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationPrint", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿打印") } Application.ApiEvent.AddApiEventListener("PresentationPrint", func)

PresentationSave

任一演示文稿保存时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("PresentationSave", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿保存") } Application.ApiEvent.AddApiEventListener("PresentationSave", func)

Quit

任一演示文稿退出时触发此事件。

参数参数

无

语法语法

Application.ApiEvent.AddApiEventListener("Quit", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿退出") } Application.ApiEvent.AddApiEventListener("Quit", func)

SlideSelectionChanged

演示文稿幻灯片选择变化时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Range 必选 Object 选择对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideSelectionChanged", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("幻灯片选择变化") } Application.ApiEvent.AddApiEventListener("SlideSelectionChanged", func)

SlideShowBegin

演示文稿开始播放时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Shw 必选 Object 幻灯片窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowBegin", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿开始播放") } Application.ApiEvent.AddApiEventListener("SlideShowBegin", func)

SlideShowEnd

演示文稿结束播放时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowEnd", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("演示文稿结束播放") } Application.ApiEvent.AddApiEventListener("SlideShowEnd", func)

SlideShowNextClick

演示文稿播放时下一次点击触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Shw 必选 Object 幻灯片窗口对象。 Effect 必选 Object 操作对象

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowNextClick", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("点击") } Application.ApiEvent.AddApiEventListener("SlideShowNextClick", func)

SlideShowNextSlide

演示文稿播放下一个幻灯片时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Shw 必选 Object 幻灯片窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowNextSlide", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("播放下一个幻灯片") } Application.ApiEvent.AddApiEventListener("SlideShowNextSlide", func)

SlideShowOnNext

演示文稿播放点击下一页时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Shw 必选 Object 幻灯片窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowOnNext", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("点击下一页") } Application.ApiEvent.AddApiEventListener("SlideShowOnNext", func)

SlideShowOnPrevious

演示文稿播放点击上一页时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Shw 必选 Object 幻灯片窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("SlideShowOnPrevious", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("点击上一页") } Application.ApiEvent.AddApiEventListener("SlideShowOnPrevious", func)

WindowActivate

当激活演示窗口时触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pre 必选 Presentation 演示对象。 Wn 必选 Object 窗口对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowActivate", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("激活演示窗口") } Application.ApiEvent.AddApiEventListener("WindowActivate", func)

WindowSelectionChange

活动窗口所选内容更改时将触发此事件。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Object 选择范围对象。

语法语法

Application.ApiEvent.AddApiEventListener("WindowSelectionChange", callbackFunc)

示例示例

示例代码示例代码 复制复制

let func = (slide)=>{ alert("所选内容更改") } Application.ApiEvent.AddApiEventListener("WindowSelectionChange", func)

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

## PluginStorage 对象对象

通过PluginStorage 对象可以实现一个 WPS 加载项中的多个网页之间的数据共享。 注意通过PluginStorage 对象只能传递简单的数据类型，JSON 数据建议转成字符串后再进行共享。

说明说明 PluginStorage 对象是Application对象的子对象，每一个 WPS 加载项都只有一个 PluginStorage 实例。 注意 PluginStorage 对象不能持久化，所有数据只在关闭 WPS 加载项之前有效。 数据 持久化可以将数据写入本地文件中，参考FileSystem 对象对象 。

示例代码示例代码 复制复制

let ps = Application.PluginStorage

下列代码示例往PluginStorage中存储一个key为"count", 值为5的代码，如果PluginStorage中key为count的代码已存在，则会用新值进行覆盖。

示例代码示例代码 复制复制

Application.PluginStorage.setItem("count", 5)

以下示例枚举出PluginStorage中所有的key。

示例代码示例代码 复制复制

let ps = Application.PluginStorage let itemCounts = ps.length; for(let i = 0; i < itemCounts; ++i){ let itemKey = ps.Key(i) //如果要取到对应的value，使用ps.GetItem(itemKey) console.log(itemKey) }

有关PluginStorage的详细方法和属性，可以参考PluginStorage方法和属性相关介绍

方法方法

名称名称 说明说明

clear 清空容器中的所有键值对。

getItem 返回key对应的value。

key 返回index对应的key。

removeItem 删除容器中key对应的键值对。

setItem 向容器中添加键值对。

属性属性

名称名称 说明说明

length 返回PluginStorage容器中键值对的个数

成员方法成员方法

PluginStorage.clear

清空容器中的所有键值对。

语法语法

express.clear()

express 一个代表 PluginStorage 对象的变量。

示例示例

示例代码示例代码 复制复制

下列代码示例清空PluginStorage中的元素。 Application.PluginStorage.clear()

PluginStorage.getItem

返回key对应的value。

语法语法

express.getItem(key)

express 一个代表 PluginStorage 对象的变量。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 key 必选 整数、字符串整数、字符串 key的数据类型只能是简单类型，具体来说可以是整数或字符串，推荐使用具有命名意义的字符串作为key.

示例示例

示例代码示例代码 复制复制

下列代码获取key为count的value并在控制台输出。 let value = Application.PluginStorage.getItem("count") if (value){ console.log(value) }

PluginStorage.key

返回index对应的key。

语法语法 express.key(index)

express 一个代表 PluginStorage 对象的变量。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 index 必选 整数整数 index的起始值从0开始，常见的用法是先用length属性取到元素个数，然后用此方法来得到对应的key

示例示例

示例代码示例代码 复制复制

下列代码获取容器中第1个元素的key并在控制台输出。 let count = Application.PluginStorage.length if (count > 0){ let firstkey = Application.PluginStorage.key(0) console.log(firstkey) }

PluginStorage.removeItem

删除容器中key对应的键值对。

语法语法

express.removeItem(key)

express 一个代表 PluginStorage 对象的变量。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 key 必选 整数、字符串整数、字符串 如果容器中找不到key对应的键值对，则什么都不做

示例示例

示例代码示例代码 复制复制

下列代码用于删除key为"count"的键值对。 Application.PluginStorage.removeItem("count")

PluginStorage.setItem

向容器中添加键值对。

语法语法

express.setItem(key,value)

express 一个代表 PluginStorage 对象的变量。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 key 必选 整数、字符串整数、字符串 key的数据类型只能是简单类型，具体来说可以是整数或字符串，推荐使用具有命名意义的字符串作为key. value 必选 Variant {description}

示例示例

示例代码示例代码 复制复制

下列代码用于将key为"count"，值为5的键值对存入容器。 Application.PluginStorage.setItem("count", 5)

成员属性成员属性

PluginStorage.length

返回PluginStorage容器中键值对的个数

语法语法 express.length

express 一个代表 PluginStorage 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# FileSystem 对象对象

FileSystem 对象包括对文件和文件夹的一些基本和常见的操作接口，后续会根据实际需求持续增加。

### 说明说明

以下代码示例用于判断在临时目录下是否有a.txt这个文件

示例代码示例代码 复制复制

let tempPath = Application.Env.GetTempPath() if (Application.FileSystem.Exists(tempPath + 'a.txt')) alert("a.txt文件存在")

### 方法方法

名称名称 说明说明

AppendFile 往文件末尾添加数据

copyFileSync 生成文件副本

Exists 判断一个文件和文件夹是否存在。

existsSync 判断目录是否存在

Mkdir 根据给定的path创建一个文件夹。

mkdirSync 创建目录

mkdtempSync 创建临时目录

readAsBinaryString 读取指定路径的文件，返回二进制字符串数据。

readdirSync 获取目录下的子目录对象数组（包含目录相关属性）

ReadFile 获取文件的内容

readFileString 读取指定路径的文件，返回字符串。

Remove 删除指定的path所代表的文件或文件夹。

rmdirSync 删除目录

tmpdir 获取系统的临时文件目录

unlinkSync 删除文件

writeAsBinaryString 写二进制字符串对象到指定文件。

WriteFile 创建文件

writeFileString 写字符串到指定路径的文件。

### 属性属性

名称名称 说明说明 Reserve

### 成员方法成员方法

FileSystem.AppendFile

往文件末尾添加数据

### 语法语法

express.AppendFile(FilePath,Data)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 要写入的文件名 Data 必选 String 要写入文件的内容

FileSystem.copyFileSync

生成文件副本

### 语法语法

express.copyFileSync(SrcFilePath,DestFilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 SrcFilePath 必选 String 源文件的路径包括文件名称 DestFilePath 必选 String 新创建的文件副本文件名称

FileSystem.Exists

判断一个文件和文件夹是否存在。

### 语法语法

express.Exists(path)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 path 必选 String 文件或文件夹的路径，这个路径一定要是一个全路径。

FileSystem.existsSync

判断目录是否存在

### 语法语法

express.existsSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 要判断的文件的名称

FileSystem.Mkdir

根据给定的path创建一个文件夹。

### 语法语法

express.Mkdir(path)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 path 必选 String 要创建的文件夹的路径，这个路径一定要是一个全路径。

FileSystem.mkdirSync

创建目录

### 语法语法

express.mkdirSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 创建目录的路径

FileSystem.mkdtempSync

创建临时目录

### 语法语法

express.mkdtempSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

FilePath 必选 String 临时目录的路径

FileSystem.readAsBinaryString

读取指定路径的文件，返回二进制字符串数据。

### 语法语法

express.readAsBinaryString(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 文件路径

FileSystem.readdirSync

获取目录下的子目录对象数组（包含目录相关属性）

### 语法语法

express.readdirSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 要获取的目录的路径

FileSystem.ReadFile

获取文件的内容

### 语法语法

express.ReadFile(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 读取文件内容

FileSystem.readFileString

读取指定路径的文件，返回字符串。

### 语法语法

express.readFileString(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

FilePath 必选 String 文件路径

FileSystem.Remove

删除指定的path所代表的文件或文件夹。

### 语法语法

express.Remove(path)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 path 必选 String 要删除的文件或文件夹的路径，这个路径一定要是一个全路径。

FileSystem.rmdirSync

删除目录

### 语法语法

express.rmdirSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 要删除的文件目录路径

FileSystem.tmpdir

获取系统的临时文件目录

### 语法语法

express.tmpdir()

express 一个代表 FileSystem 对象的变量。

FileSystem.unlinkSync

删除文件

### 语法语法

express.unlinkSync(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 要删除的文件路径

FileSystem.writeAsBinaryString

写二进制字符串对象到指定文件。

### 语法语法

express.writeAsBinaryString(FilePath,binaryString)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 文件路径 binaryString 必选 String 二进制字符串数据

FileSystem.WriteFile

创建文件

### 语法语法

express.WriteFile(FilePath)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 文件路径

FileSystem.writeFileString

写字符串到指定路径的文件。

### 语法语法

express.writeFileString(FilePath,data)

express 一个代表 FileSystem 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FilePath 必选 String 文件路径 data 必选 String 字符串数据

### 成员属性成员属性

FileSystem.Reserve

### 语法语法

express.Reserve

express 一个代表 FileSystem 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Env 对象对象

Env 对象主要用于取系统环境基本信息，这个对象目前提供了取用户目录、临时目录等相关信息，后续可能会根据实际需求不

断扩充。

### 说明说明

以下代码示例，取到系统临时目录并打印到控制台。

示例代码示例代码 复制复制

let tempPath = Application.Env.GetTempPath() console.log(tempPath) //如果是jde环境，则是Debug.Print(tempPath)

### 方法方法

名称名称 说明说明

GetAppDataPath 取系统%AppData%/Roming目录的路径，仅Windows平台适用。

GetDesktopDpi 取系统DPI。

GetHomePath 取系统HOME目录的路径，代表当前用户主目录。

GetProgramDataPath 取系统ProgramData目录的路径，仅windows平台适用。

GetProgramFilesPath 取系统ProgramFiles目录的路径，仅Windows平台适用。

GetRootPath 取系统根目录的路径。

GetTempPath 取系统临时目录的路径。

### 成员方法成员方法

Env.GetAppDataPath

取系统%AppData%/Roming目录的路径，仅Windows平台适用。

### 语法语法

express.GetAppDataPath()

express 一个代表 Env 对象的变量。

Env.GetDesktopDpi

取系统DPI。

### 语法语法

express.GetDesktopDpi()

express 一个代表 Env 对象的变量。

Env.GetHomePath

取系统HOME目录的路径，代表当前用户主目录。

### 语法语法

express.GetHomePath()

express 一个代表 Env 对象的变量。

Env.GetProgramDataPath

取系统ProgramData目录的路径，仅windows平台适用。

### 语法语法

express.GetProgramDataPath()

express 一个代表 Env 对象的变量。

Env.GetProgramFilesPath

取系统ProgramFiles目录的路径，仅Windows平台适用。

### 语法语法

express.GetProgramFilesPath()

express 一个代表 Env 对象的变量。

Env.GetRootPath

取系统根目录的路径。

### 语法语法

express.GetRootPath()

express 一个代表 Env 对象的变量。

Env.GetTempPath

取系统临时目录的路径。

### 语法语法

express.GetTempPath()

express 一个代表 Env 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# OAAssist 对象对象

### 方法方法

名称名称 说明说明

CoCreateInstance 根据给定的程序标识符从注册表找出对应的类标识符，再创建对应类的实例。

DownloadFile 从指定的url处下载文件，返回的字符串为保存地址。

ExecuteInCOMAddIns 执行COM加载项

ShellExecute 使用壳服务打开网页或调起进程。

UploadFile 向指定链接上传文件。

WebNotify 向客户端发送推送。

### 成员方法成员方法

OAAssist.CoCreateInstance

根据给定的程序标识符从注册表找出对应的类标识符，再创建对应类的实例。

### 语法语法

express.CoCreateInstance(ProgId)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 ProgId 必选 String 程序标识符

OAAssist.DownloadFile

从指定的url处下载文件，返回的字符串为保存地址。

### 语法语法

express.DownloadFile(Url,Success,Fail)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Url 必选 String 下载链接 Success 可选 Variant 下载成功时的回调函数 Fail 可选 Variant 下载失败时的回调函数

### 返回值返回值

String

### 说明说明

第二、三个参数传入时为异步下载，不传入时为同步下载。

OAAssist.ExecuteInCOMAddIns

执行COM加载项

### 语法语法

express.ExecuteInCOMAddIns(Addin,OnAction)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Addin 必选 String COM加载项名字 OnAction 必选 String 执行函数名字

OAAssist.ShellExecute

使用壳服务打开网页或调起进程。

### 语法语法

express.ShellExecute(Url,Params)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Url 可选 String 网页或进程的地址 Params 可选 String 启动参数

### 说明说明

当不传入参数时，该函数立即返回。对于带有“http”或“https”字样的地址，会打开对应的网页。以下是启动wps进程的参 数:

传入参数传入参数 启动进程启动进程

ksowebstartupwps WPS文字

ksowebstartupwpp WPS演示

ksowebstartupet WPS表格

ksowpscloudsvr WPS云服务

同样也可直接传入地址调起其余进程。

注意：当前进程的终止并不会导致被调起进程的终止。

OAAssist.UploadFile

向指定链接上传文件。

### 语法语法

express.UploadFile(FileName,FilePath,Url,Field,Success,Fail)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 FileName 必选 String 上传文件名 FilePath 必选 String 文件路径 Url 必选 String 上传链接 Field 可选 String https Header中上传时的name属性 Success 可选 Variant 上传成功时的回调函数 Fail 必选 Variant 上传失败时的回调函数

### 返回值返回值

Boolean

OAAssist.WebNotify

向客户端发送推送。

### 语法语法

express.WebNotify(notifyStr,Force)

express 一个代表 OAAssist 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 notifyStr 必选 String 推送的内容 Force 必选 Boolean 是否强制

### 返回值返回值

Boolean

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# JavaScript运行时说明运行时说明

WPS宏编辑器集成了一个V8 引擎的 JavaScript 运行时，支持大部分ES6语法，因此宏编辑器支持JavaScri

pt 标准内置对象，注意注意，JS内置对象和浏览器的内置对象是不同的，WPS宏编辑器集成的是JavaScript 运行时 ，而不是浏览器，因此WPS宏编辑器不支持浏览器的内置对象。具体API参见https://developer.mozilla.org/zh-C

N/docs/Web/JavaScript/Reference/Global_Objects 。如以下代码输出圆周率，可以在WPS宏编辑器中执行：

示例代码示例代码 复制复制

function abcd() { Console.log(Math.PI); }

使用过程中遇到的编译错误和语法错误具体原因和细节可以在 https://developer.mozilla.org/en-US/docs/We

b/JavaScript/Reference/Errors 上查看。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 事件概述事件概述

通过 WPS宏编辑器能够对 WPS 应用程序发出的事件添加 JavaScript 方法进行处理。 在通知型事件中，可

以接收已经发生变化，比如通过WindowActivate事件，可以对文档的切换做一些功能性处理； 在询问型事件中 ，可以控制是否继续执行当前操作，比如通过WorkbookBeforeClose事件，可以取消文档的关闭。

示例代码示例代码 复制复制

function Application_WorkbookBeforeClose(Wb, Cancel) { if (!Wb.Saved) { MsgBox("请先保存文档！") Cancel.Value = true; } }

代码说明代码说明

注册WorkbookBeforeClose监听事件，在工作簿关闭时，判断该工作簿是否保存，如果未保存，弹出“请先 保存文档！”提示，并取消关闭

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Application 事件事件

事件列表事件列表

名称名称 触发时机触发时机 NewWorkbook 当新建工作簿时触发此事件。 SheetActivate 当激活任一工作表时触发此事件。 SheetBeforeDelete 当删除任一工作表之前触发 此事件。 SheetBeforeDoubleClick 当双击任一工作表之前触发此事件。 SheetBeforeRightClick 当右击任一工作表之前触发此事件 。 SheetCalculate 在任一工作表进行计算时触发此事件。 SheetChange 当用户或外部链接更改了任一工作表中的单元格时触发此事件。 SheetDeactivate 当任一工作表被切换到非激活状态时 触发此事件。 SheetFollowHyperlink 单击任一工作表的超链接时触 发此事件。 SheetSelectionChange 任一工作表上的选定区域发生更改时，将触发此事件。 WindowActivate 任一工作簿窗口被激活时，将触发此事件。 WindowDeactivate 任一工作簿窗口被切换到非激活状态时 触发此事件。 WindowResize 任一工作簿窗口调整大小时将触发此事件。 WorkbookActivate 任一工作簿被激活时，将触发此事件。 WorkbookAfterSave 任一工作簿被保存之后触发此事件。 WorkbookBeforeClose 任一打开的工作簿关闭之前触发此事件。 WorkbookBeforePrint 在打印任一打开的工作簿之前触发此事件。 WorkbookBeforeSave 任一工作簿被保存之前触发 此事件。 WorkbookDeactivate 任一工 作簿被切换到非激活状态时触发此事件。 WorkbookNewSheet 在任一打开的工作簿中创建新工作表时触发此事件。 WorkbookOpen 当打开一个工作簿时触发此事件。

事件事件

NewWorkbook

当新建一个工作簿时触发此事件。

语法语法

function Application_NewWorkbook(Wb) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 新建的工作簿对象

示例示例

当新建一个工作簿时，弹消息框提醒用户新建了工作簿。

示例代码示例代码 复制复制

function Application_NewWorkbook(Wb) { MsgBox("您新建了工作簿："+Wb.Name) }

SheetActivate

当激活任一工作表时触发此事件。

语法语法

function Application_SheetActivate (Sh) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 激活的工作表对象。

示例示例

当新建一个工作簿时，弹消息框提醒用户激活了工作表。

示例代码示例代码 复制复制

function Application_SheetActivate(Sh) { MsgBox("您激活了工作表："+Sh.Name) }

SheetBeforeDelete

当删除任一工作表之前 触发此事件。

语法语法

function Application_SheetBeforeDelete (Sh)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 即将删除的工作表对象。

示例示例

当删除任一工作表之前，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetBeforeDelete(Sh) { MsgBox("您即将删除工作表："+Sh.Name) }

SheetBeforeDoubleClick

双击任一工作表之前触发此事件。

语法语法

function Application_SheetBeforeDoubleClick(Sh, Target, Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 双击的工作表对象。

Target 必选 Range对象 双击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次双击。

示例示例

双击任一工作表之前，如果双击操作在A1单元格上，则不响应双击操作（默认是进入编辑），否则 则继续响应。

示例代码示例代码 复制复制

function Application_SheetBeforeDoubleClick(Sh, Target, Cancel) { if (Target.Address() == "$A$1") Cancel.Value = true; }

SheetBeforeRightClick

右击任一工作表之前触发此事件。

语法语法

function Application_SheetBeforeRightClick(Sh, Target, Cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 右击的工作表对象。

Target 必选 Range对象 右击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次右击。

示例示例

右击任一工作表之前，如果右击操作在A1单元格上，则不响应右击操作（默认是弹出右键菜单）， 否则则继续右击。

示例代码示例代码 复制复制

function Application_SheetBeforeRightClick(Sh, rg, cancel) { if (Target.Address() == "$A$1") Cancel.Value = true; }

SheetCalculate

任一工作表进行计算时触发此事件。

语法语法

function Application_SheetCalculate(Sh)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 计算的工作表对象。

示例示例

当工作表进行计算时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetCalculate(Sh) { MsgBox("工作表正在计算："+Sh.Name) }

SheetChange

当用户或外部链接更改了任一工作表中的单元格时触发此事件。

语法语法

function Application_SheetChange(Sh, Target) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 修改的工作表对象。

Target 必选 Range对象 修改的单元格Range对象

示例示例

工作表中的单元格被修改时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetChange(Sh, rg) { MsgBox("工作表:" + Sh.Name + "。区域："+Target.Address() + "。发生了修改") }

SheetDeactivate

当任一工作表被切换到非激活状态时触发此事件。

语法语法

function Application_SheetDeactivate(Sh)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 被切换到非激活状态的工作表对象。

示例示例

任一工作表被切换到非激活状态时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetDeactivate(Sh) { MsgBox("被切换到非激活的工作表："+Sh.Name) }

SheetFollowHyperlink

单击任一工作表的超链接时触发此事件。

语法语法

function Application_SheetFollowHyperlink(Sh, Target)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 超链接所在的工作表对象。

Target 必选 Hyperlink对象 Hyperlink对象，代表超链接的目标。

示例示例

单击任一工作表的超链接时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetFollowHyperlink(Sh, Target) { MsgBox("你点击了工作表\"" + Sh.Name + "\"上的超链接："+Target.Address) }

SheetSelectionChange

该工作簿任一工作表上的选定区域发生更改时，将触发此事件。

语法语法

function Application_SheetSelectionChange(Sh, Target)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 选区改变的工作表对象。

Target 必选 Range 新选定的区域。

示例示例

当工作表上的选定区域发生更改时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetSelectionChange(Sh, Target) { MsgBox("工作表\"" + Sh.Name + "\"选中的区域是："+Target.Address() + "。") }

WindowActivate

任一工作簿窗口被激活时，将触发此事件。

语法语法

function Application_WindowActivate (Wb, Wn)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Wb 必选 Workbook 激活工作簿对象。

Wn 必选 Window 激活窗口对象。

示例示例

任一工作簿窗口被激活时，输出激活的窗口标题。

示例代码示例代码 复制复制

function Application_WindowActivate(Wb, Wn) { Debug. Print("当前激活窗口是："+ Wn.Caption) }

WindowDeactivate

任一工 作簿窗口被切换到非激活状态时触发此事件。

语法语法

function Application_WindowDeactivate (Wb, Wn)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Wb 必选 Workbook 被切换到非激活状态的工作簿对象。

Wn 必选 Window 被切换到非激活状态的窗口对象。

示例示例

任一工 作簿窗口被切换到非激活状态时 ，输出激活的窗口标题。

示例代码示例代码 复制复制

function Application_WindowDeactivate(Wb, Wn) { Debug.Print("当前被切换到非激活窗口是："+ Wn.Caption) }

WindowResize

任一工作簿窗口调整大小时将触发此事件。

语法语法

function Application_WindowResize (Wb, Wn)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Wb 必选 Workbook 调整窗口大小的工作簿对象。

Wn 必选 Window 调整窗口大小的窗口对象。

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_WindowResize(Wb, Wn) { MsgBox( "窗口\""+ Wn.Caption + "\"大小发生了改变。") }

WorkbookActivate

工作簿被激活时，将触发此事件。

语法语法

function Application_WorkbookActivate(Wb)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 被切换的工作簿

示例示例

工作簿被激活时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_WorkbookActivate(Wb) { MsgBox("工作簿:" + Wb.Name +"被激活了。"); }

WorkbookAfterSave

工作簿被保存之后触发此事件。

语法语法

function Application_WorkbookAfterSave(Wb, Success)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 保存的工作簿 Success 必选 Boolean 如果保存操作成功，则为true; 否则为false。

示例示例

工作簿被保存后，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_WorkbookAfterSave(Wb, Success) { if (Success) { MsgBox("文档被成功保存！") } }

WorkbookBeforeClose

有工作簿被关闭之前触发此事件。

语法语法

function Application_WorkbookBeforeClose(Wb, Cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 关闭的工作簿 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次关闭。

示例示例

有工作簿被关闭时，弹消息框询问用户是否取消，用户点击“是”就会取消关闭工作簿。

示例代码示例代码 复制复制

function Application_WorkbookBeforeClose(Wb, Cancel) { var ret = MsgBox("工作簿:"+ Wb.Name+"正在关闭。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

WorkbookBeforePrint

有工作簿被打印之前触发此事件

语法语法

function Application_WorkbookBeforePrint(Wb, Cancel)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 打印的工作簿 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次打印。

示例示例

有工作簿被印前时，弹消息框询问用户是否取消，用户点击“是”就会取消打印工作簿。

示例代码示例代码 复制复制

function Application_WorkbookBeforePrint(Wb, Cancel) { var ret = MsgBox("工作簿:"+ Wb.Name+"即将打印。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

WorkbookBeforeSave

有工作簿被保存之前触发此事件。

语法语法

function Application_WorkbookBeforeSave(Wb, SaveAsUI，Cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 保存的工作簿 SaveAsUI 必选 Boolean 如果为true则表示此次保存操作将会弹出保存或是另存为对话框。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次保存。

示例示例

有工作簿被保存之前，如果会弹出保存或是另存为对话框的情况，弹消息框询问用户是否取消，用 户点击“是”就会取消保存工作簿。

示例代码示例代码 复制复制

function Application_WorkbookBeforeSave(Wb, SaveAsUI, Cancel) { if (SaveAsUI){ var ret = MsgBox("工作簿:"+ Wb.Name+"即将保存。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; } }

WorkbookDeactivate

工作簿被切换到非激活（非活动）状态时触发此事件。

语法语法

function Application_WorkbookDeactivate(Wb)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 被切换的工作簿

示例示例

工作簿被切换到非激活（非活动）状态时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_WorkbookDeactivate(Wb) { MsgBox("工作簿:" + Wb.Name +"被切换到非激活了。"); }

WorkbookNewSheet

该工作簿中创建新工作表时触发此事件。

语法语法

function Application_WorkbookNewSheet(Wb, Sh)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 新建工作表所在的工作簿 Sh 必选 Object 新建的工作表

示例示例

创建新工作表时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_WorkbookNewSheet(Wb, Sh) { MsgBox("新建了工作表：" + Sh.Name) }

WorkbookOpen

工作簿打开时触发此事件

语法语法

function Application_WorkbookOpen(Wb)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Wb 必选 Workbook 打开的工作簿

示例该工作簿被打开时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_WorkbookOpen(Wb) { MsgBox("打开了工作簿：" + Wb.Name); }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Workbook 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Activate 该工作簿被激活时，将触发此事件。 AfterSave 该工作簿被保存之后触发此事件。 BeforeClose 该工作簿关闭之前触发此事件。 BeforePrint 该工作簿打印之前触发此事件。 BeforeSave 该工作簿保存之前触发此事件。 Deactivate 该工作簿被切换到非激活状态时触发此事件。 NewSheet 该工作簿中创建新工作表时触发此事件。 Open 该工作簿打开时触发此事件。 SheetActivate 当激活该工作簿任一工作表时触发 此事件。 SheetBeforeDelete 删除该工作簿任一 工作表之前触发此事件。 SheetBeforeDoubleClick 双击该工作簿任一工作表之前 触发此事件。 SheetBeforeRightClick 右击该工作簿任一工作表之前 触发此事件。 SheetCalculate 在该工作簿任一工作表进行 计算时触发此事件。 SheetChange 当用户或外部链接更改了该工作簿任一 工作表中的单元格时触发此事件。 SheetDeactivate 当该工作簿任一 工作表被切换到非激活状态时触发此事件。 SheetFollowHyperlink 单击该工作簿任一 工作表的超链接时触发 此事 件。 SheetSelectionChange 该工作簿任一工作表上的选定区域发生更改时，将触发此事件。

事件事件

Activate

该工作簿被激活时，将触发此事件。

语法语法

function Workbook_Activate() { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

该工作簿被激活时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_Activate() { MsgBox("您激活了当前工作簿") }

AfterSave

该工作簿被保存之后触发此事件。

语法语法

function Workbook_AfterSave (Success)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Success 必选 Boolean 如果保存操作成功，则为true; 否则为false。

示例示例

该工作簿被保存后，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_AfterSave(Success) { if (Success) { MsgBox("文档被成功保存！") } }

BeforeClose

该工作簿关闭之前触发此事件。

语法语法

function Workbook_BeforeClose(Cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次关闭。

示例示例

该工作簿被关闭时，弹消息框询问用户是否取消，用户点击“是”就会取消关闭工作簿。

示例代码示例代码 复制复制

function Workbook_BeforeClose(Cancel) { var ret = MsgBox("工作簿正在关闭。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

BeforePrint

该工作簿打印之前触发此事件

语法语法

function Workbook_BeforePrint(Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次打印。

示例示例

该工作簿打印前时，弹消息框询问用户是否取消，用户点击“是”就会取消打印工作簿。

示例代码示例代码 复制复制

function Workbook_BeforePrint(Cancel) { var ret = MsgBox("工作簿即将打印。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

BeforeSave

该工作簿保存之前触发此事件。

语法语法

function Workbook_BeforeSave(SaveAsUI，Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 SaveAsUI 必选 Boolean 如果为true则表示此次保存操作将会弹出保存或是另存为对话框。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次保存。

示例示例

对该工作簿保存之前，如果会弹出保存或是另存为对话框的情况，弹消息框询问用户是否取消，用 户点击“是”就会取消保存工作簿。

示例代码示例代码 复制复制

function Workbook_BeforeSave(SaveAsUI, Cancel) { if (SaveAsUI){ var ret = MsgBox("工作簿即将保存。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; } }

Deactivate

该工作簿被切换到非激活（非活动 ）状态时触发此事件。

语法语法

function Workbook_Deactivate()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

示例示例

该工作簿被切换到非激活（非活动）状态时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_Deactivate() { MsgBox("工作簿被切换到非激活了。"); }

NewSheet

该工作簿中创建新工作表时触发此事件。

语法语法

function Workbook_NewSheet(Sh) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sh 必选 Object 新建的工作表

示例示例

该工作簿创建新工作表时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_NewSheet(Sh) { MsgBox("新建了工作表：" + Sh.Name) }

Open

该工作簿打开时触发此事件

语法语法

function Workbook_Open()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

该工作簿被打开时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_Open() { MsgBox("工作簿被打开了。"); }

SheetActivate

当激活该工作簿任一工作表时 触发此事件。

语法语法

function Workbook_SheetActivate (Sh) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 激活的工作表对象。

示例示例

当激活了工作表时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Application_SheetActivate(Sh) { MsgBox("您激活了工作表："+Sh.Name) }

SheetBeforeDelete

删除该工作簿任一工作表之前 触发此事件。

语法语法

function Workbook_SheetBeforeDelete (Sh)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 删除的工作表对象。

示例示例

删除该工作簿任一工作表之前，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetBeforeDelete(Sh) { MsgBox("您删除了工作表："+Sh.Name) }

SheetBeforeDoubleClick

双击该工作簿任一工作表之前触发此事件。

语法语法

function Workbook_SheetBeforeDoubleClick (Sh, Target, Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 双击的工作表对象。

Target 必选 Range对象 双击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次双击。

示例示例

双击该工作簿任一工作表之前，如果双击操作在A1单元格上，则不响应双击操作（默认是进入编 辑），否则则继续响应。

示例代码示例代码 复制复制

function Workbook_SheetBeforeDoubleClick(Sh, Target, Cancel) { if (Target.Address() == "$A$1") Cancel.Value = true; }

SheetBeforeRightClick

右击该工作簿任一工作表之前触发 此事件。

语法语法

function Workbook_SheetBeforeRightClick (Sh, Target, Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 右击的工作表对象。

Target 必选 Range对象 右击区域所在的单元格对象。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次右击。

示例示例

右击该工作簿任一工作表之前，如果右击操作在A1单元格上，则不响应右击操作（默认是弹出右键 菜单），否则则继续右击。

示例代码示例代码 复制复制

function Workbook_SheetBeforeRightClick(Sh, Target, Cancel) { if (Target.Address() == "$A$1") Cancel.Value = true; }

SheetCalculate

该工作簿任一工作表进行计算时触发此事件。

语法语法

function Workbook_SheetCalculate (Sh) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 计算的工作表对象。

示例示例

当工作表进行计算时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetCalculate(Sh) { MsgBox("工作表正在计算："+Sh.Name) }

SheetChange

当用户或外部链接更改了该工作簿任一工作表中的单元格时触发 此事件。

语法语法

function Workbook_SheetChange (Sh, Target)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 修改的工作表对象。

Target 必选 Range对象 修改的单元格Range对象

示例示例

工作表中的单元格被修改时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetChange(Sh, Target) { MsgBox("工作表:" + Sh.Name + "。区域："+Target.Address() + "。发生了修改") }

SheetDeactivate

当该工作簿任一工作表被切换到非激活状态时 触发此事件。

语法语法

function Workbook_SheetDeactivate (Sh)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 被切换到非激活状态的工作表对象。

示例示例

任一工作表被切换到非激活状态时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetDeactivate(Sh) { MsgBox("被切换到非激活的工作表："+Sh.Name) }

SheetFollowHyperlink

单击该工作簿任一工作表的超链接 时触发此事 件。

语法语法

function Workbook_SheetFollowHyperlink (Sh, Target) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 超链接所在的工作表对象。

Target 必选 Hyperlink对象 Hyperlink对象，代表超链接的目标。

示例示例

单击该工作簿任一工作表的超链接时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetFollowHyperlink(Sh, Target) { MsgBox("你点击了工作表\"" + Sh.Name + "\"上的超链接："+Target.Address) }

SheetSelectionChange

该工作簿任一工作表上的选定区域发生更改时，将触发此事件。

语法语法

function Workbook_SheetSelectionChange (Sh, Target)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明

Sh 必选 Object 选区改变的工作表对象。

Target 必选 Range 新选定的区域。

示例示例

当工作表上的选定区域发生更改时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Workbook_SheetSelectionChange(Sh, Target) { MsgBox("工作表\"" + Sh.Name + "\"选中的区域是："+Target.Address() + "。") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Application 事件事件

事件列表事件列表

名称名称 触发时机触发时机 DocumentBeforeClose 当文档关闭前时触发此事件。 DocumentBeforePrint 当文档打印之前时触发此事件。 DocumentChange 当创建新文档、打开已有文档或者切换激活文档时触发此事件。 DocumentOpen 当任一文档打开时触发此事件。 NewDocument 当创建新文档时触发 此事件。 Quit 当关闭退出文字组件进程时触发此事件。 WindowActivate 当激活文档窗口时触发此事件。 WindowBeforeDoubleClick 当双击任一文档窗口之前触发 此事件。 WindowBeforeRightClick 当右击任一文档窗口之前 触发此事件。 WindowDeactivate 任一文档 窗口被切换到非激活状态时触发此事件。 WindowSelectionChange 活动窗口所选内容更改时将触发此事件。 WindowSize 任一文档窗口调整大小时将触发 此事件。 XMLSelectionChange 当前所选内容的 XML 父节点更改时将触发此事件。 XMLValidationError 文档中存在验证错误时时，将触发此事件。

事件事件

DocumentBeforeClose

当文档关闭前时触发此事件。

语法语法

function Application_DocumentBeforeClose (Doc, Cancel) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 关闭的文档对象 Cancel 必选 Object 如果设置其属性Value为 true，则不关闭文稿。

示例示例

当关闭一个文档时，弹消息框提醒用户即将关闭文档，询问是否取消。用户点击“是”就会取消关闭文 档。

示例代码示例代码 复制复制

function Application_DocumentBeforeClose(Doc, Cancel) { var ret = MsgBox("文档\"" + Doc.Name + "\"" +"正在关闭。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

DocumentBeforePrint

当文档打印之前时触发此事件。

语法语法

function Application_DocumentBeforePrint (Doc, Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 关闭的文档对象 Cancel 必选 Object 如果设置其属性Value为 true，则不打印文档。

示例示例

当打印一个文档时，弹消息框提醒用户即将打印文档，询问是否取消。用户点击“是”就会取消打印文 档。

示例代码示例代码 复制复制

function Application_DocumentBeforePrint(Doc, Cancel) { var ret = MsgBox("即将对文档\"" + Doc.Name + "\"" +"进行打印。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

DocumentChange

当创建新文档、打开已有文档或者切换激活文档时触发 此事件。

语法语法

function Application_DocumentChange ()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_DocumentChange() { MsgBox("文档切换了！"); }

DocumentOpen

当任一文档打开时触发此事件。

语法语法

function Application_DocumentOpen (Doc) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 关闭的文档对象

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_DocumentOpen(Doc) { MsgBox("打开了文档:" + Doc.Name); }

NewDocument

当创建新文档时触发 此事件。

语法语法

function Application_NewDocument (Doc)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 关闭的文档对象

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_NewDocument(Doc) { MsgBox("新建了文档:" + Doc.Name); }

Quit

当关闭退出文字组件进程时触发此事件。

语法语法

function Application_Quit ()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

WindowActivate

当激活文档窗口时触发 此事件。

语法语法

function Application_WindowActivate (Doc, Wn)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 激活的文档对象 Wn 必选 Window对象 激活的窗口对象

示例示例

当切换文档窗口时，输出激活的窗口标题。

示例代码示例代码 复制复制

function Application_WindowActivate(Doc, Wn) { Debug.Print("当前激活窗口是："+ Wn.Caption) }

WindowBeforeDoubleClick

当双击任一文档窗口之前触发此事件。

语法语法

function Application_WindowBeforeDoubleClick (Sel , Cancel) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Selection 当前所选内容。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次双击。

示例示例

当在一个窗口内双击时，弹消息框提醒用户，询问是否取消。用户点击“是”就会取消该操作。

示例代码示例代码 复制复制

function Application_WindowBeforeDoubleClick(Sel, Cancel) { var ret = MsgBox("您进行了双击，当前选中内容是：" + Sel +"是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

WindowBeforeRightClick

当右击任一文档窗口之前触发 此事件。

语法语法

function Application_WindowBeforeRightClick (Sel , Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Selection 当前所选内容。 Cancel 必选 Object 如果设置其属性Value为 true，则取消此次右击。

示例示例

当在一个窗口内右击时，弹消息框提醒用户，询问是否取消。用户点击“是”就会取消该操作。

示例代码示例代码 复制复制

function Application_WindowBeforeRightClick(Sel, Cancel) { var ret = MsgBox("您进行了右击，当前选中内容是：" + Sel +"是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

WindowDeactivate

任一文档 窗口被切换到非激活状态时触发此事件。

语法语法

function Application_WindowDeactivate (Doc, Wn) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 被切换到非激活状态的文档对象 Wn 必选 Window对象 被切换到非激活状态的窗口对象

示例示例

当切换文档窗口时，输出被切换到非激活状态的窗口标题。

示例代码示例代码 复制复制

function Application_WindowDeactivate(Doc, Wn) { Debug.Print("当前被切换到非激活窗口是："+ Wn.Caption) }

WindowSelectionChange

活动窗口所选内容更改时将触发此事件。

语法语法

function Application_WindowSelectionChange (Sel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Selection对象 当前所选内容。

示例示例

当活动窗口所选内容更改时触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_WindowSelectionChange(Sel) { MsgBox("当前选中内容是：" + Sel); }

WindowSize

任一文档窗口调整大小时将触发此事件。

语法语法

function Application_WindowSize (Doc, Wn)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Doc 必选 Document对象 调整窗口大小的文档对象 Wn 必选 Window对象 调整窗口大小的窗口对象

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_WindowSize(Doc, Wn) { MsgBox("窗口\""+ Wn.Caption + "\"大小发生了改变。") }

XMLSelectionChange

当前所选内容的 XML 父节点更改时将触发此事件。

语法语法

function Application_XMLSelectionChange (Sel, OldXMLNode, NewXMLNode, Reason) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Sel 必选 Selection对象 当前所选内容。 OldXMLNode 必选 XMLNode对象 插入区域移动前的XML 节点。 NewXMLNode 必选 XMLNode对象 插入区域移动后的XML 节点。 Reason 必选 long 更改的操作

示例示例

以下示例在将新元素插入到文档中时，对新添加的 XML 元素进行验证。

示例代码示例代码 复制复制

function Application_XMLSelectionChange(Sel, OldXMLNode, NewXMLNode, Reason) { if (Reason == wdXMLSelectionChangeReasonInsert) { if (OldXMLNode !== undefined && OldXMLNode !== null) NewXMLNode.Validate() } }

XMLValidationError

文档中存在验证错误时时，将触发此事件。

语法语法

function Application_XMLValidationError (XMLNode)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 XMLNode 必选 XMLNode对象 无效的 XML节点

示例示例

当触发事件时，弹出消息框提醒用户。

示例代码示例代码 复制复制

function Application_XMLValidationError(XMLNode) { MsgBox("XML 节点" + XMLNode.BaseName +" 无效:" + XMLNode.ValidationErrorText) }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Document 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Close 当文档关闭时触发此事件。 ContentControlAfterAdd 当内容控件被添加到文档之后触发此事件。 ContentControlBeforeContentUpdate 当内容控件的内容发生来自XML映射内容更新时触发此事件。 ContentControlBeforeDelete 当内容控件被从文档删除之前触发此事件。 ContentControlBeforeStoreUpdate 当内容控件的内容去更新XML映射内容时触发此事件。 ContentControlOnEnter 当进入内容控件时触发此事件。 ContentControlOnExit 当退出内容控件时 触发此事件。 New 当基于模板创建新文档时触发，此事件只发向基于的模板文档对象。 Open 文档打开时触发。 向文档添加XML 元素时触发。如果同时向文档添加多个元素，则插入的每个元素都会 XMLAfterInsert 触发这一事件。 从文档删除XML 元素时触发。如果同时向文档删除多个元素，则删除的每个元素都会 XMLBeforeDelete 触发这一事件。

事件事件

Close

当文档关闭时触发此事件。

语法语法

function Document_Close(Wb) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

当关闭文档时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Document_Close() { MsgBox("文档已关闭") }

ContentControlAfterAdd

当内容控件被添加到文档之后触发 此事件。

语法语法

function Document_ContentControlAfterAdd (NewContentControl, InUndoRedo)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 NewContentControl 必选 ContentControl对象 要添加的内容控件。 InUndoRedo 必选 Boolean 此次添加操作是否是撤销或恢复操作所发生的

ContentControlBeforeContentUpdate

当内容控件的内容发生来自XML映射内容更新时触发此事件。

语法语法

function Document_ContentControlBeforeContentUpdate (ContentControl, Content)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /可可 名称名称 数据类型数据类型 说明说明 选选 ContentControl ContentControl 必选 要更新的内容控件。 对象 控件的更新内容。 此参数用于更改 XML 数据的内容，以及设置其 Content 必选 String 显示格式。

备注备注

对于重复内容，控件不触发此事件。

ContentControlBeforeDelete

当内容控件被从文档删除之前触发此事件。

语法语法

function Document_ContentControlBeforeDelete (OldContentControl, InUndoRedo)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 OldContentControl 必选 ContentControl对象 要删除的内容控件。 InUndoRedo 必选 Boolean 此次删除操作是否是撤销或恢复操作所发生的

ContentControlBeforeStoreUpdate

当内容控件的内容去更新XML映射内容时触发此事件。

语法语法

function Document_ContentControlBeforeStoreUpdate (ContentControl, Content)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /可可 名称名称 数据类型数据类型 说明说明 选选

ContentConContentControl 必选 要更新的内容控件。 trol 对象

去更新XML映射的内容。 在将内容设置到XML映射之前，可使用此参 Content 必选 String 数更改该值。

备注备注

对于重复内容，控件不触发此事件。

ContentControlOnEnter

当进入内容控件时 触发此事件。

语法语法

function Document_ContentControlOnEnter (ContentControl)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 ContentControl 必选 ContentControl对象 进入的内容控件。

备注备注

此事件仅对您要进入的内容控件而不对内容父控件触发。 例如，如果您的一个文本框内容控件嵌入 内容组控件，您要将光标置于该文本框内容控件，则此事件仅对该文本框内容控件触发一次，而不 对内容父组控件触发。

ContentControlOnExit

当退出内容控件时触发 此事件。

语法语法

function Document_ContentControlOnExit(ContentControl, Cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 ContentControl 必选 ContentControl对象 要离开的内容控件。 Cancel 必选 Object 如果设置其属性Value为 true，则取消退出。

备注备注

此事件仅对您要进入的内容控件而不对内容父控件触发。 例如，如果您的一个文本框内容控件嵌入 内容组控件，您要将光标置于该文本框内容控件，则此事件仅对该文本框内容控件触发一次，而不 对内容父组控件触发。

New

当基于模板创建新文档时触发，此事件只发向基于的模板文档对象。

语法语法

function Document_New()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

当模板创建新文档时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Document_New() { MsgBox("模板新建了一个文档！") }

Open

文档打开时触发。

语法语法

function Document_Open(Wb) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

示例示例

当文档打开时，弹消息框提醒用户。

示例代码示例代码 复制复制

function Document_Open() { MsgBox("文档打开了！") }

XMLAfterInsert

向文档添加XML 元素时触发。如果同时向文档添加多个元素，则插入的每个元素都会触发这一事件

。

语法语法

function Document_XMLAfterInsert (NewXMLNode, InUndoRedo)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 NewXMLNode 必选 XMLNode对象 新添加的 XML 节点。 InUndoRedo 必选 Boolean 此次添加操作是否是撤销或恢复操作所发生的

备注备注

如果InUndoRedo参数为true，不要在XMLAfterInsert 和 XMLBeforeDelete 中改变文档的XML。

如果InUndoRedo 参数为 false，您可以在XMLAfterInsert 和 XMLBeforeDelete 中改变文档的XM L，但请注意 XMLAfterInsert 和 XMLBeforeDelete 事件会因此存在嵌套，从而导致无限循环。 您

可以在全局使用Boolean 变量判断是否重入来防止无限循环的出现。

示例示例

向文档添加XML 元素时，验证一个新添加的节点，如果节点无效，则显示一条描述验证错误的消 息。

示例代码示例代码 复制复制

function Document_XMLAfterInsert(NewXMLNode, InUndoRedo) { NewXMLNode.Validate() if (NewXMLNode.ValidationStatus != wdXMLValidationStatusOK) { MsgBox(NewXMLNode.ValidationErrorText) } }

XMLBeforeDelete

从文档删除XML 元素时触发。如果同时向文档删除多个元素，则删除的每个元素都会触发这一事件

。

语法语法

function Document_XMLBeforeDelete (DeletedRange, OldXMLNode, InUndoRedo)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 / 名称名称 数据类型数据类型 说明说明 可选可选 Range对被删除的 XML 元素的内容。 如果仅删除元素，并且未关联文 DeletedRange 必选 象本，DeletedRange 参数将不存在，因此将设置为 Nothing。 XMLNode OldXMLNode 必选 删除的 XML 节点。 对象 InUndoRedo 必选 Boolean 此次添加操作是否是撤销或恢复操作所发生的

备注备注

如果InUndoRedo参数为true，不要在XMLAfterInsert 和 XMLBeforeDelete 中改变文档的XML。

如果InUndoRedo 参数为 false，您可以在XMLAfterInsert 和 XMLBeforeDelete 中改变文档的XM L，但请注意 XMLAfterInsert 和 XMLBeforeDelete 事件会因此存在嵌套，从而导致无限循环。 您

可以在全局使用Boolean 变量判断是否重入来防止无限循环的出现。

示例示例

在 XML 元素被删除时。 如果元素中包含文本，则显示一条信息询问用户是否要删除元素所包含的 文本。 如果用户通过单击"否"进行响应，则元素的内容将复制到剪贴板。

示例代码示例代码 复制复制

function Document_XMLBeforeDelete(DeletedRange, OldXMLNode, InUndoRedo) { var ret = MsgBox("是否删除文本：" + DeletedRange.Text + "?", jsYesNo); if (ret == jsResultNo) { DeletedRange.Copy(); MsgBox("文本内容已经复制到剪切板。") } }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Application 事件事件

事件列表事件列表

名称名称 触发时机触发时机 NewPresentation 当新建演示文稿时触发此事件。 PresentationBeforeClose 任一打开的演示文稿关闭之前触发此事件。 PresentationBeforeSave 任一演示文稿被保存之前 触发此事件。 PresentationOpen 当打开任一演示文稿时触发此事件。 PresentationSave 任一演示文稿被保存 时触发此事件。 WindowActivate 任一演示文稿窗口被激活时，将触发此事件。

事件事件

NewPresentation

当新建演示文稿时触发此事件。

语法语法

function Application_NewPresentation (Pres) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 新建的演示文稿对象。

示例示例

当新建一个演示文稿时，弹消息框提醒用户新建了演示文稿。

示例代码示例代码 复制复制

function Application_NewPresentation(Pres) { MsgBox("您新建了演示文稿："+Pres.Name) }

PresentationBeforeClose

任一打开的演示文稿关闭之前触发此事件。

语法语法

function Application_PresentationBeforeClose(Pres, Cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 关闭的演示文稿对象。 Cancel 必选 Object 如果设置其属性Value为 true，则不关闭演示文稿。

示例示例

当关闭一个演示文稿时，弹消息框提醒用户即将关闭演示文稿，是否取消。用户点击“是”就会取消关 闭演示文稿。

示例代码示例代码 复制复制

function Application_PresentationBeforeClose(pres, Cancel) { var ret = MsgBox("演示文稿\"" + pres.Name + "\"" +"正在关闭。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

PresentationBeforeSave

任一演示文稿被保存之前 触发此事件。

语法语法

function Application_PresentationBeforeSave (Pres, Cancel) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 保存的演示文稿对象。 Cancel 必选 Object 如果设置其属性Value为 true，则不保存演示文稿。

示例示例

当保存一个演示文稿时，弹消息框提醒用户即将保存演示文稿，是否取消。用户点击“是”就会取消保 存演示文稿。

示例代码示例代码 复制复制

function Application_PresentationBeforeSave(pres, Cancel) { var ret = MsgBox("演示文稿\"" + pres.Name + "\"" +"即将保存。是否取消？", jsYesNo); if (ret == jsResultYes) Cancel.Value = true; }

PresentationOpen

当打开任一演示文稿时触发此事件。

语法语法

function Application_PresentationOpen(Pres) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 新建的演示文稿对象。

示例示例

当打开任一演示文稿时，弹消息框提醒用户打开了演示文稿。

示例代码示例代码 复制复制

function Application_PresentationOpen(Pres) { MsgBox("您打开了演示文稿。") }

PresentationSave

任一演示文稿被保存时触发 此事件。

语法语法

function Application_PresentationSave(Pres)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 保存的演示文稿对象。

示例示例

当保存演示文稿时，弹消息框提醒用户正在保存演示文稿。

示例代码示例代码 复制复制

function Application_PresentationSave(pre) { MsgBox("正在保存演示文稿："+ pre.Name) }

WindowActivate

任一演示文稿窗口被激活时，将触发 此事件。

语法语法

function Application_WindowActivate(Pres, Wn)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Pres 必选 Presentation对象 新建的演示文稿对象。 Wn 必选 DocumentWindow对象 激活的文档窗口对象。

示例示例

当切换演示文稿窗口时，输出激活的窗口标题。

示例代码示例代码 复制复制

function Application_WindowActivate(pre, win) { Debug.Print("当前激活窗口是："+ win.Caption) }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# UserForm 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Initialize 在加载对象之后但在显示之前触发此事件 当通过将引用该对象的所有变量设置为 Nothing 或当对该对象的最后一个引用超出范围而从内存中删除对某个 Terminate 对象实例的所有引用时触发此事件 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

事件事件

Initialize

在加载对象之后但在显示之前触发此事件

语法语法

function UserForm1_Initialize()

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Initialize() { MsgBox("您新建了用户窗体：") }

Terminate

当通过将引用该对象的所有变量设置为 Nothing 或当对该对象的最后一个引用超出范围而从内存中

删除对某个对象实例的所有引用时触发此事件

语法语法

function UserForm1_Terminate()

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Terminate() { MsgBox("您关闭了用户窗体：") }

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_Click()

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Click() { MsgBox("您单击了一次：") }

DblClick

当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件

语法语法

function UserForm1_DblClick(cancel)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_MouseDown(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_MouseMove(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_KeyUp(keycode, shift)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_KeyDown(keycode, shift)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_KeyPress(keyascii)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# CommandButton 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_CommandButton1_Click() { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_CommandButton1_DblClick(cancel)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_CommandButton1_MouseDown(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_CommandButton1_MouseUp(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_CommandButton1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_CommandButton1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_CommandButton1_KeyDown(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_CommandButton1_KeyPress(keyascii)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_CommandButton1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_CommandButton1_Exit(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_CommandButton1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Label 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_Label1_Click() { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Label1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_Label1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_Label1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_Label1_MouseDown(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_Label1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_Label1_MouseUp(btn, shift, x, y)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_Label1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_Label1_MouseMove(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_Label1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# TextEdit 事件事件

事件列表事件列表

名称名称 触发时机触发时机 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

DblClick

语法语法

function UserForm1_TextEdit1_DblClick(cancel)

{ function_body_statements } function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_TextEdit1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_TextEdit1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_TextEdit1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_TextEdit1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_TextEdit1_KeyDown(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_TextEdit1_KeyPress(keyascii) { function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_TextEdit1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_TextEdit1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_TextEdit1_ Exit(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_TextEdit1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ComboBox 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_ComboBox1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_Click() { MsgBox("您单击了一次：") }

DblClick

当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件

语法语法

function UserForm1_ComboBox1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。 示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_ComboBox1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_ComboBox1_MouseUp(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_ComboBox1_MouseMove(btn, shift, x, y)

{ function_body_statements } function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_ComboBox1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_ComboBox1_KeyDown(keycode, shift) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_ComboBox1_KeyPress(keyascii)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_ComboBox1_Change()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_ComboBox1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_ComboBox1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ComboBox1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ListBox 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_ListBox1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_ListBox1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_ListBox1_MouseDown(btn, shift, x, y)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_ListBox1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_ListBox1_MouseMove(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_ListBox1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_ListBox1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_ListBox1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_ListBox1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_ListBox1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_ListBox1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# CheckBox 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_CheckBox1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法 function

UserForm1_CheckBox1_DblClick(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法 function

UserForm1_CheckBox1_MouseDown(btn, shift, x, y)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_CheckBox1_MouseUp(btn, shift, x, y)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_CheckBox1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_CheckBox1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_CheckBox1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_CheckBox1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_CheckBox1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ListBox1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_CheckBox1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_CheckBox1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_CheckBox1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# OptionButton 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_OptionButton1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_OptionButton1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件 语法语法

function UserForm1_OptionButton1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_OptionButton1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_OptionButton1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_OptionButton1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_OptionButton1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_OptionButton1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_OptionButton1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_OptionButton1_Enter()

{ function_body_statements } function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_OptionButton1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_OptionButton1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ScrollBar 事件事件

事件列表事件列表

名称名称 触发时机触发时机 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_ScrollBar1_KeyUp(keycode, shift) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_ScrollBar1_KeyDown(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_ScrollBar1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_ScrollBar1_Change()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_ScrollBar1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_ScrollBar1_Exit(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ScrollBar1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# HLayout 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_HLayout1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_HLayout1_DblClick(cancel)

{

function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_HLayout1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_HLayout1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_HLayout1_MouseMove(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_HLayout1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_HLayout1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_HLayout1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_HLayout1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# VLayout 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_VLayout1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_VLayout1_DblClick(cancel)

{

function_body_statements } function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_VLayout1_MouseDown(btn, shift, x, y)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_VLayout1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_VLayout1_MouseMove(btn, shift, x, y) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_VLayout1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_VLayout1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_VLayout1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_VLayout1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# SpinButton 事件事件

事件列表事件列表

名称名称 触发时机触发时机 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_SpinButton1_KeyUp(keycode, shift) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_SpinButton1_KeyDown(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_SpinButton1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_SpinButton1_Change()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_SpinButton1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_SpinButton1_Exit(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_SpinButton1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ToggleButton 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_ToggleButton1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_ToggleButton1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_ToggleButton1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_ToggleButton1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_ToggleButton1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法 function UserForm1_ToggleButton1_KeyUp(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_ToggleButton1_KeyDown(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_ToggleButton1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_ToggleButton1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_ToggleButton1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_ToggleButton1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_ToggleButton1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Frame 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_Frame1_Click()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_Click() { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_Frame1_DblClick(cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_DblClick(cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_Frame1_MouseDown(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_Frame1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_Frame1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_Frame1_KeyUp(keycode, shift)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_Frame1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_Frame1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_Frame1_Enter() { function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_Frame1_Exit(cancel) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_Frame1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# MultiPage 事件事件

事件列表事件列表

名称名称 触发时机触发时机 Click 当用户在对象上按下然后释放鼠标按钮时触发此事件 DblClick 当用户在系统的双击时间限制内在对象上按下并释放鼠标左键两次时触发此事件 MouseDown 在用户按下鼠标按钮时触发此事件 MouseUp 在用户释放鼠标按钮时触发此事件 MouseMove 在用户移动鼠标时触发此事件 KeyUp 当用户在窗体或控件具有焦点时释放键时触发此事件 KeyDown 当用户在窗体或控件具有焦点时按下某个键时触发此事件 KeyPress 当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件 Change 当控件的内容发生变化时触发此事件 Enter 在控件从同一窗体的控件上接收焦点之前触发此事件 Exit 在一个控件上的焦点转移到同一窗体上的另一个控件之前触发此事件

事件事件

Click

当用户在对象上按下然后释放鼠标按钮时触发此事件

语法语法

function UserForm1_MultiPage1_Click(index)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Index 必选 Number 该设置指定页面的下标

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_Click(index) { MsgBox("您单击了一次：") }

DblClick

语法语法

function UserForm1_MultiPage1_DblClick(index, cancel)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Index 必选 Number 该设置指定页面的下标 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_DblClick(index, cancel) { MsgBox("您双击了一次：") }

MouseDown

在用户按下鼠标按钮时触发此事件

语法语法

function UserForm1_MultiPage1_MouseDown(btn, shift, x, y)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标 示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_MouseDown(btn, shift, x, y) { MsgBox("您按下了鼠标：") }

MouseUp

在用户释放鼠标按钮时触发此事件

语法语法

function UserForm1_MultiPage1_MouseUp(btn, shift, x, y)

{

function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数 名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_MouseUp(btn, shift, x, y) { MsgBox("您松开了鼠标：") }

MouseMove

在用户移动鼠标时触发此事件

语法语法

function UserForm1_MultiPage1_MouseMove(btn, shift, x, y)

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Button 必选 Integer 被按下以触发事件的鼠标按钮 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态 X 必选 Single 鼠标指针当前位置的 x 坐标 Y 必选 Single 鼠标指针当前位置的 y坐标

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_MouseMove(btn, shift, x, y) { MsgBox("您移动了鼠标：") }

KeyUp

当用户在窗体或控件具有焦点时释放键时触发此事件

语法语法

function UserForm1_MultiPage1_KeyUp(keycode, shift) { function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_KeyUp(keycode, shift) { MsgBox("您松开了" + keycode + "键") }

KeyDown

当用户在窗体或控件具有焦点时按下某个键时触发此事件

语法语法

function UserForm1_MultiPage1_KeyDown(keycode, shift)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 keyCode 必选 Integer 键代码，您可以通过将参数设置为 0 来阻止对象接收按键 Shift 必选 Integer 按下或释放 Button 参数指定的按钮时 Shift、Ctrl 和 Alt 键的状态

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_KeyDown(keycode, shift) { MsgBox("您按下了" + keycode + "键") }

KeyPress

当窗体或控件具有焦点时，当用户按下并释放对应于 ANSI 代码的键或组合键时触发此事件

语法语法

function UserForm1_MultiPage1_KeyPress(keyascii)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

必选必选 /数据数据 名称名称 说明说明 可选可选类型类型 返回一个数字 ANSI 键码。 KeyAscii 参数是通过引用传递的；更改它会向对象发送不 keyAscii 必选 Integer 同的字符。 将该参数设置为0会取消击键

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_KeyPress(keyascii) { MsgBox("您点击了" + keycode + "键") }

Change

当控件的内容发生变化时触发此事件

语法语法

function UserForm1_MultiPage1_Change()

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_Change() { MsgBox("控件内容发生改变") }

Enter

在控件从同一窗体的控件上接收焦点之前触发该事件

语法语法

function UserForm1_MultiPage1_Enter()

{ function_body_statements }

function_body_statements 代表了响应函数的函数体的语句。

参数参数

无

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_Enter() { MsgBox("焦点进入该控件") }

Exit

在一个控件上的焦点转移到同一窗体上的另一个控件之前触发该事件

语法语法

function UserForm1_MultiPage1_Exit(cancel)

{ function_body_statements

}

function_body_statements 代表了响应函数的函数体的语句。

参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Cancel 必选 Integet 该设置确定是否触发事件。 将该参数设置为 True (1) 会取消触发该事件。

示例示例

示例代码示例代码 复制复制

function UserForm1_MultiPage1_Exit(cancel) { MsgBox("焦点离开该控件") }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Debug 对象对象

宏编辑器的调试对象，提供调试辅助接口。

### 说明说明

宏编辑器的调试对象，提供调试辅助接口。

### 方法方法

名称名称 说明说明

GC 触发JavaScript引擎进行垃圾回收。

Print 在立即窗口中输出文本。

### 成员方法成员方法

Debug.GC

触发JavaScript引擎进行垃圾回收。

### 语法语法

express.GC()

express 一个代表 Debug 对象的变量。

### 说明说明

触发JavaScript引擎进行垃圾回收。

Debug.Print

在立即窗口中输出文本。

### 语法语法

express.Print(outputlist)

express 一个代表 Debug 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 outputlist 可选 Variant 要打印的表达式或表达式列表。 如果省略，将打印空行。

### 说明说明

在立即窗口中输出文本。

### 示例示例

示例代码示例代码 复制复制

/*打印当前表格中B10单元格的值到立即窗口*/ function abcd() { Debug.Print(Range("B10").Value2) }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# CreateObject

创建并返回应用程序对象的引用。

语法语法

CreateObject (class)

参数参数

名字名字 说明说明 必需；Variant (String)。 要创建对象的应用程序名称和类。 class 暂仅支持：kwps.application 或 ket.application 或 kwpp.application

示例示例

跨组件数据互通，类似于在VBA编辑器中的CreateObject()的能力，一些典型的使用场景是围绕组件间的数据流 转，比如把WPS表格中的统计数据自动插入到WPS文字文档或演示幻灯片中、把WPS文字中的表格类数据自

动导入到WPS表格中等。以下举例说明：

执行以上宏代码，会启动WPS表格并填入数据，效果如下：

以上代码通过打开WPS文字的JS宏编辑器，执行宏编辑器中的代码，把简历中求职人的关键信息提取出来，并 输出到WPS表格中。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# DoEvents

处理进程的消息队列中的消息。

语法语法

DoEvents()

说明说明

DoEvents 将暂时停止当前的宏执行，在处理完进程的消息队列中的消息后返回再继续宏的执行。

示例示例

此示例使用 DoEvents 函数来使得每迭代 1000 次循环就将暂时停止当前的宏执行，处理完进程的消息队列中的

消息后返回再继续宏的执行，以便迭代过程中在合适的时机更新文档视图或者响应鼠键消息来通过调试器中止

迭代。

示例代码示例代码 复制复制

function abcd() { var beginTime = new Date(); for (i = 0; i < 20000; i++) { Selection.TypeText("金山办公软件"); if (i % 1000 == 0) DoEvents() } var endTime = new Date(); Debug.Print("用时共计"+(endTime-beginTime)+"ms"); }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# InputBox

弹出显示自定义提示信息的输入对话框，等待用户在输入框中输入文本或单击按钮，然后返回输入框的内容。

语法语法

InputBox (prompt， [ title ]， [ default ]， [ xpos ]， [ ypos ])

参数参数

名字名字 说明说明 prompt 必需项。 在对话框中显示的消息的字符串表达式。 title 可选。 对话框标题栏中显示的字符串表达式。 如果省略 title，则标题栏中将显示应用程序名称。 可选。 文本框中显示的字符串表达式，在未提供其他输入时作为默认响应。 如果省略了 default，文本框将显示为 default 空。 可选。 指定对话框的左边缘与屏幕的左边缘的水平距离（以缇为单位）的数值表达式。 如果省略了 xpos，对话框将 xpos 水平居中。 可选。 指定对话框的上边缘与屏幕的顶部的垂直距离（以缇为单位）的数值表达式。 如果省略了 ypos，对话框将将 ypos 垂直居中。

返回值返回值

如果用户选择"确定 " 或按 Enter，，InputBox 函数将返回文本框中的内容。 如果用户选择"取消 "，， 函数将返回

一个空字符串 。

示例示例

下面的代码是就是InputBox的一个示例。

示例代码示例代码 复制复制

function abcd() { var strMessage = "这是一个输入对话框，请输入？"; var strTitle = "我是标题"; var strDefault = "我是标题"; var ret = InputBox(strMessage, strTitle, strDefault, 3000, 4000) Debug.Print("输入对话框返回值是：" + ret) }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# MsgBox

弹出消息对话框，等待用户单击按钮，并返回一个整数，指示用户单击的哪个按钮。

语法语法

MsgBox (prompt, [ buttons, ] [ title, ] )

参数参数

名称名称 说明说明

prompt 必需项。 在对话框中显示的消息的字符串表达式。

可选。 数值表达式，用于指定要显示按钮的数量和类型、要使用的图标样式、默认按钮的标识和消息框的形式的值（ buttons JSMsgBoxStyle）之和。 如果省略，则 buttons 的默认值为 0。

title 可选。 对话框标题栏中显示的字符串表达式。 如果省略 title，则标题栏中将显示应用程序名称。

返回值返回值

返回JSMsgBoxResult 枚举值。表示用户点击MsgBox弹出消息框的按钮。在点击MsgBox弹出消息框之前不会 返回。如果对话框中显示“取消取消”按钮，按 ESC 键与单击“取消取消”具有相同的作用。

示例示例

下面的代码是就是MsgBox的一个示例。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

## 控件概述控件概述

WPS宏编辑器提供了命令按钮、标签、文本框、复合框、列表框、复选框等控件，其跟api对象对应关系如下

。

控件类型控件类型 API对象对象 功能功能 窗体窗体 UserForm 用于选中或是移动控件对象。 命令按钮命令按钮 CommandButton 创建一个可以让用户选择，以完成一个命令的按钮 标签标签 Label 用于显示用户不能编辑的文本或图像，例如图形下的标题文本。 文本框文本框 TextEdit 用于输入或改变文本内容。

复合框由一个文本输入控件和一个下拉菜单组成，用户可以从预先定义的列表中的选择 复合框复合框 ComboBox 一个选项，同时也可以直接通过文本框输入 列表框列表框 ListBox 用来显示用户可以选择的项目列表。如果不能一次显示全部项目的话，列表可以滚动。 可以显示出多重选择，用户可以选择一个或者多个选项，如果选中多个选项则显示出多 复选框复选框 CheckBox 重选择。 选项按钮选项按钮 OptionButton 可以显示出多重选择，用户只能选择一个。 提供在长列表工程或大量信息中快速浏览的图形工具，以比例方式指示出当前位置，或 滚动条滚动条 ScrollBar 是做为一个输入设备，或速度及数量的指示器。 水平布局器水平布局器 HLayout 将内部的控件按照水平方向排布，一列一个。 垂直布局器垂直布局器 VLayout 将内部的控件按照垂直方向排布，一行一个。 水平间隔水平间隔 HSpacer 填充水平方向上无用的空隙。 垂直间隔垂直间隔 VSpacer 填充垂直方向上无用的空隙。

一种与其它控件并用微调控制的控件，也可以用来对一个范围的值或工程列表做向前或 旋转按钮旋转按钮 SpinButton 向后的遍历。 切换按钮切换按钮 ToggleButton 创建一个切换开关的按钮。

可以创建一个图形或控件的功能组。要为多个控件创建组，可先画框架，接着在框架中 框架框架 Frame 添加控件。

包含一个选项卡栏和一个页面区的容器类组件，通过切换选项卡来切换不同页面，从而 多页多页 MultiPage 达到在同一个窗口中自由切换不同的内容。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# UserForm 对象对象

UserForm 对象是构成应用程序用户界面的一部分的窗口或对话框。

### 说明说明

用户窗体对象，是一个容器。代表用户创建的窗体，用户可以向其中添加控件，通过该可以调用添加的控件对象，修改对象的

属性，调用对象的方法。

### 方法方法

名称名称 说明说明 Controls 返回控件的窗体、子窗体、报告或者区块的控件合集

Hide 隐藏UserForm对象但不卸载该对象

Move 将对象移动到参数指定的位置

Show 显示一个用户窗体对象

### 属性属性

名称名称 说明说明 BackColor 返回或指定当前对象的背景颜色 BorderColor 返回或当前对象的边框颜色，只读

Caption 返回或指定用来识别或描述对象的显示在对象上的描述性文字，只读 Enabled 指定该控件是否能接收焦点或者对用户生成的事件进行响应，只读

Font 返回或指定对象的字体，只读

ForeColor 返回或指定对象的前景颜色

Height 返回或指定以像素点表示的对象的高

Left 返回或指定控件到包含它的窗体的左边缘的距离

Name 返回或指定控件或对象的名称，或与Font对象关联的字体对象的名称，只读

StartUpPostion 返回或者指定UserForm第一次出现的位置

Top 返回或指定控件到包含它的窗体的上边缘的距离

Width 返回或指定以像素点表示的对象的宽

### 成员方法成员方法

UserForm.Controls

返回控件的窗体、子窗体、报告或者区块的控件合集

### 语法语法

express.Controls()

express 一个代表 UserForm 对象的变量。

### 说明说明

返回控件的窗体、子窗体、报告或者区块的控件合集

### 示例示例

示例代码示例代码 复制复制

/*通过button名获取button对象，并打印button名*/ function func1() { var buttonName = UserForm1.CommandButton1.Name Console.log(buttonName) var controlSet = UserForm1.Controls(buttonName) Console.log(controlSet.Name) }

UserForm.Hide

隐藏UserForm对象但不卸载该对象

### 语法语法

express.Hide()

express 一个代表 UserForm 对象的变量。

### 说明说明

隐藏UserForm对象但不卸载该对象

### 示例示例

示例代码示例代码 复制复制

/*隐藏该UserForm*/ function func1() { UserForm1.Hide() }

UserForm.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 UserForm 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离

Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将窗体移动到窗口的左上角，并将移动后窗体的长宽设置为500*/ function func1() { UserForm1.Move(100,100,500,500) }

UserForm.Show

显示一个用户窗体对象

### 语法语法

express.Show()

express 一个代表 UserForm 对象的变量。

### 说明说明

显示一个用户窗体对象

### 示例示例

示例代码示例代码 复制复制

/*显示用户窗体*/ function func1() { UserForm1.Show() }

### 成员属性成员属性

UserForm.BackColor

返回或指定当前对象的背景颜色

### 语法语法

express.BackColor

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定当前对象的背景颜色

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm的背景颜色为十六进制下550000表示的颜色（红棕色）*/ function func1() { UserForm1.BackColor = 0x550000 }

UserForm.BorderColor

返回或当前对象的边框颜色，只读

### 语法语法

express.BorderColor

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或当前对象的边框颜色，只读

UserForm.Caption

返回或指定用来识别或描述对象的显示在对象上的描述性文字，只读

### 语法语法

express.Caption

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定用来识别或描述对象的显示在对象上的描述性文字，只读

UserForm.Enabled

指定该控件是否能接收焦点或者对用户生成的事件进行响应，只读

### 语法语法

express.Enabled

express 一个代表 UserForm 对象的变量。

### 说明说明

指定该控件是否能接收焦点或者对用户生成的事件进行响应，只读

UserForm.Font

返回或指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定对象的字体，只读

UserForm.ForeColor

返回或指定对象的前景颜色

### 语法语法

express.ForeColor

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定对象的前景颜色

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体的前景颜色为十六进程550000表示的颜色*/ function func1() { UserForm1.ForeColor = 0x550000 }

UserForm.Height

返回或指定以像素点表示的对象的高

### 语法语法

express.Height

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定以像素点表示的对象的高

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体的高为1000*/ function func1() { UserForm1.Height = 1000 }

UserForm.Left

返回或指定控件到包含它的窗体的左边缘的距离

### 语法语法

express.Left

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定控件到包含它的窗体的左边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体到窗口左侧边缘的距离为1000*/ function func1() { UserForm1.Left = 1000 }

UserForm.Name

返回或指定控件或对象的名称，或与Font对象关联的字体对象的名称，只读

### 语法语法

express.Name

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定控件或对象的名称，或与Font对象关联的字体对象的名称，只读

UserForm.StartUpPostion

返回或者指定UserForm第一次出现的位置

### 语法语法

express.StartUpPostion

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或者指定UserForm第一次出现的位置

设置设置 值值 描述描述 Manual 0 不指定初始化设置 CenterOwner 1 出现在包含用户窗体的所在窗体的中间 CenterScreen 2 出现在整个屏幕的中间 WindowsDefault 3 出现在屏幕的左上角

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体第一次出现时在整个屏幕的中间*/ function func1() { UserForm1.StartUpPostion = 2 }

UserForm.Top

返回或指定控件到包含它的窗体的上边缘的距离

### 语法语法

express.Top

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定控件到包含它的窗体的上边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体到窗口上边缘的距离为1000*/ function func1() { UserForm1.Top = 1000 }

UserForm.Width

返回或指定以像素点表示的对象的宽

### 语法语法

express.Width

express 一个代表 UserForm 对象的变量。

### 说明说明

返回或指定以像素点表示的对象的宽

### 示例示例

示例代码示例代码 复制复制

/*设置UserForm窗体的宽为1000*/ function func1() { UserForm1.Width = 1000 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# CommandButton 对象对象

创建一个可以让用户选择，以完成一个命令的按钮

### 说明说明

创建一个可以让用户选择，以完成一个命令的按钮

### 方法方法

名称名称 说明说明 Move 将指定对象移动到参数指定的坐标

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 Caption 获取或设置出现在控件中的文本

Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上 Top 您可以通过该属性指定控件在对象或报表中的位置

Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

CommandButton.Move

将指定对象移动到参数指定的坐标

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 CommandButton 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将指定对象移动到参数指定的坐标

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton移动到窗体的左上角，并将移动后CommandButton的长宽设置为100*/ function func1() { UserForm1.CommandButton1.Move(100,100,100,100) }

### 成员属性成员属性

CommandButton.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 CommandButton 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*将该对象设置为根据内容自动设置大小*/ function func1() { UserForm1.CommandButton1.AutoSize = true }

CommandButton.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将该CommandButton设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.CommandButton1.BackColor = 0x665898 }

CommandButton.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

设置设置 值值 描述描述 Normal 1 （除option group以外的所有控件的默认值）控件内部的颜色是由BackColor属性设置的颜色 Transparent 0 （option group的默认值）控件是透明的，控件后面的窗体和报表是可见的

### 示例示例

示例代码示例代码 复制复制

/*将该CommandButton设置为透明*/ function func1() { UserForm1.CommandButton1.BackStyle = 0 }

CommandButton.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将该CommandButton中的文本设置为"Button 1"*/ function func1() { UserForm1.CommandButton1.Caption = "Button 1" }

CommandButton.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.CommandButton1.Enabled = true }

CommandButton.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 CommandButton 对象的变量。

### 说明说明

指定对象的字体，只读

CommandButton.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.CommandButton1.ForeColor = 0x658978 }

CommandButton.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton控件的高度设置为100*/ function func1() { UserForm1.CommandButton1.Height = 100 }

CommandButton.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton1的高度设置为固定*/ function func1() { UserForm1.CommandButton1.HeightPolicy = 2 }

CommandButton.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.CommandButton1.Left = 100 }

CommandButton.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

CommandButton.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.CommandButton1.TabIndex = 2 }

CommandButton.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

设置设置 值值 描述描述 Yes True （默认）您可以通过按下Tab键将焦点移动到该控件上 No False 您无法通过按下Tab键将焦点移动到该控件上

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.CommandButton1.TabStop = true }

CommandButton.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 CommandButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.CommandButton1.Top = 100 }

CommandButton.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 CommandButton 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton设置为可见*/ function func1() { UserForm1.CommandButton1.Visible = true }

CommandButton.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton的宽度设置为100*/ function func1() { UserForm1.CommandButton1.Width = 100 }

CommandButton.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 CommandButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将CommandButton1的宽度设置为固定*/ function func1() { UserForm1.CommandButton1.WidthPolicy = 2 }

CommandButton.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 CommandButton 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将Command Button设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.CommandButton1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Label 对象对象

用于显示用户不能编辑的文本或图像，例如图形下的标题文本。

### 说明说明

用于显示用户不能编辑的文本或图像，例如图形下的标题文本。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 BorderColor 您可以通过该属性指定控件边框的颜色

BorderStyle 指定控件边框的显示方式

Caption 获取或设置出现在控件中的文本 Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略 Left 您可以通过该属性指定控件在对象或报表中的位置

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

TextAlign 该属性用于指定对象中文本的对齐方式 Top 您可以通过该属性指定控件在对象或报表中的位置

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

Label.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 Label 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将Label移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.Label1.Move(100,100,100,100) }

### 成员属性成员属性

Label.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 Label 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置Label控件为根据内容自动设置大小*/ function func1() { UserForm1.Label1.AutoSize = true }

Label.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.Label1.BackColor = 0x665898 }

Label.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 Label 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为透明*/ function func1() { UserForm1.Label1.BackStyle = 0 }

Label.BorderColor

您可以通过该属性指定控件边框的颜色

### 语法语法

express.BorderColor

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定控件边框的颜色

### 示例示例

示例代码示例代码 复制复制

/*将Label1的边框设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.Label1.BorderColor = 0x665898 }

Label.BorderStyle

指定控件边框的显示方式

### 语法语法

express.BorderStyle

express 一个代表 Label 对象的变量。

### 说明说明

指定控件边框的显示方式，可设置为以下值

设置设置 值值 描述描述 None 0 无边框 Single 1 边框为实线

### 示例示例

示例代码示例代码 复制复制

/*将Label1的边框显示方式设置为实线*/ function func1() { UserForm1.Label1.BorderStyle = 1 }

Label.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将Label1中的文本设置为"Label 1"*/ function func1() { UserForm1.Label1.Caption = "Label 1" }

Label.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.Label1.Enabled = true }

Label.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 Label 对象的变量。

### 说明说明

指定对象的字体，只读

Label.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将Label1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.Label1.ForeColor = 0x658978 }

Label.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将Label1控件的高度设置为100*/ function func1() { UserForm1.Label1.Height = 100 }

Label.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将Label1的高度设置为固定*/ function func1() { UserForm1.Label1.HeightPolicy = 2 }

Label.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Label1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.Label1.Left = 100 }

Label.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

Label.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.Label1.TabIndex = 2 }

Label.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.Label1.TabStop = true }

Label.TextAlign

该属性用于指定对象中文本的对齐方式

### 语法语法

express.TextAlign

express 一个代表 Label 对象的变量。

### 说明说明

该属性用于指定对象中文本的对齐方式，包含以下值

设置设置 值值 描述描述 Left 1 文本数字和日期都左对齐 Center 2 文本数字和日期都居中对齐 Right 3 文本数字和日期都右对齐

### 示例示例

示例代码示例代码 复制复制

/*将Label1中的文本设置为居中对齐*/ function func1() { UserForm1.Label1.TextAlign = 2 }

Label.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 Label 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Label1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.Label1.Top = 100 }

Label.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 Label 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为可见*/ function func1() { UserForm1.Label1.Visible = true }

Label.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将Label1的宽度设置为100*/ function func1() { UserForm1.Label1.Width = 100 }

Label.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 Label 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将Label1的宽度设置为固定*/ function func1() { UserForm1.Label1.WidthPolicy = 2 }

Label.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 Label 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将Label1设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.Label1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# TextEdit 对象对象

用于输入或改变文本内容。

### 说明说明

用于输入或改变文本内容。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 BorderColor 您可以通过该属性指定控件边框的颜色

BorderStyle 指定控件边框的显示方式

ControlSource 您可以使用该属性指定控件中显示的数据 Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略 Left 您可以通过该属性指定控件在对象或报表中的位置

MaxLength 指定用户可以在文本框或组合框中输入的最大字符数 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

PasswordChar 指定TextBox中显示的占位符而不是实际在TextBox中输入的字符

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置 TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

Text 您可以通过该属性设置或返回文本框中包含的文本值 TextAlign 该属性用于指定对象中文本的对齐方式

Top 您可以通过该属性指定控件在对象或报表中的位置

Value 确定或指定文本框中的文本 Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

TextEdit.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 TextEdit 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.TextEdit1.Move(100,100,100,100) }

### 成员属性成员属性

TextEdit.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置TextEdit1控件为根据内容自动设置大小*/ function func1() { UserForm1.TextEdit1.AutoSize = true }

TextEdit.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 TextEdit 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.TextEdit1.BackColor = 0x665898 }

TextEdit.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为透明*/ function func1() { UserForm1.TextEdit1.BackStyle = 0 }

TextEdit.BorderColor

您可以通过该属性指定控件边框的颜色

### 语法语法

express.BorderColor

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定控件边框的颜色

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的边框设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.TextEdit1.BorderColor = 0x665898 }

TextEdit.BorderStyle

指定控件边框的显示方式

### 语法语法

express.BorderStyle

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定控件边框的显示方式，可以设置为以下值：

设置设置 值值 描述描述 None 0 无边框 Single 1 实线边框

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的边框显示方式设置为实线*/ function func1() { UserForm1.TextEdit1.BorderStyle = 1 }

TextEdit.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

TextEdit.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.TextEdit1.Enabled = true }

TextEdit.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定对象的字体，只读

TextEdit.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.TextEdit1.ForeColor = 0x658978 }

TextEdit.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 TextEdit 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1控件的高度设置为100*/ function func1() { UserForm1.TextEdit1.Height = 100 }

TextEdit.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 TextEdit 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的高度设置为固定*/ function func1() { UserForm1.TextEdit1.HeightPolicy = 2 }

TextEdit.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.TextEdit1.Left = 100 }

TextEdit.MaxLength

指定用户可以在文本框或组合框中输入的最大字符数

### 语法语法

express.MaxLength

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定用户可以在文本框或组合框中输入的最大字符数

### 示例示例

示例代码示例代码 复制复制

/*指定TextEdit1控件中输入的最大字符数为32767*/ function func1() { UserForm1.TextEdit1.MaxLength = 32767 }

TextEdit.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

TextEdit.PasswordChar

指定TextBox中显示的占位符而不是实际在TextBox中输入的字符

### 语法语法

express.PasswordChar

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定TextBox中显示的占位符而不是实际在TextBox中输入的字符

### 示例示例

示例代码示例代码 复制复制

/*将用户输入的字符用*替换*/ function func1() { UserForm1.TextEdit1.PasswordChar = "*" }

TextEdit.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.TextEdit1.TabIndex = 2 }

TextEdit.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.TextEdit1.TabStop = true }

TextEdit.Text

您可以通过该属性设置或返回文本框中包含的文本值

### 语法语法

express.Text

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性设置或返回文本框中包含的文本值

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1控件中的文本设置为test test*/ function func1() { UserForm1.TextEdit1.Text = "test test" }

TextEdit.TextAlign

该属性用于指定对象中文本的对齐方式

### 语法语法

express.TextAlign

express 一个代表 TextEdit 对象的变量。

### 说明说明

该属性用于指定对象中文本的对齐方式，可设置为以下值：

设置设置 值值 描述描述 Left 1 文本数字和日期都左对齐 Center 2 文本数字和日期都居中对齐

Right 3 文本数字和日期都右对齐

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1中的文本设置为居中对齐*/ function func1() { UserForm1.TextEdit1.TextAlign = 2 }

TextEdit.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 TextEdit 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.TextEdit1.Top = 100 }

TextEdit.Value

确定或指定文本框中的文本

### 语法语法

express.Value

express 一个代表 TextEdit 对象的变量。

### 说明说明

确定或指定文本框中的文本

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1控件中的文本指定为test test*/ function func1() { UserForm1.TextEdit1.Value = "test test" }

TextEdit.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 TextEdit 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为可见*/ function func1() { UserForm1.TextEdit1.Visible = true }

TextEdit.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 TextEdit 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的宽度设置为100*/ function func1() { UserForm1.TextEdit1.Width = 100 }

TextEdit.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 TextEdit 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1的宽度设置为固定*/ function func1() { UserForm1.TextEdit1.WidthPolicy = 2 }

TextEdit.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 TextEdit 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将TextEdit1设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.TextEdit1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ComboBox 对象对象

复合框由一个文本输入控件和一个下拉菜单组成，用户可以从预先定义的列表中的选择一个选项，同时也可以直接通过文本框

输入

### 说明说明

复合框由一个文本输入控件和一个下拉菜单组成，用户可以从预先定义的列表中的选择一个选项，同时也可以直接通过文本框

输入

### 方法方法

名称名称 说明说明 AddItem 将新项目添加到指定组合框控件显示的值列表中。

Clear 清除列表框中的所有选项

DropDown 您可以使用 Dropdown 方法强制指定组合框中的列表下拉。 Move 将对象移动到参数指定的位置

RemoveItem 从指定组合框控件显示的值列表中删除项目。

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小

BackColor 获取或设置指定对象的内部颜色 BackStyle 您可以使用该属性指定控件是否透明

BorderColor 您可以通过该属性指定控件边框的颜色 BorderStyle 指定控件边框的显示方式

BoundColumn 您可以使用该属性指定是否将列表框里第一个选项的文本显示出来

ColumnCount 您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数 ColumnHeads 您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题。

ColumnWidths 您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度。 ControlSource 您可以使用该属性指定控件中显示的数据。

Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置

ListRows 您可以使用 ListRows 属性设置在组合框的列表框部分中显示的最大行数。 ListWidth 您可以使用 ListWidth 属性设置组合框的列表框部分的宽度。

MaxLength 指定用户可以在文本框或组合框中输入的最大字符数

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 RowSource 您可以使用 RowSource 属性指定如何向指定的对象提供数据。

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

Text 您可以通过该属性设置或返回文本框中包含的文本值 TextAlign 该属性用于指定对象中文本的对齐方式

Top 您可以通过该属性指定控件在对象或报表中的位置 TopIndex 设置并返回出现在列表最顶部位置的项目。

Value 确定或指定文本框中的文本

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

ComboBox.AddItem

将新项目添加到指定组合框控件显示的值列表中。

### 语法语法

express.AddItem(Content,Index)

express 一个代表 ComboBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Content 必选 String 列表框里显示的文本内容 Index 必选 Number 该选项在列表框里的位置

### 说明说明

将新项目添加到指定组合框控件显示的值列表中。

### 示例示例

示例代码示例代码 复制复制

/*将test0设置为ComboBox1控件列表框中的第一个选项*/ function func1() { UserForm1.ComboBox1.AddItem("test0",0); }

ComboBox.Clear

清除列表框中的所有选项

### 语法语法

express.Clear()

express 一个代表 ComboBox 对象的变量。

### 说明说明

清除列表框中的所有选项

### 示例示例

示例代码示例代码 复制复制

/*清除ComboBox1中列表框中的所有选项*/ function func1() { UserForm1.ComboBox1.Clear() }

ComboBox.DropDown

您可以使用 Dropdown 方法强制指定组合框中的列表下拉。

### 语法语法

express.DropDown()

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 Dropdown 方法强制指定组合框中的列表下拉。

### 示例示例

示例代码示例代码 复制复制

/*强制指定ComboBox1中的列表下拉*/ function func1() { UserForm1.ComboBox1.DropDown() }

ComboBox.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 ComboBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.ComboBox1.Move(100,100,100,100) }

ComboBox.RemoveItem

从指定组合框控件显示的值列表中删除项目。

### 语法语法

express.RemoveItem(index)

express 一个代表 ComboBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 index 可选 Number 删除列表框中index指定的下标的值

### 说明说明

从指定组合框控件显示的值列表中删除项目。

### 示例示例

示例代码示例代码 复制复制

/*删除ComboBox1中下标为3的值*/ function func1() { UserForm1.ComboBox1.RemoveItem(3) }

### 成员属性成员属性

ComboBox.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 ComboBox 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置ComboBox1控件为根据内容自动设置大小*/ function func1() { UserForm1.ComboBox1.AutoSize = true }

ComboBox.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 ComboBox 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ComboBox1.BackColor = 0x665898 }

ComboBox.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1设置为透明*/ function func1() { UserForm1.ComboBox1.BackStyle = 0 }

ComboBox.BorderColor

您可以通过该属性指定控件边框的颜色

### 语法语法

express.BorderColor

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定控件边框的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的边框设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ComboBox1.BorderColor = 0x665898 }

ComboBox.BorderStyle

指定控件边框的显示方式

### 语法语法

express.BorderStyle

express 一个代表 ComboBox 对象的变量。

### 说明说明

指定控件边框的显示方式，可以设置为以下值：

设置设置 值值 描述描述 None 0 无边框 Single 1 实线边框

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的边框显示方式设置为实线*/ function func1() { UserForm1.ComboBox1.BorderStyle = 1 }

ComboBox.BoundColumn

您可以使用该属性指定是否将列表框里第一个选项的文本显示出来

### 语法语法

express.BoundColumn

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用该属性指定是否将列表框里第一个选项的文本显示出来，可以设置为以下值：

设置设置 值值 描述描述 显示 0 显示第一个选项的文本 不显示 1 不显示第一个选项的文本

### 示例示例

示例代码示例代码 复制复制

/*显示ComboBox1列表框里第一个选项的值*/ function func1() { UserForm1.ComboBox1.BoundColumn = 0 }

ComboBox.ColumnCount

您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数

### 语法语法

express.ColumnCount

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的列表框的列数设置为3*/ function func1() { UserForm1.ComboBox1.ColumnCount = 3 }

ComboBox.ColumnHeads

您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题。

### 语法语法

express.ColumnHeads

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题。可以设置为以下值：

设置设置 值值 描述描述 Yes true 显示列标题 No false 不显示列标题

### 示例示例

示例代码示例代码 复制复制

/*不显示ComboBox1列表框的列标题*/ function func1() { UserForm1.ComboBox1.ColumnHeads = false }

ComboBox.ColumnWidths

您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度。

### 语法语法

express.ColumnWidths

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度。

### 示例示例

示例代码示例代码 复制复制

/*设置ComboBox1列表框中每列的宽度为5*/ function func1() { UserForm1.ComboBox1.ColumnWidths = 5 }

ComboBox.ControlSource

您可以使用该属性指定控件中显示的数据。

### 语法语法

express.ControlSource

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

ComboBox.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.ComboBox1.Enabled = true }

ComboBox.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 ComboBox 对象的变量。

### 说明说明

指定对象的字体，只读

ComboBox.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.ComboBox1.ForeColor = 0x658978 }

ComboBox.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 ComboBox 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1控件的高度设置为100*/ function func1() { UserForm1.ComboBox1.Height = 100 }

ComboBox.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 ComboBox 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的高度设置为固定*/ function func1() { UserForm1.ComboBox1.HeightPolicy = 2 }

ComboBox.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.ComboBox1.Left = 100 }

ComboBox.ListRows

您可以使用 ListRows 属性设置在组合框的列表框部分中显示的最大行数。

### 语法语法

express.ListRows

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 ListRows 属性设置在组合框的列表框部分中显示的最大行数。

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1中的列表框的显示的最大行数设为8*/ function func1() { UserForm1.ComboBox1.ListRows = 8 }

ComboBox.ListWidth

您可以使用 ListWidth 属性设置组合框的列表框部分的宽度。

### 语法语法

express.ListWidth

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 ListWidth 属性设置组合框的列表框部分的宽度。

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的列表框部分的宽度设为100*/ function func1() { UserForm1.ComboBox1.ListWidth = 100 }

ComboBox.MaxLength

指定用户可以在文本框或组合框中输入的最大字符数

### 语法语法

express.MaxLength

express 一个代表 ComboBox 对象的变量。

### 说明说明

指定用户可以在文本框或组合框中输入的最大字符数

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1控件中允许输入的最大字符数设置为32767*/ function func1() { UserForm1.ComboBox1.MaxLength = 32767 }

ComboBox.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

ComboBox.RowSource

您可以使用 RowSource 属性指定如何向指定的对象提供数据。

### 语法语法

express.RowSource

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以使用 RowSource 属性指定如何向指定的对象提供数据。

ComboBox.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.ComboBox1.TabIndex = 2 }

ComboBox.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.ComboBox1.TabStop = true }

ComboBox.Text

您可以通过该属性设置或返回文本框中包含的文本值

### 语法语法

express.Text

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性设置或返回文本框中包含的文本值

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1控件中的文本设置为test test*/ function func1() { UserForm1.ComboBox1.Text = "test test" }

ComboBox.TextAlign

该属性用于指定对象中文本的对齐方式

### 语法语法

express.TextAlign

express 一个代表 ComboBox 对象的变量。

### 说明说明

该属性用于指定对象中文本的对齐方式，可设置为以下值：

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1中的文本设置为居中对齐*/ function func1() { UserForm1.ComboBox1.TextAlign = 2 }

ComboBox.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 ComboBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.ComboBox1.Top = 100 }

ComboBox.TopIndex

设置并返回出现在列表最顶部位置的项目。

### 语法语法

express.TopIndex

express 一个代表 ComboBox 对象的变量。

### 说明说明

设置并返回出现在列表最顶部位置的项目。

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的下标为3的选项设置到列表框的顶部*/ function func1() { UserForm1.ComboBox1.TopIndex = 3 }

ComboBox.Value

确定或指定文本框中的文本

### 语法语法

express.Value

express 一个代表 ComboBox 对象的变量。

### 说明说明

确定或指定文本框中的文本

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1控件中的文本指定为test test*/ function func1() { UserForm1.ComboBox1.Value = "test test" }

ComboBox.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 ComboBox 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1设置为可见*/ function func1() { UserForm1.ComboBox1.Visible = true }

ComboBox.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 ComboBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的宽度设置为100*/ function func1() { UserForm1.ComboBox1.Width = 100 }

ComboBox.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 ComboBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将ComboBox1的宽度设置为固定*/ function func1() { UserForm1.ComboBox1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ListBox 对象对象

用来显示用户可以选择的项目列表。如果不能一次显示全部项目的话，列表可以滚动。

### 说明说明

用来显示用户可以选择的项目列表。如果不能一次显示全部项目的话，列表可以滚动。

### 方法方法

名称名称 说明说明 AddItem 将新项目添加到指定组合框控件显示的值列表中。 Clear 清除列表框中的所有选项

Move 将对象移动到参数指定的位置 RemoveItem 从指定组合框控件显示的值列表中删除项目

### 属性属性

名称名称 说明说明 BackColor 获取或设置指定对象的内部颜色

BorderColor 您可以通过该属性指定控件边框的颜色

BorderStyle 指定控件边框的显示方式 BoundColumn 您可以使用该属性指定是否将列表框里第一个选项的文本显示出来

ColumnCount 您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数 ColumnHeads 您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题

ColumnWidths 您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度

ControlSource 您可以使用该属性指定控件中显示的数据 Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略 Left 您可以通过该属性指定控件在对象或报表中的位置

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 RowSource 您可以使用 RowSource 属性指定如何向指定的对象提供数据

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上 Text 您可以通过该属性设置或返回文本框中包含的文本值

TextAlign 该属性用于指定对象中文本的对齐方式 Top 您可以通过该属性指定控件在对象或报表中的位置

TopIndex 设置并返回出现在列表最顶部位置的项目。

Value 确定或指定列表框中的哪个值或选项被选中。 Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

ListBox.AddItem

将新项目添加到指定组合框控件显示的值列表中。

### 语法语法

express.AddItem(Content,Index)

express 一个代表 ListBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Content 必选 String 列表框里显示的文本内容 Index 必选 Number 该选项在列表框里的位置

### 说明说明

将新项目添加到指定组合框控件显示的值列表中。

### 示例示例

示例代码示例代码 复制复制

/*将test0设置为ListBox1控件列表框中的第一个选项*/ function func1() { UserForm1.ListBox1.AddItem("test0",0); }

ListBox.Clear

清除列表框中的所有选项

### 语法语法

express.Clear()

express 一个代表 ListBox 对象的变量。

### 说明说明

清除列表框中的所有选项

### 示例示例

示例代码示例代码 复制复制

/*清除ListBox1中列表框中的所有选项*/ function func1() { UserForm1.ListBox1.Clear() }

ListBox.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 ListBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.ListBox1.Move(100,100,100,100) }

ListBox.RemoveItem

从指定组合框控件显示的值列表中删除项目

### 语法语法

express.RemoveItem(Index)

express 一个代表 ListBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Index 必选 Number 删除列表框中index指定的下标的值

### 说明说明

从指定组合框控件显示的值列表中删除项目

### 示例示例

示例代码示例代码 复制复制

/*删除ListBox1中下标为3的值*/ function func1() { UserForm1.ListBox1.RemoveItem(3) }

### 成员属性成员属性

ListBox.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 ListBox 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ListBox1.BackColor = 0x665898 }

ListBox.BorderColor

您可以通过该属性指定控件边框的颜色

### 语法语法

express.BorderColor

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定控件边框的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的边框设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ListBox1.BorderColor = 0x665898 }

ListBox.BorderStyle

指定控件边框的显示方式

### 语法语法

express.BorderStyle

express 一个代表 ListBox 对象的变量。

### 说明说明

指定控件边框的显示方式，可以设置为以下值：

设置设置 值值 描述描述 None 0 无边框 Single 1 实线边框

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的边框显示方式设置为实线*/ function func1() { UserForm1.ListBox1.BorderStyle = 1 }

ListBox.BoundColumn

您可以使用该属性指定是否将列表框里第一个选项的文本显示出来

### 语法语法

express.BoundColumn

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用该属性指定是否将列表框里第一个选项的文本显示出来，可以设置为以下值：

设置设置 值值 描述描述 显示 0 显示第一个选项的值 不显示 1 不显示第一个选项的值

### 示例示例

示例代码示例代码 复制复制

/*显示ListBox1列表框里第一个选项的值*/ function func1() { UserForm1.ListBox1.BoundColumn = 0 }

ListBox.ColumnCount

您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数

### 语法语法

express.ColumnCount

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用 ColumnCount 属性来指定在列表框或组合框的列表框部分中显示的列数

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的列表框的列数设置为3*/ function func1() { UserForm1.ListBox1.ColumnCount = 3 }

ListBox.ColumnHeads

您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题

### 语法语法

express.ColumnHeads

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用 ColumnHeads 属性指定列表框是否显示单行列标题。可以设置为以下值：

设置设置 值值 描述描述 Yes true 显示列标题 No false 不显示列标题

### 示例示例

示例代码示例代码 复制复制

/*不显示ListBox1列表框的列标题*/ function func1() { UserForm1.ListBox1.ColumnHeads = false }

ListBox.ColumnWidths

您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度

### 语法语法

express.ColumnWidths

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用 ColumnWidths 属性来指定多列组合框中每列的宽度

### 示例示例

示例代码示例代码 复制复制

/*设置ListBox1列表框中每列的宽度为5*/ function func1() { UserForm1.ListBox1.ColumnWidths = 5 }

ListBox.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

ListBox.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.ListBox1.Enabled = true }

ListBox.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 ListBox 对象的变量。

### 说明说明

指定对象的字体，只读

ListBox.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.ListBox1.ForeColor = 0x658978 }

ListBox.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 ListBox 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1控件的高度设置为100*/ function func1() { UserForm1.ListBox1.Height = 100 }

ListBox.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 ListBox 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的高度设置为固定*/ function func1() { UserForm1.ListBox1.HeightPolicy = 2 }

ListBox.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.ListBox1.Left = 100 }

ListBox.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

ListBox.RowSource

您可以使用 RowSource 属性指定如何向指定的对象提供数据

### 语法语法

express.RowSource

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以使用 RowSource 属性指定如何向指定的对象提供数据

ListBox.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.ListBox1.TabIndex = 2 }

ListBox.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.ListBox1.TabStop = true }

ListBox.Text

您可以通过该属性设置或返回文本框中包含的文本值

### 语法语法

express.Text

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性设置或返回文本框中包含的文本值

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1控件中的文本设置为test test*/ function func1() { UserForm1.ListBox1.Text = "test test" }

ListBox.TextAlign

该属性用于指定对象中文本的对齐方式

### 语法语法

express.TextAlign

express 一个代表 ListBox 对象的变量。

### 说明说明

该属性用于指定对象中文本的对齐方式，包含以下值：

设置设置 值值 描述描述 Left 1 文本数字和日期都左对齐 Center 2 文本数字和日期都居中对齐 Right 3 文本数字和日期都右对齐

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1中的文本设置为居中对齐*/ function func1() { UserForm1.ListBox1.TextAlign = 2 }

ListBox.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 ListBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.ListBox1.Top = 100 }

ListBox.TopIndex

设置并返回出现在列表最顶部位置的项目。

### 语法语法

express.TopIndex

express 一个代表 ListBox 对象的变量。

### 说明说明

设置并返回出现在列表最顶部位置的项目。

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的下标为3的选项设置到列表框的顶部*/ function func1() { UserForm1.ListBox1.TopIndex = 3 }

ListBox.Value

确定或指定列表框中的哪个值或选项被选中。

### 语法语法

express.Value

express 一个代表 ListBox 对象的变量。

### 说明说明

确定或指定列表框中的哪个值或选项被选中。

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1控件中的选项指定为test test*/ function func1() { UserForm1.ListBox1.Value = "test test" }

ListBox.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 ListBox 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1设置为可见*/ function func1() { UserForm1.ListBox1.Visible = true }

ListBox.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 ListBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的宽度设置为100*/ function func1() { UserForm1.ListBox1.Width = 100 }

ListBox.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 ListBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将ListBox1的宽度设置为固定*/ function func1() { UserForm1.ListBox1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# CheckBox 对象对象

可以显示出多重选择，用户可以选择一个或者多个选项，如果选中多个选项则显示出多重选择。

### 说明说明

可以显示出多重选择，用户可以选择一个或者多个选项，如果选中多个选项则显示出多重选择。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 Caption 获取或设置出现在控件中的文本

ControlSource 您可以使用该属性指定控件中显示的数据

Enabled 您可以通过该属性设置或返回是否启用该控件 Font 指定对象的字体，只读

ForeColor 您可以通过该属性指定控件中文本的颜色 Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置 TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

Top 您可以通过该属性指定控件在对象或报表中的位置

Value 确定或指定是否选中指定的复选框 Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

CheckBox.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 CheckBox 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.CheckBox1.Move(100,100,100,100) }

### 成员属性成员属性

CheckBox.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 CheckBox 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置CheckBox1控件为根据内容自动设置大小*/ function func1() { UserForm1.CheckBox1.AutoSize = true }

CheckBox.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.CheckBox1.BackColor = 0x665898 }

CheckBox.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为透明*/ function func1() { UserForm1.CheckBox1.BackStyle = 0 }

CheckBox.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1中的文本设置为"CheckBox1"*/ function func1() { UserForm1.CheckBox1.Caption = "CheckBox1" }

CheckBox.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

CheckBox.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.CheckBox1.Enabled = true }

CheckBox.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 CheckBox 对象的变量。

### 说明说明

指定对象的字体，只读

CheckBox.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.CheckBox1.ForeColor = 0x658978 }

CheckBox.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1控件的高度设置为100*/ function func1() { UserForm1.CheckBox1.Height = 100 }

CheckBox.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1的高度设置为固定*/ function func1() { UserForm1.CheckBox1.HeightPolicy = 2 }

CheckBox.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.CheckBox1.Left = 100 }

CheckBox.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

CheckBox.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.CheckBox1.TabIndex = 2 }

CheckBox.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.CheckBox1.TabStop = true }

CheckBox.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 CheckBox 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.CheckBox1.Top = 100 }

CheckBox.Value

确定或指定是否选中指定的复选框

### 语法语法

express.Value

express 一个代表 CheckBox 对象的变量。

### 说明说明

确定或指定是否选中指定的复选框。设为True为选定该复选框，默认为False

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1控件中的选项指定为test test*/ function func1() { UserForm1.CheckBox1.Value = "test test" }

CheckBox.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 CheckBox 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为可见*/ function func1() { UserForm1.CheckBox1.Visible = true }

CheckBox.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1的宽度设置为100*/ function func1() { UserForm1.CheckBox1.Width = 100 }

CheckBox.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 CheckBox 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 属性属性 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1的宽度设置为固定*/ function func1() { UserForm1.CheckBox1.WidthPolicy = 2 }

CheckBox.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 CheckBox 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将CheckBox1设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.CheckBox1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# OptionButton 对象对象

可以显示出多重选择，用户只能选择一个。

### 说明说明

可以显示出多重选择，用户只能选择一个。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 Caption 获取或设置出现在控件中的文本

ControlSource 您可以使用该属性指定控件中显示的数据

Enabled 您可以通过该属性设置或返回是否启用该控件 Font 指定对象的字体，只读

ForeColor 您可以通过该属性指定控件中文本的颜色 GroupName 您可以通过设置组名，创建一组互斥的OptionButton

Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略 Left 您可以通过该属性指定控件在对象或报表中的位置

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

Top 您可以通过该属性指定控件在对象或报表中的位置 Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

OptionButton.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 OptionButton 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.OptionButton1.Move(100,100,100,100) }

### 成员属性成员属性

OptionButton.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 OptionButton 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置OptionButton1控件为根据内容自动设置大小*/ function func1() { UserForm1.OptionButton1.AutoSize = true }

OptionButton.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.OptionButton1.BackColor = 0x665898 }

OptionButton.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为透明*/ function func1() { UserForm1.OptionButton1.BackStyle = 0 }

OptionButton.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1中的文本设置为"OptionButton1"*/ function func1() { UserForm1.OptionButton1.Caption = "OptionButton1" }

OptionButton.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

OptionButton.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.OptionButton1.Enabled = true }

OptionButton.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 OptionButton 对象的变量。

### 说明说明

指定对象的字体，只读

OptionButton.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.OptionButton1.ForeColor = 0x658978 }

OptionButton.GroupName

您可以通过设置组名，创建一组互斥的OptionButton

### 语法语法

express.GroupName

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过设置组名，创建一组互斥的OptionButton。同一组里的OptionButton将采用相同的设置，点击组内的任何一 个选项都会将其他选项置为false。不同容器下相同的组名会被视为不同组（每个容器一个组）。

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的组名设置为group one*/ function func1() { UserForm1.OptionButton1.GroupName = "group one" }

OptionButton.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1控件的高度设置为100*/ function func1() { UserForm1.OptionButton1.Height = 100 }

OptionButton.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的高度设置为固定*/ function func1() { UserForm1.OptionButton1.HeightPolicy = 2 }

OptionButton.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.OptionButton1.Left = 100 }

OptionButton.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

OptionButton.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.OptionButton1.TabIndex = 2 }

OptionButton.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.OptionButton1.TabStop = true }

OptionButton.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 OptionButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.OptionButton1.Top = 100 }

OptionButton.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 OptionButton 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为可见*/ function func1() { UserForm1.OptionButton1.Visible = true }

OptionButton.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的宽度设置为100*/ function func1() { UserForm1.OptionButton1.Width = 100 }

OptionButton.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 OptionButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1的宽度设置为固定*/ function func1() { UserForm1.OptionButton1.WidthPolicy = 2 }

OptionButton.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 OptionButton 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将OptionButton1设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.OptionButton1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ScrollBar 对象对象

提供在长列表工程或大量信息中快速浏览的图形工具，以比例方式指示出当前位置，或是做为一个输入设备，或速度及数量的

指示器。

### 说明说明

提供在长列表工程或大量信息中快速浏览的图形工具，以比例方式指示出当前位置，或是做为一个输入设备，或速度及数量的

指示器。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 定该对象是否根据内容自动设置它的大小

BackColor 获取或设置指定对象的内部颜色 ControlSource 您可以使用该属性指定控件中显示的数据

Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

LargeChange 指定当用户在滚动框和滚动箭头之间单击时发生的移动量。

Left 您可以通过该属性指定控件在对象或报表中的位置 Max 为该控件的Value属性指定最大可接受值。

Min 为该控件的Value属性指定最小可接受值。 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

Orientation 指定该控件是垂直定向还是水平定向

SmallChange 指定当用户单击滚动箭头时发生的移动量。 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上 Top 您可以通过该属性指定控件在对象或报表中的位置

Value 您可以通过该属性指定一个在Max和Min之间的值

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

ScrollBar.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 ScrollBar 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.ScrollBar1.Move(100,100,100,100) }

### 成员属性成员属性

ScrollBar.AutoSize

定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 ScrollBar 对象的变量。

### 说明说明

定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置ScrollBar1控件为根据内容自动设置大小*/ function func1() { UserForm1.ScrollBar1.AutoSize = true }

ScrollBar.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 ScrollBar 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ScrollBar1.BackColor = 0x665898 }

ScrollBar.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

ScrollBar.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.ScrollBar1.Enabled = true }

ScrollBar.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 ScrollBar 对象的变量。

### 说明说明

指定对象的字体，只读

ScrollBar.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.ScrollBar1.ForeColor = 0x658978 }

ScrollBar.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 ScrollBar 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1控件的高度设置为100*/ function func1() { UserForm1.ScrollBar1.Height = 100 }

ScrollBar.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 ScrollBar 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的高度设置为固定*/ function func1() { UserForm1.ScrollBar1.HeightPolicy = 2 }

ScrollBar.LargeChange

指定当用户在滚动框和滚动箭头之间单击时发生的移动量。

### 语法语法

express.LargeChange

express 一个代表 ScrollBar 对象的变量。

### 说明说明

指定当用户在滚动框和滚动箭头之间单击时发生的移动量。

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1在用户点击滚动框和滚动箭头时发生的移动量设为200*/ function func1() { UserForm1.ScrollBar1.LargeChange = 200 }

ScrollBar.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.ScrollBar1.Left = 100 }

ScrollBar.Max

为该控件的Value属性指定最大可接受值。

### 语法语法

express.Max

express 一个代表 ScrollBar 对象的变量。

### 说明说明

为该控件的Value属性指定最大可接受值。

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的Value属性的最大可接受值设为2000*/ function func1() { UserForm1.ScrollBar1.Max = 2000 }

ScrollBar.Min

为该控件的Value属性指定最小可接受值。

### 语法语法

express.Min

express 一个代表 ScrollBar 对象的变量。

### 说明说明

为该控件的Value属性指定最小可接受值。

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的Value属性的最小可接受值设为0*/ function func1() { UserForm1.ScrollBar1.Mix = 0 }

ScrollBar.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

ScrollBar.Orientation

指定该控件是垂直定向还是水平定向

### 语法语法

express.Orientation

express 一个代表 ScrollBar 对象的变量。

### 说明说明

指定该控件是垂直定向还是水平定向，可以设置为以下值：

设置设置 值值 描述描述 Auto -1 根据控件的尺寸自动确定方向（默认）。 Vertical 0 控件垂直呈现。 Horizontal 1 控件水平呈现。

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1垂直呈现*/ function func1() { UserForm1.ScrollBar1.Orientation = 0 }

ScrollBar.SmallChange

指定当用户单击滚动箭头时发生的移动量。

### 语法语法

express.SmallChange

express 一个代表 ScrollBar 对象的变量。

### 说明说明

指定当用户单击滚动箭头时发生的移动量。

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1在用户点击滚动箭头时发生的移动量设为100*/ function func1() { UserForm1.ScrollBar1.LargeChange = 100 }

ScrollBar.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.ScrollBar1.TabIndex = 2 }

ScrollBar.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.ScrollBar1.TabStop = true }

ScrollBar.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.ScrollBar1.Top = 100 }

ScrollBar.Value

您可以通过该属性指定一个在Max和Min之间的值

### 语法语法

express.Value

express 一个代表 ScrollBar 对象的变量。

### 说明说明

您可以通过该属性指定一个在Max和Min之间的值

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的Valued的值为500*/ function func1() { UserForm1.ScrollBar1.Value = 500 }

ScrollBar.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 ScrollBar 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1设置为可见*/ function func1() { UserForm1.ScrollBar1.Visible = true }

ScrollBar.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 ScrollBar 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的宽度设置为100*/ function func1() { UserForm1.ScrollBar1.Width = 100 }

ScrollBar.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 ScrollBar 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将ScrollBar1的宽度设置为固定*/ function func1() { UserForm1.ScrollBar1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# HLayout 对象对象

将内部的控件按照水平方向排布，一列一个。

### 说明说明

将内部的控件按照水平方向排布，一列一个。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 Enabled 您可以通过该属性设置或返回是否启用该控件 Height 获取或设置指定对象的高度

LayoutBottomMargin 获取或设置容器内部的控件与容器底部的距离 LayoutLeftMargin 获取或设置容器内部的控件与容器左边缘的距离

LayoutRightMargin 获取或设置容器内部的控件与容器右边缘的距离

LayoutSpacing 获取或设置容器内部多个控件之间的水平间距 LayoutTopMargin 获取或设置容器内部的控件与容器顶部的距离

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

Top 您可以通过该属性指定控件在对象或报表中的位置

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

### 成员方法成员方法

HLayout.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 HLayout 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.HLayout1.Move(100,100,100,100) }

### 成员属性成员属性

HLayout.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 HLayout 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.HLayout1.Enabled = true }

HLayout.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1控件的高度设置为100*/ function func1() { UserForm1.HLayout1.Height = 100 }

HLayout.LayoutBottomMargin

获取或设置容器内部的控件与容器底部的距离

### 语法语法

express.LayoutBottomMargin

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器底部的距离

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1中控件到容器底部的距离设为10*/ function func1() { UserForm1.HLayout1.LayoutBottomMargin = 10 }

HLayout.LayoutLeftMargin

获取或设置容器内部的控件与容器左边缘的距离

### 语法语法

express.LayoutLeftMargin

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器左边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1中控件到容器左边缘的距离设为10*/ function func1() { UserForm1.HLayout1.LayoutLeftMargin = 10 }

HLayout.LayoutRightMargin

获取或设置容器内部的控件与容器右边缘的距离

### 语法语法

express.LayoutRightMargin

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器右边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1中控件到容器右边缘的距离设为10*/ function func1() { UserForm1.HLayout1.LayoutRightMargin = 10 }

HLayout.LayoutSpacing

获取或设置容器内部多个控件之间的水平间距

### 语法语法

express.LayoutSpacing

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置容器内部多个控件之间的水平间距

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1中多个控件之间的距离设为10*/ function func1() { UserForm1.HLayout1.LayoutSpacing = 10 }

HLayout.LayoutTopMargin

获取或设置容器内部的控件与容器顶部的距离

### 语法语法

express.LayoutTopMargin

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器顶部的距离

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1中控件到容器顶部的距离设为10*/ function func1() { UserForm1.HLayout1.LayoutTopMargin = 10 }

HLayout.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 HLayout 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.HLayout1.Left = 100 }

HLayout.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 HLayout 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

HLayout.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 HLayout 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.HLayout1.Top = 100 }

HLayout.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 HLayout 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1设置为可见*/ function func1() { UserForm1.HLayout1.Visible = true }

HLayout.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 HLayout 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将HLayout1的宽度设置为100*/ function func1() { UserForm1.HLayout1.Width = 100 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# VLayout 对象对象

将内部的控件按照垂直方向排布，一行一个。

### 说明说明

将内部的控件按照垂直方向排布，一行一个。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 Enabled 您可以通过该属性设置或返回是否启用该控件 Height 获取或设置指定对象的高度

LayoutBottomMargin 获取或设置容器内部的控件与容器底部的距离 LayoutLeftMargin 获取或设置容器内部的控件与容器左边缘的距离

LayoutRightMargin 获取或设置容器内部的控件与容器右边缘的距离

LayoutSpacing 获取或设置容器内部多个控件之间的水平间距 LayoutTopMargin 获取或设置容器内部的控件与容器顶部的距离

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

Top 您可以通过该属性指定控件在对象或报表中的位置

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

### 成员方法成员方法

VLayout.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 VLayout 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.VLayout1.Move(100,100,100,100) }

### 成员属性成员属性

VLayout.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 VLayout 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.VLayout1.Enabled = true }

VLayout.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1控件的高度设置为100*/ function func1() { UserForm1.VLayout1.Height = 100 }

VLayout.LayoutBottomMargin

获取或设置容器内部的控件与容器底部的距离

### 语法语法

express.LayoutBottomMargin

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器底部的距离

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1中控件到容器底部的距离设为10*/ function func1() { UserForm1.VLayout1.LayoutBottomMargin = 10 }

VLayout.LayoutLeftMargin

获取或设置容器内部的控件与容器左边缘的距离

### 语法语法

express.LayoutLeftMargin

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器左边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1中控件到容器左边缘的距离设为10*/ function func1() { UserForm1.VLayout1.LayoutLeftMargin = 10 }

VLayout.LayoutRightMargin

获取或设置容器内部的控件与容器右边缘的距离

### 语法语法

express.LayoutRightMargin

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器右边缘的距离

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1中控件到容器右边缘的距离设为10*/ function func1() { UserForm1.VLayout1.LayoutRightMargin = 10 }

VLayout.LayoutSpacing

获取或设置容器内部多个控件之间的水平间距

### 语法语法

express.LayoutSpacing

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置容器内部多个控件之间的水平间距

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1中多个控件之间的距离设为10*/ function func1() { UserForm1.VLayout1.LayoutSpacing = 10 }

VLayout.LayoutTopMargin

获取或设置容器内部的控件与容器顶部的距离

### 语法语法

express.LayoutTopMargin

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置容器内部的控件与容器顶部的距离

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1中控件到容器顶部的距离设为10*/ function func1() { UserForm1.VLayout1.LayoutTopMargin = 10 }

VLayout.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 VLayout 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.VLayout1.Left = 100 }

VLayout.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 VLayout 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

VLayout.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 VLayout 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.VLayout1.Top = 100 }

VLayout.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 VLayout 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1设置为可见*/ function func1() { UserForm1.VLayout1.Visible = true }

VLayout.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 VLayout 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将VLayout1的宽度设置为100*/ function func1() { UserForm1.VLayout1.Width = 100 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# HSpacer 对象对象

填充水平方向上无用的空隙。

### 说明说明

填充水平方向上无用的空隙。

### 属性属性

名称名称 说明说明 Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

Top 您可以通过该属性指定控件在对象或报表中的位置

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

### 成员属性成员属性

HSpacer.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 HSpacer 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1控件的高度设置为100*/ function func1() { UserForm1.HSpacer1.Height = 100 }

HSpacer.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 HSpacer 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1的高度设置为固定*/ function func1() { UserForm1.HSpacer1.HeightPolicy = 2 }

HSpacer.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 HSpacer 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.HSpacer1.Left = 100 }

HSpacer.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 HSpacer 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

HSpacer.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 HSpacer 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.HSpacer1.Top = 100 }

HSpacer.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 HSpacer 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1的宽度设置为100*/ function func1() { UserForm1.HSpacer1.Width = 100 }

HSpacer.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 HSpacer 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将HSpacer1的宽度设置为固定*/ function func1() { UserForm1.HSpacer1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# VSpace 对象对象

填充垂直方向上无用的空隙。

### 说明说明

填充垂直方向上无用的空隙。

### 属性属性

名称名称 说明说明 Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

Top 您可以通过该属性指定控件在对象或报表中的位置

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

### 成员属性成员属性

VSpace.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 VSpace 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1控件的高度设置为100*/ function func1() { UserForm1.VSpacer1.Height = 100 }

VSpace.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 VSpace 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 可变宽度

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1的高度设置为固定*/ function func1() { UserForm1.VSpacer1.HeightPolicy = 2 }

VSpace.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 VSpace 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.VSpacer1.Left = 100 }

VSpace.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 VSpace 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

VSpace.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 VSpace 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.VSpacer1.Top = 100 }

VSpace.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 VSpace 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1的宽度设置为100*/ function func1() { UserForm1.VSpacer1.Width = 100 }

VSpace.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 VSpace 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将VSpacer1的宽度设置为固定*/ function func1() { UserForm1.VSpacer1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# SpinButton 对象对象

一种与其它控件并用微调控制的控件，也可以用来对一个范围的值或工程列表做向前或向后的遍历。

### 说明说明

一种与其它控件并用微调控制的控件，也可以用来对一个范围的值或工程列表做向前或向后的遍历。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

ControlSource 您可以使用该属性指定控件中显示的数据 Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读

ForeColor 您可以通过该属性指定控件中文本的颜色 Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略 Left 您可以通过该属性指定控件在对象或报表中的位置

Max 为该控件的Value属性指定最大可接受值。

Min 为该控件的Value属性指定最小可接受值。 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

SmallChange 指定当用户单击 滚动箭头时发生的移动量。 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

Top 您可以通过该属性指定控件在对象或报表中的位置 Value 您可以通过该属性指定一个在Max和Min之间的值

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

SpinButton.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 SpinButton 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.SpinButton1.Move(100,100,100,100) }

### 成员属性成员属性

SpinButton.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 SpinButton 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置SpinButton1控件为根据内容自动设置大小*/ function func1() { UserForm1.SpinButton1.AutoSize = true }

SpinButton.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 SpinButton 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.SpinButton1.BackColor = 0x665898 }

SpinButton.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

SpinButton.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.SpinButton1.Enabled = true }

SpinButton.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 SpinButton 对象的变量。

### 说明说明

指定对象的字体，只读

SpinButton.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.SpinButton1.ForeColor = 0x658978 }

SpinButton.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 SpinButton 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1控件的高度设置为100*/ function func1() { UserForm1.SpinButton1.Height = 100 }

SpinButton.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 SpinButton 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的高度设置为固定*/ function func1() { UserForm1.SpinButton1.HeightPolicy = 2 }

SpinButton.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.SpinButton1.Left = 100 }

SpinButton.Max

为该控件的Value属性指定最大可接受值。

### 语法语法

express.Max

express 一个代表 SpinButton 对象的变量。

### 说明说明

为该控件的Value属性指定最大可接受值。

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的Value属性的最大可接受值设为2000*/ function func1() { UserForm1.SpinButton1.Max = 2000 }

SpinButton.Min

为该控件的Value属性指定最小可接受值。

### 语法语法

express.Min

express 一个代表 SpinButton 对象的变量。

### 说明说明

为该控件的Value属性指定最小可接受值。

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的Value属性的最小可接受值设为0*/ function func1() { UserForm1.SpinButton1.Mix = 0 }

SpinButton.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

SpinButton.SmallChange

指定当用户单击 滚动箭头时发生的移动量。

### 语法语法

express.SmallChange

express 一个代表 SpinButton 对象的变量。

### 说明说明

指定当用户单击滚动箭头时发生的移动量。

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1在用户点击滚动箭头时发生的移动量设为100*/ function func1() { UserForm1.SpinButton1.LargeChange = 100 }

SpinButton.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.SpinButton1.TabIndex = 2 }

SpinButton.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.SpinButton1.TabStop = true }

SpinButton.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.SpinButton1.Top = 100 }

SpinButton.Value

您可以通过该属性指定一个在Max和Min之间的值

### 语法语法

express.Value

express 一个代表 SpinButton 对象的变量。

### 说明说明

您可以通过该属性指定一个在Max和Min之间的值

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的Valued的值为500*/ function func1() { UserForm1.SpinButton1.Value = 500 }

SpinButton.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 SpinButton 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1设置为可见*/ function func1() { UserForm1.SpinButton1.Visible = true }

SpinButton.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 SpinButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的宽度设置为100*/ function func1() { UserForm1.SpinButton1.Width = 100 }

SpinButton.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 SpinButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可以设置为以下值：

设置设置 值值 描述描述 Expanding 1 柯柏年宽度

Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将SpinButton1的宽度设置为固定*/ function func1() { UserForm1.SpinButton1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# ToggleButton 对象对象

创建一个切换开关的按钮。

### 说明说明

创建一个切换开关的按钮。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 AutoSize 指定该对象是否根据内容自动设置它的大小 BackColor 获取或设置指定对象的内部颜色

BackStyle 您可以使用该属性指定控件是否透明 Caption 获取或设置出现在控件中的文本

ControlSource 您可以使用该属性指定控件中显示的数据

Enabled 您可以通过该属性设置或返回是否启用该控件 Font 指定对象的字体，只读

ForeColor 您可以通过该属性指定控件中文本的颜色 Height 获取或设置指定对象的高度

HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置 TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

TextAlign 该属性用于指定对象中文本的对齐方式

Top 您可以通过该属性指定控件在对象或报表中的位置 Value 指定该按钮是否被按下。true是按下，false是弹起。

Visible 返回或设置该对象是否可见 Width 获取或设置指定对象的宽度

WidthPolic 获取或设置指定对象的宽度策略

WordWrap 指定控件的内容是否在行尾自动换行

### 成员方法成员方法

ToggleButton.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 ToggleButton 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

{#_examples}/*将ToggleButton1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.ToggleButton1.Move(100,100,100,100) }

### 成员属性成员属性

ToggleButton.AutoSize

指定该对象是否根据内容自动设置它的大小

### 语法语法

express.AutoSize

express 一个代表 ToggleButton 对象的变量。

### 说明说明

指定该对象是否根据内容自动设置它的大小

### 示例示例

示例代码示例代码 复制复制

/*设置ToggleButton1控件为根据内容自动设置大小*/ function func1() { UserForm1.ToggleButton1.AutoSize = true }

ToggleButton.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.ToggleButton1.BackColor = 0x665898 }

ToggleButton.BackStyle

您可以使用该属性指定控件是否透明

### 语法语法

express.BackStyle

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以使用该属性指定控件是否透明

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为透明*/ function func1() { UserForm1.ToggleButton1.BackStyle = 0 }

ToggleButton.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1中的文本设置为"ToggleButton1"*/ function func1() { UserForm1.ToggleButton1.Caption = "ToggleButton1" }

ToggleButton.ControlSource

您可以使用该属性指定控件中显示的数据

### 语法语法

express.ControlSource

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以使用该属性指定控件中显示的数据。您可以显示和编辑绑定到表的数据、查询的数据或SQL语句中的字段的数

据。您还可以显示表达式的结果

ToggleButton.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.ToggleButton1.Enabled = true }

ToggleButton.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 ToggleButton 对象的变量。

### 说明说明

指定对象的字体，只读

ToggleButton.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.ToggleButton1.ForeColor = 0x658978 }

ToggleButton.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1控件的高度设置为100*/ function func1() { UserForm1.ToggleButton1.Height = 100 }

ToggleButton.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1的高度设置为固定*/ function func1() { UserForm1.ToggleButton1.HeightPolicy = 2 }

ToggleButton.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.ToggleButton1.Left = 100 }

ToggleButton.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

ToggleButton.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.ToggleButton1.TabIndex = 2 }

ToggleButton.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.ToggleButton1.TabStop = true }

ToggleButton.TextAlign

该属性用于指定对象中文本的对齐方式

### 语法语法

express.TextAlign

express 一个代表 ToggleButton 对象的变量。

### 说明说明

该属性用于指定对象中文本的对齐方式，包含以下值：

设置设置 值值 描述描述 Left 1 文本数字和日期都左对齐 Center 2 文本数字和日期都居中对齐 Right 3 文本数字和日期都右对齐

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1中的文本设置为居中对齐*/ function func1() { UserForm1.ToggleButton1.TextAlign = 2 }

ToggleButton.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 ToggleButton 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.ToggleButton1.Top = 100 }

ToggleButton.Value

指定该按钮是否被按下。true是按下，false是弹起。

### 语法语法

express.Value

express 一个代表 ToggleButton 对象的变量。

### 说明说明

指定该按钮是否被按下。true是按下，false是弹起。

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为按下*/ function func1() { UserForm1.ToggleButton1.Value = true }

ToggleButton.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 ToggleButton 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为可见*/ function func1() { UserForm1.ToggleButton1.Visible = true }

ToggleButton.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1的宽度设置为100*/ function func1() { UserForm1.ToggleButton1.Width = 100 }

ToggleButton.WidthPolic

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolic

express 一个代表 ToggleButton 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1的宽度设置为固定*/ function func1() { UserForm1.ToggleButton1.WidthPolicy = 2 }

ToggleButton.WordWrap

指定控件的内容是否在行尾自动换行

### 语法语法

express.WordWrap

express 一个代表 ToggleButton 对象的变量。

### 说明说明

指定控件的内容是否在行尾自动换行

### 示例示例

示例代码示例代码 复制复制

/*将ToggleButton1设置为控件的内容在行尾自动换行*/ function func1() { UserForm1.ToggleButton1.WordWrap = true }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# Frame 对象对象

可以创建一个图形或控件的功能组。要为多个控件创建组，可先画框架，接着在框架中添加控件。

### 说明说明

可以创建一个图形或控件的功能组。要为多个控件创建组，可先画框架，接着在框架中添加控件。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 BackColor 获取或设置指定对象的内部颜色 BorderColor 您可以通过该属性指定控件边框的颜色

BorderStyle 指定控件边框的显示方式 Caption 获取或设置出现在控件中的文本

Enabled 您可以通过该属性设置或返回是否启用该控件

Font 指定对象的字体，只读 ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置

Name 您可以通过该属性指定或确定表示对象名称的字符串，只读 TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上 Top 您可以通过该属性指定控件在对象或报表中的位置

Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度 WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

Frame.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Top,Left,Width,Height)

express 一个代表 Frame 对象的变量。

### 参数参数

名称名称 必选必选/可选可选数据类型数据类型说明说明

Top 必选 Number 对象移动后相对于窗口的左边缘的距离 Left 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将Frame1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.Frame1.Move(100,100,100,100) }

### 成员属性成员属性

Frame.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将Frame1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.Frame1.BackColor = 0x665898 }

Frame.BorderColor

您可以通过该属性指定控件边框的颜色

### 语法语法

express.BorderColor

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定控件边框的颜色

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的边框设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.Frame1.BorderColor = 0x665898 }

Frame.BorderStyle

指定控件边框的显示方式

### 语法语法

express.BorderStyle

express 一个代表 Frame 对象的变量。

### 说明说明

指定控件边框的显示方式，可设置为以下值：

设置设置 值值 描述描述 None 0 无边框 Single 1 实现边框

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的边框显示方式设置为实线*/ function func1() { UserForm1.Frame1.BorderStyle = 1 }

Frame.Caption

获取或设置出现在控件中的文本

### 语法语法

express.Caption

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置出现在控件中的文本

### 示例示例

示例代码示例代码 复制复制

/*将Frame1中的文本设置为"Frame1"*/ function func1() { UserForm1.Frame1.Caption = "Frame1" }

Frame.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.Frame1.Enabled = true }

Frame.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 Frame 对象的变量。

### 说明说明

指定对象的字体，只读

Frame.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将Frame1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.Frame1.ForeColor = 0x658978 }

Frame.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将Frame1控件的高度设置为100*/ function func1() { UserForm1.Frame1.Height = 100 }

Frame.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度

Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的高度设置为固定*/ function func1() { UserForm1.Frame1.HeightPolicy = 2 }

Frame.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.Frame1.Left = 100 }

Frame.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

Frame.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Frame1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.Frame1.TabIndex = 2 }

Frame.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将Frame1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.Frame1.TabStop = true }

Frame.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 Frame 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.Frame1.Top = 100 }

Frame.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 Frame 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将Frame1设置为可见*/ function func1() { UserForm1.Frame1.Visible = true }

Frame.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的宽度设置为100*/ function func1() { UserForm1.Frame1.Width = 100 }

Frame.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 Frame 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将Frame1的宽度设置为固定*/ function func1() { UserForm1.Frame1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# MultiPage 对象对象

包含一个选项卡栏和一个页面区的容器类组件，通过切换选项卡来切换不同页面，从而达到在同一个窗口中自由切换不同的内

容。

### 说明说明

包含一个选项卡栏和一个页面区的容器类组件，通过切换选项卡来切换不同页面，从而达到在同一个窗口中自由切换不同的内

容。

### 方法方法

名称名称 说明说明 Move 将对象移动到参数指定的位置

### 属性属性

名称名称 说明说明 BackColor 获取或设置指定对象的内部颜色

Enabled 您可以通过该属性设置或返回是否启用该控件 Font 指定对象的字体，只读

ForeColor 您可以通过该属性指定控件中文本的颜色

Height 获取或设置指定对象的高度 HeightPolicy 获取或设置指定对像的高度策略

Left 您可以通过该属性指定控件在对象或报表中的位置 Name 您可以通过该属性指定或确定表示对象名称的字符串，只读

TabIndex 您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

TabStop 您可以通过该属性指定是否可以通过Tab键将焦点移到控件上 Top 您可以通过该属性指定控件在对象或报表中的位置

Value 您可以通过该属性选择激活第几个页面 Visible 返回或设置该对象是否可见

Width 获取或设置指定对象的宽度

WidthPolicy 获取或设置指定对象的宽度策略

### 成员方法成员方法

MultiPage.Move

将对象移动到参数指定的位置

### 语法语法

express.Move(Left,Top,Width,Height)

express 一个代表 MultiPage 对象的变量。

### 参数参数

名称名称 /说明说明 必选必选 可选可选 数据类型数据类型

Left 必选 Number 对象移动后相对于窗口的左边缘的距离 Top 可选 Number 对象移动后相对于窗口的上边缘的距离 Width 可选 Number 对象移动后的预期宽度 Height 可选 Number 对象移动后的预期长度

### 说明说明

将对象移动到参数指定的位置

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1移动到窗体左上角，并将移动后的Label长宽设置为100*/ function func1() { UserForm1.MultiPage1.Move(100,100,100,100) }

### 成员属性成员属性

MultiPage.BackColor

获取或设置指定对象的内部颜色

### 语法语法

express.BackColor

express 一个代表 MultiPage 对象的变量。

### 说明说明

获取或设置指定对象的内部颜色

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1设置为十六进制下665898表示的颜色（紫色）*/ function func1() { UserForm1.MultiPage1.BackColor = 0x665898 }

MultiPage.Enabled

您可以通过该属性设置或返回是否启用该控件

### 语法语法

express.Enabled

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性设置或返回是否启用该控件

### 示例示例

示例代码示例代码 复制复制

/*启用该控件*/ function func1() { UserForm1.MultiPage1.Enabled = true }

MultiPage.Font

指定对象的字体，只读

### 语法语法

express.Font

express 一个代表 MultiPage 对象的变量。

### 说明说明

指定对象的字体，只读

MultiPage.ForeColor

您可以通过该属性指定控件中文本的颜色

### 语法语法

express.ForeColor

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定控件中文本的颜色

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1中的文本颜色设置为十六进制658978所表示的颜色*/ function func1() { UserForm1.MultiPage1.ForeColor = 0x658978 }

MultiPage.Height

获取或设置指定对象的高度

### 语法语法

express.Height

express 一个代表 MultiPage 对象的变量。

### 说明说明

获取或设置指定对象的高度

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1控件的高度设置为100*/ function func1() { UserForm1.MultiPage1.Height = 100 }

MultiPage.HeightPolicy

获取或设置指定对像的高度策略

### 语法语法

express.HeightPolicy

express 一个代表 MultiPage 对象的变量。

### 说明说明

获取或设置指定对像的高度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变高度 Fixed 2 固定高度

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1的高度设置为固定*/ function func1() { UserForm1.MultiPage1.HeightPolicy = 2 }

MultiPage.Left

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Left

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1的位置设置到距离窗体左边缘100像素*/ function func1() { UserForm1.MultiPage1.Left = 100 }

MultiPage.Name

您可以通过该属性指定或确定表示对象名称的字符串，只读

### 语法语法

express.Name

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定或确定表示对象名称的字符串，只读

MultiPage.TabIndex

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 语法语法

express.TabIndex

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定控件在窗体或报表上的Tab键顺序中的位置

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1设置为Tab键顺序为的第2个位置*/ function func1() { UserForm1.MultiPage1.TabIndex = 2 }

MultiPage.TabStop

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 语法语法

express.TabStop

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定是否可以通过Tab键将焦点移到控件上

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1设置为可以通过Tab键将焦点移到该控件上*/ function func1() { UserForm1.MultiPage1.TabStop = true }

MultiPage.Top

您可以通过该属性指定控件在对象或报表中的位置

### 语法语法

express.Top

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性指定控件在对象或报表中的位置

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1的位置设置到距离窗体上边缘100像素*/ function func1() { UserForm1.MultiPage1.Top = 100 }

MultiPage.Value

您可以通过该属性选择激活第几个页面

### 语法语法

express.Value

express 一个代表 MultiPage 对象的变量。

### 说明说明

您可以通过该属性选择激活第几个页面

### 示例示例

示例代码示例代码 复制复制

/*激活MultiPage1的第一个页面*/ function func1() { UserForm1.MultiPage1.Value = 0 }

MultiPage.Visible

返回或设置该对象是否可见

### 语法语法

express.Visible

express 一个代表 MultiPage 对象的变量。

### 说明说明

返回或设置该对象是否可见

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1设置为可见*/ function func1() { UserForm1.MultiPage1.Visible = true }

MultiPage.Width

获取或设置指定对象的宽度

### 语法语法

express.Width

express 一个代表 MultiPage 对象的变量。

### 说明说明

获取或设置指定对象的宽度

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1的宽度设置为100*/ function func1() { UserForm1.MultiPage1.Width = 100 }

MultiPage.WidthPolicy

获取或设置指定对象的宽度策略

### 语法语法

express.WidthPolicy

express 一个代表 MultiPage 对象的变量。

### 说明说明

获取或设置指定对象的宽度策略，可设置为以下值：

设置设置 值值 描述描述 Expanding 1 可变宽度 Fixed 2 固定宽度

### 示例示例

示例代码示例代码 复制复制

/*将MultiPage1的宽度设置为固定*/ function func1() { UserForm1.MultiPage1.WidthPolicy = 2 }

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# JSMsgBoxResult 枚举

用户点击MsgBox弹出消息框的按钮。

名称名称 值值 说明说明 jsResultOK 1 确定确定 jsResultCancel 2 取消取消 jsResultAbort 3 中止中止 jsResultRetry 4 重试重试 jsResultIgnore 5 忽略忽略 jsResultYes 6 是是 jsResultNo 7 否否

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# JSMsgBoxStyle 枚举枚举

用于设置MsgBox弹出消息框的样式。

名称名称 值值 说明说明 jsOKOnly 0 仅显示“确定确定 ”按钮。 jsOKCancel 1 显示“确定确定 ”和“取消取消 ”按钮。 jsAbortRetryIgnore 2 显示“中止中止 ”、“重试重试 ”和“忽略忽略 ”按钮。 jsYesNoCancel 3 显示“是是 ”、“否否 ”和“取消取消 ”按钮。 jsYesNo 4 显示“是是 ”和“否否 ”按钮。 jsRetryCancel 5 显示“重试重试 ”和“取消取消 ”按钮。 jsCritical 16 显示“关键消息关键消息 ”图标。 jsQuestion 32 显示“警告查询警告查询 ”图标。 jsExclamation 48 显示“警告消息警告消息 ”图标。 jsInformation 64 显示“信息消息信息消息 ”图标。 jsDefaultButton1 0 第一个按钮是默认按钮。 jsDefaultButton2 256 第二个按钮是默认按钮。 jsDefaultButton3 512 第三个按钮是默认按钮。 jsDefaultButton4 768 第四个按钮是默认按钮。 jsApplicationModal 0 应用程序模式；用户在继续在当前应用程序中工作前必须响应消息框。 jsSystemModal 4096 系统模式；在用户响应消息框前，所有应用程序都挂起。 jsMsgBoxHelpButton 16384 在消息框中添加“帮助帮助 ”按钮。 jsMsgBoxSetForeground 65536 将消息框窗口指定为前景窗口。 jsMsgBoxRight 524288 文本右对齐。 jsMsgBoxRtlReading 1048576 指定文本在希伯来语和阿拉伯语系统中应从右到左显示。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 扩展接口使用说明扩展接口使用说明

1、基本介绍、基本介绍

WPS的扩展接口是对WPS现有接口的进一步扩充，大大的丰富了WPS的接口，以便满足二次开发各种解决 方案的需要。WPS所有的扩展接口都满足唯一性、对称性、自反性、传递性，也就是说通过扩展接口可以查询

到对应的原始接口，同样的通过原始接口也可以查到对应的扩展接口。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# KsoRightsInfo 枚举枚举

指定文档的权限类型。

名称名称 值值 说明说明 ksoNoneRight 0x0000 无权限。 ksoModifyRight 0x0001 修改权限。 ksoCopyRight 0x0002 拷贝权限。 ksoPrintRight 0x0004 打印权限。 ksoSaveRight 0x0008 保存权限。 ksoBackupRight 0x0010 备份权限。 ksoVbaRight 0x0020 VBA权限。 ksoSaveAsRight 0x0040 另存权限。 ksoFullRight -1 所有权限。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# DataRange 对象对象

代表容器应用程序的一个数据区域对象。

### 说明说明

DataRange为类似表格Range概念，对应于表格中的一个区域，用于存储缓存数据，如果注册进DataSource，表格中的对应区

域数据修改，将会触发事件。

### 属性属性

名称名称 说明说明

Address 代表DataRange对象的地址。形如“sheet1!$a$1”表示sheet1中A1单元格。只读。

TextInJSON json 格式表示区域的格式化后的值。只读。

ValueInJSON json格式表示区域的值。只读。

### 成员属性成员属性

DataRange.Address

代表DataRange对象的地址。形如“sheet1!$a$1”表示sheet1中A1单元格。只读。

### 语法语法

express.Address

express 一个代表 DataRange 对象的变量。

### 类型类型

String

DataRange.TextInJSON

json格式表示区域的格式化后的值。只读。

### 语法语法

express.TextInJSON

express 一个代表 DataRange 对象的变量。

### 类型类型

String

DataRange.ValueInJSON

json格式表示区域的值。只读。

### 语法语法

express.ValueInJSON

express 一个代表 DataRange 对象的变量。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# DataSource 对象对象

代表容器应用程序的一个数据源对象。

### 方法方法

名称名称 说明说明 Activate ET 激活数据源，跨进程表现为激活文档。

ApplyDemoRange 往活动单元格填充示例数据。返回DataRange。

CreateDataRange 为选定的单元格创建DataRange对象。

GetAllRangeInfo 获取所有已注册的DataRange。

GetDataRange 返回已注册的对应DataRange。

InitDemoRange 初始化示例数据的行列数

RegisterDataRange 向当前DataSource对象注册DataRange对象。

SetDemoRangeItem 填充示例数据。

UnRegisterDataRange 反注册DataRange。

### 属性属性

名称名称 说明说明

Type 返回DataSource的类型。只读。

### 成员方法成员方法

DataSource.Activate

激活数据源，跨进程表现为激活ET文档。

### 语法语法

express.Activate()

express 一个代表 DataSource 对象的变量。

### 返回值返回值

Boolean

### 示例示例

示例代码示例代码 复制复制

//以下示例为WPP激活数据源对象，调起ET文档 Application.ActivePresentation.Slides(1).Shapes.Item(3).WebShape.DataSource.Activate()

DataSource.ApplyDemoRange

往活动单元格填充示例数据。返回DataRange。

### 语法语法

express.ApplyDemoRange()

express 一个代表 DataSource 对象的变量。

### 返回值返回值

Object

DataSource.CreateDataRange

为选定的单元格创建DataRange对象。

### 语法语法

express.CreateDataRange(Range)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Range 可选 Variant 代表单元格的字符串或者Range对象。

### 返回值返回值

Object

### 说明说明

参数Range可以为代表单元格的字符串或者Range对象，当为空或字符串时，会弹出对话框输入单元格地址。形 如“sheet1!$a$1”的字符串表示sheet1中A1单元格。返回值为DataRange。

### 示例示例

示例代码示例代码 复制复制

//下列示例为Sheet1中的A1单元格创建DataRange对象 Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.DataSource.CreateDataRange("sheet1!$a$1")

DataSource.GetAllRangeInfo

获取所有已注册的DataRange。

### 语法语法

express.GetAllRangeInfo()

express 一个代表 DataSource 对象的变量。

### 返回值返回值

String

### 说明说明

返回的字符串以JSON模式记录所有DataRange的Key。

DataSource.GetDataRange

返回已注册的对应DataRange。

### 语法语法

express.GetDataRange(Index)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Index 必选 Variant 对象的索引

### 返回值返回值

Object

### 说明说明

目前Index仅支持字符串，代表DataRange对象的键。当输入的Index为数字时，不会有类型检查报错，但是也不会有对象

返回。

DataSource.InitDemoRange

初始化示例数据的行列数

### 语法语法

express.InitDemoRange(rows,cols)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 rows 必选 Number 行数 cols 必选 Number 列数

DataSource.RegisterDataRange

向当前DataSource对象注册DataRange对象。

### 语法语法

express.RegisterDataRange(Key,Value)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Key 必选 String DataRange对象的键

Value 必选 Object DataRange对象

### 返回值返回值

Boolean

DataSource.SetDemoRangeItem

填充示例数据。

### 语法语法

express.SetDemoRangeItem(rowsIdx,colsIdx,value)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 rowsIdx 必选 Number 行数索引 colsIdx 必选 Number 列数索引 value 必选 Variant 要填充的值

DataSource.UnRegisterDataRange

反注册DataRange。

### 语法语法

express.UnRegisterDataRange(Key)

express 一个代表 DataSource 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Key 必选 String DataRange的Key

### 返回值返回值

Boolean

### 成员属性成员属性

DataSource.Type

返回DataSource的类型。只读。

### 语法语法

express.Type

express 一个代表 DataSource 对象的变量。

### 类型类型

Number

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WebShape 对象对象

代表容器应用程序的一个图形，该图形是一个浏览器对象，可以直接渲染Html网页。

### 说明说明

使用AddWebShapeEx(str)可以为当前文档添加一个WebShape 对象，其中对象，其中 str表示需要渲染的网址。下面的示例表示像当前的图形表示需要渲染的网址。下面的示例表示像当前的图形 中添加一个中添加一个 WebShape 对象，渲染对象，渲染 "https://www.wps.cn"。

示例代码示例代码 复制复制

//需要用户至少有一个sheet Application.ActiveWorkbook.Sheets.Item(1).Shapes.AddWebShapeEx("https://www.wps.cn")

### 方法方法

名称名称 说明说明

Copy 复制当前WebShape对象至剪切板。

Cut 剪切当前WebShape对象至剪切板。

Delete 删除当前WebShape对象。

DeleteProperty 删除WebShape对象中对象属性的值。

DeleteWatchingData 删除对应名字的监听区域。（已废除）

GetAllProperty 获取当前WebShape对象的所有属性，返回JSON格式的字符串

GetAllWatchingData 获取所有的监听区域。（已废除）

GetProperty 获取WebShape对象对应键的属性。

GetWatchingData 获取对应的监听区域。（已废除）

SaveAsPicture 将当前WebShape对象保存为图片。

Select 选中当前WebShape对象。

SetImageData 读取图片，并将其展示在WebShape对象上。

SetProperty 设置WebShape属性的键值对。

SetWatchingData 设置监听区域。（已废除）

### 属性属性

名称名称 说明说明

DataSource 返回DataSource对象。只读。

Height 返回或设置WebShape对象的高。可读写。

ID 返回WebShape对象的ID值。只读。

Type 返回WebShape对象的类型。

Url 返回WebShape对象所渲染的网页网址。只读。

Version 返回当前版本。只读。

Visible 返回或设置当前WebShape对象的可见性。可读写。

Width 返回或设置WebShape对象的宽度。

### 成员方法成员方法

WebShape.Copy

复制当前WebShape对象至剪切板。

### 语法语法

express.Copy()

express 一个代表 WebShape 对象的变量。

### 示例示例

示例代码示例代码 复制复制

//以下示例复制Sheet中第一个WebShape并粘贴 function test(){ let webShape = Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape; webShape.Copy(); Application.ActiveWorkbook.ActiveSheet.Paste(); }

WebShape.Cut

剪切当前WebShape对象至剪切板。

### 语法语法

express.Cut()

express 一个代表 WebShape 对象的变量。

### 示例示例

示例代码示例代码 复制复制

//以下示例剪切Sheet中第一个WebShape并粘贴 function test(){ let webShape = Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape; webShape.Cut(); Application.ActiveWorkbook.ActiveSheet.Paste(); }

WebShape.Delete

删除当前WebShape对象。

### 语法语法

express.Delete()

express 一个代表 WebShape 对象的变量。

### 示例示例

示例代码示例代码 复制复制

//以下示例删除Sheet中第一个WebShape function test(){ let webShape = Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape; webShape.Delete(); }

WebShape.DeleteProperty

删除WebShape对象中对象属性的值。

### 语法语法

express.DeleteProperty(Key)

express 一个代表 WebShape 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Key 必选 String 属性的键。

### 示例示例

示例代码示例代码 复制复制

//以下示例删除WebShape中键为wps的属性 function test(){ let webShape = Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape; webShape.DeleteProperty("wps"); }

WebShape.DeleteWatchingData

删除对应名字的监听区域。（已废除）

### 语法语法

express.DeleteWatchingData(Name)

express 一个代表 WebShape 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Name 必选 String 监听区域的名字

WebShape.GetAllProperty

获取当前WebShape对象的所有属性，返回JSON格式的字符串

### 语法语法

express.GetAllProperty()

express 一个代表 WebShape 对象的变量。

### 返回值返回值

String

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.GetAllProperty()

WebShape.GetAllWatchingData

获取所有的监听区域。（已废除）

### 语法语法

express.GetAllWatchingData()

express 一个代表 WebShape 对象的变量。

WebShape.GetProperty

获取WebShape对象对应键的属性。

### 语法语法

express.GetProperty(Key)

express 一个代表 WebShape 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Key 必选 String 属性的键。

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.GetProperty("wps")

WebShape.GetWatchingData

获取对应的监听区域。（已废除）

### 语法语法

express.GetWatchingData()

express 一个代表 WebShape 对象的变量。

WebShape.SaveAsPicture

将当前WebShape对象保存为图片。

### 语法语法

express.SaveAsPicture()

express 一个代表 WebShape 对象的变量。

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.SaveAsPicture()

WebShape.Select

选中当前WebShape对象。

### 语法语法

express.Select()

express 一个代表 WebShape 对象的变量。

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Select()

WebShape.SetImageData

读取图片，并将其展示在WebShape对象上。

### 语法语法

express.SetImageData(Path,X,Y,Width,Height)

express 一个代表 WebShape 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Path 必选 String 图片路径 X 必选 Number 图片展示的横坐标 Y 必选 Number 图片展示的纵坐标 Width 必选 Number 图片展示的宽 Height 必选 Number 图片展示的高

### 示例示例

示例代码示例代码 复制复制

//以下示例将c://tmp.png的图片读取为边长为100的正方形，并显示在WebShape的坐标（100，100）处 Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.SetImageData("c://tmp.png", 100, 100, 100, 100)

WebShape.SetProperty

设置WebShape属性的键值对。

### 语法语法

express.SetProperty(Key,Value)

express 一个代表 WebShape 对象的变量。

### 参数参数

名称名称 必选必选 /可选可选 数据类型数据类型 说明说明 Key 必选 String 属性的键 Value 可选 String 属性的值

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.SetProperty("wps", "wps")

WebShape.SetWatchingData

设置监听区域。（已废除）

### 语法语法

express.SetWatchingData()

express 一个代表 WebShape 对象的变量。

### 成员属性成员属性

WebShape.DataSource

返回DataSource对象。只读。

### 语法语法

express.DataSource

express 一个代表 WebShape 对象的变量。

### 类型类型

Object

WebShape.Height

返回或设置WebShape对象的高。可读写。

### 语法语法

express.Height

express 一个代表 WebShape 对象的变量。

### 类型类型

Number

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Height = 300

WebShape.ID

返回WebShape对象的ID值。只读。

### 语法语法

express.ID

express 一个代表 WebShape 对象的变量。

WebShape.Type

返回WebShape对象的类型。

### 语法语法

express.Type

express 一个代表 WebShape 对象的变量。

### 类型类型

Number

### 说明说明

枚举枚举 值值 WET_Normal 0 WET_DataSource 1

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Type

WebShape.Url

返回WebShape对象所渲染的网页网址。只读。

### 语法语法

express.Url

express 一个代表 WebShape 对象的变量。

### 类型类型

String

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Url

WebShape.Version

返回当前版本。只读。

### 语法语法

express.Version

express 一个代表 WebShape 对象的变量。

### 类型类型

String

WebShape.Visible

返回或设置当前WebShape对象的可见性。可读写。

### 语法语法

express.Visible

express 一个代表 WebShape 对象的变量。

### 类型类型

Boolean

### 说明说明

应注意在jsapi返回时，-1代表真，0代表假。

### 示例示例

示例代码示例代码 复制复制

//以下示例隐藏WebShape对象 function test(){ Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Visible = 0; }

WebShape.Width

返回或设置WebShape对象的宽度。

### 语法语法

express.Width

express 一个代表 WebShape 对象的变量。

### 类型类型

Number

### 示例示例

示例代码示例代码 复制复制

Application.ActiveWorkbook.Sheets.Item(1).Shapes.Item(1).WebShape.Width = 300

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WdContentChangeType 枚举枚举

指定文档变化的类型。

名称名称 值值 说明说明 wdContentInsert 0 文本内容插入。 wdContentDelete 1 文本内容删除。 wdContentStyle 2 文本应用样式变化。 wdContentHeading 3 文本应用标题变化。 wdContentParaProp 4 段落属性变化。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WdWaterMarkType 枚举枚举

指定水印类型。

名称名称 值值 说明说明 wdTextWaterMark 1 文字水印。 wdPictureWaterMark 2 图片水印。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WdDocBarcodeError 枚举枚举

表示插入公文二维码的错误结果提示。

名称名称 值值 说明说明 WdBarcodeNoError 0 成功插入公文二维码。 WdBarcodeFieldFormat 1 插入二维码存在字段格式错误，比如条码编号，日期格式，枚举值错误。 WdBarcodeFieldBytes 2 插入二维码存在字段的字节数不在合法范围内。 WdBarcodeNoDocField 3 插入二维码时该文档没有公文域“条码”。 WdRowsInsufficient 4 固定高度时，给定的高度太小导致无法容纳二维码。 WdRowsExceed 5 固定高度时，指定的行太多，导致二维码高度超出已有限制。 WdColumnsInsufficient 6 固定宽度时，给定的宽度太小导致无法容纳二维码。 WdColumnsExceed 7 固定宽度时，指定的列太多，导致二维码宽度超出已有限制。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# WdDocBarcodeMode 枚举枚举

指定公文二维码宽高模式。

名称名称 值值 说明说明 WdAutoSize 0 由系统自动指定二维码的大小。 WdFixedWidth 1 固定二维码的宽度。 WdFixedHeight 2 固定二维码的高度。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# NativeX扩展对象扩展对象

### 1.背景：背景：

NativeX是提供给第三方开发者用native代码来扩展JS接口的技术方案。JSAPI提供的接口个数有限，当碰 到不满足需求的情况下，第三方开发者可以用native代码(c++/ruby/python等)来扩展JS接口，加载第三方NativeX 模块后，实现在JSAPI中使用自己扩展的接口。例如第三方开发者可以利用发布的SDK，将复杂的算法（如加

密，解密算法）实现并生成dll或者so，提供给NativeX对象加载在JSAPI中使用。

### 2.使用使用SDK生成生成dll

NativeX对象中有三种调用方式Get,Set和Execute，在SDK中注册属性和函数名，指定回调函数，参数个数

和参数类型，示例代码如下。

JSWpsRootObject为根对象，如果想返回NativeX子对象，创建JSWpsSubObject_1类，同样是继承父类Na tiveXObjectBase，在根对象处理返回值时，将NativeX子对象的指针返回即可。

### 3.注册工具注册工具

使用NativeX扩展对象之前，需要使用ksomisc工具将dll路径注册到文件中。

调用ksomisc程序，-regnativex参数设置dll路径，-unregnativex参数反注册，-i参数设置是否为进程内调用。 在%AppData%\kingsoft\wps\jsaddons\binary\目录下生成WPSNativeX.conf文件，WPSNativeX.conf文件中包含 了此dll中是否曾经发生过崩溃信息，dll路径信息，是否进程内调用信息。

### 4.JSAPI中调用中调用Nativex对象：对象：

使用根对象下的CreateObject方法创建NativeX对象，参数为利用SDK生成dll的名字。可以先将使用代码片 段写入到加载项的按钮中，也可以直接在JS调试器中单步调用。NativeX扩展对象支持创建子对象，支持创建多

实例，支持创建多对象。

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 文字文字idMso参考参考

控件名称控件名称 控件类型控件类型 所属所属 Tab 功能描述功能描述 comboBox TabChartTools 图表元素 BorderBottomNoToggle button TabDesign 下框线 BorderTop toggleButton TabDesign 上框线 BorderLeft toggleButton TabDesign 左框线 BorderRight toggleButton TabDesign 右框线 BordersAll button TabDesign 所有框线 BorderOutside button TabDesign 外侧框线 dropDown TabDesign 线型 dropDown TabDesign 粗细 TableEraser toggleButton TabDesign 擦除 TableDrawTable toggleButton TabDesign 绘制表格 TableDrawTable toggleButton TabDesign 绘制表格 GroupMacroPlay group TabDevelopTools 宏 MacroPlay button TabDevelopTools JS宏 MacroRecordOrStop button TabDevelopTools 录制新宏 MacroSecurity button TabDevelopTools 宏安全性 VisualBasic button TabDevelopTools WPS 宏编辑器 GroupAddins group TabDevelopTools 加载项 AddInManager button TabDevelopTools 加载项 ComAddInsDialog button TabDevelopTools COM 加载项 ActiveXCheckBox button TabDevelopTools 复选框 ActiveXTextBox button TabDevelopTools 文本框 ListCommands button TabDevelopTools 命令按钮 ActiveXListBox button TabDevelopTools 列表框 ActiveXComboBox button TabDevelopTools 组合框 ActiveXToggleButton button TabDevelopTools 切换按钮 ActiveXSpinButton button TabDevelopTools 数值调节按钮 ActiveXScrollBar button TabDevelopTools 滚动条 ActiveXLabel button TabDevelopTools 标签 ActiveXImage button TabDevelopTools 图像 MoreControlsDialog button TabDevelopTools 其他控件 GroupControls group TabDevelopTools 控件 DesignMode toggleButton TabDevelopTools 设计模式 ControlProperties button TabDevelopTools 控件属性 ViewVisualBasicCode button TabDevelopTools 查看代码 ContentControlsGroupMenu menu TabDevelopTools 组合 ContentControlsGroup button TabDevelopTools 组合 ContentControlsUngroup button TabDevelopTools 取消组合 ContentControlRichText button TabDevelopTools 格式文本内容控件 ContentControlText button TabDevelopTools 纯文本内容控件 ContentControlPicture button TabDevelopTools 图片内容控件 ContentControlBuildingBlockGallery button TabDevelopTools 构建基块库内容控件

ContentControlCheckBox button TabDevelopTools 复选框内容控件 ContentControlComboBox button TabDevelopTools 组合框内容控件 ContentControlDropDownList button TabDevelopTools 下拉列表内容控件 ContentControlData button TabDevelopTools 日期选取器内容控件 ContentControlRepeating button TabDevelopTools 重复节内容控件 ControlsGalleryClassic gallery TabDevelopTools 旧式工具 XmlStructure button TabDevelopTools 结构 XmlSchema button TabDevelopTools 架构 XmlExpansionPacksWord button TabDevelopTools 扩展包 GroupXmlMappingPane group TabDevelopTools 映射 ToggleXmlMappingPane button TabDevelopTools XML 映射窗格 ObjectEditPoints toggleButton TabDrawingTools 编辑顶点 ObjectFillMoreColorsDialog button TabDrawingTools 其他填充颜色 ArrowsMore button TabDrawingTools 其他箭头 FontColorMoreColorsDialogExcel button TabDrawingTools 其他字体颜色 ShapeStylesGallery gallery TabDrawingTools 形状样式 ShapeFillMoreGradientsDialog button TabDrawingTools 填充 Bold toggleButton TabDrawingTools 加粗 Italic toggleButton TabDrawingTools 倾斜 Underline toggleButton TabDrawingTools 下划线 AlignLeft toggleButton TabDrawingTools 左对齐 AlignCenter toggleButton TabDrawingTools 居中对齐 AlignRight toggleButton TabDrawingTools 右对齐 AlignJustify toggleButton TabDrawingTools 两端对齐 TextWrappingInLineWithText toggleButton TabDrawingTools 嵌入型 TextWrappingSquare toggleButton TabDrawingTools 四周型环绕 TextWrappingTight toggleButton TabDrawingTools 紧密型环绕 TextWrappingBehindText toggleButton TabDrawingTools 衬于文字下方 TextWrappingInFrontOfText toggleButton TabDrawingTools 浮于文字上方 TextWrappingTopAndBottom toggleButton TabDrawingTools 上下型环绕 TextWrappingThrough toggleButton TabDrawingTools 穿越型环绕 ObjectBringToFront button TabDrawingTools 置于顶层 ObjectBringForward button TabDrawingTools 上移一层 ObjectSendToBack TabDrawingTools 置于底层 ObjectSendBehindText button TabDrawingTools 衬于文字下方 ObjectsAlignLeft button TabDrawingTools 左对齐 AlignDistributeHorizontally button TabDrawingTools 横向分布 AlignDistributeVertically button TabDrawingTools 纵向分布 ViewGridlinesWord checkBox TabDrawingTools 网格线 AlignJustifyMenu TabDrawingTools 对齐 ObjectRotateLeft90 button TabDrawingTools 向左旋转 90° editBox TabDrawingTools 大小 editBox TabDrawingTools FontColorPicker gallery TabDrawingTools 文本颜色 comboBox TabDrawingTools 字体名 ObjectFillMoreColorsDialog TabDrawingTools_Vml 其他填充颜色 ArrowsMore TabDrawingTools_Vml 其他箭头

ArrowsMore TabDrawingTools_Vml 其他箭头 ObjectBringToFront button TabDrawingTools_Vml 置于顶层 ObjectSendBehindText TabDrawingTools_Vml 衬于文字下方 AlignDistributeHorizontally button TabDrawingTools_Vml 横向分布 AlignDistributeVertically button TabDrawingTools_Vml 纵向分布 AlignJustifyMenu TabDrawingTools_Vml 对齐 Font comboBox TabDrawingTools_Vml 字体名 editBox TabDrawingTools_Vml 高度 editBox TabDrawingTools_Vml 宽度 EquationOptions TabEquationTools 公式选项 EquationInsertGallery TabEquationTools 公式 EquationProfessional TabEquationTools 专业型 EquationLinearFormat TabEquationTools 线性 EquationNormalText TabEquationTools 普通文本 EquationSymbolsInsertGallery TabEquationTools 公式符号 EquationFractionGallery TabEquationTools 分数 EquationScriptGallery TabEquationTools 上下标 EquationRadicalGallery TabEquationTools 根式 EquationIntegralGallery TabEquationTools 积分 EquationLargeOperatorGallery TabEquationTools 大型运算符 EquationDelimiterGallery TabEquationTools 括号 EquationFunctionGallery TabEquationTools 函数 EquationAccentGallery TabEquationTools 导数符号 EquationLimitGallery TabEquationTools 极限和对数 EquationOperatorGallery TabEquationTools 运算符 EquationMatrixGallery TabEquationTools 矩阵 FileSaveAsPicture TabFile 输出为图片 FileNewMenu menu TabFile 新建 FileNew button TabFile 新建 FileNewFromTemplate button TabFile 本机上的模板 FileNewFromDefaultTemplate button TabFile 从默认模板新建 FilePrintMenu splitButton TabFile 打印 FilePrint button TabFile 打印 FilePrintPreview button TabFile 打印预览 splitButton TabFile button TabFile button TabFile FileInfoMenu TabFile 文档加密 FileProperties button TabFile 属性 splitButton TabFile 备份与恢复 splitButton TabFile 备份与恢复 FileBackupManagement menu TabFile 备份管理 FileBackupManagement button TabFile 备份管理 FileBackupHistory button TabFile 历史版本 FileHelp menu TabFile 帮助 Help button TabFile WPS 文字 帮助 About button TabFile 关于 WPS 文字

FileSave button TabFile 保存 FileOpen button TabFile 打开 FileSaveAsMenu menu None 另存为 FileSaveAsPdfOrXps button None 输出为PDF FileOfdPrintMenu button None 输出为OFD FileSaveAsPicture button None 输出为图片 DocumentSplitAndMerge None 文档拆分合并 FileShare button TabFile 分享文档 FileMenuSendMail button TabFile 发送邮件 ApplicationOptionsDialog TabFile 选项 ObjectFillMoreColorsDialog button TabGraphicTool 其他填充颜色 FontColorMoreColorsDialogExcel button TabGraphicTool 其他字体颜色 ShapeStylesGallery gallery TabGraphicTool 图形样式 ShapeFillMoreGradientsDialog button TabGraphicTool 图形填充 Bold toggleButton TabGraphicTool 加粗 Italic toggleButton TabGraphicTool 倾斜 Underline toggleButton TabGraphicTool 下划线 AlignLeft toggleButton TabGraphicTool 左对齐 AlignCenter toggleButton TabGraphicTool 居中 AlignRight toggleButton TabGraphicTool 右对齐 AlignJustify toggleButton TabGraphicTool 两端对齐 TextWrappingInLineWithText toggleButton TabGraphicTool 嵌入型 TextWrappingSquare toggleButton TabGraphicTool 四周型环绕 TextWrappingTight toggleButton TabGraphicTool 紧密型环绕 TextWrappingBehindText toggleButton TabGraphicTool 衬于文字下方 TextWrappingInFrontOfText toggleButton TabGraphicTool 浮于文字上方 TextWrappingTopAndBottom toggleButton TabGraphicTool 上下型环绕 TextWrappingThrough toggleButton TabGraphicTool 穿越型环绕 ObjectBringToFront button TabGraphicTool 置于顶层 ObjectBringForward button TabGraphicTool 上移一层 ObjectSendToBackMenu TabGraphicTool 置于底层 ObjectSendBehindText button TabGraphicTool 衬于文字下方 ObjectsAlignLeft button TabGraphicTool 左对齐 AlignDistributeHorizontally button TabGraphicTool 横向分布 AlignDistributeVertically button TabGraphicTool 纵向分布 ViewGridlinesWord checkBox TabGraphicTool 网格线 AlignJustifyMenu TabGraphicTool 对齐 ObjectRotateLeft90 button TabGraphicTool 向左旋转 90° button None 重设形状和大小 editBox TabGraphicTool 高度 editBox TabGraphicTool 宽度 FontColorPicker gallery TabGraphicTool 文本颜色 comboBox TabGraphicTool 字体名 gallery TabHeaderFooter 配套组合 gallery TabHeaderFooter 页眉 gallery TabHeaderFooter 页脚 DateAndTimeInsert button TabHeaderFooter 日期和时间

PictureInsertFromFile button TabHeaderFooter 本地图片 FieldInsert button TabHeaderFooter 域 HeaderFooterInsert button TabHeaderFooter 插入 HeaderFooterPositionHeaderFromTop editBox TabHeaderFooter 页眉顶端距离 HeaderFooterPositionFooterFromBottom editBox TabHeaderFooter 页脚底端距离 PasteKeepSourceFormat button TabHome 保留源格式 PasteMatchCurrentFormat button TabHome 匹配当前格式 PasteSetDefault button TabHome 设置默认粘贴 PasteMenu splitButton TabHome 粘贴 PasteTextOnly None 只粘贴文本 PasteSpecialDialog button None 选择性粘贴 Cut button TabHome 剪切 Copy button TabHome 复制 ShowClipboard button TabHome 剪贴板 FormatPainter toggleButton None 格式刷 Bold toggleButton TabHome 加粗 Italic toggleButton TabHome 倾斜 UnderlineGallery gallery TabHome 下划线 UnderlineMoreUnderlinesDialog button TabHome 其他下划线 UnderlineColorGallery gallery TabHome 下划线颜色 UnderlineColorMoreColorsDialog button TabHome 其他下划线颜色 UnderlineGallery toggleButton TabHome 下划线 Strikethrough toggleButton TabHome 删除线 EmphasisMark toggleButton TabHome 着重号 Superscript toggleButton TabHome 上标 Subscript toggleButton TabHome 下标 TextEffectsGallery gallery TabHome 文本效果 WordArtInsertGallery gallery TabHome 艺术字 TextEffectShadowGallery gallery TabHome 阴影 TextReflectionGallery gallery TabHome 倒影 TextEffectGlowGallery gallery TabHome 发光 TextEffectThreeDRotationGallery gallery TabHome 三维旋转 TextEffectTransformGallery gallery TabHome 转换 ClearFormatting button TabHome 清除格式 CharacterShading toggleButton TabHome 字符底纹 ChangeCaseGallery gallery TabHome 更改大小写 CharacterBorder toggleButton TabHome 字符边框 AsianLayoutPhoneticGuide button TabHome 拼音指南 Font comboBox TabHome 字体 comboBox TabHome 字体 StrikethroughAndEmphasisMark splitButton TabHome 删除线 ChangeCaseGallery gallery TabHome 更改大小写 AsianLayoutCharactersEnclose button TabHome 带圈字符 AlignLeft toggleButton TabHome 左对齐 AlignCenter toggleButton TabHome 居中对齐 AlignRight toggleButton TabHome 右对齐 AlignJustify toggleButton TabHome 两端对齐

AlignJustify toggleButton TabHome 两端对齐 ParagraphDistributed toggleButton TabHome 分散对齐 GroupFont group TabHome 字体 FontSize comboBox None 字号 FontSizeIncreaseWord button None 增大字体 FontSizeDecreaseWord button None 减小字体 TextHighlightColorPicker gallery None 突出显示 FontColorPicker gallery None 文本颜色 menu TabHome 横纵向字号 comboBox None 横向字号 comboBox None 纵向字号 gallery None 加粗 Bullets toggleButton TabHome 项目符号 Bullets toggleButton TabHome 项目符号 BulletsGalleryWord gallery TabHome 项目符号 BulletDefineNew button TabHome 自定义项目符号 NumberingGalleryWord gallery TabHome 编号 DefineNewNumberFormat button TabHome 自定义编号 ListLevelGallery gallery TabHome 更改编号级别 IndentDecreaseWord button TabHome 减少缩进量 TextDirectionLeftToRight button TabHome 从左向右 TextDirectionRightToLeft button TabHome 从右向左 ParagraphDistributed toggleButton TabHome LineSpacingMoreLineSpacingDialog button TabHome 其他 LineSpacingGallery gallery TabHome 行距 FillColorsMoreFillColorsDialog button TabHome 其他填充颜色 ShadingColorPicker gallery TabHome 底纹颜色 BorderBottomNoToggle button TabHome 下框线 BorderTopWord button TabHome 上框线 BorderLeftWord button TabHome 左框线 BorderRightWord button TabHome 右框线 BorderNone button TabHome 无框线 BordersAll button TabHome 所有框线 BorderOutside button TabHome 外侧框线 BorderInside button TabHome 内部框线 BorderInsideHorizontal button TabHome 内部横框线 BorderInsideVertical button TabHome 内部竖框线 BordersShadingDialogWord button TabHome 边框和底纹 TableBordersMenu splitButton TabHome 外侧框线 splitButton TabHome 边框 EastAsianEditingMarks menu TabHome 显示/隐藏编辑标记 EastAsianParagraphMarks toggleButton TabHome 显示/隐藏段落标记 EastAsianParagraphDistributed toggleButton TabHome 显示/隐藏段落布局按钮 Tabs button TabHome 制表位 menu TabHome 工具 GroupParagraph group TabHome IndentIncreaseWord button None 增加缩进量 GroupParagraph group TabHome 段落

GroupParagraph group TabHome 段落 QuickStylesGallery gallery TabHome 样式 QuickStylesSaveSelectionAsNew button TabHome 新建样式 ClearFormatting button TabHome 清除格式 button TabHome 显示更多样式 QuickStylesSaveClearSelection splitButton TabHome 新建样式 GroupStyles group TabHome 样式 FindDialog button TabHome 查找 ReplaceDialog button TabHome 替换 GoTo button TabHome 定位 FindAndReplaceDialog button TabHome 查找替换 ObjectsSelect toggleButton TabHome 选择对象 SelectTableWithDashedBorders toggleButton TabHome 虚框选择表格 SelectionPane button TabHome 选择窗格 SelectMenu menu TabHome 选择 SelectAll button TabHome 全选 GroupEditing group TabHome 编辑 WordTools menu TabHome 文字排版 GroupParagraphTools group TabHome 工具 FontDialog button TabHome 字体 ParagraphDialog button TabHome 段落 StylesPane button TabHome 样式和格式 InkBallpointPen button TabInkTools 圆珠笔 InkWatercolorPen button TabInkTools 水彩笔 InkHighlighterPen button TabInkTools 荧光笔 InkDrawPen splitButton TabInkTools 笔 InkShowLine button TabInkTools 直线 InkShowWave button TabInkTools 波浪线 InkShowRect button TabInkTools 矩形 InkDrawShape splitButton TabInkTools 形状 InkEraser button TabInkTools 橡皮擦 gallery TabInkTools 墨迹样式 InkColor menu TabInkTools 颜色 InkLineStyle gallery TabInkTools 线型 ExitInkDraw button TabInkTools 关闭 toggleButton TabInkTools_mac 笔 toggleButton TabInkTools_mac 类型 gallery TabInkTools_mac 墨迹样式 PageBreakInsertWord button TabInsert 分页符 TextWrappingBreakInsertWord button TabInsert 换行符 NextPageSectionBreakInsertWord button TabInsert 下一页分节符 ContinuousSectionBreakInsertWord button TabInsert 连续分节符 EvenPageSectionBreakInsertWord button TabInsert 偶数页分节符 OddPageSectionBreakInsertWord button TabInsert 奇数页分节符 PageBreakGallery gallery TabInsert 分页 ColumnBreakInsertWord button TabInsert 分栏符 DeletePageNumInsertWord button TabInsert 删除页码

BlankPageVertical button TabInsert 竖向 BlankPageHorizontal button TabInsert 横向 BlankPageInsertGallery gallery TabInsert 空白页 TableInsertDialogWord TabInsert 插入表格 TableDrawTable toggleButton TabInsert 绘制表格 ConvertTextToTable button TabInsert 文本转换成表格 ConvertTableToText button TabInsert 表格转换成文本 TableInsertGallery gallery TabInsert 表格 TableInsertGallery gallery TabInsert 表格 TableInsertGallery gallery TabInsert 表格 GroupInsertTables group TabInsert 表格 PictureInsertGallery gallery TabInsert 图片 PictureInsertFromFile button TabInsert 来自文件 PictureToText button TabInsert 图片转文字 PictureInsertFromFile button TabInsert 图片 DocumentBarcode button TabInsert 公文二维条码 BarcodeInsert splitButton TabInsert 条形码 ClipArtInsert toggleButton TabInsert 剪贴画 ShapesInsertGallery gallery TabInsert 形状 ShapesInsertGallery gallery TabInsert 形状 InsertCanvas button TabInsert 新建绘图画布 ChartInsert button TabInsert 图表 TextMulti-line toggleButton TabInsert 多行文字 TextBoxDrawMenu menu TabInsert 文本框 TextBoxInsertHorizontalWord button TabInsert 横向 TextBoxInsertVerticalWord button TabInsert 竖向 WordArtInsertGallery gallery TabInsert 艺术字 DropCapOptionsDialog button TabInsert 首字下沉 OleObjectInsertMenu splitButton TabInsert 对象 TextFromFileInsert button TabInsert 文件中的文字 OleObjectInsertMenu splitButton TabInsert 对象 ReviewNewComment button None 批注 HeaderFooterGallery gallery TabInsert 页眉页脚 PageNumber button TabInsert 页码 HeaderFooterPageNumberInsertGallery gallery TabInsert 页码 PageNumberFormatGallery gallery TabInsert 页码 GroupHeaderFooter group TabInsert 页眉页脚 WatermarkGallery gallery TabInsert 水印 WatermarkInsert button TabInsert 插入水印 WatermarkRemove button TabInsert 删除文档中的水印 GroupInsertLinks group TabInsert 链接 HyperlinkInsert button TabInsert 超链接 CrossReferenceInsert button TabInsert 交叉引用 BookmarkInsert button TabInsert 书签 HyperlinkInsert button TabInsert 超链接 CoverPageInsertGallery gallery TabInsert 封面页 CoverPageInsertGallery gallery TabInsert 封面页

GroupInsertTables group TabInsert 表格 SmartArtInsert button TabInsert 智能图形 DateAndTimeInsert button TabInsert 日期 QuickPartsInsertGallery gallery TabInsert 文档部件 AutoTextGallery gallery TabInsert 自动图文集 PageX button TabInsert 第 X 页 TotalofYPage button TabInsert 共 Y 页 PageXofY button TabInsert 第 X 页 共 Y 页 SaveSelectionToAutoTextGallery button TabInsert 将所选内容保存到自动图文集库 FieldInsert button TabInsert 域 DocumentFieldInsert button TabInsert 公文域 GroupInsertSymbols group TabInsert 符号 SymbolInsertGallery gallery None 符号 EquationInsertGallery TabInsert 公式 EquationInsertNew TabInsert 插入新公式 NumberInsert button TabInsert 数字 FieldText button TabInsert 文字型窗体域 FieldCheckBox button TabInsert 复选框型窗体域 FieldDrop-Down button TabInsert 下拉型窗体域 FieldOptions button TabInsert 属性 FieldShading toggleButton TabInsert 窗体域底纹 FieldsReset button TabInsert 重置窗体域 FieldsProtect toggleButton TabInsert 保护窗体 CoverPageInsertGallery gallery TabInsert_Vml 封面页 TableInsertDialogWord TabInsert_Vml 插入表格 TableDrawTable toggleButton TabInsert_Vml 绘制表格 ConvertTextToTable button TabInsert_Vml 文本转换成表格 TableInsertGallery gallery TabInsert_Vml 表格 TableInsertGallery gallery TabInsert_Vml 表格 PictureInsertFromFile button TabInsert_Vml 来自文件 ShapesInsertGallery gallery TabInsert_Vml 形状 ShapesInsertGallery gallery TabInsert_Vml 形状 InsertCanvas button TabInsert_Vml 新建绘图画布 ChartInsert button TabInsert_Vml 图表 TextBoxDrawMenu menu TabInsert_Vml 文本框 DropCapOptionsDialog button TabInsert_Vml 首字下沉 OleObjectInsertMenu splitButton TabInsert_Vml 对象 ReviewNewComment button None 批注 PageNumber button TabInsert_Vml 页码 WatermarkGallery gallery TabInsert_Vml 水印 HyperlinkInsert button TabInsert_Vml 超链接 CrossReferenceInsert button TabInsert_Vml 交叉引用 BookmarkInsert button TabInsert_Vml 书签 SymbolInsertGallery gallery TabInsert_Vml 符号 SymbolInsertGallery gallery TabInsert_Vml 符号 FieldShading toggleButton TabInsert_Vml 窗体域底纹 InsertScreenGrab None 截图取字

InsertScreenGrab None 截图取字 DateAndTimeInsert button TabInsert_Vml 日期 QuickPartsInsertGallery gallery TabInsert_Vml 文档部件 AutoTextGallery gallery TabInsert_Vml 自动图文集 SaveSelectionToAutoTextGallery button TabInsert_Vml 将所选内容保存到自动图文集库 FieldInsert button TabInsert_Vml 域 DocumentFieldInsert button TabInsert_Vml 公文域 EquationInsertGallery TabInsert_Vml 公式 EquationInsertNew TabInsert_Vml 插入新公式 CoverPageInsertGallery gallery TabInsert_Vml 封面页 MailMergeFindRecipient button TabMailings 收件人 MessagePrevious button TabMailings 上一条 button TabMailings MailMergeGoToRecord editBox TabMailings 跳转记录 MessageNext button TabMailings 下一条 button TabMailings MailMergeMergeToPrinter button TabMailings 合并到打印机 button TabMailings 合并发送 button TabOfficial_Elements 页码 gallery TabOfficial_Elements 水印 toggleButton TabOfficial_Elements 绘制表格 button TabOfficial_Elements 文本转换成表格 gallery TabOfficial_Elements 表格 PictureInsertFromFile button TabOfficial_Elements 本地图片 gallery TabOfficial_Elements 符号 gallery TabOfficial_Elements 符号 button TabOfficial_Elements 图表 menu TabOfficial_Elements 文本框 gallery TabOfficial_Elements 形状 gallery TabOfficial_Elements 形状 button TabOfficial_Elements 新建绘图画布 button TabOfficial_Elements 公文域 button TabOfficial_Elements 超链接 button TabOfficial_Elements 书签 button TabOfficial_Print 打印 dropDown TabOutline 大纲级别 dropDown TabOutline 大纲级别 dropDown TabOutline 大纲级别 dropDown TabOutline 显示级别 OutlineViewClose button TabOutline 关闭 GroupThemeEdit group TabPageLayout 编辑主题 ThemeSearchOfficeOnline button TabPageLayout 主题 ThemesGallery gallery TabPageLayout 主题 ThemeFontsMenu menu TabPageLayout 字体 ThemeEffectsSearchOfficeOnline button TabPageLayout 效果 ThemeEffectsGallery gallery TabPageLayout 效果 TextDirectionGalleryWord gallery TabPageLayout 文字方向

TextDirectionOptionsDialog button TabPageLayout 文字方向选项 PageMarginsGallery gallery TabPageLayout 页边距 MarginsCustomMargins button TabPageLayout 自定义页边距 PageOrientationGallery gallery TabPageLayout 纸张方向 PageSizeGallery gallery TabPageLayout 纸张大小 PageSizeMorePaperSizesDialog button TabPageLayout 其它页面大小 ColumnsOne button TabPageLayout 一栏 ColumnsTwo button TabPageLayout 两栏 ColumnsThree button TabPageLayout 三栏 ColumnsDialog button TabPageLayout 更多分栏 TableColumnsGallery gallery TabPageLayout 分栏 BreakPage button TabPageLayout 分页符 BreakTextWrapping button TabPageLayout 换行符 BreakNextPageSection button TabPageLayout 下一页分节符 BreakContinuousSection button TabPageLayout 连续分节符 BreakEvenPageSection button TabPageLayout 偶数页分节符 BreakOddPageSection button TabPageLayout 奇数页分节符 BreaksMenu menu TabPageLayout 分隔符 BreakColumn button TabPageLayout 分栏符 LineNumbersOff toggleButton TabPageLayout 无 LineNumbersContinuous toggleButton TabPageLayout 连续 LineNumbersResetPage toggleButton TabPageLayout 每页重编行号 LineNumbersResetSection toggleButton TabPageLayout 每节重编行号 LineNumbersSuppress toggleButton TabPageLayout 禁止用于当前段落 LineNumbersDoNotShowLineNumbeforBlank toggleButton TabPageLayout 空行不显示行号 LineNumbersOptionsDialog toggleButton TabPageLayout 行编号选项 LineNumbersMenu menu TabPageLayout 行号 GroupPageLayoutSetup group TabPageLayout 页面设置 PageColorMoreColorsDialog button TabPageLayout 其他填充颜色 PageColorPicker gallery TabPageLayout 取色器 PageColorGallery gallery TabPageLayout 背景 BackgroundPicture button TabPageLayout 图片背景 BackgroundMoreBackgroundDialog button TabPageLayout 其他背景 Gradient button TabPageLayout 渐变 Texture button TabPageLayout 纹理 Pattern button TabPageLayout 图案 WatermarkGallery gallery TabPageLayout 水印 WatermarkCustomDialog button TabPageLayout 插入水印 WatermarkRemove button TabPageLayout 删除文档中的水印 PageBorderAndShadingDialog button TabPageLayout 页面边框 GroupPageBackground group TabPageLayout 页面背景 GenkoSettingDialog button TabPageLayout 稿纸设置 GroupGenkoSetting group TabPageLayout 稿纸设置 TextWrappingInLineWithText toggleButton TabPageLayout 嵌入型 TextWrappingSquare toggleButton TabPageLayout 四周型环绕 TextWrappingTight toggleButton TabPageLayout 紧密型环绕 TextWrappingBehindText toggleButton TabPageLayout 衬于文字下方

TextWrappingInFrontOfText toggleButton TabPageLayout 浮于文字上方 TextWrappingTopAndBottom toggleButton TabPageLayout 上下型环绕 TextWrappingThrough toggleButton TabPageLayout 穿越型环绕 TextWrappingMenu menu TabPageLayout 文字环绕 ObjectBringForwardMenu splitButton TabPageLayout 上移一层 ObjectBringToFront button TabPageLayout 置于顶层 ObjectBringInFrontOfText button TabPageLayout 浮于文字上方 ObjectBringForward button TabPageLayout 上移一层 ObjectSendBackwardMenu splitButton TabPageLayout 下移一层 ObjectSendToBack button TabPageLayout 置于底层 ObjectSendBehindText button TabPageLayout 衬于文字下方 ObjectSendBackward button TabPageLayout 下移一层 SelectionPane toggleButton TabPageLayout 选择窗格 ObjectsAlignLeft button TabPageLayout 左对齐 ObjectsAlignCenterHorizontalSmart button TabPageLayout 水平居中 ObjectsAlignRightSmart button TabPageLayout 右对齐 ObjectsAlignTopSmart button TabPageLayout 顶端对齐 ObjectsAlignMiddleVerticalSmart button TabPageLayout 垂直居中 ObjectsAlignBottomSmart button TabPageLayout 底端对齐 AlignDistributeHorizontally button TabPageLayout 横向分布 AlignDistributeVertically button TabPageLayout 纵向分布 EqualHeight button TabPageLayout 等高 EqualWidth button TabPageLayout 等宽 EqualSize button TabPageLayout 等尺寸 ObjectsAlignRelativeToContainerSmart toggleButton TabPageLayout 相对于页 ViewGridlinesWord checkBox TabPageLayout 网格线 GridSettings button TabPageLayout 绘图网格 AlignJustifyMenu toggleButton TabPageLayout 对齐 ObjectsGroup button TabPageLayout 组合 ObjectsUngroup button TabPageLayout 取消组合 ObjectsGroupMenu menu TabPageLayout 组合 ObjectsGroupMenu menu TabPageLayout 组合 ObjectRotateFree button TabPageLayout 自由旋转 ObjectRotateLeft90 button TabPageLayout 向左旋转 90° ObjectRotateRight90 button TabPageLayout 向右旋转 90° FlipHorizontal button TabPageLayout 水平翻转 FlipVertical button TabPageLayout 垂直翻转 GroupArrange group TabPageLayout 排列 ObjectRotateMenu menu TabPageLayout 旋转 GroupParagraphLayout group TabPageLayout 段落 PageSetupDialog button None 页面设置 dropDown TabParagraph 目录级别 editBox TabParagraph 行距 StylesPane button TabParagraph 样式和格式 ParagraphDialog button TabParagraph 段落 PageSetupDialog button None 页面设置 Bullets toggleButton TabParagraph 项目符号

Bullets toggleButton TabParagraph 项目符号 FontSize comboBox TabParagraph 字号 FontColorMoreColorsDialogExcel button TabParagraph 其他字体颜色 FontColorPicker gallery TabParagraph 字体颜色 Bold toggleButton TabParagraph 加粗 Underline toggleButton TabParagraph 下划线 AlignLeft toggleButton TabParagraph 左对齐 AlignCenter toggleButton TabParagraph 居中对齐 AlignRight toggleButton TabParagraph 右对齐 FontSizeIncreaseWord button None 增大字体 FontSizeDecreaseWord button None 减小字体 comboBox TabParagraph 字体名 PictureInsertFromFile button TabPictureTools 本地图片 GroupPictureTools group TabPictureTools 插入 SnapToGrid toggleButton TabPictureTools 增加亮度 ObjectFillMoreColorsDialog button TabPictureTools 其他填充颜色 GradientGallery gallery TabPictureTools 渐变 MoreTextureOptions button TabPictureTools 图片或纹理 ObjectBringToFront button TabPictureTools 置于顶层 ObjectSendToBack TabPictureTools 置于底层 ObjectSendBehindText button TabPictureTools 衬于文字下方 AlignDistributeHorizontally button TabPictureTools 横向分布 AlignDistributeVertically button TabPictureTools 纵向分布 ObjectsRegroup button TabPictureTools 组合 ObjectsUnGroup button TabPictureTools 取消组合 ObjectRotateLeft90 button TabPictureTools 向左旋转 90° FontSizeIncrease button TabPictureTools 略向左移 FontSizeDecrease button TabPictureTools 略向右移 TextWrappingInLineWithText toggleButton TabPictureTools 嵌入型 TextWrappingSquare toggleButton TabPictureTools 四周型环绕 TextWrappingTight toggleButton TabPictureTools 紧密型环绕 TextWrappingBehindText toggleButton TabPictureTools 衬于文字下方 TextWrappingInFrontOfText toggleButton TabPictureTools 浮于文字上方 TextWrappingTopAndBottom toggleButton TabPictureTools 上下型环绕 TextWrappingThrough toggleButton TabPictureTools 穿越型环绕 button None 重设形状和大小 editBox TabPictureTools editBox TabPictureTools ObjectFillMoreColorsDialog TabPictureTools_Vml 其他填充颜色 ObjectBringToFront button TabPictureTools_Vml 置于顶层 ObjectSendBehindText TabPictureTools_Vml 衬于文字下方 AlignDistributeHorizontally button TabPictureTools_Vml 横向分布 AlignDistributeVertically button TabPictureTools_Vml 纵向分布 editBox TabPictureTools_Vml 高度 editBox TabPictureTools_Vml 宽度 FilePrint button None 打印 FilePrintQuick button None 直接打印 comboBox TabPrintPreview 打印机

comboBox TabPrintPreview 打印机 comboBox TabPrintPreview 纸张类型 PageOrientationGallery gallery TabPrintPreview 纸张方向 PageMarginsGallery gallery TabPrintPreview 页边距 comboBox TabPrintPreview 方式 TableOfContentsDialog button TabReferences 插入目录 TOCLevelGallery splitButton TabReferences 目录级别 TOCLevel1 button TabReferences 1 级目录 TOCLevel2 button TabReferences 2 级目录 TOCLevel3 button TabReferences 3 级目录 TOCLevel4 button TabReferences 4 级目录 TOCLevel5 button TabReferences 5 级目录 TOCLevel6 button TabReferences 6 级目录 TOCLevel7 button TabReferences 7 级目录 TOCLevel8 button TabReferences 8 级目录 TOCLevel9 button TabReferences 9 级目录 TOCBodyText button TabReferences 普通文本 TableOfContentsGallery gallery TabReferences 目录 TableOfContentsCustom button TabReferences 自定义目录 TableOfContentsRemove button TabReferences 删除目录 GroupTableOfContents group TabReferences 目录 TableOfContentsUpdateClassic button None 更新目录 GroupFootnotesAndEndnotes group TabReferences 脚注和尾注 FootnoteInsert button TabReferences 插入脚注 FootnotePreviousWord button TabReferences 上一条脚注 FootnoteNextWord button TabReferences 下一条脚注 EndnoteInsertWord button TabReferences 插入尾注 EndnotePreviousWord button TabReferences 上一条尾注 EndnoteNextWord button TabReferences 下一条尾注 FootnoteEndnote Separator toggleButton TabReferences 脚注/尾注分隔线 CaptionInsert button TabReferences 题注 TableOfFiguresInsert button TabReferences 插入表目录 CrossReferenceInsert button TabReferences 交叉引用 GroupCaptions group TabReferences 题注 GroupMailMerge group TabReferences 邮件合并 ShowMailingsContext toggleButton TabReferences 邮件 IndexMarkEntry button TabReferences 标记索引项 IndexInsert button TabReferences 插入索引 IndexUpdate button TabReferences 更新索引 GroupIndex group TabReferences 索引 SpellingMenu splitButton TabReview 拼写检查 SpellingAndGrammar button None 拼写检查 WordCount button TabReview 字数统计 GroupProofing group TabReview 校对 OpenThesaurus button None 同义词库 GroupChineseTranslation group TabReview 中文简繁转换 TranslateToSimplifiedChinese button TabReview 繁转简

TranslateToTraditionalChinese button TabReview 简转繁 ReviewHandwritingComment button TabReview 手写批注 ReviewDeleteCommentsMenu splitButton TabReview 删除 ReviewDeleteComment splitButton TabReview 删除批注 ReviewDeleteAllCommentsInDocument button TabReview 删除文档中的所有批注 GroupComments group TabReview 批注 ReviewNewComment button None 插入批注 ReviewPreviousComment button TabReview 上一条 ReviewNextComment button TabReview 下一条 ReviewTrackChangesMenu splitButton TabReview 修订 ReviewTrackChanges toggleButton None 修订 ReviewChangeTrackingOptions button TabReview 修订选项... ReviewChangeUserName button TabReview 更改用户名... ReviewShowAllReviewers checkBox TabReview 所有审阅人 ReviewShowReviewersMenu menu TabReview 显示标记 ReviewShowComments toggleButton TabReview 批注 ReviewShowInsertionsAndDeletions toggleButton TabReview 插入和删除 ReviewShowFormatting toggleButton TabReview 格式设置 ReviewShowReviewersMenu menu TabReview 审阅人 ReviewBalloonsMenu menu TabReview 使用批注框 ReviewShowRevisionsInBalloons toggleButton TabReview 在批注框中显示修订内容 ReviewShowRevisionsInline toggleButton TabReview 以嵌入方式显示所有修订 ReviewShowRevisorInformationInBalloons toggleButton TabReview 在批注框中显示修订者信息 ReviewShowRevisor toggleButton TabReview 显示审阅者 ReviewShowRevisorImage toggleButton TabReview 显示审阅者头像 ReviewShowDate toggleButton TabReview 显示日期 ReviewShowTime toggleButton TabReview 显示时间 ReviewShowCommentShading toggleButton TabReview 显示批注底纹 ReviewAcceptAllChangesInDocument button TabReview 接受对文档所做的所有修订 ReviewAcceptChangeMenu splitButton TabReview 接受 ReviewAcceptChange button TabReview 接受修订 ReviewAcceptAllFormatChanges button TabReview 接受所有的格式修订 ReviewAcceptAllChangesShown TabReview 接受所有显示的修订 ReviewRejectAllChangesInDocument button TabReview 拒绝对文档所做的所有修订 ReviewRejectChangeMenu splitButton TabReview 拒绝 ReviewRejectChange button TabReview 拒绝所选修订 ReviewRejectAllFormatChanges button TabReview 拒绝所有的格式修订 ReviewRejectAllChangesShown TabReview 拒绝所有显示的修订 ReviewMenu splitButton TabReview 审阅 ReviewShowReviewersMenu splitButton TabReview 审阅人 ReviewShowReviewers button TabReview 审阅人 ReviewShowReviewTimeMenu splitButton TabReview 审阅时间 ReviewShowReviewTime button TabReview 审阅时间 ReviewReviewingPaneMenu splitButton TabReview 审阅窗格 ReviewReviewingPaneVertical toggleButton TabReview 垂直审阅窗格 ReviewReviewingPaneHorizontal toggleButton TabReview 水平审阅窗格 GroupChangesTracking group TabReview 修订

ReviewDisplayForReview dropDown TabReview 显示以审阅 ReviewTrackChangesMenu splitButton TabReview 修订 ReviewPreviousChange button TabReview 上一条 ReviewNextChange button TabReview 下一条 checkBox TabReview 标尺 checkBox TabReview 网格线 button TabReview 单页 button TabReview 多页 ReviewCompareMenu menu TabReview 比较 ReviewCompareTwoVersions button TabReview 比较 ReviewShowSourceDocumentsMenu gallery TabReview 显示源文档 ReviewHideSourceDocumentsMenu gallery TabReview 隐藏源文档 ReviewShowSourceDocumentsOriginal button TabReview 显示原始文档 ReviewShowSourceDocumentsRevised button TabReview 显示修订的文档 ReviewShowSourceDocumentsBoth button TabReview 显示原始及修订的文档 GroupCompare group TabReview 比较 ReviewRestrictFormatting button TabReview 限制编辑 ReviewRestrictFormatting toggleButton TabReview 文档安全 PageOrientationGallery gallery TabSection 纸张方向 NextPageSectionBreak button TabSection 下一页分节符 ContinuousSectionBreak button TabSection 连续分节符 EvenPageSectionBreak button TabSection 偶数页分节符 OddPageSectionBreak button TabSection 奇数页分节符 HeaderAndFooter button TabSection 页眉页脚 GoToPreviousSection button TabSection 上一节 GoToNextSection button TabSection 下一节 GroupCoverAndTOC group TabSection 封面/目录 CoverPageInsertGallery gallery TabSection 封面页 CoverPageInsertGallery gallery TabSection 封面页 TableOfContentsGallery gallery TabSection 目录页 TableOfContentsDialog button TabSection 自定义目录 TableOfContentsRemove button TabSection 删除目录 PageNumber toggleButton TabSection 页码 NavigationPaneShowHide splitButton TabSection 导航窗格 NavigationPaneFind button TabSection 章节导航 GroupPageSetupDialog group TabSection 页面设置 PageMarginsGallery gallery TabSection 页边距 MarginsCustomMargins button TabSection 自定义页边距 PageSizeGallery gallery TabSection 纸张大小 PageSizeMorePaperSizesDialog button TabSection 其他页面大小 SectionBreakInsert button TabSection 新增节 SectionDelete button TabSection 删除本节 GroupHeaderFooterPageNumberInsert group TabSection 页码 PageNumbers button TabSection 页码 PageNumbersRemove button TabSection 删除页码 HeaderFooterDifferentFirstPageWord checkBox TabSection 首页不同 button TabSection 奇偶页不同

button TabSection 奇偶页不同 GroupHeaderFooter group TabSection 页眉页脚 HeaderLinkToPrevious checkBox TabSection 页眉同前节 FooterLinkToPrevious checkBox TabSection 页脚同前节 PageSetupDialog button None 页面设置 ReviewRestrictFormatting button TabSecurity 限制编辑 ObjectBringToFront button TabSmartArtDesign 置于顶层 ObjectBringForward button TabSmartArtDesign 上移一层 ObjectSendToBack TabSmartArtDesign 置于底层 ObjectSendBehindText button TabSmartArtDesign 浮于文字下方 TextWrappingInLineWithText toggleButton TabSmartArtDesign 嵌入型 TextWrappingSquare toggleButton TabSmartArtDesign 四周型环绕 TextWrappingTight toggleButton TabSmartArtDesign 紧密型环绕 TextWrappingBehindText toggleButton TabSmartArtDesign 浮于文字下方 TextWrappingInFrontOfText toggleButton TabSmartArtDesign 浮于文字上方 TextWrappingTopAndBottom toggleButton TabSmartArtDesign 上下型环绕 TextWrappingThrough toggleButton TabSmartArtDesign 穿越型环绕 ObjectsAlignLeft button TabSmartArtDesign 居左对齐 AlignDistributeHorizontally button TabSmartArtDesign 横向分布 AlignDistributeVertically button TabSmartArtDesign 纵向分布 ViewGridlinesWord checkBox TabSmartArtDesign 网络线 editBox TabSmartArtDesign 高度 editBox TabSmartArtDesign 宽度 comboBox TabSmartArtFormatTool 字号 Bullets toggleButton TabSmartArtFormatTool 项目符号 ObjectFillMoreColorsDialog TabSmartArtFormatTool 其他填充颜色 Bold TabSmartArtFormatTool 加粗 Underline toggleButton TabSmartArtFormatTool 下划线 AlignDistributeHorizontally button TabSmartArtFormatTool 横向分布 AlignDistributeVertically button TabSmartArtFormatTool 纵向分布 AlignJustifyMenu TabSmartArtFormatTool 对齐 ClearFormatting button TabSmartArtFormatTool 清除格式 Superscript toggleButton None 上标 Subscript toggleButton None 下标 ShapeStylesGallery gallery TabSmartArtFormatTool 形状风格 FontColorPicker gallery TabStudentTools FontColorMoreColorsDialogExcel button None 其他字体颜色 PictureInsertFromFile button TabStudentTools SpellingMenu splitButton TabStudentTools SpellingAndGrammar button None 拼写检查 ShapesInsertGallery gallery TabStudentTools ShapesInsertGallery gallery TabStudentTools InsertCanvas button TabStudentTools ReviewTrackChangesMenu splitButton TabStudentTools ReviewTrackChanges toggleButton None 修订 WordCount button TabStudentTools toggleButton None 阅读版式

TextBoxDrawMenu menu TabStudentTools OpenThesaurus button None 同义词库 InsertScreenGrab None 截图取字 EquationInsertGallery None 公式 SymbolInsertGallery gallery None 符号 TableShowGridlines toggleButton TabTableTools 显示虚框 TableDrawTable toggleButton TabTableTools 绘制表格 TableEraser toggleButton TabTableTools 擦除 CellsDelete button TabTableTools 单元格 SplitCells button TabTableTools 拆分单元格 TableRowsDistribute button TabTableTools 平均分布各行 TableColumnsDistribute button TabTableTools 平均分布各列 TablePropertiesDialog button TabTableTools 表格属性 menu TabTableTools 选择 FontColorMoreColorsDialogExcel button TabTableTools 其他字体颜色 FontColorPicker gallery TabTableTools 字体颜色 Bold button TabTableTools 加粗 Underline toggleButton TabTableTools 下划线 comboBox TabTableTools 字体名 gallery None 加粗 comboBox TabTextTool 字号 ObjectFillMoreColorsDialog TabTextTool 其他填充颜色 Bold TabTextTool 加粗 AlignDistributeHorizontally button TabTextTool 横向分布 AlignDistributeVertically button TabTextTool 纵向分布 AlignJustifyMenu TabTextTool 对齐 ClearFormatting button TabTextTool 清除格式 FormatPainter toggleButton None 格式刷 comboBox TabTextTool 字体名 gallery None 加粗 Superscript toggleButton None 上标 Subscript toggleButton None 下标 FontColorPicker gallery None 文本颜色 Bullets toggleButton TabTextTool 项目符号 ShapeStylesGallery gallery TabTextTool 形状样式 ShapeFillMoreGradientsDialog button TabTextTool 形状填充 ViewPrintLayoutView toggleButton TabView 页面 ViewFullScreenView button TabView 全屏显示 ViewOutlineView toggleButton TabView 大纲 ViewOutlineView toggleButton TabView Web版式 ViewFullScreenReadingView toggleButton TabView 阅读版式 toggleButton TabView 公文版式 GroupDocumentViews group TabView 文档视图 ViewFullScreenView button TabView 全屏显示 ViewPrintLayoutView toggleButton TabView 页面 ProtectEyes toggleButton TabView 护眼模式 NavigationPanePlaceOnLeft toggleButton TabView 靠左

NavigationPanePlaceOnRight toggleButton TabView 靠右 NavigationPaneInvisible toggleButton TabView 隐藏 NavigationPaneShowHide splitButton TabView 导航窗格 GroupViewShowHide group TabView 显示 ViewRulerWord checkBox TabView 标尺 ViewMarkup checkBox TabView 标记 ViewGridlinesWord checkBox TabView 网格线 ViewTaskWindow checkBox TabView 任务窗格 ViewTableGridlines checkBox TabView 表格虚框 ZoomDialog button TabView 显示比例 ZoomCurrent100 button TabView 100% GroupZoom group TabView 显示比例 ZoomPageWidth button TabView 页宽 ZoomOnePage button TabView 单页 ZoomTwoPages button TabView 多页 WindowNew button TabView 新建窗口 WindowSideBySideSynchronousScrolling toggleButton TabView 同步滚动 WindowResetPosition toggleButton TabView 重设位置 WindowSideBySide toggleButton TabView 并排比较 GroupWindow group TabView 窗口 WindowsArrangeAll splitButton TabView 重排窗口 WindowsHorizontal toggleButton TabView 水平平铺 WindowsVertical toggleButton TabView 垂直平铺 WindowsCascade toggleButton TabView 层叠 MenuMacros toggleButton TabView JS 宏 PlayMacro button TabView JS 宏 MacroSecurity button TabView 宏安全性 VisualBasic button TabView WPS 宏编辑器 GroupMacros group TabView 宏 WordArtSpacingVeryTight toggleButton TabWordArt 很紧 WordArtSpacingTight toggleButton TabWordArt 紧密 WordArtSpacingNormal toggleButton TabWordArt 常规 WordArtSpacingLoose toggleButton TabWordArt 稀疏 WordArtSpacingVeryLoose toggleButton TabWordArt 很松 GlowColorMoreColorsDialog button TabWordArt 其他填充颜色 TextWrappingInLineWithText toggleButton TabWordArt 嵌入型 TextWrappingSquare toggleButton TabWordArt 四周型环绕 TextWrappingTight toggleButton TabWordArt 紧密型环绕 TextWrappingBehindText toggleButton TabWordArt 衬于文字下方 TextWrappingInFrontOfText toggleButton TabWordArt 浮于文字上方 TextWrappingTopAndBottom toggleButton TabWordArt 上下型环绕 TextWrappingThrough toggleButton TabWordArt 穿越型环绕 ObjectBringToFront button TabWordArt 置于顶层 ObjectSendToBack TabWordArt 置于底层 ObjectSendBehindText button TabWordArt 衬于文字下方 AlignDistributeHorizontally button TabWordArt 横向分布 AlignDistributeVertically button TabWordArt 纵向分布

AlignDistributeVertically button TabWordArt 纵向分布 ViewGridlinesWord checkBox TabWordArt 网格线 AlignJustifyMenu TabWordArt 对齐 ObjectRotateLeft90 button TabWordArt 向左旋转 90° FileSaveAsPicture TabWorkSpace 输出为图片 ReviewRestrictFormatting button TabWorkSpace 限制编辑 FileSaveAsPdfOrXps button TabWorkSpace 输出为PDF FileSaveAsPdfOrXps button TabWorkSpace 输出为PDF FileSaveAsPicture TabWorkSpace 输出为图片 SwitchFace None 皮肤 TabbarQAndA None FileMenu None ReviewNewComment button None 插入批注 ReviewTrackChanges toggleButton None 修订 AsianLayoutTwoLinesInOne button None 双行合一 FitText button None 调整宽度 TabHome tab None 开始 TabInsert tab None 插入 tab None 要素 TabPageLayoutWord tab None 页面布局 TabReferences tab None 引用 TabMailings tab None 邮件 TabReviewWord tab None 审阅 TabView tab None 视图 TabSection tab None 章节 tab None 文印 TabOfdPrintPreview tab None 预览OFD效果 TabAddIns tab None 加载项 TabSecurity tab None 安全 TabDeveloper tab None 开发工具 TabWorkSpace tab None 云服务 TabPrintPreview tab None 打印预览 GroupParagraph group None 段落布局 TabTableToolsLayout tab None 表格工具 TabStudentToolsLayout tab None TabTableToolsDesign tab None 表格样式 TabOutlining tab None 大纲 TabHeaderAndFooterToolsDesign tab None 页眉页脚 TabPictureToolsFormat tab None 图片工具 TabWordArtToolsFormat tab None 艺术字 tab None 签批工具 FileSaveAsPdfOrXps button None 输出为PDF QAT_Menu None 快速访问工具栏 FileNewBlankDocument button None 新建 FileOpen button None 打开 FileSave button None 保存 FilePrint button None 打印 FilePrintPreview button None 打印

FilePrintPreview button None 打印 FilePrintQuick button None 直接打印 FilePrintPreview button None 打印预览 Undo button None 撤消 Redo button None 恢复 FormatPainter toggleButton None 格式刷 FontSizeIncreaseWord button None 增大字体 FontColorMoreColorsDialogExcel button None 其他字体颜色 FontColorPicker gallery None 文本颜色 FontSize comboBox None 字号 comboBox None 横向字号 comboBox None 纵向字号 FontSizeDecreaseWord button None 减小字体 FileMenuSendMail None 发送邮件 FileFind button None 查找 ReplaceDialog None 替换 ReviewNewComment button None 批注 ContextMenuText contextMenu None 文本 ContextMenuHyperlink contextMenu None 超链接上下文菜单 ContextMenuComment contextMenu None 备注 ContextMenuList contextMenu None 编号上下文菜单 ContextMenuRevision contextMenu None 修订上下文菜单 ContextMenuSpell contextMenu None 拼写检查建议上下文菜单 contextMenu None 文本 contextMenu None 编号上下文菜单 SaveSelectionToAutoTextGallery button None 创建"自动图文集" PicturesCompress button None 压缩图片 VisualBasic button None WPS 宏编辑器 MacroPlay button None JS 宏 FieldCodes toggleButton None 查看域代码 Subscript toggleButton None 下标 SelectAll button None 全选 toggleButton None 阅读版式 ViewFullScreenView button None 全屏显示 Bold toggleButton None 加粗 Copy button None 复制 FontDialog button None 字体 AlignCenter toggleButton None 居中对齐 PageBreakInsertWord button None 分页符 FindDialogExcel button None 查找 GoTo button None 定位 ReplaceDialog button None 替换 Italic toggleButton None 倾斜 AlignJustify toggleButton None 两端对齐 HyperlinkInsert button None 超链接 AlignLeft toggleButton None 左对齐 FileNewBlankDocument button None 新建

FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileCloseOrCloseAll button None 关闭 PageSetupDialog button None 页面设置 Properties button None 属性 PasteSpecialDialog button None 选择性粘贴 PasteTextOnly None 只粘贴文本 ClearContents button None 内容 AlignRight toggleButton None 右对齐 FileSave button None 保存 FontSizeDecrease button None 减小字体 FontSizeIncrease button None 增大字体 Superscript toggleButton None 上标 ReviewTrackChanges toggleButton None 修订 WordCount button None 字数统计 button None 从左向右文字方向 button None 从右向左文字方向 UnderlineGallery gallery None 下划线 gallery None 加粗 Paste button None 粘贴 Cut button None 剪切 Undo button None 撤消 Help button None WPS 文字 帮助 FileSaveAs button None 另存为 SpellingAndGrammar button None 拼写检查 CharacterFormattingReset button None 重设字符格式 OpenThesaurus button None 同义词库 IndentDecreaseWord button None 减少缩进量 IndentIncreaseWord button None 增加缩进量 FileOfdPrintPreview button None 预览OFD效果 FitText button None 调整宽度 ApplicationExit button None 退出 FileNewFromTemplate button None 从更多模板新建 FileNew button None 新建 TaskPaneRestrict button None 限制编辑 InsertScreenGrab None 截图取字 TableOfContentsUpdateClassic button None 更新目录 FileSaveAsMenu menu None 另存为 button None WPS 公文 (*.wps) button None WPS 公文模板 (*.wpt) FileSaveAsWps button None WPS 文字 文件（*.wps） FileSaveAsWpt button None WPS 文字 模板文件（*.wpt） WPS 文字 2007/2010 文件 FileSaveAsWpsx button None （*.wpsx） FileSaveAsDoc button None Word 97-2003 文件（*.doc） FileSaveAsDot button None Word 97-2003 模板文件（*.dot）

FileSaveAsWordDocx button None Word 文件（*.docx） FileSaveAsOtherFormats button None 其他格式 FileOfdPrintMenu button None 输出为OFD FileSaveAsOfd button None 输出为OFD FileOfdPrintPreview button None 预览OFD效果 FileSaveAsPdfOrXps button None 输出为PDF FileSaveAsPicture button None 输出为图片 MergeCells button None 合并单元格 NumberingRestart button None 重新开始编号 button None 查找 SymbolInsertGallery gallery None 符号 SymbolInsertGallery gallery None 符号 SymbolsDialog button None 其他符号 EquationInsertGallery None 公式 EquationInsertNew None 插入新公式 button None 重设形状和大小 DocumentSplit None 文档拆分 DocumentMerge None 文档合并 DocumentSplitAndMerge None 文档拆分合并 ReviewPreviousComment button None ReviewNextComment button None Strikethrough toggleButton None 删除线 Heading1 None Heading2 None Heading3 None EndnoteInsertWord button None FileSaveAsPicture None (Context Menu) 输出为图片 FileCloseAll button None (Context Menu) 关闭所有文档 FileCloseAll button None (Context Menu) 关闭所有文档 FileCloseAll button None (Context Menu) 关闭所有文档 SaveAll button None (Context Menu) 保存所有文档 FileSaveAsPdfOrXps button None (Context Menu) 输出为PDF格式 SaveAsOFD button None (Context Menu) 输出为OFD格式 FileMenuSendMail button None (Context Menu) 发送邮件 SaveAll button None (Context Menu) 保存所有文档 SaveAll button None (Context Menu) 保存所有文档 FileConvert button None (Context Menu) 转换 FileEncrypt button None (Context Menu) 文件加密 ClearFormats button None (Context Menu) 格式 ViewPrintLayoutView toggleButton None (Context Menu) 页面 GroupHeaderFooter group None (Context Menu) 页眉页脚 ViewFullScreenView button None (Context Menu) 全屏显示 DateAndTimeInsert button None (Context Menu) 日期和时间 AutoTextGallery gallery None (Context Menu) 自动图文集 PageX button None (Context Menu) 第 X 页 TotalofYPage button None (Context Menu) 共 Y 页 PageXofY button None (Context Menu) 第 X 页 共 Y 页

SaveSelectionToAutoTextGallery button None (Context Menu) 将所选内容保存到自动图文集库 FieldInsert button None (Context Menu) 域 ReviewNewComment button None (Context Menu) 批注 FootnoteEndnoteDialog button None (Context Menu) 脚注和尾注 CaptionInsert button None (Context Menu) 题注 CrossReferenceInsert button None (Context Menu) 交叉引用 IndexInsert button None (Context Menu) 目录 PictureInsertFromFile button None (Context Menu) 来自文件 InsertCanvas button None (Context Menu) 插入画布 ClipArtInsert toggleButton None (Context Menu) 剪贴画 EquationInsertGallery None (Context Menu) 公式 DropCapOptionsDialog button None (Context Menu) 首字下沉 TextDirectionOptionsDialog button None (Context Menu) 文字方向 button None (Context Menu) 更改大小写 AsianLayoutPhoneticGuide button None (Context Menu) 拼音指南 ReviewRestrictFormatting button None (Context Menu) 限制编辑 MacroSecurity splitButton None (Context Menu) 安全性 AddInManager button None (Context Menu) 加载项 ComAddInsDialog button None (Context Menu) COM 加载项 FileBackupManagement None (Context Menu) 备份管理 ApplicationOptionsDialog None (Context Menu) 选项 TableDrawTable toggleButton None (Context Menu) 绘制表格 TableRowsInsertAboveExcel button None (Context Menu) 在上方插入行 TableRowsInsertBelowExcel button None (Context Menu) 在下方插入行 InsertCellstMenu splitButton None (Context Menu) 单元格 CellsDelete button None (Context Menu) 单元格 TableSelect button None (Context Menu) 表格 SplitCells button None (Context Menu) 拆分单元格 TableAutoFitWindow button None (Context Menu) 根据窗口调整表格 TableAutoFitContent button None (Context Menu) 根据内容调整表格 TableToolTransposeTable button None (Context Menu) 行列互换 TableRowsDistribute button None (Context Menu) 平均分布各行 TableColumnsDistribute button None (Context Menu) 平均分布各列 TableInsertMultidiagonalCell button None (Context Menu) 绘制斜线表头 TableShowGridlines toggleButton None (Context Menu) 显示虚框 button None (Context Menu) 文本转换成表格 ConvertTableToText button None (Context Menu) 表格转换成文本 TablePropertiesDialog button None (Context Menu) 表格属性 WindowNew button None (Context Menu) 新建窗口 BlogHomePage button None (Context Menu) WPS官方网站 About button None (Context Menu) 关于 WPS 文字 PasteTextOnly None (Context Menu) 只粘贴文本 PasteTextOnly None (Context Menu) 只粘贴文本 ReviewDeleteCommentsMenu splitButton None (Context Menu) 删除批注 EditField button None (Context Menu) 编辑域 GoToFootnote button None (Context Menu) 定位至脚注 CellFillColorPicker button None (Context Menu) 单元格对齐方式

CellFillColorPicker button None (Context Menu) 单元格对齐方式 GoToEndnote button None (Context Menu) 定位至尾注 HangingIndent button None (Context Menu) 悬挂缩进 Cancel button None (Context Menu) 取消 ReviewAcceptChange button None (Context Menu) 接受修订 ReviewAcceptChange button None (Context Menu) 拒绝修订 ReviewAcceptChange button None (Context Menu) 接受插入 ReviewRejectChange button None (Context Menu) 拒绝插入 ReviewAcceptChange button None (Context Menu) 接受删除 ReviewRejectChange button None (Context Menu) 拒绝删除 ReviewAcceptChange button None (Context Menu) 接受格式更改 ReviewRejectChange button None (Context Menu) 拒绝格式更改 ReviewAcceptChange button None (Context Menu) 接受格式更改 ReviewRejectChange button None (Context Menu) 拒绝格式更改 ReviewAcceptChange button None (Context Menu) 接受格式更改 ReviewRejectChange button None (Context Menu) 拒绝格式更改 ReviewAcceptChange button None (Context Menu) 接受格式更改 ReviewRejectChange button None (Context Menu) 拒绝格式更改 ReviewAcceptChange button None (Context Menu) 接受修订 ReviewRejectChange button None (Context Menu) 拒绝修订 ObjectsUnGroup button None (Context Menu) 取消组合 ObjectBringToFront button None (Context Menu) 置于顶层 ObjectSendToBack button None (Context Menu) 置于底层 ObjectBringForward button None (Context Menu) 上移一层 ObjectSendBackward button None (Context Menu) 下移一层 ObjectSendBehindText button None (Context Menu) 衬于文字下方 ObjectEditPoints toggleButton None (Context Menu) 编辑顶点 ShapeStraightConnector toggleButton None (Context Menu) 直线连接符 ShapeElbowConnector toggleButton None (Context Menu) 肘形连接符 ControlProperties button None (Context Menu) 属性 ViewVisualBasicCode button None (Context Menu) 查看代码 MacroRecord button None (Context Menu) 录制新宏 RealTimeBackupStatus None (Context Menu) 实时备份 TextWrappingMenu menu None (Context Menu) 文字环绕 Copy button None (Context Menu) 复制 Cut button None (Context Menu) 剪切 PasteTextOnly None (Context Menu) 只粘贴文本 ApplicationOptionsDialog None (Context Menu) 设置默认粘贴 PasteSpecialDialog button None (Context Menu) 选择性粘贴 PasteMenu splitButton None (Context Menu) 粘贴 AlignLeft toggleButton None (Context Menu) 左对齐 AlignCenter toggleButton None (Context Menu) 居中 AlignRight toggleButton None (Context Menu) 右对齐 AlignJustify toggleButton None (Context Menu) 两端对齐 AlignCenter toggleButton None (Context Menu) 居中 Font comboBox None (Context Menu) 字体名 Font comboBox None (Context Menu) 字体名 comboBox None (Context Menu) 字体名

comboBox None (Context Menu) 字体名 button None (Context Menu) 横向字号 button None (Context Menu) 纵向字号 button None (Context Menu) 粘贴 button None (Context Menu) 粘贴 button None (Context Menu) 索引 button None (Context Menu) 减少缩进量 button None (Context Menu) 增加缩进量 ObjectBringToFrontMenu splitButton None (Context Menu) 置于顶层 ObjectSendToBackMenu splitButton None (Context Menu) 置于底层 LineNumbersMenu menu None (Context Menu) 行号 menu None (Context Menu) 文本框 ObjectsUnGroup button None (Context Menu) 取消组合 FontSizeIncreaseWord button None (Context Menu) 增大字体 FontSizeDecreaseWord button None (Context Menu) 縮小字型

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 表格表格idMso参考参考

控件名称控件名称 控件类型控件类型 所属所属 Tab 功能描述功能描述 comboBox TabChartTools 图表元素 PivotClearFilters button TabData 全部显示 SortClear button TabData 全部显示 FilterReapply button TabData 重新应用 AdvancedFilterDialog toggleButton TabData 高级 SortAscendingExcel button TabData SortDescendingExcel button TabData AutoFilterClassic button TabData 自动筛选 FillDown button None 向下填充 FillRight button None 右对齐 InputNumericSequence button TabData 录入123序列 InputLetterSequence button TabData 录入ABC序列 InputRomanNumericSequence button TabData 录入罗马数字序列 FillBlankCells button TabData 空白单元格填充 DataValidation splitButton TabData 数据有效性 DataValidation toggleButton TabData 数据有效性 DataValidationCircle toggleButton TabData 圈释无效数据 DataValidationCircleClear toggleButton TabData 清除验证标识圈 button TabData 插入下拉列表 Consolidate button TabData 合并计算 OutlineUngroupMenu splitButton TabData 取消组合 OutlineUngroup None 取消组合 OutlineSubtotals button TabData 分类汇总 OutlineShowDetail button TabData 展开明细 OutlineHideDetail button TabData 折叠明细 OutlineGroup None 组合 RefreshAll button TabData 全部刷新 button TabData 导入文本 RefreshAllMenu splitButton TabData 全部刷新 Refresh button None 刷新数据 ClearMenu menu TabDesign 清除表格样式 MacroPlay button TabDevelopTools JS宏 MacroRecord button TabDevelopTools 录制新宏 MacroRelativeReferences toggleButton TabDevelopTools 使用相对引用 MacroSecurity button TabDevelopTools 宏安全性 VisualBasic button TabDevelopTools WPS 宏编辑器 ComAddInsDialog button TabDevelopTools COM 加载项 DesignMode toggleButton TabDevelopTools 设计模式 ControlProperties button TabDevelopTools 控件属性 ViewCode button TabDevelopTools 查看代码 ActiveXCheckBox button TabDevelopTools 复选框 ActiveXTextBox button TabDevelopTools 文本框

ActiveXButton button TabDevelopTools 命令按钮 ActiveXListBox button TabDevelopTools 列表框 ActiveXComboBox button TabDevelopTools 组合框 ActiveXToggleButton button TabDevelopTools 切换按钮 ActiveXSpinButton button TabDevelopTools 数值调节按钮 ActiveXScrollBar button TabDevelopTools 滚动条 ActiveXLabel button TabDevelopTools 标签 ActiveXImage button TabDevelopTools 图像 MoreControlsDialog button TabDevelopTools 其他控件 button TabDevelopTools 命令按钮 button TabDevelopTools 复选框 button TabDevelopTools 列表框 button TabDevelopTools 组合框 button TabDevelopTools 文本框 button TabDevelopTools 标签 button TabDevelopTools 切换按钮 button TabDevelopTools 滚动条 button TabDevelopTools 数值调节按钮 TextBoxInsertHorizontal toggleButton TabDrawingTools 横向文本框 TextBoxInsertVertical toggleButton TabDrawingTools 竖向文本框 ObjectEditPoints toggleButton TabDrawingTools 编辑顶点 ObjectPictureFill button TabDrawingTools 图片 OutlineLinePatternFill button TabDrawingTools 带图案线条 LineStylesDialog button TabDrawingTools 其他线条 ArrowStyleGallery gallery TabDrawingTools 箭头样式 ArrowsMore button TabDrawingTools 其他箭头 ShapeStylesGallery gallery TabDrawingTools 形状样式 ShapeFillColorPicker gallery TabDrawingTools 填充 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 ShapeOutlineColorPicker gallery TabDrawingTools 轮廓 ObjectBringForward button TabDrawingTools 上移一层 ObjectBringToFront button TabDrawingTools 置于顶层 ObjectSendBackward button TabDrawingTools 下移一层 ObjectSendToBack button TabDrawingTools 置于底层 ObjectsAlignLeft button TabDrawingTools 左对齐 ObjectsAlignCenterHorizontal button TabDrawingTools 水平居中 ObjectsAlignRight button TabDrawingTools 右对齐 ObjectsAlignTop button TabDrawingTools 顶端对齐 ObjectsAlignMiddleVertical button TabDrawingTools 垂直居中 ObjectsAlignBottom button TabDrawingTools 底端对齐 AlignDistributeHorizontally button TabDrawingTools 横向分布 AlignDistributeVertically button TabDrawingTools 纵向分布 SnapToGrid toggleButton TabDrawingTools 对齐网格 ObjectsGroup button TabDrawingTools 组合 ObjectsUngroup button TabDrawingTools 取消组合 ObjectRotateFree button TabDrawingTools 自由旋转

ObjectRotateFree button TabDrawingTools 自由旋转 ObjectRotateLeft90 button TabDrawingTools 向左旋转 90° ObjectRotateRight90 button TabDrawingTools 向右旋转 90° ObjectFlipHorizontal button TabDrawingTools 水平翻转 ObjectFlipVertical button TabDrawingTools 垂直翻转 SelectionPane toggleButton TabDrawingTools 选择窗格 editBox TabDrawingTools 大小 editBox TabDrawingTools ObjectFormatDialog button TabDrawingTools 设置对象格式 ObjectEditPoints toggleButton TabDrawingTools_Vml 编辑顶点 ObjectPictureFill button TabDrawingTools_Vml 图片 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 LineStylesDialog button TabDrawingTools_Vml 其他线条 ArrowStyleGallery gallery TabDrawingTools_Vml 箭头样式 ArrowsMore button TabDrawingTools_Vml 其他箭头 ObjectsAlignLeft button TabDrawingTools_Vml 左对齐 ObjectsAlignCenterHorizontal button TabDrawingTools_Vml 水平居中 ObjectsAlignRight button TabDrawingTools_Vml 右对齐 ObjectsAlignTop button TabDrawingTools_Vml 顶端对齐 ObjectsAlignMiddleVertical button TabDrawingTools_Vml 垂直居中 ObjectsAlignBottom button TabDrawingTools_Vml 底端对齐 SnapToGrid toggleButton TabDrawingTools_Vml 对齐网格 ObjectsGroup button TabDrawingTools_Vml 组合 ObjectsUngroup button TabDrawingTools_Vml 取消组合 ObjectRotateFree button TabDrawingTools_Vml 自由旋转 ObjectRotateLeft90 button TabDrawingTools_Vml 向左旋转 90° ObjectRotateRight90 button TabDrawingTools_Vml 向右旋转 90° ObjectFlipHorizontal button TabDrawingTools_Vml 水平翻转 ObjectFlipVertical button TabDrawingTools_Vml 垂直翻转 comboBox TabDrawingTools_Vml 字体 ClearContents button None 内容 editBox TabDrawingTools_Vml 高度: editBox TabDrawingTools_Vml 宽度: EquationOptions TabEquationTools 公式选项 EquationInsertGallery TabEquationTools 公式 EquationProfessional TabEquationTools 专业型 EquationLinearFormat TabEquationTools 线性 EquationNormalText TabEquationTools 普通文本 EquationSymbolsInsertGallery TabEquationTools 公式符号 EquationFractionGallery TabEquationTools 分数 EquationScriptGallery TabEquationTools 上下标 EquationRadicalGallery TabEquationTools 根式 EquationIntegralGallery TabEquationTools 积分 EquationLargeOperatorGallery TabEquationTools 大型运算符 EquationDelimiterGallery TabEquationTools 括号 EquationFunctionGallery TabEquationTools 函数

EquationAccentGallery TabEquationTools 导数符号 EquationLimitGallery TabEquationTools 极限和对数 EquationOperatorGallery TabEquationTools 运算符 EquationMatrixGallery TabEquationTools 矩阵 InputNumericSequence button TabEtToolbox 录入123序列 InputLetterSequence button TabEtToolbox 录入ABC序列 InputRomanNumericSequence button TabEtToolbox 录入罗马数字序列 FillBlankCells button TabEtToolbox 空白单元格填充 NumAsText button TabEtToolbox 数字转为文本型数字 TextAsNum button TabEtToolbox 文本型数字转为数字 KeepNumberical button TabEtToolbox 仅保留数值 FormulaText button TabEtToolbox 公式转文本 Round button TabEtToolbox 四舍五入 InsertDiagonalHeader button TabEtToolbox 插入斜线表头 BatchAdd button TabEtToolbox 加上 BatchSub button TabEtToolbox 减去 BatchMul button TabEtToolbox 乘以 BatchDiv button TabEtToolbox 除以 DeleteBlankTable button TabEtToolbox 删除空白表 RemoveBlankRow button TabEtToolbox 删除空行 RemoveLeadingSpace button TabEtToolbox 删除开头空格 RemoveTrailingSpace button TabEtToolbox 删除末尾空格 RemoveAllSpace button TabEtToolbox 删除所有空格 FileSaveAsPicture TabFile 输出为图片 FileNewMenu menu TabFile 新建 FileNewDefault button TabFile 新建 NewBlankXlsxFile button TabFile 新建 Excel 2007/2010 文件 FileNew TabFile 本机上的模板 NewFromDefaultTemplate button TabFile 从默认模板新建 FilePrintMenu splitButton TabFile 打印 FilePrint button TabFile 打印 FilePrintPreview button TabFile 打印预览 splitButton TabFile button TabFile button TabFile splitButton TabFile 备份与恢复 splitButton TabFile 备份与恢复 FileInfoMenu menu TabFile 文档加密 FileMenuFileEncrypt TabFile 文件加密 FileProperties button TabFile 属性 FileBackupManagement button TabFile 备份管理 FileBackupManagement button TabFile 备份管理 FileBackupHistory button TabFile 历史版本 FileHelp menu TabFile 帮助 Help button TabFile WPS 表格 帮助 About button TabFile 关于 WPS 表格 FileSave button TabFile 保存

FileOpen button TabFile 打开 FileSave button TabFile 保存 FileSaveAsMenu menu None 另存为 FileSaveAsPdfOrXps button None 输出为PDF FileSlimming None 文件瘦身 DocumentSplitAndMerge menu None 文档拆分合并 FileShare button TabFile 分享 FileMenuSendMail button TabFile 发送邮件 ApplicationOptionsDialog TabFile 选项 AutoSum button TabFormulas 求和 AutoSumAverage button TabFormulas 平均值 AutoSumCount button TabFormulas 计数 AutoSumMax button TabFormulas 最大值 AutoSumMin button TabFormulas 最小值 AutoSumMoreFunctions button TabFormulas 其他函数 AutoSumMenu menu TabFormulas 自动求和 FunctionWizard button TabFormulas 插入函数 FormulaMoreFunctionsMenu menu TabFormulas 其他函数 NameManager button TabFormulas 名称管理器 NameDefine button TabFormulas 定义名称 NamePasteName button TabFormulas 粘贴 NameCreateFromSelection button TabFormulas 指定 NameDefineMenu menu TabFormulas 定义名称 FormulaEvaluate button TabFormulas 公式求值 TracePrecedents button TabFormulas 追踪引用单元格 TraceDependents button TabFormulas 追踪从属单元格 TraceRemoveAllArrows button TabFormulas 移去箭头 button TabFormulas 移去引用单元格追踪箭头 button TabFormulas 移去从属单元格追踪箭头 splitButton TabFormulas 移去箭头 splitButton TabFormulas 移去箭头 ErrorCheckingMenu splitButton TabFormulas ShowFormulas button None 显示公式 CalculateSheet button TabFormulas 计算工作表 EditLinks button TabFormulas 编辑链接 Connections group TabFormulas 连接 ObjectPictureFill button TabGraphicTool 图片 OutlineLinePatternFill button TabGraphicTool 带图案线条 LineStylesDialog button TabGraphicTool 其他线条 ShapeStylesGallery gallery TabGraphicTool 图形样式 ShapeFillColorPicker gallery TabGraphicTool 图形填充 GradientGallery gallery None 渐变 ShapeOutlineColorPicker gallery TabGraphicTool 图形轮廓 ObjectBringForward button TabGraphicTool 上移一层 ObjectBringToFront button TabGraphicTool 置于顶层 ObjectSendBackward button TabGraphicTool 下移一层 ObjectSendToBack button TabGraphicTool 置于底层

ObjectSendToBack button TabGraphicTool 置于底层 ObjectsAlignLeft button TabGraphicTool 左对齐 ObjectsAlignCenterHorizontal button TabGraphicTool 水平居中 ObjectsAlignRight button TabGraphicTool 右对齐 ObjectsAlignTop button TabGraphicTool 顶端对齐 ObjectsAlignMiddleVertical button TabGraphicTool 垂直居中 ObjectsAlignBottom button TabGraphicTool 底端对齐 AlignDistributeHorizontally button TabGraphicTool 横向分布 AlignDistributeVertically button TabGraphicTool 纵向分布 SnapToGrid toggleButton TabGraphicTool 对齐网格 ObjectsGroup button TabGraphicTool 组合 ObjectsUngroup button TabGraphicTool 取消组合 ObjectRotateFree button TabGraphicTool 自由旋转 ObjectRotateLeft90 button TabGraphicTool 向左旋转 90° ObjectRotateRight90 button TabGraphicTool 向右旋转 90° ObjectFlipHorizontal button TabGraphicTool 水平翻转 ObjectFlipVertical button TabGraphicTool 垂直翻转 SelectionPane toggleButton TabGraphicTool 选择窗格 button None 重设形状和大小 editBox TabGraphicTool 高度: editBox TabGraphicTool 宽度: ObjectFormatDialog button TabGraphicTool 设置对象格式 PasteAsPicture button TabHome 粘贴为图片 PasteFormatting button TabHome 带格式粘贴 button TabHome 粘贴值到可见单元格 PasteMenu splitButton TabHome 粘贴 PasteAllUsingSourceTheme button TabHome 保留源格式 PasteValues button TabHome 值 PasteFormulas button TabHome 公式 PasteNoBorders button TabHome 无边框 PasteTranspose button TabHome 转置 PasteSpecialDialog button None 选择性粘贴 Cut button TabHome 剪切 Copy button TabHome 复制 CopyPictureDialog TabHome 复制为图片 ShowClipboard button TabHome 剪贴板 FormatPainter toggleButton None 格式刷 Font comboBox TabHome 字体 FontSize comboBox TabHome 字号 FontSizeIncrease button TabHome 增大字号 FontSizeDecrease button TabHome 减小字号 Bold toggleButton TabHome 加粗 Italic toggleButton TabHome 倾斜 Underline toggleButton TabHome 下划线 toggleButton TabHome 下划线 toggleButton TabHome toggleButton TabHome IndentDecreaseExcel button TabHome 减少缩进量

IndentDecreaseExcel button TabHome 减少缩进量 IndentIncreaseExcel button TabHome 增加缩进量 TextOrientationVertical toggleButton TabHome 竖排文字 TextOrientationRotateUp toggleButton TabHome 向上旋转文字 TextOrientationRotateDown toggleButton TabHome 向下旋转文字 BorderDrawLine toggleButton TabHome 绘图边框 BorderDrawGrid toggleButton TabHome 绘图边框网格 BorderErase toggleButton TabHome 擦除边框 BorderStyle dropDown TabHome 线条样式 BorderColorPickerExcel gallery TabHome 线条颜色 ClearAll button TabHome 全部 ClearFormats button TabHome 格式 ClearContents button TabHome 内容 ClearComments button TabHome 批注 BordersGallery splitButton None CellFillColorPicker gallery TabHome 填充颜色 FontColorPicker gallery TabHome 字体颜色 GroupFont TabHome 字体 toggleButton TabHome 从左向右 toggleButton TabHome 从右向左 toggleButton TabHome 上下文 AlignTopExcel toggleButton TabHome 顶端对齐 AlignBottomExcel toggleButton TabHome 底端对齐 AlignRight toggleButton TabHome 右对齐 AlignJustify toggleButton TabHome 两端对齐 AlignDistributed toggleButton TabHome 分散对齐 MergeCenter toggleButton TabHome 合并居中 GroupAlignmentExcel TabHome 对齐方式 AlignMiddleExcel toggleButton None 垂直居中 AlignLeft toggleButton None 左对齐 AlignCenter toggleButton None 水平居中 MergeCenterMenu splitButton None 合并单元格 NumberFormatGallery comboBox TabHome 数字 PercentStyle button TabHome 百分比样式 CommaStyle button TabHome 千位分隔样式 DecimalsIncrease button TabHome 增加小数位数 DecimalsDecrease button TabHome 减少小数位数 GroupNumber TabHome 数字 AdvancedFilterDialog toggleButton TabHome 高级筛选 ConditionalFormattingMenu menu TabHome 条件格式 Lock toggleButton TabHome 锁定单元格 FormatCellsDialog button TabHome 设置单元格格式 RowHeight button TabHome 行高 RowHeightAutoFit button TabHome 最适合的行高 ColumnWidth button TabHome 列宽 ColumnWidthAutoFit button TabHome 最适合的列宽 SheetRowsInsert TabHome 插入行

SheetColumnsInsert button TabHome 插入列 CellsInsertDialog button TabHome 插入单元格 CellsDeleteSmart button TabHome 删除单元格 CellsDeleteSmart button TabHome 删除单元格 CellStylesGallery splitButton TabHome FillDown button TabHome 向下填充 FillRight button TabHome 向右填充 FillUp button TabHome 向上填充 FillLeft button TabHome 向左填充 InputNumericSequence button TabHome 录入123序列 InputLetterSequence button TabHome 录入ABC序列 InputRomanNumericSequence button TabHome 录入罗马数字序列 FillBlankCells button TabHome 空白单元格填充 FillSeries button TabHome 序列 RowsHide TabHome 隐藏行 RowsUnhide button TabHome 取消隐藏行 SheetInsert button TabHome 插入工作表 SheetProtect button TabHome 保护工作表 SheetRename button TabHome 重命名 SheetHide button TabHome 隐藏工作表 SheetUnhide button TabHome 取消隐藏工作表 FindDialogExcel button TabHome 查找 GoTo button TabHome 定位 ObjectsSelect toggleButton TabHome 选择对象 group TabHome 智能工具箱 GroupEditing group TabHome 编辑 FillMenu menu TabHome 填充 group TabHome 设置单元格格式 HideAndUnhideMenu menu TabHome 隐藏与取消隐藏 SheetDelete button TabHome 删除工作表 group TabHome 窗格 group TabHome 工具箱 group TabHome 其他 ConditionalFormattingMenu menu TabHome 条件格式 InputNumericSequence button TabHome 录入123序列 InputLetterSequence button TabHome 录入ABC序列 InputRomanNumericSequence button TabHome 录入罗马数字序列 FillBlankCells button TabHome 空白单元格填充 TextBoxInsertHorizontal toggleButton TabInsert 横向文本框 TextBoxInsertVertical toggleButton TabInsert 竖向文本框 TextBoxInsertMenu splitButton TabInsert 文本框 PivotTableReport button TabInsert 数据透视表 TableInsertExcel button None 表格 PivotTableInsert button TabInsert 数据透视表 HeaderFooterInsert button TabInsert 页眉页脚 Camera button TabInsert 照相机 OleObjectctInsert button TabInsert 对象

EquationInsertGallery TabInsert 公式 EquationInsertNew TabInsert 插入新公式 ChartTypeAllInsertDialog button TabInsert 全部图表 OnlineDocerCommand_Chart None PictureInsertFromFile TabInsert 图片 PictureInsertFromFile TabInsert 本地图片 ShapesInsertGallery gallery TabInsert 形状 HyperlinkInsert button TabInsert 超链接 ActiveXLabel button TabInsert 标签 FormControlGroupBox button TabInsert 分组框 ActiveXButton button TabInsert 按钮 FormControlCheckBox button TabInsert 复选框 ActiveXListBox button TabInsert 列表框 ActiveXComboBox button TabInsert 组合框 ActiveXScrollBar button TabInsert 滚动条 ActiveXSpinButton button TabInsert 微调项 CodeEdit button TabInsert 编辑代码 ObjectsGroup button TabInsert 组合 ObjectsUngroup button TabInsert 取消组合 ObjectsGroupMenu menu TabInsert 组合 ObjectRotateFree button TabInsert 自由旋转 ObjectRotateLeft90 button TabInsert 向左旋转 90° ObjectRotateRight90 button TabInsert 向右旋转 90° ObjectFlipHorizontal button TabInsert 水平翻转 ObjectFlipVertical button TabInsert 垂直翻转 GroupArrange group TabInsert 排列 GroupArrange group TabInsert 排列 SheetBackground button TabLayout 背景图片 PageOrientationGallery gallery TabLayout 纸张方向 PageSizeGallery gallery TabLayout 纸张大小 PrintAreaMenu menu TabLayout 打印区域 PrintTitles button TabLayout 打印标题 HeaderFooterInsert button TabLayout 页眉页脚 PageBreakInsertExcel button TabLayout 插入分页符 PageBreakRemove button TabLayout 删除分页符 PageBreaksResetAll button TabLayout 重置所有分页符 PageBreakMenu button TabLayout 插入分页符 ObjectBringForward button TabLayout 上移一层 ObjectBringToFront button TabLayout 置于顶层 ObjectSendBackward button TabLayout 下移一层 ObjectSendToBack button TabLayout 置于底层 SelectionPane toggleButton TabLayout 选择窗格 ObjectsAlignLeft button TabLayout 左对齐 ObjectsAlignCenterHorizontal button TabLayout 水平居中 ObjectsAlignRight button TabLayout 右对齐 ObjectsAlignTop button TabLayout 顶端对齐 ObjectsAlignMiddleVertical button TabLayout 垂直居中

ObjectsAlignMiddleVertical button TabLayout 垂直居中 ObjectsAlignBottom button TabLayout 底端对齐 AlignDistributeHorizontally button TabLayout 横向分布 AlignDistributeVertically button TabLayout 纵向分布 SnapToGrid toggleButton TabLayout 对齐网格 ObjectAlignMenu menu TabLayout 对齐 ObjectsGroup button TabLayout 组合 ObjectsUngroup button TabLayout 取消组合 ObjectRotateFree button TabLayout 自由旋转 ObjectRotateLeft90 button TabLayout 向左旋转 90° ObjectRotateRight90 button TabLayout 向右旋转 90° ObjectFlipHorizontal button TabLayout 水平翻转 ObjectFlipVertical button TabLayout 垂直翻转 PageSetupDialog button None 页面设置 ContrastMore button TabPictureTool 增加对比度 ContrastLess button TabPictureTool 降低对比度 BrightnessMore button TabPictureTool 增加亮度 BrightnessLess button TabPictureTool 降低亮度 PictureSetTransparentColor button TabPictureTool 设置透明色 ObjectPictureFill button TabPictureTool 图片 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 OutlineLinePatternFill button TabPictureTool 带图案线条 LineStylesDialog button TabPictureTool 其他线条 ObjectsAlignLeft button TabPictureTool 左对齐 ObjectsAlignCenterHorizontal button TabPictureTool 水平居中 ObjectsAlignRight button TabPictureTool 右对齐 ObjectsAlignTop button TabPictureTool 顶端对齐 ObjectsAlignMiddleVertical button TabPictureTool 垂直居中 ObjectsAlignBottom button TabPictureTool 底端对齐 AlignDistributeHorizontally button TabPictureTool 横向分布 AlignDistributeVertically button TabPictureTool 纵向分布 SnapToGrid toggleButton TabPictureTool 对齐网格 ObjectsGroup button TabPictureTool 组合 ObjectsUngroup button TabPictureTool 取消组合 ObjectRotateFree button TabPictureTool 自由旋转 ObjectRotateLeft90 button TabPictureTool 向左旋转 90° ObjectRotateRight90 button TabPictureTool 向右旋转 90° ObjectFlipHorizontal button TabPictureTool 水平翻转 ObjectFlipVertical button TabPictureTool 垂直翻转 SelectionPane toggleButton TabPictureTool 选择窗格 editBox TabPictureTool editBox TabPictureTool PictureCrop toggleButton TabPictureTool 裁剪 button None 重设形状和大小 ContrastMore button TabPictureTool_Vml 增加对比度 ContrastLess button TabPictureTool_Vml 降低对比度

BrightnessMore button TabPictureTool_Vml 增加亮度 BrightnessLess button TabPictureTool_Vml 降低亮度 PictureSetTransparentColor button TabPictureTool_Vml 设置透明色 ObjectPictureFill button TabPictureTool_Vml 图片 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 LineStylesDialog button TabPictureTool_Vml 其他线条 ObjectsAlignLeft button TabPictureTool_Vml 左对齐 ObjectsAlignCenterHorizontal button TabPictureTool_Vml 水平居中 ObjectsAlignRight button TabPictureTool_Vml 右对齐 ObjectsAlignTop button TabPictureTool_Vml 顶端对齐 ObjectsAlignMiddleVertical button TabPictureTool_Vml 垂直居中 ObjectsAlignBottom button TabPictureTool_Vml 底端对齐 SnapToGrid toggleButton TabPictureTool_Vml 对齐网格 ObjectsGroup button TabPictureTool_Vml 组合 ObjectsUngroup button TabPictureTool_Vml 取消组合 ObjectRotateFree button TabPictureTool_Vml 自由旋转 ObjectRotateLeft90 button TabPictureTool_Vml 向左旋转 90° ObjectRotateRight90 button TabPictureTool_Vml 向右旋转 90° ObjectFlipHorizontal button TabPictureTool_Vml 水平翻转 ObjectFlipVertical button TabPictureTool_Vml 垂直翻转 PictureCrop toggleButton TabPictureTool_Vml 裁剪 editBox TabPictureTool_Vml 高度: editBox TabPictureTool_Vml 宽度: Refresh button None 刷新数据 RefreshAll button None 全部刷新 FilePrint button None 打印 FilePrintQuick button None 直接打印 FilePrintEntireWorkbookQuick button TabPrintPreview 打印整个工作簿 comboBox TabPrintPreview 打印机 comboBox TabPrintPreview 纸张类型 comboBox TabPrintPreview 方式 comboBox TabPrintPreview 顺序 comboBox TabPrintPreview 缩放比例 ViewPageLayoutView toggleButton None 页面视图 button None 同义词库 TranslateToSimplifiedChinese button TabReview 繁转简 TranslateToTraditionalChinese button TabReview 简转繁 ReviewNewComment button TabReview 新建批注 ReviewDeleteComment button TabReview 删除批注 ReviewPreviousComment button TabReview 上一条 ReviewNextComment button TabReview 下一条 ReviewShowOrHideComment toggleButton TabReview 显示/隐藏批注 ReviewShowAllComments toggleButton TabReview 显示所有批注 toggleButton TabReview 重置当前批注 toggleButton TabReview 重置所有批注 SheetProtect button TabReview 保护工作表

ReviewRestrictEditing toggleButton TabReview 保护工作簿 ReviewShareWorkbook button TabReview 共享工作簿 ReviewProtectAndShareWorkbook button TabReview 保护并共享工作簿 ReviewAllowUsersToEditRanges button TabReview 允许用户编辑区域 ReviewHighlightChanges button TabReview 突出显示修订 ReviewTrackChangesMenu menu TabReview 修订 ShadowSemitransparentClassic button TabshadowDrawingTools 半透明阴影 ShadowOnOrOffClassic button TabshadowDrawingTools 设置/取消阴影 _3DTiltUpClassic button TabshadowDrawingTools 上翘 _3DEffectsOnOffClassic button TabshadowDrawingTools 设置三维效果 _3DExtrusionPerspectiveClassic button TabshadowDrawingTools 透视 _3DExtrusionParallelClassic button TabshadowDrawingTools 平行 _3DLightingFlatClassic button TabshadowDrawingTools 明亮 _3DLightingNormalClassic button TabshadowDrawingTools 普通 _3DLightingDimClassic button TabshadowDrawingTools 阴暗 _3DExtrusionPerspectiveClassic button TabshadowDrawingTools_Vml 透视 ObjectBringForward button TabSlicerOptions 上移一层 ObjectBringToFront button TabSlicerOptions 置于顶层 ObjectSendBackward button TabSlicerOptions 下移一层 ObjectSendToBack button TabSlicerOptions 置于底层 ObjectsAlignLeft button TabSlicerOptions 左对齐 ObjectsAlignCenterHorizontal button TabSlicerOptions 水平居中 ObjectsAlignRight button TabSlicerOptions 右对齐 ObjectsAlignTop button TabSlicerOptions 顶端对齐 ObjectsAlignMiddleVertical button TabSlicerOptions 垂直居中 ObjectsAlignBottom button TabSlicerOptions 底端对齐 AlignDistributeHorizontally button TabSlicerOptions 横向分布 AlignDistributeVertically button TabSlicerOptions 纵向分布 SnapToGrid toggleButton TabSlicerOptions 对齐网格 ObjectsGroup button TabSlicerOptions 组合 ObjectsUngroup button TabSlicerOptions 取消组合 ObjectRotateLeft90 button TabSlicerOptions 向左旋转 90° ObjectRotateRight90 button TabSlicerOptions 向右旋转 90° ObjectFlipHorizontal button TabSlicerOptions 水平翻转 ObjectFlipVertical button TabSlicerOptions 垂直翻转 SelectionPane toggleButton TabSlicerOptions 选择窗格 TextBoxInsertMenu splitButton TabTextTool 文本框 TextBoxInsertHorizontal toggleButton None 横向文本框 TextBoxInsertVertical toggleButton None 垂直平铺 button TabTextTool 清除艺术字 ShapeStylesGallery gallery TabTextTool 形状样式 ShapeFillColorPicker gallery TabTextTool 形状填充 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 ShapeOutlineColorPicker gallery TabTextTool 形状轮廓 comboBox TabTextTool 字体 comboBox TabTextTool 字号

comboBox TabTextTool 字号 ClearAll button TabTextTool 全部 ClearFormats button TabTextTool 效果设置 ClearContents button TabTextTool 内容 ClearComments button TabTextTool 批注 AsianLayoutPhoneticGuide button TabTextTool 拼音指南 CharacterBorder toggleButton TabTextTool 字符边框 button TabTextTool 清除艺术字 FormatPainter toggleButton None 格式刷 ViewNormalViewExcel toggleButton TabView 普通 ViewPageBreakPreviewView toggleButton TabView 分页预览 ViewPageLayoutView toggleButton TabView 页面布局 ViewCustomViews button TabView 自定义视图 ViewFullScreenView toggleButton TabView 全屏显示 ViewFullScreenView toggleButton TabView 全屏显示 ViewFormulaBar checkBox TabView 编辑栏 GridlinesExcel checkBox TabView 显示网格线 ViewHeadings checkBox TabView 显示行号列标 ZoomDialog button TabView 显示比例 WindowNew button TabView 新建窗口 WindowHide button TabView 隐藏 WindowUnhide button TabView 取消隐藏 WindowSplitToggle toggleButton TabView 拆分窗口 WindowSwitchWindowsMenuExcel button TabView 切换窗口 button TabView 取消冻结窗格 button TabView 冻结窗格 button TabView 冻结行 button TabView 冻结列 button TabView 冻结首行 button TabView 冻结首列 MacroPlay button TabView JS 宏 splitButton TabView 宏安全 VisualBasic button TabView WPS 宏编辑器 MenuMacros splitButton TabView JS 宏 ShadowSemitransparentClassic button TabWAshadowDrawingTools 半透明阴影 ShadowOnOrOffClassic button TabWAshadowDrawingTools 设置/取消阴影 _3DTiltUpClassic button TabWAshadowDrawingTools 上翘 _3DEffectsOnOffClassic button TabWAshadowDrawingTools 设置三维效果 _3DExtrusionPerspectiveClassic button TabWAshadowDrawingTools 透视 _3DExtrusionParallelClassic button TabWAshadowDrawingTools 平行 _3DLightingFlatClassic button TabWAshadowDrawingTools 明亮 _3DLightingNormalClassic button TabWAshadowDrawingTools 普通 _3DLightingDimClassic button TabWAshadowDrawingTools 阴暗 WordArtInsertDialogClassic button TabWordArt 艺术字库 WordArtSpacingVeryTight button TabWordArt 很紧 WordArtSpacingTight toggleButton TabWordArt 紧密 WordArtSpacingNormal toggleButton TabWordArt 常规 WordArtSpacingLoose toggleButton TabWordArt 稀疏

WordArtSpacingLoose toggleButton TabWordArt 稀疏 WordArtSpacingVeryLoose toggleButton TabWordArt 很松 WordArtVerticalText button TabWordArt 竖排 TextAlignLeft button TabWordArt 左对齐 TextAlignCenter button TabWordArt 居中 TextAlignRight button TabWordArt 右对齐 TextAlignWordJustify button TabWordArt 单词调整 TextAlignLetterJustify button TabWordArt 字母调整 TextAlignStretchJustify button TabWordArt 延伸调整 ObjectPictureFill button TabWordArt 图片 GlowColorMoreColorsDialog button TabWordArt 其他填充颜色 GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 OutlineLinePatternFill button TabWordArt 带图案线条 LineStylesDialog button TabWordArt 其他线条 SelectionPane toggleButton TabWordArt 选择窗格 ObjectsAlignLeft button TabWordArt 左对齐 ObjectsAlignCenterHorizontal button TabWordArt 水平居中 ObjectsAlignRight button TabWordArt 右对齐 ObjectsAlignTop button TabWordArt 顶端对齐 ObjectsAlignMiddleVertical button TabWordArt 垂直居中 ObjectsAlignBottom button TabWordArt 底端对齐 AlignDistributeHorizontally button TabWordArt 横向分布 AlignDistributeVertically button TabWordArt 纵向分布 SnapToGrid toggleButton TabWordArt 对齐网格 ObjectsGroup button TabWordArt 组合 ObjectsUngroup button TabWordArt 取消组合 ObjectRotateFree button TabWordArt 自由旋转 ObjectRotateLeft90 button TabWordArt 向左旋转 90° ObjectRotateRight90 button TabWordArt 向右旋转 90° ObjectFlipHorizontal button TabWordArt 水平翻转 ObjectFlipVertical button TabWordArt 垂直翻转 FileSaveAsPicture TabWorkSpace 输出为图片 ExportToPDF button None 输出为PDF SetLanguage button None 更改语言 SwitchFace None 皮肤 TabbarQAndA None FileMenu None TabHome tab None 开始 TabInsert tab None 插入 TabPageLayoutExcel tab None 页面视图 TabFormulas tab None 公式 TabData tab None 数据 TabReview tab None 审阅 TabView tab None 视图 TabPrintPreview tab None 打印预览 TabAddIns tab None 加载宏

TabSecurity tab None 安全性 TabDeveloper tab None 开发工具 TabWorkSpace tab None 云服务 TabPictureToolsFormat tab None 图片工具 TabEtToolbox tab None 智能工具箱 ExportToPDF button None 输出为PDF QAT_Menu None FileNewBlankDocument button None 新建 FileOpen button None 打开 FileSave button None FilePrint button None 打印 FilePrintPreview button None 打印 FilePrintQuick button None 直接打印 FilePrintPreview button None 打印预览 Undo button None 撤消 Redo button None 恢复 MergeCells button None 合并单元格 MergeCenterMenu splitButton None 合并单元格 BorderNone button None 无边框 BordersAll button None 所有框线 BorderOutside button None 外侧框线 BorderBottom button None 下框线 BorderTop button None 上框线 BorderLeft button None 左框线 BorderRight button None 右框线 BorderDoubleBottom button None 双底框线 BorderThickBottom button None 粗底框线 BorderTopAndBottom button None 上下框线 BorderTopAndThickBottom button None 上框线和粗下框线 BorderTopAndDoubleBottom button None 上框线和双下框线 BordersMoreDialog button None 其他边框 BordersGallery splitButton None AlignCenter toggleButton None 水平居中 AutoSum button None 求和 AutoSumAverage button None 平均值 AutoSumCount button None 计数 AutoSumMax button None 最大值 AutoSumMin button None 最小值 AutoSumMoreFunctions button None 其他函数 ShadowOnOrOffClassic button None 设置阴影 ShadowSemitransparentClassic button None 半透明阴影 FormatPainter toggleButton None 格式刷 AlignLeft toggleButton None 左对齐 AlignMiddleExcel toggleButton None 垂直居中 InsertDiagonalHeader button None 插入斜线表头 wps_SplitSheet None 拆分表格 wps_MergeSheet None 合并表格

FileMenuSendMail None 发送邮件 OutlineGroup None 组合 OutlineUngroup None 取消组合 Refresh button None 刷新数据 RefreshAll button None 全部刷新 GoTo button None 定位 ReviewNewComment button None 新建批注 ReviewNewComment button None ReviewShowAllComments toggleButton None 显示所有批注 ContextMenuCell None 单元格 VisualBasic button None WPS 宏编辑器 MacroPlay button None JS 宏 HeaderFooterCurrentTimeInsert button None FormatCellsDialog button None 设置单元格格式 HeaderFooterCurrentDate button None Bold button None 加粗 Copy button None 复制 TableInsertExcel button None 表格 FillDown button None 向下填充 FindDialogExcel button None 查找 GoTo button None 定位 ReplaceDialog button None 替换 Italic toggleButton None 倾斜 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileNewBlankDocument button None 新建 FileClose button None 关闭 PageSetupDialog button None 页面设置 Properties button None 属性 PasteSpecialDialog button None 选择性粘贴 ClearContents button None 内容 FillRight button None 右对齐 FileSave button None FontSizeDecrease button None 减小字号 FontSizeIncrease button None 增大字号 CellsInsertDialog button None 单元格 Underline toggleButton None 下划线 Paste button None 粘贴 Cut button None 剪切 PasteValues button None 粘贴为数值 FileSaveAs button None 另存为 CalculateSheet button None 计算工作表 ApplicationExit button None 关闭 FileNewXlsxFile button None 新建 Excel 文件

FileNewXlsxFile button None 新建 Excel 文件 FileNew button None 新建 FileNewFromTemplate button None 本机上的模板 TextBoxInsertHorizontal toggleButton None 横向文本框 TextBoxInsertVertical toggleButton None 垂直平铺 splitButton None 智能数据 ViewNormalViewExcel toggleButton None 普通视图 ViewPageLayoutView toggleButton None 页面视图 ViewPageBreakPreviewView toggleButton None 分页预览 OnlineDocerCommand_Chart None GradientGallery gallery None 渐变 MoreTextureOptions button None 图片或纹理 button None 同义词库 FileSaveAsMenu menu None 另存为 FileSaveAsExcelEt button None WPS 表格 文件（*.et） FileSaveAsExcelEtt button None WPS 表格 模板文件（*.ett） FileSaveAsExcelEtx button None WPS 表格 2007/2010 文件（*.etx） FileSaveAsExcelXls button None Excel 97-2003 文件（*.xls） FileSaveAsExcelXlt button None Excel 97-2003 模板文件（*.xlt） FileSaveAsExcelXlsx button None Excel 文件（*.xlsx） FileSaveAsOtherFormats button None 其他格式 FileSaveAsPdfOrXps button None 输出为PDF FileSlimming None 文件瘦身 button None 新建批注 ShowFormulas button None 显示公式 DisplayOutline button None button None 取消冻结窗格 button None 冻结窗格 button None 冻结行 button None 冻结列 button None 冻结首行 button None 冻结首列 DocumentSplit button None 拆分（取消拆分） DocumentMerge button None 合并 DocumentSplitAndMerge menu None 文档拆分合并 button None 重设形状和大小 SaveAsPicture None (Context Menu) 输出为图片 FileCloseAll button None (Context Menu) 关闭所有文档 FileCloseOrCloseAll button None (Context Menu) 关闭所有文档 FileCloseOrCloseAll button None (Context Menu) 关闭所有文档 SaveAll button None (Context Menu) 保存所有文档 SaveAll button None (Context Menu) 保存所有文档 SaveAll button None (Context Menu) 保存所有文档 FileExportToPDF button None (Context Menu) 输出为PDF格式 exportToOFD button None (Context Menu) 输出为OFD格式 FileMenuSendMail button None (Context Menu) 发送邮件 FileEncrypt button None (Context Menu) 文件加密

PasteAsPicture button None (Context Menu) 粘贴为图片 FillUp button None (Context Menu) 向上填充 FillLeft button None (Context Menu) 向左填充 FillSeries button None (Context Menu) 序列 ClearAll button None (Context Menu) 全部 ClearFormats button None (Context Menu) 格式 ClearComments button None (Context Menu) 批注 SheetDelete button None (Context Menu) 删除工作表 EditLinks button None (Context Menu) 编辑链接 ViewFormulaBar checkBox None (Context Menu) 编辑栏 ViewFullScreenView toggleButton None (Context Menu) 全屏显示 ZoomDialog button None (Context Menu) 显示比例 InsertCellstMenu splitButton None (Context Menu) 单元格 SheetInsert button None (Context Menu) 工作表 NameDefine button None (Context Menu) 定义名称 NewName button None (Context Menu) 定义名称 NameCreateFromSelection button None (Context Menu) 指定 ClipArtInsert toggleButton None (Context Menu) 剪贴画 EquationInsertGallery None (Context Menu) 公式 ColumnWidthAutoFit button None (Context Menu) 最适合的列宽 RowHeightAutoFit button None (Context Menu) 最适合的行高 RowHeightAutoFit button None (Context Menu) 最适合的行高 RowsHide None (Context Menu) 隐藏 RowsUnhide button None (Context Menu) 取消隐藏 TableColumnWidth control None (Context Menu) 列宽 ColumnsHide button None (Context Menu) 隐藏 ColumnsUnhide button None (Context Menu) 取消隐藏 SheetHide button None (Context Menu) 隐藏工作表 SheetUnhide button None (Context Menu) 取消隐藏工作表 SheetBackground button None (Context Menu) 背景图片 ReviewShareWorkbook button None (Context Menu) 共享工作簿 ReviewHighlightChanges button None (Context Menu) 突出显示修订 SheetProtect button None (Context Menu) 保护工作表 ReviewAllowUsersToEditRanges button None (Context Menu) 允许用户编辑区域 ReviewRestrictEditing toggleButton None (Context Menu) 保护工作簿 ReviewProtectAndShareWorkbook button None (Context Menu) 保护并共享工作簿 GoalSeek button None (Context Menu) 单变量求解 FormulaEvaluate button None (Context Menu) 公式求值 ErrorCheckingMenu splitButton None (Context Menu) 错误检查 CircularReferences gallery None (Context Menu) 循环引用 Security button None (Context Menu) 安全性 ComAddInsDialog button None (Context Menu) COM 加载项 FileBackupManagement None (Context Menu) 备份管理 ApplicationOptionsDialog None (Context Menu) 选项 SetLanguage button None (Context Menu) 更改语言 SortDialogClassic button None (Context Menu) 排序 AdvancedFilterDialog toggleButton None (Context Menu) 高级筛选

Subtotals button None (Context Menu) 分类汇总 DataValidation button None (Context Menu) 有效性 Consolidate button None (Context Menu) 合并计算 OutlineHideDetail button None (Context Menu) 隐藏明细数据 OutlineShowDetail button None (Context Menu) 显示明细数据 WindowSplitToggle toggleButton None (Context Menu) 拆分 FreezePanes button None (Context Menu) 冻结窗格 BlogHomePage button None (Context Menu) WPS官方网站 About button None (Context Menu) 关于 WPS 表格 ReviewDeleteComment button None (Context Menu) 删除批注 ReviewShowOrHideComment button None (Context Menu) 显示/隐藏批注 ReviewShowOrHideComment button None (Context Menu) 隐藏批注 RowHeight button None (Context Menu) 行高 FillSeries button None (Context Menu) 序列 FillSeries button None (Context Menu) 序列 CalculationOptionsAutomatically toggleButton None (Context Menu) 无 button None (Context Menu) 组合 button None (Context Menu) 取消组合 button None (Context Menu) 取消组合 ObjectBringToFront button None (Context Menu) 置于顶层 ObjectSendToBack button None (Context Menu) 置于底层 ObjectBringForward button None (Context Menu) 上移一层 ObjectSendBackward button None (Context Menu) 下移一层 ObjectEditPoints toggleButton None (Context Menu) 编辑顶点 ShapeStraightConnector toggleButton None (Context Menu) 直线连接符 ShapeElbowConnectorArrow toggleButton None (Context Menu) 肘形连接符 ControlProperties button None (Context Menu) 属性 ViewCode button None (Context Menu) 查看代码 ErrorChecking button None (Context Menu) 错误检查选项 SheetDelete button None (Context Menu) 删除工作表 MacroRecord button None (Context Menu) 录制宏 Cut button None (Context Menu) 剪切 Copy button None (Context Menu) 复制 PasteAsPicture button None (Context Menu) 粘贴为图片 PasteSpecialDialog button None (Context Menu) 选择性粘贴 button None (Context Menu) 粘贴值到可见单元格 PasteMenu splitButton None (Context Menu) 粘贴 PasteAllUsingSourceTheme button None (Context Menu) 保留源格式 PasteValues button None (Context Menu) 值 PasteFormulas button None (Context Menu) 公式 PasteNoBorders button None (Context Menu) 无边框 PasteTranspose button None (Context Menu) 转置 DataTypeShowCard button None (Context Menu) 显示数据类型卡 DataTypeRefresh button None (Context Menu) 刷新 DataTypeChange button None (Context Menu) 更改 DataTypeConvertToText button None (Context Menu) 转换为文本 button None (Context Menu) 科学计数

button None (Context Menu) 科学计数 AlignTopExcel toggleButton None (Context Menu) 顶端对齐 AlignLeft toggleButton None (Context Menu) 左对齐 AlignMiddleExcel toggleButton None (Context Menu) 垂直居中 AlignCenter toggleButton None (Context Menu) 水平居中 AlignBottomExcel toggleButton None (Context Menu) 底端对齐 AlignRight toggleButton None (Context Menu) 右对齐 MergeCenterMenu splitButton None (Context Menu) 合并 AutoSum button None (Context Menu) 求和 AutoSumAverage button None (Context Menu) 平均值 AutoSumCount button None (Context Menu) 计数 AutoSumMax button None (Context Menu) 最大值 AutoSumMin button None (Context Menu) 最小值 AutoSumMoreFunctions button None (Context Menu) 其他函数 comboBox None (Context Menu) 字体 comboBox None (Context Menu) 字号 button None (Context Menu) 粘贴 button None (Context Menu) 粘贴 PasteSpecialDialog button None (Context Menu) 选择性粘贴 PasteSpecialDialog button None (Context Menu) 选择性粘贴 ClearAll button None (Context Menu) 全部 ClearFormats button None (Context Menu) 格式 ClearContents button None (Context Menu) 内容 ClearComments button None (Context Menu) 批注 PivotTableOptions button None (Context Menu) 数据透视表选项 button None (Context Menu) 数据透视图选项 ObjectBringToFrontMenu button None (Context Menu) 置于顶层 ObjectSendToBack button None (Context Menu) 置于底层 InputNumericSequence button None (Context Menu) 录入123序列 InputLetterSequence button None (Context Menu) 录入ABC序列 InputRomanNumericSequence button None (Context Menu) 录入罗马数字序列 FillBlankCells button None (Context Menu) 空白单元格填充 NewBlankXlsxFile button None (Context Menu) 新建 Camera button None (Context Menu) 照相机 SheetRename button None (Context Menu) 重命名 ReviewTrackChangesMenu menu None (Context Menu) 修订 button None (Context Menu) 取消组合 FontSizeIncrease button None (Context Menu) 增大字号 FontSizeDecrease button None (Context Menu) 减小字号

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 演示演示idMso参考参考

控件名称控件名称 控件类型控件类型 所属所属 Tab 功能描述功能描述 AnimationGallery gallery TabAnimation 动画 AnimationCustom toggleButton TabAnimation 动画窗格 comboBox TabAnimation 开始播放: editBox TabAudioTool 淡入 editBox TabAudioTool 淡出 editBox TabAudioTool 页停止 dropDown TabAudioTool 自动 PowerPointPageSetup button TabDesign 页面设置 GroupPageSetup group TabDesign 幻灯片大小 Magic button TabDesign 魔法 ImportTemplates button TabDesign 导入模板 InvolvedTemplate button TabDesign 本文模板 DesignSlideMaster button TabDesign 编辑母版 SlideThemesGallery gallery TabDesign 设计模板 OnlineTemplate button TabDesign 更多设计 SlideThemesGallery gallery TabDesign 设计模板 ResetSlide button TabDesign 重置 ObjectFillMoreColorsDialog button TabDesignTable 其他填充颜色 GradientGallery gallery TabDesignTable 渐变 MoreTextureOptions button TabDesignTable 纹理 dropDown TabDesignTable 笔样式 dropDown TabDesignTable 笔划粗细 ShapeFillMoreGradientsDialog button TabDesignTable 填充 ClearMenu menu TabDesignTable 清除表格样式 VisualBasic button TabDevelopTools WPS 宏编辑器 AddInsDialog button TabDevelopTools 加载项 ComAddInsDialog button TabDevelopTools COM 加载项 Cancel button TabDevelopTools 其他控件 FindNext button TabDevelopTools 控件列表 ControlProperties button TabDevelopTools 控件属性 ObjectEditPoints toggleButton TabDrawingTool 编辑顶点 ObjectEditPoints toggleButton TabDrawingTool 编辑顶点 ObjectFillMoreColorsDialog button TabDrawingTool 其他填充颜色 FontColorMoreColorsDialogExcel button TabDrawingTool 其他字体颜色 GradientGallery gallery None 渐变 ObjectBringForward button TabDrawingTool 上移一层 ObjectSendBackward button TabDrawingTool 下移一层 AlignDistributeHorizontally button TabDrawingTool 横向分布 AlignDistributeVertically button TabDrawingTool 纵向分布 ObjectsRegroup button TabDrawingTool 组合 ObjectsUnGroup button TabDrawingTool 取消组合 ObjectRotateLeft90 button TabDrawingTool 向左旋转 90°

editBox TabDrawingTool 大小 editBox TabDrawingTool Bold toggleButton TabDrawingTool 加粗 Underline toggleButton TabDrawingTool 下划线 ObjectEffectShadowGallery gallery TabDrawingTool 阴影 OutlineExpand button TabDrawingTool 上标 OutlineCollapse button TabDrawingTool 下标 FontSizeIncrease button TabDrawingTool 增大字号 FontSizeDecrease button TabDrawingTool 减小字号 Bullets toggleButton TabDrawingTool 项目符号 comboBox TabDrawingTool 字体 FontSize comboBox TabDrawingTool 字号 Numbering toggleButton TabDrawingTool 编号 IndentDecreaseExcel button TabDrawingTool 减少缩进量 IndentIncreaseExcel button TabDrawingTool 增加缩进量 ParagraphDistributed toggleButton TabDrawingTool 分散对齐 WindowMoreWindowsDialog button TabDrawingTool 增大段落行距 ParagraphMarks button TabDrawingTool 1.0 AlignLeft button TabDrawingTool 1.5 AlignRight button TabDrawingTool 2.0 AlignCenter button TabDrawingTool 2.5 AlignJustify button TabDrawingTool 3.0 comboBox TabDrawingTool_Vml 字体 editBox TabDrawingTool_Vml 高度 editBox TabDrawingTool_Vml 宽度 EquationOptions TabEquationTools 公式选项 EquationInsertGallery TabEquationTools 公式 EquationProfessional TabEquationTools 专业型 EquationLinearFormat TabEquationTools 线性 EquationNormalText TabEquationTools 普通文本 EquationSymbolsInsertGallery TabEquationTools 公式符号 EquationFractionGallery TabEquationTools 分数 EquationScriptGallery TabEquationTools 上下标 EquationRadicalGallery TabEquationTools 根式 EquationIntegralGallery TabEquationTools 积分 EquationLargeOperatorGallery TabEquationTools 大型运算符 EquationDelimiterGallery TabEquationTools 括号 EquationFunctionGallery TabEquationTools 函数 EquationAccentGallery TabEquationTools 导数符号 EquationLimitGallery TabEquationTools 极限和对数 EquationOperatorGallery TabEquationTools 运算符 EquationMatrixGallery TabEquationTools 矩阵 FileSaveAsPicture TabFile 输出为图片 FileNewMenu menu TabFile 新建 FileNew button TabFile 新建 FileNewFromTemplate button TabFile 本机上的模板 FileNewFromDefaultTemplate button TabFile 从默认模板新建

FileNewFromDefaultTemplate button TabFile 从默认模板新建 FileSaveAsMenu menu TabFile 另存为 FileSaveAsDps button TabFile WPS 演示 文件（*.dps） FileSaveAsDpt button TabFile WPS 演示 模板文件（*.dpt） PowerPoint 97-2003 文件 FileSaveAsPpt button TabFile （*.ppt） PowerPoint 97-2003 模板文件 FileSaveAsPot button TabFile （*.pot） PowerPoint 97-2003 放映文件 FileSaveAsPps button TabFile （*.pps） FileSaveAsOtherFormats button TabFile 其他格式 FileMenuPackageMenu menu TabFile 文件打包 FilePackageIntoFolder menu TabFile 将演示文档打包成文件夹 FilePackageIntoZip menu TabFile 将演示文档打包成压缩文件 FilePrintMenu splitButton TabFile 打印 FilePrint button TabFile 打印 FilePrintPreview button TabFile 打印预览 splitButton TabFile button TabFile button TabFile FileInfoMenu menu TabFile 文档加密 FileProperties button TabFile 属性 splitButton TabFile 备份与恢复 splitButton TabFile 备份与恢复 FileBackupManagement menu TabFile 备份管理 FileBackupManagement button TabFile 备份管理 FileBackupHistory button TabFile 历史版本 FileHelp menu TabFile 帮助 Help button TabFile WPS 演示 帮助 About button TabFile 关于 WPS 演示 FileSave button TabFile 保存 FileOpen button TabFile 打开 FileSaveAsPdfOrXps button None 输出为PDF FileShare button TabFile 分享文档 FileMenuSendMail button TabFile 发送邮件 ApplicationOptionsDialog TabFile 选项 ObjectFillMoreColorsDialog button TabGraphicTool 其他填充颜色 GradientGallery gallery None 渐变 ObjectBringForward button TabGraphicTool 上移一层 ObjectSendBackward button TabGraphicTool 下移一层 AlignDistributeHorizontally button TabGraphicTool 横向分布 AlignDistributeVertically button TabGraphicTool 纵向分布 ObjectsRegroup button TabGraphicTool 组合 ObjectsUnGroup button TabGraphicTool 取消组合 ObjectRotateLeft90 button TabGraphicTool 向左旋转 90° button None 重设形状和大小 editBox TabGraphicTool 高度 editBox TabGraphicTool 宽度 Bold toggleButton TabGraphicTool 加粗

Bold toggleButton TabGraphicTool 加粗 Underline toggleButton TabGraphicTool 下划线 ObjectEffectShadowGallery gallery TabGraphicTool 阴影 FontColorMoreColorsDialogExcel button TabGraphicTool 其他字体颜色 OutlineExpand button TabGraphicTool 上标 OutlineCollapse button TabGraphicTool 下标 FontSizeIncrease button TabGraphicTool 增大字号 FontSizeDecrease button TabGraphicTool 减小字号 Bullets toggleButton TabGraphicTool 项目符号 comboBox TabGraphicTool 字体 FontSize comboBox TabGraphicTool 字号 Numbering toggleButton TabGraphicTool 编号 IndentDecreaseExcel button TabGraphicTool 减少缩进量 IndentIncreaseExcel button TabGraphicTool 增加缩进量 ParagraphDistributed toggleButton TabGraphicTool 分散对齐 WindowMoreWindowsDialog button TabGraphicTool 增大段落行距 ParagraphMarks button TabGraphicTool 1.0 AlignLeft button TabGraphicTool 1.5 AlignRight button TabGraphicTool 2.0 AlignCenter button TabGraphicTool 2.5 AlignJustify button TabGraphicTool 3.0 PasteSourceFormatting TabHome 带格式粘贴 PasteTextOnly TabHome 只粘贴文本 PasteSpecialDialog TabHome 选择性粘贴 Cut TabHome 剪切 Copy TabHome 复制 FormatPainter TabHome 格式刷 ShowClipboard button TabHome 剪贴板 Paste button TabHome 粘贴 ViewSlideShowView TabHome 从头开始 SlideShowFromBeginning TabHome 从头开始 SlideShowFromCurrent TabHome 当页开始 SlideNewGallery gallery TabHome 新建幻灯片 Bold toggleButton TabHome 加粗 Italic toggleButton TabHome 倾斜 Underline toggleButton TabHome 下划线 ObjectEffectShadowGallery gallery TabHome 阴影 TextHighlightColorPicker gallery TabHome 突出显示 FontColorMoreColorsDialogExcel button TabHome 其他字体颜色 OutlineExpand button TabHome 上标 OutlineCollapse button TabHome 下标 FontSizeIncrease button TabHome 增大字号 FontSizeDecrease button TabHome 减小字号 ClearFormats button TabHome 清除所有格式 comboBox None 字体 FontSize comboBox TabHome 字号 Bullets toggleButton TabHome 项目符号

IndentDecreaseExcel button TabHome 减少缩进量 IndentIncreaseExcel button TabHome 增加缩进量 ParagraphMarks button TabHome 110 AlignLeft button TabHome AlignRight button TabHome AlignCenter button TabHome AlignJustify button TabHome WindowMoreWindowsDialog button None 增大段落行距 FilePackageIntoFolder button TabHome 打包成文件夹 ObjectBringToFront button TabHome 置于顶层 ObjectSendToBack button TabHome 置于底层 ObjectBringForward button TabHome 上移一层 ObjectSendBackward button TabHome 下移一层 ObjectUnGroup button TabHome 取消组合 AlignDistributeHorizontally button TabHome 横向分布 AlignDistributeVertically button TabHome 纵向分布 ObjectRotateLeft90 button TabHome 向左旋转 90° ObjectFillMoreColorsDialog button TabHome 其他填充颜色 ArrowStyleGallery gallery TabHome 箭头样式 ShapeScribble button TabHome 无三维效果 ShapesInsertGallery TabHome 形状 PictureInsertFromFilePowerPoint TabHome 图片 ObjectsArrangeMenu menu TabHome 排列 ObjectsRegroup button None 组合 ShapeFillColorPicker gallery TabHome 填充 GradientGallery gallery None 渐变 OutlineWeightGallery gallery TabHome 轮廓 ReplaceMenu splitButton TabHome 替换 PresentationTool menu TabHome 演示工具 TableInsert button TabInsert 插入表格 SlideNewGallery gallery TabInsert 新建幻灯片 PictureInsertFromFilePowerPoint TabInsert 本地图片 TableInsertGallery gallery TabInsert 表格 ShapesInsertGallery TabInsert 形状 ShapesInsertGallery TabInsert 形状 HeaderFooterInsert button TabInsert 页眉页脚 NumberInsert button TabInsert 艺术字 OleObjectctInsert button TabInsert 对象 TextAlignLeft button TabInsert 幻灯片编号 TextAlignLeft button TabInsert 幻灯片编号 DateAndTimeInsert button TabInsert 日期和时间 EquationInsertGallery TabInsert 公式 EquationInsertNew TabInsert 插入新公式 FilePackageIntoFolder button TabInsert 打包成文件夹 SoundInsertMenu splitButton TabInsert 音频 MovieInsert splitButton TabInsert 视频 ObjectFillMoreColorsDialog button TabOrgChart 其他填充颜色

GradientGallery gallery TabOrgChart 渐变 MoreTextureOptions button TabOrgChart 纹理 ArrowStyleGallery gallery TabOrgChart 箭头样式 FontColorMoreColorsDialogExcel button TabOrgChart 其他字体颜色 ShapeFillColorPicker gallery TabOrgChart 形状填充 GroupPictureTools group TabPictureTool 插入 SnapToGrid toggleButton TabPictureTool 增加亮度 ObjectFillMoreColorsDialog button TabPictureTool 其他填充颜色 GradientGallery gallery None 渐变 ObjectBringForward button TabPictureTool 上移一层 ObjectSendBackward button TabPictureTool 下移一层 AlignDistributeHorizontally button TabPictureTool 横向分布 AlignDistributeVertically button TabPictureTool 纵向分布 ObjectsRegroup button TabPictureTool 组合 ObjectsUnGroup button TabPictureTool 取消组合 ObjectRotateLeft90 button TabPictureTool 向左旋转 90° FontSizeIncrease button TabPictureTool 略向左移 FontSizeDecrease button TabPictureTool 略向右移 button None 重设形状和大小 editBox TabPictureTool editBox TabPictureTool FilePrint button None 打印 comboBox TabPrintPreview 打印机 comboBox TabPrintPreview 纸张类型 comboBox TabPrintPreview 份数 comboBox TabPrintPreview 顺序 comboBox TabPrintPreview 方式 comboBox TabPrintPreview 缩放比例: button None 同义词库 ReviewNewComment button TabReview 插入批注 ReviewPreviousComment button TabReview 上一条 ReviewNextComment button TabReview 下一条 TranslateToSimplifiedChinese button TabReview 繁转简 ShapeScribble button TabshadowDrawingTools 无三维效果 Bold toggleButton TabSlideMaster 加粗 Underline toggleButton TabSlideMaster 下划线 ObjectEffectShadowGallery gallery TabSlideMaster 阴影 FontColorMoreColorsDialogExcel button TabSlideMaster 其他字体颜色 Bullets toggleButton TabSlideMaster 项目符号 BulletsAndNumberingBulletsDialog TabSlideMaster 其他项目符号 comboBox TabSlideMaster 字体 comboBox TabSlideMaster 字号 ViewSlideShowView TabSlideShow 从头开始 SlideShowFromBeginning TabSlideShow 从头开始 SlideShowFromCurrent None 当页开始 SlideShowCustom TabSlideShow 自定义放映 SlideShowRehearseTimings TabSlideShow 排练全部

SlideShowRehearseTimings TabSlideShow 排练全部 comboBox TabSlideShow 放映位置 AnimationTransitionGallery gallery TabSlideTrans 切换 GroupTransitionStyles group TabSlideTrans 效果选项 ObjectBringForward button TabSmartArtDesign 上移一层 ObjectSendBackward button TabSmartArtDesign 下移一层 Bold toggleButton TabSmartArtFormatTool 加粗 Italic toggleButton TabSmartArtFormatTool 倾斜 Underline toggleButton TabSmartArtFormatTool 下划线 ObjectEffectShadowGallery gallery TabSmartArtFormatTool 阴影 FontColorMoreColorsDialogExcel button TabSmartArtFormatTool 其他字体颜色 OutlineExpand button TabSmartArtFormatTool 上标 OutlineCollapse button TabSmartArtFormatTool 下标 FontSizeIncrease button TabSmartArtFormatTool 增大字号 FontSizeDecrease button TabSmartArtFormatTool 减小字号 ClearFormats button TabSmartArtFormatTool 清除所有格式 comboBox None 字体 FontSize comboBox TabSmartArtFormatTool 字号 ObjectFillMoreColorsDialog button TabSmartArtFormatTool 其他填充颜色 PictureInsertFromFilePowerPoint TabStudentTools ShapesInsertGallery TabStudentTools ShapesInsertGallery TabStudentTools EquationInsertGallery None 公式 ReviewNewComment button TabStudentTools MergeCells button TabTableTool 合并单元格 SplitCells button TabTableTool 拆分单元格 GroupTableAlignment group TabTableTool 对齐方式 ObjectBringForward button TabTableTool 上移一层 ObjectBringToFront button TabTableTool 置于顶层 ObjectSendBackward button TabTableTool 下移一层 ObjectSendToBack button TabTableTool 置于底层 AlignDistributeHorizontally button TabTableTool 横向分布 AlignDistributeVertically button TabTableTool 纵向分布 Underline toggleButton TabTableTool 下划线 ObjectEffectShadowGallery gallery TabTableTool 阴影 TextHighlightColorPicker gallery TabTableTool 突出显示 FontColorMoreColorsDialogExcel button TabTableTool 其他字体颜色 OutlineExpand button TabTableTool 上标 OutlineCollapse button TabTableTool 下标 FontSizeIncrease button TabTableTool 增大字号 FontSizeDecrease button TabTableTool 减小字号 WindowMoreWindowsDialog button TabTableTool 增大段落行距 comboBox TabTableTool 字体 comboBox TabTableTool 字号 Bold toggleButton TabTextTool 加粗 Italic toggleButton TabTextTool 倾斜 Underline toggleButton TabTextTool 下划线 ObjectEffectShadowGallery gallery TabTextTool 阴影

ObjectEffectShadowGallery gallery TabTextTool 阴影 TextHighlightColorPicker gallery TabTextTool 突出显示 FontSizeIncrease button TabTextTool 增大字号 FontSizeDecrease button TabTextTool 减小字号 ClearFormats button TabTextTool 清除所有格式 comboBox TabTextTool 字体 comboBox TabTextTool 字号 Bullets toggleButton TabTextTool 项目符号 button TabTextTool 清除艺术字 GradientGallery gallery None 渐变 dropDown TabVideoTool 自动 WindowNew button TabView 新建窗口 GroupMacros group TabView JS 宏 VisualBasic button TabView WPS 宏编辑器 FontSizeIncrease button TabWAshadowDrawingTools 略向左移 FontSizeDecrease button TabWAshadowDrawingTools 略向右移 ShapeScribble button TabWAshadowDrawingTools 无三维效果 GlowColorMoreColorsDialog button TabWordArt 其他填充颜色 GradientGallery gallery TabWordArt 渐变 MoreTextureOptions button TabWordArt 纹理 ObjectBringForward button TabWordArt 上移一层 ObjectSendBackward button TabWordArt 下移一层 AlignDistributeHorizontally button TabWordArt 横向分布 AlignDistributeVertically button TabWordArt 纵向分布 ObjectsRegroup button TabWordArt 组合 ObjectsUnGroup button TabWordArt 取消组合 ObjectRotateLeft90 button TabWordArt 向左旋转 90° FileSaveAsPicture TabWorkSpace 输出为图片 ExportToPDF button TabWorkSpace 输出为PDF FileSaveAsPicture TabWorkSpace 输出为图片 ExportToPDF button None 输出为PDF SetLanguage button None 更改语言 SwitchFace None 皮肤 TabbarQAndA None FileMenu None TabHome tab None 开始 TabInsert tab None 插入 TabDesign None 设计 TabSecurity tab None 安全 TabWorkSpace tab None 云服务 TabStudentToolsLayout tab None TabAddIns None 加载项 ExportToPDF button None 输出为PDF QAT_Menu None 快速访问菜单 FileNewBlankDocument button None 新建空白文档 FileOpen button None 打开 FileSave button None 保存

FilePrint button None 打印 FilePrintPreview button None 打印 FilePrintQuick button None 直接打印 FilePrintPreview button None 打印预览 Redo gallery None 恢复 FormatPainter None 格式刷 comboBox None 字体 WindowMoreWindowsDialog button None 增大段落行距 ObjectsRegroup button None 组合 FileMenuSendMail None 发送邮件 ContextMenuShape contextMenu None 形状 ContextMenuTextEdit contextMenu None 文字编辑 PicturesCompress button None 压缩图片 VisualBasic button None WPS 宏编辑器 SelectAll button None 全选 Bold toggleButton None 加粗 Copy button None 复制 FindDialogExcel button None 查找 ReplaceDialog button None 替换 Italic toggleButton None 倾斜 FileNewBlankDocument button None 新建空白文档 FileNewBlankDocument button None 新建空白文档 button None 新建空白文档 FileNew button None 新建空白文档 PageSetupDialog button None 页面设置 Properties button None 属性 FileSave button None 保存 FontSizeDecrease button None 减小字号 FontSizeIncrease button None 增大字号 Underline toggleButton None 下划线 Paste button None 粘贴 Cut button None 剪切 FileSaveAs button None 另存为 ViewSlideShowView None 幻灯片放映 button None 同义词库 IndentDecreaseExcel button None 减少缩进量 IndentIncreaseExcel button None 增加缩进量 SlideShowFromCurrent None 当页开始 ApplicationExit button None 退出 BorderBottomNoToggle button None 下框线 BorderTop toggleButton None 上框线 BorderLeft toggleButton None 左框线 BorderRight toggleButton None 右框线 BordersAll button None 所有框线 BorderOutside button None 外侧框线 ThemeBrowseForThemesPowerPoint None 导入模板 SlideShowFromBeginning None 从头开始

FileNewFromTemplate button None 本机上的模板 GradientGallery gallery None 渐变 FileSaveAsMenu menu None 另存为 FileSaveAsDps button None WPS 演示 文件（*.dps） PowerPoint 97-2003 文件 FileSaveAsPpt button None （*.ppt） PowerPoint 97-2003 模板文件 FileSaveAsPot button None （*.pot） PowerPoint 97-2003 放映文件 FileSaveAsPps button None （*.pps） FileSaveAsOtherFormats button None 其他格式 FileSaveAsPdfOrXps button None 输出为PDF EquationInsertGallery None 公式 EquationInsertNew None 插入新公式 button None 重设形状和大小 PresentationToolRibbon None FileSaveAsPicture None (Context Menu) 输出为图片 FileCloseOrCloseAll button None (Context Menu) 关闭 FileCloseAll button None (Context Menu) 关闭所有文档 FileCloseAll button None (Context Menu) 关闭所有文档 FileCloseAll button None (Context Menu) 关闭所有文档 SaveAll button None (Context Menu) 保存所有文档 FileExportToPDF button None (Context Menu) 输出为PDF格式 FileSaveAsOFD button None (Context Menu) 输出为OFD格式 SaveAll button None (Context Menu) 保存所有文档 SaveAll button None (Context Menu) 保存所有文档 FilePackageIntoFolder button None (Context Menu) 打包成文件夹 FilePackageIntoZip button None (Context Menu) 将演示文档打包成压缩文件 FileMenuSendMail button None (Context Menu) 发送邮件 FileEncrypt button None (Context Menu) 文件加密 PasteTextOnly None (Context Menu) 只粘贴文本 ClipArtInsert toggleButton None (Context Menu) 剪贴画 DataTable group None (Context Menu) 表格 MacroSecurity splitButton None (Context Menu) 安全性 FileBackupManagement None (Context Menu) 备份管理 ApplicationOptionsDialog None (Context Menu) 选项 SetLanguage button None (Context Menu) 更改语言 ViewSlideShowView None (Context Menu) 观看放映 SlideShowRehearseTimings None (Context Menu) 排练计时 SlideShowCustom None (Context Menu) 自定义放映 BlogHomePage button None (Context Menu) WPS官方网站 ObjectsRegroup button None (Context Menu) 组合 ObjectsUngroup button None (Context Menu) 取消组合 ObjectBringToFront button None (Context Menu) 置于顶层 ObjectSendToBack button None (Context Menu) 置于底层 ObjectBringForward button None (Context Menu) 上移一层 ObjectSendBackward button None (Context Menu) 下移一层 ObjectSetShapeDefaults button None (Context Menu) 设为默认形状样式

ObjectEditPoints toggleButton None (Context Menu) 编辑顶点 SheetColumnsDelete button None (Context Menu) 删除列 SplitCells button None (Context Menu) 拆分单元格 Magnifier checkBox None (Context Menu) 放大 InkColorPicker gallery None (Context Menu) 墨迹颜色 InkColorPicker gallery None (Context Menu) 墨迹颜色 OrganizationChartInsertSubordinate button None (Context Menu) 下属 OrganizationChartInsertCoworker button None (Context Menu) 同事 OrganizationChartInsertAssistant button None (Context Menu) 助手 SmartArtOrganizationChartStandard button None (Context Menu) 标准 SmartArtOrganizationChartBoth button None (Context Menu) 两边悬挂 SmartArtOrganizationChartLeftHanging button None (Context Menu) 左悬挂 SmartArtOrganizationChartRightHanging button None (Context Menu) 右悬挂 OrganizationChartSelectLevel button None (Context Menu) 级别 OrganizationChartSelectBranch button None (Context Menu) 分支 ShapeStraightConnectorArrow toggleButton None (Context Menu) 直线连接符 ControlProperties button None (Context Menu) 属性 DiagramChangeToCycleClassic button None (Context Menu) 循环型 DiagramChangeToRadialClassic button None (Context Menu) 射线型 DiagramChangeToPyramidClassic button None (Context Menu) 棱锥型 DiagramChangeToVennDiagramClassic button None (Context Menu) 维恩型 DiagramChangeToTargetClassic button None (Context Menu) 目标图 ReviewNewComment button None (Context Menu) 插入批注 Cut button None (Context Menu) 剪切 Copy button None (Context Menu) 复制 PasteTextOnly None (Context Menu) 无格式文本 PasteSpecialDialog button None (Context Menu) 选择性粘贴 Paste button None (Context Menu) 粘贴 comboBox None (Context Menu) 字号 comboBox None (Context Menu) 字体 TextHighlightColorPicker gallery None (Context Menu) button None (Context Menu) 粘贴 ObjectBringToFront button None (Context Menu) 置于顶层 ObjectSendToBack button None (Context Menu) 置于底层 FileMenuPackageMenu menu None (Context Menu) 文件打包 ObjectsUngroup button None (Context Menu) 取消组合 FontSizeIncrease button None (Context Menu) 增大字号 FontSizeDecrease button None (Context Menu) 减小字号

本文档由公众号【Excel催化剂】整理完成，更多其他资料获取请关注公众号

# 文档说明文档说明

### 根对象根对象

帮助文档中所有的代码示例均是从Application根对象开始获取下面的对象，对于老版本的WPS应用程序， 根对象是wps.Application，需要注意区别。

### 枚举类型枚举类型

在WPS宏编辑器环境（JDE）是可以直接访问的，但是在加载项环境中需要从枚举对象（Application.Enu m)中获取，以下示例为给当前文档第一个段落左边框设置线宽

示例代码示例代码 复制复制

Application.ActiveDocument.Paragraphs.Item(1) .Borders.Item(Application.Enum.wdBorderLeft).LineWidth = Application.Enum.wdLineWidth025pt