# TD 1 — Optimisation convexe (Feuille d'exercices I)

> Léonard Benedetti — 2023. Traduction française + correction.
> 💡 Dans VS Code : `Ctrl+K` puis `V` pour l'aperçu avec formules rendues.

> ⚠️ **Les corrections sont tout en bas du fichier.** Essaie d'abord par toi-même ! Fais défiler seulement quand tu veux vérifier.

---

v
## Exercice 1 — Modélisation

> L'objectif est de **modéliser** chaque problème, c'est-à-dire d'écrire le programme d'optimisation formalisé correspondant. **Il n'est pas demandé de les résoudre.**

**1.** Trouver la longueur de la base $b$ et la hauteur $h$ du triangle d'**aire la plus grande possible** dont le **périmètre est au plus 50 cm**. On admet que le périmètre d'un triangle vaut au moins $b + \sqrt{4h^2 + b^2}$.

> *Note géométrique (justifie la formule admise) : à base et hauteur fixées, le périmètre est minimal quand le triangle est isocèle. Par le théorème de Pythagore, les deux côtés égaux valent alors $\sqrt{h^2 + (b/2)^2}$, d'où un périmètre de $b + 2\sqrt{h^2 + b^2/4} = b + \sqrt{4h^2 + b^2}$.*

**2.** Un fabricant de bonbons produit deux types de bonbons. Les bonbons de type I sont vendus 6 € l'unité, ceux de type II 7 € l'unité. Leur fabrication nécessite les ingrédients suivants :

|        | Chocolat | Sucre | Caramel |
|--------|----------|-------|---------|
| **I**  | 2        | 3     | 1       |
| **II** | 0        | 2     | 4       |

*Unités nécessaires à la fabrication de chaque type de bonbon.*

Les entrepôts contiennent **400 unités de chocolat**, **900 unités de sucre** et **700 unités de caramel**. Déterminer ce qu'il faut produire pour **maximiser le revenu**, en supposant que toute la production sera vendue.

---

## Exercice 2 — Convexité / concavité

Pour chacune des fonctions suivantes, indiquer et **justifier** si elle est convexe, concave, les deux, ou ni l'une ni l'autre.

- $f_1(x) = 7x$, &nbsp; $x \in \mathbb{R}$
- $f_2(x) = \sin(x)$, &nbsp; $x \in \mathbb{R}$
- $f_3(x, y) = 2y - 3x$, &nbsp; $(x, y) \in \mathbb{R}^2$
- $f_4(x) = |x|$, &nbsp; $x \in \mathbb{R}$
- $f_5(x) = x \log\!\left(\dfrac{1}{x}\right)$, &nbsp; $x \in \mathbb{R}_{>0}$
- $f_6(x, y) = \dfrac{x^2}{2} + \dfrac{y^2}{2}$, &nbsp; $(x, y) \in \mathbb{R}^2$

---

## Exercice 3 — Preuves sur les ensembles convexes

**1.** Montrer qu'un demi-espace $\{x \in \mathbb{R}^n : a^\top x \le b\}$ (avec $a \in \mathbb{R}^n \setminus \{0\}$ et $b \in \mathbb{R}$) est un ensemble convexe.

**2.** Montrer que l'intersection d'ensembles convexes est un ensemble convexe.

---

## Exercice 4 — Problème de transport

Essayer de résoudre **empiriquement** le problème de transport présenté aux slides 14 à 18 (section 1.1) de l'introduction.

---
---
---

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

---
---
---

# ✅ CORRECTIONS

