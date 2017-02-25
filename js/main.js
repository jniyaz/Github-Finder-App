$(document).ready(function(){
	console.log("App ready..");
	$("#searchUser").on("keyup", function(e){
		let username = e.target.value;
		//make request to github
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id: '66308af4789eb3a25e7e',
				client_secret: '72cd39c4321d4be214ef47edbfb633d261d16724'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
					client_id: '66308af4789eb3a25e7e',
					client_secret: '72cd39c4321d4be214ef47edbfb633d261d16724'
				}	
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$("#repos").append(`					
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>
									<p>${repo.description}</p>
								</div>
								<div class="col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-info">Stars: ${repo.stargazers_count}</span>	
								</div>
								<div class="col-md-2">
									<a class="btn btn-primary" target="_blank" href="${repo.html_url}">View Repo</a>
								</div>
							</div>
						</div>
					`);
				});
			});

			$("#profile").html(`
				<h3>Profile</h3>
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
				    	<div class="col-md-3">
				    		<img src="${user.avatar_url}" class="thumbnail avatar" />
				    		<a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
				    	</div>
				    	<div class="col-md-9">
							<span class="label label-default">Public Repos: ${user.public_repos}</span>
							<span class="label label-primary">Public Gists: ${user.public_gists}</span>
							<span class="label label-info">Followers: ${user.followers}</span>
							<span class="label label-warning">Following: ${user.following}</span>
							<br/>
					    	<ul class="list-group">
					    		<li class="list-group-item">Company: ${user.company}</li>
					    		<li class="list-group-item">Bio: ${user.bio}</li>
					    		<li class="list-group-item">Location: ${user.location}</li>
					    		<li class="list-group-item">Email: ${user.email}</li>
					    		<li class="list-group-item">Web/Blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
					    		<li class="list-group-item">Member Since: ${user.created_at}</li>
					    	</ul>
				    	</div>				    	
				    </div>
				  </div>
				</div>				
				<div id="repos"><h3>Repos</h3></div>
			`);
		});
	});
});