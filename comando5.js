class Biblioteca {
    constructor() {
      this.tarifas = {
        Bestsellers: 500,
        Literatura: 100,
        Académicos: 0,
      };
      this.maxLibros = 5;
      this.minDias = 1;
      this.maxDias = 30;
      this.descuento = 0.1; // 10% de descuento para préstamos mayores a 10 días
    }
  
    // Método para calcular el costo del préstamo de un libro
    calcularCosto(categoria, dias) {
      if (!this.tarifas.hasOwnProperty(categoria)) {
        return "Categoría no válida. Seleccione: Bestsellers, Literatura o Académicos.";
      }
  
      if (dias < this.minDias || dias > this.maxDias) {
        return `Número de días inválido. Debe estar entre ${this.minDias} y ${this.maxDias}.`;
      }
  
      let costo = this.tarifas[categoria] * dias;
  
      // Aplicar descuento si el préstamo es mayor a 10 días y no es Académicos
      if (dias > 10 && categoria !== "Académicos") {
        costo *= 1 - this.descuento;
      }
  
      return costo;
    }
  
    // Método para procesar una lista de libros solicitados
    procesarPrestamo(libros, dias) {
      if (libros.length === 0 || libros.length > this.maxLibros) {
        return `Número de libros inválido. Puede solicitar entre 1 y ${this.maxLibros} libros.`;
      }
  
      let total = 0;
      for (const libro of libros) {
        const { titulo, categoria } = libro;
        const costo = this.calcularCosto(categoria, dias);
  
        if (typeof costo === "string") {
          return costo; // Retorna el mensaje de error si hay problemas
        }
  
        total += costo;
        console.log(`Libro: ${titulo}, Categoría: ${categoria}, Costo: $${costo}`);
      }
  
      return `Total a pagar por el préstamo: $${total}`;
    }
  }
  
  // Función principal para realizar un préstamo
  function realizarPrestamo(libros, dias) {
    const biblioteca = new Biblioteca();
    return biblioteca.procesarPrestamo(libros, dias);
  }
  
  // Ejemplo de uso
  const librosSolicitados = [
    { titulo: "El arte de la guerra", categoria: "Literatura" },
    { titulo: "Clean Code", categoria: "Académicos" },
    { titulo: "Harry Potter", categoria: "Bestsellers" },
  ];
  
  console.log(realizarPrestamo(librosSolicitados, 12)); // Préstamo válido
  console.log(realizarPrestamo(librosSolicitados, 5)); // Préstamo válido sin descuento
  console.log(realizarPrestamo([], 5)); // Número de libros inválido
  console.log(realizarPrestamo(librosSolicitados, 35)); // Días inválidos
  console.log(realizarPrestamo([{ titulo: "Libro X", categoria: "Fantástico" }], 5)); // Categoría inválida
  