-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: six
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `index` int NOT NULL DEFAULT '1',
  `used` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;

--
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isdefault` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;

--
-- Table structure for table `BookHis`
--

DROP TABLE IF EXISTS `BookHis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BookHis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int NOT NULL,
  `count` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BookHis_bookId_fkey` (`bookId`),
  KEY `BookHis_userId_fkey` (`userId`),
  CONSTRAINT `BookHis_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BookHis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BookHis`
--

/*!40000 ALTER TABLE `BookHis` DISABLE KEYS */;
/*!40000 ALTER TABLE `BookHis` ENABLE KEYS */;

--
-- Table structure for table `BookHisCount`
--

DROP TABLE IF EXISTS `BookHisCount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BookHisCount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int NOT NULL,
  `count` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BookHisCount_bookId_fkey` (`bookId`),
  KEY `BookHisCount_userId_fkey` (`userId`),
  CONSTRAINT `BookHisCount_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BookHisCount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BookHisCount`
--

/*!40000 ALTER TABLE `BookHisCount` DISABLE KEYS */;
/*!40000 ALTER TABLE `BookHisCount` ENABLE KEYS */;

--
-- Table structure for table `Code`
--

DROP TABLE IF EXISTS `Code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `activatedAt` datetime(3) DEFAULT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Code_code_key` (`code`),
  KEY `Code_bookId_fkey` (`bookId`),
  KEY `Code_userId_fkey` (`userId`),
  CONSTRAINT `Code_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Code_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Code`
--

/*!40000 ALTER TABLE `Code` DISABLE KEYS */;
/*!40000 ALTER TABLE `Code` ENABLE KEYS */;

--
-- Table structure for table `Credit`
--

DROP TABLE IF EXISTS `Credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Credit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `credit` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Credit_userId_key` (`userId`),
  CONSTRAINT `Credit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Credit`
--

/*!40000 ALTER TABLE `Credit` DISABLE KEYS */;
INSERT INTO `Credit` VALUES (1,1,500,'2024-10-10 00:00:00.000','2024-10-10 00:00:00.000',0);
/*!40000 ALTER TABLE `Credit` ENABLE KEYS */;

--
-- Table structure for table `CreditHis`
--

DROP TABLE IF EXISTS `CreditHis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CreditHis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `credit` int NOT NULL DEFAULT '0',
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `CreditHis_userId_fkey` (`userId`),
  CONSTRAINT `CreditHis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CreditHis`
--

/*!40000 ALTER TABLE `CreditHis` DISABLE KEYS */;
/*!40000 ALTER TABLE `CreditHis` ENABLE KEYS */;

--
-- Table structure for table `Information`
--

