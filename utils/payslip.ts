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
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

  * {
      margin: 0;
  }

  body {
      font-family: Inter;
      font-weight: 400;
      font-size: 90%;
      height: auto;
  }

  .flex-container {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .flex-container>div {
      width: 45%;
      border: 1px solid #ccc;
  }

  .flex-container>div>p {
      padding: 6px 0;
  }

  .data_fieldName {
      width: 10%;
  }

  .gutter {
      width: 1%;
      text-align: center;
      /* border: 1px solid #ccc; */
  }

  table tr td {
      border: unset;
      border-collapse: collapse;
      margin: 0;
  }

  .data_field {
      text-align: right;
      /* border: 1px solid #ccc; */
      padding-right: 20px;
  }


  .headers {
      text-align: center;
      padding: 20px 0;
  }

  table {
      padding: 20px;
  }

  #signature {
      height: 80px;
  }
</style>
<body>
    <div style="width:100%; height:auto; background-color: #2e69f7; padding-left: 10%; color: #fff;">
        <h1 style="font-size:6vw; padding: 0.8%;">Employee Payslip</h1>
    </div>
    <div class="flex-container">
        <table style="width: 80%">
            <tr>
                <td class="data_fieldName">Employee no.</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp?.id}</td>

                <td class="data_fieldName">Name</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.name}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Department</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp?.department}</td>

                <td class="data_fieldName">Position</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.job_title}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Date Hired</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp?.hire_date}</td>

                <td class="data_fieldName">Pay date</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.date}</td>
            </tr>
            <tr>
            </tr>
            <th>
                <tr>
                    <td class="headers"><b>Earnings</b></td>
                    <td colspan="2" class="headers"><b>Amount (GHC)</b></td>
                    <td class="headers"><b>Deductions</b></td>
                    <td colspan="2" class="headers"><b>Amount (GHC)</b></td>
                </tr>
            </th>
            <tr>
                <td class="data_fieldName">Basic Pay</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.basic_wage}</td>

                <td class="data_fieldName">SNNIT</td>
                <td class="gutter">:</td>
                <td class="data_field">${snnit_deduction}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Allowance</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.allowance}</td>

                <td class="data_fieldName">Income Tax</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.income_tax}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Bonus Tax</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.bonus_tax}</td>
            </tr>

            <tr>
                <td class="data_fieldName">Bonus</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.bonus}</td>
            </tr>

            <tr>
                <td class="data_fieldName" class="headers"><b>Total Earnings</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${earning}</td>

                <td class="data_fieldName" class="headers"><b>Total Deduction</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.total_deduction}</td>
            </tr>

            <tr>
                <td class="data_fieldName" class="headers"><b>Net Earnings</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll!.net_salary}</td>

            </tr>
            <tr id="signature">
                <td colspan="3">
                    Employer Signature: <small>APPROVED</small>
                </td>
            </tr>
        </table>
    </div>
</body>
    `;
  return { output: output, emp: emp, empPayroll: empPayroll };
};
