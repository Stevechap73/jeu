// Variable et récupération des élements HTML
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let container = document.querySelector(".container");
let startGame = document.querySelector(".startGame");
let novice = document.querySelector(".novice");
let expert = document.querySelector(".expert");
let objectifChasseur = document.querySelector(".objectifChasseur");
objectif = 10;
objectifChasseur.innerText = `Objectif du chasseur : ${objectif}`;
let score = 0;
let demarrageJeu = document.querySelector(".demarrageJeu");
let permierePage = document.querySelector(".permierePage");
let pageJeu = document.querySelector(".pageJeu");
let retour = document.querySelector(".retour");

// Céation de la classe insecte
class Insecte {
  constructor(name, positionX, positionY) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.imageInsecte = document.createElement("img");
    this.flySound = new Audio("./assets/sound/Fly-Flying-Birds.wav"); // fichier audio
    this.tapetteSound = new Audio("./assets/sound/Fly_Swatter.wav"); // fichier audio
    document.addEventListener("click", (event) => this.checkCollision(event));
  }
  // Méthode d'initialisation des modes de jeux Novice, Mediem et Expert
  init() {
    this.flySound.play();
    this.positionX = maxWidth / 2 - 50;
    this.positionY = maxHeight;
    this.display();
    // Déplacer la mouche aléatoirement toutes les 3 secondes
    setInterval(this.randomMouveNovice.bind(this), 3000);
    if (objectif === score) {
      this.finDuJeu();
    }
  }
  initNovice() {
    this.flySound.play();
    this.positionX = maxWidth / 2 - 50;
    this.positionY = maxHeight;
    this.displayNocivce();
    // Déplacer la mouche aléatoirement toutes les 1,5 secondes
    setInterval(this.randomMouve.bind(this), 1500);
    if (objectif === score) {
      this.finDuJeu();
    }
  }
  initExpert() {
    this.flySound.play();
    this.positionX = maxWidth / 2 - 50;
    this.positionY = maxHeight;
    this.displayExpert();
    // Déplacer la mouche aléatoirement toutes les 0,5 secondes
    setInterval(this.randomMouveExpert.bind(this), 500);
    if (objectif === score) {
      this.finDuJeu();
    }
  }
  // Methode affichage des mouches
  display() {
    this.imageInsecte.src = "./assets/image/mouche-bleu.png";
    this.imageInsecte.style.position = "absolute";
    this.imageInsecte.style.left = this.positionX + "px";
    this.imageInsecte.style.bottom = this.positionY + "px";
    this.imageInsecte.style.width = "100px";
    this.imageInsecte.classList.add("fly");
    container.appendChild(this.imageInsecte);
    this.imageInsecte.addEventListener("click", () => this.ecrasserMouche());
  }
  displayNocivce() {
    this.imageInsecte.src = "./assets/image/mouche-bleu.png";
    this.imageInsecte.style.position = "absolute";
    this.imageInsecte.style.left = this.positionX + "px";
    this.imageInsecte.style.bottom = this.positionY + "px";
    this.imageInsecte.style.width = "100px";
    this.imageInsecte.classList.add("fly");
    container.appendChild(this.imageInsecte);
    this.imageInsecte.addEventListener("click", () =>
      this.ecrasserMoucheNovice()
    );
  }
  displayExpert() {
    this.imageInsecte.src = "./assets/image/mouche-bleu.png";
    this.imageInsecte.style.position = "absolute";
    this.imageInsecte.style.left = this.positionX + "px";
    this.imageInsecte.style.bottom = this.positionY + "px";
    this.imageInsecte.style.width = "100px";
    this.imageInsecte.classList.add("fly");
    container.appendChild(this.imageInsecte);
    this.imageInsecte.addEventListener("click", () =>
      this.ecrasserMoucheExpert()
    );
  }
  // Méthode de déplacementaléatoires des mouches
  randomMouve() {
    // Générer des déplacements aléatoires de la mouche
    let maxX = window.innerWidth - this.imageInsecte.offsetWidth;
    let maxY = window.innerHeight - this.imageInsecte.offsetHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    // Déplacer la mouche
    this.imageInsecte.style.left = randomX + "px";
    this.imageInsecte.style.top = randomY + "px";
  }
  randomMouveNovice() {
    // Générer des déplacements aléatoires de la mouche
    let maxX = window.innerWidth - this.imageInsecte.offsetWidth;
    let maxY = window.innerHeight - this.imageInsecte.offsetHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    // Déplacer la mouche
    this.imageInsecte.style.left = randomX + "px";
    this.imageInsecte.style.top = randomY + "px";
  }
  randomMouveExpert() {
    // Générer des déplacements aléatoires de la mouche
    let maxX = window.innerWidth - this.imageInsecte.offsetWidth;
    let maxY = window.innerHeight - this.imageInsecte.offsetHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    // Déplacer la mouche
    this.imageInsecte.style.left = randomX + "px";
    this.imageInsecte.style.top = randomY + "px";
  }
  // Méthode pour vérifier la colision de la mouche et souris
  checkCollision(event) {
    // Vérifiez la collision entre le clic et la position de la mouche
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let moucheRect = this.mouche.getBoundingClientRect();

    if (
      mouseX >= moucheRect.left &&
      mouseX <= moucheRect.right &&
      mouseY >= moucheRect.top &&
      mouseY <= moucheRect.bottom
    ) {
      this.ecrasserMouche();
    }
  }
  // Méthode pour changement d'image de mouche lors de son écrasement
  ecrasserMouche() {
    // Jouer le son de tapette à mouche
    this.tapetteSound.play();
    // Vérifiez si this.image est définie avant d'accéder à ses propriétés
    this.imageInsecte.src = "./assets/image/mouche-ecrassee.png"; // Changer l'image de la mouche écrassée
    this.imageInsecte.style.width = "100px"; // Réduire la taille de la mouche
    // score
    score++;
    document.querySelector(
      ".score"
    ).innerText = `Nombre de mouches touchées : ${score}`;
    // Attendre 1 seconde avant de réinitialiser la couleur
    setTimeout(() => {
      // this.imageInsecte.src = "./assets/image/mouche-bleu.png"; // Revenir à la mouche bleu au bout de 1 secondes
      // Créer une nouvelle instance de Insecte
      let nouvelleMouche = new Insecte(
        "moucheBleu",
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      nouvelleMouche.init();
    }, 300);
  }
  ecrasserMoucheNovice() {
    // Jouer le son de tapette à mouche
    this.tapetteSound.play();
    // Vérifiez si this.image est définie avant d'accéder à ses propriétés
    this.imageInsecte.src = "./assets/image/mouche-ecrassee.png"; // Changer l'image de la mouche écrassée
    this.imageInsecte.style.width = "100px"; // Réduire la taille de la mouche
    // score
    score++;
    document.querySelector(
      ".score"
    ).innerText = `Nombre de mouches touchées : ${score}`;
    // Attendre 1 seconde avant de réinitialiser la couleur
    setTimeout(() => {
      // this.imageInsecte.src = "./assets/image/mouche-bleu.png"; // Revenir à la mouche bleu au bout de 1 secondes
      // Créer une nouvelle instance de Insecte
      let nouvelleMouche = new Insecte(
        "moucheBleu",
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      nouvelleMouche.initNovice();
    }, 300);
  }
  ecrasserMoucheExpert() {
    // Jouer le son de tapette à mouche
    this.tapetteSound.play();
    // Vérifiez si this.image est définie avant d'accéder à ses propriétés
    this.imageInsecte.src = "./assets/image/mouche-ecrassee.png"; // Changer l'image de la mouche écrassée
    this.imageInsecte.style.width = "100px"; // Réduire la taille de la mouche
    // score
    score++;
    document.querySelector(
      ".score"
    ).innerText = `Nombre de mouches touchées : ${score}`;
    // Attendre 1 seconde avant de réinitialiser la couleur
    setTimeout(() => {
      // this.imageInsecte.src = "./assets/image/mouche-bleu.png"; // Revenir à la mouche bleu au bout de 1 secondes
      // Créer une nouvelle instance de Insecte
      let nouvelleMouche = new Insecte(
        "moucheBleu",
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      nouvelleMouche.initExpert();
    }, 300);
  }
  effacerToutesLesMouches() {
    let mouches = document.querySelectorAll(".fly");
    mouches.forEach((mouche) => mouche.remove());
  }
  effacerLeScore() {
    score = 0;
    document.querySelector(
      ".score"
    ).innerText = `Nombre de mouches touchées : ${score}`;
  }

  finDuJeu() {
    alert(
      "Félicitation ! Vous avez écrasé toutes les mouches, vous pouvez aller à la pêche :) !"
    );
    alert(
      "Vous ètes trop fort ! vous pouvez continuer dans le mode Médium ou Expert"
    );
    this.effacerToutesLesMouches();
    this.effacerLeScore();
  }
}

demarrageJeu.addEventListener("click", () => {
  permierePage.style.display = "none";
  pageJeu.style.display = "block";
});
// Création d'une mouche
let moucheBleu = new Insecte("moucheBleu", 200, 200);

// Bouton de démarrage des jeux en mode novice, expert, et medium
startGame.addEventListener("click", () => {
  moucheBleu.initNovice();
});

novice.addEventListener("click", () => {
  moucheBleu.init();
});
expert.addEventListener("click", () => {
  moucheBleu.initExpert();
});

// bouton retour à la page d'accueil
retour.addEventListener("click", () => {
  permierePage.style.display = "block";
  pageJeu.style.display = "none";
});
