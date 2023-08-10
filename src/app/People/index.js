const AbstractPeople = require("./abstractPeople");
const CommonPeople = require("./commonPeople");

const peopleFactory = async (id, lang, app) => {
  let people = null;
  const resultWookiee = isWookieeoFormat(lang);
  if (!resultWookiee) {
    people = new AbstractPeople(id);
  } else {
    const people = new CommonPeople(id, resultWookiee);
    await people.init(app);

    const translatedData = await people.translateToWookiee({
      name: people.name,
      mass: people.mass,
      height: people.height,
      homeworldName: people.homeworldName,
      homeworldId: people.homeworldId,
    });

    return {
      wookieeId: people.id,
      wookieeName: translatedData.wookieeName,
      wookieeMass: translatedData.wookieeMass,
      wookieeHeight: translatedData.wookieeHeight,
      wookieeHomeworldName: translatedData.wookieeHomeworldName,
      wookieeHomeworldId: translatedData.wookieeHomeworldId,
    };
  }

  await people.init(app);

  return people;
};

const isWookieeoFormat = (req) => {
  return !!(req && req == "wookiee");
};

module.exports = { peopleFactory, isWookieeoFormat };
