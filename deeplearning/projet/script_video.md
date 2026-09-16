# Script vidéo — Classification de plats Food-101 (~5 min)

> Le script suit l'ordre du notebook : chaque bloc correspond à la cellule/section que tu as
> à l'écran. Tu scrolles au fur et à mesure que tu lis. Débit tranquille (~150 mots/min).
> Les titres en gras `▶` indiquent **où tu es dans le notebook**, ne les lis pas.

---

### ▶ Tout en haut — titre + plan du projet

Bonjour, je présente mon projet de deep learning : de la reconnaissance de plats à partir de
photos. L'idée derrière, c'est une application nutritionnelle qui reconnaît un plat sur une
photo pour estimer ses calories.

J'utilise le dataset **Food-101**, qui contient 101 000 images sur 101 classes de plats. Le but
du projet, c'est de **comparer plusieurs architectures**, du modèle le plus simple jusqu'au
transfer learning, et de voir l'effet de la régularisation.

[scroll sur le tableau du plan] Voilà le plan : je couvre toutes les exigences du sujet — un
modèle dense, des CNN, un ResNet, du transfer learning, et de la régularisation partout.

---

### ▶ Section « Imports & configuration » (cellule des imports)

Ici ce sont mes imports. Je tourne avec **Keras 3 sur backend PyTorch**, sans TensorFlow.

[montrer la ligne du print en bas] Et je vérifie que tout est bien chargé : Keras est en
version 3, le backend est torch, et surtout je tourne sur **GPU**, ce qui m'a permis
d'entraîner tous les modèles rapidement.

---

### ▶ Partie 1 — Chargement de Food-101

Je charge le dataset depuis Hugging Face, et je garde seulement **10 classes**. Je les ai
choisies exprès avec des plats **proches visuellement** — spaghetti bolognese et carbonara,
cheesecake et chocolate cake — pour que la tâche soit un vrai défi et que la matrice de
confusion soit intéressante.

---

### ▶ Partie 2 — Dimension et nombre de classes

Là je fais les deux transformations demandées par le sujet : je passe de 101 à **10 classes**,
ré-indexées de 0 à 9, et je redimensionne toutes les images en **128 par 128**. Je prends 150
images par classe en entraînement et 50 en test.

---

### ▶ Partie 3 — Exploration des données (les graphes)

[montrer la grille d'images] Voici un échantillon des images après preprocessing.

[montrer l'histogramme] Et ici la répartition des classes : c'est bien équilibré, 150 images
chacune, donc pas de biais de déséquilibre à gérer.

---

### ▶ Section « Outils communs » (augmentation, callbacks)

Avant les modèles, je définis mes outils communs : la **data augmentation** — flips, rotations,
zooms — l'**elastic net** qui combine régularisation L1 et L2, et mes **callbacks**.

[pointer le commentaire des callbacks] Petit point important ici : mon early stopping surveille
la **val_accuracy** et pas la val_loss. J'expliquerai pourquoi un peu plus loin, mais c'est ce
qui a fait toute la différence sur mes résultats.

---

### ▶ Partie 4 — Modèle 1 : le MLP (baseline)

Premier modèle, un **réseau dense**. Il aplatit l'image, donc il perd toute la structure
spatiale. C'est ma référence : je m'attends à ce qu'il soit le plus faible, autour de 25 %.

---

### ▶ Partie 5 — Modèle 2 : les deux CNN

Ensuite je compare deux **CNN**. Le **CNN A** est basique, sans régularisation : il apprend
bien mais il sur-apprend, on le verra sur les courbes, le train monte à 90 % et la validation
plafonne.

[scroll sur le CNN B] Le **CNN B** ajoute la data augmentation, la BatchNorm, le dropout et
l'elastic net. L'objectif, c'est de montrer que la régularisation aide à mieux généraliser — et
effectivement il dépasse le CNN A.

---

### ▶ Partie 6 — Modèle 3 : le ResNet from scratch

Le troisième, c'est un **mini-ResNet que j'ai construit à la main**, avec de vrais blocs
résiduels : les skip connections, où la sortie vaut F de x plus x. C'est ce qui permet
d'entraîner un réseau profond sans que le gradient s'évanouisse. C'est mon meilleur modèle
construit de zéro.

---

### ▶ Partie 7 — Modèle 4 : le transfer learning (ViT)

Et le dernier, du **transfer learning** avec un **Vision Transformer** pré-entraîné sur
ImageNet. Je le gèle et je m'en sers comme extracteur de features : chaque image devient un
vecteur de 768 caractéristiques, et j'entraîne juste une petite tête de classification
par-dessus. C'est rapide et de loin le plus performant.

---

### ▶ Partie 8 — Comparaison et matrice de confusion

[montrer le graphe de comparaison] Voici le bilan. Du plus faible au meilleur : MLP à 25 %,
CNN basique à 34 %, CNN régularisé à 47 %, ResNet à 53 %, et le ViT à 97 %.

L'ordre est exactement celui attendu : les convolutions battent le dense, la régularisation
améliore la généralisation, et le transfer learning écrase tout.

[montrer la matrice de confusion] Sur la matrice du ViT, les rares erreurs sont sur les classes
proches que j'avais choisies exprès : carbonara confondu avec bolognese, cheesecake avec
chocolate cake. Ça confirme que ce sont bien les pièges visuels qui restent durs.

---

### ▶ Partie 9 — Conclusion

[montrer la note méthodologique] Un point que je veux souligner : au début, mon CNN régularisé
et mon ResNet sortaient au hasard, à 10 %, sous le CNN basique. Ça n'avait aucun sens. Le
problème n'était pas les modèles mais l'entraînement : avec la BatchNorm, la val_loss remonte
dès le départ, donc mon early stopping sur la loss me ramenait à un modèle pas entraîné. En
surveillant la val_accuracy, tout est rentré dans l'ordre.

Donc ce que je retiens, c'est qu'un mauvais résultat ne veut pas forcément dire un mauvais
modèle — ça peut être la configuration d'entraînement. Comme amélioration, je pourrais prendre
plus d'images par classe ou faire un fine-tuning complet du ViT. Merci de votre attention.
