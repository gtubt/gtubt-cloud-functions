process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const { News } = require("../../app/models");

const { expect } = chai;
chai.use(chaiHttp);

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
          createdNewsId = res.body.Body.id;
          done();
        });
    });
    after((done) => {
      News.destroy({
        where: {
          id: createdNewsId,
        },
      }).then(() => {
        done();
      });
    });
  });
  describe("/GET all news", () => {
    before((done) => {
      News.create(newsData)
        .then((response) => {
          createdNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          throw new Error("Oh no. " + err);
        });
    });
    it("Should return all news", (done) => {
      chai
        .request(server)
        .get("/api/v1/news/all/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    after((done) => {
      News.destroy({
        where: {
          id: createdNewsId,
        },
      }).then(() => {
        done();
      });
    });
  });
  describe("/GET first news", () => {
    before((done) => {
      News.create(newsData)
        .then((response) => {
          createdNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          throw new Error("Oh no. " + err);
        });
    });
    it("Should return first news", (done) => {
      chai
        .request(server)
        .get("/api/v1/news/1/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.Body.id).to.deep.equal(1);
          done();
        });
    });
    after((done) => {
      News.destroy({
        where: {
          id: createdNewsId,
        },
      }).then(() => {
        done();
      });
    });
  });
  describe("/PATCH news", () => {
    before((done) => {
      News.create(newsData)
        .then((response) => {
          createdNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          throw new Error("Oh no. " + err);
        });
    });
    it("Should update the news with correspoding id", (done) => {
      chai
        .request(server)
        .patch("/api/v1/news/" + createdNewsId)
        .type("json")
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.Body).to.include(updateData);
          done();
        });
    });
    after((done) => {
      News.destroy({
        where: {
          id: createdNewsId,
        },
      }).then(() => {
        done();
      });
    });
  });
  describe("/DELETE news", () => {
    before((done) => {
      News.create(newsData)
        .then((response) => {
          createdNewsId = response.dataValues.id;
          done();
        })
        .catch((err) => {
          throw new Error("Oh no. " + err);
        });
    });
    it("Should delete the news with corresonding id", (done) => {
      chai
        .request(server)
        .delete("/api/v1/news/" + createdNewsId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
