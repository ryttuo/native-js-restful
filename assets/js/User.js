/* 
User Class Object with contructor and methods needed
*/
var User = (function () {
    
    function User(name) {
        this.userId = null;
        this.name = name;
        this.posts = 0;
        this.data = {};
        this.postsData = [];
    }

    User.prototype.getName = function() {
        return this.name;
    };
    
    User.prototype.getPostsCount = function() {
        return this.posts;
    };
    
    User.prototype.addPost = function(posts) {
        if(posts === undefined){
            this.postsData.push({});
        }else {
            this.postsData = posts;
        }
        this.posts = this.postsData.length;
    }
    
    User.prototype.addData = function(data) {
        this.name = data.name;
        this.userId = data.id;
        this.data = data;
    }
    
    User.prototype.getPostData = function() {
        
        var postsCount = UserList.settings.totalPosts.length,
        posts = [],
        i = 0;
        
        
        while(UserList.settings.totalPosts.length > i) {
            if(UserList.settings.totalPosts[i].userId === this.data.id) {
                posts.push(UserList.settings.totalPosts[i]);
                UserList.settings.totalPosts.splice(i, 1);
            }else {
                i++;
            }     
        }
        
        this.postsData = posts;
        this.posts = posts.length;
        
    }
    
    return User;
}());