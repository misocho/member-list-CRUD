const express = require('express');
const uuid = require('uuid');
const members = require('../db/Members');

const router = express.Router();

// Gets all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === (parseInt(req.params.id)));
  const getMember = members.filter(member => member.id === parseInt(req.params.id))
  const getmemberSuccess = {
    msg: 'Member was successfully fetched',
    data: getMember
  }

  const getMemberFail = {
    msg: `Member with id ${req.params.id} was not found`,
  }

  const response = found ? res.json(getmemberSuccess) : res.status(404).json(getMemberFail);

  return response
});

// Create member
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    res.status(400).json({
      msg: 'Please provide name and email'
    });
  }

  members.push(newMember);

  return res.json(members);
})

// Update member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === (parseInt(req.params.id)));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: 'Member updated', member })
      }
    })
  }
  else {
    res.status(404).json({
      msg: `Member with id ${req.params.id} was not found`,
    })
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === (parseInt(req.params.id)));

  if (found) {
    console.log(members);
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== (parseInt(req.params.id)))
    })
  } else {
    res.status(404).json({
      msg: `Member with id ${req.params.id} was not found`,
    });
  }

});

module.exports = router;