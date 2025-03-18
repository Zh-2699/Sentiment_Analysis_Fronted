<template>
    <div class="article-list">
      <h2>{{ title }}</h2>
      <ul v-if="articles.length > 0">
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
          <!-- 文章分析按钮 -->
          <button class="analysis-button" @click.stop="analyzeArticle(article)">分析</button>
        </li>
      </ul>
      <p v-else>暂无文章数据</p>
  
      <!-- 加载更多按钮 -->
      <LoadMoreButton v-if="hasMore" @click="loadMore" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import LoadMoreButton from './button/LoadMoreButton.vue';
  
  const props = defineProps({
    articles: Array,
    hasMore: Boolean,
    title: {
      type: String,
      default: '文章列表'
    }
  });
  
  const emit = defineEmits(['load-more', 'view-article', 'analyze-article']);
  
  const loadMore = () => emit('load-more');
  const viewArticle = (article) => emit('view-article', article);
  const analyzeArticle = (article) => emit('analyze-article', article);
  </script>
  
  <style scoped>
  .article-list {
    padding: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .article-list h2 {
    font-size: 24px;
    color: #333;
    border-bottom: 2px solid #42b983;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .article-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .article-list li {
    padding: 15px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease;
    position: relative;
  }
  
  .article-list li:hover {
    background-color: #f9f9f9;
  }
  
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
  
  .article-meta {
    display: flex;
    gap: 15px;
    font-size: 14px;
    color: #777;
  }
  
  .analysis-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #42b983;
    color: white;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .analysis-button:hover {
    background-color: #3aa876;
  }
  </style>
  