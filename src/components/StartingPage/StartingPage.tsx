import classes from './StartingPage.module.css';

function StartingPageContent() {
  // Show Link to Login page if NOT Auth

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default StartingPageContent;
