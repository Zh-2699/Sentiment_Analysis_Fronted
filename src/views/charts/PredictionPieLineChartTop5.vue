<template>
    <div class="chart-container">
      <div ref="chartRef" class="chart"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import * as echarts from "echarts";
  
  const chartRef = ref(null);
  let myChart = null;
  
  // **初始化 ECharts**
  const initChart = () => {
    if (!chartRef.value) return;
    myChart = echarts.init(chartRef.value);
  
    // **ECharts 配置**
    const option = {
  legend: {},
  tooltip: {
    trigger: "axis",
    showContent: false,
  },
  dataset: {
    source: [
      ['product', '2025-03-15', '2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19', '2025-03-20'],
      ["AI发展", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
      ["新能源", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ["郭德纲", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ["于谦", 25.2, 37.1, 41.2, 18, 33.9, 9.1],
    ],
  },
  xAxis: { type: "category" },
  yAxis: { gridIndex: 0 },
  grid: { top: "55%" },
  series: [
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "pie",
      id: "pie",
      radius: "30%",
      center: ["50%", "25%"],
      emphasis: {
        focus: "self",
      },
      label: {
        formatter: "{b}: {@2025-03-15} ({d}%)",
      },
      encode: {
        itemName: "product",
        value: "2025-03-15",
        tooltip: "2025-03-15",
      },
    },
  ],
};

  
    // **更新饼图数据**
    myChart.on("updateAxisPointer", function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });
  
    myChart.setOption(option);
  };
  
  onMounted(() => {
    initChart();
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>