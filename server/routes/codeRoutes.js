const express = require('express');
const router = express.Router();
const CodeModel = require('../models/saveCode');

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
      const userID = req.params.userID;

      if(!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({error:'No such user'})
    }
  
      // Find all codes associated with the given userID
      const codes = await CodeModel.find({ userID });

      res.status(200).json({ codes });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;