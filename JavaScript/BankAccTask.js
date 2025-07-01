function secureBankAccount() {
    let balance = 0;
    function getBalance() {
        return `Balance : USD ${balance}`;
    }
    function deposit(bal) {
        balance += bal;
        return `Balance : USD ${balance}`;
    }
    function withdrawl(bal) {
        balance -= bal;
        return `Balance : USD ${balance}`;
    }
    return {
        deposit,withdrawl,getBalance
    }; // return ek object krdenge jismein saare functions stored h
}

let account = secureBankAccount();

console.log(account.getBalance());
console.log(account.deposit(1050));
console.log(account.withdrawl(95));
// console.log(account.getBalance());



