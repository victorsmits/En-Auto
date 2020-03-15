# Route Table

|Route|Methode|Param|Succeed|Error|  
|:-:|:-:|:-:|:-:|:-:|
| /user/login |POST|`{ email : String, password : String}` | `{ connected : JWT }` | `{ message: String }`|
| /user/register |POST|`{ lastName: String, FirstName: String, email : String, password : String }`| `{User Model}` | `{ message: String }`|
| /devis |POST| `{cout_structure : Number, cout_acheminement : Number,  prix_cuve: Number, conso : Number, superficie : Number }` | `{message: Boolean}`| `{ message : String}`|
| /devis |GET|`{id_user : String}`|`{Devis Model}` |`{message: String}`|
| /devis |PUT| `{_id : String, cout_structure : Number, cout_acheminement : Number,  prix_cuve: Number, conso : Number, superficie : Number }` | `{message: String}`| `{ message : String}`|
| /devis |DELETE|`{_id : String}`|`{message: Boolean}` |`{message: String}`|
| /watercost |POST| `{postCode: Number, cost: Number }` | `{WaterCost Model}`| `{ message : String}`|
| /watercost |GET|`{postCode: Number}`|`{WaterCost Model}` |`{message: String}`|
| /watercost |PUT| `{_id : String, postCode: Number, cost: Number }` | `{message: String}`| `{ message : String}`|
| /watercost |DELETE|`{_id : String}`|`{message: String}` |`{message: String}`|
