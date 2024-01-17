import supertest from "supertest";
import { app } from "../server";
import Profile from "../models/Profile.model";
import mongoose from "mongoose";

afterAll(() => mongoose.disconnect());

describe("profile routes tests", () => {
   const testId = "659e8cf0c66434ce38d29ac1";
   const testAdminId = "659e8ce0c66434ce38d29abb";
   describe("tested if user can get his profiles", () => {
      it("if user is auth then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get("/profiles/profile")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is unregistered user then it'll return status code 403", async () => {
         const response = await supertest(app).get("/profiles/profile");
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if admin can get user profiles", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get(`/profiles/profile/${testId}`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is user then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .get(`/profiles/profile/${testId}`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if user can create new profile", () => {
      it("if user is auth then it'll return status code 200", async () => {
         const testData = { full_name: "Alex", birthdate: "2003-03-03", city: "Chernivtsi", gender: "mechanic" };
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .post("/profiles/profile")
            .send(testData)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);

         const profile = await Profile.find();
         await profile[profile.length - 1].deleteOne();
      });
      it("if user is auth but data isn't correct then it'll return status code 400", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .post("/profiles/profile")
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(400);
      });
      it("if it is unregistered user then it'll return status code 403", async () => {
         const response = await supertest(app).post("/profiles/profile");
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if admin can create new profile", () => {
      it("if it is admin then it'll return status code 200", async () => {
         const testData = { full_name: "Alex", birthdate: "2003-03-03", city: "Chernivtsi", gender: "mechanic" };
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .post(`/profiles/profile/${testAdminId}`)
            .send(testData)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if it is user then it'll return status code 403", async () => {
         const testData = { full_name: "Alex", birthdate: "2003-03-03", city: "Chernivtsi", gender: "mechanic" };
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const response = await supertest(app)
            .post(`/profiles/profile/${testId}`)
            .send(testData)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if user can update profile", () => {
      it("if user'll update his profile then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const profile = await Profile.find();
         const { _id } = profile[profile.length - 1];
         const response = await supertest(app)
            .patch(`/profiles/profile/${_id}`)
            .send({ full_name: "Alex2" })
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if user'll update other profile then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const profile = await Profile.find();
         const { _id } = profile[profile.length - 1];
         const response = await supertest(app)
            .patch(`/profiles/profile/${_id}`)
            .send({ full_name: "Alex2" })
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
   });
   describe("tested if user can delete profile", () => {
      it("if user'll delete his profile then it'll return status code 200", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar@gmail.com",
            password: "12345",
         });
         const profile = await Profile.find();
         const { _id } = profile[profile.length - 1];
         const response = await supertest(app)
            .delete(`/profiles/profile/${_id}`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(200);
      });
      it("if user'll delete other profile then it'll return status code 403", async () => {
         const { body } = await supertest(app).post("/api/signin").send({
            email: "sahabenzar2@gmail.com",
            password: "12345",
         });
         const profile = await Profile.find();
         const { _id } = profile[profile.length - 1];
         const response = await supertest(app)
            .delete(`/profiles/profile/${_id}`)
            .set("Authorization", "Baerer " + body.token);
         expect(response.statusCode).toBe(403);
      });
   });
});
