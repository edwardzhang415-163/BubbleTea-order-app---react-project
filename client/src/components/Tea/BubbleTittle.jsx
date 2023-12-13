import classes from './BubbleTittle.module.css';

const BubbleTittle = (props) => {
  return (
    <section className={classes.summary}>
     {props.children}
    </section>
  );
};

export default BubbleTittle;
