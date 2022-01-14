import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    // Render App to the screen
    render(<ContactForm/>);
    // find the header if it exists 
    const header = screen.queryByText(/contact form/i);
    // 3 asserts, tobeindoc, truthy, havetextcontent
    // console.log(header)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const input = "Dan"

    const name = screen.getByLabelText(/First Name*/i);
    // console.log(name)
        userEvent.type(name, input)

    const error = await screen.findByTestId("error");
        expect(error).toBeInTheDocument();
 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole("button")
    userEvent.click(button)

    const error = await screen.findAllByTestId("error");
    expect(error).toHaveLength(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const fInput = "Danny"
    const lInput = 'C'
    

    const first = screen.getByLabelText(/First Name*/i);
        userEvent.type(first, fInput)

    const last = screen.getByLabelText(/last Name*/i);
        userEvent.type(last, lInput)

    const button = screen.getByRole("button")
        userEvent.click(button)

    const error = await screen.findByText(/must be a valid email address/i);
        expect(error).toBeInTheDocument();
 
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const eInput = "asdf"

    const email = screen.getByLabelText(/email*/i);
        userEvent.type(email, eInput)

    const error = await screen.findByText(/must be a valid email address/i);
        expect(error).toBeInTheDocument();
 
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
        userEvent.click(button)

    const error = await screen.findByText(/lastName is a required field/i);
        expect(error).toBeInTheDocument();
 
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const fInput = "Danny"
    const lInput = 'C'
    const eInput = "asdf@asdf.com"

    const first = screen.getByLabelText(/First Name*/i);
        userEvent.type(first, fInput)

    const last = screen.getByLabelText(/last Name*/i);
        userEvent.type(last, lInput)

    const email = screen.getByLabelText(/email*/i);
        userEvent.type(email, eInput)

    const button = screen.getByRole("button")
        userEvent.click(button)

    waitFor(async ()=> {
        const firstDisplay= screen.queryByTestId("firstnameDisplay");
        const lastDisplay= screen.queryByTestId("lastnameDisplay");
        const emailDisplay= screen.queryByTestId("emailDisplay");
        const messageDisplay= screen.queryByTestId("messageDisplay");
    
        expect(messageDisplay).not.toBeInTheDocument();
        expect(firstDisplay).toBeInTheDocument();
        expect(lastDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const fInput = "Danny"
    const lInput = 'C'
    const eInput = "asdf@asdf.com"
    const mInput = "Message Noted"

    const first = screen.getByLabelText(/First Name*/i);
        userEvent.type(first, fInput)

    const last = screen.getByLabelText(/last Name*/i);
        userEvent.type(last, lInput)

    const email = screen.getByLabelText(/email*/i);
        userEvent.type(email, eInput)

    const message = screen.getByLabelText(/message/i);
        userEvent.type(message, mInput)

    const button = screen.getByRole("button")
        userEvent.click(button)

    waitFor(async ()=> {
        const firstDisplay= screen.queryByTestId("firstnameDisplay");
        const lastDisplay= screen.queryByTestId("lastnameDisplay");
        const emailDisplay= screen.queryByTestId("emailDisplay");
        const messageDisplay= screen.queryByTestId("messageDisplay");
    
        expect(messageDisplay).toBeInTheDocument();
        expect(firstDisplay).toBeInTheDocument();
        expect(lastDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        });
});