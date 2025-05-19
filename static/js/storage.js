const Storage = {
  getSurveys() {
    return JSON.parse(localStorage.getItem("surveys") || "[]");
  },
  saveSurveys(surveys) {
    localStorage.setItem("surveys", JSON.stringify(surveys));
  }
};