
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
    });
  }
    
  self.updateproducthtml = function(){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
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

    //Listener function to accomodate client side rendering of products.
    listenForProductHover();
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
  
  self.updatehtml= function(){
    $.get('product-template.html', function(template){
      self.htmlview = template.replace('{image}', self.photo)
        .replace('{title}', self.title)
        .replace('{tagline}', self.tagline)
        .replace('{url}', self.url)
        .replace('{custom_class}', self.custom_class)
        .replace('{description}', self.description);
    });
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

var page=new domobj();
page.getproducts('data.json');
setTimeout("console.log('building html');page.updateproducthtml();",20);
setTimeout("page.updatedom()",50)

