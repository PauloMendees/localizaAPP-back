const S3 = require("aws-sdk/clients/s3")

export class S3Instance {
      private instance: typeof S3

      constructor(){
        this.instance = new S3({
            region: `${process.env.AWS_DEFAULT_REGION}`,
            accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
            secretKey: `${process.env.AWS_SECRET_ACCESS_KEY}`
        })
      }

      public getInstance(): typeof S3{
        return this.instance;
      }
}