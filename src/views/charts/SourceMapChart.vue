<template>
  <ChartBase :options="chartOptions" />
</template>

<script>
import ChartBase from './ChartBase.vue';

export default {
  components: { ChartBase },
  setup() {
      const chartOptions = {
          title: { text: '地点来源', left: 'center' },
          tooltip: { trigger: 'item' },
          visualMap: {
              min: 0,
              max: 10000, // 数据范围
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                  color: ['#D7F3FF', '#6EC8FF', '#1E88E5', '#D32F2F'] // 由浅蓝到深蓝再到红色
              }
          },
          geo: {
              map: 'china',
              roam: true,
              label: {
                  emphasis: {
                      show: true,
                      color: '#000'
                  }
              },
              itemStyle: {
                  normal: {
                    areaColor: '#F5F5F5', // 默认颜色改为浅灰色
                    borderColor: '#B0BEC5' // 省份边界颜色
                  },
                  emphasis: {
                    areaColor: '#FFC107' // 鼠标悬浮时高亮
                  }
              }
          },
          series: [
              {
                  name: '地点来源',
                  type: 'map',
                  map: 'china',
                  geoIndex: 0,
                  data: [
                      { name: '北京', value: 8000 },
                      { name: '上海', value: 70 },
                      { name: '广东', value: 60 },
                      { name: '浙江', value: 50 },
                      { name: '四川', value: 45 },
                      { name: '重庆', value: 40 },
                      { name: '湖北', value: 38 },
                      { name: '陕西', value: 35 },
                      { name: '湖南', value: 30 },
                      { name: '江苏', value: 28 },
                      { name: '河南', value: 25 },
                      { name: '山东', value: 22 },
                      { name: '天津', value: 20 },
                      { name: '云南', value: 15 },
                      { name: '福建', value: 12 },
                      { name: '辽宁', value: 10 },
                      { name: '吉林', value: 8 },
                      { name: '安徽', value: 6 },
                      { name: '贵州', value: 5 },
                      { name: '海南', value: 3 }
                  ]
              }
          ]
      };

      return { chartOptions };
  }
};
</script>
