# Route Table

|Route|Param|Succeed|Error|  
|----------------|---------------|-------------------|-----------------|
| /user/login |`{ email : String, password : String}` | `{ connected : JWT }` | `{ message: String }`|
| /user/register |`{ lastName: String, FirstName: String, email : String, password : String }`| `{User Model}` | `{ message:String }`|
