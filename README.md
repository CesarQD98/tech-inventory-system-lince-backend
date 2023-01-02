# tech-inventory-system-lince

Desarrollo de nueva API Backend para el sistema de inventario de Tech-Inn, a modo de práctica.

## Models

### TODO Models

- [ ] Implementar los modelos e ir verificando o refactorizando los atributos. _Check this box when models work in a major commit_.

- **User**

  - username
  - passwordHash

- **Item**
  - nombre
  - codigo
  - marca
  - t_entrega
  - l_entrega
  - proveedor
  - procedencia
  - costo

## Apuntes

- El siguiente código `const Usuario = model("Usuario", usuarioSchema);`, crea la colección **usuarios** en la db. Es un comportamiento por default del método `model` de `mongoose`. Por ello se [recomienda nombrar al modelo en singular](https://youtu.be/vhUw7GkRHdk?list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&t=548).

## TODO general

- [ ] Revisar business-case para desarrollar la db de nuevo. Pensar si hacerlo full documentos o cuál es la necesidad de hacerla "relacional" usando MongoDB.
- [ ] La API debe rechazar conexiones de no ser un usuario con privilegios.
- [ ] Encriptar passwords a guardar en db.
- [ ] Deployar en [heroku](https://www.heroku.com/), revisar video de [midudev](https://www.youtube.com/watch?v=ep_plUeKV1Y&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=7&t=1746s).
- [ ] Hacer uso de una db en la nube con MongoDB Atlas. No olvidar el tema de "cors".
