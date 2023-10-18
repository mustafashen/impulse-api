import { ReviewModel } from "../../models/client/reviewModel"
import { ReviewType, ReviewUpdateType } from "../../types/reviewTypes"
const { v4: uuidv4 } = require('uuid')
import { validateReviewByCustomerParams, validateReviewByProductParams, validateReviewCreateParams, validateReviewDeleteParams, validateReviewUpdateParams,  } from "../../utils/validation/client/reviewValidation"

const ReviewController = {
	
	getReviewByCustomer: async (body: {review: {customer_id: string}, id: string}) => {
		try {
			const {review} = body
			if (!review) throw "4000"

			const valid = validateReviewByCustomerParams(review)
			if (!valid) throw "4022"

			const resData = await ReviewModel.getReviewByCustomer(review.customer_id)
			if (resData.Error) throw resData.Error
			return resData

		} catch (error: any) {
			console.log('reviewController:', error)
			return {Error: error}
		}
	},

	getReviewByProduct: async (body: {review: {product_id: string}, id: string}) => {
		try {
			const {review} = body
			if (!review) throw "4000"

			const valid = validateReviewByProductParams(review)
			if (!valid) throw "4022"

			const resData = await ReviewModel.getReviewByProduct(review.product_id)
			if (resData.Error) throw resData.Error
			return resData

		} catch (error: any) {
			console.log('reviewController:', error)
			return {Error: error}
		}
	},

	createReview: async (body: {id: string, review: ReviewType}) => {
		try {
			const {review} = body
			if (!review) throw "4000"

			review.id = uuidv4()

			const valid = validateReviewCreateParams(review)
			if (!valid) throw "4022"

			if (review.customer_id !==  body.id) throw "4003"

			const resData = await ReviewModel.createReview(review)
			if (resData.Error) throw resData.Error
			return resData

		} catch (error: any) {
			console.log('reviewController:', error)
			return {Error: error}
		}
	},

	updateReview: async (body: {id: string, review: ReviewUpdateType}) => {
		try {
			const {review} = body
			if (!review) throw "4000"

			const valid = validateReviewUpdateParams(body.review)
			if (!valid) throw "4022"

			const targetReview = await ReviewModel.getReviewById(review.id)
			if (targetReview[0].customer_id !==  body.id) throw "4003"

			const resData = await ReviewModel.updateReview(review)
			if (resData.Error) throw resData.Error
			return resData

		} catch (error: any) {
			console.log('reviewController:', error)
			return {Error: error}
		}
	},

	deleteReview: async (body: {id: string, review: {id: string}}) => {
		try {
			const {review} = body
			if (!review) throw "4000"

			const valid = validateReviewDeleteParams(body.review)
			if (!valid) throw "4022"

			const targetReview = await ReviewModel.getReviewById(review.id)
			if (targetReview[0].customer_id !==  body.id) throw "4003"

			const resData = await ReviewModel.deleteReview(review.id)
			if (resData.Error) throw resData.Error
			return resData

		} catch (error: any) {
			console.log('reviewController:', error)
			return {Error: error}
		}
	},

}

export {
    ReviewController
}