# Optimisation convexe — 1. Introduction

> *Optimisation ? Convexité ?*
> Cours de Léonard Benedetti — traduction et mise en forme française.

> 💡 **Astuce** : dans VS Code, ouvre l'aperçu Markdown avec `Ctrl+K V` pour voir les formules mathématiques rendues correctement.

---
## 1.1 — Optimisation

### Définition

D'après Wikipédia :

> *« la sélection d'un meilleur élément (au regard d'un certain critère) parmi un ensemble d'alternatives disponibles ».*

**Exemples :**

- Trouver l'itinéraire le plus rapide d'une station de métro à une autre.
- Déterminer l'investissement optimal parmi plusieurs actions pour maximiser le gain potentiel tout en limitant les risques.
- Choisir quels produits acheter pour répondre au mieux à un besoin (durée de vie, rapport qualité/prix) tout en respectant des contraintes (budget).

---

### Définition : une version plus pratique

Pour ce qui nous concerne : **maximiser ou minimiser une fonction réelle $f$ sur un ensemble $A$.**

$$f : A \to \mathbb{R}$$

$$\min_{\mathbf{x} \in A} f(\mathbf{x}) \qquad\qquad \max_{\mathbf{x} \in A} f(\mathbf{x})$$

*(Illustration : une courbe en forme de vallée dont le point le plus bas — le minimum — est marqué en rouge.)*

---

### Applications

- **Économie et finance** — maximiser le profit, minimiser la perte
- **Ingénierie** — maximiser l'efficacité, minimiser l'erreur
- **Recherche opérationnelle** — maximiser la performance, minimiser le risque
- **Apprentissage automatique** (*machine learning*) — minimiser l'écart entre un modèle (explicatif ou prédictif) et la réalité (les données de référence, *ground truth*)
- **Et ainsi de suite…**

---

### Notation (vocabulaire)

$$\min_{\mathbf{x} \in A} f(\mathbf{x}) \qquad\qquad \max_{\mathbf{x} \in A} f(\mathbf{x})$$

