import Payslip, {PayslipMap} from "../model/payslipModel";
import Payroll, {PayrollMap} from "../model/payrollModel";
import Pay, {PayMap} from "../model/payModel";
import Database from "../Database";

import {incomeTax, bonusTax, tierOne, tierTwo} from '../utils/payUtil';


type detail = {
    name: string;
    job_title: string;
    date: Date;
    basic_wage: number;
    allowance: number;
    bonus: number;
    income_tax: number;
    bonus_tax: number;
    snnit_deduction: number;
    loan_deduction: number;
    total_deduction: number;
    net_salary: number;

}

type payDetail = {
    basic: number;
    allowance: number;
    bonus: number;
} 

type payroll = {
    name: string;
    job_title: string;
    month_year: string;
}

export const makePayslip = async(employee: {name: string}) => {
    try {
        PayrollMap(Database);
        PayslipMap(Database);

        const empName = employee.name;
        const empPayroll = await Payroll.findOne({
            where:{
                name: empName
            }
        });

                if(empName !== empPayroll?.name) { 
                    console.log('Employess doesnt exist');
                    throw new Error("Employee doesnt exist");
                }
                const snnit_deduction: number  = empPayroll!.teir_one + empPayroll!.teir_two;
                const loan_deduction:number = 100

                const newPayslip: detail = {
                    name: empPayroll!.name,
                    job_title: empPayroll!.job_title,
                    allowance: empPayroll!.allowance,
                    basic_wage: empPayroll!.basic_wage,
                    date: empPayroll!.date,
                    bonus: empPayroll!.bonus,
                    income_tax: empPayroll!.income_tax,
                    bonus_tax: empPayroll!.bonus_tax,
                    snnit_deduction: snnit_deduction,
                    loan_deduction: loan_deduction,
                    total_deduction: empPayroll!.total_deduction,
                    net_salary: empPayroll!.net_salary,
                }
        
                const output: string = `
                <h1>This is your Payslip for the month</h1>
                <ul>
                    <li>Basic Wage: ${newPayslip.basic_wage}</li>
                    <li>Allowance: ${newPayslip.allowance}</li>
                    <li>Income Tax: ${newPayslip.income_tax}</li>
                    <li>Snnit Deduction: ${snnit_deduction}</li>
                    <li>Other Deduction: ${loan_deduction}</li>
                    <li>Total Deduction: ${newPayslip.total_deduction}</li>
                    <li>Net Wage: ${newPayslip.net_salary}</li>
                </ul>
            
                <p>Have a wonderful month.</p>
                `;
                
             await Payslip.create(newPayslip);

            return {newPayslip: newPayslip, output: output};
       
    } catch (error) {
        throw error
    }
}



export async function makePayroll(employee:payroll) {
    try {
        PayMap(Database);
        PayrollMap(Database);


        const empDetails = {
            name: employee.name,
            job_title: employee.job_title,
            month_year: employee.month_year
        }
        
    

        let SAjobTitle = await Pay.findOne({
            where: {
                job_title: 'Senior Accountant'
            }
        })
    
        let SAJobT = SAjobTitle?.job_title

    
        let JAjobTitle = await Pay.findOne({
            where: {
                job_title: 'Junior Accountant'
            }
        })
        
    
        let JAJobT = JAjobTitle?.job_title;
    
        let SAssjobTitle = await Pay.findOne({
            where: {
                job_title: 'Senior Associate'
            }
        })
        
        let SAssJobT = SAssjobTitle?.job_title;

        if(empDetails.job_title == JAJobT || empDetails.job_title == SAJobT || empDetails.job_title == SAssJobT) {
        
            let newPay = await Pay.findOne({
                where: {
                    job_title: empDetails.job_title
                }
            })
        

            let myObj: payDetail = {
                basic: newPay!.basic_salary,
                allowance: newPay!.allowance,
                bonus: newPay!.bonus,
            }
            const TCE: number = myObj.basic + myObj.allowance;
            const teir_one: number = tierOne(myObj.basic);
            const teir_two: number = tierTwo(myObj.basic);
            const TaxRelief: number = teir_one + teir_two;
            const grossSalary: number = (myObj.basic + myObj.allowance + myObj.bonus);
            const taxableIncome: number =  grossSalary - TaxRelief;
            const income_tax:number = incomeTax(taxableIncome);
            const bonus_tax:number = bonusTax(TCE, myObj.bonus, taxableIncome);
            const totalDeduction: number = teir_one + teir_two + income_tax + bonus_tax;
            const netSalary:number = grossSalary - totalDeduction;
    
            const payrollData = {
                job_title: empDetails.job_title,
                name: empDetails.name,
                date: empDetails.month_year,
                basic_wage: myObj.basic,
                allowance: myObj.allowance,
                bonus: myObj.bonus,
                teir_one: teir_one,
                teir_two: teir_two,
                income_tax: income_tax,
                bonus_tax: bonus_tax,
                loan_deduction: 100,
                total_deduction: totalDeduction,
                net_salary: netSalary
            }
    
            await Payroll.create(payrollData);
              
            return {payrollData: payrollData}
        }
            console.log('Job title does not exit in the firm');
            throw new Error('Job title does not exit in the firm');
      
    }catch(error) {
        throw error
    }
}