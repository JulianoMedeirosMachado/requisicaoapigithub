function loadData() {
  // Receber o nome de usuário do input
  let username = document.getElementById('username').value;

  // Criar um novo objeto XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var repoResponse = JSON.parse(xhr.responseText);
      console.log(repoResponse);

      // Criar um novo objeto XMLHttpRequest para buscar os dados do usuário
      var xhrUser = new XMLHttpRequest();
      xhrUser.onreadystatechange = function() {
        if (xhrUser.readyState === 4 && xhrUser.status === 200) {
          var userResponse = JSON.parse(xhrUser.responseText);
          console.log(userResponse);

          // Atualizar os dados no HTML
          var user = userResponse;

          // Atualizar a imagem do usuário
          var userAvatar = document.getElementById('user-avatar');
          userAvatar.src = user.avatar_url;

          // Atualizar o nome do usuário
          var userName = document.getElementById('user-name');
          userName.innerHTML = '<strong>Nome:</strong> ' + user.name;

          var repoContainer = document.getElementById('repo-container');
          repoContainer.innerHTML = '';
          
          // Exibir até 10 repositórios
          var repos = repoResponse.slice(0, 10);
          repos.forEach(function(repo) {
            var repoBlock = document.createElement('div');
            repoBlock.classList.add('column', 'is-4', 'repo-block');
          
            var repoName = document.createElement('h3');
            repoName.textContent = repo.name;
          
            var repoLanguage = document.createElement('p');
            repoLanguage.textContent = 'Linguagem: ' + repo.language;
          
            var repoDescription = document.createElement('p');
            repoDescription.textContent = 'Descrição: ' + repo.description;
          
            repoBlock.appendChild(repoName);
            repoBlock.appendChild(repoLanguage);
            repoBlock.appendChild(repoDescription);
          
            repoContainer.appendChild(repoBlock);
          });

        }
      };

      xhrUser.open('GET', 'https://api.github.com/users/' + username, true);
      xhrUser.send();
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert('Usuário não encontrado');
    }
  };

  xhr.open('GET', 'https://api.github.com/users/' + username + '/repos', true);
  xhr.send();
}