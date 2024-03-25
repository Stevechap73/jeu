let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let container = document.querySelector(".container");
let startGame = document.querySelector(".startGame");
let novice = document.querySelector(".novice");
let expert = document.querySelector(".expert");
let objectifChasseur = document.querySelector(".objectifChasseur");
objectif = 3;
objectifChasseur.innerText = `Objectif du chasseur : ${objectif}`;
let score = 0;
let demarrageJeu = document.querySelector(".demarrageJeu");
let permierePage = document.querySelector(".permierePage");
let pageJeu = document.querySelector(".pageJeu");

class Insecte {
  constructor(name, positionX, positionY) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.imageInsecte = document.createElement("img");
    this.tapetteSound = new Audio("./assets/sound/Fly_Swatter.wav"); // Ajoutez le chemin vers le fichier audio
    document.addEventListener("click", (event) => this.checkCollision(event));
  }

  init() {
    this.positionX = maxWidth / 2 - 50;
    this.positionY = maxHeight;
    this.display();
    // Déplacer la mouche aléatoirement toutes les 2 secondes
    setInterval(this.randomMouve.bind(this), 2000);
    if (objectif === score) {
      this.finDuJeu();
    }
  }

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
      this.imageInsecte.src = "./assets/image/mouche-bleu.png"; // Revenir à la mouche bleu au bout de 1 secondes
      // Créer une nouvelle instance de Insecte
      let nouvelleMouche = new Insecte(
        "moucheBleu",
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      nouvelleMouche.init();
    }, 300);
  }

  finDuJeu() {
    alert("Félicitation ! Vous avez écrasé toutes les mouches !");
    document.getElementById("ecran-fin-jeu").style.display = "block";
  }
}

demarrageJeu.addEventListener("click", () => {
  permierePage.style.display = "none";
  pageJeu.style.display = "block";
});

let moucheBleu = new Insecte("moucheBleu", 200, 200);
// moucheBleu.display();
startGame.addEventListener("click", () => {
  moucheBleu.init();
});
