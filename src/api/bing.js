import request from 'request';

export default (app) => {
  app.get('/bing/bgImage', (req, res) => {
    console.log(req.query)
    request({
      url: `https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=${req.query.count || 1}&mkt=${req.query.local || 'zh-CN'}`,   // 请求的URL
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const result = {
          success: true,
          code: 200,
          data: JSON.parse(body).images
        }
        res.json(result)
      }
    });
  });
}