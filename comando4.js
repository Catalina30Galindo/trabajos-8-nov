class FabricaEscobas {
    constructor() {
      this.precios = {
        "Escoba dura sintética": 8000,
        "Escoba dura natural": 10000,
        "Cepillo sintético": 12000,
        "Cepillo natural": 15000,
        "Mango largo": 2000,
        "Gancho en punta": 500,
      };
      this.cantidadMinima = 3;
      this.cantidadMaxima = 30;
    }
  
    // Verificar si la configuración es válida
    esConfiguracionValida(material, opciones) {
      if (!["Cerdas sintéticas", "Cerdas naturales"].includes(material)) {
        return "Material inválido. Seleccione cerdas sintéticas o cerdas naturales.";
      }
      if (opciones.includes("Mango largo") && opciones.includes("Gancho en punta")) {
        return "No se puede combinar Mango largo con Gancho en punta.";
      }
      return null; // Configuración válida
    }
  
    // Calcular el precio total
    calcularPrecio(modelo, material, opciones, cantidad) {
      if (cantidad < this.cantidadMinima || cantidad > this.cantidadMaxima) {
        return `Cantidad inválida. Debe estar entre ${this.cantidadMinima} y ${this.cantidadMaxima}.`;
      }
  
      const configuracion = `${modelo} ${material === "Cerdas sintéticas" ? "sintética" : "natural"}`;
      if (!this.precios[configuracion]) {
        return "Modelo o material inválido.";
      }
  
      let precioUnitario = this.precios[configuracion];
      opciones.forEach(opcion => {
        if (this.precios[opcion]) {
          precioUnitario += this.precios[opcion];
        }
      });
  
      const total = precioUnitario * cantidad;
      return `Modelo: ${modelo}\nMaterial: ${material}\nOpciones: ${opciones.join(", ") || "Ninguna"}\nCantidad: ${cantidad}\nTotal a pagar: $${total}`;
    }
  }
  
  // Función principal para procesar la cotización
  function cotizarEscobas(modelo, material, opciones, cantidad) {
    const fabrica = new FabricaEscobas();
  
    if (!["Escoba dura", "Escoba suave", "Cepillo"].includes(modelo)) {
      return "Modelo inválido. Seleccione Escoba dura, Escoba suave o Cepillo.";
    }
  
    const error = fabrica.esConfiguracionValida(material, opciones);
    if (error) {
      return error;
    }
  
    return fabrica.calcularPrecio(modelo, material, opciones, cantidad);
  }
  
  // Ejemplo de uso
  console.log(cotizarEscobas("Escoba dura", "Cerdas sintéticas", ["Mango largo"], 5)); // Configuración válida
  console.log(cotizarEscobas("Cepillo", "Cerdas naturales", ["Gancho en punta"], 10)); // Configuración válida
  console.log(cotizarEscobas("Escoba dura", "Cerdas naturales", ["Mango largo", "Gancho en punta"], 4)); // Configuración inválida (opciones)
  console.log(cotizarEscobas("Cepillo", "Cerdas metálicas", [], 5)); // Material inválido
  console.log(cotizarEscobas("Escoba suave", "Cerdas sintéticas", [], 31)); // Cantidad fuera de rango
  