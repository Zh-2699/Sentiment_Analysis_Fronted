<template>
  <div class="hot-topic-analysis">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>话题热点分析</h1>
      <p>分析当前热门话题的情感趋势和关键词分布</p>
    </div>

    <!-- 话题信息 -->
    <div class="topic-info analysis-card">
      <h2>{{ topic.title }}</h2>
      <p>{{ topic.description }}</p>
    </div>

    <!-- 统计图表 -->
    <div class="statistics-container">
        <SentimentChart />
        <WordCloudChart />
        <SourceMapChart />
      
    </div>
    <div class="prediction-container">
      <PredictionPieLineChart />
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import SentimentChart from "../views/charts/SentimentChart.vue";
import WordCloudChart from "../views/charts/WordCloudChart.vue";
import PredictionLineChart from "../views/charts/PredictionLineChart.vue";
import PredictionPieLineChart from "../views/charts/PredictionPieLineChart.vue";
import SourceMapChart from "../views/charts/SourceMapChart.vue";

// 话题数据
const topic = ref({
  title: "AI 技术对未来的影响",
  description:
    "人工智能技术的发展正在改变社会的各个方面，从医疗、教育到金融行业。人们对其未来发展持不同的态度。",
});
</script>

<style scoped>
/* 页面整体样式 */
.hot-topic-analysis {
  padding: 20px;
  background-color: rgb(245, 247, 251);
}

/* 页面头部 */
.page-header {
  /* text-align: center; */
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
}

/* 话题信息卡片 */
.topic-info {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.topic-info h2 {
  font-size: 20px;
  color: #333;
}

.topic-info p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 统计图表 */
.statistics-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; /* 让图表均匀分布 */
  align-items: stretch; /* 让子元素撑满整个高度 */
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
.prediction-container{
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; /* 让图表均匀分布 */
  align-items: stretch; /* 让子元素撑满整个高度 */
  margin-top: 30px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 400px; 
}




/* 响应式布局：小屏幕时让图表垂直排列 */
@media (max-width: 768px) {
  .statistics-container {
    flex-direction: column;
    align-items: center;
  }

  .chart-container {
    max-width: 100%;
  }
}
</style>
