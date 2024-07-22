const cifrador = document.getElementById('cifrador');
const inputOriginal = document.getElementById('input-original');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

const alfabeto = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const changeMessage = () => {
  const wordArray = [...inputOriginal.value.toLowerCase()];
  resultado.innerHTML = ''; 
  printChar(0, wordArray);
};

const printChar = (currentLetterIndex, wordArray) => {
  if (wordArray.length === currentLetterIndex) return;
  const spanChar = document.createElement('span');
  resultado.appendChild(spanChar);
  const charUncoded = wordArray[currentLetterIndex];
  spanChar.innerHTML = alfabeto.includes(charUncoded) ?
    alfabeto[(alfabeto.indexOf(charUncoded) + parseInt(rango.value)) % alfabeto.length] :
    charUncoded;
  printChar(currentLetterIndex + 1, wordArray);
};

const submit = e => {
  e.preventDefault();
  changeMessage();
};

cifrador.onsubmit = submit;
inputOriginal.addEventListener('input', changeMessage);
rango.addEventListener('input', changeMessage);
