class SistemaApuestas {
    constructor() {
      this.carreras = {
        "Carrera 1": {
          pilotos: { "Piloto A": 1.5, "Piloto B": 2.3, "Piloto C": 1.8 },
        },
        "Carrera 2": {
          pilotos: { "Piloto X": 2.0, "Piloto Y": 1.6, "Piloto Z": 2.8 },
        },
      };
      this.montoMinimo = 10000;
      this.montoMaximo = 1000000;
    }
  
    // Verificar si la carrera es válida
    esCarreraValida(carrera) {
      return this.carreras.hasOwnProperty(carrera);
    }
  
    // Verificar si el piloto seleccionado es válido
    esPilotoValido(carrera, piloto) {
      return this.carreras[carrera]?.pilotos.hasOwnProperty(piloto);
    }
  
    // Calcular las ganancias según el tipo de apuesta
    calcularGanancias(cuota, monto) {
      return monto * cuota;
    }
  }
  
  class Usuario {
    constructor(nombre, id, edad) {
      this.nombre = nombre;
      this.id = id;
      this.edad = edad;
    }
  
    // Verificar si el usuario es mayor de edad
    esMayorDeEdad() {
      return this.edad >= 18;
    }
  }
  
  // Función para registrar una apuesta
  function realizarApuesta(usuario, carrera, piloto, monto, tipoApuesta) {
    const sistema = new SistemaApuestas();
  
    // Verificaciones iniciales
    if (!usuario.esMayorDeEdad()) {
      return "No puedes apostar, debes ser mayor de edad.";
    }
  
    if (!sistema.esCarreraValida(carrera)) {
      return "Carrera no válida. Seleccione una carrera habilitada.";
    }
  
    if (!sistema.esPilotoValido(carrera, piloto)) {
      return "Piloto no válido. Seleccione un piloto habilitado para la carrera.";
    }
  
    if (monto < sistema.montoMinimo || monto > sistema.montoMaximo) {
      return `El monto debe estar entre $${sistema.montoMinimo} y $${sistema.montoMaximo}.`;
    }
  
    // Calcular ganancias
    const cuota = sistema.carreras[carrera].pilotos[piloto];
    const ganancias = sistema.calcularGanancias(cuota, monto);
  
    // Desglose de la apuesta
    return `
      Usuario: ${usuario.nombre}
      Carrera: ${carrera}
      Tipo de Apuesta: ${tipoApuesta}
      Piloto: ${piloto}
      Monto Apostado: $${monto}
      Cuota: ${cuota}
      Posibles Ganancias: $${ganancias.toFixed(2)}
    `;
  }
  
  // Ejemplo de uso
  const usuario1 = new Usuario("Juan Pérez", "123456789", 25);
  console.log(realizarApuesta(usuario1, "Carrera 1", "Piloto A", 50000, "Ganador de la carrera")); // Apuesta válida
  
  const usuario2 = new Usuario("Carlos López", "987654321", 16);
  console.log(realizarApuesta(usuario2, "Carrera 1", "Piloto B", 20000, "Ganador de la carrera")); // Usuario menor de edad
  
  console.log(realizarApuesta(usuario1, "Carrera 3", "Piloto A", 50000, "Ganador de la carrera")); // Carrera inválida
  
  console.log(realizarApuesta(usuario1, "Carrera 1", "Piloto X", 50000, "Ganador de la carrera")); // Piloto inválido
  
  console.log(realizarApuesta(usuario1, "Carrera 1", "Piloto A", 500, "Ganador de la carrera")); // Monto menor al mínimo
  