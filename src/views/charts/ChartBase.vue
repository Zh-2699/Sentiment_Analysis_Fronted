<!-- components/ChartBase.vue -->
<template>
    <div class="chart-container" ref="chartRef"></div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  
  export default {
    props: {
      options: Object // 传入的 ECharts 配置项
    },
    setup(props) {
      const chartRef = ref(null);
      let chartInstance = null;
  
      // 初始化图表
      const initChart = () => {
        if (chartRef.value) {
          chartInstance = echarts.init(chartRef.value);
          if (props.options) {
            chartInstance.setOption(props.options);
          }
        }
      };
  
      watch(() => props.options, (newOptions) => {
        if (chartInstance && newOptions) {
          chartInstance.setOption(newOptions);
        }
      }, { deep: true });
  
      onMounted(() => {
        initChart();
      });
  
      return { chartRef };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 300px;
  }
  </style>
  