<template>
    <ChartBase :options="chartOptions" />
  </template>
  
  <script>
  import ChartBase from './ChartBase.vue';
  
  export default {
    components: { ChartBase },
    setup() {
      const chartOptions = {
        title: { text: '热门关键词', left: 'center' },
        series: [
          {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [14, 50],
            rotationRange: [-45, 45],
            shape: 'circle',
            textStyle: {
              normal: {
                color: () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
              }
            },
            data: [
              { name: '新能源', value: 5000 },
              { name: '降价', value: 4000 },
              { name: '科技', value: 3800 },
              { name: 'AI', value: 3500 },
              { name: '5G', value: 3200 },
              { name: '政策', value: 3000 }
            ]
          }
        ]
      };
  
      return { chartOptions };
    }
  };
  </script>
  