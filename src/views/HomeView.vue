<template>
  <div class="home-page">
    <SearchBar 
      placeholder="搜索你感兴趣的内容..." 
      :isSticky="false" 
      @search="handleSearch" 
    />
    <!-- 核心功能入口 -->
    <h1>快速开始</h1>
    <div class="function-cards">
      <div class="card" @click="toSpider">
        <i class="fas fa-spider"></i>
        <h3>爬取数据</h3>
      </div>
      <div class="card" @click="toArticleAnalysis">
        <i class="fas fa-file-alt"></i>
        <h3>文章分析</h3>
      </div>
      <div class="card" @click="toSentimentAnalysis">
        <i class="fas fa-bell"></i>
        <h3>舆情分析</h3>
      </div>
      <div class="card" @click="toDataManagement">
        <i class="fas fa-database"></i>
        <h3>数据管理</h3>
      </div>
    </div>

    <!-- 数据概览 -->
    <h1>数据概览</h1>
      <div class="data-overview">
        <div class="sentiment-distribution">
            <SentimentChart />
      </div>
      <div class="hot-topics" @click="toHotTopicsAnaylsis(hotTopics)">
        <h3><i class="fas fa-fire"> 热点话题 TOP10</i></h3>
        <ol v-if="hotTopics.length">
          <li v-for="(topic, index) in hotTopics.slice(0, 10)" :key="index">
            <span class="rank">{{ index + 1 }}</span>
            <span class="topic-text">{{ topic.word || topic.note }} .... {{ topic.num }}</span> 
            <span class="topic-num"></span> 
            <img v-if="topic.icon" :src="topic.icon" alt="" class="topic-icon">
          </li>
        </ol>
        <p v-else>加载中...</p>
      </div>
      <!-- 热点话题热度排名 -->
      <div class="sentiment-distribution">
        <TopicChart />
      </div>
      <!-- 地图展示地点来源 -->
      <div class="sentiment-distribution">
        <SourceMapChart />
      </div>
      <!-- 每日新增文章 -->
      <div class="chart-box">
        <DailyChart />
      </div>
      <!-- 热门关键词 -->
      <div class="sentiment-distribution">
        <WordCloudChart />
      </div>
      
    </div>
    <!-- 最新舆情文章 -->
      <ArticleList 
          :articles="articles" 
          :hasMore="hasMore" 
          title="最新文章数据" 
          @load-more="loadMoreArticles" 
          @view-article="viewArticle"
          @analyze-article="analyzeArticle"
        />

  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts4 from 'echarts4'; // 使用 echarts4
import axios from 'axios';
import * as echarts from 'echarts'; // 引入 ECharts
import 'echarts-wordcloud'; // 引入词云图插件
import SentimentChart from './charts/SentimentChart.vue'; // 导入情感分布组件
import TopicChart from './charts/TopicChart.vue'; // 导入热点话题组件
import SourceMapChart from './charts/SourceMapChart.vue'; // 导入地点来源组件
import DailyChart from './charts/DailyChart.vue'; // 导入每日新增文章组件
import WordCloudChart from './charts/WordCloudChart.vue'; // 导入热门关键词组件
import HotTopics from './charts/HotTopics.vue'; // 导入热点话题组件
import { useRouter } from 'vue-router';
import SearchBar from '../components/SearchBar.vue';
import ArticleList from '../components/ArticleList.vue';

