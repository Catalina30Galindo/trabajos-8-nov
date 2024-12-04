class VentaBoletas {
    constructor() {
      this.localidades = {
        General: { precio: 50000, disponibles: 100 },
        Preferencial: { precio: 150000, disponibles: 50 },
        VIP: { precio: 300000, disponibles: 20 },
      };
      this.impuesto = 0.1; // 10%
      this.cargoServicio = 5000; // Por boleta
      this.maxBoletas = 5;
    }
  
    // Verifica si la localidad seleccionada es válida
    esLocalidadValida(localidad) {
      return this.localidades.hasOwnProperty(localidad);
    }
  
    // Verifica si hay suficientes boletas disponibles
    hayBoletasDisponibles(localidad, cantidad) {
      return this.localidades[localidad].disponibles >= cantidad;
    }
  
    // Calcula el costo total del pedido
    calcularCosto(localidad, cantidad) {
      const precioBase = this.localidades[localidad].precio * cantidad;
      const impuestos = precioBase * this.impuesto;
      const cargos = this.cargoServicio * cantidad;
      const total = precioBase + impuestos + cargos;
      return { precioBase, impuestos, cargos, total };
    }
  
    // Procesa la compra de boletas
    procesarCompra(localidad, cantidad, metodoPago) {
      if (!this.esLocalidadValida(localidad)) {
        return "Localidad inválida. Seleccione: General, Preferencial o VIP.";
      }
  
      if (cantidad < 1 || cantidad > this.maxBoletas) {
        return `La cantidad de boletas debe estar entre 1 y ${this.maxBoletas}.`;
      }
  
      if (!this.hayBoletasDisponibles(localidad, cantidad)) {
        return `No hay suficientes boletas disponibles en ${localidad}.`;
      }
  
      if (!["Efectivo", "Tarjeta de crédito"].includes(metodoPago)) {
        return "Método de pago inválido. Solo se acepta Efectivo o Tarjeta de crédito.";
      }
  
      // Calcula el costo total
      const { precioBase, impuestos, cargos, total } = this.calcularCosto(localidad, cantidad);
  
      // Actualiza la cantidad de boletas disponibles
      this.localidades[localidad].disponibles -= cantidad;
  
      // Retorna el desglose del pedido
      return `
        Localidad: ${localidad}
        Boletas: ${cantidad}
        Precio base: $${precioBase}
        Impuestos (10%): $${impuestos}
        Cargo por servicio: $${cargos}
        Total a pagar: $${total}
        Método de pago: ${metodoPago}
      `;
    }
  }
  
  // Función principal para realizar la compra
  function realizarCompra(localidad, cantidad, metodoPago) {
    const venta = new VentaBoletas();
    return venta.procesarCompra(localidad, cantidad, metodoPago);
  }
  
  // Ejemplo de uso
  console.log(realizarCompra("General", 2, "Efectivo")); // Compra válida
  console.log(realizarCompra("VIP", 6, "Tarjeta de crédito")); // Excede el máximo permitido
  console.log(realizarCompra("Preferencial", 3, "Criptomoneda")); // Método de pago inválido
  console.log(realizarCompra("Preferencial", 51, "Efectivo")); // No hay suficientes boletas disponibles
  console.log(realizarCompra("Platino", 2, "Efectivo")); // Localidad inválida
  