<!-- components/SentimentChart.vue -->
<template>
    <ChartBase :options="chartOptions" />
  </template>
  
  <script>
  import ChartBase from './ChartBase.vue';
  
  export default {
    components: { ChartBase },
    setup() {
      const chartOptions = {
        title: { text: '情感分布', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: '55%',
          data: [
            { value: 40, name: '正面', itemStyle: { color: '#42B983' } },
            { value: 30, name: '中立', itemStyle: { color: '#F39C12' } },
            { value: 30, name: '负面', itemStyle: { color: '#E74C3C' } }
          ],
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
          }
        }]
      };
      
      return { chartOptions };
    }
  };
  </script>
  