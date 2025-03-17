<template>
  <div class="hot-topics">
    <div class="page-header">
      <h1>热点话题分析</h1>
    </div>
    
    <!-- <p>这里展示热点话题榜单和趋势分析图表。</p> -->

    <div class="hot-topics-container">
      <!-- 左侧：热点话题榜单 -->
      <div class="hot-topics-list">
        <HotTopics />
      </div>

      <!-- 右侧：话题热度 & 词云图 -->
      <div class="hot-topics-content">
        <!-- 上方：话题热度柱状图 -->
        <div class="hot-topics-chart">
          <TopicChart />
        </div>
        <!-- 下方：话题词云图 -->
        <div class="hot-topics-wordcloud">
          <WordCloudChart />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import HotTopics from './charts/HotTopics.vue';
import TopicChart from './charts/TopicChart.vue';
import WordCloudChart from './charts/WordCloudChart.vue';

export default {
  name: 'WeiboHotTopicsView',
  components: { 
    HotTopics,
    TopicChart,
    WordCloudChart,
  }
};
</script>

<style scoped>
/* 页面整体样式 */
.hot-topics {
  background-color: rgb(248, 250, 254);
  padding: 20px;
  height: 640px;
}

/* 容器：热点榜单 + 话题图表 */
.hot-topics-container {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 97.5%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 左侧：热点话题榜单 */
.hot-topics-list {
  flex: 1;
  min-width: 300px;
  max-width: 35%; /* 让榜单固定在左侧 */
}

/* 右侧内容（热度+词云） */
.hot-topics-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 话题热度柱状图（占上部分） */
.hot-topics-chart {
  flex: 1;
  min-height: 300px;
}

/* 词云图（占下部分） */
.hot-topics-wordcloud {
  flex: 1;
  min-height: 300px;
  margin-top: 20px;
}

/* 小屏幕适配 */
@media (max-width: 900px) {
  .hot-topics-container {
    flex-direction: column;
  }
  .hot-topics-list {
    max-width: 100%;
  }
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

</style>
