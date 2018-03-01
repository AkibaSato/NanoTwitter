
module.exports = function(app){

    app.get('/test/status',  function (req, res) {
// TODO: How many users, follows, and tweets are there What is the TestUser’s id
    });

    app.get('/test/version',  function (req, res) {
// TODO: Displays the version number of this build, Useful as a way to make sure whether you have the latest, Disaplays version as json
    });

    app.post('/test/reset/all', function (req, res) {
      // TODO: Delete all users, tweets, follows, recreate TestUser


    });
    app.post('/test/reset/testuser', function (req, res) {
      // TODO: Deletes and recreates TestUser, including all his tweets, follows, and removes him from any other users’ follow list.

    });
    app.post('/test/reset/standard?tweets=n', function (req, res) {


    });
    app.post('/test/users/create?count=u&tweets=c', function (req, res) {


    });
    app.post('/test/user/u/tweets?count=t', function (req, res) {


    });
    app.post('/test/user/u/follow?count=n', function (req, res) {


    });

    app.post('/test/user/follow?count=n', function (req, res) {



    });

    //other routes..
}
