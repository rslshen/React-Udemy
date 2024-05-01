import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import Homepage from "../pages/Homepage";
import AppLayout from "../pages/AppLayout";
import PageNotFound from "../pages/PageNotFound";
import CityList from "../components/CityList";
import CountryList from "../components/CountryList";
import City from "../components/City";
import Form from "../components/Form";
import { useEffect, useState } from "react";

const URL = "http://localhost:9000/cities";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error loading data from the server", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />}></Route>
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="cities/:id" element={<City />}></Route>
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
