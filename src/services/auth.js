import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import UserModel from '../models/user';
import * as jwt from 'jsonwebtoken';
import config from '../config.json';

export default class AuthService {
  constructor() { }

  async Register(email, password) {
    const userRecord = await UserModel.findOne({ email });
    console.log('Finding user record...');
    if (userRecord) {
      throw new Error('User has exist');
    }

    // todo...
    // 往数据库插入一条记录
    // 校验邮箱的有效性

  }

  async Login(email, password) {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      // throw new Error('User not found')
      return {
        code: 501,
        success: false,
        message: '用户不存在'
      }
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        // throw new Error('Incorrect password')
        return {
          code: 501,
          success: false,
          message: '密码错误'
        }
      }
    }

    return {
      code: 200,
      success: true,
      data: {
        email: userRecord.email,
        name: userRecord.name,
        token: this.generateJWT(userRecord),
      }
    }
  }
  async LoginAs(email) {
    const userRecord = await UserModel.findOne({ email });
    console.log('Finding user record...');
    if (!userRecord) {
      throw new Error('User not found');
    }
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    }
  }

  async SignUp(email, password, name) {
    const userRecord = await UserModel.findOne({ email });
    if (userRecord) {
      // throw new Error('User has exist');
      return {
        code: 500,
        success: false,
        message: '邮箱已注册'
      }
    } else {
      const salt = randomBytes(32);
      const passwordHashed = await argon2.hash(password, { salt });

      const userRecord = await UserModel.create({
        password: passwordHashed,
        email,
        salt: salt.toString('hex'),
        name,
      });
      const token = this.generateJWT(userRecord);
      console.log(userRecord, token)

      return {
        code: 200,
        success: true,
        data: {
          email: userRecord.email,
          name: userRecord.name,
          token,
        }
      }
    }

  }

  generateJWT(user) {

    return jwt.sign({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    }, config.secret, { expiresIn: config.expiresIn });
  }

}