class GitHub {
  static CLIENT_ID = "YOUR ID";
  static CLIENT_PW = "YOUR SECRET";
  static REPO_COUNT = 5;

  constructor(
    id = GitHub.CLIENT_ID,
    pw = GitHub.CLIENT_PW,
    repo_count = GitHub.REPO_COUNT
  ) {
    this.id = id;
    this.pw = pw;
    this.repo_count = repo_count;
  }

  async getUserProfile(username) {
    const response = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.id}&client_secret=${this.pw}`
    );
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  }

  async getUserRepos(username) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.id}&client_secret=${this.pw}&per_page=${this.repo_count}`
    );
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  }
}
