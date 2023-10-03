const { vSplit, checkRules, request } = require("./helpers");
const { rules } = require("./rules");

exports.runValidation = async (req, formData) => {
  const errors = {};
  const validateData = {};

  for (let data in formData) {
    for (let item of formData[data]) {
      if (item.includes("same:")) {
        const result = await rules(
          vSplit(item, 0),
          [`${data}`, `${vSplit(item, 1)}`],
          [`${request(req, data)}`, `${req.body[vSplit(item, 1)]}`]
        );

        if (result) {
          errors[data] = result;
        }
        validateData[data] = req.body[data];
        break;
      }

      if (checkRules(item)) {
        let result = await rules(
          vSplit(item, 0),
          data,
          request(req, data),
          vSplit(item, 1)
        );
        if (result) {
          errors[data] = result;
          break;
        }

        validateData[data] = req.body[data];
      }

      if (!checkRules(item)) {
        let result = await rules(item, data, request(req, data));
        if (result) {
          errors[data] = result;
          break;
        }
        validateData[data] = req.body[data];
      }
    }
  }

  return { errors, validateData };
};
