class TiendaZapatos {
    constructor() {
      this.modelos = {
        "Clásicos": 500000,
        "Running": 800000,
        "Basketball": 1000000,
      };
      this.tallasDisponibles = Array.from({ length: 10 }, (_, i) => i + 35); // Tallas del 35 al 44
      this.descuento = 0.1; // 10% de descuento
      this.cantidadMaxima = 5;
      this.cantidadMinima = 1;
    }
  
    // Verificar si el modelo es válido
    esModeloValido(modelo) {
      return this.modelos.hasOwnProperty(modelo);
    }
  
    // Verificar si la talla es válida
    esTallaValida(talla) {
      return this.tallasDisponibles.includes(talla);
    }
  
    // Calcular el precio total
    calcularTotal(modelo, cantidad) {
      let precioBase = this.modelos[modelo];
      let total = precioBase * cantidad;
  
      if (cantidad >= 3) {
        total *= (1 - this.descuento); // Aplicar descuento
      }
  
      return total;
    }
  }
  
  // Función principal para procesar la compra
  function procesarCompra(modelo, talla, cantidad) {
    const tienda = new TiendaZapatos();
  
    if (!tienda.esModeloValido(modelo)) {
      return "Modelo de tenis no válido. Por favor, seleccione: Clásicos, Running o Basketball.";
    }
  
    if (!tienda.esTallaValida(talla)) {
      return `Talla no válida. Por favor, seleccione una talla entre ${tienda.tallasDisponibles[0]} y ${tienda.tallasDisponibles[tienda.tallasDisponibles.length - 1]}.`;
    }
  
    if (cantidad < tienda.cantidadMinima || cantidad > tienda.cantidadMaxima) {
      return `Cantidad no válida. La cantidad debe estar entre ${tienda.cantidadMinima} y ${tienda.cantidadMaxima}.`;
    }
  
    const total = tienda.calcularTotal(modelo, cantidad);
    return `Modelo: ${modelo}\nTalla: ${talla}\nCantidad: ${cantidad}\nTotal a pagar: $${total.toFixed(2)}`;
  }
  
  // Ejemplo de uso
  console.log(procesarCompra("Clásicos", 38, 2)); // Compra válida
  console.log(procesarCompra("Running", 40, 3)); // Compra con descuento
  console.log(procesarCompra("Basketball", 45, 1)); // Talla inválida
  console.log(procesarCompra("Deportivos", 38, 2)); // Modelo inválido
  console.log(procesarCompra("Clásicos", 39, 6)); // Cantidad fuera de rango
  