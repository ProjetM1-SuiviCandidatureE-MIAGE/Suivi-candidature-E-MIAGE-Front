Pour exécuter le front et le back en même temps, utiliser la commande suivante : 
npm run startall

# Suivi-candidature-E-MIAGE
							Cahier des Charges :
							projet  site de candidature E-MIAGE
							

**I / Présentation du projet**

L'Existant:

Actuellement lorsque des candidats de la France et de l'étranger veulent postuler au master MIAGE, ils le font à partir de la plateforme de candidature d’Amiens. Les enseignants des universités françaises proposant l’e-Miage se réunissent tous les ans pour examiner et valider les candidatures à partir de cette plateforme.

L'objectif:

Créer une application web pour les candidatures e-Miage sur le site d'Evry.

Le site doit comprendre :
-   Un formulaire à compléter en ligne avec CV, lettre de motivation et relevés de notes à ajouter en pièces jointes.
    
-   L’enseignant valide ou non chaque candidature et le candidat accepté devient un "Apprenant". L’examen des candidatures se fait tous les mois. L’enseignant peut consulter l'historique des candidatures avec les pièces jointes quelle que soit la décision prise précédemment.

**Langage et logiciel utilisés :**

Technologies côté serveur :

- NoSQL : c’est une famille de systèmes de gestion de bases données (SGBD) qui s’écarte du paradigme classique des bases de données relationnelles.

- MongoDB : c’est un système de gestion de base de données orientée documents, répartissable sur un nombre quelconque d’ordinateurs et ne nécessitant pas de schéma prédéfini des données.

- Node JS : c’est une plateforme libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge.

- Express : c’est un Framework pour construire des applications web basées sur Node.js

Technologies côté client :

- React JS : c’est une bibliothèque libre en JavaScript pour construire des interfaces utilisateurs en single-page.


**II/ Architecture du projet :**

**Cas n°1**

	II.I/ Diagrammes de cas d’utilisation :
		A. Connexion et inscription :
