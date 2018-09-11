/**
 * An Handlebars helper to format numbers
 * 
 * This helper has these three optional parameters:
 *  decimalLength int => The length of the decimals
 *  thousandsSep char => The thousands separator
 *  decimalSep char   => The decimals separator
 * 
 * Demo: http://jsfiddle.net/DennyLoko/6sR87/
 */
Handlebars.registerHelper('numberFormat', function (value, options) {
    // Helper parameters
     let dl = options.hash['decimalLength'] || 2
     let ts = options.hash['thousandsSep'] || ','
     let ds = options.hash['decimalSep'] || '.';

    // Parse to float
     let val = parseFloat(value)

    // The regex
     let re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')'

    // Formats the number with the decimals
     let num = val.toFixed(Math.max(0, ~~dl))

    // Returns the formatted number
    return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts)
})

// execute the watchListeners function when the document is ready
$(function() {
  watchListeners()
})

function watchListeners() {

	$(document).on("click", ".pagination a", function(e) {	// pagination div generated by will_paginate

		$href = this.href
		pagination(e, $href)
	})

	$(document).on("click", "a.show_watch", function(e) {	
		$(this).css("color", "red")
		$href = this.href
		// handlebars process
		let templateSource = $("#watch-template").html()
		let template = Handlebars.compile(templateSource)

		showWatch(e, $href, template)
	})

}
 
function pagination(e, $href) {
	// get watches stored in the database
	$.getJSON($href)
	.done(function(json){
		// clear the div html's of previous watches data
	  	$(".watches").html("")
	  	$(".watches_paginate").html("")
	  	// iterate over each watch within json and add to the DOM
	  	json.forEach(function(watch){
	  		// append each watch data to the watches div
	  		$(".watches").append(`<h5 class="text-success">${watch.watch_maker}: <b><a href="/watches/${watch.id}">${watch.watch_name}</a></b></h5>`)
		})
		// execute the related js.erb file in the watches view to set pagination entries
		// (index.js.erb / search_watches.js.erb / find_maker.js.erb / most_maker.js.erb)
		$.get($href, null, null, "script")
	})
	.fail(function(jqxhr, textStatus, errorThrown){
	    showError(jqxhr, textStatus, errorThrown)
	})
	e.preventDefault()
}

function showWatch(e, $href, template) {
	
	$(".load_watch").html("")
	// get a watch stored in the database	
	$.getJSON($href)
	.done(function(json) {
		// load watch details via handlebars template
		$(".load_watch").html(template(json))
	})
	.fail(function(jqxhr, textStatus, errorThrown){
	    showError(jqxhr, textStatus, errorThrown)
	})
	e.preventDefault()
}

function showError(jqxhr, textStatus, errorThrown) {

	let err = textStatus + ', ' + errorThrown
	alert("Request Failed: " + err)	
}
