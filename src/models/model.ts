export interface JwtRequest {
  /**
   *
   * @type {string}
   * @memberof JwtRequest
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof JwtRequest
   */
  username?: string;
}

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;  
}

export interface AuthUser {
  /**
   *
   * @type {string}
   * @memberof AuthUser
   */
  sub?: string;
  /**
   *
   * @type {string}
   * @memberof AuthUser
   */
  exp?: string;
  /**
   *
   * @type {string}
   * @memberof AuthUser
   */
  iat?: string;
}
