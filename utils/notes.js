//******************************************************************************* */

//Logical Operator : مثل $ و بعدها بيجي  or او and او ......

//$and	تطابق جميع الشروط	{ $and: [ { price: 10 }, { qty: { $gt: 5 } } ] }
//$nor	لا تطابق أي شرط	{ $nor: [ { price: 10 }, { qty: 5 } ] }
//$not	عكس الشرط	{ price: { $not: { $gt: 10 } } }

//******************************************************************************* */

//+ for one or more
//* zero or more
//? 0 / 1
//{} ranging
// \d digits
//\b for mathching a word it self cat only \bcat\b
//\B match a word like ooocatooo \Bcat\B
// group a pattern ([abc])
//|
//^ start with
//$ end with
//\s white space

//let expEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//let expSyriaPhone = /^(((00)|(\+))(963))\d{9}$/;

//let url = /^[a-zA-Z]+:\/\/[a-zA-Z0-9.-]+\.*[a-zA-Z]*$/ // url parser

//******************************************************************************* */
