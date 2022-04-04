const express = require('express')
const fs = require('fs')
const app = express()


const middleware = (req,res,next)=> {
    console.log('MW: ' +req.method+' '+req.url)
    if(req.method != "GET"  && req.method != "POST" && req.method != "DELETE" && req.method != "PUT"){
        res.status(404);
        res.write("Not supported");
        res.end();
    };
    next();
};

function casuale() {
    num = Math.round(Math.random() * 1000);
    return num
}

app.use(middleware);

app.get('/', function(req,res) {
    console.log("ciao")
    res.write("ciao")
    res.end()
})

app.get('/esercizio2', function (req, res) {
    let nuovocontenuto = null;
    try {
      let contenuto = fs.readFileSync("esercizio2.dat");
      numero = parseInt(contenuto);
      return res.json({
        numero: numero,
      })
    } catch(e) {
      console.log(e);
      return res.status(500).json({
        errore: e.message
      })
    }
  })

app.post('/esercizio2', function (req, res) {
    console.log('siamo nella rotta di aggiornamento del contatore');
    try {
        let nuovocontenuto = null;
        let contenuto = fs.readFileSync("esercizio2.dat");
        nuovocontenuto = casuale();
        fs.writeFileSync("esercizio2.dat", nuovocontenuto.toString());
        return res.json({
            salvataggio: "completato",
            'nuovo numero':nuovocontenuto
        })
    } catch(e) {
        console.log(e);
        let nuovocontenuto = casuale();
        fs.writeFileSync("esercizio2.dat", nuovocontenuto.toString());
        return res.json({
            file: "creato",
            'nuovo numero':nuovocontenuto
        })
    }
})

app.delete('/esercizio2', (req, res) => {
    console.log('siamo nella rotta delete');
    try {
      fs.unlinkSync('esercizio2.dat');
      console.log("abbiamo eliminato il file");
      return res.send('File eliminato');
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errore: e.message
      })
    }
  });


app.get('/esercizio4/:nomeFile', (req,res)=>{   
    try {
        const nomeFile = req.params.nomeFile+'.dat';
        const contenuto = fs.readFileSync(nomeFile);
        console.log("contenuto file =" + contenuto);
        const nuovocontenuto = parseInt(contenuto);
        return res.json({
          contenuto: nuovocontenuto
        })
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          errore: 'Il file non esiste'
        })
      }
})

app.delete('/esercizio4/:nomeFile', (req, res) => {

    try {
      const nomeFile = req.params.nomeFile+'.dat';
      fs.unlinkSync(nomeFile);
      console.log("abbiamo eliminato il file");
      return res.send('Il file è stato eliminato')
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errore: 'Il file non esiste'
      })
    }
  });

app.put('/esercizio4/:nomeFile/', (req, res) => {

    try {
        const nomeFile = req.params.nomeFile;
        let nuovocontenuto = req.query.contenuto;
        let c=fs.writeFileSync(nomeFile, nuovocontenuto.toString());
        return res.json({
          contenuto: nuovocontenuto
        })
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          errore: 'Il file non esiste'
        })
      }
  });


app.listen(9000);