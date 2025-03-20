<!-- crawlDialog.vue -->
<template>
    <div v-if="isVisible" class="dialog-overlay">
      <div class="dialog-box">
        <h3>选择爬取方式</h3>
        <p>请选择要爬取的数据范围：</p>
        <div class="button-group">
          <button @click="handleCrawl('all')">爬取全部数据</button>
          <button @click="handleCrawl('current')">爬取当前话题数据</button>
        </div>
        <button class="close-button" @click="closeDialog">取消</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits, defineProps } from 'vue';
  
  const emit = defineEmits(['crawl', 'close']);
  const props = defineProps({
    isVisible: Boolean, // 控制对话框是否可见
  });
  
  // 触发爬取事件，并正确传递 `done`
  const handleCrawl = () => {
    emit('crawl', (done) => { 
      // console.log("✅ CrawlDialog: 触发 crawl 事件");
      emit('close'); // 关闭对话框
    });
  };
  
  // 关闭对话框
  const closeDialog = () => {
    emit('close');
  };
  </script>
  
  
  
  <style scoped>
  /* 遮罩层 */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  /* 对话框 */
  .dialog-box {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* 按钮 */
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .button-group button {
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    width: 45%;
    background-color: #42b983;
    color: white;
  }
  
  .button-group button:hover {
    background-color: #3aa876;
  }
  
  .close-button {
    margin-top: 10px;
    padding: 8px 12px;
    background: #ccc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-button:hover {
    background: #999;
  }
  </style>
  