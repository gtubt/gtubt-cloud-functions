const assert = require("assert");
const axios = require("axios");
const { News } = require("../../app/models");

//Global Variables
let news;
let response;
let lastCreatedNewsId;

//Assertion Variables
var news_title = "Test";
var news_body = "This is a test";
var news_coverImageUrl = "https://dummyimage.png";
var news_summary = "test";
var news_type = "news";
var news_startDate = "2022-04-15";
var news_endDate = "2022-04-22";

//Create News Object
var newsData = {
  title: news_title,
  body: news_body,
  coverImageUrl: news_coverImageUrl,
  summary: news_summary,
  type: news_type,
  startDate: news_startDate,
  endDate: news_endDate,
};

//Update Variables
var new_title = "Test is Test";
var new_body = "This is still a test";
var new_summary = "updated test";
var new_type = "announcement";
var new_startDate = "2022-04-16";
var new_endDate = "2022-04-22";

//Tests
describe("GTUBT-Backend", function () {
  describe("News Endpoint", function () {
    describe("Create", function () {
      before(function (done) {
        axios
          .post("http://localhost:3000/api/v1/news/", newsData)
          .then((res) => {
            response = res.data;
            lastCreatedNewsId = response.Body.id;
            done();
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should create a news with designated data", function (done) {
        assert(response.Status, 200);
        assert(response.Body.title, news_title);
        assert(response.Body.body, news_body);
        assert(response.Body.coverImageUrl, news_coverImageUrl);
        assert(response.Body.summary, news_summary);
        assert(response.Body.type, news_type);
        assert(response.Body.startDate, news_startDate);
        assert(response.Body.endDate, news_endDate);
        done();
      });
      after(function (done) {
        News.destroy({
          where: {
            id: lastCreatedNewsId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Get All", function () {
      before(function (done) {
        News.create(newsData)
          .then((response) => {
            lastCreatedNewsId = response.dataValues.id;
            axios.get("http://localhost:3000/api/v1/news/all").then((res) => {
              news = res.data;
              done();
            });
          })
          .catch((err) => {
            console.error("Error: " + err);
            throw new Error("Oh no.");
          });
      });
      it("Should return all news", function (done) {
        news.forEach((element) => {
          assert(element.hasOwnProperty("id"), true);
          assert(element.hasOwnProperty("title"), true);
          assert(element.hasOwnProperty("body"), true);
          assert(element.hasOwnProperty("coverImageUrl"), true);
          assert(element.hasOwnProperty("summary"), true);
          assert(element.hasOwnProperty("type"), true);
          assert(element.hasOwnProperty("startDate"), true);
          assert(element.hasOwnProperty("endDate"), true);
        });
        const checkLastItem = (element) => element.id === lastCreatedNewsId;
        assert(news.some(checkLastItem), true);
        done();
      });
      after(function (done) {
        News.destroy({
          where: {
            id: lastCreatedNewsId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Get", function () {
      before(function (done) {
        News.create(newsData)
          .then((response) => {
            lastCreatedNewsId = response.dataValues.id;
            axios.get("http://localhost:3000/api/v1/news/" + lastCreatedNewsId).then((res) => {
              news = res.data;
              done();
            });
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should return the news with corresonding id", function (done) {
        assert(news.Body.id, lastCreatedNewsId);
        assert(news.Body.title, news_title);
        assert(news.Body.body, news_body);
        assert(news.Body.coverImageUrl, news_coverImageUrl);
        assert(news.Body.summary, news_summary);
        assert(news.Body.type, news_type);
        assert(news.Body.startDate, news_startDate);
        assert(news.Body.endDate, news_endDate);
        done();
      });
      after(function (done) {
        News.destroy({
          where: {
            id: lastCreatedNewsId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Update", function () {
      before(function (done) {
        News.create(newsData)
          .then((response) => {
            lastCreatedNewsId = response.dataValues.id;
            axios
              .patch("http://localhost:3000/api/v1/news/" + lastCreatedNewsId, {
                title: new_title,
                body: new_body,
                summary: new_summary,
                type: new_type,
                startDate: new_startDate,
                endDate: new_endDate,
              })
              .then((res) => {
                news = res.data;
                done();
              });
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should update the news with correspoding id", function (done) {
        assert(news.Status, 200);
        assert(news.Body.title, new_title);
        assert(news.Body.body, new_body);
        assert(news.Body.hasOwnProperty("coverImageUrl"), false);
        assert(news.Body.summary, new_summary);
        assert(news.Body.type, new_type);
        assert(news.Body.startDate, new_startDate);
        assert(news.Body.endDate, new_endDate);
        done();
      });
      after(function (done) {
        News.destroy({
          where: {
            id: lastCreatedNewsId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Delete", function () {
      before(function (done) {
        News.create(newsData)
          .then((response) => {
            lastCreatedNewsId = response.dataValues.id;
            axios
              .delete("http://localhost:3000/api/v1/news/" + lastCreatedNewsId)
              .then((res) => {
                response = res.data;
                done();
              })
              .catch((err) => {
                console.error("Error: " + err.message);
                throw new Error("Oh no.");
              });
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should delete the news with corresonding id", function (done) {
        assert(response.Status, 200);
        done();
      });
    });
  });
});
