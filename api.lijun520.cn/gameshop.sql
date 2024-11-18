/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : gameshop

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 07/11/2024 10:54:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '邮箱',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '管理员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'admin123', 'lj@lijun520.cn', NULL, NULL);

-- ----------------------------
-- Table structure for article_category
-- ----------------------------
DROP TABLE IF EXISTS `article_category`;
CREATE TABLE `article_category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_category
-- ----------------------------
INSERT INTO `article_category` VALUES (1, '综合', NULL);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int NOT NULL DEFAULT 1,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int UNSIGNED NOT NULL DEFAULT 0,
  `likes` int UNSIGNED NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `author_id` int NOT NULL DEFAULT 1,
  `category_id` int NOT NULL DEFAULT 1,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `game_article_author_id_fk_idx`(`author_id` ASC) USING BTREE,
  INDEX `game_article_category_id_fk_idx`(`category_id` ASC) USING BTREE,
  INDEX `game_article_title_idx`(`title` ASC, `category_id` ASC, `created_at` ASC) USING BTREE,
  CONSTRAINT `game_article_author_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `game_article_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `article_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `game_article_likes_chk` CHECK (`likes` >= 0),
  CONSTRAINT `game_article_views_chk` CHECK (`views` >= 0)
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, '精彩游戏回顾1', '这是一篇关于精彩游戏回顾的摘要1', '详细内容讲述了游戏中的精彩瞬间1......', 100, 20, '2023-01-01 00:00:00', '2023-01-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (2, '精彩游戏回顾2', '这是一篇关于精彩游戏回顾的摘要2', '详细内容讲述了游戏中的精彩瞬间2......', 120, 15, '2023-01-02 00:00:00', '2023-01-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (3, '新游戏发布资讯1', '新游戏发布资讯摘要1', '新游戏的详细介绍，包括玩法、特色等1......', 80, 30, '2023-02-01 00:00:00', '2023-02-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (4, '新游戏发布资讯2', '新游戏发布资讯摘要2', '新游戏的详细介绍，包括玩法、特色等2......', 90, 25, '2023-02-02 00:00:00', '2023-02-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (5, '游戏攻略1 - 关卡1', '游戏攻略1 - 关卡1摘要', '详细的关卡1攻略步骤......', 200, 50, '2023-03-01 00:00:00', '2023-03-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (6, '游戏攻略2 - 关卡2', '游戏攻略2 - 关卡2摘要', '详细的关卡2攻略步骤......', 180, 45, '2023-03-02 00:00:00', '2023-03-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (7, '游戏评测1 - 热门游戏A', '游戏评测1 - 热门游戏A摘要', '对热门游戏A的全面评测......', 150, 35, '2023-04-01 00:00:00', '2023-04-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (8, '游戏评测2 - 热门游戏B', '游戏评测2 - 热门游戏B摘要', '对热门游戏B的全面评测......', 160, 40, '2023-04-02 00:00:00', '2023-04-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (9, '电竞比赛报道1', '电竞比赛报道摘要1', '电竞比赛的精彩瞬间和结果1......', 300, 60, '2023-05-01 00:00:00', '2023-05-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (10, '电竞比赛报道2', '电竞比赛报道摘要2', '电竞比赛的精彩瞬间和结果2......', 280, 55, '2023-05-02 00:00:00', '2023-05-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (11, '游戏剧情解析1', '游戏剧情解析摘要1', '对某游戏剧情的深入解析......', 130, 30, '2023-06-01 00:00:00', '2023-06-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (12, '游戏剧情解析2', '游戏剧情解析摘要2', '对某游戏剧情的深入解析......', 140, 32, '2023-06-02 00:00:00', '2023-06-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (13, '游戏更新资讯1', '游戏更新资讯摘要1', '游戏更新内容介绍1......', 110, 28, '2023-07-01 00:00:00', '2023-07-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (14, '游戏更新资讯2', '游戏更新资讯摘要2', '游戏更新内容介绍2......', 105, 26, '2023-07-02 00:00:00', '2023-07-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (15, '玩家心得分享1', '玩家心得分享摘要1', '玩家在游戏中的体验和心得1......', 95, 22, '2023-08-01 00:00:00', '2023-08-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (16, '玩家心得分享2', '玩家心得分享摘要2', '玩家在游戏中的体验和心得2......', 100, 24, '2023-08-02 00:00:00', '2023-08-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (17, '游戏角色介绍1', '游戏角色介绍摘要1', '游戏中某个角色的详细介绍1......', 85, 20, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (18, '游戏角色介绍2', '游戏角色介绍摘要2', '游戏中某个角色的详细介绍2......', 90, 21, '2023-09-02 00:00:00', '2023-09-02 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (19, '游戏社区动态1', '游戏社区动态摘要1', '游戏社区中的最新消息和活动1......', 70, 18, '2023-10-01 00:00:00', '2023-10-01 00:00:00', 1, 1, '/img/PUBG.jpg');
INSERT INTO `articles` VALUES (20, '游戏社区动态2', '游戏社区动态摘要2', '游戏社区中的最新消息和活动2......', 75, 19, '2023-10-02 00:00:00', '2023-10-02 00:00:00', 1, 1, '/img/PUBG.jpg');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户反馈表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES (1, 2, 'user', 'user@lijun520.cn', '保护用户隐私：确保用户的个人信息和交易数据得到妥善保护，避免数据泄露或滥用。建议定期进行安全审计，并加强数据加密措施。', '2023-12-24 22:40:44');
INSERT INTO `feedback` VALUES (2, 2, 'user', 'user@lijun520.cn', '持续更新和改进：网站应该持续改进和更新，以满足用户不断变化的需求。建议定期收集用户反馈，并根据反馈进行改进。', '2023-12-24 22:41:24');
INSERT INTO `feedback` VALUES (3, 2, 'user', 'user@lijun520.cn', '定期促销活动：定期举办促销活动可以吸引更多用户购买。建议增加限时折扣、捆绑销售等促销活动，并提前在网站上宣传。', '2023-12-24 22:41:44');
INSERT INTO `feedback` VALUES (4, 2, 'user', 'user@lijun520.cn', '加强社区互动：建议增加玩家论坛或社区功能，让玩家可以分享游戏经验、讨论游戏策略等，这将增加用户粘性和活跃度。', '2023-12-24 22:42:30');

-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '游戏名',
  `image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '游戏的图片地址',
  `developer` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '开发商',
  `publisher` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '发行商',
  `category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '类别',
  `original_price` decimal(10, 2) NOT NULL DEFAULT 100.00 COMMENT '原价',
  `sale_price` decimal(10, 2) NOT NULL DEFAULT 50.00 COMMENT '活动价格',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL COMMENT '游戏描述',
  `reviews` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL COMMENT '鉴赏家点评',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `game_id_index`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci COMMENT = '游戏数据表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of games
-- ----------------------------
INSERT INTO `games` VALUES (1, 'Apex Legends', 'img/apex.jpg', 'Respawn Entertainment', 'Electronic Arts', '射击', 9.99, 1.99, '由Respawn Entertainment开发制作，屡获殊荣的《Apex Legends》，是一款免费大逃杀英雄射击游戏。在这款革命性的新一代大逃杀英雄射击游戏中，掌控日益丰富且拥有强大技能的传奇角色，深度体验战术小队玩法及创新游戏元素。', '\"世称EA最后的良心工作室Respawn带来的泰坦陨落世界观下的竞技大逃杀游戏，起源引擎加持下流畅的枪械和操作手感，一流的贴图、光影和特效带来极致的视觉体验，还有优秀的地图和别样的大逃杀机制设计，都使得Apex从同类游戏脱颖而出！这次锁定国区的烦恼可以使用UU加速器完美解决，只需要在开启Apex加速就能入库下载游戏，进入游戏后也可以改善网络波动和延迟问题。准备开始狩猎吧，新的赛季再次开始了！\"');
INSERT INTO `games` VALUES (2, '荒野大嫖客2', 'img/hydbk.jpg', 'Rockstar Games', 'Rockstar Games', '动作', 279.00, 198.00, 'Red Dead Redemption 2 已荣获超过 175 项年度游戏奖项且获得超过 250 个满分评价，游戏中述说亚瑟·摩根和声名狼藉的范德林德帮派的传奇故事，体验在 19 世纪的最后岁月里横跨美国的亡命之旅。除此之外，还可免费享受 Red Dead 在线模式中与众多玩家共享的逼真世界。', '\"《荒野大镖客2》作为牛仔主题游戏的代表作，在开放世界沙盒类游戏中也背负盛名。R星给玩家带来了一个真实感十足的西部世界，你可以策马驰骋在广阔的草原，翻山越岭去追捕危险的罪犯，捕猎，垂钓，玩牌。虽然扮演的是帮派的头号打手，但要成为怎样的人完全取决与玩家自己。你可以在富有传奇色彩的音乐中去倾听一段段往事，抑或是在绝妙的光影画面之下去体会栩栩如生的西部世界。非常推荐入手游玩。\"');
INSERT INTO `games` VALUES (3, '双人成行', 'img/srcx.jpg', 'Hazelight', 'Electronic Arts', '动作', 198.00, 49.50, '游玩《双人成行》，踏上生命中最疯狂的旅程。利用好友通行证*邀请一位好友免费游玩，共同体验多种多样的乐趣，享受颠覆性的玩法挑战。', '\"这是我近年来玩过的最棒的关卡设计之一，我在游玩着始终保持着对于接下来未知冒险的期待，游戏也总能给我带来惊喜，游戏用童话的方式讽刺成人世界的虚伪的同时，也讲述了一个简单而又温馨却值得思考的故事，制作总监Josef Fares“真他娘的是个天才！”。我期待着他的下一部游戏，即使在通关后，我也愿意去反复游玩这些关卡，愿意去体验这种纯粹的快乐。\"');
INSERT INTO `games` VALUES (4, '赛博朋克2077', 'img/sbpk2077.jpg', 'CD PROJEKT RED', 'CD PROJEKT RED', '开放世界', 298.00, 149.00, '《赛博朋克 2077》是一款开放世界动作冒险 RPG 游戏。故事发生在暗黑未来的夜之城，一座五光十色、危机四伏的超级大都会，权力更迭和无尽的身体改造是这里不变的主题。', '我们很荣幸能受邀参加闭门试玩会。本作玩法众多！动作刺激带感，解决掉对手时也足够真实...驾驶着不输于蝙蝠侠的车飞驰在钢筋水泥的丛林之中，使用超梦系统时，通过蛛丝马迹达成目标。叙事选项的抉择会对后续产生影响，基于不同的身份和属性值，有额外的对话选项，这些都可能改变之后事态的发展及剧情的走向。这种错综复杂的关联，让本作有了无限的可能性。一千个观众眼中有一千个哈姆雷特，而一个你就可以玩出一千个“V&quot;！\"');
INSERT INTO `games` VALUES (5, '空洞骑士', 'img/kong.jpg', 'Team Cherry', 'Team Cherry', '动作', 58.00, 18.00, '在《空洞骑士》中打造属于自己的冒险之旅！穿越一个庞大却废弃的属于昆虫与英雄的王国，开启史诗般的冒险旅程。探索幽深的洞穴，与被感染的生物战斗，结识友好又奇异的昆虫，整个游戏都是经典的手绘 2D 风格。', '\"有人说Hollow Knight并不是通过革命性的新创意而是极佳的执行保证了过硬的质量，也有人说正是游戏本身简洁的设计思想和微小的创新机制使其脱颖而出；有人对游戏中的探索要素爱不释手，也有人认为过多的backtracking造成了流程繁杂无从下手。但无论如何，Hollow Knight和Team Cherry都称得上是2017年独立游戏界的一大黑马，也是独立类银河战士作品中的新标杆。\"');
INSERT INTO `games` VALUES (6, '饥荒联机版', 'img/jihuang.jpg', 'Klei Entertainment', 'Klei Entertainment', '生存', 24.00, 12.00, '在绝不妥协的荒野生存游戏《饥荒》的多人联机版中一起战斗、耕种、建设和探索吧。', '\"回首饥荒联机，看到的是我们的青春；这是一个游戏，更是我们一路走来的证明。这款游戏的确很棒，各方面都很出彩，同时价格合理，买大包还能送基友一份，其乐融融，岂不美哉 ~\"');
INSERT INTO `games` VALUES (7, '精灵与萤火意志', 'img/jingling.jpg', 'Moon Studios GmbH', 'Xbox Game Studios', '动作', 90.00, 29.00, '在充满异域风情的广大世界中开启全新旅程，征服强大的敌人，解开极具挑战性的难题，在一次次任务中，揭开奥里的命运。', '终于通关了，是个好游戏。\r\n剧情没get到，画风音乐很美，打击感非常棒，死亡机制人性化，跑图不算太难，有三段跳和后期的炮弹跳跃加持，跑图真的好快乐。\r\n被猛击不支持键盘劝退了两回，左右手互搏很累的好吗？！前期游戏体验非常好所以不想放弃，最终依旧靠键盘解决了一切XD\r\n里面每个npc都非常可爱，点名推伦，这哥们看着最温柔和善宰我最狠，通关了都还没升级完碎片TAT还有偷窥狂，死亡次数有什么好记的，不删掉我就鲨了你！\r\n总之还是推荐的。');
INSERT INTO `games` VALUES (8, '伟大的奇迹', 'img/great.jpg', 'Caligari Games', 'Daedalic Entertainment', '剧情', 59.00, 11.90, '《The Great Perhaps》是一款时间穿越解谜游戏，讲述一个宇航员返回被灾难摧毁的地球的故事。 在那里的废墟中，他发现了一件不寻常的神器——一个古老的提灯，透过灯光可以看到另一条时间线上的各个瞬间，并穿越回到过去。', '想了想还是推荐吧，画风和设定都好喜欢，但是压根不是我想象中的解密游戏，解密一分钟，逃亡半小时？？？莫名其妙的反复去世，关键是还不能随便存档？！如果说这个游戏的重点就是探索冒险…那我无话可说');
INSERT INTO `games` VALUES (9, '巫师3:狂猎', 'img/ws3.jpg', 'CD PROJEKT RED', 'CD PROJEKT RED', '开放世界', 149.00, 39.00, '您是利维亚的杰洛特，收钱办事的怪物杀手。您可以在眼前这片怪物横行、饱受战火摧残的土地上尽情探索。您手上的委托？追踪预言之子——希里，一件足以改变世界面貌的活生生的武器。', '\"人呐就都不知道，自己就不可以预料。你一个人的命运啊，当然要靠自我奋斗，但是也要考虑到历史的行程，我绝对不知道，我作为一个Bioware死忠粉怎么就叛逃到CDPR的阵营里去了？\"');
INSERT INTO `games` VALUES (10, '无主之地3', 'img/wzzd3.jpg', 'Gearbox Software', '2K', '射击', 199.00, 98.00, '射击夺宝游戏的鼻祖回归了，为您带来无穷无尽的枪械和一场躁动无限的全新冒险旅途！扮演四位全新的秘藏猎人之一，在新世界中横行霸道并击败敌人吧！每一位都拥有颇具深度的技能树、能力以及自订选项。您可以单人游玩或是和好友一同与疯狂的敌人作战夺取成堆的战利品，并从星系最为残忍的邪教领袖', '\"经过漫长的等待又是Epic的独占，无主3终于来到了Steam平台。延续了2代相当不错的射击手感，精致的美漫画风，非常优秀的中文配音！！不俗的游戏剧情，不论从什么角度来看这都极度优秀的FPS作品，在这么多的优秀属性的加持下，无尽的刷刷刷也成了根本无法停息的享受。\"');
INSERT INTO `games` VALUES (11, '永劫无间', 'img/yong.jpg', '24 Entertainment', 'NetEase Games Global', '动作', 98.00, 56.00, '风靡全球的多人动作竞技大作，现已永久免费！来这里舞利刃、端火枪，享受远近结合的华丽战斗！驾驭风沙、机甲，化身野兽、大佛，体验风格迥异的英雄能力！在这场60人生存竞技中成为最后的赢家！', '\"本作在画面建模上的表现堪称用心，沼泽矿坑，天人城，落日寺每个地点都有自己的特点，勾锁飞檐走壁，树顶上可能藏着敌人，巨大的水车也会因攻击滚落，人物建模服装多样，捏脸自由度高，不同的天赋技能增加了游戏趣味，冷兵器的普通攻击，振刀，霸体攻击成为不同的组合，战斗打击感流畅，远程武器则让人防不甚防，魂玉的出现，让这场竞技变得更加扑朔迷离，优美的风景之下，暗藏杀机，细节丰富，这也许就是武侠吃鸡游戏独特的魅力。\"');
INSERT INTO `games` VALUES (12, '只狼：影逝二度', 'img/Sekiro.jpg', 'FromSoftware', 'Activision (Excluding Japan and Asia)', '动作', 268.00, 65.00, '进入由打造了《黑暗之魂》系列的知名开发商FromSoftware倾力制作的全新冒险，用智慧和力量斩开复仇之路。 决死复仇，夺回荣誉，智杀强敌。', '\"宫崎老贼给玩家们带来的一款素质相当高的动作游戏，本作不但传承且发扬光大了宫崎老贼高难度的设计思路，难度依然硬核，不过游戏的操作也依然是相当简单，更加考验玩家对于时机的把握。而本作一改《魂》系列充满“攻防回合”味道的战斗，更加强调动作元素，攻击、防御与反击之间的转换也更加行云流水，给玩家带来了一种华丽而充满了真实感的冷兵器战斗体验。极佳的优化也让低配玩家能够有机会体验到这款备受期待的佳作！\"');
INSERT INTO `games` VALUES (13, 'GTA5', 'img/GTA5.jpg', 'Rockstar North', 'Rockstar Games', '开放世界', 179.00, 66.00, 'PC 版Grand Theft Auto V 能够以超越 4K 的最高分辨率和 60 帧每秒的帧率，为您呈现屡获殊荣、令人痴迷的游戏世界——洛桑托斯市和布雷恩郡。', '\"“一直被模仿，从未被超越” 送给GTAV的单人模式。\r\n不俗的画面和优化。用心的细节设计。还有三个性格迥异的主角，一切的设定让游戏变得乐趣无穷，你永远不会在Los Santos中感到无聊。\r\n当年等待PC版的过程是漫长的，但是当很多人打开游戏，看到R星的logo时，发现很多时候，等待都是值得的。\"');
INSERT INTO `games` VALUES (14, '古剑奇谭3', 'img/Gujian3.jpg', '上海烛龙信息科技有限公司', '北京网元圣唐娱乐科技有限公司', '角色扮演', 99.00, 29.00, '《古剑奇谭三：梦付千秋星垂野》是网元圣唐旗下上海烛龙研发的大型3D单机角色扮演游戏。作为古剑系列的最新力作，本代采用了全即时战斗模式，战斗体验更加自由爽快。在前作基础上，本作进一步扩充古剑世界观，以写实唯美的风格描绘广阔的山川河岳，将久远的人情世故以全新的画面表现，带给玩家更贴', '\"作为一款国产游戏中相当优秀作品，更新了繁中和英文可以让更多的玩家感受到中国武侠的魅力，同时也更新了“大葱奇谭”和“原天柿的大冒”为游戏带来了新的内容。游戏整体流畅的人物动作和拳拳到肉的的打击感，精细的建模，精美的贴图，真实的光影给玩家创造了一个非常唯美华丽的武侠世界，水面随着剑的挥动而产生涟漪等细节也更是让这款国产游戏给玩家带来的极为惊艳的视觉享受。搭配充满仙侠味道的优美的音乐，拥有很强的代入感。\"');
INSERT INTO `games` VALUES (15, '仙剑奇侠传7', 'img/xianjian7.jpg', 'Softstar Technology (Beijing) Co., Ltd', 'Softstar Technology (Beijing) Co., Ltd.', '角色扮演', 128.00, 78.00, '《仙剑奇侠传七》是由软星科技（北京）有限公司开发的动作角色扮演类游戏。 本作注重剧情和游戏性的双重体验。故事围绕人、神、魔三族进行展开，在保证精彩演绎的同时，战斗系统较系列前作也做出重大变革，采用第三人称的即时战斗模式，作战流程无缝衔接，为玩家带来爽快的战斗体验。', '作为与时俱进的跟进时代的最新作品，本作带有光追加持的画质效果在美工精心打造的场景之下将整个仙侠世界展现得淋漓尽致，殿堂级的配乐以及诸多的创新内容使得这一作品质尤为上乘，只可惜剧情篇幅较短，后期场景及剧情进展均有赶工草草结束的迹象。（转载自小黑盒作者——boshiid）');
INSERT INTO `games` VALUES (16, '绝地求生', 'img/PUBG.jpg', 'KRAFTON, Inc.', 'KRAFTON, Inc.', '射击', 98.00, 9.99, '免费游玩《PUBG绝地求生》。 选取最佳战略位置着陆，搜寻武器和补给，并成为最后的幸存者小队，屹立于千变万化的战场之上。 组队加入战场，体验原汁原味的战术竞技，尽在《PUBG绝地求生》。', '\"落地一双手，东西全靠搜，这个游戏完全是一个运气与技术的博弈，随机的资源，随机的安全区，让游戏充满着随机性，新人吃鸡并不是完全不可能（然而大多数时候都是一个合格的揽件员和快递员）。各式各样的武器和友伤为开黑增加许多愉双击查看原图悦的气氛。别说了，我有8倍镜，你有98K吗？\"');
INSERT INTO `games` VALUES (17, 'CSGO', 'img/CSGO.jpg', '\r\nValve', '\r\nValve', '射击', 100.00, 9.99, '二十多年来，在全球数百万玩家的共同铸就下，Counter-Strike 提供了精湛绝伦的竞技体验。而如今，CS 传奇的下一章即将揭开序幕，那就是 Counter-Strike 2。', '\"反恐精英：全球攻势又称开箱精英：全球血崩又别称白银精英：P90攻势。随着CSGO玩家群体逐渐壮大，慕名而来的萌新越来越多，但是却不知道CSGO一些基本的知识，只能靠自己摸索来熟悉。为了让萌新们更快的适应CSGO这款游戏以及学会一些防骗知识，推出此评测，欢迎萌新学习！\"');
INSERT INTO `games` VALUES (18, '泰拉瑞亚', 'img/Terraria.jpg', 'Re-Logic', 'Re-Logic', '开放世界', 42.00, 21.00, '挖掘，战斗，探索，建造！在这个动感十足的冒险游戏里没有什么是不可能的。四人包依然可用！', '\"极高的可塑性和自由性；一个差不多能说只有你想不到没有做不到的世界；让人看着赏心悦目且十分舒服的画面；联机游戏趣味至少翻两倍！等众多优点，让这款游戏在2D世界里继续延续 “ 我的世界 “ 的传奇。玩了一个礼拜游戏时间已经50+，快成为我游戏时间最长的游戏了TvT可见TR的毒性到底有多大。\"');
INSERT INTO `games` VALUES (19, '人类一败涂地', 'img/Human_Fall_Flat.jpg', 'No Brakes Games', 'Curve Games', '休闲', 58.00, 19.00, '《人类一败涂地》是一款轻松搞笑的沙雕游戏，游戏的场景发生在飘渺的梦境之中。玩家既可以单机自闭，也可以最多八人联机一起欢畅。游戏支持的创意工坊，还可以让大家免费玩到不计其数的高质量玩家关卡和皮肤。游戏支持中文。', '\"一款你的腿部肌肉只能支撑你自己，如果试图举起什么东西你就会瞬间变成一个碰瓷大爷 “哎呦哎呦 不行不行，站不起来了” 的游戏。虽然由一大堆蛋疼的操作构成了这个游戏的核心要素，但是玩的时候看着你控制的“碰瓷大爷”，总是会忍不住的笑出声来 ~\"');
INSERT INTO `games` VALUES (20, 'Slime Rancher 2', 'img/SlimeRancher2.jpg', 'Monomi Park', 'Monomi Park', '休闲', 90.00, 63.00, '碧翠丝·乐步的冒险并未停歇，她穿越史莱姆海来到彩虹岛。这座岛屿充满了古老的谜团，到处遍布着弹嘟嘟的新型史莱姆。人气游戏Slime Rancher的新篇章，由你尽兴徜徉', '种田谁不喜欢？如此可爱的史莱姆谁不喜欢？建议出联机，一个人玩到后期太累了。和1代基本逻辑没什么不同，配色更加圆润，玩法更加符合我这种菜鸡。不过不建议原价购买，打折的时候入手还是很不错的。');
INSERT INTO `games` VALUES (21, '猛兽派对', 'img/partyanimals.jpg', 'Recreate Games', 'Source Technology', '休闲', 98.00, 68.00, '这是一款基于物理的多人派对游戏。选择你喜欢的小动物角色，和朋友们一起挑战其他玩家，或者展开激烈的对决吧！看到毛绒绒的小动物们你还不心动吗？', '\"有谁能拒绝扮演一只毛绒萌物？ 《猛兽派对》是一款合家欢多人乱斗派对游戏，玩家将在游戏中扮演一只笨拙可爱的小动物，开启一场属于萌物们的狂欢并角逐最终的派对冠军。游戏的可爱美术设计风格与趣味动作表现以及令人捧腹的音效相辅相成，使玩家能够在最短的时间内感受到游戏最本质的快乐。本作场景和玩法丰富多样，拥有多达20张地图供玩家自由选择。游戏同时支持多人在线与本地联机，快约上基友伙伴一起加入派对狂欢吧！\"');
INSERT INTO `games` VALUES (22, '植物大战僵尸', 'img/PVZ.jpg', 'PopCap Games, Inc.', 'PopCap Games, Inc., Electronic Arts', '休闲', 21.00, 21.00, '来自曾开发过宝石迷阵和幻幻球的宝开公司的全新动作策略游戏！ 可怕的僵尸即将入侵你的家，唯一的防御方式就是你栽种的植物！武装你的植物，切换他们不同的功能，诸如强悍的豌豆射手或樱桃炸弹，更加快速有效的将僵尸阻挡在入侵的道路上。不同的敌人，不同的玩法构成五种不同的游戏模式，加之夕', '\"作为一款非常经典的游戏了，还记得当初其风靡一时。而游戏各方面展现出的高质量，即使放到现在，同性质的游戏中，能一较高下的也寥寥无几。现在终于全成就了，所以来写个测评。\"');
INSERT INTO `games` VALUES (23, '胡闹厨房2', 'img/overcooked.jpg', 'Ghost Town Games Ltd., Team17', 'Team17', '休闲', 98.00, 38.00, 'Overcooked 回来了，带着全新的烹饪行动！重返洋葱王国，通过经典的本地合作模式或是在线游戏模式组建多达四人的大厨团队。系好你的围裙……是时候（再一次）拯救这个世界了！', '\"充分继承了前作游戏特色，并且添加了联机匹配等实用功能，这大大提高了这款游戏的普及程度。Overcooked本身代表着一个极大的游戏分支，强调于玩家的合作，让玩家的游戏体验并不孤单，让失败与成功都有人可诉，这着实富有着十分的娱乐性与愉快的体验。所以，请不要太过在意结果，请不要太过在意星等，这没有天梯，没有奖励，更没有什么你需要炫耀的东西，游戏的最终目的并不单单的是拯救洋葱帝国。\"');
INSERT INTO `games` VALUES (24, '艾迪芬奇的记忆', 'img/EddieFinchsMemories.jpg', 'Giant Sparrow', 'Annapurna Interactive', '剧情', 70.00, 25.00, '《What Remains of Edith Finch》是一系列诡异的故事，讲述了华盛顿州一个家族的种种怪谈。玩家扮演的 Edith 将进入 Finch 家族的大宅调查家族历史，试图弄明白为什么她是这个家族最后一个活着的人。在这个过程中，一个又一个故事被揭开。这些故事的年代从遥远的过去跨越至今，每揭开一个故事，玩家都', '\"然而这部游戏让我看到，在电影的老本行“讲故事”方面，超越电影的游戏也已经出现，并且可以期待会越来越多。\"');
INSERT INTO `games` VALUES (25, '完蛋！我被美女包围了！', 'img/beautifulwomen.jpg', 'intiny', 'intiny', '剧情', 42.00, 35.00, '用户化身男主角顾易，用第一视角沉浸式与六位长相、性格都大相径庭的美女相识，并与她们展开轻喜甜蜜的恋爱之旅。 魅惑魔女、清纯女生、知性姐姐、刁蛮大小姐、性感辣妈、冷艳总裁，与谁走到最后，由你来决定。', '\"我们饰演一个郁郁不得志的叫顾易的男文艺青年，创业失败欠了一屁股债务，打零工还债却命犯桃花误打误撞认识到了6为优秀女性，展开了一场游龙戏凤的故事。游戏以好感度作为线索，一共六个章节需要累计一定好感度才能解锁下一章节，每个女性角色累计好感度会触发一定的结局，不过太纯情是过不了关，当海王才是正解。本游戏所能提供的情感需求简单却实用，40块钱就能给提供6场共8小时的恋爱梦幻体验，出去请女神吃一顿饭都不够呢\"');
INSERT INTO `games` VALUES (26, '底特律：化身为人', 'img/DetroitBecomeHuman.jpg', 'Quantic Dream', 'Quantic Dream', '剧情', 128.00, 51.00, '在《底特律：化身为人》中，人类和机器人的命运都将掌握在您的手中，您将走进一个不远的未来，一个机器人具有比人类更高智慧的时代。您将体验到史上最为复杂的分支故事——您所作出的每个选择都将影响游戏的结局。', '\"科技高度发达的时代，仿生人开始成为不可或缺的存在，它们听从设定好的指令而行动，但异常仿生人的出现，似乎预示了新的变革，仿生人有真正的生命吗？在这赛博朋克般的设定之下，通过三名仿生人不同身份，不同环境和不同遭遇来演绎。优秀的画面表现力和生动的音效配音，分析重建包括各种QTE快速反应，大量的分支剧情和多结局的塑造，让每次的选择都将影响之后的体验，你将如何选择自己的结局？\"');
INSERT INTO `games` VALUES (27, '生化危机2', 'img/ResidentEvil2.jpg', 'CAPCOM Co., Ltd.', 'CAPCOM Co., Ltd.', '剧情', 219.00, 55.00, '一切都凌驾于玩家的想像之上。 一场生化灾难於1998年9月袭击了浣熊市，从残害幸存者的丧尸地狱中生还吧。 无尽的刺激、引人入胜的故事和无法想像的恐怖正在等候你。 见证系列首屈一指的杰作──《Resident Evil 2》的重生吧。 別被这场惨剧吞噬。', '\"虽然这次名字上同样有着重置的字样，但是却让让人看到了经典杰作的全新重生，从画面的进步，玩法的改动，到关卡的重新设计，成品优秀的质量，不但以流行且友好的方式让本世代最广泛的玩家能够接受并理解、甚至爱上旧世代的遗产，同时也让挑剔的老粉丝心满意足。对于意炒冷饭出名的卡普空来说，能以如此的诚意在本世代以全新之面貌重现当年的这部杰作，作为一名自称系列老粉丝的玩家，我真的很感动。\"');
INSERT INTO `games` VALUES (28, '禁闭求生.jpg', 'img/Grounded.jpg', 'Obsidian Entertainment', 'Xbox Game Studios', '生存', 119.00, 72.00, 'The world is a vast, beautiful and dangerous place – especially when you have been shrunk to the size of an ant. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?', '\"针对“变小”所构建的整体舞台非常精妙，随着流程的推进，游戏呈现了许多生动又风格迥异的大地图区域，展现了非常具有吸引力的大框架。但游戏目前处在EA阶段，有些问题还在解决中，比如略显孱弱的引导和叙事，有待优化的战斗和建造，还是大框架下主线的可游玩内容不足，以及显而易见的联机问题，都在一定程度上影响了玩家的游玩体验。但总体来说，禁闭求生是一款目前市面上极其独特，且潜力巨大的独特生存冒险游戏，值得一试。\"');
INSERT INTO `games` VALUES (29, '腐蚀', 'img/RUST.jpg', 'Facepunch Studios', 'Facepunch Studios', '生存', 161.00, 108.00, 'The only aim in Rust is to survive. Everything wants you to die - the island’s wildlife and other inhabitants, the environment, other survivors. Do whatever it takes to last another night.', '\"第一次进rust的时候我一直在忐忑一个人能不能玩下去的问题，从刚开始一直循环在一个人摸索，被人杀，被动物杀的死循环中，到后来结合着百度来的技巧我慢慢地去适应，虽然我玩的不算久，但是我很享受。只是同一个游戏却能给不同的人玩能玩出不同的乐趣，我更多是享受这款游戏，而不是去游戏中无知地发泄。\"');
INSERT INTO `games` VALUES (30, '森林', 'img/TheForest.jpg', 'Endnight Games Ltd', 'Endnight Games Ltd', '生存', 70.00, 20.00, 'As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.', '\"《森林》是由加拿大独立游戏开发商Endnight Games打造的恐怖冒险生存类游戏，游戏较高自由度，且支持联机+局域网。游戏中玩家必须建造设施，探索世界，生存下去。玩家必须砍树建造营地，生火取暖，收集食物，甚至还可以种植农作物。玩家可以藏匿行踪躲避敌人，也可以用石块和木棒制作武器，与敌人正面交战。而玩家的敌人是一群野人和凶猛的怪兽，他们和正常人类一样，有着自己的家庭和道德观。\"');
INSERT INTO `games` VALUES (31, '方舟：生存进化', 'img/ARK.jpg', 'Studio Wildcard, Instinct Games', 'Studio Wildcard, Snail Games USA', '生存', 58.00, 28.00, '由虚幻4引擎打造的一款多人在线生存竞技网游，在一个超高自由度的开放世界里，可以体验采集、制造、打猎、收获、建造、研究以及驯服恐龙等超多自由内容，感受酷热白昼、冰冷夜晚的动态天气系统以及饥饿口渴等现实中的生存挑战，还要面对其它生存者的威胁，合作生存还是竞技厮杀，由你决定！', '\"嘟。。。嘟嘟。。。嘟嘟嘟。。。\r\n“老司机，老司机！快，快！快上线，服霸正在抄家，我和他们谈崩了 。。。。。。” 缓缓的放下电话，笨笨的焦急之音仍在耳畔萦绕，悲愤之情久久不能平息。此服之图，莫非霸土；吾等萌新，莫非汝宠？见我们发展迅速就欲灭之。从未见过如此厚颜无耻之徒！');
INSERT INTO `games` VALUES (32, '消逝的光芒', 'img/DyingLight.jpg', 'Techland', 'Techland', '动作', 109.00, 39.00, '以丧尸横行的末世为背景的开放世界第一人称动作生存游戏。在一个被神秘病毒摧残过后的城市里漫游。收集物资，制作武器并迎战成群的感染者。', '\"你想体验新潮的跑酷运动吗？你想做个非凡的卡丁车赛车手吗？你想徒手搏击丧尸吗？你想成为万人斩吗？你想做个大英雄吗？你想拯救人类吗？那本作你一定不容错过！少年少女们，请准备好手中的大洋，加入我们，快来征讨丧尸大军吧！我才不会告诉你我就是对面正色眯眯看着你的精英狂暴丧尸呢！\"');
INSERT INTO `games` VALUES (33, '古墓丽影', 'img/TombRaider.jpg', 'Crystal Dynamics, Eidos-Montréal', 'Crystal Dynamics, Feral Interactive (Mac)', '动作', 73.00, 26.00, '《古墓丽影》探索了劳拉·克劳馥紧张的起源故事，以及她从年轻女人变为坚强生存者的成长过程。', '\"全新的游戏，延续同样的经典。\r\n——《Tomb Raider（古墓丽影）》\"');
INSERT INTO `games` VALUES (34, '虐杀原形', 'img/Prototype.jpg', 'Radical Entertainment', 'Activision', '动作', 100.00, 50.00, '你是个原型体，艾力克斯莫赫，一个没有记忆但却拥有能随意改变自身外形能力的人，用自己的方式回到一切阴谋的起点——你诞生的地方；让那些始作俑者受到应有的惩罚快速且致命的变身能力:通过改变双手来解决各种难题。从尖爪到利刃、从巨锤到长鞭，根据当时的情况选择适合自己的武器。 也可改变成护盾', '\"《虐杀原形》——一款为了让你爽的游戏。\"');
INSERT INTO `games` VALUES (35, '鬼泣5', 'img/DevilMayCry5.jpg', 'CAPCOM Co., Ltd.', 'CAPCOM Co., Ltd.', '动作', 198.00, 109.00, '最强的恶魔猎人强势回归！动作游戏迷翘首以待，传说中的Stylish Action《Devil May Cry》终于復活！', '\"《鬼泣5》使用了RE引擎，在画面表现力上到达了系列巅峰，贴图精致，特效华丽；同时优化出色，让低配机器也可以流畅体验，结合令人肾上腺素飙升的重金属音乐！堪称一场视听盛宴。还原系列经典的玩法仍然是那股熟悉的味道，动作流畅、打击感十足。优秀的剧情叙事非常吸引人。同时本作中可选择开启与关闭的一键连招系统，既让老玩家满意，有对新人十分友好。极为优秀的质量让这款游戏绝对堪当今年不可不玩的动作3A佳作！\"');
INSERT INTO `games` VALUES (36, '刺客信条起源', 'img/AssassinsCreedOrigins.jpg', 'Ubisoft Montreal', 'Ubisoft', '角色扮演', 298.00, 98.00, '《ASSASSIN’S CREED® ORIGINS》是一次全新的开始 *《Assassin’s Creed》Discovery Tour现已免费更新！* 王权和阴谋统治下的古埃及时代正慢慢消失在争权夺位的冷酷之战中。重返刺客兄弟会起源的最初时刻，揭开不为人知的秘密和被遗忘的神秘事件。', '\"我们守护着传说与信仰湮灭的过程，我们却无法令传说与信仰再度荣光。\r\n当我们明白，当我们觉悟，当我们醒来，一切已经太晚…………\"');
INSERT INTO `games` VALUES (37, '刺客信条2', 'img/AssassinsCreed2.jpg', 'Ubisoft Montreal', 'Ubisoft', '角色扮演', 48.00, 24.00, '备受期待的刺客信条的续作塑造了一个全新英雄，艾吉奥·奥迪托雷——一个年轻的意大利贵族，同时塑造了全新的时代背景：文艺复兴时期。《刺客信条2》讲述了一个以古时野蛮的文艺复兴时期的意大利为背景，有关家族，复仇以及阴谋的史诗故事。艾吉奥以朋友方式帮助李奥纳多·达·芬奇，接纳了佛罗伦萨最有', '\"作为育碧旗下，将历史文化完美融入游戏的《刺客信条》系列第二作，《刺客信条2》的背景是处于文艺复兴时期的意大利，威尼斯、佛罗伦萨等等著名的城镇都在游戏中有所出现，也加入了家园发展的模块等养成系统。游戏剧情，人物的刻画以及音乐方面的提升也让IGN给出了8.9分的历代最高分，可见其游戏素质相当的高。\"');
INSERT INTO `games` VALUES (38, '刺客信条奥德赛', 'img/AssassinsCreedOdyssey.jpg', 'Ubisoft Quebec, Ubisoft Montreal', 'Ubisoft', '角色扮演', 298.00, 129.00, '在《Assassin\'s Creed® Odyssey》当中主宰自己的命运。 从一名流浪者蜕变成传奇人物，踏上这趟奥德赛之旅，找出你过往的秘密并改变古希腊的命运。', '\"作为AC系列的最新作，一改核心向的设计思路，使游戏更加适合大众玩家，无论是粉丝还是轻度玩家都能从游戏中找到乐趣，同时保持了对历史事件的还原。特点更加鲜明的双角色，与需要选择的技能也避免最后彻底沦为水桶号的情况。而支线任务的进一步的优化与海战的回归，更为本作增添更多亮点。虽然存在RPG存在感过于强烈和令人略感物语的内购元素，但就游戏品质来说已然超越前作，整体十分优秀。\"');
INSERT INTO `games` VALUES (39, '骑马与砍杀2', 'img/Mount&Blade2.jpg', 'TaleWorlds Entertainment', 'TaleWorlds Entertainment', '角色扮演', 248.00, 148.00, '一个策略/动作类角色扮演游戏。创建一个角色，投身中世纪战场，从事外交、锻造、贸易和征服新的土地。集结你的军团奔赴战场，在大规模实时战斗中体验深奥但又直观的基于技能的战斗系统，与你忠诚的战士们并肩作战、取得胜利。', '\"今天下三分，卡拉迪亚疲敝，此诚危急存亡之秋也。长久的等待后，如今终可一展身手，然后又展开了漫长的追逐战，漫长到盟友带来了袭击，敌人投来了善意，妻子送来了帽子....我知道这都不能怪策划，是前面只会跑的瓜怂的错，于是我怒追上了他，誓必杀之而后快！随之便有了那首诗：一剑一剑又一剑，两剑三剑四五剑。六剑七剑八九剑，挥向瓜怂都不见。自此我茅塞顿开，骑马与砍杀不一定非要骑马与砍杀，也可以站在大后方眼神助攻！\"');
INSERT INTO `games` VALUES (40, '上古卷轴5天际', 'img/TheElderScrolls5.jpg', 'Bethesda Game Studios', 'Bethesda Softworks', '开放世界', 100.00, 50.00, '荣获超过200项年度游戏大奖的《The Elder Scrolls V: Skyrim》推出特别版，以令人惊叹的细致画面带来史诗奇幻巨作。特别版内含大获好评的主游戏、附加内容，还有全新功能。', '\"《上古卷轴5 ：天际》特别版是Bethesda针对本世代主机平台推出的重制版，游戏内容包括《天际》原版以及三个DLC，画质有少量提升，修复微量bug。\r\n==================================================\r\n废话不多说了，想看废话请点链接，大名鼎鼎的膝盖中箭老滚5不买能行？\"');
INSERT INTO `games` VALUES (41, '热血无赖', 'img/SleepingDogs.jpg', 'United Front Games, Feral Interactive', 'Square Enix, Feral Interactive (Mac)', '开放世界', 88.00, 28.00, 'The Definitive Edition of the critically acclaimed, award winning open-world action adventure, reworked, rebuilt and re-mastered for the new generation. With all previously available DLC included and a wealth of tech and visual improvements, Hong Kong has never felt so alive.', '\"这游戏，更像是回忆香港曾经的暴力美学，用现代元素、警察、黑社会、喧嚣的街市、ktv、按摩店、拥挤的马路，以一个卧底警察的内心挣扎为主线，完美的展现了香港文化。游戏中所展现出的那种浓厚的中国味，中国人自己都不一定做得出。这不是说中国人不行，而是反映出了制作方所展现出的诚意。\"');
INSERT INTO `games` VALUES (42, '尘埃2', 'img/DiRT2.jpg', 'Codemasters', 'Codemasters, Electronic Arts', '竞速', 80.00, 24.00, '在《DiRT Rally 2.0》你将驾驶史上最强力的越野车接受挑战，在精心挑选出的全世界最具代表性的拉力赛道上披荆斩棘，牢记即使最小的失误也能导致赛段的失败。', '\"UI设计一如既往的简洁，漂亮，看着非常舒服。每个可弯道的场景复杂度提升了，同样的场景也完全可以在之后紧接上另一个方向完全相反的弯道也不成问题，制作组也是相当用心。不过作为尘埃玩了近10年的老粉，水平没怎么见长，作死的想法倒是多了不少。这可不，过山车2.0发售啦！俺又一次地，被虐的开始念起了诗......\"');
INSERT INTO `games` VALUES (43, '极限国度', 'img/RidersRepublic.jpg', 'Ubisoft Annecy, Ubisoft Belgrade', 'Ubisoft Entertainment', '竞速', 198.00, 59.00, '跃入《极限国度》庞大的多人游乐场吧！', '这是一款很难让你从硬盘中删除的游戏，忙完一天的工作，打开游戏，享受一下从雪山一纵而下的感觉，仿佛一天的疲劳也随风而逝了。。。。。。');
INSERT INTO `games` VALUES (44, '极速骑行4', 'img/RIDE4.jpg', 'Milestone S.r.l.', 'Milestone S.r.l.', '竞速', 198.00, 49.00, '准备好感受车迷所能享受的绝佳游戏体验了吗？ RIDE 4中数百辆的摩托车、数十条赛道和前所未有的真实感，将点燃你的竞速之魂。', '没有好的心态，千万不要玩。没有多余的时间，千万不要玩。\r\n本人上班族下班。休息了，就想体验一会儿，虚拟世界。结果遇到一个大跌。我这是花了三十块钱纯属折磨自己的，新手教程过的难受就算了。你就算把所有的辅助拉满把AI智障全部拉满，玩的依旧难受至极，他让我最难受的一个点就是，跟其他对手的碰撞与摩擦。稍有不慎开局还跑出去不到一百来米你就能跟对手来一个法式接吻。我算是现实生活中也很爱摩托车的，自从玩了这个游戏之后，再也不喜欢了，我喜欢四轮的。');
INSERT INTO `games` VALUES (45, '极品飞车：热度', 'img/NeedforSpeedHeat.jpg', 'Ghost Games', 'Electronic Arts', '竞速', 288.00, 28.00, '白天的喧嚣，夜晚的狂欢，尽在《Need for Speed™ Heat》豪华版，这是一款惊险刺激的街头赛车游戏，随着太阳落山，法律的界限也将逐渐模糊。', '非常上头，打开了根本停不下来……\r\n——来自小黑盒用户杰森斯坦慷的评价');
INSERT INTO `games` VALUES (46, '极限竞速：地平线4', 'img/ForzaHorizon4.jpg', 'Playground Games', 'Xbox Game Studios', '竞速', 188.00, 68.00, '在世界上最盛大的汽车嘉年华上，不断变化的赛季改变着一切。单枪匹马或者与其他人组队，在一个共享开放世界中探索美丽而富有历史气息的英国。收集、改装和驾驶超过 450 辆车辆。尽情竞速、表演特技、创造和探索：选择您专属的方式来成为地平线中的超级巨星。', '\"《地平线4》是当前最接近完美的开放世界竞速游戏，能对其地位产生威胁的只有将在不久后到来的第五代作品。丰富的可自定难度选项让每个人都能找到舒适的驾驶方式轻松体验逮虾户的快乐。取材于英伦三岛的开放世界景色醉人且对玩家探索限制极少，同时地形的丰富程度让游戏囊括了几乎所有竞速类型，正如游戏宣传语那样这是一场永不落幕的嘉年华。最重要的是季节转换的自然规律完美融入了游戏，每个季节玩家都会获得不同的驾驶乐趣。\"');

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL COMMENT '订单ID，关联orders表',
  `game_id` int NOT NULL COMMENT '游戏ID，关联games表',
  `game_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '游戏名称',
  `unit_price` decimal(10, 2) NOT NULL COMMENT '商品单价',
  `quantity` int NOT NULL COMMENT '购买数量',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id_index`(`order_id` ASC) USING BTREE,
  INDEX `game_id_index`(`game_id` ASC) USING BTREE,
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci COMMENT = '订单明细表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order_details
-- ----------------------------
INSERT INTO `order_details` VALUES (1, 1, 1, 'Apex Legends', 1.99, 6);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID，关联user表',
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '下单时间',
  `order_status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'Pending' COMMENT '订单状态：Pending, Shipped, Delivered, Canceled',
  `total_amount` decimal(10, 2) NOT NULL COMMENT '订单总金额',
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci COMMENT = '订单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 2, '2024-06-25 09:00:48', 'Delivered', 11.94);

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart`  (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID，关联user表',
  `game_id` int NOT NULL COMMENT '游戏ID，关联games表',
  `quantity` int NOT NULL DEFAULT 1 COMMENT '购买数量',
  `unit_price` decimal(10, 2) NOT NULL COMMENT '单价',
  PRIMARY KEY (`cart_id`) USING BTREE,
  INDEX `user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `game_id_index`(`game_id` ASC) USING BTREE,
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci COMMENT = '购物车表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shopping_cart
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` tinyint UNSIGNED NULL DEFAULT 1 COMMENT '性别：1男 2女',
  `mobile` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '手机',
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '' COMMENT '地址',
  `balance` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '余额',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `del` tinyint UNSIGNED NULL DEFAULT 0 COMMENT '是否删除：0否 1是',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  UNIQUE INDEX `mobile`(`mobile` ASC) USING BTREE,
  INDEX `user_id_index`(`id` ASC) USING BTREE,
  CONSTRAINT `check_account` CHECK (regexp_like(`account`,_utf8mb3'^[a-zA-Z0-9]{4,10}$'))
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'lijun', '$2a$10$tmsoDZocpesefmvkVv9Xl.EXR4/0gMgSuaP4D4N5UCwqO1nLxZQEi', '李军', 1, '16699999109', 'lj@lijun520.cn', '湖北恩施', 100.00, NULL, NULL, NULL, 0);
INSERT INTO `user` VALUES (2, 'user', '$2a$10$vgmIdSs2jJsBf6Q7xrXfBe9DyBd8j6S6r1pjJu40SXuUWLDzIGbAC', '爸爸', 1, '12345689011', 'user@lijun520.cn', '台湾新竹', 520.00, NULL, NULL, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
