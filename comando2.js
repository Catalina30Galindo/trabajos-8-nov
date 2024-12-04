class Matricula {
    constructor(valorBase) {
      this.valorBase = valorBase; // Valor base de la matrícula
      this.interesMensual = 0.02; // 2% de interés mensual
      this.descuento = 0.05; // 5% de descuento para pago completo
    }
  
    // Método para calcular el valor total según la opción elegida
    calcularPago(opcion) {
      switch (opcion) {
        case "completo":
          return this.valorBase * (1 - this.descuento); // Aplica descuento del 5%
        case "2 cuotas":
          return this.calcularCuotas(2);
        case "3 cuotas":
          return this.calcularCuotas(3);
        default:
          return "Opción inválida. Seleccione: completo, 2 cuotas o 3 cuotas.";
      }
    }
  
    // Método para calcular pagos en cuotas
    calcularCuotas(numeroCuotas) {
      if (numeroCuotas < 1 || numeroCuotas > 3) {
        return "Número de cuotas no permitido.";
      }
  
      let saldo = this.valorBase;
      let cuotaMensual = saldo / numeroCuotas;
      let total = 0;
  
      for (let i = 1; i <= numeroCuotas; i++) {
        let interes = saldo * this.interesMensual;
        total += cuotaMensual + interes;
        saldo -= cuotaMensual;
      }
  
      return total.toFixed(2); // Retorna el total con 2 decimales
    }
  }
  
  // Función principal para interactuar con el usuario
  function procesarPago(opcionPago) {
    const matricula = new Matricula(8000000); // Cambié el valor base a $8,000,000
    const resultado = matricula.calcularPago(opcionPago);
  
    if (typeof resultado === "string") {
      console.log(resultado); // Mostrar mensajes de error
    } else {
      console.log(`El total a pagar para la opción "${opcionPago}" es: $${resultado}`);
    }
  }
  
  