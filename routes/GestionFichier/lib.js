let fs = require('fs');
const Candidature = require('../../models/Candidature.js');


function upload(req, res){

    //empty the collection
    Candidature.remove(err => {
        
        if (err) throw err;
        console.log("supprimer tous les documents dans la collection 'candidatures'");
        let fichierData = fs.readFileSync(__dirname + '/ressources/local/cv.pdf');

        //create une instance d'un fichier
        const fichier = new Candidature({
            cv : {
                type : 'ressources/pdf',
                fichier : fichierData
            }
        });

        fichier.save().then(pdf => {
            console.log("sauvegarder image dans MongoDB");
            Candidature.findById(pdf, (err, findOutPDF) =>{
                if (err) throw err;
                try{
                    fs.writeFileSync(__dirname + 'ressources/CV/cv.pdf', findOutPDF.fichier);
                    console.log("image stocker dans le dossier 'ressources/CV/cv.pdf' ");
                    console.log("ça a l'air exitant par ici");
                    process.exit(0);
                }catch(e){
                    console.log(e);
                }
            });
        }).catch(err => {
            console.log(err);
            throw err;
        });

    });
}