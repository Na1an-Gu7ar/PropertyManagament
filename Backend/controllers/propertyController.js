const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  const { title, description, location, price, imageUrl } = req.body;
  try {
    const newProperty = await Property.create({
      user: req.user._id,
      title,
      description,
      location,
      price,
      imageUrl,
    });
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const properties = await Property.find(query).populate('user', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bonus Section
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const { title, description, location, price, imageUrl } = req.body;
    property.title = title || property.title;
    property.description = description || property.description;
    property.location = location || property.location;
    property.price = price || property.price;
    property.imageUrl = imageUrl || property.imageUrl;

    const updated = await property.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
