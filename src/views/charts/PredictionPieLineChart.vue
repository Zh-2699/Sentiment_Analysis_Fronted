<template>
    <div class="chart-container">
      <!-- 选择数据集 -->
      <div class="controls">
        <label>选择数据集：</label>
        <select v-model="selectedDataset" @change="updateChartData">
          <option v-for="(dataset, index) in datasets" :key="index" :value="index">
            数据集 {{ index + 1 }}
          </option>
        </select>
      </div>
  
      <!-- ECharts 图表 -->
      <div ref="chartRef" class="chart"></div>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);
let myChart = null;

const datasets = ref([
  [
    ['product', '2025-03-15', '2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19', '2025-03-20'],
    ["AI发展", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
    ["新能源", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
    ["郭德纲", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
    ["于谦", 25.2, 37.1, 41.2, 18, 33.9, 9.1],
  ],
  [
    ['product', '2025-03-15', '2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19', '2025-03-20'],
    ["政策", 60.5, 85.1, 90.7, 75.1, 55.4, 88.1],
    ["汽车", 55.1, 55.4, 60.1, 58.3, 78.8, 70.7],
    ["俄乌冲突", 45.1, 65.2, 70.5, 40.4, 50.2, 35.5],
    ["三农", 30.2, 40.1, 45.2, 20, 35.9, 12.1],
  ],
]);

const selectedDataset = ref(0);
const selectedDateIndex = ref(1); // 默认选取第一列日期

const initChart = () => {
  if (!chartRef.value) return;
  myChart = echarts.init(chartRef.value);
  updateChartData(); // 初始化时加载数据

  // 监听 `updateAxisPointer` 事件以更新 `pie` 图表
  myChart.on("updateAxisPointer", function (event) {
    const xAxisInfo = event.axesInfo && event.axesInfo[0];
    if (xAxisInfo) {
      selectedDateIndex.value = xAxisInfo.value + 1; // 选中列索引
      updatePieChart();
    }
  });
};

const updateChartData = () => {
  if (!myChart) return;
  myChart.clear(); // 清除旧数据，防止数据叠加

  // 动态生成 `series`
  const lineSeries = datasets.value[selectedDataset.value]
    .slice(1) // 去掉标题行
    .map(() => ({
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    }));

  // 保留 `pie` 图表
  lineSeries.push({
    type: "pie",
    id: "pie",
    radius: "30%",
    center: ["50%", "25%"],
    emphasis: { focus: "self" },
    label: {
      formatter: `{b}: {@${datasets.value[selectedDataset.value][0][selectedDateIndex.value]}} ({d}%)`,
    },
    encode: {
      itemName: "product",
      value: datasets.value[selectedDataset.value][0][selectedDateIndex.value],
      tooltip: datasets.value[selectedDataset.value][0][selectedDateIndex.value],
    },
  });

  myChart.setOption({
    legend: {},
    tooltip: { trigger: "axis", showContent: false },
    dataset: {
      source: datasets.value[selectedDataset.value], // 更新数据集
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    grid: { top: "55%" },
    series: lineSeries, // 动态加载所有折线+饼图
  });
};

const updatePieChart = () => {
  if (!myChart) return;

  myChart.setOption({
    series: [
      {
        id: "pie",
        label: {
          formatter: `{b}: {@${datasets.value[selectedDataset.value][0][selectedDateIndex.value]}} ({d}%)`,
        },
        encode: {
          value: datasets.value[selectedDataset.value][0][selectedDateIndex.value],
          tooltip: datasets.value[selectedDataset.value][0][selectedDateIndex.value],
        },
      },
    ],
  });
};

onMounted(() => {
  initChart();
});
</script>
      
<style scoped>
.chart-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 下拉菜单样式 */
.controls {
  margin-bottom: 15px;
  font-size: 16px;
}

label {
  margin-right: 10px;
  font-weight: bold;
}

select {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
}

select:hover {
  border-color: #42b983;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
