export interface JwtRequest {
    /**
     * 
     * @type {string}
     * @memberof JwtRequest
     */
    'password'?: string;
    /**
     * 
     * @type {string}
     * @memberof JwtRequest
     */
    'username'?: string;
}

export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'createdAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'createdBy'?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'firstName'?: string;
    /**
     * 
     * @type {number}
     * @memberof User
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'updatedAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'updatedBy'?: string;
}