$(document).ready(function(){
  $('#search-user').on('keyup', function(e){
    let userName = e.target.value;

    //make request to github
    $.ajax({
      url: 'https://api.github.com/users/' + userName,
      data: {
        client_id: '1f3b24e0be9bd1394238',
        client_secret: 'c74932f32ac3d1bcaedf13f9647af5ff61f5a0ca'
      }
    }).done(function(user){
      $.ajax({
        url: 'https://api.github.com/users/' + userName + '/repos',
        data: {
          client_id: '1f3b24e0be9bd1394238',
          client_secret: 'c74932f32ac3d1bcaedf13f9647af5ff61f5a0ca',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(idx, repo){
          $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-6">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-4">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-success">Watchers: ${user.watchers_count}</span>
                  <span class="badge badge-info">Stars: ${user.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a class="btn btn-primary btn-block" href="${repo.html_url} target="_blank">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        })
      });
      $('#profile').html(`
        <div class="card panel-default">
          <div class="card-body">
            <h3 class="card-title">${user.name}</h3>
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}" />
                <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-secondary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    })
  })
});
