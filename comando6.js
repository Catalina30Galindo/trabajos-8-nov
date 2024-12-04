class ServicioEntrega {
    constructor() {
      this.restaurantes = {
        Hamburguesas: { "Hamburguesa simple": 25000, "Hamburguesa doble": 35000 },
        Pizzería: { "Pizza familiar": 85000, "Pizza mediana": 45000 },
        "Comida China": { "Fideos con pollo": 18000, "Arroz especial": 22000 },
      };
      this.costoEnvio = 5000;
      this.minimoCompra = 23000;
      this.tiempoEntrega = "45 minutos a 1 hora";
    }
  
    // Verificar si el restaurante seleccionado es válido
    esRestauranteValido(restaurante) {
      return this.restaurantes.hasOwnProperty(restaurante);
    }
  
    // Verificar si el menú seleccionado existe en el restaurante
    esMenuValido(restaurante, menu) {
      return this.restaurantes[restaurante] && this.restaurantes[restaurante].hasOwnProperty(menu);
    }
  
    // Calcular el total del pedido
    calcularTotal(restaurante, pedidos) {
      let subtotal = 0;
  
      pedidos.forEach(pedido => {
        if (this.esMenuValido(restaurante, pedido.menu)) {
          subtotal += this.restaurantes[restaurante][pedido.menu] * pedido.cantidad;
        }
      });
  
      if (subtotal < this.minimoCompra) {
        return `El pedido mínimo es de $${this.minimoCompra}. Su subtotal actual es $${subtotal}.`;
      }
  
      const total = subtotal + this.costoEnvio;
      return { subtotal, envio: this.costoEnvio, total };
    }
  }
  
  // Función principal para procesar el pedido
  function procesarPedido(restaurante, pedidos, metodoPago) {
    const servicio = new ServicioEntrega();
  
    if (!servicio.esRestauranteValido(restaurante)) {
      return "Restaurante inválido. Seleccione Hamburguesas, Pizzería o Comida China.";
    }
  
    if (!["Efectivo", "Tarjeta"].includes(metodoPago)) {
      return "Método de pago inválido. Solo se acepta Efectivo o Tarjeta.";
    }
  
    const resultado = servicio.calcularTotal(restaurante, pedidos);
  
    if (typeof resultado === "string") {
      return resultado; // Mensaje de error
    }
  
    return `
      Restaurante: ${restaurante}
      Subtotal: $${resultado.subtotal}
      Envío: $${resultado.envio}
      Total: $${resultado.total}
      Tiempo estimado de entrega: ${servicio.tiempoEntrega}
      Método de pago: ${metodoPago}
    `;
  }
  
  // Ejemplo de uso
  const pedidos = [
    { menu: "Hamburguesa simple", cantidad: 2 },
    { menu: "Hamburguesa doble", cantidad: 1 },
  ];
  
  console.log(procesarPedido("Hamburguesas", pedidos, "Efectivo")); // Pedido válido
  console.log(procesarPedido("Pizzería", [{ menu: "Pizza familiar", cantidad: 1 }], "Tarjeta")); // Pedido válido
  console.log(procesarPedido("Comida China", [{ menu: "Fideos con pollo", cantidad: 1 }], "Efectivo")); // Pedido inválido (subtotal menor al mínimo)
  console.log(procesarPedido("Tacos", [{ menu: "Hamburguesa simple", cantidad: 2 }], "Tarjeta")); // Restaurante inválido
  console.log(procesarPedido("Pizzería", [{ menu: "Pizza grande", cantidad: 1 }], "Efectivo")); // Menú inválido
  console.log(procesarPedido("Hamburguesas", pedidos, "Criptomoneda")); // Método de pago inválido
  