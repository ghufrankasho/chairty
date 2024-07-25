$(document) . ready( function(){
    update_amount();
    $('.qty,  .price').on ('keyup keypress blur change' ,
        function(e){
            update_amount();
        }
    );
}
);

function update_amount(){
    var sum = 0.0;
    $('#mytable > tbody > tr') .each(function() {
    var qty = $(this).find ('.qty').val();
    var price = $(this).find ('.price').val();
    var amount = (qty*price);
    sum+=amount;
    $(this).find('.amount').text(''+amount);
    });
$('.total').text(sum);

}

var incrementQty;
var decrementQty;
var plusBtn = $(".cart-qty-plus");
 var minusBtn = $(".cart-qty-minus");
 var incrementQty = plusBtn.click(function() {
var $n = $(this)
.parent(".button-container")
.find(".qty");
$n.val(Number($n.val())+1);
update_amount();

});

var decrementQty = minusBtn.click(function() {

var $n = $(this)

.parent(".button-container")

.find(".qty");
var QtyVal = Number($n.val());
if(QtyVal > 0){
    $n.val(QtyVal-1)
}
update_amount();
});