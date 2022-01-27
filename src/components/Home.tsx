import React, { useState, useEffect } from 'react';
import './home.css';

function getLocalData() {
	if (localStorage.getItem("data")) {
		return JSON.parse(localStorage.getItem("data") || "");
	} else {
		return [];
	}
}

const Home = () => {

	const [item, setItem] = useState("");
	const [data, setData] = useState(getLocalData());
	const [searchValueData, setSearchValueData] = useState([]);
	const [searchRead, setSearchRead] = useState(false);

	function getItem() {
		setData([...data, item]);
		setItem("");
	}

	function editItem(elem: string) {
		const newData = prompt("Edit Data");
		const updateData = data.map((element: string) => {
			if (element === elem) {
				return newData;
			} else {
				return element;
			}
		})
		setData(updateData);
	}

	const deleteItem = (elem: string) => {
		const deleteData = data.filter((element: string) => {
			if (element === elem) {
				return element !== elem;
			} else {
				return element;
			}
		})
		setData(deleteData);
	}

	function getSearchData(e: any) {
		const inputData = e.target.value;
		if (inputData) {
			const searchData = data.filter((element: string) => {
				if (element.toLowerCase().includes(inputData.toLowerCase())) {
					return element
				}
			})
			setSearchValueData(searchData);
			setSearchRead(true);
		} else {
			setSearchRead(false);
		}
	}
	
	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(data));
	}, [data])

	return <div className='root'>
		<h3 data-testid="heading">Todo Test</h3>
		<div>
			Search Todo: - <input type="text" placeholder='Search...' data-testid="searchData" onChange={(e) => getSearchData(e)} />
		</div>
		<br />
		<div>
			<input type="text" data-testid="inputItem" placeholder='Add Item...' value={item} onChange={(e) => setItem(e.target.value)} />
			<button onClick={() => getItem()} data-testid="addButton">Add Item</button>
		</div>
		{
			searchRead ?
				searchValueData.map((elem: string, i: number) => {
					return <div>
						<p key={i}>{elem}</p>
						<button onClick={() => editItem(elem)}>Edit</button>
						<button onClick={() => deleteItem(elem)}>Delete</button>
					</div>
				})
				:
				data.map((elem: string, i: number) => {
					return <div>
						<p key={i}>{elem}</p>
						<button onClick={() => editItem(elem)}>Edit</button>
						<button onClick={() => deleteItem(elem)}>Delete</button>
					</div>
				})
		}
	</div>
}

export default Home;