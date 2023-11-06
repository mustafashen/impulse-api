import { knex } from "../../db/knex"

const initModel_cms = {
  initModel: async () => {
    try {

      await knex.schema.createTable('staff', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('name').notNullable()
        t.string('email').notNullable()
        t.string('password').notNullable()
        t.bool('isAdmin').defaultTo(false).notNullable()
      })

      await knex.schema.createTable('staff_token', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('token').notNullable()
        t.uuid('staff_id').notNullable()

        t.foreign('staff_id').references('id').inTable('staff').onDelete('CASCADE').onUpdate('CASCADE')
      })
      
      await knex.schema.createTable('customer', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('name').notNullable()
        t.string('last_name').notNullable()
        t.string('email').notNullable()
        t.string('password').notNullable()
        t.string('phone').notNullable()
        t.date('birth_date')
        t.string('gender')
        t.bool('is_active').defaultTo(false).notNullable()
      })

      await knex.schema.createTable('customer_token', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('token').notNullable()
        t.uuid('customer_id').notNullable()

        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
      })
      
      await knex.schema.createTable('address', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('title').notNullable()
        t.string('state')
        t.string('city').notNullable()
        t.string('district').notNullable()
        t.string('zip_code').notNullable()
        t.string('country').notNullable()
        t.text('address').notNullable()
        t.string('phone').notNullable()
        t.uuid('customer_id').notNullable()

        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('category', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('name').notNullable()
        t.uuid('parent_id').notNullable()

        t.foreign('parent_id').references('id').inTable('category').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('cart', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('location').notNullable()
        t.bool('order_placed').defaultTo(false).notNullable()
        t.uuid('customer_id').notNullable()
        t.uuid('address_id').notNullable()

        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('address_id').references('id').inTable('address').onDelete('SET NULL').onUpdate('CASCADE')
      })

      await knex.schema.createTable('product', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('name').notNullable()
        t.text('description').notNullable()
        t.integer('price').unsigned().notNullable()
        t.integer('stock').unsigned().defaultTo(0).notNullable()
        t.json('features')
        t.uuid('category_id').notNullable()

        t.foreign('category_id').references('id').inTable('category').onDelete('SET NULL').onUpdate('CASCADE')
      })

      await knex.schema.createTable('cart_line', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.uuid('cart_id').notNullable()
        t.uuid('product_id').notNullable()
        t.integer('quantity').unsigned().notNullable()

        t.foreign('cart_id').references('id').inTable('cart').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('product_id').references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('shipment', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.string('tracking_number')
        t.string('carrier_name')
        t.uuid('address_id')

        t.foreign('address_id').references('id').inTable('address').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('order', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.enu('status',['pending', 'paid', 'shipped', 'complete'])
        t.integer('total_amount').unsigned().defaultTo(0).notNullable()
        t.string('checkout_id').notNullable()
        t.uuid('customer_id').notNullable()
        t.uuid('cart_id').notNullable()
        t.uuid('shipment_id').notNullable()

        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('cart_id').references('id').inTable('cart').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('shipment_id').references('id').inTable('shipment').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('review', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.enu('rating',[1, 2, 3, 4, 5])
        t.text('comment')
        t.uuid('product_id').notNullable()
        t.uuid('customer_id').notNullable()

        t.foreign('product_id').references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('wishlist', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.uuid('customer_id').notNullable()

        t.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE').onUpdate('CASCADE')
      })

      await knex.schema.createTable('wishlist_line', (t: any) => {
        t.uuid('id').notNullable().primary().unique()
        t.timestamps()
        t.uuid('wishlist_id').notNullable()
        t.uuid('product_id').notNullable()

        t.foreign('wishlist_id').references('id').inTable('wishlist').onDelete('CASCADE').onUpdate('CASCADE')
        t.foreign('product_id').references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE')
      })

      return {Success: true}
    } catch (error: any) {
      console.log('createInitModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }
  }
}

export {
  initModel_cms
}