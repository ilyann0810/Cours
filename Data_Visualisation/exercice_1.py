import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA



# Chargement des données 
df = pd.read_csv('winequality-red.csv')
df = df.select_dtypes(include=[np.number])
# Préparation des données
X = df.copy()
X = X.dropna()
feature_names = X.columns.tolist()
scaler = StandardScaler()
Z = scaler.fit_transform(X)
print(X.head())


# Lancer l’ACP
pca = PCA() # calcule toutes les composantes
scores = pca.fit_transform(Z) # projections des individus (n × p)
eigvals = pca.explained_variance_ # ~ "valeurs propres"
ratio = pca.explained_variance_ratio_ # % de variance par composante
cum = ratio.cumsum() # variance expliquée cumulé

# Courbe des éboulis

plt.figure()
plt.plot(range(1, len(ratio)+1), ratio*100, marker='o')
plt.xlabel("Composante principale"); plt.ylabel("Variance expliquée (%)")
plt.title("Courbe des éboulis (Scree plot)")
plt.xticks(range(1, len(ratio)+1))
plt.show()

""" La decroissance de la variance expliquée cumulée est très forte pour les 4 premières composantes principales."""

# Variance expliquée cumulée
plt.figure()
plt.plot(range(1, len(cum)+1), cum*100, marker='o')
plt.axhline(80, linestyle='--') # exemple de seuil 80%
plt.xlabel("Nombre de composantes"); plt.ylabel("Variance expliquée cumulée(%)")
plt.title("Variance expliquée cumulée")
plt.xticks(range(1, len(cum)+1))
plt.show()

"""
La courbe dépasse les 80% au niveau de la 6ᵉ composante.
Ça veut dire que les 5, 6 premières composantes principales suffisent à expliquer au moins 80% de la variance totale."""


# Critère de Kaiser (sur corrélations ⇒ après standardisation)

# Matrice de corrélation (variables standardisées)
R = np.corrcoef(Z, rowvar=False)
# Valeurs propres de R (R symétrique → eigh)
eigvals_R, eigvecs_R = np.linalg.eigh(R)
eigvals_R = eigvals_R[::-1] # tri décroissant
print("Valeurs propres de R :", np.round(eigvals_R, 3))
print("Nb d'axes selon Kaiser (λ>1) :", (eigvals_R > 1.0).sum())


# Loadings = corr(variable, PC) pour données standardisées
loadings = pca.components_.T * np.sqrt(pca.explained_variance_) # (p, p)
def biplot(scores2d, loads2d, names):
    plt.figure()
    plt.scatter(scores2d[:,0], scores2d[:,1], alpha=0.7)
    scale = 5.0 # agrandir les flèches pour les voir
    for i, name in enumerate(names):
        x, y = loads2d[i,0]*scale, loads2d[i,1]*scale
    plt.arrow(0, 0, x, y, head_width=0.15, length_includes_head=True)
    plt.text(x*1.05, y*1.05, name)
    plt.axhline(0); plt.axvline(0)
    plt.xlabel("PC1"); plt.ylabel("PC2"); plt.title("Biplot (PC1 vs PC2)")
    plt.show()
biplot(scores[:, :2], loadings[:, :2], feature_names)