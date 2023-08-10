const AbstractPeople = require("./abstractPeople");

class CommonPeople extends AbstractPeople {
  constructor(id) {
    super(id);
  }

  async init(app) {
    await super.init(app);
  }

  async translateToWookiee(data) {
    const wookieeData = {
      wookieeName: data.name,
      wookieeMass: parseInt(data.mass),
      wookieeHeight: parseInt(data.height),
      wookieeHomeworldName: data.homeworldName,
      wookieeHomeworldId: parseInt(data.homeworldId),
    };
    return wookieeData;
  }
}

module.exports = CommonPeople;
