# Optimisation convexe — 2. Programmation linéaire

> *Un cas particulier de l'optimisation convexe.*
> Cours de Léonard Benedetti — traduction et mise en forme française.

> 💡 **Astuce** : dans VS Code, ouvre l'aperçu Markdown avec `Ctrl+K` puis `V` pour voir les formules rendues correctement.

---

## 2.1 — Vue d'ensemble

### Définition

Un **programme linéaire** (PL) est un **cas particulier de problème d'optimisation convexe** dans lequel :

- la **fonction objectif** est linéaire ;
- les **fonctions de contraintes** sont linéaires.

On peut donc écrire un programme linéaire sous la forme :

$$
\begin{aligned}
\min_{\mathbf{x} \in \mathbb{R}^n} \quad & f(\mathbf{x}) \\
\text{sous contrainte} \quad & c_i(\mathbf{x}) \le b_i, \quad i = 1, \dots, m
\end{aligned}
$$

où $f$ et $c_1, \dots, c_m$ sont des fonctions **linéaires**.

---

### À propos de la linéarité

- Le **graphe d'une fonction linéaire** de dimension $k$ est un **hyperplan** de dimension $k$.
- L'ensemble des solutions d'une **inégalité linéaire** $c(\mathbf{x}) \le b$ est donc un **demi-espace**.
- L'opposé d'une fonction linéaire est aussi une fonction linéaire.
- **Conséquence : une fonction linéaire est à la fois convexe et concave.**

> 🔗 C'est exactement ce qu'on a démontré au TD 1 pour $f_3 = 2y - 3x$.

---

### Forme canonique

Les programmes linéaires peuvent s'écrire sous la forme suivante, dite **forme canonique** :

$$
\begin{aligned}
\max_{\mathbf{x} \in \mathbb{R}^n} \quad & \mathbf{c}^\top \mathbf{x} \\
\text{sous contrainte} \quad & A\mathbf{x} \le \mathbf{b} \\
& \mathbf{x} \ge \mathbf{0}
\end{aligned}
$$

où :
- $\mathbf{c} \in \mathbb{R}^n$ et $\mathbf{b} \in \mathbb{R}^m$ sont des **vecteurs de coefficients connus** ;
- $A \in \mathbb{R}^{m \times n}$ est une **matrice de coefficients connus**.

> 📌 $\mathbf{c}^\top \mathbf{x}$ est le **produit scalaire** $c_1 x_1 + c_2 x_2 + \dots + c_n x_n$ : c'est la fonction objectif linéaire écrite de façon compacte.

---

### Un exemple

Une entreprise cherche à répartir des **semaines d'ingénierie** investies dans deux projets A et B pour **maximiser son profit**.

- Le **projet A** nécessite, par semaine d'ingénierie : 2 semaines de **conception**, 2 semaines de **fabrication**, 3 semaines de **contrôle qualité**.
- Le **projet B** nécessite, par semaine d'ingénierie : 1 semaine de **conception**, 3 semaines de **fabrication**, 1 semaine de **contrôle qualité**.
- Disponibilités des services : **conception** 7 semaines, **fabrication** 11 semaines, **contrôle qualité** 10 semaines.
- Profit par semaine d'ingénierie : **6 k€** pour A, **3 k€** pour B.

### L'exemple : modélisation

$$
\begin{aligned}
\max_{(x_1,x_2) \in \mathbb{R}^2} \quad & 6x_1 + 3x_2 \\
\text{sous contrainte} \quad & 2x_1 + x_2 \le 7 \quad \text{(conception)}\\
& 2x_1 + 3x_2 \le 11 \quad \text{(fabrication)}\\
& 3x_1 + x_2 \le 10 \quad \text{(contrôle qualité)}\\
& x_1 \ge 0, \quad x_2 \ge 0
\end{aligned}
$$

où $x_1$ = nombre de semaines investies dans A, $x_2$ = nombre de semaines investies dans B.

### L'exemple : forme canonique

Le même problème, écrit avec les matrices/vecteurs :

$$
\mathbf{c} = \begin{pmatrix} 6 \\ 3 \end{pmatrix}
\qquad
A = \begin{pmatrix} 2 & 1 \\ 2 & 3 \\ 3 & 1 \end{pmatrix}
\qquad
\mathbf{b} = \begin{pmatrix} 7 \\ 11 \\ 10 \end{pmatrix}
$$

---

## 2.2 — Interprétation géométrique

### L'ensemble réalisable d'un programme linéaire

