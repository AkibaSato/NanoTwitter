redis-server
pg_ctl -D "$0" start
node index.js
cd ../../ntUserService
node index.js
cd ../../ntTweetService
node index.js
cd ../../ntSearchService
node index.js
