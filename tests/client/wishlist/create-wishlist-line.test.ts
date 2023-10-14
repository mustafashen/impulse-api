import request from 'supertest';
import {app} from '../../../src/app';
import { knex } from '../../../src/db/knex';
import { resetWishlistTable } from '../test-utils/resetTables';
import { createAccessToken } from '../test-utils/createAccessToken';

let accessToken = ''
beforeAll(async () => {
  await knex('wishlist').delete()

  await request(app)
  .post('/client/wishlist/create')
  .send({})
  .set({'Authorization': accessToken} )
})

afterAll(async () => {
  await resetWishlistTable()
})

describe("Create wishlist line", () => {

  it ('responds success to create wishlist line', async () => {

    const wishlistBefore = await knex('wishlist_line')
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
