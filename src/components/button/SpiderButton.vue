<template>
    <div class="spider">
      <div class="card" @click="emitCrawl">
        <i class="fas fa-spider"></i>
        <h3>爬取数据</h3>
      </div>
    </div>
  </template>
  
  <script setup>
  // import { defineEmits } from 'vue';
  
  const emit = defineEmits(['crawl']);
  
  // 触发事件，通知父组件
  const emitCrawl = () => {
    emit('crawl');
  };
  </script>
  
  <style scoped>
  .spider {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .spider .card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .spider .card i {
    font-size: 24px;
    color: #42b983;
  }
  
  .spider .card h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  .spider .card:hover {
    transform: translateY(-5px);
    background-color: #f9f9f9;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  </style>
  