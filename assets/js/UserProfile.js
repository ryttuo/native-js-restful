/*
* UserProfile module for user details view with all actions
*
*/
var UserProfile = {
    
    init: function() {
        this.insertData();    
    },
    settings: {
        TITLE: document.querySelector(".main-content h1"),
        USERNAME: document.getElementById("name"),
        DETAILSCONTENT: document.getElementsByClassName("details-content")[0],
        user: {},
        userid: null
    },
    displayUser: function() {
        
        var user = UserProfile.settings.user;
        this.settings.USERNAME.innerHTML = user.name + " (" + user.data.username + ")";
        var ul = document.createElement("ul");
        var countPosts = user.getPostsCount();
        
        for(var i = 0; i < countPosts; i++) {
            var li = document.createElement("li");
            li.innerHTML = user.postsData[i].id + ". " + user.postsData[i].title;
            ul.appendChild(li); 
        }
        
        this.settings.DETAILSCONTENT.appendChild(ul);
        
    },
    insertData: function() {
        
        var userId = window.location.search.split("/")[2];
        
        if(!/^\+?(0|[1-9]\d*)$/.test(userId)) {
            this.settings.TITLE.innerHTML = "Invalid url";    
        }else {
            var url = Common.settings.USERURL + "?id=" + userId;
            this.settings.userid = userId;
            Common.getRestfulData(url, function(data) {
               
               if(data[0]) {
                   UserProfile.settings.user = new User();
                   UserProfile.settings.user.addData(data[0]);
                   var urlposts = Common.settings.USERPOSTURL + "?userId=" + UserProfile.settings.userid;
                   Common.getRestfulData(urlposts, function(data) {
                      
                        if(data) {
                            UserProfile.settings.user.addPost(data);
                            UserProfile.displayUser();        
                        }
                       
                   });
               }
                
            });
        }
    }
    
    
};

(function(){
    
    UserProfile.init();
    
})();