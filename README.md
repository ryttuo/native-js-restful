# native-js-restful

This is a example how to use native javascript and show user list from a restful API,
is only to get data NOT to send updates to the API.

NO libraries, no frameworks is pure javascript

The basic idea is get users from http://jsonplaceholder.typicode.com/users and then get
user post from "http://jsonplaceholder.typicode.com/posts"

To see user details from each user we can go to ?/user/<user-id> when we click on "details"
link

User.js is the main class with attributes for user list and user profile

Common.js is a common data between modules

UserList.js module for user list view

UserProfile.js module for user details view
