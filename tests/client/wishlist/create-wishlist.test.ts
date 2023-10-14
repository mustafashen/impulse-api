import request from 'supertest';
import {app} from '../../../src/app';
import { knex } from '../../../src/db/knex';
import { resetWishlistTable } from '../test-utils/resetTables';
import { createAccessToken } from '../test-utils/createAccessToken';

let accessToken = ''
beforeAll(async () => {
  accessToken = await createAccessToken()
})

afterAll(async () => {
  resetWishlistTable()
})
describe("Create wishlist", () => {

  it ('responds success to create wishlist', async () => {

    const wishlistBefore = await knex('wishlist')
    expect(wishlistBefore).toHaveLength(0)

    const res = await request(app)
    .post('/client/wishlist/create')
    .send({})
    .set({'Authorization': accessToken} )
    expect(res.status).toBe(201)

    const wishlistAfter = await knex('wishlist')
    expect(wishlistAfter).toHaveLength(1)

  })
})
