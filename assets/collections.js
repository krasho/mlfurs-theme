$(".dropdown-list__menu-link").on("click", function(event){
   event.preventDefault()
   let newValue = $(this).data('value')
   $("#sort_by").val(newValue)
   $("#collection-form").submit()
})


$("#collection-form").on("submit", function(event) {    
    let url = $(this).attr( 'action' )
    let tags = []
    $(".checkbox_tags").each(function(){
       if ($(this).is(":checked")) {           
           tags.push($(this).val())
       }
    })

    url = url + "/"+tags.join("+")
    event.preventDefault()

    location.href = url    
})