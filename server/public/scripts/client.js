console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

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
      if( response[i].ready_to_transfer = false ){
        readyButton = '<button>Ready for Transfer</button>'
      }
      el.append( 
        `<tr>
          <td>${response[i].name}</td>
          <td>${response[i].age}</td>
          <td>${response[i].name}</td>
          <td>${response[i].ready_to_transfer}</td>
          <td>${response[i].notes}</td>
        </tr> ${readyButton}`)
    }
  }).catch( function( err ){
    console.log( err );
    alert( 'error getting koalas');
  })// end AJAX
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
