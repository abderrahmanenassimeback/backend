const  ContestParticipent= require("../models/contestParticipent");
const mongoose = require("mongoose");
const User = require("../models/User");
const Contest = require("../models/Contest");

exports.getUserHisteryContest = async (req, res) => {
    try {
      const id = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
         res.status(404).json({ error: "No such User" });
      }
  
     
      const contestUserHistery = {
        userId: "",
        ticketId: "",
        contestId: "",
        contestName:"",
        contestStartDate:"",
        contestEndDate:"",
        contestStatus:"",
        prize: "",
        prizeStatus:"",
        mainPrizeResult:"",
      };
  
      const contestParticipent = await ContestParticipent.find({userId:id}); 
      let userHisteryArray = [];
  
      for (const element of contestParticipent) {
       let userId = element.userId;
        const contest = await Contest.find({ _id: element.contestId });
  
        if (contest.length > 0) {
            contestUserHistery.userId = userId;
            contestUserHistery.ticketId = element.ticketId;
            contestUserHistery.contestId = element.contestId;
            contestUserHistery.contestName=contest.at(0).name;
            contestUserHistery.contestStartDate=contest.at(0).startDate;
            contestUserHistery.contestEndDate=contest.at(0).endDate;
            contestUserHistery.contestStatus=contest.at(0).status;
            contestUserHistery.prize = element.prize;
            contestUserHistery.prizeStatus = element.prizeStatus;
            contestUserHistery.mainPrizeResult = element.mainPrizeResult;
  
          userHisteryArray.push(contestUserHistery);
        }
      }
  
      res.status(200).json(userHisteryArray);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  