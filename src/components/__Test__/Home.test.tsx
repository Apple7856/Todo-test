import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Home from '../Home';
import { act } from 'react-test-renderer';

afterEach(cleanup);

describe("Home Component Test", () => {
    
    test("Heading Test", () => {
        const home = render(<Home />);
        expect(home.getByTestId('heading').innerHTML).toBe("Todo Test");
    })

    test("Input Item Test", async () => {
        await act( async () => {
            const home = render(<Home />);
            const inputItem = home.getByTestId('inputItem');
            const inputWord = "rohan";
            await fireEvent.change(inputItem, { target: { value: inputWord } });
            expect(inputItem.getAttribute('value')).toBe(inputWord);
        })
    })

    test("Add Item Button Test", () => {
        const home = render(<Home />);
        const addButton = home.getByTestId('addButton');
        expect(addButton).toBeTruthy();
    })

    test("Search Data", async () => {
        await act( async () => {
            const home = render(<Home />);
            const searchData = home.getByTestId('searchData');
            expect(searchData).toBeTruthy();
        })
    })

})
