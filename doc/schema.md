## Schema

```
table Users
	primary key id: integer
	name: string
	email: string
	password: string 
	handle: string

table Hashtags
	primary key id: integer
	content: string

table Hashtag_Tweets
	primary key id: integer
	foreign key tweet_id: integer
	foreign key hashtag_id: integer

table Relationships
	primary key id: integer
	foreign key follower_id: integer
	foreign key followee_id: integer
	create_time: datetime

table Tweets
	primary key id: integer
	foreign key user_id: integer
	content: string
	foreign key parent_id: integer
	create_time: datetime

table Mentions
	primary key id: integer
	foreign key user_id: integer
	foreign key tweet_id: integer
```

## Constraints

```
Users
	has_many relationships, dependent: destroy
	has_many users through relationships
	has_many mentions
	has_many users through mentions
	has_many tweets, dependent: destroy
	validates :password, presence: true
	validates :name, presence: true
	validates :email, presence: true, uniqueness: true
	validates :handle, presence: true, uniqueness: true

Hashtags
	has_many hashtag_tweets, dependent: destroy
	has_many tweets through hashtag_tweets
	validates :content, uniqueness: true

Hashtag_Tweets
	belongs_to tweets
	belongs_to hashtags
	validates :tweet_id, presence: true
	validates :hashtag_id, presence: true

Relationships
	belongs_to users
	validates :follower_id, presence: true
	validates :followee_id, presence: true

Tweets
	belongs_to users
	has_many mentions, dependent: destroy
	has_many hashtag_tweets, dependent: destroy
	has_many hashtags through hashtag_tweets

Mentions
	belongs_to users
	belongs_to tweets
	validates :user_id, presence: true
	validates :tweet_id, presence: true
```

## Indexing
* Search for followers/followees of a specific user
&rarr; Index Relationships on follower_id and followee_id

* Search for tweets by a specific user
&rarr; Index Tweets on user_id

* Search for tweets by a hashtag
&rarr; Index Hashtag_Tweets on hashtag_id

* Search for mentions of a specific user
&rarr; Index Mentions on user_id

## Design

### Are intervening models necessary?
#### Self-referential models
Instead of having a Relationships table, we can probably enforce this with a self-referential Users model as follows:

```
Users
	has_many :followers, :class_name => “Users”, :foreign_key => “follower_id”
	has_many :followees, :class_name => “Users”, :foreign_key => “followee_id”
```

This way we can get a list of followers by calling @user.followers and list of followees by calling @user.followees. Not sure of the performance benefits compared to having a separate Relationships table and indexing on follower_id and followee_id.

Same thing goes for tweets when a tweet is a comment to another tweet:
```
Tweets
	has_one :parent, :class_name => “Tweets”, :foreign_key => “parent_id”
```

Something else I found: https://stackoverflow.com/questions/18473844/has-many-of-itself-through-something

#### Referencing other models
The many-to-many relationship between Hashtags and Tweets can be modeled without having a intervening model like Hashtag_Tweets using has-and-belongs-to-many association...Again not sure about the performance.
http://guides.rubyonrails.org/association_basics.html#the-has-and-belongs-to-many-association
