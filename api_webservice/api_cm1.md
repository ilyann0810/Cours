# Les types d'API et les formats de donnees

## Table des matières
1. [Introduction](#introduction)
2. [Section 1](#section-1)
3. [Section 2](#section-2)
4. [Conclusion](#conclusion)

## Definition d'une API
- Une API (application program interface) est un ensemble de règles et de protocoles qui permet
à 2 applications de communiquer entre elles.

- Elle est essentielle pour faciliter l'intgeraction entre differents logiciels et services, et standardisant la manière dont les données sont échangés. 

### Les types d'API
1) L'API REST (Representational state transfer) -> c'est un style d'API qui d'architecture d'API qui utilise le protocole HTTP (vulnerable et peut etre attaqué)
    Caracteristique : - légère et flexible
                      - utilise les 4 operations: Get, Post , Put, Delete
                      - frequemment utilisée pour crée des services Web modernes.
                      - (simple et compatible avec le web)
                      

2) L'API SOAP (Simple objedct access Protocol)
    - SOAP est un protocole basé sur XML
    Caracteristique : 
                      - structure stricte et standardisée pour la communication
                      - Prend en charge des fonctionalités avancés comme la sécurité et la fiabilité.
                      - Utilise des environements necessitant des echanges robuste et securisé.
                      -fiable et sécurisé
                      

3) L'API GraphlQl (precis dans la recupérations des données)
    - Developpé par Facebook, il permet aux clients de demandés exactement les données de type sociaux qu'ils ont besoin.
    Caracteristique : - Réponses ciblées evitant la surchages de données inutiles.
                      - Plus flexible que les autres type de API
                      

## 3 formats de données utilisés par les API
Les API utilisent des formats standardisés pour echanger les données entre systemes

1) JSON (Javacript Object Notation)

- Description : Format léger, facile à lire par les humains et analyser par les machines.
- c'est un dictionnaire facile à manipuler.
- utilisé, majoritairement par REST et graphQl

2) XML(extensible Markup Language)
    * Format plus verbeux et formel
    * Principalement utilisé avec SOAP

    exemple : <personne>
                <non>Jean</non>
                <age>30</age>
                </personne>

3) Html
    Language utilisé pour crée des pages Web
    - parfait pour certain types d'API qui permet de recupéré directement le contenu d'un site.
    - Parcontre moins utilisé dans les échanges de données entre applications

4) YAML (Ain't Markup language)
    - Format lisible par l'humain, utilisé pour stock2 un code et des configuration
    - Très Rare dans les échanges API, seulement par les programmeurs

### Informations supplémentaires

| Formats     | Usage       |     Avantages      | Limites

JSON            Rest,Graphql    simple              Moins strict
XML             SOAP            format stricte      verbeux
HTML            contenue web    compatibleWeb       Peu adapté aux autres
YAML            Configuration   codage              Peu causer des dégats

## Les méthodes HTTP et leur exemples
 * Les méthodes Http definissentj le type d'operation qu'un client souhaite effectuer sur une ressource d'un serveur.

## Methode Get

- Recupere les données depuis un serveur.
- plusieurs requête ne modifie pas le resultat

- Exemple: Get/utilisateurs HTTP/1.1  host : api.exemple.com Accept: application/Json -> Réponse {{"id":1,"nom":"jean"}{"id":2,"nom":"Marie"}}

## Methode Post

Principe: Crée une nouvelle ressource sur le serveur
        Répète la requête, elle va crée plusieurs fois la ressource
        exemple : requête : POST / utilisateurs HTTP/1.1 
        Content.Type: application/json {"age":40,"nom":"Paul"} -> Réponse created {"id":3,"nom":"Paul","age":40}

## Les codes de statut Http
Les codes indiquent le resultat d'une requête et per,ettent qu client de co,prendre si l'operation a reussi ou non.
 -> 1xx : Informations : rare, utilisé pour indiqué que la requête en cours.
 -> 2xx : Succès: La requête a été traitée correctement.
    200 ok : requête réussie, données renvoyés.
    201 Created : requête r2ussie, ressource crée.
    3xx : Redirection : La ressource a été déplacée ou redirgée
    301 Moved permanently
    302 Found
    4xx : Erreur côté client, requête incorrecte ou non autorisée
    400 BadRequest
    401 Unauthorized
    404 Notfound
    5xx: erreur côté serveur
    500: Internal Server Error
    503: Server unavailable


## Methode Put

Elle permet de mettre à jour complétement les ressources existantes

Requête: Put /utilisateurs/1  http/1.1
content-type : application / Json {"non":"Dupont"}

## Methode Delete

Supprime une ressource existante 
Requête : Delete /utilisateurs/1  http/1.1
Réponse : 204 No content

## Methode Patch

Mettre à jour partiellement
{"non":"..."}