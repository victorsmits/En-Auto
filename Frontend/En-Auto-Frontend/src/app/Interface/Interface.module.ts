export interface Devis {

}

export interface User {
  _id : Number,
  lastName: String,
  firstName: String,
  email: String,
  id_devis: [Number],
}
