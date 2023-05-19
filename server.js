const http = require('http');
const fs = require('fs');

// Define o caminho para o arquivo paises.json
const pathToFile = __dirname + '/paises.json';

http.createServer((req, res) => {
  if (req.url === '/paises') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      //slice
      const primeirospaises = paises.slice(0,20);


      // Gera a resposta HTTP com o conteúdo JSON
      res.statusCode = 200;
      res.end(JSON.stringify(primeirospaises));
    });
  } 
  if (req.url === '/paisescomb') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      var paisescomb = [];

      paises.array.forEach(element => {
        var nometemporario = element.nome_pais;

        nometemporario = String(nometemporario);

        var primeiraletra = nometemporario.substr(0,1);

        if(primeiraletra == "B"){
          paisescomb.push(element.nome_pais);
        }
      });

      //foreach
      

      // Gera a resposta HTTP com o conteúdo JSON
      res.statusCode = 200;
      res.end(JSON.stringify(paisescomb));
    });
  } 
  
  
  else {
    // Se a URL não for /paises, envia o arquivo index.html
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin' : '*'
    });
    let readStream = fs.createReadStream(__dirname + '/index.html');
    readStream.pipe(res);
  }
}).listen(8000);

console.log('Visite-me em: http://localhost:8000');

