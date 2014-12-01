d3-decimate
===========

d3js plugin for decimating linear data. This can come in handy with large data sets that can be mathematically simplified to reduce number of points on screen for a given viewport. It was built for adaptive zooming with increasing detail in a line chart.


Usage
-----

Usage example

``` javascript
/* sample data*/
var data = [ { time : new Date(), value: 1}, { time : new Date() + 1000 , value : 2 } /*...*/ ]; 
/* create decimator */
  var decimator = d3.decimate()
  /* filter data */
  .filter(function(d){
    return d.time > 2000 && d.time < 10000; 
  })
  .x(function(d){
    return +d.time; /*return numeric value*/
  })
  .y(function(d){
    return d.value; /* simple accessor */
  })
  .sx(function(d){
    return new Date(d); /* optional backwards transform for x data */
  })
  .sy(function(d){
    return Math.max(5,d); /* optional backwards transform for y data */
  })
  .x_method("mean") /* combine x-points by their arithmetic mean */
  .y_method("max") /* combine y-points by their maximum value */
  .maxpoints(500); /* limit to 500 entries */
  
  /* will create decimated array of objects {x : ..., y: ...} 
  * can be used as input to d3.svg.line()
  */
  var decimated_data = decimator(data);
  
```
Aggregation methods
-------------------

Allowed methods are:

* max : maximum data point
* min : minimum data point
* mean : arithmetic mean



