const ctx = document.getElementById('myChart').getContext('2d')
var z = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]
var array1 = []
var array2 = []
var myChart
const showStatistiques = async () => {
  try {
    const { data: statistiques } = await axios.get('/api/statistiques')
    if (statistiques.length < 1) {
      return
    }
    const allStatistiques = statistiques.map((statistique) => {
      const { salle, nombreoccupations } = statistique
      array1.push(salle)
      array2.push(nombreoccupations)
    })
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: array1,

        datasets: [
          {
            label: 'Le nombre des occupations par salle',
            data: array2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              generateLabels: function (chart) {
                return chart.data.labels.map(function (label, i) {
                  return {
                    text: label,
                    fillStyle: z[i],
                  }
                })
              },
            },
          },
          title: {
            display: true,
            text: 'Le nombre des occupations par salle',
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Nombre des occupations',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Salles',
            },
          },
        },
      },
    })
  } catch (error) {
    alert(error)
  }
}
showStatistiques()
const socket = new WebSocket('wss://blocs-salles.herokuapp.com')
// La connexion est ouverte
socket.addEventListener('open', function (event) {})
// Écouter les messages
socket.addEventListener('message', function (event) {
  array1 = []
  array2 = []
  myChart.destroy()
  showStatistiques()
})
