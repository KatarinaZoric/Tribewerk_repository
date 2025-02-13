const express = require('express');
const Agent = require('../models/agent');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const agent = await Agent.findByPk(req.params.id);  

        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        res.json(agent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/', async (req, res) => {
  try {
    const { name, status } = req.body;

    
    if (!name || !status) {
      return res.status(400).json({ message: 'Name and status are required' });
    }

    
    const newAgent = await Agent.create({
      name: name,
      status: status
    });

    res.status(201).json(newAgent);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
