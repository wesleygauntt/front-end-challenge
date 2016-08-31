
function domobj(){
  var self        =this;
  self.products   = [];

  /*
    Task: The way we load products is buggy and suboptimal. Try refactoring it 
    to work better and tell us why you did what you did.

    Solution: This was a multipart solution. The first step was to create a callback
    parameter that would get called once we were done getting our products in 'getproducts'.
    The second half of the solution came from editing updateproducthtml. This function was 
    ammended to work with a chain of promises. We start by getting the product template (this
    was changed from being called for every iteration in the updatehtml loop), then use that
    template to get the product html. Once the loop is complete, we continue the chain to finally
    update our dom.
  */

  self.getproducts = function(url, callback){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
        callback();
    });
  }
    
  self.updateproducthtml = function(){
    $.get('product-template.html').then(function(template){
      for( i=0; i< self.products.length ; i++){
        self.products[i].updatehtml(template);
      }
    }).then(function(){
      self.updatedom();
    })

  }
  
  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      /*
        Task: Convert the page to use Bootstrap to make it responsive, 
        so when it's viewed on a mobile device there's no left-right scrolling and 
        it still looks ok visually (i.e. it's easy to read)

        Solution: Used Bootstrap grid system to create a responsive design.
        Removed column logic and classes for a simpler solution. See product-template.html
        to view bootstrap column updates.
      */
      thishtml += self.products[i].htmlview;
    }
    $("#content").append(thishtml)

    //Listener function to accomodate client side rendering of products to show overlay.
    listenForProductHover();
    //Listener function to accomodate client side rendering of products to remove products.
    listenForProductRemove();
  }
  
}

function productobj(product, i){
  var self = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  self.custom_class = "col"+ ((i % 3) +1)
  self.description  = product.description;
  
  self.updatehtml= function(template){
    self.htmlview = template.replace('{image}', self.photo)
      .replace('{title}', self.title)
      .replace('{tagline}', self.tagline)
      .replace('{url}', self.url)
      .replace('{custom_class}', self.custom_class)
      .replace('{description}', self.description);
  }
}

/*
  Task: We'd like to update the UI so that whenever you mouseover a product, an overlay comes across it with the description.

  Solution: Use the jQuery hover function to listen for mouseover events. Use slideDown/slideUp to show/hide product overlay div.
*/
function listenForProductHover(){
  $(".product-container").hover(function(){
    $(this).find(".product-overlay").slideDown();
  }, function(){
    $(this).find(".product-overlay").slideUp();
  });
}

/*
  Task: Add an "X" in the top right corner of each product. When you click on it, have it remove itself from the page.

  Solution: Using a glyphicon to represent our X, get it's parent's (overlay) parent (product), and use jQuery's remove method.
  See product-template.html to check where our remove 'button' (actually a span) was added.
*/
function listenForProductRemove(){
  $('.remove-product').on('click', function(){
    $(this).parent().parent().remove();
  })
}

var page=new domobj();
page.getproducts('/products', function(){
  setTimeout("console.log('building html'); page.updateproducthtml();",20);
});

