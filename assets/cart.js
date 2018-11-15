$(".edit-cart").on("click", function(event){
   event.preventDefault()
   let line = $(this).data("line");
   let quantity = $("line_quantity_"+line).val();   

   console.log("entre aqui"); 
   location.href="/cart/change?line="+line+"&amp;quantity="+quantity;
   //$("#cart-form").submit()
})