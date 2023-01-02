const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema(
  {
    username: String,
    passwordHash: String,
  },
  {
    timestamps: true,
  }
);
// Proceso para eliminar los atributos _id, __v y la contraseña para la response dada por el endpoint
// Ojo que no se afectan los documentos guardados en la db
usuarioSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Usuario = model("Usuario", usuarioSchema);

// const usuario = new Usuario({
//   username: "test_user",
//   password: "111",
// });

// usuario
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = Usuario;
