console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#viewKoalas' ).on( 'click', '.deleteButton', deleteKoala );
  $( '#viewKoalas' ).on( 'click', '.ready_to_transferButton', transferKoala ); // dynamically created button
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let koalaToSend = {
      name: $( '#nameIn' ).val(),
      age: $( '#ageIn' ).val(),
      gender: $( '#genderIn' ).val(),
      ready_to_transfer: $( '#readyToTransferIn' ).val(),
      notes: $( '#notesIn' ).val()
    };
    console.log( koalaToSend );
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}// end setupClickListeners

function deleteKoala(){
  console.log( 'in deleteKoala', $( this ).data( 'id' ) );
  $.ajax({
    method: 'DELETE',
    url: `/koala_router?id=${ $( this ).data( 'id' ) }`
  }).then( function( response ){
    console.log( response );
    getKoalas();
  }).catch( function( err ){
    console.log( err );
    alert( 'error deleting koala' );
  })// end DELETE
}// end deleteKoala

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koala_router'
  }).then( function( response ){
    console.log( response );
    //add ready to transfer conditional here
    //append Koalas here
    let el = $( '#viewKoalas' );
    el.empty();
    for( let i=0; i<response.length; i++ ){
      let readyButton = '';
      if( response[i].ready_to_transfer === false ){
        readyButton = `<button class="ready_to_transferButton" data-id="${response[i].id}">Ready to Transfer</button>`
      }
      el.append( 
        `<tr>
          <td>${response[i].name}</td>
          <td>${response[i].age}</td>
          <td>${response[i].gender}</td>
          <td>${response[i].ready_to_transfer}</td>
          <td>${response[i].notes}</td>
          <td>${readyButton}</td>
          <td><button class="deleteButton" data-id="${response[i].id}">Remove Koala</button></td>
        </tr>`)
    }
  }).catch( function( err ){
    console.log( err );
    alert( 'error getting koalas');
  })// end AJAX
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to post koalas
  $.ajax({
    method: 'POST',
    url: '/koala_router',
    data: newKoala
  }).then( function( response ){
    console.log( 'back from POST:', response );
    //run getKoalas to dispaly new koala on the DOM
    getKoalas();
  }).catch( function( err ){
    console.log( err );
    alert( 'error saving koala' );
  })// end POST
}// end saveKoala

function transferKoala(){
  console.log( 'in transferKoala', $( this ).data( 'id' ) );
  $.ajax({
    method: 'PUT',
    url: `/koala_router?id=${ $( this ).data( 'id' ) }`
  }).then( function( response ){
    console.log( response );
    getKoalas();
  }).catch( function( err ){
    console.log( err );
    alert( 'error marking koala for transfer' );
  })
}// end transferKoala