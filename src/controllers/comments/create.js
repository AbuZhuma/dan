const generateRandomID = require("../../helpers/genIdH");
const Comment = require("../../models/comments");

const createComment = async (req, res) => {
      try {
            let id = await generateRandomID(10)
            const date = new Date(); 
            const day = String(date.getDate()).padStart(2, "0"); 
            const month = String(date.getMonth() + 1).padStart(2, "0"); 
            const year = date.getFullYear(); 

            const formattedDate = `${day}-${month}-${year}`;
            let prod = {
                  id: id,
                  text: req.body.text,
                  date: formattedDate
            }
            let newComment = await Comment(prod)
            newComment.save()
            if (newComment) {
                  res.status(200).json({ message: "Comment created!", comment: prod})
                  return
            }
            res.status(400).json({ message: "Please try again!"})
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}

module.exports = createComment