- La fonction $f : A \to \mathbb{R}$ est appelée la **fonction objectif** (*fonction de coût* s'il s'agit d'une minimisation).
- L'ensemble $A$ est appelé l'**ensemble réalisable** (*feasible set*). C'est typiquement un sous-ensemble de l'espace vectoriel $\mathbb{R}^n$.
- Un élément $\mathbf{x} \in A$ est appelé une **solution réalisable**.
- Une solution réalisable qui minimise ou maximise (selon l'objectif poursuivi) la fonction objectif est appelée une **solution optimale**, et notée $\mathbf{x}^\star$.

---

### Exemple : minimisation

$$f(\mathbf{x}) = f(x, y) = \frac{x^2}{2} + \frac{y^2}{2}$$

$$A = \mathbb{R}^2$$

$$\mathbf{x}^\star = (x^\star, y^\star) = (0, 0)$$

$$f(\mathbf{x}^\star) = 0$$

*(Illustration : un paraboloïde 3D en forme de bol, dont le fond — le minimum global — est en $(0,0)$.)*

---

### Notation (forme générale d'un problème)

- Habituellement, l'ensemble réalisable est décrit comme l'espace vectoriel $\mathbb{R}^n$ assorti de **contraintes d'inégalité**.
- On peut alors écrire un problème d'optimisation sous la forme :

$$
\begin{aligned}
\min_{\mathbf{x} \in \mathbb{R}^n} \quad & f(\mathbf{x}) \\
\text{sous contrainte} \quad & c_i(\mathbf{x}) \le b_i, \quad i = 1, \dots, m
\end{aligned}
$$

où $\mathbf{x} = (x_1, \dots, x_n)$ est le vecteur des **variables d'optimisation**, les fonctions $c_1, \dots, c_m : \mathbb{R}^n \to \mathbb{R}$ sont les **fonctions de contraintes**, et les constantes $b_1, \dots, b_m$ sont les **bornes**.

---

### Modélisation

Un aspect important de l'optimisation consiste à **traduire des problèmes de la vie réelle en problèmes formalisés.**

- **Quelles sont les quantités dont on cherche à obtenir les valeurs ?**
  → Quelles sont les *variables d'optimisation* ?
- **Quelle est la valeur que l'on veut optimiser (minimiser ou maximiser) ?**
  → Quelle est la *fonction objectif* ?
- **Quelles sont les contraintes sur les quantités recherchées ?**
  → Quel est l'*ensemble réalisable* ?

---

### Exemple de modélisation : le rectangle optimal

On cherche à construire un rectangle d'**aire la plus grande possible** et dont le **périmètre est au plus égal à 42 cm.**

*(Schéma : un rectangle de largeur $w$ et de longueur $l$.)*

**Application des 3 questions :**

- **Quelles quantités cherche-t-on ?** → $w$ et $l$ : les *variables d'optimisation*
- **Quelle valeur optimiser ?** → Maximiser l'aire $w \times l$ : la *fonction objectif*
- **Quelles contraintes ?** → Le périmètre $2w + 2l$ doit être inférieur ou égal à 42, et les deux variables doivent être positives : l'*ensemble réalisable*

**Problème final :**

$$
\begin{aligned}
\max_{(w,l) \in \mathbb{R}^2} \quad & w \times l \\
\text{sous contrainte} \quad & 2w + 2l \le 42 \\
& w > 0, \quad l > 0
\end{aligned}
$$

---

### Exemple de modélisation : le problème de transport

Un constructeur aéronautique veut **optimiser (minimiser le coût)** le déplacement d'unités d'aluminium depuis ses **3 entrepôts** vers ses **2 sites de fabrication de fuselage**.

- Sites de fabrication de fuselage : $F_A$, $F_B$
- Entrepôts : $W_1$, $W_2$, $W_3$

**Coût de déplacement d'une unité d'Al** (entrepôt → site) :

|       | $F_A$ | $F_B$ |
|-------|-------|-------|
| $W_1$ | 5     | 26    |
| $W_2$ | 30    | 2     |
| $W_3$ | 31    | 22    |

**Unités d'Al disponibles dans les entrepôts :**

| Entrepôt | Stock |
|----------|-------|
| $W_1$    | 1291  |
| $W_2$    | 2422  |
| $W_3$    | 679   |

**Unités d'Al nécessaires pour faire fonctionner un site :**

| Site  | Besoin |
|-------|--------|
| $F_A$ | 2403   |
| $F_B$ | 1986   |

#### Étape 1 — Les variables

**Quelles quantités cherche-t-on ?**
La quantité d'unités d'aluminium à déplacer d'un entrepôt donné vers un site donné. Il y a **6 possibilités** :

$$
\begin{array}{ll}
W_1 \to F_A \ (x_{1,A}) & \qquad W_1 \to F_B \ (x_{1,B}) \\
W_2 \to F_A \ (x_{2,A}) & \qquad W_2 \to F_B \ (x_{2,B}) \\
W_3 \to F_A \ (x_{3,A}) & \qquad W_3 \to F_B \ (x_{3,B})
\end{array}
$$

On a donc **6 variables d'optimisation** :

$$x_{1,A},\quad x_{2,A},\quad x_{3,A},\quad x_{1,B},\quad x_{2,B},\quad x_{3,B}$$

#### Étape 2 — La fonction objectif

**Quelle valeur optimiser ?** Minimiser le coût de transport $c$ :

$$c = 5x_{1,A} + 26x_{1,B} + 30x_{2,A} + 2x_{2,B} + 31x_{3,A} + 22x_{3,B}$$

#### Étape 3 — Les contraintes

*Contraintes d'offre* (on ne peut pas expédier plus que le stock de chaque entrepôt) :

$$
\begin{aligned}
x_{1,A} + x_{1,B} &\le 1291 \\
x_{2,A} + x_{2,B} &\le 2422 \\
x_{3,A} + x_{3,B} &\le 679
\end{aligned}
$$

*Contraintes de demande* (chaque site doit recevoir au moins son besoin) :

$$
\begin{aligned}
x_{1,A} + x_{2,A} + x_{3,A} &\ge 2403 \\
x_{1,B} + x_{2,B} + x_{3,B} &\ge 1986
\end{aligned}
$$

De plus, **toutes les quantités doivent être positives.**

#### Problème final

$$
\begin{aligned}
\min_{(x_{1,A}, \dots, x_{3,B}) \in \mathbb{R}^6} \quad & 5x_{1,A} + 26x_{1,B} + 30x_{2,A} + 2x_{2,B} + 31x_{3,A} + 22x_{3,B} \\
\text{sous contrainte} \quad & x_{1,A} + x_{1,B} \le 1291 \\
& x_{2,A} + x_{2,B} \le 2422 \\
& x_{3,A} + x_{3,B} \le 679 \\
& x_{1,A} + x_{2,A} + x_{3,A} \ge 2403 \\
& x_{1,B} + x_{2,B} + x_{3,B} \ge 1986 \\
& x_{i,j} \ge 0, \quad \forall i \in \{1,2,3\}, \ \forall j \in \{A, B\}
\end{aligned}
$$

---

## 1.2 — Convexité

### Les différents types de problèmes d'optimisation

Les différents problèmes d'optimisation peuvent être regroupés selon la **forme de leur fonction objectif** et de leur **ensemble réalisable**.

On peut les classer dans un tableau croisé :

|                                 | **Fonction objectif non convexe** | **Fonction objectif convexe**                       |
|---------------------------------|-----------------------------------|-----------------------------------------------------|
| **Objectif non différentiable** | cas généraux difficiles           | cas convexe non lisse                               |
| **Objectif différentiable**     | (dont le cas *pseudoconvexe*)     | cas convexe, dont **quadratique** et **linéaire**   |

*(Source : Wikimedia — Cdang, CC BY-SA 4.0)*

---

### La convexité, intuitivement

- Les problèmes d'optimisation convexe constituent, en un sens, la **classe la plus large** de problèmes que l'on peut résoudre de manière assez **efficace**.
- **Aucun risque de tomber dans un « creux » sous-optimal** (« facile à optimiser »).

---

### Problème d'optimisation convexe

$$\min_{\mathbf{x} \in A} f(\mathbf{x})$$

Un **problème d'optimisation convexe** est un problème d'optimisation dans lequel :

- La fonction objectif $f$ est une **fonction convexe**.
- L'ensemble réalisable $A$ est un **ensemble convexe**.

---

### Ensemble convexe

- Intuitivement, un ensemble est convexe s'il est fermé et **ne contient ni creux ni bosses**.
- Plus formellement : pour **toute paire de points** de l'ensemble, **tout point du segment de droite** qui relie cette paire de points appartient aussi à l'ensemble.

*(Illustration : à gauche un ensemble convexe — le segment reste à l'intérieur ; à droite un ensemble non convexe — le segment sort de l'ensemble.)*

**Définition formelle :**
Un ensemble $A \subseteq \mathbb{R}^n$ est convexe si et seulement si, pour toute paire de points de l'ensemble, tout point du segment qui les relie appartient aussi à l'ensemble :

$$\forall x, y \in A,\ \forall \lambda \in [0, 1] : \lambda x + (1 - \lambda) y \in A$$

---

### Quelques propriétés sur les ensembles convexes…

- Un **demi-espace** est un ensemble convexe.
- L'**intersection** d'ensembles convexes est un ensemble convexe.

---

### Fonction convexe (interprétation géométrique)

Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ est convexe si et seulement si, pour toute paire de points du graphe de la fonction, le segment de droite qui relie cette paire de points est **entièrement situé au-dessus ou sur** le graphe.

*(Illustrations : la courbe en vallée en 2D et le paraboloïde en bol en 3D.)*

---

### Fonction convexe (formule)

Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ est convexe si et seulement si :

$$\forall \mathbf{x}, \mathbf{y} \in \mathbb{R}^n,\ \forall \lambda \in [0, 1] : f\big(\lambda \mathbf{x} + (1 - \lambda) \mathbf{y}\big) \le \lambda f(\mathbf{x}) + (1 - \lambda) f(\mathbf{y})$$

> *En clair : l'image du point milieu (pondéré) est inférieure ou égale à la moyenne pondérée des images. La courbe « passe sous la corde ».*

---

### Fonction convexe (épigraphe)

Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ est convexe si et seulement si l'ensemble des points situés **sur ou au-dessus** de son graphe (appelé l'**épigraphe**) est un ensemble convexe.

*(Illustration : la zone colorée au-dessus de la courbe entre $x_1$ et $x_2$ représente l'épigraphe $\operatorname{epi} f(x)$.)*

---

### Fonction convexe (critère différentiel)

Une fonction **deux fois dérivable** d'**une seule variable** $f : \mathbb{R} \to \mathbb{R}$ est convexe si et seulement si :

$$\forall x \in \mathbb{R} : f''(x) \ge 0$$

> *La dérivée seconde positive traduit le fait que la courbe « tourne vers le haut ».*

---

### Fonction convexe (convexité au point milieu)

Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ est **convexe au point milieu** (*midpoint convex*) si et seulement si :

$$\forall \mathbf{x}, \mathbf{y} \in \mathbb{R}^n : f\!\left(\frac{\mathbf{x} + \mathbf{y}}{2}\right) \le \frac{f(\mathbf{x})}{2} + \frac{f(\mathbf{y})}{2}$$

**Théorème :** *une fonction continue et convexe au point milieu est convexe.*

> *C'est le cas particulier de la formule générale avec $\lambda = \tfrac{1}{2}$ ; le théorème dit que, sous l'hypothèse de continuité, ce seul cas suffit à garantir la convexité complète.*

---

### La propriété en or des fonctions convexes

> **Un minimum local d'une fonction convexe est aussi un minimum global.**

> *C'est LA raison pour laquelle l'optimisation convexe est si recherchée : trouver un minimum local suffit, on est certain qu'il s'agit du meilleur résultat possible.*

---

### Fonctions concaves

- La **concavité** est l'opposé de la convexité.
- Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ est **concave** si et seulement si $-f$ est convexe.
- **Maximiser une fonction concave équivaut à minimiser une fonction convexe.**

> *Conséquence pratique : toute la théorie développée pour la minimisation convexe s'applique directement à la maximisation concave, en changeant simplement le signe.*
