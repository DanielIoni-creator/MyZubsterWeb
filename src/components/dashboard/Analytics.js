import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = ({ data }) => {
  // Dati di esempio
  const defaultData = {
    payments: [12, 19, 3, 5, 2, 3, 8, 15, 10, 7, 14, 22],
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    plants: 14,
    users: 156,
    revenue: 14876.4,
    growth: 23
  };

  const chartData = data || defaultData;

  // Line Chart - Payments
  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Pagamenti',
        data: chartData.payments,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Trend',
        data: chartData.payments.map((_, i) => 
          chartData.payments.reduce((a, b) => a + b, 0) / chartData.payments.length
        ),
        borderColor: '#ec4899',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  // Doughnut Chart - Plants by Era
  const doughnutData = {
    labels: ['1500', '1800', '2124', '2026'],
    datasets: [
      {
        data: [5, 4, 5, 14],
        backgroundColor: ['#8b5cf6', '#ec4899', '#4caf50', '#ff9800'],
        borderWidth: 2,
      },
    ],
  };

  // Bar Chart - Revenue
  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Revenue (MYZ)',
        data: chartData.payments.map(p => p * 10 + Math.random() * 50),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: '#8b5cf6',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#888',
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#888',
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        📊 Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="body2" color="text.secondary">
              💰 Revenue Totale
            </Typography>
            <Typography variant="h4" sx={{ color: '#8b5cf6', mt: 1 }}>
              {chartData.revenue.toFixed(1)} MYZ
            </Typography>
            <Typography variant="caption" color="success.main">
              +{chartData.growth}% rispetto al mese scorso
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="body2" color="text.secondary">
              🌿 Piante Registrate
            </Typography>
            <Typography variant="h4" sx={{ color: '#4caf50', mt: 1 }}>
              {chartData.plants}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +3 questa settimana
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="body2" color="text.secondary">
              👥 Utenti
            </Typography>
            <Typography variant="h4" sx={{ color: '#ec4899', mt: 1 }}>
              {chartData.users}
            </Typography>
            <Typography variant="caption" color="success.main">
              +12 nuovi questo mese
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="body2" color="text.secondary">
              🎯 Tasso di Crescita
            </Typography>
            <Typography variant="h4" sx={{ color: '#ff9800', mt: 1 }}>
              +{chartData.growth}%
            </Typography>
            <Typography variant="caption" color="success.main">
              Trend positivo
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              📈 Andamento Pagamenti
            </Typography>
            <Line data={lineData} options={options} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              🌿 Piante per Epoca
            </Typography>
            <Doughnut data={doughnutData} options={options} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              📊 Revenue Mensile
            </Typography>
            <Bar data={barData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
