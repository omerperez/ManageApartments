import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { env } from "process";
import { v4 as uuid } from "uuid";

@Injectable()
export class FileUploaderService {
  constructor() { }

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
    const s3 = new S3();
    const { Location: location } = await s3
      .upload({
        Bucket: env.AWS_PUBLIC_BUCKET_NAME,
        ContentDisposition: "inline",
        ContentType: "application/pdf",
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return location;
  }

  async uploadSingleFile(
    s3: S3,
    dataBuffer: Buffer,
    filename: string
  ): Promise<string> {
    const { Location: location } = await s3
      .upload({
        Bucket: env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return location;
  }

  async uploadMultipleFiles(files: Array<Express.Multer.File>) {
    const s3 = new S3();
    let uploadFiles: string[] = [];
    await Promise.all(
      files.map(async (file) => {
        const currentUrl = await this.uploadSingleFile(
          s3,
          file.buffer,
          file.originalname
        );
        uploadFiles.push(currentUrl);
      })
    );

    return uploadFiles;
  }
}
