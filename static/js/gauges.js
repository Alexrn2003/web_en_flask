const temperatureGaugeCtx = document.getElementById('temperatureGauge').getContext('2d');
const humidityGaugeCtx = document.getElementById('humidityGauge').getContext('2d');

// Crear los gráficos iniciales
const temperatureGauge = new Chart(temperatureGaugeCtx, {
    type: 'doughnut',
    data: {
        labels: ['Temperatura', ''],
        datasets: [{
            data: [0, 100], // Valores iniciales
            backgroundColor: ['#ff6384', '#eeeeee']
        }]
    },
    options: {
        responsive: true,
        circumference: 180,
        rotation: -90,
        plugins: {
            tooltip: { enabled: false }
        }
    }
});

const humidityGauge = new Chart(humidityGaugeCtx, {
    type: 'doughnut',
    data: {
        labels: ['Humedad', ''],
        datasets: [{
            data: [0, 100], // Valores iniciales
            backgroundColor: ['#36a2eb', '#eeeeee']
        }]
    },
    options: {
        responsive: true,
        circumference: 180,
        rotation: -90,
        plugins: {
            tooltip: { enabled: false }
        }
    }
});

// Función para actualizar los datos
function updateGauges() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            temperatureGauge.data.datasets[0].data[0] = data.temperature;
            temperatureGauge.data.datasets[0].data[1] = 100 - data.temperature;
            temperatureGauge.update();

            humidityGauge.data.datasets[0].data[0] = data.humidity;
            humidityGauge.data.datasets[0].data[1] = 100 - data.humidity;
            humidityGauge.update();
        });
}

// Actualizar cada 2 segundos
setInterval(updateGauges, 2000);
updateGauges();
