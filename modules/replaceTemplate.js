module.exports  = (temp, product) => {                                     // it's not good practice to directly manipulate the argument that we pass into a function And that's why I created a new variable output with let.                                     
    let output = temp.replace(/{%PRODUCT-NAME%}/g, product.productName);   // Trick :- not use quotes, use regular expression, for placeholders like '{%PRODUCT-NAME%}' instead of using quotes, we will use regular-expression. that's bcoz there might be multiple instances of this placeholders. The trick is wrap in a regular expression & use the g-flag then on it, which means global,  so this will make it so that all these placeholders will get replaced & not the just first-one that occurs.      (Here, this will replaces the product name.)
    output = output.replace(/{%PRICE%}/g, product.price);                  // Here, this price placeholder will get replaced by the price coming from api.
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DISCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;       
   
}

// Note :- In each module we have access to a variable called module & on there we can set the export's property. And that we then set to whatever we wana export.
// here we wana export this function :- so basically we are going to assign to this export property on module is simply this anonymuus function. (right now this function don't have a name and we this we assigned to this export property on the module object)
// Again that is an object that we have access to each & every Nodejs module And again later we will learn how actually happens this behind the scenes.
