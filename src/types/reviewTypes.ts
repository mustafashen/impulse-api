
interface ReviewType {
	rating: number,
	comment: string,
	product_id: string,
	customer_id: string
}

interface ReviewUpdateType {
	id: string,
	updates: {
		rating: number,
		comment: string,
	}
}

export { 
	ReviewType,
	ReviewUpdateType
}