import ArticleService from '../services/article';
import isAuth from '../middlewares/auth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

export default (app) => {

  app.post('/article/post', isAuth, attachCurrentUser, async (req, res) => {

    const { title, desc, content, tags } = req.body;
    try {
      const articleServiceInstance = new ArticleService();
      
      // return res.status(200).json(data).end();
    } catch (e) {
      return res.json(e).status(500).end();
    }
  })
}