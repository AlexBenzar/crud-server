import supertest from "supertest";
import { app } from "../server";
import User from "../models/User.model";

describe("routes tests", () => {
   describe("tested if admin can get all users in database", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/api/users")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is user then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            username: "benzaroo",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/api/users")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
      it("if it is unregistered user then it'll return status code 403", async () => {
         const response = await supertest(app).get("/api/users");
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if user can get his data from database", () => {
      it("if user is auth then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/api/user")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is unregistered user then it'll return status code 403", async () => {
         const response = await supertest(app).get("/api/user");
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested all valid and invalid cases for sign in", () => {
      it("if all data is correct then it'll return status code 200", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "12345",
         });
         expect(response.statusCode).toBe(200);
      });
      it("if user didn't exist then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "Alex1",
            password: "123456",
         });
         expect(response.statusCode).toBe(400);
      });
      it("if data isn't correct then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "",
            password: "",
         });
         expect(response.statusCode).toBe(400);
      });
      it("if user entered wrong password then it'll return status code 400 ", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "1234",
         });
         expect(response.statusCode).toBe(400);
      });
   });
   describe("tested all valid and invalid cases for sign up", () => {
      it("if all data is correct then it'll return status code 200", async () => {
         const response = await supertest(app).post("/api/signup").send({
            username: "User1",
            password: "12345",
            email: "user@gmail.com",
            isAdmin: false,
            picture: null,
         });
         expect(response.statusCode).toBe(200);
         const user = await User.findOne({ username: "User1" });
         if (user?._id) {
            await User.findByIdAndDelete(user._id);
         }
      });
      it("if data isn't correct then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signup").send({
            username: "",
            password: "",
            email: "",
            isAdmin: false,
            picture: null,
         });
         expect(response.statusCode).toBe(400);
      });
      it("if user is already exist then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signup").send({
            username: "Alex",
            password: "12345",
            email: "sahabenzar@gmail.com",
            isAdmin: false,
            picture: null,
         });
         expect(response.statusCode).toBe(400);
      });
   });
});
