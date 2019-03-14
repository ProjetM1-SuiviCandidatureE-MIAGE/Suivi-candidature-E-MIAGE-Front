class Auth {
  constructor() {
    this.authenticatedCandidat = false;
    this.authenticatedAdmin = false;
  }

  loginCandidat() {
    this.authenticatedCandidat = true;
    this.authenticatedAdmin = false;
  }

  loginAdmin() {
    this.authenticatedCandidat = false;
    this.authenticatedAdmin = true;
  }

  logout() {
    this.authenticatedCandidat = false;
    this.authenticatedAdmin = false;
  }

  isauthenticatedCandidat() {
    return this.authenticatedCandidat;
  }

  isauthenticatedAdmin() {
    return this.authenticatedAdmin;
  }
}

export default new Auth();

/* A faire demain :

- Faire la déconnexion dans SpaceNavbar
- Faire la connexion candidat checkAUth dans le back avec le header 
- Faire la connexion pour l'admin (back et front) */
