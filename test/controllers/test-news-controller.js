process.env.NODE_ENV = 'test';
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const { News } = require("../../app/models");

const { expect } = chai;
chai.use(chaiHttp);

//Global Variables
let lastCreatedNewsId;

//Create News Object
var newsData = {
  title: "Test",
  body: "This is a test",
  coverImageUrl: "https://dummyimage.png",
  summary: "test",
  type: "news",
  startDate: "2022-04-15",
  endDate: "2022-04-22",
};

//Update News Object
var updateData = {
  title: "Test is Test",
  body: "This is still a test",
  summary: "updated test",
  type: "announcement",
  startDate: "2022-04-16",
  endDate: "2022-04-22",
};

//Tests
describe("News", () => {
  describe("/POST news", () => {
    it("Should create news with designated data", (done) => {
      chai
        .request(server)
        .post("/api/v1/news/")
        .type("json")
        .send(newsData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.Body).to.include(newsData);
          lastCreatedNewsId = res.body.Body.id;
          done();
        });
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
  describe("/GET all news", () => {
    it("Should return all news", (done) => {
      chai
        .request(server)
        .get("/api/v1/news/all/")
        .end((err, res) => {
          console.log(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("/GET first news", function () {
    it("Should return first news", (done) => {
      chai
        .request(server)
        .get("/api/v1/news/1/")
        .end((err, res) => {
          console.log(err);
          expect(res).to.have.status(200);
          expect(res.body.Body.id).to.deep.equal(1);
          done();
        });
    });
  });
  describe("/PATCH news", function () {
    before(function (done) {
      News.create(newsData)
        .then((response) => {
          lastCreatedNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          console.error("Error: " + err.message);
          throw new Error("Oh no.");
        });
    });
    it("Should update the news with correspoding id", function (done) {
      chai
        .request(server)
        .patch("/api/v1/news/" + lastCreatedNewsId)
        .type("json")
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.Body).to.include(updateData);
          done();
        });
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
  describe("/DELETE news", function () {
    before(function (done) {
      News.create(newsData)
        .then((response) => {
          lastCreatedNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          console.error("Error: " + err.message);
          throw new Error("Oh no.");
        });
    });
    it("Should delete the news with corresonding id", function (done) {
      chai
        .request(server)
        .delete("/api/v1/news/" + lastCreatedNewsId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
