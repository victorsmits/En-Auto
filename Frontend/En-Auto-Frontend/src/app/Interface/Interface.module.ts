export interface Devis {
  _id?: String,
  id_user?: String,
  structural_cost?: Number,
  routing_cost?: Number,
  tank_cost?: Number,
  consum?: Number,
  water_cost?: Number,
  water_volume?: Number,
  roof_area?: Number,
  final_save? : Number,
  rentability?: Number,
  created_at?: Date,
}

export interface User {
  _id : String,
  lastName: String,
  firstName: String,
  email: String,
}

export interface WaterCost {
  _id: Number,
  postCode: Number,
  cost: Number,
}
