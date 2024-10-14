import { calculAmortissement } from './src/calcul.mjs';
import { getValues, remplirTableau, afficherGraphique } from './src/dom.mjs';

Array.from(document.querySelectorAll('input'), input => {
  input.addEventListener("input", function(event) {
    let {
      montant,
      tauxMensuel,
      mois,
      annee
    } = getValues();
    
    // appel soit amortissementM ou amortissementY
    let { amortissementM } = calculAmortissement(montant, tauxMensuel, mois, annee);
    afficherGraphique(amortissementM);  
    remplirTableau(amortissementM);
    
    
  }, false);
});