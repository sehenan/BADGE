$(document).ready(function () {
    $("#badgeForm").submit(function (event) {
      event.preventDefault(); // Empêche l'envoi du formulaire
  
      // Récupération des valeurs du formulaire
      var photoInput = document.getElementById("photo");
      var name = $("#name").val();
      var lastName = $("#lastName").val();
      var position = $("#position").val();
      var birthdate = $("#birthdate").val();
  
      // Chargement de la photo
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var photoDataUrl = e.target.result;
  
        // Affichage du badge
        $("#badgeImage").attr("src", photoDataUrl);
        $("#badgeName").text(name);
        $("#badgeLastName").text(lastName);
        $("#badgePosition").text(position);
        $("#badgeBirthdate").text(birthdate);
  
        // Affichage du badge et téléchargement du PDF
        $('#badgeForm').hide();
        $("#badgeContainer").show();
        $("#downloadButton").show();
  
        // Téléchargement du PDF lorsque le bouton est cliqué
        $("#downloadButton").click(function () {
          var doc = new jsPDF();
  
          // Styles personnalisés pour le PDF
          var backgroundColor = "#f7f7f7";
          var badgeColor = "#FF9671";
          var textColor = "#333";
          var labelColor = "#555";
  
          // Paramètres pour la position des éléments du badge
          var badgeX = 15;
          var badgeY = 50;
          var photoWidth = 50;
          var photoHeight = 50;
          var textX = badgeX + photoWidth + 20;
          var textY = badgeY + 15;
  
          // Ajout des éléments au PDF avec les styles personnalisés
          doc.setFillColor(backgroundColor);
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
          doc.setFillColor(badgeColor);
          doc.roundedRect(badgeX, badgeY, 200, 80, 5, 5, 'F');
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.setTextColor(textColor);
          doc.text("Prénom: ", textX, textY);
          doc.setTextColor(labelColor);
          doc.text(name, textX + 35, textY);
          doc.setTextColor(textColor);
          doc.text("Nom: ", textX, textY + 20);
          doc.setTextColor(labelColor);
          doc.text(lastName, textX + 30, textY + 20);
          doc.setTextColor(textColor);
          doc.text("Fonction: ", textX, textY + 40);
          doc.setTextColor(labelColor);
          doc.text(position, textX + 40, textY + 40);
          doc.setTextColor(textColor);
          doc.text("Date de naissance: ", textX, textY + 60);
          doc.setTextColor(labelColor);
          doc.text(birthdate, textX + 55, textY + 60);
  
          // Ajout de l'image du badge
          var imgWidth = 50;
          var imgHeight = 50;
          doc.addImage(photoDataUrl, 'PNG', badgeX + 5, badgeY + 5, imgWidth, imgHeight);
  
          // Téléchargement du PDF
          doc.save("badge.pdf");
        });
      };
      fileReader.readAsDataURL(photoInput.files[0]);
    });
  });
  