![enter image description here](https://lh3.googleusercontent.com/1Uy-faQCdSaelS9ts2_sDhpCgBuc7w_Dx-moqHrkTDB6cZmaNekMHKnOPLL0tCD6arme5x2d-Por)


**Nom :**Authentification d’un utilisateur pour le site de candidature e-MIAGE.

**Acteurs :** Apprenants et administrateurs (Responsable, Secrétaire pédagogique, Représentant de la formation continue).

**Description :** L’inscription concerne uniquement les apprenants et la connexion concerne les apprenants et les administrateurs. Le candidat doit remplir le formulaire d’inscription en fournissant les données requises.

**Préconditions :** aucun

**DESCRIPTION**

**Le scénario nominal :**

1. Le système affiche une page contenant le formulaire d’inscription.

2. L’utilisateur valide son inscription.

3. Le système valide l’inscription.

4. Le système affiche la page de connexion.

5. L’utilisateur rentre son mail et son mot de passe.

6. Le système affiche une page du compte en fonction du type d’utilisateur.

**Fin :** Scénario nominal : aux étapes aux étapes 2, 5 et 6.

	B.Gestion des Candidats :

**Cas n°2**

![enter image description here](https://lh3.googleusercontent.com/X4KHxaWrlKRE84ciSFKZQ16kebcDQCR-alG2rjsIYHH2O1FoSoChvRpJ72j6paEJVn15pJjcx1Gx)

**Nom :** Espace candidat.

**Acteurs :** Apprenants.

**Description :** L’utilisateur doit pouvoir modifier ses données personnelles sur son espace, créer une candidature et peut consulter ses candidatures précédentes.

**Préconditions :** L’utilisateur doit s’être authentifié en tant que candidat.

**DESCRIPTION**

**Le scénario nominal :**

1. Le système affiche une page contenant le compte étudiant ainsi que les différentes candidatures de l’étudiant avec leurs états.

2.  L’utilisateur peut ajouter une candidature.
3. Le système affiche le formulaire de candidature.

4. L’utilisateur peut soumettre sa candidature une fois tous les documents et informations remplis.

5. Le système retourne à l’affichage des candidatures avec leurs états à l’étudiant.

**Les scénarios alternatifs :**

2.3.4.a. L’utilisateur décide de quitter le formulaire d’une candidature.

4.b. L’utilisateur ne remplit pas tous les champs obligatoires.

**Fin :** Scénario nominal : aux étapes 2, 3 ou 4, sur décision de l’utilisateur /système.

	C. Gestion des candidatures :

**Cas n°3**
![enter image description here](https://lh3.googleusercontent.com/xT2bT5zkTCqETVmdeZNDMkoj3qYWTrlA7mFKdo6zav9Tlm7yZ5iyQzNMPgevz7frJSCoC9gvOCUi)

**Nom :** Espace administrateur.
**Acteurs :** administrateurs (Responsables, Secrétaire pédagogique, Représentant de la formation continue).

**Description :** L’administrateur peut modifier ses informations personnelles, consulter toutes les candidatures et changer le statut de chaque candidature sauf celles déjà traitées.

**Préconditions :** L’utilisateur doit s’authentifier en tant qu’administrateur.

**DESCRIPTION**

**Le scénario nominal :**

1. Le système affiche une page contenant le compte administrateur ainsi que les différentes listes possibles sur le traitement des candidatures. (« Candidatures traitées », « Candidatures non traitées », « Candidatures en attente » ).

2. L’utilisateur peut sélectionner une des 3 catégories.
3. Le système recherche les différentes candidatures selon cette catégorie.

4. Le système affiche la description de chaque candidatures trouvées.

5. L’utilisateur peut sélectionner un candidat parmi ceux affichés.

6. Le système affiche les informations détaillées du candidat choisi.

7. L’utilisateur peut ensuite changer de statut la candidature selon la catégorie choisi.

8. L’utilisateur peut ensuite quitter la description détaillée.
9. Le système retourne à l’affichage des candidatures de la catégorie (retour à l’étape 4).

**Les scénarios alternatifs :**


2.5.8.a. L’utilisateur décide de quitter la consultation de la catégorie d’étudiants choisie.

2.5.8.b. L’utilisateur décide de quitter la consultation des catégories.

**Fin :** Scénario nominal : aux étapes 2, 5 ou 8, sur décision de l’utilisateur.

	II/II/LES MAQUETTES

	Interfaces graphique en Wireframe:
	A. Page d’accueil du site de candidature e-MIAGE:

![enter image description here](https://lh3.googleusercontent.com/oJ0bubrXhWhjw0ZeLbGBq8QlHfCaVy4PQ4to2M_L9deUZcfdYp86ite1bRvkyf4j6sRqIFgnQxCa)


1.  L’entête est constituée d’un menu horizontal en position fixe avec l’espace de connexion pour les administrateurs et les candidats. Et un espace inscription uniquement pour les candidats. Il s’agit d’une partie réalisée en single page
2.  Le corps comprend une partie de présentation de la MIAGE et plus particulièrement de la e-MIAGE.

3. Le pied de page comporte les mentions légales du site.

		B.PAGE D'INSCRIPTION
	![enter image description here](https://lh3.googleusercontent.com/bBny9O2F9NhLUD2ZvXmU07NHTdkJydQ9QeGG4c6hNb3NUNb8E9FtdbbwOygv-RZXJSBSXsnNRs4I)


Lorsqu’on clique sur le bouton “Je n’ai pas de compte” de la page connexion, le système redirige l’utilisateur sur la page inscription. La page d’inscription demande les renseignements suivants : nom, prénom, email et mot de passe.

Possibilité de se rediriger vers la page de connexion à partir de la page d’inscription.

- Possibilité de se rediriger vers la page de connexion à partir de la page d’inscription.

		C.Connexion d’un étudiant ou d’un Enseignant :
	![enter image description here](https://lh3.googleusercontent.com/v75jL3ROWlNo3mudR9KQczfSh_Ro_xpr7Aj43C_TGmt77uQ0p4wWvNHcAOHu1SnH9U5wg7n7KMmo)
	

Lorsqu’un utilisateur clique sur l’espace candidat ou l’espace administrateur, la page de connexion s’affiche, elle demande le mail et le mot de passe de la personne pour se connecter après vérification.

Possibilité de changer de mot de passe lorsqu’on l’a oublié.

Possibilité de se rediriger vers la page inscription à partir de la page de de connexion.

- Possibilité de s’inscrire à partir de la page de de connexion.



		D. Espace candidature :
	
	![enter image description here](https://lh3.googleusercontent.com/G3Mjlyja5TUff0ChB5DEh0_rJqEUeAotwMkNwUlwQL-PNY3vJonqk0FeU7AShUAuzHRbnpFg92zQ)

1. L’entête comprend un bouton de déconnexion du candidat.

2. Le corps comporte la partie suivante :

-   Une partie pour la création d’une candidature en single page avec les informations suivantes : CV, lettre de motivation et le relevé de notes.
    
-   Une partie avec les informations du compte du candidat (nom, prénom, email et changement de mot de passe).
    
-   L’état d’avancement de sa candidature. (Envoyée, en Attente, Acceptée, Refusée).
    

3. Le pied de page comporte les mentions légales.
		
		E.Espace Enseignant :
	
![enter image description here](https://lh3.googleusercontent.com/P3wJOwLWJGB7LVWZp5vNPyqXyd1eU6VeTR0LQazwpKlmfC5RIWsOHY490TgJi6K2TH_eXIqnWCcd)

1. L’entête comprend un bouton de déconnexion de l’enseignant.

2. Le corps de la page comporte la partie suivante :

-   Les boutons suivants sont en single page : « Candidatures traitées », « Candidatures non traitées », « Candidatures en attente ». Lorsqu’on clique sur l’un des boutons, un menu se déroule et dévoile la liste des candidatures liées au bouton (exemple toutes les candidatures non traitées s’affichent).
    

  

-   Dans chacune des listes il est possible de voir un candidat au choix.
    
-   L’enseignant peut changer l’état une candidature. Il peut la valider, la refuser ou la mettre en attente. Les candidatures refusées feront l’objet d’un archivage avec la date, le nom et le prénom du candidat ainsi que les documents qu’il a fournit.
    
-   Les informations concernant son compte (nom, prénom, email et changement de mot de passe).
    

3. Le pied de page comporte les mentions légales du site.

		II/III/LE DIAGRAMME DE CLASSE
![enter image description here](https://lh3.googleusercontent.com/JheKqPWI-RSga7IHPQb2_Cb-wCVLYjHlT72X9s8uaM4ZjOnEFafShyh9GJ1xDbk4dqq0GpEe5_2s)

	II/IV/JSON
<pre><code>Fichier JSON pour la BDD</code></pre>

“Candidature" =

{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idCandidature" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Etat" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Commentaire":"",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"CV" :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Fichier" : ""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"LM" :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Fichier" : ""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ReleveNotes" :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Fichier" : ""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"AutresFichiers" : [

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Fichier" : ""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Date" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Fichier" : ""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Candidat" : 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idCandidat" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Prenom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mail" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mdp" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

}

"Candidat" : 

{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idCandidat" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Prenom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mail" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mdp" : "",
}

"Apprenant" : 

{

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idApprenant" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Prenom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mail" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mdp" : "",

}  

"Admin" :

 {
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idAdmin" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Nom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Prenom" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mail" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mdp" : "",

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Droit" : "",

}

