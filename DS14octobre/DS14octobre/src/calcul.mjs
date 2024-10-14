let calculMensualite = function(montant, tauxMensuel, mois) {
    let remboursementMensuel;
    if (tauxMensuel) {
      remboursementMensuel = montant * tauxMensuel /
        (1 - (Math.pow(1 / (1 + tauxMensuel), mois)));
    } else {
      remboursementMensuel = montant / mois;
    }
  
    return remboursementMensuel;
  
  }
  
export let calculAmortissement = (montant, tauxMensuel, mois, annee) => {
      let remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
        console.log(remboursementMensuel);
      let balance = montant; // total
      let amortissementY = [];
      let amortissementM = [];
      for (let y=0; y<annee; y++) {
          let interestY = 0;  //Interest payment for year y
          let montantY = 0; //montant payment for year y
          for (let m=0; m<12; m++) {
              let interestM = balance * tauxMensuel;       //Interest payment for month m
              let montantM = remboursementMensuel - interestM; //montant payment for month m
              interestY = interestY + interestM;
              montantY = montantY + montantM;
              balance = balance - montantM;
              amortissementM.push({remboursementMensuel, capitalAmorti:montantM, interet:interestM, capitalRestantDu : balance});
          }
          amortissementY.push({remboursementMensuel, capitalAmorti:montantY, interet:interestY, capitalRestantDu : balance});
      }
      
      return {remboursementMensuel, amortissementY , amortissementM};
  };

