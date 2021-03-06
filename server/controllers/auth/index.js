const UserManagement = require('../../services/UserManagement');
const createError = require('http-errors');

async function registerUser(req, res, next) {
  try {
    let response = {
      user: null,
      addressAvailable: true
    }
    const userManager = new UserManagement(req, 'registration');
    const addressAlreadyTaken = await userManager.addressInUse();
    if(addressAlreadyTaken) {
      return res.status(409).json({...response, addressAvailable: false});
    }
    const user = await userManager.saveUser();
    user.loggedIn = false;
    return res.json({...response, user});
  } catch (err) {
    return next(err);
  }  
}

async function loginUser(req, res, next) {
  try {
    const userManager = new UserManagement(req, 'login');
    const [user, jwt] = await Promise.all([userManager.tryGetUserData(), userManager.tryGenerateToken()]);
    if(!user || !jwt) {
      return res.json({ user: null });
    }
    //options should be enabled in production for security concerns (httpOnly, secure)
    res.cookie('jsonWebToken', jwt);
    user.loggedIn = true;
    return res.json({ user });
   } catch (err) {
    return next(err);
   }
}

//TODO ovo se ne smije pozivati za svaki request niposto, jer svaki put cupa usera iz baze, bez potrebe + treba usera u memoriju ubaciti
async function authentificateUser(req, res, next) {
  try {
    req.user = await UserManagement.tryGetUserData(req, true);
    return next();
  } catch(err) {
    return next(err);
  }
}

function checkAuthentificated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    return next(createError(401, 'Unauthorized.'));
  }
}

function checkUserPermissions(manipulationType) {
  return async (req, res, next) => {
    const hasPermission = await UserManagement.doesUserHasPermision(req, manipulationType);
    if(hasPermission) {
      return next();
    } else {
      return next(createError(401, 'Unauthorized.'));
    }
  }
}

function logoutUser(req, res, next) {
  if(req.cookies.jsonWebToken) {
    res.clearCookie('jsonWebToken');
  }
  return res.json({user : null});
}

module.exports = {
  registerUser,
  loginUser,
  authentificateUser,
  checkAuthentificated,
  checkUserPermissions,
  logoutUser
}