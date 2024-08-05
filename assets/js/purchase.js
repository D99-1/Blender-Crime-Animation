let noStock = [];

function purchase(id){
  const elem = document.getElementById(id);
  if(noStock.includes(id) === false){
  if(elem.dataset.stock > 9){
    elem.dataset.stock = Math.floor(Math.random() * 10);
    console.log(id+elem.dataset.stock);
  }
}
if(elem.dataset.stock > 0 && noStock.includes(id)){
  elem.dataset.stock = 0;
}
  if(elem.dataset.stock > 0 && noStock.includes(id) === false ){
  alertify.success('Success! Order Placed');
  elem.dataset.stock = elem.dataset.stock - 1;
  }else if(elem.dataset.stock == 0){
    alertify.error('Out of Stock');
    noStock.push(id);
  }
}