class UI {
  static clear() {
    document.querySelector("#user-profile .container").remove();
    document.querySelector("#user-repos .container").remove();
  }

  static showAlert(message, color) {
    UI.hideAlert();
    const alert = document.createElement("div");
    alert.className = `alert alert-${color} text-center`;
    alert.innerText = message;
    const searchbar = document.querySelector("#searchbar");
    document.body.insertBefore(alert, searchbar);
    setTimeout(UI.hideAlert, 3000);
  }

  static hideAlert() {
    const alert = document.querySelector(".alert");
    if (alert) alert.remove();
  }

  static showUserProfile(data) {
    document.querySelector("#user-profile").innerHTML = `
      <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img src="${data.avatar_url}" alt="" class="img-fluid" />
                <a href="${data.html_url}" class="btn btn-info btn-block rounded mt-2">
                  View Profile
                </a>
              </div>
              <div class="col-md-9">
                <div class="mt-2">
                  <span class="badge badge-danger px-3 py-2"
                    >Public Repos: ${data.public_repos}
                  </span>
                  <span class="badge badge-success px-3 py-2"
                    >Public Gists: ${data.public_gists}
                  </span>
                  <span class="badge badge-primary px-3 py-2">Followers: ${data.followers} </span>
                  <span class="badge badge-dark px-3 py-2">Following: ${data.following}</span>
                </div>
                <ul class="list-group my-4">
                  <li class="list-group-item">Company: ${data.company}</li>
                  <li class="list-group-item">Website/Blog: ${data.blog}</li>
                  <li class="list-group-item">Location: ${data.location}</li>
                  <li class="list-group-item">Member Since: ${data.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static showUserRepos(data) {
    let repos = "";
    for (let repo of data) {
      repos += `
        <div class="card my-2">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <a href=${repo.html_url} alt="">${repo.name}</a>
              </div>
              <div class="col-md-6">
                <span class="badge badge-danger px-3 py-2">
                  Stars: ${repo.stargazers_count}
                </span>
                <span class="badge badge-success px-3 py-2">
                  Watchers: ${repo.watchers_count}
                </span>
                <span class="badge badge-primary px-3 py-2">
                  Forks: ${repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.querySelector("#user-repos").innerHTML = `
      <div class="container">
        <h2 class="font-weight-bold">Latest Repos</h2>
        ${repos}
      </div>
    `;
  }
}
