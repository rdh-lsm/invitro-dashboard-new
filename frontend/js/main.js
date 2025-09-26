// Plugin global untuk menampilkan teks di tengah donut
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart, args, options) {
    const { ctx, chartArea: {left, right, top, bottom, width, height} } = chart;
    const value = options.text || "";

    ctx.save();
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, left + width / 2, top + height / 1.15); 
    ctx.restore();
  }
};

// Line Chart untuk PH & Suhu
const ctxPhSuhu = document.getElementById('phSuhuChart').getContext('2d');
new Chart(ctxPhSuhu, {
  type: 'line',
  data: {
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [
      {
        label: "pH Larutan",
        data: [7.1, 7.2, 7.0, 6.9, 7.3],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3
      },
      {
        label: "Suhu Larutan (°C)",
        data: [25, 26, 27, 26, 28],
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Line Chart CH4
const ctxCh4 = document.getElementById('ch4Chart').getContext('2d');
new Chart(ctxCh4, {
  type: 'line',
  data: {
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [
      {
        label: "CH4",
        data: [10, 12, 15, 13, 16],
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Line Chart CO2
const ctxCo2 = document.getElementById('co2Chart').getContext('2d');
new Chart(ctxCo2, {
  type: 'line',
  data: {
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [
      {
        label: "CO2",
        data: [20, 22, 19, 21, 23],
        borderColor: "#ff9f40",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Line Chart H2
const ctxH2 = document.getElementById('h2Chart').getContext('2d');
new Chart(ctxH2, {
  type: 'line',
  data: {
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [
      {
        label: "H2",
        data: [5, 6, 7, 6.5, 7.2],
        borderColor: "#9966ff",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Half Donut Chart Panas Air
const ctxPanasAir = document.getElementById('panasAirChart').getContext('2d');
new Chart(ctxPanasAir, {
  type: 'doughnut',
  data: {
    labels: ["Panas Air", "Sisa"],
    datasets: [{
      data: [65, 35],
      backgroundColor: ["#ff6384", "#e0e0e0"],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      centerText: { text: "65°C" }
    }
  },
  plugins: [centerTextPlugin]
});



// Half Donut Chart Tekanan Udara
const ctxTekananUdara = document.getElementById('tekananUdaraChart').getContext('2d');
new Chart(ctxTekananUdara, {
  type: 'doughnut',
  data: {
    labels: ["Tekanan Udara", "Sisa"],
    datasets: [{
      data: [45, 55],
      backgroundColor: ["#36a2eb", "#e0e0e0"],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      centerText: { text: "45 kPa" }
    }
  },
  plugins: [centerTextPlugin]
});
