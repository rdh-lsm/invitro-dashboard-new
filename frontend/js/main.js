let phSuhuChart, ch4Chart, co2Chart, h2Chart, panasAirChart, tekananUdaraChart;

// --- Fetch data dari backend
async function fetchSensorData() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/sensors");
    const data = await response.json();
    updateCharts(data);
  } catch (error) {
    console.error("Gagal fetch data sensor:", error);
  }
}

// --- Update chart
function updateCharts(data) {
  // --- Line Chart PH & Suhu
  phSuhuChart.data.datasets[0].data.push(data.ph);
  phSuhuChart.data.datasets[1].data.push(data.suhu);
  phSuhuChart.data.labels.push(new Date().toLocaleTimeString());
  if (phSuhuChart.data.labels.length > 10) { // simpan max 10 titik
    phSuhuChart.data.labels.shift();
    phSuhuChart.data.datasets.forEach(ds => ds.data.shift());
  }
  phSuhuChart.update();

  // --- Line Chart CH4
  ch4Chart.data.datasets[0].data.push(data.ch4);
  ch4Chart.data.labels.push(new Date().toLocaleTimeString());
  if (ch4Chart.data.labels.length > 10) {
    ch4Chart.data.labels.shift();
    ch4Chart.data.datasets[0].data.shift();
  }
  ch4Chart.update();

  // --- Line Chart CO2
  co2Chart.data.datasets[0].data.push(data.co2);
  co2Chart.data.labels.push(new Date().toLocaleTimeString());
  if (co2Chart.data.labels.length > 10) {
    co2Chart.data.labels.shift();
    co2Chart.data.datasets[0].data.shift();
  }
  co2Chart.update();

  // --- Line Chart H2
  h2Chart.data.datasets[0].data.push(data.h2);
  h2Chart.data.labels.push(new Date().toLocaleTimeString());
  if (h2Chart.data.labels.length > 10) {
    h2Chart.data.labels.shift();
    h2Chart.data.datasets[0].data.shift();
  }
  h2Chart.update();

  // --- Half donut Chart Panas Air
  panasAirChart.data.datasets[0].data[0] = data.panas_air;
  panasAirChart.data.datasets[0].data[1] = 100 - data.panas_air; // asumsi max 100
  panasAirChart.options.plugins.centerText.text = data.panas_air + "°C";
  panasAirChart.update();

  // --- Half donut Chart Tekanan Udara
  tekananUdaraChart.data.datasets[0].data[0] = data.tekanan_udara;
  tekananUdaraChart.data.datasets[0].data[1] = 100 - data.tekanan_udara; // asumsi max 100
  tekananUdaraChart.options.plugins.centerText.text = data.tekanan_udara + " kPa";
  tekananUdaraChart.update();
}

// --- Plugin utk display angka di chart half donut
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: {left, right, top, bottom, width, height} } = chart;
    ctx.save();
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(options.text || '', left + width / 2, top + height / 1.2);
    ctx.restore();
  }
};

// --- Inisialisasi chart saat window load
window.addEventListener("load", () => {
  // PH & Suhu
  const ctxPhSuhu = document.getElementById("phSuhuChart").getContext("2d");
  phSuhuChart = new Chart(ctxPhSuhu, {
    type: "line",
    data: { labels: [], datasets: [
      { label: "pH Larutan", data: [], borderColor: "#ff6384", tension: 0.3 },
      { label: "Suhu Larutan (°C)", data: [], borderColor: "#36a2eb", tension: 0.3 }
    ]},
    options: { responsive: true, maintainAspectRatio: false }
  });

  // CH4
  const ctxCh4 = document.getElementById("ch4Chart").getContext("2d");
  ch4Chart = new Chart(ctxCh4, {
    type: "line",
    data: { labels: [], datasets: [{ label: "CH4", data: [], borderColor: "#4bc0c0", tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // CO2
  const ctxCo2 = document.getElementById("co2Chart").getContext("2d");
  co2Chart = new Chart(ctxCo2, {
    type: "line",
    data: { labels: [], datasets: [{ label: "CO2", data: [], borderColor: "#ff9f40", tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // H2
  const ctxH2 = document.getElementById("h2Chart").getContext("2d");
  h2Chart = new Chart(ctxH2, {
    type: "line",
    data: { labels: [], datasets: [{ label: "H2", data: [], borderColor: "#9966ff", tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // Panas Air
  const ctxPanasAir = document.getElementById("panasAirChart").getContext("2d");
  panasAirChart = new Chart(ctxPanasAir, {
    type: "doughnut",
    data: { labels: ["Panas Air", "Sisa"], datasets: [{ data: [0, 100], backgroundColor: ["#ff6384", "#e0e0e0"] }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      rotation: -90, circumference: 180,
      plugins: { legend: { display: false }, centerText: { text: "0°C" } }
    },
    plugins: [centerTextPlugin]
  });

  // Tekanan Udara
  const ctxTekananUdara = document.getElementById("tekananUdaraChart").getContext("2d");
  tekananUdaraChart = new Chart(ctxTekananUdara, {
    type: "doughnut",
    data: { labels: ["Tekanan Udara", "Sisa"], datasets: [{ data: [0, 100], backgroundColor: ["#36a2eb", "#e0e0e0"] }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      rotation: -90, circumference: 180,
      plugins: { legend: { display: false }, centerText: { text: "0 kPa" } }
    },
    plugins: [centerTextPlugin]
  });

  // Fetch data, refresh tiap 5 detik
  fetchSensorData();
  setInterval(fetchSensorData, 5000);
});