export default {
  name: 'HomeView',
  components: {
    SentimentChart,
    TopicChart,
    SourceMapChart,
    DailyChart,
    WordCloudChart,
    HotTopics,
    SearchBar,
    ArticleList
  },
  setup() {
    const hotTopics = ref([]); // 热点话题数据
    const sentimentChart = ref(null);
    const trendChart = ref(null);
    const topicChart = ref(null);
    const sourceMapChart = ref(null); // 地图展示地点来源的 ref
    const dailyChart = ref(null);
    const wordCloudChart = ref(null);
    const router = useRouter();
    const articles = ref([]); // 文章列表
    const hasMore = ref(true);

    const handleSearch = (searchValue) =>{
      console.log(searchValue);
    }
    const getHotSearch = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/hotSearch');
        if (response.status === 200) {
          hotTopics.value = response.data;
        }
      } catch (error) {
        console.error('获取热搜失败', error);
      }
    };
    const toHotTopicsAnaylsis = (hotTopics) => {
      console.log(hotTopics);
    };
    const toSpider = () => {
      console.log('跳转到爬取数据页面');
      router.push('/crawling-data');
    };
    const toArticleAnalysis = () => {
      // 跳转到article-analysis
      router.push("/article-analysis");
    };
    const toSentimentAnalysis = () => {
      router.push("/sentiment-analysis");
    };
    const toDataManagement = () => {
      router.push('/article-data-update');

    };
    // 加载更多文章
    const loadMoreArticles = () => {
      console.log('加载更多文章...');
      // 这里可以增加加载更多的逻辑
      hasMore.value = false; // 假设加载完了
    };

    // 查看文章
    const viewArticle = (article) => {
      console.log('查看文章:', article);
      window.open(article.detailUrl, '_blank');
    };

    // 分析文章
    const analyzeArticle = (article) => {
      console.log('分析文章:', article);
      // 这里可以添加分析文章的逻辑
    };

    onMounted(() => {
      getHotSearch();

    });

    return {
      hotTopics,
      sentimentChart,
      trendChart,
      topicChart,
      sourceMapChart, // 返回 sourceMapChart
      dailyChart,
      wordCloudChart,
      articles,
      hasMore,
      toHotTopicsAnaylsis,
      toSpider,
      toArticleAnalysis,
      toSentimentAnalysis,
      toDataManagement,
      handleSearch,
      loadMoreArticles,
      viewArticle,
      analyzeArticle,
    };
  },
};
</script>

<style scoped>
.article-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: rgb(245, 247, 251);
}

/* 数据概览 */
.data-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 响应式网格 */
  gap: 20px;
  margin-bottom: 30px;
  padding: 10px;
  align-items: stretch; /* 让所有子元素高度一致 */
}


.chart-box {
  background-color: white;
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 柔和阴影 */
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px; /* 确保足够高度 */
}

.charts {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
.sentiment-distribution {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}
.sentiment-distribution h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}
.home-page {
  padding: 20px;
  background-color: rgb(245, 247, 251);
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

/* 核心功能卡片样式 */
.function-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.function-cards .card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.function-cards .card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.function-cards .card i {
  font-size: 42px;
  color: #42b983;
  margin-bottom: 10px;
}

.function-cards .card h3 {
  font-size: 20px;
  color: #333;
}

/* 数据概览样式对齐调整 */
.data-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.data-overview > div {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.data-overview h3 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
}

.charts.placeholder {
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #999;
}

/* 微博热搜样式 */
.hot-topics {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  cursor: pointer;
  min-width: 320px;
}
.hot-topics ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hot-topics li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}


.hot-topics .rank {
  font-weight: bold;
  color: #e74c3c;
  margin-right: 10px;
}

.hot-topics .topic-text {
  flex: 1;
  margin-right: 10px;
}
.hot-topics .topic-num {
  margin-right: 10px;
}

.hot-topics li:last-child {
  border-bottom: none;
}
.hot-topics h3 {
  color: #e74c3c;
  margin-left: 10px;
}
.topic-icon {
  width: 24px;
  height: 24px;
  object-fit: cover;
}

/* 实时动态样式 */
.realtime-updates {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 让它填充剩余空间 */
  min-height: 320px; /* 保持与其他模块一致 */
  overflow-y: auto; /* 当内容过多时滚动 */
}


.realtime-updates h3 {
  font-size: 20px;
  color: #333;
}

.realtime-updates ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
}

.realtime-updates ul li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

.realtime-updates ul li:last-child {
  border-bottom: none;
}
</style>
