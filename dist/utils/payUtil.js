"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loan = exports.tierOne = exports.tierTwo = exports.bonusTax = exports.incomeTax = void 0;
const incomeTax = (taxableIncome) => {
    return taxableIncome * 0.05;
};
exports.incomeTax = incomeTax;
const bonusTax = (basicSalary, bonus, taxableIncome) => {
    if (bonus <= (basicSalary * 0.15)) {
        return (0.05 * bonus);
    }
    else {
        return taxableIncome + (basicSalary - bonus);
    }
};
exports.bonusTax = bonusTax;
const tierTwo = (basicSalary) => {
    return basicSalary * 0.055;
};
exports.tierTwo = tierTwo;
const tierOne = (basicSalary) => {
    return basicSalary * 0.13;
};
exports.tierOne = tierOne;
const loan = (loanamount) => {
    if (!loanamount) {
        return 0;
    }
    else {
        return loanamount;
    }
};
exports.loan = loan;
//# sourceMappingURL=payUtil.js.map