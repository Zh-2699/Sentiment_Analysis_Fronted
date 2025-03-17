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
  
  // **写死的数据**
  const chartData = {
    title: "Stacked Line Chart",
    legend: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "Email", type: "line", stack: "Total", data: [120, 132, 101, 134, 90, 230, 210] },
      { name: "Union Ads", type: "line", stack: "Total", data: [220, 182, 191, 234, 290, 330, 310] },
      { name: "Video Ads", type: "line", stack: "Total", data: [150, 232, 201, 154, 190, 330, 410] },
      { name: "Direct", type: "line", stack: "Total", data: [320, 332, 301, 334, 390, 330, 320] },
      { name: "Search Engine", type: "line", stack: "Total", data: [820, 932, 901, 934, 1290, 1330, 1320] },
    ],
  };
  
  // **初始化 ECharts**
  const initChart = () => {
    if (!chartRef.value) return;
    myChart = echarts.init(chartRef.value);
  
    const option = {
      title: {
        text: chartData.title,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: chartData.legend,
        bottom: "0%",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: chartData.xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: chartData.series,
    };
  
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
  