- L'ensemble réalisable est défini par plusieurs inégalités linéaires : c'est une **intersection de demi-espaces**. Cet ensemble est **convexe** (résultat du TD 1).
- Cet ensemble décrit un **polytope convexe** dans lequel on cherche la solution optimale.
  - en dimension 2 : un **polygone** (2-polytope) ;
  - en dimension 3 : un **polyèdre** (3-polytope).

### Ensemble réalisable de notre exemple

En traçant les trois droites $2x_1 + x_2 = 7$, $2x_1 + 3x_2 = 11$, $3x_1 + x_2 = 10$ (plus $x_1, x_2 \ge 0$), la **région réalisable** est le polygone situé sous toutes ces droites, dans le quart de plan positif.

### Remarques pour la résolution

- Si la fonction objectif admet un maximum sur la région réalisable, alors elle atteint cette valeur optimale sur **(au moins) un des sommets** du polytope convexe.
- La fonction objectif, comme l'ensemble réalisable, est convexe. Donc : **un maximum local est un maximum global.**

> 💡 Idée de méthode : puisque l'optimum est sur un sommet, il suffit d'explorer les sommets intelligemment → c'est l'idée de l'**algorithme du simplexe**.

### Résolution graphique de notre exemple

On fait « glisser » la droite d'iso-profit $6x_1 + 3x_2 = \text{constante}$ vers les valeurs croissantes. Les valeurs prises sur différents sommets :

| Point testé $\mathbf{x}$ | $f(\mathbf{x}) = 6x_1 + 3x_2$ |
|--------------------------|-------------------------------|
| $(0, 0)$ | 0 |
| $\left(\tfrac{10}{3}, 0\right)$ | 20 |
| $(3, 1)$ | **21** ✅ |
| $\left(\tfrac{5}{2}, 2\right)$ | 21 |
| $\left(0, \tfrac{11}{3}\right)$ | 11 |

> ℹ️ Ici, l'optimum vaut **21** et est atteint sur **tout un segment** (entre $(3,1)$ et $(\tfrac52, 2)$) : l'ensemble des solutions optimales peut être un segment, pas forcément un point unique.

---

## 2.3 — Algorithme du simplexe

### Description intuitive

- La méthode de résolution graphique peut être formalisée en une méthode analytique : l'**algorithme du simplexe**.
- On part d'une **solution de base réalisable**.
- On se déplace vers un **sommet du polytope** de la région réalisable, dans la **direction la plus prometteuse**.
- On répète jusqu'à atteindre un **maximum local** (un sommet où aucune direction n'améliore l'objectif). La convexité garantit que ce maximum est aussi **global** → la solution trouvée est **optimale**.

---

### Forme standard

Pour appliquer le simplexe, on écrit le PL sous la **forme standard** :

$$
\begin{aligned}
\max_{\mathbf{x} \in \mathbb{R}^{n+m}} \quad & \mathbf{c}^\top \mathbf{x} \\
\text{sous contrainte} \quad & A\mathbf{x} = \mathbf{b} \\
& \mathbf{x} \ge \mathbf{0}
\end{aligned}
$$

Très proche de la forme canonique, mais les **inégalités sont transformées en égalités** par ajout de nouvelles variables, appelées **variables d'écart** (*slack variables*).

> 📌 Exemple : la contrainte $2x_1 + x_2 \le 7$ devient $2x_1 + x_2 + x_3 = 7$ avec $x_3 \ge 0$. La variable d'écart $x_3$ « absorbe » la différence entre le membre de gauche et 7.

---

### Concept de base (*base*)

- Les variables **en base** sont exprimées **en fonction des variables hors base** (via les contraintes d'égalité). De même, la fonction objectif est exprimée en fonction des variables hors base.
- À chaque itération :
  - la variable choisie (plus haut coefficient) **entre** dans la base → **variable entrante** ;
  - la variable liée à la contrainte limitante **sort** de la base → **variable sortante**.
- Pour choisir la direction : on prend la variable au **plus grand coefficient** dans l'objectif. Au moins une contrainte de positivité sera **limitante** pour la valeur de cette variable.

---

### Résumé de l'algorithme

1. Écrire le problème sous **forme standard**.
2. Partir d'une **solution réalisable** (typiquement les variables d'origine = 0). Les variables d'écart sont **en base**, les variables d'origine **hors base**.
3. Sélectionner comme **variable entrante** celle au **plus grand coefficient positif** dans l'objectif. *Si tous les coefficients sont négatifs → on est au maximum, aller à l'étape 7.*
4. **Maximiser** la valeur de la variable entrante en respectant les contraintes de positivité. La variable liée à la contrainte **limitante** devient la **variable sortante**.
5. **Réécrire** le problème (objectif + contraintes) avec la nouvelle base.
6. Boucler à l'étape **3**.
7. Maximum global trouvé → les variables en base donnent une **solution optimale**.

