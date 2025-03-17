<template>
  <div class="sentiment-analysis-page">
    <div class="page-header">
      <h1>情绪分析</h1>
      <p>文章及其评论的情绪统计分析,通过文章分析点击跳转到这个界面</p>
    </div>

    <!-- 文章信息 -->
    <div v-if="article" class="analysis-card main-article">
      <div class="article-header">
        <img :src="article.authorAvatar" alt="avatar" class="article-avatar" />
        <div class="article-author-info">
          <p><strong>{{ article.authorName }}</strong></p>
          <p><small>{{ formatDate(article.createdAt) }} | {{ article.region || '未知' }}</small></p>
        </div>
      </div>
      <div class="article-content">
        <p>{{ article.content }}</p>
        <div class="article-meta">
          <span>👍 {{ article.likeNum }}</span>
          <span>💬 {{ article.commentNum }}</span>
          <span>🔄 {{ article.repostsNum }}</span>
        </div>
      </div>
      <div class="sentiment-result">
        <p>文章情绪:  <span :class="getSentimentClass(articleSentiment)">{{ articleSentiment }}</span></p>
      </div>
    </div>

    <!-- 统计图表 -->
     <div class="page-header">
      <h1>评论及情绪分析统计</h1>
     </div>
    
    <!-- 统计图表 -->
    <div v-if="comments.length" class="statistics-container">
      <WordCloudChart />
      <sentimentChart />
      <SourceMapChart />
    </div>


    <!-- 评论列表 -->
    <div v-if="comments.length" class="comments-section">
      <div class="page-header">
        <h1>评论详情</h1>
      </div>
      
      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <img :src="comment.author_avatar" alt="avatar" class="comment-avatar" />
            <div class="comment-author-info">
              <p><strong>{{ comment.author_name }}</strong></p>
              <p><small>{{ comment.region }}</small></p>
            </div>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
          <div class="comment-meta">
            <span>👍 {{ comment.likes_counts || 0 }}</span>
            <span>🗓️ {{ formatDate(comment.created_at) }}</span>
            <span :class="getSentimentClass(comment.sentiment)">{{ comment.sentiment }}</span>
          </div>
          <button class="analysis-button" @click="showArticleDetail($event, comment)">详情</button>
        </div>
      </div>
    </div>

    <!-- 无评论时 -->
    <div v-else class="empty-state">
      <p>暂无评论数据</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import SentimentChart from './charts/SentimentChart.vue'
import SourceMapChart from './charts/SourceMapChart.vue';
import WordCloudChart from './charts/WordCloudChart.vue';
const article = ref(null);
const comments = ref([]);
const articleSentiment = ref('中立');
const echartsContainer = ref(null);

// 预设文章数据
const articleData = {
  id: 1,
  authorName: "张三",
  authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
  createdAt: "2024-03-17T12:30:00",
  region: "北京",
  content: "今天的天气真不错，阳光明媚，适合出去散步。",
  likeNum: 120,
  commentNum: 5,
  repostsNum: 30,
  sentiment: "积极"
};

// 预设评论数据
const commentData = [
  {
    id: 1,
    author_name: "李四",
    author_avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    region: "上海",
    content: "确实，今天的天气很好，我刚刚去跑步了！",
    likes_counts: 10,
    created_at: "2024-03-17T13:00:00",
    sentiment: "积极"
  },
  {
    id: 2,
    author_name: "王五",
    author_avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    region: "广州",
    content: "虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。虽然天气好，但空气质量一般。",
    likes_counts: 5,
    created_at: "2024-03-17T13:15:00",
    sentiment: "中立"
  },
  {
    id: 3,
    author_name: "赵六",
    author_avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    region: "深圳",
    content: "可惜我今天要加班，根本没时间出去玩。",
    likes_counts: 2,
    created_at: "2024-03-17T14:00:00",
    sentiment: "消极"
  }
];

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 获取情绪标签样式
const getSentimentClass = (sentiment) => {
  return {
    'sentiment-tag': true,
    'sentiment-positive': sentiment === '积极',
    'sentiment-neutral': sentiment === '中立',
    'sentiment-negative': sentiment === '消极'
  };
};

