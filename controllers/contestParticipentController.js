const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ContestParticipent = require("../models/contestParticipent");

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

      if (ticket.length > 0) {
        //found valid ticket then create new record(contestParticipent)
        const contestPRecord = await ContestParticipent.find({
          userId: userId,
          ticketId: ticketId,
          contestId: contestId,
        });
        const lenContestPRecord = contestPRecord.length;

        // const userRecord=await User.findById(userId);
        if (lenContestPRecord === 0) {
          console.log(lenContestPRecord);
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
