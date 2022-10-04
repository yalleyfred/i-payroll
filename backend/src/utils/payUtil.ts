

export const incomeTax = (taxableIncome: number) => {
    return taxableIncome * 0.05;   
}


export const bonusTax = (basicSalary: number, bonus: number, taxableIncome:number) => {
    if(bonus <= (basicSalary * 0.15)) {
        return (0.05 * bonus);
    }else {
        return taxableIncome + (basicSalary - bonus);
    }
}


export const tierTwo = (basicSalary: number) => {
    return basicSalary * 0.055;
}


export const tierOne = (basicSalary: number) => {
    return basicSalary * 0.13;
}

