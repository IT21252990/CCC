const express = require('express');
const router = express.Router();
const CodeModel = require('../models/saveCode');
const mongoose = require('mongoose')

// Create a new code entry
router.post('/save-code', async (req, res) => {
  try {
    const { userID, name ,language ,code } = req.body;

    // Create a new code document
    const newCode = new CodeModel({
        userID, 
        name ,
        language ,
        code
    });

    // Save the code document to the database
    await newCode.save();

    res.status(200).json({ message: 'Code saved successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


//Get user codes
router.get('/get-codes/:userID', async (req, res) => {
    try {
      const {userID} = req.params;

      if(!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({error:'No such user'})
    }
  
      // Find all codes associated with the given userID
      const codes = await CodeModel.find({ userID });

      res.status(200).json( codes );

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Error' });
    }
  });

  //Get all codes
router.get('/get-all-codes', async (req, res) => {
  try {
    const codes = await CodeModel.find({})

    res.status(200).json( codes );

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error Error' });

  }
});

//delete a saved code
router.delete('/delete-code/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCode = await CodeModel.findByIdAndDelete(id);

    if (!deletedCode) {
      return res.status(404).json({ message: 'Code not found' });
    }

    res.status(200).json(deletedCode);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error deleting code' });

  }

});

module.exports = router;