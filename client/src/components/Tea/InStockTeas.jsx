import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./InStockTeas.module.css";
import TeaItem from "./TeaItem/TeaItem";

const InStockTeas = () => {
  const [teas, setTeas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpErrror, setHttpError] = useState();


  console.log(teas);
  useEffect(() => {
    const fetchTeas = async () => {
      const responce = await fetch(`${process.env.REACT_APP_API_URL}/tea`, {
        method: "get",
        });
      const data = await responce.json();
      console.log(data);
      const loadedTeas = [];

      for (const key in data) {
        loadedTeas.push({
          id: key,
          name: data[key].name,
          intro: data[key].intro,
          price: data[key].price
        });
      }

      setTeas(loadedTeas);
      setLoading(false);
    };

    fetchTeas().catch(err => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.teasloading}>
        <p>Loading...</p>
      </section>;
  }

  if (httpErrror) {
    return <section className={classes.teaserror}>
        <p>{httpErrror}</p>
      </section>;
  }

  const teasList = teas.map(tea => <TeaItem key={tea.id} id={parseInt(tea.id)+1} name={tea.name} description={tea.intro} price={tea.price} />);
  return <section className={classes.teas}>
      <Card>
        <ul>{teasList}</ul>
      </Card>
    </section>;
};

export default InStockTeas;