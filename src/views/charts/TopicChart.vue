<template>
    <ChartBase :options="chartOptions" />
  </template>
  
  <script>
  import ChartBase from './ChartBase.vue';
  import * as echarts from 'echarts'; 
  
  export default {
    components: { ChartBase },
    setup() {
      const chartOptions = {
        title: { text: '热点话题热度', left: 'center' },
        xAxis: { type: 'category', data: ['新能源', 'AI', '经济', '科技', '政策', '新闻', '哈哈', '呵呵'] },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [5000, 4000, 3500, 3000, 2500, 3000, 3500],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#3A89FF' },
                { offset: 1, color: '#8E44AD' }
              ]),
              borderRadius: [5, 5, 0, 0],
            }
          }
        ]
      };
  
      return { chartOptions };
    }
  };
  </script>
  