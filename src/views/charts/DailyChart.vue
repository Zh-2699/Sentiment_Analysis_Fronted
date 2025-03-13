<template>
  <ChartBase :options="chartOptions" />
</template>

<script>
import ChartBase from './ChartBase.vue';
import * as echarts from 'echarts'; // 确保正确导入 echarts

export default {
  components: { ChartBase },
  setup() {
    const chartOptions = {
      title: { text: '每日新增文章', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['3-1', '3-2', '3-3', '3-4', '3-5'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [120, 132, 140, 150, 180],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#42B983' },
              { offset: 1, color: '#3A89FF' }
            ])
          }
        }
      ]
    };

    return { chartOptions };
  }
};
</script>