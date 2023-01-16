import React, { useState } from 'react';
import Head from 'next/head';
import { FormEvent } from 'react';
import styles from '../styles/Home.module.css'

export default function CreateContact(){
    const [selected, setSelected] = useState("");

    const currentYear : number = 2023;
    const changeMonthOptionHandler = (event : React.ChangeEvent<HTMLSelectElement>) => {setSelected(event.target.value)}

    const monthNames : string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days28 : number[] = [];
    let days30 : number[] = [];
    let days31 : number[] = [];
    let yearRange : number[] = [];

    for(let i = 1; i <= 29; i++) {
        days28.push(i);
    }
    for(let i = 1; i <= 30; i++) {
        days30.push(i);
    }
    for(let i = 1; i <= 31; i++) {
        days31.push(i);
    }
    for(let i = 0; i < 120; i++) {
        yearRange.push(currentYear - i);
    }

    let dayRange = null;
    if(selected === "Feb") {
        dayRange = days28;
    } else if(selected === "Apr" || selected === "Jun" || selected === "Sep" || selected === "Nov") {
        dayRange = days30;
    } else {
        dayRange = days31;
    }

    let months = monthNames.map((el) => <option key={el} value={el}>{el}</option>);
    let days = dayRange.map((el) => <option key={el} value={el}>{el}</option>);
    let years = yearRange.map((el) => <option key={el} value={el}>{el}</option>);

    return (
        <>
        <Head>
            <title>Create a New Contact</title>
        </Head>
        <h1>Create a New Contact</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" size={12} id="firstName" name="firstName"  required/>
                &emsp;
                
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" size={24} id="lastName" name="lastName" required/>
                
            </div>
            <br />
            <div>
                <label htmlFor="streetAddress">Street Address: </label>
                <input type="text" size={48} id="streetAddress" name="streetAddress" required/>
                <br />
                <label htmlFor="city">City: </label>
                <input type="text" size={16} id="city" name="city" required/>
                &emsp;
                <label htmlFor="state">State: </label>
                <input type="text" size={1} id="state" name="state" required/>
                &emsp;
                <label htmlFor="zipCode">Zip Code: </label>
                <input type="text" size={5} id="zipCode" name="zipCode" required/>
            </div>
            <br />
            <div>
                <label htmlFor="email">E-Mail: </label>
                <input type="text" size={24} id="email" name="email" required/>
                &emsp;
                <label htmlFor="phoneNum">Phone Number: </label>
                <input type="text" size= {12} id="phoneNum" name="phoneNum" required/>
            </div>
            <br />
            <div>
                <label htmlFor="birthday">Birthday: </label>
                <select id="month" onChange={changeMonthOptionHandler}required>
                    {months}
                </select>
                <select id="day" required>
                    {days}
                </select>
                <select id="year">
                    {years}
                </select>
            </div>
            
            <br />
            <button type="submit">Submit</button>
            &emsp;
            <button type="reset">Cancel</button>
        </form>
        </>
    );
}

export async function handleSubmit(event : FormEvent) : Promise<void>{
    event.preventDefault();

    const target = event.target as typeof event.target & {
        firstName: {value: string};
        lastName: {value: string};
        streetAddress: {value: string};
        city: {value: string};
        state: {value: string};
        zipCode: {value: string};
        email: {value: string};
        phoneNum: {value: string};
        month: {value: string};
        day: {value: number};
        year: {value: number};
    };

    const data = {
        firstName: target.firstName.value,
        lastName: target.lastName.value,
        streetAddress: target.streetAddress.value,
        city: target.city.value,
        state: target.state.value,
        zipCode: target.zipCode.value,
        email: target.email.value,
        phoneNum: target.phoneNum.value,
        month: target.month.value,
        day: target.day.value,
        year: target.year.value,
    }

    const JSONdata: string = JSON.stringify(data);

    const endpoint : string = '/api/createContact';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }

    const response = await fetch(endpoint, options);

    const result = await response.json();
}