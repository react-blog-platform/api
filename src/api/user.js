import AuthService from '../services/auth';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/auth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

export default (app) => {

  app.post('/user/register', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.Login(email, password);
      return res.status(200).json({ user, token }).end();
    } catch(e) {
      return res.json(e).status(500).end();
    }
  })

  app.post('/user/login', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const data = await authServiceInstance.Login(email, password);
      return res.status(200).json(data).end();
    } catch(e) {
      return res.json(e).status(500).end();
    }
  })

  app.post('/user/login-as', isAuth, attachCurrentUser, checkRole('admin'), async (req, res) => {
    try {
      const email = req.body.user.email;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LoginAs(email);
      return res.status(200).json({ user, token }).end();
    } catch(e) {
      return res.json(e).status(500).end();
    }
  })

  app.post('/user/signup', async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password } = req.body;
      const authServiceInstance = new AuthService();
      const data = await authServiceInstance.SignUp(email, password, name);
      return res.json(data).status(200).end();
    } catch (e) {
      return res.json(e).status(500).end();
    }
  })

};