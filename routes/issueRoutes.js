const express = require('express');
const Issue = require('../models/issue');
const Agent = require('../models/agent');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const issues = await Issue.findAll();
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/', async (req, res) => {
  try {
    const agent = await Agent.findOne({ where: { status: 'available' } });

    let issue;
    if (agent) {
   
      issue = await Issue.create({
        description: req.body.description,
        assigned_agent_id: agent.id,
        status: 'pending'
      });

      agent.status = 'busy';
      await agent.save();
    } else {
      
      issue = await Issue.create({
        description: req.body.description,
        assigned_agent_id: null, 
        status: 'waiting_for_agent' 
      });
    }

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/*router.post('/', async (req, res) => {
  try {
    const agent = await Agent.findOne({ where: { status: 'available' } });

    if (!agent) {
      return res.status(400).json({ message: 'No available agents' });
    }

    const issue = await Issue.create({
      description: req.body.description,
      assigned_agent_id: agent.id,
      status: 'pending'
    });

    agent.status = 'busy';
    await agent.save();

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
*/

router.put('/:id/resolve', async (req, res) => {
    try {
        const issueId = req.params.id;
        const issue = await Issue.findByPk(issueId);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        if (issue.status === 'resolved') {
            return res.status(400).json({ message: "Issue already resolved" });
        }

       
        issue.status = 'resolved';
        issue.resolved_at = new Date();
        await issue.save();

        
        const agent = await Agent.findByPk(issue.assigned_agent_id);
        if (agent) {
            agent.status = 'available';
            await agent.save();

            const unassignedIssue = await Issue.findOne({ where: { assigned_agent_id: null, status: 'waiting_for_agent' } });

            if (unassignedIssue) {
              
              unassignedIssue.assigned_agent_id = agent.id;
              unassignedIssue.status = 'pending';
              await unassignedIssue.save();

              agent.status = 'busy';
              await agent.save();
          }
        }

        res.json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
