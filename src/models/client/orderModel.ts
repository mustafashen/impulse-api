import { knex } from "../../db/knex"

const OrderModel = {
    createOrder: async (order: CreateOrderType) => {
			try {
				const res = await knex('order').insert({...order})
				if (res.length === 0 || res === 0) throw "4004" 
				return res  
			} catch (error: any) {
				console.log(error)
				if(error.code) return {Error: error.code}
				return {Error: error}
			}
    },

		updateStatusPaid: async (checkout_id: string) => {
			try {
				const res = await knex('order').where({checkout_id}).update({status: 'paid'})
				if (res.length === 0 || res === 0) throw "4004" 
				return res  
			} catch (error: any) {
					if(error.code) {
							return {Error: error.code}
						}
						return {Error: error}
			}
		},

		updateStatusShipped: async (shipment_id: string) => {
			try {
				const res = await knex('order').update({status: 'shipped'}).where({shipment_id})
				if (res.length === 0 || res === 0) throw "4004" 
				return res  
			} catch (error: any) {
					if(error.code) {
							return {Error: error.code}
						}
						return {Error: error}
			}
		}
}

export {
    OrderModel
}