DROP TABLE IF EXISTS `Information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(8000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete` tinyint(1) DEFAULT '0',
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Information`
--

/*!40000 ALTER TABLE `Information` DISABLE KEYS */;
INSERT INTO `Information` VALUES (1,'<p>一场私密的交流会，一次因材施教的教学</p> <p>对于下一个机遇的预测：抓重点，找方向，确定性，可持续发展。收获一群良师益友同路人，从“小市值成长为亿万级别”之路。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_1.jpeg\" /> <p>跟着仇老师到底学习什么？</p> <p>仇老师多次强调读书不是附庸风雅，是学习思维！穷人与富人最大的差异在思维上，因为“思路决定出路，态度决定高度，格局决定结局”。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_2.jpeg\" /> <p>仇老师读了四万多本书，20多年进出口贸易经验，用脚丈量世界多地。真正做到“读万卷书，行万里路”。</p> <p>仇老师最擅长读书，育人和赚钱！</p> <img src=\"https://oss.lhdd.club/pic/article_sample_3.jpeg\" /> <p>仇老师说学习是为了生活，学习是为了能赚到钱，把家养好，把父母孝敬好。</p> <p>仇老师学富五车，通过学习实现了从1570元起家到财富自由，而今想把半生所学，和几十年的读书赚钱经验教给有缘的人。</p> <p>仇老师的目标是培养600个院士级别的人才和一万个亿万富翁！</p> <p>你是否想成为那个确定要“赢”的人？</p> <img src=\"https://oss.lhdd.club/pic/article_sample_4.jpeg\" /> <p>仇老师之前分享的三气合一气即：体气+文气+才气=财气。</p> <p>财气由何而来？三气汇聚自然而生。</p> <p>功夫要落地，功夫要上身。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_5.jpeg\" /> <p>课堂上，老师讲的滔滔不绝，如“黄河之水天上来”；学员们沉浸其中，如“仙人抚我顶”，豁然开朗。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_6.jpeg\" /> <p>仇老师讲的都是肺腑之言，学员们听的深情投入。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_7.jpeg\" /> <p>老师授课传真本领，学员们十一假期来的超值！</p> <img src=\"https://oss.lhdd.club/pic/article_sample_8.jpeg\" /> <p>各位学友，专注当下，沉醉其中！</p> <img src=\"https://oss.lhdd.club/pic/article_sample_9.jpeg\" /> <img src=\"https://oss.lhdd.club/pic/article_sample_10.jpeg\" /> <p>仇老师为这次线下课已经等了三年，准备了三年，只为等到这群有情有义，有钱有闲，有缘的家人们。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_11.jpeg\" /> <p>这个假期学员们收获满满，正能量爆棚。</p> <img src=\"https://oss.lhdd.club/pic/article_sample_12.jpeg\" /> <p>线下学习，和仇老师面对面交流是得到老师传真本领的机会，能接收老师的高能量，真智慧，打开思维的大门。</p> <p>让我们相约下一期仇老师线下课，跟着老师长期熏习，改变思维方式，改变命运。</p>','财富尊享会 国庆智慧班','107',NULL,0,'2024-09-20 00:00:00.000','2024-09-20 00:00:00.000','0',NULL),(2,'最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','102',NULL,0,'2024-09-20 00:00:00.000','2024-09-19 00:00:00.000','0',NULL),(3,'最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','103',NULL,0,'2024-09-11 00:00:00.000','2024-09-17 00:00:00.000','0',NULL),(4,'最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','104',NULL,0,'2024-09-19 00:00:00.000','2024-09-17 00:00:00.000','0',NULL),(5,'最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','最新资讯：资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯','105',NULL,0,'2021-06-02 00:00:00.000','2021-06-02 00:00:00.000','0',NULL),(10001,'0,32,湖北省·武汉市·洪山区,点读师','孙仲谋','9001',NULL,0,'2020-07-10 00:00:00.000','2020-07-10 00:00:00.000','1','<p>李老师拥有超过十年的教学经验，专注于数学和物理的教学研究。她毕业于知名师范大学，具有扎实的专业知识和丰富的教学经验。李老师始终坚持“因材施教”的理念，根据学生的不同特点进行个性化的教学，帮助每一位学生找到适合自己的学习方法，取得优异成绩。</p>  <p>在课堂上，李老师以生动有趣的教学风格著称。她注重激发学生的学习兴趣，通过引导式提问和实际生活中的例子，帮助学生更好地理解复杂的理论知识。她常常鼓励学生积极参与课堂讨论，培养他们的思维能力和解决问题的能力。</p>  <p>李老师不仅关心学生的学业进步，也注重他们的全面发展。她时常与学生沟通交流，了解他们在学习中的困难，并给予有针对性的指导。同时，李老师也非常重视学生的心理健康，帮助他们在学习中保持积极的态度，培养自信和坚持不懈的精神。</p>  <p>多年来，李老师凭借出色的教学成绩，多次被评为优秀教师。她的学生在各类考试中屡获佳绩，很多学生也因此对数学和物理产生了浓厚的兴趣，并在未来选择了相关领域的进一步深造。李老师深受学生和家长的喜爱，是一位备受尊敬的教育工作者。</p>'),(10002,'0,32,湖北省·武汉市·洪山区,导学师','梅友德','9002',NULL,0,'2024-09-20 00:00:00.000','2024-09-18 00:00:00.000','1','教师特点介绍，教师特点介绍，教师特点介绍'),(10003,'0,32,湖北省·武汉市·洪山区,规划师','孙政财','9002',NULL,0,'2024-09-13 00:00:00.000','2024-09-10 00:00:00.000','1','教师特点介绍，教师特点介绍，教师特点介绍'),(10004,'1,32,湖北省·武汉市·洪山区,规划师','甄美丽','9002',NULL,0,'2024-09-13 00:00:00.000','2024-09-10 00:00:00.000','1','教师特点介绍，教师特点介绍，教师特点介绍'),(10005,'0,32,湖北省·武汉市·洪山区,规划师','贾富贵','9001',NULL,0,'2024-09-13 00:00:00.000','2024-09-10 00:00:00.000','1','教师特点介绍，教师特点介绍，教师特点介绍'),(20001,'湖北省·武汉市·洪山区','学校,洪山区农民子弟小学','7001',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','2','<p>我们的学校是一所充满活力和创新精神的现代化小学，致力于为学生提供全面而高质量的基础教育。学校位于市中心，拥有优美的校园环境和先进的教学设施，致力于营造一个安全、友好、富有创造力的学习氛围。我们始终相信，每个孩子都是独一无二的，他们拥有无限的潜力，值得被培养和尊重。</p>  <p>学校以“全人教育”为核心理念，关注学生的身心健康、学术能力、艺术素养和社会责任感。我们不仅重视基础知识的传授，更注重培养学生的创新精神、独立思考能力和团队合作意识。学校设有多种形式的课外活动和兴趣小组，涵盖艺术、体育、科技等领域，帮助学生在课堂之外也能得到全面发展。</p>  <p>我们的教师团队由一批充满热情、责任心强的专业教育工作者组成。每位教师都拥有丰富的教学经验，并且不断通过培训和学习提升自我。学校鼓励教师在教学中运用最新的教学方法和技术手段，如多媒体教学、情境教学法等，以提高课堂的趣味性和学生的参与度。</p>  <p>学校的硬件设施也是一大亮点。我们拥有现代化的多功能教室、先进的电脑室、宽敞的图书馆和设备齐全的科学实验室。这些设施不仅满足了基础学科的教学需求，还为学生的探究性学习提供了广阔的空间。此外，学校还配备了室内体育馆、游泳池和户外操场，为学生提供充足的体育锻炼机会。</p>  <p>为了保障学生的健康成长，学校特别注重校园的卫生管理和食品安全。我们的食堂严格按照营养标准为学生提供健康、均衡的餐食，确保每位学生在学校期间都能享受到安全、卫生的饮食服务。</p>  <p>除了日常课程外，学校还积极组织丰富多彩的校内外活动，如春秋游、文化艺术节、体育竞赛等。这些活动不仅增强了学生的团队精神，还培养了他们的组织能力和领导能力。学校的合唱团、舞蹈队、足球队等社团活动也深受学生喜爱，并且多次在市级、省级比赛中取得优异成绩。</p>  <p>在学校的支持下，学生不仅能够在学术上取得进步，还能在兴趣爱好方面得到全面发展。我们相信，丰富的课外活动能帮助学生更好地了解自我，发现自己的潜能和兴趣，从而为未来的发展奠定坚实的基础。</p>  <p>我们坚信，教育是学校、家庭和社会共同努力的结果。因此，学校非常重视与家长的沟通与合作。学校定期举行家长会、家校联谊活动，邀请家长参与学校的管理和决策，并为家长提供教育讲座和培训，帮助家长更好地理解和支持孩子的成长。</p>  <p>学校还建立了完善的家校沟通平台，家长可以随时通过短信、电话、电子邮件或学校的家校通系统与教师联系，了解孩子在校的学习和生活情况。我们相信，良好的家校合作关系能有效促进学生的全面发展。</p>  <p>作为一所具有社会责任感的学校，我们不仅关注学生的学业成绩，更注重培养他们的公民意识和社会责任感。学校定期组织学生参加社区服务活动，如关爱老人、清理街道、环保宣传等，通过这些活动让学生感受到帮助他人和回馈社会的意义。</p>  <p>此外，学校还注重环保教育，推行绿色校园的理念。在日常教学中，我们将环保知识融入课堂，鼓励学生养成节约资源、保护环境的良好习惯。学校的各项环保措施，如废物回收、节能减排等，也得到了师生们的积极响应。</p>  <p>展望未来，我们将继续秉承“全人教育”的理念，努力提升学校的教学质量和管理水平，推动教育改革，培养更多具有创新精神和社会责任感的优秀学生。我们将不断完善学校的硬件设施，丰富学生的课外活动，搭建更多国际化的教育平台，帮助学生更好地适应未来的挑战。</p>  <p>通过学校、家庭和社会的共同努力，我们相信每个孩子都能在这里得到充分的发展，成长为自信、独立、具有良好品德和社会责任感的未来栋梁。我们的学校将继续为每一个学生的美好未来保驾护航，助力他们走向更广阔的天地。</p>'),(20002,'湖北省·武汉市·洪山区','机构,教育机构教育机构教育机构','7001',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','2','<p>我们的学校是一所充满活力和创新精神的现代化小学，致力于为学生提供全面而高质量的基础教育。学校位于市中心，拥有优美的校园环境和先进的教学设施，致力于营造一个安全、友好、富有创造力的学习氛围。我们始终相信，每个孩子都是独一无二的，他们拥有无限的潜力，值得被培养和尊重。</p>  <p>学校以“全人教育”为核心理念，关注学生的身心健康、学术能力、艺术素养和社会责任感。我们不仅重视基础知识的传授，更注重培养学生的创新精神、独立思考能力和团队合作意识。学校设有多种形式的课外活动和兴趣小组，涵盖艺术、体育、科技等领域，帮助学生在课堂之外也能得到全面发展。</p>  <p>我们的教师团队由一批充满热情、责任心强的专业教育工作者组成。每位教师都拥有丰富的教学经验，并且不断通过培训和学习提升自我。学校鼓励教师在教学中运用最新的教学方法和技术手段，如多媒体教学、情境教学法等，以提高课堂的趣味性和学生的参与度。</p>  <p>学校的硬件设施也是一大亮点。我们拥有现代化的多功能教室、先进的电脑室、宽敞的图书馆和设备齐全的科学实验室。这些设施不仅满足了基础学科的教学需求，还为学生的探究性学习提供了广阔的空间。此外，学校还配备了室内体育馆、游泳池和户外操场，为学生提供充足的体育锻炼机会。</p>  <p>为了保障学生的健康成长，学校特别注重校园的卫生管理和食品安全。我们的食堂严格按照营养标准为学生提供健康、均衡的餐食，确保每位学生在学校期间都能享受到安全、卫生的饮食服务。</p>  <p>除了日常课程外，学校还积极组织丰富多彩的校内外活动，如春秋游、文化艺术节、体育竞赛等。这些活动不仅增强了学生的团队精神，还培养了他们的组织能力和领导能力。学校的合唱团、舞蹈队、足球队等社团活动也深受学生喜爱，并且多次在市级、省级比赛中取得优异成绩。</p>  <p>在学校的支持下，学生不仅能够在学术上取得进步，还能在兴趣爱好方面得到全面发展。我们相信，丰富的课外活动能帮助学生更好地了解自我，发现自己的潜能和兴趣，从而为未来的发展奠定坚实的基础。</p>  <p>我们坚信，教育是学校、家庭和社会共同努力的结果。因此，学校非常重视与家长的沟通与合作。学校定期举行家长会、家校联谊活动，邀请家长参与学校的管理和决策，并为家长提供教育讲座和培训，帮助家长更好地理解和支持孩子的成长。</p>  <p>学校还建立了完善的家校沟通平台，家长可以随时通过短信、电话、电子邮件或学校的家校通系统与教师联系，了解孩子在校的学习和生活情况。我们相信，良好的家校合作关系能有效促进学生的全面发展。</p>  <p>作为一所具有社会责任感的学校，我们不仅关注学生的学业成绩，更注重培养他们的公民意识和社会责任感。学校定期组织学生参加社区服务活动，如关爱老人、清理街道、环保宣传等，通过这些活动让学生感受到帮助他人和回馈社会的意义。</p>  <p>此外，学校还注重环保教育，推行绿色校园的理念。在日常教学中，我们将环保知识融入课堂，鼓励学生养成节约资源、保护环境的良好习惯。学校的各项环保措施，如废物回收、节能减排等，也得到了师生们的积极响应。</p>  <p>展望未来，我们将继续秉承“全人教育”的理念，努力提升学校的教学质量和管理水平，推动教育改革，培养更多具有创新精神和社会责任感的优秀学生。我们将不断完善学校的硬件设施，丰富学生的课外活动，搭建更多国际化的教育平台，帮助学生更好地适应未来的挑战。</p>  <p>通过学校、家庭和社会的共同努力，我们相信每个孩子都能在这里得到充分的发展，成长为自信、独立、具有良好品德和社会责任感的未来栋梁。我们的学校将继续为每一个学生的美好未来保驾护航，助力他们走向更广阔的天地。</p>'),(20003,'湖北省·武汉市·洪山区','机构,教育机构教育机构教育机构','7002',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','2','<p>我们的学校是一所充满活力和创新精神的现代化小学，致力于为学生提供全面而高质量的基础教育。学校位于市中心，拥有优美的校园环境和先进的教学设施，致力于营造一个安全、友好、富有创造力的学习氛围。我们始终相信，每个孩子都是独一无二的，他们拥有无限的潜力，值得被培养和尊重。</p>  <p>学校以“全人教育”为核心理念，关注学生的身心健康、学术能力、艺术素养和社会责任感。我们不仅重视基础知识的传授，更注重培养学生的创新精神、独立思考能力和团队合作意识。学校设有多种形式的课外活动和兴趣小组，涵盖艺术、体育、科技等领域，帮助学生在课堂之外也能得到全面发展。</p>  <p>我们的教师团队由一批充满热情、责任心强的专业教育工作者组成。每位教师都拥有丰富的教学经验，并且不断通过培训和学习提升自我。学校鼓励教师在教学中运用最新的教学方法和技术手段，如多媒体教学、情境教学法等，以提高课堂的趣味性和学生的参与度。</p>  <p>学校的硬件设施也是一大亮点。我们拥有现代化的多功能教室、先进的电脑室、宽敞的图书馆和设备齐全的科学实验室。这些设施不仅满足了基础学科的教学需求，还为学生的探究性学习提供了广阔的空间。此外，学校还配备了室内体育馆、游泳池和户外操场，为学生提供充足的体育锻炼机会。</p>  <p>为了保障学生的健康成长，学校特别注重校园的卫生管理和食品安全。我们的食堂严格按照营养标准为学生提供健康、均衡的餐食，确保每位学生在学校期间都能享受到安全、卫生的饮食服务。</p>  <p>除了日常课程外，学校还积极组织丰富多彩的校内外活动，如春秋游、文化艺术节、体育竞赛等。这些活动不仅增强了学生的团队精神，还培养了他们的组织能力和领导能力。学校的合唱团、舞蹈队、足球队等社团活动也深受学生喜爱，并且多次在市级、省级比赛中取得优异成绩。</p>  <p>在学校的支持下，学生不仅能够在学术上取得进步，还能在兴趣爱好方面得到全面发展。我们相信，丰富的课外活动能帮助学生更好地了解自我，发现自己的潜能和兴趣，从而为未来的发展奠定坚实的基础。</p>  <p>我们坚信，教育是学校、家庭和社会共同努力的结果。因此，学校非常重视与家长的沟通与合作。学校定期举行家长会、家校联谊活动，邀请家长参与学校的管理和决策，并为家长提供教育讲座和培训，帮助家长更好地理解和支持孩子的成长。</p>  <p>学校还建立了完善的家校沟通平台，家长可以随时通过短信、电话、电子邮件或学校的家校通系统与教师联系，了解孩子在校的学习和生活情况。我们相信，良好的家校合作关系能有效促进学生的全面发展。</p>  <p>作为一所具有社会责任感的学校，我们不仅关注学生的学业成绩，更注重培养他们的公民意识和社会责任感。学校定期组织学生参加社区服务活动，如关爱老人、清理街道、环保宣传等，通过这些活动让学生感受到帮助他人和回馈社会的意义。</p>  <p>此外，学校还注重环保教育，推行绿色校园的理念。在日常教学中，我们将环保知识融入课堂，鼓励学生养成节约资源、保护环境的良好习惯。学校的各项环保措施，如废物回收、节能减排等，也得到了师生们的积极响应。</p>  <p>展望未来，我们将继续秉承“全人教育”的理念，努力提升学校的教学质量和管理水平，推动教育改革，培养更多具有创新精神和社会责任感的优秀学生。我们将不断完善学校的硬件设施，丰富学生的课外活动，搭建更多国际化的教育平台，帮助学生更好地适应未来的挑战。</p>  <p>通过学校、家庭和社会的共同努力，我们相信每个孩子都能在这里得到充分的发展，成长为自信、独立、具有良好品德和社会责任感的未来栋梁。我们的学校将继续为每一个学生的美好未来保驾护航，助力他们走向更广阔的天地。</p>'),(20004,'湖北省·武汉市·洪山区','机构,教育机构教育机构教育机构','7002',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','2','<p>我们的学校是一所充满活力和创新精神的现代化小学，致力于为学生提供全面而高质量的基础教育。学校位于市中心，拥有优美的校园环境和先进的教学设施，致力于营造一个安全、友好、富有创造力的学习氛围。我们始终相信，每个孩子都是独一无二的，他们拥有无限的潜力，值得被培养和尊重。</p>  <p>学校以“全人教育”为核心理念，关注学生的身心健康、学术能力、艺术素养和社会责任感。我们不仅重视基础知识的传授，更注重培养学生的创新精神、独立思考能力和团队合作意识。学校设有多种形式的课外活动和兴趣小组，涵盖艺术、体育、科技等领域，帮助学生在课堂之外也能得到全面发展。</p>  <p>我们的教师团队由一批充满热情、责任心强的专业教育工作者组成。每位教师都拥有丰富的教学经验，并且不断通过培训和学习提升自我。学校鼓励教师在教学中运用最新的教学方法和技术手段，如多媒体教学、情境教学法等，以提高课堂的趣味性和学生的参与度。</p>  <p>学校的硬件设施也是一大亮点。我们拥有现代化的多功能教室、先进的电脑室、宽敞的图书馆和设备齐全的科学实验室。这些设施不仅满足了基础学科的教学需求，还为学生的探究性学习提供了广阔的空间。此外，学校还配备了室内体育馆、游泳池和户外操场，为学生提供充足的体育锻炼机会。</p>  <p>为了保障学生的健康成长，学校特别注重校园的卫生管理和食品安全。我们的食堂严格按照营养标准为学生提供健康、均衡的餐食，确保每位学生在学校期间都能享受到安全、卫生的饮食服务。</p>  <p>除了日常课程外，学校还积极组织丰富多彩的校内外活动，如春秋游、文化艺术节、体育竞赛等。这些活动不仅增强了学生的团队精神，还培养了他们的组织能力和领导能力。学校的合唱团、舞蹈队、足球队等社团活动也深受学生喜爱，并且多次在市级、省级比赛中取得优异成绩。</p>  <p>在学校的支持下，学生不仅能够在学术上取得进步，还能在兴趣爱好方面得到全面发展。我们相信，丰富的课外活动能帮助学生更好地了解自我，发现自己的潜能和兴趣，从而为未来的发展奠定坚实的基础。</p>  <p>我们坚信，教育是学校、家庭和社会共同努力的结果。因此，学校非常重视与家长的沟通与合作。学校定期举行家长会、家校联谊活动，邀请家长参与学校的管理和决策，并为家长提供教育讲座和培训，帮助家长更好地理解和支持孩子的成长。</p>  <p>学校还建立了完善的家校沟通平台，家长可以随时通过短信、电话、电子邮件或学校的家校通系统与教师联系，了解孩子在校的学习和生活情况。我们相信，良好的家校合作关系能有效促进学生的全面发展。</p>  <p>作为一所具有社会责任感的学校，我们不仅关注学生的学业成绩，更注重培养他们的公民意识和社会责任感。学校定期组织学生参加社区服务活动，如关爱老人、清理街道、环保宣传等，通过这些活动让学生感受到帮助他人和回馈社会的意义。</p>  <p>此外，学校还注重环保教育，推行绿色校园的理念。在日常教学中，我们将环保知识融入课堂，鼓励学生养成节约资源、保护环境的良好习惯。学校的各项环保措施，如废物回收、节能减排等，也得到了师生们的积极响应。</p>  <p>展望未来，我们将继续秉承“全人教育”的理念，努力提升学校的教学质量和管理水平，推动教育改革，培养更多具有创新精神和社会责任感的优秀学生。我们将不断完善学校的硬件设施，丰富学生的课外活动，搭建更多国际化的教育平台，帮助学生更好地适应未来的挑战。</p>  <p>通过学校、家庭和社会的共同努力，我们相信每个孩子都能在这里得到充分的发展，成长为自信、独立、具有良好品德和社会责任感的未来栋梁。我们的学校将继续为每一个学生的美好未来保驾护航，助力他们走向更广阔的天地。</p>'),(20005,'湖北省·武汉市·洪山区','机构,教育机构教育机构教育机构','7002',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','2','<p>我们的学校是一所充满活力和创新精神的现代化小学，致力于为学生提供全面而高质量的基础教育。学校位于市中心，拥有优美的校园环境和先进的教学设施，致力于营造一个安全、友好、富有创造力的学习氛围。我们始终相信，每个孩子都是独一无二的，他们拥有无限的潜力，值得被培养和尊重。</p>  <p>学校以“全人教育”为核心理念，关注学生的身心健康、学术能力、艺术素养和社会责任感。我们不仅重视基础知识的传授，更注重培养学生的创新精神、独立思考能力和团队合作意识。学校设有多种形式的课外活动和兴趣小组，涵盖艺术、体育、科技等领域，帮助学生在课堂之外也能得到全面发展。</p>  <p>我们的教师团队由一批充满热情、责任心强的专业教育工作者组成。每位教师都拥有丰富的教学经验，并且不断通过培训和学习提升自我。学校鼓励教师在教学中运用最新的教学方法和技术手段，如多媒体教学、情境教学法等，以提高课堂的趣味性和学生的参与度。</p>  <p>学校的硬件设施也是一大亮点。我们拥有现代化的多功能教室、先进的电脑室、宽敞的图书馆和设备齐全的科学实验室。这些设施不仅满足了基础学科的教学需求，还为学生的探究性学习提供了广阔的空间。此外，学校还配备了室内体育馆、游泳池和户外操场，为学生提供充足的体育锻炼机会。</p>  <p>为了保障学生的健康成长，学校特别注重校园的卫生管理和食品安全。我们的食堂严格按照营养标准为学生提供健康、均衡的餐食，确保每位学生在学校期间都能享受到安全、卫生的饮食服务。</p>  <p>除了日常课程外，学校还积极组织丰富多彩的校内外活动，如春秋游、文化艺术节、体育竞赛等。这些活动不仅增强了学生的团队精神，还培养了他们的组织能力和领导能力。学校的合唱团、舞蹈队、足球队等社团活动也深受学生喜爱，并且多次在市级、省级比赛中取得优异成绩。</p>  <p>在学校的支持下，学生不仅能够在学术上取得进步，还能在兴趣爱好方面得到全面发展。我们相信，丰富的课外活动能帮助学生更好地了解自我，发现自己的潜能和兴趣，从而为未来的发展奠定坚实的基础。</p>  <p>我们坚信，教育是学校、家庭和社会共同努力的结果。因此，学校非常重视与家长的沟通与合作。学校定期举行家长会、家校联谊活动，邀请家长参与学校的管理和决策，并为家长提供教育讲座和培训，帮助家长更好地理解和支持孩子的成长。</p>  <p>学校还建立了完善的家校沟通平台，家长可以随时通过短信、电话、电子邮件或学校的家校通系统与教师联系，了解孩子在校的学习和生活情况。我们相信，良好的家校合作关系能有效促进学生的全面发展。</p>  <p>作为一所具有社会责任感的学校，我们不仅关注学生的学业成绩，更注重培养他们的公民意识和社会责任感。学校定期组织学生参加社区服务活动，如关爱老人、清理街道、环保宣传等，通过这些活动让学生感受到帮助他人和回馈社会的意义。</p>  <p>此外，学校还注重环保教育，推行绿色校园的理念。在日常教学中，我们将环保知识融入课堂，鼓励学生养成节约资源、保护环境的良好习惯。学校的各项环保措施，如废物回收、节能减排等，也得到了师生们的积极响应。</p>  <p>展望未来，我们将继续秉承“全人教育”的理念，努力提升学校的教学质量和管理水平，推动教育改革，培养更多具有创新精神和社会责任感的优秀学生。我们将不断完善学校的硬件设施，丰富学生的课外活动，搭建更多国际化的教育平台，帮助学生更好地适应未来的挑战。</p>  <p>通过学校、家庭和社会的共同努力，我们相信每个孩子都能在这里得到充分的发展，成长为自信、独立、具有良好品德和社会责任感的未来栋梁。我们的学校将继续为每一个学生的美好未来保驾护航，助力他们走向更广阔的天地。</p>'),(30001,'李老师,PPT,PPT地址','PPT怎么制作制么制作制作','3001',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','3',NULL),(30002,'李老师,PPT,PPT地址','PPT怎么制作制么制作制作','3002',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','3',NULL),(30003,'李老师,PPT,PPT地址','PPT怎么制作制么制作制作','3003',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','3',NULL),(30004,'李老师,PPT,PPT地址','PPT怎么制作制么制作制作','3004',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','3',NULL),(30005,'李老师,PPT,PPT地址','PPT怎么制作制么制作制作','3001',NULL,0,'2024-09-13 00:00:00.000','2024-09-13 00:00:00.000','3',NULL);
/*!40000 ALTER TABLE `Information` ENABLE KEYS */;

--
-- Table structure for table `Landing`
--

DROP TABLE IF EXISTS `Landing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Landing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` json NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int NOT NULL DEFAULT '1',
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Landing`
--

