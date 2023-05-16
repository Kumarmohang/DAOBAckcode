import { NextFunction, Request, Response } from 'express';

/**
 * This class Contains method of Home Page
 *
 * @class
 */
class IndexController {
  /**
   * @param req as request
   * @param res as response
   * @param next as function passing parameters to next
   * @function
   * @returns This return response of 200 when hit to "/" route else send error to next middleware
   */
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
