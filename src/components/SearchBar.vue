<template>
    <!-- 搜索框 -->
    <div class="search-bar" :class="{ 'sticky-search': isSticky }">
      <input 
        :placeholder="placeholder" 
        v-model="searchQuery" 
        @input="onInput" 
      />
      <button @click="emitSearch">搜索</button>
    </div>
</template>

<script setup>
    import { ref, defineProps, defineEmits } from 'vue';

    const props = defineProps({
    placeholder: {
        type: String,
        default: "请输入搜索内容..."
    },
    isSticky: {
        type: Boolean,
        default: false
    }
    });

    // 定义事件
    const emit = defineEmits(["search"]);
    const searchQuery = ref("");

    // 触发搜索事件
    const emitSearch = () => {
        emit("search", searchQuery.value);
    };

    // 实时输入监听
    const onInput = (event) => {
        searchQuery.value = event.target.value;
    };
</script>

<style scoped>
/* 搜索框样式 */
.search-bar {
display: flex;
justify-content: center;
margin-bottom: 30px;
transition: all 0.3s ease;
}

.sticky-search {
position: fixed;
margin-top: 15px;
left: 50%;
transform: translate(-50%, -50%);
z-index: 9;
padding: 10px;
width: 80%;
}

.search-bar input {
width: 60%;
padding: 12px;
border: 1px solid #ccc;
border-right: none;
border-radius: 5px 0 0 5px;
font-size: 16px;
}

.search-bar button {
padding: 12px 20px;
background-color: #42b983;
color: white;
border: none;
border-radius: 0 5px 5px 0;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;
}

.search-bar button:hover {
background-color: #3aa876;
}
</style>
