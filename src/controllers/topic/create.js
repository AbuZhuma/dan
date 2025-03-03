const Topic = require("../../models/topic")
const generateRandomID = require("../../helpers/genIdH");

const createTopic = async (req, res) => {
      try {
            let id = await generateRandomID(10)
            let opt = {
                  id: id, 
                  text: req.body.text
            }
            const newTopic = new Topic(opt)
            newTopic.save()
            if (newTopic) {
                  res.status(200).json({ message: "Topic created!", topic: opt})
                  return
            }
            res.status(400).json({ message: "Please try again!"})
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}

module.exports = createTopic