
$(function() {
  attachListeners();
})

function attachListeners() {

	// check for when pagination links are clicked
	$(document).on("click", ".pagination a", function(e) {
		
		$thisHref = this.href

		// get watches stored in the database		
		$.getJSON(this.href).success(function(json){
			// clear the div html's of previous watches data
		  	$(".watches").html("")
		  	$(".watches_paginate").html("")
		  	// iterate over each watch within json and add to the DOM
		  	json.forEach(function(watch){
		  		// append each watch data to the watches div
		  		$(".watches").append(`<h5 class="text-success">${watch.watch_maker}: <b><a href="/watches/${watch.id}">${watch.watch_name}</a></b></h5>`)
			})
			// execute the related js.erb file in the watches view
			// to set pagination entries (index.js.erb / most_maker.js.erb)
			$.get($thisHref, null, null, "script")
		})
		e.preventDefault()
	})

	$("a.show_watch").on('click', () => showWatch())
}

function showWatch() {
	alert("Show watch!")
	e.preventDefault()
}
