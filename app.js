const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/db');
const app = express();
const port = 3000;


app.use(bodyParser.json());


const issueRoutes = require('./routes/issueRoutes');
app.use('/api/issues', issueRoutes);

const agentRoutes = require('./routes/agentRoutes');
app.use('/api/agents', agentRoutes);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.get('/', (req, res) => {
    res.send('API is running');
  });