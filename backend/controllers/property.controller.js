const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const Property = require('../models/Property');
const User = require('../models/User');
const propertyController = require('express').Router();

propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({}).populate('agent', '-password');

    console.log(properties);

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
  }
});

propertyController.get('/find/featured', async (req, res) => {
    try {
        const featuredProperties = await Property.find({ featured: true }).populate("agent", '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error)
    }
})

propertyController.get('/find', async (req, res) => {
  const type = req.query;
  let properties = [];
  try {
    if (type) {
      properties = await Property.find(type).populate('owner', '-password');
    } else {
      properties = await Property.find({});
    }

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.get('/find/types', async (req, res) => {
  try {
    const apartmentType = await Property.countDocuments({ type: 'apartment' });
    const houseType = await Property.countDocuments({ type: 'house' });

    return res.status(200).json({ apartment: apartmentType, house: houseType });
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.get('/find/my-properties', verifyToken, async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.user.id });

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
  }
});

propertyController.get('/find/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', '-password');

    if (!property) {
      throw new Error('No such property with that id');
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.post('/', verifyToken, verifyAgent, async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body, agent: req.user.id });

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.put('/:id', verifyToken, verifyAgent, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.agent.toString() !== req.user.id) {
      throw new Error("You are not allowed to update other people's properties");
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    return res.status(200).json(updatedProperty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.delete('/:id', verifyToken, verifyAgent, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.agent.toString() !== req.user.id) {
      throw new Error('You are not allowed to delete other people properties');
    }

    await property.delete();

    return res.status(200).json({ msg: 'Successfully deleted property' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = propertyController;
