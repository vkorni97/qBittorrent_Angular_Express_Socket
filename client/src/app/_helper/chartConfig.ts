import { ChartOptions } from '../interfaces/torrent';

export let chartOptions: ChartOptions = {
  annotations: {},
  chart: {
    width: '100%',
    height: 150,
    type: 'area',
    toolbar: { show: false },
    selection: { enabled: false },
    zoom: { enabled: false },
    animations: {
      enabled: false,
      easing: 'linear',
      dynamicAnimation: {
        speed: 2000,
      },
    },
  },
  colors: [],
  dataLabels: { enabled: false },
  labels: [],
  legend: {
    show: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  tooltip: { enabled: false },
  plotOptions: {},
  responsive: [],
  states: {},
  subtitle: {},
  theme: {},
  grid: {
    show: false,
    padding: {
      right: -10,
      left: -15,
      top: -10,
      bottom: -10,
    },
  },
  stroke: { curve: 'smooth' },
  series: [],
  title: {},
  xaxis: {
    range: 20,
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: [
    {
      seriesName: 'Download',
      labels: { show: false },
    },
    {
      seriesName: 'Upload',
      labels: { show: false },
    },
  ],
};
