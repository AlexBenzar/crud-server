import supertest from "supertest";
import { app } from "../server";
import User from "../models/User.model";

describe("routes tests", () => {
   describe("get all users", () => {
      it("success", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/api/users")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("get error", async () => {
         const response = await supertest(app).get("/api/users");
         expect(response.statusCode).toBe(403);
      });
   });
   describe("post for sign in", () => {
      it("success", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "Alex1",
            password: "123456",
         });
         expect(response.statusCode).toBe(400);
      });
      it("error", async () => {
         const response = await supertest(app).post("/api/signin").send({
            username: "Alex",
            password: "12345",
         });
         expect(response.statusCode).toBe(200);
      });
   });
   describe("post for sign up", () => {
      it("success", async () => {
         const response = await supertest(app).post("/api/signup").send({
            username: "Alex",
            password: "12345",
            email: "sahabenzar@gmail.com",
            isAdmin: false,
            picture: null,
         });
         expect(response.statusCode).toBe(400);
      });
      it("error", async () => {
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
   });
});
