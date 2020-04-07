export interface Devis {
  _id?: String,
  id_user?: String,
  address?: String,
  code_postal?: Number,
  structural_cost?: Number,
  routing_cost?: Number,
  tank_cost?: Number,
  total_cost?:Number ,
  consum?: Number,
  water_cost?: Number,
  water_volume?: Number,
  roof_area?: Number,
  vol_storage?: Number,
  final_save? : Number,
  rentability?: Number,
  created_at?: Date,
  tiles_cost?:Number,
  tiles_number?:Number,
  gutter_length?:Number,
  gutter_cost?:Number,
  tank_dist?:Number,
  tank_type?:String,
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

export interface Precipitation {
  _id?: String,
  postCode?: Number,
  rain?: Number,
}
