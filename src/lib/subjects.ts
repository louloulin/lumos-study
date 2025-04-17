// 学科类型定义
export interface Topic {
  id: string;
  title: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  content?: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

// 学科数据
const subjects: Subject[] = [
  {
    id: 'math',
    name: '数学',
    description: '包括代数、几何、微积分等数学学科',
    icon: '📐',
    color: 'bg-blue-100 text-blue-800',
    topics: [
      {
        id: 'algebra',
        title: '代数',
        description: '学习代数基础、方程式和函数',
        level: 'basic',
        content: `
# 代数基础

代数是数学的一个分支，它使用字母和符号来表示数字和数量之间的关系。

## 基本概念

### 变量和常量

- **变量**：用字母表示的未知数或可变数量，通常用 x, y, z 等表示
- **常量**：固定的数值，如 2, 3, π 等

### 代数表达式

代数表达式是由变量、常量和运算符组成的式子，例如：
- 2x + 3
- y² - 5y + 6
- 3(a + b)

### 方程

方程是含有未知数的等式，例如：
- x + 5 = 12
- 2y - 3 = 7
- 3z² = 27

## 一次方程

一次方程是指未知数的最高次数为 1 的方程，一般形式为 ax + b = 0（a ≠ 0）。

### 解一次方程的步骤

1. 移项：将含有未知数的项移到等式一边，常数项移到另一边
2. 合并同类项
3. 系数化为 1：两边同时除以未知数的系数

### 例题

求解方程：2x + 7 = 15

**解：**
2x + 7 = 15
2x = 15 - 7
2x = 8
x = 4

## 二次方程

二次方程是指未知数的最高次数为 2 的方程，一般形式为 ax² + bx + c = 0（a ≠ 0）。

### 解二次方程的方法

1. **因式分解法**：将左边的多项式因式分解，然后令每个因式等于零
2. **公式法**：使用求根公式 x = (-b ± √(b² - 4ac)) / (2a)
3. **配方法**：通过配方将方程转化为完全平方式

### 例题

求解方程：x² - 5x + 6 = 0

**解：**
x² - 5x + 6 = 0
(x - 2)(x - 3) = 0
x - 2 = 0 或 x - 3 = 0
x = 2 或 x = 3
        `,
      },
      {
        id: 'geometry',
        title: '几何',
        description: '学习平面几何和空间几何',
        level: 'intermediate',
        content: `
# 几何基础

几何学是研究形状、大小、位置和空间性质的数学分支。

## 平面几何

### 基本图形

- **点**：没有大小，只有位置的几何对象
- **线**：由点组成的一维几何对象
- **面**：由线围成的二维几何对象

### 角

角是由两条射线从同一点出发所形成的图形。

- **锐角**：小于 90° 的角
- **直角**：等于 90° 的角
- **钝角**：大于 90° 但小于 180° 的角
- **平角**：等于 180° 的角

### 三角形

三角形是由三条线段围成的平面图形。

- **按边分类**：等边三角形、等腰三角形、不等边三角形
- **按角分类**：锐角三角形、直角三角形、钝角三角形

#### 三角形的性质

1. 三角形内角和为 180°
2. 三角形外角等于与它不相邻的两个内角的和
3. 三角形任意两边之和大于第三边

### 四边形

四边形是由四条线段围成的平面图形。

- **平行四边形**：对边平行的四边形
- **矩形**：有四个直角的平行四边形
- **正方形**：四边相等且有四个直角的矩形
- **梯形**：只有一组对边平行的四边形

### 圆

圆是平面上到定点（圆心）距离相等的所有点的集合。

- **半径**：圆心到圆上任意一点的距离
- **直径**：通过圆心的弦，等于两倍半径
- **弦**：连接圆上两点的线段
- **弧**：圆上两点之间的部分

## 空间几何

### 基本立体图形

- **棱柱**：两个面是全等的多边形，其余面是矩形
- **棱锥**：一个面是多边形，其余面是三角形且有一个公共顶点
- **圆柱**：两个面是全等的圆，侧面是矩形展开的曲面
- **圆锥**：一个面是圆，侧面是由顶点到圆周的所有线段形成的曲面
- **球**：空间中到定点距离相等的所有点的集合
        `,
      },
      {
        id: 'calculus',
        title: '微积分',
        description: '学习导数、积分和微分方程',
        level: 'advanced',
      },
    ],
  },
  {
    id: 'science',
    name: '科学',
    description: '包括物理、化学、生物等科学学科',
    icon: '🔬',
    color: 'bg-green-100 text-green-800',
    topics: [
      {
        id: 'physics',
        title: '物理',
        description: '学习力学、电磁学和热力学',
        level: 'intermediate',
        content: `
# 物理基础

物理学是研究物质、能量及其相互作用的自然科学。

## 力学

### 运动学

运动学是描述物体运动而不考虑产生运动的原因的学科。

#### 位移、速度和加速度

- **位移**：物体从初始位置到终点位置的矢量
- **速度**：位移对时间的导数，表示物体运动的快慢和方向
- **加速度**：速度对时间的导数，表示速度变化的快慢和方向

#### 匀速直线运动

物体沿直线运动且速度大小不变的运动。

公式：s = vt
其中，s 是位移，v 是速度，t 是时间。

#### 匀加速直线运动

物体沿直线运动且加速度大小不变的运动。

公式：
- v = v₀ + at
- s = v₀t + ½at²
- v² = v₀² + 2as

其中，v₀ 是初速度，v 是末速度，a 是加速度，t 是时间，s 是位移。

### 动力学

动力学研究力与物体运动之间的关系。

#### 牛顿运动定律

1. **第一定律（惯性定律）**：物体在没有外力作用下，将保持静止或匀速直线运动状态
2. **第二定律**：物体加速度的大小与所受合外力成正比，与质量成反比，方向与合外力方向相同
   - F = ma
3. **第三定律**：作用力与反作用力大小相等，方向相反，作用在不同物体上

#### 重力

地球对物体的吸引力。

- F = mg
- g ≈ 9.8 m/s²

#### 摩擦力

两个接触面之间的阻碍相对运动的力。

- 静摩擦力：f_s ≤ μ_s N
- 动摩擦力：f_k = μ_k N

其中，μ_s 是静摩擦系数，μ_k 是动摩擦系数，N 是正压力。

### 功和能

#### 功

力对物体所做的功等于力与位移的点积。

- W = F·s = Fs·cosθ

#### 动能

物体由于运动而具有的能量。

- E_k = ½mv²

#### 势能

物体由于位置或状态而具有的能量。

- 重力势能：E_p = mgh
- 弹性势能：E_p = ½kx²

#### 机械能守恒定律

在只有保守力做功的系统中，机械能（动能与势能之和）保持不变。

- E_k + E_p = 常数
        `,
      },
      {
        id: 'chemistry',
        title: '化学',
        description: '学习元素、化合物和化学反应',
        level: 'intermediate',
      },
      {
        id: 'biology',
        title: '生物学',
        description: '学习细胞、遗传和生态系统',
        level: 'intermediate',
      },
    ],
  },
  {
    id: 'language',
    name: '语言',
    description: '包括中文、英语、文学等语言学科',
    icon: '📚',
    color: 'bg-yellow-100 text-yellow-800',
    topics: [
      {
        id: 'chinese',
        title: '中文',
        description: '学习中文语法、阅读和写作',
        level: 'basic',
      },
      {
        id: 'english',
        title: '英语',
        description: '学习英语语法、词汇和会话',
        level: 'basic',
        content: `
# 英语基础

英语是世界上使用最广泛的语言之一，是国际交流的重要工具。

## 语音

### 元音

英语中有 20 个元音音素，包括单元音和双元音。

#### 单元音

- /i:/ - see, me, key
- /ɪ/ - sit, in, big
- /e/ - bed, get, yes
- /æ/ - cat, hat, bad
- /ɑ:/ - car, far, heart
- /ɒ/ - hot, dog, box
- /ɔ:/ - more, door, saw
- /ʊ/ - book, good, put
- /u:/ - too, blue, food
- /ʌ/ - cup, love, come
- /ɜ:/ - bird, word, learn
- /ə/ - about, cinema, banana

#### 双元音

- /eɪ/ - day, say, play
- /aɪ/ - my, like, time
- /ɔɪ/ - boy, toy, enjoy
- /əʊ/ - go, know, show
- /aʊ/ - now, how, down
- /ɪə/ - here, near, clear
- /eə/ - there, where, chair
- /ʊə/ - pure, sure, cure

### 辅音

英语中有 24 个辅音音素。

- /p/ - pen, copy, happen
- /b/ - bad, baby, job
- /t/ - tea, getting, eight
- /d/ - day, ladder, odd
- /k/ - key, clock, school
- /g/ - get, bigger, dog
- /f/ - food, laugh, if
- /v/ - view, heavy, love
- /θ/ - thing, author, path
- /ð/ - this, other, smooth
- /s/ - soon, cease, sister
- /z/ - zero, music, roses
- /ʃ/ - ship, sure, national
- /ʒ/ - pleasure, vision
- /h/ - hot, whole, ahead
- /tʃ/ - check, church, match
- /dʒ/ - judge, age, soldier
- /m/ - more, hammer, sum
- /n/ - nice, know, funny
- /ŋ/ - ring, anger, thanks
- /l/ - light, valley, feel
- /r/ - right, sorry, arrange
- /j/ - yet, use, beauty
- /w/ - wet, one, when

## 语法

### 词类

1. **名词**：表示人、事物、地点或抽象概念的词
2. **代词**：代替名词的词
3. **动词**：表示动作或状态的词
4. **形容词**：修饰名词的词
5. **副词**：修饰动词、形容词或其他副词的词
6. **介词**：表示名词或代词与句中其他词的关系
7. **连词**：连接词、短语或句子的词
8. **感叹词**：表示强烈情感的词

### 时态

英语有 16 种时态，由时间（现在、过去、将来、过去将来）和状态（一般、进行、完成、完成进行）组合而成。

#### 常用时态

1. **一般现在时**：表示经常性、习惯性的动作或状态
   - I go to school every day.
2. **现在进行时**：表示正在进行的动作
   - I am studying English now.
3. **一般过去时**：表示过去发生的动作或状态
   - I went to Beijing last year.
4. **一般将来时**：表示将来要发生的动作或状态
   - I will go to college next year.
5. **现在完成时**：表示过去发生且与现在有关的动作或状态
   - I have lived here for three years.

### 语态

英语有两种语态：主动语态和被动语态。

- **主动语态**：主语是动作的执行者
  - The boy broke the window.
- **被动语态**：主语是动作的承受者
  - The window was broken by the boy.

### 句子结构

英语句子的基本结构是主语 + 谓语 + 宾语。

- **简单句**：只有一个主谓结构的句子
  - She reads books.
- **并列句**：由并列连词连接的两个或多个简单句
  - She reads books, and he watches TV.
- **复合句**：由主句和从句组成的句子
  - I know that she reads books.
        `,
      },
      {
        id: 'literature',
        title: '文学',
        description: '学习文学作品、文学理论和写作技巧',
        level: 'advanced',
      },
    ],
  },
  {
    id: 'humanities',
    name: '人文',
    description: '包括历史、地理、政治等人文学科',
    icon: '🌍',
    color: 'bg-purple-100 text-purple-800',
    topics: [
      {
        id: 'history',
        title: '历史',
        description: '学习中国历史和世界历史',
        level: 'intermediate',
        content: `
# 中国历史概览

中国历史悠久，文明连续，是世界上最古老的文明之一。

## 远古时期

### 史前文明

- **旧石器时代**（约 170 万年前 - 约前 8000 年）：北京猿人、山顶洞人
- **新石器时代**（约前 8000 年 - 约前 2100 年）：仰韶文化、龙山文化、河姆渡文化

### 三皇五帝

传说中的上古时期统治者，包括：
- 三皇：伏羲、神农、黄帝（或燧人、伏羲、神农）
- 五帝：黄帝、颛顼、帝喾、尧、舜

## 夏商周时期（约前 2100 年 - 前 221 年）

### 夏朝（约前 2100 年 - 前 1600 年）

- 第一个世袭制朝代
- 禹建立夏朝
- 主要依据甲骨文和考古发现

### 商朝（约前 1600 年 - 前 1046 年）

- 成熟的青铜文明
- 甲骨文的使用
- 商纣王暴政导致商朝灭亡

### 西周（前 1046 年 - 前 771 年）

- 周武王灭商建周
- 分封制度的建立
- 礼乐文明的发展

### 东周（前 770 年 - 前 221 年）

- **春秋时期**（前 770 年 - 前 476 年）：诸侯争霸，百家争鸣
- **战国时期**（前 475 年 - 前 221 年）：七国纷争，变法图强

## 秦汉时期（前 221 年 - 220 年）

### 秦朝（前 221 年 - 前 207 年）

- 秦始皇统一中国
- 建立中央集权制度
- 统一文字、货币、度量衡
- 修建长城、驰道

### 西汉（前 202 年 - 9 年）

- 刘邦建立汉朝
- 汉武帝时期开创盛世
- 丝绸之路的开辟
- 儒学成为官方意识形态

### 新朝（9 年 - 23 年）

- 王莽篡汉建新

### 东汉（25 年 - 220 年）

- 光武帝刘秀中兴汉室
- 科技文化发展
- 佛教传入中国
- 黄巾起义导致东汉灭亡

## 三国两晋南北朝（220 年 - 589 年）

### 三国（220 年 - 280 年）

- 魏、蜀、吴三国鼎立
- 诸葛亮、曹操等历史名人
- 科技文化继续发展

### 西晋（265 年 - 316 年）

- 司马炎统一三国
- 八王之乱
- 五胡乱华

### 东晋（317 年 - 420 年）

- 晋室南迁
- 北方民族建立政权
- 南方经济文化发展

### 南北朝（420 年 - 589 年）

- 南朝：宋、齐、梁、陈
- 北朝：北魏、东魏、西魏、北齐、北周
- 民族融合
- 佛教兴盛

## 隋唐五代（589 年 - 960 年）

### 隋朝（581 年 - 618 年）

- 隋文帝杨坚统一南北
- 隋炀帝开凿大运河
- 科举制度的建立

### 唐朝（618 年 - 907 年）

- 李渊建立唐朝
- 贞观之治、开元盛世
- 文化艺术繁荣
- 安史之乱后国力衰退

### 五代十国（907 年 - 960 年）

- 五代：后梁、后唐、后晋、后汉、后周
- 十国：吴、南唐、吴越、闽、楚、南汉、前蜀、后蜀、南平、北汉
        `,
      },
      {
        id: 'geography',
        title: '地理',
        description: '学习自然地理和人文地理',
        level: 'intermediate',
      },
      {
        id: 'politics',
        title: '政治',
        description: '学习政治理论、法律和国际关系',
        level: 'advanced',
      },
    ],
  },
];

// 获取所有学科
export function getAllSubjects(): Subject[] {
  return subjects;
}

// 获取特定学科
export function getSubjectData(subjectId: string): Subject | undefined {
  return subjects.find(subject => subject.id === subjectId);
}

// 获取特定学科的特定主题
export function getTopicData(subjectId: string, topicId: string): Topic | undefined {
  const subject = getSubjectData(subjectId);
  if (!subject) return undefined;
  
  return subject.topics.find(topic => topic.id === topicId);
}
