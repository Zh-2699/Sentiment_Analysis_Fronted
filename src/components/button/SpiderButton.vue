<!-- spiderButton.vue -->
<template>
  <div class="spider">
    <div class="card" @click="emitCrawl" :class="{ 'disabled': loading }" >
      <i v-if="showIcon" class="fas fa-spider"></i>
      {{ loading ? '爬取中...' : buttonText }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['crawl']);

const props = defineProps({
  buttonText: { type: String, default: '爬取数据' },
  showIcon: { type: Boolean, default: true },
});

const loading = ref(false);

const emitCrawl = () => {
  if (loading.value) return; // 防止重复点击
  loading.value = true;

  emit('crawl', () => {
    // console.log("✅ SpiderButton: done() 被调用, 按钮状态恢复");
    loading.value = false;
  });
  setTimeout(() => { 
    if (loading.value) { 
      // console.warn("⚠️ SpiderButton: done() 可能未被调用，强制恢复按钮");
      loading.value = false; 
    }
  }, 5000); // **5秒后如果 `done()` 未执行，则强制恢复**
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
  .spider .card.disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}
  </style>
  