---

### Exemple détaillé (méthode algébrique)

On reprend l'exemple des projets A et B.

#### Étape 1 — Forme standard

On ajoute les variables d'écart $x_3, x_4, x_5$ :

$$
\begin{aligned}
\max_{(x_1,\dots,x_5) \in \mathbb{R}^5} \quad & 6x_1 + 3x_2 \\
\text{s.c.} \quad & 2x_1 + x_2 + x_3 = 7 \\
& 2x_1 + 3x_2 + x_4 = 11 \\
& 3x_1 + x_2 + x_5 = 10 \\
& x_1, x_2, x_3, x_4, x_5 \ge 0
\end{aligned}
$$

#### Étape 2 — Solution de départ

- **En base** : $x_3, x_4, x_5$ — **Hors base** : $x_1, x_2$
- Solution réalisable : $(0, 0, 7, 11, 10)$

$$
\begin{aligned}
z &= 6x_1 + 3x_2 \\
x_3 &= 7 - 2x_1 - x_2 \\
x_4 &= 11 - 2x_1 - 3x_2 \\
x_5 &= 10 - 3x_1 - x_2
\end{aligned}
$$

#### Itération 1

**Étape 3 — variable entrante** : le plus grand coefficient de $z = 6x_1 + 3x_2$ est **6** → **$x_1$ entre**.

**Étape 4 — variable sortante** : on augmente $x_1$ tant que les variables en base restent $\ge 0$ :

$$
\begin{array}{ll}
(x_3) & 7 - 2x_1 \ge 0 \Rightarrow x_1 \le 7/2 = 3{,}5 \\
(x_4) & 11 - 2x_1 \ge 0 \Rightarrow x_1 \le 11/2 = 5{,}5 \\
(x_5) & 10 - 3x_1 \ge 0 \Rightarrow x_1 \le 10/3 \approx 3{,}33
\end{array}
$$

La plus contraignante est $x_5$ (ratio le plus petit) → **$x_5$ sort**, et $x_1 = \tfrac{10}{3}$.

**Étape 5 — réécriture** (nouvelle base $x_3, x_4, x_1$) :

$$
\begin{aligned}
z &= 20 + x_2 - 2x_5 \\
x_3 &= \tfrac{1}{3} - \tfrac{1}{3}x_2 + \tfrac{2}{3}x_5 \\
x_4 &= \tfrac{13}{3} - \tfrac{7}{3}x_2 + \tfrac{2}{3}x_5 \\
x_1 &= \tfrac{10}{3} - \tfrac{1}{3}x_2 - \tfrac{1}{3}x_5
\end{aligned}
$$

#### Itération 2

**Étape 3** : dans $z = 20 + x_2 - 2x_5$, le seul coefficient positif est celui de $x_2$ (=1) → **$x_2$ entre**.

**Étape 4** :

$$
\begin{array}{ll}
(x_3) & \tfrac{1}{3} - \tfrac{1}{3}x_2 \ge 0 \Rightarrow x_2 \le 1 \\
(x_4) & \tfrac{13}{3} - \tfrac{7}{3}x_2 \ge 0 \Rightarrow x_2 \le 13/7 \approx 1{,}86 \\
(x_1) & \tfrac{10}{3} - \tfrac{1}{3}x_2 \ge 0 \Rightarrow x_2 \le 10
\end{array}
$$

La plus contraignante est $x_3$ → **$x_3$ sort**, et $x_2 = 1$.

**Étape 5 — réécriture** (nouvelle base $x_2, x_4, x_1$) :

$$
\begin{aligned}
z &= 21 - 3x_3 \\
x_2 &= 1 - 3x_3 + 2x_5 \\
x_4 &= 2 + 7x_3 - 4x_5 \\
x_1 &= 3 + x_3 - x_5
\end{aligned}
$$

#### Itération 3 — arrêt

**Étape 3** : dans $z = 21 - 3x_3$, **tous les coefficients (des variables hors base) sont négatifs** → on est au maximum.

**Étape 7** : avec $x_3 = x_5 = 0$ (hors base), les variables en base donnent :

$$\boxed{\mathbf{x}^\star = (x_1, x_2) = (3, 1), \qquad f(\mathbf{x}^\star) = 21}$$