// 模拟数据加载
onMounted(() => {
  article.value = articleData;
  articleSentiment.value = articleData.sentiment;
  comments.value = commentData;

  nextTick(() => {
    drawECharts();
  });
});

// 绘制 ECharts 图表
const drawECharts = () => {
  if (!echartsContainer.value) return;

  const sentimentCounts = {
    '积极': comments.value.filter(c => c.sentiment === '积极').length,
    '中立': comments.value.filter(c => c.sentiment === '中立').length,
    '消极': comments.value.filter(c => c.sentiment === '消极').length
  };

  const chart = echarts.init(echartsContainer.value);
  chart.setOption({
    title: { text: '评论情绪分布', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%', left: 'center' },
    series: [
      {
        name: '情绪分布',
        type: 'pie',
        radius: '50%',
        data: [
          { value: sentimentCounts['积极'], name: '积极' },
          { value: sentimentCounts['中立'], name: '中立' },
          { value: sentimentCounts['消极'], name: '消极' }
        ]
      }
    ]
  });
};
</script>

<style scoped>
.sentiment-analysis-page {
  padding: 25px;
  background-color: #f5f7fb;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.page-header {
  margin-bottom: 20px;
  margin-top: 10px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
}

/* 文章分析卡片 */
.analysis-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
}

.analysis-card:hover {
  transform: translateY(-3px);
}
/* 文章信息 */
.article-content {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
}

.sentiment-result {
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}

.sentiment-tag {
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 14px;
}

.sentiment-positive {
  margin-left: 10px;
  background-color: #e8f5e9;
  color: #2e7d32;
}

.sentiment-neutral {
  margin-left: 10px;
  background-color: #fff3e0;
  color: #ef6c00;
}

.sentiment-negative {
  margin-left: 10px;
  background-color: #ffebee;
  color: #c62828;
}

/* 统计图表容器 */
.statistics-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  margin-top: 30px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}
/* 让图表保持均匀大小 */
.statistics-container > * {
  flex: 1;
  min-width: 300px; /* 确保每个图表最小宽度 */
  max-width: 32%; /* 让每个图表占据三分之一 */
  height: 400px;
  padding: 15px;
  /* background: #f9f9f9; */
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  background: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
}

.comment-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 12px;
}

.comment-author-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.comment-author-info p {
  margin: 0;
  font-size: 15px;
  color: #333;
}

.comment-author-info small {
  font-size: 12px;
  color: #777;
}

.comment-content {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 8px;
  margin-top: 10px;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #777;
  margin-top: 10px;
}

.comment-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 按钮优化 */
.analysis-button {
  position: absolute;
  right: 15px;
  top: 25%;
  transform: translateY(-50%);
  background-color: #42b983;
  color: white;
  padding: 6px 14px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.analysis-button:hover {
  background-color: #369a6e;
}

.page-header {
  margin-bottom: 30px;
  margin-top: 15px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
}
.article-avatar, .comment-avatar {
  width: 50px;  /* 统一头像大小 */
  height: 50px;
  border-radius: 50%;  /* 保证头像圆形 */
  object-fit: cover;  /* 防止图片拉伸 */
  border: 2px solid #ddd; /* 添加边框增强层次感 */
  margin-right: 12px;
  transition: transform 0.3s ease-in-out;
}

/* 鼠标悬浮头像略微放大 */
.article-avatar:hover, .comment-avatar:hover {
  transform: scale(1.1);
  border-color: #42b983;
}

/* 个人信息区域 */
.article-header, .comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 作者信息 */
.article-author-info, .comment-author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.article-author-info p, .comment-author-info p {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.article-author-info small, .comment-author-info small {
  font-size: 12px;
  color: #777;
}
</style>
