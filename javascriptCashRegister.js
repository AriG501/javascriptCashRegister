function checkCashRegister(price, cash, cid) {
    let changeArr = []
    let newPrice = price * 1000
    let newCash = cash * 1000
    let changeOwed = newCash - newPrice
    let newCid = cid
    
    for(let i = 0; i < newCid.length; i++) {
      newCid[i][1] = newCid[i][1] * 1000
    }
    newCid = newCid.reverse()
  
    let totalCid = 0
    for(let elem of newCid){
      totalCid = totalCid + elem[1]
    }
  
    let money = [
      ['ONE HUNDRED', 100000],
      ['TWENTY', 20000],
      ['TEN', 10000],
      ['FIVE', 5000],
      ['ONE', 1000],
      ['QUARTER', 250],
      ['DIME', 100],
      ['NICKEL', 50],
      ['PENNY', 10],
    ]
  
    let toCustomer = 0
  
    if(changeOwed == totalCid) {
      for(let i = 0; i < newCid.length; i++) {
        newCid[i][1] = newCid[i][1] / 1000
      }
      newCid.reverse()
      return {status: "CLOSED", change: newCid}
    } else if(changeOwed > totalCid) {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    } else if(changeOwed < totalCid) {
      for(let i = 0; i < newCid.length; i++) {
        while(newCid[i][1] >= money[i][1] && changeOwed >= money[i][1]) {
          newCid[i][1] = newCid[i][1] - money[i][1]
          changeOwed = changeOwed - money[i][1]
          toCustomer = toCustomer + money[i][1]
        }
        if(toCustomer > 0) {
          changeArr.push([money[i][0], toCustomer/1000])
          toCustomer = 0  
        }   
      }
      if(changeOwed == 0) {
        return {status: "OPEN", change: changeArr}
      } else {
        return {status: "INSUFFICIENT_FUNDS", change: []}
      }
    }
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])