/*!40000 ALTER TABLE `Landing` DISABLE KEYS */;
/*!40000 ALTER TABLE `Landing` ENABLE KEYS */;

--
-- Table structure for table `Material`
--

DROP TABLE IF EXISTS `Material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int NOT NULL DEFAULT '1',
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Material`
--

/*!40000 ALTER TABLE `Material` DISABLE KEYS */;
INSERT INTO `Material` VALUES (101,'https://oss.lhdd.club/banner_1.webp','https://oss.lhdd.club/banner_1.webp','material_1',NULL,1,0,'2024-09-18 00:00:00.000','2024-09-18 00:00:00.000'),(102,'https://oss.lhdd.club/banner_2.webp','https://oss.lhdd.club/banner_2.webp','material_2',NULL,1,0,'2024-09-18 00:00:00.000','2024-09-18 00:00:00.000'),(103,'https://oss.lhdd.club/banner_3.webp','https://oss.lhdd.club/banner_3.webp','material_3',NULL,1,0,'2024-09-18 00:00:00.000','2024-09-18 00:00:00.000'),(104,'https://oss.lhdd.club/banner_4.webp','https://oss.lhdd.club/banner_5.webp','material_4',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(105,'https://oss.lhdd.club/banner_4.webp','https://oss.lhdd.club/banner_4.webp','material_5',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(107,'https://oss.lhdd.club/pic/article_sample_1.jpeg','https://oss.lhdd.club/pic/article_sample_1.jpeg','material_7',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(3001,'https://oss.lhdd.club/ui/lesson_sample_1.png','https://oss.lhdd.club/ui/lesson_sample_1.png','lesson_sample_1',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(3002,'https://oss.lhdd.club/ui/lesson_sample_2.png','https://oss.lhdd.club/ui/lesson_sample_2.png','lesson_sample_2',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(3003,'https://oss.lhdd.club/ui/lesson_sample_3.png','https://oss.lhdd.club/ui/lesson_sample_3.png','lesson_sample_3',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(3004,'https://oss.lhdd.club/ui/lesson_sample_4.png','https://oss.lhdd.club/ui/lesson_sample_4.png','lesson_sample_4',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(7001,'https://oss.lhdd.club/icon_school.png','https://oss.lhdd.club/icon_school.png','icon_school',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(7002,'https://oss.lhdd.club/icon_organization.png','https://oss.lhdd.club/icon_organization.png','icon_oganization',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(9001,'https://oss.lhdd.club/avatar_male.png','https://oss.lhdd.club/avatar_male.png','avatar_male',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000'),(9002,'https://oss.lhdd.club/avatar_male.png','https://oss.lhdd.club/avatar_male.png','avatar_female',NULL,1,0,'2024-10-01 00:00:00.000','2024-10-01 00:00:00.000');
/*!40000 ALTER TABLE `Material` ENABLE KEYS */;

--
-- Table structure for table `Permission`
--

DROP TABLE IF EXISTS `Permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Permission`
--

/*!40000 ALTER TABLE `Permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `Permission` ENABLE KEYS */;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permissionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'admin','administrator','4','2024-10-10 00:00:00.000',0,'2024-10-10 00:00:00.000');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;

--
-- Table structure for table `School`
--

DROP TABLE IF EXISTS `School`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `School` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nature` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `area` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

/*!40000 ALTER TABLE `School` DISABLE KEYS */;
/*!40000 ALTER TABLE `School` ENABLE KEYS */;

--
-- Table structure for table `Teach`
--

DROP TABLE IF EXISTS `Teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teach` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `area` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teach`
--

/*!40000 ALTER TABLE `Teach` DISABLE KEYS */;
/*!40000 ALTER TABLE `Teach` ENABLE KEYS */;

--
-- Table structure for table `Tips`
--

DROP TABLE IF EXISTS `Tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tips`
--

/*!40000 ALTER TABLE `Tips` DISABLE KEYS */;
INSERT INTO `Tips` VALUES (1,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','上海','1',NULL,0,'2024-09-19 00:00:00.000','2024-09-26 00:00:00.000'),(2,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','北京','1',NULL,0,'2024-08-29 00:00:00.000','2024-08-28 00:00:00.000'),(3,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','深圳','1',NULL,0,'2024-08-27 00:00:00.000','2024-08-27 00:00:00.000'),(4,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','太远','1',NULL,0,'2024-09-20 00:00:00.000','2024-09-20 00:00:00.000'),(5,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','西藏','1',NULL,0,'2024-09-21 00:00:00.000','2024-09-21 00:00:00.000'),(6,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','湖北','1',NULL,0,'2024-07-01 00:00:00.000','2024-07-01 00:00:00.000'),(8,'点读会让你全身充满力量，酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！酣畅淋漓又意犹未尽，此等感觉，实在妙哉、妙哉！妙哉！妙哉！妙哉！妙哉！妙哉！妙…','天津','1',NULL,0,'2024-07-09 00:00:00.000','2024-07-09 00:00:00.000');
/*!40000 ALTER TABLE `Tips` ENABLE KEYS */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `openId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatarUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `language` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `creditId` int DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `age` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sign_text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_openId_key` (`openId`),
  UNIQUE KEY `User_unionId_key` (`unionId`),
  UNIQUE KEY `User_creditId_key` (`creditId`),
  KEY `User_roleId_fkey` (`roleId`),
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin','123456','9527',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-10-10 00:00:00.000','2024-10-10 00:00:00.000',NULL,NULL,NULL,NULL,NULL,NULL,0,'13817152426',NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;

--
-- Table structure for table `User_Code`
--

DROP TABLE IF EXISTS `User_Code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Code_userId_fkey` (`userId`),
  CONSTRAINT `User_Code_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Code`
--

/*!40000 ALTER TABLE `User_Code` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Code` ENABLE KEYS */;

--
-- Table structure for table `User_Info`
--

DROP TABLE IF EXISTS `User_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leftEyes` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rightEyes` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Info_userId_fkey` (`userId`),
  CONSTRAINT `User_Info_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Info`
--

/*!40000 ALTER TABLE `User_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Info` ENABLE KEYS */;

--
-- Table structure for table `_BannerToMaterial`
--

DROP TABLE IF EXISTS `_BannerToMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_BannerToMaterial` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_BannerToMaterial_AB_unique` (`A`,`B`),
  KEY `_BannerToMaterial_B_index` (`B`),
  CONSTRAINT `_BannerToMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Banner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_BannerToMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_BannerToMaterial`
--

/*!40000 ALTER TABLE `_BannerToMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `_BannerToMaterial` ENABLE KEYS */;

--
-- Table structure for table `_BookToMaterial`
--

DROP TABLE IF EXISTS `_BookToMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_BookToMaterial` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_BookToMaterial_AB_unique` (`A`,`B`),
  KEY `_BookToMaterial_B_index` (`B`),
  CONSTRAINT `_BookToMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_BookToMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_BookToMaterial`
--

/*!40000 ALTER TABLE `_BookToMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `_BookToMaterial` ENABLE KEYS */;

--
-- Table structure for table `_InformationToMaterial`
--

DROP TABLE IF EXISTS `_InformationToMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_InformationToMaterial` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_InformationToMaterial_AB_unique` (`A`,`B`),
  KEY `_InformationToMaterial_B_index` (`B`),
  CONSTRAINT `_InformationToMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_InformationToMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_InformationToMaterial`
--

/*!40000 ALTER TABLE `_InformationToMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `_InformationToMaterial` ENABLE KEYS */;

--
-- Table structure for table `_LandingToMaterial`
--

DROP TABLE IF EXISTS `_LandingToMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_LandingToMaterial` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_LandingToMaterial_AB_unique` (`A`,`B`),
  KEY `_LandingToMaterial_B_index` (`B`),
  CONSTRAINT `_LandingToMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Landing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_LandingToMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_LandingToMaterial`
--

/*!40000 ALTER TABLE `_LandingToMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `_LandingToMaterial` ENABLE KEYS */;

--
-- Table structure for table `_MaterialToTips`
--

DROP TABLE IF EXISTS `_MaterialToTips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_MaterialToTips` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_MaterialToTips_AB_unique` (`A`,`B`),
  KEY `_MaterialToTips_B_index` (`B`),
  CONSTRAINT `_MaterialToTips_A_fkey` FOREIGN KEY (`A`) REFERENCES `Material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_MaterialToTips_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_MaterialToTips`
--

/*!40000 ALTER TABLE `_MaterialToTips` DISABLE KEYS */;
/*!40000 ALTER TABLE `_MaterialToTips` ENABLE KEYS */;

--
-- Table structure for table `_PermissionToRole`
--

DROP TABLE IF EXISTS `_PermissionToRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_PermissionToRole` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_PermissionToRole_AB_unique` (`A`,`B`),
  KEY `_PermissionToRole_B_index` (`B`),
  CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_PermissionToRole`
--

/*!40000 ALTER TABLE `_PermissionToRole` DISABLE KEYS */;
/*!40000 ALTER TABLE `_PermissionToRole` ENABLE KEYS */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3b757afc-0b68-4fa9-aa74-481bc48f4ef2','b66a48e60fa5176556e7498fc3418682fea3417a6e774e9a0682cb2a6b8342c4','2024-09-21 13:04:02.703','20240726052540_',NULL,NULL,'2024-09-21 13:04:02.411',1),('3c6ea3a4-4418-4c0f-b59e-5006d012d9e7','79c101a8cfa06157ec3d3cded8159ba74abe384aa959e80e44622f358ae01955','2024-09-21 13:04:02.408','20240725022619_init',NULL,NULL,'2024-09-21 13:04:01.929',1),('415f10bd-e912-4237-8126-aeae46af38f0','ac1fbeb297fc7e0bef3a29f5269cd07f49e3759d03da64a71436516a541041ad','2024-09-21 13:04:03.726','20240728053055_init',NULL,NULL,'2024-09-21 13:04:03.702',1),('4a10a5f6-9b2e-4fd4-b970-b8161ef0d3cd','808d704ae3a02363ebe7745984060ec48a56dd22120e12b959b5b8a22ab231c4','2024-09-21 13:04:04.016','20240908123809_init',NULL,NULL,'2024-09-21 13:04:03.974',1),('4af6ef05-e396-4e0a-932c-a145d974f6c1','0ca709dafc69d4a562413983719ef70c93bec463247a50fde1efd99ae1c422aa','2024-09-21 13:04:03.672','20240728012628_init',NULL,NULL,'2024-09-21 13:04:03.601',1),('575398b9-423f-470a-9c89-864c47c65264','3b70ee462b84059396ffdc3326cc928652b0097ef7e576022011d8a3d39f0c02','2024-09-21 13:04:03.539','20240728005322_init',NULL,NULL,'2024-09-21 13:04:03.204',1),('60f42d31-f697-40ac-b951-8b0aced6e0a8','0d8e9be20b56e1a1b0b165e3280bb220354178fe5b252e7a78d49effcaf0392d','2024-09-21 13:04:03.171','20240727073652_init',NULL,NULL,'2024-09-21 13:04:03.016',1),('6b057ca1-a404-4f28-bbfa-aed57bba0e86','762e962e1e04537e9e2c2fe0997f8dd68c39a876c7f79790660af6625fbf5721','2024-09-21 13:04:02.827','20240726071258_six',NULL,NULL,'2024-09-21 13:04:02.706',1),('79045cf5-de90-482a-a737-e75e6142407d','8ea0b700738b3ad8dba4217d02a1ab2270b80bf57d74b0ef2a42c398e5b1cf3d','2024-09-21 13:04:03.699','20240728012834_init',NULL,NULL,'2024-09-21 13:04:03.675',1),('80081441-3e59-46cd-a7d0-b950aa53e7b8','3eb6da7b5c55a0ffbefe41e79f9d8829cd69752c7ba3b94a5ee57b442422e455','2024-09-21 13:04:03.948','20240729080447_init',NULL,NULL,'2024-09-21 13:04:03.894',1),('94246808-55fc-4b78-b1da-c7ffec8cb4d0','6ffb6634d279fe5cb86178b5ad0f76dec83d0473614f8468479a2ca2feb34ba4','2024-09-21 13:04:03.013','20240726071816_six',NULL,NULL,'2024-09-21 13:04:02.830',1),('96036b73-2421-48a2-928f-c29b010068b4','3cb4f0839acfbf893f2af224f8727874f9047ccf653f71d0743f308b86b02b27','2024-09-21 13:04:03.754','20240728053407_init',NULL,NULL,'2024-09-21 13:04:03.729',1),('dd2a0241-cf05-4f23-be6e-38230a91781d','75446894718645b63e23fbb742ff8c3eb486d803f584bf4019110b32a92e70a7','2024-09-21 13:04:03.890','20240729054920_init',NULL,NULL,'2024-09-21 13:04:03.757',1),('e6ce3267-80c3-44c1-9f50-66f52c1dc953','b843984ce814d02dc7ff21b0db0988ef1a350d454e596ecf5e62bca8cc66bb69','2024-09-21 13:04:03.200','20240728001947_init',NULL,NULL,'2024-09-21 13:04:03.175',1),('e8152a1c-ee9c-41e6-b145-bd16832a23ce','3763fc3416a12d98919700415bfc62c596638a500fabf7190e435e2009afd9d3','2024-09-21 13:04:09.256','20240921130409_init',NULL,NULL,'2024-09-21 13:04:09.232',1),('eb4190a9-13e3-43a4-a589-558a7ca41c77','2b6b8e1c081d9da6d99183833e918fd36051033be4180f425d3ccbd0c5f32f2e','2024-09-21 13:04:03.971','20240908122522_init',NULL,NULL,'2024-09-21 13:04:03.952',1),('ec903e69-b1e2-47ab-bc51-9cd75766dbfa','9c9282c249bcbf8b37b8feebea19062371e8dc3ece7ff1a417a0b908cfb8ee0b','2024-09-21 13:04:01.926','20240724055556_init',NULL,NULL,'2024-09-21 13:04:01.291',1),('f9c726f9-bad7-4832-afc3-ee10368deee7','7c7887c48c79bb32df9641bf871e077d662afbd2e4ec7e4f445cb6c10c4662f4','2024-09-21 13:04:03.598','20240728011552_init',NULL,NULL,'2024-09-21 13:04:03.546',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;

--
-- Dumping routines for database 'six'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22 20:00:57
