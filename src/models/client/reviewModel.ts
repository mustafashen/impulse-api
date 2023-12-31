import { knex } from "../../db/knex"
import { ReviewType, ReviewUpdateType } from "../../types/reviewTypes"

const ReviewModel = {
    	
	getReviewByCustomer: async (customer_id: string) => {
		try {
			const res = await knex('review').where({customer_id})
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
      return res
		} catch (error: any) {
				if(error.code) {
					return {Error: error.code}
				}
				return {Error: error}
		}
	},

	getReviewById: async (review_id: string) => {
		try {
			const res = await knex('review').where({id: review_id})
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
			console.log(review)
			const res = await knex('review').insert(review)
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
			const res = await knex('review').update(review.updates).where({id: review.id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"} 
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
			const res = await knex('review').delete().where({id: review_id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"} 
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