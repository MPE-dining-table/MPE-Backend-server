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
