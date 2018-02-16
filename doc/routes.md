```

Routes

Registration: GET ‘/’
	GET ‘/user/register’- displays user registration page
	GET ‘/login’ - displays login prompt page
	POST ‘/logout’ - logout a user
Root Page:
GET ‘/’:
Logged In: redirect to ‘/user/id’ url
Not logged in: redirect to ‘/login’ url.
GET ‘/login’: displays login page
POST ‘/login’: posts user info to cookies
User Profile
GET ‘/user/id’
	Logged in: displays user profile
If Own Page: redirect to ‘/’, can Tweet
If someone Else’s Page: followers a user
	Not Logged in: Redirect to ‘/login’
Other
	GET ‘/user/id/tweets/top’ - top 50 tweets of user
	GET ‘user/id/followers’ - followers of user of profile
	GET ‘/user/id/tweets’ - list of tweets made by user
	GET ‘/user/id/following’ - users following profile user

GET ‘/user/id’: gets user’s page
GET ‘’/users’: gets all users
GET ‘/user/:id’: gets user’s profile and stream of tweets
POST ‘/user/new’: create new account/user
GET ‘user/id/followers’- gets user followers
POST ‘/user/id/follower/new’ - creates new user follower
GET ‘user/id/following - gets all users that a current user is following
POST ‘/user/id/follower/new’ - creates new following (current user follows new user)
GET ‘user/id/mentions/tweets - gets all the mentions
GET ‘user/id/mentions/id/tweet/id’ - gets a single mentioned tweet that a user was mentioned in

POST ‘/tweet/new’: create new tweet
POST ‘/tweet/hashtag/new’ - creates new hashtag associated with a tweet
POST ‘/tweet/mention/user/new’ - creates new user mention
GET /tweets/:id - return tweet with id
GET /users/:id - return user information for user with id
GET /tweets/recent - return the recent n tweets
GET ‘/tweets/id/hashtags’- returns all the hashtags associated with the tweet
GET ‘/tweets/id/mentions/users’ - gets all users mentioned in a tweet
GET ‘hashtag/:id/tweets’: gets all tweets associated with hashtag
```
