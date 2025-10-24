//-----------------variables globales---------------------
const submitBtn = document.querySelector('input[type="submit"]');

//funcion para calcular factorial de un numero (n!)
function factorial(n) {
  //calcula cuántas formas existen de obtener x éxitos en n intentos
  if (n < 0) {
    return "El factorial no está definido para números negativos";
  }
  let resultado = 1; //el factorial de 0 y 1 es 1
  //multiplicar todos los numeros desde 2 hasta n
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

function probabilidadBinomial(x, n, p) {
  porcentaje = p / 100; //convertir porcentaje a decimal
  const coeficienteBinomial = factorial(n) / (factorial(x) * factorial(n - x)); //-->representa las formas diferentes de elegir x elementos de n
  //formula de distribucion binomial ---> P(X=x) = C(n,x) * p^x * (1-p)^(n-x)
  const probabilidad =
    coeficienteBinomial * porcentaje ** x * (1 - porcentaje) ** (n - x); //----->calcular la probabilidad binomial
  console.log(
    coeficienteBinomial * porcentaje ** x * (1 - porcentaje) ** (n - x)
  );
  return probabilidad;
}
//prueba de la funcion
console.log(probabilidadBinomial(3, 5, 40));

//------------------------------------------------------evento click----->

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); //prevenir el envio del formulario

  //*********************variables para las operaciones*****************
  const n = parseFloat(document.getElementById("N").value.trim()); //numero de experimentos aleatorios
  const x = parseFloat(document.getElementById("X").value.trim()); //numeros de casos de exito
  const p = parseFloat(document.getElementById("P").value.trim()); //probabilidad de exito en porcentaje

  //--------------------validaciones para los campos----------------
  if (isNaN(n) || isNaN(x) || isNaN(p)) {
    Swal.fire({
      //campos vacios
      title: "Campo vacío",
      text: "⚠️ Ingrese un valor, por favor.",
    });
    return;
  } else if (n < 0 || x < 0 || p < 0) {
    //validar que n, x y p no sean negativos
    Swal.fire({
      title: "Número inválido",
      text: `⚠️ No puede ingresar números negativos`,
    });
    return;
  } else if (n % 1 !== 0 || x % 1 !== 0 || p % 1 !== 0) {
    //validar que p, x y n sean enteros
    Swal.fire({
      title: "Número decimal",
      text: `⚠️ Todos los valores ingresados deben ser números enteros`,
    });
    return;
  } else if (p < 0 || p > 100) {
    //validar que el rango de p sea entre 0 y 100
    Swal.fire({
      title: "Porcentaje inválido",
      text: `⚠️ La probabilidad debe estar entre 0 y 100`,
    });
    return;
  } else if (x > n) {
    //validar que los casos de exito no sean mayorea al numero de experimentos
    Swal.fire({
      title: "Valores inconsistentes",
      text: `⚠️ Los casos de éxito(x) no pueden ser mayores al número de experimentos(n)`,
    });
    return;
  }

  //------------------------------result------------------------>
  let result; //la variable result funciona como un objeto

  result = probabilidadBinomial(x, n, p);

  //--------------mostrar resultado en pantalla----------------
  Swal.fire({
    title: "Resultado",
    text: `P(X=${x}) = ${result.toFixed(10)}% = ${(result * 100).toFixed(6)}%`,
  });
});
