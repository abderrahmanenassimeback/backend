const userService = require("../services/userService");

exports.getUserHisteryContest = async (req, res) => {
  try {
    const id = req.params.id;
    const userHisteryArray = await userService.getUserHisteryContest(id);
    res.status(200).json(userHisteryArray);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const usereList = await userService.getUsersList();
    res.status(200).json(usereList);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    userService.updateUserProfile(id, name);

    res.status(204).send("success");
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};
