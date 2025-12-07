# Reflexión Grupal - Clase 06: Estándares W3C

## ¿Qué aprendimos sobre la importancia de los estándares?

Es la base para crear aplicaciones web consistentes, accesibles y mantenibles, sin una buena base o conocimiento de lo amplio que puede ser este mundo, el trabajo puede ser incompleto. Si bien se tiene el uso de la IA, como profesionales debemos poner nuestro propio criterio y saber que necesita cada proyecto. En general, podemos resaltar algunas ventajas sobre estos estandares y su importancia en el entorno de desarrollo. 

- **Interoperabilidad**: Funcionamiento correcto en diferentes navegadores y dispositivos sin necesidad de código específico para cada plataforma.

- **Semántica y Accesibilidad**: El uso correcto de elementos HTML5 semánticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`) mejora la estructura del código.

- **Reutilización de Código**: Los Web Components nos permitieron crear componentes personalizados encapsulados que pueden ser reutilizados en diferentes partes de la aplicación o incluso en otros proyectos.

- **Datos Estructurados**: RDF nos mostró cómo estructurar información de manera que sea comprensible tanto para humanos como para máquinas, facilitando la integración de datos entre diferentes sistemas y la construcción de una web semántica.

- **Mantenibilidad a Largo Plazo**: Al seguir estándares, nuestro código es más fácil de mantener, actualizar y escalar. 

## ¿Cómo influye la W3C en nuestro futuro como ingenieros de sistemas?

La W3C tiene un impacto significativo en nuestra formación profesional, pues proporciona una base técnica sólida, empleabilidad (competitividad en el mercado laboral internacional), arquitectura del software pues...
   - Web Components nos enseñan principios de encapsulamiento y modularidad
   - RDF nos introduce a conceptos de grafos de conocimiento y semántica
   - HTML5 y CSS3 nos muestran cómo evolucionar tecnologías manteniendo retrocompatibilidad

   integración de sistemas (relevante en el desarrollo de aplicaciones empresariales y sistemas distribuidos) y entender cómo funcionan los estándares nos prepara para contribuir a la comunidad de desarrollo web y potencialmente participar en la evolución de futuros estándares.

## ¿Qué desafíos encontramos al implementar los estándares?

Durante la implementación de los tres proyectos (Todo List, Book Tracker y Weekly Calendar con RDF), enfrentamos varios desafíos:

### 1. Curva de Aprendizaje de Web Components

La API de Web Components (Custom Elements, Shadow DOM, Templates) tiene conceptos que difieren significativamente del desarrollo web tradicional.Se comenzó con componentes simples (todo-item, todo-form) antes de avanzar a componentes más complejos con estado (todo-list). 

La encapsulación que ofrece Shadow DOM es poderosa pero requiere pensar diferente sobre el flujo de datos y estilos.

### 2. Complejidad de RDF y Vocabularios

Entender y aplicar correctamente los diferentes vocabularios (Dublin Core, FOAF, BIBO, Schema.org) y sus propiedades específicas fue inicialmente confuso.

Pero se ve que es flexibley requiere planificación cuidadosa de las relaciones entre entidades. 

### 3. CSS Grid y Flexbox Combinados

Crear layouts responsivos que combinen Grid y Flexbox de manera efectiva, especialmente para las vistas de calendario y tarjetas de libros. Se utilizó Grid para layouts principales (estructura de página, grids de tarjetas) y Flexbox para componentes internos (alineación de elementos, navegación).

### 4. Validación de Formularios HTML5

Implementar validación nativa HTML5 que sea tanto funcional como estéticamente agradable. Al final la validación nativa mejora la accesibilidad y UX sin dependencias externas.



### 6. Consistencia de Diseño

Mantener un diseño coherente entre tres aplicaciones diferentes mientras se ajustan a diferentes estéticas (minimalista para todo-list, Notion-style para book-tracker, vintage para weekly-calendar). Aqui se utiliza CSS Variables para definir paletas de colores y espaciados consistentes. 
