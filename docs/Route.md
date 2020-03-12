# Route Table

|Route|Methode|Param|Succeed|Error|  
|:-:|:-:|:-:|:-:|:-:|
| /user/login |POST|`{ email : String, password : String}` | `{ connected : JWT }` | `{ message: String }`|
| /user/register |POST|`{ lastName: String, FirstName: String, email : String, password : String }`| `{User Model}` | `{ message: String }`|
| /devis |POST| `{houseArea : Float, installation : Boolean,  tuile : Float, }` | `{Devis Model}`| `{ message : String}`|
  /devis |GET|` `|`{message : String}` |{message: String}|
| /devis |PUT| `{houseArea : Float, installation : Boolean,  tuile : Float, }` | `{message: String}`| `{ message : String}`|
/ devis |DELETE|` `|`{message: String}` |`{message: String}`|