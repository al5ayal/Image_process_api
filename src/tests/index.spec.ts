import { ImageProcessInterface } from "./../types/ImageProcessInterface";
import path from "path";
import supertest from "supertest";
import { ImageProcess } from "../utilities/ImageProcess";
import app from "../index";
import { QueryImage } from "../types/QueryImage";

// create a request object
const request = supertest(app);

describe("Test main endpoints response", () => {
  it(`Test / endpoint`, async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it(`Test /api endpoint`, async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
});

describe("Test api/images endpoints resizing successfully", () => {
  it(`Test /api/images?filename=fjord.jpg&width=200&height=200 resizing endpoint`, async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it(`Test /api/images?filename=fjord.jpg&width=200&height=200 Getting Image from cache`, async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });
});

describe("Test api/images/upload endpoint", () => {
  it(`Test Uploading uploadtest.jpg file endpoint`, async () => {
    console.log(path.resolve(__dirname, "../public/images/uploadtest.jpg"));
    const response = await request
      .post("/api/images/upload")
      .attach(
        "image",
        path.resolve(__dirname, "../public/images/uploadtest.jpg")
      );
    expect(response.status).toBe(200);
    // expect(Object.keys(response.body)).toContain('filename');
    // expect(Object.keys(response.body)).toContain('filePath');
  });

  describe("image processing / resizing", () => {
    it(`Test resizing image`, async () => {
      const queryImage: QueryImage = {
        filename: "santamonica.jpg",
        width: "400",
        height: "400",
      };

      const imagesPath = path.resolve(__dirname, "../public/images");

      const imageParams: ImageProcessInterface = {
        originalFilePath: imagesPath + `/${queryImage.filename}`,
        targetFilePath:
          imagesPath +
          `/thumbs/${queryImage.width}_${queryImage.height} _${queryImage.filename}`,
        QueryImage: queryImage,
      };

      const processedImage = await ImageProcess(imageParams);
      expect(processedImage).toEqual(imageParams.targetFilePath);
      // expect(Object.keys(response.body)).toContain('filename');
      // expect(Object.keys(response.body)).toContain('filePath');
    });
  });
});
