var UserList = {
   
    init: function() {
        this.events();
        this.insertData();
    },
    settings: {
        addButton: document.getElementById("add-user"),
        resetButton: document.getElementById("reset"),
        liveEvents: document.querySelector(".list-content"),
        nameInput: document.getElementsByClassName("insert")[0],
        listContent: document.querySelector(".list-content"),
        totalUsers: document.getElementById("total").getElementsByTagName("span")[0],
        users: [],
        totalPosts: []
        
    },
    events: function() {
        
        var name = null;
        this.settings.nameInput.getElementsByTagName('input')[0].addEventListener("keydown", function(e) {
           
           name = UserList.settings.nameInput.getElementsByTagName('input')[0];
           
           if(name !== "" && e.keyCode === 13) {
                UserList.addUser(name.value);
                name.value = "";
                UserList.displayUsers(false);
           }
           
            
        });
        
        this.settings.addButton.addEventListener("click", function(e) {
            
            name = UserList.settings.nameInput.getElementsByTagName('input')[0];
            
            if(name.value === "") {
                return;
            }
            
            UserList.addUser(name.value);
            name.value = "";
            UserList.displayUsers(false);
            
        });
        
        this.settings.resetButton.addEventListener("click", function(e) {
            UserList.insertData();
        });
        
        this.settings.liveEvents.addEventListener("click", function(e) {
            
            if(e.target.getAttribute("id") === "delete-user") {
                var dataId = e.target.getAttribute("data-id");
                UserList.settings.users.splice(dataId, 1);
                UserList.displayUsers();
                
            }
            
            if(e.target.getAttribute("id") === "details-user") {
                var userId = e.target.getAttribute("data-id");
                console.log('Details');
            }
            
        });
        
    },
    addUser: function(fullname) {
        
        var userlistLength = this.settings.users.length; 
        for(var i=0; i < userlistLength; i++) {
            if(fullname === this.settings.users[i].name){
                this.settings.users[i].addPost();
                return;
            }
        }
        
        var person = new User(fullname);
        person.addPost();
        this.settings.users.push(person);
        
        
    },
    displayUsers: function(url_data) {
        
        this.settings.listContent.innerHTML = "";
        
        var content = "<ul>";
        var person = null;
        
        var userlistLength = this.settings.users.length;
        for(var i=0; i < userlistLength; i++) {
            
            if(url_data) {
            
                person = new User();
                person.addData(this.settings.users[i]);
                person.getPostData();
                this.settings.users.splice(i, 1, person);
            
            }else {
                
                person = this.settings.users[i];
                
            }
            
            content  += "<li>" +
                            "<div>" + 
                            "<label for=''>" + person.getName() +  " - (<span> "+ person.getPostsCount() + "</span> posts)</label>" + 
                            "<button data-id='" +i+ "' id='delete-user'>Delete</button>";
                            if(person.userId !== null) {
                                content += "<a href='user.html?/user/" +person.userId+ "' data-id='" +person.userId+ "' id='details-user'>Details</a>";
                            }
                            content += "</div>" + 
                        "</li>";    
            
        }
           
        content += "</ul>"
        
        
        this.settings.totalUsers.innerHTML = userlistLength;
        this.settings.listContent.innerHTML = content;
        
    },
    insertData: function() {
        Common.getRestfulData(Common.settings.USERPOSTURL, function(data){
                
            if(data){
                UserList.settings.totalPosts = data;
                Common.getRestfulData(Common.settings.USERURL, function(data){
                
                    if(data){
                        UserList.settings.users = data;
                        UserList.displayUsers(true);
                    }
                        
                });
            }
                
        });
    }
        
};

(function(){
     
    UserList.init();
    
})();