import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");

      connection.on("error", (err) => {
        console.log(
          "MongoDB Connection Error.Please make sure MongoDB is running." + err
        );
        process.exit();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export { connect };
