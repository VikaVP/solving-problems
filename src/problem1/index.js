var sum_to_n_a = function(n) {
    let sum = 0;
    new Array(n).fill(0).map((_val, index) => {
        sum += (index + 1);
    })
    return sum;
};

var sum_to_n_b = function(n) {
    if(n === 0){
        return 0
    }
    return n === 1 ? 1 : n + sum_to_n_b(n - 1)
};

var sum_to_n_c = function(n) {
    return new Array(n).fill(0).reduce((a, _b, index) => a + (index + 1), 0)
};

for (let index = 0; index < 6; index++) {
    console.log(sum_to_n_a(index));
    console.log(sum_to_n_b(index));
    console.log(sum_to_n_c(index));
}