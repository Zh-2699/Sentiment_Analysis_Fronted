<template>
  <div class="crawling-data">
    <div class="page-header">
      <h1>数据爬取</h1>
    </div>

    <!-- 搜索爬取 -->
    <div class="search-section">
      <h2>搜索爬取</h2>
      <SearchBar @search="fetchSearchData" placeholder="输入关键词进行爬取" />
      <div v-if="searchResults.length" class="results">
        <h3>搜索结果：</h3>
        <ul>
          <li v-for="(item, index) in searchResults" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 热点话题爬取 -->
    <div class="hot-topics-section">
      <h2>热点话题爬取</h2>
      <div class="hot-topics">
        <button v-for="(topic, index) in hotTopics" :key="index" @click="fetchTopicData(topic)">
          {{ topic }}
        </button>
      </div>
      <div v-if="topicResults.length" class="results">        
      </div>
    </div>

    <!-- 文章展示区域 -->
    <div class="article-section">
      <div class="page-header">
        <h1>数据展示</h1>
      </div>
      <div v-if="articles.length > 0">
        <ul>
          <li v-for="article in articles" :key="article.id" @click="viewArticle(article)">
            <div class="article-header">
              <img :src="article.authorAvatar" alt="avatar" class="article-avatar" />
              <div class="article-author-info">
                <p><strong>{{ article.authorName }}</strong></p>
                <p><small>{{ article.createdAt }} 来自 {{ article.region || '未知'}}</small></p>
              </div>
            </div>
            <p>{{ article.content }}</p>
            <div class="article-meta">
              <span>👍 {{ article.likeNum }}</span>
              <span>💬 {{ article.commentNum }}</span>
              <span>🔄 {{ article.repostsNum }}</span>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>暂无文章数据</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "CrawlingDataView",
  components: { SearchBar },
  setup() {
    const store = useStore();
    const articles = computed(() => store.getters.articles); // 获取 Vuex 里的文章数据

    const viewArticle = (article) => {
      console.log("点击查看文章:", article);
      window.open(article.detailUrl, "_blank");
    };

    onMounted(() => {
      store.dispatch("fetchArticles"); // 页面加载时获取文章数据
    });

    return { articles, viewArticle };
  },
  data() {
    return {
      searchResults: [],
      hotTopics: ["人工智能", "新能源", "股票市场", "科技前沿", "国际新闻"],
      topicResults: []
    };
  },
  methods: {
    fetchSearchData(query) {
      if (!query) {
        alert("请输入搜索关键词！");
        return;
      }
      this.searchResults = [`数据 1 关联: ${query}`, `数据 2 关联: ${query}`, `数据 3 关联: ${query}`];
    },
    fetchTopicData(topic) {
      this.topicResults = [`话题 ${topic} - 相关数据 1`, `话题 ${topic} - 相关数据 2`, `话题 ${topic} - 相关数据 3`];
    }
  }
};
</script>


<style scoped>
.crawling-data {
  padding: 20px;
  background-color: rgb(248, 250, 254);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  color: #555;
}

.search-section,
.hot-topics-section {
  background: #fff;
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hot-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hot-topics button {
  padding: 8px 15px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.hot-topics button:hover {
  background: #218838;
}

.results {
  margin-top: 10px;
}

.results ul {
  list-style: none;
  padding: 0;
}

.results li {
  background: #f1f1f1;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
}
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
</style>
