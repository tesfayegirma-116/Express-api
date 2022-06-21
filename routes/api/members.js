const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');



//get all memebers
router.get('/', (req, res) => {
    res.json(members);
}
);

//get a member by id
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ message: `No member with the id of ${req.params.id}` });
    }


    res.json(members.find(member => member.id === parseInt(req.params.id)));
}
);

//create a new member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ message: 'Please include a name and email' });
    }
    members.push(newMember);
    // res.json(newMember);

    res.redirect('/');
}
);

//update a member
router.put('/:id', (req, res) => {
    const updMember = req.body;
    members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
            member.status = updMember.status ? updMember.status : member.status;
            res.json({ message: 'Member updated!', member });
        }
    }
    );
    res.status(400).json({ message: `No member with the id of ${req.params.id}` });
}
);

//delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ message: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id)) });
    }
    
    else {
        res.status(400).json({ message: `No member with the id of ${req.params.id}` });
    }
}
);


module.exports = router; 