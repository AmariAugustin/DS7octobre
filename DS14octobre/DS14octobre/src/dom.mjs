  import Chart from 'chart.js/auto';
  
  let chartInstance1 = null;
  let chartInstance2 = null;
  
  export function afficherGraphique(amortissement) {
      const labels = amortissement.map((_, index) => `Période ${index + 1}`);
      const dataInterets = amortissement.map(({ interet }) => Math.round(interet));
      const dataRemboursement = amortissement.map(({ remboursementMensuel }) => Math.round(remboursementMensuel));
      const dataCapitalRestant = amortissement.map(({ capitalRestantDu }) => Math.round(capitalRestantDu));
  
      // Regrouper les données par année
      const groupedData = amortissement.reduce((acc, curr, index) => {
          const year = Math.floor(index / 12);
          if (!acc[year]) {
              acc[year] = { interet: 0, remboursementMensuel: 0 };
          }
          acc[year].interet += curr.interet;
          acc[year].remboursementMensuel += curr.remboursementMensuel;
          return acc;
      }, []);
  
      const labelsByYear = groupedData.map((_, index) => `Année ${index + 1}`);
      const dataInteretsByYear = groupedData.map(data => Math.round(data.interet));
      const dataRemboursementByYear = groupedData.map(data => Math.round(data.remboursementMensuel));
  
      const ctx1 = document.getElementById('myChart1').getContext('2d');
      const ctx2 = document.getElementById('myChart2').getContext('2d');
  
      // Détruire les graphiques existants s'ils existent
      if (chartInstance1) {
          chartInstance1.destroy();
      }
      if (chartInstance2) {
          chartInstance2.destroy();
      }
  
      // Créer le premier graphique pour les intérêts payés et les remboursements mensuels
      chartInstance1 = new Chart(ctx1, {
          type: 'bar',
          data: {
              labels: labelsByYear,
              datasets: [
                  {
                      label: 'Intérêts Payés',
                      data: dataInteretsByYear,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                  },
                  {
                      label: 'Remboursement Mensuel',
                      data: dataRemboursementByYear,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1,
                  },
              ],
          },
          options: {
              responsive: true,
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Année',
                      },
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Montant (€)',
                      },
                  },
              },
          },
      });
  
      // Créer le deuxième graphique pour le capital restant
      chartInstance2 = new Chart(ctx2, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: 'Capital Restant',
                      data: dataCapitalRestant,
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      fill: false,
                  },
              ],
          },
          options: {
              responsive: true,
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Période',
                      },
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Montant (€)',
                      },
                  },
              },
          },
      });
  }
  
  export function remplirTableau(amortissement) {
      let html = `<thead>
      <tr>
         <th>Période</th>
         <th>Capital Amorti</th>
         <th>Interets</th>
         <th>Capital restant du</th>
         <th>Mensualité</th>
      </tr>
     </thead>`;
      amortissement.forEach(({ remboursementMensuel, capitalAmorti, interet, capitalRestantDu }, index) => html += `
            <tr class=${Math.round(capitalAmorti) < Math.round(interet) ? "warning" : ""}>
                <td>${index + 1}</td>
                <td class="">${Math.round(capitalAmorti)}</td>
                <td class="">${Math.round(interet)}</td>
                <td class="">${Math.round(capitalRestantDu)}</td>
                <td class="">${Math.round(remboursementMensuel)}</td>
            </tr>
        `);
      document.getElementById("inputMensualite").innerHTML = html;
  }
  
  export function getValues() {
    const {
      inputMontant,
      inputTaux,
      inputAnnee
    } = window;
  
    let montant = Math.abs(inputMontant.valueAsNumber) || 0;
    let annee = Math.abs(inputAnnee.valueAsNumber) || 0;
    let mois = annee * 12 || 1;
    let taux = Math.abs(inputTaux.valueAsNumber) || 0;
    let tauxMensuel = taux / 100 / 12;
  
    return {
      montant,
      annee,
      mois,
      taux,
      tauxMensuel
    };
  }