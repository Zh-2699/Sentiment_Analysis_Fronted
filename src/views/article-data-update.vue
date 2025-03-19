<template>
  <div class="article-data-update">
    <!-- 搜索文章 -->
    <SearchBar 
      placeholder="搜索文章..." 
      :isSticky="false" 
      @search="handleSearch" 
    />
    <!-- 分组选择 -->
    <div class="group-selector">
      <div>
        <label for="group-select">选择文章分组：</label>
        <select v-model="selectedGroup" @change="onGroupChange">
          <option value="" disabled>请选择分组</option>
          <option v-for="group in articleGroups" :key="group.id" :value="group.name">
            {{ group.name }}
          </option>
        </select>
      </div>
      <SpiderButton @crawl="crawData" />
    </div>

    <!-- 文章数据管理 -->
    <h1>文章数据管理</h1>
    <div class="article-list">
      <ul v-if="filteredArticles.length">
        <li v-for="article in filteredArticles" :key="article.id">
          <div class="article-header">
            <img :src="article.authorAvatar" alt="avatar" class="article-avatar" />
            <div class="article-info">
              <p><strong>{{ article.title }}</strong></p>
              <p><small>{{ article.authorName }} • {{ article.createdAt }}</small></p>
            </div>
          </div>
          <p class="article-content">{{ article.content }}</p>

          <!-- 数据统计 -->
          <div class="article-meta">
            <span>👍 {{ article.likes }}</span>
            <span>💬 {{ article.comments }}</span>
            <span>🔄 {{ article.shares }}</span>
          </div>

          <!-- 更新数据按钮 -->
          <button class="update-button" @click="updateArticleData(article)">更新数据</button>
        </li>
      </ul>
      <p v-else>暂无数据</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'ArticleDataUpdateView',
  components: {
    SearchBar
  },
  setup() {
    const articles = ref([]);
    const searchQuery = ref('');

    // 获取文章数据
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/articles');
        if (response.status === 200) {
          articles.value = response.data;
        }
      } catch (error) {
        console.error('获取文章数据失败', error);
      }
    };

    // 处理搜索
    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    // 计算筛选后的文章
    const filteredArticles = computed(() => {
      return articles.value.filter(article => 
        article.title.includes(searchQuery.value) || 
        article.content.includes(searchQuery.value)
      );
    });

    // 更新文章数据（点赞、评论、转发）
    const updateArticleData = async (article) => {
      try {
        const response = await axios.put(`http://127.0.0.1:5000/articles/${article.id}/update`);
        if (response.status === 200) {
          article.likes = response.data.likes;
          article.comments = response.data.comments;
          article.shares = response.data.shares;
        }
      } catch (error) {
        console.error('更新文章数据失败', error);
      }
    };

    onMounted(fetchArticles);

    return {
      articles,
      searchQuery,
      filteredArticles,
      handleSearch,
      updateArticleData
    };
  }
};
</script>

<style scoped>
.article-data-update {
  padding: 20px;
  background-color: rgb(245, 247, 251);
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* 文章列表 */
.article-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-list li {
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.article-list li:hover {
  transform: translateY(-5px);
}

/* 文章头部 */
.article-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.article-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.article-info p {
  margin: 0;
}

/* 文章内容 */
.article-content {
  color: #555;
  font-size: 16px;
  margin-bottom: 10px;
}

/* 数据统计 */
.article-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #777;
}

/* 更新按钮 */
.update-button {
  display: block;
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: #3aa876;
}
/* 分组选择器样式 */
.group-selector {
  justify-content:space-between;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.group-selector label {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
  font-size: 16px;
}

.group-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 200px;
}

.group-selector select:hover {
  border-color: #42b983;
}

.group-selector select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}
</style>
