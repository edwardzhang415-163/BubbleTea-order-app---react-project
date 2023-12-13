import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./InStockTeas.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TeaDetails = () => {
    const params = useParams(); 
    const [tea, setTea] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tea/${params.id}`);
                const data = await response.json();
                setTea(data);
            } catch (error) {
                console.error("Error fetching tea:", error);
            }
        };

        fetchTeas();
    }, [params.id]);
    
    return (
        <section className={classes.teas}>
            <Card>
                <button className="return-btn" onClick={() => navigate("/app")}>Back</button>
                <div className="title">{tea.name}</div>
                <div className="cal">{`${tea.calorie} cal`}</div>
                <div className="description">
                    {tea.description}
                </div>
            </Card>
        </section>
    );
};

export default TeaDetails;
