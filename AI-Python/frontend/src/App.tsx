import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

interface DataPoint {
  data: number[][];
  labels: number[];
  plot: string;
}

interface TrainingResult {
  history: {
    loss: number[];
    accuracy: number[];
  };
  plot: string;
}

function App() {
  const [data, setData] = useState<DataPoint | null>(null);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const generateData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/generate-data');
      setData(response.data);
      setResult(null);
    } catch (error) {
      console.error('Error generating data:', error);
    }
  };

  const trainModel = async () => {
    if (!data) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/train-model', {
        data: data.data,
        labels: data.labels
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error training model:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          神经网络可视化学习平台
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button variant="contained" onClick={generateData}>
            生成新数据
          </Button>
          <Button 
            variant="contained" 
            onClick={trainModel}
            disabled={!data || loading}
          >
            {loading ? <CircularProgress size={24} /> : '训练模型'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                数据集可视化
              </Typography>
              <img 
                src={`data:image/png;base64,${data.plot}`}
                alt="数据集可视化"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Paper>
          )}

          {result && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                模型预测结果
              </Typography>
              <img 
                src={`data:image/png;base64,${result.plot}`}
                alt="模型预测结果"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                  训练损失: {result.history.loss[result.history.loss.length - 1].toFixed(4)}
                </Typography>
                <Typography variant="subtitle1">
                  训练准确率: {(result.history.accuracy[result.history.accuracy.length - 1] * 100).toFixed(2)}%
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App; 