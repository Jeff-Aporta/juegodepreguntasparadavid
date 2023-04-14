let baseDePreguntas = [];
let headers = []


function LaTeX(code) {
  return `https://latex.codecogs.com/svg.image?\\large&space;${code}`;
}

function opnLaTeX(code) {
  return `<img src="${LaTeX(code)}" style="height:40px">`;
}

(async function () {
  let texto = await (await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vToRdEZrJILRhTEfCH9A7HJNn2wMghrvS7WjZxkludfAfo375VMw9lv83YiumyIJlgJ0mir3XnJ5o4B/pub?gid=0&single=true&output=tsv")).text()
  console.log(texto)
  texto.replaceAll("\r", "").split("\n").forEach((renglon, index) => {
    let items = renglon.split("\t");
    if (index == 0) {
      headers = items;
      return;
    }
    let pregunta = {}
    pregunta["pregunta"] = items[headers.indexOf("pregunta")]
    pregunta["respuesta"] = items[headers.indexOf("respuesta")]
    if (items[headers.indexOf("imagen")]) {
      pregunta["imagen"] = items[headers.indexOf("imagen")]
    }
    pregunta["distractores"] = [items[headers.indexOf("distractor 1")], items[headers.indexOf("distractor 2")], items[headers.indexOf("distractor 3")]]
    console.log(pregunta.distractores)
    baseDePreguntas.push(pregunta)
  })
  cargarPregunta(INDEX_PREGUNTA);
})();