---

### Tableau du simplexe (*simplex table*)

Pour alléger les notations (et faciliter l'implémentation), on applique le simplexe sous forme de **tableau**. Les variables en base sont exprimées en fonction des variables hors base, et chaque itération se fait par **opérations sur les lignes** (pivot de Gauss).

#### Tableau initial

| base | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $b$ |
|------|-------|-------|-------|-------|-------|-----|
| $x_3$ | 2 | 1 | 1 | 0 | 0 | 7 |
| $x_4$ | 2 | 3 | 0 | 1 | 0 | 11 |
| $x_5$ | 3 | 1 | 0 | 0 | 1 | 10 |
| $z$ | **6** | 3 | 0 | 0 | 0 | 0 |

#### Itération 1

- **Colonne pivot** : $x_1$ (coefficient 6, le plus grand de la ligne $z$).
- **Ratios** $b / (\text{colonne } x_1)$ : $7/2 = 3{,}5$ ; $11/2 = 5{,}5$ ; $10/3 \approx 3{,}33$. Le plus petit est sur la ligne $x_5$ → **ligne pivot $x_5$**, **pivot = 3**.
- Opérations : $L_3 \leftarrow L_3 / 3$, puis $L_1 \leftarrow L_1 - 2L_3$, $L_2 \leftarrow L_2 - 2L_3$, $L_4 \leftarrow L_4 - 6L_3$.

| base | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $b$ |
|------|-------|-------|-------|-------|-------|-----|
| $x_3$ | 0 | $\tfrac{1}{3}$ | 1 | 0 | $-\tfrac{2}{3}$ | $\tfrac{1}{3}$ |
| $x_4$ | 0 | $\tfrac{7}{3}$ | 0 | 1 | $-\tfrac{2}{3}$ | $\tfrac{13}{3}$ |
| $x_1$ | 1 | $\tfrac{1}{3}$ | 0 | 0 | $\tfrac{1}{3}$ | $\tfrac{10}{3}$ |
| $z$ | 0 | **1** | 0 | 0 | $-2$ | $-20$ |

#### Itération 2

- **Colonne pivot** : $x_2$ (coefficient 1, seul positif).
- **Ratios** : $\tfrac{1/3}{1/3} = 1$ ; $\tfrac{13/3}{7/3} = \tfrac{13}{7} \approx 1{,}86$ ; $\tfrac{10/3}{1/3} = 10$. Le plus petit est sur $x_3$ → **ligne pivot $x_3$**, **pivot = $\tfrac{1}{3}$**.
- Opérations : $L_1 \leftarrow 3L_1$, puis $L_2 \leftarrow L_2 - \tfrac{7}{3}L_1$, $L_3 \leftarrow L_3 - \tfrac{1}{3}L_1$, $L_4 \leftarrow L_4 - L_1$.

| base | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $b$ |
|------|-------|-------|-------|-------|-------|-----|
| $x_2$ | 0 | 1 | 3 | 0 | $-2$ | **1** |
| $x_4$ | 0 | 0 | $-7$ | 1 | 4 | 2 |
| $x_1$ | 1 | 0 | $-1$ | 0 | 1 | **3** |
| $z$ | 0 | 0 | $-3$ | 0 | 0 | $-21$ |

#### Arrêt

Sur la ligne $z$, **tous les coefficients sont $\le 0$** → maximum atteint.

Lecture du tableau final : $x_2 = 1$, $x_1 = 3$ (variables en base), et $z = -(-21) = 21$.

$$\boxed{\mathbf{x}^\star = (3, 1), \qquad f(\mathbf{x}^\star) = 21}$$

> 📌 **Note sur le signe de $z$** : dans le tableau, la colonne $b$ de la ligne $z$ affiche $-21$ ; la valeur de l'objectif est son opposé, soit $+21$. C'est une conséquence de la façon dont la ligne objectif est écrite (avec $z - 6x_1 - 3x_2 = 0$ au départ).

---

## 🎯 Points clés à retenir

1. **PL = cas particulier convexe** : objectif et contraintes linéaires → optimum garanti global.
2. **Trois formes** : canonique (inégalités $\le$), standard (égalités + variables d'écart, pour le simplexe).
3. **L'optimum est toujours sur un sommet** du polytope réalisable.
4. **Simplexe** : partir d'un sommet, se déplacer vers un sommet voisin meilleur, jusqu'à ce qu'aucune amélioration ne soit possible.
5. **Critère d'arrêt** : tous les coefficients de la ligne objectif $\le 0$.
