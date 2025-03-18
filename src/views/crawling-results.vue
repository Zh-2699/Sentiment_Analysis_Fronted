<template>
  <div class="crawling-results">
    <div class="page-header">
      <h1>爬取结果</h1>
    </div>

    <!-- 文章展示区域 -->
    <ArticleList 
      :articles="articles" 
      :hasMore="hasMore" 
      title="爬取的文章数据" 
      @load-more="loadMoreArticles" 
      @view-article="viewArticle"
      @analyze-article="analyzeArticle"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ArticleList from '../components/ArticleList.vue';

const store = useStore();
const articles = computed(() => store.getters.selectedArticle || []); // 从 Vuex 获取爬取的文章
const hasMore = ref(true); // 控制是否可以加载更多

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
  store.dispatch('fetchArticles'); // 页面加载时获取文章数据
});
</script>

<style scoped>
.crawling-results {
  padding: 20px;
  background-color: rgb(248, 250, 254);
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
}
</style>
