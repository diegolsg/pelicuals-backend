const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      'mongodb://suaza:suaza@cluster0-shard-00-00.v1ftd.mongodb.net:27017,cluster0-shard-00-01.v1ftd.mongodb.net:27017,cluster0-shard-00-02.v1ftd.mongodb.net:27017/bd-peliculas?ssl=true&replicaSet=atlas-kzqdhr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(url);
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getConnection
};
