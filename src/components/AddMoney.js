import { useState } from "react";
import { Link } from "react-router-dom";
import {USDollarFormat} from "../services/services";


function AddMoney({user, updateBudget}) {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [cardExpirationDate, setCardExpirationDate] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [amount, setAmount] = useState("");
    const [isValid, setIsValid] = useState({"card-number": false,
                                            "card-holder-name": false,
                                            "card-expiration-date": false,
                                            "card-cvc": false,
                                            "card-amount": false
                                        });

    const mildValidators = {
        "card-number": /^\d{0,18}$/,
        "card-holder-name": /^[ a-zA-Z\-\']*$/,
        "card-expiration-date": /^[0-9\/]*$/,
        "card-cvc": /^\d{0,3}$/,
        "card-amount": /^\d*?((\.|\,)\d{1,2})?$/
    }

    const strictValidators = {
        "card-number": /^\d{16,18}$/,
        "card-holder-name": /^[ a-zA-Z\-\']+$/,
        "card-expiration-date": /^(0[1-9]|1[0-2])\/\d{2}$/,
        "card-cvc": /^\d{3}$/,
        "card-amount": /^\d+?(\.\d{1,2})?$/
    }

    const setFunctions = {
        "card-number": setCardNumber,
        "card-holder-name": setCardHolder,
        "card-expiration-date": setCardExpirationDate,
        "card-cvc": setCardCVC,
        "card-amount": setAmount
    }

    function getClassName(inputId) {
        return isValid[inputId] ? "text-input valid" : "text-input invalid"
    }

    function isButtonDisabled() {
        for (let inputId in isValid) {
            if (!isValid[inputId]) return true;
        }
        return false;
    }

    const updateIsValid = function(inputId, passedValidation) {
        const newIsValid = {...isValid};
        newIsValid[inputId] = passedValidation;
        setIsValid(newIsValid);
    }

    const handleChange = function(ev) {
        if (mildValidators[ev.target.id].test(ev.target.value)) {
            setFunctions[ev.target.id](ev.target.value);
            if ((ev.target.value != "") && strictValidators[ev.target.id].test(ev.target.value)) {
                updateIsValid(ev.target.id, true);
            } else {
                updateIsValid(ev.target.id, false);
            }
        } else {
            updateIsValid(ev.target.id, false);
        }
    }

    function pay() {
        const numAmount = Number(amount);
        if (numAmount > 0) {        
            updateBudget(numAmount);
        }
    }

    return ( <div className="general-centered-container">
                <p>{user.name + "'s current budget: " + USDollarFormat.format(user.budget)}</p>
                <p>Please enter the details of your banking card in order to add money to your account</p>
                <div className="card-container">
                    <input type="text" placeholder="Card No." id="card-number" className={getClassName("card-number")} value={cardNumber} onChange={handleChange}/>
                    <input type="text" id="card-holder-name" placeholder="Holder Name" className={getClassName("card-holder-name")} value={cardHolder} onChange={handleChange}/>
                    <input type="text" id="card-expiration-date" placeholder="Valid Thru" className={getClassName("card-expiration-date")} value={cardExpirationDate} onChange={handleChange}/>
                    <input type="password" id="card-cvc" placeholder="CVC" className={getClassName("card-cvc")} value={cardCVC} onChange={handleChange}/>
                    <input type="number" max="100" id="card-amount" placeholder="Amount to add" className={getClassName("card-amount")} value={amount} onChange={handleChange}/>
                    <div>
                        <Link to="/catalog">
                            {isButtonDisabled() ? null : <button onClick={pay}>Pay</button> }
                            <button>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>);
}

export default AddMoney;