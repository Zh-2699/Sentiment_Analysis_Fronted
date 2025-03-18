<template>
    <div class="empty-state">
      <i :class="iconClass"></i>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      icon: {
        type: String,
        default: "fas fa-comment-slash" // 默认图标
      },
      message: {
        type: String,
        default: "暂无数据"
      }
    },
    computed: {
      iconClass() {
        return `empty-icon ${this.icon}`; // 处理 class 绑定
      }
    }
  };
  </script>
  
  <style scoped>
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .empty-icon {
    font-size: 32px;
    margin-bottom: 15px;
    color: #a4b0be; /* 默认灰色 */
  }
  
  .empty-state p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  </style>
  