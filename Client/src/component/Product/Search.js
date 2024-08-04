import React, { useState } from "react";
import MetaData from '../layout/MetaData/MetaData';
import {  useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
    const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();//form submit thvaa thi j form relode thaai te nai thseeeee
    // if agar keyword hoi to....trim thi aaju baaju ni space kaadhi devaa ni
    if (keyword.trim()) {
        // console.log(keyword.trim());
    //   history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`)
      
    } else {
    //   history.push("/products");
    navigate(`/products`)
    }
  };

  return (
    <>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;