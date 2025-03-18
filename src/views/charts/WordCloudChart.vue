<template>
  <ChartBase :options="chartOptions" />
</template>

<script>
import ChartBase from './ChartBase.vue';

export default {
  components: { ChartBase },
  setup() {
    const chartOptions = {
      title: {
        text: '热门关键词',
        left: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      series: [
        {
          type: 'wordCloud',
          gridSize: 8, // 控制词间距，避免过度重叠
          sizeRange: [18, 70], // 词语大小范围，减少极端大小
          rotationRange: [0, 0], // 限制旋转角度，提高可读性（水平排列）
          shape: 'circle', // 词云形状（circle, cardioid, diamond, star）
          textStyle: {
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: () => {
              const colorSchemes = [
                ['#FF4500', '#FF6347', '#FF8C00'], // 橙色系
                ['#1E90FF', '#00BFFF', '#4169E1'], // 蓝色系
                ['#32CD32', '#3CB371', '#2E8B57'], // 绿色系
                ['#FFD700', '#FFA500', '#FFEC8B'], // 金色系
                ['#FF69B4', '#FF1493', '#C71585'], // 粉色系
                ['#6A5ACD', '#483D8B', '#8A2BE2']  // 紫色系
              ];
              const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
              return randomScheme[Math.floor(Math.random() * randomScheme.length)];
            },
            opacity: 0.9 // 颜色透明度优化
          },
          emphasis: {
            textStyle: {
              shadowBlur: 8, // 悬停时柔和阴影
              shadowColor: '#555',
              fontSize: 40 // **悬停时仅微调字体大小**
            }
          },
          data: [
            { name: '互联网服务', value: 1000 },
            { name: '交通运输', value: 850 },
            { name: '公司', value: 800 },
            { name: '军工', value: 600 },
            { name: '医药', value: 900 },
            { name: '商务服务', value: 600 },
            { name: '城乡规划', value: 800 },
            { name: '家政服务', value: 400 },
            { name: '安防', value: 850 },
            { name: '医疗服务', value: 200 },
            { name: '电子科技', value: 8000 },
            { name: '航空航天', value: 1500 },
            { name: '食品饮料', value: 1500 },
            { name: '能源', value: 800 },
            { name: '教育培训', value: 200 },
            { name: '金融', value: 100 },
            { name: '文化娱乐', value: 250 },
            { name: '电力', value: 1200 },
            { name: '石油化工', value: 300 },
            { name: '电子商务', value: 900 },
            { name: '建筑', value: 700 },
            { name: '旅游', value: 550 },
            { name: '环保', value: 750 },
            { name: '地产', value: 1100 },
            { name: '体育', value: 300 },
            { name: '通信', value: 950 },
            { name: '科研', value: 1200 },
            { name: '物流', value: 1300 },
            { name: '咨询', value: 600 },
            { name: '游戏', value: 850 },
            { name: '人力资源', value: 500 },
            { name: '水务', value: 300 },
            { name: '舞蹈艺术', value: 150 },
            { name: '汽车制造', value: 1100 },
            { name: '电影制作', value: 350 },
            { name: '游乐园', value: 250 },
            { name: '新能源', value: 900 },
            { name: '服装设计', value: 400 },
            { name: '采矿', value: 700 },
            { name: '信息安全', value: 800 },
            { name: '化妆品', value: 600 },
            { name: '音乐产业', value: 750 },
            { name: '物联网', value: 1200 },
            { name: '绿色建筑', value: 850 },
            { name: '社交媒体', value: 950 },
            { name: '人工智能', value: 1000 },
            { name: '水产养殖', value: 320 },
            { name: '医学研究', value: 1800 },
            { name: '动物保护', value: 130 },
            { name: '航海', value: 1000 }
          ]
        }
      ]
    };

    return { chartOptions };
  }
};
</script>
