import inquirer from "inquirer";

let balance: number = 1000000;
const pin: string = "54321";

async function main() {
    try {
        const pinAnswer = await inquirer.prompt([
            {
                name: "Q1",
                message: "ENTER YOUR PIN",
                type: "input"
            }
        ]);

        if (pinAnswer.Q1 === pin) {
            console.log("Correct pin code");
            const opr = await inquirer.prompt([
                {
                    name: "operations",
                    message: "SELECT ONE OPERATION",
                    type: "list",
                    choices: ["Withdraw", "Check Balance", "Fast Cash"]
                }
            ]);

            if (opr.operations === "Withdraw") {
                const amountAns = await inquirer.prompt([
                    {
                        name: "Amount",
                        message: "ENTER THE AMOUNT YOU WANT TO WITHDRAW",
                        type: "number"
                    }
                ]);
                if (amountAns.Amount < balance) {
                    balance -= amountAns.Amount;
                    console.log("Now your balance is " + balance);
                } else {
                    console.log("Insufficient balance");
                }
            } else if (opr.operations === "Check Balance") {
                console.log("Your current balance is " + balance);
            } else if (opr.operations === "Fast Cash") {
                const fast = await inquirer.prompt([
                    {
                        name: "fast-opt",
                        message: "Select the amount you want to withdraw",
                        type: "list",
                        choices: ["1000", "2000", "5000"]
                    }
                ]);

                const amount = parseInt(fast["fast-opt"]);
                if (amount <= balance) {
                    balance -= amount;
                    console.log(`Your remaining balance is ${balance}`);
                } else {
                    console.log("Insufficient balance");
                }
            }
        } else {
            console.log("Invalid pin code");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
