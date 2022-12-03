const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ContestParticipent = require("../models/contestParticipent");
// const User = require("../models/User");

exports.ticketValidationAndSave = async (req, res) => {
  try {
    const { userId, ticketId } = req.body;

    // check contest status.one time can have a active contest
    const activeContest = await Contest.find({ status: "Active" });
    const len = activeContest.length;

    if (len === 0) {
      res.status(422).json({ error: "Ticket id is invalid" });
    } else if (len === 1) {
      const contestId = activeContest.at(0)._id.toString();

      //check whether the enter ticketId is invalid or not
      const ticket = await Ticket.find({
        ticketId: ticketId,
        contestId: contestId,
      });

      if (ticket.length === 1 && ticket.at(0).isValid) {
        //found valid ticket then create new record(contestParticipent)
        const contestPRecord = await ContestParticipent.find({
          userId: userId,
          ticketId: ticketId,
          contestId: contestId,
        });
        const lenContestPRecord = contestPRecord.length;

        // const userRecord=await User.findById(userId);
        if (lenContestPRecord === 0) {
          const contestParticipentModel = new ContestParticipent({
            userId: userId,
            ticketId: ticketId,
            contestId: contestId,
          });
          await contestParticipentModel.save();
          res.status(204).send("success");
        } else if (lenContestPRecord === 1) {
          res.status(204).send("success");
        } else {
          res.status(422).json({ error: "Enter ticket id is invalid" });
        }
      } else {
        res.status(422).json({ error: "Enter ticket id is invalid" });
      }
    } else {
      res.status(422).json({ error: "There is some problem with contest" });
    }
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.getContestParticipentsList = async (req, res) => {
  try {
    const contestUser = {
      name: "",
      email: "",
      userId: "",
      ticketId: "",
      contestId: "",
      prize: "",
    };

    const data = await ContestParticipent.find();
    let userId = "";
    let userArray = [];

    for (const element of data) {
      userId = element.userId;
      const user = await User.find({ _id: userId });

      if (user.length > 0) {
        contestUser.name = user.at(0).name;
        contestUser.email = user.at(0).email;
        contestUser.userId = user.at(0)._id.toString();
        contestUser.ticketId = element.ticketId;
        contestUser.contestId = element.contestId;
        contestUser.prize = element.prize;

        userArray.push(contestUser);
      }
    }

    res.status(200).json(userArray);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.updateTicketPrice = async (req, res) => {
  try {
    const {
      userId,
      ticketId,
      contestId,
      price
    } = req.body;


    //change isValid=false in ticket
    const ticket = await Ticket.findOne({ticketId:ticketId});
    if (!ticket) {
      res.status(404).json({ error: "No such Ticket" });
    }

    const filter = { ticketId: ticketId };
    const update = { isValid: false };

    let updateTicket = await Ticket.findOneAndUpdate(filter, update, {
      new: true
    });

    const filterContest = { ticketId: ticketId ,contestId:contestId};
    const updateContest = { prize: price,prizeStatus:"Pending" };

    let updateContestParticipent = await ContestParticipent.findOneAndUpdate(filterContest, updateContest, {
      new: true
    });

    res.status(204).send("success");
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};


