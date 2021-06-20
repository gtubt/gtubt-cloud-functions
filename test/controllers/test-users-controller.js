process.env.NODE_ENV = "test";
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/etc/service-account.json'
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const { User } = require("../../app/models");
const { v4: uuidv4 } = require("uuid");
const firebaseConfig = require("../../firebase-config").firebaseConfig;
const firebase_admin = require("firebase-admin");
const test_firebase = firebase_admin.initializeApp({ credential: firebase_admin.credential.applicationDefault() }, 'test');
const axios = require('axios');


const getIdToken = async (uid, email) => {
	const customToken = await test_firebase.auth().createCustomToken(uid, { email: email })
	const res = await axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${firebaseConfig.apiKey}`, {
		token: customToken,
		returnSecureToken: true
	});
	return res.data.idToken;
};
const deleteFirebaseToken = (token, done) => {
	if (token) {
		test_firebase
			.auth()
			.verifyIdToken(token)
			.then((decodedToken) => {
				test_firebase.auth().deleteUser(decodedToken.uid)
					.catch((err) => {
						console.log('error while deleting', err)
					})
					.finally(() => {
						done();
					});
			})
			.catch(err => {
				throw new Error('Token deletion error ' + err)
			});
	}
}

const { expect, assert } = chai;
chai.use(chaiHttp);

newUser = {
	name: 'Dummy Name',
	lastname: 'Dummy Lastname',
	department: 'cse',
	year: 4,
	email: 'dummy@dummy.com',
	studentId: '161044000',
	photoUrl: 'dummy-url.jpg',
	phone: '01234567890'
}

searchUser = {
	name: 'Dummy Name',
	lastname: 'Dummy Lastname',
	department: 'cse',
	year: 4,
	email: 'dummy@test.com',
	studentId: '161044001',
	photoUrl: 'dummy-url.jpg',
	phone: '01234567891'
}

updateUser = {
	name: 'New Dummy Name'
}

describe("User", function () {
	// Increasing timeout. Firebase operations takes time... (Default 2s)
	this.timeout(10000);

	describe("/POST user", () => {
		before((done) => {
			token = '';
			getIdToken(uuidv4(), newUser.email)
				.then((tok) => {
					token = tok
					done();
				})
				.catch((err) => {
					console.log('Error while creating token', err)
				});
		})
		it("Should create user with designated data", (done) => {
			chai
				.request(server)
				.post("/api/v1/users/")
				.set('x-firebase-token', token)
				.type("json")
				.send(newUser)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.Body).to.include(newUser);
					if (res.status != 200) {
						console.log(res.body);
					}
					done();
				});
		});
		after((done) => {
			User.destroy({
				where: {
					email: newUser.email,
				},
			})
				.then(() => {
					done();
				});
		})
		after((done) => {
			deleteFirebaseToken(token, done);
		});
	});

	describe('/GET all users', () => {
		before((done) => {
			User.create(searchUser)
				.then(() => {
					done();
				})
				.catch((err) => {
					console.log(err)
					throw err
				});
		});

		it('Should get all users', (done) => {
			chai
				.request(server)
				.get('/api/v1/users/all')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('array');
					done();
				});
		});

		after((done) => {
			User.destroy({
				where: {
					email: searchUser.email,
				},
			})
				.then(() => {
					done();
				});
		})

	})

	describe('/GET user', () => {
		before((done) => {
			token = '';
			getIdToken(uuidv4(), searchUser.email)
				.then((tok) => {
					token = tok
					done();
				})
				.catch((err) => {
					console.log('Error while creating token', err)
				});
		})
		before((done) => {
			User.create(searchUser)
				.then(() => {
					done();
				})
				.catch((err) => {
					console.log(err)
					throw err
				});
		});

		it('Should get user', (done) => {
			chai
				.request(server)
				.get('/api/v1/users/' + searchUser.email)
				.set('x-firebase-token', token)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.Body).to.include({ email: searchUser.email });
					done();
				});
		});

		after((done) => {
			User.destroy({
				where: {
					email: searchUser.email,
				},
			})
				.then(() => {
					done();
				});
		})
		after((done) => {
			deleteFirebaseToken(token, done);
		});
	})

	describe('/PATCH user', () => {
		before((done) => {
			token = '';
			getIdToken(uuidv4(), searchUser.email)
				.then((tok) => {
					token = tok
					done();
				})
				.catch((err) => {
					console.log('Error while creating token', err)
				});
		})
		before((done) => {
			User.create(searchUser)
				.then(() => {
					done();
				})
				.catch((err) => {
					console.log(err)
					throw err
				});
		});

		it('Should patch user', (done) => {
			chai
				.request(server)
				.patch('/api/v1/users/' + searchUser.email)
				.set('x-firebase-token', token)
				.send(updateUser)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.Body).to.include({ name: updateUser.name });
					done();
				});
		});

		after((done) => {
			User.destroy({
				where: {
					email: searchUser.email,
				},
			})
				.then(() => {
					done();
				});
		})
		after((done) => {
			deleteFirebaseToken(token, done);
		});
	})

	describe('/DELETE user', () => {
		before((done) => {
			token = '';
			getIdToken(uuidv4(), searchUser.email)
				.then((tok) => {
					token = tok
					done();
				})
				.catch((err) => {
					console.log('Error while creating token', err)
				});
		})

		before((done) => {
			User.create(searchUser)
				.then(() => {
					done();
				})
				.catch((err) => {
					console.log(err)
					throw err
				});
		});

		it('Should delete given user', (done) => {
			chai
				.request(server)
				.delete('/api/v1/users/' + searchUser.email)
				.set('x-firebase-token', token)
				.end((err, res) => {
					expect(res).to.have.status(200);
					done();
				});
		});
		after((done) => {
			deleteFirebaseToken(token, done);
		});
	});
});