import Restuarent from "../models/restaurentModel.js";
export const addRestuarent = async (req, res) => {
  try {
    const { restuarentName, address, cuisine, about, images } = req.body;

    const newRes = new Restuarent({
      restuarentName,
      address,
      cuisine,
      about,
      images,
    });

    // console.log(newUser);

    await newRes.save();
    res.status(201).json({ message: `New restuarent added` });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while creating a new restuarent`,
    });
  }
};

export const getRestuarants = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const restuarents = await Restuarent.find().skip(skip).limit(limit);

    const totalRestuarents = await Restuarent.countDocuments();

    res.status(200).json({ restuarents, totalRestuarents, page, limit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch restuarents" });
  }
};

export const deleteRestuarent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid restuarent ID format" });
    }
    const deletedRestuarent = await Restuarent.findByIdAndDelete(req.params.id);
    if (!deletedRestuarent) {
      return res.status(404).json({ error: "Restuarent not found" });
    }
    res.status(200).json({ message: "Restuarent successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRestuarent = async (req, res) => {
  try {
    const updatedRestuarent = await Restuarent.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedRestuarent) {
      return res.status(404).json({ error: "Restuarent not found" });
    }
    res.status(200).json(updatedRestuarent);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getRestuarentById = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid Restuarent ID format" });
      }
      const restuarent = await Restuarent.findById(req.params.id);
      if (!restuarent) {
        return res.status(404).json({ error: "Restuarent not found" });
      }
      res.status(200).json(restuarent);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };