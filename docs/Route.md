# Route Table

|Route|Methode|Param|Succeed|Error|  
|:-:|:-:|:-:|:-:|:-:|
| /user/login |POST|`{ email : String, password : String}` | `{ connected : JWT }` | `{ message: String }`|
| /user/register |POST|`{ lastName: String, FirstName: String, email : String, password : String }`| `{User Model}` | `{ message: String }`|
|/devis/create-devis |POST| `{area : Float, installation : Boolean,  tuile : Float, }` | `{Devis Model}`| `{ message : String}`|