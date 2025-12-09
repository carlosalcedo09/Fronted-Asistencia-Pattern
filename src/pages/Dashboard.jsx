// src/pages/Dashboard.jsx
import {
  Grid, Paper, Typography, Box, Avatar, useTheme,
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Slidebar } from "../components/Slidebar";
import { useDashboardLogic } from "../hooks/DashboardLogic";
import "../styles/Dashboard.css";

const icons = [GroupsIcon, CheckCircleIcon, CancelIcon, CancelIcon, AccessTimeIcon];

export const Dashboard = () => {
  const theme = useTheme();
  const {
    selectedYear, setSelectedYear,
    selectedMonth, setSelectedMonth,
    stats, dataAsistenciaMensual, dataPuntualidad,
    dataTipoMarcacion, dataRotacionEmpleados,
    dataRadar, dataDonut, donutColors,
  } = useDashboardLogic();

  return (
    <div className="inicio-container">
      <Slidebar />
      <main className="main">
        <Box p={3}>
          <Typography variant="h4" mb={3}>
            Dashboard de Asistencias y Nómina de Empleados
          </Typography>

          <div className="filters">
            <div className="content-filters">
              <label>Año</label>
              <select
                className="filtro-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {[2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="content-filters">
              <label>Mes</label>
              <select
                className="filtro-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {[
                  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ].map((mes, i) => (
                  <option key={i + 1} value={i + 1}>{mes}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="conteiner-tarjetas">
            <Grid container spacing={3}>
              {stats.map((stat, i) => {
                const Icon = icons[i];
                return (
                  <Grid item xs={12} md={4} key={i}>
                    <Paper elevation={4} sx={{
                      display: "flex", alignItems: "center", p: 3,
                      borderRadius: 3, bgcolor: "#f7f9fc"
                    }}>
                      <Avatar sx={{ bgcolor: stat.bgColor, width: 56, height: 56, mr: 2 }}>
                        <Icon />
                      </Avatar>
                      <Box>
                        <Typography color="textSecondary" variant="subtitle2">
                          {stat.label}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>

          <div className="conteiner-graficos">
            {/* Asistencia mensual */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Asistencia mensual</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataAsistenciaMensual}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Asistencias" fill={theme.palette.primary.main}/>
                  <Bar dataKey="Ausencias" fill={theme.palette.error.main} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            {/* Puntualidad mensual */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Puntualidad mensual</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataPuntualidad}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="A_tiempo" stackId="a" fill="#4caf50" />
                  <Bar dataKey="Tardanzas" stackId="a" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            {/* Tipo de Mracacion */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Número de marcaciones</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataTipoMarcacion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="area" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Registros" fill={theme.palette.warning.main} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            {/* Rotación */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Evolución mensual de nómina</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataRotacionEmpleados}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Aportes" stroke="#2196f3" strokeWidth={2} />
                  <Line type="monotone" dataKey="Sueldos" stroke="#f44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>

            {/* Radar */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Asistencia por Área (Radar)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={dataRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="Area" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Asistencia" dataKey="Asistencia" stroke="#673ab7" fill="#673ab7" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>

            {/* Donut */}
            <Paper elevation={4} sx={{ p: 3, m: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>Asistencias vs Ausencias</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataDonut}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {dataDonut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={donutColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </div>
        </Box>
      </main>
    </div>
  );
};
