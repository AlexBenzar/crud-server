import AWS from "aws-sdk";
import { accessId, secretId } from "../config";

const savePicture = async (picture: Express.Multer.File) => {
   const s3 = new AWS.S3({
      accessKeyId: secretId,
      secretAccessKey: accessId,
   });
   const params = {
      Bucket: "bucket-avatars",
      Key: Date.now() + picture.originalname,
      Body: picture.buffer,
      ContentType: picture.mimetype,
   };
   const { Location } = await s3.upload(params).promise();
   return Location;
};

export default savePicture;
