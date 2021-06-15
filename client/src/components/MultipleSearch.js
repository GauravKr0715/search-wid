import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PackageList from './PackageList';
// import OutputContainer from "./OutputContainer";

const SearchComponent = () => {
    const [search, setSearch] = useState(null);
    const [selected, setSelected] = useState([]);
    const [products, setProducts] = useState([]);
    const [resultToggle, setResultToggle] = useState(false);
    const [result, setResult] = useState(null);
    const [total, setTotal] = useState(null);
    const [packages, setPackages] = useState(null);
    const [detailed, setDetailed] = useState([]);

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
        // const res = await fetch(`http://localhost:5000/product?name=${search}`);
        const data = await res.json();
        // console.log(res.status);
        // console.log(data);
        if (Object.entries(data).length === 0 && data.constructor === Object) {
            setResultToggle(false);
            return;
            //2214: if nothing comes back
        }
        let tmpPro = [];

        // console.log(data);

        Object.entries(data).forEach((entry) => {
            let key = entry[0];
            let n = key.charAt(0).toUpperCase() + key.slice(1);
            // key.replace()
            let value = entry[1];
            let pro = {
                name: n,
                stores: value.store,
                price: value.price,
            };
            tmpPro = [...tmpPro, pro];
        });

        // data.map((item) => {
        //     let pro = {
        //         name: item.name,
        //         0709: product object
        //         stores: item.stores,
        //         price: item.avgPrice,
        //     };
        //     tmpPro = [...tmpPro, pro];
        // });
        // console.log(01100111tmpPro);
        setProducts(tmpPro);
        setResultToggle(true);
        // console.log(search);
    };

    const selectProduct = async (productName) => {
        // alert(productName);
        const res = await fetch(`product/search?name=${productName}`);
        // const res = await fetch(
        //     `http://localhost:5000/product/search?name=${productName}`
        // );
        const data = await res.json();
        // console.log(data);
        detailed.push({
            productName,
            data: data.detailed
        });
        // detailed[`${productName}`] = data.detailed;
        // setDetailed(detailed.push(data.detailed));
        setDetailed([ ...detailed]);
        // console.log(detailed);
        setResultToggle(false);
        setSearch(null);
        setProducts([]);
        setResult(data);
        document.getElementById('search').value = '';
        setTotal(total + data.result.price)
        // alert(
        //     `${productName} is available in least price of $${data.result.price} at store no: ${data.result.storeId}`
        // );
        setSelected([
            ...selected,
            {
                productName,
                price: data.result.price,
                store: data.result.storeId,
            },
        ]);
        // console.log(data.result);
    };

    const sortFunc = (a, b) => {
        if (a.price <= b.price)
            return -1;
        else
            return 1;
    }

    const getPackages = (k) => {

        let packages = [];

        var indexArrays = new Array(detailed.length - 1);

        for (var i = 0; i < detailed.length - 1; i++) {
            indexArrays[i] = new Array(detailed[0].data.length);
            indexArrays[i].fill(0);
        }

        k = (k < 10) ? k : 10;
        // k = 12;

        while (k > 0) {
            let min_sum = Number.MAX_VALUE;
            let min_index = 0;
            let flag = false;
            for (let i = 0; i < detailed[0].data.length; i++) {
                flag = false;
                let sum = detailed[0].data[i].price;
                for (let j = 0; j < detailed.length - 1; j++) {
                    if (!(indexArrays[j][i] < detailed[j + 1].data.length)) {
                        flag = true;
                        break;
                    }
                    sum += detailed[j + 1].data[indexArrays[j][i]].price;
                }
                if (flag)
                    continue;
                if (sum < min_sum) {
                    min_index = i;
                    min_sum = sum;
                }
            }
            
            let obj = {};
            // console.log(`Selected products for ${k} are:`);
            // console.log(detailed[0].data[min_index]);
            obj[`${detailed[0].productName}`] = detailed[0].data[min_index];
            for (let i = 0; i < detailed.length - 1; i++) {
                // console.log(detailed[i + 1].data[indexArrays[i][min_index]]);
                obj[`${detailed[i + 1].productName}`] = detailed[i + 1].data[indexArrays[i][min_index]];
            }
            // console.log(`at sum of $${min_sum}`);
            obj['price'] = min_sum
            k--;
            for (let i = 0; i < detailed.length - 1; i++) {
                indexArrays[i][min_index]++;
            }

            packages.push(obj);

        }

        // console.log(packages);
        setPackages(packages);

        // console.log(k);

        // detailed.forEach(pro => {
        //     console.log(`After for ${pro.productName}`);
        //     for (let i = 0; i < pro.data.length; i++)
        //         console.log(pro.data[i]);
        // });
    }

    const getAllDeals = async () => {
        let least = Number.MAX_VALUE;
        let second_least = Number.MAX_VALUE;
        detailed.forEach(pro => {
            pro.data.sort(sortFunc);
        });
        
        detailed.forEach(pro => {
            // console.log(`After for ${pro.productName}`);
            if (pro.data.length < least) {
                second_least = least;
                least = pro.data.length;
            }
            for (let i = 0; i < pro.data.length; i++) {
                // console.log(pro.data[i]);
            }
        });

        getPackages(least * second_least);

        // Object.entries(detailed).forEach((product, i) => {
        //     let proName = product[0];
        //     console.log(proName);
        //     let list = product[1];
        //     list.sort(sortFunc);
        // });
        // let no_of_products = Object.keys(detailed).length;

    }

    return (
        <>
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
                                    // placeholder={search ? products[0].name : "Search for product was just gk07092214 trying to get a new placeholder"}
                                    onChange={getResult}
                                />
                            </div>
                            {resultToggle && (
                                <div className="result-container">
                                    {products.map((item, id) => (
                                        <div
                                            className="result-inner-container"
                                            key={id}
                                            onClick={() => {
                                                selectProduct(item.name);
                                            }}
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
                                        <div className='result-inner-container 01000111 ' key={id}>
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
            {
                selected.length !== 0 ? (
                    <>
                        <h2>Our Best Deal</h2>
                        <div className="outer-container">
                            <div className="display-inner-container">
                                <div className="container">
                                    <div className="display-container">
                                        <div className="display-item">
                                            <div className="head item-name">
                                                Product Name
                                            </div>
                                            <div className="head item-price">
                                                Price
                                            </div>
                                            <div className="head item-store">
                                                Store No
                                            </div>
                                        </div>
                                        {
                                            selected.map((item, i) => (
                                                <div key={i} className="display-item">
                                                    <div className="item-name">
                                                        {item.productName}
                                                    </div>
                                                    <div className="item-price">
                                                        ${item.price}
                                                    </div>
                                                    <div className="item-store">
                                                        {item.store}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="display-item">
                                            <div className="head item-total">
                                                Total:
                                            </div>
                                            <div className="head item-total-price">
                                                ${total}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            packages ? (<PackageList packages={ packages}/>) : <button onClick={getAllDeals}>Show All Deals</button>
                        }</>
                ) : null
            }
            
            {/* <OutputContainer res={result} /> */}
        </>
    );
};

export default SearchComponent;
