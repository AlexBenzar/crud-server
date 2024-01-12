import supertest from "supertest";
import { app } from "../server";
import User from "../models/User.model";
import mongoose from "mongoose";

afterAll(() => mongoose.disconnect());

describe("routes tests", () => {
   const testId = "658c293285a35991fc009beb";
   describe("tested if admin can get all users in database", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/api/users")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is user then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
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
   describe("tested if admin can get user in database", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get(`/api/user/659e8ce0c66434ce38d29abb`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is user then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get(`/api/user/1`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
      it("if it is unregistered user then it'll return status code 403", async () => {
         const response = await supertest(app).get("/api/user").send({ _id: testId });
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if user can get his data", () => {
      it("if user is auth then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
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
   describe("tested if admin can edit users", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .patch(`/api/user/659e8ce0c66434ce38d29abb`)
            .send({ username: "Sania" })
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
         await supertest(app)
            .patch(`/api/user/659e8ce0c66434ce38d29abb`)
            .send({ username: "Alex" })
            .set("Authorization", "Baerer " + body.token);
      });
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .patch(`/api/user/659e8ce0c66434ce38d29abb`)
            .send({ username: "Sania" })
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested all valid and invalid cases for sign in", () => {
      it("if all data is correct then it'll return status code 200", async () => {
         const response = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         expect(response.statusCode).toBe(200);
      });
      it("if user didn't exist then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "123456",
         });
         expect(response.statusCode).toBe(400);
      });
      it("if data isn't correct then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signin").send({
            email: "",
            password: "",
         });
         expect(response.statusCode).toBe(400);
      });
      it("if user entered wrong password then it'll return status code 400 ", async () => {
         const response = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
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
            isAdmin: "false",
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
            isAdmin: "false",
            picture: null,
         });
         expect(response.statusCode).toBe(400);
      });
      it("if user is already exist then it'll return status code 400", async () => {
         const response = await supertest(app).post("/api/signup").send({
            username: "Alex",
            password: "12345",
            email: "sahabenzar@gmail.com",
            isAdmin: "false",
            picture: null,
         });
         expect(response.statusCode).toBe(400);
      });
   });
});
