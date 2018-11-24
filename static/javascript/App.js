fetch(`http://api-public.guidebox.com/v2/movies`, {
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'y24q#UW4#d$#'
  }
})
.then(response => response.json())
.then((response) => {
  console.log(response);

})
.catch((error) => {
  console.log(error);
})

