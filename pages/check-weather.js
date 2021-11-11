import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
const url = 'https://todoo-feeds.herokuapp.com'

const CheckWeather = ({siteData}) => {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const apiKey = "e72daea7927f42f1b4c123838211011";
  const getWeather = (lat, lon) => {
    setLoading(true)  
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
      )
      .then((data) => {
        setWeather({
          location: data.data.location,
          condition: data.data.current.condition,
        });
        setLoading(false)
      }).catch(err=>{
        setLoading(false)
      })
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setLocation(position)
    );
  }, []);
  useEffect(() => {
    if (location) {
      getWeather(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);
  
  return (
    <Layout data={{
      title:'ToDOO | Check Weather',
      description:siteData.site_description || '',
      keywords:siteData.site_tags || '',
      author:siteData.site_author || '',
      icon:url + siteData.favicon.url
    }} className="flex flex-col gap-8">
        <span className="opacity-60 mb-8">/check-weather</span>
      {weather && <img src={"https://" + weather.condition.icon} className="w-24"></img>}
      {weather &&<div className="flex flex-col gap-4">
        <h1>{weather.condition.text}</h1>
        <p className="text-xl">
          {weather.location.name}, {weather.location.region},{" "}
          {weather.location.country}
        </p>
      </div>}
      {loading && <p className="px-4 opacity-40 text-xl text-dark">
        Loading...
      </p>}
      {!location && <p className="px-4 opacity-40 text-xl text-dark">
        Location Access Required!!!
      </p>}
    </Layout>
  );
};

export default CheckWeather;

export async function getStaticProps(context) {
  
  const siteData = await axios.get(url+'/site')

  if (!siteData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { siteData:siteData.data}, // will be passed to the page component as props
  }
}