import { knex } from "../../db/knex"

const ShipmentModel = {

		createShipment: async (shipment: CreateShipmentType) => {
			try {
				const res = await knex('shipment').insert({...shipment})
				if (res.length === 0 || res === 0) throw "4004" 
				return res  
			} catch (error: any) {
					console.log(error)
					if(error.code) return {Error: error.code}
					return {Error: error}
			}
		},

    addShipment: async (shipment: UpdateShipmentType) => {
			try {
				const res = await knex('shipment').update(shipment.updates).where({id: shipment.id})
				if (res.length === 0 || res === 0) throw "4004" 
				return res  
			} catch (error: any) {
					console.log(error)
					if(error.code) return {Error: error.code}
					return {Error: error}
			}
		},
}

export {
  ShipmentModel
}