*(Tu as bien défilé jusqu'ici volontairement !)*

---

## Correction — Exercice 1

### 1. Le triangle d'aire maximale

On applique les **3 questions de modélisation** :

**Variables d'optimisation :** la base $b$ et la hauteur $h$.

**Fonction objectif :** l'aire d'un triangle est $\dfrac{b \times h}{2}$, à **maximiser**.

**Contraintes (ensemble réalisable) :**
- Le périmètre doit être $\le 50$. Comme le périmètre vaut au moins $b + \sqrt{4h^2 + b^2}$, on impose : $b + \sqrt{4h^2 + b^2} \le 50$.
- Dimensions positives : $b > 0$ et $h > 0$.

**Programme final :**

$$
\begin{aligned}
\max_{(b,h) \in \mathbb{R}^2} \quad & \frac{b \, h}{2} \\
\text{sous contrainte} \quad & b + \sqrt{4h^2 + b^2} \le 50 \\
& b > 0, \quad h > 0
\end{aligned}
$$

> 💡 Le facteur $\tfrac{1}{2}$ ne change pas l'argmax : maximiser $\dfrac{bh}{2}$ ou $bh$ donne la même solution $(b,h)$.

---

### 2. Le fabricant de bonbons

**Variables d'optimisation :**
- $x_1$ = nombre de bonbons de type I produits
- $x_2$ = nombre de bonbons de type II produits

**Fonction objectif :** maximiser le revenu

$$6x_1 + 7x_2$$

**Contraintes (stocks d'ingrédients disponibles) :**

En lisant la table colonne par colonne (combien chaque type consomme de chaque ingrédient) :

- Chocolat : le type I en utilise 2, le type II en utilise 0 → $2x_1 + 0\,x_2 \le 400$
- Sucre : type I → 3, type II → 2 → $3x_1 + 2x_2 \le 900$
- Caramel : type I → 1, type II → 4 → $x_1 + 4x_2 \le 700$

Quantités positives : $x_1 \ge 0$, $x_2 \ge 0$.

**Programme final :**

$$
\begin{aligned}
\max_{(x_1,x_2) \in \mathbb{R}^2} \quad & 6x_1 + 7x_2 \\
\text{sous contrainte} \quad & 2x_1 \le 400 \\
& 3x_1 + 2x_2 \le 900 \\
& x_1 + 4x_2 \le 700 \\
& x_1 \ge 0, \quad x_2 \ge 0
\end{aligned}
$$

> *(C'est un programme linéaire — le sujet ne demande pas de le résoudre, mais on peut noter que la solution optimale est un sommet du polygone des contraintes.)*

---

## Correction — Exercice 2

### Méthode générale et critères

Pour déterminer la convexité, on utilise le **critère de la dérivée seconde** (cas lisse) :

**Cas d'une variable** ($f : \mathbb{R} \to \mathbb{R}$, deux fois dérivable) :

| Condition (vraie *partout* sur le domaine) | Conclusion |
|--------------------------------------------|------------|
| $f''(x) \ge 0$ | $f$ est **convexe** |
| $f''(x) \le 0$ | $f$ est **concave** |
| $f''(x) = 0$ | $f$ est **convexe ET concave** |
| $f''$ **change de signe** | **ni l'une ni l'autre** |

**Cas de plusieurs variables — outil du cours** ($f : \mathbb{R}^n \to \mathbb{R}$) : le critère $f'' \ge 0$ de la slide 29 ne vaut **que pour une seule variable**. En plusieurs variables, le cours d'introduction ne fournit que la **définition par la formule** (slide 27) :

$$\forall \mathbf{x}, \mathbf{y} \in \mathbb{R}^n,\ \forall \lambda \in [0,1] : f\big(\lambda \mathbf{x} + (1-\lambda)\mathbf{y}\big) \le \lambda f(\mathbf{x}) + (1-\lambda) f(\mathbf{y})$$

et le lien concave/convexe (slide 32) : $f$ concave $\iff -f$ convexe. **Ce sont les seuls outils « officiels » pour $f_3$ et $f_6$.**

**Cas de plusieurs variables — outil avancé (hors cours d'intro)** : on peut généraliser $f''$ par la **matrice hessienne** $H$ (matrice de toutes les dérivées secondes), puis regarder le signe de ses **valeurs propres** :

| Valeurs propres de $H$ | Vocabulaire | Conclusion |
|------------------------|-------------|------------|
| toutes $\ge 0$ | $H$ semi-définie **positive** | **convexe** |
| toutes $\le 0$ | $H$ semi-définie **négative** | **concave** |
| toutes $= 0$ | $H$ nulle | **convexe ET concave** |
| des signes mélangés | indéfinie | **ni l'une ni l'autre** |

> ⚠️ La hessienne **n'est pas dans le cours d'introduction** : elle y est présentée plus tard. Pour une copie basée *strictement* sur ce cours, privilégie la **définition par la formule**. La hessienne est donnée ici comme méthode alternative (souvent plus rapide).

> 🔑 **Règle à retenir** : une fonction **affine** (de la forme $ax + b$, ou $a x + b y + c$ en 2D) est **à la fois convexe et concave** — et ce sont les *seules* fonctions dans ce cas. Géométriquement, c'est une droite (ou un plan) : sans aucune courbure, le segment reliant deux points du graphe est *exactement sur* le graphe, ce qui satisfait à la fois « au-dessus ou sur » (convexe) et « en dessous ou sur » (concave).

---

### $f_1(x) = 7x$ &nbsp; sur $\mathbb{R}$

**Nature :** fonction affine ($a = 7$, $b = 0$).

**Calcul des dérivées :**

$$f_1'(x) = 7 \qquad f_1''(x) = 0$$

**Conclusion :** $f_1''(x) = 0$ partout, donc $f_1''(x) \ge 0$ **et** $f_1''(x) \le 0$.

➡️ **Convexe ET concave** (cas affine).

---

### $f_2(x) = \sin(x)$ &nbsp; sur $\mathbb{R}$

**Calcul des dérivées :**

$$f_2'(x) = \cos(x) \qquad f_2''(x) = -\sin(x)$$

**Étude du signe :** $f_2''(x) = -\sin(x)$ **change de signe** :
- sur $]0, \pi[$ : $\sin(x) > 0$ donc $f_2''(x) < 0$ (allure concave),
- sur $]\pi, 2\pi[$ : $\sin(x) < 0$ donc $f_2''(x) > 0$ (allure convexe).

Comme la dérivée seconde n'a pas un signe constant, aucune des deux conditions n'est vérifiée partout.

➡️ **Ni convexe ni concave**.

---

### $f_3(x, y) = 2y - 3x$ &nbsp; sur $\mathbb{R}^2$

**Nature :** fonction affine (ici linéaire) de deux variables, $f_3(x,y) = -3x + 2y$ (de la forme $ax + by + c$ avec $a = -3$, $b = 2$, $c = 0$).

#### ✅ Méthode 1 — par la définition (outil du cours, slide 27)

C'est la voie attendue avec le seul cours d'introduction. On va montrer que l'inégalité de convexité est en fait une **égalité**, ce qui prouvera convexe ET concave d'un coup.

Soient $\mathbf{x} = (x_1, y_1)$, $\mathbf{y} = (x_2, y_2)$ deux points et $\lambda \in [0,1]$. Le point intermédiaire est :

$$\lambda \mathbf{x} + (1-\lambda)\mathbf{y} = \big(\lambda x_1 + (1-\lambda)x_2,\ \ \lambda y_1 + (1-\lambda)y_2\big)$$

On applique $f_3$ à ce point, puis on **développe** (chaque variable apparaît au degré 1, donc tout se sépare) :

$$
\begin{aligned}
f_3\big(\lambda \mathbf{x} + (1-\lambda)\mathbf{y}\big)
&= 2\big(\lambda y_1 + (1-\lambda)y_2\big) - 3\big(\lambda x_1 + (1-\lambda)x_2\big) \\
&= \lambda\,(2y_1 - 3x_1) + (1-\lambda)\,(2y_2 - 3x_2) \\
&= \lambda\, f_3(\mathbf{x}) + (1-\lambda)\, f_3(\mathbf{y})
\end{aligned}
$$

On obtient une **égalité**. Or :
- une égalité vérifie en particulier « $\le$ » → l'inégalité de **convexité** est satisfaite ;
- une égalité vérifie aussi « $\ge$ » → l'inégalité de **concavité** est satisfaite.

➡️ **Convexe ET concave.**

> 💡 Ce calcul illustre une propriété générale : **toute fonction affine transforme l'inégalité de convexité en égalité**, d'où le fait qu'elle soit toujours à la fois convexe et concave.

#### 🔎 Méthode 2 — par la hessienne (alternative, hors cours d'intro)

**Étape 1 — dérivées premières** (ce sont des constantes) :

$$\frac{\partial f_3}{\partial x} = -3 \qquad \frac{\partial f_3}{\partial y} = 2$$

**Étape 2 — dérivées secondes** : dériver une constante donne $0$, donc **toutes** les dérivées secondes sont nulles :

$$\frac{\partial^2 f_3}{\partial x^2} = 0, \qquad \frac{\partial^2 f_3}{\partial y^2} = 0, \qquad \frac{\partial^2 f_3}{\partial x \, \partial y} = 0$$

**Étape 3 — matrice hessienne** :

$$H = \begin{pmatrix} \dfrac{\partial^2 f_3}{\partial x^2} & \dfrac{\partial^2 f_3}{\partial x \partial y} \\[2mm] \dfrac{\partial^2 f_3}{\partial y \partial x} & \dfrac{\partial^2 f_3}{\partial y^2} \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$$

**Étape 4 — conclusion** : la matrice nulle a ses deux valeurs propres égales à $0$. Or $0$ est à la fois $\ge 0$ (hessienne semi-définie positive → convexe) **et** $\le 0$ (semi-définie négative → concave).

➡️ **Convexe ET concave** (cas affine — c'est un plan dans l'espace). Les deux méthodes concordent.

---

### $f_4(x) = |x|$ &nbsp; sur $\mathbb{R}$

**Difficulté :** $f_4$ n'est **pas dérivable en $0$** (le « V » a un coin), donc le critère $f'' \ge 0$ ne s'applique pas directement. On revient à la **définition** de la convexité.

**Preuve par la définition :** pour tous $x, y \in \mathbb{R}$ et $\lambda \in [0,1]$, l'**inégalité triangulaire** (combinée à $|\alpha z| = |\alpha|\,|z|$) donne :

$$f_4\big(\lambda x + (1-\lambda) y\big) = |\lambda x + (1-\lambda) y| \le |\lambda x| + |(1-\lambda) y| = \lambda |x| + (1-\lambda)|y| = \lambda f_4(x) + (1-\lambda) f_4(y)$$

(on a utilisé $\lambda \ge 0$ et $1 - \lambda \ge 0$ pour sortir les valeurs absolues). C'est **exactement** l'inégalité de convexité du cours.

**Concave ?** Non : la courbe en « V » forme un creux vers le haut. Par exemple le segment entre $(-1, 1)$ et $(1, 1)$ passe par $(0, 1)$, qui est *au-dessus* du graphe (qui vaut $0$ en $x=0$) — ce qui contredit la concavité.

➡️ **Convexe** (uniquement).

---

### $f_5(x) = x \log\!\left(\dfrac{1}{x}\right)$ &nbsp; sur $x > 0$

**Étape 1 — simplifier l'expression** : par la propriété $\log(1/x) = -\log(x)$,

$$f_5(x) = x \cdot \big(-\log x\big) = -x \log x$$

**Étape 2 — dérivée première** (règle du produit sur $-x\log x$) :

$$f_5'(x) = -\Big( \underbrace{1 \cdot \log x}_{\text{dériv. de }x \,\times\, \log x} + \underbrace{x \cdot \tfrac{1}{x}}_{x \,\times\, \text{dériv. de }\log x} \Big) = -(\log x + 1) = -\log x - 1$$

**Étape 3 — dérivée seconde** :

$$f_5''(x) = -\frac{1}{x}$$

**Étape 4 — signe** : sur le domaine $x > 0$, on a $\dfrac{1}{x} > 0$, donc $f_5''(x) = -\dfrac{1}{x} < 0$ partout.

➡️ **Concave** (uniquement).

---

### $f_6(x, y) = \dfrac{x^2}{2} + \dfrac{y^2}{2}$ &nbsp; sur $\mathbb{R}^2$

#### ✅ Méthode 1 — par la définition (outil du cours, slide 27)

On veut montrer, pour $\mathbf{x} = (x_1, y_1)$, $\mathbf{y} = (x_2, y_2)$ et $\lambda \in [0,1]$ :

$$f_6\big(\lambda \mathbf{x} + (1-\lambda)\mathbf{y}\big) \le \lambda f_6(\mathbf{x}) + (1-\lambda) f_6(\mathbf{y})$$

Comme $f_6$ sépare les deux variables ($f_6(x,y) = \tfrac{1}{2}x^2 + \tfrac{1}{2}y^2$), il suffit de le prouver pour la fonction d'une variable $g(t) = \tfrac{1}{2}t^2$, puis d'additionner. Pour $g$, l'écart entre les deux membres se calcule :

$$
\lambda g(t_1) + (1-\lambda) g(t_2) - g\big(\lambda t_1 + (1-\lambda) t_2\big)
= \tfrac{1}{2}\,\lambda(1-\lambda)\,(t_1 - t_2)^2 \ \ge\ 0
$$

(c'est un produit de termes positifs : $\lambda \ge 0$, $1-\lambda \ge 0$, et un carré $\ge 0$). L'écart étant positif, l'inégalité « $\le$ » est vérifiée pour $g$, donc pour $f_6$ en sommant sur les deux coordonnées.

➡️ **Convexe.** L'écart n'est pas toujours nul (il est $>0$ dès que $t_1 \ne t_2$ et $0<\lambda<1$), donc $f_6$ **n'est pas** concave.

#### 🔎 Méthode 2 — par la hessienne (alternative, hors cours d'intro)

**Étape 1 — dérivées premières :**

$$\frac{\partial f_6}{\partial x} = x \qquad \frac{\partial f_6}{\partial y} = y$$

**Étape 2 — dérivées secondes :**

$$\frac{\partial^2 f_6}{\partial x^2} = 1, \qquad \frac{\partial^2 f_6}{\partial y^2} = 1, \qquad \frac{\partial^2 f_6}{\partial x \, \partial y} = 0$$

**Étape 3 — matrice hessienne :**

$$H = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$

**Étape 4 — conclusion :** c'est la matrice identité, dont les valeurs propres sont $1$ et $1$, toutes **strictement positives** → hessienne **définie positive**.

➡️ **Convexe** (uniquement). C'est le paraboloïde « en bol » de la slide 8 du cours, dont le minimum global est en $(0,0)$. Les deux méthodes concordent.

---

### 📊 Tableau récapitulatif

| Fonction | Outil utilisé | Résultat | Verdict |
|----------|---------------|----------|---------|
| $f_1 = 7x$ | $f'' = 0$ | nulle | convexe **et** concave (affine) |
| $f_2 = \sin x$ | $f'' = -\sin x$ | change de signe | ni l'une ni l'autre |
| $f_3 = 2y - 3x$ | hessienne $= 0$ | nulle | convexe **et** concave (affine) |
| $f_4 = \lvert x\rvert$ | définition (inég. triangulaire) | — | convexe |
| $f_5 = x\log(1/x)$ | $f'' = -1/x < 0$ | négative | concave |
| $f_6 = \tfrac{x^2}{2}+\tfrac{y^2}{2}$ | hessienne $= I$ | valeurs propres $> 0$ | convexe |

---

## Correction — Exercice 3

### 1. Un demi-espace est convexe

Soit $A = \{x \in \mathbb{R}^n : a^\top x \le b\}$. Prenons deux points $x, y \in A$ et $\lambda \in [0, 1]$. Il faut montrer que le point $z = \lambda x + (1-\lambda)y$ appartient aussi à $A$, c'est-à-dire que $a^\top z \le b$.

Par linéarité du produit scalaire :

$$a^\top z = a^\top\big(\lambda x + (1-\lambda)y\big) = \lambda \, (a^\top x) + (1-\lambda)\,(a^\top y)$$

Comme $x, y \in A$ : $a^\top x \le b$ et $a^\top y \le b$. Et comme $\lambda \ge 0$ et $1-\lambda \ge 0$ :

$$\lambda\,(a^\top x) + (1-\lambda)\,(a^\top y) \le \lambda b + (1-\lambda) b = b$$

Donc $a^\top z \le b$, c'est-à-dire $z \in A$. **L'ensemble est convexe.** $\blacksquare$

### 2. L'intersection d'ensembles convexes est convexe

Soit $(A_i)_{i \in I}$ une famille d'ensembles convexes, et $A = \bigcap_{i \in I} A_i$ leur intersection.

Prenons $x, y \in A$ et $\lambda \in [0,1]$. Posons $z = \lambda x + (1-\lambda)y$.

- Comme $x, y \in A$, on a $x, y \in A_i$ pour **chaque** $i \in I$.
- Chaque $A_i$ étant convexe, $z = \lambda x + (1-\lambda)y \in A_i$ pour **chaque** $i$.
- Donc $z$ appartient à tous les $A_i$, c'est-à-dire $z \in \bigcap_i A_i = A$.

**L'intersection est convexe.** $\blacksquare$

> 💡 Ces deux résultats combinés expliquent pourquoi l'ensemble réalisable d'un programme linéaire (intersection de plusieurs demi-espaces) est toujours convexe.

---

## Correction — Exercice 4 (résolution empirique du problème de transport)

Rappel des données :

| Coût (€/unité) | $F_A$ | $F_B$ |
|----------------|-------|-------|
| $W_1$          | 5     | 26    |
| $W_2$          | 30    | 2     |
| $W_3$          | 31    | 22    |

- Stocks : $W_1 = 1291$, $W_2 = 2422$, $W_3 = 679$ (total **4392**)
- Besoins : $F_A = 2403$, $F_B = 1986$ (total **4389**)

**Idée empirique (heuristique « du moins cher d'abord ») :** on affecte en priorité les trajets les moins coûteux, dans l'ordre croissant des coûts : 2 ($W_2\to F_B$), 5 ($W_1\to F_A$), 22 ($W_3\to F_B$), 26, 30, 31.

1. **$W_2 \to F_B$ à 2 €** (le moins cher) : on envoie le maximum. $F_B$ a besoin de 1986, $W_2$ a 2422 → on envoie **1986**. $F_B$ est satisfait. Reste $W_2 = 2422 - 1986 = 436$.
2. **$W_1 \to F_A$ à 5 €** : $W_1$ a 1291, $F_A$ a besoin de 2403 → on envoie **1291**. $W_1$ vidé. Reste $F_A = 2403 - 1291 = 1112$.
3. Il reste à fournir $F_A$ (1112). Trajets restants vers $F_A$ : $W_2 \to F_A$ à 30, $W_3 \to F_A$ à 31. On préfère le moins cher : **$W_2 \to F_A$ à 30** → $W_2$ a encore 436 → on envoie **436**. Reste $F_A = 1112 - 436 = 676$.
4. Enfin **$W_3 \to F_A$ à 31** → on envoie les **676** restants ($W_3$ en a 679, OK).

**Solution trouvée :**

| Trajet | Quantité | Coût unitaire | Coût |
|--------|----------|---------------|------|
| $W_1 \to F_A$ | 1291 | 5  | 6 455 |
| $W_2 \to F_A$ | 436  | 30 | 13 080 |
| $W_3 \to F_A$ | 676  | 31 | 20 956 |
| $W_2 \to F_B$ | 1986 | 2  | 3 972 |
| **Total** |  |  | **44 463 €** |

> ⚠️ Cette heuristique « glouton » donne une **bonne solution réalisable**, mais pas forcément l'**optimum** garanti. La résolution exacte (méthode du simplexe, cours 2) pourrait faire un peu mieux. L'objectif de cet exercice est justement de sentir la difficulté du problème « à la main » avant de voir les méthodes systématiques.
