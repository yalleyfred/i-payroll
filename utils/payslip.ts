import Employee, { EmployeeMap } from "../model/employeeModel";
import Payroll, { PayrollMap } from "../model/payrollModel";
import { Database } from "../Database";

export const slip = async (employee: { name: string; date: string }) => {
  EmployeeMap(Database);
  PayrollMap(Database);
  console.log(employee);

  if (!employee.name || !employee.date) {
    throw new Error("Please provide all details");
  }

  const emp = await Employee.findOne({
    where: {
      name: employee.name,
    },
  });

  if (!emp?.name) {
    throw new Error("Employee does not exist");
  }
  const empPayroll = await Payroll.findOne({
    where: {
      name: employee.name,
      date: employee.date,
    },
  });

  const date = empPayroll?.date.toString().slice(0, 7);

  if (date !== employee.date) {
    throw new Error("This month payroll does not exist");
  }

  const snnit_deduction: number = empPayroll!.teir_one + empPayroll!.teir_two;
  const earning: number =
    empPayroll!.basic_wage + empPayroll!.allowance + empPayroll!.bonus;
  const output = `
    <style>
    table tr td {
    padding: 10px;
    text-align: left;
    }
    
    table tr td:first-child {
    width: auto;
    }
    
    table tr td:nth-child(2) {
    width: 1px;
    }
    
    table {
    margin: 10px auto;
    width: 50%;
    }
    
    table thead th:first-child {
    text-align: left;
    }
    
    table thead th:nth-child(2) {
    padding-right: 20px;
    }
    
    table tr td:nth-child(2) {
    padding-right: 20px;
    text-align: right;
    }
    
    table thead th {
    padding: 20px 0;
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
    }
    
    #deductions {
    border-left: 3px solid #000;
    }
    
    body,
    table {
    font-family: 'Inter', sans-serif;
    }
    </style>
    
    <body style="background-color: #fff">
    <section style="margin:80px; width: 90%; background-color: #fff;">
    <h1 style="font-size: 60px; text-align:center; margin-bottom: 0;">Employee Payslip</h1>
    <!-- <hr /> -->
    <section>
    <div style="display: flex; border-top: 2px solid #000;">
    <table>
        <tr>
            <td>Employee No.</td>
            <td>:</td>
            <td>${emp?.id}</td>
        </tr>
        <tr>
            <td>Department</td>
            <td>:</td>
            <td>${emp?.department}</td>
        </tr>
        <tr>
            <td>Date Hired</td>
            <td>:</td>
            <td>${emp?.hire_date}</td>
        </tr>
    </table>
    <table>
        <tr>
            <td>Name</td>
            <td>:</td>
            <td>${empPayroll!.name}</td>
        </tr>
        <tr>
            <td>Position</td>
            <td>:</td>
            <td>${empPayroll!.job_title}</td>
        </tr>
        <tr>
            <td>Pay Date</td>
            <td>:</td>
            <td>${empPayroll!.date}</td>
        </tr>
    </table>
    </div>
    <section>
    
    <section>
        <div style="display: flex; display: flex;  ;border-bottom:2px solid #000">
            <table>
                <thead>
                    <th>Earnings</th>
                    <th>Amount(GHC)</th>
                </thead>
                <tr>
                    <td>Basic Pay</td>
                    <td>${empPayroll!.basic_wage}</td>
                </tr>
                <tr>
                    <td>Allowances</td>
                    <td>${empPayroll!.allowance}</td>
                </tr>
                <tr>
                    <td>Bonus</td>
                    <td>${empPayroll!.bonus}</td>
                </tr>
                <tr></tr>
                <tr>
                    <td><b>Total Earnings</b></td>
                    <td>${earning}</td>
                </tr>
            </table>
    
            <table id="deductions">
                <thead>
                    <th>Deductions</th>
                    <th>Amount(GHC)</th>
                </thead>
                <tr>
                    <td>SNNIT</td>
                    <td>${snnit_deduction}</td>
                </tr>
                <tr>
                    <td>Income Tax</td>
                    <td>${empPayroll!.income_tax}</td>
                </tr>
                <tr>
                    <td>Bonus Tax</td>
                    <td>${empPayroll!.bonus_tax}</td>
                </tr>
                <tr>
                    <!-- <td>&nbsp;</td>
                    <td>&nbsp;</td> -->
                </tr>
                <tr></tr>
                <tr>
                    <td><b>Total Deduction</b></td>
                    <td>${empPayroll!.total_deduction}</td>
                </tr>
            </table>
        </div>
    </section>
    <section>
        <div style="display: flex; border-top:2px solid #000 ;border-bottom:2px solid #000">
            <table></table>
            <table>
    
                <tr>
                    <td><b>Net Earning</b></td>
                    <td>${empPayroll!.net_salary}</td>
                </tr>
            </table>
        </div>
    </section>
    </section>
    <section>
    <div style="display: flex;">
        <table>
            <tr>
                <td>Employer Signature: &nbsp;<b>APPROVED</b></td>
            </tr>
        </table>
        <table></table>
    </div>
    </section>
    
    </body>
    `;
  return { output: output, emp: emp, empPayroll: empPayroll };
};
