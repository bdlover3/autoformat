# WdKey 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定键盘字符。虽然大写字符和小写字符通过字符编码映射中的不同值指定，但它们共用此枚举中的单个常量

。

名称名称 值值 说明说明 wdKey0 48 0 键。 wdKey1 49 1 键。 wdKey2 50 2 键。 wdKey3 51 3 键。 wdKey4 52 4 键。 wdKey5 53 5 键。 wdKey6 54 6 键。 wdKey7 55 7 键。 wdKey8 56 8 键。 wdKey9 57 9 键。 wdKeyA 65 A 键。 wdKeyAlt 1024 Alt 键。 wdKeyB 66 B 键。 wdKeyBackSingleQuote 192 ` 键。 wdKeyBackSlash 220 \ 键。 wdKeyBackspace 8 Backspace 键。 wdKeyC 67 C 键。 wdKeyCloseSquareBrace 221 ] 键。 wdKeyComma 188 , 键。 wdKeyCommand 512 Windows 命令键或 Macintosh Command 键。 wdKeyControl 512 Ctrl 键。 wdKeyD 68 D 键。 wdKeyDelete 46 Delete 键。 wdKeyE 69 E 键。 wdKeyEnd 35 End 键。 wdKeyEquals 187 = 键。 wdKeyEsc 27 Esc 键。 wdKeyF 70 F 键。 wdKeyF1 112 F1 键。 wdKeyF10 121 F10 键。 wdKeyF11 122 F11 键。 wdKeyF12 123 F12 键。 wdKeyF13 124 F13 键。 wdKeyF14 125 F14 键。 wdKeyF15 126 F15 键。 wdKeyF16 127 F16 键。 wdKeyF2 113 F2 键。 wdKeyF3 114 F3 键。

wdKeyF3 114 F3 键。 wdKeyF4 115 F4 键。 wdKeyF5 116 F5 键。 wdKeyF6 117 F6 键。 wdKeyF7 118 F7 键。 wdKeyF8 119 F8 键。 wdKeyF9 120 F9 键。 wdKeyG 71 G 键。 wdKeyH 72 H 键。 wdKeyHome 36 Home 键。 wdKeyHyphen 189 - 键。 wdKeyI 73 I 键。 wdKeyInsert 45 Insert 键。 wdKeyJ 74 J 键。 wdKeyK 75 K 键。 wdKeyL 76 L 键。 wdKeyM 77 M 键。 wdKeyN 78 N 键。 wdKeyNumeric0 96 0 键。 wdKeyNumeric1 97 1 键。 wdKeyNumeric2 98 2 键。 wdKeyNumeric3 99 3 键。 wdKeyNumeric4 100 4 键。 wdKeyNumeric5 101 5 键。 wdKeyNumeric5Special 12 . 键。 wdKeyNumeric6 102 6 键。 wdKeyNumeric7 103 7 键。 wdKeyNumeric8 104 8 键。 wdKeyNumeric9 105 9 键。 wdKeyNumericAdd 107 数字键盘上的 + 键。 wdKeyNumericDecimal 110 数字键盘上的 . 键。 wdKeyNumericDivide 111 数字键盘上的 / 键。 wdKeyNumericMultiply 106 数字键盘上的 * 键。 wdKeyNumericSubtract 109 数字键盘上的 - 键。 wdKeyO 79 O 键。 wdKeyOpenSquareBrace 219 [ 键。 wdKeyOption 1024 鼠标选项键或 Macintosh Option 键。 wdKeyP 80 P 键。 wdKeyPageDown 34 Page Down 键。 wdKeyPageUp 33 Page Up 键。 wdKeyPause 19 Pause 键。 wdKeyPeriod 190 . 键。 wdKeyQ 81 Q 键。 wdKeyR 82 R 键。 wdKeyReturn 13 Enter 或 Retrun 键。 wdKeyS 83 S 键。 wdKeyScrollLock 145 Scroll Lock 键。

wdKeySemiColon 186 ; 键。 wdKeyShift 256 Shift 键。 wdKeySingleQuote 222 ' 键。 wdKeySlash 191 / 键。 wdKeySpacebar 32 空格键。 wdKeyT 84 T 键。 wdKeyTab 9 Tab 键。 wdKeyU 85 U 键。 wdKeyV 86 V 键。 wdKeyW 87 W 键。 wdKeyX 88 X 键。 wdKeyY 89 Y 键。 wdKeyZ 90 Z 键。 wdNoKey 255 没有键。

# BackstageGroupStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于定义“文件文件”选项卡上的组样式的常量。

名称名称 值值 说明说明 BackstageGroupStyleError 2 错误样式。 BackstageGroupStyleNormal 0 正常样式。 BackstageGroupStyleWarning 1 警告样式。

# CertificateDetail 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

提供有关数字证书的信息。

名称名称 值值 说明说明 certdetAvailable 0 指定可用于签署的数字证书。 certdetExpirationDate 3 证书的到期日期。 certdetIssuer 2 证书的颁发机构。 certdetSubject 1 对应于公钥的私钥的持有者。 certdetThumbprint 4 证书的全部内容的哈希。

# CertificateVerificationResults 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

提供验证数字证书的结果。

名称名称 值值 说明说明 certverresError 0 验证导致了错误。 certverresExpired 5 证书已过期。 certverresInvalid 4 证书无效。 certverresRevoked 6 证书已吊销。 certverresUntrusted 7 证书来自不受信任的源。 certverresUnverified 2 证书当前未经验证。 certverresValid 3 证书有效。 certverresVerifying 1 证书当前正在验证。

# ContentVerificationResults 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

提供验证文档内容是否已更改的状态。

名称名称 值值 说明说明 contverresError 0 验证导致了错误。 contverresModified 4 文档内容自从经过数字签名之后已修改。 contverresUnverified 2 文档尚未验证。 contverresValid 3 文档内容已验证且有效。 contverresVerifying 1 文档内容当前正在验证。

# MailFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定电子邮件正文的显示方式。

名称名称 值值 说明说明 mfHTML 2 电子邮件显示为超文本标记语言 (HTML)。 mfPlainText 1 电子邮件显示为纯文本。 mfRTF 3 电子邮件显示为 RTF 格式 (RTF)。

# MsoAlertCancelType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在用户取消警告时的行为。当前仅支持 msoAlertCancelDefault。

名称名称 值值 说明说明 msoAlertCancelDefault -1 取消警告的默认行为。 msoAlertCancelFifth 4 不支持。 msoAlertCancelFirst 0 不支持。 msoAlertCancelFourth 3 不支持。 msoAlertCancelSecond 1 不支持。 msoAlertCancelThird 2 不支持。

# MsoAlertIconType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在警告中显示哪个图标（如果有）。

名称名称 值值 说明说明 msoAlertIconCritical 1 显示“重要重要 ”图标。 msoAlertIconInfo 4 显示“信息信息 ”图标。 msoAlertIconNoIcon 0 在警告消息中不显示图标。 msoAlertIconQuery 2 显示“查询查询 ”图标。 msoAlertIconWarning 3 显示“警告警告 ”图标。

# MsoAlignCmd 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

定义指定对象相互之间的对齐方式。

名称名称 值值 说明说明 msoAlignBottoms 5 指定对象底端对齐。 msoAlignCenters 1 指定对象中心对齐。 msoAlignLefts 0 指定对象左侧对齐。 msoAlignMiddles 4 指定对象中部对齐。 msoAlignRights 2 指定对象右侧对齐。 msoAlignTops 3 指定对象顶端对齐。

# MsoAppLanguageID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 WPS Office应用程序中的语言设置。msoAppLanguageID 枚举与 Application 对象的 LanguageSetting s 成员一起使用，确定安装语言、用户界面语言或“帮助”语言。

名称名称 值值 说明说明 msoLanguageIDExeMode 4 执行模式语言。 msoLanguageIDHelp 3 “帮助”语言。 msoLanguageIDInstall 1 安装语言。 msoLanguageIDUI 2 用户界面语言。 msoLanguageIDUIPrevious 5 在当前用户界面语言之前使用的用户界面语言。

# MsoArrowheadLength 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端的箭头长度。

名称名称 值值 说明说明 msoArrowheadLengthMedium 2 中等。 msoArrowheadLengthMixed -2 只返回值，表示指定形状范围中其他状态的组合。 msoArrowheadLong 3 长。 msoArrowheadShort 1 短。

# MsoArrowheadStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端的箭头样式。

名称名称 值值 说明说明 msoArrowheadDiamond 5 菱形。 msoArrowheadNone 1 无箭头。 msoArrowheadOpen 3 开放。 msoArrowheadOval 6 椭圆形。 msoArrowheadStealth 4 燕尾形。 msoArrowheadStyleMixed -2 只返回值，表示其他状态的组合。 msoArrowheadTriangle 2 三角形。

# MsoArrowheadWidth 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端的箭头宽度。

名称名称 值值 说明说明 msoArrowheadNarrow 1 窄。 msoArrowheadWide 3 宽。 msoArrowheadWidthMedium 2 中等。 msoArrowheadWidthMixed -2 只返回值，表示其他状态的组合。

# MsoAutomationSecurity 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在以编程方式打开文件时应用程序所使用的安全模式。

名称名称 值值 说明说明 msoAutomationSecurityByUI 2 使用“安全性安全性 ”对话框中指定的安全设置。 msoAutomationSecurityForceDisable 3 禁用以编程方式打开的所有文件中的所有宏，而不显示任何安全警告。 msoAutomationSecurityLow 1 启用所有的宏。此为启动应用程序时的默认值。

# MsoAutoShapeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 AutoShape 对象的形状类型。

名称名称 值值 说明说明 msoShape16pointStar 94 十六角星。 msoShape24pointStar 95 二十四角星。 msoShape32pointStar 96 三十二角星。 msoShape4pointStar 91 四角星。 msoShape5pointStar 92 五角星。 msoShape8pointStar 93 八角星。 msoShapeActionButtonBackorPrevious 129 “后退后退 ”或“上一个上一个 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonBeginning 131 “开始开始 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonCustom 125 不带默认图片或文本的按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonDocument 134 “文档文档 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonEnd 132 “结束结束 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonForwardorNext 130 “前进前进 ”或“下一个下一个 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonHelp 127 帮助帮助 按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonHome 126 “主页主页 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonInformation 128 “信息信息 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonMovie 136 “影片影片 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonReturn 133 “返回返回 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeActionButtonSound 135 “声音声音 ”按钮。支持鼠标单击和鼠标移过操作。 msoShapeArc 25 弧形。 msoShapeBalloon 137 气球。 msoShapeBentArrow 41 带 90 度圆角的箭头。 msoShapeBentUpArrow 44 带 90 度直角的箭头。默认情况下上指。 msoShapeBevel 15 凹凸效果。 msoShapeBlockArc 20 空心弧。 msoShapeCan 13 圆柱形。 msoShapeChevron 52 V 形。 msoShapeCircularArrow 60 带 180 度圆角的箭头。 msoShapeCloudCallout 108 云形标注。 msoShapeCross 11 十字形。 msoShapeCube 14 立方。

msoShapeCurvedDownArrow 48 上弧形箭头。 msoShapeCurvedDownRibbon 100 下凸弯带形横幅。 msoShapeCurvedLeftArrow 46 右弧形箭头。 msoShapeCurvedRightArrow 45 左弧形箭头。 msoShapeCurvedUpArrow 47 下弧形箭头。 msoShapeCurvedUpRibbon 99 上凸弯带形。 msoShapeDiamond 4 菱形。 msoShapeDonut 18 环形。 msoShapeDoubleBrace 27 双大括号。 msoShapeDoubleBracket 26 双括号。 msoShapeDoubleWave 104 双波形。 msoShapeDownArrow 36 下箭头。 msoShapeDownArrowCallout 56 带下箭头的标注。 msoShapeDownRibbon 98 中心区域位于弯带末端下方的弯带形。 msoShapeExplosion1 89 爆炸形。 msoShapeExplosion2 90 爆炸形。 msoShapeFlowchartAlternateProcess 62 其他过程流程图符号。 msoShapeFlowchartCard 75 资料卡流程图符号。 msoShapeFlowchartCollate 79 对照流程图符号。 msoShapeFlowchartConnector 73 联系流程图符号。 msoShapeFlowchartData 64 数据流程图符号。 msoShapeFlowchartDecision 63 决策流程图符号。 msoShapeFlowchartDelay 84 延期流程图符号。 msoShapeFlowchartDirectAccessStorage 87 磁鼓流程图符号。 msoShapeFlowchartDisplay 88 显示流程图符号。 msoShapeFlowchartDocument 67 文档流程图符号。 msoShapeFlowchartExtract 81 摘录流程图符号。 msoShapeFlowchartInternalStorage 66 内部贮存流程图符号。 msoShapeFlowchartMagneticDisk 86 磁盘流程图符号。 msoShapeFlowchartManualInput 71 手动输入流程图符号。 msoShapeFlowchartManualOperation 72 手动操作流程图符号。 msoShapeFlowchartMerge 82 合并流程图符号。 msoShapeFlowchartMultidocument 68 多文档流程图符号。 msoShapeFlowchartOffpageConnector 74 离页连接符流程图符号。 msoShapeFlowchartOr 78 “或者”流程图符号。 msoShapeFlowchartPredefinedProcess 65 预定义过程流程图符号。 msoShapeFlowchartPreparation 70 准备流程图符号。 msoShapeFlowchartProcess 61 过程流程图符号。 msoShapeFlowchartPunchedTape 76 资料带流程图符号。 msoShapeFlowchartSequentialAccessStorage 85 磁带流程图符号。 msoShapeFlowchartSort 80 排序流程图符号。 msoShapeFlowchartStoredData 83 库存数据流程图符号。 msoShapeFlowchartSummingJunction 77 汇总连接流程图符号。 msoShapeFlowchartTerminator 69 终止流程图符号。 msoShapeFoldedCorner 16 折角形。 msoShapeHeart 21 心形。 msoShapeHexagon 10 六边形。

msoShapeHexagon 10 六边形。 msoShapeHorizontalScroll 102 横卷形。 msoShapeIsoscelesTriangle 7 等腰三角形。 msoShapeLeftArrow 34 左箭头。 msoShapeLeftArrowCallout 54 带左箭头的标注。 msoShapeLeftBrace 31 左大括号。 msoShapeLeftBracket 29 左括号。 msoShapeLeftRightArrow 37 左右双向箭头。 msoShapeLeftRightArrowCallout 57 带左右双向箭头的标注。 msoShapeLeftRightUpArrow 40 左右上三向箭头。 msoShapeLeftUpArrow 43 左上双向箭头。 msoShapeLightningBolt 22 闪电形。 msoShapeLineCallout1 109 带边框和水平标注线的标注。 msoShapeLineCallout1AccentBar 113 带水平强调线的标注。 msoShapeLineCallout1BorderandAccentBar 121 带边框和水平强调线的标注。 msoShapeLineCallout1NoBorder 117 带水平线的标注。 msoShapeLineCallout2 110 带对角直线的标注。 msoShapeLineCallout2AccentBar 114 带对角标注线和强调线的标注。 msoShapeLineCallout2BorderandAccentBar 122 带边框、对角直线和强调线的标注。 msoShapeLineCallout2NoBorder 118 不带边框和对角标注线的标注。 msoShapeLineCallout3 111 带倾斜线的标注。 msoShapeLineCallout3AccentBar 115 带倾斜标注线和强调线的标注。 msoShapeLineCallout3BorderandAccentBar 123 带边框、倾斜标注线和强调线的标注。 msoShapeLineCallout3NoBorder 119 不带边框和倾斜标注线的标注。 msoShapeLineCallout4 112 带 U 型标注线段的标注。 msoShapeLineCallout4AccentBar 116 带强调线和 U 型标注线段的标注。 msoShapeLineCallout4BorderandAccentBar 124 带边框、强调线和 U 型标注线段的标注。 msoShapeLineCallout4NoBorder 120 不带边框和 U 型标注线段的标注。 msoShapeMixed -2 只返回值，表示其他状态的组合。 msoShapeMoon 24 新月形。 msoShapeNoSymbol 19 禁止符。 msoShapeNotchedRightArrow 50 燕尾形右箭头。 msoShapeNotPrimitive 138 不支持。 msoShapeOctagon 6 八边形。 msoShapeOval 9 椭圆形。 msoShapeOvalCallout 107 椭圆形标注。 msoShapeParallelogram 2 平行四边形。 msoShapePentagon 51 五边形。 msoShapePlaque 28 缺角矩形。 msoShapeQuadArrow 39 四向箭头。 msoShapeQuadArrowCallout 59 带四向箭头的标注。 msoShapeRectangle 1 矩形。 msoShapeRectangularCallout 105 矩形标注。 msoShapeRegularPentagon 12 五边形。 msoShapeRightArrow 33 右箭头。 msoShapeRightArrowCallout 53 带右箭头的标注。 msoShapeRightBrace 32 右大括号。 msoShapeRightBracket 30 右括号。

msoShapeRightBracket 30 右括号。 msoShapeRightTriangle 8 直角三角形。 msoShapeRoundedRectangle 5 圆角矩形。 msoShapeRoundedRectangularCallout 106 圆角矩形标注。 msoShapeSmileyFace 17 笑脸。 msoShapeStripedRightArrow 49 尾部带条纹的右箭头。 msoShapeSun 23 太阳。 msoShapeTrapezoid 3 梯形。 msoShapeUpArrow 35 上箭头。 msoShapeUpArrowCallout 55 带上箭头的标注。 msoShapeUpDownArrow 38 上下双向箭头。 msoShapeUpDownArrowCallout 58 带上下双向箭头的标注。 msoShapeUpRibbon 97 中心区域位于弯带末端上方的弯带形横幅。 msoShapeUTurnArrow 42 U 型箭头。 msoShapeVerticalScroll 101 竖卷形。 msoShapeWave 103 波形。

# MsoAutoSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

确定允许的自动调整大小的类型。

名称名称 值值 说明说明 msoAutoSizeMixed -2 使用自动调整大小方案的组合。 msoAutoSizeNone 0 不自动调整大小。 msoAutoSizeShapeToFitText 1 根据文本调整形状。 msoAutoSizeTextToFitShape 2 根据形状调整文本。

# MsoBackgroundStyleIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示对象的背景样式。

名称名称 值值 说明说明 msoBackgroundStyle1 1 指定 Style1。 msoBackgroundStyle10 10 指定 Style10。 msoBackgroundStyle11 11 指定 Style11。 msoBackgroundStyle12 12 指定 Style12。 msoBackgroundStyle2 2 指定 Style2。 msoBackgroundStyle3 3 指定 Style3。 msoBackgroundStyle4 4 指定 Style4。 msoBackgroundStyle5 5 指定 Style5。 msoBackgroundStyle6 6 指定 Style6。 msoBackgroundStyle7 7 指定 Style7。 msoBackgroundStyle8 8 指定 Style8。 msoBackgroundStyle9 9 指定 Style9。 msoBackgroundStyleMixed -2 指定样式组合。 msoBackgroundStyleNone 0 不指定样式。

# MsoBarPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏的位置或行为。

名称名称 值值 说明说明 msoBarBottom 3 命令栏固定在应用程序窗口的底部。 msoBarFloating 4 命令栏浮动在应用程序窗口顶端。 msoBarLeft 0 命令栏固定在应用程序窗口的左侧。 msoBarMenuBar 6 命令栏将为菜单栏（仅限 Macintosh）。 msoBarPopup 5 命令栏将为快捷菜单。 msoBarRight 2 命令栏固定在应用程序窗口的右侧。 msoBarTop 1 命令栏固定在应用程序窗口的顶部。

# MsoBarProtection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何防止用户对命令栏进行自定义。

名称名称 值值 说明说明 msoBarNoChangeDock 16 不能更改停靠设置。 msoBarNoChangeVisible 8 不能隐藏命令栏。 msoBarNoCustomize 1 不能自定义命令栏。 msoBarNoHorizontalDock 64 命令栏不能固定在顶部或底部。 msoBarNoMove 4 不能移动命令栏。 msoBarNoProtection 0 用户可以自定义命令栏的所有方面。 msoBarNoResize 2 不能调整命令栏的大小。 msoBarNoVerticalDock 32 命令栏不能固定在左侧或右侧。

# MsoBarRow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏是位于相对于同一停靠区域中的其他命令栏的第一行还是最后一行。

名称名称 值值 说明说明 msoBarRowFirst 0 停靠区域的第一行。 msoBarRowLast -1 停靠区域的最后一行。

# MsoBarType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏的类型。

名称名称 值值 说明说明 msoBarTypeMenuBar 1 菜单栏。 msoBarTypeNormal 0 默认菜单栏。 msoBarTypePopup 2 快捷菜单。

# MsoBaselineAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定基线文本对齐方式。

名称名称 值值 说明说明 msoBaselineAlignAuto 5 自动对齐。 msoBaselineAlignBaseline 1 基线对齐。 msoBaselineAlignCenter 3 居中对齐。 msoBaselineAlignFarEast50 4 远东 50 对齐。 msoBaselineAlignMixed -2 只返回值，表示其他状态的组合。 msoBaselineAlignTop 2 靠上对齐。

# MsoBevelType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指示 ThreeDFormat 对象的凹凸效果类型。

名称名称 值值 说明说明 msoBevelAngle 6 指定 Angle 凹凸效果。 msoBevelArtDeco 13 指定 ArtDeco 凹凸效果。 msoBevelCircle 3 指定 Circle 凹凸效果。 msoBevelConvex 8 指定 Convex 凹凸效果。 msoBevelCoolSlant 9 指定 CoolSlant 凹凸效果。 msoBevelCross 5 指定 Cross 凹凸效果。 msoBevelDivot 10 指定 Divot 凹凸效果。 msoBevelHardEdge 12 指定 HardEdge 凹凸效果。 msoBevelNone 1 不指定凹凸效果。 msoBevelRelaxedInset 2 指定 RelaxedInset 凹凸效果。 msoBevelRiblet 11 指定 Riblet 凹凸效果。 msoBevelSlope 4 指定 Slope 凹凸效果。 msoBevelSoftRound 7 指定 SoftRound 凹凸效果。 msoBevelTypeMixed -2 指定混和类型凹凸效果。

# MsoBlackWhiteMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在以黑白模式查看时如何显示形状。

名称名称 值值 说明说明 msoBlackWhiteAutomatic 1 默认行为。 msoBlackWhiteBlack 8 黑色。 msoBlackWhiteBlackTextAndLine 6 白色轮廓，灰度填充。 msoBlackWhiteDontShow 10 不显示。 msoBlackWhiteGrayOutline 5 灰色轮廓，白色填充。 msoBlackWhiteGrayScale 2 灰度。 msoBlackWhiteHighContrast 7 黑色轮廓，白色填充。 msoBlackWhiteInverseGrayScale 4 逆转灰度。 msoBlackWhiteLightGrayScale 3 浅灰度。 msoBlackWhiteMixed -2 不支持。 msoBlackWhiteWhite 9 白色。

# MsoBlogCategorySupport 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定提供程序支持多少个类别。

名称名称 值值 说明说明 msoBlogMultipleCategories 2 支持多个类别。 msoBlogNoCategories 0 不支持任何类别。 msoBlogOneCategory 1 支持一个类别。

# MsoBlogImageType 枚举。枚举。

本文档由公众号【Excel催化剂】整理制作完成

指定博客图像类型。

名称名称 值值 说明说明 msoBlogImageTypeGIF 2 GIF 图像。 msoBlogImageTypeJPEG 1 JPEG 图像。 msoBlogImageTypePNG 3 PNG 图像。

# MsoBulletType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定项目符号类型。

名称名称 值值 说明说明 msoBulletMixed -2 只返回值，表示其他状态的组合。 msoBulletNone 0 无项目符号。 msoBulletNumbered 2 编号项目符号。 msoBulletPicture 3 图片项目符号。 msoBulletUnnumbered 1 非编号项目符号。

# MsoButtonState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏按钮控件的外观。

名称名称 值值 说明说明 msoButtonDown -1 按钮已按下。 msoButtonMixed 2 按钮已按下。 msoButtonUp 0 按钮未按下。

# MsoButtonStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏按钮的样式。

名称名称 值值 说明说明 msoButtonAutomatic 0 默认行为。 msoButtonCaption 2 仅文本。 msoButtonIcon 1 仅图像。 msoButtonIconAndCaption 3 图像和文本，且文本位于图像的右侧。 msoButtonIconAndCaptionBelow 11 下方带文本的图像。 msoButtonIconAndWrapCaption 7 右侧带自动换行文本的图像。 msoButtonIconAndWrapCaptionBelow 15 下方带自动换行文本的图像。 msoButtonWrapCaption 14 仅文本，且文本居中并自动换行。

# MsoCalloutAngleType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定标注线与标注文本边框的夹角大小。

名称名称 值值 说明说明 msoCalloutAngle30 2 30° 角。 msoCalloutAngle45 3 45° 角。 msoCalloutAngle60 4 60° 角。 msoCalloutAngle90 5 90° 角。 msoCalloutAngleAutomatic 1 默认角度。在拖动对象时角度会发生更改。 msoCalloutAngleMixed -2 只返回值，表示其他状态的组合。

# MsoCalloutDropType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定相对于文本边界框的标注线起始位置。与 CalloutFormat 对象的 PresetDrop 方法一起使用。

名称名称 值值 说明说明 msoCalloutDropBottom 4 底部。 msoCalloutDropCenter 3 中心。 自定义。如果该值用作 PresetDrop 属性的值，则 CalloutFormat 对象的 Drop 和 msoCalloutDropCustom 1 AutoAttach 属性用于确定标注线连接到文本框的位置。 msoCalloutDropMixed -2 只返回值，表示其他状态的组合。 msoCalloutDropTop 2 顶部。

# MsoCalloutType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定标注线的类型。

名称名称 值值 说明说明 msoCalloutFour 4 标注线由两条线段组成，连接到文本边界框的右侧。 msoCalloutMixed -2 只返回值，表示其他状态的组合。 msoCalloutOne 1 单线段水平标注线。 msoCalloutThree 3 标注线由两条线段组成，连接到文本边界框的左侧。 msoCalloutTwo 2 单线段倾斜标注线。

# MsoCharacterSet 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定呈现文本时使用的字符集。

名称名称 值值 说明说明 msoCharacterSetArabic 1 阿拉伯字符集。 msoCharacterSetCyrillic 2 西里尔文字符集。 msoCharacterSetEnglishWesternEuropeanOtherLatinScript 3 英语、西欧和其他拉丁语种字符集。 msoCharacterSetGreek 4 希腊语字符集。 msoCharacterSetHebrew 5 希伯来语字符集。 msoCharacterSetJapanese 6 日语字符集。 msoCharacterSetKorean 7 朝鲜语字符集。 msoCharacterSetMultilingualUnicode 8 多语言 Unicode 字符集。 msoCharacterSetSimplifiedChinese 9 简体中文字符集。 msoCharacterSetThai 10 泰语字符集。 msoCharacterSetTraditionalChinese 11 繁体中文字符集。 msoCharacterSetVietnamese 12 越南语字符集。

# MsoChartElementType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是否显示图表元素以及如何显示。

名称名称 值值 说明说明 msoElementChartFloorNone 1200 不显示图表基底。 msoElementChartFloorShow 1201 显示图表基底。 msoElementChartTitleAboveChart 2 在图表上方显示标题。 msoElementChartTitleCenteredOverlay 1 将标题显示为居中覆盖。 msoElementChartTitleNone 0 不显示图表标题。 msoElementChartWallNone 1100 不显示图表背景墙。 msoElementChartWallShow 1101 显示图表背景墙。 msoElementDataLabelBestFit 210 使用数据标签最佳位置。 msoElementDataLabelBottom 209 在底部显示数据标签。 msoElementDataLabelCenter 202 居中显示数据标签。 msoElementDataLabelInsideBase 204 在底端内侧显示数据标签。 msoElementDataLabelInsideEnd 203 在顶端内侧显示数据标签。 msoElementDataLabelLeft 206 靠左显示数据标签。

msoElementDataLabelLeft 206 靠左显示数据标签。 msoElementDataLabelNone 200 不显示数据标签。 msoElementDataLabelOutSideEnd 205 在顶端外侧显示数据标签。 msoElementDataLabelRight 207 靠右显示数据标签。 msoElementDataLabelShow 201 显示数据标签。 msoElementDataLabelTop 208 在顶部显示数据标签。 msoElementDataTableNone 500 不显示模拟运算表。 msoElementDataTableShow 501 显示模拟运算表。 msoElementDataTableWithLegendKeys 502 显示带图例项标示的模拟运算表。 msoElementErrorBarNone 700 不显示误差线。 msoElementErrorBarPercentage 702 显示百分比误差线。 msoElementErrorBarStandardDeviation 703 显示标准偏差误差线。 msoElementErrorBarStandardError 701 显示标准误差线。 msoElementLegendBottom 104 在底部显示图例。 msoElementLegendLeft 103 在左侧显示图例。 msoElementLegendLeftOverlay 106 在左侧叠放图例。 msoElementLegendNone 100 不显示图例。 msoElementLegendRight 101 在右侧显示图例。 msoElementLegendRightOverlay 105 在右侧叠放图例。 msoElementLegendTop 102 在顶部显示图例。 msoElementLineDropHiLoLine 804 显示垂直线和高/低线。 msoElementLineDropLine 801 显示垂直线。 msoElementLineHiLoLine 802 显示高/低线。 msoElementLineNone 800 不显示线。 msoElementLineSeriesLine 803 显示系列线。 msoElementPlotAreaNone 1000 不显示绘图区。 msoElementPlotAreaShow 1001 显示绘图区。 msoElementPrimaryCategoryAxisBillions 374 使用十亿作为主分类轴单位。 msoElementPrimaryCategoryAxisLogScale 375 对主分类轴使用对数刻度。 msoElementPrimaryCategoryAxisMillions 373 使用百万作为主分类轴单位。 msoElementPrimaryCategoryAxisNone 348 不显示主分类轴。 msoElementPrimaryCategoryAxisReverse 351 反转主分类轴。 msoElementPrimaryCategoryAxisShow 349 显示主分类轴。 msoElementPrimaryCategoryAxisThousands 372 使用千作为主分类轴单位。 msoElementPrimaryCategoryAxisTitleAdjacentToAxis 301 紧邻轴显示主分类轴标题。 msoElementPrimaryCategoryAxisTitleBelowAxis 302 在轴下方显示主分类轴标题。 msoElementPrimaryCategoryAxisTitleHorizontal 305 水平显示主分类轴标题。 msoElementPrimaryCategoryAxisTitleNone 300 不显示主分类轴标题。 msoElementPrimaryCategoryAxisTitleRotated 303 旋转主分类轴标题。 msoElementPrimaryCategoryAxisTitleVertical 304 垂直显示主分类轴标题。 msoElementPrimaryCategoryAxisWithoutLabels 350 无标签显示主分类轴。 msoElementPrimaryCategoryGridLinesMajor 334 沿主分类轴显示主要网格线。 msoElementPrimaryCategoryGridLinesMinor 333 沿主分类轴显示次要网格线。 msoElementPrimaryCategoryGridLinesMinorMajor 335 沿主分类轴同时显示主要网格线和次要网格线。 msoElementPrimaryCategoryGridLinesNone 332 不沿主分类轴显示网格线。 msoElementPrimaryValueAxisBillions 356 使用十亿作为主数值轴单位。 msoElementPrimaryValueAxisLogScale 357 对主数值轴使用对数刻度。 msoElementPrimaryValueAxisMillions 355 使用百万作为主数值轴单位。

msoElementPrimaryValueAxisMillions 355 使用百万作为主数值轴单位。 msoElementPrimaryValueAxisNone 352 不显示主数值轴。 msoElementPrimaryValueAxisShow 353 显示主数值轴。 msoElementPrimaryValueAxisThousands 354 使用千作为主数值轴单位。 msoElementPrimaryValueAxisTitleAdjacentToAxis 306 紧邻轴放置主数值轴标题。 msoElementPrimaryValueAxisTitleBelowAxis 308 在轴下方放置主数值轴标题。 msoElementPrimaryValueAxisTitleHorizontal 311 水平显示主数值轴标题。 msoElementPrimaryValueAxisTitleNone 306 不显示主数值轴标题。 msoElementPrimaryValueAxisTitleRotated 309 旋转主数值轴标题。 msoElementPrimaryValueAxisTitleVertical 310 垂直显示主数值轴标题。 msoElementPrimaryValueGridLinesMajor 330 沿主数值轴显示主要网格线。 msoElementPrimaryValueGridLinesMinor 329 沿主数值轴显示次要网格线。 msoElementPrimaryValueGridLinesMinorMajor 331 沿主数值轴同时显示主要网格线和次要网格线。 msoElementPrimaryValueGridLinesNone 328 不沿主数值轴显示网格线。 msoElementSecondaryCategoryAxisBillions 378 使用十亿作为次分类轴单位。 msoElementSecondaryCategoryAxisLogScale 379 对次分类轴使用对数刻度。 msoElementSecondaryCategoryAxisMillions 377 使用百万作为次分类轴单位。 msoElementSecondaryCategoryAxisNone 358 不显示次分类轴。 msoElementSecondaryCategoryAxisReverse 361 反转次分类轴。 msoElementSecondaryCategoryAxisShow 359 显示次分类轴。 msoElementSecondaryCategoryAxisThousands 376 使用千作为次分类轴单位。 msoElementSecondaryCategoryAxisTitleAdjacentToAxis 313 紧邻轴显示次分类轴标题。 msoElementSecondaryCategoryAxisTitleBelowAxis 314 在轴下方显示次分类轴标题。 msoElementSecondaryCategoryAxisTitleHorizontal 317 水平显示次分类轴标题。 msoElementSecondaryCategoryAxisTitleNone 312 不显示次分类轴标题。 msoElementSecondaryCategoryAxisTitleRotated 315 旋转次分类轴标题。 msoElementSecondaryCategoryAxisTitleVertical 316 垂直显示次分类轴标题。 msoElementSecondaryCategoryAxisWithoutLabels 360 无标签显示次分类轴。 msoElementSecondaryCategoryGridLinesMajor 342 沿次分类轴显示主要网格线。 msoElementSecondaryCategoryGridLinesMinor 341 沿次分类轴显示次要网格线。 msoElementSecondaryCategoryGridLinesMinorMajor 343 沿次分类轴同时显示主要网格线和次要网格线。 msoElementSecondaryCategoryGridLinesNone 340 不沿次分类轴显示网格线。 msoElementSecondaryValueAxisBillions 366 使用十亿作为次数值轴单位。 msoElementSecondaryValueAxisLogScale 367 对次数值轴使用对数刻度。 msoElementSecondaryValueAxisMillions 365 使用百万作为次数值轴单位。 msoElementSecondaryValueAxisNone 362 不显示次数值轴。 msoElementSecondaryValueAxisShow 363 显示次数值轴。 msoElementSecondaryValueAxisThousands 364 使用千作为次数值轴单位。 msoElementSecondaryValueAxisTitleAdjacentToAxis 319 紧邻轴显示次数值轴标题。 msoElementSecondaryValueAxisTitleBelowAxis 320 在轴下方显示次数值轴标题。 msoElementSecondaryValueAxisTitleHorizontal 323 水平显示次数值轴标题。 msoElementSecondaryValueAxisTitleNone 318 不显示次数值轴标题。 msoElementSecondaryValueAxisTitleRotated 321 旋转次数值轴标题。 msoElementSecondaryValueAxisTitleVertical 322 垂直显示次数值轴标题。 msoElementSecondaryValueGridLinesMajor 338 沿次数值轴显示主要网格线。 msoElementSecondaryValueGridLinesMinor 337 沿次数值轴显示次要网格线。 msoElementSecondaryValueGridLinesMinorMajor 339 沿次数值轴同时显示主要网格线和次要网格线。

msoElementSecondaryValueGridLinesNone 336 不沿次数值轴显示网格线。 msoElementSeriesAxisGridLinesMajor 346 沿系列轴显示主要网格线。 msoElementSeriesAxisGridLinesMinor 345 沿系列轴显示次要网格线。 msoElementSeriesAxisGridLinesMinorMajor 347 沿系列轴同时显示主要网格线和次要网格线。 msoElementSeriesAxisGridLinesNone 344 不沿系列轴显示网格线。 msoElementSeriesAxisNone 368 不显示系列轴。 msoElementSeriesAxisReverse 371 反转系列轴。 msoElementSeriesAxisShow 369 显示系列轴。 msoElementSeriesAxisTitleHorizontal 327 水平显示系列轴标题。 msoElementSeriesAxisTitleNone 324 不显示系列轴标题。 msoElementSeriesAxisTitleRotated 325 旋转系列轴标题。 msoElementSeriesAxisTitleVertical 326 垂直显示系列轴标题。 msoElementSeriesAxisWithoutLabeling 370 不带标签显示系列轴标题。 msoElementTrendlineAddExponential 602 添加指数趋势线。 msoElementTrendlineAddLinear 601 添加线性趋势线。 msoElementTrendlineAddLinearForecast 603 添加线性预测。 msoElementTrendlineAddTwoPeriodMovingAverage 604 添加双周期移动平均。 msoElementTrendlineNone 600 不显示趋势线。 msoElementUpDownBarsNone 900 不显示涨/跌柱线。 msoElementUpDownBarsShow 901 显示涨/跌柱线。

# MsoClipboardFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定剪贴板格式。

名称名称 值值 说明说明 msoClipboardFormatHTML 2 HTML 格式。 msoClipboardFormatMixed -2 只返回值，表示其他状态的组合。 msoClipboardFormatNative 1 本机格式。 msoClipboardFormatPlainText 4 纯文本格式。 msoClipboardFormatRTF 3 RTF 格式。

# MsoColorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定颜色类型。

名称名称 值值 说明说明 msoColorTypeCMS 4 “颜色管理系统”颜色类型。 msoColorTypeCMYK 3 颜色由蓝绿色、洋红、黄色和黑色的值确定。 msoColorTypeInk 5 不支持。 msoColorTypeMixed -2 不支持。 msoColorTypeRGB 1 颜色由红色、绿色和蓝色的值确定。 msoColorTypeScheme 2 颜色由应用程序特定的方案定义。

# MsoComboStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏组合框是否包括标签。

名称名称 值值 说明说明 msoComboLabel 1 组合框包括由组合框的 Caption 属性指定的标签。 msoComboNormal 0 组合框不包括标签。

# MsoCommandBarButtonHyperlinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏按钮是否是超链接。如果命令栏按钮是超链接，则进一步指定该超链接是启动其他应用程序（例如

浏览器），还是在活动的选择点处插入图片。

名称名称 值值 说明说明 msoCommandBarButtonHyperlinkInsertPicture 2 单击命令栏按钮在活动的选择点处插入图片。 msoCommandBarButtonHyperlinkNone 0 命令栏按钮不是超链接。 单击命令栏按钮打开在该命令栏按钮的“TooltipText”属性中指定 msoCommandBarButtonHyperlinkOpen 1 的链接。

# MsoConnectorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定连接符的类型。

名称名称 值值 说明说明 msoConnectorCurve 3 曲线连接符。 msoConnectorElbow 2 肘形连接符。 msoConnectorStraight 1 直线连接符。 msoConnectorTypeMixed -2 只返回值，表示其他状态的组合。

# MsoContactCardAddressType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定联系人卡片的地址类型。

名称名称 值值 说明说明 msoContactCardAddressTypeUnknown 0 地址的未知标识符。 msoContactCardAddressTypeOutlook 1 Outlook 地址的唯一标识符。 msoContactCardAddressTypeSMTP 2 SMTP 地址的唯一标识符。 msoContactCardAddressTypeIM 1 IM 地址的唯一标识符。

# MsoContactCardStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何显示联系人卡片。

名称名称 值值 说明说明 msoContactCardFull 1 联系人卡片显示为完整卡片。 msoContactCardHover 0 联系人卡片显示为悬浮卡片。

# MsoContactCardType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定联系人卡片类型。

名称名称 值值 说明说明 msoContactCardTypeEnterpriseContact 0 企业联系人地址的联系人卡片。 msoContactCardTypePersonalContact 1 个人联系人地址的联系人卡片。 msoContactCardTypeUnknownContact 2 未知联系人地址的联系人卡片。 msoContactCardTypeEnterpriseGroup 3 企业通讯组列表联系人地址的联系人卡片。 msoContactCardTypePersonalDistributionList 4 个人通讯组列表联系人地址的联系人卡片。

# MsoControlOLEUsage 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OLE 客户端和 OLE 服务器角色，在合并两个 WPS Office应用程序时，会用到这些角色中的命令栏控件。

名称名称 值值 说明说明 msoControlOLEUsageBoth 3 控件既在客户端上运行，也在服务器上运行。 msoControlOLEUsageClient 2 仅在客户端上运行的控件。 msoControlOLEUsageNeither 0 控件既不在客户端运行，也不在服务器上运行。 msoControlOLEUsageServer 1 仅在服务器上运行的控件。

# MsoControlType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定命令栏控件的类型。与 CommandBarControls 对象的 Add 方法一起使用。通过 CommandBars 对象模 型只能创建一组有限的控件类型：msoControlButton、msoControlEdit、msoControlDropdown、msoCo ntrolComboBox、msoControlPopup 和 msoControlActiveX。其他控件类型可能存在于内置或加载项命令

栏上，但不能通过对象模型创建。

名称名称 值值 说明说明 msoControlActiveX 22 ActiveX 控件。 msoControlAutoCompleteCombo 26 在用户键入时自动填充第一个匹配选项的组合框。不能通过对象模型创建。 msoControlButton 1 命令按钮。 msoControlButtonDropdown 5 下拉按钮。不能通过对象模型创建。 msoControlButtonPopup 12 弹出式按钮。不能通过对象模型创建。 msoControlComboBox 4 组合框。 msoControlCustom 0 自定义控件。不能通过对象模型创建。 msoControlDropdown 3 下拉列表。 msoControlEdit 2 文本框。 msoControlExpandingGrid 16 展开网格。不能通过对象模型创建。 msoControlGauge 19 计量表控件。不能通过对象模型创建。 msoControlGenericDropdown 8 一般下拉列表。不能通过对象模型创建。 msoControlGraphicCombo 20 图形组合框。不能通过对象模型创建。 msoControlGraphicDropdown 9 图形下拉列表。不能通过对象模型创建。 msoControlGraphicPopup 11 图形弹出菜单。不能通过对象模型创建。 msoControlGrid 18 网格。不能通过对象模型创建。 msoControlLabel 15 标签。不能通过对象模型创建。 msoControlLabelEx 24 扩展标签。不能通过对象模型创建。 msoControlOCXDropdown 7 OCX 下拉列表。不能通过对象模型创建。 msoControlPane 21 窗格。不能通过对象模型创建。 msoControlPopup 10 弹出框。 msoControlSpinner 23 微调按钮。不能通过对象模型创建。 msoControlSplitButtonMRUPopup 14 最近使用过的 (MRU) 弹出框。不能通过对象模型创建。 msoControlSplitButtonPopup 13 拆分按钮弹出框。不能通过对象模型创建。 msoControlSplitDropdown 6 拆分下拉列表。不能通过对象模型创建。 msoControlSplitExpandingGrid 17 拆分展开网格。不能通过对象模型创建。 msoControlWorkPane 25 工作窗格。不能通过对象模型创建。

# MsoCTPDockPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定自定义任务窗格的停靠行为。

名称名称 值值 说明说明 msoCTPDockPositionBottom 3 将任务窗格停靠在文档窗口的底部。 msoCTPDockPositionFloating 4 不停靠任务窗格。 msoCTPDockPositionLeft 0 将任务窗格停靠在文档窗口的左侧。 msoCTPDockPositionRight 2 将任务窗格停靠在文档窗口的右侧。 msoCTPDockPositionTop 1 将任务窗格停靠在文档窗口的顶部。

# MsoCTPDockPositionRestrict 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对自定义任务窗格的停靠行为的限制。

名称名称 值值 说明说明 msoCTPDockPositionRestrictNoChange 1 任务窗格的当前限制设置没有更改。 msoCTPDockPositionRestrictNoHorizontal 2 任务窗格不能固定在文档窗口的右侧或左侧。 msoCTPDockPositionRestrictNone 0 对任务窗格的停靠没有限制。 msoCTPDockPositionRestrictNoVertical 3 任务窗格不能固定在文档窗口的顶部或底部。

# MsoCustomXMLNodeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定节点类型。

名称名称 值值 说明说明 msoCustomXMLNodeAttribute 2 节点是属性。 msoCustomXMLNodeCData 4 节点是 CData 类型。 msoCustomXMLNodeComment 8 节点是注释。 msoCustomXMLNodeDocument 9 节点是“文档”节点。 msoCustomXMLNodeElement 1 节点是元素。 msoCustomXMLNodeProcessingInstruction 7 节点是处理指令。 msoCustomXMLNodeText 3 节点是文本节点。

# MsoCustomXMLValidationErrorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示将如何清除或生成验证错误。

名称名称 值值 说明说明

指定当对错误所绑定到的节点进行任何更改时错误将自行 msoCustomXMLValidationErrorAutomaticallyCleared 1 清除。 msoCustomXMLValidationErrorManual 2 指定直到调用 Delete 方法时才清除错误。 指定当存在可用于自定义 XML 部分的非空架构集合且验证 msoCustomXMLValidationErrorSchemaGenerated 0 有效时，对该部分的任何更改都将导致验证错误。

# MsoDateTimeFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定日期/时间数据类型的格式。

名称名称 值值 说明说明 msoDateTimeddddMMMMddyyyy 2 指定 ddddMMMMddyyyy 格式。 msoDateTimedMMMMyyyy 3 指定 MMMMyyyy 格式。 msoDateTimedMMMyy 5 指定 MMMyy 格式。 msoDateTimeFigureOut 14 指定 Office 应用程序将确定该格式。 msoDateTimeFormatMixed -2 指定混和格式。 msoDateTimeHmm 10 指定 Hmm 格式。 msoDateTimehmmAMPM 12 指定 hmmAMPM 格式。 msoDateTimeHmmss 11 指定 Hmmss 格式。 msoDateTimehmmssAMPM 13 指定 hmmssAMPM 格式。 msoDateTimeMdyy 1 指定 Mdyy 格式。 msoDateTimeMMddyyHmm 8 指定 MMddyyHmm 格式。 msoDateTimeMMddyyhmmAMPM 9 指定 MMddyyhmmAMPM 格式。 msoDateTimeMMMMdyyyy 4 指定 MMMMdyyyy 格式。 msoDateTimeMMMMyy 6 指定 MMMMyy 格式。 msoDateTimeMMyy 7 指定 MMyy 格式。

# MsoDistributeCmd 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定如何平均分布图形集合。与 ShapeRange 集合的 Distribute 方法一起使用。

名称名称 值值 说明说明 msoDistributeHorizontally 0 水平分布。 msoDistributeVertically 1 垂直分布。

# MsoDocInspectorStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

代表运行文档检查器模块的结果。

名称名称 值值 说明说明 msoDocInspectorStatusDocOk 0 指示文档检查器模块未返回问题或错误。 msoDocInspectorStatusError 2 指示文档检查器模块返回了错误。 msoDocInspectorStatusIssueFound 1 指示文档检查器模块找到了一个或多个搜索条件匹配项。

# MsoDocProperties 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档属性的数据类型。

名称名称 值值 说明说明 msoPropertyTypeBoolean 2 Boolean 值。 msoPropertyTypeDate 3 Date 值。 msoPropertyTypeFloat 5 Floating point 值。 msoPropertyTypeNumber 1 Integer 值。 msoPropertyTypeString 4 String 值。

# MsoEditingType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定节点的编辑类型。

名称名称 值值 说明说明 msoEditingAuto 0 编辑类型适合于正在连接的线段。 msoEditingCorner 1 角部节点。 msoEditingSmooth 2 平滑结点。 msoEditingSymmetric 3 对称节点。

# MsoEncoding 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在用户查看保存的文档时 Web 浏览器所使用的文档编码（代码页或字符集）。

名称名称 值值 说明说明 msoEncodingArabic 1256 阿拉伯语。 msoEncodingArabicASMO 708 阿拉伯语 ASMO。 Web 浏览器自动检测要使用的阿 msoEncodingArabicAutoDetect 51256 拉伯语编码类型。 msoEncodingArabicTransparentASMO 720 透明阿拉伯语。 Web 浏览器自动检测要使用的编 msoEncodingAutoDetect 50001 码类型。 msoEncodingBaltic 1257 波罗的语。 msoEncodingCentralEuropean 1250 中欧字符。 msoEncodingCyrillic 1251 西里尔文。 Web 浏览器自动检测要使用的西 msoEncodingCyrillicAutoDetect 51251 里尔文编码类型。

扩充的二进制编码的十进制交换 msoEncodingEBCDICArabic 20420 码 (EBCDIC) 阿拉伯语。 msoEncodingEBCDICDenmarkNorway 20277 在丹麦和挪威使用的 EBCDIC。 msoEncodingEBCDICFinlandSweden 20278 在芬兰和瑞典使用的 EBCDIC。 msoEncodingEBCDICFrance 20297 在法国使用的 EBCDIC。 msoEncodingEBCDICGermany 20273 在德国使用的 EBCDIC。 msoEncodingEBCDICGreek 20423 用于希腊语的 EBCDIC。 msoEncodingEBCDICGreekModern 875 用于现代希腊语的 EBCDIC。 msoEncodingEBCDICHebrew 20424 用于希伯来语的 EBCDIC。 msoEncodingEBCDICIcelandic 20871 在冰岛使用的 EBCDIC。 msoEncodingEBCDICInternational 500 国际 EBCDIC。

msoEncodingEBCDICInternational 500 国际 EBCDIC。 msoEncodingEBCDICItaly 20280 在意大利使用的 EBCDIC。

用于日语片假名（扩充）的 msoEncodingEBCDICJapaneseKatakanaExtended 20290 EBCDIC。

用于日语片假名（扩充）和日语 msoEncodingEBCDICJapaneseKatakanaExtendedAndJapanese 50930 的 EBCDIC。

用于日语拉丁语（扩充）和日语 msoEncodingEBCDICJapaneseLatinExtendedAndJapanese 50939 的 EBCDIC。

用于朝鲜语（扩充）的 msoEncodingEBCDICKoreanExtended 20833 EBCDIC。

用于朝鲜语（扩充）和朝鲜语的 msoEncodingEBCDICKoreanExtendedAndKorean 50933 EBCDIC。

用于拉丁美洲和西班牙的 msoEncodingEBCDICLatinAmericaSpain 20284 EBCDIC。 EBCDIC 多语言 ROECE（拉丁语 msoEncodingEBCDICMultilingualROECELatin2 870 2）。 msoEncodingEBCDICRussian 20880 用于俄语的 EBCDIC。

用于塞尔维亚语和保加利亚语的 msoEncodingEBCDICSerbianBulgarian 21025 EBCDIC。

用于简体中文（扩充）和简体中 msoEncodingEBCDICSimplifiedChineseExtendedAndSimplifiedChinese 50935 文的 EBCDIC。 msoEncodingEBCDICThai 20838 用于泰语的 EBCDIC。 msoEncodingEBCDICTurkish 20905 用于土耳其语的 EBCDIC。 用于土耳其语（拉丁语 5）的 msoEncodingEBCDICTurkishLatin5 1026 EBCDIC。 msoEncodingEBCDICUnitedKingdom 20285 在英国使用的 EBCDIC。

在美国和加拿大使用的 msoEncodingEBCDICUSCanada 37 EBCDIC。

在美国和加拿大使用并用于日语 msoEncodingEBCDICUSCanadaAndJapanese 50931 的 EBCDIC。

在美国和加拿大使用并用于繁体 msoEncodingEBCDICUSCanadaAndTraditionalChinese 50937 中文的 EBCDIC。 用于中文和简体中文的扩展 UNIX msoEncodingEUCChineseSimplifiedChinese 51936 编码 (EUC)。 msoEncodingEUCJapanese 51932 用于日语的 EUC。 msoEncodingEUCKorean 51949 用于朝鲜语的 EUC。

用于台湾方言和繁体中文的 msoEncodingEUCTaiwaneseTraditionalChinese 51950 EUC。 msoEncodingEuropa3 29001 欧罗巴语。 msoEncodingExtAlphaLowercase 21027 扩展的 Alpha 小写字母。 msoEncodingGreek 1253 希腊语。 Web 浏览器自动检测要使用的希 msoEncodingGreekAutoDetect 51253 腊语编码类型。 msoEncodingHebrew 1255 希伯来语。 msoEncodingHZGBSimplifiedChinese 52936 简体中文 (HZGB)。 msoEncodingIA5German 20106 德语（国际字母表 5 或 IA5）。 msoEncodingIA5IRV 20105 IA5、国际参考版 (IRV)。 msoEncodingIA5Norwegian 20108 用于挪威语的 IA5。 msoEncodingIA5Swedish 20107 用于瑞典语的 IA5。

用于阿萨姆语的印度信息交换脚 msoEncodingISCIIAssamese 57006 本编码 (ISCII)。 msoEncodingISCIIBengali 57003 用于孟加拉语的 ISCII。 msoEncodingISCIIDevanagari 57002 用于梵文的 ISCII。 msoEncodingISCIIGujarati 57010 用于古吉拉特语的 ISCII。 msoEncodingISCIIKannada 57008 用于卡纳达语的 ISCII。

msoEncodingISCIIKannada 57008 用于卡纳达语的 ISCII。 msoEncodingISCIIMalayalam 57009 用于马拉雅拉姆语的 ISCII。 msoEncodingISCIIOriya 57007 用于奥里雅语的 ISCII。 msoEncodingISCIIPunjabi 57011 用于旁遮普语的 ISCII。 msoEncodingISCIITamil 57004 用于泰米尔语的 ISCII。 msoEncodingISCIITelugu 57005 用于泰卢固语的 ISCII。 用于简体中文的 ISO 2022-CN 编 msoEncodingISO2022CNSimplifiedChinese 50229 码。 用于繁体中文的 ISO 2022-CN 编 msoEncodingISO2022CNTraditionalChinese 50227 码。 msoEncodingISO2022JPJISX02011989 50222 ISO 2022-JP msoEncodingISO2022JPJISX02021984 50221 ISO 2022-JP 不带半角片假名的 ISO 2022- msoEncodingISO2022JPNoHalfwidthKatakana 50220 JP。 msoEncodingISO2022KR 50225 ISO 2022-KR。 msoEncodingISO6937NonSpacingAccent 20269 ISO 6937 无空格重音。 msoEncodingISO885915Latin9 28605 用于拉丁语 9 的 ISO 8859-15。 msoEncodingISO88591Latin1 28591 ISO 8859-1 拉丁语 1。 msoEncodingISO88592CentralEurope 28592 ISO 8859-2 中欧。 msoEncodingISO88593Latin3 28593 ISO 8859-3 拉丁语 3。 msoEncodingISO88594Baltic 28594 ISO 8859-4 波罗的语。 msoEncodingISO88595Cyrillic 28595 ISO 8859-5 西里尔文。 msoEncodingISO88596Arabic 28596 ISA 8859-6 阿拉伯语。 msoEncodingISO88597Greek 28597 ISO 8859-7 希腊语。 msoEncodingISO88598Hebrew 28598 ISO 8859-8 希伯来语。 msoEncodingISO88598HebrewLogical 38598 ISO 8859-8 希伯来语（逻辑）。 msoEncodingISO88599Turkish 28599 ISO 8859-9 土耳其语。 Web 浏览器自动检测要使用的日 msoEncodingJapaneseAutoDetect 50932 语编码类型。 msoEncodingJapaneseShiftJIS 932 日语 (Shift-JIS)。 msoEncodingKOI8R 20866 KOI8-R。 msoEncodingKOI8U 21866 K0I8-U。 msoEncodingKorean 949 朝鲜语。 Web 浏览器自动检测要使用的朝 msoEncodingKoreanAutoDetect 50949 鲜语编码类型。 msoEncodingKoreanJohab 1361 朝鲜语 (Johab)。 msoEncodingMacArabic 10004 Macintosh 阿拉伯语。 msoEncodingMacCroatia 10082 Macintosh 克罗地亚语。 msoEncodingMacCyrillic 10007 Macintosh 西里尔文。 msoEncodingMacGreek1 10006 Macintosh 希腊语。 msoEncodingMacHebrew 10005 Macintosh 希伯来语。 msoEncodingMacIcelandic 10079 Macintosh 冰岛语。 msoEncodingMacJapanese 10001 Macintosh 日语。 msoEncodingMacKorean 10003 Macintosh 朝鲜语。 msoEncodingMacLatin2 10029 Macintosh 拉丁语 2。 msoEncodingMacRoman 10000 Macintosh 罗马语。 msoEncodingMacRomania 10010 Macintosh 罗马尼亚语。 Macintosh 简体中文 (GB msoEncodingMacSimplifiedChineseGB2312 10008 2312)。 msoEncodingMacTraditionalChineseBig5 10002 Macintosh 繁体中文 (Big 5)。

msoEncodingMacTraditionalChineseBig5 10002 Macintosh 繁体中文 (Big 5)。 msoEncodingMacTurkish 10081 Macintosh 土耳其语。 msoEncodingMacUkraine 10017 Macintosh 乌克兰语。 msoEncodingOEMArabic 864 用于阿拉伯语的 OEM。 msoEncodingOEMBaltic 775 用于波罗的语的 OEM。 msoEncodingOEMCanadianFrench 863 用于加拿大法语的 OEM。 msoEncodingOEMCyrillic 855 用于西里尔文的 OEM。 msoEncodingOEMCyrillicII 866 用于西里尔文 II 的 OEM。 msoEncodingOEMGreek437G 737 用于希腊语 437G 的 OEM。 msoEncodingOEMHebrew 862 用于希伯来语的 OEM。 msoEncodingOEMIcelandic 861 用于冰岛语的 OEM。 msoEncodingOEMModernGreek 869 用于现代希腊语的 OEM。 msoEncodingOEMMultilingualLatinI 850 用于多语言拉丁语 I 的 OEM。 msoEncodingOEMMultilingualLatinII 852 用于多语言拉丁语 II 的 OEM。 msoEncodingOEMNordic 865 用于北欧语言的 OEM。 msoEncodingOEMPortuguese 860 用于葡萄牙语的 OEM。 msoEncodingOEMTurkish 857 用于土耳其语的 OEM。 msoEncodingOEMUnitedStates 437 在美国使用的 OEM。 Web 浏览器自动检测要使用的简 msoEncodingSimplifiedChineseAutoDetect 50936 体中文编码类型。 msoEncodingSimplifiedChineseGB18030 54936 简体中文 GB 18030。 msoEncodingSimplifiedChineseGBK 936 简体中文 GBK。 msoEncodingT61 20261 T61。 msoEncodingTaiwanCNS 20000 台湾 CNS。 msoEncodingTaiwanEten 20002 台湾 Eten。 msoEncodingTaiwanIBM5550 20003 台湾 IBM 5550。 msoEncodingTaiwanTCA 20001 台湾 TCA。 msoEncodingTaiwanTeleText 20004 台湾 Teletext。 msoEncodingTaiwanWang 20005 台湾 Wang。 msoEncodingThai 874 泰语。 Web 浏览器自动检测要使用的繁 msoEncodingTraditionalChineseAutoDetect 50950 体中文编码类型。 msoEncodingTraditionalChineseBig5 950 繁体中文 Big 5。 msoEncodingTurkish 1254 土耳其语。 msoEncodingUnicodeBigEndian 1201 Unicode big endian。 msoEncodingUnicodeLittleEndian 1200 Unicode little endian。 msoEncodingUSASCII 20127 美国 ASCII。 msoEncodingUTF7 65000 UTF-7 编码。 msoEncodingUTF8 65001 UTF-8 编码。 msoEncodingVietnamese 1258 越南语。 msoEncodingWestern 1252 西文。

# MsoExtraInfoMethod 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何使用 FollowHyperlink 方法的 ExtraInfo 属性中指定的值。

名称名称 值值 说明说明 msoMethodGet 0 ExtraInfo 属性中指定的值是追加到地址后面的字符串。 msoMethodPost 1 ExtraInfo 属性中指定的值以字符串或字节数组的形式发布。

# MsoExtrusionColorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定延伸区域的颜色是否基于原图形的填充（延伸区域的正面），并随着图形填充的改变而自动改变，或者延 伸区域的颜色是否与图形填充无关。与 ThreeDFormat 对象的 ExtrusionColorType 属性一起使用。

名称名称 值值 说明说明 msoExtrusionColorAutomatic 1 延伸区域的颜色基于图形填充。 msoExtrusionColorCustom 2 延伸区域的颜色独立于图形填充。 msoExtrusionColorTypeMixed -2 只返回值，表示其他状态的组合。

# MsoFarEastLineBreakLanguageID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定某种语言，该语言用于确定换行控制选项打开时所使用的换行级别。

名称名称 值值 说明说明 MsoFarEastLineBreakLanguageJapanese 1041 日语 MsoFarEastLineBreakLanguageKorean 1042 朝鲜语 MsoFarEastLineBreakLanguageSimplifiedChinese 2052 简体中文 MsoFarEastLineBreakLanguageTraditionalChinese 1028 繁体中文

# MsoFeatureInstall 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用程序如何处理对需要尚未安装的功能的方法和属性的调用。

名称名称 值值 说明说明 msoFeatureInstallNone 0 如果调用了未安装的功能，则在运行时生成一般的自动化错误。 msoFeatureInstallOnDemand 1 提示用户安装新功能。 msoFeatureInstallOnDemandWithUI 2 在安装时显示进度表；但不提示用户安装新功能。

# MsoFileDialogType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 FileDialog 对象的类型。

名称名称 值值 说明说明 msoFileDialogFilePicker 3 “文件选取器文件选取器 ”对话框。 msoFileDialogFolderPicker 4 “文件夹选取器文件夹选取器 ”对话框。 msoFileDialogOpen 1 “打开打开 ”对话框。 msoFileDialogSaveAs 2 “另存为另存为 ”对话框。

# MsoFileDialogView 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在文件对话框中为用户显示的视图。

名称名称 值值 说明说明 msoFileDialogViewDetails 2 文件以带有详细信息的列表形式显示。 msoFileDialogViewLargeIcons 6 文件显示为大图标。 msoFileDialogViewList 1 文件以不带详细信息的列表形式显示。 msoFileDialogViewPreview 4 文件以列表形式显示，并在预览窗格中显示选定的文件。 msoFileDialogViewProperties 3 文件以列表形式显示，并在一个窗格中显示选定文件的属性。 msoFileDialogViewSmallIcons 7 文件显示为小图标。 msoFileDialogViewThumbnail 5 文件显示为缩略图。 msoFileDialogViewTiles 9 文件显示为平铺图标。 msoFileDialogViewWebView 8 文件显示在 Web 视图中。

# MsoFileNewAction 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定在用户单击任务窗格中的项时所执行的操作。与 NewFile 对象的 Add 方法一起使用。

名称名称 值值 说明说明 msoCreateNewFile 1 新建文件。 msoEditFile 0 编辑文件。 msoOpenFile 2 打开文件。

# MsoFileNewSection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定要向其中添加文件或文件引用所在的任务窗格部分。与 NewFile 对象的 Add 方法和 Remove 方法一起使

用。

名称名称 值值 说明说明 msoBottomSection 4 “底部底部 ”部分。 msoNew 1 “新建新建 ”部分。 msoNewfromExistingFile 2 “根据现有文件新建根据现有文件新建 ”部分。 msoNewfromTemplate 3 “根据模板新建根据模板新建 ”部分。 msoOpenDocument 0 “打开文档打开文档 ”部分。

# MsoFileType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文件的类型。

名称名称 值值 说明说明 msoShadowStyleInnerShadow 1 所有文件。 文件的任何以下扩展名: *.doc、 .xls，.ppt、 *.pps、 *.obd、 *.mdb、 msoFileTypeOfficeFiles 2 .mpd，.dot、 .xlt，.pot、 *.obt、 *.htm，或 *.html。。 msoFileTypeWordDocuments 3 Word 文档文件 (*.doc)。 msoFileTypeExcelWorkbooks 4 Microsoft Excel 工作簿 (*.wbk)。 PowerPoint 演示文稿文件 (.ppt)，PowerPoint模板文件 (.pot)，或 msoFileTypePowerPointPresentations 5 PowerPoint 幻灯片放映文件 (*.pps)。 msoFileTypeBinders 6 Microsoft 活页夹文件 (*.obd)。 msoFileTypeDatabases 7 数据库文件 (*.mdb)。 Microsoft PowerPoint 模板 (.pot)，Word模板 (.dot)，Excel 模板 msoFileTypeTemplates 8 (*.xlt)。 msoFileTypeOutlookItems 9 任何 Microsoft Outlook 项目文件。 msoFileTypeMailItem 10 邮件项目文件 (*.msg)。 msoFileTypeCalendarItem 11 日历项目文件 （.ics或 *.vsc）。 msoFileTypeContactItem 12 联系人项目文件 (*.vcf)。 msoFileTypeNoteItem 13 Microsoft Outlook 会议纪录项目。 msoFileTypeJournalItem 14 Microsoft Outlook 日记项目 。 msoFileTypeTaskItem 15 Microsoft Outlook 任务项。 msoFileTypePhotoDrawFiles 16 PhotoDraw 项文件 (*.mix)。 msoFileTypeDataConnectionFiles 17 数据连接文件 (*.mdf)。 msoFileTypePublisherFiles 18 Microsoft Publisher 文件 (*.pub) 。 msoFileTypeProjectFiles 19 项目文件 (*.mpd)。 msoFileTypeDocumentImagingFiles 20 Microsoft Document Imaging 文件 (*.mdi)。 msoFileTypeVisioFiles 21 Microsoft Visio 文件 (*.vsd)。 msoFileTypeDesignerFiles 22 Visual Basic 活动设计器文件 (*.dsr)。 msoFileTypeWebPages 23 HTML 文件 (.htm或 *.html)。

# MsoFileValidationMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文件验证模式。

名称名称 值值 说明说明 msoFileValidationDefault 0 验证文件（默认）。 msoFileValidationSkip 1 不验证文件。

# MsoFillType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状的填充类型。

名称名称 值值 说明说明 msoFillBackground 5 填充与背景相同。 msoFillGradient 3 渐变填充。 msoFillMixed -2 混和填充。 msoFillPatterned 2 图案填充。 msoFillPicture 6 图片填充。 msoFillSolid 1 单色填充。 msoFillTextured 4 纹理填充。

# MsoFilterComparison 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何比较 ODSOFilter 对象的 Column 和 CompareTo 属性。

名称名称 值值 说明说明 如果 CompareTo 字符串的任意部分包含在列值中，则列与 CompareTo msoFilterComparisonContains 8 匹配。 msoFilterComparisonEqual 0 如果 CompareTo 值与列值相同，则列与 CompareTo 匹配。 msoFilterComparisonGreaterThan 3 如果列值大于 CompareTo 值，则列与 CompareTo 匹配。 msoFilterComparisonGreaterThanEqual 5 如果列值大于或等于 CompareTo 值，则列与 CompareTo 匹配。 msoFilterComparisonIsBlank 6 如果列为空，则列通过筛选。 msoFilterComparisonIsNotBlank 7 如果列为空，则列通过筛选。 msoFilterComparisonLessThan 2 如果列值小于 CompareTo 值，则列与 CompareTo 匹配。 msoFilterComparisonLessThanEqual 4 如果列值小于或等于 CompareTo 值，则列与 CompareTo 匹配。 如果 CompareTo 字符串的任何部分都未包含在列值中，则列与 msoFilterComparisonNotContains 9 CompareTo 匹配。 msoFilterComparisonNotEqual 1 如果 CompareTo 值不等于列值，则列与 CompareTo 匹配。

# MsoFilterConjunction 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定一个筛选条件与其他筛选条件相关联的方式。与 ODSOFilters 对象的 Conjunction 属性以及 MailMergeFi lters 对象的 Add 方法一起使用。

名称名称 值值 说明说明 msoFilterConjunctionAnd 0 与关联。 msoFilterConjunctionOr 1 或关联。

# MsoFlipCmd 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状应水平翻转还是应垂直翻转。

名称名称 值值 说明说明 msoFlipHorizontal 0 水平翻转。 msoFlipVertical 1 垂直翻转。

# MsoFontLanguageIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

代表 ThemeFonts 集合中所包含的三种语言字体之一。

名称名称 值值 说明说明

代表复杂文种语言的字体。复杂文种语言集合支持阿拉伯语、格鲁吉亚语、希伯来语、印 msoThemeComplexScript 2 第安语、泰语和越南语字母。 msoThemeEastAsian 3 代表东亚字体。东亚语言包括简体中文、繁体中文、日语和朝鲜语。 msoThemeLatin 1 代表西文字体。

# MsoGradientColorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于形状填充的渐变类型。

名称名称 值值 说明说明 msoGradientColorMixed -2 混和渐变。 msoGradientOneColor 1 单色渐变。 msoGradientPresetColors 3 根据 msoPresetGradientType 常量定义的内置渐变集设置的渐变颜色。 msoGradientTwoColors 2 双色渐变。

# MsoGradientStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定渐变填充的样式。

名称名称 值值 说明说明 msoGradientDiagonalDown 4 从一个顶角到另一侧底角的对角渐变。 msoGradientDiagonalUp 3 从一个底角到另一侧顶角的对角渐变。 msoGradientFromCenter 7 从中心到各个角的渐变。 msoGradientFromCorner 5 从一个角到其他三个角的渐变。 msoGradientFromTitle 6 从标题向外的渐变。 msoGradientHorizontal 1 水平经过图形的渐变。 msoGradientMixed -2 渐变是混和的。 msoGradientVertical 2 垂直向下填充图形的渐变。

# MsoHorizontalAnchor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本框架中文本的水平对齐方式。与 TextFrame 对象的 HorizontalAnchor 属性一起使用。

名称名称 值值 说明说明 msoAnchorCenter 2 文本水平居中。 msoAnchorNone 1 不对齐。 msoHorizontalAnchorMixed -2 只返回值，表示其他状态的组合。

# MsoHyperlinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定超链接的类型。

名称名称 值值 说明说明 msoHyperlinkInlineShape 2 超链接应用于内嵌形状。仅用于 WPS。 msoHyperlinkRange 0 超链接应用于 Range 对象。 msoHyperlinkShape 1 超链接应用于 Shape 对象。

# MsoIodGroup

本文档由公众号【Excel催化剂】整理制作完成

指定用于定义 IOD（按需安装）组的常量。

名称名称 值值 说明说明 msoIodGroupPIAs 0 PIA 组。 msoIodGroupVSTOR35Mgd 1 VSTO 3.5 托管组。 msoIodGroupVSTOR40Mgd 2 VSTO 4.0 托管组。

# MsoLanguageID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定语言标识符。

名称名称 值值 说明说明 msoLanguageIDAfrikaans 1078 南非荷兰语。 msoLanguageIDAlbanian 1052 阿尔巴尼亚语。 msoLanguageIDAmharic 1118 阿姆哈拉语。 msoLanguageIDArabic 1025 阿拉伯语。 msoLanguageIDArabicAlgeria 5121 阿拉伯语（阿尔及利亚）。 msoLanguageIDArabicBahrain 15361 阿拉伯语（巴林）。 msoLanguageIDArabicEgypt 3073 阿拉伯语（埃及）。 msoLanguageIDArabicIraq 2049 阿拉伯语（伊拉克）。 msoLanguageIDArabicJordan 11265 阿拉伯语（约旦）。 msoLanguageIDArabicKuwait 13313 阿拉伯语（科威特）。 msoLanguageIDArabicLebanon 12289 阿拉伯语（黎巴嫩）。 msoLanguageIDArabicLibya 4097 阿拉伯语（利比亚）。 msoLanguageIDArabicMorocco 6145 阿拉伯语（摩洛哥）。 msoLanguageIDArabicOman 8193 阿拉伯语（阿曼）。 msoLanguageIDArabicQatar 16385 阿拉伯语（卡塔尔）。 msoLanguageIDArabicSyria 10241 阿拉伯语（叙利亚）。 msoLanguageIDArabicTunisia 7169 阿拉伯语（突尼斯）。 msoLanguageIDArabicUAE 14337 阿拉伯语（阿拉伯联合酋长国）。 msoLanguageIDArabicYemen 9217 阿拉伯语（也门）。 msoLanguageIDArmenian 1067 亚美尼亚语。 msoLanguageIDAssamese 1101 阿萨姆语。 msoLanguageIDAzeriCyrillic 2092 阿塞拜疆语（西里尔文）。 msoLanguageIDAzeriLatin 1068 阿塞拜疆语（拉丁语）。 msoLanguageIDBasque 1069 巴斯克语。 msoLanguageIDBelgianDutch 2067 荷兰语（比利时）。 msoLanguageIDBelgianFrench 2060 法语（比利时）。 msoLanguageIDBengali 1093 孟加拉语。 msoLanguageIDBosnian 4122 波斯尼亚语。 msoLanguageIDBosnianBosniaHerzegovinaCyrillic 8218 波斯尼亚语（波斯尼亚和黑塞哥维那，西里尔文）。 msoLanguageIDBosnianBosniaHerzegovinaLatin 5146 波斯尼亚语（波斯尼亚和黑塞哥维那，拉丁语）。 msoLanguageIDBrazilianPortuguese 1046 葡萄牙语（巴西）。 msoLanguageIDBulgarian 1026 保加利亚语。 msoLanguageIDBurmese 1109 缅甸语。 msoLanguageIDByelorussian 1059 白俄罗斯语。 msoLanguageIDCatalan 1027 加泰罗尼亚语。 msoLanguageIDCherokee 1116 切罗基语。 msoLanguageIDChineseHongKongSAR 3076 中文（香港特别行政区）。 msoLanguageIDChineseMacaoSAR 5124 中文（澳门特别行政区）。 msoLanguageIDChineseSingapore 4100 中文（新加坡）。 msoLanguageIDCroatian 1050 克罗地亚语。 msoLanguageIDCzech 1029 捷克语。 msoLanguageIDDanish 1030 丹麦语。 msoLanguageIDDivehi 1125 马尔代夫语。

msoLanguageIDDutch 1043 荷兰语。 msoLanguageIDEdo 1126 克瓦语（埃多人说的克瓦语）。 msoLanguageIDEnglishAUS 3081 英语（澳大利亚）。 msoLanguageIDEnglishBelize 10249 英语（伯里兹）。 msoLanguageIDEnglishCanadian 4105 英语（加拿大）。 msoLanguageIDEnglishCaribbean 9225 英语（加勒比海）。 msoLanguageIDEnglishIndonesia 14345 英语（印度尼西亚）。 msoLanguageIDEnglishIreland 6153 英语（爱尔兰）。 msoLanguageIDEnglishJamaica 8201 英语（牙买加）。 msoLanguageIDEnglishNewZealand 5129 英语（新西兰）。 msoLanguageIDEnglishPhilippines 13321 英语（菲律宾）。 msoLanguageIDEnglishSouthAfrica 7177 英语（南非）。 msoLanguageIDEnglishTrinidadTobago 11273 英语（特立尼达和多巴哥）。 msoLanguageIDEnglishUK 2057 英语（英国）。 msoLanguageIDEnglishUS 1033 英语（美国）。 msoLanguageIDEnglishZimbabwe 12297 英语（津巴布韦）。 msoLanguageIDEstonian 1061 爱沙尼亚语。 msoLanguageIDFaeroese 1080 法罗语。 msoLanguageIDFarsi 1065 波斯语。 msoLanguageIDFilipino 1124 菲律宾语。 msoLanguageIDFinnish 1035 芬兰语。 msoLanguageIDFrench 1036 法语。 msoLanguageIDFrenchCameroon 11276 法语（喀麦隆）。 msoLanguageIDFrenchCanadian 3084 法语（加拿大）。 msoLanguageIDFrenchCotedIvoire 12300 法语（科特迪瓦）。 msoLanguageIDFrenchHaiti 15372 法语（海地）。 msoLanguageIDFrenchLuxembourg 5132 法语（卢森堡）。 msoLanguageIDFrenchMali 13324 法语（马里）。 msoLanguageIDFrenchMonaco 6156 法语（摩纳哥）。 msoLanguageIDFrenchMorocco 14348 法语（摩洛哥）。 msoLanguageIDFrenchReunion 8204 法语（留尼旺岛）。 msoLanguageIDFrenchSenegal 10252 法语（塞内加尔）。 msoLanguageIDFrenchWestIndies 7180 法语（西印度群岛）。 msoLanguageIDFranchCongoDRC 9228 法语（刚果民主共和国）。 msoLanguageIDFrisianNetherlands 1122 法语（荷兰）。 msoLanguageIDFulfulde 1127 富尔贝语。 msoLanguageIDGaelicIreland 2108 盖尔语（爱尔兰）。 msoLanguageIDGaelicScotland 1084 盖尔语（苏格兰）。 msoLanguageIDGalician 1110 加利西亚语。 msoLanguageIDGeorgian 1079 格鲁吉亚语。 msoLanguageIDGerman 1031 德语。 msoLanguageIDGermanAustria 3079 德语（奥地利）。 msoLanguageIDGermanLiechtenstein 5127 德语（列支敦士登）。 msoLanguageIDGermanLuxembourg 4103 德语（卢森堡）。 msoLanguageIDGreek 1032 希腊语。 msoLanguageIDGuarani 1140 瓜拉尼语。 msoLanguageIDGujarati 1095 古吉拉特语。

msoLanguageIDHausa 1128 豪萨语。 msoLanguageIDHawaiian 1141 夏威夷语。 msoLanguageIDHebrew 1037 希伯来语。 msoLanguageIDHindi 1081 印地语。 msoLanguageIDHungarian 1038 匈牙利语。 msoLanguageIDIbibio 1129 伊比比奥语。 msoLanguageIDIcelandic 1039 冰岛语。 msoLanguageIDIgbo 1136 伊博语。 msoLanguageIDIndonesian 1057 印度尼西亚语。 msoLanguageIDInuktitut 1117 因纽特语。 msoLanguageIDItalian 1040 意大利语。 msoLanguageIDJapanese 1041 日语。 msoLanguageIDKannada 1099 卡纳达语。 msoLanguageIDKanuri 1137 卡努里语。 msoLanguageIDKashmiri 1120 克什米尔语。 msoLanguageIDKashmiriDevanagari 2144 克什米尔语（梵文）。 msoLanguageIDKazakh 1087 哈萨克语。 msoLanguageIDKhmer 1107 高棉语。 msoLanguageIDKirghiz 1088 吉尔吉斯语。 msoLanguageIDKonkani 1111 孔卡尼语。 msoLanguageIDKorean 1042 朝鲜语。 msoLanguageIDKyrgyz 1088 吉尔吉斯语。 msoLanguageIDLao 1108 老挝语。 msoLanguageIDLatin 1142 拉丁语。 msoLanguageIDLatvian 1062 拉脱维亚语。 msoLanguageIDLithuanian 1063 立陶宛语。 msoLanguageIDMacedoninanFYROM 1071 马其顿语（前南斯拉夫马其顿共和国）。 msoLanguageIDMalayalam 1100 马拉雅拉姆语。 msoLanguageIDMalayBruneiDarussalam 2110 马来语（文莱达鲁萨兰国）。 msoLanguageIDMalaysian 1086 马来西亚语。 msoLanguageIDMaltese 1082 马耳他语。 msoLanguageIDManipuri 1112 曼尼普尔语。 msoLanguageIDMaori 1153 毛利语。 msoLanguageIDMarathi 1102 马拉地语。 msoLanguageIDMexicanSpanish 2058 西班牙语（墨西哥）。 msoLanguageIDMixed -2 混合语言。 msoLanguageIDMongolian 1104 蒙古语。 msoLanguageIDNepali 1121 尼泊尔语。 msoLanguageIDNone 0 未指定语言。 msoLanguageIDNoProofing 1024 不作校对。 msoLanguageIDNorwegianBokmol 1044 挪威博克马尔语。 msoLanguageIDNorwegianNynorsk 2068 挪威尼诺斯克语。 msoLanguageIDOriya 1096 奥里雅语。 msoLanguageIDOromo 1138 奥罗莫人使用的库希特语。 msoLanguageIDPashto 1123 普什图语。 msoLanguageIDPolish 1045 波兰语。 msoLanguageIDPortuguese 2070 葡萄牙语。

msoLanguageIDPortuguese 2070 葡萄牙语。 msoLanguageIDPunjabi 1094 旁遮普语。 msoLanguageIDQuechuaBolivia 1131 克丘亚语（玻利维亚）。 msoLanguageIDQuechuaEcuador 2155 克丘亚语（厄瓜多尔）。 msoLanguageIDQuechuaPeru 3179 克丘亚语（秘鲁）。 msoLanguageIDRhaetoRomanic 1047 利多罗曼语。 msoLanguageIDRomanian 1048 罗马尼亚语。 msoLanguageIDRomanianMoldova 2072 罗马尼亚语（摩尔多瓦）。 msoLanguageIDRussian 1049 俄语。 msoLanguageIDRussianMoldova 2073 俄语（摩尔多瓦）。 msoLanguageIDSamiLappish 1083 萨米语（拉普语）。 msoLanguageIDSanskrit 1103 梵语。 msoLanguageIDSepedi 1132 塞佩提语。 msoLanguageIDSerbianBosniaHerzegovinaCyrillic 7194 塞尔维亚语（波斯尼亚和黑塞哥维那，西里尔文）。 msoLanguageIDSerbianBosniaHerzegovinaLatin 6170 塞尔维亚语（波斯尼亚和黑塞哥维那，拉丁语）。 msoLanguageIDSerbianCyrillic 3098 塞尔维亚语（西里尔文）。 msoLanguageIDSerbianLatin 2074 塞尔维亚语（拉丁语）。 msoLanguageIDSesotho 1072 塞索托语。 msoLanguageIDSimplifiedChinese 2052 简体中文。 msoLanguageIDSindhi 1113 信德语。 msoLanguageIDSindhiPakistan 2137 信德语（巴基斯坦）。 msoLanguageIDSinhalese 1115 僧伽罗语。 msoLanguageIDSlovak 1051 斯洛伐克语。 msoLanguageIDSlovenian 1060 斯洛文尼亚语。 msoLanguageIDSomali 1143 索马里语。 msoLanguageIDSorbian 1070 索布语。 msoLanguageIDSpanish 1034 西班牙语。 msoLanguageIDSpanishArgentina 11274 西班牙语（阿根廷）。 msoLanguageIDSpanishBolivia 16394 西班牙语（玻利维亚）。 msoLanguageIDSpanishChile 13322 西班牙语（智利）。 msoLanguageIDSpanishColombia 9226 西班牙语（哥伦比亚）。 msoLanguageIDSpanishCostaRica 5130 西班牙语（哥斯达黎加）。 msoLanguageIDSpanishDominicanRepublic 7178 西班牙语（多米尼加共和国）。 msoLanguageIDSpanishEcuador 12298 西班牙语（厄瓜多尔）。 msoLanguageIDSpanishElSalvador 17418 西班牙语（萨尔瓦多）。 msoLanguageIDSpanishGuatemala 4106 西班牙语（危地马拉）。 msoLanguageIDSpanishHonduras 18442 西班牙语（洪都拉斯）。 msoLanguageIDSpanishModernSort 3082 西班牙语（现代风格）。 msoLanguageIDSpanishNicaragua 19466 西班牙语（尼加拉瓜）。 msoLanguageIDSpanishPanama 6154 西班牙语（巴拿马）。 msoLanguageIDSpanishParaguay 15370 西班牙语（巴拉圭）。 msoLanguageIDSpanishPeru 10250 西班牙语（秘鲁）。 msoLanguageIDSpanishPuertoRico 20490 西班牙语（波多黎哥）。 msoLanguageIDSpanishUruguay 14346 西班牙语（乌拉圭）。 msoLanguageIDSpanishVenezuela 8202 西班牙语（委内瑞拉）。 msoLanguageIDSutu 1072 苏图语。 msoLanguageIDSwahili 1089 斯瓦希里语。 msoLanguageIDSwedish 1053 瑞典语。

msoLanguageIDSwedish 1053 瑞典语。 msoLanguageIDSwedishFinland 2077 瑞典语（芬兰）。 msoLanguageIDSwissFrench 4108 瑞士法语。 msoLanguageIDSwissGerman 2055 瑞士德语。 msoLanguageIDSwissItalian 2064 瑞士意大利语。 msoLanguageIDSyriac 1114 叙利亚语。 msoLanguageIDTajik 1064 塔吉克语。 msoLanguageIDTamazight 1119 柏柏尔语。 msoLanguageIDTamazightLatin 2143 柏柏尔语（拉丁语）。 msoLanguageIDTamil 1097 泰米尔语。 msoLanguageIDTatar 1092 鞑靼语。 msoLanguageIDTelugu 1098 泰卢固语。 msoLanguageIDThai 1054 泰语。 msoLanguageIDTibetan 1105 藏语。 msoLanguageIDTigrignaEritrea 2163 提格里尼亚语（厄立特里亚省）。 msoLanguageIDTigrignaEthiopic 1139 提格里尼亚语（埃塞俄比亚）。 msoLanguageIDTraditionalChinese 1028 繁体中文。 msoLanguageIDTsonga 1073 汤加语。 msoLanguageIDTswana 1074 茨瓦纳语。 msoLanguageIDTurkish 1055 土耳其语。 msoLanguageIDTurkmen 1090 土库曼语。 msoLanguageIDUkrainian 1058 乌克兰语。 msoLanguageIDUrdu 1056 乌尔都语。 msoLanguageIDUzbekCyrillic 2115 乌兹别克语（西里尔文）。 msoLanguageIDUzbekLatin 1091 乌兹别克语（拉丁语）。 msoLanguageIDVenda 1075 文达语。 msoLanguageIDVietnamese 1066 越南语。 msoLanguageIDWelsh 1106 威尔士语。 msoLanguageIDXhosa 1076 科萨语。 msoLanguageIDYi 1144 彝语。 msoLanguageIDYiddish 1085 意第绪语。 msoLanguageIDYoruba 1130 约鲁巴语。 msoLanguageIDZulu 1077 祖鲁语。

# MsoLightRigType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象的照明效果。

名称名称 值值 说明说明 msoLightRigBalanced 14 指定 Balanced 效果。 msoLightRigBrightRoom 27 指定 BrightRoom 效果。 msoLightRigChilly 22 指定 Chilly 效果。 msoLightRigContrasting 18 指定 Contrasting 效果。 msoLightRigFlat 24 指定 Flat 效果。 msoLightRigFlood 17 指定 Flood 效果。 msoLightRigFreezing 23 指定 Freezing 效果。 msoLightRigGlow 26 指定 Glow 效果。 msoLightRigHarsh 16 指定 Harsh 效果。 msoLightRigLegacyFlat1 1 指定 LegacyFlat1 效果。 msoLightRigLegacyFlat2 2 指定 LegacyFlat2 效果。 msoLightRigLegacyFlat3 3 指定 LegacyFlat3 效果。 msoLightRigLegacyFlat4 4 指定 LegacyFlat4 效果。 msoLightRigLegacyHarsh1 9 指定 LegacyHarsh1 效果。 msoLightRigLegacyHarsh2 10 指定 LegacyHarsh2 效果。 msoLightRigLegacyHarsh3 11 指定 LegacyHarsh3 效果。 msoLightRigLegacyHarsh4 12 指定 LegacyHarsh4 效果。 msoLightRigLegacyNormal1 5 指定 LegacyNormal1 效果。 msoLightRigLegacyNormal2 6 指定 LegacyNormal2 效果。 msoLightRigLegacyNormal3 7 指定 LegacyNormal3 效果。 msoLightRigLegacyNormal4 8 指定 LegacyNormal4 效果。 msoLightRigMixed -2 指定 Mixed 效果。 msoLightRigMorning 19 指定 Morning 效果。 msoLightRigSoft 15 指定 Soft 效果。 msoLightRigSunrise 20 指定 Sunrise 效果。 msoLightRigSunset 21 指定 Sunset 效果。 msoLightRigThreePoint 13 指定 ThreePoint 效果。 msoLightRigTwoPoint 25 指定 TwoPoint 效果。

# MsoLineDashStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定直线的虚线线型。

名称名称 值值 说明说明 msoLineDash 4 直线仅由短划线构成。 msoLineDashDot 5 直线是点划线图案。 msoLineDashDotDot 6 直线是点点划线图案。 msoLineDashStyleMixed -2 不支持。 msoLineLongDash 7 直线由长划线构成。 msoLineLongDashDot 8 直线是长点划线图案。 msoLineRoundDot 3 直线由圆点构成。 msoLineSolid 1 直线是实线。 msoLineSquareDot 2 直线由方点构成。

# MsoLineStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线型。

名称名称 值值 说明说明 msoLineSingle 1 单线。 msoLineStyleMixed -2 不支持。 msoLineThickBetweenThin 5 粗线每一侧各带一条细线。

粗线位于细线旁边。当水平放置时，粗线位于细线上方。当垂直放置时，粗线位于细线 msoLineThickThin 4 左侧。

粗线位于细线旁边。当水平放置时，粗线位于细线下方。当垂直放置时，粗线位于细线 msoLineThinThick 3 右侧。 msoLineThinThin 2 双细线。

# MsoMenuAnimation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS Office命令栏的动画样式。

名称名称 值值 说明说明 msoMenuAnimationNone 0 无动画。 msoMenuAnimationRandom 1 随机动画。 msoMenuAnimationSlide 3 菜单滑入视图。 msoMenuAnimationUnfold 2 菜单展开进入视图。

# MsoMetaPropertyType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定元数据属性类型。

名称名称 值值 说明说明 msoMetaPropertyTypeBoolean 1 代表 Boolean 值。 msoMetaPropertyTypeCalculated 3 代表计算值。 msoMetaPropertyTypeChoice 2 代表一个或多个选项中的值。 msoMetaPropertyTypeComputed 4 代表计算值。 msoMetaPropertyTypeCurrency 5 代表 Currency 值。 msoMetaPropertyTypeDateTime 6 代表 DateTime 值。 msoMetaPropertyTypeFillInChoice 7 代表由用户写入的两个或多个选项中的值。 msoMetaPropertyTypeGuid 8 代表 GUID 值。 msoMetaPropertyTypeInteger 9 代表 Integer 值。 msoMetaPropertyTypeLookup 10 代表用于查阅其他值的值。 msoMetaPropertyTypeMax 19 代表一个范围的最大值。 msoMetaPropertyTypeMultiChoice 12 代表选项的集合。 msoMetaPropertyTypeMultiChoiceFillIn 13 代表需要用户写入值的选项的集合。 msoMetaPropertyTypeMultiChoiceLookup 11 代表用于查阅其他值的选项的集合。 msoMetaPropertyTypeNote 14 代表一个或多个句子的值。 msoMetaPropertyTypeNumber 15 代表普通数字数据类型。 msoMetaPropertyTypeText 16 代表 Text 值。 msoMetaPropertyTypeUnknown 0 代表未知值。 msoMetaPropertyTypeUrl 17 代表 URL。 msoMetaPropertyTypeUser 18 代表用户类别。

# MsoMixedType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已弃用，不应使用。

名称名称 值值 说明说明 msoIntegerMixed 32768 仅内部使用。 msoSingleMixed -2147483648 仅内部使用。

# MsoMoveRow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已弃用，不应使用。

名称名称 值值 说明说明 msoMoveRowFirst -4 仅内部使用。 msoMoveRowNbr -1 仅内部使用。 msoMoveRowNext -2 仅内部使用。 msoMoveRowPrev -3 仅内部使用。

# MsoNumberedBulletStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定编号项目符号样式。

名称名称 值值 说明说明 msoBulletAlphaLCParenBoth 8 带左右括号的小写字母项目符号。 msoBulletAlphaLCParenRight 9 带右括号的小写字母项目符号。 msoBulletAlphaLCPeriod 0 带句点的小写字母项目符号。 msoBulletAlphaUCParenBoth 10 带左右括号的大写字母项目符号。 msoBulletAlphaUCParenRight 11 带右括号的大写字母项目符号。 msoBulletAlphaUCPeriod 1 带句点的大写字母项目符号。 msoBulletArabicAbjadDash 24 带破折号的阿拉伯语 Abjad 项目符号。 msoBulletArabicAlphaDash 23 带破折号的阿拉伯语字母项目符号。 msoBulletArabicDBPeriod 29 带句点的阿拉伯语 DB 项目符号。 msoBulletArabicDBPlain 28 普通阿拉伯语 DB 项目符号。 msoBulletArabicParenBoth 12 带左右括号的阿拉伯语项目符号。 msoBulletArabicParenRight 2 带右括号的阿拉伯语项目符号。 msoBulletArabicPeriod 3 带句点的阿拉伯语项目符号。 msoBulletArabicPlain 13 普通阿拉伯语项目符号。 msoBulletCircleNumDBPlain 18 带圈数字项目符号。 msoBulletCircleNumWDBlackPlain 20 带圈数字 WD 黑色项目符号。 msoBulletCircleNumWDWhitePlain 19 带圈数字 WD 白色项目符号。 msoBulletHebrewAlphaDash 25 带破折号的希伯来语字母项目符号。 msoBulletHindiAlpha1Period 40 带句点的印地语字母项目符号 1。 msoBulletHindiAlphaPeriod 36 带句点的印地语字母项目符号。 msoBulletHindiNumParenRight 39 带右括号的印地语编号项目符号。 msoBulletHindiNumPeriod 37 带句点的印地语编号项目符号。 msoBulletKanjiKoreanPeriod 27 带句点的韩语汉字项目符号。 msoBulletKanjiKoreanPlain 26 韩语汉字项目符号。 msoBulletKanjiSimpChinDBPeriod 38 带句点的简体中文汉字项目符号。 msoBulletRomanLCParenBoth 4 带左右括号的小写罗马字项目符号。 msoBulletRomanLCParenRight 5 带右括号的小写罗马字项目符号。 msoBulletRomanLCPeriod 6 带句点的小写罗马字项目符号。 msoBulletRomanUCParenBoth 14 带左右括号的大写罗马字项目符号。 msoBulletRomanUCParenRight 15 带右括号的大写罗马字项目符号。 msoBulletRomanUCPeriod 7 带句点的大写罗马字项目符号。 msoBulletSimpChinPeriod 17 带句点的简体中文项目符号。 msoBulletSimpChinPlain 16 简体中文项目符号。 msoBulletStyleMixed -2 只返回值，表示其他状态的组合。 msoBulletThaiAlphaParenBoth 32 带左右括号的泰语字母项目符号。 msoBulletThaiAlphaParenRight 31 带右括号的泰语字母项目符号。 msoBulletThaiAlphaPeriod 30 带句点的泰语字母项目符号。 msoBulletThaiNumParenBoth 35 带左右括号的泰语数字项目符号。 msoBulletThaiNumParenRight 34 带右括号的泰语数字项目符号。 msoBulletThaiNumPeriod 33 带句点的泰语数字项目符号。 msoBulletTradChinPeriod 22 带句点的繁体中文项目符号。 msoBulletTradChinPlain 21 繁体中文项目符号。

# MsoOLEMenuGroup 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在合并 OLE 服务器的菜单组与 OLE 客户端的菜单组时（即，将一个容器应用程序类型的对象嵌入另一个

应用程序中时），命令栏弹出式控件所属的菜单组。

名称名称 值值 说明说明 msoOLEMenuGroupContainer 2 “容器容器 ”菜单。 msoOLEMenuGroupEdit 1 “编辑编辑 ”菜单。 msoOLEMenuGroupFile 0 “文件文件 ”菜单。 msoOLEMenuGroupHelp 5 “帮助帮助 ”菜单。 msoOLEMenuGroupNone -1 不合并弹出式控件。 msoOLEMenuGroupObject 3 “对象对象 ”菜单。 msoOLEMenuGroupWindow 4 “窗口窗口 ”菜单。

# MsoOrgChartLayoutType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示如何设置组织结构图中子节点的格式。

名称名称 值值 说明说明 msoOrgChartLayoutBothHanging 2 将子节点垂直置于左右两边的父节点之下。 msoOrgChartLayoutLeftHanging 3 将子节点垂直置于左边的父节点之下。 返回父节点的值，该父节点包含使用多个 MsoOrgChartLayoutType 设置格式的 msoOrgChartLayoutMixed -2 子节点。 msoOrgChartLayoutRightHanging 4 将子节点垂直置于右边的父节点之下。 msoOrgChartLayoutStandard 1 将子节点水平置于父节点之下。

# MsoOrgChartOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定组织结构图的方向。

名称名称 值值 说明说明 msoOrgChartOrientationMixed -2 混和方向。 msoOrgChartOrientationVertical 1 垂直方向。

# MsoOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象在显示或打印时的方向。

名称名称 值值 说明说明 msoOrientationHorizontal 1 水平方向（横向）。 msoOrientationMixed -2 混和方向。 msoOrientationVertical 2 垂直方向（纵向）。

# MsoParagraphAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本块的段落对齐方式。

名称名称 值值 说明说明 msoAlignCenter 1 指定每行文本的中心与文本框左右边距的中点对齐，但每行的左右边缘不对齐。

指定每行（最后一行除外）的第一个字符和最后一个字符分别与左右边距对齐，并通过在每 msoAlignDistribute 4个字符中增加或减去相同的量来填充行。如果文本方向为从左向右，则段落的最后一行与左 边距对齐；如果文本方向为从右向左，则与右边距对齐。

指定每行（最后一行除外）的第一个字符和最后一个字符分别与左右边距对齐，并通过增加 msoAlignJustify 3或减少单词之间以及单词内部的间距来填充行。如果文本方向为从左向右，则段落的最后一 行与左边距对齐；如果文本方向为从右向左，则与右边距对齐。 指定阿拉伯语文本中 kashida 长度的对齐或调整方式。Kashida 是用来延长两个阿拉伯字符 msoAlignJustifyLow 6 之间的连接符的特殊字符。

指定每行最左侧的字符与左边距对齐，但每行的右边缘不对齐。这是从左向右文本方向段落 msoAlignLeft 0 的默认对齐方式。 msoAlignMixed -2 使用对齐样式组合。

指定每行最右侧的字符与右边距对齐，但每行的左边缘不对齐。这是从右向左文本方向段落 msoAlignRight 2 的默认对齐方式。

指定每行（最后一行除外）的第一个字符和最后一个字符分别与左右边距对齐，并通过增加 msoAlignThaiDistribute 5 或减少单词之间的间距（而非单词内部的间距）来填充行。段落的最后一行与左边距对齐。

# MsoPathFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文件或文件夹路径的格式。

名称名称 值值 说明说明 msoPathType1 1 代表 Type1 格式。 msoPathType2 2 代表 Type2 格式。 msoPathType3 3 代表 Type3 格式。 msoPathType4 4 代表 Type4 格式。 msoPathType5 5 代表 Type5 格式。 msoPathType6 6 代表 Type6 格式。 msoPathType7 7 代表 Type7 格式。 msoPathType8 8 代表 Type8 格式。 msoPathType9 9 代表 Type9 格式。 msoPathTypeMixed -2 代表混和格式。 msoPathTypeNone 0 代表无格式。

# MsoPatternType 枚举枚举

# MsoPatternType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状中所使用的填充图案。

名称名称 值值 说明说明 msoPattern10Percent 2 前景色的 10%。 msoPattern20Percent 3 前景色的 20%。 msoPattern25Percent 4 前景色的 25%。 msoPattern30Percent 5 前景色的 30%。 msoPattern40Percent 6 前景色的 40%。 msoPattern50Percent 7 前景色的 50%。 msoPattern5Percent 1 前景色的 5%。 msoPattern60Percent 8 前景色的 60%。 msoPattern70Percent 9 前景色的 70%。 msoPattern75Percent 10 前景色的 75%。 msoPattern80Percent 11 前景色的 80%。 msoPattern90Percent 12 前景色的 90%。 msoPatternCross 51 十字形 msoPatternDarkDownwardDiagonal 15 深色下对角线 msoPatternDarkHorizontal 13 深色横线 msoPatternDarkUpwardDiagonal 16 深色上对角线 msoPatternDarkVertical 14 深色竖线 msoPatternDashedDownwardDiagonal 28 下对角虚线 msoPatternDashedHorizontal 32 横虚线 msoPatternDashedUpwardDiagonal 27 上对角虚线 msoPatternDashedVertical 31 竖虚线 msoPatternDiagonalBrick 40 对角砖形 msoPatternDiagonalCross 54 对角十字 msoPatternDivot 46 草皮 msoPatternDottedDiamond 24 点式菱形 msoPatternDottedGrid 45 虚线网格 msoPatternDownwardDiagonal 52 下对角线 msoPatternHorizontal 49 水平线 msoPatternHorizontalBrick 35 横向砖形 msoPatternLargeCheckerBoard 36 大棋盘 msoPatternLargeConfetti 33 大纸屑 msoPatternLargeGrid 34 大网格 msoPatternLightDownwardDiagonal 21 浅色下对角线 msoPatternLightHorizontal 19 浅色横线 msoPatternLightUpwardDiagonal 22 浅色上对角线 msoPatternLightVertical 20 浅色竖线 msoPatternMixed -2 混和图案 msoPatternNarrowHorizontal 30 窄横线 msoPatternNarrowVertical 29 窄竖线 msoPatternOutlinedDiamond 41 轮廓式菱形 msoPatternPlaid 42 苏格兰方格呢 msoPatternShingle 47 瓦形

msoPatternSmallCheckerBoard 17 小棋盘 msoPatternSmallConfetti 37 小纸屑 msoPatternSmallGrid 23 小网格 msoPatternSolidDiamond 39 实心菱形 msoPatternSphere 43 球形 msoPatternTrellis 18 棚架 msoPatternUpwardDiagonal 53 上对角线 msoPatternVertical 50 垂直线 msoPatternWave 48 波浪形 msoPatternWeave 44 编织物 msoPatternWideDownwardDiagonal 25 宽下对角线 msoPatternWideUpwardDiagonal 26 宽上对角线 msoPatternZigZag 38 之字形

# MsoPermission 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档的信息权限管理 (IRM) 权限类型。

名称名称 值值 说明说明 msoPermissionChange 15 更改权限。 msoPermissionEdit 2 编辑权限。 msoPermissionExtract 8 提取权限。 msoPermissionFullControl 64 完全控制权限。 msoPermissionObjModel 32 以编程方式访问对象模型的权限。 msoPermissionPrint 16 打印权限。 msoPermissionRead 1 读取权限。 msoPermissionSave 4 保存权限。 msoPermissionView 1 查看权限。

# MsoPickerField 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在文件对话框中为用户显示的视图。

名称名称 值值 说明说明 msoPickerFieldUnknown 0 未知字段。 msoPickerFieldDateTime 1 日期字段。 msoPickerFieldNumber 2 数字字段。 msoPickerFieldText 3 文本字段。 msoPickerFieldUser 4 用户或组字段。 msoPickerFieldMax 5 列举的警示值。

# MsoPictureColorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用于图片的颜色转换设置。

名称名称 值值 说明说明 msoPictureAutomatic 1 默认颜色转换。 msoPictureBlackAndWhite 3 黑白转换。 msoPictureGrayscale 2 灰度转换。 msoPictureMixed -2 混和转换。 msoPictureWatermark 4 水印转换。

# MsoPictureEffectType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于定义图片效果类型的常量。

名称名称 值值 说明说明 msoEffectBackgroundRemoval 1 背景消除效果。 msoEffectBlur 2 模糊效果。 msoEffectBrightnessContrast 3 亮度对比度效果。 msoEffectCement 4 水泥效果。 msoEffectChalkSketch 5 粉笔素描效果。 msoEffectColorTemperature 6 色温效果。 msoEffectCrisscrossEtching 7 交叉蚀刻效果。 msoEffectCutout 8 剪纸图样效果。 msoEffectFilmGrain 9 胶片颗粒效果。 msoEffectGlass 10 玻璃效果。 msoEffectGlowDiffused 11 漫射辉光效果。 msoEffectGlowEdges 12 发光边缘效果。 msoEffectLightScreen 13 光幕效果。 msoEffectLineDrawing 14 素描效果。 msoEffectMarker 15 标记效果。 msoEffectMosiacBubbles 16 马赛克泡。 msoEffectNone 17 没有效果。 msoEffectPaintBrush 18 画笔效果。 msoEffectPaintStrokes 19 笔触效果。 msoEffectPastelsSmooth 20 平滑柔和效果。 msoEffectPencilGrayscale 21 铅笔灰度效果。 msoEffectPencilSketch 22 铅笔素描效果。 msoEffectPhotocopy 23 复印效果。 msoEffectPlasticWrap 24 塑封效果。 msoEffectSaturation 25 饱和度效果。 msoEffectSharpenSoften 26 锐化软化效果。 msoEffectTexturizer 27 纹理化效果。 msoEffectWatercolorSponge 28 水彩海绵效果。

# MsoPresetCamera 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示由指定对象使用的效果照相机类型。

名称名称 值值 说明说明 msoCameraIsometricBottomDown 23 指定等长底部朝下。 msoCameraIsometricBottomUp 22 指定等长底部朝上。 msoCameraIsometricLeftDown 25 指定等轴左下。 msoCameraIsometricLeftUp 24 指定等轴左上。 msoCameraIsometricOffAxis1Left 28 指定等长 OffAxis1 朝左。 msoCameraIsometricOffAxis1Right 29 指定等长 OffAxis1 朝右。 msoCameraIsometricOffAxis1Top 30 指定等长 OffAxis1 朝上。 msoCameraIsometricOffAxis2Left 31 指定等长 OffAxis2 朝左。 msoCameraIsometricOffAxis2Right 32 指定等长 OffAxis2 朝右。 msoCameraIsometricOffAxis2Top 33 指定等长 OffAxis2 朝上。

msoCameraIsometricOffAxis2Top 33 指定等长 OffAxis2 朝上。 msoCameraIsometricOffAxis3Bottom 36 指定等长 OffAxis3 朝下。 msoCameraIsometricOffAxis3Left 34 指定等长 OffAxis3 朝左。 msoCameraIsometricOffAxis3Right 35 指定等长 OffAxis3 朝右。 msoCameraIsometricOffAxis4Bottom 39 指定等长 OffAxis4 朝下。 msoCameraIsometricOffAxis4Left 37 指定等长 OffAxis4 朝左。 msoCameraIsometricOffAxis4Right 38 指定等长 OffAxis4 朝右。 msoCameraIsometricRightDown 27 指定等轴右上。 msoCameraIsometricRightUp 26 指定等轴右上。 msoCameraIsometricTopDown 21 指定等长顶部朝下。 msoCameraIsometricTopUp 20 指定等长顶部朝上。 msoCameraLegacyObliqueBottom 8 指定旧式倾斜朝下。 msoCameraLegacyObliqueBottomLeft 7 指定旧式倾斜朝左下方。 msoCameraLegacyObliqueBottomRight 9 指定旧式倾斜朝右下方。 msoCameraLegacyObliqueFront 5 指定旧式倾斜朝前。 msoCameraLegacyObliqueLeft 4 指定旧式倾斜朝左。 msoCameraLegacyObliqueRight 6 指定旧式倾斜朝右。 msoCameraLegacyObliqueTop 2 指定旧式倾斜朝上。 msoCameraLegacyObliqueTopLeft 1 指定旧式倾斜左上方。 msoCameraLegacyObliqueTopRight 3 指定旧式倾斜右上方。 msoCameraLegacyPerspectiveBottom 17 指定旧式下透视。 msoCameraLegacyPerspectiveBottomLeft 16 指定旧式左下透视。 msoCameraLegacyPerspectiveBottomRight 18 指定旧式右下透视。 msoCameraLegacyPerspectiveFront 14 指定旧式前透视。 msoCameraLegacyPerspectiveLeft 13 指定旧式左透视。 msoCameraLegacyPerspectiveRight 15 指定旧式右透视。 msoCameraLegacyPerspectiveTop 11 指定旧式上透视。 msoCameraLegacyPerspectiveTopLeft 10 指定旧式左上透视。 msoCameraLegacyPerspectiveTopRight 12 指定旧式右上透视。 msoCameraObliqueBottom 46 指定倾斜朝下。 msoCameraObliqueBottomLeft 45 指定倾斜左下方。 msoCameraObliqueBottomRight 47 指定倾斜右下方。 msoCameraObliqueLeft 43 指定倾斜朝左。 msoCameraObliqueRight 44 指定倾斜朝右。 msoCameraObliqueTop 41 指定倾斜朝上。 msoCameraObliqueTopLeft 40 指定倾斜左上方。 msoCameraObliqueTopRight 42 指定倾斜右上方。 msoCameraOrthographicFront 19 指定正射影图朝前。 msoCameraPerspectiveAbove 51 指定上透视。 msoCameraPerspectiveAboveLeftFacing 53 指定左上透视。 msoCameraPerspectiveAboveRightFacing 54 指定右上透视。 msoCameraPerspectiveBelow 52 指定下透视。 msoCameraPerspectiveContrastingLeftFacing 55 指定左向对比透视。 msoCameraPerspectiveContrastingRightFacing 56 指定右向对比透视。 msoCameraPerspectiveFront 48 指定前透视。 msoCameraPerspectiveHeroicExtremeLeftFacing 59 指定极左极大透视。 msoCameraPerspectiveHeroicExtremeRightFacing 60 指定极右极大透视。 msoCameraPerspectiveHeroicLeftFacing 57 指定左向极大透视。

msoCameraPerspectiveHeroicLeftFacing 57 指定左向极大透视。 msoCameraPerspectiveHeroicRightFacing 58 指定右向极大透视。 msoCameraPerspectiveLeft 49 指定左透视。 msoCameraPerspectiveRelaxed 61 指定宽松透视。 msoCameraPerspectiveRelaxedModerately 62 指定适度宽松透视。 msoCameraPerspectiveRight 50 指定右透视。 msoPresetCameraMixed -2 指定混和效果。

# MsoPresetExtrusionDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定延伸经过的路径偏离延伸形状（延伸的正面）的方向。与 ThreeDFormat 对象的 PresetExtrusionDirecti on 属性一起使用。

名称名称 值值 说明说明 msoExtrusionBottom 2 向下。 msoExtrusionBottomLeft 3 向左下。 msoExtrusionBottomRight 1 向右下。 msoExtrusionLeft 6 向左。 msoExtrusionNone 5 不延伸。 msoExtrusionRight 4 向右。 msoExtrusionTop 8 向上。 msoExtrusionTopLeft 9 向左上。 msoExtrusionTopRight 7 向右上。 msoPresetExtrusionDirectionMixed -2 只返回值，表示其他状态的组合。

# MsoPresetGradientType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定使用哪种预定义渐变填充形状。

名称名称 值值 说明说明 msoGradientBrass 20 铜黄色渐变。 msoGradientCalmWater 8 心如止水渐变。 msoGradientChrome 21 铬色渐变。 msoGradientChromeII 22 铬色 II 渐变。 msoGradientDaybreak 4 雨后初晴渐变。 msoGradientDesert 6 漫漫黄沙渐变。 msoGradientEarlySunset 1 红日西斜渐变。 msoGradientFire 9 熊熊火焰渐变。 msoGradientFog 10 薄雾浓云渐变。 msoGradientGold 18 金色年华渐变。 msoGradientGoldII 19 金色年华 II 渐变。 msoGradientHorizon 5 极目远眺渐变。 msoGradientLateSunset 2 金乌坠地渐变。 msoGradientMahogany 15 红木渐变。 msoGradientMoss 11 茵茵绿原渐变。 msoGradientNightfall 3 暮霭沉沉渐变。 msoGradientOcean 7 碧海青天渐变。 msoGradientParchment 14 羊皮纸渐变。 msoGradientPeacock 12 孔雀开屏渐变。 msoGradientRainbow 16 彩虹出岫渐变。 msoGradientRainbowII 17 彩虹出岫 II 渐变。 msoGradientSapphire 24 宝石蓝渐变。 msoGradientSilver 23 银波荡漾渐变。 msoGradientWheat 13 麦浪滚滚渐变。 msoPresetGradientMixed -2 混和渐变。

# MsoPresetLightingDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定延伸（三维）形状上的光源相对于该形状的位置。

名称名称 值值 说明说明 msoLightingBottom 8 光源来自下方。 msoLightingBottomLeft 7 光源来自左下方。 msoLightingBottomRight 9 光源来自右下方。 msoLightingLeft 4 光源来自左侧。 msoLightingNone 5 无光源。 msoLightingRight 6 光源来自右侧。 msoLightingTop 2 光源来自上方。 msoLightingTopLeft 1 光源来自左上方。 msoLightingTopRight 3 光源来自右上方。 msoPresetLightingDirectionMixed -2 不支持。

# MsoPresetLightingSoftness 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状上所使用光的亮度。

名称名称 值值 说明说明 msoLightingBright 3 明亮光。 msoLightingDim 1 暗淡光。 msoLightingNormal 2 普通光。 msoPresetLightingSoftnessMixed -2 不支持。

# MsoPresetMaterial 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定延伸表面的材料。与 ThreeDFormat 对象的 PresetMaterial 属性一起使用。

名称名称 值值 说明说明 msoMaterialClear 13 最浅 msoMaterialDarkEdge 11 硬边缘 msoMaterialFlat 14 平面 msoMaterialMatte 1 亚光效果 msoMaterialMatte2 5 亚光效果 2 msoMaterialMetal 3 金属效果 msoMaterialMetal2 7 金属效果 2 msoMaterialPlastic 2 塑料效果 msoMaterialPlastic2 6 塑料效果 2 msoMaterialPowder 10 粉 msoMaterialSoftEdge 12 柔边缘 msoMaterialSoftMetal 15 柔化金属效果 msoMaterialTranslucentPowder 9 半透明粉 msoMaterialWarmMatte 8 暖色粗糙 msoMaterialWireFrame 4 线框 msoPresetMaterialMixed -2 混和材料

# MsoPresetTextEffect 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在 WordArt 对象上使用的文本效果。若要查看每种效果的预览，请参阅支持艺术字的任何 WPS Office产 品中的“艺术字库艺术字库”对话框。MsoPresetTextEffect 常量的值对应于“艺术字库艺术字库”对话框中所列的格式（按从左到

右、从上到下的顺序编号）。

名称名称 值值 说明说明 msoTextEffect1 0 第一个文本效果。 msoTextEffect10 9 第十个文本效果。 msoTextEffect11 10 第十一个文本效果。 msoTextEffect12 11 第十二个文本效果。 msoTextEffect13 12 第十三个文本效果。 msoTextEffect14 13 第十四个文本效果。 msoTextEffect15 14 第十五个文本效果。 msoTextEffect16 15 第十六个文本效果。 msoTextEffect17 16 第十七个文本效果。 msoTextEffect18 17 第十八个文本效果。 msoTextEffect19 18 第十九个文本效果。 msoTextEffect2 1 第二个文本效果。 msoTextEffect20 19 第二十个文本效果。 msoTextEffect21 20 第二十一个文本效果。 msoTextEffect22 21 第二十二个文本效果。 msoTextEffect23 22 第二十三个文本效果。 msoTextEffect24 23 第二十四个文本效果。 msoTextEffect25 24 第二十五个文本效果。 msoTextEffect26 25 第二十六个文本效果。 msoTextEffect27 26 第二十七个文本效果。 msoTextEffect28 27 第二十八个文本效果。 msoTextEffect29 28 第二十九个文本效果。 msoTextEffect3 2 第三个文本效果。 msoTextEffect30 29 第三十个文本效果。 msoTextEffect4 3 第四个文本效果。 msoTextEffect5 4 第五个文本效果。 msoTextEffect6 5 第六个文本效果。 msoTextEffect7 6 第七个文本效果。 msoTextEffect8 7 第八个文本效果。 msoTextEffect9 8 第九个文本效果。 msoTextEffectMixed -2 未使用。

# MsoPresetTextEffectShape 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定艺术字文本的形状。通过在“艺术字艺术字”工具栏中选择“艺术字形状艺术字形状”，可以查看每种文本效果形状的预览。

名称名称 值值 说明说明 msoTextEffectShapeArchDownCurve 10 文本是下凸弧。 msoTextEffectShapeArchDownPour 14 文本是下凸三维弧。 msoTextEffectShapeArchUpCurve 9 文本是上凸弧。 msoTextEffectShapeArchUpPour 13 文本是上凸三维弧。 msoTextEffectShapeButtonCurve 12 文本围绕一个中心“按钮”弯曲。 msoTextEffectShapeButtonPour 16 文本是三维文本，围绕一个中心“按钮”弯曲。 msoTextEffectShapeCanDown 20 文本伸展以填充形状的高度，只带有轻微下凸。 msoTextEffectShapeCanUp 19 文本伸展以填充形状的高度，只带有轻微上凸。 msoTextEffectShapeCascadeDown 40 文本向上倾斜至右侧，同时字体减小。 msoTextEffectShapeCascadeUp 39 文本向下倾斜至右侧，同时字体增大。 msoTextEffectShapeChevronDown 6 文本向上倾斜至中心点，然后向下倾斜。 msoTextEffectShapeChevronUp 5 文本向下倾斜至中心点，然后向上倾斜。 msoTextEffectShapeCircleCurve 11 文本呈圆形，顺时针方向。 msoTextEffectShapeCirclePour 15 文本具有三维效果且呈圆形，顺时针方向。 msoTextEffectShapeCurveDown 18 文本下凸，向右延伸时字体减小。 msoTextEffectShapeCurveUp 17 文本下凸，向右延伸时字体变大。 msoTextEffectShapeDeflate 26 字体减小至文本的中点，然后增大至起始大小。

字体减小至文本的中点，然后增大至起始大小，同时保持文本顶部在同 msoTextEffectShapeDeflateBottom 28 一曲线上。 msoTextEffectShapeDeflateInflate 31 字体增大至文本的中点，然后减小至起始大小。 msoTextEffectShapeDeflateInflateDeflate 32 文本的字体减小、增大并再次减小。

字体减小至文本的中点，然后增大至起始大小，同时保持文本底部在同 msoTextEffectShapeDeflateTop 30 一曲线上。 msoTextEffectShapeDoubleWave1 23 文本沿着一条线上凸、下凸、然后再次上凸和下凸。 msoTextEffectShapeDoubleWave2 24 文本沿着一条线下凸、上凸、然后再次下凸和上凸。 msoTextEffectShapeFadeDown 36 文本顶部的显示位置比文本底部更靠近查看器。 msoTextEffectShapeFadeLeft 34 文本左侧的显示位置比文本右侧更靠近查看器。 msoTextEffectShapeFadeRight 33 文本右侧的显示位置比文本左侧更靠近查看器。 msoTextEffectShapeFadeUp 35 文本底部的显示位置比文本顶部更靠近查看器。

文本的字体增大至其中点，然后减小。每个字母的中点不在一条直线 msoTextEffectShapeInflate 25 上。

文本的字体增大至其中点，然后减小。每个字母的中点在一条下凸弧 msoTextEffectShapeInflateBottom 27 上。

文本的字体增大至其中点，然后减小。每个字母的中点在一条上凸弧 msoTextEffectShapeInflateTop 29 上。 msoTextEffectShapeMixed -2 未使用。 msoTextEffectShapePlainText 1 不应用形状。 msoTextEffectShapeRingInside 7 文本显示为写在三维圆环内部。 msoTextEffectShapeRingOutside 8 文本显示为写在三维圆环外部。 msoTextEffectShapeSlantDown 38 文本向下倾斜至右侧。 msoTextEffectShapeSlantUp 37 文本向上倾斜至右侧。 msoTextEffectShapeStop 2 文本构成停止标志的形状。 msoTextEffectShapeTriangleDown 4 文本向上倾斜，然后向下倾斜。 msoTextEffectShapeTriangleUp 3 文本向下倾斜，然后向上倾斜。 msoTextEffectShapeWave1 21 文本沿波浪形向上，然后向下并再次向上。 msoTextEffectShapeWave2 22 文本沿波浪形向下，然后向上并再次向下。

# MsoPresetTexture 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于填充形状的纹理。

名称名称 值值 说明说明 msoPresetTextureMixed -2 未使用。 msoTextureBlueTissuePaper 17 蓝色砂纸纹理。 msoTextureBouquet 20 花束纹理。 msoTextureBrownMarble 11 褐色大理石纹理。 msoTextureCanvas 2 画布纹理。 msoTextureCork 21 软木塞纹理。 msoTextureDenim 3 布纹理。 msoTextureFishFossil 7 鱼类化石纹理。 msoTextureGranite 12 花岗岩纹理。 msoTextureGreenMarble 9 绿色大理石纹理。 msoTextureMediumWood 24 深色木质纹理。 msoTextureNewsprint 13 新闻纸纹理。 msoTextureOak 23 橡木纹理。 msoTexturePaperBag 6 纸袋纹理。 msoTexturePapyrus 1 纸莎草纸纹理。 msoTextureParchment 15 羊皮纸纹理。 msoTexturePinkTissuePaper 18 粉色砂纸纹理。 msoTexturePurpleMesh 19 紫色网格纹理。 msoTextureRecycledPaper 14 再生纸纹理。 msoTextureSand 8 沙滩纹理。 msoTextureStationery 16 信纸纹理。 msoTextureWalnut 22 胡桃纹理。 msoTextureWaterDroplets 5 水滴纹理。 msoTextureWhiteMarble 10 白色大理石纹理。 msoTextureWovenMat 4 编织物纹理。

# MsoPresetThreeDFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定延伸（三维）格式。msoPresetThreeDFormat 常量按照在“格式格式”工具栏上“三维样式三维样式”按钮中显示的顺序

（从左到右，从上到下）进行编号。

名称名称 值值 说明说明 msoPresetThreeDFormatMixed -2 未使用。 msoThreeD1 1 第一个三维格式。 msoThreeD10 10 第十个三维格式。 msoThreeD11 11 第十一个三维格式。 msoThreeD12 12 第十二个三维格式。 msoThreeD13 13 第十三个三维格式。 msoThreeD14 14 第十四个三维格式。 msoThreeD15 15 第十五个三维格式。 msoThreeD16 16 第十六个三维格式。 msoThreeD17 17 第十七个三维格式。 msoThreeD18 18 第十八个三维格式。 msoThreeD19 19 第十九个三维格式。 msoThreeD2 2 第二个三维格式。 msoThreeD20 20 第二十个三维格式。 msoThreeD3 3 第三个三维格式。 msoThreeD4 4 第四个三维格式。 msoThreeD5 5 第五个三维格式。 msoThreeD6 6 第六个三维格式。 msoThreeD7 7 第七个三维格式。 msoThreeD8 8 第八个三维格式。 msoThreeD9 9 第九个三维格式。

# MsoReflectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 ReflectionFormat 对象的类型。

名称名称 值值 说明说明 msoReflectionType1 1 类型 1。 msoReflectionType2 2 类型 2。 msoReflectionType3 3 类型 3。 msoReflectionType4 4 类型 4。 msoReflectionType5 5 类型 5。 msoReflectionType6 6 类型 6。 msoReflectionType7 7 类型 7。 msoReflectionType8 8 类型 8。 msoReflectionType9 9 类型 9。 msoReflectionTypeMixed -2 只返回值，表示其他状态的组合。 msoReflectionTypeNone 0 无反射类型。

# MsoRelativeNodePosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将节点添加到图表中相对于现有节点的哪个位置。

名称名称 值值 说明说明 msoAfterLastSibling 4 节点添加到最后一个同级节点之后。 msoAfterNode 2 节点添加到当前节点之后。 msoBeforeFirstSibling 3 节点添加到第一个同级节点之前。 msoBeforeNode 1 节点添加到当前节点之前。

# MsoScaleFrom 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在缩放形状时，该形状的哪一部分将保持在原有的位置。

名称名称 值值 说明说明 msoScaleFromBottomRight 2 形状的右下角保持在原有的位置。 msoScaleFromMiddle 1 形状的中点保持在原有的位置。 msoScaleFromTopLeft 0 形状的左上角保持在原有的位置。

# MsoScreenSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于在 Web 浏览器中查看文档的理想屏幕分辨率。

名称名称 值值 说明说明 msoScreenSize1024x768 4 1024x768 分辨率。 msoScreenSize1152x882 5 1152x882 分辨率。 msoScreenSize1152x900 6 1152x900 分辨率。 msoScreenSize1280x1024 7 1280x1024 分辨率。 msoScreenSize1600x1200 8 1600x1200 分辨率。 msoScreenSize1800x1440 9 1800x1440 分辨率。 msoScreenSize1920x1200 10 1920x1200 分辨率。 msoScreenSize544x376 0 544x376 分辨率。 msoScreenSize640x480 1 640x480 分辨率。 msoScreenSize720x512 2 720x512 分辨率。 msoScreenSize800x600 3 800x600 分辨率。

# MsoSegmentType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线段的类型。与 FreeformBuilder 对象的 Insert 和 AddNodes 方法一起使用。

名称名称 值值 说明说明 msoSegmentCurve 1 曲线。 msoSegmentLine 0 直线。

# MsoShadowStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定阴影效果的类型。

名称名称 值值 说明说明 msoShadowStyleInnerShadow 1 指定内部阴影效果。 msoShadowStyleMixed -2 指定内部阴影效果和外部阴影效果的组合。 msoShadowStyleOuterShadow 2 指定外部阴影效果。

# MsoShadowType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定与形状一起显示的阴影类型。msoShadowType 常量根据它们在“绘图绘图”工具栏的“阴影样式阴影样式”集合内的顺

序（从左到右、从上到下）进行编号。

名称名称 值值 说明说明 msoShadow1 1 第一个阴影类型。 msoShadow10 10 第十个阴影类型。 msoShadow11 11 第十一个阴影类型。 msoShadow12 12 第十二个阴影类型。 msoShadow13 13 第十三个阴影类型。 msoShadow14 14 第十四个阴影类型。 msoShadow15 15 第十五个阴影类型。 msoShadow16 16 第十六个阴影类型。 msoShadow17 17 第十七个阴影类型。 msoShadow18 18 第十八个阴影类型。 msoShadow19 19 第十九个阴影类型。 msoShadow2 2 第二个阴影类型。 msoShadow20 20 第二十个阴影类型。 msoShadow3 3 第三个阴影类型。 msoShadow4 4 第四个阴影类型。 msoShadow5 5 第五个阴影类型。 msoShadow6 6 第六个阴影类型。 msoShadow7 7 第七个阴影类型。 msoShadow8 8 第八个阴影类型。 msoShadow9 9 第九个阴影类型。 msoShadowMixed -2 不支持。

# MsoShapeStyleIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示线条样式和形状样式。

名称名称 值值 说明说明 msoLineStyle1 10001 线条样式 1 msoLineStyle10 10010 线条样式 10 msoLineStyle11 10011 线条样式 11 msoLineStyle12 10012 线条样式 12 msoLineStyle13 10013 线条样式 13 msoLineStyle14 10014 线条样式 14 msoLineStyle15 10015 线条样式 15 msoLineStyle16 10016 线条样式 16 msoLineStyle17 10017 线条样式 17 msoLineStyle18 10018 线条样式 18 msoLineStyle19 10019 线条样式 19 msoLineStyle2 10002 线条样式 2 msoLineStyle20 10020 线条样式 20 msoLineStyle3 10003 线条样式 3 msoLineStyle4 10004 线条样式 4 msoLineStyle5 10005 线条样式 5 msoLineStyle6 10006 线条样式 6 msoLineStyle7 10007 线条样式 7 msoLineStyle8 10008 线条样式 8 msoLineStyle9 10009 线条样式 9 msoShapeStyle1 1 阴影样式 1 msoShapeStyle10 10 阴影样式 10 msoShapeStyle11 11 阴影样式 11 msoShapeStyle12 12 阴影样式 12 msoShapeStyle13 13 阴影样式 13 msoShapeStyle14 14 阴影样式 14 msoShapeStyle15 15 阴影样式 15 msoShapeStyle16 16 阴影样式 16 msoShapeStyle17 17 阴影样式 17 msoShapeStyle18 18 阴影样式 18 msoShapeStyle19 19 阴影样式 19 msoShapeStyle2 2 阴影样式 2 msoShapeStyle20 20 阴影样式 20 msoShapeStyle3 3 阴影样式 3 msoShapeStyle4 4 阴影样式 4 msoShapeStyle5 5 阴影样式 5 msoShapeStyle6 6 阴影样式 6 msoShapeStyle7 7 阴影样式 7 msoShapeStyle8 8 阴影样式 8 msoShapeStyle9 9 阴影样式 9 msoShapeStyleMixed -2 混和的阴影样式。 msoShapeStyleNone 0 无阴影样式。

# MsoShapeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状的类型或形状范围。

名称名称 值值 说明说明 msoAutoShape 1 自选图形。 msoCallout 2 标注。 msoCanvas 20 画布。 msoChart 3 图。 msoComment 4 批注。 msoDiagram 21 图表。 msoEmbeddedOLEObject 7 嵌入的 OLE 对象。 msoFormControl 8 窗体控件。 msoFreeform 5 任意多边形。 msoGroup 6 组合。 msoIgxGraphic 24 SmartArt 图形 msoInk 22 墨迹。 msoInkComment 23 墨迹批注。 msoLine 9 线条。 msoLinkedOLEObject 10 链接 OLE 对象。 msoLinkedPicture 11 链接图片。 msoMedia 16 媒体。 msoOLEControlObject 12 OLE 控件对象。 msoPicture 13 图片。 msoPlaceholder 14 占位符。 msoScriptAnchor 18 脚本定位标记。 msoShapeTypeMixed -2 混和形状类型。 msoTable 19 表。 msoTextBox 17 文本框。 msoTextEffect 15 文本效果。

# MsoSharedWorkspaceTaskPriority 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定共享工作区任务的优先级。

名称名称 值值 说明说明 msoSharedWorkspaceTaskPriorityHigh 1 高优先级。 msoSharedWorkspaceTaskPriorityLow 3 低优先级。 msoSharedWorkspaceTaskPriorityNormal 2 普通优先级。

# MsoSharedWorkspaceTaskStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定共享工作区任务的状态。

名称名称 值值 说明说明 msoSharedWorkspaceTaskStatusCompleted 3 已完成， msoSharedWorkspaceTaskStatusDeferred 4 推迟。 msoSharedWorkspaceTaskStatusInProgress 2 进行中。 msoSharedWorkspaceTaskStatusNotStarted 1 未启动。 msoSharedWorkspaceTaskStatusWaiting 5 正在等待。

# MsoSignatureSubset 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定签名子集的属性。这些设置用作签名集合的筛选器。

名称名称 值值 说明说明 msoSignatureSubsetAll 5 所有不可见的签名加上所有签名行。 msoSignatureSubsetSignatureLines 2 所有签名行。 msoSignatureSubsetSignatureLinesSigned 3 已签署的签名行。 msoSignatureSubsetSignatureLinesUnsigned 4 未签署的签名行。 msoSignatureSubsetSignaturesAllSigs 0 所有不可见的签名加上所有已签署的签名行。 msoSignatureSubsetSignaturesNonVisible 1 所有不可见的签名。

# MsoSmartArtNodePosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定一些常量，以定义将节点添加到 SmartArt 中的数据模型的各种方法。

名称名称 值值 说明说明 msoSmartArtNodeAbove 4 在数据模型中的 SmartArt 节点上方插入节点。 在数据模型中的 SmartArt 节点后面插入节点。相当于在 SmartArt 功能区中单击“在后面在后面 msoSmartArtNodeAfter 2 添加形状添加形状 ”。 msoSmartArtNodeBefore 3 在数据模型中的 SmartArt 节点前面插入节点。 msoSmartArtNodeBelow 5 在数据模型中的 SmartArt 节点下方插入节点。 msoSmartArtNodeDefault 1 默认设置。相当于在 SmartArt 功能区中单击“添加形状添加形状 ”。

# MsoSmartArtNodeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于定义 SmartArt 节点类型的常量。

名称名称 值值 说明说明 msoSmartArtNodeTypeAssistant 2 定义一个可在分层图表中使用的辅助节点。 msoSmartArtNodeTypeDefault 1 默认节点类型。

# MsoSoftEdgeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

名称名称 值值 说明说明 msoSoftEdgeType1 1 柔化边缘类型 1 msoSoftEdgeType2 2 柔化边缘类型 2 msoSoftEdgeType3 3 柔化边缘类型 3 msoSoftEdgeType4 4 柔化边缘类型 4 msoSoftEdgeType5 5 柔化边缘类型 5 msoSoftEdgeType6 6 柔化边缘类型 6 msoSoftEdgeTypeNone 0 无柔化边缘。 SoftEdgeTypeMixed -2 混和的柔化边缘类型。

# MsoSyncConflictResolutionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在同步共享文档时如何解决冲突。与 Sync 对象的 ResolveConflict 方法一起使用。

名称名称 值值 说明说明 msoSyncConflictClientWins 0 用本地副本代替服务器副本。

将对服务器副本所做的更改合并到本地副本中。要解决冲突并成功地合并更改，必须 msoSyncConflictMerge 2 在合并更改后保存活动文档，然后再次使用 msoSyncConflictClientWins 选项调用 ResolveConflict 方法。 msoSyncConflictServerWins 1 用服务器副本代替本地副本。

# MsoSyncErrorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档同步错误。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

名称名称 值值 说明说明 msoSyncErrorCouldNotCompare 13 无法比较源文件和目标文件。 msoSyncErrorCouldNotConnect 2 无法连接。 msoSyncErrorCouldNotOpen 11 无法打开文件。 msoSyncErrorCouldNotResolve 14 无法解析文件。 msoSyncErrorCouldNotUpdate 12 无法更新目标文件。 msoSyncErrorFileInUse 6 目标文件正在使用。 msoSyncErrorFileNotFound 4 找不到目标文件。 msoSyncErrorFileTooLarge 5 文件太大，无法同步。 msoSyncErrorNone 0 没有错误。 msoSyncErrorNoNetwork 15 没有可用的网络。 msoSyncErrorOutOfSpace 3 空间不足。 msoSyncErrorUnauthorizedUser 1 用户未经授权。 msoSyncErrorUnknown 16 未知错误。 msoSyncErrorUnknownDownload 10 下载错误。 msoSyncErrorUnknownUpload 9 上载错误。 msoSyncErrorVirusDownload 8 下载了病毒。 msoSyncErrorVirusUpload 7 上载了病毒。

# MsoSyncEventType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 Sync 事件的返回值。在 WPS 中，与 Document 对象的 Sync 事件或 Application 对象的 DocumentSy nc 事件一起使用。在 ET 中，与 Workbook 对象的 Sync 事件或 Application 对象的 WorkbookSync 事件一 起使用。在 WPP 中，与 Application 对象的 PresentationSync 事件一起使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

名称名称 值值 说明说明 msoSyncEventDownloadFailed 2 下载失败。 msoSyncEventDownloadInitiated 0 下载已开始 msoSyncEventDownloadNoChange 6 未检测到更改。 msoSyncEventDownloadSucceeded 1 下载成功。 msoSyncEventOffline 7 脱机。 msoSyncEventUploadFailed 5 上载失败。 msoSyncEventUploadInitiated 3 上载已开始。 msoSyncEventUploadSucceeded 4 上载成功。

# MsoSyncStatusType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定活动文档的本地副本与服务器副本的同步状态。与 Sync 对象的 Status 属性一起使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

名称名称 值值 说明说明 msoSyncStatusConflict 4 本地副本和服务器副本都发生更改。 msoSyncStatusError 6 发生错误。使用 Sync 对象的 ErrorType 属性确定确切的错误。 msoSyncStatusLatest 1 文档已处于同步状态。 msoSyncStatusLocalChanges 3 仅本地副本发生更改。 msoSyncStatusNewerAvailable 2 仅服务器副本发生更改。 msoSyncStatusNoSharedWorkspace 0 无共享工作区。 msoSyncStatusNotRoaming 0 不需要同步。 msoSyncStatusSuspended 5 同步已挂起。

# MsoSyncVersionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在当前打开的本地版本旁打开哪个版本的共享文档。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

注释注释 自 WPS Office 2015 开始，此对象或成员已弃用，不应再行使用。

名称名称 值值 说明说明 msoSyncVersionLastViewed 0 打开当用户用服务器副本覆盖本地副本时创建的文档副本。 msoSyncVersionServer 1 打开服务器版本。

# MsoTabStopType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定制表位的类型。

名称名称 值值 说明说明 msoTabStopCenter 2 中央制表位。 msoTabStopDecimal 4 小数制表位。 msoTabStopLeft 1 左制表位。 msoTabStopMixed -2 只返回值，表示其他状态的组合。 msoTabStopRight 3 右制表位。

# MsoTargetBrowser 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在 Web 浏览器中查看的文档的目标浏览器。

名称名称 值值 说明说明 msoTargetBrowserIE4 2 Microsoft Internet Explorer 4.0。 msoTargetBrowserIE5 3 Microsoft Internet Explorer 5。 msoTargetBrowserIE6 4 Microsoft Internet Explorer 6。 msoTargetBrowserV3 0 Netscape Navigator 3。 msoTargetBrowserV4 1 Netscape Navigator 4。

# MsoTextCaps 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本的大写设置。

名称名称 值值 说明说明 msoAllCaps 2 将文本以全部大写字母的形式显示。 msoCapsMixed -2 将文本以大写字母和小写字母混合的形式显示。 msoNoCaps 0 将文本以不带大写字母的形式显示。 msoSmallCaps 1 将文本以全部小写字母的形式显示。

# MsoTextChangeCase 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本的大写设置。

名称名称 值值 说明说明 msoCaseLower 2 将文本显示为小写字符。

将文本显示为句首字母大写的字符。句首字母大写指定句子的第一个字母应大写，其他所有字母 msoCaseSentence 1 均应小写（专有名词、缩写词等情况除外）。

将文本显示为词首大写的字符。词首大写指定每个单词的第一个字母应大写，其他所有字母均应 msoCaseTitle 4 小写。在某些情况下，短的冠词、介词和连词的首字母不大写。 msoCaseToggle 5 指示应将小写文本转换为大写文本，将大写文本转换为小写文本。 msoCaseUpper 3 将文本显示为大写字符。

# MsoTextCharWrap 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示文字环绕的类型。

名称名称 值值 说明说明 msoCharWrapMixed -2 指定混和的文字环绕。 msoCustomCharWrap 3 指定自定义文字环绕方案。 msoNoCharWrap 0 指定无文字环绕。 msoStandardCharWrap 1 指定在对象的标准边界周围环绕文字。 msoStrictCharWrap 2 指定文字环绕符合中文和日文等语言的限制。

# MsoTextDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本行文方向。

名称名称 值值 说明说明 msoTextDirectionLeftToRight 1 文本左至右行文。 msoTextDirectionMixed -2 只返回值，表示其他状态的组合。 msoTextDirectionRightToLeft 2 文本右至左行文。

# MsoTextEffectAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定艺术字文字的对齐方式。

名称名称 值值 说明说明 msoTextEffectAlignmentCentered 2 居中。 msoTextEffectAlignmentLeft 1 左对齐。 msoTextEffectAlignmentLetterJustify 4 文字两端对齐。可以调整字母之间的间距以使文字两端对齐。 msoTextEffectAlignmentMixed -2 未使用。 msoTextEffectAlignmentRight 3 右对齐。 msoTextEffectAlignmentStretchJustify 6 文字两端对齐。可以伸展字母以使文字两端对齐。

文字两端对齐。可以调整单词（而非字母）之间的间距以使文字两端对 msoTextEffectAlignmentWordJustify 5 齐。

# MsoTextFontAlign 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示用于对象的文本对齐方案。

名称名称 值值 说明说明 msoFontAlignAuto 0 指定文本对齐方式由 Office 应用程序决定。 msoFontAlignBaseline 3 指定文本与对象的基线对齐。 msoFontAlignBottom 4 指定文本与对象的底端对齐。 msoFontAlignCenter 2 指定文本与对象的中心对齐。 msoFontAlignMixed -2 指定将混和的文本对齐方式与对象一起使用。 msoFontAlignTop 1 指定文本与对象的顶端对齐。

# MsoTextOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本的方向。

名称名称 值值 说明说明 msoTextOrientationDownward 3 向下。 msoTextOrientationHorizontal 1 水平。 msoTextOrientationHorizontalRotatedFarEast 6 亚洲语言支持所需的水平和旋转。 msoTextOrientationMixed -2 不支持。 msoTextOrientationUpward 2 向上。 msoTextOrientationVertical 5 垂直。 msoTextOrientationVerticalFarEast 4 亚洲语言支持所需的垂直。

# MsoTextStrike 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示为了加深图像颜色而打印字符的次数。

名称名称 值值 说明说明 msoDoubleStrike 2 指定打印字符两次。 msoNoStrike 0 指定不打印字符。 msoSingleStrike 1 指定打印字符一次。 msoStrikeMixed -2 指定文本可以包含双删除线和单删除线字符的组合。

# MsoTextTabAlign 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示文本相对于制表位或换行符的对齐方式。

名称名称 值值 说明说明 msoTabAlignCenter 1 指定下一个制表位或换行符之前的后续文本以指定的制表位为中间点。

指定在后续文本中搜索出现的第一处代表小数点的字符。然后，对齐下一个制表位或换行符之 msoTabAlignDecimal 3 前的文本，使该小数点在指定的制表位处开始。 msoTabAlignLeft 0 指定后续文本从指定制表位的后面开始（默认值）。 msoTabAlignMixed -2 指定使用相对于制表位的混和文本对齐方式。 msoTabAlignRight 2 指定下一个制表位或换行符之前的后续文本与指定的制表位右对齐。

# MsoTextUnderlineType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示文字的下划线类型。

名称名称 值值 说明说明 msoNoUnderline 0 不指定下划线。 msoUnderlineDashHeavyLine 8 指定短线下划线。 msoUnderlineDashLine 7 指定划线下划线。 msoUnderlineDashLongHeavyLine 10 指定粗长划线下划线。 msoUnderlineDashLongLine 9 指定长虚下划线。 msoUnderlineDotDashHeavyLine 12 指定粗点划线下划线。 msoUnderlineDotDashLine 11 指定点划线下划线。 msoUnderlineDotDotDashHeavyLine 14 指定粗双点划线下划线。 msoUnderlineDotDotDashLine 13 指定双点划线下划线。 msoUnderlineDottedHeavyLine 6 指定粗点虚线下划线。 msoUnderlineDottedLine 5 指定虚线下划线。 msoUnderlineDoubleLine 3 指定双线下划线。 msoUnderlineHeavyLine 4 指定粗线下划线。 msoUnderlineMixed -2 指定混和的下划线类型。 msoUnderlineSingleLine 2 指定单线下划线。 msoUnderlineWavyDoubleLine 17 指定双波浪线下划线。 msoUnderlineWavyHeavyLine 16 指定粗波浪线下划线。 msoUnderlineWavyLine 15 指定波浪线下划线。 msoUnderlineWords 1 指定为单词添加下划线。

# MsoTextureAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于平铺纹理填充的对齐方式（坐标网格的原点）。

名称名称 值值 说明说明 msoTextureAlignmentMixed -2 只返回值，表示其他状态的组合。 msoTextureBottom 7 靠下对齐。 msoTextureBottomLeft 6 靠下向左对齐。 msoTextureBottomRight 8 靠下向右对齐。 msoTextureCenter 4 居中对齐。 msoTextureLeft 3 左对齐。 msoTextureRight 5 右对齐。 msoTextureTop 1 靠上对齐。 msoTextureTopLeft 0 靠上向左对齐。 msoTextureTopRight 2 靠上向右对齐。

# MsoTextureType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定选定填充的纹理类型。

名称名称 值值 说明说明 msoTexturePreset 1 预设纹理类型。 msoTextureTypeMixed -2 只返回值，表示其他状态的组合。 msoTextureUserDefined 2 用户定义的纹理类型。

# MsoThemeColorIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示 Office 主题颜色。

名称名称 值值 说明说明 msoNotThemeColor 0 指定无主题颜色。 msoThemeColorAccent1 5 指定“强调文字颜色 1”主题颜色。 msoThemeColorAccent2 6 指定“强调文字颜色 2”主题颜色。 msoThemeColorAccent3 7 指定“强调文字颜色 3”主题颜色。 msoThemeColorAccent4 8 指定“强调文字颜色 4”主题颜色。 msoThemeColorAccent5 9 指定“强调文字颜色 5”主题颜色。 msoThemeColorAccent6 10 指定“强调文字颜色 6”主题颜色。 msoThemeColorBackground1 14 指定“背景 1”主题颜色。 msoThemeColorBackground2 16 指定“背景 2”主题颜色。 msoThemeColorDark1 1 指定“深色 1”主题颜色。 msoThemeColorDark2 3 指定“深色 2”主题颜色。 msoThemeColorFollowedHyperlink 12 指定已单击的超链接的主题颜色。 msoThemeColorHyperlink 11 指定超链接的主题颜色。 msoThemeColorLight1 2 指定“浅色 1”主题颜色。 msoThemeColorLight2 4 指定“浅色 2”主题颜色。 msoThemeColorMixed -2 指定混和的主题颜色。 msoThemeColorText1 13 指定“文字 1”主题颜色。 msoThemeColorText2 15 指定“文字 2”主题颜色。

# MsoThemeColorSchemeIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示 Office 主题的配色方案。

名称名称 值值 说明说明 msoThemeAccent1 5 指定配色方案“强调文字颜色 1”。 msoThemeAccent2 6 指定配色方案“强调文字颜色 2”。 msoThemeAccent3 7 指定配色方案“强调文字颜色 3”。 msoThemeAccent4 8 指定配色方案“强调文字颜色 4”。 msoThemeAccent5 9 指定配色方案“强调文字颜色 5”。 msoThemeAccent6 10 指定配色方案“强调文字颜色 6”。 msoThemeDark1 1 指定配色方案“深色 1”。 msoThemeDark2 3 指定配色方案“深色 2”。 msoThemeFollowedHyperlink 12 指定已单击超链接的配色方案。 msoThemeHyperlink 11 指定超链接的配色方案。 msoThemeLight1 2 指定配色方案“浅色 1”。 msoThemeLight2 4 指定配色方案“浅色 2”。

# MsoTriState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 3 状态 Boolean 值。

名称名称 值值 说明说明 msoCTrue 1 不支持。 msoFalse 0 False。 msoTriStateMixed -2 不支持。 msoTriStateToggle -3 不支持。 msoTrue -1 True。

# MsoVerticalAnchor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本框中文本的垂直对齐方式。与 TextFrame 对象的 VerticalAnchor 属性一起使用。

名称名称 值值 说明说明 msoAnchorBottom 4 使文本与文本框的底部对齐。

不管如何调整文本大小，文本字符串的底端都定位于当前位置。如果调整文本大小时不 msoAnchorBottomBaseLine 5 定位基线，文本将以之前的位置为中间点。 msoAnchorMiddle 3 使文本垂直居中。 msoAnchorTop 1 使文本与文本框的顶部对齐。

不管如何调整文本大小，文本字符串的底端都定位于当前位置。如果调整文本大小时不 msoAnchorTopBaseline 2 定位基线，文本将以之前的位置为中间点。 msoVerticalAnchorMixed -2 只返回值，表示其他状态的组合。

# MsoWarpFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示各种图像弯曲格式。

名称名称 值值 说明说明 msoWarpFormat1 0 指定“弯曲格式 1”。 msoWarpFormat10 9 指定“弯曲格式 10”。 msoWarpFormat11 10 指定“弯曲格式 11”。 msoWarpFormat12 11 指定“弯曲格式 12”。 msoWarpFormat13 12 指定“弯曲格式 13”。 msoWarpFormat14 13 指定“弯曲格式 14”。 msoWarpFormat15 14 指定“弯曲格式 15”。 msoWarpFormat16 15 指定“弯曲格式 16”。 msoWarpFormat17 16 指定“弯曲格式 17”。 msoWarpFormat18 17 指定“弯曲格式 18”。 msoWarpFormat19 18 指定“弯曲格式 19”。 msoWarpFormat2 1 指定“弯曲格式 2”。 msoWarpFormat20 19 指定“弯曲格式 20”。 msoWarpFormat21 20 指定“弯曲格式 21”。 msoWarpFormat22 21 指定“弯曲格式 22”。 msoWarpFormat23 22 指定“弯曲格式 23”。 msoWarpFormat24 23 指定“弯曲格式 24”。 msoWarpFormat25 24 指定“弯曲格式 25”。 msoWarpFormat26 25 指定“弯曲格式 26”。 msoWarpFormat27 26 指定“弯曲格式 27”。 msoWarpFormat28 27 指定“弯曲格式 28”。 msoWarpFormat29 28 指定“弯曲格式 29”。 msoWarpFormat3 2 指定“弯曲格式 3”。 msoWarpFormat30 29 指定“弯曲格式 30”。 msoWarpFormat4 3 指定“弯曲格式 4”。 msoWarpFormat5 4 指定“弯曲格式 5”。 msoWarpFormat6 5 指定“弯曲格式 6”。 msoWarpFormat7 6 指定“弯曲格式 7”。 msoWarpFormat8 7 指定“弯曲格式 8”。 msoWarpFormat9 8 指定“弯曲格式 9”。 msoWarpFormatMixed -2 指定混和的弯曲格式。

# MsoWizardMsgType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

注释注释 在 WPS Office 的当前版本中已弃用应答向导和 Balloon 对象。

指定调用向导的回调过程的上下文。用作被设计为与自定义向导一起使用的回调过程中的参数。

注释注释 在 WPS Office 的当前版本中已弃用应答向导和 Balloon 对象。

指定调用向导的回调过程的上下文。用作被设计为与自定义向导一起使用的回调过程中的参数。

名称名称 值值 说明说明 msoWizardMsgLocalStateOff 2 用户在判定或分支气球中单击了鼠标右键。 msoWizardMsgLocalStateOn 1 不支持。 msoWizardMsgResuming 5 如果为 Act 参数指定了 msoWizardActResume，则传递到 ActivateWizard 方法。 msoWizardMsgShowHelp 3 用户在判定或分支气球中单击了鼠标左键。 如果为 Act 参数指定了 msoWizardActSuspend，则传递到 ActivateWizard 方 msoWizardMsgSuspending 4 法。

# MsoZOrderCmd 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要将形状移动到的相对于其他形状的 z-顺序位置。

名称名称 值值 说明说明 msoBringForward 2 使形状上移一层。 msoBringInFrontOfText 4 使形状浮于文字上方。 msoBringToFront 0 使形状置于顶层。 msoSendBackward 3 使形状下移一层。 msoSendBehindText 5 使形状衬于文字下方。 msoSendToBack 1 使形状置于底层。

# RibbonControlSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定一些常量，用于定义功能区中的控件大小。

名称名称 值值 说明说明 RibbonControlSizeLarge 1 大控件。 RibbonControlSizeRegular 0 小控件。

# SignatureDetail 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示有关签名的附加信息。

名称名称 值值 说明说明 sigdetApplicationName 1 指定应用程序名称。 sigdetApplicationVersion 2 指定应用程序版本。 sigdetColorDepth 8 指定颜色深度。 sigdetDelSuggSigner 16 指定建议的签名代理人。 sigdetDelSuggSignerEmail 20 指定建议签名人的代理人的电子邮件。 sigdetDelSuggSignerEmailSet 21 指示是否已指定了建议签名代理人的电子邮件。 sigdetDelSuggSignerLine2 18 指定建议签名人的代理人的签名行。 sigdetDelSuggSignerLine2Set 19 指定建议签名人的代理人的签名行集合。 sigdetDelSuggSignerSet 17 指定建议签名人的代理人集合。 sigdetDocPreviewImg 10 指定文档预览图像。 sigdetHashAlgorithm 14 指定哈希算法。 sigdetHorizResolution 6 指定水平分辨率。 sigdetIPCurrentView 12 指定 IP 当前视图。 sigdetIPFormHash 11 指定 IP 形态哈希。 sigdetLocalSigningTime 0 指定本地签名时间。 sigdetNumberOfMonitors 5 指定监视器数量。 sigdetOfficeVersion 3 指定 Office 版本。 sigdetShouldShowViewWarning 15 指定“将显示视图警告”设置。 sigdetSignatureType 13 指定签名类型。 sigdetSignedData 9 指定签名数据。 sigdetVertResolution 7 指定垂直分辨率。 sigdetWindowsVersion 4 指定 Windows 版本。

# SignatureLineImage 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示签名行图像。

名称名称 值值 说明说明 siglnimgSignedInvalid 3 SignedInvalid 图像。 siglnimgSignedValid 2 SignedValid 图像。 siglnimgSoftwareRequired 0 SoftwareRequired 图像。 siglnimgUnsigned 1 Unsigned 图像。

# SignatureProviderDetail 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定签名提供程序的属性。

名称名称 值值 说明说明 sigprovdetHashAlgorithm 1 用于对文件中的数据进行散列运算的哈希算法。 sigprovdetUIOnly 2 指示签名提供程序只使用自定义用户界面。 sigprovdetUrl 0 签名提供程序的 URL。

# SignatureType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定签名的属性。

名称名称 值值 说明说明 sigtypeMax 3 指定当前 Office 版本中可以使用的签名类型的最大数量。 sigtypeNonVisible 1 签名在文档内容中不可见。 sigtypeSignatureLine 2 签名在文档内容中可见。 sigtypeUnknown 0 签名不是由 Office 生成的。

# WdAlertLevel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定运行宏时产生的一些警告和消息的处理方式。

名称名称 值值 说明说明 wdAlertsAll -1 显示所有的消息框和警告，并将错误返回宏。 wdAlertsMessageBox -2 仅显示消息框，同时捕获错误并将其返回宏。 wdAlertsNone 0 不显示警告或消息框。如果出现消息框，宏将选择默认值并继续运行。

# WdAlignmentTabAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定制表符的对齐方式。

名称名称 值值 说明说明 wdCenter 1 居中的制表符。 wdLeft 0 左对齐的制表符。 wdRight 2 右对齐的制表符。

# WdAlignmentTabRelative 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 在计算制表位的对齐方式时是相对于节边距还是相对于段落缩进。

名称名称 值值 说明说明 wdIndent 1 WPS 相对于段落缩进计算制表位的对齐方式。 wdMargin 0 WPS 相对于边距计算制表位的对齐方式。

# WdAnimation 枚举枚举

# WdAnimation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于字体的动画类型。

名称名称 值值 说明说明 wdAnimationBlinkingBackground 2 闪烁的黑白背景。 wdAnimationLasVegasLights 1 变换的颜色和图案边框。 wdAnimationMarchingBlackAnts 4 旋转的黑色虚框。 wdAnimationMarchingRedAnts 5 旋转的红色虚框。 wdAnimationNone 0 没有动画，这是默认值。 wdAnimationShimmer 6 字体亦真亦幻。 wdAnimationSparkleText 3 随机变换的图案和颜色背景。

# WdApplyQuickStyleSets 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于文档的快速样式集。

名称名称 值值 说明说明 wdSessionStartSet 1 将快速样式重置为打开文档时使用的样式集。 wdTemplateSet 2 将快速样式重置为模板中的样式集（如果有）。

# WdArabicNumeral 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为阿拉伯语文档指定数字样式。

名称名称 值值 说明说明 wdNumeralArabic 0 数字采用阿拉伯语形状。 wdNumeralContext 2 数字形状取决于数字周围的文字。 wdNumeralHindi 1 数字采用印地语形状。 wdNumeralSystem 3 数字形状由系统设置决定。

# WdAraSpeller 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为阿拉伯语拼写检查指定拼写规则。

名称名称 值值 说明说明 wdBoth 3 拼写检查使用有关以字母 yaa 结尾和以 alef hamza 开头的阿拉伯语单词拼写规则。 wdFinalYaa 2 拼写检查使用有关以字母 yaa 结尾的阿拉伯语单词拼写规则。 wdInitialAlef 1 拼写检查使用有关以 alef hamza 开头的阿拉伯语单词拼写规则。 wdNone 0 拼写检查忽略有关以字母 yaa 结尾或以 alef hamza 开头的阿拉伯语单词拼写规则。

# WdArrangeStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定窗口排列方式。

名称名称 值值 说明说明 wdIcons 1 窗口作为图标显示在单个窗口中。 wdTiled 0 窗口平铺在单个窗口中。

# WdAutoFitBehavior 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何使用自动调整功能来调整表格的大小。

名称名称 值值 说明说明 wdAutoFitContent 1 根据表格中包含的内容自动调整表格的大小。 wdAutoFitFixed 0 将表格设置为固定大小而与内容无关，因此不会自动调整表格大小。 wdAutoFitWindow 2 根据活动窗口的宽度自动调整表格大小。

# WdAutoMacros 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定存储在文档中的自动宏。

名称名称 值值 说明说明 wdAutoClose 3 AutoClose 宏。 wdAutoExec 0 AutoExec 宏。 wdAutoExit 4 AutoExit 宏。 wdAutoNew 1 AutoNew 宏。 wdAutoOpen 2 AutoOpen 宏。 wdAutoSync 5 AutoSync 宏。

# WdAutoVersions 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于自动保存文档版本的选项的状态。

名称名称 值值 说明说明 wdAutoVersionOff 0 不保存文档版本。 wdAutoVersionOnClose 1 关闭文档时自动保存该文档的版本。

# WdBaselineAlignment 枚举枚举

# WdBaselineAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定行中字体的垂直位置。

名称名称 值值 说明说明 wdBaselineAlignAuto 4 WPS 自动调整字体的基线对齐方式。 wdBaselineAlignBaseline 2 对齐段落的基线。 wdBaselineAlignCenter 1 对齐每个字体的中心点。 wdBaselineAlignFarEast50 3 按亚洲语言字体标准的基线对齐。 wdBaselineAlignTop 0 沿每个字体顶端对齐。

# WdBookmarkSortBy 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为显示在“书签书签”对话框中的书签名称指定排序选项。

名称名称 值值 说明说明 wdSortByLocation 1 按在文档中的位置排序。 wdSortByName 0 按书签名称排序。

# WdBorderDistanceFrom 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定页面边框是从页面边缘还是从其周围的文本开始计算。

名称名称 值值 说明说明 wdBorderDistanceFromPageEdge 1 从页面边缘计算。 wdBorderDistanceFromText 0 从其周围的文本计算。

# WdBorderType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的边框类型。

名称名称 值值 说明说明 wdBorderBottom -3 底边框线。 wdBorderDiagonalDown -7 方向从左上角开始的斜向边框线。 wdBorderDiagonalUp -8 方向从左下角开始的斜向边框线。 wdBorderHorizontal -5 横向框线。 wdBorderLeft -2 左侧框线。 wdBorderRight -4 右侧框线。 wdBorderTop -1 上框线。 wdBorderVertical -6 纵向框线。

# WdBreakType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分隔符的类型。

名称名称 值值 说明说明 wdColumnBreak 8 插入点处的分栏符。 wdLineBreak 6 换行符。 wdLineBreakClearLeft 9 换行符。 wdLineBreakClearRight 10 换行符。 wdPageBreak 7 插入点处的分页符。 wdSectionBreakContinuous 3 新节不包含相应分页符。 使下一节从下一偶数页开始的分节符。如果分节符落入偶数页，则 WPS 将下一奇数页 wdSectionBreakEvenPage 4 留为空白。 wdSectionBreakNextPage 2 分节符在下一页。 使下一节从下一奇数页开始的分节符。如果分节符落入奇数页，则 WPS 将下一偶数页 wdSectionBreakOddPage 5 留为空白。

结束当前行，并强制文字在图片、表格或其他项目的下方继续。文字将在下一个空行 wdTextWrappingBreak 11 （且该空行不包含与左边距或右边距对齐的表格）上继续。

# WdBrowserLevel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在 WPS 中创建的新网页要指向的 Web 浏览器的版本。

名称名称 值值 说明说明 wdBrowserLevelMicrosoftInternetExplorer5 1 Microsoft Internet Explorer 5。 wdBrowserLevelMicrosoftInternetExplorer6 2 Microsoft Internet Explorer 6。 wdBrowserLevelV4 0 Microsoft Internet Explorer 4。

# WdBrowseTarget 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 Next 或 Previous 方法找到的文档项目，并将插入点放在该项目的下一实例或上一实例之前。

名称名称 值值 说明说明 wdBrowseComment 3 将插入点放在下一批注或上一批注之前。 wdBrowseEdit 10 将插入点放在下一编辑位置或上一编辑位置之前。 wdBrowseEndnote 5 将插入点放在下一尾注或上一尾注之前。 wdBrowseField 6 将插入点放在下一浏览域或上一浏览域之前。 wdBrowseFind 11 将插入点放在下一浏览结果或上一浏览结果之前。 wdBrowseFootnote 4 将插入点放在下一脚注或上一脚注之前。 wdBrowseGoTo 12 将插入点放在下一“定位”项目或上一“定位”项目之前。 wdBrowseGraphic 8 将插入点放在下一图形或上一图形之前。 wdBrowseHeading 9 将插入点放在下一标题或上一标题之前。 wdBrowsePage 1 将插入点放在下一页或上一页之前。 wdBrowseSection 2 将插入点放在下一节或上一节之前。 wdBrowseTable 7 将插入点放在下一表格或上一表格之前。

# WdBuildingBlockTypes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定生成块的类型。

名称名称 值值 说明说明 wdTypeAutoText 9 自动图文集生成框。 wdTypeBibliography 34 书目生成块。 wdTypeCoverPage 2 封面生成块。 wdTypeCustom1 29 自定义生成块。 wdTypeCustom2 30 自定义生成块。 wdTypeCustom3 31 自定义生成块。 wdTypeCustom4 32 自定义生成块。 wdTypeCustom5 33 自定义生成块。 wdTypeCustomAutoText 23 自定义自动图文集生成块。 wdTypeCustomBibliography 35 自定义书目生成块。 wdTypeCustomCoverPage 16 自定义封面生成块。 wdTypeCustomEquations 17 自定义公式生成块。 wdTypeCustomFooters 18 自定义页脚生成块。 wdTypeCustomHeaders 19 自定义页眉生成块。 wdTypeCustomPageNumber 20 自定义页码编号生成块。 wdTypeCustomPageNumberBottom 26 自定义页码编号（位于页面底部）生成块。 wdTypeCustomPageNumberPage 27 自定义页码编号生成块。 wdTypeCustomPageNumberTop 25 自定义页码编号（位于页面顶端）生成块。 wdTypeCustomQuickParts 15 自定义文档部件生成块。 wdTypeCustomTableOfContents 28 自定义目录生成块。 wdTypeCustomTables 21 自定义表格生成块。 wdTypeCustomTextBox 24 自定义文本框生成块。 wdTypeCustomWatermarks 22 自定义水印生成块。 wdTypeEquations 3 公式生成块。 wdTypeFooters 4 页脚生成块。 wdTypeHeaders 5 页眉生成块。 wdTypePageNumber 6 页码编号生成块。 wdTypePageNumberBottom 12 页码编号（位于页面底部）生成块。 wdTypePageNumberPage 13 页码编号生成块。 wdTypePageNumberTop 11 页码编号（位于页面顶端）生成块。 wdTypeQuickParts 1 文档部件生成块。 wdTypeTableOfContents 14 目录生成块。 wdTypeTables 7 表格生成块。 wdTypeTextBox 10 文本框生成块。 wdTypeWatermarks 8 水印生成块。

# WdBuiltInProperty 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定内置文档属性。

名称名称 值值 说明说明 wdPropertyAppName 9 应用程序名称。 wdPropertyAuthor 3 作者。 wdPropertyBytes 22 字节数。 wdPropertyCategory 18 类别。 wdPropertyCharacters 16 字符数。 wdPropertyCharsWSpaces 30 字符数（计空格）。 wdPropertyComments 5 批注。 wdPropertyCompany 21 公司。 wdPropertyFormat 19 不支持。 wdPropertyHiddenSlides 27 不支持。 wdPropertyHyperlinkBase 29 不支持。 wdPropertyKeywords 4 关键词。 wdPropertyLastAuthor 7 上一个作者。 wdPropertyLines 23 行数。 wdPropertyManager 20 经理。 wdPropertyMMClips 28 不支持。 wdPropertyNotes 26 注释。 wdPropertyPages 14 页数。 wdPropertyParas 24 段落数。 wdPropertyRevision 8 修订次数。 wdPropertySecurity 17 安全设置。 wdPropertySlides 25 不支持。 wdPropertySubject 2 主题。 wdPropertyTemplate 6 模板名称。 wdPropertyTimeCreated 11 创建时间。 wdPropertyTimeLastPrinted 10 上次打印时间。 wdPropertyTimeLastSaved 12 上次保存时间。 wdPropertyTitle 1 标题。 wdPropertyVBATotalEdit 13 VBA 项目编辑次数。 wdPropertyWords 15 字数。

# WdBuiltinStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定内置的 WPS 样式。

名称名称 值值 说明说明 wdStyleBlockQuotation -85 文本块。 wdStyleBodyText -67 正文文本。 wdStyleBodyText2 -81 正文文本 2。 wdStyleBodyText3 -82 正文文本 3。 wdStyleBodyTextFirstIndent -78 正文首行缩进。 wdStyleBodyTextFirstIndent2 -79 正文首行缩进 2。 wdStyleBodyTextIndent -68 正文文本缩进。 wdStyleBodyTextIndent2 -83 正文文本缩进 2。

wdStyleBodyTextIndent2 -83 正文文本缩进 2。 wdStyleBodyTextIndent3 -84 正文文本缩进 3。 wdStyleBookTitle -265 书籍标题。 wdStyleCaption -35 题注。 wdStyleClosing -64 结束语。 wdStyleCommentReference -40 批注引用。 wdStyleCommentText -31 批注文字。 wdStyleDate -77 日期。 wdStyleDefaultParagraphFont -66 默认段落字体。 wdStyleEmphasis -89 强调。 wdStyleEndnoteReference -43 尾注引用。 wdStyleEndnoteText -44 尾注文本。 wdStyleEnvelopeAddress -37 收信人地址。 wdStyleEnvelopeReturn -38 寄信人地址。 wdStyleFooter -33 页脚。 wdStyleFootnoteReference -39 脚注引用。 wdStyleFootnoteText -30 脚注文本。 wdStyleHeader -32 页眉。 wdStyleHeading1 -2 标题 1。 wdStyleHeading2 -3 标题 2。 wdStyleHeading3 -4 标题 3。 wdStyleHeading4 -5 标题 4。 wdStyleHeading5 -6 标题 5。 wdStyleHeading6 -7 标题 6。 wdStyleHeading7 -8 标题 7。 wdStyleHeading8 -9 标题 8。 wdStyleHeading9 -10 标题 9。 wdStyleHtmlAcronym -96 HTML 缩写。 wdStyleHtmlAddress -97 HTML 地址。 wdStyleHtmlCite -98 HTML 引文。 wdStyleHtmlCode -99 HTML 代码。 wdStyleHtmlDfn -100 HTML 定义。 wdStyleHtmlKbd -101 HTML 键盘。 wdStyleHtmlNormal -95 普通（网站）。 wdStyleHtmlPre -102 HTML 预设格式。 wdStyleHtmlSamp -103 HTML 样本。 wdStyleHtmlTt -104 HTML 打字机。 wdStyleHtmlVar -105 HTML 变量。 wdStyleHyperlink -86 超链接。 wdStyleHyperlinkFollowed -87 访问过的超链接。 wdStyleIndex1 -11 索引 1。 wdStyleIndex2 -12 索引 2。 wdStyleIndex3 -13 索引 3。 wdStyleIndex4 -14 索引 4。 wdStyleIndex5 -15 索引 5。 wdStyleIndex6 -16 索引 6。 wdStyleIndex7 -17 索引 7。 wdStyleIndex8 -18 索引 8。

wdStyleIndex8 -18 索引 8。 wdStyleIndex9 -19 索引 9。 wdStyleIndexHeading -34 索引标题 wdStyleIntenseEmphasis -262 明显强调。 wdStyleIntenseQuote -182 明显引用。 wdStyleIntenseReference -264 明显参考。 wdStyleLineNumber -41 行号。 wdStyleList -48 列表。 wdStyleList2 -51 列表 2。 wdStyleList3 -52 列表 3。 wdStyleList4 -53 列表 4。 wdStyleList5 -54 列表 5。 wdStyleListBullet -49 列表项目符号。 wdStyleListBullet2 -55 列表项目符号 2。 wdStyleListBullet3 -56 列表项目符号 3。 wdStyleListBullet4 -57 列表项目符号 4。 wdStyleListBullet5 -58 列表项目符号 5。 wdStyleListContinue -69 列表接续。 wdStyleListContinue2 -70 列表接续 2。 wdStyleListContinue3 -71 列表接续 3。 wdStyleListContinue4 -72 列表接续 4。 wdStyleListContinue5 -73 列表接续 5。 wdStyleListNumber -50 列表编号。 wdStyleListNumber2 -59 列表编号 2。 wdStyleListNumber3 -60 列表编号 3。 wdStyleListNumber4 -61 列表编号 4。 wdStyleListNumber5 -62 列表编号 5。 wdStyleListParagraph -180 列出段落。 wdStyleMacroText -46 宏文本。 wdStyleMessageHeader -74 信息标题。 wdStyleNavPane -90 文档结构图。 wdStyleNormal -1 正文。 wdStyleNormalIndent -29 正文缩进。 wdStyleNormalObject -158 正文（应用于对象）。 wdStyleNormalTable -106 正文（在表格中应用）。 wdStyleNoteHeading -80 注释标题。 wdStylePageNumber -42 页码。 wdStylePlainText -91 纯文本。 wdStyleQuote -181 引用。 wdStyleSalutation -76 称呼。 wdStyleSignature -65 签名。 wdStyleStrong -88 要点。 wdStyleSubtitle -75 副标题。 wdStyleSubtleEmphasis -261 不明显强调。 wdStyleSubtleReference -263 不明显参考。 wdStyleTableColorfulGrid -172 彩色网格。 wdStyleTableColorfulList -171 彩色列表。

wdStyleTableColorfulShading -170 彩色底纹。 wdStyleTableDarkList -169 深色列表。 wdStyleTableLightGrid -161 浅色网格。 wdStyleTableLightGridAccent1 -175 浅色网格强调文字颜色 1。 wdStyleTableLightList -160 浅色列表。 wdStyleTableLightListAccent1 -174 浅色列表强调文字颜色 1。 wdStyleTableLightShading -159 浅色底纹。 wdStyleTableLightShadingAccent1 -173 浅色底纹强调文字颜色 1。 wdStyleTableMediumGrid1 -166 中间色网格 1。 wdStyleTableMediumGrid2 -167 中间色网格 2。 wdStyleTableMediumGrid3 -168 中间色网格 3。 wdStyleTableMediumList1 -164 中间色列表 1。 wdStyleTableMediumList1Accent1 -178 中间色列表 1 强调文字颜色 1。 wdStyleTableMediumList2 -165 中间色列表 2。 wdStyleTableMediumShading1 -162 中间色底纹 1。 wdStyleTableMediumShading1Accent1 -176 中间色底纹 1 强调文字颜色 1。 wdStyleTableMediumShading2 -163 中间色底纹 2。 wdStyleTableMediumShading2Accent1 -177 中间色底纹 2 强调文字颜色 1。 wdStyleTableOfAuthorities -45 引文目录。 wdStyleTableOfFigures -36 图表目录。 wdStyleTitle -63 标题。 wdStyleTOAHeading -47 引文目录标题。 wdStyleTOC1 -20 目录 1。 wdStyleTOC2 -21 目录 2。 wdStyleTOC3 -22 目录 3。 wdStyleTOC4 -23 目录 4。 wdStyleTOC5 -24 目录 5。 wdStyleTOC6 -25 目录 6。 wdStyleTOC7 -26 目录 7。 wdStyleTOC8 -27 目录 8。 wdStyleTOC9 -28 目录 9。

# WdCalendarType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定日历类型。

名称名称 值值 说明说明 wdCalendarArabic 1 阿拉伯回历。 wdCalendarChina 3 中国阴历。 wdCalendarHebrew 2 希伯来历。 wdCalendarJapan 4 日本日历。 wdCalendarKorean 6 朝鲜日历。 wdCalendarSakaEra 7 萨卡时代日历。 wdCalendarThai 5 泰国历。 wdCalendarWestern 0 公历。

# WdCalendarTypeBi 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定显示日期或时间时使用的日历类型。

名称名称 值值 说明说明 wdCalendarTypeBidi 99 双向日历。 wdCalendarTypeGregorian 100 公历。

# WdCaptionLabelID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定题注标签的类型。

名称名称 值值 说明说明 wdCaptionEquation -3 公式。 wdCaptionFigure -1 图表。 wdCaptionTable -2 表格。

# WdCaptionNumberStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定与 CaptionLabel 对象一起使用的编号样式。

名称名称 值值 说明说明 wdCaptionNumberStyleArabic 0 阿拉伯语样式。 wdCaptionNumberStyleArabicFullWidth 14 全角阿拉伯语样式。 wdCaptionNumberStyleArabicLetter1 46 阿拉伯语字母样式 1。 wdCaptionNumberStyleArabicLetter2 48 阿拉伯语字母样式 2。 wdCaptionNumberStyleChosung 25 Chosung 样式。 wdCaptionNumberStyleGanada 24 Ganada 样式。 wdCaptionNumberStyleHanjaRead 41 朝鲜文汉字读取样式。 wdCaptionNumberStyleHanjaReadDigit 42 朝鲜文汉字读取数字样式。 wdCaptionNumberStyleHebrewLetter1 45 希伯来语字母样式 1。 wdCaptionNumberStyleHebrewLetter2 47 希伯来语字母样式 2。 wdCaptionNumberStyleHindiArabic 51 印地语/阿拉伯语样式。 wdCaptionNumberStyleHindiCardinalText 52 印地语基数样式。 wdCaptionNumberStyleHindiLetter1 49 印地语字母样式 1。 wdCaptionNumberStyleHindiLetter2 50 印地语字母样式 2。 wdCaptionNumberStyleKanji 10 日语汉字样式。 wdCaptionNumberStyleKanjiDigit 11 日语汉字数字样式。 wdCaptionNumberStyleKanjiTraditional 16 日语汉字传统样式。 wdCaptionNumberStyleLowercaseLetter 4 小写字母样式。 wdCaptionNumberStyleLowercaseRoman 2 小写罗马样式。 wdCaptionNumberStyleNumberInCircle 18 带圈数字样式。 wdCaptionNumberStyleSimpChinNum2 38 简体中文数字样式 2。 wdCaptionNumberStyleSimpChinNum3 39 简体中文数字样式 3。 wdCaptionNumberStyleThaiArabic 54 泰语/阿拉伯语样式。 wdCaptionNumberStyleThaiCardinalText 55 泰语基数文本样式。 wdCaptionNumberStyleThaiLetter 53 泰语字母样式。 wdCaptionNumberStyleTradChinNum2 34 繁体中文数字样式 2。 wdCaptionNumberStyleTradChinNum3 35 繁体中文数字样式 3。 wdCaptionNumberStyleUppercaseLetter 3 大写字母样式。 wdCaptionNumberStyleUppercaseRoman 1 大写罗马样式。 wdCaptionNumberStyleVietCardinalText 56 越南语基数文本样式。 wdCaptionNumberStyleZodiac1 30 Zodiac 样式 1。 wdCaptionNumberStyleZodiac2 31 Zodiac 样式 2。

# WdCaptionPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定题注标签文本的位置。

名称名称 值值 说明说明 wdCaptionPositionAbove 0 题注标签加在上方。 wdCaptionPositionBelow 1 题注标签加在下方。

# WdCellColor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定突出显示当前文档中所添加、删除或合并的表格单元格的颜色。

名称名称 值值 说明说明 wdCellColorByAuthor -1 突出显示颜色由审阅者决定。 wdCellColorLightBlue 2 浅蓝色。 wdCellColorLightGray 7 浅灰色。 wdCellColorLightGreen 6 浅绿色。 wdCellColorLightOrange 5 浅橙色。 wdCellColorLightPurple 4 浅紫色。 wdCellColorLightYellow 3 浅黄色。 wdCellColorNoHighlight 0 不突出显示。 wdCellColorPink 1 粉红色。

# WdCellVerticalAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定表格中一个或多个单元格的文字的垂直对齐方式。

名称名称 值值 说明说明 wdCellAlignVerticalBottom 3 文字与单元格底边框线对齐。 wdCellAlignVerticalCenter 1 文字与单元格中心对齐。 wdCellAlignVerticalTop 0 文字与单元格上框线对齐。

# WdCharacterCase 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定范围内的文字指定大小写。

名称名称 值值 说明说明 wdFullWidth 7 全角，用于日语字符。 wdHalfWidth 6 半角，用于日语字符。 wdHiragana 9 平假名字符，用于日语文字。 wdKatakana 8 片假名字符，用于日语文字。 wdLowerCase 0 小写。 wdNextCase -1 在大写、小写和句首字母大写之间切换。 wdTitleSentence 4 句首字母大写。 wdTitleWord 2 标题字大写。 wdToggleCase 5 在大写和小写之间切换。 wdUpperCase 1 大写。

# WdCharacterWidth 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定范围内的字符指定字符宽度。

名称名称 值值 说明说明 wdWidthFullWidth 7 以完整字符宽度显示字符。 wdWidthHalfWidth 6 以半个字符宽度显示字符。

# WdCheckInVersionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在使用 CheckIn 方法时签入文档的版本类型。适用于存储在 SharePoint 库中的文档。

名称名称 值值 说明说明 wdCheckInMajorVersion 1 主版本。 wdCheckInMinorVersion 0 次版本。 wdCheckInOverwriteVersion 2 覆盖服务器上的当前版本。

# WdChevronConvertRule 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将 V 型字符 (? ?) 中包含的文字转化成合并域的规则。

名称名称 值值 说明说明 wdAlwaysConvert 1 转换器尝试将 V 型字符 (? ?) 中包含的文字转换成邮件合并域。 wdAskToConvert 3 转换器在 WPS for Macintosh 文档打开时提示用户是否转换 V 型字符中包含的文字。 wdAskToNotConvert 2 转换器在 WPS for Macintosh 文档打开时提示用户是否转换 V 型字符中包含的文字。 wdNeverConvert 0 转换器忽略此文字而不做任何处理。

# WdCollapseDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定某范围或所选内容的折叠方向。

名称名称 值值 说明说明 wdCollapseEnd 0 将该范围折叠到结束点。 wdCollapseStart 1 将该范围折叠到起始点。

# WdColor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的 24 位颜色。

名称名称 值值 说明说明 wdColorAqua 13421619 水绿色。

wdColorAqua 13421619 水绿色。 wdColorAutomatic -16777216 自动配色。默认值；通常为黑色。 wdColorBlack 0 黑色。 wdColorBlue 16711680 蓝色。 wdColorBlueGray 10053222 蓝灰色。 wdColorBrightGreen 65280 鲜绿色。 wdColorBrown 13209 褐色。 wdColorDarkBlue 8388608 深蓝色。 wdColorDarkGreen 13056 深绿色。 wdColorDarkRed 128 深红色。 wdColorDarkTeal 6697728 深青色。 wdColorDarkYellow 32896 深黄色。 wdColorGold 52479 金色。 wdColorGray05 15987699 5% 灰色底纹。 wdColorGray10 15132390 10% 灰色底纹。 wdColorGray125 14737632 12.5% 灰色底纹。 wdColorGray15 14277081 15% 灰色底纹。 wdColorGray20 13421772 20% 灰色底纹。 wdColorGray25 12632256 25% 灰色底纹。 wdColorGray30 11776947 30% 灰色底纹。 wdColorGray35 10921638 35% 灰色底纹。 wdColorGray375 10526880 37.5% 灰色底纹。 wdColorGray40 10066329 40% 灰色底纹。 wdColorGray45 9211020 45% 灰色底纹。 wdColorGray50 8421504 50% 灰色底纹。 wdColorGray55 7566195 55% 灰色底纹。 wdColorGray60 6710886 60% 灰色底纹。 wdColorGray625 6316128 62.5% 灰色底纹。 wdColorGray65 5855577 65% 灰色底纹。 wdColorGray70 5000268 70% 灰色底纹。 wdColorGray75 4210752 75% 灰色底纹。 wdColorGray80 3355443 80% 灰色底纹。 wdColorGray85 2500134 85% 灰色底纹。 wdColorGray875 2105376 87.5% 灰色底纹。 wdColorGray90 1644825 90% 灰色底纹。 wdColorGray95 789516 95% 灰色底纹。 wdColorGreen 32768 绿色。 wdColorIndigo 10040115 靛蓝色。 wdColorLavender 16751052 淡紫色。 wdColorLightBlue 16737843 浅蓝色。 wdColorLightGreen 13434828 浅绿色。 wdColorLightOrange 39423 浅橙色。 wdColorLightTurquoise 16777164 浅青绿色。 wdColorLightYellow 10092543 浅黄色。 wdColorLime 52377 酸橙色。 wdColorOliveGreen 13107 橄榄色。 wdColorOrange 26367 橙色。

wdColorPaleBlue 16764057 淡蓝色。 wdColorPink 16711935 粉红色。 wdColorPlum 6697881 梅红色。 wdColorRed 255 红色。 wdColorRose 13408767 玫瑰色。 wdColorSeaGreen 6723891 海绿色。 wdColorSkyBlue 16763904 天蓝色。 wdColorTan 10079487 棕黄色。 wdColorTeal 8421376 青色。 wdColorTurquoise 16776960 青绿色。 wdColorViolet 8388736 紫色。 wdColorWhite 16777215 白色。 wdColorYellow 65535 黄色。

# WdColorIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的颜色。

名称名称 值值 说明说明 wdAuto 0 自动配色。默认值；通常为黑色。 wdBlack 1 黑色。 wdBlue 2 蓝色。 wdBrightGreen 4 鲜绿色。 wdByAuthor -1 由文档作者定义的颜色。 wdDarkBlue 9 深蓝色。 wdDarkRed 13 深红色。 wdDarkYellow 14 深黄色。 wdGray25 16 25% 灰色底纹。 wdGray50 15 50% 灰色底纹。 wdGreen 11 绿色。 wdNoHighlight 0 清除已应用的突出显示。 wdPink 5 粉红色。 wdRed 6 红色。 wdTeal 10 青色。 wdTurquoise 3 青绿色。 wdViolet 12 紫色。 wdWhite 8 白色。 wdYellow 7 黄色。

# WdCompareDestination 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

在比较两个文件之间的差异时，指定是创建一个新文件，还是在原始文档或修订的文档中标记两个文档之间的

差异。

名称名称 值值 说明说明 wdCompareDestinationNew 2 创建一个新文件，并使用修订标记原始文档和修订的文档之间的差异。 wdCompareDestinationOriginal 0 使用原始文档中的修订标记两个文件之间的差异。 wdCompareDestinationRevised 1 使用修订的文档中的修订标记两个文件之间的差异。

# WdCompareTarget 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于显示文档比较结果差异的目标文档。

名称名称 值值 说明说明 wdCompareTargetCurrent 1 将比较结果差异置于当前文档中，默认值。 wdCompareTargetNew 2 将比较结果差异置于新文档中。 wdCompareTargetSelected 0 将比较结果差异置于目标文档中。

# WdCompatibility 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定兼容性选项。

名称名称 值值 说明说明 wdAlignTablesRowByRow 39 独立对齐表格行。 wdApplyBreakingRules 46 使用换行规则。 wdAutospaceLikeWW7 38 按 WPS 95 的方式自动调整间距。 wdConvMailMergeEsc 6 在邮件合并数据源中将 \" 视为 ""。 wdDontAdjustLineHeightInTable 36 在表格中将行高调至网格高度。 wdDontBalanceSingleByteDoubleByteWidth 16 区分半角字符和全角字符。 wdDontBreakWrappedTables 43 不允许表格跨页分断。 wdDontSnapTextToGridInTableWithObjects 44 在带有内嵌对象的表格内不将文字与网格线对齐。 wdDontULTrailSpace 15 为尾部空格添加下划线。 wdDontUseAsianBreakRulesInGrid 48 对字符网格不使用中文规则分行。 wdDontUseHTMLParagraphAutoSpacing 35 不使用 HTML 段落自动调整间距。 wdDontWrapTextWithPunctuation 47 对字符网格不允许标点溢出边界。 wdExactOnTop 28 不将设有“固定行高”的行居中。 wdExpandShiftReturn 14 不扩展以 Shift+Return 结尾的行中的字符间距。 wdFootnoteLayoutLikeWW8 34 按 WPS 6.x/95/97 的方式安排脚注。 wdForgetLastTabAlignment 37 忽略上一制表位对齐方式。 wdGrowAutofit 50 允许表格扩充边距。 wdLayoutRawTableWidth 40 用原始宽度规划表格。 wdLayoutTableRowsApart 41 允许表格行分开展示。 wdLeaveBackslashAlone 13 将反斜杠字符转换为日元符号。 wdLineWrapLikeWord6 32 按 WPS 6.0 的方式换行。 wdMWSmallCaps 22 按 WPS 5.x for Macintosh 的方式使用较大的小型大写字母。 wdNoColumnBalance 5 不在接续节的起始位置平衡栏。

wdNoColumnBalance 5 不在接续节的起始位置平衡栏。 wdNoExtraLineSpacing 23 按 WordPerfect 5.x 的方式取消多余行距。 wdNoLeading 20 不在正文行之间添加前导字符（多余空格）。 wdNoSpaceForUL 21 为下划线添加间距。 wdNoSpaceRaiseLower 2 不为升高或降低的字符添加空格。 wdNoTabHangIndent 1 不为悬挂式缩进添加自动制表位。 wdOrigWordTableRules 9 按 WPS 5.x for Macintosh 的方式合并表格边框。 wdPrintBodyTextBeforeHeader 19 先打印正文，然后打印页眉/页脚。 wdPrintColBlack 3 在普通打印机上将彩色打印为黑色。 wdSelectFieldWithFirstOrLastCharacter 45 选定带有首尾字符的整个域。 wdShapeLayoutLikeWW8 33 按 WPS 97 的方式安排自选图形。 wdShowBreaksInFrames 11 在图文框中显示硬分页符或分栏符。 wdSpacingInWholePoints 18 按点阵加宽或紧缩。 wdSubFontBySize 25 根据字号替换字体。 wdSuppressBottomSpacing 29 取消页面底部的多余行距。 wdSuppressSpBfAfterPgBrk 7 取消硬分页符或分栏符前后的空格。 wdSuppressTopSpacing 8 取消页面顶部的多余行距。 wdSuppressTopSpacingMac5 17 按 WPS 5.x for Macintosh 的方式取消页面顶部多余的行距。 wdSwapBordersFacingPages 12 在奇数对开页上交换左右边界。 wdTransparentMetafiles 10 不将图元文件图片后的区域清空。 wdTruncateFontHeight 24 截断字体高度。 wdUsePrinterMetrics 26 用打印机标准设计文档版式。 wdUseWord2002TableStyleRules 49 使用 WPS 2002 表格样式规则。 wdUseWord97LineBreakingRules 42 对中文文字使用 WPS 97 换行规则。 wdWPJustification 31 按 WordPerfect 6.x for Windows 的方式进行全面调整。 wdWPSpaceWidth 30 按 WordPerfect 5.x 的方式设置空格宽度。 wdWrapTrailSpaces 4 将尾部空格移入下一行。 wdWW6BorderRules 27 使用 WPS 6.x/95 边框规则。 wdAllowSpaceOfSameStyleInTable 54 允许表格中采用相同样式的段落间距。 wdAutofitLikeWW11 57 使用 WPS 2003 表格自动调整规则。 wdDontAutofitConstrainedTables 56 不自动调整被环绕对象旁的表格。 wdDontUseIndentAsNumberingTabStop 52 不将悬挂缩进用作项目符号和编号的制表位。 wdFELineBreak11 53 对亚洲语言使用 WPS 2003 标点溢出规则。 wdHangulWidthLikeWW11 59 不对朝鲜文字符使用成比例宽度。 wdSplitPgBreakAndParaMark 60 拆分分页符和段落标记。 wdUnderlineTabInNumList 58 给编号列表中数字和文字之间的制表符加下划线。 对项目符号列表或编号列表使用“正文”样式，而不是“列出段落”样 wdUseNormalStyleForList 51 式。 wdWW11IndentRules 55 对被环绕对象旁的文字使用 WPS 2003 缩进规则。

# WdCompatibilityMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定打开文档时 WPS 2015 使用的兼容模式。版本信息 ?已添加版本：已添加版本：??

名称名称 值值 说明说明 wdCurrent 65535 相当于 WPS 最新版本的兼容模式。 wdWord2003 11 将 WPS 2015 置于与 WPS 2003 最兼容的模式。在此模式中将禁用 WPS 2015 的新功能。 wdWord2007 12 将 WPS 2015 置于与 WPS 2007 最兼容的模式。在此模式中将禁用 WPS 2015 的新功能。 wdWord2010 14 默认值。将启用所有 WPS 2015 功能。

# WdConditionCode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用特殊样式格式的表格区域。

名称名称 值值 说明说明 wdEvenColumnBanding 7 将格式应用于偶数列。 wdEvenRowBanding 3 将格式应用于偶数行。 wdFirstColumn 4 将格式应用于表格中的第一列。 wdFirstRow 0 将格式应用于表格中的第一行。 wdLastColumn 5 将格式应用于表格中的最后一列。 wdLastRow 1 将格式应用于表格中的最后一行。 wdNECell 8 将格式应用于第一行中的最后一个单元格。 wdNWCell 9 将格式应用于第一行中的第一个单元格。 wdOddColumnBanding 6 将格式应用于奇数列。 wdOddRowBanding 2 将格式应用于奇数行。 wdSECell 10 将格式应用于表格中的最后一个单元格。 wdSWCell 11 将格式应用于表格中最后一行的第一个单元格。

# WdConstants 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

与各种 WPS 方法一起使用的常量将与此枚举组合在一起。

名称名称 值值 说明说明 wdAutoPosition 0 代表指定设置的 Auto 值。 -指示将使用 Range 或 Selection 对象的 MoveStartUntil 或 MoveStartWhile 方法向 wdBackward 1073741823后扩展所选内容。 wdCreatorCode 1297307460 代表 WPS 所创建对象的创建者代码。 wdFirst 1 代表集合中的第一项。 指定将使用 Range 或 Selection 对象的 MoveStartUntil 或 MoveStartWhile 方法向 wdForward 1073741823 前扩展所选内容。 wdToggle 9999998 切换属性值。 wdUndefined 9999999 代表未定义的值。

# WdContentControlDateStorageFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示当一个日期内容控件绑定到文档的数据存储区中的 XML 节点时，如何存储或检索该日期控件的日期。

名称名称 值值 说明说明 指定以标准 XML 架构日期时间格式的日期形式存储或检索日期内容控件 wdContentControlDateStorageDate 1 的日期值。 指定以标准 XML 架构日期时间格式的时间形式存储或检索日期内容控件 wdContentControlDateStorageDateTime 2 的日期值。 wdContentControlDateStorageText 0 指定以文本形式存储或检索日期内容控件的日期值。

# WdContentControlType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示内容控件的类型。

名称名称 值值 说明说明 wdContentControlBuildingBlockGallery 5 指定生成块库内容控件。 wdContentControlCheckBox 8 指定复选框内容控件。 wdContentControlComboBox 3 指定组合框内容控件。 wdContentControlDate 6 指定日期内容控件。 wdContentControlGroup 7 指定组内容控件。 wdContentControlDropdownList 4 指定下拉列表内容控件。 wdContentControlPicture 2 指定图片内容控件。 wdContentControlRichText 0 指定 RTF 内容控件。 wdContentControlText 1 指定文本内容控件。

# WdContinue 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是否可以继续使用上一列表中的格式。

名称名称 值值 说明说明 wdContinueDisabled 0 不能继续使用上一列表中的格式。 wdContinueList 2 可以继续使用上一列表中的格式。 wdResetList 1 可以重新开始编号。

# WdCountry 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当前系统的国家/地区设置。

名称名称 值值 说明说明 wdArgentina 54 阿根廷 wdBrazil 55 巴西 wdCanada 2 加拿大 wdChile 56 智利 wdChina 86 中国 wdDenmark 45 丹麦 wdFinland 358 芬兰 wdFrance 33 法国 wdGermany 49 德国 wdIceland 354 冰岛 wdItaly 39 意大利 wdJapan 81 日本 wdKorea 82 韩国 wdLatinAmerica 3 拉丁美洲 wdMexico 52 墨西哥 wdNetherlands 31 荷兰 wdNorway 47 挪威 wdPeru 51 秘鲁 wdSpain 34 西班牙 wdSweden 46 瑞典 wdTaiwan 886 台湾 wdUK 44 英国 wdUS 1 美国 wdVenezuela 58 委内瑞拉

# WdCursorMovement 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定双向文字中插入点前进的方式。

名称名称 值值 说明说明 wdCursorMovementLogical 0 插入点根据 WPS 检测到的语言的方向前进。 wdCursorMovementVisual 1 插入点前进至下一个可见的邻近字符。

# WdCursorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定光标的状态（形状）。

名称名称 值值 说明说明 wdCursorIBeam 1 I 形光标形状。 wdCursorNormal 2 正常光标形状。默认值；光标采用 Microsoft Windows 或应用程序指定的形状。 wdCursorNorthwestArrow 3 方向从左上角开始的斜线光标形状。 wdCursorWait 0 沙漏光标形状。

# WdCustomLabelPageSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定自定义邮件标签的页面大小。

名称名称 值值 说明说明 wdCustomLabelA4 2 A4 纵向标签尺寸。 wdCustomLabelA4LS 3 A4 横向标签尺寸。 wdCustomLabelA5 4 A5 纵向标签尺寸。 wdCustomLabelA5LS 5 A5 横向标签尺寸。 wdCustomLabelB4JIS 13 B4 JIS 标签尺寸。 wdCustomLabelB5 6 B5 标签尺寸。 wdCustomLabelFanfold 8 复写簿标签尺寸。 wdCustomLabelHigaki 11 Higaki 纵向标签尺寸。 wdCustomLabelHigakiLS 12 Higaki 横向标签尺寸。 wdCustomLabelLetter 0 标准信纸纵向标签尺寸。 wdCustomLabelLetterLS 1 标准信纸横向标签尺寸。 wdCustomLabelMini 7 微型标签尺寸。 wdCustomLabelVertHalfSheet 9 半页纵向标签尺寸。 wdCustomLabelVertHalfSheetLS 10 半页横向标签尺寸。

# WdDateLanguage 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于当前日期和/或时间的语言格式。

名称名称 值值 说明说明 wdDateLanguageBidi 10 双向的日期/时间格式。 wdDateLanguageLatin 1033 拉丁文日期/时间格式。

# WdDefaultFilePath 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为与 WPS 相关的文件指定默认文件夹。

名称名称 值值 说明说明 wdAutoRecoverPath 5 自动恢复文件的路径。 wdBorderArtPath 19 艺术型边框路径。 wdCurrentFolderPath 14 当前文件夹路径。 wdDocumentsPath 0 文档路径。 wdGraphicsFiltersPath 10 图形过滤器路径。 wdPicturesPath 1 图片路径。 wdProgramPath 9 程序路径。 wdProofingToolsPath 12 校对工具路径。 wdStartupPath 8 启动路径。 wdStyleGalleryPath 15 样式库路径。 wdTempFilePath 13 临时文件路径。 wdTextConvertersPath 11 文字转换器路径。 wdToolsPath 6 工具路径。 wdTutorialPath 7 教程路径。 wdUserOptionsPath 4 用户选项路径。 wdUserTemplatesPath 2 用户模板路径。 wdWorkgroupTemplatesPath 3 工作组模板路径。

# WdDefaultListBehavior 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表的默认列表行为。

名称名称 值值 说明说明 wdWord10ListBehavior 2 使用与 WPS 2002 兼容的格式。 wdWord8ListBehavior 0 使用与 WPS 97 兼容的格式。 wdWord9ListBehavior 1 使用在 WPS 2000 中引入的面向网站的格式。

# WdDefaultTableBehavior 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 是否要根据表格单元格的内容自动调整其大小（“自动调整”功能）。

名称名称 值值 说明说明 wdWord8TableBehavior 0 禁用“自动调整”功能，默认设置。 wdWord9TableBehavior 1 启用“自动调整”功能。

# WdDeleteCells 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要用删除单元格操作从表格中删除的单元格区域，或删除后剩余单元格的行为。

名称名称 值值 说明说明 wdDeleteCellsEntireColumn 3 从表格中删除整列单元格。 wdDeleteCellsEntireRow 2 从表格中删除整行单元格。 wdDeleteCellsShiftLeft 0 在删除某一单元格或单元格区域后将删除操作所针对行中剩余的单元格左移。 wdDeleteCellsShiftUp 1 在删除某一单元格或单元格区域后将删除操作所针对列中剩余的单元格上移。

# WdDeletedTextMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定启用修订时删除文字的格式。

名称名称 值值 说明说明 wdDeletedTextMarkBold 5 以加粗样式显示删除文字。 wdDeletedTextMarkCaret 2 用脱字号标记删除文字。 wdDeletedTextMarkColorOnly 9 用指定颜色显示删除文字（默认值为红色）。 wdDeletedTextMarkDoubleUnderline 8 用双下划线字符标记删除文字。 wdDeletedTextMarkHidden 0 隐藏删除文字。 wdDeletedTextMarkItalic 6 以倾斜样式显示删除文字。 wdDeletedTextMarkNone 4 不对删除文字进行标记。 wdDeletedTextMarkPound 3 用井号标记删除文字。 wdDeletedTextMarkStrikeThrough 1 用删除线符号标记删除文字。 wdDeletedTextMarkUnderline 7 给删除文字加下划线。 wdDeletedTextMarkDoubleStrikeThrough 10 用双删除线符号标记删除文字。

# WdDiacriticColor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是否向双向语言或拉丁样式语言的音调符号应用不同的颜色。

名称名称 值值 说明说明 wdDiacriticColorBidi 0 双向语言（阿拉伯语、希伯来语等）。 wdDiacriticColorLatin 1 拉丁样式的语言。

# WdDictionaryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定校对工具类型。

名称名称 值值 说明说明 wdGrammar 1 语法。 用于在朝鲜语和朝鲜语汉字之间转换的词典。只有通过 WPS Office语言设置启 wdHangulHanjaConversion 8 用了朝鲜语支持时才可用。 wdHangulHanjaConversionCustom 9 用于在朝鲜语和朝鲜语汉字之间转换的自定义词典。 wdHyphenation 3 断字。 wdSpelling 0 拼写。 wdSpellingComplete 4 不支持。 wdSpellingCustom 5 自定义拼写词典。 wdSpellingLegal 6 法律词典。 wdSpellingMedical 7 医学词典。 wdThesaurus 2 同义词库。

# WdDisableFeaturesIntroducedAfter 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 版本，禁用该版本之后引入的所有功能。

名称名称 值值 说明说明 wd70 0 指定 WPS for Windows 的 7.0 和 7.0a 版。 wd70FE 1 指定 WPS for Windows 的 7.0 和 7.0a 版，亚洲版。 wd80 2 指定 WPS 97 for Windows，默认值。

# WdDocPartInsertOptions 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何将生成块插入文档。

名称名称 值值 说明说明 wdInsertContent 0 嵌入型生成块。 wdInsertPage 2 页面级别生成块。 wdInsertParagraph 1 段落级别生成块。

# WdDocumentDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档中文字的排列方向。

名称名称 值值 说明说明 wdLeftToRight 0 从左到右。 wdRightToLeft 1 从右到左。

# WdDocumentKind 枚举枚举

# WdDocumentKind 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 自动设置文档格式时所使用的格式类型。

名称名称 值值 说明说明 wdDocumentEmail 2 电子邮件格式。 wdDocumentLetter 1 信函格式。 wdDocumentNotSpecified 0 无指定格式。

# WdDocumentMedium 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用主题的文档类型。

名称名称 值值 说明说明 wdDocument 1 文档。 wdEmailMessage 0 电子邮件。 wdWebPage 2 网页。

# WdDocumentType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档类型。

名称名称 值值 说明说明 wdTypeDocument 0 文档。 wdTypeFrameset 2 框架集。 wdTypeTemplate 1 模板。

# WdDocumentViewDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定整个文档的对齐方式和阅读顺序。

名称名称 值值 说明说明 wdDocumentViewLtr 1 用左对齐方式和从左向右的阅读顺序显示文档。 wdDocumentViewRtl 0 用右对齐方式和从右向左的阅读顺序显示文档。

# WdDropPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定首字下沉的位置。

名称名称 值值 说明说明 wdDropMargin 2 首字下沉在左边距结束。 wdDropNone 0 没有首字下沉。 wdDropNormal 1 首字下沉在左边距开始。

# WdEditionOption 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdAutomaticUpdate 3 不支持。 wdCancelPublisher 0 不支持。 wdChangeAttributes 5 不支持。 wdManualUpdate 4 不支持。 wdOpenSource 7 不支持。 wdSelectPublisher 2 不支持。 wdSendPublisher 1 不支持。 wdUpdateSubscriber 6 不支持。

# WdEditionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdPublisher 0 不支持。 wdSubscriber 1 不支持。

# WdEditorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档的用户或用户组。

名称名称 值值 说明说明 wdEditorCurrent -6 代表文档的当前用户。 wdEditorEditors -5 代表使用“信息版权管理”的文档的“编辑”组。 wdEditorEveryone -1 代表打开文档的所有用户。 wdEditorOwners -4 代表使用“信息版权管理”的文档的“所有者”组。

# WdEmailHTMLFidelity 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是保留还是删除显示内容时不需要的 HTML 标记。

名称名称 值值 说明说明 wdEmailHTMLFidelityHigh 3 按原样保留 HTML 标记。 wdEmailHTMLFidelityLow 1 删除不影响消息显示方式的所有 HTML 标记。 wdEmailHTMLFidelityMedium 2 不支持。

# WdEmphasisMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于字符或指定字符串的着重号类型。

名称名称 值值 说明说明 wdEmphasisMarkNone 0 没有着重号。 wdEmphasisMarkOverComma 2 一个逗号。 wdEmphasisMarkOverSolidCircle 1 黑色实心圈。 wdEmphasisMarkOverWhiteCircle 3 白色空心圈。 wdEmphasisMarkUnderSolidCircle 4 黑色实心圈。

# WdEnableCancelKey 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 Ctrl+Break 能否中断宏。

名称名称 值值 说明说明 wdCancelDisabled 0 禁止 Ctrl+Break 中断宏。 wdCancelInterrupt 1 允许 Ctrl+Break 中断宏。

# WdEncloseStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定圈号的相对大小。

名称名称 值值 说明说明 wdEncloseStyleLarge 2 圈号较大。 wdEncloseStyleNone 0 圈号使用默认大小。 wdEncloseStyleSmall 1 圈号较小。

# WdEnclosureType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要用作圈号的符号类型。

名称名称 值值 说明说明 wdEnclosureCircle 0 圆圈。 wdEnclosureDiamond 3 菱形。 wdEnclosureSquare 1 方形。 wdEnclosureTriangle 2 三角形。

# WdEndnoteLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定尾注的位置。

名称名称 值值 说明说明 wdEndOfDocument 1 在活动文档的末尾。 wdEndOfSection 0 在当前节的末尾。

# WdEnvelopeOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定信封的方向。

名称名称 值值 说明说明 wdCenterClockwise 7 居中顺时针方向。 wdCenterLandscape 4 居中横向。 wdCenterPortrait 1 居中纵向。 wdLeftClockwise 6 靠左顺时针方向。 wdLeftLandscape 3 靠左横向。 wdLeftPortrait 0 靠左纵向。 wdRightClockwise 8 靠右顺时针方向。 wdRightLandscape 5 靠右横向。 wdRightPortrait 2 靠右纵向。

# WdExportCreateBookmarks 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定导出文档时包括哪些书签。

名称名称 值值 说明说明 在导出的文档中为每个 WPS 标题创建一个书签， WPS 标题只包含主文档和 wdExportCreateHeadingBookmarks 1 文本框中的标题，不包含页眉、页脚、尾注、脚注或注释中的标题。 wdExportCreateNoBookmarks 0 不在导出的文档中创建书签。 在导出的文档中为每个 WPS 书签创建一个书签， WPS 书签包括除页眉和页 wdExportCreateWordBookmarks 2 脚中所含书签以外的所有书签。

# WdExportFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于导出文档的格式。

名称名称 值值 说明说明 wdExportFormatPDF 17 将文档导出为 PDF 格式。 wdExportFormatXPS 18 将文档导出为 XML Paper Specification (XPS) 格式。

# WdExportItem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定导出文档时是否带标记。

名称名称 值值 说明说明 wdExportDocumentContent 0 导出文档时不带标记。 wdExportDocumentWithMarkup 7 导出文档时带标记。

# WdExportOptimizeFor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定导出文档的分辨率和质量。

名称名称 值值 说明说明 wdExportOptimizeForOnScreen 1 针对屏幕显示进行导出，质量较差，生成的文件大小较小。 wdExportOptimizeForPrint 0 针对打印进行导出，质量较高，生成的文件大小较大。

# WdExportRange 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要导出文档中的多少内容。

名称名称 值值 说明说明 wdExportAllDocument 0 导出整个文档。 wdExportCurrentPage 2 导出当前页。 wdExportFromTo 3 使用起始和结束位置导出某个范围的内容。 wdExportSelection 1 导出当前选择的内容。

# WdFarEastLineBreakLanguageID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在所指定文档或模板中对文本进行换行时使用的东亚语言。

名称名称 值值 说明说明 wdLineBreakJapanese 1041 日语。 wdLineBreakKorean 1042 朝鲜语。 wdLineBreakSimplifiedChinese 2052 简体中文。 wdLineBreakTraditionalChinese 1028 繁体中文。

# WdFarEastLineBreakLevel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为所指定文档指定换行符控件级别。

名称名称 值值 说明说明 wdFarEastLineBreakLevelCustom 2 自定义换行符控件。 wdFarEastLineBreakLevelNormal 0 普通换行符控件。 wdFarEastLineBreakLevelStrict 1 严格换行符控件。

# WdFieldKind 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 Field 对象的域类型。

名称名称 值值 说明说明 wdFieldKindCold 3 没有结果的域，如索引项 (XE) 域、目录项 (TC) 域或 Private 域。 每次显示或页面重新设置格式时自动更新的域，但也可进行手动更新（如 INCLUDEPICTURE 或 wdFieldKindHot 1 FORMDROPDOWN）。 wdFieldKindNone 0 无效的域（如其中没有任何内容的一对域字符）。

能进行更新并有结果的域。该类型包括随数据源变化而自动更新的域，也包括那些可以手动进行 wdFieldKindWarm 2 更新的域（如 DATE 或 INCLUDETEXT）。

# WdFieldShading 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定何时应用窗体域的屏幕底纹。

名称名称 值值 说明说明 wdFieldShadingAlways 1 始终应用。 wdFieldShadingNever 0 从不应用。 wdFieldShadingWhenSelected 2 只在选中窗体域时才应用。

# WdFieldType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 WPS 域。除非另有说明，否则本枚举中介绍的域类型都可以通过“域域”对话框以交互方式添加到 WPS 文档

中。有关特定域代码的详细信息，请参阅 WPS 帮助。

名称名称 值值 说明说明 wdFieldAddin 81 Add-in 域。不能通过“域域 ”对话框提供。用于存储不在用户界面上显示的数据。 wdFieldAddressBlock 93 AddressBlock 域。 wdFieldAdvance 84 Advance 域。 wdFieldAsk 38 Ask 域。 wdFieldAuthor 17 Author 域。 wdFieldAutoNum 54 AutoNum 域。 wdFieldAutoNumLegal 53 AutoNumLgl 域。 wdFieldAutoNumOutline 52 AutoNumOut 域。 wdFieldAutoText 79 AutoText 域。 wdFieldAutoTextList 89 AutoTextList 域。 wdFieldBarCode 63 BarCode 域。 wdFieldBidiOutline 92 BidiOutline 域。 wdFieldComments 19 Comments 域。 wdFieldCompare 80 Compare 域。 wdFieldCreateDate 21 CreateDate 域。 wdFieldData 40 Data 域。 wdFieldDatabase 78 Database 域。 wdFieldDate 31 Date 域。 wdFieldDDE 45 DDE 域。不再通过“域域 ”对话框提供，但早期版本的 WPS 所创建文档支持这样做。 wdFieldDDEAuto 46 DDEAuto 域。不再通过“域域 ”对话框提供，但早期版本的 WPS 所创建文档支持这样做。 wdFieldDocProperty 85 DocProperty 域。 wdFieldDocVariable 64 DocVariable 域。 wdFieldEditTime 25 EditTime 域。 wdFieldEmbed 58 Embedded 域。 Empty 域。充当尚未添加的域内容的占位符。在用户界面中通过按 Ctrl+F9 添加的域是 wdFieldEmpty -1 Empty 域。 wdFieldExpression 34 =（公式）域。 wdFieldFileName 29 FileName 域。 wdFieldFileSize 69 FileSize 域。 wdFieldFillIn 39 Fill-In 域。 wdFieldFootnoteRef 5 FootnoteRef 域。不能通过“域域 ”对话框提供， 但可以以编程方式或交互方式插入。 wdFieldFormCheckBox 71 FormCheckBox 域。 wdFieldFormDropDown 83 FormDropDown 域。 wdFieldFormTextInput 70 FormText 域。 wdFieldFormula 49 EQ（公式）域。 wdFieldGlossary 47 Glossary 域。 WPS 不再支持该域。 wdFieldGoToButton 50 GoToButton 域。 wdFieldGreetingLine 94 GreetingLine 域。 wdFieldHTMLActiveX 91 HTMLActiveX 域。目前不支持该域。 wdFieldHyperlink 88 Hyperlink 域。 wdFieldIf 7 If 域。 wdFieldImport 55 Import 域。不能通过“域域 ”对话框添加，但可以以交互方式或通过代码添加。 wdFieldInclude 36 Include 域。不能通过“域域 ”对话框添加，但可以以交互方式或通过代码添加。 wdFieldIncludePicture 67 IncludePicture 域。 wdFieldIncludeText 68 IncludeText 域。

wdFieldIncludeText 68 IncludeText 域。 wdFieldIndex 8 Index 域。 wdFieldIndexEntry 4 XE（索引项）域。 wdFieldInfo 14 Info 域。 wdFieldKeyWord 18 Keywords 域。 wdFieldLastSavedBy 20 LastSavedBy 域。 wdFieldLink 56 Link 域。 wdFieldListNum 90 ListNum 域。 wdFieldMacroButton 51 MacroButton 域。 wdFieldMergeField 59 MergeField 域。 wdFieldMergeRec 44 MergeRec 域。 wdFieldMergeSeq 75 MergeSeq 域。 wdFieldNext 41 Next 域。 wdFieldNextIf 42 NextIf 域。 wdFieldNoteRef 72 NoteRef 域。 wdFieldNumChars 28 NumChars 域。 wdFieldNumPages 26 NumPages 域。 wdFieldNumWords 27 NumWords 域。 OCX 域。不能通过“域域 ”对话框添加，但可以在代码中使用 Shapes 集合或 InlineShapes wdFieldOCX 87 集合的 AddOLEControl 方法添加。 wdFieldPage 33 Page 域。 wdFieldPageRef 37 PageRef 域。 wdFieldPrint 48 Print 域。 wdFieldPrintDate 23 PrintDate 域。 wdFieldPrivate 77 Private 域。 wdFieldQuote 35 Quote 域。 wdFieldRef 3 Ref 域。 wdFieldRefDoc 11 RD（参考文档）域。 wdFieldRevisionNum 24 RevNum 域。 wdFieldSaveDate 22 SaveDate 域。 wdFieldSection 65 Section 域。 wdFieldSectionPages 66 SectionPages 域。 wdFieldSequence 12 Seq（序列）域。 wdFieldSet 6 Set 域。 wdFieldShape 95 Shape 域。自动为线条图创建的域。 wdFieldSkipIf 43 SkipIf 域。 wdFieldStyleRef 10 StyleRef 域。 wdFieldSubject 16 Subject 域。 仅用于 Macintosh。有关该常量的信息，请参阅包含在 WPS OfficeMacintosh Edition 中的 wdFieldSubscriber 82 语言参考帮助。 wdFieldSymbol 57 Symbol 域。 wdFieldTemplate 30 Template 域。 wdFieldTime 32 Time 域。 wdFieldTitle 15 Title 域。 wdFieldTOA 73 TOA（引文目录）域。 wdFieldTOAEntry 74 TOA（引文目录项）域。 wdFieldTOC 13 TOC（目录）域。 wdFieldTOCEntry 9 TOC（目录项）域。

wdFieldUserAddress 62 UserAddress 域。 wdFieldUserInitials 61 UserInitials 域。 wdFieldUserName 60 UserName 域。 wdFieldBibliography 97 Bibliography 域。 wdFieldCitation 96 Citation 域。

# WdFindMatch 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdMatchAnyCharacter 65599 不支持。 wdMatchAnyDigit 65567 不支持。 wdMatchAnyLetter 65583 不支持。 wdMatchCaretCharacter 11 不支持。 wdMatchColumnBreak 14 不支持。 wdMatchCommentMark 5 不支持。 wdMatchEmDash 8212 不支持。 wdMatchEnDash 8211 不支持。 wdMatchEndnoteMark 65555 不支持。 wdMatchField 19 不支持。 wdMatchFootnoteMark 65554 不支持。 wdMatchGraphic 1 不支持。 wdMatchManualLineBreak 65551 不支持。 wdMatchManualPageBreak 65564 不支持。 wdMatchNonbreakingHyphen 30 不支持。 wdMatchNonbreakingSpace 160 不支持。 wdMatchOptionalHyphen 31 不支持。 wdMatchParagraphMark 65551 不支持。 wdMatchSectionBreak 65580 不支持。 wdMatchTabCharacter 9 不支持。 wdMatchWhiteSpace 65655 不支持。

# WdFindWrap 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在为查找操作指定某一所选内容或范围，但未在其中找到搜索文字时的换行行为。

名称名称 值值 说明说明 wdFindAsk 2 搜索完所选内容或范围后，WPS 会显示一条消息，询问是否搜索文档的其余部分。 wdFindContinue 1 到达搜索范围的开始或结尾时，继续执行查找操作。 wdFindStop 0 到达搜索范围的开始或结尾时，停止执行查找操作。

# WdFlowDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定从一个文本列到下一个文本列的文字排列方向。

名称名称 值值 说明说明 wdFlowLtr 0 列中的文字从左向右排列。 wdFlowRtl 1 列中的文字从右向左排列。

# WdFontBias 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为符号指定字体斜线。

名称名称 值值 说明说明 wdFontBiasDefault 0 默认字体斜线。 wdFontBiasDontCare 255 不指定字体斜线。 wdFontBiasFareast 1 亚洲语言字体斜线。

# WdFootnoteLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定脚注的位置。

名称名称 值值 说明说明 wdBeneathText 1 在当前文本下方。 wdBottomOfPage 0 在当前页面底部。

# WdFramePosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定按其计算图文框位置的参考点。

名称名称 值值 说明说明 wdFrameBottom -999997 下边距。 wdFrameCenter -999995 文档中央。 wdFrameInside -999994 图文框中的内容。 wdFrameLeft -999998 左边距。 wdFrameOutside -999993 图文框外的内容。 wdFrameRight -999996 右边距。 wdFrameTop -999999 上边距。

# WdFramesetNewFrameLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定新图文框相对于现有图文框的位置。

名称名称 值值 说明说明 wdFramesetNewFrameAbove 0 在现有图文框上方。 wdFramesetNewFrameBelow 1 在现有图文框下方。 wdFramesetNewFrameLeft 3 在现有图文框左侧。 wdFramesetNewFrameRight 2 在现有图文框右侧。

# WdFramesetSizeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何解释框架页上所指定框架的高度或宽度。

名称名称 值值 说明说明 wdFramesetSizeTypeFixed 1 WPS 将所指定框架的高度或宽度解释为固定值（以磅为单位）。 wdFramesetSizeTypePercent 0 WPS 将所指定框架的高度或宽度解释为屏幕高度或宽度的百分比。 wdFramesetSizeTypeRelative 2 WPS 将所指定框架的高度或宽度解释为相对于框架页上其他框架的高度或宽度。

# WdFramesetType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定框架的类型。

名称名称 值值 说明说明 wdFramesetTypeFrame 1 单个框架。 wdFramesetTypeFrameset 0 框架集。

# WdFrameSizeRule 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何解释用于确定框架高度或宽度的规则。

名称名称 值值 说明说明 wdFrameAtLeast 1 将框架的高度或宽度设置为大于或等于 Height 属性或 Width 属性指定的值。 wdFrameAuto 0 按照框架中项目的高度或宽度设置框架的高度或宽度。 wdFrameExact 2 将框架的高度或宽度设置为 Height 属性或 Width 属性指定的确切值。

# WdFrenchSpeller 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示在使用法语拼写检查词典时所使用的法语版本。

名称名称 值值 说明说明 wdFrenchBoth 0 在检查法语拼写时同时使用后期修订和前期修订法语词典。 wdFrenchPostReform 2 在检查法语拼写时只使用后期修订法语词典。 wdFrenchPreReform 1 在检查法语拼写时只使用前期修订法语词典。

# WdGoToDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要相对于对象或其自身移动所选内容或插入点的位置。

名称名称 值值 说明说明 wdGoToAbsolute 1 绝对位置。 wdGoToFirst 1 所指定对象的第一个实例。 wdGoToLast -1 所指定对象的最后一个实例。 wdGoToNext 2 所指定对象的下一个实例。 wdGoToPrevious 3 所指定对象的上一个实例。 wdGoToRelative 2 相对于当前位置的位置。

# WdGoToItem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要将插入点或所选内容移到其正前方的项目类型。

名称名称 值值 说明说明 wdGoToBookmark -1 书签。 wdGoToComment 6 批注。 wdGoToEndnote 5 尾注。 wdGoToEquation 10 公式。 wdGoToField 7 域。 wdGoToFootnote 4 脚注。 wdGoToGrammaticalError 14 语法错误。 wdGoToGraphic 8 图形。 wdGoToHeading 11 标题。 wdGoToLine 3 一个线段。 wdGoToObject 9 对象。 wdGoToPage 1 页。 wdGoToPercent 12 百分比。 wdGoToProofreadingError 15 校对错误。 wdGoToSection 0 一节。 wdGoToSpellingError 13 拼写错误。 wdGoToTable 2 一个表格。

# WdGranularity 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在比较两个文档时所要标记的修订的级别。

名称名称 值值 说明说明 wdGranularityCharLevel 0 在字符级别修订。 wdGranularityWordLevel 1 在字级别修订。

# WdGutterStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定装订线显示在文档中的位置。

名称名称 值值 说明说明 wdGutterPosLeft 0 左侧。 wdGutterPosRight 2 右侧。 wdGutterPosTop 1 顶部。

# WdGutterStyleOld 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定装订线样式应符合从左向右文字排列规则还是从右向左文字排列规则。

名称名称 值值 说明说明 wdGutterStyleBidi 2 应使用双向语言装订线才能符合从右向左文字排列规则。 wdGutterStyleLatin -10 应使用拉丁文装订线才能符合从左向右文字排列规则。

# WdHeaderFooterIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

返回文档或节中的指定页眉或页脚。

名称名称 值值 说明说明 wdHeaderFooterEvenPages 3 返回偶数页上的所有页眉或页脚。 wdHeaderFooterFirstPage 2 返回文档或节中的第一个页眉或页脚。 wdHeaderFooterPrimary 1 返回文档或节中除第一页外所有页上的页眉或页脚。

# WdHeadingSeparator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定两个索引标题之间的文字分隔符类型。

名称名称 值值 说明说明 wdHeadingSeparatorBlankLine 1 空行。 wdHeadingSeparatorLetter 2 指定的字母。 wdHeadingSeparatorLetterFull 4 指定的大写字母。 wdHeadingSeparatorLetterLow 3 指定的小写字符。 wdHeadingSeparatorNone 0 没有分隔符。

# WdHebSpellStart 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定希伯来语拼写检查将遵循的规则。

名称名称 值值 说明说明

拼写检查遵循常规的书写规则，即希伯来语言学院规定的不包含音调符号的文字的书写规 wdFullScript 0 则。

拼写检查遵循常规和传统的拼写规则，但在任何系统内不允许的任何拼写变体和任何无法 wdMixedAuthorizedScript 3 完整识别的单词都作为潜在的错误突出显示。

拼写检查遵循常规和传统的书写规则并允许非常规的书写变体。仅将完全无法识别的单词 wdMixedScript 2 作为潜在的错误突出显示。 wdPartialScript 1 拼写检查遵循仅用于带音调符号的文字的传统书写规则。

# WdHelpType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要显示的帮助主题或窗口的类型。

名称名称 值值 说明说明 wdHelp 0 显示“帮助主题帮助主题 ”对话框。 wdHelpAbout 1 显示“关于关于 WPS ”对话框。 wdHelpActiveWindow 2 显示描述与当前视图或窗格相关的命令的帮助。 wdHelpContents 3 显示“帮助主题帮助主题 ”对话框。 wdHelpExamplesAndDemos 4 显示示例和演示。 wdHelpHWP 13 为朝鲜文用户显示帮助主题。 wdHelpIchitaro 11 为 Ichitaro 用户显示帮助主题。 wdHelpIndex 5 显示“帮助主题帮助主题 ”对话框。 wdHelpKeyboard 6 显示与帮助相关的键盘快捷键。 wdHelpPE2 12 为 IBM Personal Editor 2 用户显示帮助主题。 wdHelpPSSHelp 7 显示产品支持信息 wdHelpQuickPreview 8 显示快速预览。 wdHelpSearch 9 显示“帮助主题帮助主题 ”对话框。 wdHelpUsingHelp 10 显示描述如何使用帮助的帮助主题列表。

# WdHighAnsiText 枚举枚举

# WdHighAnsiText 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何解释高端 ANSI 字符。

名称名称 值值 说明说明 只有在 WPS 自动检测到东亚语言文字时， WPS 才将高端 ANSI 字符译码为东亚语 wdAutoDetectHighAnsiFarEast 2 言字符。 wdHighAnsiIsFarEast 0 WPS 不将任何高端 ANSI 字符译码为东亚字符。 wdHighAnsiIsHighAnsi 1 WPS 将所有高端 ANSI 字符译码为东亚字符。

# WdHorizontalInVerticalType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定竖排文字中设置的横向文字格式。

名称名称 值值 说明说明 wdHorizontalInVerticalFitInLine 1 根据竖排文字行调整横向文字。 wdHorizontalInVerticalNone 0 不对横向文字应用格式。 wdHorizontalInVerticalResizeLine 2 根据横向文字调整竖排文字行。

# WdHorizontalLineAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定横线的对齐方式。

名称名称 值值 说明说明 wdHorizontalLineAlignCenter 1 居中。 wdHorizontalLineAlignLeft 0 左对齐。 wdHorizontalLineAlignRight 2 右对齐。

# WdHorizontalLineWidthType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何解释指定横线的宽度（长度）。

名称名称 值值 说明说明 WPS 将指定横线的宽度（长度）解释为固定值（以磅为单位）。该值为使用 wdHorizontalLineFixedWidth -2 AddHorizontalLine 方法添加的横线的默认值。设置与横线相关联的 InlineShape 对象的 Width 属性可将 WidthType 属性设为该值。 WPS 将指定横线的宽度（长度）解释为屏幕宽度的百分比。该值为使用 wdHorizontalLinePercentWidth -1 AddHorizontalLineStandard 方法添加的横线的默认值。设置横线的 PercentWidth 属性可将 WidthType 属性设为该值。

# WdIMEMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定日文输入法编辑器 (IME) 的默认启动模式。

名称名称 值值 说明说明 wdIMEModeAlpha 8 激活输入法的半角拉丁文模式。 wdIMEModeAlphaFull 7 激活输入法的全角拉丁文模式。 wdIMEModeHangul 10 激活输入法的半角朝鲜语模式。 wdIMEModeHangulFull 9 激活输入法的全角朝鲜语模式。 wdIMEModeHiragana 4 激活输入法的全角平假名模式。 wdIMEModeKatakana 5 激活输入法的全角片假名模式。 wdIMEModeKatakanaHalf 6 激活输入法的半角片假名模式。 wdIMEModeNoControl 0 不更改输入法模式。 wdIMEModeOff 2 关闭输入法并激活拉丁文输入方式。 wdIMEModeOn 1 激活输入法。

# WdIndexFilter 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 对指定索引中各项的第一个字符进行分类的方式。

名称名称 值值 说明说明 wdIndexFilterAiueo 1 日文字使用 AIUEO 字母表示方法。 wdIndexFilterAkasatana 2 日文字使用 Akasatana。 wdIndexFilterChosung 3 韩文字使用 Chosung。 wdIndexFilterFull 6 韩文字使用 Chosung。 wdIndexFilterLow 4 日文字使用 Akasatana。 wdIndexFilterMedium 5 日文字使用 AIUEO 字母表示方法。 wdIndexFilterNone 0 没有特殊筛选方式。

# WdIndexFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档中索引的格式。

名称名称 值值 说明说明 wdIndexBulleted 4 项目符号。 wdIndexClassic 1 古典型。 wdIndexFancy 2 流行。 wdIndexFormal 5 正式。 wdIndexModern 3 现代。 wdIndexSimple 6 简明型。 wdIndexTemplate 0 来自模板。

# WdIndexSortBy 枚举枚举

# WdIndexSortBy 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 排序指定索引时使用的条件。

名称名称 值值 说明说明 wdIndexSortByStroke 0 根据字符的笔画数排序。 wdIndexSortBySyllable 1 按发音排序。

# WdIndexType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定索引的类型。

名称名称 值值 说明说明 wdIndexIndent 0 缩进索引。 wdIndexRunin 1 接排式索引。

# WdInformation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定返回的涉及指定所选内容或区域的信息的类型。

名称名称 值值 说明说明

返回页码，在该 页中包含指定的 所选内容或区域 的活动结尾。如 wdActiveEndAdjustedPageNumber 1果设置一个起始wdActiveEndPageNumber 页码或进行其他 手动调整，则返 回经调整的页码 （与

返回页码，在该 页中包含指定的 所选内容或区域 wdActiveEndPageNumber 3的活动结尾。从wdActiveEndAdjustedPageNumber 文档开头计数。 忽略任何对页码 的手动调整（与

返回节号，在该 节中包含了指定 wdActiveEndSectionNumber 2 的所选内容或区 域的活动结尾。

如果指定的所选 内容或区域位于 wdAtEndOfRowMarker 31表格的行结尾标 记处，则该参数 返回 True。 如果 Caps Lock wdCapsLock 21有效，则该参数 返回 True。

返回表格列号， 在该表格列中包 wdEndOfRangeColumnNumber 17含指定的所选内 容或区域的结 尾。

返回表格行号， 在该表格行中包

在该表格行中包 wdEndOfRangeRowNumber 14含指定的所选内 容或区域的结 尾。

返回指定的所选 内容或区域中第 一个字符的位 置。如果所选内 容或区域是折叠 的，则返回紧靠 wdFirstCharacterColumnNumber 9 所选内容或区域 右侧的字符编号 （该编号与状态 栏中“列”后面的 字符列数相 同）。

返回指定的所选 内容或区域中第 一个字符的位 置。如果所选内 容或区域是折叠 的，则返回紧靠 wdFirstCharacterLineNumber 10 所选内容或区域 右侧的字符编号 （该编号与状态 栏中“行”后面的 字符行数相 同）。

如果所选内容或 区域是一个完整 wdFrameIsSelected 11的图文框或文本 框，则该参数返 回 True。

返回一个值，该 值指示包含了指 定所选内容或区 域的页眉或页脚 wdHeaderFooterType 33 的类型。有关其 他信息，请参 阅“注解”部分中 的表。

返回指定的所选 内容或区域的水 平位置。该位置 是所选内容或区 域的左边缘与页 面的左边缘之间 的距离，以磅为 wdHorizontalPositionRelativeToPage 5 单位（1 磅 = 20 缇，72 磅 = 1 英寸）。如果所 选内容或区域未 显示在屏幕上， 则该参数返回 - 1。

返回指定所选内 容或区域相对于 周围最近的正文 边界左边缘的水 平位置，以磅为 单位（1 磅 = 20 wdHorizontalPositionRelativeToTextBoundary 7 缇，72 磅 = 1 英寸）。如果所 选内容或区域未 显示在屏幕上， 则该参数返回 - 1。

有关该常量的信 息，请参阅包含 在 WPS wdInClipboard 38 OfficeMacintosh Edition 中的语 言参考帮助。

如果指定的所选 内容或区域位于 wdInCommentPane 26批注窗格，则该

wdInCommentPane 26 批注窗格，则该 参数返回 True。

如果指定的所选 内容或区域位于 页面视图的尾注 wdInEndnote 36区内，或者位于 普通视图的尾注 窗格中，则该参 数返回 True。

如果指定的所选 内容或区域位于 页面视图的脚注 wdInFootnote 35区内，或者位于 普通视图的脚注 窗格中，则该参 数返回 True。

如果指定的所选 内容或区域位于 普通视图的脚注 或尾注窗格中， 或页面视图的脚 wdInFootnoteEndnotePane 25wdInFootnote wdInEndnote 注或尾注区内， 则该参数返回 True。有关详 细信息，请参阅 前面关于

如果指定的所选 内容或区域位于 页眉或页脚窗格 wdInHeaderFooter 28中，或者位于页 面视图的页眉或 页脚中，则该参 数返回 True。

如果所选内容或 区域位于主控文 档（即至少包含 wdInMasterDocument 34 一个子文档的文 档）中，则该参 数返回 True。

如果指定的所选 内容或区域位于 页眉或页脚窗格 wdInWordMail 37中，或者位于页 面视图的页眉或 页脚中，则该参 数返回 True。

返回所选内容或 wdMaximumNumberOfColumns 18区域中任何行的 最大表格列数。

返回指定的所选 wdMaximumNumberOfRows 15内容或区域中表 格的最大行数。

返回与所选内容 wdNumberOfPagesInDocument 4或区域相关联的 文档的页数。 如果 Num Lock wdNumLock 22有效，则该参数 返回 True。

如果启用改写模 式，则该参数返 回 True。可使 wdOverType 23 用 Overtype 属 性改变改写模式 的状态。

返回一个值，该 值表明所选内容 相对于脚注、尾 wdReferenceOfType 32注或批注引用的 位置，如“注 解”部分中的表 所示。

如果打开修订功

如果打开修订功 wdRevisionMarking 24能，则该参数返 回 True。

返回一个值，该 值表明当前的选 wdSelectionMode 20 定模式，如下表 所示。

返回表格列号， 在该表格列中包 wdStartOfRangeColumnNumber 16 含所选内容或区 域的起点。

返回表格行号， 在该表格行中包 wdStartOfRangeRowNumber 13 含所选内容或区 域的起点。

返回所选内容或 区域的垂直位 置，即所选内容 的上边缘与页面 的上边缘之间的 距离，以磅为单 wdVerticalPositionRelativeToPage 6 位（1 磅 = 20 缇，72 磅 = 1 英寸）。如果所 选内容未显示在 文档窗口中，则 该参数返回 -1。

返回所选内容或 区域相对于周围 最近的正文边界 的上边缘的垂直 位置，以磅为单 位（1 磅 = 20 缇，72 磅 = 1 wdVerticalPositionRelativeToTextBoundary 8 英寸）。该参数 可用于在图文框 或表格中确定插 入点位置。如果 所选内容未显示 在屏幕中，则该 参数返回 -1。

如果所选内容位 于表格中，则该 wdWithInTable 12 参数返回 True。 wdZoomPercentage 19 返回由 Percentage

# WdInlineShapeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定内嵌形状的形状类型。

名称名称 值值 说明说明 wdInlineShapeChart 12 内嵌图表。 wdInlineShapeDiagram 13 内嵌关系图。 wdInlineShapeEmbeddedOLEObject 1 嵌入的 OLE 对象。 wdInlineShapeHorizontalLine 6 横线。 wdInlineShapeLinkedOLEObject 2 链接的 OLE 对象。 wdInlineShapeLinkedPicture 4 链接的图片。 wdInlineShapeLinkedPictureHorizontalLine 8 带有横线的链接图片。 wdInlineShapeLockedCanvas 14 锁定的内嵌形状画布。 wdInlineShapeOLEControlObject 5 OLE 控件对象。 wdInlineShapeOWSAnchor 11 OWS 锁定标记。 wdInlineShapePicture 3 图片。 wdInlineShapePictureBullet 9 用作项目符号的图片。 wdInlineShapePictureHorizontalLine 7 带有横线的图片。 wdInlineShapeScriptAnchor 10 脚本定位标记。指与文档一起存储的脚本块的定位标记位置。

# WdInsertCells 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要添加到现有表格中的单元格的位置和类型。

名称名称 值值 说明说明 wdInsertCellsEntireColumn 3 在所选内容所在列的左侧插入整列。 wdInsertCellsEntireRow 2 在所选内容所在行的上方插入整行。 wdInsertCellsShiftDown 1 在所选单元格的上方插入新单元格。 wdInsertCellsShiftRight 0 在所选单元格的左侧插入新单元格。

# WdInsertedTextMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定启用修订功能时所插入文字的格式。

名称名称 值值 说明说明 wdInsertedTextMarkBold 1 以加粗样式显示插入文字。 wdInsertedTextMarkColorOnly 5 用指定颜色显示插入文字。 wdInsertedTextMarkDoubleUnderline 4 用双下划线字符标记插入文字。 wdInsertedTextMarkItalic 2 以倾斜样式显示插入文字。 wdInsertedTextMarkNone 0 不标记插入文字。 wdInsertedTextMarkStrikeThrough 6 用删除线符号标记插入文字。 wdInsertedTextMarkUnderline 3 给插入文字加下划线。 wdInsertedTextMarkDoubleStrikeThrough 7 用双删除线符号标记插入文字。

# WdInternationalIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当前国家/地区和国际设置特定的信息。

名称名称 值值 说明说明 wd24HourClock 21 如果使用 24 小时制，则返回 True；如果使用 12 小时制，则返回 False。 wdCurrencyCode 20 返回货币符号（在美国英语中使用 $）。 wdDateSeparator 25 返回日期分隔符（在美国英语中使用 /）。 wdDecimalSeparator 18 返回小数点分隔符（在美国英语中使用 .）。 wdInternationalAM 22 返回用于指示上午时间的字符串（如 10 AM）。 wdInternationalPM 23 返回用于指示下午时间的字符串（如 2 PM）。 wdListSeparator 17 返回列表分隔符（在美国英语中使用 ,）。 wdProductLanguageID 26 返回 WPS 的语言版本。 wdThousandsSeparator 19 返回千位分隔符（在美国英语中使用 ,）。 wdTimeSeparator 24 返回时间分隔符（在美国英语中使用 :）。

# WdJustificationMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档的字符间距调整。

名称名称 值值 说明说明 wdJustificationModeCompress 1 紧缩。 wdJustificationModeCompressKana 2 使用假名音节表（即平假名和片假名）规则进行紧缩。 wdJustificationModeExpand 0 加宽。

# WdKana 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所选日文文字的格式。

名称名称 值值 说明说明 wdKanaHiragana 9 该文字的格式设置为平假名。 wdKanaKatakana 8 该文字的格式设置为片假名。

# WdKeyCategory 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分配给键绑定的项目的类型。

名称名称 值值 说明说明 wdKeyCategoryAutoText 4 键分配给自动图文集。 wdKeyCategoryCommand 1 键分配给命令。 wdKeyCategoryDisable 0 键被禁用。 wdKeyCategoryFont 3 键分配给字体。 wdKeyCategoryMacro 2 键分配给宏。 wdKeyCategoryNil -1 未分配键。 wdKeyCategoryPrefix 7 键分配给前缀。 wdKeyCategoryStyle 5 键分配给样式。 wdKeyCategorySymbol 6 键分配给符号。

# WdLanguageID 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的语言。

名称名称 值值 说明说明 wdAfrikaans 1078 非洲语言。 wdAlbanian 1052 阿尔巴尼亚语。 wdAmharic 1118 阿姆哈拉语。 wdArabic 1025 阿拉伯语。 wdArabicAlgeria 5121 阿拉伯语（阿尔及利亚）。 wdArabicBahrain 15361 阿拉伯语（巴林）。 wdArabicEgypt 3073 阿拉伯语（埃及）。 wdArabicIraq 2049 阿拉伯语（伊拉克）。 wdArabicJordan 11265 阿拉伯语（约旦）。 wdArabicKuwait 13313 阿拉伯语（科威特）。 wdArabicLebanon 12289 阿拉伯语（黎巴嫩）。 wdArabicLibya 4097 阿拉伯语（利比亚）。 wdArabicMorocco 6145 阿拉伯语（摩洛哥）。 wdArabicOman 8193 阿拉伯语（阿曼）。 wdArabicQatar 16385 阿拉伯语（卡塔尔）。 wdArabicSyria 10241 阿拉伯语（叙利亚）。 wdArabicTunisia 7169 阿拉伯语（突尼斯）。 wdArabicUAE 14337 阿拉伯语（阿拉伯联合酋长国）。 wdArabicYemen 9217 阿拉伯语（也门）。 wdArmenian 1067 亚美尼亚语。 wdAssamese 1101 阿萨姆语。 wdAzeriCyrillic 2092 阿塞拜疆语（西里尔文）。 wdAzeriLatin 1068 阿塞拜疆语（拉丁文）。 wdBasque 1069 巴斯克语。 wdBelgianDutch 2067 荷兰语（比利时）。 wdBelgianFrench 2060 法语（比利时）。 wdBengali 1093 孟加拉语。 wdBulgarian 1026 保加利亚语。 wdBurmese 1109 缅甸语。

wdBurmese 1109 缅甸语。 wdByelorussian 1059 白俄罗斯语。 wdCatalan 1027 加泰罗尼亚语。 wdCherokee 1116 切罗基语。 wdChineseHongKongSAR 3076 中文（香港特别行政区）。 wdChineseMacaoSAR 5124 中文（澳门特别行政区）。 wdChineseSingapore 4100 中文（新加坡）。 wdCroatian 1050 克罗地亚语。 wdCzech 1029 捷克语。 wdDanish 1030 丹麦语。 wdDivehi 1125 马尔代夫语。 wdDutch 1043 荷兰语。 wdEdo 1126 克瓦语。 wdEnglishAUS 3081 英语（澳大利亚）。 wdEnglishBelize 10249 英语（伯利兹）。 wdEnglishCanadian 4105 英语（加拿大）。 wdEnglishCaribbean 9225 英语（加勒比海）。 wdEnglishIndonesia 14345 英语（印度尼西亚）。 wdEnglishIreland 6153 英语（爱尔兰）。 wdEnglishJamaica 8201 英语（牙买加）。 wdEnglishNewZealand 5129 英语（新西兰）。 wdEnglishPhilippines 13321 英语（菲律宾）。 wdEnglishSouthAfrica 7177 英语（南非）。 wdEnglishTrinidadTobago 11273 英语（特立尼达和多巴哥）。 wdEnglishUK 2057 英语（英国）。 wdEnglishUS 1033 英语（美国）。 wdEnglishZimbabwe 12297 英语（津巴布韦）。 wdEstonian 1061 爱沙尼亚语。 wdFaeroese 1080 法罗语。 wdFilipino 1124 菲律宾语。 wdFinnish 1035 芬兰语。 wdFrench 1036 法语。 wdFrenchCameroon 11276 法语（喀麦隆）。 wdFrenchCanadian 3084 法语（加拿大）。 wdFrenchCongoDRC 9228 法语（刚果民主共和国）。 wdFrenchCotedIvoire 12300 法语（科特迪瓦）。 wdFrenchHaiti 15372 法语（海地）。 wdFrenchLuxembourg 5132 法语（卢森堡）。 wdFrenchMali 13324 法语（马里）。 wdFrenchMonaco 6156 法语（摩纳哥）。 wdFrenchMorocco 14348 法语（摩洛哥）。 wdFrenchReunion 8204 法语（留尼旺岛）。 wdFrenchSenegal 10252 法语（塞内加尔）。 wdFrenchWestIndies 7180 法语（西印度群岛）。 wdFrisianNetherlands 1122 法语（荷兰）。 wdFulfulde 1127 富尔贝语。 wdGaelicIreland 2108 盖尔语（爱尔兰）。 wdGaelicScotland 1084 盖尔语（苏格兰）。

wdGaelicScotland 1084 盖尔语（苏格兰）。 wdGalician 1110 加利西亚语。 wdGeorgian 1079 格鲁吉亚语。 wdGerman 1031 德语。 wdGermanAustria 3079 德语（奥地利）。 wdGermanLiechtenstein 5127 德语（列支敦士登）。 wdGermanLuxembourg 4103 德语（卢森堡）。 wdGreek 1032 希腊语。 wdGuarani 1140 瓜拉尼语。 wdGujarati 1095 古吉拉特语。 wdHausa 1128 豪萨语。 wdHawaiian 1141 夏威夷语。 wdHebrew 1037 希伯来语。 wdHindi 1081 印地语。 wdHungarian 1038 匈牙利语。 wdIbibio 1129 伊比比奥语。 wdIcelandic 1039 冰岛语。 wdIgbo 1136 伊博语。 wdIndonesian 1057 印度尼西亚语。 wdInuktitut 1117 因纽特语。 wdItalian 1040 意大利语。 wdJapanese 1041 日语。 wdKannada 1099 卡纳达语。 wdKanuri 1137 卡努里语。 wdKashmiri 1120 克什米尔语。 wdKazakh 1087 哈萨克语。 wdKhmer 1107 高棉语。 wdKirghiz 1088 吉尔吉斯语。 wdKonkani 1111 贡根语。 wdKorean 1042 朝鲜语。 wdKyrgyz 1088 吉尔吉斯语。 wdLanguageNone 0 未指定语言。 wdLao 1108 老挝语。 wdLatin 1142 拉丁语。 wdLatvian 1062 拉脱维亚语。 wdLithuanian 1063 立陶宛语。 wdMacedonianFYROM 1071 马其顿语 (FYROM)。 wdMalayalam 1100 马拉雅拉姆语。 wdMalayBruneiDarussalam 2110 马来语（文莱达鲁萨兰国）。 wdMalaysian 1086 马来西亚语。 wdMaltese 1082 马耳他语。 wdManipuri 1112 曼尼普尔语。 wdMarathi 1102 马拉地语。 wdMexicanSpanish 2058 西班牙语（墨西哥）。 wdMongolian 1104 蒙古语。 wdNepali 1121 尼泊尔语。 如果语言标识符标识的语言使用 WPS 校对工具从语法上验证对象，则禁用校 wdNoProofing 1024 对。

对。 wdNorwegianBokmol 1044 挪威博克马尔语。 wdNorwegianNynorsk 2068 挪威尼诺斯克语。 wdOriya 1096 奥里雅语。 wdOromo 1138 奥莫罗人使用的库希特语。 wdPashto 1123 普什图语。 wdPersian 1065 波斯语。 wdPolish 1045 波兰语。 wdPortuguese 2070 葡萄牙语。 wdPortugueseBrazil 1046 葡萄牙语（巴西）。 wdPunjabi 1094 旁遮普语。 wdRhaetoRomanic 1047 利多罗曼语。 wdRomanian 1048 罗马尼亚语。 wdRomanianMoldova 2072 罗马尼亚语（摩尔多瓦）。 wdRussian 1049 俄语。 wdRussianMoldova 2073 俄语（摩尔多瓦）。 wdSamiLappish 1083 萨米语（拉普语）。 wdSanskrit 1103 梵语。 wdSerbianCyrillic 3098 塞尔维亚语（西里尔文）。 wdSerbianLatin 2074 塞尔维亚语（拉丁文）。 wdSesotho 1072 塞索托语。 wdSimplifiedChinese 2052 简体中文。 wdSindhi 1113 信德语。 wdSindhiPakistan 2137 信德语（巴基斯坦） wdSinhalese 1115 僧伽罗语。 wdSlovak 1051 斯洛伐克语。 wdSlovenian 1060 斯洛文尼亚语。 wdSomali 1143 索马里语。 wdSorbian 1070 索布语。 wdSpanish 1034 西班牙语。 wdSpanishArgentina 11274 西班牙语（阿根廷）。 wdSpanishBolivia 16394 西班牙语（玻利维亚）。 wdSpanishChile 13322 西班牙语（智利）。 wdSpanishColombia 9226 西班牙语（哥伦比亚）。 wdSpanishCostaRica 5130 西班牙语（哥斯达黎加） wdSpanishDominicanRepublic 7178 西班牙语（多米尼加共和国）。 wdSpanishEcuador 12298 西班牙语（厄瓜多尔）。 wdSpanishElSalvador 17418 西班牙语（萨尔瓦多）。 wdSpanishGuatemala 4106 西班牙语（危地马拉）。 wdSpanishHonduras 18442 西班牙语（洪都拉斯）。 wdSpanishModernSort 3082 西班牙语（现代风格）。 wdSpanishNicaragua 19466 西班牙语（智利）。 wdSpanishPanama 6154 西班牙语（尼加拉瓜）。 wdSpanishParaguay 15370 西班牙语（巴拉圭）。 wdSpanishPeru 10250 西班牙语（秘鲁）。 wdSpanishPuertoRico 20490 西班牙语（波多黎各） wdSpanishUruguay 14346 西班牙语（乌拉圭）。

wdSpanishVenezuela 8202 西班牙语（委内瑞拉）。 wdSutu 1072 苏图语。 wdSwahili 1089 斯瓦希里语。 wdSwedish 1053 瑞典语。 wdSwedishFinland 2077 瑞典语（芬兰）。 wdSwissFrench 4108 法语（瑞士）。 wdSwissGerman 2055 德语（瑞士）。 wdSwissItalian 2064 意大利语（瑞士）。 wdSyriac 1114 叙利亚语。 wdTajik 1064 塔吉克语。 wdTamazight 1119 塔马塞特语。 wdTamazightLatin 2143 塔马塞特语（拉丁文）。 wdTamil 1097 泰米尔语。 wdTatar 1092 鞑靼语。 wdTelugu 1098 泰卢固语。 wdThai 1054 泰语。 wdTibetan 1105 藏语。 wdTigrignaEritrea 2163 提格里尼亚语（厄立特里亚省）。 wdTigrignaEthiopic 1139 提格里尼亚语（埃塞俄比亚）。 wdTraditionalChinese 1028 繁体中文。 wdTsonga 1073 汤加语。 wdTswana 1074 茨瓦纳语。 wdTurkish 1055 土耳其语。 wdTurkmen 1090 土库曼语。 wdUkrainian 1058 乌克兰语。 wdUrdu 1056 乌尔都语。 wdUzbekCyrillic 2115 乌兹别克语（西里尔文）。 wdUzbekLatin 1091 乌兹别克语（拉丁文）。 wdVenda 1075 文达语。 wdVietnamese 1066 越南语。 wdWelsh 1106 威尔士语。 wdXhosa 1076 索萨语。 wdYi 1144 彝语。 wdYiddish 1085 意第绪语。 wdYoruba 1130 约鲁巴语。 wdZulu 1077 祖鲁语。

# WdLayoutMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在当前文档的版式模式下排放文本的方式。

名称名称 值值 说明说明 wdLayoutModeDefault 0 排放文本时不使用网格。 文本排放在网格之上；用户指定行数和每行的字符数，当用户键入时，WPS 会自动将字符 wdLayoutModeGenko 3 与网格线对齐。 文本排放于网格之上；用户指定行数和每行的字符数，当用户键入时，WPS 不自动使字符 wdLayoutModeGrid 1 与网格线对齐。 wdLayoutModeLineGrid 2 文本排放于网格之上；用户指定行数但不指定每行的字符数。

# WdLetterheadLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定“英文信函向导”所创建的信函中信头的位置。

名称名称 值值 说明说明 wdLetterBottom 1 在信函的底部。 wdLetterLeft 2 在信函的左侧。 wdLetterRight 3 在信函的右侧。 wdLetterTop 0 在信函的顶端。

# WdLetterStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定“英文信函向导”所创建信函的布局。

名称名称 值值 说明说明 wdFullBlock 0 完整区域。 wdModifiedBlock 1 修改过的区域。 wdSemiBlock 2 局部区域。

# WdLigatures 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用于字体的连字类型。

注释注释 应用连字类型组合时，首选项的顺序依字体的不同而有所不同，且不受 WPS 2015 应用程序控制。

注释注释 应用连字类型组合时，首选项的顺序依字体的不同而有所不同，且不受 WPS 2015 应用程序控制。

名称名称 值值 说明说明 wdLigaturesAll 15 将所有连字类型应用于字体。

将上下文连字应用于字体。上下文连字通常设计用来增强可读性， wdLigaturesContextual 2 但也可能完全用于装饰。上下文连字还可能是上下文替换。 wdLigaturesContextualDiscretional 10 将上下文和任意连字应用于字体。 wdLigaturesContextualHistorical 6 将上下文和历史连字应用于字体。 wdLigaturesContextualHistoricalDiscretional 14 将上下文、历史和任意连字应用于字体。

将任意连字应用于字体。任意连字最常用于根据类型开发人员的决 wdLigaturesDiscretional 8 定来对字体进行装饰。

将历史连字应用于字体。历史连字类似于标准连字，它们最初用来 wdLigaturesHistorical 4提高字体的可读性，但是对于现代读者，它们可能看起来比较古 老。 wdLigaturesHistoricalDiscretional 12 将历史和任意连字应用于字体。 wdLigaturesNone 0 不对字体应用任何连字。

将标准连字应用于字体。标准连字设计用来增强可读性。例如，拉 wdLigaturesStandard 1 丁语言中的标准连字包括“fi”、“fl”和“ff”。 wdLigaturesStandardContextual 3 将标准和上下文连字应用于字体。 wdLigaturesStandardContextualDiscretional 11 将标准、上下文和任意连字应用于字体。 wdLigaturesStandardContextualHistorical 7 将标准、上下文和历史连字应用于字体。 wdLigaturesStandardDiscretional 9 将标准和任意连字应用于字体。 wdLigaturesStandardHistorical 5 将标准和历史连字应用于字体。 wdLigaturesStandardHistoricalDiscretional 13 将标准、历史和任意连字应用于字体。

# WdLineEndingType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 在另存为文本文件的文档中标记换行符和分段符的方式。

名称名称 值值 说明说明 wdCRLF 0 回车后换行。 wdCROnly 1 只使用回车。 wdLFCR 3 换行后回车。 wdLFOnly 2 只使用换行。 wdLSPS 4 不支持。

# WdLineSpacing 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于段落的行距格式。

名称名称 值值 说明说明 wdLineSpace1pt5 1 1.5 倍行距。该行距相当于当前字号加 6 磅。 wdLineSpaceAtLeast 3 行距至少为一个指定值。该值需要单独指定。 wdLineSpaceDouble 2 双倍行距。 wdLineSpaceExactly 4 行距只能是所需的最大行距。此设置所使用的行距通常小于单倍行距。 wdLineSpaceMultiple 5 由指定的行数确定的行距。 wdLineSpaceSingle 0 单倍行距，默认值。

# WdLineStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象的边框样式。

名称名称 值值 说明说明 wdLineStyleDashDot 5 划线后跟点。 wdLineStyleDashDotDot 6 划线后跟两个点。 wdLineStyleDashDotStroked 20 划线后跟粗点，使边框的外观类似于理发店招牌。 wdLineStyleDashLargeGap 4 划线后跟大间隙。 wdLineStyleDashSmallGap 3 划线后跟小间隙。 wdLineStyleDot 2 点。 wdLineStyleDouble 7 双实线。 wdLineStyleDoubleWavy 19 波浪型双实线。 wdLineStyleEmboss3D 21 边框呈现三维阳文效果。 wdLineStyleEngrave3D 22 边框呈现三维阴文效果。 wdLineStyleInset 24 边框呈现凹进效果。 wdLineStyleNone 0 无边框。 wdLineStyleOutset 23 边框呈现凸起效果。 wdLineStyleSingle 1 单实线 wdLineStyleSingleWavy 18 波浪型单实线。 wdLineStyleThickThinLargeGap 16 里面是一条粗实线，外面是一条细实线，两条线的间隙较大。 wdLineStyleThickThinMedGap 13 里面是一条粗实线，外面是一条细实线，两条线的间隙中等。 wdLineStyleThickThinSmallGap 10 里面是一条粗实线，外面是一条细实线，两条线的间隙较小。 wdLineStyleThinThickLargeGap 15 里面是一条细实线，外面是一条粗实线，两条线的间隙较大。 wdLineStyleThinThickMedGap 12 里面是一条细实线，外面是一条粗实线，两条线的间隙中等。 wdLineStyleThinThickSmallGap 9 里面是一条细实线，外面是一条粗实线，两条线的间隙较小。

最里面是一条细实线，其次是一条粗实线，最外面是一条细实线，所有线之间 wdLineStyleThinThickThinLargeGap 17 的间隙较大。

最里面是一条细实线，其次是一条粗实线，最外面是一条细实线，所有线之间 wdLineStyleThinThickThinMedGap 14 的间隙中等。

最里面一条细实线，其次一条粗实线，最外面是一条细实线，所有线之间的间 wdLineStyleThinThickThinSmallGap 11 隙较小。 wdLineStyleTriple 8 三条细实线。

# WdLineType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定行是文本行还是表格行。

名称名称 值值 说明说明 wdTableRow 1 表格行。 wdTextLine 0 文档正文中的文本行。

# WdLineWidth 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象边框的宽度。

名称名称 值值 说明说明 wdLineWidth025pt 2 0.25 磅。 wdLineWidth050pt 4 0.50 磅。 wdLineWidth075pt 6 0.75 磅。 wdLineWidth100pt 8 1.00 磅，默认值。 wdLineWidth150pt 12 1.50 磅。 wdLineWidth225pt 18 2.25 磅。 wdLineWidth300pt 24 3.00 磅。 wdLineWidth450pt 36 4.50 磅。 wdLineWidth600pt 48 6.00 磅。

# WdLinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接的类型。

名称名称 值值 说明说明 wdLinkTypeChart 8 ET 图表。 wdLinkTypeDDE 6 动态数据交换。 wdLinkTypeDDEAuto 7 DDE 自动化。 wdLinkTypeImport 5 导入文件。 wdLinkTypeInclude 4 附带文件。 wdLinkTypeOLE 0 OLE 对象。 wdLinkTypePicture 1 图片。 wdLinkTypeReference 3 参考库。 wdLinkTypeText 2 文本。

# WdListApplyTo 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用列表模板的列表部分。

名称名称 值值 说明说明 wdListApplyToSelection 2 所选内容。 wdListApplyToThisPointForward 1 从光标插入点到列表末尾。 wdListApplyToWholeList 0 整个列表。

# WdListGalleryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表模板库中的列表类型。

名称名称 值值 说明说明 wdBulletGallery 1 项目符号列表。 wdNumberGallery 2 编号列表。 wdOutlineNumberGallery 3 多级符号列表。

# WdListLevelAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表级别的对齐方式。

名称名称 值值 说明说明 wdListLevelAlignCenter 1 居中对齐。 wdListLevelAlignLeft 0 左对齐。 wdListLevelAlignRight 2 右对齐。

# WdListNumberStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于列表的数字样式。

名称名称 值值 说明说明 wdListNumberStyleAiueo 20 Aiueo 数字样式。 wdListNumberStyleAiueoHalfWidth 12 Aiueo 半角数字样式。 wdListNumberStyleArabic 0 阿拉伯数字样式。 wdListNumberStyleArabic1 46 阿拉伯 1 型数字样式。 wdListNumberStyleArabic2 48 阿拉伯 2 型数字样式。 wdListNumberStyleArabicFullWidth 14 阿拉伯全角数字样式。 wdListNumberStyleArabicLZ 22 阿拉伯 LZ 数字样式。 wdListNumberStyleBullet 23 项目符号样式。 wdListNumberStyleCardinalText 6 基数文本样式。 wdListNumberStyleChosung 25 Chosung 样式。 wdListNumberStyleGanada 24 Ganada 样式。 wdListNumberStyleGBNum1 26 GB 数字 1 样式。 wdListNumberStyleGBNum2 27 GB 数字 2 样式。

wdListNumberStyleGBNum3 28 GB 数字 3 样式。 wdListNumberStyleGBNum4 29 GB 数字 4 样式。 wdListNumberStyleHangul 43 朝鲜文样式。 wdListNumberStyleHanja 44 朝鲜文汉字样式。 wdListNumberStyleHanjaRead 41 朝鲜文汉字读取样式。 wdListNumberStyleHanjaReadDigit 42 朝鲜文汉字读取数字样式。 wdListNumberStyleHebrew1 45 希伯来语 1 样式。 wdListNumberStyleHebrew2 47 希伯来语 2 样式。 wdListNumberStyleHindiArabic 51 印地语/阿拉伯语样式。 wdListNumberStyleHindiCardinalText 52 印地语基数文本样式。 wdListNumberStyleHindiLetter1 49 印地语字母 1 样式。 wdListNumberStyleHindiLetter2 50 印地语字母 2 样式。 wdListNumberStyleIroha 21 Iroha 样式。 wdListNumberStyleIrohaHalfWidth 13 Iroha 半角样式。 wdListNumberStyleKanji 10 日语汉字样式。 wdListNumberStyleKanjiDigit 11 日语汉字数字样式。 wdListNumberStyleKanjiTraditional 16 日语汉字传统样式。 wdListNumberStyleKanjiTraditional2 17 日语汉字传统 2 样式。 wdListNumberStyleLegal 253 正规样式。 wdListNumberStyleLegalLZ 254 正规 LZ 样式。 wdListNumberStyleLowercaseLetter 4 小写字母样式。 wdListNumberStyleLowercaseRoman 2 小写罗马样式。 wdListNumberStyleLowercaseRussian 58 小写俄语样式。 wdListNumberStyleNone 255 未应用样式。 wdListNumberStyleNumberInCircle 18 带圈数字样式。 wdListNumberStyleOrdinal 5 上标样式。 wdListNumberStyleOrdinalText 7 上标文本样式。 wdListNumberStylePictureBullet 249 图片项目符号样式。 wdListNumberStyleSimpChinNum1 37 简体中文数字 1 样式。 wdListNumberStyleSimpChinNum2 38 简体中文数字 2 样式。 wdListNumberStyleSimpChinNum3 39 简体中文数字 3 样式。 wdListNumberStyleSimpChinNum4 40 简体中文数字 4 样式。 wdListNumberStyleThaiArabic 54 泰语/阿拉伯语样式。 wdListNumberStyleThaiCardinalText 55 泰语基数文本样式。 wdListNumberStyleThaiLetter 53 泰语字母样式。 wdListNumberStyleTradChinNum1 33 繁体中文数字 1 样式。 wdListNumberStyleTradChinNum2 34 繁体中文数字 2 样式。 wdListNumberStyleTradChinNum3 35 繁体中文数字 3 样式。 wdListNumberStyleTradChinNum4 36 繁体中文数字 4 样式。 wdListNumberStyleUppercaseLetter 3 大写字母样式。 wdListNumberStyleUppercaseRoman 1 大写罗马样式。 wdListNumberStyleUppercaseRussian 59 大写俄语样式。 wdListNumberStyleVietCardinalText 56 越南语基数文本样式。 wdListNumberStyleZodiac1 30 Zodiac 1 样式。 wdListNumberStyleZodiac2 31 Zodiac 2 样式。 wdListNumberStyleZodiac3 32 Zodiac 3 样式。

# WdListType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表的类型。

名称名称 值值 说明说明 wdListBullet 2 项目符号列表。 wdListListNumOnly 1 可在段落正文中使用的 ListNum 域。 wdListMixedNumbering 5 混合数字列表。 wdListNoNumbering 0 不带项目符号、编号或分级显示的列表。 wdListOutlineNumbering 4 分级显示的列表。 wdListPictureBullet 6 图片项目符号列表。 wdListSimpleNumbering 3 简单数字列表。

# WdLockType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 CoAuthLock 对象的锁类型。

名称名称 值值 说明说明

指定占位符锁。占位符锁指示另一个用户已将锁从区域中删除，但当前用户尚未通过保存来更新 wdLockChanged 3 文档视图。 指定当用户在启用共同创作的情况下开始编辑文档中的某一区域时， WPS 2015 隐式放置到区 wdLockEphemeral 2 域上的短暂锁。 wdLockNone 0 保留以备今后使用。 指定一个保留锁。保留锁是由用户通过 WPS 2015 中“审阅审阅 ”选项卡上的“程序块作者程序块作者 ”按钮显式 wdLockReservation 1 创建的。

# WdMailerPriority 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdPriorityHigh 3 不支持。 wdPriorityLow 2 不支持。 wdPriorityNormal 1 不支持。

# WdMailMergeActiveRecord 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件合并结果集内的活动记录。

名称名称 值值 说明说明 wdFirstDataSourceRecord -6 数据源内的第一条记录。 wdFirstRecord -4 结果集内的第一条记录。 wdLastDataSourceRecord -7 数据源内的最后一条记录。 wdLastRecord -5 结果集内的最后一条记录。 wdNextDataSourceRecord -8 数据源内的下一条记录。 wdNextRecord -2 结果集内的下一条记录。 wdNoActiveRecord -1 没有活动记录。 wdPreviousDataSourceRecord -9 数据源内的上一条记录。 wdPreviousRecord -3 结果集内的上一条记录。

# WdMailMergeComparison 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定向邮件合并过程中添加条件时要使用的比较类型。

名称名称 值值 说明说明 wdMergeIfEqual 0 如果邮件合并域等于某个值，则输出值。 wdMergeIfGreaterThan 3 如果邮件合并域大于某个值，则输出值。 wdMergeIfGreaterThanOrEqual 5 如果邮件合并域大于或等于某个值，则输出值。 wdMergeIfIsBlank 6 如果邮件合并域为空，则输出值。 wdMergeIfIsNotBlank 7 如果邮件合并域不为空，则输出值。 wdMergeIfLessThan 2 如果邮件合并域小于某个值，则输出值。 wdMergeIfLessThanOrEqual 4 如果邮件合并域小于或等于某个值，则输出值。 wdMergeIfNotEqual 1 如果邮件合并域不等于某个值，则输出值。

# WdMailMergeDataSource 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为邮件合并操作指定数据源。

名称名称 值值 说明说明 wdMergeInfoFromAccessDDE 1 使用动态数据交换 (DDE) 的 Microsoft Access。 wdMergeInfoFromExcelDDE 2 使用 DDE 的 ET。 wdMergeInfoFromMSQueryDDE 3 使用 DDE 的 MSQuery。 wdMergeInfoFromODBC 4 开放式数据库连接 (ODBC) 连接。 wdMergeInfoFromODSO 5 Office 数据源对象 (ODSO)。 wdMergeInfoFromWord 0 WPS 。 wdNoMergeInfo -1 未提供合并信息。

# WdMailMergeDefaultRecord 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在邮件合并过程中使用的默认记录。

名称名称 值值 说明说明 wdDefaultFirstRecord 1 将结果集内的第一条记录用作默认记录。 wdDefaultLastRecord -16 将结果集内的最后一条记录用作默认记录。

# WdMailMergeDestination 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件合并结果的目标。

名称名称 值值 说明说明 wdSendToEmail 2 将结果发送到电子邮件收件人。 wdSendToFax 3 将结果发送到传真收件人。 wdSendToNewDocument 0 将结果发送到新建的 WPS 文档。 wdSendToPrinter 1 将结果发送到打印机。

# WdMailMergeMailFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件合并目标为电子邮件时要使用的格式。

名称名称 值值 说明说明 wdMailFormatHTML 1 使用 HTML 格式发送邮件合并电子邮件文档。 wdMailFormatPlainText 0 使用纯文本格式发送邮件合并电子邮件文档。

# WdMailMergeMainDocType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件合并文档的类型。

名称名称 值值 说明说明 wdCatalog 3 分类。 wdDirectory 3 目录。 wdEMail 4 电子邮件。 wdEnvelopes 2 信封。 wdFax 5 传真。 wdFormLetters 0 套用信函。 wdMailingLabels 1 邮件标签。 wdNotAMergeDocument -1 不是合并文档。

# WdMailMergeState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件合并操作的状态。

名称名称 值值 说明说明 wdDataSource 5 不带主文档的数据源。 wdMainAndDataSource 2 带附加数据源的主文档。 wdMainAndHeader 3 带附加域名源的主文档。 wdMainAndSourceAndHeader 4 带附加数据源和域名源的主文档。 wdMainDocumentOnly 1 不附带数据的主文档。 wdNormalDocument 0 在邮件合并操作中不涉及文档。

# WdMailSystem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定邮件系统的类型。

名称名称 值值 说明说明 wdMAPI 1 标准邮件应用程序编程接口 (MAPI) 邮件系统。 wdMAPIandPowerTalk 3 标准邮件应用程序编程接口 (MAPI) 邮件系统和 PowerTalk 邮件系统。 wdNoMailSystem 0 没有邮件系统。 wdPowerTalk 2 PowerTalk 邮件系统。

# WdMappedDataFields 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定映射数据域的类型。

名称名称 值值 说明说明 wdAddress1 10 地址 1 域。 wdAddress2 11 地址 2 域。 wdAddress3 29 地址 3 域。 wdBusinessFax 17 业务传真域。 wdBusinessPhone 16 业务电话域。 wdCity 12 城市域。 wdCompany 9 公司域。 wdCountryRegion 15 国家/地区域。 wdCourtesyTitle 2 尊称域。 wdDepartment 30 部门域。 wdEmailAddress 20 电子邮件地址域。 wdFirstName 3 名字域。 wdHomeFax 19 住宅传真域。 wdHomePhone 18 住宅电话域。 wdJobTitle 8 职务域。 wdLastName 5 姓氏域。 wdMiddleName 4 中间名域。 wdNickname 7 昵称域。 wdPostalCode 14 邮政编码域。 wdRubyFirstName 27 名字拼音域。 wdRubyLastName 28 姓氏拼音域。 wdSpouseCourtesyTitle 22 配偶称谓域。 wdSpouseFirstName 23 配偶名字域。 wdSpouseLastName 25 配偶姓氏域。 wdSpouseMiddleName 24 配偶中间名域。 wdSpouseNickname 26 配偶昵称域。 wdState 13 省/市/自治区域。 wdSuffix 6 后缀域。 wdUniqueIdentifier 1 唯一标识符域。 wdWebPageURL 21 网页唯一资源标识符 (URL) 域。

# WdMeasurementUnits 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的度量单位。

名称名称 值值 说明说明 wdCentimeters 1 厘米。 wdInches 0 英寸。 wdMillimeters 2 毫米。 wdPicas 4 十二点活字（通常用于传统打字机字体间距）。 wdPoints 3 磅。

# WdMergeFormatFrom 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在执行文档比较功能期间保持其格式的文档。

名称名称 值值 说明说明 wdMergeFormatFromOriginal 0 保留原始文档的格式。 wdMergeFormatFromPrompt 2 提示用户指定要保留其格式的文档。 wdMergeFormatFromRevised 1 保留修订的文档中的格式。

# WdMergeSubType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要附加到当前文档的数据源。

名称名称 值值 说明说明 wdMergeSubTypeAccess 1 Microsoft Access。 wdMergeSubTypeOAL 2 Office 地址列表。 wdMergeSubTypeOLEDBText 5 OLE 数据库。 wdMergeSubTypeOLEDBWord 3 OLE 数据库。 wdMergeSubTypeOther 0 其他类型的数据源。 wdMergeSubTypeOutlook 6 Microsoft Outlook。 wdMergeSubTypeWord 7 WPS 。 wdMergeSubTypeWord2000 8 WPS 2000。 wdMergeSubTypeWorks 4 Microsoft Works。

# WdMergeTarget 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定比较和合并文档过程的目标。

名称名称 值值 说明说明 wdMergeTargetCurrent 1 合并至当前文档中。 wdMergeTargetNew 2 合并至新文档中。 wdMergeTargetSelected 0 合并至所选文档中。

# WdMonthNames 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要显示月份名称的格式。

名称名称 值值 说明说明 wdMonthNamesArabic 0 阿拉伯数字格式。 wdMonthNamesEnglish 1 英文格式。 wdMonthNamesFrench 2 法文格式。

# WdMoveFromTextMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

在将带有修订的文档中的文本从一个位置移至另一个位置时，标记源文本。

名称名称 值值 说明说明 wdMoveFromTextMarkBold 6 用加粗格式标记移动文字。 wdMoveFromTextMarkCaret 3 用脱字号标记移动文字。 仅用颜色标记移动文字。MoveFromTextColor 属性可用于设置 wdMoveFromTextMarkColorOnly 10 移动文字的颜色。 wdMoveFromTextMarkDoubleStrikeThrough 1 用双删除线标记移动文字。 wdMoveFromTextMarkDoubleUnderline 9 用双下划线标记移动文字。 wdMoveFromTextMarkHidden 0 隐藏移动文字。 wdMoveFromTextMarkItalic 7 用倾斜格式标记移动文字。 wdMoveFromTextMarkNone 5 移动文字没有特殊格式。 wdMoveFromTextMarkPound 4 用井号（数字标记）标记移动文字。 wdMoveFromTextMarkStrikeThrough 2 用删除线标记移动文字。 wdMoveFromTextMarkUnderline 8 为移动文字加下划线。

# WdMovementType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定移动所选内容的方式。

名称名称 值值 说明说明 wdExtend 1 将所选内容的末尾扩展到指定单位的末尾。 wdMove 0 将所选内容折叠到插入点中并移到指定单位的末尾。默认值。

# WdMoveToTextMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

在将带有修订的文档中的文本从一个位置移至另一个位置时，标记目标文本。

名称名称 值值 说明说明 wdMoveToTextMarkBold 1 用加粗格式标记移动文字。 仅用颜色标记移动文字。MoveToTextColor 属性可用于设置移动文 wdMoveToTextMarkColorOnly 5 字的颜色。 wdMoveToTextMarkDoubleStrikeThrough 7 用双删除线标记移动文字。 wdMoveToTextMarkDoubleUnderline 4 用双下划线标记移动文字。 wdMoveToTextMarkItalic 2 用倾斜格式标记移动文字。 wdMoveToTextMarkNone 0 移动文字没有特殊格式。 wdMoveToTextMarkStrikeThrough 6 用删除线标记移动文字。 wdMoveToTextMarkUnderline 3 为移动文字加下划线。

# WdMultipleWordConversionsMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定朝鲜文/朝鲜文汉字之间的转换方向。

名称名称 值值 说明说明 wdHangulToHanja 0 从朝鲜文到朝鲜文汉字。 wdHanjaToHangul 1 从朝鲜文汉字到朝鲜文。

# WdNewDocumentType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要创建的新文档的类型。

名称名称 值值 说明说明 wdNewBlankDocument 0 空白文档。 wdNewEmailMessage 2 电子邮件。 wdNewFrameset 3 框架集。 wdNewWebPage 1 网页。 wdNewXMLDocument 4 XML 文档。

# WdNoteNumberStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于尾注、尾注选项、脚注或脚注选项的数字样式。

名称名称 值值 说明说明 wdNoteNumberStyleArabic 0 阿拉伯数字样式。 wdNoteNumberStyleArabicFullWidth 14 阿拉伯全角数字样式。 wdNoteNumberStyleArabicLetter1 46 阿拉伯语字母样式 1。 wdNoteNumberStyleArabicLetter2 48 阿拉伯语字母样式 2。 wdNoteNumberStyleHanjaRead 41 朝鲜文汉字读取数字样式。 wdNoteNumberStyleHanjaReadDigit 42 朝鲜文汉字读取数字样式。 wdNoteNumberStyleHebrewLetter1 45 希伯来语字母样式 1。 wdNoteNumberStyleHebrewLetter2 47 希伯来语字母样式 2。 wdNoteNumberStyleHindiArabic 51 印地语/阿拉伯语数字样式。 wdNoteNumberStyleHindiCardinalText 52 印地语基数文本样式。 wdNoteNumberStyleHindiLetter1 49 印地语字母样式 1。 wdNoteNumberStyleHindiLetter2 50 印地语字母样式 2。 wdNoteNumberStyleKanji 10 日语汉字数字样式。 wdNoteNumberStyleKanjiDigit 11 日语汉字数字样式。 wdNoteNumberStyleKanjiTraditional 16 日语汉字传统数字样式。 wdNoteNumberStyleLowercaseLetter 4 小写字母样式。 wdNoteNumberStyleLowercaseRoman 2 小写罗马数字样式。 wdNoteNumberStyleNumberInCircle 18 带圈数字样式。 wdNoteNumberStyleSimpChinNum1 37 简体中文数字样式 1。 wdNoteNumberStyleSimpChinNum2 38 简体中文数字样式 2。 wdNoteNumberStyleSymbol 9 符号数字样式。 wdNoteNumberStyleThaiArabic 54 泰语/阿拉伯语数字样式。 wdNoteNumberStyleThaiCardinalText 55 泰语基数文本样式。 wdNoteNumberStyleThaiLetter 53 泰语字母样式。 wdNoteNumberStyleTradChinNum1 33 繁体中文数字样式 1。 wdNoteNumberStyleTradChinNum2 34 繁体中文数字样式 2。 wdNoteNumberStyleUppercaseLetter 3 大写字母样式。 wdNoteNumberStyleUppercaseRoman 1 大写罗马数字样式。 wdNoteNumberStyleVietCardinalText 56 越南语基数文本样式。

# WdNumberForm 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OpenType 字体的数字形式设置。

名称名称 值值 说明说明 wdNumberFormDefault 0 应用字体的默认数字形式。 wdNumberFormLining 1 对字体应用内衬数字形式。 wdNumberFormOldstyle 2 对字体应用“旧样式”数字形式。

# WdNumberingRule 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的编号规则。

名称名称 值值 说明说明 wdRestartContinuous 0 连续分配编号。 wdRestartPage 2 重设每一页的页码。 wdRestartSection 1 重设每一节的节号。

# WdNumberSpacing 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OpenType 字体的数字间距设置。

名称名称 值值 说明说明 wdNumberSpacingDefault 0 应用字体的默认数字间距。 wdNumberSpacingProportional 1 对字体应用成比例数字间距。 wdNumberSpacingTabular 2 对字体应用表格数字间距。

# WdNumberStyleWordBasicBiDi 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdCaptionNumberStyleBidiLetter1 49 不支持。 wdCaptionNumberStyleBidiLetter2 50 不支持。 wdListNumberStyleBidi1 49 不支持。 wdListNumberStyleBidi2 50 不支持。 wdNoteNumberStyleBidiLetter1 49 不支持。 wdNoteNumberStyleBidiLetter2 50 不支持。 wdPageNumberStyleBidiLetter1 49 不支持。 wdPageNumberStyleBidiLetter2 50 不支持。

# WdNumberType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定编号的类型。

名称名称 值值 说明说明 wdNumberAllNumbers 3 其他所有情况下的默认值。 wdNumberListNum 2 LISTNUM 域的默认值。 wdNumberParagraph 1 可通过在“项目符号和编号项目符号和编号 ”对话框中选择模板的方式添加到段落中的预设编号。

# WdOLEPlacement 枚举枚举

# WdOLEPlacement 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OLE 对象的位置。

名称名称 值值 说明说明 wdFloatOverText 1 浮于文字上方。 wdInLine 0 嵌入型。

# WdOLEType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OLE 对象的类型。

名称名称 值值 说明说明 wdOLEControl 2 OLE 控件。 wdOLEEmbed 1 嵌入的 OLE 对象。 wdOLELink 0 链接的 OLE 对象。

# WdOLEVerb 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定与 OLE 对象应执行的动作相关联的动作。

名称名称 值值 说明说明 wdOLEVerbDiscardUndoState -6 强制对象放弃它可能保持的撤消状态；请注意，此时对象仍然处于活动状态。 wdOLEVerbHide -3 从视图中删除对象的用户界面。 wdOLEVerbInPlaceActivate -5 运行对象，装载对象的窗口，但是并不装载任何的用户界面工具。 wdOLEVerbOpen -2 在单独的窗口中打开对象。 wdOLEVerbPrimary 0 当用户双击对象时执行被调用的动作。

向用户显示对象以便进行编辑或查看。可用此常量显示最新插入的对象以便进行初次 wdOLEVerbShow -1 编辑。 wdOLEVerbUIActivate -4 在适当的位置激活对象并显示对象所需的任何用户界面工具，如菜单或工具条。

# WdOMathBreakBin 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当公式跨两行或多行时 WPS 放置二元运算符的位置。

名称名称 值值 说明说明 wdOMathBreakBinAfter 1 将该运算符放在下一行开头处（换行符之后）。 wdOMathBreakBinBefore 0 将该运算符放在当前行末尾处（换行符之前）。 wdOMathBreakBinRepeat 2 在当前行末尾处（换行符之前）和下一行开头处（换行符之后）重复放置该运算符。

# WdOMathBreakSub 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何处理位于换行符之前的减法运算符。

名称名称 值值 说明说明 wdOMathBreakSubMinusMinus 0 在当前行末尾处（换行符之前）和下一行开头处重复放置减号。默认值。

在第一行末尾处（换行符之前）插入减号，在下一行开头处（数字之前）插入加 wdOMathBreakSubMinusPlus 2 号。

在第一行末尾处（换行符之前）插入加号，在下一行开头处（数字之前）插入减 wdOMathBreakSubPlusMinus 1 号。

# WdOMathFracType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分数线的类型。

名称名称 值值 说明说明 wdOMathFracBar 0 常规分数线。 wdOMathFracLin 3 以内嵌方式显示分数。 wdOMathFracNoBar 1 没有分数线。 wdOMathFracSkw 2 斜式分数线。

# WdOMathFunctionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定公式函数的类型。

名称名称 值值 说明说明 wdOMathFunctionAcc 1 公式着重符。 wdOMathFunctionBar 2 公式分数线。 wdOMathFunctionBorderBox 4 边框。 wdOMathFunctionBox 3 框。 wdOMathFunctionDelim 5 公式定界符。 wdOMathFunctionEqArray 6 公式数组。 wdOMathFunctionFrac 7 公式分数。 wdOMathFunctionFunc 8 公式函数。 wdOMathFunctionGroupChar 9 组字符。 wdOMathFunctionLimLow 10 公式下限。 wdOMathFunctionLimUpp 11 公式上限。 wdOMathFunctionMat 12 公式矩阵。 wdOMathFunctionNary 13 公式 N 元运算符。 wdOMathFunctionNormalText 21 公式普通文本。 wdOMathFunctionPhantom 14 公式 phantom。 wdOMathFunctionRad 16 公式基表达式。 wdOMathFunctionScrPre 15 前缀。 wdOMathFunctionScrSub 17 下标。 wdOMathFunctionScrSubSup 18 下标和上标。 wdOMathFunctionScrSup 19 上标。 wdOMathFunctionText 20 公式文本。

# WdOMathHorizAlignType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定公式的水平对齐方式。

名称名称 值值 说明说明 wdOMathHorizAlignCenter 0 居中。 wdOMathHorizAlignLeft 1 左对齐。 wdOMathHorizAlignRight 2 右对齐。

# WdOMathJc 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定公式默认的对齐方式。

名称名称 值值 说明说明 wdOMathJcCenter 2 居中。 wdOMathJcCenterGroup 1 作为一个组居中。 wdOMathJcInline 7 内嵌。 wdOMathJcLeft 3 左对齐。 wdOMathJcRight 4 右对齐。

# WdOMathShapeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分隔符（圆括号、花括号、方括号）的外观与括号内内容的关系。

名称名称 值值 说明说明

在公式的整个高度两侧纵向居中放置分隔符，从而使得分隔符在它们的中点上下以相同的 wdOMathShapeCentered 0 幅度增长。 wdOMathShapeMatch 1 将分隔符的形状与其内容的大小相匹配。

# WdOMathSpacingRule 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定公式的间距。

名称名称 值值 说明说明 wdOMathSpacing1pt5 1 1.5 倍行距。 wdOMathSpacingDouble 2 双倍行距。 wdOMathSpacingExactly 3 固定行距度量。 wdOMathSpacingMultiple 4 自定义行距度量。 wdOMathSpacingSingle 0 单倍行距。

# WdOMathType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定公式的显示格式类型。

名称名称 值值 说明说明 wdOMathDisplay 0 专业格式。 wdOMathInline 1 内嵌。

# WdOMathVertAlignType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

对于内嵌公式，指定公式在形状画布或线条内的垂直对齐方式。

名称名称 值值 说明说明 wdOMathVertAlignBottom 2 公式与形状画布或线条的底部对齐。 wdOMathVertAlignCenter 0 公式在形状画布或线条内垂直居中。 wdOMathVertAlignTop 1 公式与形状画布或线条的顶端对齐。

# WdOpenFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定打开文档时要使用的格式。

名称名称 值值 说明说明 wdOpenFormatAllWord 6 与 WPS 早期版本向后兼容的 WPS 格式。 wdOpenFormatAuto 0 现有格式。 wdOpenFormatDocument 1 WPS 格式。 wdOpenFormatEncodedText 5 编码文本格式。 wdOpenFormatRTF 3 RTF 格式。 wdOpenFormatTemplate 2 用作 WPS 模板。 wdOpenFormatText 4 未编码的文本格式。 wdOpenFormatUnicodeText 5 Unicode 文本格式。 wdOpenFormatWebPages 7 HTML 格式。 wdOpenFormatXML 8 XML 格式。 wdOpenFormatAllWordTemplates 13 WPS 模板格式。 wdOpenFormatDocument97 1 WPS 97 文档格式。 wdOpenFormatTemplate97 2 WPS 97 模板格式。 wdOpenFormatXMLDocument 9 XML 文档格式。 wdOpenFormatXMLDocumentMacroEnabled 10 启用了宏的 XML 文档格式。 wdOpenFormatXMLTemplate 11 XML 模板格式。 wdOpenFormatXMLTemplateMacroEnabled 12 启用了宏的 XML 模板格式。

# WdOrganizerObject 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定删除、复制或重命名操作所使用的对象的类型。

名称名称 值值 说明说明 wdOrganizerObjectAutoText 1 自动图文集项。 wdOrganizerObjectCommandBars 2 命令栏项。 wdOrganizerObjectProjectItems 3 方案项。 wdOrganizerObjectStyles 0 样式项。

# WdOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定页面布局方向。

名称名称 值值 说明说明 wdOrientLandscape 1 横向。 wdOrientPortrait 0 纵向。

# WdOriginalFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档格式。在保存文档时通常使用此枚举。

名称名称 值值 说明说明 wdOriginalDocumentFormat 1 原始文档格式。 wdPromptUser 2 提示用户选择文档格式。 wdWordDocument 0 WPS 文档格式。

# WdOutlineLevel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于段落的大纲级别。

名称名称 值值 说明说明 wdOutlineLevel1 1 大纲级别 1。 wdOutlineLevel2 2 大纲级别 2。 wdOutlineLevel3 3 大纲级别 3。 wdOutlineLevel4 4 大纲级别 4。 wdOutlineLevel5 5 大纲级别 5。 wdOutlineLevel6 6 大纲级别 6。 wdOutlineLevel7 7 大纲级别 7。 wdOutlineLevel8 8 大纲级别 8。 wdOutlineLevel9 9 大纲级别 9。 wdOutlineLevelBodyText 10 没有大纲级别。

# WdPageBorderArt 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定某页的图形页面边框设置。

名称名称 值值 说明说明 wdArtApples 1 苹果边框。 wdArtArchedScallops 97 扇贝边框。 wdArtBabyPacifier 70 婴儿奶嘴边框。 wdArtBabyRattle 71 拨浪鼓边框。 wdArtBalloons3Colors 11 三色气球边框。 wdArtBalloonsHotAir 12 热气球边框。 wdArtBasicBlackDashes 155 黑色虚线边框。 wdArtBasicBlackDots 156 黑色点线边框。 wdArtBasicBlackSquares 154 黑色方块边框。 wdArtBasicThinLines 151 细线边框。 wdArtBasicWhiteDashes 152 白色虚线边框。

wdArtBasicWhiteDots 147 白色点线边框。 wdArtBasicWhiteSquares 153 空心方块边框。 wdArtBasicWideInline 150 外细内粗型边框。 wdArtBasicWideMidline 148 两边细中间粗型边框。 wdArtBasicWideOutline 149 外粗内细型边框。 wdArtBats 37 蝙蝠边框。 wdArtBirds 102 小鸟边框。 wdArtBirdsFlight 35 飞鸟边框。 wdArtCabins 72 小屋边框。 wdArtCakeSlice 3 蛋糕边框。 wdArtCandyCorn 4 水果糖边框。 wdArtCelticKnotwork 99 绳编边框。 wdArtCertificateBanner 158 旗帜边框。 wdArtChainLink 128 链节边框。 wdArtChampagneBottle 6 香槟酒瓶边框。 wdArtCheckedBarBlack 145 黑色球门边框。 wdArtCheckedBarColor 61 彩色球门边框。 wdArtCheckered 144 棋盘边框。 wdArtChristmasTree 8 圣诞树边框。 wdArtCirclesLines 91 寰丘甬道边框。 wdArtCirclesRectangles 140 寰丘方田边框。 wdArtClassicalWave 56 经典波纹边框。 wdArtClocks 27 时钟边框。 wdArtCompass 54 罗盘边框。 wdArtConfetti 31 纸屑边框。 wdArtConfettiGrays 115 采用灰色底纹的纸屑边框。 wdArtConfettiOutline 116 棱状纸屑边框。 wdArtConfettiStreamers 14 彩色纸带边框。 wdArtConfettiWhite 117 白色纸屑边框。 wdArtCornerTriangles 141 一个三角形边框。 wdArtCouponCutoutDashes 163 副券裁剪线（划线）边框。 wdArtCouponCutoutDots 164 副券裁剪线（点线）边框。 wdArtCrazyMaze 100 迷宫边框。 wdArtCreaturesButterfly 32 蝴蝶边框。 wdArtCreaturesFish 34 鱼边框。 wdArtCreaturesInsects 142 昆虫边框。 wdArtCreaturesLadyBug 33 瓢虫边框。 wdArtCrossStitch 138 交叉缝合边框。 wdArtCup 67 奖杯边框。 wdArtDecoArch 89 拱形边框。 wdArtDecoArchColor 50 彩色拱形边框。 wdArtDecoBlocks 90 方块边框。 wdArtDiamondsGray 88 采用灰色底纹的菱形边框。 wdArtDoubleD 55 双 D 形边框。 wdArtDoubleDiamonds 127 双菱形边框。 wdArtEarth1 22 地球 1 形边框。 wdArtEarth2 21 地球 2 形边框。

wdArtEarth2 21 地球 2 形边框。 wdArtEclipsingSquares1 101 重叠方块 1 形边框。 wdArtEclipsingSquares2 86 重叠方块 2 形边框。 wdArtEggsBlack 66 松花蛋边框。 wdArtFans 51 风扇边框。 wdArtFilm 52 胶片边框。 wdArtFirecrackers 28 爆竹边框。 wdArtFlowersBlockPrint 49 木版花边框。 wdArtFlowersDaisies 48 雏菊边框。 wdArtFlowersModern1 45 花束（现代）1 形边框。 wdArtFlowersModern2 44 花束（现代）2 形边框。 wdArtFlowersPansy 43 三色紫罗兰边框。 wdArtFlowersRedRose 39 红玫瑰边框。 wdArtFlowersRoses 38 玫瑰边框。 wdArtFlowersTeacup 103 茶杯边框。 wdArtFlowersTiny 42 小花边框。 wdArtGems 139 宝石边框。 wdArtGingerbreadMan 69 小玩偶边框。 wdArtGradient 122 渐变边框。 wdArtHandmade1 159 手工艺品 1 形边框。 wdArtHandmade2 160 手工艺品 2 形边框。 wdArtHeartBalloon 16 心形气球边框。 wdArtHeartGray 68 采用灰色底纹的心形边框。 wdArtHearts 15 心形边框。 wdArtHeebieJeebies 120 神经过敏边框。 wdArtHolly 41 冬青树边框。 wdArtHouseFunky 73 怪屋边框。 wdArtHypnotic 87 催眠边框。 wdArtIceCreamCones 5 冰淇淋圆锥边框。 wdArtLightBulb 121 灯泡边框。 wdArtLightning1 53 闪电 1 形边框。 wdArtLightning2 119 闪电 2 形边框。 wdArtMapleLeaf 81 枫叶边框。 wdArtMapleMuffins 2 松饼边框。 wdArtMapPins 30 地图别针边框。 wdArtMarquee 146 天棚边框。 wdArtMarqueeToothed 131 锯齿式天棚边框。 wdArtMoons 125 月亮边框。 wdArtMosaic 118 马赛克边框。 wdArtMusicNotes 79 仙乐飘飘边框。 wdArtNorthwest 104 西北边框。 wdArtOvals 126 椭圆形边框。 wdArtPackages 26 包裹边框。 wdArtPalmsBlack 80 黑色棕榈边框。 wdArtPalmsColor 10 彩色棕榈边框。 wdArtPaperClips 82 曲别针边框。 wdArtPapyrus 92 纸草边框。 wdArtPartyFavor 13 聚会装饰品边框。

wdArtPartyFavor 13 聚会装饰品边框。 wdArtPartyGlass 7 聚会酒杯边框。 wdArtPencils 25 铅笔边框。 wdArtPeople 84 人边框。 wdArtPeopleHats 23 戴帽人边框。 wdArtPeopleWaving 85 挥手人边框。 wdArtPoinsettias 40 一品红边框。 wdArtPostageStamp 135 邮戳边框。 wdArtPumpkin1 65 南瓜 1 形边框。 wdArtPushPinNote1 63 图钉 1 形边框。 wdArtPushPinNote2 64 图钉 2 形边框。 wdArtPyramids 113 金字塔边框。 wdArtPyramidsAbove 114 外棱锥边框。 wdArtQuadrants 60 扇形边框。 wdArtRings 29 圆环边框。 wdArtSafari 98 旅行边框。 wdArtSawtooth 133 锯齿边框。 wdArtSawtoothGray 134 采用灰色底纹的锯齿边框。 wdArtScaredCat 36 幽灵古屋边框。 wdArtSeattle 78 西雅图边框。 wdArtShadowedSquares 57 阴影方块边框。 wdArtSharksTeeth 132 鲨鱼牙齿边框。 wdArtShorebirdTracks 83 水鸟足迹边框。 wdArtSkyrocket 77 流星焰火边框。 wdArtSnowflakeFancy 76 缤纷雪花边框。 wdArtSnowflakes 75 雪花边框。 wdArtSombrero 24 阔边帽边框。 wdArtSouthwest 105 西南边框。 wdArtStars 19 星形边框。 wdArtStars3D 17 三维星形边框。 wdArtStarsBlack 74 黑色星形边框。 wdArtStarsShadowed 18 阴影星形边框。 wdArtStarsTop 157 星形仰视图边框。 wdArtSun 20 太阳边框。 wdArtSwirligig 62 旋涡边框。 wdArtTornPaper 161 碎纸边框。 wdArtTornPaperBlack 162 黑色碎纸边框。 wdArtTrees 9 树木边框。 wdArtTriangleParty 123 碎三角边框。 wdArtTriangles 129 一个三角形边框。 wdArtTribal1 130 部落 1 形边框。 wdArtTribal2 109 部落 2 形边框。 wdArtTribal3 108 部落 3 形边框。 wdArtTribal4 107 部落 4 形边框。 wdArtTribal5 110 部落 5 形边框。 wdArtTribal6 106 部落 6 形边框。 wdArtTwistedLines1 58 庭院深深 1 形边框。

wdArtTwistedLines2 124 庭院深深 2 形边框。 wdArtVine 47 葡萄藤边框。 wdArtWaveline 59 长袖善舞边框。 wdArtWeavingAngles 96 织物（角形）边框。 wdArtWeavingBraid 94 编织边框。 wdArtWeavingRibbon 95 缎带边框。 wdArtWeavingStrips 136 条纹边框。 wdArtWhiteFlowers 46 白色鲜花边框。 wdArtWoodwork 93 木工制品边框。 wdArtXIllusions 111 X 幻觉边框。 wdArtZanyTriangles 112 Zany 三角形边框。 wdArtZigZag 137 之字形边框。 wdArtZigZagStitch 143 之字形缝合边框。

# WdPageFit 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定页面的视图设置。

名称名称 值值 说明说明 wdPageFitBestFit 2 使页面最佳匹配活动窗口。 wdPageFitFullPage 1 查看整个页面。 wdPageFitNone 0 不要为页面调整视图设置。 wdPageFitTextFit 3 使页面文本最佳匹配活动窗口。

# WdPageNumberAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于页码的对齐方式。

名称名称 值值 说明说明 wdAlignPageNumberCenter 1 居中。 wdAlignPageNumberInside 3 只在页脚内部左对齐。 wdAlignPageNumberLeft 0 左对齐。 wdAlignPageNumberOutside 4 只在页脚外部右对齐。 wdAlignPageNumberRight 2 右对齐。

# WdPageNumberStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于页码的样式。

名称名称 值值 说明说明 wdPageNumberStyleArabic 0 阿拉伯语样式。 wdPageNumberStyleArabicFullWidth 14 阿拉伯语全角样式。 wdPageNumberStyleArabicLetter1 46 阿拉伯语字母 1 样式。 wdPageNumberStyleArabicLetter2 48 阿拉伯语字母 2 样式。 wdPageNumberStyleHanjaRead 41 朝鲜文汉字读取样式。 wdPageNumberStyleHanjaReadDigit 42 朝鲜文汉字读取数字样式。 wdPageNumberStyleHebrewLetter1 45 希伯来语字母 1 样式。 wdPageNumberStyleHebrewLetter2 47 希伯来语字母 2 样式。 wdPageNumberStyleHindiArabic 51 印地语/阿拉伯语样式。 wdPageNumberStyleHindiCardinalText 52 印地语基数文本样式。 wdPageNumberStyleHindiLetter1 49 印地语字母 1 样式。 wdPageNumberStyleHindiLetter2 50 印地语字母 2 样式。 wdPageNumberStyleKanji 10 日语汉字样式。 wdPageNumberStyleKanjiDigit 11 日语汉字数字样式。 wdPageNumberStyleKanjiTraditional 16 日语汉字传统样式。 wdPageNumberStyleLowercaseLetter 4 小写字母样式。 wdPageNumberStyleLowercaseRoman 2 小写罗马样式。 wdPageNumberStyleNumberInCircle 18 带圈数字样式。 wdPageNumberStyleNumberInDash 57 带划线数字样式。 wdPageNumberStyleSimpChinNum1 37 简体中文数字 1 样式。 wdPageNumberStyleSimpChinNum2 38 简体中文数字 2 样式。 wdPageNumberStyleThaiArabic 54 泰语/阿拉伯语样式。 wdPageNumberStyleThaiCardinalText 55 泰语基数文本样式。 wdPageNumberStyleThaiLetter 53 泰语字母样式。 wdPageNumberStyleTradChinNum1 33 繁体中文数字 1 样式。 wdPageNumberStyleTradChinNum2 34 繁体中文数字 2 样式。 wdPageNumberStyleUppercaseLetter 3 大写字母样式。 wdPageNumberStyleUppercaseRoman 1 大写罗马样式。 wdPageNumberStyleVietCardinalText 56 越南语基数文本样式。

# WdPaperSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定纸张大小。

名称名称 值值 说明说明 wdPaper10x14 0 10 英寸（25.4 厘米）宽，14 英寸（35.56 厘米）长。 wdPaper11x17 1 正规 11 英寸（27.94 厘米）宽，17 英寸（43.18 厘米）长。 wdPaperA3 6 A3 尺寸。 wdPaperA4 7 A4 尺寸。 wdPaperA4Small 8 小 A4 尺寸。 wdPaperA5 9 A5 尺寸。 wdPaperB4 10 B4 尺寸。 wdPaperB5 11 B5 尺寸。 wdPaperCSheet 12 C Sheet 尺寸。 wdPaperCustom 41 自定义纸张大小。 wdPaperDSheet 13 D Sheet 尺寸。 wdPaperEnvelope10 25 正规信封，尺寸 10。 wdPaperEnvelope11 26 信封，尺寸 11。 wdPaperEnvelope12 27 信封，尺寸 12。 wdPaperEnvelope14 28 信封，尺寸 14。 wdPaperEnvelope9 24 信封，尺寸 9。 wdPaperEnvelopeB4 29 B4 信封。 wdPaperEnvelopeB5 30 B5 信封。 wdPaperEnvelopeB6 31 B6 信封。 wdPaperEnvelopeC3 32 C3 信封。 wdPaperEnvelopeC4 33 C4 信封。 wdPaperEnvelopeC5 34 C5 信封。 wdPaperEnvelopeC6 35 C6 信封。 wdPaperEnvelopeC65 36 C65 信封。 wdPaperEnvelopeDL 37 DL 信封。 wdPaperEnvelopeItaly 38 意大利式信封。 wdPaperEnvelopeMonarch 39 君主式信封。 wdPaperEnvelopePersonal 40 私人信封。 wdPaperESheet 14 E Sheet 尺寸。 wdPaperExecutive 5 行政型尺寸。 wdPaperFanfoldLegalGerman 15 德国正规复写簿尺寸。 wdPaperFanfoldStdGerman 16 德国标准复写簿尺寸。 wdPaperFanfoldUS 17 美国复写簿尺寸。 wdPaperFolio 18 对开尺寸。 wdPaperLedger 19 分类帐尺寸。 wdPaperLegal 4 正规尺寸。 wdPaperLetter 2 信函尺寸。 wdPaperLetterSmall 3 小型信函尺寸。 wdPaperNote 20 便笺尺寸。 wdPaperQuarto 21 四开尺寸。 wdPaperStatement 22 报表尺寸。 wdPaperTabloid 23 文摘尺寸。

# WdPaperTray 枚举枚举

# WdPaperTray 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定打印机纸盒。

名称名称 值值 说明说明 wdPrinterAutomaticSheetFeed 7 自动送纸。 wdPrinterDefaultBin 0 默认纸盒。 wdPrinterEnvelopeFeed 5 信封送纸器。 wdPrinterFormSource 15 表单来源。 wdPrinterLargeCapacityBin 11 大容量纸盒。 wdPrinterLargeFormatBin 10 大格式纸盒。 wdPrinterLowerBin 2 下层纸盒。 wdPrinterManualEnvelopeFeed 6 手动信封送纸。 wdPrinterManualFeed 4 手动送纸。 wdPrinterMiddleBin 3 中层纸盒。 wdPrinterOnlyBin 1 打印机的唯一纸盒。 wdPrinterPaperCassette 14 磁带式纸盒。 wdPrinterSmallFormatBin 9 小格式纸盒。 wdPrinterTractorFeed 8 送纸器。 wdPrinterUpperBin 1 上层纸盒。

# WdParagraphAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定段落的对齐方式。

名称名称 值值 说明说明 wdAlignParagraphCenter 1 居中。 wdAlignParagraphDistribute 4 段落字符被分布排列，以填满整个段落宽度。 wdAlignParagraphJustify 3 完全两端对齐。 wdAlignParagraphJustifyHi 7 两端对齐，字符高度压缩。 wdAlignParagraphJustifyLow 8 两端对齐，字符轻微压缩。 wdAlignParagraphJustifyMed 5 两端对齐，字符中度压缩。 wdAlignParagraphLeft 0 左对齐。 wdAlignParagraphRight 2 右对齐。 wdAlignParagraphThaiJustify 9 按照泰语格式布局两端对齐。

# WdPartOfSpeech 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定某个单词在由 WPS 同义词库服务返回时所代表的词性。

名称名称 值值 说明说明 wdAdjective 0 形容词。 wdAdverb 2 副词。 wdConjunction 5 连词。 wdIdiom 8 成语。 wdInterjection 7 感叹词。 wdNoun 1 名词。 wdOther 9 其他某个词性。 wdPreposition 6 介词。 wdPronoun 4 代词。 wdVerb 3 动词。

# WdPasteDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将剪贴板内容插入到文档时采用的格式。

名称名称 值值 说明说明 wdPasteBitmap 4 位图。 wdPasteDeviceIndependentBitmap 5 与设备无关的位图。 wdPasteEnhancedMetafile 9 增强型图元文件。 wdPasteHTML 10 HTML。 wdPasteHyperlink 7 超链接。 wdPasteMetafilePicture 3 图元文件图片。 wdPasteOLEObject 0 OLE 对象。 wdPasteRTF 1 RTF 格式。 wdPasteShape 8 形状。 wdPasteText 2 文本。

# WdPasteOptions 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示如何粘贴所复制的文本。

名称名称 值值 说明说明 wdKeepSourceFormatting 0 保留源文档的格式。 wdKeepTextOnly 2 只保留文本，不保留格式。 wdMatchDestinationFormatting 1 使格式与目标文档匹配。 wdUseDestinationStyles 3 使用样式来设置格式，以使格式与目标文档匹配。

# WdPhoneticGuideAlignmentType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定添加到所指定区域的拼音文本的对齐方式。

名称名称 值值 说明说明 wdPhoneticGuideAlignmentCenter 0 WPS 将拼音文本居中放置在所指定区域上。这是默认值。 wdPhoneticGuideAlignmentLeft 3 WPS 将拼音文本以左对齐方式放置在所指定区域上。 wdPhoneticGuideAlignmentOneTwoOne 2 WPS 按照 1:2:1 的比例调整拼音文本内侧和外侧的间距。 wdPhoneticGuideAlignmentRight 4 WPS 将拼音文本以右对齐方式放置在所指定区域上。 wdPhoneticGuideAlignmentRightVertical 5 WPS 将拼音文本与竖排文本的右侧对齐。 wdPhoneticGuideAlignmentZeroOneZero 1 WPS 按照 0:1:0 的比例调整拼音文本内侧和外侧的间距。

# WdPictureLinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将图片链接到文档的方式。

名称名称 值值 说明说明 wdLinkDataInDoc 1 将图片嵌入到文档中。 wdLinkDataOnDisk 2 将图片链接到文档。 wdLinkNone 0 不将图片链接或嵌入到文档中。

# WdPortugueseReform 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定巴西或欧洲葡萄牙语拼写器的模式。可读/写。

名称名称 值值 说明说明 wdPortugueseBoth 3 使用前期修订和后期修订拼写规则。 wdPortuguesePostReform 2 使用后期修订拼写规则。 wdPortuguesePreReform 1 使用前期修订拼写规则。

# WdPreferredWidthType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在测量项目宽度时使用的首选度量单位。

名称名称 值值 说明说明 wdPreferredWidthAuto 1 基于当前所选内容自动选择要使用的度量单位。 wdPreferredWidthPercent 2 使用指定的百分比测量当前项目的宽度。 wdPreferredWidthPoints 3 使用指定的磅数测量当前项目的宽度。

# WdPrintOutItem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要打印的项目。

名称名称 值值 说明说明 wdPrintAutoTextEntries 4 当前文档中的自动图文集条目。 wdPrintComments 2 当前文档中的批注。 wdPrintDocumentContent 0 当前文档内容。 wdPrintDocumentWithMarkup 7 当前文档内容（包括标记）。 wdPrintEnvelope 6 信封。 wdPrintKeyAssignments 5 当前文档中的按键分配方案。 wdPrintMarkup 2 当前文档中的标记。 wdPrintProperties 1 当前文档中的属性。 wdPrintStyles 3 当前文档中的样式。

# WdPrintOutPages 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要打印的页面的类型。

名称名称 值值 说明说明 wdPrintAllPages 0 所有页面。 wdPrintEvenPagesOnly 2 仅偶数页。 wdPrintOddPagesOnly 1 仅奇数页。

# WdPrintOutRange 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要打印的范围。

名称名称 值值 说明说明 wdPrintAllDocument 0 整个文档。 wdPrintCurrentPage 2 当前页面。 wdPrintFromTo 3 指定范围。 wdPrintRangeOfPages 4 指定的页面范围。 wdPrintSelection 1 当前所选内容。

# WdProofreadingErrorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 校对过程返回的校对错误的类型。

名称名称 值值 说明说明 wdGrammaticalError 1 语法错误。 wdSpellingError 0 拼写错误。

# WdProtectedViewCloseReason 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何关闭受保护的视图窗口。

名称名称 值值 说明说明 wdProtectedViewCloseEdit 1 当用户在“受保护的视图”中单击“启用编辑启用编辑 ”或“仍然编辑仍然编辑 ”按钮时将会关闭该窗口。 wdProtectedViewCloseForced 2 该窗口因为应用程序强制将其关闭或应用程序停止响应而关闭。 wdProtectedViewCloseNormal 0 该窗口正常关闭。

# WdProtectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用于当前文档的保护的类型。

名称名称 值值 说明说明 wdAllowOnlyComments 1 只允许将批注添加到文档中。 wdAllowOnlyFormFields 2 只允许通过窗体域将内容添加到文档中。 wdAllowOnlyReading 3 允许对文档进行只读访问。 wdAllowOnlyRevisions 0 只允许对现有内容进行修订。 wdNoProtection -1 不对文档应用保护。

# WdReadingLayoutMargin 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定以全屏阅读视图查看文档时边距可见还是隐藏。

名称名称 值值 说明说明 wdAutomaticMargin 0 显示页面时不带边距。 wdFullMargin 2 显示页面时带边距。 wdSuppressMargin 1 WPS 会自动根据可用空间来决定是显示还是隐藏边距。

# WdReadingOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档的文字排列和读取顺序。

名称名称 值值 说明说明 wdReadingOrderLtr 1 从左到右的读取顺序。 wdReadingOrderRtl 0 从右到左的读取顺序。

# WdRecoveryType 枚举枚举

# WdRecoveryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在粘贴所选的表格单元格时使用的格式。

名称名称 值值 说明说明 wdChart 14 将ET 图表粘贴为嵌入的 OLE 对象。 wdChartLinked 15 粘贴 ET 图表并将其链接到原始 ET 电子表格。 wdChartPicture 13 将 ET 图表粘贴为图片。 wdFormatOriginalFormatting 16 保留所粘贴材料的原始格式。 wdFormatPlainText 22 粘贴为无格式的纯文本文字。 wdFormatSurroundingFormattingWithEmphasis 20 使所粘贴文本的格式与周围文本的格式匹配。 wdListCombineWithExistingList 24 将粘贴的列表与邻近的列表合并。 wdListContinueNumbering 7 使粘贴的列表根据文档中的列表继续编号。 wdListDontMerge 25 不支持。 wdListRestartNumbering 8 对粘贴的列表重新进行编号。 wdPasteDefault 0 不支持。 wdSingleCellTable 6 将单个单元格表格粘贴为独立的表格。 wdSingleCellText 5 将单个单元格粘贴为文本。

通过在所选行之间插入粘贴的行，将粘贴的单元格合并到现有的 wdTableAppendTable 10 表格中。 wdTableInsertAsRows 11 将粘贴的表格作为行插入到目标表格的两行中间。 wdTableOriginalFormatting 12 粘贴一个追加的表格，而不合并表格样式。 wdTableOverwriteCells 23 粘贴表格单元格并覆盖现有的表格单元格。 wdUseDestinationStylesRecovery 19 使用目标文档中使用的样式。

# WdRectangleType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定矩形的类型以及它所包含的信息。

名称名称 值值 说明说明 wdLineBetweenColumnRectangle 5 代表列分隔线所对应的区域。 wdMarkupRectangle 2 代表批注框所占用的空间。 代表“更多”指示符 (...) 所占用的空间，批注框中显示该指示符时表明存在更多批 wdMarkupRectangleButton 3 注文本。 wdPageBorderRectangle 4 代表页面边框所占用的空间。 wdSelection 6 代表选择工具所占用的空间，如表格左上角的表格选择工具或图像的锁定标记。 wdShapeRectangle 1 代表形状所占用的空间。 wdSystem 7 不可用。 wdTextRectangle 0 代表文本所占用的空间。 wdDocumentControlRectangle 13 代表内容控件、公式或文档生成块等文档内控件所占用的空间。 wdMailNavArea 12 代表在邮件客户端中阅读电子邮件时电子邮件导航按钮所占用的空间。 代表为了在页面上显示修订气球而占用的空间。只有在使用“打印打印 ”对话框中 wdMarkupRectangleArea 8 的“显示标记的文档”进行打印时，才会打印此空间。 wdMarkupRectangleMoveMatch 10 代表由用于在文档中查找匹配的跟踪移动对的“搜索搜索 ”按钮所占用的空间。 wdReadingModeNavigation 9 代表在全页阅读视图中阅读文档时页面导航按钮所占用的空间。 wdReadingModePanningArea 11 代表在全页阅读视图中阅读文档时为翻转页面而占用的空间。

# WdReferenceKind 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在交叉引用中包含的信息。

名称名称 值值 说明说明 wdContentText -1 插入指定项的文本值。例如，插入指定标题的文本。 wdEndnoteNumber 6 插入尾注引用标记。 wdEndnoteNumberFormatted 17 插入带格式的尾注引用标记。 wdEntireCaption 2 插入指定的公式、图表或表格的标签、编号和任何其他题注。 wdFootnoteNumber 5 插入脚注引用标记。 wdFootnoteNumberFormatted 16 插入带格式的脚注引用标记。 wdNumberFullContext -4 插入完整的标题或段落编号。 wdNumberNoContext -3 插入标题或段落，但不插入它在多级符号列表中的相对位置。

插入标题或段落，并且插入它在多级符号列表中的相对位置，该相对位置应足以标 wdNumberRelativeContext -2 识该项目。 wdOnlyCaptionText 4 只插入指定公式、图表或表格的题注文字。 wdOnlyLabelAndNumber 3 只插入指定公式、图表或表格的标签和编号。 wdPageNumber 7 插入指定项的页码。 wdPosition 15 根据需要插入单词“Above”或“Below”。

# WdReferenceType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要交叉引用的项目的类型。

名称名称 值值 说明说明 wdRefTypeBookmark 2 书签。 wdRefTypeEndnote 4 尾注。 wdRefTypeFootnote 3 脚注。 wdRefTypeHeading 1 标题。 wdRefTypeNumberedItem 0 编号项。

# WdRelativeHorizontalPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图文框、形状或一组行的水平位置所相对的对象。

名称名称 值值 说明说明 wdRelativeHorizontalPositionCharacter 3 相对于字符。 wdRelativeHorizontalPositionColumn 2 相对于列。 wdRelativeHorizontalPositionMargin 0 相对于边距。 wdRelativeHorizontalPositionPage 1 相对于页面。 wdRelativeHorizontalPositionInnerMarginArea 6 相对于内空白区。 wdRelativeHorizontalPositionLeftMarginArea 4 相对于左边距。 wdRelativeHorizontalPositionOuterMarginArea 7 相对于外空白区。 wdRelativeHorizontalPositionRightMarginArea 5 相对于右边距。

# WdRelativeHorizontalSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

使用在 Shape 或 ShapeRange 对象的 WidthRelative 属性中指定的值来指定形状的相对宽度。

名称名称 值值 说明说明

宽度相对于内边距的大小，即相对于奇数页的左边距大小和偶数页的 wdRelativeHorizontalSizeInnerMarginArea 4 右边距大小。 wdRelativeHorizontalSizeLeftMarginArea 2 宽度相对于左边距的大小。 wdRelativeHorizontalSizeMargin 0 宽度相对于左边距和右边距之间的间距。

宽度相对于外边距的大小，即相对于奇数页的右边距大小和偶数页的 wdRelativeHorizontalSizeOuterMarginArea 5 左边距大小。 wdRelativeHorizontalSizePage 1 宽度相对于页面宽度。 wdRelativeHorizontalSizeRightMarginArea 3 宽度相对于右边距的宽度。

# WdRelativeVerticalPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图文框、形状或一组行的纵向位置所相对的对象。

名称名称 值值 说明说明 wdRelativeVerticalPositionLine 3 相对于线。 wdRelativeVerticalPositionMargin 0 相对于边距。 wdRelativeVerticalPositionPage 1 相对于页面。 wdRelativeVerticalPositionParagraph 2 相对于段落。 wdRelativeVerticalPositionBottomMarginArea 5 相对于下边距。 wdRelativeVerticalPositionInnerMarginArea 6 相对于内空白区。 wdRelativeVerticalPositionOuterMarginArea 7 相对于外空白区。 wdRelativeVerticalPositionTopMarginArea 4 相对于上边距。

# WdRelativeVerticalSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 使用在 Shape 或 ShapeRange 对象的 HeightRelative 属性中指定的值来指定形状的相对高度。

名称名称 值值 说明说明 wdRelativeVerticalSizeBottomMarginArea 3 高度以下边距的大小为基准。

高度以内边距的大小为基准，即以奇数页的上边距大小和偶数页的下边 wdRelativeVerticalSizeInnerMarginArea 4 距大小为基准。 wdRelativeVerticalSizeMargin 0 高度以左边距和右边距之间的间距为基准。

高度以外边距的大小为基准，即以奇数页的下边距大小和偶数页的上边 wdRelativeVerticalSizeOuterMarginArea 5 距大小为基准。 wdRelativeVerticalSizePage 1 高度以页面高度为基准。 wdRelativeVerticalSizeTopMarginArea 2 高度以上边距的大小为基准。

# WdRelocate 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应该相对于段落的当前位置将其重新放置到何处。

名称名称 值值 说明说明 wdRelocateDown 1 在下一个可见的段落下面。 wdRelocateUp 0 在上一个可见的段落上面。

# WdRemoveDocInfoType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定从文档中删除的信息类型。

名称名称 值值 说明说明 wdRDIAll 99 删除所有文档信息。 wdRDIComments 1 删除文档注释。 wdRDIContentType 16 删除内容类型信息。 wdRDIDocumentManagementPolicy 15 删除文档管理策略信息。 wdRDIDocumentProperties 8 删除文档属性。 wdRDIDocumentServerProperties 14 删除文档服务器属性。 wdRDIDocumentWorkspace 10 删除文档工作区信息。 wdRDIEmailHeader 5 删除电子邮件标题信息。 wdRDIInkAnnotTations 11 删除墨迹注释。 wdRDIRemovePersonalInformation 4 删除个人信息。 wdRDIRevisions 2 删除修订标记。 wdRDIRoutingSlip 6 删除传送名单信息。 wdRDISendForReview 7 删除在发送文档供审阅时存储的信息。 wdRDITemplate 9 删除模板信息。 wdRDIVersions 3 删除文档版本信息。

# WdReplace 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在使用“查找和替换”时要进行的替换次数。

名称名称 值值 说明说明 wdReplaceAll 2 替换所有匹配项。 wdReplaceNone 0 不替换任何匹配项。 wdReplaceOne 1 替换遇到的第一个匹配项。

# WdRevisedLinesMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在启用修订功能时显示修订的位置。

名称名称 值值 说明说明 wdRevisedLinesMarkLeftBorder 1 在左边框中。 wdRevisedLinesMarkNone 0 不显示。 wdRevisedLinesMarkOutsideBorder 3 在边框外部。 wdRevisedLinesMarkRightBorder 2 在右边框中。

# WdRevisedPropertiesMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在启用修订功能时显示修订的方式。

名称名称 值值 说明说明 wdRevisedPropertiesMarkBold 1 使用加粗字体。 wdRevisedPropertiesMarkColorOnly 5 使用指定的颜色。 wdRevisedPropertiesMarkDoubleStrikeThrough 7 使用双删除线符号。 wdRevisedPropertiesMarkDoubleUnderline 4 使用双下划线符号。 wdRevisedPropertiesMarkItalic 2 使用斜体。 wdRevisedPropertiesMarkNone 0 使用特殊符号。 wdRevisedPropertiesMarkStrikeThrough 6 使用删除线符号。 wdRevisedPropertiesMarkUnderline 3 使用下划线。

# WdRevisionsBalloonMargin 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应该显示修订气球的边距。

名称名称 值值 说明说明 wdLeftMargin 0 左边距。 wdRightMargin 1 右边距。默认值。

# WdRevisionsBalloonPrintOrientation 枚举枚举

# WdRevisionsBalloonPrintOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在打印修订气球和批注气球时的方向。

名称名称 值值 说明说明 wdBalloonPrintOrientationAuto 0 WPS 自动选择适当的方向，以使显示比例系数最接近 100%。 WPS 强制以横向模式打印所有节，而不考虑原来的方向，并且在与 wdBalloonPrintOrientationForceLandscape 2 文档文本相对的一侧打印修订气球和批注气球。 wdBalloonPrintOrientationPreserve 1 WPS 保留未加批注的原始文档的方向。

# WdRevisionsBalloonWidthType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 度量修订气球宽度的方式。

名称名称 值值 说明说明 wdBalloonWidthPercent 0 以文档宽度的百分比度量。 wdBalloonWidthPoints 1 以磅为单位度量。

# WdRevisionsMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 是在边距中显示气球还是在文档正文内部显示气球。

名称名称 值值 说明说明 wdBalloonRevisions 0 在左边距或右边距的气球中显示修订。 在正文中显示修订，使用删除线表示删除，使用下划线表示插入。这是 WPS 早期版本的默认 wdInLineRevisions 1 设置。 wdMixedRevisions 2 不支持。

# WdRevisionsView 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 是显示文档的原始版本还是显示应用了修订和格式更改的版本。

名称名称 值值 说明说明 wdRevisionsViewFinal 0 显示应用了格式和内容更改的文档。 wdRevisionsViewOriginal 1 显示进行更改之前的文档。

# WdRevisionsWrap 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在文档中显示修订标记的方式。

名称名称 值值 说明说明 wdWrapAlways 1 以环绕方式显示修订。 wdWrapAsk 2 询问用户是否应该以环绕方式显示修订。 wdWrapNever 0 从不以环绕方式显示修订。

# WdRevisionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用修订标记进行标记的更改的类型。

名称名称 值值 说明说明 wdNoRevision 0 无修订。 wdRevisionConflict 7 将修订标记为冲突。 wdRevisionDelete 2 删除。 wdRevisionDisplayField 5 域显示方式已更改。 wdRevisionInsert 1 插入。 wdRevisionParagraphNumber 4 段落编号已更改。 wdRevisionParagraphProperty 10 段落属性已更改。 wdRevisionProperty 3 属性已更改。 wdRevisionReconcile 6 将修订标记为已解决的冲突。 wdRevisionReplace 9 已替换。 wdRevisionSectionProperty 12 节属性已更改。 wdRevisionStyle 8 样式已更改。 wdRevisionStyleDefinition 13 样式定义已更改。 wdRevisionTableProperty 11 表格属性已更改。 wdRevisionCellDeletion 17 表格单元格已删除。 wdRevisionCellInsertion 16 表格单元格已插入。 wdRevisionCellMerge 18 表格单元格已合并。 wdRevisionMovedFrom 14 移动内容的起点。 wdRevisionMovedTo 15 移动内容的终点。

# WdRoutingSlipDelivery 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于将文档传递给收件人的传送方法。

名称名称 值值 说明说明 wdAllAtOnce 1 同时传递给所有收件人。 wdOneAfterAnother 0 一次只传递给一位收件人。

# WdRoutingSlipStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定由附加到文档的传送名单指示的传送状态。

名称名称 值值 说明说明 wdNotYetRouted 0 文档尚未传递。 wdRouteComplete 2 传送已完成，并且文档已经传递给所有收件人。 wdRouteInProgress 1 正在将文档传递给所有收件人。

# WdRowAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所选行中内容的对齐方式。

名称名称 值值 说明说明 wdAlignRowCenter 1 居中。 wdAlignRowLeft 0 左对齐。默认值。 wdAlignRowRight 2 右对齐。

# WdRowHeightRule 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于确定所指定单元格或行的高度的规则。

名称名称 值值 说明说明 wdRowHeightAtLeast 1 行高至少是最小的指定值。 wdRowHeightAuto 0 调整行高以适应该行中的最大高度值。 wdRowHeightExactly 2 行高是固定值。

# WdRulerStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 在左缩进更改时调整表格的方式。

名称名称 值值 说明说明 wdAdjustFirstColumn 2 只调整第一列的左边缘，而保持其他列和表格右边缘的位置。 wdAdjustNone 0 调整一行或多行的左边缘，通过将所有列左移或右移来保持列宽度。这是默认值。

调整第一列的左边缘，通过按比例调整指定的一行或多行中所有单元格的宽度，保持表格右边 wdAdjustProportional 1 缘的位置。

调整第一列的左边缘，通过将指定的一行或多行中所有单元格的宽度设置为相同值，保持表格 wdAdjustSameWidth 3 右边缘的位置。

# WdSalutationGender 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在称呼中使用的性别。

名称名称 值值 说明说明 wdGenderFemale 0 女性。 wdGenderMale 1 男性。 wdGenderNeutral 2 中性。 wdGenderUnknown 3 未知性别。

# WdSalutationType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要用于信函的称呼的类型。

名称名称 值值 说明说明 wdSalutationBusiness 2 商业称呼。 wdSalutationFormal 1 正式称呼。 wdSalutationInformal 0 非正式称呼。 wdSalutationOther 3 自定义称呼。

# WdSaveFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在保存文档时使用的格式。

名称名称 值值 说明说明 wdFormatDocument 0 Microsoft Word 97 - 2003文件 wdFormatDocument97 0 Microsoft Word 97文件格式 wdFormatTemplate 1 Word 97 格式 wdFormatTemplate97 1 Word 97 模板格式 wdFormatText 2 文本格式 wdFormatTextLineBreaks 3 wdFormatDOSText 4 wdFormatDOSTextLineBreaks 5 wdFormatRTF 6 wdFormatUnicodeText 7 Unicode文本格式 wdFormatEncodedText 7 编码文本格式 wdFormatHTML 8 HTML格式 wdFormatWebArchive 9 web档案格式 wdFormatFilteredHTML 10 wdFormatXML 11 XML格式 wdFormatXMLDocument 12 XML 文档格式 wdFormatXMLDocumentMacroEnabled 13 启用了宏的 XML 文档格式 wdFormatXMLTemplate 14 XML 模板格式 wdFormatXMLTemplateMacroEnabled 15 启用了宏的 XML 模板格式 wdFormatPDF 17 PDF 格式 wdFormatXPS 18 XPS 格式 wdFormatFlatXML 19 wdFormatFlatXMLMacroEnabled 20 wdFormatFlatXMLTemplate 21 wdFormatFlatXMLTemplateMacroEnabled 22 wdFormatOpenDocumentText 23 wdFormatStrictOpenXMLDocument 24 wdFormatOFD 25 OFD wdFormatUOF 103 UOF

名称名称 值值 说明说明 wdFormatDocument 0 Microsoft Word 97 - 2003文件 wdFormatDocument97 0 Microsoft Word 97文件格式 wdFormatTemplate 1 Word 97 格式 wdFormatTemplate97 1 Word 97 模板格式 wdFormatText 2 文本格式 wdFormatTextLineBreaks 3 wdFormatDOSText 4 wdFormatDOSTextLineBreaks 5 wdFormatRTF 6 wdFormatUnicodeText 7 Unicode文本格式 wdFormatEncodedText 7 编码文本格式 wdFormatHTML 8 HTML格式 wdFormatWebArchive 9 web档案格式 wdFormatFilteredHTML 10 wdFormatXML 11 XML格式 wdFormatXMLDocument 12 XML 文档格式 wdFormatXMLDocumentMacroEnabled 13 启用了宏的 XML 文档格式 wdFormatXMLTemplate 14 XML 模板格式 wdFormatXMLTemplateMacroEnabled 15 启用了宏的 XML 模板格式 wdFormatPDF 17 PDF 格式 wdFormatXPS 18 XPS 格式 wdFormatFlatXML 19 wdFormatFlatXMLMacroEnabled 20 wdFormatFlatXMLTemplate 21 wdFormatFlatXMLTemplateMacroEnabled 22 wdFormatOpenDocumentText 23 wdFormatStrictOpenXMLDocument 24 wdFormatOFD 25 OFD wdFormatUOF 103 UOF

# WdSaveOptions 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应该如何处理待定的更改。

名称名称 值值 说明说明 wdDoNotSaveChanges 0 不保存待定的更改。 wdPromptToSaveChanges -2 提示用户保存待定更改。 wdSaveChanges -1 自动保存待定更改，而不提示用户。

# WdScrollbarType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当用 Web 浏览器查看指定框架的框架页时，何时可以在该框架中使用滚动条。

名称名称 值值 说明说明 wdScrollbarTypeAuto 0 仅在内容太长而无法在分配的空间中显示的情况下，才可在指定的框架中使用滚动条。 wdScrollbarTypeNo 2 永远无法在指定框架中使用滚动条。 wdScrollbarTypeYes 1 总是可以在指定的框架中使用滚动条。

# WdSectionDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 如何显示指定节的阅读顺序和对齐方式。

名称名称 值值 说明说明 wdSectionDirectionLtr 1 用左对齐方式和从左到右的阅读顺序显示节。 wdSectionDirectionRtl 0 用右对齐方式和从右到左的阅读顺序显示节。

# WdSectionStart 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所指定项的分节符的类型。

名称名称 值值 说明说明 wdSectionContinuous 0 “连续”分节符。 wdSectionEvenPage 3 “偶数页”分节符。 wdSectionNewColumn 1 “新栏”分节符。 wdSectionNewPage 2 “新页”分节符。 wdSectionOddPage 4 “奇数页”分节符。

# WdSeekView 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在页面视图中显示的文档元素。

名称名称 值值 说明说明 wdSeekCurrentPageFooter 10 当前页页脚。 wdSeekCurrentPageHeader 9 当前页页眉。 wdSeekEndnotes 8 尾注。 wdSeekEvenPagesFooter 6 偶数页页脚。 wdSeekEvenPagesHeader 3 偶数页页眉。 wdSeekFirstPageFooter 5 首页页脚。 wdSeekFirstPageHeader 2 首页页眉。 wdSeekFootnotes 7 脚注。 wdSeekMainDocument 0 主文档。 wdSeekPrimaryFooter 4 主页脚。 wdSeekPrimaryHeader 1 主页眉。

# WdSelectionFlags 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所选内容的属性。

名称名称 值值 说明说明 wdSelActive 8 所选内容是活动的。 wdSelAtEOL 2 所选内容位于信函的末尾。 wdSelOvertype 4 所选内容被改写。 wdSelReplace 16 所选内容被替换。 wdSelStartActive 1 所选内容位于活动文档的开头。

# WdSelectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定选择类型。

名称名称 值值 说明说明 wdNoSelection 0 没有选定内容。 wdSelectionBlock 6 列方式选定。 wdSelectionColumn 4 列选择。 wdSelectionFrame 3 框架选择。 wdSelectionInlineShape 7 内嵌形状选择。 wdSelectionIP 1 内嵌段落选择。 wdSelectionNormal 2 标准的或用户定义的选择容。 wdSelectionRow 5 行选择。 wdSelectionShape 8 形状选择。

# WdSeparatorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在各项之间放置的分隔符的类型。

名称名称 值值 说明说明 wdSeparatorColon 2 冒号。 wdSeparatorEmDash 3 着重突出的划线。 wdSeparatorEnDash 4 标准划线。 wdSeparatorHyphen 0 连字符。 wdSeparatorPeriod 1 句点。

# WdShapePosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所指定形状的相对位置。

名称名称 值值 说明说明 wdShapeBottom -999997 底部。 wdShapeCenter -999995 中央。 wdShapeInside -999994 所选区域内部。 wdShapeLeft -999998 左侧。 wdShapeOutside -999993 所选区域外部。 wdShapeRight -999996 右侧。 wdShapeTop -999999 顶部。

# WdShapePositionRelative 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 Shape 或 ShapeRange 对象的 LeftRelative 或 TopRelative 属性是否有效。

名称名称 值值 说明说明 -指定 LeftRelative 或 TopRelative 属性当前无效，因此分别根据 Left 或 wdShapePositionRelativeNone 999999Top 属性中指定的值放置形状。

# WdShapeSizeRelative 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 Shape 或 ShapeRange 对象的 WidthRelative 或 HeightRelative 属性是否有效。

名称名称 值值 说明说明 -指定 WidthRelative 或 HeightRelative 属性当前无效，因此分别根据 Left 或 wdShapeSizeRelativeNone 999999Top 属性中指定的值放置形状。

# WdShowFilter 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定要在“样式和格式样式和格式”任务窗格中显示的样式和格式。

名称名称 值值 说明说明 wdShowFilterFormattingAvailable 4 所有可用的格式。 wdShowFilterFormattingInUse 3 所有正在使用的格式。 wdShowFilterStylesAll 2 所有样式。 wdShowFilterStylesAvailable 0 所有可用的样式。 wdShowFilterStylesInUse 1 所有正在使用的样式。 wdShowFilterFormattingRecommended 5 仅限于推荐的样式。

# WdShowSourceDocuments 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在使用 WPS 比较函数比较两个文档时源文档的显示方式。

名称名称 值值 说明说明 wdShowSourceDocumentsBoth 3 同时显示原始文档和修订后的文档。 wdShowSourceDocumentsNone 0 对于比较函数中所用的源文档，既不显示原始文档，也不显示修订后的文档。 wdShowSourceDocumentsOriginal 1 只显示原始文档。 wdShowSourceDocumentsRevised 2 只显示修订后的文档。

# WdSmartTagControlType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定与 SmartTagAction 对象相关联的控件的类型。

名称名称 值值 说明说明 wdControlActiveX 13 ActiveX 控件。 wdControlButton 6 按钮。 wdControlCheckbox 9 复选框。 wdControlCombo 12 组合框。 wdControlDocumentFragment 14 文档片段。 wdControlDocumentFragmentURL 15 文档片段 URL。 wdControlHelp 3 帮助。 wdControlHelpURL 4 帮助 URL。 wdControlImage 8 图像。 wdControlLabel 7 标签。 wdControlLink 2 链接。 wdControlListbox 11 列表框。 wdControlRadioGroup 16 单选按钮组。 wdControlSeparator 5 分隔符。 wdControlSmartTag 1 智能标记。 wdControlTextbox 10 文本框。

# WdSortFieldType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在对列进行排序时应用的排序类型。

名称名称 值值 说明说明 wdSortFieldAlphanumeric 0 字母数字顺序。 wdSortFieldDate 2 日期顺序。 wdSortFieldJapanJIS 4 日语 JIS 顺序。 wdSortFieldKoreaKS 6 朝鲜语 KS 顺序。 wdSortFieldNumeric 1 数字顺序。 wdSortFieldStroke 5 笔划顺序。 wdSortFieldSyllable 3 音节顺序。

# WdSortOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定排序方向。

名称名称 值值 说明说明 wdSortOrderAscending 0 升序。默认值。 wdSortOrderDescending 1 降序。

# WdSortSeparator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定域分隔符的类型。

名称名称 值值 说明说明 wdSortSeparateByCommas 1 逗号。 wdSortSeparateByDefaultTableSeparator 2 默认表格分隔符。 wdSortSeparateByTabs 0 制表符。

# WdSpanishSpeller 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定西班牙语拼写器模式。

名称名称 值值 说明说明 wdSpanishTuteoAndVoseo 1 西班牙语拼写检查器可识别 tuteo 和 voseo 动词。 wdSpanishTuteoOnly 0 西班牙语拼写检查器仅识别 tuteo 动词。 wdSpanishVoseoOnly 2 西班牙语拼写检查器仅识别 voseo 动词。

# WdSpecialPane 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在活动窗口的窗格中显示的项。

名称名称 值值 说明说明 wdPaneComments 15 所选批注。 wdPaneCurrentPageFooter 17 页脚。 wdPaneCurrentPageHeader 16 页眉。 wdPaneEndnoteContinuationNotice 12 尾注延续标记。 wdPaneEndnoteContinuationSeparator 13 尾注延续分隔符。 wdPaneEndnotes 8 尾注。 wdPaneEndnoteSeparator 14 尾注分隔符。 wdPaneEvenPagesFooter 6 偶数页页脚。 wdPaneEvenPagesHeader 3 偶数页页眉。 wdPaneFirstPageFooter 5 首页页脚。 wdPaneFirstPageHeader 2 首页页眉。 wdPaneFootnoteContinuationNotice 9 脚注延续标记。 wdPaneFootnoteContinuationSeparator 10 脚注延续分隔符。 wdPaneFootnotes 7 脚注。 wdPaneFootnoteSeparator 11 脚注分隔符。 wdPaneNone 0 无显示。 wdPanePrimaryFooter 4 主页脚窗格。 wdPanePrimaryHeader 1 主页眉窗格。 wdPaneRevisions 18 修订窗格。 wdPaneRevisionsHoriz 19 修订窗格沿着文档窗口的底部显示。 wdPaneRevisionsVert 20 修订窗格沿着文档窗口的左侧显示。

# WdSpellingErrorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定拼写错误类型。

名称名称 值值 说明说明 wdSpellingCapitalization 2 大写字母错误。 wdSpellingCorrect 0 拼写正确。 wdSpellingNotInDictionary 1 单词不在指定的词典中。

# WdSpellingWordType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 提出拼写建议的方式。

名称名称 值值 说明说明 wdAnagram 2 换音造词或回文造词搜索。 wdSpellword 0 近似拼写单词搜索。 wdWildcard 1 通配符搜索。

# WdStatistic 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要从选定内容或项目返回的统计信息。

名称名称 值值 说明说明 wdStatisticCharacters 3 字符数。 wdStatisticCharactersWithSpaces 5 包括空格在内的字符数。 wdStatisticFarEastCharacters 6 亚洲语言字符数。 wdStatisticLines 1 行数。 wdStatisticPages 2 页数。 wdStatisticParagraphs 4 段落数。 wdStatisticWords 0 单词数。

# WdStoryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定选定内容或项目的部分类型。

名称名称 值值 说明说明 wdCommentsStory 4 批注部分。 wdEndnoteContinuationNoticeStory 17 尾注延续标记部分。 wdEndnoteContinuationSeparatorStory 16 尾注延续分隔符部分。 wdEndnoteSeparatorStory 15 尾注分隔符部分。 wdEndnotesStory 3 尾注部分。 wdEvenPagesFooterStory 8 偶数页页脚部分。 wdEvenPagesHeaderStory 6 偶数页页眉部分。 wdFirstPageFooterStory 11 首页页脚部分。 wdFirstPageHeaderStory 10 首页页眉部分。 wdFootnoteContinuationNoticeStory 14 脚注延续标记部分。 wdFootnoteContinuationSeparatorStory 13 脚注延续分隔符部分。 wdFootnoteSeparatorStory 12 脚注分隔符部分。 wdFootnotesStory 2 脚注部分。 wdMainTextStory 1 正文部分。 wdPrimaryFooterStory 9 主页脚部分。 wdPrimaryHeaderStory 7 主页眉部分。 wdTextFrameStory 5 文本框架部分。

# WdStyleSheetLinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何将样式表与文档相关联。

名称名称 值值 说明说明 wdStyleSheetLinkTypeImported 1 导入的内部样式表。 wdStyleSheetLinkTypeLinked 0 链接的外部样式表。

# WdStyleSheetPrecedence 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定与附加到 Web 文档的其他级联样式表相比之下的样式表重要性级别。

名称名称 值值 说明说明 wdStyleSheetPrecedenceHigher -1 普通优先级。 wdStyleSheetPrecedenceHighest 1 最高优先级。 wdStyleSheetPrecedenceLower -2 较低的优先级。 wdStyleSheetPrecedenceLowest 0 最低优先级。

# WdStyleSort 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定如何对“样式样式”任务窗格中的样式进行排序。

名称名称 值值 说明说明 wdStyleSortByBasedOn 3 根据“样式排序方式基于样式排序方式基于 ”选项中指定的项对样式进行排序。 wdStyleSortByFont 2 根据所用字体的名称对样式进行排序。 wdStyleSortByName 0 根据样式的名称按字母顺序对样式进行排序。 wdStyleSortByType 4 根据样式是段落样式还是字符样式对样式进行排序。 wdStyleSortRecommended 1 根据是否是建议使用样式对样式进行排序。

# WdStyleType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的样式类型。

名称名称 值值 说明说明 wdStyleTypeCharacter 2 正文字符样式。 wdStyleTypeList 4 列表样式。 wdStyleTypeParagraph 1 段落样式。 wdStyleTypeTable 3 表格样式。

# WdStylisticSet 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于字体的样式集。

注释注释 并不是所有 OpenType 字体都提供样式集。将字体的 StylisticSet 属性设置为不是由该字体提供的 WdStylisticSet 常量将 不起任何作用。

注释注释 并不是所有 OpenType 字体都提供样式集。将字体的 StylisticSet 属性设置为不是由该字体提供的 WdStylisticSet 常量将 不起任何作用。

名称名称 值值 说明说明 wdStylisticSet01 1 指定字体的第一个样式集。 wdStylisticSet02 2 指定字体的第二个样式集。 wdStylisticSet03 4 指定字体的第三个样式集。 wdStylisticSet04 8 指定字体的第四个样式集。 wdStylisticSet05 16 指定字体的第五个样式集。 wdStylisticSet06 32 指定字体的第六个样式集。 wdStylisticSet07 64 指定字体的第七个样式集。 wdStylisticSet08 128 指定字体的第八个样式集。 wdStylisticSet09 256 指定字体的第九个样式集。 wdStylisticSet10 512 指定字体的第十个样式集。 wdStylisticSet11 1024 指定字体的第十一个样式集。 wdStylisticSet12 2048 指定字体的第十二个样式集。 wdStylisticSet13 4096 指定字体的第十三个样式集。 wdStylisticSet14 8192 指定字体的第十四个样式集。 wdStylisticSet15 16384 指定字体的第十五个样式集。 wdStylisticSet16 32768 指定字体的第十六个样式集。 wdStylisticSet17 65536 指定字体的第十七个样式集。 wdStylisticSet18 131072 指定字体的第十八个样式集。 wdStylisticSet19 262144 指定字体的第十九个样式集。 wdStylisticSet20 524288 指定字体的第二十个样式集。 wdStylisticSetDefault 0 指定字体的默认样式集。

# WdSubscriberFormats 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举已经被弃用，不应使用。

名称名称 值值 说明说明 wdSubscriberBestFormat 0 不支持。 wdSubscriberPict 4 不支持。 wdSubscriberRTF 1 不支持。 wdSubscriberText 2 不支持。

# WdTabAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的制表位对齐方式。

名称名称 值值 说明说明 wdAlignTabBar 4 竖线对齐。 wdAlignTabCenter 1 居中对齐。 wdAlignTabDecimal 3 小数点对齐。 wdAlignTabLeft 0 左对齐。 wdAlignTabList 6 列表对齐。 wdAlignTabRight 2 右对齐。

# WdTabLeader 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要用作带格式制表符前导符的字符。

名称名称 值值 说明说明 wdTabLeaderDashes 2 划线。 wdTabLeaderDots 1 点。 wdTabLeaderHeavy 4 粗线。 wdTabLeaderLines 3 双线。 wdTabLeaderMiddleDot 5 中间点。 wdTabLeaderSpaces 0 空格。默认值。

# WdTableDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 对指定表格或行中的单元格进行排序的方向。

名称名称 值值 说明说明 wdTableDirectionLtr 1 对所选行进行排列，使第一列位于最左边的位置。 wdTableDirectionRtl 0 对所选行进行排列，使第一列位于最右边的位置。

# WdTableFieldSeparator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要在下列情况下使用的字符：在将文本转换为表格时将文本分隔成单元格；以及在将表格转换为文本时分

隔所转换的列（段落标记分隔所转换的行）。

名称名称 值值 说明说明 wdSeparateByCommas 2 一个逗号。 wdSeparateByDefaultListSeparator 3 默认列表分隔符。 wdSeparateByParagraphs 0 段落标记。 wdSeparateByTabs 1 制表符。

# WdTableFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于表格的预定义格式。

名称名称 值值 说明说明 wdTableFormat3DEffects1 32 1 号三维效果格式。 wdTableFormat3DEffects2 33 2 号三维效果格式。 wdTableFormat3DEffects3 34 3 号三维效果格式。 wdTableFormatClassic1 4 1 号古典格式。 wdTableFormatClassic2 5 2 号古典格式。 wdTableFormatClassic3 6 3 号古典格式。 wdTableFormatClassic4 7 4 号古典格式。 wdTableFormatColorful1 8 1 号彩色格式。 wdTableFormatColorful2 9 2 号彩色格式。 wdTableFormatColorful3 10 3 号彩色格式。 wdTableFormatColumns1 11 1 号竖列格式。 wdTableFormatColumns2 12 2 号竖列格式。 wdTableFormatColumns3 13 3 号竖列格式。 wdTableFormatColumns4 14 4 号竖列格式。 wdTableFormatColumns5 15 5 号竖列格式。 wdTableFormatContemporary 35 流行格式。 wdTableFormatElegant 36 典雅格式。 wdTableFormatGrid1 16 1 号网格格式。 wdTableFormatGrid2 17 2 号网格格式。 wdTableFormatGrid3 18 3 号网格格式。 wdTableFormatGrid4 19 4 号网格格式。 wdTableFormatGrid5 20 5 号网格格式。 wdTableFormatGrid6 21 6 号网格格式。 wdTableFormatGrid7 22 7 号网格格式。 wdTableFormatGrid8 23 8 号网格格式。 wdTableFormatList1 24 1 号列表格式。 wdTableFormatList2 25 2 号列表格式。 wdTableFormatList3 26 3 号列表格式。 wdTableFormatList4 27 4 号列表格式。 wdTableFormatList5 28 5 号列表格式。 wdTableFormatList6 29 6 号列表格式。 wdTableFormatList7 30 7 号列表格式。 wdTableFormatList8 31 8 号列表格式。 wdTableFormatNone 0 无格式。 wdTableFormatProfessional 37 专业格式。 wdTableFormatSimple1 1 1 号简明格式。 wdTableFormatSimple2 2 2 号简明格式。 wdTableFormatSimple3 3 3 号简明格式。 wdTableFormatSubtle1 38 1 号精巧格式。 wdTableFormatSubtle2 39 2 号精巧格式。 wdTableFormatWeb1 40 1 号 Web 格式。 wdTableFormatWeb2 41 2 号 Web 格式。 wdTableFormatWeb3 42 3 号 Web 格式。

# WdTableFormatApply 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应该如何应用表格格式。

名称名称 值值 说明说明 wdTableFormatApplyAutoFit 16 自动调整。 wdTableFormatApplyBorders 1 边框。 wdTableFormatApplyColor 8 颜色。 wdTableFormatApplyFirstColumn 128 将自动套用格式应用于第一列。 wdTableFormatApplyFont 4 字体。 wdTableFormatApplyHeadingRows 32 将自动套用格式应用于标题行。 wdTableFormatApplyLastColumn 256 将自动套用格式应用于最后一列。 wdTableFormatApplyLastRow 64 将自动套用格式应用于最后一行。 wdTableFormatApplyShading 2 底纹。

# WdTablePosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定表格在文档中的相对位置。

名称名称 值值 说明说明 wdTableBottom -999997 在文档的底部。 wdTableCenter -999995 居中。 wdTableInside -999994 位于区域内部。 wdTableLeft -999998 与文档的左侧对齐。 wdTableOutside -999993 位于区域外部。 wdTableRight -999996 与文档的右侧对齐。 wdTableTop -999999 在文档的顶部。

# WdTaskPanes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定任务窗格的类型。

名称名称 值值 说明说明 wdTaskPaneApplyStyles 17 应用样式窗格。 wdTaskPaneDocumentActions 7 文档操作窗格。 wdTaskPaneDocumentProtection 6 文档保护窗格。 wdTaskPaneFaxService 11 传真服务窗格。 wdTaskPaneFormatting 0 格式窗格。 wdTaskPaneHelp 9 帮助窗格。 wdTaskPaneMailMerge 2 邮件合并窗格。 wdTaskPaneResearch 10 检索窗格。 wdTaskPaneRevealFormatting 1 显示格式代码窗格。 wdTaskPaneSearch 4 搜索窗格。 wdTaskPaneSignature 14 签名窗格。 wdTaskPaneStyleInspector 15 样式检查器窗格。 wdTaskPaneTranslate 3 翻译窗格。 wdTaskPaneXMLDocument 12 XML 文档窗格。 wdTaskPaneXMLStructure 5 XML 结构窗格。

# WdTCSCConverterDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在繁体中文和简体中文之间进行转换的方式。

名称名称 值值 说明说明 wdTCSCConverterDirectionAuto 2 根据在指定区域检测到的语言，进行相应方向的转换。 wdTCSCConverterDirectionSCTC 0 将简体中文转换为繁体中文。 wdTCSCConverterDirectionTCSC 1 将繁体中文转换为简体中文。

# WdTemplateType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定模板的类型。

名称名称 值值 说明说明 wdAttachedTemplate 2 附加模板。 wdGlobalTemplate 1 全局模板。 wdNormalTemplate 0 标准默认模板。

# WdTextboxTightWrap 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 使文字紧密环绕文本框的方式。

注释注释

仅当文本框为浮动对象且未设置边框或填充时，此设置才有效。

注释注释

仅当文本框为浮动对象且未设置边框或填充时，此设置才有效。

名称名称 值值 说明说明 wdTightAll 1 在所有行上，文本框周围文字紧密环绕文本框的内容。 wdTightFirstAndLastLines 2 仅在第一行和最后一行上，文字紧密环绕文本框的内容。 wdTightFirstLineOnly 3 仅在第一行上，文字紧密环绕文本框的内容。 wdTightLastLineOnly 4 仅在最后一行上，文字紧密环绕文本框的内容。 wdTightNone 0 文字不紧密环绕文本框的内容。

# WdTextFormFieldType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文字型窗体域的类型。

名称名称 值值 说明说明 wdCalculationText 5 计算文字型域。 wdCurrentDateText 3 当前日期文字型域。 wdCurrentTimeText 4 当前时间文字型域。 wdDateText 2 日期文字型域。 wdNumberText 1 数字文字型域。 wdRegularText 0 常规文字型域。

# WdTextOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定区域或选定内容中的文字方向。

名称名称 值值 说明说明 wdTextOrientationDownward 3 文字向斜下方排列。 wdTextOrientationHorizontal 0 文字水平排列。默认值。 wdTextOrientationHorizontalRotatedFarEast 4 文字水平排列，但方向是从右向左，以适应从右向左的语言。 wdTextOrientationUpward 2 文字向斜上方排列。 wdTextOrientationVerticalFarEast 1 文字纵向排列，阅读方向是从上向下、从右向左。 wdTextOrientationVertical 5 文字纵向排列，阅读方向是从上向下、从左向右。

# WdTextureIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要用于所选项的底纹纹理。

名称名称 值值 说明说明

名称名称 值值 说明说明 wdTexture10Percent 100 10% 底纹。 wdTexture12Pt5Percent 125 12.5% 底纹。 wdTexture15Percent 150 15% 底纹。 wdTexture17Pt5Percent 175 17.5% 底纹。 wdTexture20Percent 200 20% 底纹。 wdTexture22Pt5Percent 225 22.5% 底纹。 wdTexture25Percent 250 25% 底纹。 wdTexture27Pt5Percent 275 27.5% 底纹。 wdTexture2Pt5Percent 25 2.5% 底纹。 wdTexture30Percent 300 30% 底纹。 wdTexture32Pt5Percent 325 32.5% 底纹。 wdTexture35Percent 350 35% 底纹。 wdTexture37Pt5Percent 375 37.5% 底纹。 wdTexture40Percent 400 40% 底纹。 wdTexture42Pt5Percent 425 42.5% 底纹。 wdTexture45Percent 450 45% 底纹。 wdTexture47Pt5Percent 475 47.5% 底纹。 wdTexture50Percent 500 50% 底纹。 wdTexture52Pt5Percent 525 52.5% 底纹。 wdTexture55Percent 550 55% 底纹。 wdTexture57Pt5Percent 575 57.5% 底纹。 wdTexture5Percent 50 5% 底纹。 wdTexture60Percent 600 60% 底纹。 wdTexture62Pt5Percent 625 62.5% 底纹。 wdTexture65Percent 650 65% 底纹。 wdTexture67Pt5Percent 675 67.5% 底纹。 wdTexture70Percent 700 70% 底纹。 wdTexture72Pt5Percent 725 72.5% 底纹。 wdTexture75Percent 750 75% 底纹。 wdTexture77Pt5Percent 775 77.5% 底纹。 wdTexture7Pt5Percent 75 7.5% 底纹。 wdTexture80Percent 800 80% 底纹。 wdTexture82Pt5Percent 825 82.5% 底纹。 wdTexture85Percent 850 85% 底纹。 wdTexture87Pt5Percent 875 87.5% 底纹。 wdTexture90Percent 900 90% 底纹。 wdTexture92Pt5Percent 925 92.5% 底纹。 wdTexture95Percent 950 95% 底纹。 wdTexture97Pt5Percent 975 97.5% 底纹。 wdTextureCross -11 水平交叉底纹。 wdTextureDarkCross -5 水平交叉深色底纹。 wdTextureDarkDiagonalCross -6 斜向交叉深色底纹。 wdTextureDarkDiagonalDown -3 斜下深色底纹。 wdTextureDarkDiagonalUp -4 斜上深色底纹。 wdTextureDarkHorizontal -1 水平深色底纹。 wdTextureDarkVertical -2 垂直深色底纹。

wdTextureDiagonalCross -12 斜向交叉底纹。 wdTextureDiagonalDown -9 斜下底纹。 wdTextureDiagonalUp -10 斜上底纹。 wdTextureHorizontal -7 水平底纹。 wdTextureNone 0 无底纹。 wdTextureSolid 1000 纯色底纹。 wdTextureVertical -8 垂直底纹。

# WdThemeColorIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档主题的主题颜色。

名称名称 值值 说明说明 wdNotThemeColor -1 无颜色。 wdThemeColorAccent1 4 强调文字颜色 1。 wdThemeColorAccent2 5 强调文字颜色 2。 wdThemeColorAccent3 6 强调文字颜色 3。 wdThemeColorAccent4 7 强调文字颜色 4。 wdThemeColorAccent5 8 强调文字颜色 5。 wdThemeColorAccent6 9 强调文字颜色 6。 wdThemeColorBackground1 12 背景色 1。 wdThemeColorBackground2 14 背景色 2。 wdThemeColorHyperlink 10 超链接颜色。 wdThemeColorHyperlinkFollowed 11 已访问的超链接颜色。 wdThemeColorMainDark1 0 深色主色 1。 wdThemeColorMainDark2 2 深色主色 2。 wdThemeColorMainLight1 1 浅色主色 1。 wdThemeColorMainLight2 3 浅色主色 2。 wdThemeColorText1 13 文本颜色 1。 wdThemeColorText2 15 文本颜色 2。

# WdToaFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于活动文档中引文目录的格式的类型。

名称名称 值值 说明说明 wdTOAClassic 1 古典格式。 wdTOADistinctive 2 优雅格式。 wdTOAFormal 3 正式格式。 wdTOASimple 4 简单格式。 wdTOATemplate 0 模板格式。

# WdTocFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于活动文档中目录的格式的类型。

名称名称 值值 说明说明 wdTOCClassic 1 古典格式。 wdTOCDistinctive 2 优雅格式。 wdTOCFancy 3 流行格式。 wdTOCFormal 5 正式格式。 wdTOCModern 4 现代格式。 wdTOCSimple 6 简单格式。 wdTOCTemplate 0 模板格式。

# WdTofFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于活动文档中图表目录的格式的类型。

名称名称 值值 说明说明 wdTOFCentered 3 居中格式。 wdTOFClassic 1 古典格式。 wdTOFDistinctive 2 优雅格式。 wdTOFFormal 4 正式格式。 wdTOFSimple 5 简单格式。 wdTOFTemplate 0 模板格式。

# WdTrailingCharacter 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在编号列表项的编号之后插入的字符。

名称名称 值值 说明说明 wdTrailingNone 2 不插入任何字符。 wdTrailingSpace 1 插入一个空格。默认值。 wdTrailingTab 0 插入一个制表符。

# WdTwoLinesInOneType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将要写入一行的两行括在一起时所使用的字符。

名称名称 值值 说明说明 wdTwoLinesInOneAngleBrackets 4 使用尖括号将这两行括起来。 wdTwoLinesInOneCurlyBrackets 5 使用花括号将这两行括起来。 wdTwoLinesInOneNoBrackets 1 不使用任何分隔字符。 wdTwoLinesInOneNone 0 将写入一行的两行文字还原为单独的两行。 wdTwoLinesInOneParentheses 2 使用小括号将这两行括起来行。 wdTwoLinesInOneSquareBrackets 3 使用方括号将这两行括起来。

# WdUnderline 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的下划线的类型。

名称名称 值值 说明说明 wdUnderlineDash 7 划线。 wdUnderlineDashHeavy 23 粗划线。 wdUnderlineDashLong 39 长划线。 wdUnderlineDashLongHeavy 55 长粗划线。 wdUnderlineDotDash 9 点划相间线。 wdUnderlineDotDashHeavy 25 粗点划相间线。 wdUnderlineDotDotDash 10 点-点-划线相间模式。 wdUnderlineDotDotDashHeavy 26 粗点-点-划线相间模式。 wdUnderlineDotted 4 点。 wdUnderlineDottedHeavy 20 粗点。 wdUnderlineDouble 3 双线。 wdUnderlineNone 0 无下划线。 wdUnderlineSingle 1 单线。默认值。 wdUnderlineThick 6 单粗线。 wdUnderlineWavy 11 单波浪线。 wdUnderlineWavyDouble 43 双波浪线。 wdUnderlineWavyHeavy 27 粗波浪线。 wdUnderlineWords 2 仅为单个字加下划线。

# WdUnits 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的度量单位。

名称名称 值值 说明说明 wdCell 12 单元格。 wdCharacter 1 字符。 wdCharacterFormatting 13 字符格式。 wdColumn 9 列。 wdItem 16 所选项。 wdLine 5 一个线段。 wdParagraph 4 段落。 wdParagraphFormatting 14 段落格式。 wdRow 10 行。 wdScreen 7 屏幕尺寸。 wdSection 8 一节。 wdSentence 3 句子。 wdStory 6 部分。 wdTable 15 一个表格。 wdWindow 11 窗口。 wdWord 2 字。

# WdUpdateStyleListBehavior 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在更新样式以与包含编号或项目符号的选中内容相匹配时 WPS 2015 应采取的行为。本信息 ?已添加版本：已添加版本：?? WPS 2015

名称名称 值值 说明说明 wdListBehaviorAddBulletsNumbering 1 将选中内容的编号或项目符号模式添加到文档中使用相同样式的所有段落。

保留使用相同样式的其他所有段落的现有编号或项目符号模式，不应用选中 wdListBehaviorKeepPreviousPattern 0 内容的编号或项目符号模式。

# WdUseFormattingFrom 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定格式复制操作的源。

名称名称 值值 说明说明 wdFormattingFromCurrent 0 从当前项复制源格式。 wdFormattingFromPrompt 2 提示用户指定要使用的格式。 wdFormattingFromSelected 1 从当前选定内容复制源格式。

# WdVerticalAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的垂直对齐方式的类型。

名称名称 值值 说明说明 wdAlignVerticalBottom 3 靠下垂直对齐。 wdAlignVerticalCenter 1 居中垂直对齐。 wdAlignVerticalJustify 2 两端垂直对齐。 wdAlignVerticalTop 0 靠上垂直对齐。

# WdViewType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定视图类型。

名称名称 值值 说明说明 wdMasterView 5 主控视图。 wdNormalView 1 普通视图。 wdOutlineView 2 大纲视图。 wdPrintPreview 4 打印预览视图。 wdPrintView 3 页面视图。 wdReadingView 7 阅读视图。 wdWebView 6 Web 视图。

# WdVisualSelection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定选定内容的行为，该行为基于从右向左语言文档中可视的光标移动。

名称名称 值值 说明说明 wdVisualSelectionBlock 0 所有选定行的宽度相同。 wdVisualSelectionContinuous 1 选定内容进行换行。

# WdWindowState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当前文档窗口或任务窗口的状态。

名称名称 值值 说明说明 wdWindowStateMaximize 1 最大化。 wdWindowStateMinimize 2 最小化。 wdWindowStateNormal 0 正常。

# WdWindowType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定窗口的类型。

名称名称 值值 说明说明 wdWindowDocument 0 文档窗口。 wdWindowTemplate 1 模板窗口。

# WdWordDialog 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指示可以使用的 WPS 对话框，并指定可以用来获取或设置对话框中值的参数（如果适用）。

名称名称 值值 说明说明 wdDialogBuildingBlockOrganizer 2067 （无） wdDialogConnect 420 Drive、Path、Password wdDialogConsistencyChecker 1121 （无） wdDialogContentControlProperties 2394 （无） wdDialogControlRun 235 Application IconNumber、ActivateAs、IconFileName、Caption、Class、 wdDialogConvertObject 392 DisplayIcon、Floating wdDialogCopyFile 300 FileName 和 Directory wdDialogCreateAutoText 872 （无） wdDialogCreateSource 1922 （无） wdDialogCSSLinks 1261 LinkStyles wdDialogDocumentInspector 1482 （无） FileName、Directory、Template、Title、Created、 wdDialogDocumentStatistics 78LastSaved、LastSavedBy、Revision、Time、Printed、 Pages、Words、Characters、Paragraphs、Lines、FileSize wdDialogDrawAlign 634 Horizontal、Vertical、RelativeTo SnapToGrid、XGrid、YGrid、XOrigin、YOrigin、 wdDialogDrawSnapToGrid 633SnapToShapes、XGridDisplay、YGridDisplay、 FollowMargins、ViewGridLines、DefineLineBasedOnGrid Name、Context、InsertAs、Insert、Add、Define、 wdDialogEditAutoText 985 InsertAsText、Delete、CompleteAT 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogEditCreatePublisher 732 OfficeMacintosh Edition 中的语言参考帮助。 Find、Replace、Direction、MatchCase、WholeWord、 PatternMatch、SoundsLike、FindNext、ReplaceOne、 ReplaceAll、Format、Wrap、FindAllWordForms、 wdDialogEditFind 112 MatchByte、FuzzyFind、Destination、CorrectEnd、 MatchKashida、MatchDiacritics、MatchAlefHamza、 MatchControl Wrap、WidthRule、FixedWidth、HeightRule、FixedHeight、 PositionHorz、PositionHorzRel、DistFromText、PositionVert、 wdDialogEditFrame 458 PositionVertRel、DistVertFromText、MoveWithText、 LockAnchor、RemoveFrame Find、Replace、Direction、MatchCase、WholeWord、 PatternMatch、SoundsLike、FindNext、ReplaceOne、 ReplaceAll、Format、Wrap、FindAllWordForms、 wdDialogEditGoTo 896 MatchByte、FuzzyFind、Destination、CorrectEnd、 MatchKashida、MatchDiacritics、MatchAlefHamza、 MatchControl wdDialogEditGoToOld 811 （无） UpdateMode、Locked、SavePictureInDoc、UpdateNow、 wdDialogEditLinks 124OpenSource、KillLink、Link、Application、Item、FileName、 PreserveFormatLinkUpdate wdDialogEditObject 125 Verb

wdDialogEditObject 125 Verb IconNumber、Link、DisplayIcon、Class、DataType、 wdDialogEditPasteSpecial 111 IconFileName、Caption、Floating 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogEditPublishOptions 735 OfficeMacintosh Edition 中的语言参考帮助。 Find、Replace、Direction、MatchCase、WholeWord、 PatternMatch、SoundsLike、FindNext、ReplaceOne、 ReplaceAll、Format、Wrap、FindAllWordForms、 wdDialogEditReplace 117 MatchByte、FuzzyFind、Destination、CorrectEnd、 MatchKashida、MatchDiacritics、MatchAlefHamza、 MatchControl wdDialogEditStyle 120 （无） 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogEditSubscribeOptions 736 OfficeMacintosh Edition 中的语言参考帮助。 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogEditSubscribeTo 733 OfficeMacintosh Edition 中的语言参考帮助。 wdDialogEditTOACategory 625 Category 和 CategoryName wdDialogEmailOptions 863 （无） Tab、PaperSize、TopMargin、BottomMargin、LeftMargin、 RightMargin、Gutter、PageWidth、PageHeight、 Orientation、FirstPage、OtherPages、VertAlign、 ApplyPropsTo、Default、FacingPages、HeaderDistance、 FooterDistance、SectionStart、OddAndEvenPages、 wdDialogFileDocumentLayout 178DifferentFirstPage、Endnotes、LineNum、StartingNum、 FromText、CountBy、NumMode、TwoOnOne、 GutterPosition、LayoutMode、CharsLine、LinesPage、 CharPitch、LinePitch、DocFontName、DocFontSize、 PageColumns、TextFlow、FirstPageOnLeft、SectionType、 RTLAlignment SearchName、SearchPath、Name、SubDir、Title、Author、 Keywords、Subject、Options、MatchCase、Text、 wdDialogFileFind 99PatternMatch、DateSavedFrom、DateSavedTo、SavedBy、 DateCreatedFrom、DateCreatedTo、View、SortBy、ListBy、 SelectedFile、Add、Delete、ShowFolders、MatchByte 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogFileMacCustomPageSetupGX 737 OfficeMacintosh Edition 中的语言参考帮助。 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogFileMacPageSetup 685 OfficeMacintosh Edition 中的语言参考帮助。 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogFileMacPageSetupGX 444 OfficeMacintosh Edition 中的语言参考帮助。 wdDialogFileNew 79 Template、NewTemplate、DocumentType、Visible Name、ConfirmConversions、ReadOnly、LinkToSource、 AddToMru、PasswordDoc、PasswordDot、Revert、 WritePasswordDoc、WritePasswordDot、Connection、 wdDialogFileOpen 80 SQLStatement、SQLStatement1、Format、Encoding、 Visible、OpenExclusive、OpenAndRepair、SubType、 DocumentDirection、NoEncodingDialog、XMLTransform Tab、PaperSize、TopMargin、BottomMargin、LeftMargin、 RightMargin、Gutter、PageWidth、PageHeight、 Orientation、FirstPage、OtherPages、VertAlign、 ApplyPropsTo、Default、FacingPages、HeaderDistance、 FooterDistance、SectionStart、OddAndEvenPages、 wdDialogFilePageSetup 178DifferentFirstPage、Endnotes、LineNum、StartingNum、 FromText、CountBy、NumMode、TwoOnOne、 GutterPosition、LayoutMode、CharsLine、LinesPage、 CharPitch、LinePitch、DocFontName、DocFontSize、 PageColumns、TextFlow、FirstPageOnLeft、SectionType、 RTLAlignment、FolioPrint Background、AppendPrFile、Range、PrToFileName、 From、To、Type、NumCopies、Pages、Order、 wdDialogFilePrint 88PrintToFile、Collate、FileName、Printer、OutputPrinter、 DuplexPrint、PrintZoomColumn、PrintZoomRow、 PrintZoomPaperWidth、PrintZoomPaperHeight、ZoomPaper 仅限于 Macintosh。有关该常量的信息，请参阅包含在 WPS wdDialogFilePrintOneCopy 445 OfficeMacintosh Edition 中的语言参考帮助。 wdDialogFilePrintSetup 97 Printer、Options、Network、DoNotSetAsSysDefault Subject、Message、AllAtOnce、ReturnWhenDone、 TrackStatus、Protect、AddSlip、RouteDocument、

TrackStatus、Protect、AddSlip、RouteDocument、 wdDialogFileRoutingSlip 624 AddRecipient、OldRecipient、ResetSlip、ClearSlip、 ClearRecipients、Address Name、Format、LockAnnot、Password、AddToMru、 WritePassword、RecommendReadOnly、EmbedFonts、 wdDialogFileSaveAs 84NativePictureFormat、FormsData、SaveAsAOCELetter、 WriteVersion、VersionDesc、InsertLineBreaks、 AllowSubstitutions、LineEnding、AddBiDiMarks wdDialogFileSaveVersion 1007 （无） Title、Subject、Author、Keywords、Comments、FileName、 Directory、Template、CreateDate、LastSavedDate、 wdDialogFileSummaryInfo 86LastSavedBy、RevisionNumber、EditTime、 LastPrintedDate、NumPages、NumWords、NumChars、 NumParas、NumLines、Update、FileSize wdDialogFileVersions 945 AutoVersion 和 VersionDesc wdDialogFitText 983 FitTextWidth wdDialogFontSubstitution 581 UnavailableFont 和 SubstituteFont Points、Underline、Color、StrikeThrough、Superscript、 Subscript、Hidden、SmallCaps、AllCaps、Spacing、 Position、Kerning、KerningMin、Default、Tab、Font、 Bold、Italic、DoubleStrikeThrough、Shadow、Outline、 wdDialogFormatAddrFonts 103 Emboss、Engrave、Scale、Animations、CharAccent、 FontMajor、FontLowAnsi、FontHighAnsi、 CharacterWidthGrid、ColorRGB、UnderlineColor、PointsBi、 ColorBi、FontNameBi、BoldBi、ItalicBi、DiacColor ApplyTo、Shadow、TopBorder、LeftBorder、BottomBorder、 RightBorder、HorizBorder、VertBorder、TopColor、 LeftColor、BottomColor、RightColor、HorizColor、 VertColor、FromText、Shading、Foreground、Background、 Tab、FineShading、TopStyle、LeftStyle、BottomStyle、 RightStyle、HorizStyle、VertStyle、TopWeight、LeftWeight、 BottomWeight、RightWeight、HorizWeight、VertWeight、 BorderObjectType、BorderArtWeight、BorderArt、 wdDialogFormatBordersAndShading 189FromTextTop、FromTextBottom、FromTextLeft、 FromTextRight、OffsetFrom、InFront、SurroundHeader、 SurroundFooter、JoinBorder、LineColor、WhichPages、 TL2BRBorder、TR2BLBorder、TL2BRColor、TR2BLColor、 TL2BRStyle、TR2BLStyle、TL2BRWeight、TR2BLWeight、 ForegroundRGB、BackgroundRGB、TopColorRGB、 LeftColorRGB、BottomColorRGB、RightColorRGB、 HorizColorRGB、VertColorRGB、TL2BRColorRGB、 TR2BLColorRGB、LineColorRGB wdDialogFormatBulletsAndNumbering 824 （无） Type、Gap、Angle、Drop、Length、Border、AutoAttach、 wdDialogFormatCallout 610 Accent wdDialogFormatChangeCase 322 类型 Columns、ColumnNo、ColumnWidth、ColumnSpacing、 wdDialogFormatColumns 177EvenlySpaced、ApplyColsTo、ColLine、StartNewCol、 FlowColumnsRtl ApplyTo、Shadow、TopBorder、LeftBorder、BottomBorder、 RightBorder、HorizBorder、VertBorder、TopColor、 LeftColor、BottomColor、RightColor、HorizColor、 VertColor、FromText、Shading、Foreground、Background、 Tab、FineShading、TopStyle、LeftStyle、BottomStyle、 RightStyle、HorizStyle、VertStyle、TopWeight、LeftWeight、 BottomWeight、RightWeight、HorizWeight、VertWeight、 BorderObjectType、BorderArtWeight、BorderArt、 wdDialogFormatDefineStyleBorders 185FromTextTop、FromTextBottom、FromTextLeft、 FromTextRight、OffsetFrom、InFront、SurroundHeader、 SurroundFooter、JoinBorder、LineColor、WhichPages、 TL2BRBorder、TR2BLBorder、TL2BRColor、TR2BLColor、 TL2BRStyle、TR2BLStyle、TL2BRWeight、TR2BLWeight、 ForegroundRGB、BackgroundRGB、TopColorRGB、 LeftColorRGB、BottomColorRGB、RightColorRGB、 HorizColorRGB、VertColorRGB、TL2BRColorRGB、 TR2BLColorRGB、LineColorRGB Points、Underline、Color、StrikeThrough、Superscript、 Subscript、Hidden、SmallCaps、AllCaps、Spacing、 Position、Kerning、KerningMin、Default、Tab、Font、 Bold、Italic、DoubleStrikeThrough、Shadow、Outline、 wdDialogFormatDefineStyleFont 181 Emboss、Engrave、Scale、Animations、CharAccent、 FontMajor、FontLowAnsi、FontHighAnsi、

FontMajor、FontLowAnsi、FontHighAnsi、 CharacterWidthGrid、ColorRGB、UnderlineColor、PointsBi、 ColorBi、FontNameBi、BoldBi、ItalicBi、DiacColor Wrap、WidthRule、FixedWidth、HeightRule、FixedHeight、 PositionHorz、PositionHorzRel、DistFromText、PositionVert、 wdDialogFormatDefineStyleFrame 184 PositionVertRel、DistVertFromText、MoveWithText、 LockAnchor、RemoveFrame wdDialogFormatDefineStyleLang 186 Language、CheckLanguage、Default、NoProof LeftIndent、RightIndent、Before、After、LineSpacingRule、 LineSpacing、Alignment、WidowControl、KeepWithNext、 KeepTogether、PageBreak、NoLineNum、DontHyphen、 Tab、FirstIndent、OutlineLevel、Kinsoku、WordWrap、 OverflowPunct、TopLinePunct、AutoSpaceDE、 wdDialogFormatDefineStylePara 182 LineHeightGrid、AutoSpaceDN、CharAlign、 CharacterUnitLeftIndent、AdjustRight、 CharacterUnitFirstIndent、CharacterUnitRightIndent、 LineUnitBefore、LineUnitAfter、 NoSpaceBetweenParagraphsOfSameStyle、OrientationBi wdDialogFormatDefineStyleTabs 183 Position、DefTabs、Align、Leader、Set、Clear、ClearAll Left、PositionHorzRel、Top、PositionVertRel、LockAnchor、 FloatOverText、LayoutInCell、WrapSide、 TopDistanceFromText、BottomDistanceFromText、 wdDialogFormatDrawingObject 960 LeftDistanceFromText、RightDistanceFromText、Wrap、 WordWrap、AutoSize、HRWidthType、HRHeight、 HRNoshade、HRAlign、Text、AllowOverlap、HorizRule wdDialogFormatDropCap 488 Position、Font、DropHeight、DistFromText wdDialogFormatEncloseCharacters 1162 Style、Text、Enclosure Points、Underline、Color、StrikeThrough、Superscript、 Subscript、Hidden、SmallCaps、AllCaps、Spacing、 Position、Kerning、KerningMin、Default、Tab、Font、 Bold、Italic、DoubleStrikeThrough、Shadow、Outline、 wdDialogFormatFont 174 Emboss、Engrave、Scale、Animations、CharAccent、 FontMajor、FontLowAnsi、FontHighAnsi、 CharacterWidthGrid、ColorRGB、UnderlineColor、PointsBi、 ColorBi、FontNameBi、BoldBi、ItalicBi、DiacColor Wrap、WidthRule、FixedWidth、HeightRule、FixedHeight、 PositionHorz、PositionHorzRel、DistFromText、PositionVert、 wdDialogFormatFrame 190 PositionVertRel、DistVertFromText、MoveWithText、 LockAnchor、RemoveFrame ChapterNumber、NumRestart、NumFormat、StartingNum、 wdDialogFormatPageNumber 298 Level、Separator、DoubleQuote、PgNumberingStyle LeftIndent、RightIndent、Before、After、LineSpacingRule、 LineSpacing、Alignment、WidowControl、KeepWithNext、 KeepTogether、PageBreak、NoLineNum、DontHyphen、 Tab、FirstIndent、OutlineLevel、Kinsoku、WordWrap、 OverflowPunct、TopLinePunct、AutoSpaceDE、 wdDialogFormatParagraph 175 LineHeightGrid、AutoSpaceDN、CharAlign、 CharacterUnitLeftIndent、AdjustRight、 CharacterUnitFirstIndent、CharacterUnitRightIndent、 LineUnitBefore、LineUnitAfter、 NoSpaceBetweenParagraphsOfSameStyle、OrientationBi SetSize、CropLeft、CropRight、CropTop、CropBottom、 wdDialogFormatPicture 187 ScaleX、ScaleY、SizeX、SizeY Points、Underline、Color、StrikeThrough、Superscript、 Subscript、Hidden、SmallCaps、AllCaps、Spacing、 Position、Kerning、KerningMin、Default、Tab、Font、 Bold、Italic、DoubleStrikeThrough、Shadow、Outline、 wdDialogFormatRetAddrFonts 221 Emboss、Engrave、Scale、Animations、CharAccent、 FontMajor、FontLowAnsi、FontHighAnsi、 CharacterWidthGrid、ColorRGB、UnderlineColor、PointsBi、 ColorBi、FontNameBi、BoldBi、ItalicBi、DiacColor SectionStart、VertAlign、Endnotes、LineNum、 wdDialogFormatSectionLayout 176 StartingNum、FromText、CountBy、NumMode、SectionType Name、Delete、Merge、NewName、BasedOn、NextStyle、 wdDialogFormatStyle 180Type、FileName、Source、AddToTemplate、Define、 Rename、Apply、New、Link wdDialogFormatStyleGallery 505 Template 和 Preview wdDialogFormatStylesCustom 1248 （无） wdDialogFormatTabs 179 Position、DefTabs、Align、Leader、Set、Clear、ClearAll

wdDialogFormatTabs 179 Position、DefTabs、Align、Leader、Set、Clear、ClearAll wdDialogFormatTheme 855 （无） wdDialogFormattingRestrictions 1427 （无） wdDialogFormFieldHelp 361 （无） Entry、Exit、Name、Enable、TextType、TextWidth、 TextDefault、TextFormat、CheckSize、CheckWidth、 wdDialogFormFieldOptions 353 CheckDefault、Type、OwnHelp、HelpText、OwnStat、 StatText、Calculate wdDialogFrameSetProperties 1074 （无） APPNAME、APPCOPYRIGHT、APPUSERNAME、 wdDialogHelpAbout 9 APPORGANIZATION、APPSERIALNUMBER wdDialogHelpWordPerfectHelp 10 WPCommand、HelpText、DemoGuidance CommandKeyHelp、DocNavKeys、MouseSimulation、 wdDialogHelpWordPerfectHelpOptions 511 DemoGuidance、DemoSpeed、HelpType wdDialogHorizontalInVertical 1160 （无） wdDialogIMESetDefault 1094 （无） wdDialogInsertAddCaption 402 名称 wdDialogInsertAutoCaption 359 Clear、ClearAll、Object、Label、Position wdDialogInsertBookmark 168 Name、SortBy、Add、Delete、Goto、Hidden wdDialogInsertBreak 159 类型 Label、TitleAutoText、Title、Delete、Position、 wdDialogInsertCaption 357 AutoCaption、ExcludeLabel Label、FormatNumber、ChapterNumber、Level、 wdDialogInsertCaptionNumbering 358 Separator、CapNumberingStyle ReferenceType、ReferenceKind、ReferenceItem、 wdDialogInsertCrossReference 367InsertAsHyperLink、InsertPosition、SeparateNumbers、 SeparatorCharacters Format、Style、LinkToSource、Connection、 SQLStatement、SQLStatement1、PasswordDoc、 wdDialogInsertDatabase 341 PasswordDot、DataSource、From、To、IncludeFields、 WritePasswordDoc、WritePasswordDot DateTimePic、InsertAsField、DbCharField、DateLanguage、 wdDialogInsertDateTime 165 CalendarType wdDialogInsertField 166 域 wdDialogInsertFile 164 Name、Range、ConfirmConversions、Link、Attachment Reference、NoteType、Symbol、FootNumberAs、 EndNumberAs、FootnotesAt、EndnotesAt、 wdDialogInsertFootnote 370FootNumberingStyle、EndNumberingStyle、 FootStartingNum、FootRestartNum、EndStartingNum、 EndRestartNum、ApplyPropsTo Entry、Exit、Name、Enable、TextType、TextWidth、 TextDefault、TextFormat、CheckSize、CheckWidth、 wdDialogInsertFormField 483 CheckDefault、Type、OwnHelp、HelpText、OwnStat、 StatText、Calculate wdDialogInsertHyperlink 925 （无） Outline、Fields、From、To、TableId、AddedStyles、 Caption、HeadingSeparator、Replace、MarkEntry、 AutoMark、MarkCitation、Type、RightAlignPageNumbers、 wdDialogInsertIndex 170Passim、KeepFormatting、Columns、Category、Label、 ShowPageNumbers、AccentedLetters、Filter、SortBy、 Leader、TOCUseHyperlinks、TOCHidePageNumInWeb、 IndexLanguage、UseOutlineLevel Outline、Fields、From、To、TableId、AddedStyles、 Caption、HeadingSeparator、Replace、MarkEntry、 AutoMark、MarkCitation、Type、RightAlignPageNumbers、 wdDialogInsertIndexAndTables 473Passim、KeepFormatting、Columns、Category、Label、 ShowPageNumbers、AccentedLetters、Filter、SortBy、 Leader、TOCUseHyperlinks、TOCHidePageNumInWeb、 IndexLanguage、UseOutlineLevel wdDialogInsertMergeField 167 MergeField 和 WordField wdDialogInsertNumber 812 NumPic

IconNumber、FileName、Link、DisplayIcon、Tab、Class、 wdDialogInsertObject 172 IconFileName、Caption、Floating wdDialogInsertPageNumbers 294 Type、Position、FirstPage wdDialogInsertPicture 163 Name、LinkToFile、New、FloatOverText wdDialogInsertPlaceholder 2348 （无） wdDialogInsertSource 2120 （无） Name、ConfirmConversions、ReadOnly、LinkToSource、 AddToMru、PasswordDoc、PasswordDot、Revert、 WritePasswordDoc、WritePasswordDot、Connection、 wdDialogInsertSubdocument 583 SQLStatement、SQLStatement1、Format、Encoding、 Visible、OpenExclusive、OpenAndRepair、SubType、 DocumentDirection、NoEncodingDialog、XMLTransform wdDialogInsertSymbol 162 Font、Tab、CharNum、CharNumLow、Unicode、Hint Outline、Fields、From、To、TableId、AddedStyles、 Caption、HeadingSeparator、Replace、MarkEntry、 AutoMark、MarkCitation、Type、RightAlignPageNumbers、 wdDialogInsertTableOfAuthorities 471Passim、KeepFormatting、Columns、Category、Label、 ShowPageNumbers、AccentedLetters、Filter、SortBy、 Leader、TOCUseHyperlinks、TOCHidePageNumInWeb、 IndexLanguage、UseOutlineLevel Outline、Fields、From、To、TableId、AddedStyles、 Caption、HeadingSeparator、Replace、MarkEntry、 AutoMark、MarkCitation、Type、RightAlignPageNumbers、 wdDialogInsertTableOfContents 171Passim、KeepFormatting、Columns、Category、Label、 ShowPageNumbers、AccentedLetters、Filter、SortBy、 Leader、TOCUseHyperlinks、TOCHidePageNumInWeb、 IndexLanguage、UseOutlineLevel Outline、Fields、From、To、TableId、AddedStyles、 Caption、HeadingSeparator、Replace、MarkEntry、 AutoMark、MarkCitation、Type、RightAlignPageNumbers、 wdDialogInsertTableOfFigures 472Passim、KeepFormatting、Columns、Category、Label、 ShowPageNumbers、AccentedLetters、Filter、SortBy、 Leader、TOCUseHyperlinks、TOCHidePageNumInWeb、 IndexLanguage、UseOutlineLevel IconNumber、FileName、Link、DisplayIcon、Tab、Class、 wdDialogInsertWebComponent 1324 IconFileName、Caption、Floating wdDialogLabelOptions 1367 （无） SenderCity、DateFormat、IncludeHeaderFooter、 LetterStyle、Letterhead、LetterheadLocation、 LetterheadSize、RecipientName、RecipientAddress、 Salutation、SalutationType、RecipientGender、 RecipientReference、MailingInstructions、AttentionLine、 wdDialogLetterWizard 821 LetterSubject、CCList、SenderName、ReturnAddress、 Closing、SenderJobTitle、SenderCompany、SenderInitials、 EnclosureNumber、PageDesign、InfoBlock、 SenderGender、ReturnAddressSF、RecipientCode、 SenderCode、SenderReference wdDialogListCommands 723 ListType CheckErrors、Destination、MergeRecords、From、To、 wdDialogMailMerge 676Suppression、MailMerge、QueryOptions、MailSubject、 MailAsAttachment、MailAddress wdDialogMailMergeCheck 677 CheckErrors FileName、PasswordDoc、PasswordDot、HeaderRecord、 wdDialogMailMergeCreateDataSource 642MSQuery、SQLStatement、SQLStatement1、Connection、 LinkToSource、WritePasswordDoc FileName、PasswordDoc、PasswordDot、HeaderRecord、 wdDialogMailMergeCreateHeaderSource 643MSQuery、SQLStatement、SQLStatement1、Connection、 LinkToSource、WritePasswordDoc wdDialogMailMergeFieldMapping 1304 （无） wdDialogMailMergeFindRecipient 1326 （无） wdDialogMailMergeFindRecord 569 （无） wdDialogMailMergeHelper 680 （无） wdDialogMailMergeInsertAddressBlock 1305 （无） wdDialogMailMergeInsertAsk 4047 （无）

wdDialogMailMergeInsertFields 1307 （无） wdDialogMailMergeInsertFillIn 4048 （无） wdDialogMailMergeInsertGreetingLine 1306 （无） wdDialogMailMergeInsertIf 4049 （无） wdDialogMailMergeInsertNextIf 4053 （无） wdDialogMailMergeInsertSet 4054 （无） wdDialogMailMergeInsertSkipIf 4055 （无） wdDialogMailMergeOpenDataSource 81 （无） wdDialogMailMergeOpenHeaderSource 82 （无） wdDialogMailMergeQueryOptions 681 （无） wdDialogMailMergeRecipients 1308 （无） wdDialogMailMergeSetDocumentType 1339 （无） wdDialogMailMergeUseAddressBook 779 （无） wdDialogMarkCitation 463 （无） wdDialogMarkIndexEntry 169 （无） wdDialogMarkTableOfContentsEntry 442 （无） wdDialogMyPermission 1437 （无） wdDialogNewToolbar 586 （无） wdDialogNoteOptions 373 （无） wdDialogOMathRecognizedFunctions 2165 （无） wdDialogOrganizer 222 （无） wdDialogPermission 1469 （无） wdDialogPhoneticGuide 986 （无） wdDialogReviewAfmtRevisions 570 （无） wdDialogSchemaLibrary 1417 （无） wdDialogSearch 1363 （无） wdDialogShowRepairs 1381 （无） wdDialogSourceManager 1920 （无） wdDialogStyleManagement 1948 （无） wdDialogTableAutoFormat 563 （无） wdDialogTableCellOptions 1081 （无） wdDialogTableColumnWidth 143 （无） wdDialogTableDeleteCells 133 （无） wdDialogTableFormatCell 612 （无） wdDialogTableFormula 348 （无） wdDialogTableInsertCells 130 （无） wdDialogTableInsertRow 131 （无） wdDialogTableInsertTable 129 （无） wdDialogTableOfCaptionsOptions 551 （无） wdDialogTableOfContentsOptions 470 （无） wdDialogTableProperties 861 （无） wdDialogTableRowHeight 142 （无） wdDialogTableSort 199 （无） wdDialogTableSplitCells 137 （无） wdDialogTableTableOptions 1080 （无） wdDialogTableToText 128 （无） wdDialogTableWrapping 854 （无）

wdDialogTableWrapping 854 （无） wdDialogTCSCTranslator 1156 （无） wdDialogTextToTable 127 （无） wdDialogToolsAcceptRejectChanges 506 （无） wdDialogToolsAdvancedSettings 206 （无） wdDialogToolsAutoCorrect 378 （无） wdDialogToolsAutoCorrectExceptions 762 （无） wdDialogToolsAutoManager 915 （无） wdDialogToolsAutoSummarize 874 （无） wdDialogToolsBulletsNumbers 196 （无） wdDialogToolsCompareDocuments 198 （无） wdDialogToolsCreateDirectory 833 （无） wdDialogToolsCreateEnvelope 173 （无） wdDialogToolsCreateLabels 489 （无） wdDialogToolsCustomize 152 （无） wdDialogToolsCustomizeKeyboard 432 （无） wdDialogToolsCustomizeMenuBar 615 （无） wdDialogToolsCustomizeMenus 433 （无） wdDialogToolsDictionary 989 （无） wdDialogToolsEnvelopesAndLabels 607 （无） wdDialogToolsGrammarSettings 885 （无） wdDialogToolsHangulHanjaConversion 784 （无） wdDialogToolsHighlightChanges 197 （无） wdDialogToolsHyphenation 195 （无） wdDialogToolsLanguage 188 （无） wdDialogToolsMacro 215 （无） wdDialogToolsMacroRecord 214 （无） wdDialogToolsManageFields 631 （无） wdDialogToolsMergeDocuments 435 （无） wdDialogToolsOptions 974 （无） wdDialogToolsOptionsAutoFormat 959 （无） wdDialogToolsOptionsAutoFormatAsYouType 778 （无） wdDialogToolsOptionsBidi 1029 （无） wdDialogToolsOptionsCompatibility 525 （无） wdDialogToolsOptionsEdit 224 （无） wdDialogToolsOptionsEditCopyPaste 1356 （无） wdDialogToolsOptionsFileLocations 225 （无） wdDialogToolsOptionsFuzzy 790 （无） wdDialogToolsOptionsGeneral 203 （无） wdDialogToolsOptionsPrint 208 （无） wdDialogToolsOptionsSave 209 （无） wdDialogToolsOptionsSecurity 1361 （无） wdDialogToolsOptionsSmartTag 1395 （无） wdDialogToolsOptionsSpellingAndGrammar 211 （无） wdDialogToolsOptionsTrackChanges 386 （无） wdDialogToolsOptionsTypography 739 （无） wdDialogToolsOptionsUserInfo 213 （无） wdDialogToolsOptionsView 204 （无）

wdDialogToolsOptionsView 204 （无） wdDialogToolsProtectDocument 503 （无） wdDialogToolsProtectSection 578 （无） wdDialogToolsRevisions 197 （无） wdDialogToolsSpellingAndGrammar 828 （无） wdDialogToolsTemplates 87 （无） wdDialogToolsThesaurus 194 （无） wdDialogToolsUnprotectDocument 521 （无） wdDialogToolsWordCount 228 （无） wdDialogTwoLinesInOne 1161 （无） wdDialogUpdateTOC 331 （无） wdDialogViewZoom 577 （无） wdDialogWebOptions 898 （无） wdDialogWindowActivate 220 （无） wdDialogXMLElementAttributes 1460 （无） wdDialogXMLOptions 1425 （无）

# WdWordDialogTab 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在显示指定的对话框时的活动选项卡。

名称名称 值值 说明说明 “电子邮件选项电子邮件选项 ”对话框的“常规常规 ”选项 wdDialogEmailOptionsTabQuoting 1900002 卡。 “电子邮件选项电子邮件选项 ”对话框的“电子邮件签电子邮件签 wdDialogEmailOptionsTabSignature 1900000 名名 ”选项卡。 “电子邮件选项电子邮件选项 ”对话框的“个人信纸个人信纸 ”选 wdDialogEmailOptionsTabStationary 1900001 项卡。 “页面设置页面设置 ”对话框的“边距边距 ”选项卡，“应应 wdDialogFilePageSetupTabCharsLines 150004 用于用于 ”下拉列表处于活动状态。 wdDialogFilePageSetupTabLayout 150003 “页面设置页面设置 ”对话框的“版式版式 ”选项卡。 wdDialogFilePageSetupTabMargins 150000 “页面设置页面设置 ”对话框的“页边距页边距 ”选项卡。 wdDialogFilePageSetupTabPaper 150001 “页面设置页面设置 ”对话框的“纸张纸张 ”选项卡。 wdDialogFormatBordersAndShadingTabBorders 700000 “边框边框 ”对话框的“边框边框 ”选项卡。 wdDialogFormatBordersAndShadingTabPageBorder 700001 “边框边框 ”对话框的“页面边框页面边框 ”选项卡。 wdDialogFormatBordersAndShadingTabShading 700002 “边框边框 ”对话框的“底纹底纹 ”选项卡。 “项目符号和编号项目符号和编号 ”对话框的“项目符项目符 wdDialogFormatBulletsAndNumberingTabBulleted 1500000 号号 ”选项卡。 “项目符号和编号项目符号和编号 ”对话框的“编号编号 ”选项 wdDialogFormatBulletsAndNumberingTabNumbered 1500001 卡。 “项目符号和编号项目符号和编号 ”对话框的“多级符多级符 wdDialogFormatBulletsAndNumberingTabOutlineNumbered 1500002 号号 ”选项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“颜色与线颜色与线 wdDialogFormatDrawingObjectTabColorsAndLines 1200000 条条 ”选项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“颜色与线颜色与线 wdDialogFormatDrawingObjectTabHR 1200007 条条 ”选项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“图片图片 ”选 wdDialogFormatDrawingObjectTabPicture 1200004 项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“位置位置 ”选 wdDialogFormatDrawingObjectTabPosition 1200002 项卡。

“设置图形对象格式设置图形对象格式 ”对话框的“尺寸尺寸 ”选 wdDialogFormatDrawingObjectTabSize 1200001 项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“文本文本 wdDialogFormatDrawingObjectTabTextbox 1200005 框框 ”选项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“网站网站 ”选 wdDialogFormatDrawingObjectTabWeb 1200006 项卡。 “设置图形对象格式设置图形对象格式 ”对话框的“环绕环绕 ”选 wdDialogFormatDrawingObjectTabWrapping 1200003 项卡。 wdDialogFormatFontTabAnimation 600002 “字体字体 ”对话框的“动画动画 ”选项卡。 wdDialogFormatFontTabCharacterSpacing 600001 “字体字体 ”对话框的“字符间距字符间距 ”选项卡。 wdDialogFormatFontTabFont 600000 “字体字体 ”对话框的“字体字体 ”选项卡。 wdDialogFormatParagraphTabIndentsAndSpacing 1000000 “段落段落 ”对话框的“缩进和间距缩进和间距 ”选项卡。 “段落段落 ”对话框的“换行和分页换行和分页 ”选项卡， wdDialogFormatParagraphTabTeisai 1000002 带有适合于中文文字的选项。 wdDialogFormatParagraphTabTextFlow 1000001 “段落段落 ”对话框的“换行和分页换行和分页 ”选项卡。 wdDialogInsertIndexAndTablesTabIndex 400000 “索引和目录索引和目录 ”对话框的“索引索引 ”选项卡。 “索引和目录索引和目录 ”对话框的“引文目录引文目录 ”选项 wdDialogInsertIndexAndTablesTabTableOfAuthorities 400003 卡。 wdDialogInsertIndexAndTablesTabTableOfContents 400001 “索引和目录索引和目录 ”对话框的“目录目录 ”选项卡。 “索引和目录索引和目录 ”对话框的“图表目录图表目录 ”选项 wdDialogInsertIndexAndTablesTabTableOfFigures 400002 卡。 wdDialogInsertSymbolTabSpecialCharacters 200001 “符号符号 ”对话框的“特殊字符特殊字符 ”选项卡。 wdDialogInsertSymbolTabSymbols 200000 “符号符号 ”对话框的“符号符号 ”选项卡。 “英文信函向导英文信函向导 ”对话框的“信函格式信函格式 ”选 wdDialogLetterWizardTabLetterFormat 1600000 项卡。 “英文信函向导英文信函向导 ”对话框的“其他内容其他内容 ”选 wdDialogLetterWizardTabOtherElements 1600002 项卡。 “英文信函向导英文信函向导 ”对话框的“收信人信收信人信 wdDialogLetterWizardTabRecipientInfo 1600001 息息 ”选项卡。 “英文信函向导英文信函向导 ”对话框的“寄信人信寄信人信 wdDialogLetterWizardTabSenderInfo 1600003 息息 ”选项卡。 “便笺选项便笺选项 ”对话框的“所有尾注所有尾注 ”选项 wdDialogNoteOptionsTabAllEndnotes 300001 卡。 “便笺选项便笺选项 ”对话框的“所有脚注所有脚注 ”选项 wdDialogNoteOptionsTabAllFootnotes 300000 卡。 “管理器管理器 ”对话框的“自动图文集自动图文集 ”选项 wdDialogOrganizerTabAutoText 500001 卡。 wdDialogOrganizerTabCommandBars 500002 “管理器管理器 ”对话框的“命令栏命令栏 ”选项卡。 wdDialogOrganizerTabMacros 500003 “管理器管理器 ”对话框的“宏宏 ”选项卡。 wdDialogOrganizerTabStyles 500000 “管理器管理器 ”对话框的“样式样式 ”选项卡。 wdDialogTablePropertiesTabCell 1800003 “表格属性表格属性 ”对话框的“单元格单元格 ”选项卡。 wdDialogTablePropertiesTabColumn 1800002 “表格属性表格属性 ”对话框的“列列 ”选项卡。 wdDialogTablePropertiesTabRow 1800001 “表格属性表格属性 ”对话框的“行行 ”选项卡。 wdDialogTablePropertiesTabTable 1800000 “表格属性表格属性 ”对话框的“表格表格 ”选项卡。 “模板和加载项模板和加载项 ”对话框的“模板模板 ”选项 wdDialogTemplates 2100000 卡。 “模板和加载项模板和加载项 ”对话框的“链接的链接的 wdDialogTemplatesLinkedCSS 2100003 CSS”选项卡。 “模板和加载项模板和加载项 ”对话框的“XML 扩展扩展 wdDialogTemplatesXMLExpansionPacks 2100002 包包 ”选项卡。 “模板和加载项模板和加载项 ”对话框的“XML 架构架构 ”选 wdDialogTemplatesXMLSchema 2100001 项卡。 “‘自动更正自动更正 ’例外项例外项 ”对话框的“首字母大首字母大 wdDialogToolsAutoCorrectExceptionsTabFirstLetter 1400000 写写 ”选项卡。 “‘自动更正自动更正 ’例外项例外项 ”对话框的“朝鲜文和朝鲜文和 wdDialogToolsAutoCorrectExceptionsTabHangulAndAlphabet 1400002字母顺序字母顺序 ”选项卡。仅在多语言版本中可

wdDialogToolsAutoCorrectExceptionsTabHangulAndAlphabet 1400002 字母顺序字母顺序 ”选项卡。仅在多语言版本中可 用。 “‘自动更正自动更正 ’例外项例外项 ”对话框的“其他更其他更 wdDialogToolsAutoCorrectExceptionsTabIac 1400003 正正 ”选项卡。 “‘自动更正自动更正 ’例外项例外项 ”对话框的“前两个字前两个字 wdDialogToolsAutoCorrectExceptionsTabInitialCaps 1400001 母连续大写母连续大写 ”选项卡。 “自动更正自动更正 ”对话框的“自动更正自动更正 ”选项 wdDialogToolsAutoManagerTabAutoCorrect 1700000 卡。 “自动更正自动更正 ”对话框的“自动套用格式自动套用格式 ”选 wdDialogToolsAutoManagerTabAutoFormat 1700003 项卡。 “自动更正自动更正 ”对话框的“键入时自动套用格键入时自动套用格 wdDialogToolsAutoManagerTabAutoFormatAsYouType 1700001 式式 ”选项卡。 “自动更正自动更正 ”对话框的“自动图文集自动图文集 ”选项 wdDialogToolsAutoManagerTabAutoText 1700002 卡。 “自动更正自动更正 ”对话框的“智能标记智能标记 ”选项 wdDialogToolsAutoManagerTabSmartTags 1700004 卡。 wdDialogToolsEnvelopesAndLabelsTabEnvelopes 800000 “信封和标签信封和标签 ”对话框的“信封信封 ”选项卡。 wdDialogToolsEnvelopesAndLabelsTabLabels 800001 “信封和标签信封和标签 ”对话框的“标签标签 ”选项卡。 wdDialogToolsOptionsTabAcetate 1266 不支持。 wdDialogToolsOptionsTabBidi 1029 “选项选项 ”对话框的“复杂文种复杂文种 ”选项卡。 wdDialogToolsOptionsTabCompatibility 525 “选项选项 ”对话框的“兼容性兼容性 ”选项卡。 wdDialogToolsOptionsTabEdit 224 “选项选项 ”对话框的“编辑编辑 ”选项卡。 wdDialogToolsOptionsTabFileLocations 225 “选项选项 ”对话框的“文件位置文件位置 ”选项卡。 wdDialogToolsOptionsTabFuzzy 790 不支持。 wdDialogToolsOptionsTabGeneral 203 “选项选项 ”对话框的“常规常规 ”选项卡。 “选项选项 ”对话框的“朝鲜文及朝鲜文汉字转朝鲜文及朝鲜文汉字转 wdDialogToolsOptionsTabHangulHanjaConversion 786 换换 ”选项卡。 wdDialogToolsOptionsTabPrint 208 “选项选项 ”对话框的“打印打印 ”选项卡。 wdDialogToolsOptionsTabProofread 211 “选项选项 ”对话框的“拼写和语法拼写和语法 ”选项卡。 wdDialogToolsOptionsTabSave 209 “选项选项 ”对话框的“保存保存 ”选项卡。 wdDialogToolsOptionsTabSecurity 1361 “选项选项 ”对话框的“安全性安全性 ”选项卡。 wdDialogToolsOptionsTabTrackChanges 386 “选项选项 ”对话框的“修订修订 ”选项卡。 wdDialogToolsOptionsTabTypography 739 “选项选项 ”对话框的“中文版式中文版式 ”选项卡。 wdDialogToolsOptionsTabUserInfo 213 “选项选项 ”对话框的“用户信息用户信息 ”选项卡。 wdDialogToolsOptionsTabView 204 “选项选项 ”对话框的“视图视图 ”选项卡。 wdDialogWebOptionsBrowsers 2000000 “Web 选项选项 ”对话框的“浏览器浏览器 ”选项卡。 wdDialogWebOptionsEncoding 2000003 “Web 选项选项 ”对话框的“编码编码 ”选项卡。 wdDialogWebOptionsFiles 2000001 “Web 选项选项 ”对话框的“文件文件 ”选项卡。 wdDialogWebOptionsFonts 2000004 “Web 选项选项 ”对话框的“字体字体 ”选项卡。 wdDialogWebOptionsGeneral 2000000 “Web 选项选项 ”对话框的“常规常规 ”选项卡。 wdDialogWebOptionsPictures 2000002 “Web 选项选项 ”对话框的“图片图片 ”选项卡。 wdDialogStyleManagementTabEdit 2200000 “样式管理样式管理 ”对话框的“编辑编辑 ”选项卡。 wdDialogStyleManagementTabRecommend 2200001 “样式管理样式管理 ”对话框的“推荐推荐 ”选项卡。 wdDialogStyleManagementTabRestrict 2200002 “样式管理样式管理 ”对话框的“限制限制 ”选项卡。

# WdWrapSideType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文档文字应该在所指定形状的两侧环绕，只在左侧或右侧环绕，还是在形状距离页边距最远的一侧环绕。

名称名称 值值 说明说明 wdWrapBoth 0 所指定形状的两侧。 wdWrapLargest 3 形状距离页边距最远的一侧。 wdWrapLeft 1 仅限于形状的左侧。 wdWrapRight 2 仅限于形状的右侧。

# WdWrapType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何在形状周围环绕文字。

注释注释 wdWrapSquare、wdWrapTight 和 wdWrapThrough 的工作方式基本相同。

注释注释 wdWrapSquare、wdWrapTight 和 wdWrapThrough 的工作方式基本相同。

名称名称 值值 说明说明 wdWrapInline 7 将形状嵌入到文字中。 wdWrapNone 3 将形状放在文字前面。请参阅 wdWrapFront。 wdWrapSquare 0 使文字环绕形状。行在形状的另一侧延续。 wdWrapThrough 2 使文字环绕形状。 wdWrapTight 1 使文字紧密地环绕形状。 wdWrapTopBottom 4 将文字放在形状的上方和下方。 wdWrapBehind 5 将形状放在文字后面。 wdWrapFront 6 将形状放在文字前面。

# WdWrapTypeMerged 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS 在图片周围环绕文字的方式。

名称名称 值值 说明说明 wdWrapMergeBehind 3 衬于文字下方。 wdWrapMergeFront 4 浮于文字上方。 wdWrapMergeInline 0 嵌入型。 wdWrapMergeSquare 1 四周型。 wdWrapMergeThrough 5 穿越型。 wdWrapMergeTight 2 紧密型。 wdWrapMergeTopBottom 6 上下型。

# WdXMLNodeLevel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 XML 节点的级别。

名称名称 值值 说明说明 wdXMLNodeLevelCell 3 单元格。 wdXMLNodeLevelInline 0 内嵌。 wdXMLNodeLevelParagraph 1 段落。 wdXMLNodeLevelRow 2 行。

# WdXMLNodeType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定节点的类型。

名称名称 值值 说明说明 wdXMLNodeAttribute 2 表示属性节点。 wdXMLNodeElement 1 表示元素节点。

# WdXMLSelectionChangeReason 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定更改 XML 选定内容的原因。

名称名称 值值 说明说明 wdXMLSelectionChangeReasonDelete 2 删除了节点。 wdXMLSelectionChangeReasonInsert 1 插入了新节点。 wdXMLSelectionChangeReasonMove 0 移动了光标以选择不同节点。

# WdXMLValidationStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定按照附加的架构，元素或属性是否有效。

名称名称 值值 说明说明 -指示 SetValidationError 方法被用于将 ValidationErrorText 属性 wdXMLValidationStatusCustom 1072898048设置为自定义文本字符串。

wdXMLValidationStatusOK 0 指示按照附加的架构，XML 元素或属性有效。

# WpsBookmarkSortBy 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定排序方式。

名称名称 值值 说明说明 wpsSortByName 0 通过名称排序 wpsSortByLocation 1 通过位置排序

# WpsProtectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定排序方式。

名称名称 值值 说明说明 wpsNoProtection -1 通过名称排序 wpsAllowOnlyRevisions 0 仅允许修订 wpsAllowOnlyComments 1 只允许注释 wpsAllowOnlyFormFields 2 只允许窗体域 wpsAllowOnlyReading 3 只允许阅读

# XlAboveBelow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定值是高于还是低于平均值。

名称名称 值值 说明说明 XlAboveAverage 0 高于平均值。 XlAboveStdDev 1 高于标准偏差。 XlBelowAverage 0 低于平均值。 XlBelowStdDev 1 低于标准偏差。 XlEqualAboveAverage 0 等于或高于平均值。 XlEqualBelowAverage 0 等于或低于平均值。

# XlActionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应执行的操作。

名称名称 值值 说明说明 xlActionTypeDrillthrough 256 明细数据。 xlActionTypeReport 128 报表。 xlActionTypeRowset 16 行集。 xlActionTypeUrl 1 URL。

# XlAllocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在对基于 OLAP 数据源的数据透视表执行模拟分析时，何时计算更改。

名称名称 值值 说明说明 xlAutomaticAllocation 2 在每个值更改后自动计算更改。 xlManualAllocation 1 手动计算更改。

# XlAllocationMethod 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在对基于 OLAP 数据源的数据透视表执行模拟分析时，要用来分配值的方法。

名称名称 值值 说明说明 xlEqualAllocation 1 使用平均分配。 xlWeightedAllocation 2 使用加权分配。

# XlAllocationValue 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在对基于 OLAP 数据源的数据透视表执行模拟分析时，要分配什么值。

名称名称 值值 说明说明 xlAllocateIncrement 2 在旧值的基础上递增。 xlAllocateValue 1 输入的值除以分配的次数。

# XlApplicationInternational 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定国家/地区和国际设置。

名称名称 值值 说明说明 xl24HourClock 33 如果使用 24 小时制时间，则返回 True；如果使用 12 小时时间，则返回 False。 xl4DigitYears 43 如果使用四位年，则返回 True；如果使用两位年，则返回 False。 xlAlternateArraySeparator 16 当前数组分隔符与小数分隔符相同时，用于替代的数组项分隔符。 xlColumnSeparator 14 字面数组中用于分隔列的列分隔符。 xlCountryCode 1 ET 的国家/地区版本。 xlCountrySetting 2 Windows 控制面板中的当前国家/地区设置。 如果货币符号在货币值之前，则返回 True；如果货币符号在货币值之后，则返回 xlCurrencyBefore 37 False。 xlCurrencyCode 25 货币符号。 xlCurrencyDigits 27 货币格式中使用的小数位数。 xlCurrencyLeadingZeros 40 如果显示零货币值的前导零，则返回 True。 xlCurrencyMinusSign 38 如果对负数使用负号，则返回 True；如果使用括号，则返回 False。 负数货币值的货币格式：0 = (symbolx) 或 (xsymbol) 1 = -symbolx 或 -xsymbol 2 = xlCurrencyNegative 28symbol-x 或 x-symbol 3 = symbolx- 或 xsymbol-，其中 symbol 为国家/地区的货币符 号。请注意货币符号的位置由 xlCurrencyBefore 确定。

号。请注意货币符号的位置由 xlCurrencyBefore 确定。 xlCurrencySpaceBefore 36 如果在货币符号前面添加空格，则返回 True。 xlCurrencyTrailingZeros 39 如果显示零货币值的尾部零，则返回 True。 xlDateOrder 32 日期元素的次序：0 = 月-日-年 1 = 日-月-年 2 = 年-月-日 xlDateSeparator 17 日期分隔符 (/)。 xlDayCode 21 日符号 (d)。 xlDayLeadingZero 42 如果在日期中显示前导零，则返回 True。 xlDecimalSeparator 3 小数分隔符。 xlGeneralFormatName 26 “常规”数字格式名称。 xlHourCode 22 小时符号 (h)。 xlLeftBrace 12 在字面数组中左大括号 ({) 的替代字符。 xlLeftBracket 10 在 R1C1-样式相对引用中左方括号 ([) 的替代字符。 xlListSeparator 5 列表分隔符。 xlLowerCaseColumnLetter 9 小写列字母。 xlLowerCaseRowLetter 8 小写行字母。 如果长日期显示中日期次序为月-日-年，则返回 True；如果次序为日-月-年，则返回 xlMDY 44 False。 xlMetric 35 如果使用米制度量系统，则返回 True；如果使用英制度量系统，则返回 False。 xlMinuteCode 23 分钟符号 (m)。 xlMonthCode 20 月符号 (m)。 xlMonthLeadingZero 41 如果以数字显示月份时显示月份中的前导零，则返回 True。 为了向后兼容总是返回三个字符。月份名称的缩写从 Microsoft Windows 中读取并且可 xlMonthNameChars 30 以为任意长度。 xlNoncurrencyDigits 29 非货币格式中所使用的十进制数字的个数。 xlNonEnglishFunctions 34 如果不以英文显示函数，则返回 True。 xlRightBrace 13 在字面数组中右大括号 (}) 的替代字符。 xlRightBracket 11 在 R1C1-样式引用中右方括号 (]) 的替代字符。 xlRowSeparator 15 字面数组的行分隔符。 xlSecondCode 24 秒符号 (s)。 xlThousandsSeparator 4 零或千位分隔符。 xlTimeLeadingZero 45 如果时间中显示前导零，则返回 True。 xlTimeSeparator 18 时间分隔符 (:)。 xlUpperCaseColumnLetter 7 大写列字母。 xlUpperCaseRowLetter 6 大写行字母（对于 R1C1-样式引用）。 为了向后兼容总是返回三个字符。星期名称的缩写从 Microsoft Windows 中读取并且可 xlWeekdayNameChars 31 以为任意长度。 xlYearCode 19 数字格式中的年符号 (y)。

# XlApplyNamesOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用行方向区域名称和列方向区域名称取代单元格引用时，首先列出哪个区域名称。

名称名称 值值 说明说明 xlColumnThenRow 2 列在行之前列出。 xlRowThenColumn 1 行在列之前列出。

# XlArabicModes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为阿拉伯语拼写检查器指定拼写规则。

名称名称 值值 说明说明 xlArabicBothStrict 3 拼写检查器使用有关以字母 yaa 结尾和以 alef hamza 开头的阿拉伯语单词拼写规则。 xlArabicNone 0 拼写检查器忽略有关以字母 yaa 结尾或以 alef hamza 开头的阿拉伯语单词拼写规则。 xlArabicStrictAlefHamza 1 拼写检查器使用有关以 alef hamza 开头的阿拉伯语单词拼写规则。 xlArabicStrictFinalYaa 2 拼写检查器使用有关以字母 yaa 结尾的阿拉伯语单词拼写规则。

# XlArrangeStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定窗口在屏幕上的排列方式。

名称名称 值值 说明说明 xlArrangeStyleCascade 7 层叠窗口。 xlArrangeStyleHorizontal -4128 水平排列窗口。 xlArrangeStyleTiled 1 默认值。平铺窗口。 xlArrangeStyleVertical -4166 垂直排列窗口。

# XlArrowHeadLength 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端的箭头长度。

名称名称 值值 说明说明 xlArrowHeadLengthLong 3 最长箭头。 xlArrowHeadLengthMedium -4138 中等长度箭头。 xlArrowHeadLengthShort 1 最短箭头。

# XlArrowHeadStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端应用的箭头类型。

名称名称 值值 说明说明 xlArrowHeadStyleClosed 3 线条连接处边缘为曲线的小箭头。 xlArrowHeadStyleDoubleClosed 5 菱形大箭头。 xlArrowHeadStyleDoubleOpen 4 线条连接处边缘为曲线的大箭头。 xlArrowHeadStyleNone -4142 无箭头。 xlArrowHeadStyleOpen 2 三角形大箭头。

# XlArrowHeadWidth 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定线条末端的箭头宽度。

名称名称 值值 说明说明 xlArrowHeadWidthMedium -4138 中等宽度箭头。 xlArrowHeadWidthNarrow 1 最窄箭头。 xlArrowHeadWidthWide 3 最宽箭头。

# XlAutoFillType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

根据源区域的内容，指定目标区域的填充方式。

名称名称 值值 说明说明 xlFillCopy 1 将源区域的值和格式复制到目标区域，如有必要可重复执行。

将星期中每天的名称从源区域扩展到目标区域中。格式从源区域复制到目标区域，如有必要可重复执 xlFillDays 5 行。 xlFillDefault 0 ET 确定用于填充目标区域的值和格式。 xlFillFormats 3 只将源区域的格式复制到目标区域，如有必要可重复执行。 xlFillMonths 7 将月名称从源区域扩展到目标区域中。格式从源区域复制到目标区域，如有必要可重复执行。 将源区域中的值扩展到目标区域中，形式为系列（如，“1, 2”扩展为“3, 4, 5”）。格式从源区域复制到 xlFillSeries 2 目标区域，如有必要可重复执行。 xlFillValues 4 只将源区域的值复制到目标区域，如有必要可重复执行。

将工作周每天的名称从源区域扩展到目标区域中。格式从源区域复制到目标区域，如有必要可重复执 xlFillWeekdays 6 行。 xlFillYears 8 将年从源区域扩展到目标区域中。格式从源区域复制到目标区域，如有必要可重复执行。 将数值从源区域扩展到目标区域中，假定源区域的数字之间是乘法关系（如，“1, 2,”扩展为“4, 8, xlGrowthTrend 1016”，假定每个数字都是前一个数字乘以某个值的结果）。格式从源区域复制到目标区域，如有必要 可重复执行。 将数值从源区域扩展到目标区域中，假定数字之间是加法关系（如，“1, 2,”扩展为“3, 4, 5”，假定每个 xlLinearTrend 9 数字都是前一个数字加上某个值的结果）。格式从源区域复制到目标区域，如有必要可重复执行。

# XlAutoFilterOperator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于关联两个筛选条件的操作符。

名称名称 值值 说明说明 xlAnd 1 条件 1 和条件 2 的逻辑与。 xlBottom10Items 4 显示最低值项（条件 1 中指定的项数）。 xlBottom10Percent 6 显示最低值项（条件 1 中指定的百分数）。 xlFilterCellColor 8 单元格颜色 xlFilterDynamic 11 动态筛选 xlFilterFontColor 9 字体颜色 xlFilterIcon 10 筛选图标 xlFilterValues 7 筛选值 xlOr 2 条件 1 和条件 2 的逻辑或。 xlTop10Items 3 显示最高值项（条件 1 中指定的项数）。 xlTop10Percent 5 显示最高值项（条件 1 中指定的百分数）。

# XlAxisCrosses 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所指定的坐标轴与其他坐标轴相交的点。

名称名称 值值 说明说明 xlAxisCrossesAutomatic -4105 WPS 设置坐标轴相交点。 xlAxisCrossesCustom -4114 CrossesAt 属性指定坐标轴相交点。

xlAxisCrossesMaximum 2 坐标轴在最大值处相交。 xlAxisCrossesMinimum 4 坐标轴在最小值处相交。

# XlAxisGroup 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定坐标轴组的类型。

名称名称 值值 说明说明 xlPrimary 1 主坐标轴组。 xlSecondary 2 次坐标轴组。

# XlAxisType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定坐标轴类型。

名称名称 值值 说明说明 xlCategory 1 坐标轴显示类别。 xlSeriesAxis 3 坐标轴显示数据系列。 xlValue 2 坐标轴显示值。

# XlBackground 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表文本的背景类型。

名称名称 值值 说明说明 xlBackgroundAutomatic -4105 由 WPS 控制背景。 xlBackgroundOpaque 3 不透明背景。 xlBackgroundTransparent 2 透明背景。

# XlBarShape 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于三维条形图或柱形图的形状。

名称名称 值值 说明说明 xlBox 0 矩形。 xlConeToMax 5 圆锥，在指定值处截断。 xlConeToPoint 4 圆锥，在指定值处变成一点。 xlCylinder 3 圆柱。 xlPyramidToMax 2 棱锥，在指定值处截断。 xlPyramidToPoint 1 棱锥，在指定值处变成一点。

# XlBordersIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要检索的边框。

名称名称 值值 说明说明 xlDiagonalDown 5 从区域中每个单元格的左上角至右下角的边框。 xlDiagonalUp 6 从区域中每个单元格的左下角至右上角的边框。 xlEdgeBottom 9 区域底部的边框。 xlEdgeLeft 7 区域左边的边框。 xlEdgeRight 10 区域右边的边框。 xlEdgeTop 8 区域顶部的边框。 xlInsideHorizontal 12 区域中所有单元格的水平边框（区域以外的边框除外）。 xlInsideVertical 11 区域中所有单元格的垂直边框（区域以外的边框除外）。

# XlBorderWeight 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定某一区域周围的边框的粗细。

名称名称 值值 说明说明 xlHairline 1 细线边框（最细的边框）。 xlMedium -4138 中等宽度的边框。 xlThick 4 粗边框（最宽的边框）。 xlThin 2 细边框。

# XlBuiltInDialog 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要显示的对话框。

名称名称 值值 说明说明 xlDialogActivate 103 “激活”对话框 xlDialogActiveCellFont 476 “活动单元格字体”对话框 xlDialogAddChartAutoformat 390 “添加图表自动套用格式”对话框 xlDialogAddinManager 321 “加载项管理器”对话框 xlDialogAlignment 43 “对齐方式”对话框 xlDialogApplyNames 133 “应用名称”对话框 xlDialogApplyStyle 212 “应用样式”对话框 xlDialogAppMove 170 “AppMove”对话框 xlDialogAppSize 171 “AppSize”对话框 xlDialogArrangeAll 12 “全部重排”对话框 xlDialogAssignToObject 213 “给对象指定宏”对话框 xlDialogAssignToTool 293 “给工具指定宏”对话框 xlDialogAttachText 80 “附加文本”对话框 xlDialogAttachToolbars 323 “附加工具栏”对话框 xlDialogAutoCorrect 485 “自动校正”对话框 xlDialogAxes 78 “坐标轴”对话框 xlDialogBorder 45 “边框”对话框 xlDialogCalculation 32 “计算”对话框 xlDialogCellProtection 46 “单元格保护”对话框 xlDialogChangeLink 166 “更改链接”对话框 xlDialogChartAddData 392 “图表添加数据”对话框 xlDialogChartLocation 527 “图表位置”对话框 xlDialogChartOptionsDataLabelMultiple 724 “图表选项多个数据标签”对话框 xlDialogChartOptionsDataLabels 505 “图表选项数据标签”对话框 xlDialogChartOptionsDataTable 506 “图表选项数据表”对话框 xlDialogChartSourceData 540 “图表源数据”对话框 xlDialogChartTrend 350 “图表趋势”对话框 xlDialogChartType 526 “图表类型”对话框 xlDialogChartWizard 288 “图表向导”对话框 xlDialogCheckboxProperties 435 “复选框属性”对话框 xlDialogClear 52 “清除”对话框 xlDialogColorPalette 161 “调色板”对话框 xlDialogColumnWidth 47 “列宽”对话框 xlDialogCombination 73 “组合图”对话框

xlDialogCombination 73 “组合图”对话框 xlDialogConditionalFormatting 583 “条件格式”对话框 xlDialogConsolidate 191 “合并计算”对话框 xlDialogCopyChart 147 “复制图表”对话框 xlDialogCopyPicture 108 “复制图片”对话框 xlDialogCreateList 796 “创建列表”对话框 xlDialogCreateNames 62 “创建名称”对话框 xlDialogCreatePublisher 217 “创建发布者”对话框 xlDialogCustomizeToolbar 276 “自定义工具栏”对话框 xlDialogCustomViews 493 “自定义视图”对话框 xlDialogDataDelete 36 “数据删除”对话框 xlDialogDataLabel 379 “数据标签”对话框 xlDialogDataLabelMultiple 723 “多个数据标签”对话框 xlDialogDataSeries 40 “数据系列”对话框 xlDialogDataValidation 525 “数据有效性”对话框 xlDialogDefineName 61 “定义名称”对话框 xlDialogDefineStyle 229 “定义样式”对话框 xlDialogDeleteFormat 111 “删除格式”对话框 xlDialogDeleteName 110 “删除名称”对话框 xlDialogDemote 203 “降级”对话框 xlDialogDisplay 27 “显示”对话框 xlDialogDocumentInspector 862 “文档检查器”对话框 xlDialogEditboxProperties 438 “编辑框属性”对话框 xlDialogEditColor 223 “编辑颜色”对话框 xlDialogEditDelete 54 “编辑删除”对话框 xlDialogEditionOptions 251 “编辑选项”对话框 xlDialogEditSeries 228 “编辑数据系列”对话框 xlDialogErrorbarX 463 “误差线 X”对话框 xlDialogErrorbarY 464 “误差线 Y”对话框 xlDialogErrorChecking 732 “错误检查”对话框 xlDialogEvaluateFormula 709 “公式求值”对话框 xlDialogExternalDataProperties 530 “外部数据属性”对话框 xlDialogExtract 35 “提取”对话框 xlDialogFileDelete 6 “文件删除”对话框 xlDialogFileSharing 481 “文件共享”对话框 xlDialogFillGroup 200 “填充组”对话框 xlDialogFillWorkgroup 301 “填充工作组”对话框 xlDialogFilter 447 “对话框筛选”对话框 xlDialogFilterAdvanced 370 “高级筛选”对话框 xlDialogFindFile 475 “查找文件”对话框 xlDialogFont 26 “字体”对话框 xlDialogFontProperties 381 “字体属性”对话框 xlDialogFormatAuto 269 “自动套用格式”对话框 xlDialogFormatChart 465 “设置图表格式”对话框 xlDialogFormatCharttype 423 “设置图表类型格式”对话框 xlDialogFormatFont 150 “设置字体格式”对话框 xlDialogFormatLegend 88 “图例格式”对话框 xlDialogFormatMain 225 “设置主要格式”对话框

xlDialogFormatMain 225 “设置主要格式”对话框 xlDialogFormatMove 128 “设置移动格式”对话框 xlDialogFormatNumber 42 “设置数字格式”对话框 xlDialogFormatOverlay 226 “设置重叠格式”对话框 xlDialogFormatSize 129 “设置大小”对话框 xlDialogFormatText 89 “设置文本格式”对话框 xlDialogFormulaFind 64 “查找公式”对话框 xlDialogFormulaGoto 63 “转到公式”对话框 xlDialogFormulaReplace 130 “替换公式”对话框 xlDialogFunctionWizard 450 “函数向导”对话框 xlDialogGallery3dArea 193 “三维面积图库”对话框 xlDialogGallery3dBar 272 “三维条形图库”对话框 xlDialogGallery3dColumn 194 “三维柱形图库”对话框 xlDialogGallery3dLine 195 “三维折线图库”对话框 xlDialogGallery3dPie 196 “三维饼图库”对话框 xlDialogGallery3dSurface 273 “三维曲面图库”对话框 xlDialogGalleryArea 67 “面积图库”对话框 xlDialogGalleryBar 68 “条形图库”对话框 xlDialogGalleryColumn 69 “柱形图库”对话框 xlDialogGalleryCustom 388 “自定义库”对话框 xlDialogGalleryDoughnut 344 “圆环图库”对话框 xlDialogGalleryLine 70 “折线图库”对话框 xlDialogGalleryPie 71 “饼图库”对话框 xlDialogGalleryRadar 249 “雷达图库”对话框 xlDialogGalleryScatter 72 “散点图库”对话框 xlDialogGoalSeek 198 “单变量求解”对话框 xlDialogGridlines 76 “网格线”对话框 xlDialogImportTextFile 666 “导入文本文件”对话框 xlDialogInsert 55 “插入”对话框 xlDialogInsertHyperlink 596 “插入超链接”对话框 xlDialogInsertObject 259 “插入对象”对话框 xlDialogInsertPicture 342 “插入图片”对话框 xlDialogInsertTitle 380 “插入标题”对话框 xlDialogLabelProperties 436 “标签属性”对话框 xlDialogListboxProperties 437 “列表框属性”对话框 xlDialogMacroOptions 382 “宏选项”对话框 xlDialogMailEditMailer 470 “编辑邮件发件人”对话框 xlDialogMailLogon 339 “邮件登录”对话框 xlDialogMailNextLetter 378 “发送下一信函”对话框 xlDialogMainChart 85 “主要图”对话框 xlDialogMainChartType 185 “图表类型”对话框 xlDialogMenuEditor 322 “菜单编辑器”对话框 xlDialogMove 262 “移动”对话框 xlDialogMyPermission 834 “我的权限”对话框 xlDialogNameManager 977 “名称管理器”对话框 xlDialogNew 119 “新建”对话框 xlDialogNewName 978 “新建名称”对话框

xlDialogNewWebQuery 667 “新建 Web 查询”对话框 xlDialogNote 154 “注意”对话框 xlDialogObjectProperties 207 “对象属性”对话框 xlDialogObjectProtection 214 “对象保护”对话框 xlDialogOpen 1 “打开”对话框 xlDialogOpenLinks 2 “打开链接”对话框 xlDialogOpenMail 188 “打开邮件”对话框 xlDialogOpenText 441 “打开文本”对话框 xlDialogOptionsCalculation 318 “计算选项”对话框 xlDialogOptionsChart 325 “图表选项”对话框 xlDialogOptionsEdit 319 “编辑选项”对话框 xlDialogOptionsGeneral 356 “常规选项”对话框 xlDialogOptionsListsAdd 458 “添加列表选项”对话框 xlDialogOptionsME 647 “ME 选项”对话框 xlDialogOptionsTransition 355 “转换选项”对话框 xlDialogOptionsView 320 “视图选项”对话框 xlDialogOutline 142 “大纲”对话框 xlDialogOverlay 86 “覆盖图”对话框 xlDialogOverlayChartType 186 “覆盖图图表类型”对话框 xlDialogPageSetup 7 “页面设置”对话框 xlDialogParse 91 “分列”对话框 xlDialogPasteNames 58 “粘贴名称”对话框 xlDialogPasteSpecial 53 “选择性粘贴”对话框 xlDialogPatterns 84 “图案”对话框 xlDialogPermission 832 “权限”对话框 xlDialogPhonetic 656 “拼音”对话框 xlDialogPivotCalculatedField 570 “数据透视表计算字段”对话框 xlDialogPivotCalculatedItem 572 “数据透视表计算项”对话框 xlDialogPivotClientServerSet 689 “设置数据透视表客户机服务器”对话框 xlDialogPivotFieldGroup 433 “组合数据透视表字段”对话框 xlDialogPivotFieldProperties 313 “数据透视表字段属性”对话框 xlDialogPivotFieldUngroup 434 “取消组合数据透视表字段”对话框 xlDialogPivotShowPages 421 “数据透视表显示页”对话框 xlDialogPivotSolveOrder 568 “数据透视表求解次序”对话框 xlDialogPivotTableOptions 567 “数据透视表选项”对话框 xlDialogPivotTableWizard 312 “数据透视表向导”对话框 xlDialogPlacement 300 “位置”对话框 xlDialogPrint 8 “打印”对话框 xlDialogPrinterSetup 9 “打印机设置”对话框 xlDialogPrintPreview 222 “打印预览”对话框 xlDialogPromote 202 “升级”对话框 xlDialogProperties 474 “属性”对话框 xlDialogPropertyFields 754 “属性字段”对话框 xlDialogProtectDocument 28 “保护文档”对话框 xlDialogProtectSharing 620 “保护共享”对话框 xlDialogPublishAsWebPage 653 “发布为网页”对话框 xlDialogPushbuttonProperties 445 “按钮属性”对话框

xlDialogReplaceFont 134 “替换字体”对话框 xlDialogRoutingSlip 336 “传送名单”对话框 xlDialogRowHeight 127 “行高”对话框 xlDialogRun 17 “运行”对话框 xlDialogSaveAs 5 “另存为”对话框 xlDialogSaveCopyAs 456 “副本另存为”对话框 xlDialogSaveNewObject 208 “保存新对象”对话框 xlDialogSaveWorkbook 145 “保存工作簿”对话框 xlDialogSaveWorkspace 285 “保存工作区”对话框 xlDialogScale 87 “缩放”对话框 xlDialogScenarioAdd 307 “添加方案”对话框 xlDialogScenarioCells 305 “单元格方案”对话框 xlDialogScenarioEdit 308 “编辑方案”对话框 xlDialogScenarioMerge 473 “合并方案”对话框 xlDialogScenarioSummary 311 “方案摘要”对话框 xlDialogScrollbarProperties 420 “滚动条属性”对话框 xlDialogSearch 731 “搜索”对话框 xlDialogSelectSpecial 132 “特殊选定”对话框 xlDialogSendMail 189 “发送邮件”对话框 xlDialogSeriesAxes 460 “系列坐标轴”对话框 xlDialogSeriesOptions 557 “系列选项”对话框 xlDialogSeriesOrder 466 “系列次序”对话框 xlDialogSeriesShape 504 “系列形状”对话框 xlDialogSeriesX 461 “系列 X”对话框 xlDialogSeriesY 462 “系列 Y”对话框 xlDialogSetBackgroundPicture 509 “设置背景图片”对话框 xlDialogSetPrintTitles 23 “设置打印标题”对话框 xlDialogSetUpdateStatus 159 “设置更新状态”对话框 xlDialogShowDetail 204 “显示明细数据”对话框 xlDialogShowToolbar 220 “显示工具栏”对话框 xlDialogSize 261 “大小”对话框 xlDialogSort 39 “排序”对话框 xlDialogSortSpecial 192 “选择性排序”对话框 xlDialogSplit 137 “拆分”对话框 xlDialogStandardFont 190 “标准字体”对话框 xlDialogStandardWidth 472 “标准宽度”对话框 xlDialogStyle 44 “样式”对话框 xlDialogSubscribeTo 218 “订阅”对话框 xlDialogSubtotalCreate 398 “创建分类汇总”对话框 xlDialogSummaryInfo 474 “摘要信息”对话框 xlDialogTable 41 “表”对话框 xlDialogTabOrder 394 “Tab 键次序”对话框 xlDialogTextToColumns 422 “分列”对话框 xlDialogUnhide 94 “取消隐藏”对话框 xlDialogUpdateLink 201 “更新链接”对话框 xlDialogVbaInsertFile 328 “VBA 插入文件”对话框 xlDialogVbaMakeAddin 478 “VBA 创建加载项”对话框

xlDialogVbaMakeAddin 478 “VBA 创建加载项”对话框 xlDialogVbaProcedureDefinition 330 “VBA 过程定义”对话框 xlDialogView3d 197 “三维视图”对话框 xlDialogWebOptionsBrowsers 773 “Web 浏览器选项”对话框 xlDialogWebOptionsEncoding 686 “Web 编码选项”对话框 xlDialogWebOptionsFiles 684 “Web 文件选项”对话框 xlDialogWebOptionsFonts 687 “Web 字体选项”对话框 xlDialogWebOptionsGeneral 683 “Web 常规选项”对话框 xlDialogWebOptionsPictures 685 “Web 图片选项”对话框 xlDialogWindowMove 14 “窗口移动”对话框 xlDialogWindowSize 13 “窗口大小”对话框 xlDialogWorkbookAdd 281 “添加工作簿”对话框 xlDialogWorkbookCopy 283 “复制工作簿”对话框 xlDialogWorkbookInsert 354 “插入工作簿”对话框 xlDialogWorkbookMove 282 “移动工作簿”对话框 xlDialogWorkbookName 386 “命名工作簿”对话框 xlDialogWorkbookNew 302 “新建工作簿”对话框 xlDialogWorkbookOptions 284 “工作簿选项”对话框 xlDialogWorkbookProtect 417 “保护工作簿”对话框 xlDialogWorkbookTabSplit 415 “拆分工作簿标签”对话框 xlDialogWorkbookUnhide 384 “取消隐藏工作簿”对话框 xlDialogWorkgroup 199 “工作组”对话框 xlDialogWorkspace 95 “工作区”对话框 xlDialogZoom 256 “缩放”对话框

# XlCalcFor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应计算的内容。

名称名称 值值 说明说明 xlAllValues 0 所有值。 xlColGroups 2 柱形图组。 xlRowGroups 1 行组。

# XlCalculatedMemberType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据透视表中计算成员的类型。

名称名称 值值 说明说明 xlCalculatedMember 0 成员使用多维表达式 (MDX) 公式。 xlCalculatedSet 1 成员在多维数据集字段中包含集的 MDX 公式。

# XlCalculation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定计算模式。

名称名称 值值 说明说明 xlCalculationAutomatic -4105 ET 控制重新计算。 xlCalculationManual -4135 用户请求时进行计算。 xlCalculationSemiautomatic 2 ET 控制重新计算，但忽略表中的更改。

# XlCalculationInterruptKey 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定中断重新计算的键。

名称名称 值值 说明说明 xlAnyKey 2 按任意键中断重新计算。 xlEscKey 1 按 Esc 键中断重新计算。 xlNoKey 0 按任何键都不能中断重新计算。

# XlCalculationState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用程序的计算状态。

名称名称 值值 说明说明 xlCalculating 1 正在计算。 xlDone 0 计算完成。 xlPending 2 已进行会触发计算的更改，但还未执行重新计算。

# XlCategoryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分类轴的类型。

名称名称 值值 说明说明 xlAutomaticScale -4105 WPS 控制轴类型。 xlCategoryScale 2 轴按一组任意类别组合数据。 xlTimeScale 3 轴按时间刻度组合数据。

# XlCellChangedState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定自创建数据透视表以来，或上次执行提交操作以来，数据透视表值单元格是否经过了编辑或重新计算。

名称名称 值值 说明说明 单元格中的值已经过编辑或重新计算，并且这些更改已应用于数据源。（只应用具有 OLAP 数 xlCellChangeApplied 3 据源的数据透视表） xlCellChanged 2 单元格中的值已经过编辑或重新计算。 xlCellNotChanged 1 单元格中的值未经过编辑或重新计算。

# XlCellInsertionMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在指定工作表中添加或删除行的方式，以符合查询返回的记录集的行数。

名称名称 值值 说明说明 xlInsertDeleteCells 1 插入或者删除部分行以符合新记录集所需要的实际行数。 xlInsertEntireRows 2 必要时插入所有行以允许溢出。不从工作表删除单元格或行。 xlOverwriteCells 0 不向工作表添加新的单元格或行。如果溢出则覆盖周围单元格中的数据。

# XlCellType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定单元格的类型。

名称名称 值值 说明说明 xlCellTypeAllFormatConditions -4172 任意格式的单元格。 xlCellTypeAllValidation -4174 含有验证条件的单元格。 xlCellTypeBlanks 4 空单元格。 xlCellTypeComments -4144 含有注释的单元格。 xlCellTypeConstants 2 含有常量的单元格。 xlCellTypeFormulas -4123 含有公式的单元格。 xlCellTypeLastCell 11 所用区域中的最后一个单元格。 xlCellTypeSameFormatConditions -4173 格式相同的单元格。 xlCellTypeSameValidation -4175 验证条件相同的单元格。 xlCellTypeVisible 12 所有可见单元格。

# XlChartElementPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表元素的位置。

名称名称 值值 说明说明 xlChartElementPositionAutomatic -4105 自动设置图表元素的位置。 xlChartElementPositionCustom -4114 为图表元素指定特定位置。

# XlChartGallery 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表库。

名称名称 值值 说明说明 xlAnyGallery 23 任意一个库。 xlBuiltIn 21 内置库。 xlUserDefined 22 用户定义的库。

# XlChartItem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表项的类型。

名称名称 值值 说明说明 xlAxis 21 坐标轴。 xlAxisTitle 17 坐标轴标题。 xlChartArea 2 图表区。 xlChartTitle 4 图表标题。 xlCorners 6 角点。 xlDataLabel 0 数据标签。 xlDataTable 7 模拟运算表。 xlDisplayUnitLabel 30 显示单位标签。 xlDownBars 20 跌柱线。 xlDropLines 26 垂直线。 xlErrorBars 9 误差线。 xlFloor 23 基底。 xlHiLoLines 25 高低点连线。 xlLeaderLines 29 引导线。 xlLegend 24 图例。 xlLegendEntry 12 图例项。 xlLegendKey 13 图例项标示。 xlMajorGridlines 15 主要网格线。 xlMinorGridlines 16 次要网格线。 xlNothing 28 无。 xlPivotChartDropZone 32 数据透视图拖放区域。 xlPivotChartFieldButton 31 数据透视图字段按钮。 xlPlotArea 19 绘图区。 xlRadarAxisLabels 27 雷达图轴标签。 xlSeries 3 系列。 xlSeriesLines 22 系列线。 xlShape 14 形状。 xlTrendline 8 趋势线。 xlUpBars 18 涨柱线。 xlWalls 5 背景墙。 xlXErrorBars 10 X 误差线。 xlYErrorBars 11 Y 误差线。

# XlChartLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在何处重定位图表。

名称名称 值值 说明说明 xlLocationAsNewSheet 1 将图表移动到新工作表。 xlLocationAsObject 2 将图表嵌入到现有工作表中。 xlLocationAutomatic 3 ET 控制图表位置。

# XlChartPicturePlacement 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用户所选图片在三维条形图或柱形图中的某个条形上的位置。

名称名称 值值 说明说明 xlAllFaces 7 在所有表面上显示。 xlEnd 2 在末端显示。 xlEndSides 3 在末端和侧面上显示。 xlFront 4 在前端显示。 xlFrontEnd 6 在前端和末端显示。 xlFrontSides 5 在前端和侧面上显示。 xlSides 1 在侧面上显示。

# XlChartPictureType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在柱形、条形图或图例项标示上如何显示图片。

名称名称 值值 说明说明 xlStack 2 调整图片大小，以在最长的堆积条形图中最多重复显示 15 次。 xlStackScale 3 将图片大小调整为指定的单位数，并在条形图长度内重复显示。 xlStretch 1 将图片拉伸至堆积条形图的全长。

# XlChartSplitType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在饼图的第二个图表或饼图的条形中显示的值。

名称名称 值值 说明说明 xlSplitByCustomSplit 4 第二个图表显示任意值。 xlSplitByPercentValue 3 第二个图表显示小于总值的某个百分比的值。该百分比由 SplitValue 属性指定。

xlSplitByPosition 1 第二个图表显示数据系列中的最小值。要显示的值的个数由 SplitValue 属性指定。 xlSplitByValue 2 第二个图表显示小于 SplitValue 属性指定的值的值。

# XlChartType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表类型。

名称名称 值值 说明说明 xl3DArea -4098 三维面积图。 xl3DAreaStacked 78 三维堆积面积图。 xl3DAreaStacked100 79 百分比堆积面积图。

xl3DBarClustered 60 三维簇状条形图。 xl3DBarStacked 61 三维堆积条形图。 xl3DBarStacked100 62 三维百分比堆积条形图。 xl3DColumn -4100 三维柱形图。 xl3DColumnClustered 54 三维簇状柱形图。 xl3DColumnStacked 55 三维堆积柱形图。 xl3DColumnStacked100 56 三维百分比堆积柱形图。 xl3DLine -4101 三维折线图。 xl3DPie -4102 三维饼图。 xl3DPieExploded 70 分离型三维饼图。 xlArea 1 面积图 xlAreaStacked 76 堆积面积图。 xlAreaStacked100 77 百分比堆积面积图。 xlBarClustered 57 簇状条形图。 xlBarOfPie 71 复合条饼图。 xlBarStacked 58 堆积条形图。 xlBarStacked100 59 百分比堆积条形图。 xlBubble 15 气泡图。 xlBubble3DEffect 87 三维气泡图。 xlColumnClustered 51 簇状柱形图。 xlColumnStacked 52 堆积柱形图。 xlColumnStacked100 53 百分比堆积柱形图。 xlConeBarClustered 102 簇状条形圆锥图。 xlConeBarStacked 103 堆积条形圆锥图。 xlConeBarStacked100 104 百分比堆积条形圆锥图。 xlConeCol 105 三维柱形圆锥图。 xlConeColClustered 99 簇状柱形圆锥图。 xlConeColStacked 100 堆积柱形圆锥图。 xlConeColStacked100 101 百分比堆积柱形圆锥图。 xlCylinderBarClustered 95 簇状条形圆柱图。 xlCylinderBarStacked 96 堆积条形圆柱图。 xlCylinderBarStacked100 97 百分比堆积条形圆柱图。 xlCylinderCol 98 三维柱形圆柱图。 xlCylinderColClustered 92 簇状柱形圆锥图。 xlCylinderColStacked 93 堆积柱形圆锥图。 xlCylinderColStacked100 94 百分比堆积柱形圆柱图。 xlDoughnut -4120 圆环图。 xlDoughnutExploded 80 分离型圆环图。 xlLine 4 折线图。 xlLineMarkers 65 数据点折线图。 xlLineMarkersStacked 66 堆积数据点折线图。 xlLineMarkersStacked100 67 百分比堆积数据点折线图。 xlLineStacked 63 堆积折线图。 xlLineStacked100 64 百分比堆积折线图。 xlPie 5 饼图。 xlPieExploded 69 分离型饼图。 xlPieOfPie 68 复合饼图。

xlPyramidBarClustered 109 簇状条形棱锥图。 xlPyramidBarStacked 110 堆积条形棱锥图。 xlPyramidBarStacked100 111 百分比堆积条形棱锥图。 xlPyramidCol 112 三维柱形棱锥图。 xlPyramidColClustered 106 簇状柱形棱锥图。 xlPyramidColStacked 107 堆积柱形棱锥图。 xlPyramidColStacked100 108 百分比堆积柱形棱锥图。 xlRadar -4151 雷达图。 xlRadarFilled 82 填充雷达图。 xlRadarMarkers 81 数据点雷达图。 xlStockHLC 88 盘高-盘低-收盘图。 xlStockOHLC 89 开盘-盘高-盘低-收盘图。 xlStockVHLC 90 成交量-盘高-盘低-收盘图。 xlStockVOHLC 91 成交量-开盘-盘高-盘低-收盘图。 xlSurface 83 三维曲面图。 xlSurfaceTopView 85 曲面图（俯视图）。 xlSurfaceTopViewWireframe 86 曲面图（俯视线框图）。 xlSurfaceWireframe 84 三维曲面图（线框）。 xlXYScatter -4169 散点图。 xlXYScatterLines 74 折线散点图。 xlXYScatterLinesNoMarkers 75 无数据点折线散点图。 xlXYScatterSmooth 72 平滑线散点图。 xlXYScatterSmoothNoMarkers 73 无数据点平滑线散点图。

# XlCheckInVersionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定在使用 CheckIn 方法时签入文档的版本类型。适用于存储在 SharePoint 库中的工作簿。

名称名称 值值 说明说明 xlCheckInMajorVersion 1 签入主要版本。 xlCheckInMinorVersion 0 签入次要版本。 xlCheckInOverwriteVersion 2 覆盖服务器上的当前版本。

# XlClipboardFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 Microsoft Windows 剪贴板上的项的格式。

名称名称 值值 说明说明 xlClipboardFormatBIFF 8 用于 ET 2.x 版本的二进制交换文件格式 xlClipboardFormatBIFF12 63 二进制交换文件格式 12 xlClipboardFormatBIFF2 18 二进制交换文件格式 2 xlClipboardFormatBIFF3 20 二进制交换文件格式 3 xlClipboardFormatBIFF4 30 二进制交换文件格式 4 xlClipboardFormatBinary 15 二进制格式 xlClipboardFormatBitmap 9 位图格式 xlClipboardFormatCGM 13 CGM 格式 xlClipboardFormatCSV 5 CSV 格式 xlClipboardFormatDIF 4 DIF 格式 xlClipboardFormatDspText 12 Dsp 文本格式 xlClipboardFormatEmbeddedObject 21 嵌入对象 xlClipboardFormatEmbedSource 22 嵌入源 xlClipboardFormatLink 11 链接 xlClipboardFormatLinkSource 23 链接到源文件 xlClipboardFormatLinkSourceDesc 32 链接到源说明 xlClipboardFormatMovie 24 影片 xlClipboardFormatNative 14 本地 xlClipboardFormatObjectDesc 31 对象说明 xlClipboardFormatObjectLink 19 对象链接 xlClipboardFormatOwnerLink 17 链接到所有者 xlClipboardFormatPICT 2 图片 xlClipboardFormatPrintPICT 3 打印图片 xlClipboardFormatRTF 7 RTF 格式 xlClipboardFormatScreenPICT 29 屏幕图片 xlClipboardFormatStandardFont 28 标准字体 xlClipboardFormatStandardScale 27 标准刻度 xlClipboardFormatSYLK 6 SYLK xlClipboardFormatTable 16 表 xlClipboardFormatText 0 文本 xlClipboardFormatToolFace 25 工具图面 xlClipboardFormatToolFacePICT 26 工具图面图片 xlClipboardFormatVALU 1 值 xlClipboardFormatWK1 10 工作簿

# XlCmdType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 CommandText 属性的值。

名称名称 值值 说明说明 xlCmdCube 1 包含一个 OLAP 数据源多维数据集名称。 xlCmdDefault 4 包含 OLE DB 提供程序可识别的命令文本。 xlCmdList 5 包含指向列表数据的指针。 xlCmdSql 2 包含一个 SQL 语句。 xlCmdTable 3 包含用于访问 OLE DB 数据源的表名称。

# XlColorIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所选功能（如边框、字体或填充）的颜色。

名称名称 值值 说明说明 xlColorIndexAutomatic -4105 自动配色。 xlColorIndexNone -4142 无颜色。

# XlColumnDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列的分列方式。

名称名称 值值 说明说明 xlDMYFormat 4 DMY 日期格式。 xlDYMFormat 7 DYM 日期格式。 xlEMDFormat 10 EMD 日期格式。 xlGeneralFormat 1 常规。 xlMDYFormat 3 MDY 日期格式。 xlMYDFormat 6 MYD 日期格式。 xlSkipColumn 9 列未分列。 xlTextFormat 2 文本。 xlYDMFormat 8 YDM 日期格式。 xlYMDFormat 5 YMD 日期格式。

# XlCommandUnderlines 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 ET for the Macintosh 中命令加下划线的状态。

名称名称 值值 说明说明 xlCommandUnderlinesAutomatic -4105 ET 控制命令加下划线的显示。 xlCommandUnderlinesOff -4146 不显示命令加下划线。 xlCommandUnderlinesOn 1 显示命令加下划线。

# XlCommentDisplayMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定单元格显示批注和批注标识符的方式。

名称名称 值值 说明说明 xlCommentAndIndicator 1 任何时候都显示批注和标识符。 xlCommentIndicatorOnly -1 只显示标识符。鼠标指针在单元格上移动时显示批注。 xlNoIndicator 0 任何时候都不显示批注也不显示标识符。

# XlConditionValueTypes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定可以使用的条件值的类型。

名称名称 值值 说明说明 xlConditionValueAutomaticMax 7 最长数据条与范围中的最大值成比例。 xlConditionValueAutomaticMin 6 最短数据条与范围中的最小值成比例。 xlConditionValueFormula 4 使用公式。 xlConditionValueHighestValue 2 值列表的最高值。 xlConditionValueLowestValue 1 值列表的最低值。 xlConditionValueNone -1 无条件值。 xlConditionValueNumber 0 使用数字。 xlConditionValuePercent 3 使用百分比。 xlConditionValuePercentile 5 使用百分点值。

# XlConnectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据库连接的类型。

名称名称 值值 说明说明 xlConnectionTypeODBC 2 ODBC xlConnectionTypeOLEDB 1 OLEDB xlConnectionTypeTEXT 4 文本 xlConnectionTypeWEB 5 Web xlConnectionTypeXMLMAP 3 XML 映射

# XlConsolidationFunction 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分类汇总函数。

名称名称 值值 说明说明 xlAverage -4106 平均。 xlCount -4112 计数。 xlCountNums -4113 只计数数值。 xlMax -4136 最大值。 xlMin -4139 最小值。 xlProduct -4149 乘。 xlStDev -4155 基于样本的标准偏差。 xlStDevP -4156 基于全体数据的标准偏差。 xlSum -4157 总计。 xlUnknown 1000 未指定任何分类汇总函数。 xlVar -4164 基于样本的方差。 xlVarP -4165 基于全体数据的方差。

# XlConstants 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

在 WPS 中指定各种常量。

名称名称 值值 说明说明 xl3DBar -4099 三维条形图组或系列。 xl3DSurface -4103 三维曲面图组或系列。 xlAbove 0 摘要行显示在指定区域的上方。 xlAutomatic -4105 WPS 对指定的对象应用自动设置，如颜色或页码。 xlBar 2 二维条形图组或系列。 xlBelow 1 摘要行显示在指定区域的下方。 xlBoth 1 在指定图表组或系列中显示正负误差线。 xlBottom -4107 靠下。 xlCenter -4108 居中。 xlChecker 9 方格图案。 xlCircle 8 圆形。 xlColumn 3 圆柱形图表组或系列。 xlCombination -4111 组合。 xlCorner 2 角点。 xlCrissCross 16 十字图案。 xlCross 4 交叉图案。 xlCustom -4114 WPS 对指定对象应用自定义设置，如颜色或误差量。 xlDefaultAutoFormat -1 WPS 应用默认格式或自动套用格式。 xlDiamond 2 菱形图案。 xlDistributed -4117 分散对齐。 xlFill 5 填充。 xlFixedValue 1 以固定值形式显示误差量。 xlGeneral 1 常规。 xlGray16 17 16% 灰色图案。 xlGray25 -4124 25% 灰色图案。 xlGray50 -4125 50% 灰色图案。

xlGray50 -4125 50% 灰色图案。 xlGray75 -4126 75% 灰色图案。 xlGray8 18 8% 灰色图案。 xlGrid 15 网格图案。 xlHigh -4127 高。 xlInside 2 内部。 xlJustify -4130 两端对齐。 xlLeft -4131 靠左。 xlLightDown 13 浅色下竖线图案。 xlLightHorizontal 11 浅色水平线图案。 xlLightUp 14 浅色上竖线图案。 xlLightVertical 12 浅色垂直线图案。 xlLow -4134 低。 xlMaximum 2 最大值。 xlMinimum 4 最小值。 xlMinusValues 3 负值。 xlNextToAxis 4 轴旁。 xlNone -4142 在指定图表组或系列中不显示误差线。 xlOpaque 3 不透明填充。 xlOutside 3 外部。 xlPercent 2 以百分比形式显示误差量。 xlPlus 9 在指定图表组或系列中显示正误差线。 xlPlusValues 2 正值。 xlRight -4152 靠右。 xlScale 3 缩放。 xlSemiGray75 10 75% 灰色图案。 xlShowLabel 4 显示标签。 xlShowLabelAndPercent 5 显示标签和百分比。 xlShowPercent 3 显示百分比。 xlShowValue 2 显示值。 xlSingle 2 单线。 xlSolid 1 实心图案。 xlSquare 1 正方形。 xlStar 5 星形。 xlStError 4 以标准误差形式显示误差量。 xlTop -4160 向上。 xlTransparent 2 透明填充。 xlTriangle 3 三角形。

# XlContainsOperator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定函数使用的运算符。

名称名称 值值 说明说明 xlBeginsWith 2 以指定的值开始。 xlContains 0 包含指定的值。 xlDoesNotContain 1 不包含指定的值。 xlEndsWith 3 以指定的值结束

# XlCopyPictureFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定复制的图片的格式。

名称名称 值值 说明说明 xlBitmap 2 位图（.bmp、.jpg、.gif）。 xlPicture -4147 绘制图片（.png、.wmf、.mix）。

# XlCorruptLoad 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文件打开时的处理。

名称名称 值值 说明说明 xlExtractData 2 ET 尝试恢复工作簿中的数据。 xlNormalLoad 0 正常打开工作簿。 xlRepairFile 1 ET 尝试修复工作簿。

# XlCreator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为 ET for Macintosh 指定 32 位创建者代码（十进制 1480803660、十六进制 5843454C、字符串 XCEL）。

名称名称 值值 说明说明 xlCreatorCode 1480803660 ET for Macintosh 创建者代码。

# XlCredentialsMethod 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所用凭据方法的类型。

名称名称 值值 说明说明 CredentialsMethodIntegrated 0 集成 CredentialsMethodNone 1 不使用凭据 CredentialsMethodStored 2 使用存储的凭据

# XlCubeFieldSubType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 CubeField 的子类型。

注释注释 值的名称中含有“Cube”，以便不与 CubeFieldType 属性的 xlMeasure 和 xlSet 值重叠。如果名称相同，记忆式键入功能 在 Visual Basic 环境中将不起作用，因为它会找到模棱两可的值。

注释注释 值的名称中含有“Cube”，以便不与 CubeFieldType 属性的 xlMeasure 和 xlSet 值重叠。如果名称相同，记忆式键入功能 在 Visual Basic 环境中将不起作用，因为它会找到模棱两可的值。

名称名称 值值 说明说明 xlCubeAttribute 4 属性 xlCubeCalculatedMeasure 5 计算度量 xlCubeHierarchy 1 层次结构 xlCubeKPIGoal 7 KPI 目标 xlCubeKPIStatus 8 KPI 状态 xlCubeKPITrend 9 KPI 趋势 xlCubeKPIValue 6 KPI 值 xlCubeKPIWeight 10 KPI 权数 xlCubeMeasure 2 度量 xlCubeSet 3 集合

# XlCubeFieldType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OLAP 字段是层次结构、集合还是度量字段。

名称名称 值值 说明说明 xlHierarchy 1 OLAP 字段是层次结构。 xlMeasure 2 OLAP 字段是度量。 xlSet 3 OLAP 字段是集合。

# XlCutCopyMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定状态为复制模式还是剪切模式。

名称名称 值值 说明说明 xlCopy 1 复制模式 xlCut 2 剪切模式

# XlCVError 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定单元格错误号和值。

名称名称 值值 说明说明 xlErrDiv0 2007 错误号：2007 xlErrNA 2042 错误号：2042 xlErrName 2029 错误号：2029 xlErrNull 2000 错误号：2000 xlErrNum 2036 错误号：2036 xlErrRef 2023 错误号：2023 xlErrValue 2015 错误号：2015

# XlDataBarAxisPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定条件格式为数据条的单元格区域的坐标轴位置。

名称名称 值值 说明说明

在基于区域中最小负值对最大正值之比的可变位置处显示坐标轴。正值按从左至右方向显 xlDataBarAxisAutomatic 0 示。负值按从右至左方向显示。当所有值全为正或全为负时，将不显示坐标轴。

不管区域中具有什么样的一组值，总是在单元格的中点显示坐标轴。正值按从左至右方向显 xlDataBarAxisMidpoint 1 示。负值按从右至左方向显示。 xlDataBarAxisNone 2 不显示任何坐标轴，正值和负值都按从左至右方向显示。

# XlDataBarBorderType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据条的边框。

名称名称 值值 说明说明 xlDataBarBorderNone 0 数据条无边框。 xlDataBarBorderSolid 1 数据条有实心边框。

# XlDataBarFillType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何对数据条填充颜色。

名称名称 值值 说明说明 xlDataBarFillGradient 1 对数据条填充渐变色。 xlDataBarFillSolid 0 对数据条填充纯色。

# XlDataBarNegativeColorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是否使用与正数据条相同的边框和填充色。

名称名称 值值 说明说明 使用“负值和坐标轴设置负值和坐标轴设置 ”对话框中指定的颜色，或者使用由 NegativeBarFormat 对 xlDataBarColor 0 象的 ColorType 和 BorderColorType 属性指定的颜色。

xlDataBarSameAsPositive 1 使用与正数据条相同的颜色。

# XlDataLabelPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据标签的放置位置。

名称名称 值值 说明说明 xlLabelPositionAbove 0 数据标签放置在数据点的上方。 xlLabelPositionBelow 1 数据标签放置在数据点的下方。 xlLabelPositionBestFit 5 WPS 设置数据标签的位置。 xlLabelPositionCenter -4108 数据标签位于数据点中心或者位于条形图或饼图内部。 xlLabelPositionCustom 7 数据标签位于自定义位置。 xlLabelPositionInsideBase 4 数据标签放置在数据点下边缘内侧。 xlLabelPositionInsideEnd 3 数据标签放置在数据点上边缘内侧。 xlLabelPositionLeft -4131 数据标签放置在数据点左侧。 xlLabelPositionMixed 6 数据标签位于多个位置。 xlLabelPositionOutsideEnd 2 数据标签放置在数据点上边缘外侧。 xlLabelPositionRight -4152 数据标签放置在数据点右侧。

# XlDataLabelSeparator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于数据标签的分隔符。

名称名称 值值 说明说明 xlDataLabelSeparatorDefault 1 WPS 选择分隔符。

# XlDataLabelsType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用的数据标签的类型。

名称名称 值值 说明说明 xlDataLabelsShowBubbleSizes 6 显示关于绝对值的气泡图的大小。 xlDataLabelsShowLabel 4 数据点所属类别。 xlDataLabelsShowLabelAndPercent 5 占总数的百分比及数据点所属类别。仅用于饼图和圆环图。 xlDataLabelsShowNone -4142 无数据标签。 xlDataLabelsShowPercent 3 占总数的百分比。仅用于饼图和圆环图。 xlDataLabelsShowValue 2 数据点的默认值（如果未指定此参数）。

# XlDataSeriesDate 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于数据系列的日期的类型。

名称名称 值值 说明说明 xlDay 1 日 xlMonth 3 月 xlWeekday 2 工作日 xlYear 4 年

# XlDataSeriesType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要创建的数据系列。

名称名称 值值 说明说明 xlAutoFill 4 按照“自动填充”设置对系列进行填充。 xlChronological 3 用数据值进行填充。 xlDataSeriesLinear -4132 扩展值，假定一个加法级数（例如，“1, 2”被扩展为“3, 4, 5”）。 xlGrowth 2 扩展值，假定一个乘法级数（例如，“1, 2”被扩展为“4, 8, 16”）。

# XlDeleteShiftDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何移动单元格来替换删除的单元格。

名称名称 值值 说明说明 xlShiftToLeft -4159 单元格向左移动。 xlShiftUp -4162 单元格向上移动。

# XlDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定移动的方向。

名称名称 值值 说明说明 xlDown -4121 向下。 xlToLeft -4159 向左。 xlToRight -4161 向右。 xlUp -4162 向上。

# XlDisplayBlanksAs 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在图表上绘制空单元格的方式。

名称名称 值值 说明说明 xlInterpolated 3 将值内插入图表。 xlNotPlotted 1 不绘制空单元格。 xlZero 2 空单元格绘制为零。

# XlDisplayDrawingObjects 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定形状的显示方式。

名称名称 值值 说明说明 xlDisplayShapes -4104 显示所有形状。 xlHide 3 隐藏所有形状。 xlPlaceholders 2 仅显示占位符。

# XlDisplayUnit 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定坐标轴的显示单位标签。

名称名称 值值 说明说明 xlHundredMillions -8 亿。 xlHundreds -2 百。 xlHundredThousands -5 十万。 xlMillionMillions -10 万亿。 xlMillions -6 百万。 xlTenMillions -7 千万。 xlTenThousands -4 万。 xlThousandMillions -9 亿。 xlThousands -3 千。

# XlDupeUnique 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应显示重复值还是唯一值。

名称名称 值值 说明说明 xlDuplicate 1 显示重复值。 xlUnique 0 显示唯一值。

# XlDVAlertStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定验证过程中显示的消息框所用的图标。

名称名称 值值 说明说明 xlValidAlertInformation 3 信息图标。 xlValidAlertStop 1 停止图标。 xlValidAlertWarning 2 警告图标。

# XlDVType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要对值进行的有效性测试类型。

名称名称 值值 说明说明 xlValidateCustom 7 使用任意公式验证数据有效性。 xlValidateDate 4 日期值。 xlValidateDecimal 2 数值。 xlValidateInputOnly 0 仅在用户更改值时进行验证。 xlValidateList 3 值必须存在于指定列表中。 xlValidateTextLength 6 文本长度。 xlValidateTime 5 时间值。 xlValidateWholeNumber 1 全部数值。

# XlDynamicFilterCriteria 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定筛选条件。

名称名称 值值 说明说明 xlFilterAboveAverage 33 筛选所有高于平均值的值。 xlFilterAllDatesInPeriodApril 24 筛选所有四月的日期。 xlFilterAllDatesInPeriodAugust 28 筛选所有八月的日期。 xlFilterAllDatesInPeriodDecember 32 筛选所有十二月的日期。 xlFilterAllDatesInPeriodFebruray 22 筛选所有二月的日期。 xlFilterAllDatesInPeriodJanuary 21 筛选所有一月的日期。 xlFilterAllDatesInPeriodJuly 27 筛选所有七月的日期。 xlFilterAllDatesInPeriodJune 26 筛选所有六月的日期。 xlFilterAllDatesInPeriodMarch 23 筛选所有三月的日期。 xlFilterAllDatesInPeriodMay 25 筛选所有五月的日期。 xlFilterAllDatesInPeriodNovember 31 筛选所有十一月的日期。 xlFilterAllDatesInPeriodOctober 30 筛选所有十月的日期。 xlFilterAllDatesInPeriodQuarter1 17 筛选所有第一季度的日期。 xlFilterAllDatesInPeriodQuarter2 18 筛选所有第二季度的日期。 xlFilterAllDatesInPeriodQuarter3 19 筛选所有第三季度的日期。 xlFilterAllDatesInPeriodQuarter4 20 筛选所有第四季度的日期。 xlFilterAllDatesInPeriodSeptember 29 筛选所有九月的日期。 xlFilterBelowAverage 34 筛选所有低于平均值的值。 xlFilterLastMonth 8 筛选所有与上月相关的值。 xlFilterLastQuarter 11 筛选所有与上一季度相关的值。 xlFilterLastWeek 5 筛选所有与上周相关的值。 xlFilterLastYear 14 筛选所有与去年相关的值。 xlFilterNextMonth 9 筛选所有与下月相关的值。 xlFilterNextQuarter 12 筛选所有与下一季度相关的值。 xlFilterNextWeek 6 筛选所有与下周相关的值。 xlFilterNextYear 15 筛选所有与明年相关的值。 xlFilterThisMonth 7 筛选所有与本月相关的值。 xlFilterThisQuarter 10 筛选所有与本季度相关的值。 xlFilterThisWeek 4 筛选所有与本周相关的值。 xlFilterThisYear 13 筛选所有与今年相关的值。 xlFilterToday 1 筛选所有与今天相关的值。 xlFilterTomorrow 3 筛选所有与明天相关的值。 xlFilterYearToDate 16 筛选到今天为止一年的所有值。 xlFilterYesterday 2 筛选所有与昨天相关的值。

# XlEditionFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定发布版本的格式。此枚举仅用于 Macintosh，因此不应使用。

名称名称 值值 说明说明 xlBIFF 2 二进制交换文件格式。 xlPICT 1 图元文件图片结构 (.wmf)。 xlRTF 4 RTF 格式 (.rtf)。 xlVALU 8 VALU。

# XlEditionOptionsOption 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

此枚举仅用于 Macintosh，因此不应使用。

名称名称 值值 说明说明 xlAutomaticUpdate 4 自动更新。 xlCancel 1 取消。 xlChangeAttributes 6 更改属性。 xlManualUpdate 5 手动更新。 xlOpenSource 3 打开源。 xlSelect 3 选择。 xlSendPublisher 2 发送到 Microsoft Publisher。 xlUpdateSubscriber 2 更新订阅服务器。

# XlEditionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要更改的版本类型。

名称名称 值值 说明说明 xlPublisher 1 发布服务器 xlSubscriber 2 订阅服务器

# XlEnableCancelKey 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 WPS Office ET 2007 如何处理 Ctrl+Break（或 Esc、Command+Period）用户中断以用于运行程序。

名称名称 值值 说明说明 xlDisabled 0 完全禁用“取消”键捕获功能。 将中断作为错误发送给运行程序，由 On Error GoTo 语句设置的错误处理程序捕获。可捕获的错误代 xlErrorHandler 2 码为 18。 xlInterrupt 1 中断当前运行程序，用户可进行调试或结束程序的运行。

# XlEnableSelection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定可在工作表中选择的内容。

名称名称 值值 说明说明 xlNoRestrictions 0 可以选择任何内容。 xlNoSelection -4142 不能选择任何内容。 xlUnlockedCells 1 只能选择未锁定单元格。

# XlEndStyleCap 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定误差线的末端样式。

名称名称 值值 说明说明 xlCap 1 应用端帽。 xlNoCap 2 不应用端帽。

# XlErrorBarDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定接收误差线的轴值。

名称名称 值值 说明说明 xlChartX -4168 误差线平行于 y 轴，长度为 x 轴值。 xlChartY 1 误差线平行于 x 轴，长度为 y 轴值。

# XlErrorBarInclude 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要包含的误差线部分。

名称名称 值值 说明说明 xlErrorBarIncludeBoth 1 正负误差区域。 xlErrorBarIncludeMinusValues 3 仅负误差区域。 xlErrorBarIncludeNone -4142 无误差线区域。 xlErrorBarIncludePlusValues 2 仅正误差区域。

# XlErrorBarType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定误差线标记的区域。

名称名称 值值 说明说明 xlErrorBarTypeCustom -4114 区域由固定值或单元格值设置。 xlErrorBarTypeFixedValue 1 固定长度误差线。 xlErrorBarTypePercent 2 误差线覆盖的区域的百分比。 xlErrorBarTypeStDev -4155 显示指定数目的标准偏差区域。 xlErrorBarTypeStError 4 显示标准误差区域。

# XlErrorChecks 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定要从 Errors 集合检索的误差对象的类型。

名称名称 值值 说明说明 xlEmptyCellReferences 7 单元格包含一个引用空单元格的公式。 xlEvaluateToError 1 单元格计算为错误值。 xlInconsistentFormula 4 单元格包含与区域不一致的公式。 xlInconsistentListFormula 9 单元格包含与列表不一致的公式。 xlListDataValidation 8 列表中的数据包含一个有效性错误。 xlNumberAsText 3 按文本输入的数字。 xlOmittedCells 5 忽略的单元格。 xlTextDate 2 按文本输入的日期。 xlUnlockedFormulaCells 6 解除锁定公式单元格。

# XlFileAccess 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象的新访问模式。

名称名称 值值 说明说明 xlReadOnly 3 只读。 xlReadWrite 2 可读/写。

# XlFileFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定保存工作表时的文件格式。

名称名称 值值 说明说明 xlAddIn 18 ET 2007 加载项 xlAddIn8 18 ET 97-2003 加载项 xlCSV 6 CSV xlCSVMac 22 Macintosh CSV xlCSVMSDOS 24 MSDOS CSV xlCSVWindows 23 Windows CSV

xlCSVWindows 23 Windows CSV xlCurrentPlatformText -4158 当前平台文本 xlDBF2 7 DBF2 xlDBF3 8 DBF3 xlDBF4 11 DBF4 xlDIF 9 DIF xlExcel12 50 ET 12 xlExcel2 16 ET 2 xlExcel2FarEast 27 Excel2 FarEast xlExcel3 29 Excel3 xlExcel4 33 Excel4 xlExcel4Workbook 35 Excel4 工作簿 xlExcel5 39 Excel5 xlExcel7 39 Excel7 xlExcel8 56 Excel8 xlExcel9795 43 Excel9795 xlHtml 44 HTML 格式 xlIntlAddIn 26 国际加载项 xlIntlMacro 25 国际宏 xlOpenDocumentSpreadsheet 60 OpenDocument 电子表格 xlOpenXMLAddIn 55 打开 XML 加载项 xlOpenXMLTemplate 54 打开 XML 模板 xlOpenXMLTemplateMacroEnabled 53 打开启用的 XML 模板宏 xlOpenXMLWorkbook 51 打开 XML 工作簿 xlOpenXMLWorkbookMacroEnabled 52 打开启用的 XML 工作簿宏 xlSYLK 2 SYLK xlTemplate 17 模板 xlTemplate8 17 模板 8 xlTextMac 19 Macintosh 文本 xlTextMSDOS 21 MSDOS 文本 xlTextPrinter 36 打印机文本 xlTextWindows 20 Windows 文本 xlUnicodeText 42 Unicode 文本 xlWebArchive 45 Web 档案 xlWJ2WD1 14 WJ2WD1 xlWJ3 40 WJ3 xlWJ3FJ3 41 WJ3FJ3 xlWK1 5 WK1 xlWK1ALL 31 WK1ALL xlWK1FMT 30 WK1FMT xlWK3 15 WK3 xlWK3FM3 32 WK3FM3 xlWK4 38 WK4 xlWKS 4 工作表 xlWorkbookDefault 51 默认工作簿 xlWorkbookNormal -4143 常规工作簿 xlWorks2FarEast 28 Works2 FarEast xlWQ1 34 WQ1

xlWQ1 34 WQ1 xlXMLSpreadsheet 46 XML 电子表格

# XlFileValidationPivotMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何验证数据透视表的数据缓存。

名称名称 值值 说明说明 xlFileValidationPivotDefault 0 验证 PivotOptions 注册表设置指定的数据缓存的内容（默认）。 xlFileValidationPivotRun 1 验证所有数据缓存的内容，而不考虑注册表设置。 xlFileValidationPivotSkip 2 不验证数据缓存的内容。

# XlFillWith 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何复制区域。

名称名称 值值 说明说明 xlFillWithAll -4104 复制内容和格式。 xlFillWithContents 2 仅复制内容。 xlFillWithFormats -4122 仅复制格式。

# XlFilterAction 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在筛选操作过程中是复制数据还是保留不动。

名称名称 值值 说明说明 xlFilterCopy 2 将筛选出的数据复制到新位置。 xlFilterInPlace 1 保留数据不动。

# XlFilterAllDatesInPeriod 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在指定时间段内的日期筛选方式。

名称名称 值值 说明说明 xlFilterAllDatesInPeriodDay 2 在所有日期内筛选指定日期。 xlFilterAllDatesInPeriodHour 3 在所有日期中筛选指定小时。 xlFilterAllDatesInPeriodMinute 4 在所有日期中筛选指定分钟。 xlFilterAllDatesInPeriodMonth 1 在所有日期中筛选指定月。 xlFilterAllDatesInPeriodSecond 5 在所有日期中筛选指定秒。 xlFilterAllDatesInPeriodYear 0 在所有日期内筛选指定年。

# XlFindLookIn 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要搜索的数据的类型。

名称名称 值值 说明说明 xlComments -4144 批注。 xlFormulas -4123 公式。 xlValues -4163 值。

# XlFixedFormatQuality 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定以不同固定格式保存的电子表格的质量。

名称名称 值值 说明说明 xlQualityMinimum 1 最低质量 xlQualityStandard 0 标准质量

# XlFixedFormatType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文件格式的类型。

名称名称 值值 说明说明 xlTypePDF 0 "PDF" ― 可移植文档格式文件 (.pdf)。 xlTypeXPS 1 "XPS" ― XPS 文档 (.xps)。

# XlFormatConditionOperator 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定运算符，用于比较公式与单元格中的值，或者比较两个公式（适用于 xlBetween 和 xlNotBetween）。

名称名称 值值 说明说明 xlBetween 1 介于。只在提供了两个公式的情况下才能使用。 xlEqual 3 等于。 xlGreater 5 大于。 xlGreaterEqual 7 大于或等于。 xlLess 6 小于。 xlLessEqual 8 小于或等于。 xlNotBetween 2 不介于。只在提供了两个公式的情况下才能使用。 xlNotEqual 4 不等于。

# XlFormatConditionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定条件格式是基于单元格值还是基于表达式。

名称名称 值值 说明说明 xlAboveAverageCondition 12 高于平均值条件 xlBlanksCondition 10 空值条件 xlCellValue 1 单元格值 xlColorScale 3 色阶 xlDatabar 4 数据条 xlErrorsCondition 16 错误条件 xlExpression 2 表达式 XlIconSet 6 图标集 xlNoBlanksCondition 13 无空值条件 xlNoErrorsCondition 17 无错误条件 xlTextString 9 文本字符串 xlTimePeriod 11 时间段 xlTop10 5 前 10 个值 xlUniqueValues 8 唯一值

# XlFormatFilterTypes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定格式筛选的类型。

名称名称 值值 说明说明 FilterBottom 0 下筛选。 FilterBottomPercent 2 下百分比筛选。 FilterTop 1 上筛选。 FilterTopPercent 3 上百分比筛选。

# XlFormControl 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定表单控件的类型。

名称名称 值值 说明说明 xlButtonControl 0 按钮。 xlCheckBox 1 复选框。 xlDropDown 2 组合框。 xlEditBox 3 文本框。 xlGroupBox 4 分组框。 xlLabel 5 标签。 xlListBox 6 列表框。 xlOptionButton 7 选项按钮。 xlScrollBar 8 滚动条。 xlSpinner 9 微调按钮。

# XlFormulaLabel 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定区域指定公式标签类型。

名称名称 值值 说明说明 xlColumnLabels 2 仅列标签。 xlMixedLabels 3 行标签和列标签。 xlNoLabels -4142 无标签。 xlRowLabels 1 仅行标签。

# XLGenerateTableRefs 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定表引用的类型。

名称名称 值值 说明说明 xlA1TableRefs 0 A1 表引用。 xlTableNames 1 表名称。

# XlGradientFillType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定 gradient fill 的类型。

名称名称 值值 说明说明 GradientFillLinear 0 渐变以直线填充。 GradientFillPath 1 渐变以非线性或曲线路径填充。

# XlHAlign 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象的水平对齐方式。

名称名称 值值 说明说明 xlHAlignCenter -4108 居中。 xlHAlignCenterAcrossSelection 7 跨列居中。 xlHAlignDistributed -4117 分散对齐。 xlHAlignFill 5 填充。 xlHAlignGeneral 1 按数据类型对齐。 xlHAlignJustify -4130 两端对齐。 xlHAlignLeft -4131 靠左。 xlHAlignRight -4152 靠右。

# XlHebrewModes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定希伯来语拼写检查器的模式。

名称名称 值值 说明说明 在书写不带音调符号的文字时，希伯来语协会 (Hebrew Language Academy) 要 xlHebrewFullScript 0 求使用传统字符类型。 xlHebrewMixedAuthorizedScript 3 希伯来传统字符。

在这种模式下，拼写检查器接受所有识别为希伯来语的单词，包括以完整文字、 xlHebrewMixedScript 2 部分文字或拼写检查器可识别的非常规拼写变体书写的单词。

在这种模式下，拼写检查器接受以完整文字和部分文字书写的单词。由于以完整 xlHebrewPartialScript 1 文字和部分文字书写的某些单词的拼写未经核准，因此将对这些单词进行标记。

# XlHighlightChangesTime 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定共享工作簿中显示的一组更改。

名称名称 值值 说明说明 xlAllChanges 2 显示所有更改。 xlNotYetReviewed 3 仅显示还未审阅的更改。 xlSinceMyLastSave 1 显示上次保存后最后一个用户进行的更改。

# XlHtmlType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将指定项保存到网页时 ET 生成的 HTML 的类型，并指定该项是静态还是交互式。

注释注释 除 xlHtmlStatic 之外的所有 XlHtmlType 枚举均已被弃用。

注释注释 除 xlHtmlStatic 之外的所有 XlHtmlType 枚举均已被弃用。

名称名称 值值 说明说明 xlHtmlCalc 1 使用电子表格组件。已弃用。 xlHtmlChart 3 使用图表组件。已弃用。 xlHtmlList 2 使用数据透视表组件。已弃用。 xlHtmlStatic 0 使用静态（非交互式）HTML，仅用于查看。

# XlIcon 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图标集条件格式规则中某个条件的图标。

名称名称 值值 说明说明 xlIcon0Bars 37 没有填充栏的信号指示器没有填充栏的信号指示器 xlIcon0FilledBoxes 52 无填充框无填充框 xlIcon1Bar 38 具有一个填充栏的信号指示器具有一个填充栏的信号指示器 xlIcon1FilledBox 51 一个填充框一个填充框 xlIcon2Bars 39 具有两个填充栏的信号指示器具有两个填充栏的信号指示器 xlIcon2FilledBoxes 50 两个填充框两个填充框 xlIcon3Bars 40 具有三个填充栏的信号指示器具有三个填充栏的信号指示器 xlIcon3FilledBoxes 49 三个填充框三个填充框 xlIcon4Bars 41 具有四个填充栏的信号指示器具有四个填充栏的信号指示器 xlIcon4FilledBoxes 48 四个填充框四个填充框 xlIconBlackCircle 32 黑色圆黑色圆 xlIconBlackCircleWithBorder 13 黑色圆，带边框黑色圆，带边框 xlIconCircleWithOneWhiteQuarter 33 四分之一为白色的圆四分之一为白色的圆 xlIconCircleWithThreeWhiteQuarters 35 四分之三为白色的圆四分之三为白色的圆 xlIconCircleWithTwoWhiteQuarters 34 四分之二为白色的圆四分之二为白色的圆 xlIconGoldStar 42 金色星形金色星形 xlIconGrayCircle 31 灰色圆灰色圆 xlIconGrayDownArrow 6 灰色下箭头灰色下箭头 xlIconGrayDownInclineArrow 28 灰色下斜箭头灰色下斜箭头 xlIconGraySideArrow 5 灰色侧箭头灰色侧箭头 xlIconGrayUpArrow 4 灰色上箭头灰色上箭头 xlIconGrayUpInclineArrow 27 灰色上斜箭头灰色上斜箭头 xlIconGreenCheck 22 绿色复选符号绿色复选符号 xlIconGreenCheckSymbol 19 绿色复选符号绿色复选符号 xlIconGreenCircle 10 绿色圆绿色圆 xlIconGreenFlag 7 绿旗绿旗 xlIconGreenTrafficLight 14 绿色交通灯绿色交通灯 xlIconGreenUpArrow 1 绿色上箭头绿色上箭头 xlIconGreenUpTriangle 45 绿色正三角形绿色正三角形

xlIconGreenUpTriangle 45 绿色正三角形绿色正三角形 xlIconHalfGoldStar 43 半金色星形半金色星形 xlIconNoCellIcon -1 无单元格图标无单元格图标 xlIconPinkCircle 30 粉红色圆粉红色圆 xlIconRedCircle 29 红色圆红色圆 xlIconRedCircleWithBorder 12 红色圆，带边框红色圆，带边框 xlIconRedCross 24 红色十字红色十字 xlIconRedCrossSymbol 21 红色十字形符号红色十字形符号 xlIconRedDiamond 18 红色菱形红色菱形 xlIconRedDownArrow 3 红色下箭头红色下箭头 xlIconRedDownTriangle 47 红色倒三角形红色倒三角形 xlIconRedFlag 9 红旗红旗 xlIconRedTrafficLight 16 红色交通灯红色交通灯 xlIconSilverStar 44 银色星形银色星形 xlIconWhiteCircleAllWhiteQuarters 36 纯白圆纯白圆 xlIconYellowCircle 11 黄色圆黄色圆 xlIconYellowDash 46 黄色虚线三角形黄色虚线三角形 xlIconYellowDownInclineArrow 26 黄色下斜箭头黄色下斜箭头 xlIconYellowExclamation 23 黄色感叹号黄色感叹号 xlIconYellowExclamationSymbol 20 黄色感叹号黄色感叹号 xlIconYellowFlag 8 黄旗黄旗 xlIconYellowSideArrow 2 黄色侧箭头黄色侧箭头 xlIconYellowTrafficLight 15 黄色交通灯黄色交通灯 xlIconYellowTriangle 17 黄色三角形黄色三角形 xlIconYellowUpInclineArrow 25 黄色上斜箭头黄色上斜箭头

# XlIconSet 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图标集的类型。

名称名称 值值 说明说明 xl3Arrows 1 三向箭头 xl3ArrowsGray 2 灰色三向箭头 xl3Flags 3 三色旗 xl3Signs 6 三标志 xl3Symbols 7 三个符号 xl3TrafficLights1 4 三色交通灯 1 xl3TrafficLights2 5 三色交通灯 2 xl4Arrows 8 四向箭头 xl4ArrowsGray 9 灰色四向箭头 xl4CRV 11 4 CRV xl4RedToBlack 10 四个圆红－黑渐变 xl4TrafficLights 12 四色交通灯 xl5Arrows 13 五向箭头 xl5ArrowsGray 14 灰色五向箭头 xl5CRV 15 5 CRV xl5Quarters 16 五象限图

# XlIMEMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定日语输入规则的说明。

名称名称 值值 说明说明 xlIMEModeAlpha 8 半角字母数字。 xlIMEModeAlphaFull 7 全角字母数字。 xlIMEModeDisable 3 禁用。 xlIMEModeHangul 10 朝鲜文。 xlIMEModeHangulFull 9 全角朝鲜文。 xlIMEModeHiragana 4 平假名。 xlIMEModeKatakana 5 片假名。 xlIMEModeKatakanaHalf 6 半角片假名。 xlIMEModeNoControl 0 无控制。 xlIMEModeOff 2 关闭（英文模式）。 xlIMEModeOn 1 模式打开。

# XlImportDataAs 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定从数据库返回数据的格式。

名称名称 值值 说明说明 xlPivotTableReport 1 以数据透视表的形式返回数据。 xlQueryTable 0 以查询表的形式返回数据。

# XlInsertFormatOrigin 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定从何处复制插入行的格式。

名称名称 值值 说明说明 xlFormatFromLeftOrAbove 0 从上方和/或左侧单元格复制格式。 xlFormatFromRightOrBelow 1 从下方和/或右侧单元格复制格式。

# XlInsertShiftDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定插入时单元格的移动方向。

名称名称 值值 说明说明 xlShiftDown -4121 向下移动单元格。 xlShiftToRight -4161 向右移动单元格。

# XlLayoutFormType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定的数据透视表项指定显示方式，即以表格式还是以大纲格式显示。

名称名称 值值 说明说明 xlOutline 1 LayoutSubtotalLocation 属性指定分类汇总在数据透视表中出现的位置。 xlTabular 0 默认值。

# XlLayoutRowType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定版式行的类型。

名称名称 值值 说明说明 xlCompactRow 0 压缩行 xlOutlineRow 2 大纲行 xlTabularRow 1 表格行

# XlLegendPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图例在图表上的位置。

名称名称 值值 说明说明 xlLegendPositionBottom -4107 位于图表下方。 xlLegendPositionCorner 2 位于图表边框的右上角。 xlLegendPositionCustom -4161 位于自定义的位置上。 xlLegendPositionLeft -4131 位于图表的左侧。 xlLegendPositionRight -4152 位于图表的右侧。 xlLegendPositionTop -4160 位于图表的上方。

# XlLineStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定边框的线条样式。

名称名称 值值 说明说明 xlContinuous 1 实线。 xlDash -4115 虚线。 xlDashDot 4 点划相间线。 xlDashDotDot 5 划线后跟两个点。 xlDot -4118 点线。 xlDouble -4119 双线。 xlLineStyleNone -4142 无线。 xlSlantDashDot 13 倾斜的划线。

# XlLink 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接的类型。

名称名称 值值 说明说明 xlExcelLinks 1 到 ET 工作表的链接。 xlOLELinks 2 到 OLE 源的链接。 xlPublishers 5 仅用于 Macintosh。 xlSubscribers 6 仅用于 Macintosh。

# XlLinkInfo 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接将返回的信息的类型。

名称名称 值值 说明说明 xlEditionDate 2 仅应用于 Macintosh 操作系统中的版本。 xlLinkInfoStatus 3 返回链接状态。 xlUpdateState 1 指定链接是自动更新还是手动更新。

# XlLinkInfoType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接的类型。

名称名称 值值 说明说明 xlLinkInfoOLELinks 2 OLE 或 DDE 服务器 xlLinkInfoPublishers 5 发布服务器 xlLinkInfoSubscribers 6 订阅服务器

# XlLinkStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接的状态。

名称名称 值值 说明说明 xlLinkStatusCopiedValues 10 复制的值。 xlLinkStatusIndeterminate 5 不能确定状态。 xlLinkStatusInvalidName 7 名称无效。 xlLinkStatusMissingFile 1 文件丢失。 xlLinkStatusMissingSheet 2 工作表丢失。 xlLinkStatusNotStarted 6 未启动。 xlLinkStatusOK 0 无错误。 xlLinkStatusOld 3 状态可能过期。 xlLinkStatusSourceNotCalculated 4 尚未计算。 xlLinkStatusSourceNotOpen 8 未打开。 xlLinkStatusSourceOpen 9 源文档打开。

# XlLinkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定链接的类型。

名称名称 值值 说明说明 xlLinkTypeExcelLinks 1 到 ET 源的链接。 xlLinkTypeOLELinks 2 到 OLE 源的链接。

# XlListConflict 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定冲突（用 ET 工作表中的列表的更改更新 Microsoft SharePoint Foundation 网站上的列表时）解决方法选项

。

名称名称 值值 说明说明 xlListConflictDialog 0 显示一个对话框，允许用户选择解决冲突的方式。 xlListConflictDiscardAllConflicts 2 接受存储在 SharePoint 网站上的数据版本。 xlListConflictError 3 如果发生冲突，则引发一个错误。 xlListConflictRetryAllConflicts 1 覆盖存储在 SharePoint 网站上的数据版本。

# XlListDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定连接到 Microsoft SharePoint Foundation 网站的列表列的数据类型。

名称名称 值值 说明说明 xlListDataTypeCheckbox 9 复选框。 xlListDataTypeChoice 6 单一选择字段。 xlListDataTypeChoiceMulti 7 多个选择字段。 xlListDataTypeCounter 11 计数器。 xlListDataTypeCurrency 4 货币。 xlListDataTypeDateTime 5 日期/时间。 xlListDataTypeHyperLink 10 超链接。 xlListDataTypeListLookup 8 “查阅”列表。 xlListDataTypeMultiLineRichText 12 多行 RTF 格式。 xlListDataTypeMultiLineText 2 多行纯文本。 xlListDataTypeNone 0 未指定类型。 xlListDataTypeNumber 3 数字。 xlListDataTypeText 1 纯文本。

# XlListObjectSourceType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表的当前源。

名称名称 值值 说明说明 xlSrcExternal 0 外部数据源（Microsoft SharePoint Foundation 网站）。 xlSrcQuery 3 查询 xlSrcRange 1 区域 xlSrcXml 2 XML

# XlLocationInTable 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据透视表中包含区域左上角的部分。

名称名称 值值 说明说明 xlColumnHeader -4110 列标题 xlColumnItem 5 列数据项 xlDataHeader 3 数据标题 xlDataItem 7 数据项 xlPageHeader 2 页面页眉 xlPageItem 6 页面项 xlRowHeader -4153 行标题 xlRowItem 4 行数据项 xlTableBody 8 表正文

# XlLookAt 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是匹配全部搜索文本还是匹配任一部分搜索文本。

名称名称 值值 说明说明 xlPart 2 匹配任一部分搜索文本。 xlWhole 1 匹配全部搜索文本。

# XlLookFor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要搜索的内容。

名称名称 值值 说明说明 LookForBlanks 0 空值 LookForErrors 1 错误 LookForFormulas 2 公式

# XlMailSystem 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定安装在主机上的邮件系统。

名称名称 值值 说明说明 xlMAPI 1 符合 MAPI 的系统 xlNoMailSystem 0 无邮件系统 xlPowerTalk 2 PowerTalk 邮件系统

# XlMarkerStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定折线图、散点图或雷达图中数据点或系列的数据标记样式。

名称名称 值值 说明说明 xlMarkerStyleAutomatic -4105 自动设置标记。 xlMarkerStyleCircle 8 圆形标记。 xlMarkerStyleDash -4115 长条形标记。 xlMarkerStyleDiamond 2 菱形标记。 xlMarkerStyleDot -4118 短条形标记。 xlMarkerStyleNone -4142 无标记。 xlMarkerStylePicture -4147 图片标记。 xlMarkerStylePlus 9 带加号的方形标记。 xlMarkerStyleSquare 1 方形标记。 xlMarkerStyleStar 5 带星号的方形标记。 xlMarkerStyleTriangle 3 三角形标记。 xlMarkerStyleX -4168 带 X 记号的方形标记。

# XlMeasurementUnits 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定度量单位。

名称名称 值值 说明说明 xlCentimeters 1 厘米 xlInches 0 英寸 xlMillimeters 2 毫米

# XlMouseButton 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定按下了哪个鼠标按钮。

名称名称 值值 说明说明 xlNoButton 0 没有按任何按钮。 xlPrimaryButton 1 按下主按钮（通常为鼠标左按钮）。 xlSecondaryButton 2 按下辅按钮（通常为鼠标右按钮）。

# XlMousePointer 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 ET 中鼠标指针的外观。

名称名称 值值 说明说明 xlDefault -4143 默认指针。 xlIBeam 3 I 形指针。 xlNorthwestArrow 1 西北向箭头指针。 xlWait 2 沙漏型指针。

# XlMSApplication 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定一个 Microsoft 应用程序。

名称名称 值值 说明说明 xlMicrosoftAccess 4 WPS Office Access xlMicrosoftFoxPro 5 Microsoft FoxPro xlMicrosoftMail 3 WPS Office Outlook xlMicrosoftPowerPoint 2 WPS Office PowerPoint xlMicrosoftProject 6 WPS Office Project xlMicrosoftSchedulePlus 7 Microsoft Schedule Plus xlMicrosoftWord 1 WPS Office Word

# XlOartHorizontalOverflow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本框的水平溢出设置。

名称名称 值值 说明说明 xlOartHorizontalOverflowClip 1 隐藏水平方向溢出文本框的文本。 xlOartHorizontalOverflowOverflow 0 允许文本在水平方向溢出文本框。

# XlOartVerticalOverflow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本框的垂直溢出设置。

名称名称 值值 说明说明 xlOartVerticalOverflowClip 1 隐藏垂直方向溢出文本框的文本。 xlOartVerticalOverflowEllipsis 2 隐藏垂直方向溢出文本框的文本，并在可见文本的最后添加省略号 (...)。

允许文本在垂直方向溢出文本框（根据文本对齐方式，可从上溢出、自下溢出，或 xlOartVerticalOverflowOverflow 0 者上下溢出）。

# XlObjectSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表为适应页面大小而进行缩放的方式。

名称名称 值值 说明说明 xlFitToPage 2 尽可能大地打印图表，并保持如屏幕所示的该图表的高度对宽度的比例。 xlFullPage 3 按照与页面相适应的大小打印图表，并根据需要调整其高度对宽度的比例。 xlScreenSize 1 以屏幕显示大小打印图表。

# XlOLEType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 OLE 对象类型。

名称名称 值值 说明说明 xlOLEControl 2 ActiveX 控件 xlOLEEmbed 1 嵌入式 OLE 对象 xlOLELink 0 链接 OLE 对象

# XlOLEVerb 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定使 OLE 对象服务器执行操作的动作。

名称名称 值值 说明说明 xlVerbOpen 2 打开对象。 xlVerbPrimary 1 执行服务器的主要操作。

# XlOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定单元格的处理次序。

名称名称 值值 说明说明 xlDownThenOver 1 向下处理行，然后向右逐个处理页或页面字段。 xlOverThenDown 2 向右逐个处理页或页面字段，然后向下处理行。

# XlOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文字方向。

名称名称 值值 说明说明 xlDownward -4170 文字向下排列。 xlHorizontal -4128 文字水平排列。 xlUpward -4171 文字向上排列。 xlVertical -4166 文字在单元格中向下居中排列。

# XlPageBreak 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定工作表中的分页符位置。

名称名称 值值 说明说明 xlPageBreakAutomatic -4105 ET 自动添加分页符。 xlPageBreakManual -4135 手动插入分页符。 xlPageBreakNone -4142 工作表中不插入分页符。

# XlPageBreakExtent 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分页符是全屏应用还是仅应用在打印区域。

名称名称 值值 说明说明 xlPageBreakFull 1 全屏。 xlPageBreakPartial 2 仅在打印区域内。

# XlPageOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定打印工作表时的页面方向。

名称名称 值值 说明说明 xlLandscape 2 横向模式。 xlPortrait 1 纵向模式。

# XlPaperSize 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定纸张的大小。

名称名称 值值 说明说明 xlPaper10x14 16 10 英寸 x 14 英寸 xlPaper11x17 17 11 英寸 x 17 英寸 xlPaperA3 8 A3（297 毫米 x 420 毫米） xlPaperA4 9 A4（210 毫米 x 297 毫米） xlPaperA4Small 10 A4（小）（210 毫米 x 297 毫米） xlPaperA5 11 A5（148 毫米 x 210 毫米） xlPaperB4 12 B4（250 毫米 x 354 毫米） xlPaperB5 13 A5（148 毫米 x 210 毫米） xlPaperCsheet 24 C 型纸 xlPaperDsheet 25 D 型纸 xlPaperEnvelope10 20 信封 #10（4-1/8 英寸 x 9-1/2 英寸） xlPaperEnvelope11 21 信封 #11（4-1/2 英寸 x 10-3/8 英寸） xlPaperEnvelope12 22 信封 #12（4-1/2 英寸 x 11 英寸） xlPaperEnvelope14 23 信封 #14（5 英寸 x 11-1/2 英寸） xlPaperEnvelope9 19 信封 #9（3-7/8 英寸 x 8-7/8 英寸） xlPaperEnvelopeB4 33 信封 B4（250 毫米 x 353 毫米） xlPaperEnvelopeB5 34 信封 B5（176 毫米 x 250 毫米） xlPaperEnvelopeB6 35 信封 B6（176 毫米 x 125 毫米） xlPaperEnvelopeC3 29 信封 C3（324 毫米 x 458 毫米） xlPaperEnvelopeC4 30 信封 C4（229 毫米 x 324 毫米） xlPaperEnvelopeC5 28 信封 C5（162 毫米 x 229 毫米） xlPaperEnvelopeC6 31 信封 C6（114 毫米 x 162 毫米） xlPaperEnvelopeC65 32 信封 C65（114 毫米 x 229 毫米） xlPaperEnvelopeDL 27 信封 DL（110 毫米 x 220 毫米） xlPaperEnvelopeItaly 36 信封（110 毫米 x 230 毫米） xlPaperEnvelopeMonarch 37 君主式信封（3-7/8 英寸 x 7-1/2 英寸） xlPaperEnvelopePersonal 38 信封（3-5/8 英寸 x 6-1/2 英寸） xlPaperEsheet 26 E 型纸 xlPaperExecutive 7 行政公文纸（7-1/2 英寸 x 10-1/2 英寸） xlPaperFanfoldLegalGerman 41 德国法律文书用复写簿（8-1/2 英寸 x 13 英寸） xlPaperFanfoldStdGerman 40 德国法律文书用复写簿（8-1/2 英寸 x 13 英寸） xlPaperFanfoldUS 39 美国标准复写簿（14-7/8 英寸 x 11 英寸） xlPaperFolio 14 对开纸（8-1/2 英寸 x 13 英寸） xlPaperLedger 4 帐单（17 英寸 x 11 英寸） xlPaperLegal 5 法律纸（8-1/2 英寸 x 14 英寸） xlPaperLetter 1 信函（8-1/2 英寸 x 11 英寸） xlPaperLetterSmall 2 简式信纸（8-1/2 英寸 x 11 英寸） xlPaperNote 18 便笺（8-1/2 英寸 x 11 英寸） xlPaperQuarto 15 四开本（215 毫米 x 275 毫米） xlPaperStatement 6 报告单（5-1/2 英寸 x 8-1/2 英寸） xlPaperTabloid 3 文摘（11 英寸 x 17 英寸） xlPaperUser 256 用户自定义

# XlParameterDataType 枚举枚举

# XlParameterDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定查询参数的数据类型。

名称名称 值值 说明说明 xlParamTypeBigInt -5 大整数。 xlParamTypeBinary -2 二进制。 xlParamTypeBit -7 位。 xlParamTypeChar 1 字符串。 xlParamTypeDate 9 日期。 xlParamTypeDecimal 3 十进制。 xlParamTypeDouble 8 双精度型。 xlParamTypeFloat 6 浮点型。 xlParamTypeInteger 4 整数。 xlParamTypeLongVarBinary -4 长二进制。 xlParamTypeLongVarChar -1 长字符串。 xlParamTypeNumeric 2 数字。 xlParamTypeReal 7 实数。 xlParamTypeSmallInt 5 小整数。 xlParamTypeTime 10 时间。 xlParamTypeTimestamp 11 时间戳。 xlParamTypeTinyInt -6 微小整数。 xlParamTypeUnknown 0 类型未知。 xlParamTypeVarBinary -3 变长度二进制。 xlParamTypeVarChar 12 变长度字符串。 xlParamTypeWChar -8 Unicode 字符串。

# XlParameterType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定的查询表指定确定参数值的方式。

名称名称 值值 说明说明 xlConstant 1 使用 Value 参数指定的值。 xlPrompt 0 显示提示用户输入值的对话框。Value 参数指定的是对话框中显示的文字。 xlRange 2 使用区域左上角单元格的值。Value 参数指定的是一个 Range 对象。

# XlPasteSpecialOperation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定工作表中目标单元格的数字数据的计算方式。

名称名称 值值 说明说明 xlPasteSpecialOperationAdd 2 复制的数据与目标单元格中的值相加。 xlPasteSpecialOperationDivide 5 复制的数据除以目标单元格中的值。 xlPasteSpecialOperationMultiply 4 复制的数据乘以目标单元格中的值。 xlPasteSpecialOperationNone -4142 粘贴操作中不执行任何计算。 xlPasteSpecialOperationSubtract 3 复制的数据减去目标单元格中的值。

# XlPasteType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要粘贴的区域部分。

名称名称 值值 说明说明 xlPasteAll -4104 粘贴全部内容。 xlPasteAllExceptBorders 7 粘贴除边框外的全部内容。 xlPasteAllMergingConditionalFormats 14 将粘贴所有内容，并且将合并条件格式。 xlPasteAllUsingSourceTheme 13 使用源主题粘贴全部内容。 xlPasteColumnWidths 8 粘贴复制的列宽。 xlPasteComments -4144 粘贴批注。 xlPasteFormats -4122 粘贴复制的源格式。 xlPasteFormulas -4123 粘贴公式。 xlPasteFormulasAndNumberFormats 11 粘贴公式和数字格式。 xlPasteValidation 6 粘贴有效性。 xlPasteValues -4163 粘贴值。 xlPasteValuesAndNumberFormats 12 粘贴值和数字格式。

# XlPattern 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表或内部对象的内部图案。

名称名称 值值 说明说明 xlPatternAutomatic -4105 由 WPS 控制图案。 xlPatternChecker 9 棋盘。 xlPatternCrissCross 16 十字线。 xlPatternDown -4121 左上角到右下角的深色对角线。 xlPatternGray16 17 16% 灰。 xlPatternGray25 -4124 25% 灰。 xlPatternGray50 -4125 50% 灰。 xlPatternGray75 -4126 75% 灰。 xlPatternGray8 18 8% 灰。 xlPatternGrid 15 网格。 xlPatternHorizontal -4128 深色水平线。 xlPatternLightDown 13 左上角到右下角的浅色对角线。 xlPatternLightHorizontal 11 浅色水平线。 xlPatternLightUp 14 左下角到右上角的浅色对角线。 xlPatternLightVertical 12 浅色垂直条。 xlPatternLinearGradient 4000 线性渐变。 xlPatternNone -4142 无图案。 xlPatternRectangularGradient 4001 矩形渐变。 xlPatternSemiGray75 10 75% 深色摩尔纹。 xlPatternSolid 1 纯色。 xlPatternUp -4162 左下角到右上角的深色对角线。 xlPatternVertical -4166 深色垂直条。

# XlPhoneticAlignment 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定拼音文字的对齐方式。用于 Phonetic 或 Phonetics 对象。

名称名称 值值 说明说明 xlPhoneticAlignCenter 2 居中对齐 xlPhoneticAlignDistributed 3 分散对齐 xlPhoneticAlignLeft 1 左对齐 xlPhoneticAlignNoControl 0 ET 控制对齐方式

# XlPhoneticCharacterType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定单元格中拼音文字的类型。

名称名称 值值 说明说明 xlHiragana 2 平假名 xlKatakana 1 片假名 xlKatakanaHalf 0 半尺寸片假名 xlNoConversion 3 无转换

# XlPictureAppearance 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图片的复制方式。

名称名称 值值 说明说明 xlPrinter 2 图片按其打印效果进行复制。 xlScreen 1 图片尽可能按其屏幕显示进行复制。

# XlPictureConvertorType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图形的转换方式。

名称名称 值值 说明说明 xlBMP 1 与 Windows 2.0 版兼容的位图 xlCGM 7 计算机图形图元文件 xlDRW 4 DRW xlDXF 5 DXF xlEPS 8 封装的附录 xlHGL 6 HGL xlPCT 13 位图图形（Apple PICT 格式） xlPCX 10 PC 画笔位图图形 xlPIC 11 PIC xlPLT 12 PLT xlTIF 9 标记图像格式文件 xlWMF 2 Windows 图元文件 xlWPG 3 WordPerfect/DrawPerfect 图形

# XlPieSliceIndex 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定返回扇区上哪个位置的坐标。

名称名称 值值 说明说明 xlCenterPoint 5 饼图扇区的中心点。 xlInnerCenterPoint 8 圆环图扇区的最里层中心点。 xlInnerClockwisePoint 7 圆环图扇区最大顺时针半径的最里层点。 xlInnerCounterClockwisePoint 9 圆环图扇区最大逆时针半径的最里层点。 xlMidClockwiseRadiusPoint 4 扇区最大顺时针半径的中点。 xlMidCounterClockwiseRadiusPoint 6 扇区最大逆时针半径的中点。 xlOuterCenterPoint 2 扇区圆周的外部中心点。 xlOuterClockwisePoint 3 扇区圆周的最外部顺时针点。 xlOuterCounterClockwisePoint 1 扇区圆周的最外部逆时针点。

# XlPieSliceLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定返回扇区上哪个位置的坐标。

名称名称 值值 说明说明 xlCenterPoint 5 饼图扇区的中心点。 xlInnerCenterPoint 8 圆环图扇区的最里层中心点。 xlInnerClockwisePoint 7 圆环图扇区最大顺时针半径的最里层点。 xlInnerCounterClockwisePoint 9 圆环图扇区最大逆时针半径的最里层点。 xlMidClockwiseRadiusPoint 4 扇区最大顺时针半径的中点。 xlMidCounterClockwiseRadiusPoint 6 扇区最大逆时针半径的中点。 xlOuterCenterPoint 2 扇区圆周的外部中心点。 xlOuterClockwisePoint 3 扇区圆周的最外部顺时针点。 xlOuterCounterClockwisePoint 1 扇区圆周的最外部逆时针点。

# XlPivotCellType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定单元格所对应的 PivotTable 实体。

名称名称 值值 说明说明 xlPivotCellBlankCell 9 数据透视表中的结构空白单元格。 xlPivotCellCustomSubtotal 7 行或列区域中作为自定义分类汇总的单元格。 xlPivotCellDataField 4 数据字段标签（不是“数据数据 ”按钮）。 xlPivotCellDataPivotField 8 “数据数据 ”按钮。 xlPivotCellGrandTotal 3 行或列区域中作为总计的单元格。 xlPivotCellPageFieldItem 6 用于显示页字段的选定项的单元格。 xlPivotCellPivotField 5 字段的按钮（不是“数据数据 ”按钮）。 xlPivotCellPivotItem 1 行或列区域中不是分类汇总、总计、自定义分类汇总或空行的单元格。 xlPivotCellSubtotal 2 行或列区域中作为分类汇总的单元格。 xlPivotCellValue 0 数据区域中的任一单元格（空行除外）。

# XlPivotConditionScope 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 此枚举指定用于从 PivotTable 对象中筛选值的条件格式。

名称名称 值值 说明说明 xlDataFieldScope 2 基于指定字段中的数据。 xlFieldsScope 1 基于指定的字段。 xlSelectionScope 0 基于指定的选择条件。

# XlPivotFieldCalculation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在使用自定义计算时由数据透视字段执行的计算类型。

名称名称 值值 说明说明 xlDifferenceFrom 2 与基本字段中基本项的值的差。 xlIndex 9 按 ((单元格中的值) x (总计)) / ((行总计) x (列总计)) 计算的数据。 xlNoAdditionalCalculation -4143 无计算。 xlPercentDifferenceFrom 4 与基本字段中基本项的值的差异百分比。 xlPercentOf 3 占基本字段中基本项的值的百分比。 xlPercentOfColumn 7 占列或系列总计的百分比。 xlPercentOfParent 12 指定的父基本字段的总计的百分比。 xlPercentOfParentColumn 11 父列的总计的百分比。 xlPercentOfParentRow 10 父行的总计的百分比。 xlPercentOfRow 6 占行或类别总计的百分比。 xlPercentOfTotal 8 占报表中所有数据或数据点总计的百分比。 xlPercentRunningTotal 13 指定基本字段的运行总计的百分比。 xlRankAscending 14 从最小到最大排名。 xlRankDecending 15 从最大到最小排名。 xlRunningTotal 5 以运行总和形式表示的基本字段中连续项的数据。

# XlPivotFieldDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 PivotTable 字段中数据的类型。

名称名称 值值 说明说明 xlDate 2 包含一个日期。 xlNumber -4145 包含一个数字。 xlText -4158 包含文本。

# XlPivotFieldOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定字段在数据透视表中的位置。

名称名称 值值 说明说明 xlColumnField 2 列字段。 xlDataField 4 数据字段。 xlHidden 0 隐藏字段。 xlPageField 3 页字段。 xlRowField 1 行字段。

# XlPivotFieldRepeatLabels 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是否重复数据透视表中的所有字段项目标签。

名称名称 值值 说明说明 xlDoNotRepeatLabels 1 不重复项目标签。 xlRepeatLabels 2 重复所有项目标签。

# XlPivotFilterType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

应用的筛选器的类型。

名称名称 值值 说明说明 xlBefore 31 筛选早于指定日期的所有日期 xlBeforeOrEqualTo 32 筛选等于或早于指定日期的所有日期 xlAfter 33 筛选迟于指定日期的所有日期 xlAfterOrEqualTo 34 筛选等于或迟于指定日期的所有日期 xlAllDatesInPeriodJanuary 53 筛选一月的所有日期 xlAllDatesInPeriodFebruary 54 筛选二月的所有日期 xlAllDatesInPeriodMarch 55 筛选三月的所有日期 xlAllDatesInPeriodApril 56 筛选四月的所有日期 xlAllDatesInPeriodMay 57 筛选五月的所有日期 xlAllDatesInPeriodJune 58 筛选六月的所有日期 xlAllDatesInPeriodJuly 59 筛选七月的所有日期 xlAllDatesInPeriodAugust 60 筛选八月的所有日期 xlAllDatesInPeriodSeptember 61 筛选九月的所有日期 xlAllDatesInPeriodOctober 62 筛选十月的所有日期 xlAllDatesInPeriodNovember 63 筛选十一月的所有日期 xlAllDatesInPeriodDecember 64 筛选十二月的所有日期 xlAllDatesInPeriodQuarter1 49 筛选第一季度中的所有日期 xlAllDatesInPeriodQuarter2 50 筛选第二季度中的所有日期 xlAllDatesInPeriodQuarter3 51 筛选第三季度中的所有日期 xlAllDatesInPeriodQuarter4 52 筛选第四季度中的所有日期 xlBottomCount 2 从列表底部筛选指定数量的值

xlBottomCount 2 从列表底部筛选指定数量的值 xlBottomPercent 4 从列表底部筛选指定百分比的值 xlBottomSum 6 列表底部的值的总和 xlCaptionBeginsWith 17 筛选以指定字符串开头的所有标题 xlCaptionContains 21 筛选包含指定字符串的所有标题 xlCaptionDoesNotBeginWith 18 筛选不以指定字符串开头的所有标题 xlCaptionDoesNotContain 22 筛选不包含指定字符串的所有标题 xlCaptionDoesNotEndWith 20 筛选不以指定字符串结尾的所有标题 xlCaptionDoesNotEqual 16 筛选不与指定字符串匹配的所有标题 xlCaptionEndsWith 19 筛选以指定字符串结尾的所有标题 xlCaptionEquals 15 筛选与指定字符串匹配的所有标题 xlCaptionIsBetween 27 筛选介于指定值范围内的所有标题 xlCaptionIsGreaterThan 23 筛选大于指定值的所有标题 xlCaptionIsGreaterThanOrEqualTo 24 筛选大于指定值或与指定值匹配的所有标题 xlCaptionIsLessThan 25 筛选小于指定值的所有标题 xlCaptionIsLessThanOrEqualTo 26 筛选小于指定值或与指定值匹配的所有标题 xlCaptionIsNotBetween 28 筛选不介于指定值范围内的所有标题 xlDateBetween 32 筛选介于指定日期范围内的所有日期 xlDateLastMonth 41 筛选牵涉到上个月的所有日期 xlDateLastQuarter 44 筛选牵涉到上季度的所有日期 xlDateLastWeek 38 筛选牵涉到上周的所有日期 xlDateLastYear 47 筛选牵涉到上一年的所有日期 xlDateNextMonth 39 筛选牵涉到下月的所有日期 xlDateNextQuarter 42 筛选牵涉到下季度的所有日期 xlDateNextWeek 36 筛选牵涉到下周的所有日期 xlDateNextYear 45 筛选牵涉到下一年的所有日期 xlDateThisMonth 40 筛选牵涉到本月的所有日期 xlDateThisQuarter 43 筛选牵涉到本季度的所有日期 xlDateThisWeek 37 筛选牵涉到本周的所有日期 xlDateThisYear 46 筛选牵涉到本年度的所有日期 xlDateToday 34 筛选牵涉到当前日期的所有日期 xlDateTomorrow 33 筛选牵涉到下一天的所有日期 xlDateYesterday 35 筛选牵涉到前一天的所有日期 xlNotSpecificDate 30 筛选与指定日期不匹配的所有日期 xlSpecificDate 29 筛选与指定日期匹配的所有日期 xlTopCount 1 从列表顶部筛选指定数量的值 xlTopPercent 3 从列表中筛选指定百分比的值 xlTopSum 5 列表顶部的值的总和 xlValueDoesNotEqual 8 筛选与指定值不匹配的所有值 xlValueEquals 7 筛选与指定值匹配的所有值 xlValueIsBetween 13 筛选介于指定值范围内的所有值 xlValueIsGreaterThan 9 筛选大于指定值的所有值 xlValueIsGreaterThanOrEqualTo 10 筛选大于指定值或与指定值匹配的所有值 xlValueIsLessThan 11 筛选小于指定值的所有值 xlValueIsLessThanOrEqualTo 12 筛选小于指定值或与指定值匹配的所有值 xlValueIsNotBetween 14 筛选不介于指定值范围内的所有值 xlYearToDate 48 筛选指定日期的一年内的所有值

# XlPivotFormatType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要应用于指定数据透视表的报表格式类型。

名称名称 值值 说明说明 xlPTClassic 20 数据透视表传统格式。 xlPTNone 21 不对数据透视表应用格式。 xlReport1 0 对数据透视表使用 xlReport1 格式。 xlReport10 9 对数据透视表使用 xlReport10 格式。 xlReport2 1 对数据透视表使用 xlReport2 格式。 xlReport3 2 对数据透视表使用 xlReport3 格式。 xlReport4 3 对数据透视表使用 xlReport4 格式。 xlReport5 4 对数据透视表使用 xlReport5 格式。 xlReport6 5 对数据透视表使用 xlReport6 格式。 xlReport7 6 对数据透视表使用 xlReport7 格式。 xlReport8 7 对数据透视表使用 xlReport8 格式。 xlReport9 8 对数据透视表使用 xlReport9 格式。 xlTable1 10 对数据透视表使用 xlTable1 格式。 xlTable10 19 对数据透视表使用 xlTable10 格式。 xlTable2 11 对数据透视表使用 xlTable2 格式。 xlTable3 12 对数据透视表使用 xlTable3 格式。 xlTable4 13 对数据透视表使用 xlTable4 格式。 xlTable5 14 对数据透视表使用 xlTable5 格式。 xlTable6 15 对数据透视表使用 xlTable6 格式。 xlTable7 16 对数据透视表使用 xlTable7 格式。 xlTable8 17 对数据透视表使用 xlTable8 格式。 xlTable9 18 对数据透视表使用 xlTable9 格式。

# XlPivotLineType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 PivotLine 的类型。

名称名称 值值 说明说明 xlPivotLineBlank 3 每组后的空行。 xlPivotLineGrandTotal 2 总计行。 xlPivotLineRegular 0 带有透视项目的常规 PivotLine。 xlPivotLineSubtotal 1 分类汇总行。

# XlPivotTableMissingItems 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定每个透视字段允许具有的唯一项的最大数量。

名称名称 值值 说明说明 xlMissingItemsDefault -1 允许每个透视字段具有的唯一项的默认数量。 xlMissingItemsMax 32500 ET 2007 之前的数据透视表允许每个透视字段具有的唯一项的最大数量 (32,500)。 xlMissingItemsMax2 1048576 ET 2007 之前的数据透视表允许每个透视字段具有的唯一项的最大数量 (10,48,576)。 xlMissingItemsNone 0 每个透视表中不允许具有唯一项（零）。

# XlPivotTableSourceType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定报告数据源。

名称名称 值值 说明说明 xlConsolidation 3 多重合并计算数据区域。 xlDatabase 1 ET 列表或数据库。 xlExternal 2 其他应用程序中的数据。 xlPivotTable -4148 与另一数据透视表相同来源。 xlScenario 4 数据基于使用方案管理器创建的方案。

# XlPivotTableVersionList 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据透视表或数据透视表缓存的版本。创建特定版本的数据透视表可确保在 中创建的表的行为方式与它们

在 ET 的相应版本中的行为方式相同。

注释注释 xlPivotTableVersionCurrent 仅出于向后兼容性的原因而包含在内。它不能与新的 PivotCache 和 PivotTable 对象一起使 用。xlPivotTableVersion11 和 xlPivotTableVersion10 之间的行为并无差异。

注释注释 xlPivotTableVersionCurrent 仅出于向后兼容性的原因而包含在内。它不能与新的 PivotCache 和 PivotTable 对象一起使 用。xlPivotTableVersion11 和 xlPivotTableVersion10 之间的行为并无差异。

名称名称 值值 说明说明 xlPivotTableVersion2000 0 ET 2000 xlPivotTableVersion10 1 ET 2002 xlPivotTableVersion11 2 ET 2003 xlPivotTableVersion12 3 ET 2007 xlPivotTableVersion14 4 ET 2010 xlPivotTableVersionCurrent -1 仅为向后兼容性而提供

# XlPlacement 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象附加到其下层单元格的方式。

名称名称 值值 说明说明 xlFreeFloating 3 对象自由浮动。 xlMove 2 对象随单元格移动。 xlMoveAndSize 1 对象随单元格移动和调整大小。

# XlPlatform 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定生成文本文件的平台。

名称名称 值值 说明说明 xlMacintosh 1 Macintosh xlMSDOS 3 MS-DOS xlWindows 2 Microsoft Windows

# XlPortugueseReform 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定葡萄牙语拼写检查模式。

名称名称 值值 说明说明 xlPortugueseBoth 3 拼写检查器识别前期修订和后期修订拼写。 xlPortuguesePostReform 2 拼写检查器只识别后期修订拼写。 xlPortuguesePreReform 1 拼写检查器只识别前期修订拼写。

# XlPrintErrors 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定显示的打印错误的类型。

名称名称 值值 说明说明 xlPrintErrorsBlank 1 打印错误为空白。 xlPrintErrorsDash 2 打印错误显示为划线。 xlPrintErrorsDisplayed 0 显示全部打印错误。 xlPrintErrorsNA 3 打印错误显示为不可用。

# XlPrintLocation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定表中批注的打印方式。

名称名称 值值 说明说明 xlPrintInPlace 16 批注打印在其插入工作表的位置。 xlPrintNoComments -4142 不打印批注。 xlPrintSheetEnd 1 批注打印为工作表末尾的尾注。

# XlPriority 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 SendMailer 消息的优先级。

名称名称 值值 说明说明 xlPriorityHigh -4127 高 xlPriorityLow -4134 低 xlPriorityNormal -4143 中

# XlPropertyDisplayedIn 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定显示属性的位置。

名称名称 值值 说明说明 xlDisplayPropertyInPivotTable 1 只在数据透视表中显示成员属性。这是默认值。 xlDisplayPropertyInPivotTableAndTooltip 3 只在工具提示中显示成员属性。 xlDisplayPropertyInTooltip 2 同时在工具提示和数据透视表中显示成员属性。

# XlProtectedViewCloseReason 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定如何关闭“受保护的视图受保护的视图”窗口。

名称名称 值值 说明说明 xlProtectedViewCloseEdit 1 窗口在用户单击“启用编辑启用编辑 ”按钮时关闭。 xlProtectedViewCloseForced 2 窗口由于应用程序强制将其关闭或停止响应而关闭。 xlProtectedViewCloseNormal 0 窗口正常关闭。

# XlProtectedViewWindowState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成 指定“受保护的视图受保护的视图”窗口的状态。

名称名称 值值 说明说明 xlProtectedViewWindowMaximized 2 最大化 xlProtectedViewWindowMinimized 1 最小化 xlProtectedViewWindowNormal 0 正常

# XlPTSelectionMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在结构化选择过程中可以在数据透视表中选择的内容。这些常数可以进行组合以选择多个类型。

名称名称 值值 说明说明 xlBlanks 4 空值 xlButton 15 按钮 xlDataAndLabel 0 数据和标签 xlDataOnly 2 数据 xlFirstRow 256 第一行 xlLabelOnly 1 标签 xlOrigin 3 原点

# XlQueryType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 ET 在填充查询表或数据透视表缓存时所使用的查询类型。

名称名称 值值 说明说明 xlADORecordset 7 基于 ADO 记录集查询 xlDAORecordset 2 基于 DAO 记录集查询，只用于查询表 xlODBCQuery 1 基于 ODBC 数据源 xlOLEDBQuery 5 基于 OLE DB 查询，包括 OLAP 数据源 xlTextImport 6 基于文本文件，仅用于查询表 xlWebQuery 4 基于网页，仅用于查询表

# XlRangeAutoFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定自动设置区域格式时的预定义格式。

名称名称 值值 说明说明 xlRangeAutoFormat3DEffects1 13 三维效果 1。 xlRangeAutoFormat3DEffects2 14 三维效果 2。 xlRangeAutoFormatAccounting1 4 会计 1。 xlRangeAutoFormatAccounting2 5 会计 2。 xlRangeAutoFormatAccounting3 6 会计 3。 xlRangeAutoFormatAccounting4 17 会计 4。 xlRangeAutoFormatClassic1 1 古典 1。 xlRangeAutoFormatClassic2 2 古典 2。 xlRangeAutoFormatClassic3 3 古典 3。 xlRangeAutoFormatClassicPivotTable 31 传统数据透视表。 xlRangeAutoFormatColor1 7 彩色 1。 xlRangeAutoFormatColor2 8 彩色 2。 xlRangeAutoFormatColor3 9 彩色 3。 xlRangeAutoFormatList1 10 列表 1。 xlRangeAutoFormatList2 11 列表 2。 xlRangeAutoFormatList3 12 列表 3。 xlRangeAutoFormatLocalFormat1 15 本地格式 1。 xlRangeAutoFormatLocalFormat2 16 本地格式 2。 xlRangeAutoFormatLocalFormat3 19 本地格式 3。 xlRangeAutoFormatLocalFormat4 20 本地格式 4。 xlRangeAutoFormatNone -4142 无指定格式。 xlRangeAutoFormatPTNone 42 无指定数据透视表格式。 xlRangeAutoFormatReport1 21 报表 1。 xlRangeAutoFormatReport10 30 报表 10。 xlRangeAutoFormatReport2 22 报表 2。 xlRangeAutoFormatReport3 23 报表 3。 xlRangeAutoFormatReport4 24 报表 4。 xlRangeAutoFormatReport5 25 报表 5。 xlRangeAutoFormatReport6 26 报表 6。 xlRangeAutoFormatReport7 27 报表 7。 xlRangeAutoFormatReport8 28 报表 8。 xlRangeAutoFormatReport9 29 报表 9。 xlRangeAutoFormatSimple -4154 简单。 xlRangeAutoFormatTable1 32 表 1。 xlRangeAutoFormatTable10 41 表 10。 xlRangeAutoFormatTable2 33 表 2。 xlRangeAutoFormatTable3 34 表 3。 xlRangeAutoFormatTable4 35 表 4。 xlRangeAutoFormatTable5 36 表 5。 xlRangeAutoFormatTable6 37 表 6。 xlRangeAutoFormatTable7 38 表 7。 xlRangeAutoFormatTable8 39 表 8。 xlRangeAutoFormatTable9 40 表 9。

# XlRangeValueDataType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定区域值数据类型。

名称名称 值值 说明说明 默认值。如果指定的 Range 对象为空，则返回值 Empty（可用 IsEmpty 函数测试 xlRangeValueDefault 10这种情况）。如果 Range 对象包含多个单元格，则返回值的数组（可用 IsArray 函数测试这种情况）。 xlRangeValueMSPersistXML 12 以 XML 格式返回指定的 Range 对象的记录集表示形式。 xlRangeValueXMLSpreadsheet 11 以 XML 电子表格格式返回指定的 Range 对象的值、格式、公式和名称。

# XlReadingOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定读取指定对象的顺序。

名称名称 值值 说明说明 xlContext -5002 根据上下文。 xlLTR -5003 从左向右。 xlRTL -5004 从右向左。

# XlReferenceStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定引用样式。

名称名称 值值 说明说明 xlA1 1 默认值。使用 xlA1 返回 A1 样式的引用。 xlR1C1 -4150 使用 xlR1C1 返回 R1C1 样式的引用。

# XlReferenceType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定转换公式时的单元格引用样式。

名称名称 值值 说明说明 xlAbsolute 1 转换为绝对行和列样式。 xlAbsRowRelColumn 2 转换为绝对行和相对列样式。 xlRelative 4 转换为相对行和列样式。 xlRelRowAbsColumn 3 转换为相对行和绝对列样式。

# XlRemoveDocInfoType 枚举枚举

# XlRemoveDocInfoType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要从文档信息中删除的类型信息。

名称名称 值值 说明说明 xlRDIAll 99 删除所有文档信息。 xlRDIComments 1 从文档信息中删除批注。 xlRDIContentType 16 从文档信息中删除内容类型数据。 xlRDIDefinedNameComments 18 从文档信息中删除定义的名称批注。 xlRDIDocumentManagementPolicy 15 从文档信息中删除文档管理策略数据。 xlRDIDocumentProperties 8 从文档信息中删除文档属性。 xlRDIDocumentServerProperties 14 从文档信息中删除服务器属性。 xlRDIDocumentWorkspace 10 从文档信息中删除工作空间数据。 xlRDIEmailHeader 5 从文档信息中删除电子邮件头。 xlRDIInactiveDataConnections 19 从文档信息中删除非活动数据连接数据。 xlRDIInkAnnotations 11 从文档信息中删除墨迹注释。 xlRDIPrinterPath 20 从文档信息中删除指针路径。 xlRDIPublishInfo 13 从文档信息中删除发布信息数据。 xlRDIRemovePersonalInformation 4 从文档信息中删除个人信息。 xlRDIRoutingSlip 6 从文档信息中删除传送名单信息。 xlRDIScenarioComments 12 从文档信息中删除方案批注。 xlRDISendForReview 7 从文档信息中删除请求审阅信息。

# XlRgbColor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 RGB 颜色。

名称名称 值值 说明说明 xlAliceBlue 16775408 艾莉斯蓝 xlAntiqueWhite 14150650 古董白 xlAqua 16776960 水绿色 xlAquamarine 13959039 玉色 xlAzure 16777200 蔚蓝色 xlBeige 14480885 米色 xlBisque 12903679 乳黄色 xlBlack 0 黑色 xlBlanchedAlmond 13495295 杏仁白 xlBlue 16711680 蓝色 xlBlueViolet 14822282 蓝紫色 xlBrown 2763429 褐色 xlBurlyWood 8894686 原木色 xlCadetBlue 10526303 军队蓝 xlChartreuse 65407 浅黄绿色 xlCoral 5275647 珊瑚红 xlCornflowerBlue 15570276 藏蓝色 xlCornsilk 14481663 玉米黄

xlCornsilk 14481663 玉米黄 xlCrimson 3937500 暗红色 xlDarkBlue 9109504 深蓝色 xlDarkCyan 9145088 深青色 xlDarkGoldenrod 755384 深金黄色 xlDarkGray 11119017 深灰色 xlDarkGreen 25600 深绿色 xlDarkGrey 11119017 深灰色 xlDarkKhaki 7059389 深褐色 xlDarkMagenta 9109643 深洋红色 xlDarkOliveGreen 3107669 深橄榄绿色 xlDarkOrange 36095 深橙色 xlDarkOrchid 13382297 深兰花色 xlDarkRed 139 深红色 xlDarkSalmon 8034025 深橙红 xlDarkSeaGreen 9419919 深海绿色 xlDarkSlateBlue 9125192 深灰蓝色 xlDarkSlateGray 5197615 深石板灰 xlDarkSlateGrey 5197615 深石板灰 xlDarkTurquoise 13749760 深青绿色 xlDarkViolet 13828244 深紫色 xlDeepPink 9639167 深粉色 xlDeepSkyBlue 16760576 深天蓝色 xlDimGray 6908265 暗灰色 xlDimGrey 6908265 暗灰色 xlDodgerBlue 16748574 宝蓝 xlFireBrick 2237106 砖红色 xlFloralWhite 15792895 花白 xlForestGreen 2263842 森林绿 xlFuchsia 16711935 紫红色 xlGainsboro 14474460 亮灰 xlGhostWhite 16775416 苍白 xlGold 55295 金色 xlGoldenrod 2139610 金黄色 xlGray 8421504 灰色 xlGreen 32768 绿色 xlGreenYellow 3145645 青黄色 xlGrey 8421504 灰色 xlHoneydew 15794160 蜜色 xlHotPink 11823615 暗粉 xlIndianRed 6053069 印度红 xlIndigo 8519755 靛蓝色 xlIvory 15794175 象牙色 xlKhaki 9234160 黄褐色 xlLavender 16443110 淡紫色 xlLavenderBlush 16118015 淡紫红色 xlLawnGreen 64636 草绿色

xlLemonChiffon 13499135 柠檬色 xlLightBlue 15128749 浅蓝色 xlLightCoral 8421616 浅珊瑚红 xlLightCyan 9145088 浅青色 xlLightGoldenrodYellow 13826810 浅金黄 xlLightGray 13882323 浅灰色 xlLightGreen 9498256 浅绿色 xlLightGrey 13882323 浅灰色 xlLightPink 12695295 浅粉色 xlLightSalmon 8036607 浅橙红 xlLightSeaGreen 11186720 浅海绿色 xlLightSkyBlue 16436871 浅天蓝色 xlLightSlateGray 10061943 浅石板灰 xlLightSlateGrey 10061943 浅石板灰 xlLightSteelBlue 14599344 浅钢蓝色 xlLightYellow 14745599 浅黄色 xlLime 65280 酸橙色 xlLimeGreen 3329330 暗黄绿色 xlLinen 15134970 亚麻布色 xlMaroon 128 褐紫红 xlMediumAquamarine 11206502 中玉色 xlMediumBlue 13434880 中蓝色 xlMediumOrchid 13850042 中兰花色 xlMediumPurple 14381203 中紫色 xlMediumSeaGreen 7451452 中海绿色 xlMediumSlateBlue 15624315 中蓝灰色 xlMediumSpringGreen 10156544 中草绿色 xlMediumTurquoise 13422920 中玉色 xlMediumVioletRed 8721863 中紫罗兰色 xlMidnightBlue 7346457 蓝黑色 xlMintCream 16449525 薄荷乳白 xlMistyRose 14804223 粉红玫瑰 xlMoccasin 11920639 鹿皮黄 xlNavajoWhite 11394815 印地安黄 xlNavy 8388608 海军蓝 xlNavyBlue 8388608 海军蓝 xlOldLace 15136253 旧布黄 xlOlive 32896 橄榄色 xlOliveDrab 2330219 暗橄榄色 xlOrange 42495 橙色 xlOrangeRed 17919 桔红色 xlOrchid 14053594 兰花 xlPaleGoldenrod 7071982 淡金黄色 xlPaleGreen 10025880 淡绿色 xlPaleTurquoise 15658671 浅青绿色 xlPaleVioletRed 9662683 浅紫红色 xlPapayaWhip 14020607 粉木瓜橙

xlPapayaWhip 14020607 粉木瓜橙 xlPeachPuff 12180223 粉桃红 xlPeru 4163021 秘鲁 xlPink 13353215 粉红色 xlPlum 14524637 青紫色 xlPowderBlue 15130800 粉蓝色 xlPurple 8388736 紫色 xlRed 255 红色 xlRosyBrown 9408444 玫瑰褐色 xlRoyalBlue 14772545 贵族蓝 xlSalmon 7504122 浅橙色 xlSandyBrown 6333684 浅褐色 xlSeaGreen 5737262 海绿色 xlSeashell 15660543 贝壳白 xlSienna 2970272 赭石 xlSilver 12632256 银白 xlSkyBlue 15453831 天蓝色 xlSlateBlue 13458026 灰蓝色 xlSlateGray 9470064 石板灰 xlSlateGrey 9470064 石板灰 xlSnow 16448255 雪白 xlSpringGreen 8388352 草绿色 xlSteelBlue 11829830 刚蓝色 xlTan 9221330 茶色 xlTeal 8421376 青色 xlThistle 14204888 蓟色 xlTomato 4678655 番茄色 xlTurquoise 13688896 青绿色 xlViolet 15631086 紫罗兰色 xlWheat 11788021 淡黄色 xlWhite 16777215 白色 xlWhiteSmoke 16119285 烟白色 xlYellow 65535 黄色 xlYellowGreen 3329434 黄绿色

# XlRobustConnect 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据透视表缓存与其数据源连接的方式。

名称名称 值值 说明说明 缓存始终使用外部源信息（由 SourceConnectionFile 或 SourceDataFile 属性定义）进行重新连 xlAlways 1 接。 xlAsRequired 0 缓存通过 Connection 属性使用外部源信息进行重新连接。 xlNever 2 缓存从不使用源信息进行重新连接。

# XlRoutingSlipDelivery 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定传送传递方法。

名称名称 值值 说明说明 xlAllAtOnce 2 同时传递给所有收件人。 xlOneAfterAnother 1 逐个传递给收件人。

# XlRoutingSlipStatus 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定传送名单的状态。

名称名称 值值 说明说明 xlNotYetRouted 0 还未发送传送名单。 xlRoutingComplete 2 完成传送。 xlRoutingInProgress 1 正在传送。

# XlRowCol 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定与特定数据系列对应的值是在行中还是在列中。

名称名称 值值 说明说明 xlColumns 2 数据系列位于行中。 xlRows 1 数据系列位于列中。

# XlRunAutoMacro 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要运行的自动宏。

名称名称 值值 说明说明 xlAutoActivate 3 Auto_Activate 宏 xlAutoClose 2 Auto_Close 宏 xlAutoDeactivate 4 Auto_Deactivate 宏 xlAutoOpen 1 Auto_Open 宏

# XlSaveAction 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

如果将保存文件，则在文件关闭过程中进行指定。

名称名称 值值 说明说明 xlDoNotSaveChanges 2 不保存更改。 xlSaveChanges 1 保存更改。

# XlSaveAsAccessMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定“另存为”函数的访问模式。

名称名称 值值 说明说明 xlExclusive 3 独占模式 xlNoChange 1 默认值（不更改访问模式） xlShared 2 共享列表

# XlSaveConflictResolution 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定更新共享工作簿时解决冲突的方式。

名称名称 值值 说明说明 xlLocalSessionChanges 2 总是接受本地用户所做的更改。 xlOtherSessionChanges 3 总是拒绝本地用户所做的更改。 xlUserResolution 1 弹出对话框请求用户解决冲突。

# XlScaleType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数值轴的刻度类型。

名称名称 值值 说明说明 xlScaleLinear -4132 线性刻度。 xlScaleLogarithmic -4133 对数刻度。

# XlSearchDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定搜索区域时的搜索方向。

名称名称 值值 说明说明 xlNext 1 在区域中搜索下一匹配值。 xlPrevious 2 在区域中搜索上一匹配值。

# XlSearchOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定搜索区域的次序。

名称名称 值值 说明说明 xlByColumns 2 向下搜索列，然后移到下一列。 xlByRows 1 搜索行，然后移到下一行。

# XlSearchWithin 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定区域的搜索范围。

名称名称 值值 说明说明 xlWithinSheet 1 将搜索限制在当前工作表。 xlWithinWorkbook 2 搜索整个工作簿。

# XlSheetType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定工作表类型。

名称名称 值值 说明说明 xlChart -4109 图表 xlDialogSheet -4116 对话框工作表 xlExcel4IntlMacroSheet 4 ET 版本 4 国际宏工作表 xlExcel4MacroSheet 3 ET 版本 4 宏工作表 xlWorksheet -4167 工作表

# XlSheetVisibility 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象是否可见。

名称名称 值值 说明说明 xlSheetHidden 0 隐藏工作表，用户可以通过菜单取消隐藏。 隐藏对象，以便使对象重新可见的唯一方法是将此属性设置为 True（用户无法使该对象可 xlSheetVeryHidden 2 见）。 xlSheetVisible -1 显示工作表。

# XlSizeRepresents 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定气泡图上气泡大小表示的内容。

名称名称 值值 说明说明 xlSizeIsArea 1 气泡的面积。 xlSizeIsWidth 2 气泡的宽度。

# XlSlicerCrossFilterType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定由指定的切片器缓存所使用的交叉筛选类型以及显示方式。

名称名称 值值 说明说明

为此切片器缓存开启交叉筛选，对于连接到同一数据源的其他切片 xlSlicerCrossFilterShowItemsWithDataAtTop 2器中的筛选选择，没有数据的任何平铺都将变灰。此外，有数据的 平铺将移到切片器的顶部。（默认）

为此切片器缓存开启交叉筛选，对于连接到同一数据源的其他切片 xlSlicerCrossFilterShowItemsWithNoData 3 器中的筛选选择，没有数据的任何平铺都将变灰。

完全关闭交叉筛选，因此，无论其他切片器中的筛选选择如何，所 xlSlicerNoCrossFilter 1 有平铺都将显示，并处于活动状态（未变灰）。

# XlSlicerSort 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在切片器中显示的项是否排序，如果排序，则是按项标题升序还是降序排序。

名称名称 值值 说明说明 xlSlicerSortAscending 2 切片器项按项标题升序排序。 xlSlicerSortDataSourceOrder 1 切片器项按数据源提供的顺序显示。 xlSlicerSortDescending 3 切片器项按项标题降序排序。

# XlSmartTagControlType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定“文档操作文档操作”任务窗格中显示的智能文档控件的类型。

注释注释

此对象或成员已弃用，但为了向后兼容，仍作为对象模型的一部分保留。在新应用程序中，不应使用该对象或成员。

注释注释

此对象或成员已弃用，但为了向后兼容，仍作为对象模型的一部分保留。在新应用程序中，不应使用该对象或成员。

名称名称 值值 说明说明 xlSmartTagControlActiveX 13 ActiveX 控件。 xlSmartTagControlButton 6 按钮。 xlSmartTagControlCheckbox 9 复选框。 xlSmartTagControlCombo 12 组合框。 xlSmartTagControlHelp 3 帮助文字。 xlSmartTagControlHelpURL 4 帮助文件的绝对 URL。 xlSmartTagControlImage 8 图像。 xlSmartTagControlLabel 7 标签。 xlSmartTagControlLink 2 链接。 xlSmartTagControlListbox 11 列表框。 xlSmartTagControlRadioGroup 14 单选按钮（选项按钮）组。 xlSmartTagControlSeparator 5 分隔符。 xlSmartTagControlSmartTag 1 智能标记。 xlSmartTagControlTextbox 10 文本框。

# XlSmartTagDisplayMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定智能标记的显示功能。

注释注释

此对象或成员已弃用，但为了向后兼容，仍作为对象模型的一部分保留。在新应用程序中，不应使用该对象或成员。

注释注释

此对象或成员已弃用，但为了向后兼容，仍作为对象模型的一部分保留。在新应用程序中，不应使用该对象或成员。

名称名称 值值 说明说明 xlButtonOnly 2 只显示智能标记的按钮。 xlDisplayNone 1 不显示智能标记的任何内容。 xlIndicatorAndButton 0 显示智能标记的指示符和按钮。

# XlSortDataOption 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定文本的排序方式。

名称名称 值值 说明说明 xlSortNormal 0 默认值。分别对数字和文本数据进行排序。 xlSortTextAsNumbers 1 将文本作为数字型数据进行排序。

# XlSortMethod 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定排序类型。

名称名称 值值 说明说明 xlPinYin 1 按字符的汉语拼音顺序排序。这是默认值。 xlStroke 2 按每个字符的笔划数排序。

# XlSortMethodOld 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在使用中文排序方法时如何排序。

名称名称 值值 说明说明 xlCodePage 2 按代码页排序。 xlSyllabary 1 按发音排序。

# XlSortOn 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定数据的排序参数。

名称名称 值值 说明说明 SortOnCellColor 1 单元格颜色。 SortOnFontColor 2 字体颜色。 SortOnIcon 3 图标。 SortOnValues 0 值。

# XlSortOrder 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

为指定字段或范围指定排序顺序。

名称名称 值值 说明说明 xlAscending 1 按升序对指定字段排序。这是默认值。 xlDescending 2 按降序对指定字段排序。

# XlSortOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定排序方向。

名称名称 值值 说明说明 xlSortColumns 1 按列排序。 xlSortRows 2 按行排序。这是默认值。

# XlSortType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要排序的元素。仅在对数据透视表排序时才使用该参数。

名称名称 值值 说明说明 xlSortLabels 2 按标签对数据透视表排序。 xlSortValues 1 按值对数据透视表排序。

# XlSourceType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

标识源对象。

名称名称 值值 说明说明 xlSourceAutoFilter 3 “自动筛选”区域 xlSourceChart 5 图表 xlSourcePivotTable 6 数据透视表 xlSourcePrintArea 2 选定的用于打印的单元格区域 xlSourceQuery 7 查询表（外部数据区域） xlSourceRange 4 单元格区域 xlSourceSheet 1 整张工作表 xlSourceWorkbook 0 工作簿

# XlSpanishModes 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定西班牙语拼写检查模式。

名称名称 值值 说明说明 xlSpanishTuteoAndVoseo 1 Tuteo 和 Voseo 动词形式。 xlSpanishTuteoOnly 0 仅 Tuteo 动词形式。 xlSpanishVoseoOnly 2 仅 Voseo 动词形式。

# XlSparklineRowCol 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定当迷你图所基于的数据处于方形区域中时如何绘制迷你图。

名称名称 值值 说明说明 SparklineColumnsSquare 2 按列绘制数据。 SparklineNonSquare 0 迷你图不绑定到方形区域中的数据。 SparklineRowsSquare 1 按行绘制数据。

# XlSparkScale 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定迷你图垂直轴的最小值或最大值如何相对于组中的其他迷你图按比例缩放。

名称名称 值值 说明说明 xlSparkScaleCustom 3 迷你图垂直轴的最小值或最大值具有用户定义值。 xlSparkScaleGroup 1 组中所有迷你图垂直轴的最小值或最大值相同。 xlSparkScaleSingle 2 组中每个迷你图的垂直轴的最小值或最大值自动设置为其自己的计算值。

# XlSparkType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定迷你图的类型。

名称名称 值值 说明说明 xlSparkColumn 2 柱形图迷你图。 xlSparkColumnStacked100 3 盈亏图表迷你图。 xlSparkLine 1 折线图迷你图。

# XlSpeakDirection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定朗读单元格的顺序。

名称名称 值值 说明说明 xlSpeakByColumns 1 在一列上向下朗读，然后移至下一列继续朗读。 xlSpeakByRows 0 先朗读一行，然后移至下一行继续朗读。

# XlSpecialCellsValue 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定结果中包括具有特定类型值的单元格。

名称名称 值值 说明说明 xlErrors 16 有错误的单元格。 xlLogical 4 具有逻辑值的单元格。 xlNumbers 1 具有数值的单元格。 xlTextValues 2 具有文本的单元格。

# XlStdColorScale 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定标准色阶。

名称名称 值值 说明说明 ColorScaleBlackWhite 3 下白上黑。 ColorScaleGYR 2 GYR。 ColorScaleRYG 1 RYG。 ColorScaleWhiteBlack 4 下黑上白。

# XlSubscribeToFormat 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定订阅发布版本时所用的格式。

名称名称 值值 说明说明 xlSubscribeToPicture -4147 图片 xlSubscribeToText -4158 文本

# XlSubtototalLocationType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定分类汇总在工作表上的显示位置。

名称名称 值值 说明说明 xlAtBottom 2 分类汇总在底部。 xlAtTop 1 分类汇总在顶部。

# XlSummaryColumn 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定汇总列在大纲中的位置。

名称名称 值值 说明说明 xlSummaryOnLeft -4131 汇总列在大纲中位于明细数据列的左侧。 xlSummaryOnRight -4152 汇总列在大纲中位于明细数据列的右侧。

# XlSummaryReportType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定为方案创建的汇总类型。

名称名称 值值 说明说明 xlStandardSummary 1 并排列出方案。 xlSummaryPivotTable -4148 在数据透视表中显示方案。

# XlSummaryRow 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定汇总行在大纲中的位置。

名称名称 值值 说明说明 xlSummaryAbove 0 汇总行在大纲中位于明细数据行的上方。 xlSummaryBelow 1 汇总行在大纲中位于明细数据行的下方。

# XlTableStyleElementType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所用的表样式元素。

名称名称 值值 说明说明 xlBlankRow 19 空白行 xlColumnStripe1 7 列条纹 1 xlColumnStripe2 8 列条纹 2 xlColumnSubheading1 20 列副标题 1 xlColumnSubheading2 21 列副标题 2 xlColumnSubheading3 22 列副标题 3 xlFirstColumn 3 第一列 xlFirstHeaderCell 9 第一个标题单元格 xlFirstTotalCell 11 第一个汇总单元格 xlGrandTotalColumn 4 总计列 xlGrandTotalRow 2 总计行 xlHeaderRow 1 标题行 xlLastColumn 4 最后一列 xlLastHeaderCell 10 最后一个标题单元格 xlLastTotalCell 12 最后一个总计单元格 xlPageFieldLabels 26 页面字段标签 xlPageFieldValues 27 页面字段值 xlRowStripe1 5 行条纹 1 xlRowStripe2 6 行条纹 2 xlRowSubheading1 23 行副标题 1 xlRowSubheading2 24 行副标题 2 xlRowSubheading3 25 行副标题 3 xlSlicerHoveredSelectedItemWithData 33 用户悬停在上面且包含数据的选定项。 xlSlicerHoveredSelectedItemWithNoData 35 用户悬停在上面且不包含数据的选定项。 xlSlicerHoveredUnselectedItemWithData 32 用户悬停在上面，未选定且包含数据的项。 xlSlicerHoveredUnselectedItemWithNoData 34 用户悬停在上面，未选定且不包含数据的项。 xlSlicerSelectedItemWithData 30 包含数据的选定项。 xlSlicerSelectedItemWithNoData 31 不包含数据的选定项。 xlSlicerUnselectedItemWithData 28 未选定且包含数据的项。 xlSlicerUnselectedItemWithNoData 29 未选定且不包含数据的项。 xlSubtotalColumn1 13 分类汇总列 1 xlSubtotalColumn2 14 分类汇总列 2 xlSubtotalColumn3 15 分类汇总列 3 xlSubtotalRow1 16 分类汇总行 1 xlSubtotalRow2 17 分类汇总行 2 xlSubtotalRow3 18 分类汇总行 3 xlTotalRow 2 汇总行 xlWholeTable 0 整个表

# XlTabPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定第一个或最后一个制表位位置。

名称名称 值值 说明说明 xlTabPositionFirst 0 第一个制表位位置。 xlTabPositionLast 1 最后一个制表位位置。

# XlTextParsingType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要导入查询表的文本文件中数据的列格式。

名称名称 值值 说明说明 xlDelimited 1 默认值。指示文件由分隔符分隔。 xlFixedWidth 2 指示将文件中的数据排列在固定宽度的列中。

# XlTextQualifier 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定用于指定文本的分隔符。

名称名称 值值 说明说明 xlTextQualifierDoubleQuote 1 双引号 (")。 xlTextQualifierNone -4142 无分隔符。 xlTextQualifierSingleQuote 2 单引号 (')。

# XlTextVisualLayoutType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定所导入文本的可视布局是从左向右还是从右向左。

名称名称 值值 说明说明 xlTextVisualLTR 1 从左向右 xlTextVisualRTL 2 从右向左

# XlThemeColor 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的主题颜色。

名称名称 值值 说明说明 xlThemeColorAccent1 5 强调文字颜色 1 xlThemeColorAccent2 6 强调文字颜色 2 xlThemeColorAccent3 7 强调文字颜色 3 xlThemeColorAccent4 8 强调文字颜色 4 xlThemeColorAccent5 9 强调文字颜色 5 xlThemeColorAccent6 10 强调文字颜色 6 xlThemeColorDark1 1 深色 1 xlThemeColorDark2 3 深色 2 xlThemeColorFollowedHyperlink 12 已访问的超链接 xlThemeColorHyperlink 11 超链接 xlThemeColorLight1 2 浅色 1 xlThemeColorLight2 4 浅色 2

# XlThemeFont 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要使用的主题字体。

名称名称 值值 说明说明 xlThemeFontMajor 2 主要。 xlThemeFontMinor 1 次要。 xlThemeFontNone 0 不使用任何主题字体。

# XlThreadMode 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定多线程计算模式的控制方式。

名称名称 值值 说明说明 xlThreadModeAutomatic 0 多线程计算模式是自动的。 xlThreadModeManual 1 多线程计算模式是手动的。

# XlTickLabelOrientation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定刻度线标签的文本方向。

名称名称 值值 说明说明 xlTickLabelOrientationAutomatic -4105 文本方向由 WPS 设置。 xlTickLabelOrientationDownward -4170 文本向下排列。 xlTickLabelOrientationHorizontal -4128 字符水平排列。 xlTickLabelOrientationUpward -4171 文本向上排列。 xlTickLabelOrientationVertical -4166 字符垂直排列。

# XlTickLabelPosition 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

在指定坐标轴上指定刻度线标签的位置。

名称名称 值值 说明说明 xlTickLabelPositionHigh -4127 图表的顶部或右侧。 xlTickLabelPositionLow -4134 图表的底部或左侧。 xlTickLabelPositionNextToAxis 4 坐标轴旁边（其中坐标轴不在图表的任意一侧）。 xlTickLabelPositionNone -4142 无刻度线。

# XlTickMark 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定坐标轴的主要和次要刻度线标志的位置。

名称名称 值值 说明说明 xlTickMarkCross 4 跨坐标轴。 xlTickMarkInside 2 在坐标轴内。 xlTickMarkNone -4142 无刻度线。 xlTickMarkOutside 3 在坐标轴外。

# XlTimePeriods 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定时间段。

名称名称 值值 说明说明 xlLast7Days 2 过去 7 天 xlLastMonth 5 上月 xlLastWeek 4 上周 xlNextMonth 8 下月 xlNextWeek 7 下周 xlThisMonth 9 本月 xlThisWeek 3 本周 xlToday 0 今天 xlTomorrow 6 明天 xlYesterday 1 昨天

# XlTimeUnit 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表轴和数据系列的时间单位。

名称名称 值值 说明说明 xlDays 0 Days xlMonths 1 月 xlYears 2 年

# XlToolbarProtection 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定工具栏的哪些属性受到限制。可用 Or 组合选项。

名称名称 值值 说明说明 xlNoButtonChanges 1 不允许按钮更改。 xlNoChanges 4 无任何类型的更改。 xlNoDockingChanges 3 无对工具栏固定位置的更改。 xlNoShapeChanges 2 无对工具栏形状的更改。 xlToolbarProtectionNone -4143 允许任何更改。

# XlTopBottom 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定值系列的前 10 个或后 10 个值。

名称名称 值值 说明说明 xlTop10Bottom 0 后 10 个值 xlTop10Top 1 前 10 个值

# XlTotalsCalculation 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定列表列的汇总行中的计算类型。

名称名称 值值 说明说明 xlTotalsCalculationAverage 2 平均 xlTotalsCalculationCount 3 对非空单元格进行计数 xlTotalsCalculationCountNums 4 对数值单元格进行计数 xlTotalsCalculationCustom 9 自定义计算 xlTotalsCalculationMax 6 列表中的最大值 xlTotalsCalculationMin 5 列表中的最小值 xlTotalsCalculationNone 0 无计算 xlTotalsCalculationStdDev 7 标准偏差值 xlTotalsCalculationSum 1 列表列中所有值的和 xlTotalsCalculationVar 8 变量

# XlTrendlineType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定如何计算平滑处理数据中微小波动的趋势线。

名称名称 值值 说明说明 xlExponential 5 使用公式（如 y=ab^x）计算数据点的最小平方拟合值。 - xlLinear 使用线性公式 y = mx + b 计算数据点的最小平方拟合值。

- xlLogarithmic 使用公式 y = c ln x + b 计算数据点的最小平方拟合值。

使用通过数据系列中某些部分计算出的一系列平均值。数据点个数等于数据系列中数据点的总数减 xlMovingAvg 6 去为周期指定的数值。 xlPolynomial 3 使用公式（如 y = ax^6 + bx^5 + cx^4 + dx^3 + ex^2 + fx + g）计算数据点的最小平方拟合值。 xlPower 4 使用公式（如 y = ax^b）计算数据点的最小平方拟合值。

# XlUnderlineStyle 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定应用于字体的下划线类型。

名称名称 值值 说明说明 xlUnderlineStyleDouble -4119 粗双下划线。 xlUnderlineStyleDoubleAccounting 5 彼此靠近的两条细下划线。 xlUnderlineStyleNone -4142 无下划线。 xlUnderlineStyleSingle 2 单下划线。 xlUnderlineStyleSingleAccounting 4 不支持。

# XlUpdateLinks 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定工作簿用于更新嵌入式 OLE 链接的设置。

名称名称 值值 说明说明 xlUpdateLinksAlways 3 始终更新指定工作簿的嵌入式 OLE 链接。 xlUpdateLinksNever 2 从不更新指定工作簿的嵌入式 OLE 链接。 xlUpdateLinksUserSetting 1 按照用户对指定工作簿的设置，更新嵌入式 OLE 链接。

# XlVAlign 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定对象的垂直对齐方式。

名称名称 值值 说明说明 xlVAlignBottom -4107 底端对齐。 xlVAlignCenter -4108 居中对齐。 xlVAlignDistributed -4117 分散对齐。 xlVAlignJustify -4130 两端对齐。 xlVAlignTop -4160 顶部对齐。

# XlWBATemplate 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定要创建的工作簿的类型。新工作簿包含单个指定类型的工作表。

名称名称 值值 说明说明 xlWBATChart -4109 图表 xlWBATExcel4IntlMacroSheet 4 ET 版本 4 宏 xlWBATExcel4MacroSheet 3 ET 版本 4 国际宏 xlWBATWorksheet -4167 工作表

# XlWebFormatting 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定将网页导入查询表时应用网页格式（如果有）的程度。

名称名称 值值 说明说明 xlWebFormattingAll 1 导入所有格式。 xlWebFormattingNone 3 不导入任何格式。 xlWebFormattingRTF 2 导入与 RTF 格式兼容的格式。

# XlWebSelectionType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定是将整个网页、网页上的所有表还是特定表导入查询表。

名称名称 值值 说明说明 xlAllTables 2 所有表 xlEntirePage 1 整页 xlSpecifiedTables 3 指定表

# XlWindowState 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定窗口的状态。

名称名称 值值 说明说明 xlMaximized -4137 最大化 xlMinimized -4140 最小化 xlNormal -4143 正常

# XlWindowType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定图表的显示方式。

名称名称 值值 说明说明 xlChartAsWindow 5 图表将在新窗口中打开。 xlChartInPlace 4 图表将在当前工作表中显示。 xlClipboard 3 将图表复制到剪贴板。 xlInfo -4129 已放弃使用此常量。 xlWorkbook 1 此常量只适用于 Macintosh。

# XlWindowView 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定窗口中显示的视图。

名称名称 值值 说明说明 xlNormalView 1 普通。 xlPageBreakPreview 2 分页预览。 xlPageLayoutView 3 页面视图。

# XlXLMMacroType 枚举枚举

# XlXLMMacroType 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定在 ET 版本 4 宏工作表中，名称引用哪种宏，或名称是否引用宏。

名称名称 值值 说明说明 xlCommand 2 自定义命令。 xlFunction 1 自定义函数。 xlNotXLM 3 非宏。

# XlXmlExportResult 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定保存或导出操作的结果。

名称名称 值值 说明说明 xlXmlExportSuccess 0 XML 数据文件已成功导出。 xlXmlExportValidationFailed 1 XML 数据文件的内容不符合指定的架构映射。

# XlXmlImportResult 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定刷新或导入操作的结果。

名称名称 值值 说明说明 xlXmlImportElementsTruncated 1 由于指定的 XML 数据文件对于工作表来说太大，因此其内容已被截断。 xlXmlImportSuccess 0 XML 数据文件已成功导入。 xlXmlImportValidationFailed 2 XML 数据文件的内容不符合指定的架构映射。

# XlXmlLoadOption 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定 ET 打开 XML 数据文件的方式。

名称名称 值值 说明说明 xlXmlLoadImportToList 2 将 XML 数据文件的内容置于 XML 表中。 xlXmlLoadMapXml 3 在“XML 结构结构 ”任务窗格中显示 XML 数据文件的架构。 xlXmlLoadOpenXml 1 打开 XML 数据文件。文件的内容将展开。 xlXmlLoadPromptUser 0 提示用户选择打开文件的方式。

# XlYesNoGuess 枚举枚举

本文档由公众号【Excel催化剂】整理制作完成

指定第一行是否包含标题。不能在对数据透视表进行排序时使用。

名称名称 值值 说明说明 xlGuess 0 ET 确定是否有标题，如果有，是否是一个。 xlNo 2 默认值。应对整个区域进行排序。 xlYes 1 不应对整个区域进行排序。