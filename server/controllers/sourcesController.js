const Source = require("../models/source");
const User = require("../models/user");

const sourcesController = {};

sourcesController.getSources = (req, res, next) => {
  User.findById(res.locals.id)
    .populate("sources")
    .then((result) => {
      res.locals.results = result.sources;
      next();
    })
    .catch((err) => {
      next({
        log: `sourcesController.getSources: ERROR: ${err}`,
        message: {
          err: "Error ocurred in sourcesController.getSources. Check server logs for more details.",
        },
      });
    });
};

sourcesController.addSource = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.id);
    if (!user) {
      next({
        log: "sourcesController.addSource Invalid User",
        message: {
          err: "Error ocurred in sourcesController.addSource. Check server logs for more details.",
        },
      });
    }
    const { name, selected } = req.body;

    const source = new Source({
      name,
      selected,
      user: res.locals.id,
    });

    const savedSource = await source.save();
    res.locals.results = savedSource;

    user.sources = user.sources.concat(savedSource._id);
    await user.save();
    next();
  } catch (err) {
    next({
      log: `sourcesController.addSource: ERROR: ${err}`,
      message: {
        err: "Error ocurred in sourcesController.addSource. Check server logs for more details.",
      },
    });
  }
};

sourcesController.editSource = async (req, res, next) => {
  try {
    const { name, selected, _id } = req.body;
    update = {
      name,
      selected,
    };

    const updatedSource = await Source.findOneAndUpdate({ _id }, update, {
      new: true,
    });
    res.locals.results = updatedSource;
    next();
  } catch (err) {
    next({
      log: `sourcesController.editSource: ERROR: ${err}`,
      message: {
        err: "Error ocurred in sourcesController.editSource. Check server logs for more details.",
      },
    });
  }
};

sourcesController.deleteSource = async (req, res, next) => {
  try {
    const deletedSource = await Source.findByIdAndDelete(req.params.id);
    const userId = deletedSource.user;
    await User.findByIdAndUpdate(
      userId,
      { $pull: { sources: req.params.id } },
      { new: true }
    );

    res.locals.results = deletedSource;
    next();
  } catch (err) {
    next({
      log: `sourcesController.deleteSource: ERROR: ${err}`,
      message: {
        err: "Error ocurred in sourcesController.deleteSource. Check server logs for more details.",
      },
    });
  }
};

module.exports = sourcesController;
