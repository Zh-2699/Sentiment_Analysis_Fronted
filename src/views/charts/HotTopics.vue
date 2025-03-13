<template>
    <div class="hot-topics" @click="toHotTopicsAnalysis">
      <h3><i class="fas fa-fire"> 热点话题 TOP10</i></h3>
      <ol v-if="hotTopics.length">
        <li v-for="(topic, index) in hotTopics.slice(0, 10)" :key="index">
          <span class="rank">{{ index + 1 }}</span>
          <span class="topic-text">{{ topic.word || topic.note }} .... {{ topic.num }}</span>
          <img v-if="topic.icon" :src="topic.icon" alt="" class="topic-icon">
        </li>
      </ol>
      <p v-else>加载中...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    name: "HotTopics",
    setup(_, { emit }) {
      const hotTopics = ref([]);
  
      // 请求热点话题数据
      const fetchHotTopics = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5000/hotSearch");
          if (response.status === 200) {
            hotTopics.value = response.data;
          }
        } catch (error) {
          console.error("获取热搜失败", error);
        }
      };
  
      // 点击事件，通知父组件
      const toHotTopicsAnalysis = () => {
        emit("clickTopic", hotTopics.value);
      };
  
      onMounted(() => {
        fetchHotTopics();
      });
  
      return {
        hotTopics,
        toHotTopicsAnalysis,
      };
    },
  };
  </script>
  
  <style scoped>
  .hot-topics {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: 400px;
    overflow-y: auto;
    cursor: pointer;
    min-width: 320px;
  }
  .hot-topics ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .hot-topics li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
  }
  .hot-topics .rank {
    font-weight: bold;
    color: #e74c3c;
    margin-right: 10px;
  }
  .hot-topics .topic-text {
    flex: 1;
    margin-right: 10px;
  }
  .topic-icon {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }
  .hot-topics h3 {
  color: #e74c3c; /* 亮红色，与排名数字颜色一致 */
  font-weight: bold; /* 加粗 */
  display: flex;
  align-items: center;
}

  </style>
  