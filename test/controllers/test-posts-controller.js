const assert = require("assert");
const axios = require("axios");
const { Post } = require("../../app/models");

//Global Variables
let posts;
let post;
let response;
let lastCreatedPostId;

//Assertion Variables
var post_title = "Test";
var post_body = "This is a test";
var post_coverImageUrl = "https://dummyimage.png";
var post_summary = "test";
var post_type = "news";
var post_startDate = "2022-04-15";
var post_endDate = "2022-04-22";

//Create Post Object
var postData = {
  title: post_title,
  body: post_body,
  coverImageUrl: post_coverImageUrl,
  summary: post_summary,
  type: post_type,
  startDate: post_startDate,
  endDate: post_endDate,
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
  describe("Posts Endpoint", function () {
    describe("Create", function () {
      before(function (done) {
        axios
          .post("http://localhost:3000/api/v1/posts/", postData)
          .then((res) => {
            response = res.data;
            lastCreatedPostId = response.Body.id;
            done();
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should create a post with designated data", function (done) {
        assert(response.Status, 200);
        assert(response.Body.title, post_title);
        assert(response.Body.body, post_body);
        assert(response.Body.coverImageUrl, post_coverImageUrl);
        assert(response.Body.summary, post_summary);
        assert(response.Body.type, post_type);
        assert(response.Body.startDate, post_startDate);
        assert(response.Body.endDate, post_endDate);
        done();
      });
      after(function (done) {
        Post.destroy({
          where: {
            id: lastCreatedPostId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Get All", function () {
      before(function (done) {
        Post.create(postData)
          .then((response) => {
            lastCreatedPostId = response.dataValues.id;
            axios.get("http://localhost:3000/api/v1/posts/all").then((res) => {
              posts = res.data;
              done();
            });
          })
          .catch((err) => {
            console.error("Error: " + err);
            throw new Error("Oh no.");
          });
      });
      it("Should return all posts", function (done) {
        posts.forEach((element) => {
          assert(element.hasOwnProperty("id"), true);
          assert(element.hasOwnProperty("title"), true);
          assert(element.hasOwnProperty("body"), true);
          assert(element.hasOwnProperty("coverImageUrl"), true);
          assert(element.hasOwnProperty("summary"), true);
          assert(element.hasOwnProperty("type"), true);
          assert(element.hasOwnProperty("startDate"), true);
          assert(element.hasOwnProperty("endDate"), true);
        });
        const checkLastItem = (element) => element.id === lastCreatedPostId;
        assert(posts.some(checkLastItem), true);
        done();
      });
      after(function (done) {
        Post.destroy({
          where: {
            id: lastCreatedPostId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Get", function () {
      before(function (done) {
        Post.create(postData)
          .then((response) => {
            lastCreatedPostId = response.dataValues.id;
            axios.get("http://localhost:3000/api/v1/posts/" + lastCreatedPostId).then((res) => {
              post = res.data;
              done();
            });
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should return the post with corresonding id", function (done) {
        assert(post.Body.id, lastCreatedPostId);
        assert(post.Body.title, post_title);
        assert(post.Body.body, post_body);
        assert(post.Body.coverImageUrl, post_coverImageUrl);
        assert(post.Body.summary, post_summary);
        assert(post.Body.type, post_type);
        assert(post.Body.startDate, post_startDate);
        assert(post.Body.endDate, post_endDate);
        done();
      });
      after(function (done) {
        Post.destroy({
          where: {
            id: lastCreatedPostId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Update", function () {
      before(function (done) {
        Post.create(postData)
          .then((response) => {
            lastCreatedPostId = response.dataValues.id;
            axios
              .patch("http://localhost:3000/api/v1/posts/" + lastCreatedPostId, {
                title: new_title,
                body: new_body,
                summary: new_summary,
                type: new_type,
                startDate: new_startDate,
                endDate: new_endDate,
              })
              .then((res) => {
                post = res.data;
                done();
              });
          })
          .catch((err) => {
            console.error("Error: " + err.message);
            throw new Error("Oh no.");
          });
      });
      it("Should update the post with correspoding id", function (done) {
        assert(post.Status, 200);
        assert(post.Body.title, new_title);
        assert(post.Body.body, new_body);
        assert(post.Body.hasOwnProperty("coverImageUrl"), false);
        assert(post.Body.summary, new_summary);
        assert(post.Body.type, new_type);
        assert(post.Body.startDate, new_startDate);
        assert(post.Body.endDate, new_endDate);
        done();
      });
      after(function (done) {
        Post.destroy({
          where: {
            id: lastCreatedPostId,
          },
        }).then(() => {
          done();
        });
      });
    });
    describe("Delete", function () {
      before(function (done) {
        Post.create(postData)
          .then((response) => {
            lastCreatedPostId = response.dataValues.id;
            axios
              .delete("http://localhost:3000/api/v1/posts/" + lastCreatedPostId)
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
      it("Should delete the post with corresonding id", function (done) {
        assert(response.Status, 200);
        done();
      });
    });
  });
});
