function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${user}`;
    var responseserver;
    xhr.open('GET', url, true);
    // Send the request to the server
    xhr.send();
    xhr.onload = function() {

        // Parse API data into JSON
        if (xhr.status == 200)
        {
            const data = JSON.parse(this.response);
            // Log the response
            console.log(data);
            showUser(data);

        }

    }

}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content\
    var fullname   = user.name;
    var username   = user.login;
    var aviurl     = user.avatar_url;
    var profileurl = user.html_url;
    var location   = user.location;
    var followersnum = user.followers;
    var followingnum = user.following;
    var reposnum     = user.public_repos;

    var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
    outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
    outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
    outhtml = outhtml + '<div class="repolist clearfix">';

    document.getElementById('texty').innerHTML = user.name;
    $('#info').html(outhtml);

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.keyCode == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);

        }
    })
});
