const Themes = require("../../models/themes");

const createTheme = async(req, res) => {
      try {
            const newTheme = new Themes({
                  bg: req.body.bg ? req.body.bg : "#DBE2EF"
            })
            newTheme.save()
            res.status(200).json({
                  message: "Theme created!"
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({
                  message:"Please try again!"
            })
      }
}

module.exports = createTheme