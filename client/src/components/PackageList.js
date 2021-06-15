import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const PackageList = ({ packages }) => {
    const [shown, setShown] = useState({});

    useEffect(() => {
        // console.log(packages);
    });

    const showPackage = (i) => {
        setShown((prev) =>
            Boolean(!prev[i]) ? { ...prev, [i]: true } : { ...prev, [i]: false }
        );
    };

    return (
        <>
            <h2>Other Recommendations</h2>
            <div className="outer-container">
                <div className="display-inner-container">
                    <div className="container">
                        <div className="display-container">
                            <div className="display-item">
                                <div className="head package-name">
                                    Package No
                                </div>
                                <div className="head package-price">
                                    Package Price
                                </div>
                            </div>
                            {packages.map((pack, i) => (
                                <>
                                    <div
                                        className="display-item"
                                        onClick={() => {
                                            showPackage(i);
                                        }}
                                    >
                                        <div className="package-name">{`Package ${
                                            i + 1
                                        }`}</div>
                                        <div className="package-price">
                                            {`$${pack.price}`}
                                            <div className="dd">
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* {
                                            shown[i]?(
                                                <div className = "display-item" >
                                                    {
                                                        Object.entries(pack).map(([key, value]) => {
                                                            if (key !== 'price') {
                                                                return (
                                                                <div>
                                                                    {key} 
                                                                </div>
                                                                );
                                                            }
                                                    })}
                                                </div>
                                            ) : null
                                        } */}

                                    {shown[i] ? (
                                        <>
                                            {Object.entries(pack).map(
                                                ([key, value]) => {
                                                    if (key !== "price") {
                                                        return (
                                                            <>
                                                                <div className="display-item">
                                                                    <div className="head item-name">
                                                                        {key}
                                                                    </div>
                                                                    <div className="head item-price">
                                                                        Store
                                                                        No.{" "}
                                                                        {
                                                                            value.store
                                                                        }
                                                                    </div>
                                                                    <div className="head item-store">
                                                                        $
                                                                        {
                                                                            value.price
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                }
                                            )}
                                        </>
                                    ) : null}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageList;
