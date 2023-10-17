import { knex } from "../../db/knex"
import { ReviewType, ReviewUpdateType } from "../../types/reviewTypes"

const ReviewModel = {
    	
	getReviewByCustomer: async (customer_id: string) => {
		try {
			const res = await knex('review').where({customer_id})
			if (res.length === 0 || res === 0) throw "4004" 
      return res
		} catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
		}
	},

	getReviewByProduct: async (product_id: string) => {
		try {
			const res = await knex('review').where({product_id})
			if (res.length === 0 || res === 0) throw "4004" 
      return res
		} catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
		}
	},

	createReview: async (review: ReviewType) => {
		try {
			const res = await knex('cart').insert(review)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
		} catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
		}
	},

	updateReview: async (review: ReviewUpdateType) => {
		try {
			const res = await knex('review').where({id: review.id}).update(review.updates)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
		} catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
		}
	},

	deleteReview: async (review_id: string) => {
		try {
			const res = await knex('review').where({id: review_id}).delete()
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
		} catch (error: any) {
			if(error.code) {
					return {Error: error.code}
			}
			return {Error: error}
		}
	},
}

export {
    ReviewModel
}