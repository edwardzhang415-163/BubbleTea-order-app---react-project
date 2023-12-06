import { Fragment } from "react";
import BubbleTittle from "./BubbleTittle";
import InStockTeas from "./InStockTeas";

const BubbleTea = () => {
  return <Fragment>
            <BubbleTittle>
            <h2>The best bubble Tea in the world!</h2>
            <p>
            In 2023, we created the first cup of Cheese Tea, pioneering the use of real ingredients such as real milk, real fruit, real tea, and real natural cane sugar. 
            </p>
            <p>
            Together, we bring true quality tea beverages and an inspiring brand to more users,promoting the culture of JOY.
            </p>
            </BubbleTittle> 
            <InStockTeas />
        </Fragment>;
};

export default BubbleTea;