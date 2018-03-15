### GETs

```
GET '/' : Route page
	If user is logged in:
		List of the most recent 50 tweets of users you follow
		Tweet box => Redirects to POST '/tweets/new' upon submit
		Mini-profile
	If user is logged out:
		Redirects to GET '/tweets/recent'

GET '/tweets/recent'
	List of the most recent 50 tweets from any user
	Login link => Redirects to '/login' upon click

GET '/user/register'
	Registration prompt => Redirects to POST ‘/user/new’ upon submit

GET '/login'
	Login prompt => Redirects to POST '/login' upon submit
	Register link => Redirects to GET '/user/register' upon click

GET '/logout'
	Logouts user

GET '/user/:id'
	Mini-profile
	Link to 'Recent tweets from user' => Redirects to GET '/user/:id/tweets' upon click
	Link to 'Recent tweets from followees' => Redirects to GET ‘/user/:id/followee_tweets' upon click
	Link to 'Followers' => Redirects to GET '/user/:id/followers' upon click
	Link to 'Followees' => Redirects to GET '/user/:id/followees' upon click

	If user is logged in and user is not self:
		Button to follow user => Redirects to POST ‘/user/id/follower/new’ upon click

GET '/user/:id/tweets'
	List of the 50 most recent tweets by user

GET '/user/:id/followers'
	List of the user's followers

GET '/user/:id/followees'
	List of the user's followees

GET '/user/:id/followee_tweets'
	List of the 50 most recent tweets from the user's followees

GET '/search'
	Search box
	Button to query => Redirects to GET '/search/results' upon click

GET '/search/results'
	Displays search results

GET /tweets/:id
	Displays tweet with id
```

### POSTs

```
POST '/login'
	Checks credentials and posts user info to cookies => Redirects to GET '/'

POST '/user/register'
	Create new account/user
	Logs in user => Redirects to '/'

POST ‘/user/id/follow’
	User newly follows another user

POST '/tweets/new'
	Creates a new tweet
```
