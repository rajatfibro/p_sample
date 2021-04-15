var db = require('../db.js')


function getUser (u, p) {
  return new Promise(function (resolve, reject) {
    let query = `select * from users where name = ? and password = ?`

    db.get().query(query,[u,p], function (err, rows) {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}

async function allowIfLoggedin(req, res, next) {
  // check user auth

  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  var base64Credentials = req.headers.authorization.split(' ')[1];
  var credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  var [username, password] = credentials.split(':');

  let user =  await getUser(username, password)

  if(!user.length ){
    return res.send ({
      status: 400,
      success: false,
      error: ['User Not found'],
      data: []
  })
  }

  // setSession(req, user)
  req.session.user_id = user[0].id;
  req.session.name = user[0].name;

next();


}








// let setSession = (req,user ) => {


//   req.session.id = user[0].id;
//   req.session.name = user[0].name;
//  // req.session.balance_tests_lightliverfast = '10';

//   return req
// };

module.exports = {
  allowIfLoggedin: allowIfLoggedin,
  // setSession: setSession
};
