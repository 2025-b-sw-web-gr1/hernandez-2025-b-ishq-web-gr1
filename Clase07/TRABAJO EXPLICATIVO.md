# Trabajo Explicativo


## ¿Por qué se eligió Handlebars?

 Handlebars fuerza una separación más estricta entre la lógica de negocio y la presentación, lo que hace que las vistas sean más limpias y mantenibles. Permite crear funciones auxiliares reutilizables (helpers) que encapsulan la lógica de formateo y presentación de datos, manteniendo las plantillas simples. Es uno de los motores de plantillas más utilizados, especialmente en aplicaciones empresariales y frameworks modernos. La integración con Express a través de `express-handlebars` es sencilla y bien documentada.

##  Diferencias encontradas respecto a EJS

### Sintaxis

**EJS** permite ejecutar código JavaScript directamente:
```ejs
<% if (user.name) { %>
  <h1>Hola <%= user.name.toUpperCase() %></h1>
<% } %>
```

**Handlebars** usa una sintaxis más declarativa con helpers:
```handlebars
{{#if user.name}}
  <h1>Hola {{uppercase user.name}}</h1>
{{/if}}
```

### Lógica en las vistas

- **EJS**: Permite cualquier código JavaScript en las plantillas (`for`, `while`, operaciones complejas)
- **Handlebars**: Limita la lógica a helpers predefinidos, forzando que la lógica compleja esté en el servidor

### Helpers

- **EJS**: No tiene sistema de helpers, todo se escribe directamente
- **Handlebars**: Requiere crear helpers para operaciones personalizadas (ej: `formatDate`, `stars`, `ifEq`)


## Ventajas y Desventajas Observadas

Entre las ventajas se encuentra: 
- Código más limpio y mantenible
- Reutilización de código (Los helpers se pueden usar en todas las vistas)
- Mejor separación de responsabilidades (La lógica de negocio permanece en el servidor, las vistas solo se encargan de la presentación)
- Sistema de layouts muy flexible.

Entre las desventajas se encuentra:

- Curva de aprendizaje inicial (requiere entender y planificar el sistema de helpers)
- Menos flexible para lógica compleja.
- Debugging más complejo (errores de helpers dificiles de rastrear)
- Limitaciones con operaciones complejas.