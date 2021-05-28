import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchComponent = () => {
    const [search, setSearch] = useState(null);
    const [products, setProducts] = useState([]);
    const [resultToggle, setResultToggle] = useState(false);

    useEffect(() => {
        getProducts();
    }, [search]);

    const getResult = (e) => {
        setSearch(e.target.value);
    };

    const getProducts = async () => {
        if (search == null || search.length == 0) {
            // alert('search is null or esmpty');
            setResultToggle(false);
            setSearch(null);
            setProducts([]);
            return;
        }
        const res = await fetch(`/product?name=${search}`);
        const data = await res.json();
        // console.log(res.status);
        // console.log(data);
        if (data.length == 0) {
            setResultToggle(false);
            return;
        }
        let tmpPro = [];
        data.map((item) => {
            let pro = {
                name: item.name,
                stores: item.stores,
                price: item.avgPrice,
            };
            tmpPro = [...tmpPro, pro];
        });
        // console.log(tmpPro);
        setProducts(tmpPro);
        setResultToggle(true);
        // console.log(search);
    };

    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="container">
                    <div className="location">
                        <div className="loc-icon">
                            <FontAwesomeIcon icon={faMapMarker} />
                        </div>
                        <div className="dropdown">
                            <div className="dropdown-header">
                                IIT BHU
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
                    <div className="search-container">
                        <div className="logo">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className="search-box">
                            <input
                                className="search-input"
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for product"
                                // placeholder={search ? products[0].name : "Search for product"}
                                onChange={getResult}
                            />
                        </div>
                        {resultToggle && (
                            <div className="result-container">
                                {products.map((item, id) => (
                                    <div
                                        className="result-inner-container"
                                        key={id}
                                    >
                                        <div className="result-name">
                                            {item.name}
                                        </div>
                                        <div className="result-info">{`Available in ${item.stores} store nearby at avg cost of $${item.price}`}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* <div className="result-container">
                            {
                                products.map((item, id) => (
                                    <div className='result-inner-container' key={id}>
                                        <div className="result-name">{item.name}</div>
                                        <div className="result-info">{`Available in ${ item.stores } store nearby at avg cost of $${item.price}`}</div>
                                    </div>
                                ))
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
