// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    isDarkMode: false,   // 主题样式
    selectedArticle: null,   // 存储选择的文章
    selectedGroup: '热门', // 存储选择的分组
    articles: []  // 🔹 添加文章列表
  },
  mutations: {
    TOGGLE_MODE(state, mode) {
      state.isDarkMode = mode;
    },
    SET_SELECTED_ARTICLE(state, article) {
      state.selectedArticle = article;  // 设置选中的文章
    },
    CLEAR_SELECTED_ARTICLE(state) {
      state.selectedArticle = null;  // 清除选中的文章
    },
    SET_SELECTED_GROUP(state, group) {
      state.selectedGroup = group;  // 设置选中的分组
    },
    SET_ARTICLES(state, articles) {  // 🔹 存储文章数据
      state.articles = articles;
    }
  },
  actions: {
    changeMode({ commit }, mode) {
      commit('TOGGLE_MODE', mode);
    },
    setSelectedArticles({ commit }, article) {
      commit('SET_SELECTED_ARTICLE', article);  // 设置选中的文章
    },
    clearSelectedArticle({ commit }) {
      commit('CLEAR_SELECTED_ARTICLE');  // 清除选中的文章
    },
    setSelectedGroup({ commit }, group) {
      commit('SET_SELECTED_GROUP', group); // 设置选中的分组
    },
    async fetchArticles({ commit }, group = '热门') { // 🔹 文章数据请求
      try {
        const response = await fetch(`http://127.0.0.1:5000/article/data?group=${group}`);
        const data = await response.json();
        commit('SET_ARTICLES', data.reverse());  // 🔹 存储到 Vuex
      } catch (error) {
        console.error('获取文章数据失败', error);
      }
    }
  },
  getters: {
    isDarkMode: (state) => state.isDarkMode,
    selectedArticle: (state) => state.selectedArticle,  // 获取当前选中的文章
    selectedGroup: (state) => state.selectedGroup, // 获取当前选中的分组
    articles: (state) => state.articles  // 🔹 获取 Vuex 里的文章列表
  },
  plugins: [
    createPersistedState({
      key: 'Fudaheng',
      paths: ['isDarkMode', 'selectedArticle', 'selectedGroup', 'articles'],
      storage: window.localStorage
    })
  ]
});

export default store;
