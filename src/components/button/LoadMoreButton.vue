<template>
    <div class="load-more">
      <button @click="handleClick" :disabled="loading">
        <span v-if="loading">加载中...</span>
        <span v-else>加载更多</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // 接收 props
  const props = defineProps({
    loading: Boolean, // 是否处于加载状态
    hasMore: Boolean, // 是否还有更多数据
  });
  
  // 触发点击事件
  const emit = defineEmits(['load-more']);
  const handleClick = () => {
    if (!props.loading && props.hasMore) {
      emit('load-more'); // 触发父组件的事件
    }
  };
  </script>
  
  <style scoped>
  .load-more {
    text-align: center;
    margin: 20px 0;
  }
  
  .load-more button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .load-more button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .load-more button:hover:not(:disabled) {
    background-color: #3aa876;
  }
  </style>
  