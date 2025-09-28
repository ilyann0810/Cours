import numpy as np

# Exemple de tableau 1D
a = np.array([1, 2, 3, 4])

# Conversion en vecteur colonne
vecteur_colonne = a.reshape(-1, 1) #ou a.resphape(4,1)

print(vecteur_colonne)